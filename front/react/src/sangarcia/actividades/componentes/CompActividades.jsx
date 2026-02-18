import React from "react";
import PropTypes from "prop-types";
import estilos from "./CompActividades.module.css";
import { clonar } from "../../../componentes/Utilidades";
import CompPermisos from "../../../componentes/permisos/CompPermisos";
import permisos from "../../comunes/autorizacion/Permisos";
import CompEntrada from "../../../componentes/entrada/CompEntrada";
import { recuperarListaFiesta } from "../../fiestas/servicios/ServicioFiestas";

class CompActividades extends CompPermisos {
    static propTypes = {
        funcionCambiaEstados: PropTypes.func.isRequired,
        datoEnEdicion: PropTypes.any.isRequired,
        traduccion: PropTypes.func.isRequired,
        funcionControlPeticion: PropTypes.func.isRequired,
        history: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.recuperaDatos = false;
        this.permisos_necesarios = [permisos.actividades.view];
        this.permisos_modificar = [permisos.actividades.change];
        this.permisos_añadir = [permisos.actividades.add];
        this.permisos_borrar = [permisos.actividades.delete];

        // Estado local para guardar las fiestas disponibles
        this.state = {
            listaFiestas: []
        };
    }

    // Al cargar el componente, buscamos las fiestas
    async componentDidMount() {
        let datosFiestas = await recuperarListaFiesta(this.props.history);
        if (this.props.funcionControlPeticion(datosFiestas) && datosFiestas.codigo === 200) {
            this.setState({ listaFiestas: datosFiestas.respuesta });
        }
    }

    funcionOnChangeTexto = (valor, campo) => {
        let datoEnEdicion = clonar(this.props.datoEnEdicion);
        datoEnEdicion[campo] = valor;
        this.props.funcionCambiaEstados({ datoEnEdicion: datoEnEdicion });
    };

    render() {
        return (
            <div className="row">
                <div className={"col-sm-12 col-md-4 " + estilos.entradaTexto}>
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
                <div className={"col-sm-12 col-md-4 " + estilos.entradaTexto}>
                    <CompEntrada
                        tipoEntrada="EntradaNumero"
                        obligatorio={true}
                        etiqueta={this.props.traduccion("duration")}
                        maximo={100}
                        nombre="duracion"
                        valor={this.props.datoEnEdicion.duracion || ""}
                        funcionOnChange={this.funcionOnChangeTexto}
                    />
                </div>
                <div className={"col-sm-12 col-md-4 " + estilos.entradaTexto}>
                    <label className={estilos.etiqueta}>{this.props.traduccion("fiesta")}</label>

                    <select
                        className="form-control" // Clase estándar de Bootstrap
                        value={this.props.datoEnEdicion.fiesta || ""}
                        onChange={e => this.funcionOnChangeTexto(e.target.value, "fiesta")}
                        required
                    >
                        <option value="">{this.props.traduccion("select_option")}</option>
                        {this.state.listaFiestas.map(f => (
                            <option key={f.id} value={f.id}>
                                {f.festividad}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}
export default CompActividades;
