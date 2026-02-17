import React, { Component } from "react";
import PropTypes from "prop-types";

import CompFormularioLogin from "../../../../componentes/formularios/login/CompFormularioLogin";
import { peticionTokenLogin } from "../servicios/ServicioLogin";
import { dameUrlDominio } from "../../api/Api";

/**
 * Componente donde se visualiza en un formulario que recoge los datos de usuario y contraseña que desea iniciar sesión.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompFormularioLoginCob extends Component {
    constructor(props) {
        super(props);

        this.funcionLoginCorrecto = this.props.funcionLoginCorrecto;
        this.funcionControlPeticion = this.props.funcionControlPeticion;

        this.urlDominio = dameUrlDominio();

        this.state = {
            cargando: false,
            loginErroneo: false,
            cssFormulario: "",
            valorUsuario: "",
            valorContrasena: ""
        };
    }

    static propTypes = {
        /**
         * Función que valida el usuario y la contraseña facilitados.
         */
        funcionLoginCorrecto: PropTypes.func.isRequired
    };

    enviarFormulario = async evento => {
        evento.preventDefault();

        let valorUsuario = this.state.valorUsuario;
        let valorContrasena = this.state.valorContrasena;

        this.setState({
            cargando: true,
            cssFormulario: ""
        });

        let peticion = await peticionTokenLogin(valorUsuario, valorContrasena, this.props.history);

        if (!peticion) {
            return;
        }

        this.setState({
            cargando: false
        });

        if (peticion.error) {
            if (peticion.codigo === 401 || (peticion.codigo === 400 && peticion.respuesta.error === "invalid_grant")) {
                this.setState({
                    cssFormulario: "headShake animated fast",
                    loginErroneo: true
                });
            } else {
                this.funcionControlPeticion(peticion);
            }
        } else {
            this.funcionLoginCorrecto();
        }
    };

    cambiaNombre = valor => {
        valor = valor.toLowerCase();
        this.setState({
            valorUsuario: valor,
            loginErroneo: false
        });
    };

    cambiaContrasena = valor => {
        this.setState({
            valorContrasena: valor,
            loginErroneo: false
        });
    };

    restaurarContraseña = evento => {
        evento.stopPropagation();
        window.open(this.urlDominio + "/reseteo");
    };

    render() {
        return (
            <CompFormularioLogin
                textoUsuario={this.props.textoUsuario}
                textoLogin={this.props.textoLogin}
                textoContrasena={this.props.textoContrasena}
                textoBotonAcceder={this.props.textoBotonAcceder}
                textoLoginErroneo={this.props.textoLoginErroneo}
                textoBotonRestaurar={this.props.textoBotonRestaurar}
                valorUsuario={this.state.valorUsuario}
                valorContrasena={this.state.valorContrasena}
                cargando={this.state.cargando}
                loginErroneo={this.state.loginErroneo}
                claseCss={this.state.cssFormulario}
                funcionOnSubmit={this.enviarFormulario}
                funcionOnChangeNombre={this.cambiaNombre}
                funcionOnChangeContrasena={this.cambiaContrasena}
                // funcionOnClickRestaurar={this.restaurarContraseña}
                imagenEmpresa={this.urlDominio + "/static/images/logo-empresa.png"}
                logoRotatorio={true}
            />
        );
    }
}

export default CompFormularioLoginCob;
