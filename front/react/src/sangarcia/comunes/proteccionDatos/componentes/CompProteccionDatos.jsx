import React, { Component } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import ElePanel from "../../../../elementos/paneles/ElePanel";
import estilos from "./CompProteccionDatos.module.css";

import { recogerIdioma } from "../../../../componentes/Utilidades";
import TextoProteccionDatosES from "../ficheros/ProteccionDatosES";
import TextoProteccionDatosEN from "../ficheros/ProteccionDatosEN";

/**
 * Componente que contiene el texto que se va a visualizar en la ley de protección de datos en inglés o en español.
 *
 * @version 0.1
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
class CompProteccionDatos extends Component {
    static propTypes = {
        /**
         * Fichero cargado con el texto de la ley de protección de datos.
         */
        TextoProteccionDatos: PropTypes.node
    };

    render() {
        let ComponenteProteccionDatos = () => <div />;

        let idioma = recogerIdioma(this.props.lng);

        if (idioma === "es") {
            ComponenteProteccionDatos = TextoProteccionDatosES;
        }

        if (idioma === "en") {
            ComponenteProteccionDatos = TextoProteccionDatosEN;
        }

        return (
            <div className={estilos.contenedorProteccionDatos}>
                <ElePanel claseCss={estilos.panel}>
                    <ComponenteProteccionDatos />
                </ElePanel>
            </div>
        );
    }
}

export default withNamespaces()(CompProteccionDatos);
