import React from "react";
import estilos from "./CompCRUDTabla.module.css";
import EleBotonImagen from "../../../elementos/botones/EleBotonImagen";

class CompTablaFila extends React.PureComponent {
    constructor(props) {
        super(props);

        if (props.id === "add") {
            this.icono = "add_circle_outline";
        } else if (props.id === "edit") {
            this.icono = "edit";
        } else if (props.id === "delete") {
            this.icono = "delete";
        } else if (props.id === "commit") {
            this.icono = "save";
        } else if (props.id === "cancel") {
            this.icono = "block";
        }
    }

    render() {
        return (
            <div className={estilos.contenedorBotonColumna + " " + (this.modoSinSeleccion === true ? estilos.sinSeleccion : "")}>
                <EleBotonImagen
                    desactivarOndas={true}
                    // desactivado={this.props.desactivado}
                    funcionOnClick={this.props.onExecute}
                    icono={this.icono}
                    primario
                    // tooltip={this.props.t('add')}
                />
            </div>
        );
    }
}

export default CompTablaFila;
