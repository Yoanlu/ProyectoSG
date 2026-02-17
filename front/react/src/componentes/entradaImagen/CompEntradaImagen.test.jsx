import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByAltText } from 'react-testing-library';

import CompEntradaImagen from './CompEntradaImagen';

afterEach(cleanup);

describe('core::components::CompEntradaImagen', () => {
    describe('Renderización', () => {
        test('Recibe entrada de imagen y se renderiza', () => {
            render(<CompEntradaImagen nombre="prueba_imagen" valor="" />);
        });

        test('Recibe valor y se muestra', () => {
            const { container } = render(
                <CompEntradaImagen
                    nombre="prueba_imagen"
                    alternativo="texto_alt"
                    valor="valor_imagen"
                />
            );

            const entradaImagen = getByAltText(container, 'texto_alt');
            expect(entradaImagen.src).toContain('valor_imagen');
        });

        test('Recibe texto alternativo y se muestra', () => {
            const { container } = render(
                <CompEntradaImagen
                    nombre="prueba_imagen"
                    alternativo="texto_alt"
                    valor="valor_imagen"
                />
            );

            const entradaImagen = getByAltText(container, 'texto_alt');
            expect(entradaImagen.src).toContain('valor_imagen');
        });
    });
});
