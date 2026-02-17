from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.conf import settings
import os
from django.db.models.aggregates import Count

class Usuarios(User):

    class Meta:
        proxy = True
        ordering = ('first_name', )



class User_Detalle(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name="detalle",
                                   blank=False, null=False, help_text="usuario", verbose_name=_('usuario'))
    telefono = models.CharField(_("telefono"), max_length=20,
                                null=True, blank=True, help_text="telefono del contacto")

    def __str__(self):
        return self.usuario.username

    class Meta:
        verbose_name = _('Detalle de usuario')
        verbose_name_plural = _('Detalles de usuarios')
    class PrivacyMeta:
        fields = ['telefono']