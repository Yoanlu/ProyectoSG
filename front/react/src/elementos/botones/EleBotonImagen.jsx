import React from 'react';
import PropTypes from 'prop-types';
import EleIcono from '../iconos/EleIcono';
import { IconButton, Tooltip } from '@mui/material';
import { withTheme } from "@mui/styles";
import estilosCss from './EleBotonImagen.module.css';

/**
 * Elemento botón con imagen.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
const EleBotonImagen = ({
    referencia,
    claseCss,
    icono='',
    claseIcono='',
    colorIcono,
    tooltip,
    fuente='medium',
    desactivarOndas=false,
    estilos,
    placement, //'bottom-end'| 'bottom-start'| 'bottom'| 'left-end'| 'left-start'| 'left'| 'right-end'| 'right-start'| 'right'| 'top-end'| 'top-start'| 'top'
    desactivado=false,
    primario=undefined,
    funcionOnClick,
    funcionOnClickAux,
    funcionOnClickRueda,
    funcionOnHover,
    theme
}) => {
    let color = 'inherit';
    if (primario === true) {
        color = 'primary';
    } else if (primario === false) {
        color = 'secondary';
    }

    let claseSombra = estilosCss.sombraBoton;
    if (desactivado) {
        claseSombra = estilosCss.sombraBotonDesactivado;
    }

    let iconoBoton = (
        <IconButton
            ref={referencia}
            disabled={desactivado}
            className={claseCss + ' ' + claseSombra}
            color={color}
            size={fuente}
            disableRipple={desactivarOndas}
            onClick={funcionOnClick}
            onMouseDown={(evento) => {
                if (funcionOnClickAux && evento.button === 2) {
                    funcionOnClickAux(evento);
                } else if (funcionOnClickRueda && evento.button === 1) {
                    funcionOnClickRueda(evento);
                }
            }}
            onMouseOver={funcionOnHover}
            data-testid="Elemento_BotonImagen"
        >
            <EleIcono
                color={desactivado ? 'disabled' : colorIcono}
                icono={icono}
                claseCss={claseIcono + ' ' + (fuente === 'small' ? estilosCss.smallIcon : '')}
            />
        </IconButton>
    );

    return tooltip ? (
        <Tooltip title={tooltip} placement={placement ? placement : 'bottom'} enterDelay={250}>
            <span>{iconoBoton}</span>
        </Tooltip>
    ) : (
        iconoBoton
    );
};

EleBotonImagen.propTypes = {
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Define el nombre del icono selecionado para visualizar en el elemento.
     */
    icono: PropTypes.any,
    /**
     * Define el tamaño del componente.
     */
    fuente: PropTypes.string,
    /**
     * Establece si tiene o no el efecto Ripple.
     */
    desactivarOndas: PropTypes.bool,
    /**
     * Clase CSS que aplica en el icono seleccionado para el elemento.
     */
    claseIcono: PropTypes.string,
    /**
     * Establece el color del icono.
     */
    colorIcono: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'info', 'action', 'error', 'disabled']),
    /**
     * Establece los estilos directos sobre el elemento.
     */
    estilos: PropTypes.object,
    /**
     * Opción de habilitar o deshabilitar el elemento.
     */
    desactivado: PropTypes.bool,
    /**
     * Agrega un peso visual al elemento y lo hace primario.
     */
    primario: PropTypes.bool,
    /**
     * Función que se dispara cuando se hace click en el elemento.
     */
    funcionOnClick: PropTypes.func,
    /**
     * Función que se dispara cuando se hace click secundario en el elemento.
     */
    funcionOnClickAux: PropTypes.func,
    /**
     * Función que se dispara cuando se hace click de la rueda del ratón en el elemento.
     */
    funcionOnClickRueda: PropTypes.func,
    /**
     * Función que se dispara el ratón está sobre el elemento.
     */
    funcionOnHover: PropTypes.func
};

export default withTheme(EleBotonImagen);
