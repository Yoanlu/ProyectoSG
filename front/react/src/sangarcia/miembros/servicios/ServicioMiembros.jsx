import { peticionServidor } from "../../comunes/api/Api";

const guardarMiembro = async function(datos, historia) {
    let puntoFinal = "miembros/"; 
    let metodo = "POST";

    if (datos.id) {
        metodo = "PUT";
        
        puntoFinal = "miembros/" + datos.id + "/"; 
    }
    let llamada = await peticionServidor(metodo, puntoFinal, datos, historia);
    return llamada;
};

const recuperarListaMiembro = async function(historia) {
    let puntoFinal = "miembros/"; 
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const recuperarDatosMiembro = async function(id, historia) {
    
    let puntoFinal = "miembros/" + id + "/"; 
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const borrarMiembro = async function(id, historia) {
    let puntoFinal = "miembros/" + id + "/"; 
    let llamada = await peticionServidor("DELETE", puntoFinal, null, historia);
    return llamada;
};

export { guardarMiembro, recuperarListaMiembro, recuperarDatosMiembro, borrarMiembro };