import React from "react";
import PropTypes from "prop-types";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import estilos from "./EleEntradaListaMultiseleccion.module.css";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { cssModoConsulta, estaVacio } from "../../../componentes/Utilidades";
import { withNamespaces } from "react-i18next";
import { Chip } from "@mui/material";
import { useState } from "react";

/**
 * Elemento desplegable en el que se permite elegir en una lista de opciones una o varía de las mismas
 *
 * @version 0.2
 * @author [Mario Cantelar] <mario.cantelar@sandav.es>
 */

const EleEntradaListaMultiseleccion = ({
    nombre,
    datos,
    valor = [],
    textoInput,
    listadoCheck = true,
    campoVisible = "text",
    campoClave = "id",
    claseCss,
    desactivado,
    modoConsulta = false,
    etiqueta,
    controlErrores = true,
    obligatorio,
    multilineas = true,
    funcionOnChange = () => {},
    funcionOnBlur = () => {},
    funcionOnChangeFiltroInput = () => {},
    t,
    mensajeValidacion
}) => {
    let datosConTodos = null;
    let demasiadosRegistros = false;
    if (datos.length > 2000 && textoInput.length < 3) {
        datosConTodos = [];
        demasiadosRegistros = true;
    } else if (datos.length > valor.length) {
        let opcionTodos = {};
        opcionTodos[campoClave] = 0;
        opcionTodos[campoVisible] = "*";
        datosConTodos = [opcionTodos, ...datos];
    } else {
        datosConTodos = datos;
    }

    let valores = datos.filter(x => !estaVacio(valor) && valor.includes(x[campoClave]));
    let error = obligatorio && valor.length === 0 ? true : false;

    let etiquetaVisible = etiqueta;
    let mostrarComoObligatorio = obligatorio && valores.length === 0;

    if (!mostrarComoObligatorio && obligatorio) {
        etiquetaVisible = etiqueta + " *";
    }

    const [abierto, setAbierto] = useState(false);

    return (
        <FormControl readOnly={modoConsulta || desactivado} error={error} required={obligatorio} className={estilos.formControl}>
            <Autocomplete
                size="small"
                margin="dense"
                noOptionsText={demasiadosRegistros ? t("search") : t("no_options")}
                multiple={true}
                value={valores}
                disabledItemsFocusable
                name={nombre}
                onChange={funcionOnChange}
                onBlur={funcionOnBlur}
                inputValue={textoInput}
                onInputChange={funcionOnChangeFiltroInput}
                required={obligatorio}
                // disableClearable={obligatorio}
                disableClearable={false}
                // options={datos}
                options={datosConTodos}
                readOnly={modoConsulta || desactivado}
                sx={modoConsulta || desactivado ? cssModoConsulta : undefined}
                className={claseCss + " " + estilos.desplegable}
                disableCloseOnSelect
                getOptionLabel={option => option[campoVisible]}
                onOpen={e => {
                    setAbierto(true);
                }}
                onClose={e => {
                    setAbierto(false);
                }}
                renderOption={
                    listadoCheck
                        ? (props, option, { selected }) => {
                              if (option[campoClave] === 0) {
                                  return <li {...props}>{option[campoVisible]}</li>;
                              } else {
                                  return (
                                      <li {...props}>
                                          <span className={estilos.contenedorCheck}>
                                              <input type="checkbox" checked={selected} readOnly />
                                          </span>
                                          {option[campoVisible]}
                                      </li>
                                  );
                              }
                          }
                        : undefined
                }
                renderTags={tags => {
                    let indice = 0;
                    let listaTags = tags.map(tag => {
                        let tagHTML;
                        const valor = tag[campoVisible];

                        if (desactivado) {
                            tagHTML = (
                                <span key={tag[campoClave]}>
                                    {indice > 0 ? ", " : ""}
                                    {valor}
                                </span>
                            );
                        } else {
                            tagHTML = <Chip className={estilos.tagDesplegable} key={indice} label={valor} size="small" color="default" clickable />;
                        }

                        indice++;
                        return tagHTML;
                    });

                    return <span className={(abierto || multilineas ? "" : estilos.desplegableCerrado) + " selectValue"}>{listaTags}</span>;
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        required={mostrarComoObligatorio}
                        error={error}
                        variant="standard"
                        // variant="outlined"
                        name={nombre}
                        // value={valores}
                        label={etiquetaVisible}
                        placeholder={modoConsulta || desactivado ? "" : t("grid:filter")}
                    />
                )}
            />

            {controlErrores && <FormHelperText> </FormHelperText>}
        </FormControl>
    );
};

EleEntradaListaMultiseleccion.propTypes = {
    /**
     * Establece un nombre al elemento.
     */
    nombre: PropTypes.string,
    /**
     * Establece los valores del elemento.
     */
    datos: PropTypes.array.isRequired,
    /**
     * Valor actual del elemento.
     */
    valor: PropTypes.any,
    /**
     * Límite de líneas visibles en el desplegable multiseleccion.
     */
    multilineas: PropTypes.bool,
    /**
     * Formato del la lista de valores en el desplegable con o sin Check
     */
    listadoCheck: PropTypes.bool,
    /**
     * Indica el campo visible en el desplegable.
     */
    campoVisible: PropTypes.string,
    /**
     * Indica el campo que identifica el item del desplegable.
     */
    campoClave: PropTypes.string,
    
    /**
     * Opción de introducir valores que no están presentes en el conjunto de datos iniciales
     */
    anadirDatos: PropTypes.bool,

    /**
     * Clase CSS que aplica en el elemento.
     */

    claseCss: PropTypes.string,
    /**
     * Opción de desactivar o activar el elemento.
     */
    desactivado: PropTypes.bool,
    /**
     * Muestra una etiqueta para el elemento.
     */

    etiqueta: PropTypes.string,
    /**
     * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
     */

    /**
     * Opción de desactivar o activar el elemento de mensaje de error
     */
    controlErrores: PropTypes.bool,

    obligatorio: PropTypes.bool,
    /**
     * Función que se dispara cuando el elemento pierde el foco.
     */
    funcionOnBlur: PropTypes.func,
    /**
     * Función que se dispara cuando el elemento coge el foco.
     */
    funcionOnFocus: PropTypes.func,
    /**
     * Función que se dispara después de que el valor del elemento ha cambiado.
     */

    funcionOnChange: PropTypes.func
};

export default withNamespaces(["translations", "grid"])(EleEntradaListaMultiseleccion);
