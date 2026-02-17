import React from "react";
import CompTablaFila from "./CompTablaFila";

class CompTablaFilaSinSeleccion extends CompTablaFila {
    constructor(props) {
        super(props);

        this.modoSinSeleccion = true;
    }
}

export default CompTablaFilaSinSeleccion;
