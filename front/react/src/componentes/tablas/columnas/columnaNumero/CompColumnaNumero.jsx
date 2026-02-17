import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { withNamespaces } from "react-i18next";
import { formatearNumero, recogerIdioma } from "../../../Utilidades";

import estilosGenericos from "../columnaGenerica/CompColumnaGenerica.module.css";

class CompColumnaNumero extends React.PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    static defaultProps = {
        value: undefined
    };

    render() {
        let numero = formatearNumero(this.props.value, undefined, 2);

        let estiloColumna = undefined;
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = estilosGenericos.modoConsulta;
        }

        return (
            <span className={estilosGenericos.contenedorNumero + " " + estiloColumna}>
                {numero}
                {/* <NumberFormat
                    value={numero}
                    displayType="text"
                    thousandSeparator={recogerIdioma(this.props.lng) === "en" ? "," : "."}
                    decimalSeparator={recogerIdioma(this.props.lng) === "en" ? "." : ","}
                /> */}
            </span>
        );
    }
}

export default withNamespaces()(CompColumnaNumero);
