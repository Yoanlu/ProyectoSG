import React from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

import { recogerIdioma } from "../../../Utilidades";

import estilosGenericos from "../columnaGenerica/CompColumnaGenerica.module.css";

class CompColumnaFechaGenerico extends React.PureComponent {
    static propTypes = {
        value: PropTypes.string
    };

    static defaultProps = {
        value: undefined
    };

    constructor(props) {
        super(props);

        this.formatoMoment = "L";
        this.moment = moment;
    }

    render() {
        // let idioma = recogerIdioma(this.props.lng);
        // this.moment.locale(idioma);
        this.moment.locale(this.props.lng);

        let fechaFormateada = null;
        if (this.props.value) {
            let fecha = this.moment(this.props.value);

            let valor = fecha;
            if (!fecha.isValid()) {
                let hora = this.moment(this.props.value, "HH:mm:ss");
                if (hora.isValid()) {
                    valor = hora;
                }
            }

            fechaFormateada = valor.format(this.formatoMoment);
        }

        let estiloColumna = undefined;
        if (this.props.row && this.props.row.modoConsulta === true) {
            estiloColumna = estilosGenericos.modoConsulta;
        }

        return <span className={estiloColumna}>{fechaFormateada}</span>;
    }
}

export default CompColumnaFechaGenerico;
