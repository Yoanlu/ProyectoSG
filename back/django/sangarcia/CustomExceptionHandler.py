from rest_framework.views import exception_handler
from django.db import transaction


@transaction.atomic
def customExceptionHandler(exc, context):

    respuesta = exception_handler(exc, context)
    # if respuesta is not None:
    #     respuesta.data['status_code'] = respuesta.status_code

    transaction.set_rollback(True)

    return respuesta
