from django.db import models

class Asistencia(models.Model):
    miembro = models.ForeignKey('miembros.Miembro', on_delete=models.CASCADE, related_name='asistencias')
    actividad = models.ForeignKey('actividades.Actividad', on_delete=models.CASCADE, related_name='asistentes')

    class Meta:
        unique_together = ('miembro', 'actividad')

    def __str__(self):
        return f"{self.miembro} en {self.actividad}"