import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

class EleEntradaNumeroFormato extends React.Component {
    static propTypes = {
        inputRef: PropTypes.func.isRequired,

        /**
         * Función onChange del componente
         */
        onChange: PropTypes.func.isRequired,

        /**
         * Indica el separador que va a tener para los millares (por defecto ninguno)
         */
        separadorMillares: PropTypes.string,

        /**
         * Indica el separador que va a tener para los decimales (por defecto ninguno)
         */
        separadorDecimales: PropTypes.string,

        /**
         * Indica la cantidad máxima de decimales que puede tener
         */
        decimalesMaximos: PropTypes.number,

        /**
         * Indica si se muestran siempre los decimales indicados
         */
        decimalesFijos: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.hayCambios = false;
    }

    render() {
        let { inputRef, onChange, value, separadorMillares, separadorDecimales, decimalesMaximos, decimalesFijos, ...otros } = this.props;

        return (
            <NumberFormat
                onChangeCapture={e => {
                    this.hayCambios = true;
                }}
                {...otros}
                value={value}
                onValueChange={valores => {
                    if (this.hayCambios) {
                        this.hayCambios = false;
                        let valorNuevo = valores.floatValue;

                        if (valorNuevo === 0) {
                            valorNuevo = "0";
                        } else if (valorNuevo === undefined) {
                            valorNuevo = "";
                        }

                        onChange(valorNuevo);
                    }
                }}
                getInputRef={inputRef}
                thousandSeparator={separadorMillares}
                decimalSeparator={separadorDecimales}
                decimalScale={decimalesMaximos}
                fixedDecimalScale={decimalesFijos}
            />
        );
    }
}

export default EleEntradaNumeroFormato;
