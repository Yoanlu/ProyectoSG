import React from "react";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import { vistaContenedor } from "../../../componentes/vistas/CompVistaContenedor";
import permisos from "../../comunes/autorizacion/Permisos";
import estilos from "./VistaFiestas.module.css";
import { recuperarListaFiesta, guardarFiesta, borrarFiesta } from "../servicios/ServicioFiestas";
import CompMantenimientoLista from "../../../componentes/mantenimientos/lista/CompMantenimientoLista";
import CompFiestas from "../componentes/CompFiestas"; 
import { clonar } from "../../../componentes/Utilidades";

class VistaFiestas extends CompPermisos {
    constructor(props) {
        super(props);
        this.state = {
            datosLista: [],
            datoEnEdicion: {}
        };
        // Permisos para Fiestas
        this.permisos_necesarios = [permisos.fiestas.view];
        this.permisos_modificar = [permisos.fiestas.change];
        this.permisos_añadir = [permisos.fiestas.add];
        this.permisos_borrar = [permisos.fiestas.delete];
    }

    cabeceraLista = [
        { campo: "festividad", titulo: "festivity" },
        { campo: "inicio", titulo: "start_date" },
        { campo: "fin", titulo: "end_date" },
        { campo: "actividad", titulo: "activity" }
    ];

    funcionRecuperarLista = async () => {
        let datosListaAjax = await recuperarListaFiesta(this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datosListaAjax);
        if (controlPeticion && datosListaAjax.codigo === 200) {
            this.setState({ datosLista: datosListaAjax.respuesta });
        }
        return controlPeticion;
    };

    cambiaEstados = estadoCambiar => { this.setState(estadoCambiar); };

    guardar = async () => {
        let datoEnEdicion = clonar(this.state.datoEnEdicion);
        let datoActualizado = await guardarFiesta(datoEnEdicion, this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datoActualizado);
        if (!controlPeticion) return false;
        return datoActualizado.respuesta;
    };

    funcionGuardarEliminado = async id => {
        let datoActualizado = await borrarFiesta(id, this.props.history);
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
                componenteMantenimiento={CompFiestas}
                campoOrdenacion="festividad"
                sentidoOrdenacion="asc"
                objetosListados="fiestas"
                estiloPanel={estilos.panelMantenimiento}
                funcionControlPeticion={this.props.funcionControlPeticion}
                listaRedimensionable={false}
            />
        );
    }
}
export default vistaContenedor(VistaFiestas);