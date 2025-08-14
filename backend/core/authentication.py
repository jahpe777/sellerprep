# core/authentication.py

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User
from django.db.models import Q


class EmailBackend(ModelBackend):
    """
    Authenticate using email address instead of username.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # Check if the 'username' is actually an email
        if username is None:
            username = kwargs.get('email')
        
        if username is None or password is None:
            return None
        
        try:
            # Try to find user by email first, then by username
            user = User.objects.get(Q(email=username) | Q(username=username))
        except User.DoesNotExist:
            return None
        
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None