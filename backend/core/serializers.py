from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'owner', 'address', 'description', 'created_at']
        read_only_fields = ['id', 'owner', 'created_at']
