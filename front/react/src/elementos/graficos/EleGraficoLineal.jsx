import React from 'react';
import PropTypes from 'prop-types';

import Chart from 'react-google-charts';
import { LinearProgress } from '@mui/material';

const EleGraficoLineal = ({ ancho, alto, tituloX, tituloY, diccionarioDatos, cabecera, lineasCurvas=false, animaciones=true }) => {
    let opciones = {
        hAxis: {
            title: tituloX
        },
        vAxis: {
            title: tituloY
        }
    };

    if (lineasCurvas) {
        opciones.curveType = 'function';
    }

    if (animaciones) {
        opciones.animation = {
            startup: true,
            easing: 'ease-out',
            duration: 500
        };
    }

    let datos = [['entidad', ...cabecera], ...diccionarioDatos];

    return (
        <Chart
            width={ancho}
            height={alto}
            chartType="LineChart"
            // chartType="Line" // Material Design
            loader={<LinearProgress />}
            data={datos}
            options={opciones}
            // rootProps={{ 'data-testid': '1' }}
        />
    );
};

EleGraficoLineal.propTypes = {
    /**
     * Tamaño que va a ocupar el gráfico a lo ancho
     */
    ancho: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Tamaño que va a ocupar el gráfico a lo alto
     */
    alto: PropTypes.number,

    /**
     * Título horizontal
     */
    tituloX: PropTypes.string,

    /**
     * Título vertical
     */
    tituloY: PropTypes.string,

    /**
     * Indica si el gráfico utiliza líneas curvas o rectas
     */
    lineasCurvas: PropTypes.bool,

    /**
     * Indica si el gráfico tiene animaciones
     */
    animaciones: PropTypes.bool
};

export default EleGraficoLineal;
