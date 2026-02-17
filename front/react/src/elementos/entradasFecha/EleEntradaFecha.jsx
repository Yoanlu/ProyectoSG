import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import estilos from './EleEntradaFecha.module.css';
import { cssModoConsulta } from '../../componentes/Utilidades';

/**
 * Elemento que permite editar y enviar valores de tipo fecha, hora y fecha/hora.
 *
 * @version 0.2
 * @author [Iván Barriga](http://sandav.es) | [ivan.barriga@sandav.es](mailto:ivan.barriga@sandav.es)
 */

const EleEntradaFecha = ({
    identificador,
    nombre,
    tipo='date',
    valor='',
    apariencia="standard",
    desactivado=false,
    desactivarSubrayado,
    modoConsulta,
    etiqueta=undefined,
    claseCss='',
    minimo,
    maximo=tipo==='date' ? "2099-12-31" : undefined,
    paso='1',
    obligatorio=false,
    validacion=true,
    mensajeValidacion,
    autocompletado='off',
    textoInfoCampo,
    adornoIzquierdo,
    adornoDerecho,
    funcionOnFocus,
    funcionOnBlur,
    funcionOnHover,
    funcionOnChange,
    funcionOnClick
}) => (
    <TextField
        required={obligatorio}
        error={!validacion || (obligatorio && (valor === undefined || valor === null || valor === ""))}
        className={estilos.formularioControl + ' ' + estilos.fechas + ' ' + claseCss}
        id={identificador}
        name={nombre}
        variant={apariencia}
        readOnly={modoConsulta}
        sx={modoConsulta || desactivado ? cssModoConsulta : undefined}
        type={tipo}
        value={valor}
        size="small"
        margin="dense"
        InputLabelProps={{
            shrink: true,
            id: { identificador }
        }}
        label={etiqueta}
        placeholder={textoInfoCampo}
        InputProps={{
            disableunderline: desactivarSubrayado,
            readOnly: modoConsulta,
            startAdornment: adornoIzquierdo ? (
                <InputAdornment position="start" children={adornoIzquierdo} />
            ) : (
                undefined
            ),
            endAdornment: adornoDerecho ? <InputAdornment position="end" children={adornoDerecho} /> : undefined,

            inputProps: {
                min: minimo,
                max: maximo,
                step: paso,
                readOnly: modoConsulta || desactivado
            }
        }}
        helperText={mensajeValidacion}
        autoComplete={autocompletado}
        onFocus={funcionOnFocus}
        onBlur={funcionOnBlur}
        onMouseOver={funcionOnHover}
        onChange={funcionOnChange}
        onClick={funcionOnClick}
        data-testid="Elemento_EntradaFecha"
    />
);

EleEntradaFecha.propTypes = {
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
     * Valor actual del elemento objeto [string , date].
     */
    valor: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    /**
     * Cambia la apariencia visual del elemento mediante el uso de opciones de estilo alternativas.
     */
    apariencia: PropTypes.oneOf(["standard", "filled", "outlined"]),
    /**
     * Opción de habilitar o deshabilitar el elemento.
     */
    desactivado: PropTypes.bool,
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
    minimo: PropTypes.any,
    /**
     * Valor máximo que se podrá ingresar en el campo
     */
    maximo: PropTypes.any,
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

export default EleEntradaFecha;
