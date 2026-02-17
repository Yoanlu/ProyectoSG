from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import include, re_path
from django.urls import path
from rest_framework.routers import DefaultRouter
from general import views

router = DefaultRouter()
router.register(r'idiomas', views.IdiomasViewSet)
router.register(r'traducciones', views.TraduccionesViewSet)

urlpatterns = [
    re_path(r'^', include(router.urls)),
]
