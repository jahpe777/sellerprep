from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string


def send_welcome_email(user):
    subject = 'Welcome to SellerPrep!'
    message = render_to_string('emails/welcome.html', {
        'user': user,
    })
    send_mail(
        subject,
        '',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=message,
        fail_silently=False,
    )


def send_waitlist_confirmation(email):
    subject = 'You\'re on the SellerPrep Waitlist!'
    message = render_to_string('emails/waitlist_confirmation.html', {
        'email': email,
    })
    send_mail(
        subject,
        '',
        settings.DEFAULT_FROM_EMAIL,
        [email],
        html_message=message,
        fail_silently=False,
    )


def send_export_confirmation(user, property_address):
    subject = 'Your Property Export is Ready'
    message = render_to_string('emails/export_confirmation.html', {
        'user': user,
        'property_address': property_address,
    })
    send_mail(
        subject,
        '',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=message,
        fail_silently=False,
    )


def send_payment_success(user, property_address, amount):
    subject = 'Payment Successful - SellerPrep'
    message = render_to_string('emails/payment_success.html', {
        'user': user,
        'property_address': property_address,
        'amount': amount,
    })
    send_mail(
        subject,
        '',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=message,
        fail_silently=False,
    )


def send_payment_failure(user, property_address, error_message):
    subject = 'Payment Failed - SellerPrep'
    message = render_to_string('emails/payment_failure.html', {
        'user': user,
        'property_address': property_address,
        'error_message': error_message,
    })
    send_mail(
        subject,
        '',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=message,
        fail_silently=False,
    )


def send_subscription_update(user, subscription_status, subscription_tier):
    subject = 'Subscription Update - SellerPrep'
    message = render_to_string('emails/subscription_update.html', {
        'user': user,
        'subscription_status': subscription_status,
        'subscription_tier': subscription_tier,
    })
    send_mail(
        subject,
        '',
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        html_message=message,
        fail_silently=False,
    )