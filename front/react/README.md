Este proyecto se ha creado con [Create React App](https://github.com/facebookincubator/create-react-app).

## Contenido

-   [Preparar entorno de desarrollo](#preparar-entorno-desarrollo)
-   [Producción](#produccion)

## Preparar entorno de desarrollo

> Hay que tener instalados nodejs y yarn

> El repositorio lo descargamos con este comando:
```sh
git clone --recurse-submodules ruta-del-repositorio
```

Ese comando nos traerá los submódulos (componentes y elementos), en caso de haber traido el repositorio
sin los submodulos, hay que lanzar a posteriori este comando:
```sh
git submodule update --init --recursive
```

Traemos los submodulos de react (SOLO SI NO ESTÁN AGREGADOS, para un proyecto copiado de otro):
```sh
git submodule add https://git.sandav.es/React/elementos src/elementos
git submodule add https://git.sandav.es/React/componentes src/componentes
```

Instalamos los modulos necesarios (los requerimentos del package.json):
```sh
yarn
```
> El comando yarn sin argumentos es un alias de `yarn install`

Reemplazamos todas las apariciones de la palabra `baseapp` por el nombre de la aplicación

En el fichero /src/baseapp/comunes/configuracion.json establecemos la variable de `authApp`,
con la que pondremos los tokensid y secret que tenemos de la aplicación de django.
En caso de que cambiaramos el puerto en django, también lo cambiamos en la variable `dominioDesarrollo`.

En la variable `opcionesTema` también podemos establecer los colores disponibles de la aplicación.

Y arrancamos la aplicación en modo desarrollo con:

```sh
yarn dev
```
> También podemos lanzar la instalación con su alias `yarn start`

No es necesario lanzarlo cada vez que modifiquemos el código, es más, está contraindicado, ya que se refresca automáticamente al detectar cambios.

## Produccion

Primero establecemos la versión, podemos establecer directamente la versión con:

```sh
yarn version
```

> o subir la versión según lo que hayamos hecho, con `yarn version major`, `yarn version minor` o `yarn version patch`

A continuación, podemos generar el desplegable lanzando:

```sh
yarn build
```

> Es muy importante tener siempre una versión superior al desplegable anterior subido, ya que sino no se actualizará.
> En caso de subirse una versión anterior, puede entrar en un bucle recursivo de actualizaciones, en este caso habría que cambiar el número de version a uno mayor al desplegado.
