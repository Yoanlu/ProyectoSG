import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import estilos from "./CompMenuExpandible.module.css";

import List from "@mui/material/List";
import { ListItemButton, ListItemText, Collapse, Divider } from "@mui/material";
import EleIcono from "../../elementos/iconos/EleIcono";
import { clonar, cssListas } from "../Utilidades";

/**
 * Componente menú expandible.
 * Refactorizado en 2023 por rendimiento y ordenacion alfabetica de submenus
 *
 * @version 0.2
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompMenuExpandible extends React.Component {
    static propTypes = {
        /**
         * Item seleccionado.
         */
        seleccionado: PropTypes.string.isRequired,
        /**
         * Función que se lanza cuando se pulsa sobre una opción del menú.
         */
        funcionOnSelect: PropTypes.func.isRequired,
        /**
         * Array de objetos con las opciones a visualizar.
         */
        opcionesMenu: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.menuSeleccionado = null;
        this.loginDisponible = false;

        let opcionesMenuTraducidasIniciales = this.generaOpcionesMenuTraducidas();

        this.state = {
            elementosAbiertos: null,
            opcionesMenuTraducidas: opcionesMenuTraducidasIniciales,
            opcionesNav: []
        };
    }

    funcionOnAuxClickElemento = (ruta, evento) => {
        if (evento.button === 1) {
            this.props.funcionOnSelectAux(ruta);
        }
    };

    funcionOnClickElemento = (ruta, claveElemento) => {
        this.props.funcionOnSelect(ruta);
        if (ruta === this.props.seleccionado) {
            return;
        }

        if (claveElemento) {
            let eleAbiertos = clonar(this.state.elementosAbiertos);
            if (!this.state.elementosAbiertos) {
                eleAbiertos = [];
            } else {
                eleAbiertos = eleAbiertos.slice(0);
            }

            if (eleAbiertos.includes(claveElemento)) {
                eleAbiertos.splice(eleAbiertos.indexOf(claveElemento), 1);
            } else {
                eleAbiertos = [];
                eleAbiertos.push(claveElemento);
            }

            this.setState({
                elementosAbiertos: eleAbiertos
            });
        }
    };

    generaOpcionesMenuTraducidas = () => {
        this.loginDisponible = false;
        if (!this.props.t || !this.props.opcionesMenu) {
            return [];
        }

        let opcionesTraducidas = [];
        this.props.opcionesMenu.forEach(opcionMenu => {
            let nuevaOpcion = {
                titulo: this.props.t(opcionMenu.titulo)
            };

            if (opcionMenu.ruta) {
                nuevaOpcion.ruta = opcionMenu.ruta;

                if (!this.loginDisponible && opcionMenu.ruta === "/login") {
                    this.loginDisponible = true;
                }
            }

            if (opcionMenu.icono) {
                nuevaOpcion.icono = opcionMenu.icono;
            }

            if (opcionMenu.componente) {
                nuevaOpcion.componente = opcionMenu.componente;
            }

            if (opcionMenu.opciones) {
                let opcionesOrdenadas = [];

                opcionMenu.opciones.forEach(submenu => {
                    if (!this.loginDisponible && submenu.ruta === "/login") {
                        this.loginDisponible = true;
                    }

                    let nuevoSubmenu = clonar(submenu);
                    nuevoSubmenu.titulo = this.props.t(submenu.titulo);

                    opcionesOrdenadas.push(nuevoSubmenu);
                });

                if (!(opcionMenu.ordenable === false)) {
                    opcionesOrdenadas.sort(function(a, b) {
                        return a === b ? 0 : a.titulo > b.titulo ? 1 : -1;
                    });
                }

                nuevaOpcion.opciones = opcionesOrdenadas;
            }

            opcionesTraducidas.push(nuevaOpcion);
        });

        if (!this.loginDisponible && this.props.seleccionado === "/login") {
            // Si tiene usuario no podemos ir al login
            this.funcionOnClickElemento("/");
        }

        return opcionesTraducidas;
    };

    generaOpcionesNav = (opcionesMenu, clavePadre = "", arrayPadres = []) => {
        if (clavePadre === "") {
            this.menuSeleccionado = null;
        }

        if (!opcionesMenu || !this.props.t) {
            if (clavePadre === "") {
                this.establecerTituloSeleccionado();
            }

            return null;
        }

        let nuevaOpcion = opcionesMenu.map((opcion, i) => {
            let claveUnica = clavePadre + "." + i;

            let padres = Object.assign([], arrayPadres);
            padres.push(claveUnica);

            let estaSeleccionado = this.props.seleccionado === opcion.ruta;
            let elementosAbiertosActuales = arrayPadres;

            if (estaSeleccionado && !this.state.elementosAbiertos) {
                this.setState({
                    elementosAbiertos: elementosAbiertosActuales
                });
            } else {
                elementosAbiertosActuales = this.state.elementosAbiertos;
            }

            if (estaSeleccionado) {
                this.menuSeleccionado = opcion.titulo;
            }

            const estaAbierto = elementosAbiertosActuales && elementosAbiertosActuales.includes(claveUnica);
            const esPrincipal = clavePadre === "";
            const textoPrincipal = esPrincipal && !estaSeleccionado;

            let estiloLista = estilos.elementoListaInline;
            let estiloSeparador = estilos.separadorInline;
            if (opcion.opciones || esPrincipal) {
                estiloLista = "";
                estiloSeparador = "";
            }

            let iconoExpansion = opcion.opciones ? (
                <EleIcono color="action" claseCss={estilos.iconoExpansion} icono={estaAbierto ? "expand_less" : "expand_more"} />
            ) : null;

            let opcionesGeneradas = opcion.opciones ? (
                <React.Fragment>
                    <Collapse in={estaAbierto} timeout="auto" unmountOnExit>
                        <List component="div" dense disablePadding>
                            {this.generaOpcionesNav(opcion.opciones, claveUnica, padres)}
                        </List>
                    </Collapse>
                </React.Fragment>
            ) : null;

            if ("componente" in opcion) {
                return (
                    <React.Fragment key={claveUnica}>
                        <opcion.componente />
                        <Divider light className={estiloSeparador} />
                        {opcionesGeneradas}
                    </React.Fragment>
                );
            }

            return (
                <React.Fragment key={claveUnica}>
                    <ListItemButton
                        sx={cssListas}
                        dense={!opcion.opciones && esPrincipal}
                        className={estiloLista + " " + (estaSeleccionado ? estilos.listItemSeleccionado : "")}
                        selected={estaSeleccionado}
                        onClick={this.funcionOnClickElemento.bind(this, opcion.ruta, opcion.opciones ? claveUnica : null)}
                        // onAuxClick={this.funcionOnAuxClickElemento.bind(this, opcion.ruta)}
                        onMouseDown={this.funcionOnAuxClickElemento.bind(this, opcion.ruta)}
                    >
                        <span className={esPrincipal ? estilos.elementoLista : ""}>
                            {opcion.icono && esPrincipal && <EleIcono claseCss={estilos.iconoLista} color="action" icono={opcion.icono} />}

                            <ListItemText
                                className={estilos.contenedorItem}
                                primary={textoPrincipal ? undefined : opcion.titulo}
                                secondary={textoPrincipal ? opcion.titulo : undefined}
                            />
                            {iconoExpansion}
                        </span>
                    </ListItemButton>
                    <Divider light className={estiloSeparador} />
                    {opcionesGeneradas}
                </React.Fragment>
            );
        });

        if (clavePadre === "") {
            this.establecerTituloSeleccionado();
        }

        return nuevaOpcion;
    };

    componentDidUpdate(oldProps, oldState) {
        if (oldProps.lng !== this.props.lng || oldProps.opcionesMenu !== this.props.opcionesMenu) {
            let nuevasOpcionesMenuTraducidas = this.generaOpcionesMenuTraducidas();

            this.setState({
                opcionesMenuTraducidas: nuevasOpcionesMenuTraducidas
            });
        }

        if (
            oldState.opcionesMenuTraducidas !== this.state.opcionesMenuTraducidas ||
            oldState.elementosAbiertos !== this.state.elementosAbiertos ||
            oldProps.seleccionado !== this.props.seleccionado
        ) {
            let nuevasOpcionesNav = this.generaOpcionesNav(this.state.opcionesMenuTraducidas);

            this.setState({
                opcionesNav: nuevasOpcionesNav
            });
        }
    }

    componentDidMount() {
        let opcionesNavIniciales = this.generaOpcionesNav(this.state.opcionesMenuTraducidas);

        this.setState({
            opcionesNav: opcionesNavIniciales
        });

        this.abrirMenuPredeterminado();
    }

    abrirMenuPredeterminado = () => {
        if (this.props.opcionesMenu && this.props.opcionesMenu.length > 0 && (!this.state.elementosAbiertos || this.state.elementosAbiertos.length === 0)) {
            // No hay nada abierto
            let menusExpandibles = 0;
            let menuExpandible = null;

            this.props.opcionesMenu.forEach((opcionMenu, indice) => {
                if (opcionMenu.opciones) {
                    menusExpandibles++;
                    if (menusExpandibles === 1) {
                        menuExpandible = "." + indice;
                    }
                }
            });

            if (menusExpandibles === 1) {
                this.funcionOnClickElemento(undefined, menuExpandible);
            }
        }
    };

    establecerTituloSeleccionado = () => {
        // if (!this.menuSeleccionado) {
        //     this.menuSeleccionado = this.props.seleccionado.replace('/', '');
        // }

        if (this.menuSeleccionado) {
            document.title = this.props.nombreAplicacion + " - " + this.menuSeleccionado;
        } else {
            document.title = this.props.nombreAplicacion;
        }
    };

    render() {
        return (
            <List component="nav" className={estilos.lista}>
                {this.state.opcionesNav}
            </List>
        );
    }
}

export default withNamespaces()(CompMenuExpandible);
