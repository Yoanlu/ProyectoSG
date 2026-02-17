from django.db import models

from django.utils import translation
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from rest_framework import status
from sangarcia.CustomError import CustomError
from django.contrib.auth.models import User
from django.conf import settings
from django.core.cache import cache
import os
import logging

logger = logging.getLogger(__name__)

class TraduccionesManager(models.Manager):
    """
    Clase manejador de las traducciones
    """
    def getTraduccion(self, valor, id, tabla, columna):
        """
        Metodo que retorna la traduccion del contenido de un campo de cualquier tabla

            valor: valor original almacenado
            id: clave primaria del registro original
            tabla: tabla donde se encuentra el dato y que servira para filtrar la tabla de traducciones    
            columna: columna al la que hace referencia la traduccion
        """
        idioma = str(translation.get_language().lower())

        traducciones_cache = cache.get('cache_traducciones')
        if(traducciones_cache is None) :
            t_datos = Traducciones.objects.all()
            for item in t_datos:
                clave_traduccion = str(item.columna_id)+ "_" + str(item.tabla)+ "_" + str(item.columna) + "_" + str(item.idioma)
                cache.set( clave_traduccion, item.traduccion, None )
            cache.set('cache_traducciones', True, settings.CACHE_TIMEOUT)

        traduccion = cache.get(str(id) + "_" + str(tabla) + "_" + str(columna)  + "_" +  str(idioma) )

        if traduccion is not None:
            return traduccion
        elif len(idioma) > 2:
            #buscamos el idioma general por si existe
            general = idioma.split('-')
            idioma = general[0]
            traduccion = cache.get(str(id) + "_" + str(tabla) + "_" + str(columna)  + "_" +  str(idioma) )
            if(traduccion is not None and len(traduccion) > 0):
                return traduccion

        return valor

        ##########################################
        # version que busca en base de datos
        ##########################################
        # idioma = translation.get_language().lower()
        # if idioma == settings.LANGUAGE_CODE:
        #     return valor
        # traduccion = Traducciones.objects.filter(
        #     columna_id=id,  tabla=tabla, columna=columna, idioma=idioma).values_list('traduccion', flat=True)

        # if(len(traduccion) > 0):
        #     return traduccion[0]
        # elif len(idioma)>2:
        #     #buscamos el idioma general por si existe
        #     general = idioma.split('-')
        #     idioma = general[0]
        #     traduccion = Traducciones.objects.filter(
        #         columna_id=id,  tabla=tabla, columna=columna, idioma=idioma).values_list('traduccion', flat=True)
        #     if(len(traduccion) > 0):
        #         return traduccion[0]
        #
        #return valor
    def deleteTraducciones(self, id , tabla):
        """
        Metodo que elimina todas las traducciones de un registro de una tabla

            id: clave primaria del registro original
            tabla: tabla donde se encuentra el dato y que servira para filtrar la tabla de traducciones    

        """  

        traduccion = Traducciones.objects.filter(
            columna_id=id,  tabla=tabla ).delete()
    
    def deleteTraduccionCache(self, id , tabla, columna, idioma):
        cache.delete(str(id) + "_" + str(tabla) + "_" + str(columna)  + "_" +  str(idioma))

class Traducciones(models.Model):
    """
    Clase modelo que representa las traducciones
    """
    tabla = models.CharField(
        max_length=100, null=False, blank=False, help_text="Tabla a la que se hace referencia")
    columna = models.CharField(
        max_length=100, null=False, blank=False, help_text="Campo de la tabla al que se hace referencia")
    columna_id = models.IntegerField(
        null=False, blank=False, help_text="Id del registro a traducir")
    idioma = models.CharField(
        max_length=5, null=False, blank=False, help_text="Idioma de la traducción (es,en)")
    traduccion = models.CharField(
        max_length=2000, null=False, blank=False, help_text="Texto traducido")
    objects = TraduccionesManager()
   
    def save(self, *args, **kwargs):
        cache.delete(str(self.columna_id) + "_" + str(self.tabla) + "_" + str(self.columna)  + "_" +  str(self.idioma))
        cache.set( str(self.columna_id)+ "_" + str(self.tabla)+ "_" +  str(self.columna) + "_" +  str(self.idioma), self.traduccion, None)

        super().save()
        
    def __str__(self):
        return self.tabla + '.' + self.columna + ' - ' + str(self.columna_id) + ' - ' + self.idioma

    class Meta:
        verbose_name = _('traduccion')
        verbose_name_plural = _('traducciones')
        index_together = [
            ("columna_id", "tabla"),
        ]
        index_together = [
            ("columna_id", "tabla","columna"),
        ]
        unique_together = ('columna_id', 'tabla','columna','idioma')
        ordering = ('tabla', 'columna_id',)

class Idiomas(models.Model):
    codigo = models.CharField(_("codigo_idioma"), db_column="codigo_idioma", max_length=10, unique=True,
                                  null=False, blank=False, help_text="Codigo vat del pais ES,DE,GB")
    nombre = models.CharField(_("idioma"), db_column="nombre", max_length=100,
                              null=False, blank=False, help_text="Nombre del pais")
    @property
    def nombreTraduccion(self):
        """
        Retorna la traducción de la descripción si existe en la tabla de traducciones en el idioma de la peticion
        """
        return Traducciones.objects.getTraduccion(self.nombre, self.id, self._meta.db_table, "nombre")

    def delete(self):
        Traducciones.objects.deleteTraducciones(self.id,self._meta.db_table)
        super().delete()

    def __str__(self):
        return self.nombreTraduccion

    class Meta:
        ordering = ('nombre',)
        verbose_name = _('idioma')
        verbose_name_plural = _('idioma')
