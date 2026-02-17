import React from "react";

import estilos from "./CompColumna.module.css";
import { formatearNumero } from "../Utilidades";

const CompColumnaDetalleBase = ({ infoColumna, cellData, mostrarPorcentaje = false }) => {
    const datosFila = cellData.data;

    const valorCampoFila = datosFila[infoColumna.campo];

    const valorVisible = formatearNumero(datosFila[infoColumna.columna] || valorCampoFila || 0, undefined, 3);
    const columnaNum = formatearNumero(datosFila[infoColumna.columnaNum] || 0, undefined, 3);
    const columnaTotal = formatearNumero(datosFila[infoColumna.columnaTotal] || 0, undefined, 3);

    if (!columnaNum && !columnaTotal) {
        return (
            <div>
                {valorVisible}
                {mostrarPorcentaje ? "%" : ""}
            </div>
        );
    }

    return (
        <div>
            {valorVisible}
            {mostrarPorcentaje ? "%" : ""}
            <br />
            <div className={estilos.textoSubtotales}>
                {columnaNum} de {columnaTotal}
            </div>
        </div>
    );
};

export default CompColumnaDetalleBase;
