
Ejemplo de Componente Menú Navegación constituido por un constituido por un panel lateral y una barra de navegación.
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
                <EleBoton texto='Visualizar Menu Navegación' funcionOnClick={
                    ()=>{
                        this.setState({
                            panelVisible: !this.state.panelVisible
                        })
                    }
                } />
            
                { this.state.panelVisible ? 
                    <BrowserRouter>
                        <CompMenuNavegacion permisos={[]} />
                    </BrowserRouter>
                : null}

            </div>
        )
        
    }
}
<Elemento />
```