import React from "react";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import { vistaContenedor } from "../../../componentes/vistas/CompVistaContenedor";
import permisos from "../../comunes/autorizacion/Permisos";
import estilos from "./VistaMiembro.module.css";
import { recuperarListaMiembro, guardarMiembro, borrarMiembro } from "../servicios/ServicioMiembros";
import CompMantenimientoLista from "../../../componentes/mantenimientos/lista/CompMantenimientoLista";
import CompMiembros from "../componentes/ComponenteMiembros"; // Asegúrate que el nombre coincida con el archivo físico
import { clonar } from "../../../componentes/Utilidades";

class VistaMiembros extends CompPermisos {
    constructor(props) {
        super(props);
        this.state = {
            datosLista: [],
            datoEnEdicion: {}
        };
        // Permisos ajustados (sin .maestros)
        this.permisos_necesarios = [permisos.miembros.view];
        this.permisos_modificar = [permisos.miembros.change];
        this.permisos_añadir = [permisos.miembros.add];
        this.permisos_borrar = [permisos.miembros.delete];
    }

    cabeceraLista = [
        { campo: "nombre", titulo: "name" },
        { campo: "apellido", titulo: "last_name" },
        { campo: "email", titulo: "email" }
    ];

    funcionRecuperarLista = async () => {
        let datosListaAjax = await recuperarListaMiembro(this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datosListaAjax);
        if (controlPeticion && datosListaAjax.codigo === 200) {
            this.setState({ datosLista: datosListaAjax.respuesta });
        }
        return controlPeticion;
    };

    cambiaEstados = estadoCambiar => { this.setState(estadoCambiar); };

    guardar = async () => {
        let datoEnEdicion = clonar(this.state.datoEnEdicion);
        let datoActualizado = await guardarMiembro(datoEnEdicion, this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datoActualizado);
        if (!controlPeticion) return false;
        return datoActualizado.respuesta;
    };

    funcionGuardarEliminado = async id => {
        let datoActualizado = await borrarMiembro(id, this.props.history);
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
                componenteMantenimiento={CompMiembros}
                campoOrdenacion="apellido"
                sentidoOrdenacion="asc"
                objetosListados="miembros"
                estiloPanel={estilos.panelMantenimiento}
                funcionControlPeticion={this.props.funcionControlPeticion}
                listaRedimensionable={false}
            />
        );
    }
}
export default vistaContenedor(VistaMiembros);