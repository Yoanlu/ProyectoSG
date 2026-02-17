import React from "react";
import { Marker } from "@react-google-maps/api";

import icono from "./icono-mapa.png";

class CompMarcaMapa extends React.PureComponent {
    static defaultProps = {
        movil: false
    };

    constructor(props) {
        super(props);

        this.marca = undefined;

        this.iconoMapa = {
            url: icono
        };

        // this.state = {
        //     informacionVisible: false
        // };
    }

    clickMarca = evento => {
        // this.setState({
        //     informacionVisible: !this.state.informacionVisible
        // });
    };

    // clickInformacion = () => {
    //     this.setState({
    //         informacionVisible: false
    //     });
    // };

    marcaMontada = ref => {
        this.marca = ref;
    };

    cambioPosicion = () => {
        if (this.marca) {
            const posicion = this.marca.getPosition();
            this.props.moverMarca(posicion);
        }
    };

    render() {
        return (
            <Marker
                onLoad={this.marcaMontada}
                draggable={this.props.movil}
                position={this.props.ubicacion}
                onClick={this.clickMarca}
                onPositionChanged={this.cambioPosicion}
                icon={this.iconoMapa}
            >
                {/* {this.state.informacionVisible && (
                    <InfoWindow position={this.props.centroPredeterminado} onCloseClick={this.clickInformacion}>
                        <div>
                            <h1>informacion</h1>
                        </div>
                    </InfoWindow>
                )} */}
            </Marker>
        );
    }
}

export default CompMarcaMapa;
