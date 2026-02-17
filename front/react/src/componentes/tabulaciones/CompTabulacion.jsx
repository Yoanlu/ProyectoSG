import React from "react";
import PropTypes from "prop-types";

import EleBarraAplicacion from "../../elementos/barraAplicacion/EleBarraAplicacion";
import estilos from "./CompTabulacion.module.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { servicioCompruebaPermisos } from "../permisos/ServicioPermisos";
import { ProveedorPermisos } from "../permisos/ProveedorPermisos";
import { Stepper, Step, StepButton, StepContent } from "@mui/material";
import EleBotonImagen from "../../elementos/botones/EleBotonImagen";
import anchoContenedor from "../anchoContenedor";

/**
 * Componente Tabulacion.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompTabulacion extends React.PureComponent {
    static contextType = ProveedorPermisos;

    static propTypes = {
        /**
         * Establece el tab que está seleccionado (empezando por el 0).
         */
        seleccionado: PropTypes.number,

        /**
         * Establece si la navegación por los tabs se hace con pestañas o con asistente.
         */
        modoClasico: PropTypes.bool,

        /**
         * Establece si el componente tiene flechas a modo de navegación, ¡solo para modo clasico!
         */
        navegacion: PropTypes.bool,

        /**
         * Establece si el componente tiene los tabs centrados
         */
        centrado: PropTypes.bool,

        /**
         * Establece si el componente es transparente
         */
        transparente: PropTypes.bool,

        /**
         * Función que se ejecuta al pulsar sobre la navegación anterior
         */
        funcionAnterior: PropTypes.func,

        /**
         * Indica si el botón anterior está desactivado
         */
        anteriorDesactivado: PropTypes.bool,

        /**
         * Texto que contiene el tooltip del botón anterior
         */
        tooltipAnterior: PropTypes.string,

        /**
         * Función que se ejecuta al pulsar sobre la navegación siguiente
         */
        funcionSiguiente: PropTypes.func,

        /**
         * Indica si el botón siguiente está desactivado
         */
        siguienteDesactivado: PropTypes.bool,

        /**
         * Texto que contiene el tooltip del botón siguiente
         */
        tooltipSiguiente: PropTypes.string,

        /**
         * Cada uno de los tabs que se incorporan.
         */
        children: PropTypes.any.isRequired
    };

    static defaultProps = {
        modoClasico: false,
        navegacion: false,
        centrado: true,
        transparente: false,
        anteriorDesactivado: false,
        siguienteDesactivado: false
    };

    constructor(props) {
        super(props);

        this.tabsInvisibles = [];
        this.tabsConsulta = [];

        this.state = {
            index: this.props.seleccionado || 0,
            esMovil: this.esDispositivoMovil()
        };
    }

    componentDidMount() {
        if (Array.isArray(this.props.children)) {
            const permisosUsuario = this.context;

            for (let i = 0; i < this.props.children.length; i++) {
                let tab = this.props.children[i];
                if (!tab.props.permisos) {
                    continue;
                }

                let permiso = servicioCompruebaPermisos(
                    tab.props.permisos.permisos_necesarios,
                    tab.props.permisos.permisos_modificar,
                    tab.props.permisos.permisos_añadir,
                    [],
                    permisosUsuario
                );

                if (permiso.principal !== true) {
                    this.tabsInvisibles.push(i);
                } else if (permiso.modificar !== true && tab.props.datoEnEdicion && tab.props.datoEnEdicion.id) {
                    this.tabsConsulta.push(i);
                } else if (permiso.añadir !== true && tab.props.datoEnEdicion && !tab.props.datoEnEdicion.id) {
                    this.tabsConsulta.push(i);
                }
            }
        }
    }

    componentDidUpdate(oldProps) {
        if (oldProps.width !== this.props.width) {
            this.setState({
                esMovil: this.esDispositivoMovil()
            });
        }

        if (oldProps.seleccionado !== this.props.seleccionado && this.props.seleccionado >= 0) {
            this.funcionSeleccionTab(undefined, this.props.seleccionado);
        }

        if (this.props.moverTab > oldProps.moverTab) {
            this.setState({ index: this.state.index + 1 });
        } else if (this.props.moverTab < oldProps.moverTab) {
            this.setState({ index: this.state.index - 1 });
        }
    }

    /**
     * Función que muestra la pestaña que se haya seleccionado
     *
     * @param {event} evento Evento que contiene la pestaña seleccionada
     */
    funcionSeleccionTab = (evento, indice) => {
        this.setState({ index: indice });
    };

    esDispositivoMovil() {
        return (
            typeof window.orientation !== "undefined" ||
            navigator.userAgent.indexOf("IEMobile") !== -1 ||
            this.props.width === "xs" ||
            this.props.width === "sm"
        );
    }

    render() {
        let tabMostrar = this.props.children;
        if (this.props.children.length === undefined) {
            tabMostrar = [this.props.children];
        }

        let tabVisible = tabMostrar.map((tabAMostrar, fila) => {
            let nuevoTabVisible = React.cloneElement(tabAMostrar, {
                activo: this.state.index === fila ? 1 : 0
            });

            return (
                <fieldset disabled={this.tabsConsulta.includes(fila)} key={fila} className={this.state.index === fila ? estilos.tab : estilos.oculto}>
                    <div className={this.props.modoClasico === true ? estilos.contenedorTab : estilos.contenedorAsistente}>{nuevoTabVisible}</div>
                </fieldset>
            );
        });

        return (
            <React.Fragment>
                {this.props.modoClasico === true ? (
                    <React.Fragment>
                        <div className={estilos.contenedorBarraAppTab}>
                            <div className="contenedorFijoBarraAppTab">
                                <EleBarraAplicacion
                                    color="default"
                                    denso
                                    posicion="static"
                                    colorPersonalizado={this.props.transparente ? "rgba(0, 0, 0, 0.1)" : undefined}
                                >
                                    {this.props.navegacion && (
                                        <React.Fragment>
                                            <EleBotonImagen
                                                desactivado={this.props.anteriorDesactivado}
                                                icono="arrow_back"
                                                funcionOnClick={this.props.funcionAnterior}
                                                tooltip={this.props.tooltipAnterior}
                                            />
                                            <span className={estilos.botonTab}>{this.props.tooltipAnterior}</span>
                                        </React.Fragment>
                                    )}

                                    <Tabs
                                        className={this.props.navegacion || this.props.centrado ? estilos.tabCentrado : estilos.tabClasico}
                                        value={this.state.index}
                                        onChange={this.funcionSeleccionTab}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="scrollable"
                                    >
                                        {tabMostrar.map((tabAMostrar, fila) =>
                                            this.tabsInvisibles.includes(fila) ? null : (
                                                <Tab
                                                    wrapped={true}
                                                    className={estilos.solapa}
                                                    disabled={!!tabAMostrar.props.desactivado}
                                                    key={fila}
                                                    label={tabAMostrar.props.titulo}
                                                />
                                            )
                                        )}
                                    </Tabs>

                                    {this.props.navegacion && (
                                        <React.Fragment>
                                            <EleBotonImagen
                                                desactivado={this.props.siguienteDesactivado}
                                                icono="arrow_forward"
                                                funcionOnClick={this.props.funcionSiguiente}
                                                tooltip={this.props.tooltipSiguiente}
                                            />
                                            <span className={estilos.botonTab}>{this.props.tooltipSiguiente}</span>
                                        </React.Fragment>
                                    )}
                                </EleBarraAplicacion>
                            </div>
                        </div>
                        {tabVisible}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {this.state.esMovil ? (
                            <Stepper nonLinear activeStep={this.state.index} orientation="vertical">
                                {tabMostrar.map((tabAMostrar, fila) => (
                                    <Step disabled={tabAMostrar.props.desactivado} key={fila}>
                                        <StepButton indice={fila} onClick={this.funcionSeleccionTab.bind(this, null, fila)}>
                                            {tabAMostrar.props.desactivado ? tabAMostrar.props.titulo : <b>{tabAMostrar.props.titulo}</b>}
                                        </StepButton>

                                        <StepContent>
                                            <fieldset
                                                disabled={this.tabsConsulta.includes(fila)}
                                                className={this.state.index === fila ? estilos.tab : estilos.oculto}
                                            >
                                                <div className={estilos.contenedorAsistente}>{tabAMostrar}</div>
                                            </fieldset>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        ) : (
                            <React.Fragment>
                                <Stepper nonLinear activeStep={this.state.index} className={estilos.asistente}>
                                    {tabMostrar.map((tabAMostrar, fila) => (
                                        <Step disabled={tabAMostrar.props.desactivado} className={estilos.step} key={fila}>
                                            <StepButton indice={fila} onClick={this.funcionSeleccionTab.bind(this, null, fila)}>
                                                {tabAMostrar.props.desactivado ? tabAMostrar.props.titulo : <b>{tabAMostrar.props.titulo}</b>}
                                            </StepButton>
                                        </Step>
                                    ))}
                                </Stepper>
                                {tabVisible}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default anchoContenedor(CompTabulacion);
