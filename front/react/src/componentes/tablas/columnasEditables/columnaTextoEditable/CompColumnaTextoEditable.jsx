import React from 'react';
import PropTypes from 'prop-types';

import estilos from './CompColumnaTextoEditable.module.css';
import { TextField } from '@mui/material';

class CompColumnaTextoEditable extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string
    };

    static defaultProps = {
        value: undefined
    };

    funcionCambio = (evento) => {
        this.props.onValueChange(evento.target.value);
    };

    render() {

        return (
            <TextField
                type="text"
                className={estilos.contenedorTexto}
                autoFocus={this.props.autoFocus}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.props.onKeyDown}
                onChange={this.funcionCambio}
                value={this.props.value || ""}
                disabled={!this.props.editingEnabled}
                // label=""
                // helperText=""
            />
        );
    }
}

export default CompColumnaTextoEditable;
