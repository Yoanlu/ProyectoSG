Ejemplo de calendarios del 2016 en español y 2018 en inglés.
```js

const { BrowserRouter } = require('react-router-dom');

class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ejemplo1: 'hidden',
            ejemplo2: 'hidden'
        };
    }

    render() {
        return (
            <div>
                <EleBoton texto={'Calendario 2016 Español'} funcionOnClick={() => {
                    let estado = ''
                    
                    if ( this.state.ejemplo1 === 'hidden' ){
                        estado = 'visible'

                    }else{
                        estado = 'hidden'
                    }

                    let estado2 = (this.state.ejemplo2 === 'visible'? 'hidden':this.state.ejemplo2 )

                    this.setState({
                        ejemplo1: estado,
                        ejemplo2: estado2
                    })
                }} /> 

                <EleBoton texto={'Calendario 2018 Inglés'} funcionOnClick={() => {
                    let estado = ''
                    
                    if ( this.state.ejemplo2 === 'hidden' ){
                        estado = 'visible'
                    }else{
                        estado = 'hidden'
                    }
                    let estado1 = (this.state.ejemplo1 === 'visible'? 'hidden':this.state.ejemplo1 )

                    this.setState({
                        ejemplo1: estado1,
                        ejemplo2: estado
                    })
                }} /> 

                {this.state.ejemplo1 === 'visible' ?
                        <CompCalendarioAnual
                        year={2016}
                        lng={'es'}
                        color="blue"
                        seleccionable={true}
                        funcionActualizaDiasSeleccionados={()=>{}}

                    /> : null }
                {this.state.ejemplo2 === 'visible' ?
                        <CompCalendarioAnual
                        year={2018}
                        lng={'en'}
                        color="blue"
                        seleccionable={true}
                        funcionActualizaDiasSeleccionados={()=>{}}
                        /> : null }
                        
            </div>
        );
    }
}

<Elemento />

```