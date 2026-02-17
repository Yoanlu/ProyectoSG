const controlSolapamientoFechas = periodos => {
    if (!periodos || periodos === null) {
        return false;
    }

    for (let i = 0; i < periodos.length; i++) {
        const periodo = periodos[i];

        for (let j = i + 1; j < periodos.length; j++) {
            if (i === j) {
                continue;
            }

            const periodoComparar = periodos[j];

            let fechaDesde = new Date(periodo.fecha_desde);
            let fechaHasta = new Date(periodo.fecha_hasta);

            let fechaDesdeComprobar = new Date(periodoComparar.fecha_desde);
            let fechaHastaComprobar = new Date(periodoComparar.fecha_hasta);

            if (periodo.fecha_hasta === null) {
                fechaHasta = null;

                if (fechaDesdeComprobar >= fechaDesde || fechaHastaComprobar >= fechaDesde) {
                    return true;
                }
            }

            if (periodoComparar.fecha_hasta === null) {
                fechaHastaComprobar = null;

                if (fechaDesde >= fechaDesdeComprobar || fechaHasta >= fechaDesdeComprobar) {
                    return true;
                }
            }

            if (fechaDesdeComprobar >= fechaDesde && fechaHasta && fechaDesdeComprobar <= fechaHasta) {
                return true;
            } else if (fechaHasta && fechaHastaComprobar && fechaHastaComprobar >= fechaDesde && fechaHastaComprobar <= fechaHasta) {
                return true;
            } else if (fechaDesde <= fechaDesdeComprobar && fechaHasta && fechaHasta >= fechaDesdeComprobar) {
                return true;
            } else if (fechaDesdeComprobar <= fechaDesde && fechaHastaComprobar && fechaHasta && fechaHastaComprobar >= fechaHasta) {
                return true;
            }
        }
    }

    return false;
};

export { controlSolapamientoFechas };
