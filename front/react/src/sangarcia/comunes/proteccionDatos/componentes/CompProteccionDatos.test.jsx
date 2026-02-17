import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import "jest-localstorage-mock";
import i18n from "../../../../componentes/i18n";

import CompProteccionDatos from "./CompProteccionDatos";

afterEach(cleanup);

describe("core::components::CompProteccionDatos", () => {
    i18n.changeLanguage("es");
    describe("Renderización", () => {
        test("Recibe Animación contenedor y se renderiza", () => {
            render(<CompProteccionDatos />);
        });
    });
});
