import React from "react";
import PropTypes from "prop-types";

import CompDesplegable from "../../../../componentes/desplegables/CompDesplegable";
import estilos from "./CompDesplegableEditable.module.css";

class CompDesplegableEditable extends React.PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    };

    static defaultProps = {
        value: undefined
    };

    componentDidMount() {
        let valorId = this.funcionDameValorId();
        this.funcionCambio(valorId);
    }

    funcionCambio = datos => {
        this.props.onValueChange(datos || "");
    };

    funcionDameValorId = () => {
        let valor = this.props.value;
        if (valor) {
            valor = valor.toString();
        }

        let reg = this.props.column.listado.find(fila => fila.id.toString() === valor || fila.texto === valor);
        if (reg) {
            reg = reg.id;
        }

        return reg;
    };

    render() {
        let valorId = this.funcionDameValorId();

        return (
            <CompDesplegable
                className={estilos.contenedorTexto}
                tipoDesplegable="desplegable"
                datos={this.props.column.listado}
                // idSeleccionado={this.props.listado_ID || reg || this.props.value}
                idSeleccionado={valorId}
                campoClave="id"
                campoVisible="texto"
                nombre={this.props.listado_campo}
                funcionOnChange={this.funcionCambio}
                controlErrores={null}
            />
        );
    }
}

export default CompDesplegableEditable;
