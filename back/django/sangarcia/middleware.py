from django.contrib.auth.models import User 
from oauth2_provider.models import AccessToken, RefreshToken
from django.http import HttpResponse 
from django.utils import translation
from django.shortcuts import redirect
from django.conf import settings
from django.utils.translation import  activate

def simple_middleware(get_response):

    # One-time configuration and initialization.

    def middleware(request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        try:
            idioma = request.META['HTTP_ACCEPT_LANGUAGE']
            if "api" in request.path :
                activate(idioma)
        except:
            pass
            
        if request.path == '/oauth/token/':
            if request.POST["grant_type"] == "password" and request.POST['username']:
                existe = User.objects.filter(username=request.POST['username'])
                
                if len(existe) > 0:
                    usuario = existe.first()
                    
                    AccessToken.objects.filter(user=usuario.id).delete()
                    RefreshToken.objects.filter(user=usuario.id).delete()
                    
                        
        elif request.path == '/oauth/revoke_token/':
            request_token = request.POST["token"]

            existe = AccessToken.objects.filter(token=request_token)
            if existe:
                access_token = AccessToken.objects.get(token=request_token)
                idtoken = access_token.id
                RefreshToken.objects.filter(access_token_id=idtoken).delete()
                AccessToken.objects.filter(id=idtoken).delete()

        response = get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware




