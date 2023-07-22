from rest_framework.permissions import BasePermission
from django.conf import settings


class IsCorsAllowed(BasePermission):

    def has_permission(self, request, view):
        origin = request.META.get("HTTP_ORIGIN")
        if origin is None:
            return True
        if origin in settings.CORS_ALLOWED_ORIGINS:
            return True
        return False
