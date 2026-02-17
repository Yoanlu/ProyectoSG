 Ejemplo Radio Button:

```js

class Elemento extends React.Component {
  

    constructor(props) {
        super(props);
        
        this.state={
            chequeado:false
        };
    }

    render() {
        return (
                <EleEntradaInterruptor
                    ubicacionEtiqueta='start'
                    etiqueta={'Etiqueta'}
                    onBlur={this.props.funcionOnBlur}
                    onFocus={this.props.funcionOnFocus}
                    chequeado={this.state.chequeado}
                    funcionOnChange={ funcionOnChangeInterruptor = clave => {
                                        this.setState({ chequeado: clave.target.checked });
                                    }}
                    
                />
        );
    }   
}

<Elemento  />

```
