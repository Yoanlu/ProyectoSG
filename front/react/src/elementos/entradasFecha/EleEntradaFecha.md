Elemento EleEntradaFecha, en el que se establece:
    -Un identificador
    -Un tipo de dato a introducir ("date").
    -Un valor
    -Una función en la que va a coger el valor ( funcionOnChange).
    -Una etiqueta que se mostrará con * si el campo es obligatorio
    -La obligatoriedad.


```js

class Elemento extends React.Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: '2018-02-01',
        };
    }
    render() {
        return (
            <div>
                <EleEntradaFecha
                    identificador='identificadorFecha'
                    tipo='date'
                    valor={this.state.valor_elemento}
                    funcionOnChange= {
                        cogeValor = e => {
                            this.setState({ valor_elemento: e.target.value });
                        }
                    } />
            </div>
        );
    }
}

<Elemento />
```
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
                <EleEntradaFecha 
                    tipo='date'
                    etiqueta='Ejemplo'
                    obligatorio={true}
                    valor={this.state.valor_elemento}
                    funcionOnChange= {
                            cogeValor = e => {
                                this.setState({ valor_elemento: e.target.value });
                            }
                    } />
            </div>
        );
    }
}

<Elemento />
```
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
                <EleEntradaFecha tipo='date'
                    etiqueta='Ejemplo'
                    obligatorio={false}
                    valor={this.state.valor_elemento}
                    funcionOnChange= {
                        cogeValor = e => {
                            this.setState({ valor_elemento: e.target.value });
                        }
                    } />
        </div>
        );
    }
}

<Elemento />
```

Elemento EleEntradaFecha, desactivado.:

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
             <EleEntradaFecha tipo='date'
                    etiqueta='Ejemplo desactivado'
                    valor={this.state.valor_elemento}
                    desactivado={true}
                    funcionOnChange= {
                        cogeValor = e => {
                            this.setState({ valor_elemento: e.target.value });
                        }
                    } />
        );
    }
}

<Elemento />
```

Elemento EleEntradaFecha con adorno derecho e izquierdo, puediendo ser estos otro elemento:

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
                <EleEntradaFecha tipo='date'
                        adornoDerecho={<EleIcono icono={"fingerprint"} />}
                        adornoIzquierdo={<EleIcono icono={"star"} />}
                        valor={this.state.valor_elemento}
                        funcionOnChange= {
                        cogeValor = e => {
                            this.setState({ valor_elemento: e.target.value });
                        }
                    } />
            </div>
        );
    }
}

<Elemento />
```