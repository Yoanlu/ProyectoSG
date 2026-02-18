import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../../componentes/grid.css";
import "animate.css";
import "./App.css";

import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import "react-google-material-icons";
import i18n from "../../componentes/i18n";
import { I18nextProvider } from "react-i18next";
import CompMenuNavegacion from "../../componentes/menuNavegacion/CompMenuNavegacion";
import { recuperaPermisos, peticionServidor } from "./api/Api";
import { ProveedorPermisos } from "../../componentes/permisos/ProveedorPermisos";
import { dameUrlDominio } from "./api/Api";
import { opcionesIdiomas, opcionesTema, puntoFinalIdiomas, puntoFinalTraducciones } from "./configuracion.json";
import { peticionLogoutAuth } from "./api/ApiAuth";
import construyeMenu from "./ServicioConstruccionMenu";
import { ProveedorPeticion } from "../../componentes/ProveedorPeticion";

import permisos from "../comunes/autorizacion/Permisos";
import packageJson from "../../../package.json";
import { crearTema } from "../../componentes/Utilidades";
import CacheBuster from "../../componentes/cacheBuster";

global.appVersion = packageJson.version;

const VistaLogin = lazy(() => import("./autenticacion/vistas/VistaLogin"));
const VistaUsuario = lazy(() => import("../usuarios/vistas/VistaUsuario"));
const VistaCambiaPassword = lazy(() => import("../../componentes/formularios/cambiaPassword/vistas/VistaCambiaPassword"));
const VistaMiembros = lazy(() => import("../miembros/vistas/VistaMiembros"));
const VistaFiestas = lazy(() => import("../fiestas/vistas/VistaFiestas"));
const VistaActividades = lazy(() => import("../actividades/vistas/VistaActividades"));

class App extends React.Component {
    constructor(props) {
        super(props);

        this.datosPeticiones = {
            puntoFinalTraducciones: puntoFinalTraducciones,
            puntoFinalIdiomas: puntoFinalIdiomas,
            peticionServidor: peticionServidor
        };

        this.state = {
            permisos: undefined,
            tema: crearTema(opcionesTema),
            datosPerfil: {
                fotoUsuario: null,
                usuario: null,
                dameFoto: this.dameFoto
            }
        };

        this.estiloFallback = { textAlign: "center", paddingTop: "10%" };
    }

    establecePermisos = async () => {
        this.setState({
            permisos: await recuperaPermisos()
        });
    };

    async componentDidMount() {
        this.establecePermisos();
    }

    recibePermisos = nuevos_permisos => {
        this.setState({
            permisos: nuevos_permisos
        });
    };

    cambiaLuzTema = (nuevaLuz = this.state.tema.palette.type) => {
        this.setState({
            tema: crearTema(opcionesTema, null, nuevaLuz)
        });
    };

    cambiaColorTema = nuevoColor => {
        this.setState({
            tema: crearTema(opcionesTema, nuevoColor, null)
        });
    };

    dameFoto = async (eliminada = false) => {};

    render() {
        return (
            <CacheBuster>
                {({ loading, isLatestVersion, refreshCacheAndReload }) => {
                    if (loading) return null;
                    if (!loading && !isLatestVersion) {
                        refreshCacheAndReload();
                    }

                    if (!this.state.permisos) {
                        return null;
                    }

                    return (
                        <ThemeProvider theme={this.state.tema}>
                            <CssBaseline />
                            <I18nextProvider i18n={i18n}>
                                <ProveedorPermisos.Provider value={this.state.permisos}>
                                    <ProveedorPeticion.Provider value={this.datosPeticiones}>
                                        <Router>
                                            <CompMenuNavegacion
                                                cambiaLuzTema={this.cambiaLuzTema}
                                                cambiaColorTema={this.cambiaColorTema}
                                                permisos={this.state.permisos}
                                                actualizarPerfil={this.state.datosPerfil}
                                                nombreAplicacion="sangarcia"
                                                menuCambiaPassVisible={false}
                                                opcionesTema={opcionesTema}
                                                opcionesIdiomas={opcionesIdiomas}
                                                dameUrlDominio={dameUrlDominio}
                                                peticionLogoutAuth={peticionLogoutAuth}
                                                construyeMenu={construyeMenu}
                                            >
                                                <Suspense
                                                    fallback={
                                                        <div style={this.estiloFallback}>
                                                            <CircularProgress size={50} />
                                                        </div>
                                                    }
                                                >
                                                    <Route
                                                        exact
                                                        path="/login"
                                                        render={props => <VistaLogin funcionActualizaPermisos={this.recibePermisos} {...props} />}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/changePassword"
                                                        render={props => <VistaCambiaPassword peticionServidor={peticionServidor} {...props} />}
                                                    />

                                                    <Route exact path={permisos.auth.user.ruta} render={props => <VistaUsuario {...props} />} />
                                                    <Route
                                                        exact
                                                        path={permisos.miembros.ruta}
                                                        render={props => (
                                                            <VistaMiembros
                                                                {...props}
                                                                permisos={this.state.permisos} // <--- ES FUNDAMENTAL PASAR ESTO
                                                                funcionControlPeticion={this.datosPeticiones.peticionServidor}
                                                            />
                                                        )}
                                                    />
                                                    <Route
                                                        exact
                                                        path={permisos.fiestas.ruta}
                                                        render={props => (
                                                            <VistaFiestas
                                                                {...props}
                                                                permisos={this.state.permisos} // <--- ES FUNDAMENTAL PASAR ESTO
                                                                funcionControlPeticion={this.datosPeticiones.peticionServidor}
                                                            />
                                                        )}
                                                    />
                                                    <Route
                                                        exact
                                                        path={permisos.actividades.ruta}
                                                        render={props => (
                                                            <VistaActividades
                                                                {...props}
                                                                permisos={this.state.permisos} // <--- ES FUNDAMENTAL PASAR ESTO
                                                                funcionControlPeticion={this.datosPeticiones.peticionServidor}
                                                            />
                                                        )}
                                                    />
                                                </Suspense>
                                            </CompMenuNavegacion>
                                        </Router>
                                    </ProveedorPeticion.Provider>
                                </ProveedorPermisos.Provider>
                            </I18nextProvider>
                        </ThemeProvider>
                    );
                }}
            </CacheBuster>
        );
    }
}

export default App;
