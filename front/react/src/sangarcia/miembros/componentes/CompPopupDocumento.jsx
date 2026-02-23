import React from "react";
import PropTypes from "prop-types";
import CompEntrada from "../../../componentes/entrada/CompEntrada";
import CompDesplegable from "../../../componentes/desplegables/CompDesplegable";
import EleBoton from "../../../elementos/botones/EleBoton";

class CompPopupDocumento extends React.Component {
    static propTypes = {
        mostrar: PropTypes.bool.isRequired,
        funcionCerrar: PropTypes.func.isRequired,
        funcionGuardar: PropTypes.func.isRequired,
        tiposDocumento: PropTypes.array.isRequired,
        traduccion: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            fichero: null,
            tipo_documento: "",
            nombre: "",
            observaciones: ""
        };
    }

    onChangeFile = e => {
        const fichero = e.target.files[0];
        this.setState({
            fichero: fichero,
            // Si el nombre está vacío, ponemos el nombre del archivo por defecto
            nombre: this.state.nombre || fichero.name
        });
    };

    render() {
        if (!this.props.mostrar) return null;

        const { traduccion } = this.props;

        return (
            <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{traduccion("upload_document")}</h5>
                        </div>
                        <div className="modal-body">
                            {/* Selección de Archivo */}
                            <div className="form-group">
                                <label>{traduccion("file")}</label>
                                <input type="file" className="form-control" onChange={this.onChangeFile} />
                            </div>

                            {/* Tipo de Documento */}
                            <CompDesplegable
                                etiqueta={traduccion("type")}
                                valor={this.state.tipo_documento}
                                lista={this.props.tiposDocumento}
                                funcionOnChange={val => this.setState({ tipo_documento: val })}
                            />

                            {/* Nombre Descriptivo */}
                            <CompEntrada
                                tipoEntrada="EntradaTexto"
                                etiqueta={traduccion("name")}
                                valor={this.state.nombre}
                                funcionOnChange={val => this.setState({ nombre: val })}
                            />
                        </div>
                        <div className="modal-footer">
                            <EleBoton texto={traduccion("cancel")} tipo="secundario" funcionClick={this.props.funcionCerrar} />
                            <EleBoton
                                texto={traduccion("save")}
                                tipo="primario"
                                deshabilitado={!this.state.fichero || !this.state.tipo_documento}
                                funcionClick={() => this.props.funcionGuardar(this.state)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CompPopupDocumento;
