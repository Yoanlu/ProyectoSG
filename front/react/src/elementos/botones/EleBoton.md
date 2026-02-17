Ejemplo EleBoton con un texto activo:

```js
<EleBoton
    texto={'Prueba'}
    funcionOnClick={
        (click = () => {
            alert('Ha hecho click');
        })
    }
/>
```

Ejemplo de activación del botón:

```js
<EleBoton
    texto={'Prueba'}
    desactivado={true}
    funcionOnClick={
        (click = () => {
            alert('Ha hecho click');
        })
    }
/>
```

Ejemplo de activación del botón:

```js
<EleBoton
    texto={'Prueba'}
    desactivado={true}
    funcionOnClick={
        (click = () => {
            alert('Ha hecho click');
        })
    }
/>
```

Ejemplo de botón tipo 'button', pudiendo ser 'submit' o 'reset' si se encuentra en un formulario.:

```js
<EleBoton
    texto={'Prueba'}
    tipo={'button'}
    funcionOnClick={
        (click = () => {
            alert('Ha hecho click');
        })
    }
/>
```

Ejemplo de EleBoton con un icono y una apariencia de icono (apariencia='fab') y un tamaño mediano:
```js
class Elemento extends React.Component {
    render() {
        return (
            <div>
                <EleBoton
                    icono={'star'}
                    tamano={'medium'}
                    funcionOnClick={
                        (click = () => {
                            alert('Ha hecho click');
                        })
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```

Ejemplo de EleBoton con una imagen y un tamaño mediano con los colores de botón primario:

```js
class Elemento extends React.Component {
    render() {
        return (
            <EleBoton
                imagenUrl={
                    'https://public.slidesharecdn.com/images/user-48x48.png'
                }
                tamano="small"
                primario={true}
                funcionOnClick={
                    (click = () => {
                        alert('Ha hecho click');
                    })
                }
            />
        );
    }
}

<Elemento />;
```

Ejemplo de EleBoton con función en el onclick mostrando una alerta.:

```js
class Elemento extends React.Component {
    render() {
        return (
            <EleBoton
                texto="Prueba Click"
                funcionOnClick={
                    (click = () => {
                        alert('Ha hecho click');
                    })
                }
            />
        );
    }
}

<Elemento />;
```
