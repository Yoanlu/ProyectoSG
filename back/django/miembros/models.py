import os
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _
import logging

logger = logging.getLogger(__name__)
class Miembro(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    tarea = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    
    
def ruta_documentos_miembro(instance, filename):
    # Organiza los archivos en carpetas por el ID del miembro
    return f'miembros/documentos/{instance.miembro.id}/{filename}'

class MiembroDocumento(models.Model):
    """Documentos asociados a los miembros del equipo"""

    miembro = models.ForeignKey(
        Miembro,
        on_delete=models.CASCADE,
        related_name="documentos",
        verbose_name=_("Miembro")
    )
    
    # Si no tienes un modelo "TipoDocumento", puedes usar un CharField con opciones
    TIPO_CHOICES = [
        ('identificacion', 'Identificación/DNI'),
        ('contrato', 'Contrato Laboral'),
        ('titulo', 'Título Académico'),
        ('otros', 'Otros'),
    ]
    tipo_documento = models.CharField(
        max_length=50, 
        choices=TIPO_CHOICES,

        default='otros',
        verbose_name=_("Tipo de documento")
    )

    documento = models.FileField(
        upload_to=ruta_documentos_miembro,
        verbose_name=_("Archivo"),
        null=True, 
        blank=True
    )

    nombre_documento = models.CharField(
        max_length=100,
        verbose_name=_("Nombre descriptivo"),
        blank=True # Permitimos que sea opcional para que el save() lo rellene
    )

    observaciones = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Documento de miembro"
        verbose_name_plural = "Documentos de miembros"
        ordering = ["-fecha_creacion"]

    def __str__(self):
        return f"{self.nombre_documento} ({self.miembro.nombre})"

    def save(self, *args, **kwargs):
        # Si el usuario no pone nombre, usamos el nombre real del archivo
        if self.documento and not self.nombre_documento:
            self.nombre_documento = os.path.basename(self.documento.name)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Borramos el archivo del disco cuando se borra el registro
        if self.documento:
            if os.path.isfile(self.documento.path):
                os.remove(self.documento.path)
        super().delete(*args, **kwargs)