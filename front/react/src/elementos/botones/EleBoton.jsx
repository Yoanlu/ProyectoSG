import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import EleIcono from "../iconos/EleIcono";
import EleImagen from "../imagenes/EleImagen";
import { CircularProgress } from "@mui/material";

import estilo from "./EleBoton.module.css";

/**
 * Elemento tipo botón.
 *
 * @version 0.1
 * @author [Sara García](https://www.sandav.es) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
const EleBoton = ({
    tipo = "button",
    apariencia = "text",
    claseCss,
    texto,
    iconoIzquierda = true,
    icono = "",
    claseIcono = "",
    imagenUrl,
    claseCssImagen,
    color = undefined,
    estilos,
    tamano = "small",
    cargando,
    desactivado = false,
    primario = undefined,
    funcionOnClick = () => {},
    funcionOnHover,
    referencia
}) => {
    if (!color) {
        color = "inherit";
    }
    
    if (primario === true) {
        color = "primary";
    } else if (primario === false) {
        color = "secondary";
    }

    let nodoIcono = icono ? <EleIcono icono={icono} claseCss={claseIcono} /> : null;

    return (
        <Button
            ref={referencia}
            type={tipo}
            variant={apariencia}
            className={claseCss}
            disabled={desactivado || cargando}
            color={color}
            style={estilos}
            size={tamano}
            onClick={funcionOnClick}
            onMouseOver={funcionOnHover}
            data-testid="Elemento_Boton"
        >
            {cargando ? <CircularProgress size={24} className={estilo.cargando} /> : null}
            {iconoIzquierda && nodoIcono}
            {texto}
            {!iconoIzquierda && nodoIcono}
            {imagenUrl ? (
                <React.Fragment>
                    &nbsp; <EleImagen claseCss={claseCssImagen} imagen={imagenUrl} />
                </React.Fragment>
            ) : null}
        </Button>
    );
};

EleBoton.propTypes = {
    /**
     * Indicador del tipo del elemento ( button, submit, reset )
     */
    tipo: PropTypes.oneOf(["button", "submit", "reset"]),
    /**
     * Indica el color del botón
     */
    color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning',]),
    /**
     * Cambia la apariencia visual del elemento mediante el uso de opciones de estilo alternativas.
     */
    apariencia: PropTypes.oneOf(["text", "outlined", "contained"]),
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Texto contenido en el elemento.
     */
    texto: PropTypes.string,
    /**
     * Define el nombre del icono selecionado para visualizar en el elemento.
     */
    icono: PropTypes.string,
    /**
     * Indica si el icono está a la izquierda del texto.
     */
    iconoIzquierda: PropTypes.bool,
    /**
     * Clase CSS que aplica en el icono seleccionado para el elemento.
     */
    claseIcono: PropTypes.string,
    /**
     * Define la url de la imagen seleccionada para visualizar en el elemento.
     */
    imagenUrl: PropTypes.string,
    /**
     * Establece los estilos directos sobre el elemento.
     */
    estilos: PropTypes.object,
    /**
     * Tamaño del elemento
     */
    tamano: PropTypes.oneOf(["small", "medium", "large"]),
    /**
     * Indica si el botón debe mostrar una apariencia de carga o espera.
     */
    cargando: PropTypes.bool,
    /**
     * Opción de habilitar o deshabilitar el elemento.
     */
    desactivado: PropTypes.bool,
    /**
     * Agrega un peso visual al elemento y lo hace primario.
     */
    primario: PropTypes.bool,
    /**
     * Función que se dispara cuando se hace click en el elemento.
     */
    funcionOnClick: PropTypes.func,
    /**
     * Función que se dispara el ratón está sobre el elemento.
     */
    funcionOnHover: PropTypes.func
};

export default EleBoton;
