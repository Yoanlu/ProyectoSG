import React from "react";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import { vistaContenedor } from "../../../componentes/vistas/CompVistaContenedor";
import permisos from "../../comunes/autorizacion/Permisos";
import estilos from "./VistaActividades.module.css";
import { recuperarListaActividad, guardarActividad, borrarActividad } from "../servicios/ServicioActividades";
import CompMantenimientoLista from "../../../componentes/mantenimientos/lista/CompMantenimientoLista";
import CompActividades from "../componentes/CompActividades";
import { clonar } from "../../../componentes/Utilidades";

class VistaActividades extends CompPermisos {
    constructor(props) {
        super(props);
        this.state = {
            datosLista: [],
            datoEnEdicion: {}
        };
        // Permisos para Actividades
        this.permisos_necesarios = [permisos.actividades.view];
        this.permisos_modificar = [permisos.actividades.change];
        this.permisos_añadir = [permisos.actividades.add];
        this.permisos_borrar = [permisos.actividades.delete];
    }

    cabeceraLista = [
        { campo: "nombre", titulo: "name" },
        { campo: "duracion", titulo: "duration" },
        { campo: "fiesta", titulo: "party_id" },
        { campo: "nombre_festividad", titulo: "festivity" } // ¡Ahora enseñará el nombre!
    ];

    funcionRecuperarLista = async () => {
        let datosListaAjax = await recuperarListaActividad(this.props.history);
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
        let datoActualizado = await guardarActividad(datoEnEdicion, this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datoActualizado);
        if (!controlPeticion) return false;
        return datoActualizado.respuesta;
    };

    funcionGuardarEliminado = async id => {
        let datoActualizado = await borrarActividad(id, this.props.history);
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
                componenteMantenimiento={CompActividades}
                campoOrdenacion="nombre"
                sentidoOrdenacion="asc"
                objetosListados="actividades"
                estiloPanel={estilos.panelMantenimiento}
                funcionControlPeticion={this.props.funcionControlPeticion}
                listaRedimensionable={false}
            />
        );
    }
}
export default vistaContenedor(VistaActividades);
