import { peticionLoginAuth } from "../../api/ApiAuth";

const peticionTokenLogin = async function(valorUsuario, valorContrasena, historia) {
    var datosPeticion = {
        username: valorUsuario,
        password: valorContrasena
    };

    var respuestaPeticion = await peticionLoginAuth(datosPeticion, historia);

    return respuestaPeticion;
};

export { peticionTokenLogin };
