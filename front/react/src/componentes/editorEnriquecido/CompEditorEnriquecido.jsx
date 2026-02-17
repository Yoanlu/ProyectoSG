import React from "react";
import PropTypes from "prop-types";

import ContenedorEditorEnriquecido from "./ContenedorEditorEnriquecido";

/**
 * Componente editor de texto enriquecido.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompEditorEnriquecido extends React.PureComponent {
    static propTypes = {
        /**
         * Valor HTML inicial del editor.
         */
        valorInicial: PropTypes.string,
        /**
         * ID del registro.
         */
        id: PropTypes.number,
        /**
         * Nombre del elemento.
         */
        nombre: PropTypes.string.isRequired,
        /**
         * String con la url del servidor al que subir imágenes.
         */
        dameUrl: PropTypes.string,
        /**
         * Función que recibe el html del editor.
         */
        funcionOnChange: PropTypes.func,
        /**
         * Url del css que se quiere agregar (para previsualización del html)
         */
        hoja_estilos: PropTypes.string
    };

    render() {
        if (this.props.id > 0 && this.props.valorInicial === undefined) {
            // Aun no se ha recuperado el valor, no cargamos el componente
            return;
        }

        return (
            <ContenedorEditorEnriquecido
                dameUrl={this.props.dameUrl}
                hoja_estilos={this.props.hoja_estilos}
                valorInicial={this.props.valorInicial}
                nombre={this.props.nombre}
                funcionOnChange={this.props.funcionOnChange}
            />
        );
    }
}

export default CompEditorEnriquecido;
