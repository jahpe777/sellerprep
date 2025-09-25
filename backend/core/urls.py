# src/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    register,
    waitlist_signup,
    PropertyViewSet,
    SectionViewSet,
    DocumentViewSet,
    PropertyImageViewSet,
    NoteViewSet,
)
from .payment_views import (
    create_payment_intent,
    confirm_payment,
    check_export_permission,
    make_user_admin,
    list_users,
    check_admin_status,
)
from .webhook_views import stripe_webhook

router = DefaultRouter()
router.register(r"properties", PropertyViewSet, basename="property")
router.register(r"sections",   SectionViewSet,  basename="section")
router.register(r"documents",  DocumentViewSet, basename="document")
router.register(r"images",     PropertyImageViewSet, basename="image")
router.register(r"notes",      NoteViewSet,     basename="note")

urlpatterns = [
    path("token/",         TokenObtainPairView.as_view(),  name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(),     name="token_refresh"),
    path("register/",      register,                       name="register"),
    path("waitlist/",      waitlist_signup,                name="waitlist_signup"),
    path("payments/create-intent/", create_payment_intent, name="create_payment_intent"),
    path("payments/confirm/", confirm_payment, name="confirm_payment"),
    path("payments/check-permission/", check_export_permission, name="check_export_permission"),
    path("admin/make-admin/", make_user_admin, name="make_user_admin"),
    path("admin/users/", list_users, name="list_users"),
    path("admin/check-status/", check_admin_status, name="check_admin_status"),
    path("webhooks/stripe/", stripe_webhook, name="stripe_webhook"),
    path("",               include(router.urls)),
]
