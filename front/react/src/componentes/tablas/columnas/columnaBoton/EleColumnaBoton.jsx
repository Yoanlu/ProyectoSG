import React from "react";
import { withNamespaces } from "react-i18next";

import EleBotonImagen from "../../../../elementos/botones/EleBotonImagen";
import estilos from "./EleColumnaBoton.module.css";

class EleColumnaBoton extends React.PureComponent {
    funcionOnClick = evento => {
        evento.stopPropagation();
        this.props.column.function(this.props.row, this.props.value);
    };

    render() {
        let hayfilas = this.props.row === undefined ? false : true;
        return (
            <span className={estilos.contenedorColumna}>
                <span className={estilos.contenidoColumna}>
                    <EleBotonImagen
                        primario
                        fuente="small"
                        claseCss={estilos.botonColumna}
                        icono={this.props.column.icono ? this.props.column.icono : this.props.value ? "visibility" : "control_point"}
                        tooltip={this.props.column.tooltip ? this.props.t(this.props.column.tooltip) : this.props.value ? this.props.t("view") : this.props.t("expand")}
                        placement="right-start"
                        funcionOnClick={this.funcionOnClick}
                        desactivado={
                            this.props.column.evitarDesactivado
                                ? false
                                : hayfilas
                                ? !this.props.row[this.props.column.name] || String(this.props.row[this.props.column.name]).trim() === ""
                                : isNaN(this.props.value) || String(this.props.value).trim() === ""
                                ? true
                                : this.props.value === null
                                ? true
                                : false
                        }
                    />

                    {this.props.value}
                </span>
            </span>
        );
    }
}

export default withNamespaces()(EleColumnaBoton);
