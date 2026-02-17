import { peticionRefrescaAuth } from "./ApiAuth";
import { dominioDesarrollo } from "../configuracion.json";
import { esDesarrollo } from "../../../componentes/Utilidades";

const recuperaPermisos = async () => {
    let tipoAutorizacion = window.localStorage.getItem("token_type");
    let tokenAcceso = window.localStorage.getItem("access_token");

    if (!tipoAutorizacion || !tokenAcceso) {
        return [];
    } else {
        let datosPeticion = {
            headers: {
                Authorization: tipoAutorizacion + " " + tokenAcceso,
                "Content-Type": "application/json",
                "Accept-Language": window.localStorage.getItem("i18nextLng")
            }
        };
        const url = "seguridad/permisos/";

        const respuestaPeticion = await peticionServidor("GET", url, datosPeticion);

        const codigo = respuestaPeticion.codigo;
        if (codigo >= 200 && codigo < 300) {
            return await respuestaPeticion.respuesta;
        } else if (codigo === 401) {
            window.localStorage.removeItem("token_type");
            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("refresh_token");
        }

        return [];
    }
};

const dameUrlDominio = function() {
    let protocolo, servidor, puerto;

    if (esDesarrollo) {
        protocolo = "http://";
        servidor = dominioDesarrollo.servidor;
        puerto = dominioDesarrollo.puerto;
    } else {
        protocolo = window.location.protocol + "//";
        servidor = process.env.BACK_DOMAIN;
        try {
            puerto = process.env.BACK_PORT;
        } catch (error) {
            puerto = "";
        }
    }

    return protocolo + servidor + puerto;
};

const peticionServidor = async function(metodo, puntoFinal, datosPeticion = [], historia, auth = false) {
    let urlDominio = dameUrlDominio();
    let puntoFinalCompleto = puntoFinal;
    let tokenAcceso = window.localStorage.getItem("access_token");

    let miInit = {
        method: metodo,
        credentials: "omit"
    };

    if (auth) {
        let formData = new FormData();
        for (let parametro in datosPeticion) {
            formData.append(parametro, datosPeticion[parametro]);
        }
        miInit.body = formData;

        miInit.headers = {
            "Accept-Language": window.localStorage.getItem("i18nextLng")
        };
    } else {
        puntoFinalCompleto = "/api/v1/" + puntoFinalCompleto;

        let tipoAutorizacion = window.localStorage.getItem("token_type");

        if (!tipoAutorizacion || !tokenAcceso) {
            window.localStorage.removeItem("token_type");
            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("refresh_token");
            if (historia) {
                historia.push("/login");
            }
            return {
                codigo: 0,
                respuesta: null
            };
        }

        miInit.headers = {
            Authorization: tipoAutorizacion + " " + tokenAcceso,
            "Content-Type": "application/json",
            "Accept-Language": window.localStorage.getItem("i18nextLng")
        };

        if (metodo !== "GET") {
            miInit.body = JSON.stringify(datosPeticion);
        }
    }

    let url = urlDominio + puntoFinalCompleto;

    try {
        var response = await fetch(url, miInit);
    } catch (excp) {
        let devolucionLlamada = {
            codigo: -1,
            respuesta: null,
            error: true
        };

        return devolucionLlamada;
    }

    let contentType = response.headers.get("content-type");
    let devolucionLlamada = null;

    if (response.status === 401 && auth) {
        window.localStorage.removeItem("token_type");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        if (historia) {
            historia.push("/login");
        }

        let respuestaServidorJson = await response.json();

        devolucionLlamada = {
            codigo: response.status,
            textoEstado: response.statusText,
            respuesta: respuestaServidorJson,
            error: true
        };
    } else if (response.status === 401) {
        let respuestaServidor = await peticionRefrescaAuth(historia);
        if (respuestaServidor.codigo === 200) {
            devolucionLlamada = peticionServidor(metodo, puntoFinal, datosPeticion, historia, auth);
        } else {
            devolucionLlamada = respuestaServidor;
        }
    } else if (response.status >= 200 && response.status < 300) {
        if (contentType && contentType.indexOf("application/json") !== -1) {
            let respuestaServidorJson = await response.json();

            devolucionLlamada = {
                codigo: response.status,
                textoEstado: response.statusText,
                respuesta: respuestaServidorJson,
                error: false
            };
        } else if (contentType && contentType.indexOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") !== -1) {
            let responseBlob = await response.blob();

            devolucionLlamada = {
                nombre: response.filename,
                codigo: response.status,
                textoEstado: response.statusText,
                respuesta: responseBlob,
                error: false
            };
        } else {
            let responseText = await response.text();

            devolucionLlamada = {
                codigo: response.status,
                textoEstado: response.statusText,
                respuesta: responseText,
                error: false
            };
        }
    } else {
        let respuestaServidor = null;
        if (contentType && contentType.indexOf("application/json") !== -1) {
            respuestaServidor = await response.json();
        } else {
            respuestaServidor = await response.text();
        }

        devolucionLlamada = {
            codigo: response.status,
            textoEstado: response.statusText,
            respuesta: respuestaServidor,
            error: true
        };
    }

    return devolucionLlamada;
};

export { dameUrlDominio, peticionServidor, recuperaPermisos };
