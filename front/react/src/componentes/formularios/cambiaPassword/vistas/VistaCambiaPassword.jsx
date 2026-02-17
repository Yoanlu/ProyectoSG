import React from "react";
import estilos from "./VistaCambiaPassword.module.css";

import zxcvbn from "zxcvbn";
import { cambiaPassword } from "../servicios/ServicioCambiaPassword";
import Componente from "../../../Componente";
import ElePanel from "../../../../elementos/paneles/ElePanel";
import EleBarraAplicacion from "../../../../elementos/barraAplicacion/EleBarraAplicacion";
import CompEntrada from "../../../entrada/CompEntrada";
import EleMedidorPorcentaje from "../../../../elementos/medidores/porcentajes/EleMedidorPorcentaje";
import EleBoton from "../../../../elementos/botones/EleBoton";
import { vistaContenedor } from "../../../vistas/CompVistaContenedor";

/**
 * Vista en la cual se va a visualizar un listado de las unidades organizativas registradas,
 * con la posibilidad de aportar un filtro, orden o agrupación al mismo.
 *
 * Desde esta vista se podrá acceder al alta, modificación o elminación de las unidades organizativas.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class VistaCambiaPassword extends Componente {
    constructor(props) {
        super(props);

        this.state = {
            datoEnEdicion: {},
            respuestaAjax: undefined
        };
    }

    funcionOnChangeCampo = (valor, nombre) => {
        let edicionAux = this.state.datoEnEdicion;
        edicionAux[nombre] = valor;

        this.setState({
            datoEnEdicion: edicionAux
        });
    };

    funcionOnChangeCurrentPassword = (valor, campo) => {
        let datoEnEdicion = this.state.datoEnEdicion;
        datoEnEdicion[campo] = valor;

        // let controlPassword = zxcvbn(valor);

        this.setState({
            datoEnEdicion: datoEnEdicion
            // grosorCotrasena: controlPassword.score
        });
    };

    funcionOnChangeNewPassword = (valor, campo) => {
        let datoEnEdicion = this.state.datoEnEdicion;
        datoEnEdicion[campo] = valor;

        let controlPassword = zxcvbn(valor);

        this.setState({
            datoEnEdicion: datoEnEdicion,
            grosorCotrasenaNueva: controlPassword.score
        });
    };

    funcionCambiaPassword = async () => {
        let datos = {
            old_password: this.state.datoEnEdicion.current_password,
            new_password: this.state.datoEnEdicion.new_password
        };

        let peticionAjax = await cambiaPassword(datos, this.props.peticionServidor, this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(peticionAjax);

        if (controlPeticion && peticionAjax.codigo === 200) {
            this.setState({
                datoEnEdicion: {},
                respuestaAjax: peticionAjax.respuesta.message
            });
        }

        return controlPeticion;
    };

    funcionVolver = () => {
        this.props.history.push("/");
    };

    render() {
        let clavesIncorrectas = this.state.datoEnEdicion.new_password && this.state.datoEnEdicion.new_password !== this.state.datoEnEdicion.passwordAux;

        return (
            <div className={estilos.contenedorMantenimiento}>
                <ElePanel>
                    <EleBarraAplicacion denso>{this.props.t("change_password")}</EleBarraAplicacion>
                    <div className={"row " + estilos.mantenimiento}>
                        <div className={"col-sm-12 " + estilos.mensaje}>{this.state.respuestaAjax}</div>

                        <div className={"col-sm-12 col-md-6 col-md-offset-3 " + estilos.entradaTexto}>
                            <CompEntrada
                                tipoEntrada={"EntradaTexto"}
                                obligatorio={true}
                                etiqueta={this.props.t("current_password")}
                                tipo={"password"}
                                nombre={"current_password"}
                                valor={this.state.datoEnEdicion.current_password}
                                minimo={9}
                                maximo={30}
                                funcionOnChange={this.funcionOnChangeCurrentPassword}
                                // mensajeValidacion={this.props.traduccion('invalid_password')}
                            />
                            {/* <EleMedidorPorcentaje nivel={this.state.grosorCotrasena} /> */}
                        </div>

                        <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                            <CompEntrada
                                tipoEntrada={"EntradaTexto"}
                                obligatorio={true}
                                etiqueta={this.props.t("new_password")}
                                tipo={"password"}
                                nombre={"new_password"}
                                valor={this.state.datoEnEdicion.new_password}
                                minimo={9}
                                maximo={30}
                                funcionOnChange={this.funcionOnChangeNewPassword}
                            />
                            <EleMedidorPorcentaje nivel={this.state.grosorCotrasenaNueva} />
                        </div>

                        <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                            <CompEntrada
                                tipoEntrada={"EntradaTexto"}
                                obligatorio={true}
                                etiqueta={this.props.t("repeat_password")}
                                tipo={"password"}
                                nombre={"passwordAux"}
                                valor={this.state.datoEnEdicion.passwordAux}
                                minimo={9}
                                maximo={30}
                                validacion={!clavesIncorrectas}
                                mensajeValidacion={clavesIncorrectas ? this.props.t("passwords_don`t_match") : ""}
                                funcionOnChange={this.funcionOnChangeCampo}
                            />
                        </div>
                    </div>

                    <div className={"row " + estilos.mantenimiento}>
                        <div className={"col-sm-12 " + estilos.entradaBoton}>
                            <EleBoton
                                texto={this.props.t("return")}
                                tipo="button"
                                funcionOnClick={this.funcionVolver}
                                apariencia="contained"
                                icono="keyboard_return"
                                primario={true}
                            />
                            &nbsp;
                            <EleBoton
                                desactivado={
                                    this.state.datoEnEdicion.new_password !== this.state.datoEnEdicion.passwordAux ||
                                    !this.state.datoEnEdicion.current_password ||
                                    !this.state.datoEnEdicion.passwordAux ||
                                    !this.state.datoEnEdicion.new_password
                                }
                                texto={this.props.t("change_password")}
                                tipo="button"
                                funcionOnClick={this.funcionCambiaPassword}
                                apariencia="contained"
                                icono="send"
                                primario={true}
                            />
                        </div>
                    </div>
                </ElePanel>
            </div>
        );
    }
}

export default vistaContenedor(VistaCambiaPassword);
