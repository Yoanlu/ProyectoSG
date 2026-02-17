Elemento EleEntrada para textos:

```js

class Elemento extends React.Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: '',
        };
    }
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <CompEntrada
                        tipoEntrada='EntradaTexto'                
                        tipo='text'
                        adornoDerecho={<EleIcono icono={"fingerprint"} />}
                        adornoIzquierdo={<EleIcono icono={"star"} />}
                        valor={this.state.valor_elemento}
                        funcionOnChange= {darvalor=(valor,campo)=>{
                            this.setState({
                                valor_elemento:valor
                            })
                        }} />
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
            valor_elemento: '',
        };
    }
    render() {
        return (
            <div>
                <CompEntrada
                        tipoEntrada='EntradaNumero'
                        obligatorio={true}
                        nombre="edad"
                        etiqueta={'Edad'}
                        maximo={10}
                        minimo={-10}
                        valor={this.state.valor_elemento}
                        funcionOnChange= {darvalor=(valor,campo)=>{
                            this.setState({
                                valor_elemento:valor
                            })
                        }} />
            </div>
        );
    }
}

<Elemento />