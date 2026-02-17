import React from 'react';
import PropTypes from 'prop-types';

import estilos from './CompColumnaOpcionesEditable.module.css';
import { Checkbox } from '@mui/material';

class CompColumnaOpcionesEditable extends React.PureComponent {
    static propTypes = {
        value: PropTypes.bool
    };

    static defaultProps = {
        value: undefined
    };

    funcionCambio = (evento, boleano) => {
        evento.stopPropagation();
        this.props.onValueChange(boleano);
    };

    render() {
        return (
            <div className={estilos.contenedorIcono}>
                <Checkbox
                    autoFocus={this.props.autoFocus}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    onKeyDown={this.props.onKeyDown}
                    onChange={this.funcionCambio}
                    checked={this.props.value}
                    disabled={!this.props.editingEnabled}
                    color="primary"
                />
            </div>
        );
    }
}

export default CompColumnaOpcionesEditable;
