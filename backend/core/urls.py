# src/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    register,
    PropertyViewSet,
    SectionViewSet,
    DocumentViewSet,
    PropertyImageViewSet,
    NoteViewSet,
)

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
    path("",               include(router.urls)),
]
