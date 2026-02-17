import React from 'react';
import PropTypes from 'prop-types';
import estilos from './EleIcono.module.css';
import Icon from '@mui/material/Icon';
import { Tooltip } from '@mui/material';

/**
 * Elemento que permite el mostrar un icono.
 *
 * @version 0.1
 * @author [Sara García](http://enlace.a.la.web.del.programador.com) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
const EleIcono = ({ icono='', tooltip='', color=undefined, claseCss='', fuente }) => (
    <Tooltip title={tooltip?tooltip:''}>
    <Icon color={color} className={claseCss + ' ' + estilos.eleicono} fontSize={fuente}>
        {icono}
    </Icon>
    </Tooltip>
);

EleIcono.propTypes = {
    /**
     * Nombre correspondiente al tooltip a mostrar
     */
     tooltip: PropTypes.string,


    /**
     * Nombre correspondiente al icono a mostrar
     */
    icono: PropTypes.any,
 
    /**
     * Color del icono
     */
    color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'info', 'action', 'error', 'disabled']),

    /**
     * Estilos que aplican en el elemento
     */
    claseCss: PropTypes.string,

    /**
     * Tamaño de la fuente
     */
    fuente: PropTypes.oneOf(['inherit', 'default', 'small', 'large'])
};

export default EleIcono;
