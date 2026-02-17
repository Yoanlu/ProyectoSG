import React from "react";
import PropTypes from "prop-types";

import ElePanel from "../../../elementos/paneles/ElePanel";
import EleTitulo from "../../../elementos/titulos/EleTitulo";
import CompEntrada from "../../entrada/CompEntrada";
import EleBoton from "../../../elementos/botones/EleBoton";
import { ReCaptcha } from "react-recaptcha-v3";

import estilos from "./CompFormularioLogin.module.css";

/**
 * Componente que se va a visualizar para aceptar la política de datos.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
const CompFormularioLogin = ({
    textoLogin,
    textoUsuario,
    textoContrasena,
    textoContrasenaOlvidada,
    textoBotonAcceder,
    textoBotonVolver,
    textoLoginErroneo,
    textoLimiteUsuarios,
    imagenEmpresa,
    valorUsuario,
    valorContrasena,
    cargando,
    loginErroneo,
    limiteUsuarios,
    recordarPass,
    funcionRecordarPass,
    claseCss,
    funcionOnSubmit,
    funcionOnChangeNombre,
    funcionOnChangeContrasena,
    logoRotatorio,
    funcionOnClickRegistrarse,
    funcionOnClickVolver,
    textoBotonRegistrarse,
    funcionOnClickRestaurar,
    textoBotonRestaurar,
    camposExtra,
    botonesExtra,
    captcha = "6LePH5IUAAAAAGezUsyOHa_1ukkRjw2Jwv3sBH7w"
}) => (
    <ElePanel claseCss={estilos.compPanelLogin + " " + claseCss}>
        <form className={estilos.formulario} onSubmit={funcionOnSubmit} data-testid="formularioLogin">
            <style>{"div .grecaptcha-badge { visibility: visible !important; }"}</style>
            <ReCaptcha sitekey={captcha} action="main" />
            <div className={estilos.cabecera}>
                <img className={estilos.logo + " " + (logoRotatorio === true ? estilos.rotar : "")} src={imagenEmpresa} alt="empresa" />
                {textoLogin && (
                    <EleTitulo color="textSecondary" tipoTitulo="h5">
                        {textoLogin}
                    </EleTitulo>
                )}
            </div>
            <CompEntrada
                tipoEntrada="EntradaTexto"
                nombre="user"
                tipo="text"
                valor={valorUsuario}
                obligatorio={true}
                etiqueta={textoUsuario}
                funcionOnChange={funcionOnChangeNombre}
            />
            <CompEntrada
                tipoEntrada="EntradaTexto"
                nombre="password"
                tipo="password"
                valor={valorContrasena}
                obligatorio={true}
                etiqueta={textoContrasena}
                funcionOnChange={funcionOnChangeContrasena}
            />

            {camposExtra}

            <EleBoton
                cargando={cargando}
                tipo="submit"
                icono="login"
                iconoIzquierda={false}
                claseIcono={estilos.iconoLogin}
                texto={textoBotonAcceder}
                claseCss={estilos.botonLogin}
                primario={true}
                apariencia="contained"
                desactivado={false}
            />

            {botonesExtra}

            {textoBotonRegistrarse && (
                <div className={estilos.iconoReset}>
                    <EleBoton
                        tipo="button"
                        icono="input"
                        iconoIzquierda={false}
                        claseIcono={estilos.iconoLogin}
                        texto={textoBotonRegistrarse}
                        claseCss={"margin-top: 24px  " + estilos.botonLogin}
                        primario={true}
                        apariencia="contained"
                        desactivado={false}
                        funcionOnClick={funcionOnClickRegistrarse}
                    />
                </div>
            )}

            {textoBotonRestaurar && (
                <div className={estilos.iconoReset}>
                    <EleBoton
                        tipo="button"
                        icono="vpn_key"
                        iconoIzquierda={false}
                        claseIcono={estilos.iconoLogin}
                        texto={textoBotonRestaurar}
                        claseCss={estilos.botonLogin}
                        primario={true}
                        apariencia="contained"
                        desactivado={!funcionOnClickRestaurar}
                        funcionOnClick={funcionOnClickRestaurar}
                    />
                </div>
            )}

            {textoBotonVolver && (
                <div className={estilos.iconoReset}>
                    <EleBoton
                        tipo="button"
                        icono="keyboard_return"
                        iconoIzquierda={false}
                        claseIcono={estilos.iconoLogin}
                        texto={textoBotonVolver}
                        claseCss={estilos.botonLogin}
                        primario={true}
                        apariencia="contained"
                        desactivado={false}
                        funcionOnClick={funcionOnClickVolver}
                    />
                </div>
            )}

            {loginErroneo === true && (
                <div className={estilos.mensajeError}>
                    <EleTitulo color="error">{textoLoginErroneo}</EleTitulo>
                </div>
            )}

            {limiteUsuarios === true && (
                <div className={estilos.mensajeError}>
                    <EleTitulo color="error">{textoLimiteUsuarios}</EleTitulo>
                </div>
            )}

            {recordarPass === true && (
                <div className={estilos.reset}>
                    <EleTitulo enLinea color="primary">
                        <div className={estilos.olvidadoPass} onClick={funcionRecordarPass}>
                            <b>{textoContrasenaOlvidada}</b>
                        </div>
                    </EleTitulo>
                </div>
            )}
        </form>
    </ElePanel>
);

CompFormularioLogin.propTypes = {
    /**
     * Texto establecido como Titulo del Login. Valor Requerido.
     */
    textoLogin: PropTypes.string,
    /**
     * Etiqueta del campo Usuario. Valor Requerido.
     */
    textoUsuario: PropTypes.string.isRequired,
    /**
     * Etiqueta del campo ContraseÃ±a. Valor Requerido.
     */
    textoContrasena: PropTypes.string.isRequired,
    /**
     * Etiqueta del botón. Valor Requerido.
     */
    textoBotonAcceder: PropTypes.string.isRequired,
    /**
     * Texto "helper" que avisa de que las credenciales de acceso no son correctas. Valor Requerido.
     */
    textoLoginErroneo: PropTypes.string.isRequired,
    /**
     * Texto "helper" que avisa de que se ha alcanzado el límite de usuarios. Valor Requerido.
     */
    textoLimiteUsuarios: PropTypes.string,
    /**
     * Valor del campo usuario. Valor Requerido.
     */
    valorUsuario: PropTypes.string.isRequired,
    /**
     * Valor del campo contraseña. Valor Requerido.
     */
    valorContrasena: PropTypes.string.isRequired,
    /**
     * Indica si se está a la espera de respuesta de la petición de login.
     */
    cargando: PropTypes.bool,
    /**
     * Indica si se muestra el mensaje de Login erroneo (por credenciales incorrectas)
     */
    loginErroneo: PropTypes.bool,
    /**
     * Indica si se muestra el mensaje de Límite de usuarios superado
     */
    limiteUsuarios: PropTypes.bool,
    /**
     * Clase css para el formulario.
     */
    claseCss: PropTypes.string,
    /**
     * Función que se dispara cuando pulsas el boton. Función Requerida.
     */
    funcionOnSubmit: PropTypes.func.isRequired,
    /**
     * Función que se dispara al cambiar el valor del campo usuario. Función Requerida.
     */
    funcionOnChangeNombre: PropTypes.func.isRequired,
    /**
     * Función que se dispara al cambiar el valor del campo contarseña. Función Requerida.
     */
    funcionOnChangeContrasena: PropTypes.func.isRequired,
    /**
     * Booleano que indica si el logo debe rotar infinitamente o no.
     */
    logoRotatorio: PropTypes.bool,
    /**
     * Función que se dispara al pulsar el botón de restaurar contraseña
     */
    funcionOnClickRestaurar: PropTypes.func,
    /**
     * Etiqueta del botón.
     */
    textoBotonRestaurar: PropTypes.string
};

export default CompFormularioLogin;
