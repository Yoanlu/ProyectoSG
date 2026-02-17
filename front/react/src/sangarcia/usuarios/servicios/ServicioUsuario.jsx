import { peticionServidor } from "../../comunes/api/Api";

const guardarUsuario = async function(datos, historia) {
    let puntoFinal = "seguridad/users/";

    let metodo = "POST";
    if (datos.id) {
        metodo = "PATCH";
        puntoFinal = "seguridad/users/" + datos.id + "/";
    } else {
        if (datos.is_active === undefined) {
            datos.is_active = true;
        }
    }

    let llamada = await peticionServidor(metodo, puntoFinal, datos, historia);

    return llamada;
};

const eliminarUsuario = async function(id, historia) {
    let puntoFinal = "seguridad/users/" + id + "/";

    return await peticionServidor("DELETE", puntoFinal, null, historia);
};

const recuperarListaUsuarios = async function(historia) {
    let puntoFinal = "seguridad/users/";

    let llamada = await peticionServidor("GET", puntoFinal, null, historia);

    return llamada;
};

const recuperarDatosUsuario = async function(id, historia) {
    let puntoFinal = "seguridad/users/" + id + "/";

    let llamada = await peticionServidor("GET", puntoFinal, null, historia);

    return llamada;
};

const recuperarGrupos = async function(historia) {
    let puntoFinal = "seguridad/groups/";

    let llamada = await peticionServidor("GET", puntoFinal, null, historia);

    return llamada;
};

export { recuperarListaUsuarios, recuperarDatosUsuario, recuperarGrupos, guardarUsuario, eliminarUsuario };
