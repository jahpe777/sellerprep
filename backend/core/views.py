# src/api/views.py

from rest_framework import viewsets, permissions, parsers, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User
from django.http import FileResponse

from .models import Property, Section, Document, PropertyImage, Note
from .serializers import (
    PropertySerializer,
    SectionSerializer,
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
        return Response({"error": "All fields required"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already in use"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    return Response(
        {"message": "User created successfully", "username": user.username, "email": user.email},
        status=status.HTTP_201_CREATED,
    )

class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        prop_id = self.request.query_params.get("property")
        if prop_id:
            return Section.objects.filter(property_id=prop_id, property__owner=self.request.user)
        return Section.objects.none()

    def perform_create(self, serializer):
        prop = serializer.validated_data.get("property")
        if prop.owner != self.request.user:
            raise PermissionDenied("Cannot add a section to another user's property.")
        serializer.save()

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_queryset(self):
        qs = Document.objects.filter(property__owner=self.request.user)
        prop_id = self.request.query_params.get("property")
        if prop_id:
            qs = qs.filter(property_id=prop_id)
        section_id = self.request.query_params.get("section")
        if section_id:
            qs = qs.filter(section_id=section_id)
        return qs

    def perform_create(self, serializer):
        prop_id = self.request.data.get("property")
        section_id = self.request.data.get("section")
        if not Property.objects.filter(id=prop_id, owner=self.request.user).exists():
            raise PermissionDenied("Cannot upload a document to another user's property.")
        serializer.save(property_id=prop_id, section_id=section_id)

    @action(detail=True, methods=["get"], url_path="view")
    def view_file(self, request, pk=None):
        doc = self.get_object()
        return FileResponse(
            doc.file.open("rb"),
            as_attachment=False,
            filename=doc.file.name
        )

class PropertyImageViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_queryset(self):
        return PropertyImage.objects.filter(property__owner=self.request.user)

    def perform_create(self, serializer):
        prop_id = self.request.data.get("property")
        if not Property.objects.filter(id=prop_id, owner=self.request.user).exists():
            raise PermissionDenied("Cannot upload an image to another user's property.")
        serializer.save(property_id=prop_id)

class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(property__owner=self.request.user)

    def perform_create(self, serializer):
        prop_id = self.request.data.get("property")
        if not Property.objects.filter(id=prop_id, owner=self.request.user).exists():
            raise PermissionDenied("Cannot add a note to another user's property.")
        serializer.save(property_id=prop_id)