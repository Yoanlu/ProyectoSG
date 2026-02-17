import React from 'react';
import PropTypes from 'prop-types';

import estilos from './EleColumnaOrden.module.css';
import EleIcono from '../../../../elementos/iconos/EleIcono';

const OrdenContexto = React.createContext([]);

/**
 * Componente básico de flecha de orden de columna para un grid (EleTabla).
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class EleColumnaOrden extends React.PureComponent {
    static contextType = OrdenContexto;

    static propTypes = {
        /**
         * Función que se lanza al hacer click para cambiar el orden.
         */
        onSort: PropTypes.func.isRequired,

        /**
         * Elemento de Material con el texto de la columna.
         */
        children: PropTypes.object.isRequired,

        /**
         * Dirección del orden de la columna.
         */
        direction: PropTypes.oneOf(['asc', 'desc']),

        /**
         * Objecto con el nombre y el título de la columna.
         */
        column: PropTypes.object.isRequired
    };

    render() {
        let clase = '';
        let numeroFila = '';

        if (this.props.direction) {
            const ordenFilas = this.context;
            const nombreColumna = this.props.column.name;
            const indice = ordenFilas.findIndex(fila => fila.columnName === nombreColumna);
            if (indice >= 0 && ordenFilas.length > 1) {
                numeroFila = indice + 1;
            }

            if (this.props.direction === 'asc') {
                clase = estilos.ascendente;
            } else if (this.props.direction === 'desc') {
                clase = estilos.descendente;
            }
        }

        return (
            <div className={estilos.columna} onClick={this.props.onSort}>
                {this.props.children}
                <span className={estilos.contenedorFlecha}>
                    <EleIcono claseCss={estilos.flecha + ' ' + clase} icono="arrow_upward" />
                    {numeroFila}
                </span>
            </div>
        );
    }
}

export { OrdenContexto };
export default EleColumnaOrden;
