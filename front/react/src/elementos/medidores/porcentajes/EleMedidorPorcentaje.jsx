import React from 'react';
import PropTypes from 'prop-types';

import estilos from './EleMedidorPorcentaje.module.css';

/**
 * Elemento que permite la representación gráfica de niveles.
 *
 * @version 0.1
 * @author [Sara García] <sara.garcia@sandav.es>
 */
const EleMedidorPorcentaje = ({ nivel=0 }) => {
    return (
        <div className={estilos.contenedorMedidor}>
            <div
                className={estilos.nivel1a}
                style={{ visibility: nivel >= 1 ? 'visible' : 'hidden' }}
            />
            <div
                className={estilos.nivel1b}
                style={{ visibility: nivel >= 1 ? 'visible' : 'hidden' }}
            />
            <div
                className={estilos.nivel2a}
                style={{ visibility: nivel >= 2 ? 'visible' : 'hidden' }}
            />
            <div
                className={estilos.nivel2b}
                style={{ visibility: nivel >= 2 ? 'visible' : 'hidden' }}
            />
            <div
                className={estilos.nivel3a}
                style={{ visibility: nivel >= 3 ? 'visible' : 'hidden' }}
            />
            <div
                className={estilos.nivel3b}
                style={{ visibility: nivel >= 3 ? 'visible' : 'hidden' }}
            />
            <div
                className={estilos.nivel4a}
                style={{ visibility: nivel >= 4 ? 'visible' : 'hidden' }}
            />
            <div
                className={estilos.nivel4b}
                style={{ visibility: nivel >= 4 ? 'visible' : 'hidden' }}
            />
        </div>
    );
};

EleMedidorPorcentaje.propTypes = {
    /**
     * Especifica del 0 al 4 el nivel.
     */
    nivel: PropTypes.number
};

export default EleMedidorPorcentaje;
