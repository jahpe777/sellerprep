import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import UserProfile
from .email_utils import send_subscription_update


@csrf_exempt
@require_POST
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    webhook_secret = getattr(settings, 'STRIPE_WEBHOOK_SECRET', None)

    if not webhook_secret:
        return JsonResponse({'error': 'Webhook secret not configured'}, status=500)

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError as e:
        return JsonResponse({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        return JsonResponse({'error': 'Invalid signature'}, status=400)

    if event['type'] == 'customer.subscription.created':
        handle_subscription_created(event['data']['object'])
    elif event['type'] == 'customer.subscription.updated':
        handle_subscription_updated(event['data']['object'])
    elif event['type'] == 'customer.subscription.deleted':
        handle_subscription_deleted(event['data']['object'])
    elif event['type'] == 'invoice.payment_succeeded':
        handle_payment_succeeded(event['data']['object'])
    elif event['type'] == 'invoice.payment_failed':
        handle_payment_failed(event['data']['object'])

    return JsonResponse({'status': 'success'})


def handle_subscription_created(subscription):
    customer_id = subscription['customer']
    subscription_id = subscription['id']
    status = subscription['status']

    try:
        user_profile = UserProfile.objects.get(stripe_customer_id=customer_id)
        user_profile.stripe_subscription_id = subscription_id
        user_profile.subscription_status = 'active' if status == 'active' else status

        if subscription.get('items') and subscription['items']['data']:
            price_id = subscription['items']['data'][0]['price']['id']
            user_profile.subscription_tier = get_tier_from_price_id(price_id)

        user_profile.save()

        try:
            send_subscription_update(
                user_profile.user,
                user_profile.subscription_status,
                user_profile.subscription_tier
            )
        except Exception as e:
            pass

    except UserProfile.DoesNotExist:
        pass


def handle_subscription_updated(subscription):
    customer_id = subscription['customer']
    status = subscription['status']

    try:
        user_profile = UserProfile.objects.get(stripe_customer_id=customer_id)
        old_status = user_profile.subscription_status
        user_profile.subscription_status = 'active' if status == 'active' else status

        if subscription.get('items') and subscription['items']['data']:
            price_id = subscription['items']['data'][0]['price']['id']
            user_profile.subscription_tier = get_tier_from_price_id(price_id)

        user_profile.save()

        if old_status != user_profile.subscription_status:
            try:
                send_subscription_update(
                    user_profile.user,
                    user_profile.subscription_status,
                    user_profile.subscription_tier
                )
            except Exception as e:
                pass

    except UserProfile.DoesNotExist:
        pass


def handle_subscription_deleted(subscription):
    customer_id = subscription['customer']

    try:
        user_profile = UserProfile.objects.get(stripe_customer_id=customer_id)
        user_profile.subscription_status = 'cancelled'
        user_profile.save()

        try:
            send_subscription_update(
                user_profile.user,
                user_profile.subscription_status,
                user_profile.subscription_tier
            )
        except Exception as e:
            pass

    except UserProfile.DoesNotExist:
        pass


def handle_payment_succeeded(invoice):
    customer_id = invoice['customer']

    try:
        user_profile = UserProfile.objects.get(stripe_customer_id=customer_id)
        if user_profile.subscription_status == 'past_due':
            user_profile.subscription_status = 'active'
            user_profile.save()

            try:
                send_subscription_update(
                    user_profile.user,
                    user_profile.subscription_status,
                    user_profile.subscription_tier
                )
            except Exception as e:
                pass

    except UserProfile.DoesNotExist:
        pass


def handle_payment_failed(invoice):
    customer_id = invoice['customer']

    try:
        user_profile = UserProfile.objects.get(stripe_customer_id=customer_id)
        user_profile.subscription_status = 'past_due'
        user_profile.save()

        try:
            send_subscription_update(
                user_profile.user,
                user_profile.subscription_status,
                user_profile.subscription_tier
            )
        except Exception as e:
            pass

    except UserProfile.DoesNotExist:
        pass


def get_tier_from_price_id(price_id):
    tier_mapping = {
        'starter': 'starter',
        'professional': 'professional',
        'team': 'team',
    }

    for key, value in tier_mapping.items():
        if key in price_id.lower():
            return value

    return None