from rest_framework import viewsets
from .models import Miembro, MiembroDocumento
from .serializers import MiembroSerializer, MiembroDocumentoSerializer
from django.http import JsonResponse
from rest_framework.decorators import action

class MiembroViewSet(viewsets.ModelViewSet):
    queryset = Miembro.objects.all().select_related('pagador')
    serializer_class = MiembroSerializer

class MiembroDocumentoViewSet(viewsets.ModelViewSet):
    queryset = MiembroDocumento.objects.all()
    serializer_class = MiembroDocumentoSerializer
    
    # Opcional: Filtrar para que puedas buscar documentos por miembro fácilmente
    filterset_fields = ['miembro']

    @action(detail=False, methods=['get'])
    def exportar_pagos(self, request):
        # Obtenemos todos los miembros
        miembros = Miembro.objects.all()
        
        # Construimos la lista de diccionarios
        datos_pagos = []
        for m in miembros:
            # Solo incluimos a los que tienen DNI para evitar errores en el JSON
            if m.dni:
                datos_pagos.append({
                    "dni": m.dni,
                    "nombre_completo": f"{m.nombre} {m.apellido}",
                    "importe_total": float(m.total_a_pagar()) # Convertimos Decimal a float
                })

        # Retornamos el JSON como un archivo descargable
        response = JsonResponse(datos_pagos, safe=False, json_dumps_params={'indent': 4})
        response['Content-Disposition'] = 'attachment; filename="remesa_pagos.json"'
        return response