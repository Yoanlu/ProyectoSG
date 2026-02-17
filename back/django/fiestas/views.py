from rest_framework import viewsets
from .models import Fiesta
from .serializers import FiestaSerializer

class FiestaViewSet(viewsets.ModelViewSet):
    queryset = Fiesta.objects.all()
    serializer_class = FiestaSerializer