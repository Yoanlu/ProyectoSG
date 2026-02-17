import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import html2pdf from "html2pdf.js";

import estilos from "./CompMantenimientoContenedor.module.css";

import EleBoton from "../../../elementos/botones/EleBoton";
import ElePanel from "../../../elementos/paneles/ElePanel";
import EleBarraAplicacion from "../../../elementos/barraAplicacion/EleBarraAplicacion";
import Componente from "../../Componente";

import { Backdrop, CircularProgress, LinearProgress, SpeedDial, SpeedDialAction } from "@mui/material";
import {
    Close as CloseIcon,
    Save as SaveIcon,
    Print as PrintIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Menu as MenuIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon
} from "@mui/icons-material";

import anchoContenedor from "../../anchoContenedor";

/**
 * Componente contenedor de los mantenimientos.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompMantenimientoContenedor extends Componente {
    static propTypes = {
        /**
         * Componente que se va a visualizar en el contenedor de mantenimiento.
         */
        compMantenimiento: PropTypes.any.isRequired,
        /**
         * Función que muestra el un texto segun el idioma seleccionado
         * @param {string} key - clave del texto a traducir
         */
        t: PropTypes.func.isRequired,
        /**
         * Componente con los botones opcionales del mantenimiento.
         */
        botonesExtraMantenimiento: PropTypes.any,
        /**
         * Componente con los botones flotantes opcionales.
         */
        botonesExtraFlotantes: PropTypes.any,
        /**
         * Boleano que indica si los botones del mantenimiento se muestran como FAB.
         */
        botonesFlotantes: PropTypes.bool,
        /**
         * Botón para imprimir el mantenimiento.
         */
        botonImprimirVisible: PropTypes.bool,
        /**
         * Booleano que indica si el botón de aplicar está deshabilitado.
         */
        aplicarDeshabilitado: PropTypes.bool,
        /**
         * Función que cancela las modificaciones realizadas.
         */
        funcionCancelar: PropTypes.func.isRequired,
        /**
         * Controla que la respuesta de las llamadas al api rest funcionan correctamente
         * en caso de error se mostrara un mensaje con el error
         *
         *  @param {Object} llamada - objeto request de la llamada
         */
        funcionControlPeticion: PropTypes.func.isRequired,
        /**
         * Datos a editar en el componente.
         */
        datoEnEdicion: PropTypes.any.isRequired,
        /**
         * Función que guardará los cambios realizados en el mantenimiento.
         */
        funcionGuardar: PropTypes.func.isRequired,
        /**
         * Función que actualiza el boleano que indica si el usuario ha realizado cambios o no.
         */
        actualizaCambios: PropTypes.func.isRequired,
        /**
         * Función que cambia el estado del componente lista con los datos modificados
         * @param {JSON} estadoCambiar - Objeto con los datos del cliente editado
         */
        funcionCambiaEstados: PropTypes.func.isRequired,
        /**
         * Clase Css que aporta estilos al panel que del mantenimiento.
         */
        estiloPanel: PropTypes.string,
        /**
         * Título del la ventana de mantenimientos
         */
        objetosListados: PropTypes.string,
        /**
         * Datos necesarios de la vista para el mantenimiento.
         */
        datosExtra: PropTypes.any,
        /**
         * Componente de cabecera que se mostrará sobre el mantenimiento.
         */
        cabeceraExtraMantenimiento: PropTypes.any,
        /**
         * Boleano que indica si el usuario ha realizado o no cambios.
         */
        hayCambios: PropTypes.bool.isRequired,
        /**
         * Objeto con datos del evento.
         */
        history: PropTypes.object,
        /**
         * Establece el mantenimiento en modo consulta independientemente de los permisos.
         */
        mantenimientoSoloLectura: PropTypes.bool
    };

    static defaultProps = {
        estiloPanel: "",
        mantenimientoSoloLectura: false,
        aplicarDeshabilitado: false
    };

    constructor(props) {
        super(props);

        this.referenciaMant = React.createRef();
        this.referenciaSubmit = React.createRef();
        this.modoAplicar = false;

        this.coloresSpeedDialAction = {
            sx: {
                bgcolor: "background.panelIntermedio"
            }
        };

        this.clasesTooltip = {
            "& .MuiSpeedDialAction-staticTooltipLabel": {
                width: "max-content"
            }
        };

        this.state = {
            guardadoAsincrono: false,
            fabAbierto: false,
            mantenimientoSimple: true,
            mostrarLoading: false,
            modoConsulta: false,
            mostrarPanel: true
        };
    }

    componentDidMount() {
        if (!this.referenciaMant.current) {
            return;
        }

        let modoConsulta = this.state.modoConsulta;
        let mantenimientoSimple = this.state.mantenimientoSimple;
        let mostrarLoading = this.state.mostrarLoading;
        let guardadoAsincrono = false;
        let panelVisible = true;

        if (this.referenciaMant.current) {
            if (this.referenciaMant.current.guardadoAsincrono) {
                guardadoAsincrono = true;
            }

            if (this.referenciaMant.current.recuperaDatos && this.props.datoEnEdicion && this.props.datoEnEdicion.id) {
                mostrarLoading = true;
            }

            if (this.referenciaMant.current.mostrarPanel === false) {
                panelVisible = false;
            }

            if (this.referenciaMant.current.detalle) {
                mantenimientoSimple = false;

                if (this.referenciaMant.current.permiso) {
                    modoConsulta = this.referenciaMant.current.permiso.modoConsulta;
                }
            } else if (this.referenciaMant.current.permiso) {
                if (this.props.datoEnEdicion.id && this.referenciaMant.current.permiso.modificar !== true) {
                    modoConsulta = true;
                } else if (!this.props.datoEnEdicion.id && this.referenciaMant.current.permiso.añadir !== true) {
                    modoConsulta = true;
                }
            }
        }

        this.setState({
            guardadoAsincrono: guardadoAsincrono,
            modoConsulta: modoConsulta,
            mantenimientoSimple: mantenimientoSimple,
            mostrarLoading: mostrarLoading,
            mostrarPanel: panelVisible
        });
    }

    componentDidUpdate(oldProps) {
        let haCambiadoId = oldProps.datoEnEdicion.id !== this.props.datoEnEdicion.id;
        let haDadoDeAlta = !oldProps.datoEnEdicion.id > 0;
        let haCambiadoAAlta = oldProps.datoEnEdicion.id > 0 && !this.props.datoEnEdicion.id > 0;

        if (haCambiadoId && !haDadoDeAlta && !haCambiadoAAlta && this.referenciaMant.current && this.referenciaMant.current.recuperaDatos) {
            // (haCambiadoId) Si se ha cambiado un registro del mantenimiento por otro y debe recuperar datos, mostramos el loading
            // (haDadoDeAlta) No debe mostrarse si era un alta y ha guardado por primera vez
            // (haCambiadoAAlta) No debe mostrarse si era una modificación y ha pasado a alta

            this.setState({
                mostrarLoading: true
            });
        }
    }

    funcionClickImprimir = () => {
        let contenido = document.getElementById("formMantenimiento");

        var opt = {
            margin: 5,
            filename: this.props.t(this.props.objetosListados) + ".pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { format: "a3", orientation: "p" },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] }
        };

        html2pdf()
            .set(opt)
            .from(contenido)
            .save();
    };

    funcionClickGuardar = () => {
        this.modoAplicar = false;
        this.referenciaSubmit.current.click();
    };

    funcionClickAplicar = () => {
        this.modoAplicar = true;
        this.referenciaSubmit.current.click();
    };

    funcionIniciarGuardar = evento => {
        evento.preventDefault();

        if (this.state.guardadoAsincrono === true) {
            return;
        }

        this.pendienteGuardar = true;
        this.props.datoEnEdicion.pendienteGuardar = true;

        this.setState(
            {
                mostrarLoading: true
            },
            this.funcionGuardar.bind(this, evento)
        );
    };

    funcionGuardar = async (evento) => {
        let hayCambios = false;
        try {
            await this.props.funcionGuardar(evento, this.modoAplicar);
        } catch (error) {
            // Si ha fallado siguen habiendo cambios;
            hayCambios = true;
        }

        this.modoAplicar = false;

        this.pendienteGuardar = hayCambios;
        this.props.datoEnEdicion.pendienteGuardar = hayCambios;
        this.props.datoEnEdicion.hayCambios = hayCambios;

        this.setState({
            mostrarLoading: false
        });
    };

    funcionOnChange = () => {
        if (this.props.hayCambios === false) {
            this.props.actualizaCambios(true);
        }
    };

    funcionCambiaEstados = (...datos) => {
        try {
            if (
                this.props.datoEnEdicion.id !== datos[0].datoEnEdicion.id &&
                !(datos[0].datoEnEdicion.nuevoId === true) &&
                !(datos[0].datoEnEdicion.id === undefined)
            ) {
                // El mantenimiento ha cambiado, cancelamos el cambio de estado
                return;
            }
        } catch (error) {}

        if (this.state.mostrarLoading === true) {
            this.setState({
                mostrarLoading: false
            });
        }

        this.props.funcionCambiaEstados(...datos);
    };

    funcionCerrarFab = () => {
        this.setState({
            fabAbierto: false
        });
    };

    funcionAbrirFab = () => {
        this.setState({
            fabAbierto: true
        });
    };

    funcionActivarCrud = () => {
        if (this.props.previsualizacionCRUD === false) {
            this.props.funcionPrevisualizacionCRUD();
        }
    };

    onClickFab = (callback, extra, evento) => {
        if (extra === "modificarPrevisualizacion") {
            this.funcionActivarCrud();
        }

        this.setState(
            {
                fabAbierto: false
            },
            callback
        );
    };

    render() {
        if (this.pendienteGuardar && !this.props.datoEnEdicion.pendienteGuardar) {
            this.pendienteGuardar = false;
        }

        let soloLectura = this.state.modoConsulta || this.props.mantenimientoSoloLectura || this.state.mostrarLoading || this.pendienteGuardar ? true : false;
        if (this.props.previsualizacion && !this.props.previsualizacionCRUD) {
            soloLectura = true;
        }

        let botonGuardarVisible = this.state.modoConsulta === false && this.props.mantenimientoSoloLectura === false && this.state.guardadoAsincrono === false;

        let textoCancelar = !botonGuardarVisible
            ? this.props.t("close")
            : this.props.hayCambios && !this.state.guardadoAsincrono
            ? this.props.t("cancel")
            : this.props.t("return");

        let textoPrev = this.props.previsualizacionCRUD ? this.props.t("view") : this.props.t("edit");

        let pantallaGrande = this.props.width === "xl";
        let speedDialSiempreAbierto = pantallaGrande && (this.props.previsualizacionCRUD || (!this.props.previsualizacionCRUD && !this.props.previsualizacion));

        let contenido = (
            <>
                {this.props.botonesFlotantes ? (
                    <React.Fragment>
                        <div
                            className={
                                estilos.contenedorCargaFlotante +
                                " " +
                                ((this.state.mostrarLoading || this.pendienteGuardar) && estilos.contenedorCargaFlotanteVisible)
                            }
                        >
                            <CircularProgress />
                        </div>

                        <div
                            className={
                                this.props.previsualizacionCRUD
                                    ? estilos.contenedorFabsPrevCrud
                                    : this.props.previsualizacion
                                    ? estilos.contenedorFabsPrev
                                    : estilos.contenedorFabs
                            }
                        >
                            <Backdrop open={this.state.fabAbierto} />
                            <SpeedDial
                                ariaLabel="Mant"
                                icon={speedDialSiempreAbierto ? <MenuIcon /> : this.state.fabAbierto ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                direction="down"
                                onClose={this.funcionCerrarFab}
                                onOpen={this.funcionAbrirFab}
                                open={this.state.fabAbierto || speedDialSiempreAbierto}
                            >
                                <SpeedDialAction
                                    key="cancelar"
                                    icon={<CloseIcon />}
                                    tooltipTitle={textoCancelar}
                                    sx={this.clasesTooltip}
                                    FabProps={this.props.previsualizacionCRUD ? this.coloresSpeedDialAction : undefined}
                                    onClick={this.onClickFab.bind(this, this.props.funcionCancelar)}
                                />

                                {this.props.previsualizacion && this.props.datoEnEdicion.id > 0 ? (
                                    <SpeedDialAction
                                        key="previsualizacion"
                                        icon={this.props.previsualizacionCRUD ? <VisibilityIcon /> : <EditIcon />}
                                        tooltipTitle={textoPrev}
                                        sx={this.clasesTooltip}
                                        FabProps={speedDialSiempreAbierto ? this.coloresSpeedDialAction : undefined}
                                        onClick={this.onClickFab.bind(this, this.props.funcionPrevisualizacionCRUD)}
                                    />
                                ) : (
                                    undefined
                                )}

                                {botonGuardarVisible && !(!this.props.hayCambios || this.pendienteGuardar === true) ? (
                                    <SpeedDialAction
                                        key="guardar"
                                        icon={<SaveIcon />}
                                        tooltipTitle={this.props.t("save")}
                                        sx={this.clasesTooltip}
                                        FabProps={speedDialSiempreAbierto ? this.coloresSpeedDialAction : undefined}
                                        onClick={this.onClickFab.bind(this, this.funcionClickGuardar)}
                                    />
                                ) : (
                                    undefined
                                )}

                                {this.props.botonesExtraFlotantes
                                    ? this.props.botonesExtraFlotantes.map(accion => (
                                          <SpeedDialAction
                                              key={accion.nombre}
                                              icon={accion.icono}
                                              tooltipTitle={this.props.t(accion.nombre)}
                                              sx={this.clasesTooltip}
                                              FabProps={speedDialSiempreAbierto ? this.coloresSpeedDialAction : undefined}
                                              onClick={this.onClickFab.bind(this, accion.funcion, accion.extra)}
                                          />
                                      ))
                                    : undefined}

                                {this.props.botonImprimirVisible ? (
                                    <SpeedDialAction
                                        key="imprimir"
                                        icon={<PrintIcon />}
                                        tooltipTitle={this.props.t("print")}
                                        sx={this.clasesTooltip}
                                        FabProps={speedDialSiempreAbierto ? this.coloresSpeedDialAction : undefined}
                                        onClick={this.onClickFab.bind(this, this.funcionClickImprimir)}
                                    />
                                ) : (
                                    undefined
                                )}
                            </SpeedDial>
                        </div>
                    </React.Fragment>
                ) : (
                    undefined
                )}

                <form id="formMantenimiento" onChange={this.funcionOnChange} onSubmit={this.funcionIniciarGuardar} className={estilos.fieldset}>
                    {this.state.mantenimientoSimple === true ? (
                        <EleBarraAplicacion denso>
                            {(this.props.datoEnEdicion.id === undefined
                                ? this.props.t("create")
                                : this.state.modoConsulta || this.props.mantenimientoSoloLectura
                                ? this.props.t("see")
                                : this.props.t("edit")) +
                                " " +
                                this.props.t(this.props.objetosListados)}
                        </EleBarraAplicacion>
                    ) : null}

                    <div
                        className={
                            this.state.mostrarPanel
                                ? estilos.mantContenedor + " " + (this.state.mantenimientoSimple === true ? estilos.mantenimientoSimple : "")
                                : " sinPanel"
                        }
                    >
                        <fieldset className={estilos.fieldset}>
                            <ProveedorModoconsulta.Provider value={soloLectura}>
                                <ProveedorModoCrud.Provider value={this.funcionActivarCrud}>
                                    <span className={estilos.contenedorMant}>
                                        <this.props.compMantenimiento
                                            ref={this.referenciaMant}
                                            objetosListados={this.props.objetosListados}
                                            traduccion={this.props.t}
                                            history={this.props.history}
                                            funcionCancelar={this.props.funcionCancelar}
                                            funcionCambiaEstados={this.funcionCambiaEstados}
                                            funcionRecuperarLista={this.props.funcionRecuperarLista}
                                            datoEnEdicion={this.props.datoEnEdicion}
                                            funcionControlPeticion={this.props.funcionControlPeticion}
                                            mantenimientoSoloLectura={this.props.mantenimientoSoloLectura}
                                            width={this.props.width}
                                            datosExtra={this.props.datosExtra}
                                            lng={this.props.lng}
                                            padreSeleccionado={this.props.padreSeleccionado}
                                            mantTerminado={this.props.mantTerminado}
                                            funcionActivarCrud={this.funcionActivarCrud}
                                        />
                                    </span>
                                </ProveedorModoCrud.Provider>
                            </ProveedorModoconsulta.Provider>
                        </fieldset>
                    </div>

                    <button ref={this.referenciaSubmit} type="submit" hidden />
                </form>

                {this.props.botonesFlotantes ? (
                    <div className={estilos.barraBotonesFabs}></div>
                ) : (
                    <ElePanel cuadrado={true} claseCss={estilos.barraBotones}>
                        <div className={estilos.cargando + " " + ((this.state.mostrarLoading || this.pendienteGuardar) && estilos.cargandoVisible)}>
                            <LinearProgress />
                        </div>
                        <div className={estilos.botonesWrapper}>
                            {this.props.botonesExtraMantenimiento || null}
                            &nbsp;
                            {this.props.botonImprimirVisible && (
                                <EleBoton primario={true} icono="print" apariencia="contained" funcionOnClick={this.funcionClickImprimir} />
                            )}
                            &nbsp;
                            <EleBoton texto={textoCancelar} color="error" icono="close" apariencia="contained" funcionOnClick={this.props.funcionCancelar} />
                            {this.props.previsualizacion && (
                                <React.Fragment>
                                    &nbsp;
                                    <EleBoton
                                        texto={textoPrev}
                                        primario={true}
                                        icono={this.props.previsualizacionCRUD ? "visibility" : "edit_document"}
                                        apariencia="contained"
                                        funcionOnClick={this.props.funcionPrevisualizacionCRUD}
                                    />
                                </React.Fragment>
                            )}
                            &nbsp;&nbsp;
                            {botonGuardarVisible ? (
                                <EleBoton
                                    texto={this.props.t("save")}
                                    color="success"
                                    desactivado={
                                        !this.props.hayCambios ||
                                        this.pendienteGuardar === true ||
                                        // Si es modo detalle en alta, no dejamos guardar, solo aplicar
                                        (!this.state.mantenimientoSimple && !this.props.datoEnEdicion.id > 0)
                                    }
                                    icono="save"
                                    apariencia="contained"
                                    funcionOnClick={this.funcionClickGuardar}
                                />
                            ) : null}
                            &nbsp;&nbsp;
                            {botonGuardarVisible && this.props.aplicarDeshabilitado === false && (
                                <EleBoton
                                    texto={this.props.t("grid:apply")}
                                    color="info"
                                    desactivado={!this.props.hayCambios || this.pendienteGuardar === true}
                                    icono="done"
                                    apariencia="contained"
                                    funcionOnClick={this.funcionClickAplicar}
                                />
                            )}
                        </div>
                    </ElePanel>
                )}
            </>
        );

        return (
            <React.Fragment>
                {this.props.cabeceraExtraMantenimiento}

                {this.state.mostrarPanel ? (
                    <ElePanel claseCss={estilos.panelFormulario + " " + this.props.estiloPanel}>{contenido}</ElePanel>
                ) : (
                    <div>{contenido}</div>
                )}
            </React.Fragment>
        );
    }
}

export const ProveedorModoconsulta = React.createContext();
export const ProveedorModoCrud = React.createContext();

export default withNamespaces()(withRouter(anchoContenedor(CompMantenimientoContenedor)));
