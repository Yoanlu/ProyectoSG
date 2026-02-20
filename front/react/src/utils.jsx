export const funcionCrearStrigUrl = criterios => {
    let stringUrl = "?";
    Object.keys(criterios).forEach(key => {
        const valor = criterios[key];
        let esFecha = false;
        let fechaObj = null;
        if (valor instanceof Date && !isNaN(valor)) {
            esFecha = true;
            fechaObj = valor;
        } else if (typeof valor === "string" && valor.length >= 8) {
            const parsed = new Date(valor);
            if (!isNaN(parsed)) {
                esFecha = true;
                fechaObj = parsed;
            }
        }
        if (esFecha) {
            let fechaStr = fechaObj.toISOString().split("T")[0];
            console.log(`Campo ${key} es fecha, valor convertido a string: ${fechaStr}`);
            if (key.endsWith("_desde")) {
                stringUrl += `${key.replace("_desde", "__gte=")}${fechaStr}&`;
            } else if (key.endsWith("_hasta")) {
                stringUrl += `${key.replace("_hasta", "__lte=")}${fechaStr}&`;
            }
            // Defensive: if fechaStr is array (shouldn't happen), join it
        } else if ((typeof valor === "string" || typeof valor === "number") && valor !== "") {
            stringUrl += `${key}__icontains=${valor}&`;
        } else if (Array.isArray(valor) && valor.length > 0) {
            stringUrl += `${key}__in=${valor.join(",")}&`;
        } else if (typeof valor === "boolean") {
            stringUrl += `${key}=${valor}&`;
        }
    });
    if (stringUrl.endsWith("&")) {
        stringUrl = stringUrl.slice(0, -1);
    }
    return stringUrl;
};
