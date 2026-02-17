import React from "react";
import PropTypes from "prop-types";
import estilos from "./CompFiestas.module.css";
import { clonar } from "../../../componentes/Utilidades";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";
import CompEntrada from "../../../componentes/entrada/CompEntrada";

class CompFiestas extends CompPermisos {
    static propTypes = {
        funcionCambiaEstados: PropTypes.func.isRequired,
        datoEnEdicion: PropTypes.any.isRequired,
        traduccion: PropTypes.func.isRequired,
        funcionControlPeticion: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.recuperaDatos = false;
        // Permisos ajustados (sin .maestros)
        this.permisos_necesarios = [permisos.fiestas.view];
        this.permisos_modificar = [permisos.fiestas.change];
        this.permisos_añadir = [permisos.fiestas.add];
        this.permisos_borrar = [permisos.fiestas.delete];
        this.state = {};
    }

    funcionOnChangeTexto = (valor, campo) => {
        let datoEnEdicion = clonar(this.props.datoEnEdicion);
        datoEnEdicion[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    render() {
        return (
            <div className="row">
                <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="EntradaTexto"
                        obligatorio={true}
                        etiqueta={this.props.traduccion("festivity")}
                        maximo={100}
                        nombre="festividad"
                        valor={this.props.datoEnEdicion.festividad || ""}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
                <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="DateTimePicker" 
                        obligatorio={true}
                        etiqueta={this.props.traduccion("start_date")}
                        nombre="inicio"
                        valor={this.props.datoEnEdicion.inicio || null}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
                <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="DateTimePicker"
                        obligatorio={true}
                        etiqueta={this.props.traduccion("end_date")}
                        nombre="fin"
                        valor={this.props.datoEnEdicion.fin || null}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
                <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="EntradaTexto"
                        obligatorio={true}
                        etiqueta={this.props.traduccion("activity")}
                        maximo={100}
                        nombre="actividad"
                        valor={this.props.datoEnEdicion.actividad || ""}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
            </div>
        );
    }
}
export default CompFiestas;