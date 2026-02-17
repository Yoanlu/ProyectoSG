from django.contrib import admin
from .models import Miembro

@admin.register(Miembro)
class MiembroAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'email', 'tarea')
    search_fields = ('nombre', 'email')