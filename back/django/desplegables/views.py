from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.decorators import action, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from sangarcia.Permissions import BasePermissions
from django.contrib.auth.models import User
from desplegables.serializers import *
from django.shortcuts import render


class UsuariosViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = User.objects.all()
    serializer_class = ListaUserSerializer
    permission_classes = (BasePermissions,)
