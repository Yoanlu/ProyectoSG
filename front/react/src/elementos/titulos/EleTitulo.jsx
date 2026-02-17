import React from "react";
import PropTypes from "prop-types";

import { Typography } from "@mui/material";

import estilos from "./EleTitulo.module.css";

/**
 * Elemento título que permite cargar desde un h1.
 *
 * @version 0.1
 * @author [Sara García] <sara.garcia@sandav.es>
 */
const EleTitulo = ({ tipoTitulo="inherit", color="textPrimary", enLinea, convertirSaltosDeLinea=false, claseCss, children, funcionOnClick=() => {} }) => {
    let resultado = children;
    if (convertirSaltosDeLinea && typeof resultado === "string") {
        let resultados = resultado.split(/(?:\r\n|\r|\n)/g);

        resultado = [];
        resultados.forEach((elemento, indice) => {
            resultado.push(
                <span key={indice}>
                    {elemento}
                    <br />
                </span>
            );
        });
    }

    return (
        <Typography component="div" variant={tipoTitulo} color={color} className={claseCss + " " + (enLinea && estilos.enLinea)} onClick={funcionOnClick}>
            {resultado}
        </Typography>
    );
};

EleTitulo.propTypes = {
    /**
     * Nivel de título que se necesita.
     */
    tipoTitulo: PropTypes.string,

    /**
     * Indica si la disposición es en línea (o en bloque)
     */
    enLinea: PropTypes.bool,

    /**
     * Indica si deben convertirse los saltos de línea en <br />
     */
    convertirSaltosDeLinea: PropTypes.bool,

    /**
     *Clase css a aplicar.
     */
    claseCss: PropTypes.string,

    /**
     * Color del texto contenidio
     */
    color: PropTypes.oneOf(["initial", "error", "inherit", "primary", "secondary", "textPrimary", "textSecondary"]),

    /**
     * Contenido del elemento.
     */
    children: PropTypes.any.isRequired
};

export default EleTitulo;
