from rest_framework import serializers
from .models import Actividad # Asegúrate de que el nombre coincida con tu clase en models.py

class ActividadSerializer(serializers.ModelSerializer):
    # Creamos un campo nuevo que busca en 'fiesta' el atributo 'festividad'
    nombre_festividad = serializers.ReadOnlyField(source='fiesta.festividad')

    class Meta:
        model = Actividad
        # Añadimos 'nombre_festividad' a la lista de campos
        fields = ['id', 'nombre', 'duracion', 'fiesta', 'nombre_festividad']