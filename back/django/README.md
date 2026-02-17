Este proyecto se ha creado con [Django](https://www.djangoproject.com/).

## Contenido

-   [Preparar entorno de desarrollo](#preparar-entorno-desarrollo)
-   [Crear aplicación oauth](#crear-aplicacion-oauth)

## Preparar entorno de desarrollo

> Nota: Hay que tener instalado `Python ^3.x` y virtualenv en el equipo.

Creamos el entorno virtual y lo activamos:

```sh
python -m venv .venv
```

Para activarlo desde Windows:

```sh
.\.venv\Scripts\activate
```

Y para activarlo desde Unix:

```sh
source .venv/bin/activate
```

Y ahora instalamos los módulos necesarios:

```sh
pip install -r ./requirements.txt
```

Reemplazamos todas las apariciones de la palabra `baseapp` por el nombre de la aplicación.

Lo siguiente sería lanzar la migración de la BBDD, en caso de no configurar una BBDD por defecto se creará con sqlite:

```sh
python manage.py migrate
```

> Opcional: Para tener los datos por defecto de idiomas y usuario podemos cargar los fixtures

En Windows:

```sh
.\fixtures\cargar_fixtures.bat
```

En Unix:

```sh
./fixtures/cargar_fixtures.sh
```

Si no hemos lanzado los fixtures, deberemos crear el usuario administrador:

```sh
python manage.py createsuperuser
```

Ahora ya podemos iniciar el servidor de desarrollo:

```sh
python manage.py runserver
```

> Opcional: Podemos lanzarlo con un puerto diferente, e incluso que sea accesible desde otros ordenadores, por ejemplo:

```sh
python manage.py runserver 0.0.0.0:8080
```

Ahora accederemos al portal de administración de Django con el siguiente [enlace](http://localhost:8000/admin),
para ello pondremos las credenciales del usuario administrador que hemos creado (en caso de hacerlo con fixtures, el usuario es admin con contraseña admin)

> En caso de haber usado un puerto diferente al predeterminado, entraremos a la url cambiando el puerto

## Crear aplicación oauth

Entrando en el portal de Django, en la sección Django OAuth Toolkit/Applications deberemos crear una aplicación nueva,
para ellos deberemos seleccionar las siguientes opciones:

-   Client type -> Confidential
-   Authorization grant type -> Resource owner password-based
-   Name -> `Aquí ponemos el nombre de la aplicación`

Ahora podemos crear un fixture con la aplicación oauth que hemos creado, para ello podemos lanzar el siguiente script
En Windows:

```sh
.\fixtures\generar_fixtures.bat
```

En Unix:

```sh
./fixtures/generar_fixtures.sh
```
