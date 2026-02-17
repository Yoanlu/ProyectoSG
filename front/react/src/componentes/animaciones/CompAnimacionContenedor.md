Ejemplo de comtenedor con una animación.

```js
class Elemento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }
    render() {
        return (
            <div>
                <EleBoton texto={"Animación"} funcionOnClick={()=>{
                    const estado = this.state.visible;
                    this.setState({
                        visible:!estado
                    })
                }} />

                <CompAnimacionContenedor
                    visible={this.state.visible}
                    velocidad="faster"
                    animacion="slide"
                    direccion="Left"
                    esperaDesmontar={500}
                >
                    <div>Ejemplo de Div con animación</div>
                </CompAnimacionContenedor>

            </div>
        );
    }
}

<Elemento />
 
````