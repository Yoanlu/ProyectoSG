import React from 'react';
import EleIcono from '../../../../elementos/iconos/EleIcono';

import estilos from './EleColumnaIcono.module.css';
import estilosGenericos from '../columnaGenerica/CompColumnaGenerica.module.css';

class EleColumnaIcono extends React.PureComponent {
    render() {
        let estiloColumna = undefined;
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = estilosGenericos.modoConsulta;
        }

        return (
            <div className={estilos.contenedorIcono + ' ' + estiloColumna}>
                <EleIcono icono={this.props.value} />
            </div>
        );
    }
}

export default EleColumnaIcono;
