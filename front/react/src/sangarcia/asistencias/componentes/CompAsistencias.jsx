import React from "react";
import PropTypes from "prop-types";
import estilos from "./CompAsistencias.module.css";
import { clonar } from "../../../componentes/Utilidades";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";

import { recuperarListaMiembro } from "../../miembros/servicios/ServicioMiembros";
import { recuperarListaActividad } from "../../actividades/servicios/ServicioActividades";

class CompAsistencias extends CompPermisos {
    static propTypes = {
        funcionCambiaEstados: PropTypes.func.isRequired,
        datoEnEdicion: PropTypes.any.isRequired,
        traduccion: PropTypes.func.isRequired,
        funcionControlPeticion: PropTypes.func.isRequired,
        history: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.recuperaDatos = false;
        this.permisos_necesarios = [permisos.asistencias.view];
        this.permisos_modificar = [permisos.asistencias.change];
        this.permisos_añadir = [permisos.asistencias.add];
        this.permisos_borrar = [permisos.asistencias.delete];

        this.state = {
            listaMiembros: [],
            listaActividades: []
        };
    }

    async componentDidMount() {
        let datosMiembros = await recuperarListaMiembro(this.props.history);
        if (this.props.funcionControlPeticion(datosMiembros) && datosMiembros.codigo === 200) {
            this.setState({ listaMiembros: datosMiembros.respuesta });
        }

        let datosActividades = await recuperarListaActividad(this.props.history);
        if (this.props.funcionControlPeticion(datosActividades) && datosActividades.codigo === 200) {
            this.setState({ listaActividades: datosActividades.respuesta });
        }
    }

    funcionOnChangeTexto = (valor, campo) => {
        let datoEnEdicion = clonar(this.props.datoEnEdicion);

        if (campo === "miembro" || campo === "actividad") {
            datoEnEdicion[campo] = valor ? parseInt(valor) : "";
        } else {
            datoEnEdicion[campo] = valor;
        }

        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    render() {
        return (
            <div className="row">
                <div className={"col-sm-12 col-md-4 " + estilos.entradaTexto}>
                    <label className={estilos.etiqueta}>{this.props.traduccion("member")}</label>
                    <select
                        className="form-control"
                        value={this.props.datoEnEdicion.miembro || ""}
                        onChange={e => this.funcionOnChangeTexto(e.target.value, "miembro")}
                        required
                    >
                        <option value="">{this.props.traduccion("select_member")}</option>
                        {this.state.listaMiembros.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={"col-sm-12 col-md-4 " + estilos.entradaTexto}>
                    <label className={estilos.etiqueta}>{this.props.traduccion("activity")}</label>
                    <select
                        className="form-control"
                        value={this.props.datoEnEdicion.actividad || ""}
                        onChange={e => this.funcionOnChangeTexto(e.target.value, "actividad")}
                        required
                    >
                        <option value="">{this.props.traduccion("select_activity")}</option>
                        {this.state.listaActividades.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default CompAsistencias;
