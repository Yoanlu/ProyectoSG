Componente de Mantenimiento:

```js
const { BrowserRouter } = require('react-router-dom');
const EjemploMantenimiento = () => 'Contenido del Mantenimiento';

class Elemento extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            dato: '',
        }

        let ordenColumnas = [];
        let ordenFilas = [];
    }

    render() {     
        return (
            <BrowserRouter>
                <CompMantenimientoContenedor
                    objetosListados={'Objeto de mantenimiento'}
                    datoEnEdicion={this.state.dato}
                    compMantenimiento={EjemploMantenimiento}
                    funcionCancelar={() => {}}
                    funcionGuardar={() => {}}
                    funcionCambiaEstados={() => {}}
                    funcionControlPeticion={() => {}}
                />
            </BrowserRouter>               
        );
    }
}

<Elemento />
```