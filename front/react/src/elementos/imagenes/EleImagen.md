Ejemplo EleImagen:

```js

class Elemento extends React.Component { 
    render() {
        return (
            <EleImagen
                imagen={'https://media.infojobs.net/corp/sandav_logo.gif'}
            />
        );
    }
}


<Elemento />
```
Ejemplo EleImagen en el que se establece un ancho y un alto determinado:

```js

class Elemento extends React.Component { 
    render() {
        return (
            <EleImagen
                imagen={'https://media.infojobs.net/corp/sandav_logo.gif'}
                ancho={'100'}
                alto={'50'}
            />
        );
    }
}


<Elemento />
```

Ejemplo EleImagen en el que se establece un texto alternativo que se muestra en caso de no ser posible mostrar la imagen, haciendo click cambia a la imagen correcta. :

```js

class Elemento extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            imagen: 'https://media.infojobs.net/corp/sandav.gif',
        };
    }
    render() {
        return (
            <EleImagen
                imagen={this.state.imagen}
                textoAlternativo={'Logo Sandav'}
                funcionOnClick={cambiaImagen=()=>{
                        this.setState({
                            imagen:'https://media.infojobs.net/corp/sandav_logo.gif'
                        })
                    }
                }
            />
        );
    }
}


<Elemento />
```

