import datetime
from django.contrib.auth.models import User
from django.db.models import Q

def ofuscarDatosUsuario(pk):
    from clientes.models import Clientes
    from reservas.models import Reservas
    from seguridad.models import User_Detalle
    
    usuario = User.objects.get(id=pk)
    fecha = datetime.date.today()

    fechas = Q(Q(usuario = usuario) & Q(fecha_desde__lte=fecha ) & Q(fecha_hasta__gte=fecha ))

    if Reservas.objects.filter(fechas).exclude(estado_id=4).count() == 0:

        usuario.anonymise()
        try:
            cliente = Clientes.objects.get(usuario=usuario)
            cliente.anonymise()
            
            userdetalle = User_Detalle.objects.get(usuario=usuario) 
            userdetalle.anonymise()
        except:
            pass
        return True
        
        usuario.is_active = False
        usuario.save()

    else:
        return False
