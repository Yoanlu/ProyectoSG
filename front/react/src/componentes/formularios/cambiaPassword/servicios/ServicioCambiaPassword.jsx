const cambiaPassword = async function(datos, peticionServidor, historia) {
    let puntoFinal = "seguridad/change_password/";

    let llamada = await peticionServidor("PATCH", puntoFinal, datos, historia);

    return llamada;
};

export { cambiaPassword };
