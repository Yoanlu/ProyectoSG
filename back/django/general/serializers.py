from rest_framework import serializers
from general.models import *
from drf_base64.serializers import ModelSerializer
from django.conf import settings
from django.http import request
import os


class IdiomasSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='nombreTraduccion', read_only=True)

    class Meta:
        model = Idiomas
        fields = '__all__'


class TraduccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traducciones
        fields = '__all__'

