Elemento EleEntrada para textos:

```js

class Elemento extends React.Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: 1,
        };
    }
    render() {
        return (
            <div>
               <CompDesplegable
                    tipoDesplegable="desplegable"
                    datos={[
                            { id: 1, text: 'Dato1' },
                            { id: 2, text: 'Dato2' },
                            { id: 3, text: 'Dato3' }
                        ]}
                    idSeleccionado={this.state.valor_elemento}
                    obligatorio={true}
                    funcionOnChange={ (valorNuevo, campo) => {

                        this.setState({ valor_elemento: valorNuevo });
                    }}
                />
            </div>
        );
    }
}

<Elemento />
```

Elemento EleEntrada para números:

```js

class Elemento extends React.Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: [],
        };
    }
    render() {
        return (
            <div>
                <CompDesplegable
                    tipoDesplegable='multiseleccion'
                    datos={[
                            { id: 1, text: 'Dato1' },
                            { id: 2, text: 'Dato2' },
                            { id: 3, text: 'Dato3' }
                        ]}
                    valorMultiseleccion={this.state.valor_elemento}
                    campoClave="id"
                    campoVisible="text"
                    etiqueta={"Prueba"}
                    funcionOnChange={
                        darvalor=(valor,campo)=>{
                            this.setState({
                                valor_elemento:valor
                            })
                        }
                    }
                />
            </div>
        );
    }
}

<Elemento />