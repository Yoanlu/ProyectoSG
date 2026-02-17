import React from "react";
import { render, cleanup } from "react-testing-library";
import CompFormularioLoginCob from "./CompFormularioLoginCob";

afterEach(cleanup);

describe("core::components::CompFormularioLoginCob", () => {
    describe("Renderización", () => {
        test("Recibe entrada de texto y se renderiza", () => {
            render(
                <CompFormularioLoginCob
                    textoLogin=""
                    textoUsuario=""
                    textoContrasena=""
                    textoBotonAcceder=""
                    textoLoginErroneo=""
                    funcionLoginCorrecto={() => {}}
                />
            );
        });
    });
});
