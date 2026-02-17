import React from 'react';
import PropTypes from 'prop-types';

import estilos from './CompObs.module.css';
import estilosGenericos from '../columnaGenerica/CompColumnaGenerica.module.css';


class CompObs extends React.PureComponent {
    static propTypes = {
        obs: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.tooltipRef = React.createRef();
    }

    handleMouseMove = (e) => {
        if (this.tooltipRef.current) {
            const tooltip = this.tooltipRef.current;
            tooltip.style.left = `${e.clientX}px`;
            tooltip.style.top = `${e.clientY + 20}px`;
        }
    }

    componentDidMount() {
       
    }
    

    render() {
        let valorObs = this.props.row[this.props.column.campo2];
        let estiloColumna = estilosGenericos.columnaObs;
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = `${estilosGenericos.columnaObs} ${estilosGenericos.modoConsulta}`;
        }

        return (
            this.props.value ? (
                <div className={estilos.tooltip} onMouseMove={this.handleMouseMove}>
                    <span className={estilos.iconoExclamacion}>
                        !
                    </span>
                    <span className={estilos.tooltiptext} ref={this.tooltipRef}>
                        {valorObs ? valorObs : ""}
                    </span>
                </div>
                
            ) : <></>
        );
    }
}

export default CompObs;
