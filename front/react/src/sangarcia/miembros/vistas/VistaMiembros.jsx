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
        { campo: "email", titulo: "email" },
        { campo: "dni", titulo: "DNI" },
        { campo: "pagador_nombre", titulo: "pagador" },
        { campo: "importe", titulo: "importe" },
        { campo: "total_pago", titulo: "total_pago" }
    ];

    funcionRecuperarLista = async () => {
        let datosListaAjax = await recuperarListaMiembro(this.props.history);
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

    descargarJSON = () => {
        const datosFiltrados = this.state.datosLista.filter(miembro => miembro.total_pago > 0);
        const datosExportar = datosFiltrados.map(miembro => ({
            dni: miembro.dni || "Sin DNI",
            nombre: `${miembro.nombre} ${miembro.apellido}`,
            total_a_pagar: miembro.total_pago
        }));

        const jsonString = JSON.stringify(datosExportar, null, 2);

        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = "cuotas_miembros.json"; // El nombre del archivo que se descargará
        document.body.appendChild(enlace);
        enlace.click();

        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    };

    render() {
        return (
            <React.Fragment>
                <div style={{ marginBottom: "15px", textAlign: "right" }}>
                    <button className={estilos.botonDescarga} onClick={this.descargarJSON}>
                        Descargar JSON
                    </button>
                </div>

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
            </React.Fragment>
        );
    }
}
export default vistaContenedor(VistaMiembros);
