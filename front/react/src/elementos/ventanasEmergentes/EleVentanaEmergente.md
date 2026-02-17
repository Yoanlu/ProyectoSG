Ejemplo del EleVentanaEmergente:

```js
class Elemento extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mostrarError: false,
            tituloError: null,
            mensajeError: null
        };
    };


    render() {
        return (
            <div>
                <EleBoton texto={'Mostrar elemento'} funcionOnClick={() => {
                                                                        this.setState({
                                                                            mostrarError: !this.state.mostrarError
                                                                        });
                                                                    }} 
                />
                {this.state.mostrarError ? (
                    <EleVentanaEmergente
                        titulo={'Titulo del Elemento'}
                        mensaje={'Prueba realizada'}
                        mostrarError={ true }
                        funcionCerrarVentana={ () => {
                                                    this.setState({
                                                        mostrarError: !this.state.mostrarError
                                                    });
                                                }}
                        traduc={ texto => {
                            return texto;
                        }}
                    />
                ) : null}
            </div>
            
        );
    }
}

<Elemento/>
```