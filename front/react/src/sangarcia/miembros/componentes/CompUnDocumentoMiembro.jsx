import React from "react";
import PropTypes from "prop-types";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";
import CompEntrada from "../../../componentes/entrada/CompEntrada";
import CompDesplegable from "../../../componentes/desplegables/CompDesplegable";
import CompEntradaFicheroDragDrop from "../../../componentes/entradaFichero/CompEntradaFicheroDragDrop";

class CompUnDocumentoMiembro extends CompPermisos {
    static propTypes = {
        datoEnEdicion: PropTypes.object.isRequired,
        cambiaEstadoFila: PropTypes.func.isRequired,
        traduccion: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.recuperaDatos = false;
        // Permisos necesarios para que el modal funcione
        this.permisos_necesarios = [permisos.miembros.documentos.view];
        this.permisos_modificar = [permisos.miembros.documentos.change];
        this.permisos_añadir = [permisos.miembros.documentos.add];
        this.permisos_borrar = [permisos.miembros.documentos.delete];
    }

    TIPOS_DOCUMENTO = [
        { id: "identificacion", texto: "Identificación/DNI" },
        { id: "contrato", texto: "Contrato Laboral" },
        { id: "titulo", texto: "Título Académico" },
        { id: "otros", texto: "Otros" }
    ];

    onChangeInterno = (valor, campo) => {
        const nuevoDato = { ...this.props.datoEnEdicion };
        nuevoDato[campo] = valor;
        this.props.cambiaEstadoFila(nuevoDato);
    };

    onChangeArchivo = (valor, nombreCampo, indice, nombreFichero) => {
        let datoEnEdicion = { ...this.props.datoEnEdicion };

        if (valor === null) {
            datoEnEdicion.documento = null;
            datoEnEdicion.nombre_documento = "";
        } else {
            datoEnEdicion.documento = valor; // El archivo binario
            datoEnEdicion.nombre_documento = nombreFichero; // El nombre automático
        }

        this.props.cambiaEstadoFila(datoEnEdicion);
    };

    render() {
        const { datoEnEdicion, traduccion } = this.props;

        return (
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <CompDesplegable
                        tipoDesplegable="desplegable"
                        etiqueta={traduccion("tipo_documento")}
                        obligatorio={true}
                        idSeleccionado={datoEnEdicion.tipo_documento} // Prop correcta
                        datos={this.TIPOS_DOCUMENTO} // Prop correcta
                        campoClave="id"
                        campoVisible="texto"
                        nombre="tipo_documento"
                        funcionOnChange={this.onChangeInterno}
                    />
                </div>
                <div className="col-sm-12 mt-3">
                    <CompEntradaFicheroDragDrop
                        nombre={traduccion("document")}
                        campo="documento"
                        // Formato obligatorio para que el DragDrop lo pinte bien
                        valor={
                            datoEnEdicion.documento
                                ? [
                                      {
                                          nombre: datoEnEdicion.nombre_documento,
                                          contenido: datoEnEdicion.documento
                                      }
                                  ]
                                : []
                        }
                        funcionOnChange={this.onChangeArchivo}
                        tiposAceptados=".pdf,.png" // Aquí pones tus formatos
                    />
                </div>

                {/* Tercera fila: Observaciones */}
                <div className="col-sm-12 mt-3">
                    <CompEntrada
                        tipoEntrada="EntradaAreaTexto"
                        etiqueta={traduccion("observaciones")}
                        nombre="observaciones"
                        valor={datoEnEdicion.observaciones || ""}
                        funcionOnChange={this.onChangeInterno}
                    />
                </div>
            </div>
        );
    }
}

export default CompUnDocumentoMiembro;
