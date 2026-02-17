from django.test import TestCase
from django.shortcuts import reverse
from rest_framework import status
from django.contrib.auth.models import User, Group
from sangarcia.OauthTestCase import OauthTestCase
from django.utils.http import urlencode
# Create your tests here.


class UsersTests(OauthTestCase):

    def setUp(self):
        """
        Crea los datos para tests e inicializa el modelo de Oauth para que
        contenga una aplicación y un token válido
        """
        # configuración oauth2
        super(UsersTests, self).setUp()

        # cargamos los datos base para los test
        Group.objects.all().delete()
       # User.objects.all().delete()

        self.grupos = Group(id=4, name="Administrador")
        self.user = User(id=4, username="usu1", email="aa@aa.com", first_name="usu",
                         last_name="usu last", is_active=True, password="prueba1123$")
        self.grupos.save()
        self.user.save()

    def testGetUsers(self):
        """
        Verifica que se retornan todos los usuarios creados.
        """
        url = reverse("user-list")
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def testGetUser(self):
        """
        Verifica que retorna un usuario a partir de un id.
        """
        url = reverse("user-detail", kwargs={'pk': 4})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.json().get("id") == 4)

    def testPutUser(self):
        url = reverse("user-detail", kwargs={'pk': 4})
        data = {"username": "sara", "email": "sara1.garcia@sandav.es", "first_name": "Sarita",
                "last_name": "García", "groups": [4], "is_active": "true", "password": "prueba1234&",
                "foto": {"avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAIAAAA2bnI+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAcSURBVDhPY/hPLhjVSQiM6iQERnUSAvTX+f8/AGYc/iw1/mtsAAAAAElFTkSuQmCC"}}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url = reverse("user-detail", kwargs={'pk': 4})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def testPostUser(self):
        """
        Verifica que se inserta un nuevo usuario
        """
        url = reverse("user-list")
        data = {"username": "sara_2", "email": "sara2.garcia@sandav.es", "first_name": "Sarita",
                "last_name": "García", "groups": [4], "is_active": "true", "password": "prueba1234&",
                "foto": {"avatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAIAAAA2bnI+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAcSURBVDhPY/hPLhjVSQiM6iQERnUSAvTX+f8/AGYc/iw1/mtsAAAAAElFTkSuQmCC"}}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        url = reverse("user-detail", kwargs={'pk': response.json().get("id")})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def testDeleteUser(self):
        """
        Verifica que se elimina un usuario utilizando su id.
        """
        url = reverse("user-detail", kwargs={'pk': 4})

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
