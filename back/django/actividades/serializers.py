from rest_framework import serializers
from .models import Actividad # Asegúrate de que el nombre coincida con tu clase en models.py

class ActividadSerializer(serializers.ModelSerializer):
    # Creamos un campo nuevo que busca en 'fiesta' el atributo 'festividad'
    nombre_festividad = serializers.ReadOnlyField(source='fiesta.festividad')
    resumen_asistentes = serializers.SerializerMethodField()

    class Meta:
        model = Actividad
        # Añadimos 'nombre_festividad' a la lista de campos
        fields = ['id', 'nombre', 'duracion', 'fiesta', 'nombre_festividad', 'resumen_asistentes']

    def get_resumen_asistentes(self, obj):
        # 'obj.asistentes' funciona porque usamos related_name='asistentes' en el modelo Asistencia
        # Sacamos los nombres de los miembros a través de la relación de asistencia
        asistencias = obj.asistentes.all()
        nombres = [a.miembro.nombre for a in asistencias]
        
        return ", ".join(nombres) if nombres else "Nadie apuntado"