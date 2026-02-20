from rest_framework import viewsets
from .models import Fiesta
from actividades.models import Actividad
from .serializers import FiestaSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter

class FiestaViewSet(viewsets.ModelViewSet):
    queryset = Fiesta.objects.all().prefetch_related('actividades')
    serializer_class = FiestaSerializer

    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    #Filtrado concretos
    filterset_fields = {
        'festividad': ['icontains'],
        'inicio': ['exact', 'gte', 'lte'],
        'fin': ['exact', 'gte', 'lte'],
        'actividades__nombre': ['icontains', 'exact'], 
        'actividades__id': ['exact'],
    }
    #Filtrado general
    search_fields = ['festividad', 'actividades__nombre']

    def get_queryset(self):
        return Fiesta.objects.prefetch_related('actividades').all()