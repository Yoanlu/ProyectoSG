import { peticionServidor } from "./Api";
import { getHistoryMock } from "../../../UtilidadesJest";
import "jest-localstorage-mock";

// const { fetchMock, MATCHED, UNMATCHED } = require('fetch-mock');
const { fetchMock } = require("fetch-mock");

describe("testing api", () => {
    it("Llamada GET a /api/v1/clientes/ devuelve clientes: muchos", async () => {
        localStorage.__STORE__["token_type"] = "TipoToken";
        localStorage.__STORE__["access_token"] = "AccessToken";
        localStorage.__STORE__["refresh_token"] = "RefreshToken";
        localStorage.__STORE__["i18nextLng"] = "es-ES";

        fetchMock.get("http://192.168.1.230:8000/api/v1/calendarios/tipos/", {
            clientes: "no hay clientes"
        });

        const historyMock = getHistoryMock();
        const response = await peticionServidor("GET", "calendarios/tipos/", null, historyMock, false);

        expect(localStorage.getItem).toHaveBeenCalledTimes(3);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(localStorage.removeItem).toHaveBeenCalledTimes(0);

        expect(response.respuesta.clientes).toEqual("no hay clientes");
        expect(response.codigo).toEqual(200);
        expect(response.error).toBeFalsy();

        fetchMock.reset();
    });
});
