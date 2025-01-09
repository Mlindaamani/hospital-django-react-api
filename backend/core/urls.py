"""
URL configuration for core project.
"""
from django.contrib import admin
from rest_framework.urls import views
from django.urls import path, include


# Admit site customization
admin.site.site_header = 'EBOT API'
admin.site.index_title = "Ebot Admin"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include('rest_framework.urls')),
]


