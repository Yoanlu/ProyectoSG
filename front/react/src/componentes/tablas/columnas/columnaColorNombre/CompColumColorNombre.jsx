import React from "react";

import estilos from "./CompColumColorNombre.module.css";
import estilosGenericos from "../columnaGenerica/CompColumnaGenerica.module.css";

class CompColumColorNombre extends React.PureComponent {
    render() {
        let titulo = this.props.value;
        let valorColor = this.props.row[this.props.column.campo2];

        let estiloColumna = undefined;
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = estilosGenericos.modoConsulta;
        }

        return (
            <span className={estiloColumna}>
                <label>{titulo}</label>
                <div
                    className={estilos.color}
                    style={{ backgroundColor: valorColor }}
                />
            </span>
        );
    }
}

export default CompColumColorNombre;
