# src/api/models.py

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class UserProfile(models.Model):
    USER_TYPES = [
        ('individual', 'Individual'),
        ('agent', 'Agent'),
        ('client', 'Client'),
        ('admin', 'Admin'),
    ]
    
    SUBSCRIPTION_STATUS = [
        ('none', 'None'),
        ('active', 'Active'),
        ('cancelled', 'Cancelled'),
        ('past_due', 'Past Due'),
    ]
    
    SUBSCRIPTION_TIERS = [
        ('starter', 'Starter Agent'),
        ('professional', 'Professional Agent'),
        ('team', 'Team/Brokerage'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='individual')
    parent_agent = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True,
        related_name='clients'
    )
    subscription_status = models.CharField(max_length=20, choices=SUBSCRIPTION_STATUS, default='none')
    subscription_tier = models.CharField(max_length=20, choices=SUBSCRIPTION_TIERS, null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=255, null=True, blank=True)
    stripe_subscription_id = models.CharField(max_length=255, null=True, blank=True)
    properties_exported = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} ({self.user_type})"

    @property
    def can_export_free(self):
        # Admins can always export free
        if self.user_type == 'admin':
            return True
        # Agent subscribers export free
        if self.subscription_status == 'active':
            return True
        # Clients of agent subscribers export free
        if self.parent_agent and hasattr(self.parent_agent, 'userprofile'):
            return self.parent_agent.userprofile.subscription_status == 'active'
        # Individual users must pay for each property export
        return False


class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey('Property', on_delete=models.CASCADE)
    stripe_payment_intent_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='usd')
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} - ${self.amount} by {self.user.username}"


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
