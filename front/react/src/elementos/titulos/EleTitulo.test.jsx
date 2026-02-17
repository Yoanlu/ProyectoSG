import React from 'react';
import 'jest-dom/extend-expect';
import { render, getByText, cleanup } from 'react-testing-library';

import EleTitulo from './EleTitulo';
import { getConsolaMock } from '../../UtilidadesJest';

afterEach(cleanup);

const consolasMock = getConsolaMock();

describe('core::elemets::EleTitulo', () => {
    describe('Renderización', () => {
        test('Recibe titulo y se renderiza', () => {
            render(<EleTitulo />);
        });

        test('Recibe texto en props y lo muestra', () => {
            const { container } = render(<EleTitulo>Pruebas</EleTitulo>);
            getByText(container, 'Pruebas');
        });

        test('Recibe el tipo de titulo h1 en props y lo establece el estilo estiloH1', () => {
            const { container } = render(<EleTitulo tipoTitulo="h1">Pruebas</EleTitulo>);
            const miBoton = getByText(container, 'Pruebas');
            expect(miBoton.className).toContain('h1');
        });

        test('Recibe el tipo de titulo h1 en props y lo establece el estilo estiloH1', () => {
            const { container } = render(<EleTitulo tipoTitulo="h2">Pruebas</EleTitulo>);
            const miBoton = getByText(container, 'Pruebas');
            expect(miBoton.className).toContain('h2');
        });

        test('Recibe el tipo de titulo h1 en props y lo establece el estilo estiloH1', () => {
            const { container } = render(<EleTitulo tipoTitulo="h3">Pruebas</EleTitulo>);
            const miBoton = getByText(container, 'Pruebas');
            expect(miBoton.className).toContain('h3');
        });

        test('Recibe titulo sin texto y se muestra el error', () => {
            render(<EleTitulo />);

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `children` is marked as required/)
            );
        });
    });
});
