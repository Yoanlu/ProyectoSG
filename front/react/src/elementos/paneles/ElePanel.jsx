import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@mui/material';

/**
 * Elemento panel
 *
 * @version 0.1
 * @author [Mario Cantelar] <mario.cantelar@sandav.es>
 */
const ElePanel = ({ elevacion=5, cuadrado=false, claseCss, children }) => {
    return (
        <Paper elevation={elevacion} square={cuadrado} data-testid="prueba-elepanel" className={claseCss}>
            {children}
        </Paper>
    );
};

ElePanel.propTypes = {
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Objeto contenido en el elemento.
     */
    children: PropTypes.node
};

export default ElePanel;
