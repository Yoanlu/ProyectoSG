import React from "react";
import PropTypes from "prop-types";
import CompPermisos from "../../componentes/permisos/CompPermisos";
import CompEntrada from "../../componentes/entrada/CompEntrada";
import CompDesplegable from "../../componentes/desplegables/CompDesplegable";
import ElePanelDesplegable from "../../elementos/paneles_desplegables/ElePanelDesplegable";
import estilos from "./eleFiltroBasico.module.css";
import EleBotonImagen from "../botones/EleBotonImagen";
import EleEntradaInterruptor from "../entradaInterruptor/EleEntradaInterruptor";
import EleBoton from "../botones/EleBoton";

/**
 * Elemento que permite gestionar los campos de un filtro de forma dinamica .
 *
 * @version 0.0.1
 * @author [Oscar Urrutia](http://sandav.es) | [oscar.urrutia@sandavteam.com](mailto:oscar.urrutia@sandavteam.com)
 */

class EleFiltroBasico extends CompPermisos {
    static propTypes = {
        //funcionCambiaEstados: PropTypes.func.isRequired,
        campos: PropTypes.array.isRequired,
        tituloFiltro: PropTypes.string.isRequired,
        t: PropTypes.func.isRequired,
        criterios: PropTypes.object.isRequired,
        style: PropTypes.object,
        desplegadoPorDefecto: PropTypes.bool
    };

    static defaultProps = {
        style: {},
        desplegadoPorDefecto: true
    };

    render() {
        return (
            <div className={"col " + estilos.contenedor} style={this.props.style}>
                <ElePanelDesplegable
                    desplegadoPorDefecto={this.props.desplegadoPorDefecto}
                    claseCss={estilos.acordeon}
                    titulo={this.props.t(this.props.tituloFiltro)}
                >
                    <div className="row">
                        {this.props.campos.map((campo, idx) => {
                            const obligatorio = campo.obligatorio !== undefined ? campo.obligatorio : false;
                            const desactivado = campo.desactivado !== undefined ? campo.desactivado : false;
                            const campoClave = campo.campoClave !== undefined ? campo.campoClave : "id";
                            const campoVisible = campo.campoVisible !== undefined ? campo.campoVisible : "texto";
                            const classCss = campo.classCss !== undefined ? campo.classCss : "";

                            if (campo.tipo === "EntradaTexto" || campo.tipo === "EntradaFecha") {
                                return (
                                    <div key={idx} className={campo.tamañoDiv ? campo.tamañoDiv : "col-sm-12 col-md-6"}>
                                        <CompEntrada
                                            key={idx}
                                            desactivado={desactivado}
                                            tipoEntrada={campo.tipo}
                                            obligatorio={obligatorio}
                                            etiqueta={campo.etiqueta}
                                            maximo={campo.maximo}
                                            nombre={campo.nombre}
                                            valor={this.props.criterios[campo.nombre]}
                                            funcionOnChange={campo.funcionOnChange}
                                        />
                                    </div>
                                );
                            } else if (campo.tipo === "desplegable") {
                                return (
                                    <div key={idx} className={campo.tamañoDiv ? campo.tamañoDiv : "col-sm-12 col-md-6"}>
                                        <CompDesplegable
                                            desactivado={desactivado}
                                            obligatorio={obligatorio}
                                            tipoDesplegable="desplegable"
                                            datos={campo.datos}
                                            nombre={campo.nombre}
                                            idSeleccionado={this.props.criterios[campo.nombre]}
                                            campoClave={campoClave}
                                            campoVisible={campoVisible}
                                            etiqueta={campo.etiqueta}
                                            funcionOnChange={campo.funcionOnChange}
                                        />
                                    </div>
                                );
                            } else if (campo.tipo === "desplegable_multiseleccion") {
                                return (
                                    <div key={idx} className={campo.tamañoDiv ? campo.tamañoDiv : "col-sm-12 col-md-6"}>
                                        <CompDesplegable
                                            desactivado={desactivado}
                                            tipoDesplegable="multiseleccion"
                                            datos={campo.datos}
                                            nombre={campo.nombre}
                                            valorMultiseleccion={this.props.criterios[campo.nombre]}
                                            campoClave={campoClave}
                                            campoVisible={campoVisible}
                                            etiqueta={campo.etiqueta}
                                            funcionOnChange={campo.funcionOnChange}
                                            controlErrores={false}
                                            multilineas={false}
                                        />
                                    </div>
                                );
                            } else if (campo.tipo === "botonImagen") {
                                return (
                                    <div key={idx} className={campo.tamañoDiv ? campo.tamañoDiv : "col-sm-1 col-md-1 "}>
                                        <EleBotonImagen
                                            desactivarOndas={campo.desactivarOndas}
                                            funcionOnClick={() => campo.funcionOnClick(this.props.criterios)}
                                            primario
                                            icono={campo.icono}
                                            tooltip={campo.tooltip}
                                            placement={campo.placement}
                                        />
                                    </div>
                                );
                            } else if (campo.tipo === "boton") {
                                return (
                                    <div key={idx} className={campo.tamañoDiv ? campo.tamañoDiv : "col-sm-1 col-md-1 "}>
                                        <EleBoton
                                            icono={campo.icono}
                                            texto={campo.texto || ""}
                                            apariencia="contained"
                                            primario={true}
                                            funcionOnClick={() => campo.funcionOnClick(this.props.criterios)}
                                            desactivado={false}
                                            tooltip={campo.tooltip}
                                            placement={campo.placement}
                                            estilos={campo.estilos}
                                        />
                                    </div>
                                );
                            } else if (campo.tipo === "interruptor") {
                                return (
                                    <div key={idx} className={campo.tamañoDiv ? campo.tamañoDiv : "col-sm-1 col-md-1 "}>
                                        <EleEntradaInterruptor
                                            claseCss={classCss}
                                            nombre={campo.nombre}
                                            chequeado={this.props.criterios[campo.nombre]}
                                            etiqueta={campo.etiqueta}
                                            ubicacionEtiqueta={campo.ubicacionEtiqueta}
                                            funcionOnChange={campo.funcionOnChangeInterruptor}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </ElePanelDesplegable>
            </div>
        );
    }
}
export default EleFiltroBasico;
