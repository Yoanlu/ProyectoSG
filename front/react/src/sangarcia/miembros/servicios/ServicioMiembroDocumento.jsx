import { peticionServidor } from "../../comunes/api/Api";

/**
 * Recupera la lista de documentos de un miembro específico.
 */
export async function recuperarDocumentosMiembro(idMiembro, history) {
    return await peticionServidor("GET", "documentos-miembros/?miembro=" + idMiembro, null, history);
}

/**
 * Crea un nuevo documento para un miembro (Usado por el Popup rápido).
 * Se usa FormData porque enviamos un archivo físico (binario).
 */
export const crearDocumentoMiembro = async (miembroId, datos, history) => {
    const formData = new FormData();
    formData.append("miembro", miembroId);
    formData.append("documento", datos.fichero);
    formData.append("tipo_documento", datos.tipo_documento);
    formData.append("nombre_documento", datos.nombre || "");
    formData.append("observaciones", datos.observaciones || "");

    return await peticionServidor("POST", "documentos-miembros/", formData, history);
};

/**
 * Guarda un documento de miembro (crear o actualizar).
 * Usado por CompTablaMantenimiento (autoGuardar).
 */
export async function guardarDocumentoMiembro(datosDocumento, history) {
    let metodo = datosDocumento.id ? "PATCH" : "POST";
    let ruta = datosDocumento.id ? "documentos-miembros/" + datosDocumento.id + "/" : "documentos-miembros/";

    // Convertimos a FormData si hay un archivo nuevo para que Django lo reciba bien
    let body = datosDocumento;
    if (datosDocumento.documento instanceof File) {
        body = new FormData();
        Object.keys(datosDocumento).forEach(key => {
            if (datosDocumento[key] !== null && datosDocumento[key] !== undefined) {
                body.append(key, datosDocumento[key]);
            }
        });
    }

    return await peticionServidor(metodo, ruta, body, history);
}

/**
 * Elimina un documento de miembro.
 */
export async function borrarDocumentoMiembro(idDocumento, history) {
    return await peticionServidor("DELETE", "documentos-miembros/" + idDocumento + "/", null, history);
}
