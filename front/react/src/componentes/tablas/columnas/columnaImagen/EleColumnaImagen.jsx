import React from "react";
import estilos from "./EleColumnaImagen.module.css";

class EleColumnaImagen extends React.PureComponent {
    render() {
        return (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={this.props.row[this.props.column.campoEnlace] ? this.props.row[this.props.column.campoEnlace] : this.props.value}
            >
                <img className={estilos.imagen} src={this.props.value} alt={this.props.value} />
            </a>
        );
    }
}

export default EleColumnaImagen;
