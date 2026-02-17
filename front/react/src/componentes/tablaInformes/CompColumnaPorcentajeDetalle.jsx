import React from "react";

import CompColumnaDetalleBase from "./CompColumnaDetalleBase";

const CompColumnaPorcentajeDetalle = (infoColumna, cellData) => {
    return <CompColumnaDetalleBase infoColumna={infoColumna} cellData={cellData} mostrarPorcentaje={true} />;
};

export default CompColumnaPorcentajeDetalle;
