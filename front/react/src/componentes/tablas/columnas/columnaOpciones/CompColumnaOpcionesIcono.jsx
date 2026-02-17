import React from 'react';
import PropTypes from 'prop-types';

import estilos from './CompColumnaOpcionesIcono.module.css';
import EleIcono from '../../../../elementos/iconos/EleIcono';

class CompColumnaOpcionesIcono extends React.PureComponent {
    static propTypes = {
        value: PropTypes.bool
    };

    static defaultProps = {
        value: undefined
    };

    render() {
        let icono = '';

        if (this.props.value === true) {
            if (this.props.column && this.props.column.iconoTrue) {
                icono = this.props.column.iconoTrue;
            } else {
                icono = 'check';
            }
        } else if (this.props.value === false) {
            if (this.props.column && this.props.column.iconoFalse) {
                icono = this.props.column.iconoFalse;
            } else {
                icono = 'close';
            }
        }

        return (
            <div className={estilos.contenedorIcono}>
                <EleIcono color="primary" icono={icono} />
            </div>
        );
    }
}

export default CompColumnaOpcionesIcono;
