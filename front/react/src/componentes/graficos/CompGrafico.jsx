import React from 'react';
import PropTypes from 'prop-types';

import Componente from '../Componente';
import EleGraficoLineal from '../../elementos/graficos/EleGraficoLineal';
import EleGraficoTarta from '../../elementos/graficos/EleGraficoTarta';

class CompGrafico extends Componente {
    static propTypes = {
        /**
         * Diccionario con los datos a mostrar
         */
        diccionarioDatos: PropTypes.array.isRequired,

        /**
         * Tipo de gráfico
         */
        tipo: PropTypes.oneOf(['lineal', 'tarta']).isRequired,

        /**
         * Tamaño que va a ocupar el gráfico a lo ancho
         */
        ancho: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

        /**
         * Tamaño que va a ocupar el gráfico a lo alto
         */
        alto: PropTypes.number,

        /**
         * Indica si el gráfico lineal utiliza líneas curvas o rectas
         */
        lineasCurvas: PropTypes.bool,

        /**
         * Indica si se separan los trozos de la tarta al hacer click.
         */
        separacionTartaClick: PropTypes.bool
    };

    static defaultProps = {
        separacionTartaClick: false
    };

    constructor(props) {
        super(props);

        this.state = {
            separacion: {}
        };

        this.ultimoSeleccionado = null;

        this.eventosGrafico = [
            {
                eventName: 'select',
                callback: this.graficoSeleccion
            }
        ];
    }

    graficoSeleccion = todo => {
        const chartWrapper = todo.chartWrapper;

        const chart = chartWrapper.getChart();
        const selection = chart.getSelection();
        if (selection.length === 1) {
            const [seleccionado] = selection;
            let nuevaSeparacion;
            if (this.ultimoSeleccionado === seleccionado.row) {
                nuevaSeparacion = {};
                this.ultimoSeleccionado = null;
            } else {
                this.ultimoSeleccionado = seleccionado.row;
                nuevaSeparacion = {
                    [seleccionado.row]: { offset: 0.1 }
                };
            }
            this.setState({
                separacion: nuevaSeparacion
            });
        }
    };

    render() {
        let grafico;

        switch (this.props.tipo) {
            case 'lineal':
                grafico = (
                    <EleGraficoLineal
                        lineasCurvas={this.props.lineasCurvas}
                        // diccionarioDatos={diccionarioDatos}
                        diccionarioDatos={this.props.diccionarioDatos}
                        cabecera={this.props.cabecera}
                        tituloX={this.props.tituloX}
                        tituloY={this.props.tituloY}
                        ancho={this.props.ancho}
                        alto={this.props.alto}
                    />
                );
                break;

            case 'tarta':
                grafico = (
                    <EleGraficoTarta
                        umbralDeCorte={this.props.umbralDeCorte}
                        separacion={this.state.separacion}
                        eventosGrafico={this.props.separacionTartaClick ? this.eventosGrafico : undefined}
                        cabecera={this.props.cabecera}
                        diccionarioDatos={this.props.diccionarioDatos}
                        es3d={this.props.es3d}
                        ancho={this.props.ancho}
                        alto={this.props.alto}
                        titulo={this.props.titulo}
                    />
                );
                break;

            default:
                grafico = <div>Error</div>;
                break;
        }

        return grafico;
    }
}

export default CompGrafico;
