import React from "react";

import estilos from "./CompColumColorTexto.module.css";
import estilosGenericos from "../columnaGenerica/CompColumnaGenerica.module.css";

class CompColumColorTexto extends React.PureComponent {
    render() {
        let titulo = this.props.value;
        let valorColor = this.props.row[this.props.column.campo2];

        let estiloColumna = undefined;
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = estilosGenericos.modoConsulta;
        }

        return (
            <span className={estiloColumna}>
                <label className={estilos.color} style={{ color: valorColor }}>
                    {titulo}
                </label>
            </span>
        );
    }
}

export default CompColumColorTexto;
