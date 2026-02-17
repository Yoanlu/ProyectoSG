import React from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import estilos from './EleMenuEmergente.module.css';

/**
 * Elemento emergente(PopUp).
 *
 * @version 0.1
 * @author [Sara García] <sara.garcia@sandav.es>
 */
const EleMenuEmergente = ({
    identificador,
    visible=true,
    claseCss,
    ancla,
    alineacionAncla,
    alineacionContenido,
    funcionCerrar=() => {
        return;
    },
    funcionClickFuera=() => {
        return;
    },
    children
}) => (
    <Popover
        id={identificador}
        open={visible}
        anchorEl={ancla}
        anchorOrigin={alineacionAncla}
        transformOrigin={alineacionContenido}
        className={estilos.menuEmergente + ' ' + claseCss}
        onClose={funcionCerrar}
    >
        <ClickAwayListener onClickAway={funcionClickFuera}>{children}</ClickAwayListener>
    </Popover>
);

EleMenuEmergente.propTypes = {
    /**
     * Identificador del elemento
     */
    identificador: PropTypes.string,
    /**
     * Controla la visibilidad del elemento
     */
    visible: PropTypes.bool,
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Componente del cual va a emerger el elemento.
     */
    ancla: PropTypes.object,
    /**
     * Posicion del componente del cual va a emerger el elemento.
     */
    alineacionAncla: PropTypes.object,
    /**
     * Especifica el punto de pivote de la elemento emergente.
     */
    alineacionContenido: PropTypes.object,
    /**
     * Función que se disparará  después de que termine de cerrar el elemento.
     */
    funcionCerrar: PropTypes.func,
    /**
     * Función que se disparará cuando haces click fuera del elemento.
     */
    funcionClickFuera: PropTypes.func,
    /**
     * Objeto contenido dentro del elemento emergente.
     */
    children: PropTypes.object.isRequired
};

export default EleMenuEmergente;
