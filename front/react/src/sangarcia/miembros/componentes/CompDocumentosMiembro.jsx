import React from "react";
import PropTypes from "prop-types";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";
import CompTablaMantenimiento from "../../../componentes/tablaMantenimiento/CompTablaMantenimiento";
import CompUnDocumentoMiembro from "./CompUnDocumentoMiembro"; // Este es el formulario de edición
import { recuperarDocumentosMiembro, borrarDocumentoMiembro, guardarDocumentoMiembro } from "../servicios/ServicioMiembroDocumento";

class CompDocumentosMiembro extends CompPermisos {
    static propTypes = {
        funcionCambiaEstados: PropTypes.func,
        datoEnEdicion: PropTypes.any.isRequired,
        traduccion: PropTypes.func.isRequired,
        funcionControlPeticion: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        // 1. ASIGNACIÓN PARA LA CLAVE PADRE (Evita el redirect al login)
        // CompPermisos busca estas variables exactas
        this.permisos_necesarios = [permisos.miembros.documentos.view];
        this.permisos_modificar = [permisos.miembros.documentos.change];
        this.permisos_añadir = [permisos.miembros.documentos.add];
        this.permisos_borrar = [permisos.miembros.documentos.delete];

        // 2. ASIGNACIÓN PARA LA TABLA (Mantiene la funcionalidad de la tabla)
        this.totalPermisos = {
            permisos_necesarios: this.permisos_necesarios,
            permisos_modificar: this.permisos_modificar,
            permisos_añadir: this.permisos_añadir,
            permisos_borrar: this.permisos_borrar
        };

        this.state = {
            listaDocumentos: []
        };
    }

    cabeceraLista = [
        {
            campo: "tipo_documento",
            titulo: "tipo_documento",
            ancho: 200
        },
        {
            campo: "nombre_documento",
            titulo: "nombre",
            ancho: 250
        },
        {
            campo: "documento",
            titulo: "document",
            tipo: "archivo",
            iconoArchivo: "download",
            ancho: 100
        }
    ];

    cambiarDocumentos = nuevosDocumentos => {
        this.setState({ listaDocumentos: nuevosDocumentos });
    };

    // CompDocumentosMiembro.jsx
    funcionRecuperarDocumentos = async () => {
        let id = this.props.datoEnEdicion.id;
        if (id) {
            let datosListaAjax = await recuperarDocumentosMiembro(id, this.props.history);
            let controlPeticion = this.props.funcionControlPeticion(datosListaAjax);

            if (controlPeticion) {
                // CAMBIO CLAVE: Si es un array, lo asignamos directamente.
                // Si viene con el formato antiguo (.respuesta), también lo pilla.
                let listaAux = Array.isArray(datosListaAjax) ? datosListaAjax : datosListaAjax.respuesta || [];

                this.setState({ listaDocumentos: listaAux });
            }
            return controlPeticion;
        }
    };

    componentDidMount() {
        this.funcionRecuperarDocumentos();
    }

    funcionEliminado = async (datos, eliminados) => {
        for (let i = 0; i < eliminados.length; i++) {
            await borrarDocumentoMiembro(eliminados[i].id, this.props.history);
        }
        this.setState({ listaDocumentos: datos });
    };

    render() {
        return (
            <CompTablaMantenimiento
                desactivado={!this.props.datoEnEdicion.id}
                titulo={this.props.traduccion("documentos")}
                permisos={this.totalPermisos}
                funcionControlPeticion={this.props.funcionControlPeticion}
                objetosListados="documento"
                columnas={this.cabeceraLista}
                filas={this.state.listaDocumentos}
                mantenimiento={CompUnDocumentoMiembro} // El formulario que se abre al pulsar "Añadir"
                ancho="lg"
                funcionBorrar={this.funcionEliminado}
                idPrincipal={this.props.datoEnEdicion.id}
                nombrePrincipal="miembro"
                cambiaEstados={this.cambiarDocumentos}
                autoGuardar={true}
                funcionAutoGuardar={guardarDocumentoMiembro}
                historia={this.props.history}
            />
        );
    }
}

export default CompDocumentosMiembro;
