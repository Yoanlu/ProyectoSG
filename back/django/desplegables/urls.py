from rest_framework.urlpatterns import format_suffix_patterns
from django.urls import include, re_path, path
from rest_framework.routers import DefaultRouter
from desplegables import views

router = DefaultRouter()
router.register(r'usuarios', views.UsuariosViewSet)

urlpatterns = [
    re_path(r'^', include(router.urls)),
]