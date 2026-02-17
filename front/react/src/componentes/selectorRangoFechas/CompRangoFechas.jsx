import React from "react";
import PropTypes from "prop-types";

import moment from "moment";
import estilos from "./CompRangoFechas.module.css";
import { withNamespaces } from "react-i18next";
import CompEntrada from "../entrada/CompEntrada";
import CompDesplegable from "../desplegables/CompDesplegable";
import EleBotonImagen from "../../elementos/botones/EleBotonImagen";

/**
 * Componente que permitirá elegir un rango de fechas.
 *
 * @version 0.1
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompRangoFechas extends React.PureComponent {
    static propTypes = {

        fecha_desde: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,

        fecha_hasta: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,

        funcionOnChangeFecha: PropTypes.func.isRequired,

        rangoInicial: PropTypes.number

    };

    static defaultProps = {
        rangoInicial: 1
    };

    constructor(props) {
        super(props);

        this.state = {
            valorDesplegable: this.props.rangoInicial
        };

        this.valoresDesplegable = [
            {
                'id': 1,
                'texto': this.props.t('semanal')
            },
            {
                'id': 2,
                'texto': this.props.t('mensual')
            },
            {
                'id': 3,
                'texto': this.props.t('anual')
            },
        ];
    };

    configuraMoment = () => {
        moment.locale('es', {
            week: {
                dow: 1,
            }
        })
    };

    funcionOnChangeTexto = (valor, campo) => {
        let newState = {};
        newState[campo] = valor
        this.setState(newState, this.funcionCambiarFecha);
    };

    funcionCambiarFecha = () => {
        let rango = this.state.valorDesplegable;
        let fechas = {};

        if (rango == 1) {
            fechas = this.obtenerFecha('week');
        } else if (rango == 2) {
            fechas = this.obtenerFecha('month');
        } else if (rango == 3) {
            fechas = this.obtenerFecha('year');
        } else {
            return;
        }

        this.props.funcionOnChangeFecha(fechas.fechaDesde, "fecha_desde");
        this.props.funcionOnChangeFecha(fechas.fechaHasta, "fecha_hasta");
    };

    obtenerFecha(rango, fecha = new Date()) {
        let fechaInicial = moment(fecha);
        let fechaInicio = fechaInicial.startOf(rango);
        let fechaInicioAnterior = fechaInicio.subtract(1, rango);
        let fechaDesde = fechaInicioAnterior.format('YYYY-MM-DD');

        fechaInicial = moment(fecha);
        let fechaFin = fechaInicial.endOf(rango);
        let fechaFinAnterior = fechaFin.subtract(1, rango);
        let fechaHasta = fechaFinAnterior.format('YYYY-MM-DD');

        return { fechaDesde, fechaHasta };
    };

    funcionSubirFecha = () => {
        let fechaInicial = moment(this.props.fecha_desde);
        let rango = this.state.valorDesplegable;

        if (rango == 1) {
            this.moverFecha('week', fechaInicial, true);
        } else if (rango == 2) {
            this.moverFecha('month', fechaInicial, true);
        } else if (rango == 3) {
            this.moverFecha('year', fechaInicial, true);
        }
    };

    funcionBajarFecha = () => {
        let fechaInicial = moment(this.props.fecha_desde);
        let rango = this.state.valorDesplegable;

        if (rango == 1) {
            this.moverFecha('week', fechaInicial, false)
        } else if (rango == 2) {
            this.moverFecha('month', fechaInicial, false);
        } else if (rango == 3) {
            this.moverFecha('year', fechaInicial, false);
        }
    };

    moverFecha = (rango, fechaInicial, subir) => {
        let fechaDesde;
        let fechaHasta = fechaInicial.format('YYYY-MM-DD');

        if (subir) {
            fechaDesde = moment(fechaInicial).add(1, rango);
            fechaHasta = moment(fechaDesde).endOf(rango);
        } else {
            fechaDesde = moment(fechaInicial).subtract(1, rango);
            fechaHasta = moment(fechaDesde).endOf(rango);
        }

        fechaDesde = fechaDesde.format('YYYY-MM-DD');
        fechaHasta = fechaHasta.format('YYYY-MM-DD');

        this.props.funcionOnChangeFecha(fechaDesde, "fecha_desde");
        this.props.funcionOnChangeFecha(fechaHasta, "fecha_hasta");
    };

    componentDidMount() {
        this.configuraMoment();
        this.funcionCambiarFecha();
    };

    render() {

        return (
            <React.Fragment>
                <div className="row">


                    <div className={'col-sm-12 col-md-4'}>
                        <CompEntrada
                            desactivado={this.state.valorDesplegable >= 1 && this.state.valorDesplegable <= 3}
                            tipoEntrada="EntradaFecha"
                            obligatorio={true}
                            etiqueta={this.props.t("date_from")}
                            tipo="date"
                            nombre="fecha_desde"
                            valor={this.props.fecha_desde}
                            funcionOnChange={this.props.funcionOnChangeFecha}
                        />
                    </div>
                    <div className={'col-sm-12 col-md-4'}>
                        <CompEntrada
                            desactivado={this.state.valorDesplegable >= 1 && this.state.valorDesplegable <= 3}
                            tipoEntrada="EntradaFecha"
                            obligatorio={true}
                            etiqueta={this.props.t("date_to")}
                            tipo="date"
                            nombre="fecha_hasta"
                            valor={this.props.fecha_hasta}
                            funcionOnChange={this.props.funcionOnChangeFecha}
                        />
                    </div>
                    <div className={'col-sm-12 col-md-4'}>
                        <div className="row">
                            <div className="col-sm-1 " >
                                <EleBotonImagen
                                    desactivarOndas={false}
                                    funcionOnClick={this.funcionSubirFecha}
                                    desactivado={this.state.texto === ""}
                                    primario
                                    icono="expand_less"
                                    placement="left"
                                    claseCss={estilos.botonesRangoFechas}
                                />
                                <EleBotonImagen
                                    desactivarOndas={false}
                                    funcionOnClick={this.funcionBajarFecha}
                                    desactivado={this.state.texto === ""}
                                    primario
                                    icono="expand_more"
                                    placement="right"
                                    claseCss={estilos.botonesRangoFechas}
                                />
                            </div>
                            <div className="col-sm-11 pl-4">
                                <CompDesplegable
                                    obligatorio={false}
                                    tipoDesplegable="desplegable"
                                    datos={this.valoresDesplegable}
                                    campoClave="id"
                                    campoVisible="texto"
                                    nombre="valorDesplegable"
                                    idSeleccionado={this.state.valorDesplegable}
                                    etiqueta={this.props.t("rango")}
                                    funcionOnChange={this.funcionOnChangeTexto}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(CompRangoFechas);
