# src/api/views.py

import os
from rest_framework import viewsets, permissions, parsers, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.http import FileResponse, HttpResponse
from django.template.loader import render_to_string

from weasyprint import HTML

from .models import Property, Section, Document, PropertyImage, Note, UserProfile, Payment
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
        return Response({"error": "All fields required"},
                        status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"},
                        status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already in use"},
                        status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username,
                                    password=password,
                                    email=email)
    return Response({"message": "User created successfully",
                     "username": user.username,
                     "email": user.email},
                    status=status.HTTP_201_CREATED)


class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Property.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=["get"], url_path="export")
    def export(self, request, pk=None):
        prop = self.get_object()
        
        # Check export permissions
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        # Check if user can export for free or has paid for this property
        can_export_free = user_profile.can_export_free
        has_paid = Payment.objects.filter(
            user=request.user,
            property=prop,
            status='succeeded'
        ).exists()
        
        if not can_export_free and not has_paid:
            return Response(
                {'error': 'Payment required to export this property. Please complete payment first.'},
                status=status.HTTP_402_PAYMENT_REQUIRED
            )

        # Gather all related items
        all_sections = list(prop.sections.order_by("created_at"))
        all_docs     = list(prop.documents.order_by("uploaded_at"))
        all_images   = list(prop.images.order_by("uploaded_at"))
        all_notes    = list(prop.notes.order_by("created_at"))

        # Build per‑section buckets
        sections_data = []
        for sec in all_sections:
            docs = []
            for d in all_docs:
                if d.section_id == sec.id:
                    docs.append({
                        "filename": os.path.basename(d.file.name),
                        "uploaded": d.uploaded_at.strftime("%Y-%m-%d"),
                        "url":      request.build_absolute_uri(d.file.url),
                    })

            imgs = []
            for i in all_images:
                if getattr(i, "section_id", None) == sec.id:
                    imgs.append({
                        "filename": os.path.basename(i.image.name),
                        "uploaded": i.uploaded_at.strftime("%Y-%m-%d"),
                        "url":      request.build_absolute_uri(i.image.url),
                    })

            nts = []
            for n in all_notes:
                if getattr(n, "section_id", None) == sec.id:
                    nts.append({
                        "content": n.content,
                        "created": n.created_at.strftime("%Y-%m-%d"),
                    })

            sections_data.append({
                "title":     sec.title,
                "documents": docs,
                "images":    imgs,
                "notes":     nts,
            })

        # Render HTML and convert to PDF
        html_string = render_to_string("export/property_export.html", {
            "property":      prop,
            "sections_data": sections_data,
        })
        html = HTML(string=html_string,
                    base_url=request.build_absolute_uri("/"))
        pdf  = html.write_pdf()

        # Increment export count if this is a first free export
        if can_export_free and user_profile.properties_exported == 0:
            user_profile.properties_exported += 1
            user_profile.save()
        
        response = HttpResponse(pdf, content_type="application/pdf")
        response["Content-Disposition"] = (
            f'attachment; filename="property_{prop.id}.pdf"'
        )
        return response


class SectionViewSet(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        prop_id = self.request.query_params.get("property")
        if prop_id:
            return Section.objects.filter(
                property_id=prop_id,
                property__owner=self.request.user
            )
        return Section.objects.none()

    def perform_create(self, serializer):
        prop = serializer.validated_data.get("property")
        if prop.owner != self.request.user:
            raise PermissionDenied(
                "Cannot add a section to another user's property."
            )
        serializer.save()


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_queryset(self):
        qs = Document.objects.filter(property__owner=self.request.user)
        prop_id    = self.request.query_params.get("property")
        section_id = self.request.query_params.get("section")
        if prop_id:
            qs = qs.filter(property_id=prop_id)
        if section_id:
            qs = qs.filter(section_id=section_id)
        return qs

    def perform_create(self, serializer):
        prop_id    = self.request.data.get("property")
        section_id = self.request.data.get("section")
        if not Property.objects.filter(
            id=prop_id, owner=self.request.user
        ).exists():
            raise PermissionDenied(
                "Cannot upload a document to another user's property."
            )
        serializer.save(property_id=prop_id, section_id=section_id)

    @action(detail=True, methods=["get"], url_path="view",
            permission_classes=[AllowAny])
    def view_file(self, request, pk=None):
        doc      = self.get_object()
        response = FileResponse(
            doc.file.open("rb"),
            as_attachment=False,
            filename=doc.file.name
        )
        ext = doc.file.name.split(".").pop().lower()
        if ext in ("doc", "docx"):
            response["Content-Type"] = (
                "application/vnd.openxmlformats-officedocument."
                "wordprocessingml.document"
            )
        elif ext in ("xls", "xlsx"):
            response["Content-Type"] = (
                "application/vnd.openxmlformats-officedocument."
                "spreadsheetml.sheet"
            )
        elif ext in ("ppt", "pptx"):
            response["Content-Type"] = (
                "application/vnd.openxmlformats-officedocument."
                "presentationml.presentation"
            )
        elif ext == "pdf":
            response["Content-Type"] = "application/pdf"
        response["Access-Control-Allow-Origin"] = "*"
        return response


class PropertyImageViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyImageSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get_queryset(self):
        qs = PropertyImage.objects.filter(property__owner=self.request.user)
        prop_id    = self.request.query_params.get("property")
        section_id = self.request.query_params.get("section")
        if prop_id:
            qs = qs.filter(property_id=prop_id)
        if section_id:
            qs = qs.filter(section_id=section_id)
        return qs

    def perform_create(self, serializer):
        prop_id    = self.request.data.get("property")
        section_id = self.request.data.get("section")
        if not Property.objects.filter(
            id=prop_id, owner=self.request.user
        ).exists():
            raise PermissionDenied(
                "Cannot upload an image to another user's property."
            )
        serializer.save(property_id=prop_id, section_id=section_id)


class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [
        parsers.JSONParser,
        parsers.MultiPartParser,
        parsers.FormParser,
    ]

    def get_queryset(self):
        qs = Note.objects.filter(property__owner=self.request.user)
        prop_id    = self.request.query_params.get("property")
        section_id = self.request.query_params.get("section")
        if prop_id:
            qs = qs.filter(property_id=prop_id)
        if section_id:
            qs = qs.filter(section_id=section_id)
        return qs

    def perform_create(self, serializer):
        prop_id    = self.request.data.get("property")
        section_id = self.request.data.get("section")
        if not Property.objects.filter(
            id=prop_id, owner=self.request.user
        ).exists():
            raise PermissionDenied(
                "Cannot add a note to another user's property."
            )
        serializer.save(property_id=prop_id, section_id=section_id)
