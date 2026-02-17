import React from "react";
import PropTypes from "prop-types";

import EleEntradaListaDesplegable from "../../elementos/entradasLista/desplegable/EleEntradaListaDesplegable";
import EleEntradaListaMultiseleccion from "../../elementos/entradasLista/multiseleccion/EleEntradaListaMultiseleccion";
import { ProveedorModoconsulta } from "../mantenimientos/contenedor/CompMantenimientoContenedor";

/**
 * Componente que generará un input dependiendo del tipo de entrada que se necesite.
 *
 * @version 0.4
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 * @author [Iván Barriga](http://sandav.es) | [ivan.barriga@sandav.es](mailto:ivan.barriga@sandav.es)
 */
class CompDesplegable extends React.PureComponent {
    static propTypes = {
        tipoDesplegable: PropTypes.oneOf(["desplegable", "multiseleccion"]),
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
         * Límite de líneas visibles en el desplegable multiseleccion.
         */
        multilineas: PropTypes.bool,
        /**
         * Indica el campo visible en el desplegable (Valor obligatorio).
         */
        campoVisible: PropTypes.string,
        /**
         * Indica el campo que identifica el item del desplegable.
         */
        campoClave: PropTypes.string,
        /**
         * Valor seleccionado por defecto.
         */
        valorMultiseleccion: PropTypes.any,
        /**
         * Opción de desactivar o activar el elemento.
         */
        desactivado: PropTypes.bool,
        /**
         * Opción de activar o desactivar el modo filtro.
         */
        filtro: PropTypes.bool,
        /**
         * Muestra una etiqueta para el elemento.
         */
        etiqueta: PropTypes.string,
        /**
         * Indica si se intenta traducir el valor.
         */
        forzarTraduccion: PropTypes.bool,
        /**
         * Clase CSS que aplica en el elemento.
         */
        claseCss: PropTypes.string,
        /**
         * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
         */
        obligatorio: PropTypes.bool,
        /**
         * Opción de agrupar las filas.
         */
        grupo: PropTypes.string,
        /**
         * Formato del la lista de valores en el desplegable con o sin Check
         */
        listadoCheck: PropTypes.bool,
        /**
         * Formato del la lista de valores en el desplegable con o sin Check
         */
        apariencia: PropTypes.oneOf(["standard", "outlined", "filled"]),
        /**
         * Opción de introducir valores que no están presentes en el conjunto de datos iniciales
         */
        anadirDatos: PropTypes.bool,
        /**
         * Función que se dispara después de que el valor del elemento ha cambiado.
         */
        funcionOnChange: PropTypes.func.isRequired,
        /**
         * Función que se dispara cuando el elemento pierde el foco.
         */
        funcionOnBlur: PropTypes.func,
        /**
         * Función que se dispara cuando el elemento coge el foco.
         */
        funcionOnFocus: PropTypes.func
    };

    static defaultProps = {
        campoVisible: "text",
        campoClave: "id",
        desplegableFiltroLista: false,
        filtro: true,
        multilineas: true,
        idSeleccionado: null,
        anadirDatos: false,
        apariencia: "standard"
    };

    constructor(props) {
        super(props);

        this.inputOculto = React.createRef();

        this.state = {
            filaMarcada: null,
            selectAbierto: false,
            campoFiltro: null,
            contenedorDesplegable: null,
            textoInput: ""
        };
    }

    funcionOnChangeDesplegable = (evento, obj) => {
        this.inputOculto.current.dispatchEvent(new Event("change", { bubbles: true }));

        let clave = obj ? obj[this.props.campoClave] : null;
        if (this.props.anadirDatos === true && typeof obj === "string") {
            // Es modo Free Solo, y tenemos un valor que no está en el desplegable
            this.props.funcionOnChange(obj, this.props.nombre, obj);
            return;
        }

        this.props.funcionOnChange(clave, this.props.nombre, obj);
    };

    funcionOnChangeFiltroInput = (event, textoInput) => {
        if (!event) {
            return;
        }

        this.setState({
            textoInput: textoInput
        });
    };

    funcionOnChangeMultiseleccion = (evento, obj) => {
        this.inputOculto.current.dispatchEvent(new Event("change", { bubbles: true }));

        // onChange antiguo
        // this.props.funcionOnChange(evento.target.value, this.props.nombre, obj.key);

        let claves = obj.map(x => x[this.props.campoClave]);

        if (claves.includes(0)) {
            // Seleccionamos todos los registros
            obj = this.props.datos;
            claves = obj.map(x => x[this.props.campoClave]);
        }

        this.props.funcionOnChange(claves, this.props.nombre, obj);
    };

    render() {
        return (
            <ProveedorModoconsulta.Consumer>
                {modoConsulta => (
                    <React.Fragment>
                        <select ref={this.inputOculto} name={this.props.nombre} hidden />

                        {this.props.tipoDesplegable === "desplegable" && (
                            <EleEntradaListaDesplegable
                                nombre={this.props.nombre}
                                datos={this.props.datos}
                                anadirDatos={this.props.anadirDatos}
                                idSeleccionado={this.props.idSeleccionado}
                                textoInput={this.state.textoInput}
                                campoVisible={this.props.campoVisible}
                                campoClave={this.props.campoClave}
                                desactivado={this.props.desactivado}
                                modoConsulta={modoConsulta}
                                etiqueta={this.props.etiqueta}
                                controlErrores={this.props.controlErrores}
                                forzarTraduccion={this.props.forzarTraduccion}
                                claseCss={this.props.claseCss}
                                obligatorio={this.props.obligatorio}
                                apariencia={this.props.apariencia}
                                grupo={this.props.grupo}
                                funcionOnChange={this.funcionOnChangeDesplegable}
                                funcionOnBlur={this.props.funcionOnBlur}
                                funcionOnChangeFiltroInput={this.funcionOnChangeFiltroInput}
                            />
                        )}

                        {this.props.tipoDesplegable === "multiseleccion" && (
                            <EleEntradaListaMultiseleccion
                                nombre={this.props.nombre}
                                datos={this.props.datos}
                                valor={this.props.valorMultiseleccion}
                                textoInput={this.state.textoInput}
                                listadoCheck={this.props.listadoCheck}
                                campoVisible={this.props.campoVisible}
                                campoClave={this.props.campoClave}
                                claseCss={this.props.claseCss}
                                desactivado={this.props.desactivado}
                                modoConsulta={modoConsulta}
                                multilineas={this.props.multilineas}
                                etiqueta={this.props.etiqueta}
                                controlErrores={this.props.controlErrores}
                                obligatorio={this.props.obligatorio}
                                apariencia={this.props.apariencia}
                                funcionOnChange={this.funcionOnChangeMultiseleccion}
                                funcionOnBlur={this.props.funcionOnBlur}
                                funcionOnChangeFiltroInput={this.funcionOnChangeFiltroInput}
                            />
                        )}
                    </React.Fragment>
                )}
            </ProveedorModoconsulta.Consumer>
        );
    }
}

export default CompDesplegable;
