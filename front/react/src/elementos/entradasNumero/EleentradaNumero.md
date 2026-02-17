Ejemplo de EleEntradaNumero inicializando el valor y estableciendo un valor máximo y un mínimo:

```js

class Elemento extends React.Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: 0,
        };
    }
    render() {
        return (
            <div>
                <EleEntradaNumero
                    obligatorio={true}
                    nombre="edad"
                    etiqueta={'Edad'}
                    maximo={10}
                    minimo={-10}
                    valor={this.state.valor_elemento}
                    funcionOnChange={cogeValor = e => {
                                            this.setState({
                                                valor_elemento: e.target.value
                                            });
                                        }}
                />
            </div>
        );
    }
}

<Elemento />
```
