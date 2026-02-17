const guardarTraduccion = async function(peticionServidor, datos, endpoint, historia) {
    let puntoFinal = endpoint;

    let metodo = 'POST';
    if (datos.id) {
        metodo = 'PUT';
        puntoFinal += datos.id + '/';
    }

    let llamada = await peticionServidor(metodo, puntoFinal, datos, historia);
    return llamada;
};

const borrarTraduccion = async function(peticionServidor, id, endpoint, historia) {
    let puntoFinal = endpoint + id;
    let metodo = 'DELETE';

    let llamada = await peticionServidor(metodo, puntoFinal, null, historia);
    return llamada;
};

const recuperarListaIdiomas = async function(peticionServidor, endpoint, historia) {
    let puntoFinal = endpoint;

    let llamada = await peticionServidor('GET', puntoFinal, null, historia);

    return llamada;
};

const recuperarListaTraducciones = async function(peticionServidor, tabla, columna, idColumna, endpoint, historia) {
    let puntoFinal = endpoint + idColumna + '/traducciones/';

    let datos = { tabla: tabla, columna: columna };

    let llamada = await peticionServidor('POST', puntoFinal, datos, historia);

    return llamada;
};

export { guardarTraduccion, borrarTraduccion, recuperarListaIdiomas, recuperarListaTraducciones };
