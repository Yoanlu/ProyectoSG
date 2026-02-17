import { TableCell } from "@mui/material";

import React from "react";
import EleBotonImagen from "../../../elementos/botones/EleBotonImagen";
import CompColumnaGenerica from "../columnas/columnaGenerica/CompColumnaGenerica";
import CompColumnaOpcionesEditable from "./columnaOpcionesEditables/CompColumnaOpcionesEditable";
import CompColumnaTextoEditable from "./columnaTextoEditable/CompColumnaTextoEditable";
import CompDesplegableEditable from "./columnaDesplegableEditable/CompDesplegableEditable";
import estilos from "./CompCRUDTabla.module.css";

class CompCRUDTablaFila extends React.PureComponent {
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
            <EleBotonImagen
                desactivarOndas={true}
                // desactivado={this.props.desactivado}
                funcionOnClick={this.props.onExecute}
                icono={this.icono}
                primario
                // tooltip={this.props.t('add')}
            />
        );
    }
}

class CompCRUDFilaEditable extends React.PureComponent {
    constructor(props) {
        super(props);

        let tipoColumna = this.props.column.tipo;
        this.objetoColumna = CompColumnaGenerica;

        if (this.props.editingEnabled) {
            switch (tipoColumna) {
                case "listado":
                    this.objetoColumna = CompDesplegableEditable;
                    break;
                case "opciones":
                    this.objetoColumna = CompColumnaOpcionesEditable;
                    break;
                case undefined:
                    this.objetoColumna = CompColumnaTextoEditable;
                    break;
                default:
                    this.objetoColumna = CompColumnaGenerica;
                    break;
            }
        }
    }

    render() {
        // this.props.autofocus
        // this.props.editingEnabled
        // this.props.onValueChange
        // this.props.onBlur
        // this.props.onFocus
        // this.props.onKeyDown
        // this.props.value

        return (
            <TableCell
                // className={estilos.columnaInterruptor}
                colSpan={this.props.colSpan}
                rowSpan={this.props.rowSpan}
            >
                <this.objetoColumna {...this.props} />
            </TableCell>
        );
    }
}

class CompCRUDTablaColumna extends React.PureComponent {
    render() {
        return (
            <TableCell className={estilos.columnaBotones} colSpan={this.props.colSpan}>
                {this.props.children}
            </TableCell>
        );
    }
}

export { CompCRUDTablaFila, CompCRUDFilaEditable, CompCRUDTablaColumna };
