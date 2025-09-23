import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User

user = User.objects.get(email='ghostpavilionmusic@gmail.com')
user.set_password('Theside!12')
user.save()
print(f'Password for {user.email} has been reset to: Theside!12')