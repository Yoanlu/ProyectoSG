Ejemplo de ElementoEntradaListaDesplegable dando un identificador inicial, una etiqueta y un conjungo de datos a visualizar en el elemento, con una estructura de do campos un identificador y uno visual:

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
               <EleEntradaListaDesplegable
                    idSeleccionado={this.state.valor_elemento}
                    etiqueta={'Nombres'}
                    datos={[
                        { id: 1, text: 'Pepe' },
                        { id: 2, text: 'Juan' },
                        { id: 3, text: 'Carlos' }
                    ]}                
                    funcionOnChange={
                        cogeValor = e => {
                            this.setState({ valor_elemento: e.target.value });
                        }
                    }
                />
            </div>
        );
    }
}

<Elemento />
```

Ejemplo de EleEntradaListaDesplegable en el que visualiza el campo "id" en los valores del desplegable y como identificativo o clave se indica que sea el campo "texto"

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
               <EleEntradaListaDesplegable
                    idSeleccionado={this.state.valor_elemento}
                    etiqueta={'Nombres'}
                    datos={[
                        { id: 1, texto: 'Pepe' },
                        { id: 2, texto: 'Juan' },
                        { id: 3, texto: 'Carlos' }
                    ]}
                    campoVisible={'id'}
                    campoClave={'texto'}              
                    funcionOnChange={
                        cogeValor = e => {
                            this.setState({ valor_elemento: e.target.value });
                        }
                    }
                />
            </div>
        );
    }
}

<Elemento />
```

Ejemplo de ElementoListaDesplegable en el que se habilita la opción de poder filtrar los valores visualizados en el elemento.
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
               <EleEntradaListaDesplegable
                    idSeleccionado={1}
                    etiqueta={'Nombres'}
                    datos={[
                        { id: 1, texto: 'Pepe' },
                        { id: 2, texto: 'Juan' },
                        { id: 3, texto: 'Carlos' }
                    ]}
                    campoVisible={'texto'}
                    campoClave={'id'}
                    filtrable={true}              
                    funcionOnChange={
                        cogeValor = e => {
                            this.setState({ valor_elemento: e.target.value });
                        }
                    }
                />
            </div>
        );
    }
}

<Elemento />
```
