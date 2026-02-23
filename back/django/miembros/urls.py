from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views # Asegúrate de que tus ViewSets estén en views.py

router = DefaultRouter()

# Aquí definimos los "nombres" que aparecerán en la URL
router.register(r'miembros', views.MiembroViewSet) 
router.register(r'documentos-miembros', views.MiembroDocumentoViewSet)

urlpatterns = [
    # Usamos cadena vacía para que use la raíz (api/v1/) definida en el principal
    path('', include(router.urls)),
]