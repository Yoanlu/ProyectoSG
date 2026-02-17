import React from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import estilos from "./EleEntradaNumero.module.css";
import EleEntradaNumeroFormato from "./EleEntradaNumeroFormato";
import { withNamespaces } from "react-i18next";
import { cssModoConsulta } from "../../componentes/Utilidades";
/**
 * Elemento que permite editar y enviar valores numéricos específicos escribiendo o utilizando los indicadores.
 *
 * @version 0.2
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 * @author [Iván Barriga](http://sandav.es) | [ivan.barriga@sandav.es](mailto:ivan.barriga@sandav.es)
 */

const EleEntradaNumero = ({
    identificador,
    inputEntrada,
    nombre,
    valor=null,
    apariencia="standard",
    desactivado=false,
    modoConsulta,
    desactivarSubrayado=false,
    etiqueta=undefined,
    claseCss="",
    minimo,
    maximo,
    separadorMillares=true,
    decimalesMaximos,
    decimalesFijos,
    paso="",
    obligatorio=false,
    validacion=true,
    mensajeValidacion,
    autocompletado="off",
    textoInfoCampo,
    adornoIzquierdo,
    adornoDerecho,
    funcionOnFocus,
    funcionOnBlur,
    funcionOnHover,
    funcionOnChange,
    funcionOnClick,
    lng
}) => {
    const idiomaIngles = lng.includes("en-");

    let propiedadesInput = {
        startAdornment: adornoIzquierdo ? <InputAdornment position="start" children={adornoIzquierdo} /> : undefined,
        endAdornment: adornoDerecho ? <InputAdornment position="end" children={adornoDerecho} /> : undefined,
        inputComponent: EleEntradaNumeroFormato,
        inputProps: {
            separadorMillares: separadorMillares ? (idiomaIngles ? "," : ".") : "",
            separadorDecimales: idiomaIngles ? "." : ",",
            decimalesMaximos: decimalesMaximos,
            decimalesFijos: decimalesFijos,
            min: minimo,
            max: maximo,
            step: paso,
            ref: inputEntrada || undefined
            // style: { textAlign: "right" }
        }
    };

    if (apariencia !== "outlined") {
        propiedadesInput.disableunderline = desactivarSubrayado;
    }

    return (
        <TextField
            required={obligatorio}
            error={!validacion || (obligatorio && (valor === "" || valor === undefined || valor === null))}
            className={estilos.formularioControl + " " + estilos.numeros + " " + claseCss}
            id={identificador}
            name={nombre}
            variant={apariencia}
            type="number"
            readOnly={modoConsulta}
            size="small"
            margin="dense"
            sx={modoConsulta ? cssModoConsulta : undefined}
            value={valor !== undefined ? valor : ""}
            InputLabelProps={{
                // shrink: undefined,
                id: { identificador }
            }}
            label={etiqueta}
            disabled={desactivado}
            placeholder={textoInfoCampo}
            InputProps={propiedadesInput}
            helperText={mensajeValidacion}
            autoComplete={autocompletado}
            onFocus={funcionOnFocus}
            onBlur={funcionOnBlur}
            onMouseOver={funcionOnHover}
            onChange={funcionOnChange}
            onClick={funcionOnClick}
            data-testid="Elemento_EntradaNumero"
        />
    );
};

EleEntradaNumero.propTypes = {
    /**
     * Identificador del elemento
     */
    identificador: PropTypes.string,
    /**
     * Nombre del elemento.
     */
    nombre: PropTypes.string,
    /**
     * Valor actual del elemento objeto [string , numero].
     */
    valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Cambia la apariencia visual del elemento mediante el uso de opciones de estilo alternativas.
     */
    apariencia: PropTypes.oneOf(["standard", "filled", "outlined"]),
    /**
     * Opción de habilitar o deshabilitar el elemento.
     */
    desactivado: PropTypes.bool,
    /**
     * Opción de habilitar o deshabilitar el subrayado.
     */
    desactivarSubrayado: PropTypes.bool,
    /**
     * Muestra una etiqueta para el elemento.
     */
    etiqueta: PropTypes.string,
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Valor mínimo que se podrá ingresar en el campo
     */
    minimo: PropTypes.number,
    /**
     * Valor máximo que se podrá ingresar en el campo
     */
    maximo: PropTypes.number,
    /**
     * Indica si va a tener o no separador para los millares (por defecto no)
     */
    separadorMillares: PropTypes.bool,
    /**
     * Indica la cantidad máxima de decimales que puede tener
     */
    decimalesMaximos: PropTypes.number,
    /**
     * Indica si se muestran siempre los decimales indicados
     */
    decimalesFijos: PropTypes.bool,
    /**
     * Estable el paso que habrá entre números.
     */
    paso: PropTypes.any,
    /**
     * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
     */
    obligatorio: PropTypes.bool,
    /**
     * Opción de autovalidar el contenido del elemento.
     */
    validacion: PropTypes.bool,
    /**
     * Muestra el mensaje de la autovalidación.
     */
    mensajeValidacion: PropTypes.string,
    /**
     * Opción de habilitar el autocompletado del campo.
     */
    autocompletado: PropTypes.string,
    /**
     * Texto informativo que contendrá el campo cuando no se haya introducido valor.
     */
    textoInfoCampo: PropTypes.string,
    /**
     * Decoración que se podrá situar en el interior del input a la izquierda.
     */
    adornoIzquierdo: PropTypes.node,
    /**
     * Decoración que se podrá situar en el interior del input a la derecha.
     */
    adornoDerecho: PropTypes.node,
    /**
     * Función que se dispara cuando el elemento coge el foco.
     */
    funcionOnFocus: PropTypes.func,
    /**
     * Función que se dispara cuando el elemento pierde el foco.
     */
    funcionOnBlur: PropTypes.func,
    /**
     * Función que se dispara el ratón está sobre el elemento.
     */
    funcionOnHover: PropTypes.func,
    /**
     * Función que se dispara después de que el valor del elemento ha cambiado.
     */
    funcionOnChange: PropTypes.func,
    /**
     * Función que se dispara cuando se hace click en el elemento.
     */
    funcionOnClick: PropTypes.func
};

export default withNamespaces()(EleEntradaNumero);
