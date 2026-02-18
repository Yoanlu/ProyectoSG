import { peticionServidor } from "../../comunes/api/Api";

const guardarActividad = async function(datos, historia) {
    let puntoFinal = "actividades/";
    let metodo = "POST";

    if (datos.id) {
        metodo = "PUT";

        puntoFinal = "actividades/" + datos.id + "/";
    }
    let llamada = await peticionServidor(metodo, puntoFinal, datos, historia);
    return llamada;
};

const recuperarListaActividad = async function(historia) {
    let puntoFinal = "actividades/";
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const recuperarDatosActividad = async function(id, historia) {
    let puntoFinal = "actividades/" + id + "/";
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const borrarActividad = async function(id, historia) {
    let puntoFinal = "actividades/" + id + "/";
    let llamada = await peticionServidor("DELETE", puntoFinal, null, historia);
    return llamada;
};

export { guardarActividad, recuperarListaActividad, recuperarDatosActividad, borrarActividad };
