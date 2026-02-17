import React from "react";
import { Checkbox, TableCell } from "@mui/material";
import { TableSelection } from "@devexpress/dx-react-grid-material-ui";

import estilos from "./EleColumnaSeleccion.module.css";

class EleColumnaSeleccion extends React.PureComponent {
    render() {
        return (
            <TableSelection.Cell
                row={this.props.row}
                onToggle={this.props.onToggle}
                selected={this.props.selected}
                className={estilos.columnaInterruptor}
                colSpan={this.props.colSpan}
                rowSpan={this.props.rowSpan}
            />
        );
    }
}

class EleColumnaSeleccionCabecera extends React.PureComponent {
    funcionSeleccion = (evento, boleano) => {
        evento.stopPropagation();
        this.props.onToggle(boleano);
    };

    render() {
        return (
            <TableCell
                row={this.props.row}
                onToggle={this.props.onToggle}
                selected={this.props.selected}
                className={estilos.columnaInterruptorCabecera}
                colSpan={this.props.colSpan}
                rowSpan={this.props.rowSpan}
            >
                <Checkbox
                    color="primary"
                    disabled={this.props.disabled}
                    checked={this.props.allSelected || this.props.someSelected}
                    indeterminate={this.props.someSelected && !this.props.allSelected}
                    onClick={this.funcionSeleccion}
                />
            </TableCell>
        );
    }
}

export { EleColumnaSeleccion, EleColumnaSeleccionCabecera };
