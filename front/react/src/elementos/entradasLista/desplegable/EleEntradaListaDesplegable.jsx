import React from "react";
import PropTypes from "prop-types";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import estilo from "./EleEntradaListaDesplegable.module.css";
import { withNamespaces } from "react-i18next";
// import { ArrowDropDown } from "@mui/icons-material";
import { cssModoConsulta, estaVacio } from "../../../componentes/Utilidades";

/**
 * Elemento desplegable en el que se permite elegir un solo valor predefinido de una lista de opciones.
 *
 * @version 0.2
 * @author [Mario Cantelar] <mario.cantelar@sandav.es>
 */

class EleEntradaListaDesplegable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.valorElegidoPorUsuario = false;

        this.state = {
            desplegableAbierto: false
        };
    }

    funcionOnChangeAutocomplete = (evento, obj) => {
        this.valorElegidoPorUsuario = true;
        this.props.funcionOnChange(evento, obj);
    };

    funcionAbrirDesplegable = () => {
        if (!this.props.modoConsulta && !this.props.desactivado) {
            this.valorElegidoPorUsuario = false;

            this.setState({
                desplegableAbierto: true
            });
        }
    };

    funcionCerrarDesplegable = () => {
        if (this.props.anadirDatos === true && this.valorElegidoPorUsuario === false && !estaVacio(this.props.textoInput)) {
            this.props.funcionOnChange({}, this.props.textoInput);
        }

        this.props.funcionOnChangeFiltroInput({}, "");
        this.valorElegidoPorUsuario = false;

        this.setState({
            desplegableAbierto: false
        });
    };

    // funcionOnKeyDownTextField = () => {
    // this.refTextField.readOnly = this.props.modoConsulta ? true : false;
    // };

    render() {
        let {
            nombre,
            datos,
            idSeleccionado = "",
            campoVisible = "text",
            campoClave = "id",
            desactivado,
            modoConsulta = false,
            etiqueta = "",
            apariencia="standard",
            controlErrores = true,
            grupo = undefined,
            claseCss,
            obligatorio,
            textoInput,
            funcionOnChangeFiltroInput,
            funcionOnBlur,
            t,
            forzarTraduccion = true,
            funcionOnChange = () => {},
            cierraSelect = () => {}
        } = this.props;

        let valorSeleccionado = datos ? datos.find(x => idSeleccionado === x[campoClave]) : undefined;
        if (valorSeleccionado === undefined) {
            valorSeleccionado = null;
        }

        let error = obligatorio && !idSeleccionado;

        let mostrarComoObligatorio = obligatorio && estaVacio(valorSeleccionado);

        let etiquetaVisible = etiqueta;
        if (!mostrarComoObligatorio && obligatorio) {
            etiquetaVisible = etiqueta + " *";
        }

        let datosFiltrados = null;
        let demasiadosRegistros = false;
        if (datos.length > 5000 && textoInput.length < 3) {
            datosFiltrados = [];
            demasiadosRegistros = true;
        }

        let valorInput = !this.state.desplegableAbierto && valorSeleccionado ? valorSeleccionado[campoVisible] + "" : textoInput;
        
        if (valorSeleccionado === null && typeof idSeleccionado === "string" && !estaVacio(idSeleccionado)) {
            valorSeleccionado = idSeleccionado;
            valorInput = idSeleccionado;
        }

        return (
            <FormControl readOnly={modoConsulta || desactivado} error={error} required={obligatorio} className={estilo.formControl}>
                <Autocomplete
                    noOptionsText={demasiadosRegistros ? t("search") : t("no_options")}
                    name={nombre}
                    options={datosFiltrados === null ? datos : datosFiltrados}
                    required={obligatorio}
                    readOnly={modoConsulta || desactivado}
                    size="small"
                    margin="dense"
                    // disableClearable={obligatorio}
                    disableClearable={false}
                    freeSolo={this.props.anadirDatos}
                    sx={modoConsulta || desactivado ? cssModoConsulta : undefined}
                    onOpen={this.funcionAbrirDesplegable}
                    onClose={this.funcionCerrarDesplegable}
                    groupBy={grupo ? (option) => option[grupo] : undefined}
                    getOptionLabel={option => {
                        if (typeof option === "string") {
                            return option;
                        }

                        let result = option.hasOwnProperty(campoVisible)
                            ? forzarTraduccion
                                ? t(option[campoVisible], undefined, "auto")
                                : option[campoVisible]
                            : "";

                        return result;
                    }}
                    // getOptionSelected={(option, value) =>
                    //     option.hasOwnProperty(campoVisible) && value.hasOwnProperty(campoVisible) ? option[campoClave] === value[campoClave] : null
                    // }
                    // popupIcon={<ArrowDropDown />}
                    renderOption={(props, opt, state) => {
                        let keyUnica = opt[campoClave] + "-" + opt[campoVisible];

                        return (
                            <li {...props} key={keyUnica}>
                                {opt[campoVisible]}
                            </li>
                        );
                    }}
                    value={valorSeleccionado}
                    onChange={this.funcionOnChangeAutocomplete}
                    onBlur={funcionOnBlur}
                    inputValue={valorInput}
                    onInputChange={funcionOnChangeFiltroInput}
                    className={claseCss}
                    renderInput={params => (
                        <TextField
                            {...params}
                            required={mostrarComoObligatorio}
                            error={error}
                            variant={apariencia}
                            name={nombre}
                            // onKeyDown={this.funcionOnKeyDownTextField}
                            onFocus={this.funcionOnFocusInput}
                            // value={valorSeleccionado}
                            label={etiquetaVisible}
                        />
                    )}
                />

                {controlErrores && <FormHelperText> </FormHelperText>}
            </FormControl>
        );
    }
}

EleEntradaListaDesplegable.propTypes = {
    /**
     * Establece un nombre al elemento.
     */
    nombre: PropTypes.string,
    /**
     * Establece los valores del elemento (Valor obligatorio).
     */
    datos: PropTypes.array.isRequired,
    /**
     * Identificador del elemento que se cargará en valor.
     */
    idSeleccionado: PropTypes.any,
    /**
     * Indica el campo visible en el desplegable (Valor obligatorio).
     */
    campoVisible: PropTypes.string,
    /**
     * Indica el campo que identifica el item del desplegable.
     */
    campoClave: PropTypes.string,
    /**
     * Opción de desactivar o activar el elemento.
     */
    desactivado: PropTypes.bool,
    /**
     * Opción de agrupar las filas.
     */
    grupo: PropTypes.string,
    /**
     * Opción de desactivar o activar el elemento de mensaje de error
     */
    controlErrores: PropTypes.bool,
    /**
     * Indica si se intenta traducir el valor.
     */
    forzarTraduccion: PropTypes.bool,
    /**
     * Muestra una etiqueta para el elemento.
     */
    etiqueta: PropTypes.string,

    /**
     * Opción de introducir valores que no están presentes en el conjunto de datos iniciales
     */
    anadirDatos: PropTypes.bool,

    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
     */
    obligatorio: PropTypes.bool,
    /**
     * Función que se dispara después de que el valor del elemento ha cambiado.
     */
    funcionOnChange: PropTypes.func
    /**
     * Establece si el desplegable esta abierto o colapsado.
     */
    // selectAbierto: PropTypes.bool.isRequired,
};

export default withNamespaces(["translations", "grid"])(EleEntradaListaDesplegable);
