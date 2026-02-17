Ejemplo EleBotonImagen:

```js
<EleBotonImagen icono={'star'} />
```

Ejemplo EleBotonImagen con el color primario:

```js
<EleBotonImagen icono={'star'} primario />
```

Ejemplo del botón desactivado:

```js
<EleBotonImagen icono={'star'} desactivado={true} />
```

Ejemplo de EleBoton con función en el onclick mostrando una alerta.:

```js
<EleBotonImagen
    icono={'star'}
    funcionOnClick={() => {
        alert('Ha hecho click');
    }}
/>
```
