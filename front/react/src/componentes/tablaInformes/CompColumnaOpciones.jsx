import React from "react";

import EleIcono from "../../elementos/iconos/EleIcono";

import estilos from "./CompColumna.module.css";

const CompColumnaOpciones = (infoColumna, cellData) => {
    const datosFila = cellData.data;
    const valorCampoFila = datosFila[infoColumna.campo];
    
    let icono = "";
    if (valorCampoFila === true) {
        icono = "check";
    } else if (valorCampoFila === false) {
        icono = "close";
    }

    return (
        <div className={estilos.contenedorOpciones}>
            <EleIcono color="primary" icono={icono} />
        </div>
    );
};

export default CompColumnaOpciones;
