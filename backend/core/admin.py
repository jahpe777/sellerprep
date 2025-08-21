from django.contrib import admin
from .models import Property, Section, Document, PropertyImage, Note, WaitlistSignup, UserProfile, Payment

@admin.register(WaitlistSignup)
class WaitlistSignupAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('email',)
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('address', 'owner', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('address', 'owner__username')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'user_type', 'subscription_status', 'created_at')
    list_filter = ('user_type', 'subscription_status')
    search_fields = ('user__username', 'user__email')

# Register other models with basic admin
admin.site.register(Section)
admin.site.register(Document)
admin.site.register(PropertyImage)
admin.site.register(Note)
admin.site.register(Payment)
