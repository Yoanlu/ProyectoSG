Elemento EleEntrada de colores:

```js

class Elemento extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            color:'',
        };
    }


    render() {
        return (
                <CompEntradaColor
                    obligatorio={true}
                    color={this.state.color}
                    etiqueta={'Ejemplo Color'}
                    activaTransparencia={true}
                    funcionOnChange={recogeColor = color => {
                                        this.setState({ color: color.hex });
                                    }}
                    funcionOnChangeCompEntrada={funcionOnChangeCompEntrada = e => {
                                        this.setState({ color: e.target.value });
                                    }}
                    traduccion={this.traduc}
                />
        );
    }
}

<Elemento />
```

