from django.core.management.base import BaseCommand
from django.conf import settings
import sendgrid
from sendgrid.helpers.mail import Mail

class Command(BaseCommand):
    help = 'Test SendGrid API directly'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Email address to send test email to')

    def handle(self, *args, **options):
        test_email = options['email']
        
        try:
            # Get API key from settings
            api_key = settings.EMAIL_HOST_PASSWORD
            if not api_key or api_key == 'your_sendgrid_api_key_here':
                self.stdout.write(
                    self.style.ERROR('SENDGRID_API_KEY not set in .env file')
                )
                return

            sg = sendgrid.SendGridAPIClient(api_key=api_key)
            message = Mail(
                from_email=settings.DEFAULT_FROM_EMAIL,
                to_emails=test_email,
                subject='SellerPrep Email Test (SendGrid API)',
                plain_text_content='This is a test email from SellerPrep using SendGrid API. If you received this, your email configuration is working correctly!'
            )
            
            response = sg.send(message)
            self.stdout.write(
                self.style.SUCCESS(f'SendGrid API email sent successfully to {test_email}. Status: {response.status_code}')
            )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Failed to send SendGrid API email: {str(e)}')
            )