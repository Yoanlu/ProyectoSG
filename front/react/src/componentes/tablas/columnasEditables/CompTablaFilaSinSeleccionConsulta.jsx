import React from "react";
import CompTablaFilaConsulta from "./CompTablaFilaConsulta";

class CompTablaFilaSinSeleccionConsulta extends CompTablaFilaConsulta {
    constructor(props) {
        super(props);

        this.modoSinSeleccion = true;
    }
}

export default CompTablaFilaSinSeleccionConsulta;
