from rest_framework import serializers
from .models import Miembro, MiembroDocumento
import os

class MiembroDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiembroDocumento
        fields = '__all__'

    def validate_documento(self, value):
        #Valida que sea un PDF o PNG
        if value:
            # Extraemos la extensión del nombre del archivo
            ext = os.path.splitext(value.name)[1].lower()
            extensiones_permitidas = ['.pdf', '.png']
            
            if ext not in extensiones_permitidas:
                raise serializers.ValidationError("Formato no permitido. Solo se aceptan archivos PDF y PNG.")
        
        return value

class MiembroSerializer(serializers.ModelSerializer):
    documentos = MiembroDocumentoSerializer(many=True, read_only=True)
    pagador_nombre = serializers.ReadOnlyField(source='pagador.nombre_completo')
    total_pago = serializers.ReadOnlyField(source='total_a_pagar')

    class Meta:
        model = Miembro
        fields = [
            'id', 'dni', 'nombre', 'apellido', 'email', 'tarea', 
            'documentos', 'pagador_nombre', 'total_pago', 
            'pagador', 'importe'
        ]