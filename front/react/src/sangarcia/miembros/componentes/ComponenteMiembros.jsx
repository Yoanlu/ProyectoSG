import React from "react";
import PropTypes from "prop-types";
import estilos from "./CompMiembro.module.css";
import { clonar } from "../../../componentes/Utilidades";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";
import CompEntrada from "../../../componentes/entrada/CompEntrada";

class CompMiembros extends CompPermisos {
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
        this.permisos_necesarios = [permisos.miembros.view];
        this.permisos_modificar = [permisos.miembros.change];
        this.permisos_añadir = [permisos.miembros.add];
        this.permisos_borrar = [permisos.miembros.delete];
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
                        etiqueta={this.props.traduccion("name")}
                        maximo={100}
                        nombre="nombre"
                        valor={this.props.datoEnEdicion.nombre || ""}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
                <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="EntradaTexto"
                        obligatorio={true}
                        etiqueta={this.props.traduccion("last_name")}
                        maximo={100}
                        nombre="apellido"
                        valor={this.props.datoEnEdicion.apellido || ""}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
                <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="EntradaTexto"
                        obligatorio={true}
                        etiqueta={this.props.traduccion("email")}
                        maximo={100}
                        nombre="email"
                        valor={this.props.datoEnEdicion.email || ""}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
                <div className={"col-sm-12 col-md-6 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="EntradaTexto"
                        obligatorio={true}
                        etiqueta={this.props.traduccion("task")}
                        maximo={100}
                        nombre="tarea"
                        valor={this.props.datoEnEdicion.tarea || ""}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
            </div>
        );
    }
}
export default CompMiembros;