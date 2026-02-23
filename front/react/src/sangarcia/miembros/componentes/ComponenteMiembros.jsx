import React from "react";
import PropTypes from "prop-types";
import estilos from "./CompMiembro.module.css";
import { clonar } from "../../../componentes/Utilidades";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";
import CompEntrada from "../../../componentes/entrada/CompEntrada";
import CompTabulacion from "../../../componentes/tabulaciones/CompTabulacion"; // Importante
import CompDocumentosMiembro from "./CompDocumentosMiembro"; // El componente de la tabla
import CompPopupDocumento from "./CompPopupDocumento"; // El popup para subir
import { crearDocumentoMiembro } from "../servicios/ServicioMiembroDocumento"; // El servicio

class CompMiembros extends CompPermisos {
    static propTypes = {
        funcionCambiaEstados: PropTypes.func.isRequired,
        datoEnEdicion: PropTypes.any.isRequired,
        traduccion: PropTypes.func.isRequired,
        funcionControlPeticion: PropTypes.func.isRequired,
        history: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.recuperaDatos = false;
        this.permisos_necesarios = [permisos.miembros.view];
        this.permisos_modificar = [permisos.miembros.change];
        this.permisos_añadir = [permisos.miembros.add];
        this.permisos_borrar = [permisos.miembros.delete];

        // Referencia para recargar la tabla de documentos tras subir uno
        this.refDocumentos = React.createRef();

        this.state = {
            mostrarPopupDocumento: false
        };
    }

    // Definimos los tipos de documentos para el Miembro
    TIPOS_DOCUMENTO = [
        { id: "identificacion", texto: "Identificación/DNI" },
        { id: "contrato", texto: "Contrato Laboral" },
        { id: "titulo", texto: "Título Académico" },
        { id: "otros", texto: "Otros" }
    ];

    funcionOnChangeTexto = (valor, campo) => {
        let datoEnEdicion = clonar(this.props.datoEnEdicion);
        datoEnEdicion[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    // --- Lógica de Documentación ---
    abrirPopupDocumento = () => {
        if (!this.props.datoEnEdicion.id) {
            // Podrías mostrar un aviso: "Guarda primero al miembro"
            return;
        }
        this.setState({ mostrarPopupDocumento: true });
    };

    cerrarPopupDocumento = () => {
        this.setState({ mostrarPopupDocumento: false });
    };

    guardarDocumentoRapido = async datosDocumento => {
        const idMiembro = this.props.datoEnEdicion.id;
        const llamada = await crearDocumentoMiembro(idMiembro, datosDocumento, this.props.history);

        let controlPeticion = this.props.funcionControlPeticion(llamada);
        if (controlPeticion && (llamada.codigo === 201 || llamada.codigo === 200)) {
            this.cerrarPopupDocumento();
            // Recargar la tabla de documentos usando la referencia
            if (this.refDocumentos.current) {
                this.refDocumentos.current.funcionRecuperarDocumentos();
            }
        }
    };

    render() {
        return (
            <React.Fragment>
                <CompTabulacion>
                    {/* PESTAÑA 1: DATOS GENERALES */}
                    <div className="row" titulo={this.props.traduccion("member_data")}>
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

                    {/* PESTAÑA 2: DOCUMENTACIÓN */}
                    <CompDocumentosMiembro
                        ref={this.refDocumentos}
                        titulo={this.props.traduccion("documents")}
                        datoEnEdicion={this.props.datoEnEdicion}
                        traduccion={this.props.traduccion}
                        funcionControlPeticion={this.props.funcionControlPeticion}
                        history={this.props.history}
                    />
                </CompTabulacion>

                {/* POPUP GLOBAL */}
                <CompPopupDocumento
                    mostrar={this.state.mostrarPopupDocumento}
                    tiposDocumento={this.TIPOS_DOCUMENTO}
                    funcionCerrar={this.cerrarPopupDocumento}
                    funcionGuardar={this.guardarDocumentoRapido}
                    traduccion={this.props.traduccion}
                />
            </React.Fragment>
        );
    }
}

export default CompMiembros;
