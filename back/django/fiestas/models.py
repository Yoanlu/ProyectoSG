from django.db import models

class Fiesta(models.Model):
    festividad = models.CharField(max_length=100)
    inicio = models.DateField()
    fin = models.DateField()
    
    
    def __str__(self):
        return self.festividad