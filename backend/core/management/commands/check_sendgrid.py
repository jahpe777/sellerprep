from django.core.management.base import BaseCommand
from django.conf import settings
import urllib.request
import json
import ssl

class Command(BaseCommand):
    help = 'Check SendGrid API key validity'

    def handle(self, *args, **options):
        api_key = settings.EMAIL_HOST_PASSWORD
        
        if not api_key or api_key == 'your_sendgrid_api_key_here':
            self.stdout.write(
                self.style.ERROR('SENDGRID_API_KEY not set in .env file')
            )
            return
            
        self.stdout.write(f'Testing API key: {api_key[:10]}...')
        
        try:
            # Create SSL context that doesn't verify certificates (for testing only)
            ssl_context = ssl.create_default_context()
            ssl_context.check_hostname = False
            ssl_context.verify_mode = ssl.CERT_NONE
            
            # Test API key by calling SendGrid API
            req = urllib.request.Request('https://api.sendgrid.com/v3/user/profile')
            req.add_header('Authorization', f'Bearer {api_key}')
            
            with urllib.request.urlopen(req, context=ssl_context) as response:
                data = json.loads(response.read().decode())
                self.stdout.write(
                    self.style.SUCCESS(f'SendGrid API key is valid! User: {data.get("username", "Unknown")}')
                )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'SendGrid API key test failed: {str(e)}')
            )