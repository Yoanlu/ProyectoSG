import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
/**
 * Elemento informativo emergente que permite visualizar pequeñas descripciones.
 *
 * @version 0.1
 * @author [Sara García] <sara.garcia@sandav.es>
 */
const EleInfoEmergente = ({
    titulo,
    colocacion='bottom',
    desactivarConFoco=false,
    desactivarConHover=false,
    deactivarconPulsacion=false,
    children
}) => (
    <Tooltip
        title={titulo}
        placement={colocacion}
        disableFocusListener={desactivarConFoco}
        disableHoverListener={desactivarConHover}
        disableTouchListener={deactivarconPulsacion}
        TransitionComponent={Zoom}
    >
        {children}
    </Tooltip>
);

EleInfoEmergente.propTypes = {
    /**
     * Contenido en la Información
     */
    titulo: PropTypes.string.isRequired,

    /**
     * Colocación de la información
     */
    colocacion: PropTypes.oneOf([
        'bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top'
    ]),

    /**
     * Impedir que se muestre con el foco
     */
    desactivarConFoco: PropTypes.bool,

    /**
     * Impedir que se muestre con el hover
     */
    desactivarConHover: PropTypes.bool,

    /**
     * Impedir que se muestre con pulsación prolongada
     */
    deactivarconPulsacion: PropTypes.bool,
    /*
     * Contenido del elemento.
     */
    children: PropTypes.any.isRequired
};

export default EleInfoEmergente;
