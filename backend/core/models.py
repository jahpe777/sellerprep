# src/api/models.py

from django.db import models
from django.conf import settings

class Property(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="properties"
    )
    address = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address


class Section(models.Model):
    property = models.ForeignKey(
        Property,
        related_name='sections',
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'section'
        verbose_name_plural = 'sections'

    def __str__(self):
        return self.title


class Document(models.Model):
    property = models.ForeignKey(
        Property,
        related_name='documents',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    section = models.ForeignKey(
        Section,
        related_name='documents',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name


class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property,
        related_name='images',
        on_delete=models.CASCADE
    )
    section = models.ForeignKey(
        Section,
        related_name='images',
        on_delete=models.CASCADE,
        null=True,    # ← allow NULL for existing rows
        blank=True    # ← allow blank in forms
    )
    image = models.ImageField(upload_to='property_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.image.name


class Note(models.Model):
    property = models.ForeignKey(
        Property,
        related_name='notes',
        on_delete=models.CASCADE
    )
    section = models.ForeignKey(
        Section,
        related_name='notes',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Note {self.id} on {self.property}"
