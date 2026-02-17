Ejemplo de Barra de navegación.
```js
const { BrowserRouter } = require('react-router-dom');

class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panelVisible: false
        };
    }

    render() {
        return (
            <div>

                <EleBoton texto={'Mostrar Barra'} funcionOnClick={() => {
                    
                    this.setState({
                        panelVisible: !this.state.panelVisible
                    })
                }} /> 

                {this.state.panelVisible ? 
                    <BrowserRouter>
                        <CompBarraNavegacion
                            funcionCambiaVisible={() => {
                                this.setState({
                                    panelVisible: !this.state.panelVisible
                                });
                            }}
                            funcionCambiaIdioma={idioma => {
                                this.props.i18n.changeLanguage(idioma);
                            }}
                            texto="Cloud Of Business"
                            imagen={null}
                            idioma={'es'}
                        />
                    </BrowserRouter>
                :null }
            </div>
        );
    }
}

<Elemento />;
```