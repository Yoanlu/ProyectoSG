from rest_framework import serializers
from .models import Asistencia

class AsistenciaSerializer(serializers.ModelSerializer):
    nombre_miembro = serializers.ReadOnlyField(source='miembro.nombre')
    nombre_actividad = serializers.ReadOnlyField(source='actividad.nombre')

    class Meta:
        model = Asistencia
        fields = ['id', 'miembro', 'actividad', 'nombre_miembro', 'nombre_actividad']