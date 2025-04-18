from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from hms import settings


admin.site.site_header = 'HMS'
admin.site.index_title = "HMS ADMIN PORTAL"

urlpatterns = [
    path('', include('api.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
]

if settings.DEBUG == True:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


