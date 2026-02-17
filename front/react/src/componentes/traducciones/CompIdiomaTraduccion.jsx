import React from "react";
import CompEntrada from "../entrada/CompEntrada";
import CompDesplegable from "../desplegables/CompDesplegable";
import EleBotonImagen from "../../elementos/botones/EleBotonImagen";
import estilos from "./Traducciones.module.css";
import { clonar } from "../Utilidades";

class CompIdiomaTraduccion extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hayCambios: false
        };
    }

    cambiaValorIdioma = datos => {
        let nuevosDatos = clonar(this.props.datoEnEdicion);
        nuevosDatos.idioma = datos;

        this.actualizaIdioma(nuevosDatos);
    };

    cambiaValorTexto = datos => {
        let nuevosDatos = clonar(this.props.datoEnEdicion);
        nuevosDatos.traduccion = datos;

        this.actualizaIdioma(nuevosDatos);
    };

    actualizaIdioma = async nuevosDatos => {
        let nuevoCambio = await this.props.cambiaTraduccion(nuevosDatos, this.props.indice);

        if (nuevoCambio) {
            if (!this.state.hayCambios) {
                this.setState({
                    hayCambios: true
                });
            } else if (!nuevosDatos.traduccion && !nuevosDatos.idioma && !nuevosDatos.id) {
                this.setState({
                    hayCambios: false
                });
            }
        }
    };

    funcionBorrar = () => {
        this.props.funcionBorrar(this.props.indice);
    };

    funcionGuardar = async () => {
        let datoGuardado = await this.props.funcionGuardar(this.props.indice);

        if (datoGuardado) {
            this.setState({
                hayCambios: false
            });
        }
    };

    render() {
        return (
            <div className={"row " + estilos.contenedorTraduccion}>
                <div className="col-sm-12 col-md-4">
                    <CompDesplegable
                        desactivado={this.props.desactivado === true}
                        obligatorio={this.props.datoEnEdicion.id >= 0 || this.state.hayCambios}
                        idSeleccionado={this.props.datoEnEdicion.idioma}
                        datos={this.props.listaPaises}
                        funcionOnChange={this.cambiaValorIdioma}
                        tipoDesplegable="desplegable"
                        etiqueta={this.props.t("language")}
                        nombre="idioma"
                        campoVisible="nombre"
                        campoClave="codigo"
                    />
                </div>
                <div className="col-sm-12 col-md-8">
                    <CompEntrada
                        desactivado={this.props.desactivado === true}
                        obligatorio={this.props.datoEnEdicion.id >= 0 || this.state.hayCambios}
                        tipoEntrada="EntradaTexto"
                        etiqueta={this.props.t("value")}
                        tipo="text"
                        nombre="pais"
                        multilineas={true}
                        lineas={1}
                        lineasMaximas={3}
                        valor={this.props.datoEnEdicion.traduccion}
                        funcionOnChange={this.cambiaValorTexto}
                        adornoDerecho={
                            <React.Fragment>
                                <EleBotonImagen
                                    desactivado={!this.props.datoEnEdicion.id && !this.state.hayCambios}
                                    claseCss={estilos.boton}
                                    icono="delete"
                                    tooltip={this.props.t("delete")}
                                    placement="top"
                                    funcionOnClick={this.funcionBorrar}
                                />
                                <EleBotonImagen
                                    desactivado={!this.state.hayCambios || !this.props.datoEnEdicion.traduccion || !this.props.datoEnEdicion.idioma}
                                    claseCss={estilos.boton}
                                    icono="save"
                                    tooltip={this.props.t("save")}
                                    placement="top"
                                    funcionOnClick={this.funcionGuardar}
                                />
                            </React.Fragment>
                        }
                    />
                </div>
            </div>
        );
    }
}

export default CompIdiomaTraduccion;
