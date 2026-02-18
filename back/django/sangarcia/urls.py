from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings

# En tu urls.py de Django
urlpatterns = [
    path('admin/', admin.site.urls),
    path('oauth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    
    path('api/v1/miembros/', include('miembros.urls')), 
    path('api/v1/fiestas/', include('fiestas.urls')), 
    path('api/v1/actividades/', include('actividades.urls')),

    # endpoints api
    path('api/v1/seguridad/', include('seguridad.urls')),
    path('api/v1/general/', include('general.urls')),
    path('api/v1/desplegables/', include('desplegables.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
