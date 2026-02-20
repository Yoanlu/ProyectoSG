import React from "react";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import { vistaContenedor } from "../../../componentes/vistas/CompVistaContenedor";
import permisos from "../../comunes/autorizacion/Permisos";
import estilos from "./VistaFiestas.module.css";
import { recuperarListaFiesta, guardarFiesta, borrarFiesta } from "../servicios/ServicioFiestas";
import CompMantenimientoLista from "../../../componentes/mantenimientos/lista/CompMantenimientoLista";
import CompFiestas from "../componentes/CompFiestas";
import { clonar } from "../../../componentes/Utilidades";
import EleFiltroBasico from "../../../elementos/filtroBasico/eleFiltroBasico";
import { funcionCrearStrigUrl } from "../../../utils";

class VistaFiestas extends CompPermisos {
    constructor(props) {
        super(props);
        this.state = {
            datosLista: [],
            datoEnEdicion: {},
            criterios: {
                festividad: "",
                inicio_desde: null,
                fin_hasta: null,
                actividades__nombre: ""
            }
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
        { campo: "resumen_actividades", titulo: "activity" }
    ];

    get camposFiltro() {
        return [
            {
                tipo: "EntradaTexto",
                etiqueta: this.props.t("festividad"),
                maximo: 500,
                nombre: "festividad",
                tamañoDiv: "col-sm-3 col-md-3",
                funcionOnChange: this.funcionOnChangeTextoFiltro
            },
            {
                tipo: "EntradaFecha",
                etiqueta: this.props.t("inicio"),
                maximo: 500,
                nombre: "inicio_desde",
                tamañoDiv: "col-sm-2 col-md-2",
                funcionOnChange: this.funcionOnChangeFechaFiltro
            },
            {
                tipo: "EntradaFecha",
                etiqueta: this.props.t("fin"),
                maximo: 500,
                nombre: "fin_hasta",
                tamañoDiv: "col-sm-2 col-md-2",
                funcionOnChange: this.funcionOnChangeFechaFiltro
            },
            {
                tipo: "EntradaTexto",
                etiqueta: this.props.t("actividades__nombre"),
                maximo: 500,
                nombre: "actividades__nombre",
                tamañoDiv: "col-sm-3 col-md-3",
                funcionOnChange: this.funcionOnChangeTextoFiltro
            },
            {
                tipo: "boton",
                funcionOnClick: this.funcionLimpiarFiltro,
                icono: "delete",
                tooltip: this.props.t("limpiar_filtros"),
                tamañoDiv: "col-sm-1 col-md-1 " + estilos.boton,
                estilos: { marginTop: "15px" },
                funcionOnChange: this.funcionOnChangeTextoFiltro
            },
            {
                tipo: "boton",
                funcionOnClick: this.funcionRecuperarFiestasFiltro,
                icono: "search",
                tooltip: this.props.t("buscar_filtro"),
                tamañoDiv: "col-sm-1 col-md-1 ",
                estilos: { marginTop: "15px" },
                funcionOnChange: this.funcionOnChangeTextoFiltro
            }
        ];
    }

    funcionOnChangeTextoFiltro = (valor, campo) => {
        let criterios = clonar(this.state.criterios);
        criterios[campo] = valor;
        this.setState({
            criterios: criterios
        });
    };

    funcionOnChangeFechaFiltro = (valor, campo) => {
        let criterios = clonar(this.state.criterios);
        criterios[campo] = valor;
        this.setState({
            criterios: criterios
        });
    };

    funcionLimpiarFiltro = () => {
        this.setState(
            {
                criterios: {
                    festividad: "",
                    inicio_desde: null,
                    fin_hasta: null,
                    actividades__nombre: ""
                }
            },
            () => {
                this.funcionRecuperarFiestasFiltro();
            }
        );
    };

    funcionRecuperarFiestasFiltro = async () => {
        const datos = funcionCrearStrigUrl(this.state.criterios);
        let datosListaAjax = await recuperarListaFiesta(this.props.history, datos);
        let controlPeticion = this.props.funcionControlPeticion(datosListaAjax);

        if (controlPeticion && datosListaAjax.codigo === 200) {
            this.setState({ datosLista: datosListaAjax.respuesta });
        }
        return controlPeticion;
    };

    funcionRecuperarLista = async () => {
        let datosListaAjax = await recuperarListaFiesta(this.props.history);
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
                navegacion={<EleFiltroBasico campos={this.camposFiltro} t={this.props.t} tituloFiltro="filtro_fiestas" criterios={this.state.criterios} />}
            />
        );
    }
}
export default vistaContenedor(VistaFiestas);
