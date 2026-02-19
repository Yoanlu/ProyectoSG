import { peticionServidor } from "../../comunes/api/Api";

const guardarAsistencias = async function(datos, historia) {
    let puntoFinal = "asistencias/";
    let metodo = "POST";

    if (datos.id) {
        metodo = "PUT";

        puntoFinal = "asistencias/" + datos.id + "/";
    }
    let llamada = await peticionServidor(metodo, puntoFinal, datos, historia);
    return llamada;
};

const recuperarListaAsistencias = async function(historia) {
    let puntoFinal = "asistencias/";
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const recuperarDatosAsistencias = async function(id, historia) {
    let puntoFinal = "asistencias/" + id + "/";
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const borrarAsistencias = async function(id, historia) {
    let puntoFinal = "asistencias/" + id + "/";
    let llamada = await peticionServidor("DELETE", puntoFinal, null, historia);
    return llamada;
};

export { guardarAsistencias, recuperarListaAsistencias, recuperarDatosAsistencias, borrarAsistencias };
