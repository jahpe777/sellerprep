from rest_framework import serializers
import os
from .models import Property, Section, Document, PropertyImage, Note, WaitlistSignup

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ["id", "property", "title", "created_at"]
        read_only_fields = ["id", "created_at"]

class DocumentSerializer(serializers.ModelSerializer):
    url = serializers.FileField(source="file", read_only=True)
    filename = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = [
            "id", "property", "section",
            "file", "url", "filename", "uploaded_at"
        ]
        read_only_fields = ["id", "url", "filename", "uploaded_at"]

    def get_filename(self, obj):
        return os.path.basename(obj.file.name)

class PropertyImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    filename = serializers.SerializerMethodField()

    class Meta:
        model = PropertyImage
        fields = [
            "id", "property", "section",
            "image", "url", "filename", "uploaded_at"
        ]
        read_only_fields = ["id", "url", "filename", "uploaded_at"]

    def get_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)

    def get_filename(self, obj):
        return os.path.basename(obj.image.name)

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "property", "section", "content", "created_at"]
        read_only_fields = ["id", "created_at"]

class PropertySerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    images = PropertyImageSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            "id", "owner", "address", "description", "created_at",
            "sections", "documents", "images", "notes",
        ]
        read_only_fields = ["id", "owner", "created_at"]


class WaitlistSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistSignup
        fields = ["id", "email", "created_at"]
        read_only_fields = ["id", "created_at"]
