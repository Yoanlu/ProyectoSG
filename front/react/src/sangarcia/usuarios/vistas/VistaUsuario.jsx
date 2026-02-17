import React from "react";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import { vistaContenedor } from "../../../componentes/vistas/CompVistaContenedor";
import permisos from "../../comunes/autorizacion/Permisos";
import { clonar } from "../../../componentes/Utilidades";
import estilos from "./VistaUsuario.module.css";
import { guardarUsuario, recuperarListaUsuarios, eliminarUsuario } from "../servicios/ServicioUsuario";
import CompUsuario from "../componentes/CompUsuario";
import CompMantenimientoLista from "../../../componentes/mantenimientos/lista/CompMantenimientoLista";

/**
 * Vista en la cual se va a visualizar un listado de los usuarios registrados,
 * con la posibilidad de aportar un filtro, orden o agrupación al mismo.
 *
 * Desde esta vista se podrá acceder al alta, modificación o elminación del usuario.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class VistaUsuario extends CompPermisos {
    constructor(props) {
        super(props);

        this.state = {
            datosLista: [],
            datoEnEdicion: {}
        };

        this.permisos_necesarios = [permisos.auth.user.view];
        this.permisos_modificar = [permisos.auth.user.change];
        this.permisos_añadir = [permisos.auth.user.add];
        this.permisos_borrar = [permisos.auth.user.delete];
    }

    cabeceraLista = [
        {
            campo: "username",
            titulo: "user"
        },
        {
            campo: "first_name",
            titulo: "name"
        },
        {
            campo: "last_name",
            titulo: "surname"
        },
        {
            campo: "email",
            titulo: "email",
            tipo: "correo"
        },
        {
            campo: "is_active",
            titulo: "active",
            tipo: "opciones"
        }
    ];

    funcionRecuperarLista = async () => {
        let datosListaAjax = await recuperarListaUsuarios(this.props.history);
        let controlPeticion = this.props.funcionControlPeticion(datosListaAjax);

        if (controlPeticion && datosListaAjax.codigo === 200) {
            let listaAux = datosListaAjax.respuesta;

            this.setState({
                datosLista: listaAux
            });
        }

        return controlPeticion;
    };

    cambiaEstados = estadoCambiar => {
        this.setState(estadoCambiar);
    };

    guardar = async () => {
        let usuarioEnEdicion = clonar(this.state.datoEnEdicion);

        if (usuarioEnEdicion.password === "******") {
            delete usuarioEnEdicion.password;
            delete usuarioEnEdicion.passwordAux;
        }

        if (usuarioEnEdicion.detalle.id) {
            if (usuarioEnEdicion.detalle.telefono === null || usuarioEnEdicion.detalle.telefono === "") {
                delete usuarioEnEdicion.detalle;
            } else {
                delete usuarioEnEdicion.detalle.id;
                delete usuarioEnEdicion.detalle.usuario;
            }
        }

        let datoActualizado = await guardarUsuario(usuarioEnEdicion, this.props.history);

        let controlPeticion = this.props.funcionControlPeticion(datoActualizado);
        if (!controlPeticion) {
            return false;
        }

        return datoActualizado.respuesta;
    };

    funcionGuardarEliminado = async id => {
        let datoActualizado = await eliminarUsuario(id, this.props.history);
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
                añadir={this.permiso.añadir}
                modificar={this.permiso.modificar}
                eliminar={this.permiso.borrar}
                funcionRecuperarLista={this.funcionRecuperarLista}
                funcionGuardar={this.guardar}
                funcionGuardarEliminado={this.funcionGuardarEliminado}
                cabecera={this.cabeceraLista}
                componenteMantenimiento={CompUsuario}
                campoOrdenacion="username"
                sentidoOrdenacion="asc"
                objetosListados="users"
                estiloPanel={estilos.panelMantenimiento}
                funcionControlPeticion={this.props.funcionControlPeticion}
                listaRedimensionable={false}
            />
        );
    }
}

export default vistaContenedor(VistaUsuario);
