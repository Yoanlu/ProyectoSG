import React from "react";
import App from "./App";
import { render } from "react-testing-library";

describe("core::components::App", () => {
    describe("Renderización", () => {
        test("Recibe App y se renderiza", () => {
            render(<App />);
        });
    });
});
