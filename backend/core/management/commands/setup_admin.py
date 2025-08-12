# core/management/commands/setup_admin.py

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import UserProfile


class Command(BaseCommand):
    help = 'Set up JamesHiggs as admin and create UserProfiles for existing users'

    def handle(self, *args, **options):
        # Set up JamesHiggs as admin
        try:
            james_user = User.objects.get(email='james.y.higgs@gmail.com')
            james_profile, created = UserProfile.objects.get_or_create(user=james_user)
            james_profile.user_type = 'admin'
            james_profile.save()
            
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created admin profile for {james_user.username}')
                )
            else:
                self.stdout.write(
                    self.style.SUCCESS(f'Updated {james_user.username} to admin')
                )
                
        except User.DoesNotExist:
            self.stdout.write(
                self.style.ERROR('User with email james.y.higgs@gmail.com not found')
            )
        
        # Create UserProfiles for any existing users without them
        users_without_profiles = User.objects.filter(userprofile__isnull=True)
        created_count = 0
        
        for user in users_without_profiles:
            UserProfile.objects.create(user=user, user_type='individual')
            created_count += 1
        
        if created_count > 0:
            self.stdout.write(
                self.style.SUCCESS(f'Created {created_count} user profiles for existing users')
            )
        else:
            self.stdout.write(
                self.style.SUCCESS('All users already have profiles')
            )