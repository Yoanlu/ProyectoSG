Elemento EleEntrada de Imagen:

```js

class Elemento extends React.Component {
    
    constructor(props) {
        super(props);

        this.state={
            foto:'',
        }
    }

    render() {
        return (
            <div>
                <CompEntradaImagen
                    nombre="foto"
                    textoBoton={"Subir Imagen"}
                    valor={this.state.foto}
                    funcionOnChange={funcionOnChangeImagen = (valor) => {
                                        this.setState({ foto: valor });
                                    }}
                />

            </div>
        );
    }
}

<Elemento />
```