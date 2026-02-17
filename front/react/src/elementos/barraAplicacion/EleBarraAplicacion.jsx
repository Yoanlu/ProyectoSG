import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar } from "@mui/material";
import { withStyles } from "@mui/styles";
import { estaVacio, interpolateColor } from "../../componentes/Utilidades";

/**
 * Elemento barra horizontal.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
const EleBarraAplicacion = ({ claseCss, posicion = "static", denso = false, color, colorPersonalizado, children, estilo, classes }) => {
    let estilos = {};

    if (!estaVacio(colorPersonalizado)) {
        estilos.backgroundColor = colorPersonalizado;
        classes.barra = "";
    }

    return (
        <AppBar
            variant=""
            enableColorOnDark={true}
            className={claseCss + " " + classes.barra}
            position={posicion}
            color={color}
            style={estilo || estilos || undefined}
        >
            <Toolbar variant={denso ? "dense" : "regular"}>{children}</Toolbar>
        </AppBar>
    );
};

EleBarraAplicacion.propTypes = {
    /**
     * Clase css que se le va a aplicar al al elemento barra aplicación.
     */
    claseCss: PropTypes.string,
    /**
     * Color por defecto
     */
    color: PropTypes.oneOf(["default", "inherit", "primary", "secondary", "transparent"]),
    /**
     * Color personalizado
     */
    colorPersonalizado: PropTypes.string,
    /**
     * Posición en la web de la barra ( fixed, absolute, sticky, static, relative )
     */
    posicion: PropTypes.oneOf(["fixed", "absolute", "sticky", "static", "relative"]),
    /**
     * Booleano que indica si se aplica un padding menor o el básico.
     */
    denso: PropTypes.bool
};

const estiloBarraTematizado = tema => {
    let degradado = localStorage.getItem("themeGradient");
    let interpolado = localStorage.getItem("themeInterpolate");
    let colorPrincipal = tema.palette.primary.main;
    let colorSecundario = tema.palette.secondary.main;

    let gradient = "";
    if (colorPrincipal !== colorSecundario && degradado === "true") {
        if (interpolado === "true") {
            let colorIntermedio = interpolateColor(colorPrincipal, colorSecundario);
            gradient = `linear-gradient(135deg, ${colorSecundario} 0%, ${colorIntermedio} 50%, ${colorPrincipal} 100%) !important`;
        } else {
            gradient = `linear-gradient(135deg, ${colorSecundario} 0%, ${colorPrincipal} 100%) !important`;
        }
    } else {
        return "";
    }

    return {
        barra: {
            backgroundImage: gradient,
            color: tema.palette.primary.contrastText
        }
    };
};

export default withStyles(estiloBarraTematizado)(EleBarraAplicacion);
