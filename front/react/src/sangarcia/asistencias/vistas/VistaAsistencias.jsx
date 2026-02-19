import React from "react";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import { vistaContenedor } from "../../../componentes/vistas/CompVistaContenedor";
import permisos from "../../comunes/autorizacion/Permisos";
import estilos from "./VistaAsistencias.module.css";
import { recuperarListaAsistencias, guardarAsistencias, borrarAsistencias } from "../servicios/ServicioAsistencias";
import CompMantenimientoLista from "../../../componentes/mantenimientos/lista/CompMantenimientoLista";
import CompAsistencias from "../componentes/CompAsistencias";
import { clonar } from "../../../componentes/Utilidades";

class VistaAsistencias extends CompPermisos {
    constructor(props) {
        super(props);
        this.state = {
            datosLista: [],
            datoEnEdicion: {}
        };
        this.permisos_necesarios = [permisos.asistencias.view];
        this.permisos_modificar = [permisos.asistencias.change];
        this.permisos_añadir = [permisos.asistencias.add];
        this.permisos_borrar = [permisos.asistencias.delete];
    }

    cabeceraLista = [
        { campo: "nombre_miembro", titulo: "member" },
        { campo: "nombre_actividad", titulo: "activity" }
    ];

    funcionRecuperarLista = async () => {
        let datosListaAjax = await recuperarListaAsistencias(this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datosListaAjax);
        if (controlPeticion && datosListaAjax.codigo === 200) {
            this.setState({ datosLista: datosListaAjax.respuesta });
        }
        return controlPeticion;
    };

    cambiaEstados = estadoCambiar => {
        this.setState(estadoCambiar);
    };

    guardar = async () => {
        let datoEnEdicion = clonar(this.state.datoEnEdicion);
        let datoActualizado = await guardarAsistencias(datoEnEdicion, this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datoActualizado);
        if (!controlPeticion) return false;
        return datoActualizado.respuesta;
    };

    funcionGuardarEliminado = async id => {
        let datoActualizado = await borrarAsistencias(id, this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datoActualizado);
        if (!controlPeticion) {
            this.funcionRecuperarLista();
            return false;
        }
        return datoActualizado.respuesta;
    };

    render() {
        return (
            <CompMantenimientoLista
                cambiaEstados={this.cambiaEstados}
                datos={this.state.datosLista}
                datoEnEdicion={this.state.datoEnEdicion}
                edicionVisible={this.state.edicionVisible}
                modificar={this.permiso.modificar}
                añadir={this.permiso.añadir}
                eliminar={this.permiso.borrar}
                funcionRecuperarLista={this.funcionRecuperarLista}
                funcionGuardar={this.guardar}
                funcionGuardarEliminado={this.funcionGuardarEliminado}
                cabecera={this.cabeceraLista}
                componenteMantenimiento={CompAsistencias}
                campoOrdenacion="nombre_miembro" // Ordenar por nombre es más intuitivo
                sentidoOrdenacion="asc"
                objetosListados="asistencias"
                estiloPanel={estilos.panelMantenimiento}
                funcionControlPeticion={this.props.funcionControlPeticion}
                listaRedimensionable={false}
            />
        );
    }
}

export default vistaContenedor(VistaAsistencias);
