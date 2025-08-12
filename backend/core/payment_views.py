# core/payment_views.py

import stripe
import os
from decimal import Decimal
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UserProfile, Payment, Property

# Set Stripe API key
stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', os.getenv('STRIPE_SECRET_KEY'))


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    """Create a Stripe payment intent for property export"""
    try:
        property_id = request.data.get('property_id')
        amount = request.data.get('amount')  # Amount in dollars
        
        if not property_id or not amount:
            return Response(
                {'error': 'Property ID and amount are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate property belongs to user
        try:
            property_obj = Property.objects.get(id=property_id, owner=request.user)
        except Property.DoesNotExist:
            return Response(
                {'error': 'Property not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Validate amount (minimum $1)
        try:
            amount_decimal = Decimal(str(amount))
            if amount_decimal < 1:
                return Response(
                    {'error': 'Minimum payment is $1.00'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        except (ValueError, TypeError):
            return Response(
                {'error': 'Invalid amount'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create user profile
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        # Check if user can export for free
        if user_profile.can_export_free:
            return Response(
                {'error': 'User can export for free'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create Stripe customer if doesn't exist
        if not user_profile.stripe_customer_id:
            customer = stripe.Customer.create(
                email=request.user.email,
                name=request.user.username,
                metadata={'user_id': request.user.id}
            )
            user_profile.stripe_customer_id = customer.id
            user_profile.save()
        
        # Create payment intent
        payment_intent = stripe.PaymentIntent.create(
            amount=int(amount_decimal * 100),  # Convert to cents
            currency='usd',
            customer=user_profile.stripe_customer_id,
            metadata={
                'user_id': request.user.id,
                'property_id': property_id,
                'property_address': property_obj.address
            }
        )
        
        return Response({
            'client_secret': payment_intent.client_secret,
            'payment_intent_id': payment_intent.id
        })
        
    except stripe.error.StripeError as e:
        return Response(
            {'error': f'Stripe error: {str(e)}'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin_status(request):
    """Check if current user is admin - lightweight endpoint"""
    try:
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        return Response({
            'is_admin': user_profile.user_type == 'admin',
            'user_type': user_profile.user_type,
            'username': request.user.username
        })
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    """Confirm payment and allow export"""
    try:
        payment_intent_id = request.data.get('payment_intent_id')
        property_id = request.data.get('property_id')
        
        if not payment_intent_id or not property_id:
            return Response(
                {'error': 'Payment intent ID and property ID are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Retrieve payment intent from Stripe
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        if payment_intent.status != 'succeeded':
            return Response(
                {'error': 'Payment not completed'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate property belongs to user
        try:
            property_obj = Property.objects.get(id=property_id, owner=request.user)
        except Property.DoesNotExist:
            return Response(
                {'error': 'Property not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Record payment in database
        payment = Payment.objects.create(
            user=request.user,
            property=property_obj,
            stripe_payment_intent_id=payment_intent_id,
            amount=Decimal(payment_intent.amount) / 100,  # Convert from cents
            currency=payment_intent.currency,
            status=payment_intent.status
        )
        
        # Update user's export count
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        user_profile.properties_exported += 1
        user_profile.save()
        
        return Response({
            'success': True,
            'payment_id': payment.id,
            'message': 'Payment confirmed. You can now export this property.'
        })
        
    except stripe.error.StripeError as e:
        return Response(
            {'error': f'Stripe error: {str(e)}'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin_status(request):
    """Check if current user is admin - lightweight endpoint"""
    try:
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        return Response({
            'is_admin': user_profile.user_type == 'admin',
            'user_type': user_profile.user_type,
            'username': request.user.username
        })
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_export_permission(request):
    """Check if user can export a specific property"""
    try:
        property_id = request.query_params.get('property_id')
        
        if not property_id:
            return Response(
                {'error': 'Property ID is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate property belongs to user
        try:
            property_obj = Property.objects.get(id=property_id, owner=request.user)
        except Property.DoesNotExist:
            return Response(
                {'error': 'Property not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get or create user profile
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        can_export_free = user_profile.can_export_free
        
        # Check if this property has already been paid for
        has_paid = Payment.objects.filter(
            user=request.user,
            property=property_obj,
            status='succeeded'
        ).exists()
        
        return Response({
            'can_export_free': can_export_free,
            'has_paid': has_paid,
            'user_type': user_profile.user_type,
            'properties_exported': user_profile.properties_exported,
            'is_first_property': user_profile.properties_exported == 0
        })
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin_status(request):
    """Check if current user is admin - lightweight endpoint"""
    try:
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        return Response({
            'is_admin': user_profile.user_type == 'admin',
            'user_type': user_profile.user_type,
            'username': request.user.username
        })
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def make_user_admin(request):
    """Admin endpoint to grant admin privileges to users"""
    try:
        # Check if current user is admin
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        if user_profile.user_type != 'admin':
            return Response(
                {'error': 'Permission denied. Admin access required.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        target_username = request.data.get('username')
        target_email = request.data.get('email')
        
        if not target_username and not target_email:
            return Response(
                {'error': 'Username or email is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Find target user
        try:
            if target_username:
                target_user = User.objects.get(username=target_username)
            else:
                target_user = User.objects.get(email=target_email)
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get or create target user profile
        target_profile, created = UserProfile.objects.get_or_create(user=target_user)
        target_profile.user_type = 'admin'
        target_profile.save()
        
        return Response({
            'success': True,
            'message': f'User {target_user.username} is now an admin'
        })
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin_status(request):
    """Check if current user is admin - lightweight endpoint"""
    try:
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        return Response({
            'is_admin': user_profile.user_type == 'admin',
            'user_type': user_profile.user_type,
            'username': request.user.username
        })
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    """Admin endpoint to list all users with their profiles"""
    try:
        # Check if current user is admin
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        if user_profile.user_type != 'admin':
            return Response(
                {'error': 'Permission denied. Admin access required.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get all users with their profiles
        users_data = []
        for user in User.objects.all().order_by('-date_joined'):
            profile, created = UserProfile.objects.get_or_create(user=user)
            users_data.append({
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'user_type': profile.user_type,
                'subscription_status': profile.subscription_status,
                'subscription_tier': profile.subscription_tier,
                'properties_exported': profile.properties_exported,
                'created_at': user.date_joined.isoformat(),
            })
        
        return Response(users_data)
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_admin_status(request):
    """Check if current user is admin - lightweight endpoint"""
    try:
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        return Response({
            'is_admin': user_profile.user_type == 'admin',
            'user_type': user_profile.user_type,
            'username': request.user.username
        })
        
    except Exception as e:
        return Response(
            {'error': f'Server error: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )