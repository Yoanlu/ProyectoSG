from rest_framework import viewsets
from .models import Miembro, MiembroDocumento
from .serializers import MiembroSerializer, MiembroDocumentoSerializer

class MiembroViewSet(viewsets.ModelViewSet):
    queryset = Miembro.objects.all()
    serializer_class = MiembroSerializer

class MiembroDocumentoViewSet(viewsets.ModelViewSet):
    queryset = MiembroDocumento.objects.all()
    serializer_class = MiembroDocumentoSerializer
    
    # Opcional: Filtrar para que puedas buscar documentos por miembro fácilmente
    filterset_fields = ['miembro']