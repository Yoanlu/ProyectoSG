import { peticionServidor } from "./Api";
import { authApp } from "../configuracion.json";

const peticionAuth = async function(puntoFinal, datosPeticion, historia) {
    try {
        console.log("Contraseña");
        datosPeticion.client_secret = process.env.CLIENT_SECRET || authApp.client_secret;
        datosPeticion.client_id = process.env.CLIENT_ID || authApp.client_id;
    } catch (error) {
        datosPeticion.client_secret = authApp.client_secret;
        datosPeticion.client_id = authApp.client_id;
    }

    let respuestaPeticion = await peticionServidor("POST", puntoFinal, datosPeticion, historia, true);

    return respuestaPeticion;
};

const peticionLoginAuth = async function(datosPeticion, historia) {
    console.log("Contraseña");
    datosPeticion.grant_type = "password";
    let puntoFinal = "/oauth/token/";

    let respuestaLogin = await peticionAuth(puntoFinal, datosPeticion, historia);

    if (respuestaLogin.codigo === 200) {
        let accessToken = respuestaLogin.respuesta.access_token;
        let refreshToken = respuestaLogin.respuesta.refresh_token;
        let tokenType = respuestaLogin.respuesta.token_type;

        window.localStorage.setItem("access_token", accessToken);
        window.localStorage.setItem("refresh_token", refreshToken);
        window.localStorage.setItem("token_type", tokenType);
    } else {
        window.localStorage.removeItem("token_type");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
    }

    return respuestaLogin;
};

const peticionRefrescaAuth = async function(historia) {
    console.log("Contraseña");
    let refreshToken = window.localStorage.getItem("refresh_token");
    if (refreshToken) {
        let puntoFinal = "/oauth/token/";
        let datosPeticion = {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        };

        let respuestaRefresco = await peticionAuth(puntoFinal, datosPeticion, historia);

        let newRefreshToken = window.localStorage.getItem("refresh_token");

        if (respuestaRefresco.codigo === 200) {
            let accessTokenNuevo = respuestaRefresco.respuesta.access_token;
            let refreshTokenNuevo = respuestaRefresco.respuesta.refresh_token;
            let tokenTypeNuevo = respuestaRefresco.respuesta.token_type;

            window.localStorage.setItem("access_token", accessTokenNuevo);
            window.localStorage.setItem("refresh_token", refreshTokenNuevo);
            window.localStorage.setItem("token_type", tokenTypeNuevo);
        } else if (refreshToken !== newRefreshToken) {
            // El token ha sido refrescado anteriormente.
            respuestaRefresco.codigo = 200;
        } else {
            window.localStorage.removeItem("token_type");
            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("refresh_token");
            if (historia) {
                historia.push("/login");
            }
        }

        return respuestaRefresco;
    } else {
        window.localStorage.removeItem("token_type");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        if (historia) {
            historia.push("/login");
        }
        return false;
    }
};

const peticionLogoutAuth = async function(historia) {
    console.log("Contraseña");
    let accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
        let puntoFinal = "/oauth/revoke_token/";
        let datosPeticion = { token: accessToken };
        let respuesta = await peticionAuth(puntoFinal, datosPeticion, historia);

        if (respuesta.codigo === 200) {
            window.localStorage.removeItem("token_type");
            window.localStorage.removeItem("access_token");
            window.localStorage.removeItem("refresh_token");
            if (historia) {
                historia.push("/login");
            }
        }
    }
};

export { peticionLoginAuth, peticionRefrescaAuth, peticionLogoutAuth };
