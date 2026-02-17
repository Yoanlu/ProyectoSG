import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import EleMenuEmergente from "../../elementos/menuEmergente/EleMenuEmergente";
import EleBoton from "../../elementos/botones/EleBoton";
import EleBotonImagen from "../../elementos/botones/EleBotonImagen";
import estilos from "./CompBarraNavegacion.module.css";
import EleImagen from "../../elementos/imagenes/EleImagen";
import EleMenuLista from "../../elementos/menuLista/EleMenuLista";
import EleBarraAplicacion from "../../elementos/barraAplicacion/EleBarraAplicacion";

import { withNamespaces } from "react-i18next";
import anchoContenedor from "../anchoContenedor";

/**
 * Componente que aporta animación al componente que se le pasa como hijo.
 *
 * @version 0.3
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompBarraNavegacion extends React.PureComponent {
    static propTypes = {
        /**
         * Valor del idioma seleccionado
         */
        idioma: PropTypes.string,

        /**
         * Texto que aparecerá en la barra.
         */
        texto: PropTypes.string,

        /**
         * Objeto de react (span/div) con contenido extra entre el logo y el nombre de la aplicación.
         */
        tituloExtra: PropTypes.object,

        /**
         * Objeto con datos del evento.
         */
        history: PropTypes.object,

        /**
         * Función que se va a disparar cuando se seleccione un idioma en el desplegablo de los idiomas.
         */
        funcionCambiaIdioma: PropTypes.func,

        /**
         * Función que se disparará cuando hago click en alguno de los icones con desplegable de la barra.
         */
        funcionCambiaVisible: PropTypes.func,

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
         * Indica si en el menú de usuario está la opción "Cambiar Contraseña".
         */
        menuCambiaPassVisible: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            popupAvatarVisible: false,
            popupIdiomaVisible: false,
            popupTemaVisible: false,
            popupLuzVisible: false
        };

        this.urlDominio = this.props.dameUrlDominio();

        this.opcionesAvatar = [
            {
                titulo: "logout",
                ruta: "/logout"
            }
        ];

        if (this.props.menuCambiaPassVisible && this.props.menuPerfilVisible) {
            // Es decimir
            this.opcionesAvatar.unshift({
                titulo: "privacy_policy",
                ruta: "/privacy-policy"
            });

            this.opcionesAvatar.unshift({
                titulo: "Cookies",
                ruta: "/cookies-policy"
            });
        }

        if (this.props.menuCambiaPassVisible) {
            this.opcionesAvatar.unshift({
                titulo: "change_password",
                ruta: "/changePassword"
            });
        }

        if (this.props.menuPerfilVisible) {
            this.opcionesAvatar.unshift({
                titulo: "my_profile",
                ruta: "/myProfile"
            });
        }

        this.alineacionAnclaIdiomas = {
            horizontal: "left",
            vertical: "bottom"
        };

        this.alineacionContenidoIdiomas = {
            horizontal: "left",
            vertical: "top"
        };

        this.alineacionAnclaTema = {
            horizontal: "right",
            vertical: "bottom"
        };

        this.alineacionAnclaLuz = {
            horizontal: "right",
            vertical: "bottom"
        };

        this.alineacionContenidoTema = {
            horizontal: "right",
            vertical: "top"
        };

        this.alineacionContenidoLuz = {
            horizontal: "right",
            vertical: "top"
        };

        this.alineacionAnclaAvatar = {
            horizontal: "right",
            vertical: "bottom"
        };

        this.alineacionContenidoAvatar = {
            horizontal: "right",
            vertical: "top"
        };
    }

    opcionesLuz = [
        {
            titulo: "os_default",
            ruta: "os"
        },
        {
            titulo: "claro",
            ruta: "light"
        },
        {
            titulo: "oscuro",
            ruta: "dark"
        }
    ];

    abreAvatar = () => {
        this.setState({ popupAvatarVisible: !this.state.popupAvatarVisible });
    };

    irAtras = () => {
        this.props.history.goBack();
    };

    abreIdiomas = () => {
        this.setState({ popupIdiomaVisible: !this.state.popupIdiomaVisible });
    };

    abreTema = () => {
        this.setState({ popupTemaVisible: !this.state.popupTemaVisible });
    };

    abreLuz = () => {
        this.setState({ popupLuzVisible: !this.state.popupLuzVisible });
    };

    cerrarAvatar = () => {
        this.setState({ popupAvatarVisible: false });
    };

    cerrarIdiomas = () => {
        this.setState({ popupIdiomaVisible: false });
    };

    cerrarTema = () => {
        this.setState({ popupTemaVisible: false });
    };

    cerrarLuz = () => {
        this.setState({ popupLuzVisible: false });
    };

    funcionSelectMenuAvatar = valor => {
        if (valor === "/logout") {
            this.props.peticionLogoutAuth(this.props.history);
        } else {
            this.props.history.push(valor);
        }
        this.abreAvatar();
    };

    funcionSelectMenuIdioma = valor => {
        this.props.funcionCambiaIdioma(valor);
        this.cerrarIdiomas();
    };

    funcionSelectColorTema = valor => {
        this.props.cambiaColorTema(valor);
        this.cerrarTema();
    };

    funcionSelectLuzTema = valor => {
        this.props.cambiaLuzTema(valor);
        this.cerrarLuz();
    };

    siguienteLuz = () => {
        let luzUsuario = localStorage.getItem("theme");
        let luzActual = this.opcionesLuz.findIndex(fila => fila.ruta === luzUsuario);
        let luzSiguiente = (luzActual + 1) % this.opcionesLuz.length;

        this.props.cambiaLuzTema(this.opcionesLuz[luzSiguiente].ruta);
    };

    siguienteIdioma = () => {
        let idiomaUsuario = this.props.idioma;
        let idiomaActual = this.props.opcionesIdiomas.findIndex(fila => fila.ruta === idiomaUsuario);
        let idiomaSiguiente = (idiomaActual + 1) % this.props.opcionesIdiomas.length;

        this.funcionSelectMenuIdioma(this.props.opcionesIdiomas[idiomaSiguiente].ruta);
    };

    siguienteTema = () => {
        let temaUsuario = localStorage.getItem("themeColor");
        let temaActual = this.props.opcionesTema.findIndex(fila => fila.ruta === temaUsuario);
        let temaSiguiente = (temaActual + 1) % this.props.opcionesTema.length;

        this.funcionSelectColorTema(this.props.opcionesTema[temaSiguiente].ruta);
    };

    funcionIrHome = () => {
        this.props.history.push("/");
    };

    getReferenciaIdioma = contenedorBoton => {
        this.anchorIdiomas = contenedorBoton;
    };

    getReferenciaTema = contenedorBotonTema => {
        this.anchorTema = contenedorBotonTema;
    };

    getReferenciaLuz = contenedorBotonLuz => {
        this.anchorLuz = contenedorBotonLuz;
    };

    getReferenciaAvatar = contenedorBoton => {
        this.anchorAvatar = contenedorBoton;
    };

    abrirCookies = () => {
        document.querySelector("#changePreferences").click();
    };

    componentDidMount() {
        const mql = window.matchMedia("(prefers-color-scheme: dark)");

        mql.addEventListener("change", temaOS => {
            if (localStorage.getItem("theme") === "os") {
                this.props.cambiaLuzTema("os");
            }
        });
    }

    render() {
        let tienePerfil = window.localStorage.getItem("access_token");
        let mostrarCookies = window.cookieconsent !== undefined;

        let temaUsuario = localStorage.getItem("theme");
        let colorTemaApp = localStorage.getItem("themeColor");
        let iconoTema = "lightbulb";

        if (temaUsuario === "os") {
            iconoTema = "lightbulb_circle";
        } else if (temaUsuario === "dark") {
            iconoTema = "lightbulb_outlined";
        }

        return (
            <EleBarraAplicacion
                posicion="absolute"
                claseCss={
                    estilos.barraAplicacion +
                    " " + (this.props.estilosBarra || "") + 
                    " animated faster slideInDown " +
                    (colorTemaApp === "#f45e2c" || colorTemaApp === "#e70f47" ? estilos.degradadoSandav : "")
                }
            >
                <EleBotonImagen
                    icono={this.props.menuLateralVisible ? "menu_open" : "menu"}
                    claseCss={estilos.botonMenu}
                    funcionOnClick={this.props.funcionCambiaVisible}
                />

                {/* <span className={estilos.invisibleMovil}>
                    <EleBotonImagen fuente="small" icono="west" funcionOnClick={this.irAtras} tooltip={this.props.t("go_back", undefined, "auto")} />
                </span> */}

                <span ref={this.getReferenciaIdioma}>
                    <EleBotonImagen
                        fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                        icono="language"
                        funcionOnClick={this.abreIdiomas}
                        funcionOnClickRueda={this.siguienteIdioma}
                        tooltip={this.props.t("language", undefined, "auto")}
                    />
                </span>

                <EleMenuEmergente
                    ancla={this.anchorIdiomas}
                    visible={this.state.popupIdiomaVisible}
                    alineacionAncla={this.alineacionAnclaIdiomas}
                    alineacionContenido={this.alineacionContenidoIdiomas}
                    claseCss={estilos.popupWrapper}
                    claseCssContenido={estilos.popupContent}
                    funcionClickFuera={this.cerrarIdiomas}
                >
                    <EleMenuLista
                        datos={this.props.opcionesIdiomas}
                        campoClave="ruta"
                        campoVisible="titulo"
                        funcionOnClick={this.funcionSelectMenuIdioma}
                        seleccionado={this.props.idioma}
                    />
                </EleMenuEmergente>

                <EleImagen
                    imagen={this.urlDominio + "/static/images/logo-empresa-2.png"}
                    claseCss={estilos.logo + " " + estilos.invisibleMovil}
                    funcionOnClick={this.funcionIrHome}
                />

                {this.props.tituloExtra ? this.props.tituloExtra : undefined}
                <b className="nombreAplicacion">{this.props.texto}</b>
                {process.env.NODE_ENV !== "production" && <h2>&nbsp;DEV</h2>}

                <div className={estilos.seccionBarraDerecha} />

                {/* <Hidden smDown implementation="css">
                    // PC
                    <EleBotonImagen icono="west" funcionOnClick={this.irAtras} tooltip={this.props.t("go_back", undefined, "auto")} />
                </Hidden> */}
                {this.props.cambiaLuzTema ? (
                    <span ref={this.getReferenciaLuz}>
                        <EleBotonImagen
                            icono={iconoTema}
                            fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                            funcionOnClick={this.abreLuz}
                            funcionOnClickRueda={this.siguienteLuz}
                            tooltip={this.props.t("light", undefined, "auto")}
                        />
                    </span>
                ) : (
                    undefined
                )}

                <EleMenuEmergente
                    ancla={this.anchorLuz}
                    visible={this.state.popupLuzVisible}
                    alineacionAncla={this.alineacionAnclaLuz}
                    alineacionContenido={this.alineacionContenidoLuz}
                    claseCss={estilos.popupWrapper}
                    claseCssContenido={estilos.popupContent}
                    funcionClickFuera={this.cerrarLuz}
                >
                    <EleMenuLista
                        datos={this.opcionesLuz}
                        campoClave="ruta"
                        campoVisible="titulo"
                        funcionOnClick={this.funcionSelectLuzTema}
                        seleccionado={temaUsuario}
                    />
                </EleMenuEmergente>

                {mostrarCookies && (
                    <React.Fragment>
                        <EleBotonImagen
                            icono="settings"
                            funcionOnClick={this.abrirCookies}
                            fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                            tooltip={this.props.t("Cookies", undefined, "auto")}
                        />
                    </React.Fragment>
                )}

                {this.props.opcionesTema && (
                    <span ref={this.getReferenciaTema}>
                        <EleBotonImagen
                            icono="color_lens"
                            fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                            funcionOnClick={this.abreTema}
                            funcionOnClickRueda={this.siguienteTema}
                            tooltip={this.props.t("theme", undefined, "auto")}
                        />
                    </span>
                )}

                <EleMenuEmergente
                    ancla={this.anchorTema}
                    visible={this.state.popupTemaVisible}
                    alineacionAncla={this.alineacionAnclaTema}
                    alineacionContenido={this.alineacionContenidoTema}
                    claseCss={estilos.popupWrapper}
                    claseCssContenido={estilos.popupContent}
                    funcionClickFuera={this.cerrarTema}
                >
                    <EleMenuLista
                        datos={this.props.opcionesTema}
                        campoClave="ruta"
                        campoVisible="titulo"
                        funcionOnClick={this.funcionSelectColorTema}
                        seleccionado={localStorage.getItem("themeColor")}
                    />
                </EleMenuEmergente>

                {tienePerfil ? (
                    <React.Fragment>
                        <span ref={this.getReferenciaAvatar}>
                            <EleBoton
                                imagenUrl={this.props.imagen ? this.props.imagen : this.urlDominio + "/static/images/default-user-image.png"}
                                fuente="small"
                                claseCss={estilos.botonAvatar}
                                funcionOnClick={this.abreAvatar}
                            />
                        </span>

                        <EleMenuEmergente
                            ancla={this.anchorAvatar}
                            visible={this.state.popupAvatarVisible}
                            alineacionAncla={this.alineacionAnclaAvatar}
                            alineacionContenido={this.alineacionContenidoAvatar}
                            claseCss={estilos.popupWrapper}
                            claseCssContenido={estilos.popupContent}
                            funcionClickFuera={this.cerrarAvatar}
                        >
                            <EleMenuLista
                                seleccionado={this.props.location.pathname}
                                datos={this.opcionesAvatar}
                                campoClave="ruta"
                                campoVisible="titulo"
                                funcionOnClick={this.funcionSelectMenuAvatar}
                            />
                        </EleMenuEmergente>
                    </React.Fragment>
                ) : null}
            </EleBarraAplicacion>
        );
    }
}

export default anchoContenedor(withNamespaces()(withRouter(CompBarraNavegacion)));
