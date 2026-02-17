from rest_framework import serializers
from .models import Fiesta # Asegúrate de que el nombre coincida con tu clase en models.py

class FiestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fiesta
        fields = '__all__'