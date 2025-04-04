
from django.contrib import admin
from django.urls import path, include

admin.site.site_header = 'HMS'
admin.site.index_title = "HMS ADMIN PORTAL"

urlpatterns = [
    path('', include('api.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
]


