from django.db import models
from django.contrib.auth.models import User


class Property(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="properties"
    )
    address = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address


class Topic(models.Model):
    """
    A user-defined grouping (e.g. 'Kitchen', 'Roof', etc.) within a Property.
    """
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="topics"
    )
    title = models.CharField(
        max_length=255,
        default="",       # provide a default so existing rows (none) are populated
        blank=True        # allow form validation to accept empty initial values
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.property.address})"


class Document(models.Model):
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="documents",
        null=True,
        blank=True
    )
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="documents",
        null=True,
        blank=True
    )
    file = models.FileField(upload_to="documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        prop_addr = self.property.address if self.property else "Unassigned"
        return f"Document for {prop_addr} - {self.file.name}"


class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images",
        null=True,
        blank=True
    )
    image = models.ImageField(upload_to="property_images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        prop_addr = self.property.address if self.property else "Unassigned"
        return f"Image for {prop_addr} - {self.image.name}"


class Note(models.Model):
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="notes",
        null=True,
        blank=True
    )
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="notes",
        null=True,
        blank=True
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        prop_addr = self.property.address if self.property else "Unassigned"
        date_str = self.created_at.strftime('%Y-%m-%d')
        return f"Note for {prop_addr} ({date_str})"
