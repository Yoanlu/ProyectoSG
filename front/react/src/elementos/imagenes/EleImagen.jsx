import React from 'react';
import PropTypes from 'prop-types';

/**
 * Elemento imagen.
 *
 * @version 0.1
 * @author [Sara García](http://enlace.a.la.web.del.programador.com) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
const EleImagen = ({ imagen='', claseCss='', ancho='inherit', alto='inherit', textoAlternativo='No hay imagen', funcionOnClick }) => (
    <img
        src={imagen}
        className={claseCss}
        width={ancho}
        height={alto}
        alt={textoAlternativo}
        onClick={funcionOnClick}
    />
);

EleImagen.propTypes = {
    /**
     * Especifica la url de la imagen.
     */
    imagen: PropTypes.string,
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Especifica el ancho de la imagen.
     */
    ancho: PropTypes.string,
    /**
     * Especifica el alto de la imagen.
     */
    alto: PropTypes.string,
    /**
     * Texto informativo para la imagen en caso de no ser encontrada.
     */
    textoAlternativo: PropTypes.string,
    /**
     * Función que se dispara cuando se hace click en el elemento.
     */
    funcionOnClick: PropTypes.func
};

export default EleImagen;
