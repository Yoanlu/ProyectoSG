// count, sum, max, min, avg

import { IntegratedSummary } from "@devexpress/dx-react-grid";
import { convertirAHoraMinutoSegundo, convertirATotalSegundos, esHoraMinutoSegundo, redondear } from "../Utilidades";

const calculoSumatorio = (rows, getValue) => {
    let sumaTotal = 0.0;

    let esHoraMinSeg = false;

    rows.forEach(fila => {
        let valor = getValue(fila);
        let valorFila = 0;

        let horaMinSeg = esHoraMinutoSegundo(valor);
        if (horaMinSeg) {
            esHoraMinSeg = true;
            valorFila = convertirATotalSegundos(valor);
        } else {
            valorFila = parseFloat(valor);
        }

        if (!isNaN(valorFila)) {
            sumaTotal += valorFila;
        }
    });

    if (esHoraMinSeg) {
        let sumaHoraMinSeg = convertirAHoraMinutoSegundo(sumaTotal);
        let horaMin = sumaHoraMinSeg.split(":");

        let horas = parseFloat(horaMin[0]);
        let minutos = parseFloat(horaMin[1]) / 60;

        let suma = parseFloat((horas + minutos).toFixed(3));
        return suma;

        // return sumaHoraMinSeg; // La tabla falla si recibe un String
    }

    if (!isNaN(sumaTotal)) {
        sumaTotal = sumaTotal.toFixed(3);
    }

    return sumaTotal;
};

const calculoMaximo = (rows, getValue) => {
    let maximo = undefined;

    rows.forEach(fila => {
        let valorFila = parseFloat(getValue(fila));

        if (!isNaN(valorFila) && (valorFila > maximo || maximo === undefined)) {
            maximo = valorFila;
        }
    });

    return maximo;
};

const calculoMinimo = (rows, getValue) => {
    let minimo = undefined;

    rows.forEach(fila => {
        let valorFila = parseFloat(getValue(fila));

        if (!isNaN(valorFila) && (valorFila < minimo || minimo === undefined)) {
            minimo = valorFila;
        }
    });

    return minimo;
};

const calculoPromedio = (rows, getValue) => {
    let sumaTotal = 0.0;
    let filas = rows.length;

    rows.forEach(fila => {
        let valorFila = parseFloat(getValue(fila));

        if (!isNaN(valorFila)) {
            sumaTotal += valorFila;
        }
    });

    if (filas > 0) {
        let promedio = sumaTotal / filas;
        return redondear(promedio, 5);
    }

    return 0;
};

const calculoResumen = (type, rows, getValue) => {
    // Posibles valores: sum, max, min, avg, count
    switch (type) {
        case "sum":
            return calculoSumatorio(rows, getValue);
        case "max":
            return calculoMaximo(rows, getValue);
        case "min":
            return calculoMinimo(rows, getValue);
        case "avg":
            return calculoPromedio(rows, getValue);
        default:
            return IntegratedSummary.defaultCalculator(type, rows, getValue);
    }
};

export default calculoResumen;
