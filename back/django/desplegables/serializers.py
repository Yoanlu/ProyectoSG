from typing import Text
from rest_framework import serializers
from drf_base64.serializers import ModelSerializer
from django.contrib.auth.models import User

class ListaUserSerializer(serializers.ModelSerializer):
    texto = serializers.SerializerMethodField()

    def get_texto(self, obj):
        return '{} {}'.format(obj.first_name, obj.last_name)

    class Meta:
        model = User
        fields = ('id','texto')
