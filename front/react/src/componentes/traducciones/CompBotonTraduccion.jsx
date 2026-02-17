import React from 'react';
import EleVentanaEmergente from '../../elementos/ventanasEmergentes/EleVentanaEmergente';
import CompSeleccionTraduccion from './CompSeleccionTraduccion';
import EleBotonImagen from '../../elementos/botones/EleBotonImagen';
import { withNamespaces } from 'react-i18next';

class CompBotonTraduccion extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ventanaVisible: false
        };
    }

    cambiaVisibilidad = () => {
        this.setState({
            ventanaVisible: !this.state.ventanaVisible
        });
    };

    aceptar = () => {}

    render() {
        if (!this.props.idColumna) {
            return null;
        }

        return (
            <React.Fragment>
                <EleBotonImagen
                    icono="translate"
                    funcionOnClick={this.cambiaVisibilidad}
                    tooltip={this.props.t('translate')}
                    placement="left"
                />
                <EleVentanaEmergente
                    mostrarError={this.state.ventanaVisible}
                    autoGuardar={true}
                    ancho="lg"
                    titulo={this.props.t('translate')}
                    mensaje={<CompSeleccionTraduccion {...this.props} />}
                    funcionCerrarVentana={this.cambiaVisibilidad}
                    funcionAceptar={this.aceptar}
                />
            </React.Fragment>
        );
    }
}

export default withNamespaces()(CompBotonTraduccion);
