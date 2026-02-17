import React from "react";
import CompTablaFila from "./CompTablaFila";

class CompTablaFilaConsulta extends CompTablaFila {
    constructor(props) {
        super(props);

       if (props.id === "edit") {
            this.icono = "visibility";
        }

    }

}

export default CompTablaFilaConsulta;
