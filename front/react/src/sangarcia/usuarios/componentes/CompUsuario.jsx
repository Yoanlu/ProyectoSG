import React from "react";
import PropTypes from "prop-types";

import zxcvbn from "zxcvbn";
import estilos from "./CompUsuario.module.css";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";
import CompDesplegable from "../../../componentes/desplegables/CompDesplegable";

import { recuperarGrupos, recuperarDatosUsuario } from "../servicios/ServicioUsuario";
import CompEntrada from "../../../componentes/entrada/CompEntrada";
import EleEntradaInterruptor from "../../../elementos/entradaInterruptor/EleEntradaInterruptor";
import EleMedidorPorcentaje from "../../../elementos/medidores/porcentajes/EleMedidorPorcentaje";

/**
 * Componente donde se visualiza en un formulario los datos correspondientes a un usuario.
 * En este se podrá consultar o modificar los datos del mismo, o dar de alta un usuario nuevo.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompUsuario extends CompPermisos {
    static propTypes = {
        /**
         * Funcion que cambia el estado del componente lista con los datos modificados
         * @param {JSON} estadoCambiar - Objeto con los datos del cliente editado
         */
        funcionCambiaEstados: PropTypes.func.isRequired,
        /**
         * Objeto con los datos del usuario a incluir o modificar.
         */
        datoEnEdicion: PropTypes.any.isRequired,
        /**
         * Funcion I18n que muestra el un texto segun el idioma seleccionado
         * @param {string} key - clave del texto a traducir
         */
        traduccion: PropTypes.func.isRequired,
        /**
         * Controla que la respuesta de las llamadas al api rest funcionan correctamente
         * en caso de error se mostrara un mensaje con el error
         *
         *  @param {Object} llamada - objeto request de la llamada
         */
        funcionControlPeticion: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.ultimoId = null;
        this.recuperaDatos = true;
        this.state = {
            datosGrupos: [],
            datosUsuarioAct: [],
            grosorCotrasena: 0
        };

        this.cssColumnaUsuario = "col-sm-12 col-md-6";

        this.permisos_necesarios = [permisos.auth.user.view];
        this.permisos_modificar = [permisos.auth.user.change];
        this.permisos_añadir = [permisos.auth.user.add];
        this.permisos_borrar = [permisos.auth.user.delete];
    }

    funcionOnChangeTexto = (valor, campo) => {
        let datoEnEdicion = this.props.datoEnEdicion;
        datoEnEdicion[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    funcionOnChangeTextoMinuscula = (valor, campo) => {
        let datoEnEdicion = this.props.datoEnEdicion;
        valor = valor.toLowerCase();
        datoEnEdicion[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    funcionOnChangeDetalle = (valor, campo) => {
        let datoEnEdicion = this.props.datoEnEdicion;
        datoEnEdicion.detalle[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    funcionOnChangePassword = (valor, campo) => {
        let datoEnEdicion = this.props.datoEnEdicion;

        let controlPassword = zxcvbn(valor);

        this.setState({
            grosorCotrasena: controlPassword.score
        });

        datoEnEdicion[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    funcionOnChangePasswordAux = (valor, campo) => {
        let datoEnEdicion = this.props.datoEnEdicion;
        datoEnEdicion[campo] = valor;

        this.props.funcionCambiaEstados({
            datoEnEdicion: datoEnEdicion
        });
    };

    funcionOnChangeInterruptor = (e, valor, campo) => {
        let datoEnEdicion = this.props.datoEnEdicion;
        datoEnEdicion[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    funcionRecuperaGrupos = async () => {
        const llamada = await recuperarGrupos(this.props.history);

        let controlPeticion = this.props.funcionControlPeticion(llamada);

        if (controlPeticion && llamada.codigo === 200) {
            this.setState({
                datosGrupos: llamada.respuesta
            });
        }
    };

    componentDidMount() {
        this.recuperaDatosUsuario();
        this.funcionRecuperaGrupos();
    }

    recuperaDatosUsuario = async () => {
        let idUsuario = this.props.datoEnEdicion.id;
        if (!idUsuario) {
            return;
        }

        let datosUsuario = await recuperarDatosUsuario(idUsuario, this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datosUsuario);

        if (controlPeticion) {
            let usuarioAux = datosUsuario.respuesta;
            usuarioAux.password = "******";
            usuarioAux.passwordAux = "******";
            this.props.funcionCambiaEstados({ datoEnEdicion: usuarioAux });
        } else {
            this.props.funcionCancelar();
        }
    };

    render() {
        if (!this.props.datoEnEdicion.detalle) {
            this.props.datoEnEdicion.detalle = {};
        }

        let clavesIncorrectas = this.props.datoEnEdicion.password && this.props.datoEnEdicion.password !== this.props.datoEnEdicion.passwordAux;

        return (
            <React.Fragment>
                <div className="row">
                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <EleEntradaInterruptor
                            nombre="is_active"
                            chequeado={this.props.datoEnEdicion.is_active}
                            etiqueta={this.props.traduccion("active_user")}
                            ubicacionEtiqueta="start"
                            funcionOnChange={this.funcionOnChangeInterruptor}
                        />
                    </div>

                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <CompEntrada
                            tipoEntrada={"EntradaTexto"}
                            obligatorio={true}
                            etiqueta={this.props.traduccion("user")}
                            tipo={"text"}
                            nombre={"username"}
                            maximo={150}
                            valor={this.props.datoEnEdicion.username}
                            funcionOnChange={this.funcionOnChangeTextoMinuscula}
                        />
                    </div>

                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <CompEntrada
                            tipoEntrada={"EntradaTexto"}
                            obligatorio={true}
                            etiqueta={this.props.traduccion("first_name")}
                            tipo={"text"}
                            nombre={"first_name"}
                            maximo={30}
                            valor={this.props.datoEnEdicion.first_name}
                            funcionOnChange={this.funcionOnChangeTexto}
                        />
                    </div>

                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <CompEntrada
                            tipoEntrada={"EntradaTexto"}
                            obligatorio={true}
                            etiqueta={this.props.traduccion("last_name")}
                            tipo={"text"}
                            nombre={"last_name"}
                            maximo={150}
                            valor={this.props.datoEnEdicion.last_name}
                            funcionOnChange={this.funcionOnChangeTexto}
                        />
                    </div>

                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <CompEntrada
                            tipoEntrada={"EntradaTexto"}
                            obligatorio={true}
                            etiqueta={this.props.traduccion("email")}
                            tipo={"email"}
                            nombre={"email"}
                            maximo={254}
                            valor={this.props.datoEnEdicion.email}
                            funcionOnChange={this.funcionOnChangeTexto}
                        />
                    </div>

                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <CompEntrada
                            tipoEntrada="EntradaTexto"
                            tipo="text"
                            obligatorio={false}
                            etiqueta={this.props.traduccion("phone")}
                            nombre="telefono"
                            valor={this.props.datoEnEdicion.detalle.telefono}
                            funcionOnChange={this.funcionOnChangeDetalle}
                            separadorMillares={false}
                        />
                    </div>

                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <CompEntrada
                            tipoEntrada={"EntradaTexto"}
                            obligatorio={true}
                            etiqueta={this.props.traduccion("password")}
                            tipo={"password"}
                            nombre={"password"}
                            valor={this.props.datoEnEdicion.password}
                            minimo={9}
                            maximo={30}
                            funcionOnChange={this.funcionOnChangePassword}
                            // mensajeValidacion={this.props.traduccion('invalid_password')}
                        />
                        <EleMedidorPorcentaje nivel={this.state.grosorCotrasena} />
                    </div>

                    <div className={this.cssColumnaUsuario + " " + estilos.entradaTexto}>
                        <CompEntrada
                            tipoEntrada={"EntradaTexto"}
                            obligatorio={true}
                            etiqueta={this.props.traduccion("repeat_password")}
                            tipo={"password"}
                            nombre={"passwordAux"}
                            valor={this.props.datoEnEdicion.passwordAux}
                            minimo={9}
                            maximo={30}
                            validacion={!clavesIncorrectas}
                            mensajeValidacion={clavesIncorrectas ? this.props.traduccion("passwords_don`t_match") : ""}
                            funcionOnChange={this.funcionOnChangePasswordAux}
                        />
                    </div>

                    <div className={"col-sm-12 " + estilos.entradaTexto}>
                        <CompDesplegable
                            tipoDesplegable="multiseleccion"
                            datos={this.state.datosGrupos}
                            nombre="groups"
                            valorMultiseleccion={this.props.datoEnEdicion.groups}
                            campoClave="id"
                            campoVisible="name"
                            etiqueta={this.props.traduccion("groups")}
                            funcionOnChange={this.funcionOnChangeTexto}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CompUsuario;
