import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompEntradaCirculoColor.module.css";
import CompEntrada from "../../componentes/entrada/CompEntrada";
import EleBoton from "../../elementos/botones/EleBoton";
import { SketchPicker, CirclePicker } from "react-color";
import EleMenuEmergente from "../../elementos/menuEmergente/EleMenuEmergente";

/**
 * Componente que permitirá la entrada de colores, pudiendo escribirse o ser seleccionado en las distintas paletas.
 *
 * @version 0.1
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompEntradaCirculoColor extends React.PureComponent {
    static propTypes = {
        /**
         * Valor del color seleccionado.
         */
        color: PropTypes.string,
        /**
         * nombre del campo de color.
         */
        nombre: PropTypes.string,
        
    };

    static defaultProps = {
        color: '#000000'
    };

    constructor(props) {
        super(props);
    }

    
    funcionOnChange = (...argumentos) => {
        return this.props.funcionOnChange(...argumentos, this.props.nombre);
    };

    render() {

        return (
            <React.Fragment>                
                <div className={estilos.contenedorEntradaCirculoColor} ref={this.dameContenedorEntradaColor}>
                    <EleBoton
                        claseCss={estilos.botonSeleccionColor}
                        estilos={{ backgroundColor: this.props.color || undefined }}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default CompEntradaCirculoColor;