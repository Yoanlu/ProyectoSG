import { peticionServidor } from "../../comunes/api/Api";

const guardarFiesta = async function(datos, historia) {
    let puntoFinal = "fiestas/"; 
    let metodo = "POST";

    if (datos.id) {
        metodo = "PUT";
        
        puntoFinal = "fiestas/" + datos.id + "/"; 
    }
    let llamada = await peticionServidor(metodo, puntoFinal, datos, historia);
    return llamada;
};

const recuperarListaFiesta = async function(historia) {
    let puntoFinal = "fiestas/"; 
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const recuperarDatosFiesta = async function(id, historia) {
    
    let puntoFinal = "fiestas/" + id + "/"; 
    let llamada = await peticionServidor("GET", puntoFinal, null, historia);
    return llamada;
};

const borrarFiesta = async function(id, historia) {
    let puntoFinal = "fiestas/" + id + "/"; 
    let llamada = await peticionServidor("DELETE", puntoFinal, null, historia);
    return llamada;
};

export { guardarFiesta, recuperarListaFiesta, recuperarDatosFiesta, borrarFiesta };