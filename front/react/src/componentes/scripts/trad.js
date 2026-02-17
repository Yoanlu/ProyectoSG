import fs from "fs";
import path from "path";

function buscarTraducciones(carpetaBase="public/locales/") {
    
    function explorarDirectorio(directorioActual) {
        fs.readdir(directorioActual, (err, archivos) => {
            if (err) {
                // console.error('Error al leer la carpeta:', err);
                return;
            }

            archivos.forEach((archivo) => {
                const rutaCompleta = path.join(directorioActual, archivo);

                fs.stat(rutaCompleta, (err, stats) => {
                    if (err) {
                        console.error('Error al obtener información del archivo:', err);
                        return;
                    }

                    if (stats.isDirectory()) {
                        explorarDirectorio(rutaCompleta); // Llamada recursiva para subcarpetas
                    } else if (stats.isFile() && rutaCompleta.includes(".json")) {
                        tratarTraduccion(rutaCompleta); // Ordenamos las claves del json
                    }
                });
            });
        });
    }

    // Inicia el recorrido desde la carpeta base
    explorarDirectorio(carpetaBase);
}

function tratarTraduccion(rutaTraduccion) {
    let tradJsonES = JSON.parse(fs.readFileSync(rutaTraduccion, "utf8"));

    let traducOrdenadas = ordenarArray(tradJsonES);

    fs.writeFileSync(rutaTraduccion, JSON.stringify(traducOrdenadas, null, 4));
}

function ordenarArray(obj) {
    if (Array.isArray(obj)) {
        return obj.map(ordenarArray);
    } else if (obj !== null && typeof obj === "object") {

        return Object.keys(obj)
            .sort((a, b) => a.localeCompare(b))
            .reduce((sortedObj, key) => {
                let claveMinusculas = key.toLocaleLowerCase().replace(/ /g, "_");
                sortedObj[claveMinusculas] = ordenarArray(obj[key]);
                return sortedObj;
            }, {});
    }

    return obj;
}

export { buscarTraducciones };
