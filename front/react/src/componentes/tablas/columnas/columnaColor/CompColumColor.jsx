import React from 'react';
import PropTypes from 'prop-types';

import estilos from './CompColumColor.module.css';
import estilosGenericos from '../columnaGenerica/CompColumnaGenerica.module.css';


class CompColumColor extends React.PureComponent {
    static propTypes = {
        color: PropTypes.string
    };

    static defaultProps = {
        color: undefined
    };

    render() {
        let color = this.props.value;

        let estiloColumna = undefined;
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = estilosGenericos.modoConsulta;
        }

        return (
            <span className={estiloColumna}>
                <label>{color}</label>
                <div className={estilos.color} style={{ backgroundColor: color }} />
            </span>
        );
    }
}

export default CompColumColor;
