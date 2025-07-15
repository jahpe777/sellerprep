from rest_framework import viewsets, permissions, parsers, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

from .models import Property, Topic, Document, PropertyImage, Note
from .serializers import (
    PropertySerializer,
    TopicSerializer,
    DocumentSerializer,
    PropertyImageSerializer,
    NoteSerializer,
)

@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")

    if not username or not password or not email:
        return Response(
            {"error": "All fields required"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already in use"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username, password=password, email=email
    )
    return Response(
        {
            "message": "User created successfully",
            "username": user.username,
            "email": user.email,
        },
        status=status.HTTP_201_CREATED,
    )


class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Topic.objects.filter(property__owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_queryset(self):
        return Document.objects.filter(property__owner=self.request.user)

    def perform_create(self, serializer):
        prop_id = self.request.data.get("property")
        topic_id = self.request.data.get("topic")
        serializer.save(property_id=prop_id, topic_id=topic_id)


class PropertyImageViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_queryset(self):
        return PropertyImage.objects.filter(property__owner=self.request.user)

    def perform_create(self, serializer):
        prop_id = self.request.data.get("property")
        serializer.save(property_id=prop_id)


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(property__owner=self.request.user)

    def perform_create(self, serializer):
        prop_id = self.request.data.get("property")
        serializer.save(property_id=prop_id)
