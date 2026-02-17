import React from "react";

import CompFormularioLoginCob from "../componentes/CompFormularioLoginCob";
import { vistaContenedor } from "../../../../componentes/vistas/CompVistaContenedor";
import { recuperaPermisos } from "../../api/Api";
import { withNamespaces } from "react-i18next";
import { loadReCaptcha } from "react-recaptcha-v3";

/**
 * Vista en la que se introducen los datos de usuario y contraseña para iniciar sesión en el sistema.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class VistaLogin extends React.Component {
    constructor(props) {
        super(props);

        const tipoAutorizacion = window.localStorage.getItem("token_type");
        const tokenAcceso = window.localStorage.getItem("access_token");

        if (!tipoAutorizacion || !tokenAcceso) {
            this.props.funcionActualizaPermisos([]);
        }
    }

    async componentDidMount() {
        loadReCaptcha("6LePH5IUAAAAAGezUsyOHa_1ukkRjw2Jwv3sBH7w", this.funcionCaptchaCargado);
    }

    actualizaPermisos = async () => {
        const permisosUsuario = await recuperaPermisos();
        this.props.funcionActualizaPermisos(permisosUsuario);

        if (permisosUsuario && permisosUsuario.length > 0) {
            this.props.history.push("/");
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-sm">
                    <CompFormularioLoginCob
                        textoLogin={this.props.t("login")}
                        textoUsuario={this.props.t("user")}
                        textoContrasena={this.props.t("password")}
                        textoBotonAcceder={this.props.t("access")}
                        textoLoginErroneo={this.props.t("bad_credentials")}
                        textoBotonRestaurar={this.props.t("restore_password")}
                        funcionLoginCorrecto={this.actualizaPermisos}
                        funcionControlPeticion={this.props.funcionControlPeticion}
                        historia={this.props.history}
                    />
                </div>
            </div>
        );
    }
}

export default withNamespaces()(vistaContenedor(VistaLogin));
