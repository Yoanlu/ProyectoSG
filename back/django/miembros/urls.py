from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.MiembroViewSet) # Registra todas las rutas del ViewSet

urlpatterns = [
    path('', include(router.urls)),
]