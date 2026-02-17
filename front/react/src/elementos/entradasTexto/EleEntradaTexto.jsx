import React from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import estilos from "./EleEntradaTexto.module.css";
import EleEntradaTextoMascara from "./EleEntradaTextoMascara";
import { cssModoConsulta, formatearNumero } from "../../componentes/Utilidades";

/**
 * Elemento que permite editar y enviar valores alfabéticos.
 *
 * @version 0.2
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 * @author [Iván Barriga](http://sandav.es) | [ivan.barriga@sandav.es](mailto:ivan.barriga@sandav.es)
 */
const EleEntradaTexto = ({
    identificador,
    inputEntrada,
    nombre,
    tipo = "text",
    valor = "",
    apariencia = "standard",
    desactivado = false,
    desactivarSubrayado = false,
    modoConsulta,
    etiqueta = undefined,
    claseCss = "",
    obligatorio = false,
    validacion = true,
    mensajeValidacion,
    autocompletado = "off",
    multilineas,
    lineas,
    lineasMaximas,
    textoInfoCampo,
    adornoIzquierdo,
    adornoDerecho,
    maximo = undefined,
    decimalesMaximos,
    decimalesFijos,
    mascara,
    caracterPlaceholder,
    funcionOnFocus,
    funcionOnBlur,
    funcionOnHover,
    funcionOnChange,
    funcionOnClick,
    funcionOnkeyDown
}) => {
    let propiedadesInput = {
        inputComponent: mascara ? EleEntradaTextoMascara : undefined,
        inputProps: {
            mascara: mascara,
            maxLength: maximo,
            ref: inputEntrada || undefined,
            readOnly: modoConsulta || desactivado,
            placeholder: mascara ? caracterPlaceholder : textoInfoCampo
        },
        startAdornment: adornoIzquierdo ? <InputAdornment position="start" children={adornoIzquierdo} /> : undefined,
        endAdornment: adornoDerecho ? <InputAdornment position="end" children={adornoDerecho} /> : undefined
    };

    // if (apariencia !== "outlined") {
    //     propiedadesInput.disableunderline = desactivarSubrayado;
    // }

    let tieneErrores = !validacion || (obligatorio && (valor === undefined || valor === null || valor === ""));

    return (
        <TextField
            required={obligatorio}
            error={tieneErrores && !desactivado}
            className={estilos.formularioControl + " " + estilos.texto + " " + (tipo === "number" ? estilos.tipoNumero : "") + " " + claseCss}
            id={identificador}
            value={valor}
            name={nombre}
            type={(valor === "-" || tipo === "number") ? "text" : tipo}
            variant={apariencia}
            label={etiqueta}
            multiline={multilineas}
            minRows={lineas}
            maxRows={lineasMaximas}
            readOnly={modoConsulta}
            size="small"
            margin="dense"
            sx={modoConsulta || desactivado ? cssModoConsulta : undefined}
            InputLabelProps={{
                shrink: textoInfoCampo || mascara || adornoIzquierdo ? true : undefined,
                id: { identificador }
            }}
            InputProps={propiedadesInput}
            helperText={mensajeValidacion}
            autoComplete={autocompletado}
            onFocus={funcionOnFocus}
            onBlur={funcionOnBlur}
            onMouseOver={funcionOnHover}
            onChange={funcionOnChange}
            onClick={funcionOnClick}
            onKeyDown={funcionOnkeyDown}
            data-testid="Elemento_EntradaTexto"
        />
    );
};

EleEntradaTexto.propTypes = {
    /**
     * Identificador del elemento
     */
    identificador: PropTypes.string,
    /**
     * Nombre del elemento.
     */
    nombre: PropTypes.string,
    /**
     * Tipo de entrada que va a permitir el elemento.
     */
    tipo: PropTypes.string,
    /**
     * Valor actual del elemento objeto [string , numero].
     */
    valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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
     * Opción de introducir varias líneas.
     */
    multilineas: PropTypes.bool,
    /**
     * Número de líneas.
     */
    lineas: PropTypes.number,
    /**
     * En caso de tener multilineas determina el número máximo de las mismas.
     */
    lineasMaximas: PropTypes.number,
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
     * Máximo número de caracteres permitidos
     */
    maximo: PropTypes.number,
    /**
     * Patrón o máscara que deber seguir el valor ingresado en el campo.
     */
    mascara: PropTypes.array,
    /**
     * Caracter que se muestra ocupando las posiciones sin rellenar de la máscara.
     */
    caracterPlaceholder: PropTypes.string,
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

export default EleEntradaTexto;
