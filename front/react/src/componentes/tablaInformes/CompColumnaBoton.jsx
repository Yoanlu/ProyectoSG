import React from "react";

import estilos from "./CompColumna.module.css";
import EleBotonImagen from "../../elementos/botones/EleBotonImagen";

const CompColumnaBoton = (infoColumna, cellData) => {
    const datosFila = cellData.data;
    const valorCampoFila = datosFila[infoColumna.campo];

    return (
        <EleBotonImagen
            primario
            apariencia="contained"
            claseCss={estilos.botonIcono}
            icono="visibility"
            funcionOnClick={infoColumna.funcion.bind(this, valorCampoFila, datosFila)}
        />
    );
};

export default CompColumnaBoton;
