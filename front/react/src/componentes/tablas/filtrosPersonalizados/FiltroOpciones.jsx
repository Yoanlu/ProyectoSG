import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';

import estilos from "./Filtros.module.css";
import { Checkbox } from '@mui/material';

/**
 * Componente que permite el crear una celda de filtrado personalizada.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class FiltroOpciones extends React.PureComponent {
    static propTypes = {
        /**
         * Objeto a filtrar
         */
        filter: PropTypes.object,
        /**
         * Función de filtrado.
         */
        onFilter: PropTypes.func
    };

    static defaultProps = {
        filter: {}
    };

    cambiaValor = (evento, valor) => {
        if (this.props.filter.value === false && valor === true) {
            valor = '';
        }

        this.props.onFilter({ value: valor });
    };

    render() {
        return (
            <TableCell className={estilos.filtroOpcion}>
                <Checkbox
                    color="primary"
                    checked={this.props.filter.value || false}
                    indeterminate={
                        this.props.filter.value === '' ||
                        this.props.filter.value === null ||
                        this.props.filter.value === undefined
                    }
                    onChange={this.cambiaValor}
                />
            </TableCell>
        );
    }
}

export default FiltroOpciones;
