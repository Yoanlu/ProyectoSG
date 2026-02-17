from django.db import models

class Miembro(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    tarea = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"