import React from 'react';
import PropTypes from 'prop-types';

import estilos from './EleGuia.module.css';
import ElePanel from '../paneles/ElePanel';
import EleTitulo from '../titulos/EleTitulo';
import { withNamespaces } from 'react-i18next';

/**
 * Elemento donde se muestra un panel tipo "breadcrumbs" dinámicamente.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
const EleGuia = ({ activo, funcionOnClick, titulos, t }) => (
    <ElePanel claseCss={estilos.breadcrumps}>
        {titulos.map(
            (titulo, indice) =>
                activo >= indice && (
                    <React.Fragment key={indice}>
                        {indice > 0 && (
                            <EleTitulo enLinea color="textSecondary" tipoTitulo="subtitle1">
                                {' / '}
                            </EleTitulo>
                        )}
                        <EleTitulo
                            enLinea
                            color={activo === indice ? 'textSecondary' : 'primary'}
                            claseCss={activo === indice ? estilos.activo : estilos.breadcrump}
                            funcionOnClick={funcionOnClick.bind(this, indice)}
                            tipoTitulo="subtitle1"
                        >
                            {t(titulo)}
                        </EleTitulo>
                    </React.Fragment>
                )
        )}
    </ElePanel>
);

EleGuia.propTypes = {
    /**
     * Índice del array del nivel activo.
     */
    activo: PropTypes.number.isRequired,
    /**
     * Array con todos los índices que se muestran.
     */
    titulos: PropTypes.array.isRequired,
    /**
     * Función que se ejecuta al hacer click sobre un enlace/nivel.
     */
    funcionOnClick: PropTypes.func.isRequired,
    /**
     * Funcion I18n que muestra el un texto segun el idioma seleccionado
     * @param {string} key - clave del texto a traducir
     */
    t: PropTypes.func.isRequired
};

export default withNamespaces()(EleGuia);
