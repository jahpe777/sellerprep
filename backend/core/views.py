from django.shortcuts import render
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import Property
from .serializers import PropertySerializer

@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    # Validate required fields
    if not username or not password or not email:
        return Response({'error': 'All fields required'}, status=status.HTTP_400_BAD_REQUEST)

    # Ensure username is unique
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # (Optional) Ensure email is unique
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already in use'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({
        'message': 'User created successfully',
        'username': user.username,
        'email': user.email,
    }, status=status.HTTP_201_CREATED)

class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)