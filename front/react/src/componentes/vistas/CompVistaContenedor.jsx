import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import estilos from "./CompVistaContenedor.module.css";
import EleVentanaEmergente from "../../elementos/ventanasEmergentes/EleVentanaEmergente";
import EleTitulo from "../../elementos/titulos/EleTitulo";
import anchoContenedor from "../anchoContenedor";
import { clonar } from "../Utilidades";

/**
 * Componente que proporciona funcionalidad genérica a las Vistas particulares.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompVistaContenedor extends React.PureComponent {
    static propTypes = {
        /**
         * Propiedades para facilitarselas al las vistas particulares
         */
        propiedades: PropTypes.any.isRequired,
        /**
         * Vista particular a facilitar.
         */
        vista: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.errorHTML = false;
        this.referenciaMant = React.createRef();
        this.claveMenu = this.props.propiedades.location.key;

        this.state = {
            mostrarError: false,
            tituloError: null,
            mensajeError: ""
        };
    }

    funcionControlPeticion = llamada => {
        if (!this.montado) {
            return false;
        }

        this.errorHTML = false;

        if (!(llamada && llamada.error)) {
            return true;
        }

        let objetoEstado = null;

        if (llamada.codigo === 0) {
            objetoEstado = {
                tituloError: llamada.titulo,
                mensajeError: llamada.respuesta,
                mostrarError: true
            };
        } else if (llamada.codigo === -1) {
            objetoEstado = {
                tituloError: "",
                mensajeError: this.props.t("conection_lost"),
                mostrarError: true
            };
        } else {
            let mensaje = llamada.respuesta;
            let lectura = this.leerMensaje(mensaje);

            objetoEstado = {
                tituloError: llamada.codigo ? llamada.codigo + " (" + llamada.textoEstado + ")" : llamada.textoEstado,
                mensajeError: lectura,
                mostrarError: true
            };
        }

        if (this.state.mostrarError) {
            objetoEstado.tituloError = this.state.tituloError === objetoEstado.tituloError ? objetoEstado.tituloError : "";
            let mensajeAnterior = clonar(this.state.mensajeError);

            if (Array.isArray(mensajeAnterior)) {
                mensajeAnterior.push(<div key={mensajeAnterior.length + 1}>{objetoEstado.mensajeError}</div>);
                objetoEstado.mensajeError = mensajeAnterior;
            } else if (typeof mensajeAnterior === "object") {
                objetoEstado.mensajeError = [<div key="1">{mensajeAnterior}</div>, <div key="2">{objetoEstado.mensajeError}</div>];
            }
        }

        this.setState(objetoEstado);

        return false;
    };

    leerMensaje = mensaje => {
        let tipoMensaje = typeof mensaje;

        if (Array.isArray(mensaje)) {
            tipoMensaje = "array";
        }

        if (tipoMensaje === "object" && mensaje !== null) {
            return (
                <ul key="list">
                    {Object.keys(mensaje).map((key, index) => {
                        let lectura = this.leerMensaje(mensaje[key]);
                        return (
                            <li key={index}>
                                {key}: {lectura}
                            </li>
                        );
                    })}
                </ul>
            );
        } else if (tipoMensaje === "array" && mensaje !== null) {
            return Object.keys(mensaje).map((key, index) => {
                return this.leerMensaje(mensaje[key]);
            });
        } else if (mensaje !== null) {
            if (mensaje.includes("<!DOCTYPE html>")) {
                this.errorHTML = true;

                const blob = new Blob([mensaje], { type: "text/html" });
                const url = URL.createObjectURL(blob);

                return <iframe className={estilos.iframe} src={url} />;
                // return <div className={estilos.mensajeHTML} dangerouslySetInnerHTML={{ __html: mensaje }} />;
            } else {
                return mensaje;
            }
        }
    };

    componentWillUnmount() {
        this.montado = false;
    }

    componentDidMount() {
        this.montado = true;
    }

    funcionCerrarVentana = () => {
        if (!this.montado) {
            return false;
        }

        this.setState({
            mostrarError: false
        });
    };

    componentDidUpdate() {
        if (this.props.propiedades.location.key !== this.claveMenu) {
            // Guardamos la clave nueva
            this.claveMenu = this.props.propiedades.location.key;

            if (this.referenciaMant.current && this.referenciaMant.current.state && this.referenciaMant.current.state.edicionVisible === true) {
                // Si estaba abierto el mantenimiento, el usuario ha pulsado en el menu lateral, y volvemos a la lista cerrando el mantenimiento

                try {
                    this.referenciaMant.current.setState({
                        datoEnEdicion: {},
                        edicionVisible: false
                    });
                } catch (error) {}
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <this.props.vista
                    {...this.props.propiedades}
                    ref={this.referenciaMant}
                    lng={this.props.lng}
                    t={this.props.t}
                    permisos={this.context}
                    width={this.props.width}
                    funcionControlPeticion={this.funcionControlPeticion}
                />
                {this.state.mostrarError ? (
                    <EleVentanaEmergente
                        titulo={
                            // this.props.t("error") + ": " +
                            this.state.tituloError
                        }
                        ancho={this.errorHTML ? "lg" : "sm"}
                        mensaje={
                            this.errorHTML ? (
                                this.state.mensajeError
                            ) : (
                                <EleTitulo claseCss={estilos.mensajePlano} color="textPrimary">
                                    {this.state.mensajeError}
                                </EleTitulo>
                            )
                        }
                        funcionCerrarVentana={this.funcionCerrarVentana}
                        mostrarError={this.state.mostrarError}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

const CompVistaContenedorIdioma = anchoContenedor(withNamespaces()(CompVistaContenedor));

export function vistaContenedor(ComponenteVista) {
    return function VistaContextualizada(props) {
        return <CompVistaContenedorIdioma propiedades={props} vista={ComponenteVista} />;
    };
}
