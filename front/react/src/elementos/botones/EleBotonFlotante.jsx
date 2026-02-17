import React from "react";
import PropTypes from "prop-types";
import Fab from "@mui/material/Fab";
import EleIcono from "../iconos/EleIcono";
import EleImagen from "../imagenes/EleImagen";
import { CircularProgress } from "@mui/material";

import estilo from "./EleBoton.module.css";

/**
 * Elemento botón flotante.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
const EleBotonFlotante = ({
    apariencia = undefined,
    claseCss,
    texto,
    iconoIzquierda = true,
    icono = "",
    color = "inherit",
    claseIcono = "",
    imagenUrl,
    claseCssImagen,
    estilos,
    tamano = "small",
    cargando,
    desactivado = false,
    primario = undefined,
    funcionOnClick,
    funcionOnHover
}) => {
    if (primario === true) {
        color = "primary";
    } else if (primario === false) {
        color = "secondary";
    }

    let nodoIcono = icono ? <EleIcono icono={icono} claseCss={claseIcono} /> : null;

    return (
        <Fab
            variant={apariencia}
            className={claseCss + " " + estilo.fab}
            disabled={desactivado}
            color={color}
            style={estilos}
            size={tamano}
            onClick={cargando ? undefined : funcionOnClick}
            onMouseOver={funcionOnHover}
            data-testid="Elemento_Boton_Flotante"
        >
            {cargando ? <CircularProgress color="success" size={tamano === "large" ? 62 : 48} className={estilo.cargando} /> : null}
            {iconoIzquierda && nodoIcono}
            {texto}
            {!iconoIzquierda && nodoIcono}
            {imagenUrl ? (
                <React.Fragment>
                    &nbsp; <EleImagen claseCss={claseCssImagen} imagen={imagenUrl} />
                </React.Fragment>
            ) : null}
        </Fab>
    );
};

EleBotonFlotante.propTypes = {
    /**
     * Cambia la apariencia visual del elemento mediante el uso de opciones de estilo alternativas.
     */
    apariencia: PropTypes.oneOf(["extended", "circular"]),
    /**
     * Cambia la apariencia visual del elemento mediante el uso de opciones de estilo alternativas.
     */
    color: PropTypes.oneOf(["inherit", "primary", "secondary", "error", "info", "success", "warning"]),
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

export default EleBotonFlotante;
