import React from 'react';
import PropTypes from 'prop-types';

import Chart from 'react-google-charts';
import { LinearProgress } from '@mui/material';

const EleGraficoTarta = ({ diccionarioDatos, separacion, ancho, alto, titulo, es3d=false, eventosGrafico, umbralDeCorte=0, t }) => {
    let opciones = {
        title: titulo,
        pieHole: 0.4,
        is3D: es3d,
        sliceVisibilityThreshold: umbralDeCorte,

        tooltip: {
            showColorCode: true
        },

        slices: separacion,

        chartArea: {
            top: 50,
            bottom: 25,
            left: 25,
            right: 5,
            width: '100%', // No es necesario al tener posición
            height: '100%' // No es necesario al tener posición
        }
    };

    let estructuraDatos = [['fila', 'datos']];

    return (
        <Chart
            width={ancho}
            height={alto}
            chartType="PieChart"
            loader={<LinearProgress />}
            data={[...estructuraDatos, ...diccionarioDatos]}
            options={opciones}
            chartEvents={eventosGrafico}
        />
    );
};

EleGraficoTarta.propTypes = {
    /**
     * Diccionario con los datos a mostrar
     */
    diccionarioDatos: PropTypes.array.isRequired,

    /**
     * Tamaño que va a ocupar el gráfico a lo ancho
     */
    ancho: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Tamaño que va a ocupar el gráfico a lo alto
     */
    alto: PropTypes.number,

    /**
     * El título del gráfico que se va a mostrar
     */
    titulo: PropTypes.string,

    /**
     * Indica si el gráfico es 2D o 3D
     */
    es3d: PropTypes.bool,

    /**
     * Umbral de corte (de 0 a 1), indica que porcentaje mínimo debe tener para salir.
     */
    umbralDeCorte: PropTypes.number
};

export default EleGraficoTarta;
