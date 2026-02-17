import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import Componente from "../Componente";
import EleIcono from "../../elementos/iconos/EleIcono";
import EleImagen from "../../elementos/imagenes/EleImagen";
import { estaVacio } from "../Utilidades";


/**
 * Componente lista configurable.
 *
 * @version 0.2
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompListadoTotales extends Componente {
    static propTypes = {
        /**
         * Array con todas las filas a mostrar.
         */
        datos: PropTypes.array.isRequired,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCssContenedor: PropTypes.string,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCssIcono: PropTypes.string,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCssEtiqueta: PropTypes.string,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCssTotales: PropTypes.string,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCssFila:PropTypes.string,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCssImagen:PropTypes.string

    };

    static defaultProps = {
        
    };

    constructor(props) {
        super(props);

    }

    
    render() {
        return (
            <div className={"row "+ this.props.claseCssContenedor}>
                {this.props.datos.map((item, index) => (
                    <div className={"col-sm-2 col-md-2 " + this.props.claseCssFila} key={index}>                   
                            {item.icono ? (<div className={ this.props.claseCssIcono}><EleIcono icono={item.icono} /></div>):(undefined)}    
                            {item.imagen ? (<div className={ this.props.claseCssImagen}><EleImagen imagen={item.imagen} /></div>):(undefined)}                    
                            {item.etiqueta ? (<div className={ this.props.claseCssEtiqueta}>{item.etiqueta}</div>):(undefined)}                    
                            {estaVacio(item.valor) ? (undefined):(<div className={this.props.claseCssTotales}>{item.valor}</div>)}
                    </div>
            ))}
        </div>
        );
    }
}

export default withNamespaces()(CompListadoTotales);
