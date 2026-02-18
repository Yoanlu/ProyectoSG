from rest_framework import serializers
from .models import Fiesta 
from actividades.serializers import ActividadSerializer

class FiestaSerializer(serializers.ModelSerializer):
    actividades = ActividadSerializer(many=True, read_only=True)
    # Creamos un campo nuevo para el texto de la tabla
    resumen_actividades = serializers.SerializerMethodField()

    class Meta:
        model = Fiesta
        fields = ['id', 'festividad', 'inicio', 'fin', 'actividades', 'resumen_actividades']

    # Esta función busca los nombres de las actividades y los junta
    def get_resumen_actividades(self, obj):
        # 'obj' es la instancia de la Fiesta actual
        # Sacamos los nombres de todas sus actividades
        nombres = obj.actividades.values_list('nombre', flat=True)
        # Los unimos con una coma
        return ", ".join(nombres) if nombres else "Sin actividades"