import React from "react";

import estilos from "./CompColumna.module.css";
import { estaVacio, formatearNumero } from "../Utilidades";

const CompColumnaBasica = (infoColumna, cellData) => {
    const datosFila = cellData.data;

    let valorCampoFila = datosFila[infoColumna.campo];
    if (!estaVacio(valorCampoFila) && typeof valorCampoFila === "object") {
        // Si es un diccionario con varios valores, seguimos mostrando el principal de esta columna
        try {
            valorCampoFila = valorCampoFila[infoColumna.campo];
        } catch (error) {}
    }

    if (infoColumna.tipo === "numero" || infoColumna.tipo === "porcentaje") {
        valorCampoFila = formatearNumero(valorCampoFila, undefined, 3);
    }

    if (typeof valorCampoFila === "string" && valorCampoFila.includes("<br")) {
        return <div dangerouslySetInnerHTML={{ __html: valorCampoFila }} />;
    }

    let mostrarPorcentaje = false;
    if (infoColumna.tipo === "porcentaje") {
        mostrarPorcentaje = true;
    }

    return (
        <div>
            {valorCampoFila}
            {mostrarPorcentaje ? "%" : ""}
        </div>
    );
};

export default CompColumnaBasica;
