import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment/min/moment-with-locales";

import estilos from './CompCalendarioAnual.module.css';
import EleCalendario from '../../elementos/calendarios/EleCalendario';
import EleBotonImagen from '../../elementos/botones/EleBotonImagen';

import CompEntrada from '../../componentes/entrada/CompEntrada';
import EleVentanaEmergente from '../../elementos/ventanasEmergentes/EleVentanaEmergente';
import { withNamespaces } from 'react-i18next';
import { withStyles } from "@mui/styles";
import { recogerIdioma } from '../Utilidades';

/**
 * Componente que mostrará un calendario anual.
 *
 * @version 0.4
 * @author [Pablo Pérez](http://sandav.es) | [pablo.perez@sandav.es](mailto:pablo.perez@sandav.es)
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
class CompCalendarioAnual extends React.Component {
    static propTypes = {
        /**
         * Año seleccionado.
         */
        year: PropTypes.number.isRequired,
        /**
         * Idioma en el que quiero visualizar el calendario.
         */
        lng: PropTypes.string.isRequired,
        /**
         * Función que se va a disparar al cambiar el día seleccionado.
         */
        funcionActualizaDiasSeleccionados: PropTypes.func.isRequired,
        /**
         * Clase Css que aplicará en el calendario.
         */
        claseCss: PropTypes.string,
        /**
         * Booleano para los parmisos necesarios.
         */
        //permisoNecesarios: PropTypes.array,
        /**
         * Permite el añadir un día seleccionado.
         */
        //permisoAñadir: PropTypes.array,
        /**
         * Permite o no Modificar los días seleccionados
         */
        //permisoModificar: PropTypes.array,
        /**
         * Permite el borrado de días seleccionados.
         */
        //permisosBorrar: PropTypes.array,
        /**
         * Tipo de calendario ( color ) de seleccionado.
         */
        color: PropTypes.string,
        /**
         * Color que se asociará a la letras de cada día selecionado
         */
        colorLetra: PropTypes.string,
        /**
         * Array de días seleccionados para cargar.
         */
        datoEnEdicionDias: PropTypes.any,
        /**
         * Posibilidad de seleccionar fechas.
         */
        seleccionable: PropTypes.bool,
        /**
         * Función que actualiza el array de días seleccionados.
         */
        cambiaEstadoDia: PropTypes.func
    };

    static defaultProps = {
        seleccionable: true,
        datoEnEdicionDias: []
    };

    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            diaActual: [],
            descripcionVisible: false,
            titulo: '',
            ponerDescripcionDia: true
        };

        this.inputOculto = React.createRef();
        this.moment = moment;
        this.funcionClickDia = this.funcionClickDia.bind(this);
        this.cambiaEstados = this.props.cambiaEstados;
    }

    funcionClickDia(mes, event) {
        this.inputOculto.current.dispatchEvent(new Event('change', { bubbles: true }));

        const dia = {
            fecha: new Date(Date.UTC(this.state.year, mes, event.target.textContent)),
            descripcion: '',
            color: this.props.color,
            colorLetra: this.props.colorLetra
        };

        let idioma = recogerIdioma(this.props.lng);
        this.moment.locale(idioma);

        let dias = this.props.datoEnEdicionDias || [];

        const indice = dias.findIndex(objeto => +objeto.fecha === +dia.fecha);
        if (indice >= 0) {
            if (this.props.permisoBorrar) {
                dias.splice(indice, 1);

                this.props.cambiaEstadoDia(dias);

                this.setState({
                    descripcionVisible: false
                });
            }
        } else {
            if (this.props.permisoAñadir) {
                this.setState({
                    diaActual: dia,
                    titulo: 'Día: ' + moment(dia.fecha).format('DD-MMMM-YYYY'),
                    descripcionVisible: this.props.permisoAñadir ? true : false
                });
            }
        }
    }

    funcionRecogeDescripcion = (valor, campo) => {
        let edicionAux = this.state.diaActual;
        edicionAux.descripcion = valor;
        this.setState({
            diaActual: edicionAux
        });
    };

    funcionAceptar = () => {
        const dia = this.state.diaActual;
        let dias = this.props.datoEnEdicionDias || [];

        const indice = dias.findIndex(objeto => +objeto.fecha === +dia.fecha);
        if (indice < 0) {
            dias.push(dia);
            this.props.funcionActualizaDiasSeleccionados(dias);
            this.props.cambiaEstadoDia(dias);
        }

        this.setState({
            descripcionVisible: false
        });
    };

    funcionCancelarDescripcion = () => {
        this.setState({
            descripcionVisible: false,
            diaActual: []
        });
    };

    funcionAnoSiguiente = () => {
        this.setState({
            year: this.state.year + 1
        });
    };

    funcionAnoAnterior = () => {
        this.setState({
            year: this.state.year - 1
        });
    };

    render() {
        return (
            <div className="row">
                <select ref={this.inputOculto} hidden />
                <div className={'col-sm-12 ' + estilos.cabecera + ' ' + this.props.classes.estiloaño}>
                    <EleBotonImagen icono="keyboard_arrow_left" funcionOnClick={this.funcionAnoAnterior} />
                    {this.state.year}
                    <EleBotonImagen icono="keyboard_arrow_right" funcionOnClick={this.funcionAnoSiguiente} />
                </div>
                {this.state.ponerDescripcionDia ? (
                    <EleVentanaEmergente
                        aceptarCancelar
                        titulo={this.state.titulo}
                        mostrarError={this.state.descripcionVisible}
                        mensaje={
                            <div>
                                <CompEntrada
                                    tipoEntrada={'EntradaTexto'}
                                    obligatorio={true}
                                    nombre="nombre"
                                    tipo="text"
                                    etiqueta={this.props.t('description')}
                                    valor={this.state.diaActual.descripcion}
                                    funcionOnChange={this.funcionRecogeDescripcion}
                                />
                            </div>
                        }
                        funcionCerrarVentana={this.funcionCancelarDescripcion}
                        funcionAceptar={this.funcionAceptar}
                    />
                ) : null}
                {Array(12)
                    .fill(1)
                    .map((valor, indice) => {
                        if (this.props.seleccionable === true) {
                            return (
                                <EleCalendario
                                    key={this.state.year + '/' + indice}
                                    claseCss="col-sm-12 col-md-6 col-lg-4"
                                    year={this.state.year}
                                    mes={indice}
                                    funcionClick={this.funcionClickDia}
                                    selected={this.props.datoEnEdicionDias}
                                />
                            );
                        } else {
                            return (
                                <EleCalendario
                                    key={this.state.year + '/' + indice}
                                    claseCss="col-sm-12 col-md-6 col-lg-4"
                                    year={this.props.year}
                                    mes={indice}
                                    selected={this.props.datoEnEdicionDias}
                                />
                            );
                        }
                    })}
            </div>
        );
    }
}

const estiloAñoTematizado = tema => ({
    estiloaño: {
        color: tema.palette.primary.main
    }
});

export default withStyles(estiloAñoTematizado)(withNamespaces()(CompCalendarioAnual));
