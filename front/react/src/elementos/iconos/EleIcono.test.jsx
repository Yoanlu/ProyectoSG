import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import EleIconoUtilidadesPruebas from './EleIconoUtilidadesPruebas';

import EleIcono from './EleIcono';

afterEach(cleanup);

describe('core::elements::EleIcono', () => {
    describe('Renderización', () => {
        test('Recibe un EleIcono y se renderiza', () => {
            render(<EleIcono />);
        });

        test('Recibe un icono en props y lo muestra en el elemento.', () => {
            const { container } = render(<EleIcono icono="Pruebas" />);

            const miBoton = new EleIconoUtilidadesPruebas(container, 'Pruebas');
            expect(miBoton.icono).toContain('Pruebas');
        });
    });
});
