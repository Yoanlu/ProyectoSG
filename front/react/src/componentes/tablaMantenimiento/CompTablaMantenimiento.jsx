import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";

import EleBotonImagen from "../../elementos/botones/EleBotonImagen";
import { withNamespaces } from "react-i18next";
import EleVentanaEmergente from "../../elementos/ventanasEmergentes/EleVentanaEmergente";
import CompPermisos from "../permisos/CompPermisos";
import estilos from "./CompTablaMantenimiento.module.css";
import { clonar } from "../Utilidades";
import anchoContenedor from "../anchoContenedor";
import { ProveedorModoconsulta, ProveedorModoCrud } from "../mantenimientos/contenedor/CompMantenimientoContenedor";
import { CircularProgress } from "@mui/material";
import EleBoton from "../../elementos/botones/EleBoton";

const CompTabla = lazy(() => import("../tablas/CompTabla"));

/**
 * Componente tabla mantenimiento.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompTablaMantenimiento extends CompPermisos {
    static propTypes = {
        /**
         * Array que recibe la definición de la lista (nombre de columna, tipo, etc).
         */
        columnas: PropTypes.array.isRequired,
        /**
         * Array con el registro modificable.
         */
        filas: PropTypes.array.isRequired,

        /**
         * Columnas por las que se va a ordenar de inicio.
         */
        campoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
        /**
         * Sentido en el que se van a ordenar las columnas ordenables iniciales.
         */
        sentidoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOf(["asc", "desc"])), PropTypes.string]),
        /**
         * Define el tamaño de la ventana mediante el valor del enumerador 'xs', 'sm', 'md', 'lg', 'xl'
         */
        ancho: PropTypes.string,

        /**
         * Booleano que indica si se abre el alta al empezar.
         */
        iniciarAltaAlPrincipio: PropTypes.bool,

        /**
         * Booleano que indica si se pueden seleccionar todas las filas.
         */
        seleccionarTodo: PropTypes.bool,

        /**
         * Booleano que indica si la lista se va a poder redimensionar por el usuario o si el ancho de los campos es automático.
         */
        listaRedimensionable: PropTypes.bool,

        /**
         * Booleano que indica si la lista permitirá ver/editar registros.
         */
        verHabilitado: PropTypes.bool,

        /**
         * Información extra para el mantenimiento.
         */
        extra: PropTypes.any,

        /**
         * Objeto con los permisos que tendrán la lista y el mantenimiento.
         */
        permisos: PropTypes.object,

        /**
         * Función que se lanza al borrar un registro de la tabla.
         */
        funcionBorrar: PropTypes.func,

        /**
         * Función que se lanza al autoGuardar un registro de la tabla.
         */
        funcionAutoGuardar: PropTypes.func,

        /**
         * Define si la ventana utiliza el botón aceptar como guardado definitivo en BBDD del registro de la tabla.
         */
        autoGuardar: PropTypes.bool,

        /**
         * Recibe el id requerido para poder realizar el CRUD si la ventana de mantenimiento es autoguardable.
         */
        idPrincipal: PropTypes.number,

        /**
         * Booleano que visibiliza el botón de ver/modificar.
         */
        modificarInvisible: PropTypes.bool,

        /**
         * Booleano que habilita la selección por filas.
         */
        seleccionHabilitada: PropTypes.bool,

        /**
         * Recibe el nombre de la entidad principal para poder realizar el CRUD si la ventana de mantenimiento es autoguardable.
         */
        nombrePrincipal: PropTypes.string,

        /**
         * Array con las filas seleccionadas (modo controlado)
         * Si no se pasa, funcionará en modo no controlado
         */
        seleccion: PropTypes.array,

        /**
         * Función que recibe la nueva selección como un nuevo array.
         * No devuelve los IDs, sino el número de fila empezando por 1
         * Debe controlar posibles callbacks
         */
        cambiaSeleccion: PropTypes.func,

        /**
         * Botón para enviar correos visible o no.
         */
        botonEnviarCorreo: PropTypes.bool,
        /**
         * Función del botón para enviar correos.
         */
        enviarCorreo: PropTypes.func
    };

    static defaultProps = {
        añadir: false,
        eliminar: false,
        modificar: false,
        verHabilitado: true,
        listaRedimensionable: false,
        modificarInvisible: false,
        iniciarAltaAlPrincipio: false,
        seleccionHabilitada: true,
        agrupacionHabilitada: true,
        mantSinVentana: false,
        filas: [],
        seleccion: undefined
    };

    constructor(props) {
        super(props);

        this.indiceFilaEdicion = null;
        this.inputOculto = React.createRef();
        this.modoConsulta = null;

        this.estiloFallback = { textAlign: "center", paddingTop: "10%" };

        Object.assign(this, this.props.permisos);

        this.state = {
            datoEnEdicion: {},
            seleccion: [],
            visibleConfirmar: false,
            visibleMantenimiento: false,
            guardando: false
        };
    }

    componentDidMount() {
        if (this.props.iniciarAltaAlPrincipio) {
            this.funcionAlta();
        }
    }

    funcionEnviarCorreo = async () => {
        this.props.enviarCorreo(this.props.seleccion || this.state.seleccion, this.props.filas);
        this.funcionCambiaSeleccion([]);
    };

    funcionAlta = () => {
        if (this.state.guardando === true) {
            this.setState({
                guardando: false
            });
        }
        this.indiceFilaEdicion = null;
        this.modoConsulta = !this.permiso.añadir;

        if (this.props.idPrincipal && this.props.nombrePrincipal) {
            let datoEnEdicion = {};
            datoEnEdicion[this.props.nombrePrincipal] = this.props.idPrincipal;

            this.setState({
                datoEnEdicion: datoEnEdicion,
                visibleMantenimiento: true
            });
        } else {
            this.setState({
                datoEnEdicion: {},
                visibleMantenimiento: true
            });
        }
    };

    funcionModificar = (evento, filasEditar = this.props.seleccion || this.state.seleccion) => {
        if (this.state.guardando === true) {
            this.setState({
                guardando: false
            });
        }

        this.indiceFilaEdicion = filasEditar[0];
        const datoEnEdicionNuevo = clonar(this.props.filas[this.indiceFilaEdicion]);
        this.modoConsulta = !this.permiso.modificar;

        this.setState({
            datoEnEdicion: datoEnEdicionNuevo,
            visibleMantenimiento: true
        });
    };

    funcionAceptar = () => {
        this.setState(
            {
                guardando: true
            },
            this.procesoAceptar
        );
    };

    procesoAceptar = async () => {
        let filasNuevas = clonar(this.props.filas);
        let filaEdicion = clonar(this.state.datoEnEdicion);

        if (this.props.autoGuardar) {
            let peticionAjax = await this.props.funcionAutoGuardar(filaEdicion, this.props.history);
            filaEdicion = peticionAjax.respuesta;

            if (peticionAjax.error) {
                this.props.funcionControlPeticion(peticionAjax);
                this.setState({
                    guardando: false
                });
                return;
            }
        } else {
            this.inputOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
        }

        if (this.indiceFilaEdicion !== null) {
            filasNuevas[this.indiceFilaEdicion] = filaEdicion;
        } else {
            filasNuevas.push(filaEdicion);
        }

        let actualizado = this.props.cambiaEstados(filasNuevas, filaEdicion);
        if (actualizado !== false) {
            this.setState({
                datoEnEdicion: {},
                visibleMantenimiento: false
            });

            this.indiceFilaEdicion = null;
        } else {
            this.setState({
                guardando: false
            });
        }
    };

    funcionCambiaSeleccion = (seleccionNueva, callback) => {
        if (this.props.seleccion === undefined || this.props.cambiaSeleccion === undefined) {
            // Modo no controlado
            this.setState(
                {
                    seleccion: seleccionNueva
                },
                callback
            );
        } else {
            // Modo controlado
            this.props.cambiaSeleccion(seleccionNueva, callback);
        }
    };

    funcionSeleccion = (activarModoCrud = undefined, modoConsulta, seleccionNueva) => {
        let callback = undefined;

        if (modoConsulta === true && seleccionNueva.length > 1) {
            // Solo puede haber un registro seleccionado, nos quedamos con el último
            seleccionNueva = [seleccionNueva[seleccionNueva.length - 1]];
        }

        if (modoConsulta) {
            callback = this.funcionModificar;
        }

        if (modoConsulta && activarModoCrud) {
            activarModoCrud();
        }

        this.funcionCambiaSeleccion(seleccionNueva, callback);
    };

    funcionCambiaEstadoFila = (nuevoEstado, llamada) => {
        if (nuevoEstado.datoEnEdicion) {
            this.setState(nuevoEstado, llamada);
        } else {
            this.setState(
                {
                    datoEnEdicion: nuevoEstado
                },
                llamada
            );
        }
    };

    ordenarNumeros(a, b) {
        return a - b;
    }

    funcionAlternaDialogo = () => {
        this.setState({
            visibleConfirmar: !this.state.visibleConfirmar
        });
    };

    funcionAlternaMantenimiento = () => {
        let modoVisibleMant = this.state.visibleMantenimiento;

        if (modoVisibleMant) {
            this.funcionSeleccion(undefined, false, []);
        }

        this.setState({
            visibleMantenimiento: !modoVisibleMant
        });
    };

    funcionEliminar = () => {
        let filasBorrar = clonar(this.props.seleccion || this.state.seleccion);
        filasBorrar.sort(this.ordenarNumeros).reverse();

        let datosAux = clonar(this.props.filas);
        let datosEliminados = [];

        for (let i = 0; i < filasBorrar.length; i++) {
            const fila = filasBorrar[i];
            datosEliminados.push(datosAux[fila]);
            datosAux.splice(fila, 1);
        }

        this.props.funcionBorrar(datosAux, datosEliminados);

        this.funcionCambiaSeleccion([]);
        this.setState({
            visibleConfirmar: false
        });
    };

    eventoOnChange = evento => {
        evento.stopPropagation();
    };
    
    mostrarBoton = (datosBoton, indice) => {
        let filasSeleccionadas = clonar(this.state.seleccion).slice();

        let listaIds = [];
        for (let i = 0; i < filasSeleccionadas.length; i++) {
            let nfila = filasSeleccionadas[i];
            listaIds.push(this.props.filas[nfila].id);
        }

        return (
            <EleBotonImagen
                key={indice}
                desactivarOndas={true}
                funcionOnClick={datosBoton.funcionOnClick.bind(this, listaIds)}
                desactivado={this.state.verSoloSeleccionados || !this.props.filas || this.props.filas.length === 0 || this.state.seleccion.length < 1}
                fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                primario
                icono={datosBoton.icono}
                tooltip={this.props.t(datosBoton.tooltip)}
            />
        );
    };

    render() {
        let modoSeleccionControlada = this.props.seleccion === undefined || this.props.cambiaSeleccion === undefined;
        let numFilasSeleccionadas = modoSeleccionControlada ? this.state.seleccion.length : this.props.seleccion.length;

        return (
            <ProveedorModoCrud.Consumer>
                {activarModoCrud => (
                    <ProveedorModoconsulta.Consumer>
                        {modoConsulta => (
                            <React.Fragment>
                                {this.state.visibleMantenimiento && this.props.mantSinVentana === true ? (
                                    <div className={estilos.panelMant}>
                                        <this.props.mantenimiento
                                            traduccion={this.props.t}
                                            datoEnEdicion={this.state.datoEnEdicion}
                                            cambiaEstadoFila={this.funcionCambiaEstadoFila}
                                            funcionControlPeticion={this.props.funcionControlPeticion}
                                            extra={this.props.extra}
                                        />
                                        <div className={estilos.botonera}>
                                            <EleBoton
                                                apariencia="contained"
                                                primario
                                                funcionOnClick={this.funcionAlternaMantenimiento}
                                                icono="close"
                                                texto={this.props.t("cancel")}
                                                // claseCss={estilos.borrar}
                                            />
                                            &nbsp;
                                            <EleBoton
                                                apariencia="contained"
                                                primario
                                                funcionOnClick={this.funcionAceptar}
                                                icono="check"
                                                texto={this.props.t("accept")}
                                                // claseCss={estilos.borrar}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <span className={estilos.contenedorBotonesEdicion}>
                                            {this.props.añadir === true || this.permiso.añadir === true ? (
                                                <React.Fragment>
                                                    <EleBotonImagen
                                                        desactivarOndas={true}
                                                        desactivado={this.props.desactivado || modoConsulta}
                                                        funcionOnClick={this.funcionAlta}
                                                        icono="add"
                                                        primario
                                                        tooltip={this.props.t("add")}
                                                    />
                                                    &nbsp;
                                                </React.Fragment>
                                            ) : (
                                                undefined
                                            )}
                                            {this.props.eliminar === true || this.permiso.borrar === true ? (
                                                <React.Fragment>
                                                    <EleBotonImagen
                                                        desactivarOndas={true}
                                                        funcionOnClick={this.funcionAlternaDialogo}
                                                        desactivado={numFilasSeleccionadas === 0 || this.props.desactivado || modoConsulta}
                                                        icono="delete"
                                                        primario
                                                        tooltip={this.props.t("delete")}
                                                    />
                                                    &nbsp;
                                                </React.Fragment>
                                            ) : (
                                                undefined
                                            )}
                                        </span>

                                        {this.props.mantenimiento !== undefined &&
                                            this.props.desactivado !== true &&
                                            this.props.verHabilitado !== false &&
                                            this.props.seleccionHabilitada !== false && (
                                                <EleBotonImagen
                                                    desactivarOndas={true}
                                                    funcionOnClick={this.funcionModificar}
                                                    desactivado={numFilasSeleccionadas !== 1 || this.props.desactivado}
                                                    primario
                                                    icono={
                                                        (this.props.modificar === true || this.permiso.modificar === true) && !modoConsulta
                                                            ? "edit"
                                                            : "visibility"
                                                    }
                                                    tooltip={
                                                        (this.props.modificar === true || this.permiso.modificar === true) && !modoConsulta
                                                            ? this.props.t("edit")
                                                            : this.props.t("view")
                                                    }
                                                />
                                            )}
                                    
                                        {this.props.botonesExtraLista ? this.props.botonesExtraLista : undefined}

                                        {this.props.botonesExtraDinamicos ? this.props.botonesExtraDinamicos.map(this.mostrarBoton) : undefined}

                                        {this.props.botonEnviarCorreo && (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionEnviarCorreo}
                                                desactivado={numFilasSeleccionadas < 1 || this.props.desactivado}
                                                primario
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                icono="forward_to_inbox"
                                                tooltip={this.props.t("send_email")}
                                            />
                                        )}
                                        <Suspense
                                            fallback={
                                                <div style={this.estiloFallback}>
                                                    <CircularProgress size={50} />
                                                </div>
                                            }
                                        >
                                            <CompTabla
                                                columnas={this.props.columnas}
                                                filas={this.props.filas}
                                                seleccion={this.props.seleccion || this.state.seleccion}
                                                seleccionarTodo={this.props.seleccionarTodo}
                                                paginacionHabilitada={this.props.paginacionHabilitada}
                                                agrupacionHabilitada={this.props.agrupacionHabilitada && this.props.columnas.length > 1}
                                                agrupacionInicial={this.props.agrupacionInicial}
                                                funcionSeleccion={this.funcionSeleccion.bind(this, activarModoCrud, modoConsulta)}
                                                campoOrdenacion={this.props.campoOrdenacion}
                                                sentidoOrdenacion={this.props.sentidoOrdenacion}
                                                seleccionClickHabilitado={modoConsulta && this.props.verHabilitado === true}
                                                seleccionHabilitada={
                                                    this.props.seleccionHabilitada === true &&
                                                    !this.props.desactivado &&
                                                    !modoConsulta &&
                                                    !(this.props.verHabilitado === false && this.props.modificarInvisible === true)
                                                }
                                                listaRedimensionable={this.props.listaRedimensionable}
                                                funcionModificar={this.funcionModificar}
                                                modificarInvisible={this.props.modificarInvisible}
                                                editableEnLineaClick={this.props.editableEnLineaClick}
                                                editableEnLineaBotones={this.props.editableEnLineaBotones}
                                                funcionGuardarEnLinea={this.props.funcionGuardarEnLinea}
                                            />
                                        </Suspense>
                                    </>
                                )}

                                <select ref={this.inputOculto} hidden />
                                <fieldset className={estilos.fieldset} onChange={this.eventoOnChange}>
                                    <EleVentanaEmergente
                                        modoConsulta={this.modoConsulta || modoConsulta}
                                        aceptarCancelar={!this.modoConsulta && !modoConsulta}
                                        titulo={this.props.t("maintenance") + " " + this.props.t(this.props.objetosListados)}
                                        funcionAceptar={this.funcionAceptar}
                                        ancho={this.props.ancho}
                                        mostrarError={this.state.visibleMantenimiento && this.props.mantSinVentana === false}
                                        mensaje={
                                            this.props.mantenimiento && this.props.mantSinVentana === false ? (
                                                <this.props.mantenimiento
                                                    traduccion={this.props.t}
                                                    datoEnEdicion={this.state.datoEnEdicion}
                                                    cambiaEstadoFila={this.funcionCambiaEstadoFila}
                                                    funcionControlPeticion={this.props.funcionControlPeticion}
                                                    extra={this.props.extra}
                                                />
                                            ) : (
                                                ""
                                            )
                                        }
                                        funcionCerrarVentana={this.funcionAlternaMantenimiento}
                                        autoGuardar={this.props.autoGuardar && !modoConsulta}
                                        sino={false}
                                        desactivado={this.state.guardando}
                                        desactivarPortal
                                    />

                                    <EleVentanaEmergente
                                        sino
                                        guardar
                                        titulo={this.props.t("delete") + " " + this.props.t(this.props.objetosListados)}
                                        funcionAceptar={this.funcionEliminar}
                                        mostrarError={this.state.visibleConfirmar}
                                        mensaje={this.props.t("continue")}
                                        funcionCerrarVentana={this.funcionAlternaDialogo}
                                    />
                                </fieldset>
                            </React.Fragment>
                        )}
                    </ProveedorModoconsulta.Consumer>
                )}
            </ProveedorModoCrud.Consumer>
        );
    }
}

export default anchoContenedor(withNamespaces(["translations", "grid"])(CompTablaMantenimiento));
