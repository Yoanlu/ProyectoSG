Ejemplo EleEntradaListaMultiseleccion en el que se establece un campo clave ("id") y un campo visible("texto") con la
posibilidad de seleccionar varias de las opciones del mismo.

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: [1,2]
        };
    }

    render() {
        return (
            <div >
                <EleEntradaListaMultiseleccion
                    datos={[
                        { id: 1, texto: "Pepe" },
                        { id: 2, texto: "Juan" },
                        { id: 3, texto: "Carlos" }
                    ]}
                    nombre="Ejemplo de Input"
                    etiqueta="Nombres"
                    campoClave="id"
                    campoVisible="texto"
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        (darvalor = (valor) => {
                            this.setState({
                                valor_elemento: valor.target.value
                            });
                        })
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```

Ejemplo EleEntradaListaMultiseleccion se puede inicializar indicando el id del elemento que queremos visualizar de inicio.

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: [1,2]
        };
    }

    render() {
        return (
            <div >
                <EleEntradaListaMultiseleccion
                    datos={[
                        { id: 1, text: "Pepe" },
                        { id: 2, text: "Juan" },
                        { id: 3, text: "Carlos" }
                    ]}
                    etiqueta="Nombres"
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        (darvalor = (valor) => {
                            this.setState({
                                valor_elemento: valor.target.value
                            });
                        })
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```

Ejemplo EleEntradaListaMultiseleccion da la opción de visualizar el texto del input con Chip o en linea y 
el listado con o sin check de la siguiente manera.

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: [1,2]
        };
    }

    render() {
        return (
            <div >
                <h1>Ejemplo con Chip y Check en el listado</h1>
                <EleEntradaListaMultiseleccion
                    datos={[
                        { id: 1, text: "Pepe" },
                        { id: 2, text: "Juan" },
                        { id: 3, text: "Carlos" }
                    ]}
                    aparienciaChip={true}
                    listadoCheck={true}
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        (darvalor = (valor) => {
                            this.setState({
                                valor_elemento: valor.target.value
                            });
                        })
                    }
                />
                <h1>Ejemplo con Chip y listado sin check</h1>
                <EleEntradaListaMultiseleccion
                    datos={[
                        { id: 1, text: "Pepe" },
                        { id: 2, text: "Juan" },
                        { id: 3, text: "Carlos" }
                    ]}
                    aparienciaChip={true}
                    listadoCheck={false}
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        (darvalor = (valor) => {
                            this.setState({
                                valor_elemento: valor.target.value
                            });
                        })
                    }
                />
                <h1>Ejemplo de seleccionados en línea y listado sin check</h1>
                <EleEntradaListaMultiseleccion
                    datos={[
                        { id: 1, text: "Pepe" },
                        { id: 2, text: "Juan" },
                        { id: 3, text: "Carlos" }
                    ]}
                    aparienciaChip={false}
                    listadoCheck={false}
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        (darvalor = (valor) => {
                            this.setState({
                                valor_elemento: valor.target.value
                            });
                        })
                    }
                />
                <h1>Ejemplo con seleccionados en línea y Check en el listado</h1>
                <EleEntradaListaMultiseleccion
                    datos={[
                        { id: 1, text: "Pepe" },
                        { id: 2, text: "Juan" },
                        { id: 3, text: "Carlos" }
                    ]}
                    aparienciaChip={false}
                    listadoCheck={true}
                    valor={this.state.valor_elemento}
                    funcionOnChange={
                        (darvalor = (valor) => {
                            this.setState({
                                valor_elemento: valor.target.value
                            });
                        })
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```

Ejemplo EleEntradaListaMultiseleccion se tiene la opción de poder habilitar o no el elemento.

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_elemento: [1,2]
        };
    }

    render() {
        return (
            <div >
                <EleEntradaListaMultiseleccion
                    datos={[
                        { id: 1, text: "Pepe" },
                        { id: 2, text: "Juan" },
                        { id: 3, text: "Carlos" }
                    ]}
                    etiqueta="Nombres"
                    valor={this.state.valor_elemento}
                    desactivado={true}
                    funcionOnChange={
                        (darvalor = (valor) => {
                            this.setState({
                                valor_elemento: valor.target.value
                            });
                        })
                    }
                />
            </div>
        );
    }
}

<Elemento />;
```

