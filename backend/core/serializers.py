from rest_framework import serializers
from .models import (
    Property,
    Topic,
    Document,
    PropertyImage,
    Note,
)

class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ["id", "property", "title", "created_at"]
        read_only_fields = ["id", "created_at"]

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["id", "property", "topic", "file", "uploaded_at"]
        read_only_fields = ["id", "uploaded_at"]

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "property", "image", "uploaded_at"]
        read_only_fields = ["id", "uploaded_at"]

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "property", "content", "created_at"]
        read_only_fields = ["id", "created_at"]

class PropertySerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    documents = DocumentSerializer(many=True, read_only=True)
    images = PropertyImageSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            "id",
            "owner",
            "address",
            "description",
            "created_at",
            "topics",
            "documents",
            "images",
            "notes",
        ]
        read_only_fields = ["id", "owner", "created_at"]
