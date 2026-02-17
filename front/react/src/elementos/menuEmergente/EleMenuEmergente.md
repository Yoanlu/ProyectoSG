 Ejemplo EleMenuEmergente:
 ```js

class Elemento extends React.Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

        this.anchorEntradaTexto = null;
    };

    render() {
        return (
            <div>
                <div 
                    ref={contenedorBoton => {
                        this.anchorEntradaTexto = contenedorBoton;
                    }}
                    onClick={funcionHacerVisible = () => {
                                    this.setState({
                                        visible:!this.state.visible
                                    })
                                }
                            }
                >
                    CLICK PARA MOSTRAR
                </div>
                
                <EleMenuEmergente ancla={this.anchorEntradaTexto}
                    visible={this.state.visible}
                    alineacionAncla={{
                        horizontal: 'left',
                        vertical: 'bottom'
                    }}
                    alineacionContenido={{
                        horizontal: 'left',
                        vertical: 'top'
                    }} >
                    <div>
                        Contenido del elemento emergente
                    </div>
                </EleMenuEmergente>
            </div>
        );
    }
}

<Elemento />
```

Ejemplo EleMenuEmergente sin animación:
 ```js

class Elemento extends React.Component { 
    
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

        this.anchorEntradaTexto = null;
    };

    render() {
        return (
            <div>
                <div 
                    ref={contenedorBoton => {
                        this.anchorEntradaTexto = contenedorBoton;
                    }}
                    onClick={funcionHacerVisible = () => {
                                    this.setState({
                                        visible:!this.state.visible
                                    })
                                }
                            }
                >
                    MOSTRAR SIN ANIMACION
                </div>
                
                <EleMenuEmergente 
                    ancla={this.anchorEntradaTexto}
                    visible={this.state.visible}
                    animacion={false}
                    alineacionAncla={{
                        horizontal: 'left',
                        vertical: 'bottom'
                    }}
                    alineacionContenido={{
                        horizontal: 'left',
                        vertical: 'top'
                    }} >
                    <div>
                        Contenido del elemento emergente
                    </div>
                </EleMenuEmergente>
            </div>
        );
    }
}

<Elemento />
```

