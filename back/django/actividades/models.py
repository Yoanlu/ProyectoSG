from django.db import models

class Actividad (models.Model):
    nombre = models.CharField(max_length=100)
    duracion = models.IntegerField()

    fiesta = models.ForeignKey(
        'fiestas.Fiesta', 
        on_delete=models.CASCADE, 
        related_name='actividades'
    )