Ejemplo de Panel Lateral de Opciones

```js
class Elemento extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            panelVisible: false
        };

        this.tienePerfil = window.localStorage.getItem('access_token');
        this.location = {
            pathname:''
        }
    }

    render() {

        return (
            <div>
                <EleBoton texto='Panel Lateral Visible' funcionOnClick={
                    ()=>{
                        this.setState({
                            panelVisible: !this.state.panelVisible
                        })
                    }
                } />
            
                { this.state.panelVisible ? <CompPanelLateral
                    opcionesMenu={[
                                    {
                                        titulo: 'Lista 1',
                                        opciones: [{ titulo: 'Opción 1', ruta: 'lo1' }, { titulo: 'Opción 2', ruta: 'l1o2' }]
                                    },
                                    {
                                        titulo: 'Lista 2',
                                        opciones: [
                                            { titulo: 'Opción 1', ruta: 'l2o1' },
                                            { titulo: 'Opción 2', ruta: 'l2o2' },
                                            { titulo: 'Opción 3', ruta: 'l2o3' },
                                            { titulo: 'Opción 4', ruta: 'l2o4' },
                                            { titulo: 'Opción 5', ruta: 'l2o5' },
                                            { titulo: 'Opción 6', ruta: 'l2o6' }
                                        ]
                                    }
                                ]}
                    menuLateralVisible={true}
                    funcionCerrar={() => {this.setState({
                                                    panelVisible: !this.state.panelVisible
                                                });
                                    }}
        
                    funcionOnSelect={direccionRuta => {
                                        if (direccionRuta) {
                                            alert(direccionRuta);
                                            if (this.state.panelVisible) {
                                                this.cambiaVisiblePanel();
                                            }
                                        }
                                    }}
                    seleccionado={this.location.pathname}
                />
                : null}

            </div>
        )
        
    }
}
<Elemento />
```