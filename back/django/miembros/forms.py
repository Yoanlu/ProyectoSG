from django import forms
from .models import Miembro

class MiembroForm(forms.ModelForm):
    class Meta:
        model = Miembro
        fields = ['nombre', 'apellido', 'email', 'tarea']
        # Esto crea automáticamente campos para cada parte de tu modelo