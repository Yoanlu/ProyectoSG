from django.db import models

class Fiesta(models.Model):
    festividad = models.CharField(max_length=100)
    inicio = models.DateField()
    fin = models.DateField()
    actividad = models.CharField(max_length=100)
    
    def __str__(self):
        return self.festividad