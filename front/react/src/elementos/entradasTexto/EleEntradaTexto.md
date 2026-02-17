Elemento EleEntradaTexto, en el que se establece:
-Un identificador
-Un tipo de dato a introducir ("text").
-Un valor
-Una función en la que va a coger el valor ( funcionOnChange).
-Una etiqueta que se mostrará con \* si el campo es obligatorio
-La obligatoriedad.

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: ''
        };
    }
    render() {
        return (
            <div>
                <EleEntradaTexto
                    tipo="text"
                    etiqueta="Ejemplo"
                    obligatorio={true}
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        cogeValor = e => {
                            this.setState({
                                valor_elemento: e.target.value
                            });
                        }
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: ''
        };
    }
    render() {
        return (
            <div>
                <EleEntradaTexto
                    tipo="text"
                    etiqueta="Ejemplo"
                    obligatorio={false}
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        cogeValor = e => {
                            this.setState({
                                valor_elemento: e.target.value
                            });
                        }
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```

Elemento EleEntradaTexto, desactivado.:

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: ''
        };
    }
    render() {
        return (
            <EleEntradaTexto
                tipo="password"
                etiqueta="Ejemplo desactivado"
                valor={this.state.valor_elemento}
                desactivado={true}
                funcionOnChange={
                    cogeValor = e => {
                            this.setState({
                                valor_elemento: e.target.value
                            });
                        }
                }
            />
        );
    }
}

<Elemento />;
```

Elemento EleEntradaTexto en el que podremos introducir más de una línea de texto marcando el número de las mismas y el máximo.:

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: ''
        };
    }
    render() {
        return (
            <EleEntradaTexto
                tipo="texto"
                etiqueta="Ejemplo multilínea"
                valor={this.state.valor_elemento}
                multilineas={true}
                lineas={3}
                lineasMaximas={3}
                validacion={true}
                mensajeValidacion="Mensaje de Validación"
                funcionOnChange={
                    cogeValor = e => {
                            this.setState({
                                valor_elemento: e.target.value
                            });
                        }
                }
            />
        );
    }
}

<Elemento />;
```

Elemento EleEntradaTexto con adorno derecho e izquierdo, puediendo ser estos otro elemento:

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: ''
        };
    }
    render() {
        return (
            <div>
                <EleEntradaTexto
                    tipo="texto"
                    adornoDerecho={<EleIcono icono={'fingerprint'} />}
                    adornoIzquierdo={<EleIcono icono={'star'} />}
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        cogeValor = e => {
                            this.setState({
                                valor_elemento: e.target.value
                            });
                        }
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```


