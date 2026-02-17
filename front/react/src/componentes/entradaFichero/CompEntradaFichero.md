Elemento EleEntrada de Imagen:

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fichero: '',
            nombreFichero: ''
        };
    }

    render() {
        return (
            <CompEntradaFichero
                nombre="fichero"
                valor={this.state.fichero}
                nombreFichero={this.state.nombreFichero}
                funcionOnChange={(valor, nombreCampo, nombreFichero) => {
                    this.setState({
                        fichero: valor,
                        nombreFichero: nombreFichero
                    });
                }}
            />
        );
    }
}

<Elemento />;
```
