import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import EleBarraAplicacion from './EleBarraAplicacion';
import EleBarraAplicacionUtilidadesPruebas from './EleBarraAplicacionUtilidadesPruebas';

afterEach(cleanup);

describe('core::elemets::EleBarraAplicacion', () => {
    describe('Renderización', () => {
        test('Recibe boton y se renderiza', () => {
            render(<EleBarraAplicacion />);
        });

        test('Recibe texto en props y lo muestra', () => {
            const { container } = render(<EleBarraAplicacion>Pruebas</EleBarraAplicacion>);

            const miBarraAplicacion = new EleBarraAplicacionUtilidadesPruebas(container);
            expect(miBarraAplicacion.texto).toEqual('Pruebas');
        });
    });
});
