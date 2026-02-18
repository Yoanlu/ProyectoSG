from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActividadViewSet  # Asegúrate de que tu ViewSet se llame así

router = DefaultRouter()
router.register(r'', ActividadViewSet) # Dejamos r'' para que sea /api/v1/actividades/

urlpatterns = [
    path('', include(router.urls)),
]