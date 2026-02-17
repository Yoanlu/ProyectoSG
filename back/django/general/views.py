from django.contrib.auth.models import User
"""
Contiene los endpoint de mantenimientos general.
"""
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from general.serializers import *
from general.models import *
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from sangarcia.Permissions import BasePermissions
from rest_framework.permissions import IsAuthenticated
from sangarcia.CustomError import CustomError
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from django.views.generic import View
from django.shortcuts import render
from django.conf import settings

class IdiomasViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Idiomas.objects.all()
    serializer_class = IdiomasSerializer
    permission_classes = (BasePermissions,)

    def list(self, request):
        # Filtramos por los idiomas disponibles en la aplicación
        languages_list = [lang[0] for lang in settings.LANGUAGES]
        
        queryset = Idiomas.objects.all().filter(codigo__in=languages_list)
        serializer = ReadIdiomasSerializer(
            queryset, context={'request': request}, many=True)
        return Response(serializer.data)



class TraduccionesViewSet(viewsets.ModelViewSet):
    queryset = Traducciones.objects.all()
    serializer_class = TraduccionesSerializer
    permission_classes = (BasePermissions,)

    @action(methods=['post'], detail=True,
            url_path='traducciones', url_name='traducciones')
    def getTraduccionesRegistros(self, request, pk):
        columna = request.data["columna"]
        tabla = request.data["tabla"]

        traducciones = Traducciones.objects.filter(
            columna_id=pk, columna=columna,  tabla=tabla)

        serializer = TraduccionesSerializer(traducciones, many=True)

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        traduccion = Traducciones.objects.get(id=pk)
        Traducciones.objects.deleteTraduccionCache(
            traduccion.columna_id, traduccion.tabla, traduccion.columna, traduccion.idioma)
        traduccion.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

