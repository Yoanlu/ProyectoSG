import React from 'react';
import PropTypes from 'prop-types';
import estilos from './EleCalendario.module.css';
import EleInfoEmergente from '../infoEmergente/EleInfoEmergente';
import EleBarraAplicacion from '../barraAplicacion/EleBarraAplicacion';
import EleTitulo from '../titulos/EleTitulo';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@mui/styles';
import { recogerIdioma } from '../../componentes/Utilidades';

/**
 * Elemento tipo botón.
 *
 * @version 0.1
 * @author [Pablo Pérez](http://enlace.a.la.web.del.programador.com) | [pablo.perez@sandav.es](mailto:pablo.perez@sandav.es)
 */
class EleCalendario extends React.Component {
    static propTypes = {
        /**
         * Valor del mes seleccionado.
         */
        mes: PropTypes.number.isRequired,
        /**
         * Valor del año seleccionado.
         */
        year: PropTypes.number.isRequired,
        /**
         * Indioma en el que se quiere mostrar.
         */
        lng: PropTypes.string.isRequired,
        /**
         * Array de la fecha seleccionada.
         */
        selected: PropTypes.array,
        /**
         * Función que se disparará al seleccionar una fecha.
         */
        funcionClick: PropTypes.func,
        /**
         * Clase Css que aplica en el elemento.
         */
        claseCss: PropTypes.string
    };

    static defaultProps = {
        selected: []
    };

    constructor(props) {
        super(props);

        this.calendarioCreate = this.calendarioCreate.bind(this);
        this.calendario = this.calendarioCreate(this.props.year, this.props.mes);
    }

    calendarioCreate(year, mes, idioma = this.props.lng) {
        let moment = require('moment');
        idioma = recogerIdioma(idioma);

        try {
            require('moment/locale/' + idioma);
        } catch (excp) {}
        moment.locale(idioma);

        let momento = moment(new Date(year, mes, 1));
        const dias_mes = momento.daysInMonth();
        const dia_semana = momento.weekday();
        this.data = [];
        for (let indice = 0; indice < dias_mes; indice++) {
            this.data[indice] = {
                texto: indice + 1,
                fecha: new Date(Date.UTC(year, mes, indice + 1))
            };
        }
        this.nombreMes = momento.format('MMMM');
        this.diasSemana = [];
        for (let indice = 0; indice < 7; indice++) {
            this.diasSemana[indice] = moment()
                .weekday(indice)
                .format('dd');
        }
        switch (dia_semana) {
            case 0:
                this.offset = '';
                break;

            case 1:
                this.offset = estilos.offset1;
                break;

            case 2:
                this.offset = estilos.offset2;
                break;

            case 3:
                this.offset = estilos.offset3;
                break;

            case 4:
                this.offset = estilos.offset4;
                break;

            case 5:
                this.offset = estilos.offset5;
                break;
            case 6:
                this.offset = estilos.offset6;
                break;

            default:
                this.offset = '';
                break;
        }
    }

    estaSeleccionado(objeto, indice, array) {
        return +objeto.fecha === +this.fecha;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.lng !== nextProps.lng) {
            this.calendario = this.calendarioCreate(nextProps.year, nextProps.mes, nextProps.lng);
            return true;
        }

        if (
            this.props.year !== nextProps.year ||
            this.props.mes !== nextProps.mes ||
            this.props.selected !== nextProps.selected ||
            this.props.classes !== nextProps.classes
        ) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div className={this.props.claseCss}>
                <div className={estilos.contenedor}>
                    <EleBarraAplicacion denso claseCss={estilos.cabecera + ' ' + estilos.leyenda}>
                        <div className={estilos.contenedortextos}>{this.nombreMes}</div>
                    </EleBarraAplicacion>
                    {this.diasSemana.map((valor, indice) => {
                        if (valor === 'mi') {
                            return (
                                <div
                                    key={this.props.year + '/' + this.props.mes + '/' + valor}
                                    className={estilos.item}
                                >
                                    <div className={estilos.leyenda + ' ' + this.props.classes.hoy}>{'X'}</div>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={this.props.year + '/' + this.props.mes + '/' + valor}
                                    className={estilos.item}
                                >
                                    <div className={estilos.leyenda + ' ' + this.props.classes.hoy}>
                                        {valor.substr(0, 1)}
                                    </div>
                                </div>
                            );
                        }
                    })}
                    {this.data.map((valor, indice) => {
                        this.indiceSeleccionado = this.props.selected.findIndex(this.estaSeleccionado, valor);
                        if (this.props.funcionClick) {
                            this.estilodia = estilos.dia + ' ' + estilos.diaseleccionable;
                        } else {
                            this.estilodia = estilos.dia;
                        }
                        if (indice === 0) {
                            if (this.indiceSeleccionado < 0) {
                                return (
                                    <div key={valor.fecha} className={estilos.item + ' ' + this.offset}>
                                        <div
                                            onClick={this.props.funcionClick.bind(this, this.props.mes)}
                                            className={this.estilodia + ' ' + this.props.classes.estilodia}
                                        >
                                            <EleTitulo color="textPrimary" enLinea>
                                                {valor.texto}
                                            </EleTitulo>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={valor.fecha} className={estilos.item + ' ' + this.offset}>
                                        <EleInfoEmergente
                                            titulo={this.props.selected[this.indiceSeleccionado].descripcion}
                                        >
                                            <div
                                                onClick={this.props.funcionClick.bind(this, this.props.mes)}
                                                className={this.estilodia + ' ' + estilos.diaseleccionado}
                                                style={{
                                                    background: this.props.selected[this.indiceSeleccionado].color,
                                                    color: this.props.selected[this.indiceSeleccionado].colorLetra
                                                }}
                                            >
                                                {valor.texto}
                                            </div>
                                        </EleInfoEmergente>
                                    </div>
                                );
                            }
                        } else {
                            if (this.indiceSeleccionado < 0) {
                                return (
                                    <div key={valor.fecha} className={estilos.item}>
                                        <div
                                            onClick={this.props.funcionClick.bind(this, this.props.mes)}
                                            className={this.estilodia + ' ' + this.props.classes.estilodia}
                                        >
                                            <EleTitulo color="textPrimary" enLinea>
                                                {valor.texto}
                                            </EleTitulo>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={valor.fecha} className={estilos.item}>
                                        <EleInfoEmergente
                                            titulo={this.props.selected[this.indiceSeleccionado].descripcion}
                                        >
                                            <div
                                                onClick={this.props.funcionClick.bind(this, this.props.mes)}
                                                className={this.estilodia + ' ' + estilos.diaseleccionado}
                                                style={{
                                                    background: this.props.selected[this.indiceSeleccionado].color,
                                                    color: this.props.selected[this.indiceSeleccionado].colorLetra
                                                }}
                                            >
                                                {valor.texto}
                                            </div>
                                        </EleInfoEmergente>
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
            </div>
        );
    }
}

const estiloDiaTematizado = tema => ({
    hoy: {
        backgroundColor: tema.palette.primary.light,
        color: tema.palette.primary.contrastText
    }
});

export default withStyles(estiloDiaTematizado)(withNamespaces()(EleCalendario));
