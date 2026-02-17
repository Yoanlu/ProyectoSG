import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withTheme } from "@emotion/react";
import { withNamespaces } from "react-i18next";
import "../scripts/devextreme-license";

import estilos from "./CompMenuNavegacion.module.css";
import CompPanelLateral from "../panelesLaterales/CompPanelLateral";
import CompBarraNavegacion from "../barrasNavegacion/CompBarraNavegacion";
import CompCookiesContenedor from "../cookies/CompCookiesContenedor";
import { establecerIdioma } from "../Utilidades";
import anchoContenedor from "../anchoContenedor";

/**
 * Componente que incluye la barra y el panel lateral de navegación.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompMenuNavegacion extends React.Component {
    static propTypes = {
        /**
         * Objeto contenido en el CompMenuNavegación. Valor requerido.
         */
        children: PropTypes.object.isRequired,

        /**
         * Componente que se va a visualizar en el contenedor de mantenimiento.
         */
        history: PropTypes.object.isRequired,

        /**
         * Componente que se va a visualizar en el contenedor de mantenimiento.
         */
        permisos: PropTypes.array.isRequired,

        /**
         * Array que contiene los diferentes temas disponibles.
         */
        opcionesTema: PropTypes.array,

        /**
         * Array que contiene los diferentes idiomas disponibles.
         */
        opcionesIdiomas: PropTypes.array,

        /**
         * Indica si en el menú de usuario está la opción "Mi Perfil".
         */
        menuPerfilVisible: PropTypes.bool,

        /**
         * Texto mostrado como nombre de la aplicación.
         */
        texto: PropTypes.bool,

        /**
         * Objeto de react (span/div) con contenido extra entre el logo y el nombre de la aplicación.
         */
        tituloExtra: PropTypes.object,

        /**
         * Indica si en el menú de usuario está la opción "Cambiar Contraseña".
         */
        menuCambiaPassVisible: PropTypes.bool
    };

    constructor(props) {
        super(props);

        let menuInicial = this.props.construyeMenu(this.props.permisos);

        this.state = {
            menu: menuInicial,
            ruta: this.calculaSeleccionado(),
            panelVisible: this.modoPc()
        };

        this.tienePerfil = window.localStorage.getItem("access_token");
        this.props.actualizarPerfil.dameFoto(false);

        this.cargarTema();
    }

    modoPc = () => {
        let esMovilTablet = this.props.width === "xs" || this.props.width === "sm" || this.props.width === "md";
        return !esMovilTablet;
    };

    onSelectAux = direccionRuta => {
        if (direccionRuta) {
            const win = window.open(direccionRuta, "_blank");
            win.focus();
        }
    };

    onSelect = direccionRuta => {
        if (direccionRuta) {
            this.props.history.push(direccionRuta);
            if (this.state.panelVisible && !this.modoPc()) {
                // Si estamos en movil, cerramos el panel
                this.cambiaVisiblePanel();
            }
        }
    };

    cambiaVisiblePanel = () => {
        this.setState({
            panelVisible: !this.state.panelVisible
        });
    };

    cambiaIdioma = idioma => {
        this.props.i18n.changeLanguage(idioma);
    };

    calculaSeleccionado = () => {
        let ruta = this.props.location.pathname;

        if (ruta !== "/" && ruta.slice(-1) === "/") {
            ruta = ruta.substring(0, ruta.length - 1);
        }

        let primeraBarra = ruta.indexOf("/");
        let ultimaBarra = ruta.lastIndexOf("/");

        if (ultimaBarra > primeraBarra) {
            ruta = ruta.substring(0, ultimaBarra);
        }

        return ruta;
    };

    establecerMenu = () => {
        let nuevoMenu = this.props.construyeMenu(this.props.permisos);

        this.setState({
            menu: nuevoMenu
        });
    };

    cargarTema = async () => {
        try {
            const themes = await import("devextreme/ui/themes");

            if (this.props.theme.palette.mode === "dark") {
                themes.default.current("material.blue.dark.compact");
            } else {
                themes.default.current("material.blue.light.compact");
            }
        } catch (error) {
            // Si no está instalado devexpress grid no cambiamos el tema
        }
    };

    componentDidUpdate(oldProps) {
        if (oldProps.permisos !== this.props.permisos) {
            this.props.actualizarPerfil.dameFoto(false);
            this.establecerMenu();
        }

        if (oldProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                ruta: this.calculaSeleccionado()
            });
        }

        if (this.props.theme.palette.mode !== oldProps.theme.palette.mode) {
            this.cargarTema();
        }
    }

    componentDidMount() {
        let nuevoIdioma = establecerIdioma(this.props.opcionesIdiomas);

        if (nuevoIdioma !== undefined) {
            this.cambiaIdioma(nuevoIdioma);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.tieneImagenFondo === true ? (
                    <style>{"body:before { background-image: url(" + this.props.dameUrlDominio() + "/static/images/logo-bn-color.png); }"}</style>
                ) : (
                    undefined
                )}
                <CompBarraNavegacion
                    imagen={this.props.actualizarPerfil.fotoUsuario}
                    funcionCambiaVisible={this.cambiaVisiblePanel}
                    menuLateralVisible={this.state.panelVisible}
                    funcionCambiaIdioma={this.cambiaIdioma}
                    cambiaLuzTema={this.props.cambiaLuzTema}
                    cambiaColorTema={this.props.cambiaColorTema}
                    tituloExtra={this.props.tituloExtra}
                    texto={this.props.t(this.props.nombreAplicacion, undefined, "auto")}
                    idioma={this.props.lng}
                    estilosBarra="estilosBarra"
                    opcionesTema={this.props.opcionesTema}
                    opcionesIdiomas={this.props.opcionesIdiomas}
                    dameUrlDominio={this.props.dameUrlDominio}
                    peticionLogoutAuth={this.props.peticionLogoutAuth}
                    menuCambiaPassVisible={this.props.menuCambiaPassVisible}
                    menuPerfilVisible={this.props.menuPerfilVisible}
                />

                <CompPanelLateral
                    opcionesMenu={this.state.menu}
                    menuLateralVisible={this.state.panelVisible}
                    funcionCerrar={this.cambiaVisiblePanel}
                    funcionOnSelect={this.onSelect}
                    funcionOnSelectAux={this.onSelectAux}
                    seleccionado={this.state.ruta}
                    nombreAplicacion={this.props.nombreAplicacion}
                />
                <CompCookiesContenedor />

                <div className={estilos.aplicacion + " " + (this.state.panelVisible && this.modoPc() ? estilos.aplicacionNavAbierto : "")}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default anchoContenedor(withRouter(withNamespaces()(withTheme(CompMenuNavegacion))));
