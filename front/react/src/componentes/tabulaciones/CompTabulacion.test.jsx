import React from 'react';
import 'jest-dom/extend-expect';
import { render, getByText, cleanup } from 'react-testing-library';
import CompTabulacion from './CompTabulacion';

afterEach(cleanup);

describe('core::components::CompTabulacion', () => {
    describe('Renderización', () => {
        test('Recibe componente tabulación y se renderiza', () => {
            render(
                <CompTabulacion>
                    <div>Prueba tab 1</div>
                </CompTabulacion>
            );
        });

        test('Recibe tabs y se carga', () => {
            const { container } = render(
                <CompTabulacion>
                    <div>tabulador_primero</div>
                    <div>tabulador_segundo</div>
                </CompTabulacion>
            );

            const miTab = getByText(container, 'tabulador_primero');
            expect(miTab).not.toEqual(null);
        });

        test('Recibe tabs y se carga el tab seleccionado', () => {
            const { container } = render(
                <CompTabulacion seleccionado={1}>
                    <div>tabulador_primero</div>
                    <div>tabulador_segundo</div>
                </CompTabulacion>
            );

            const miTab = getByText(container, 'tabulador_segundo');
            expect(miTab).not.toEqual(null);
        });

        test('Recibe tabs y se cargan con el título correcto', () => {
            const { container } = render(
                <CompTabulacion seleccionado={1}>
                    <div titulo="primera pestaña">tabulador_primero</div>
                    <div titulo="segunda pestaña">tabulador_segundo</div>
                </CompTabulacion>
            );

            const miTab1 = getByText(container, 'primera pestaña');
            const miTab2 = getByText(container, 'segunda pestaña');
            expect(miTab1).not.toEqual(null);
            expect(miTab2).not.toEqual(null);
        });
    });
});
