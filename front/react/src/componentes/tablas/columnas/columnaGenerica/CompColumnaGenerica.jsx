import React from "react";

import { withNamespaces } from "react-i18next";

import estilosGenericos from "./CompColumnaGenerica.module.css";

class CompColumnaGenerica extends React.PureComponent {
    render() {
        let estiloColumna = "";
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = estilosGenericos.modoConsulta;
        }

        if (typeof this.props.value === "string" && this.props.value.includes("\r\n")) {
            estiloColumna += " " + estilosGenericos.saltosDeLinea;
        }

        return <span className={estiloColumna + " " + estilosGenericos.filaSpan}>{this.props.value}</span>;
    }
}

export default withNamespaces()(CompColumnaGenerica);
