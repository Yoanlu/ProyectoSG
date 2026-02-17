import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup } from "react-testing-library";

import CompUsuario from "./CompUsuario";
import { getConsolaMock } from "../../../../../UtilidadesJest";

const consolasMock = getConsolaMock();
const { fetchMock } = require("fetch-mock");
window.fetch = fetchMock;

afterEach(cleanup);

describe("core::elements::CompUsuario", () => {
    describe("Renderización", () => {
        const mydatoEnEdicion = [];
        test("Recibe usuario y se renderiza", () => {
            render(<CompUsuario datoEnEdicion={mydatoEnEdicion} funcionControlPeticion={() => {}} traduccion={() => {}} />);
        });

        test("Recibe Usuario sin funcionCambiaEstados y se muestra el error", () => {
            render(<CompUsuario traduccion={() => {}} datoEnEdicion={mydatoEnEdicion} funcionControlPeticion={() => {}} />);

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(expect.stringMatching(/The prop `funcionCambiaEstados` is marked as required/));
        });
    });
});
