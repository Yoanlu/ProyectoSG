import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup } from "react-testing-library";
import VistaUsuario from "./VistaUsuario";
import "../../../../../componentes/i18n";

afterEach(cleanup);

describe("core::elements::VistaUsuario", () => {
    describe("Renderización", () => {
        test("Recibe entrada de texto y se renderiza", () => {
            render(<VistaUsuario />);
        });
    });
});
