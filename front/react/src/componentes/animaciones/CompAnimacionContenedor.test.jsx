import React from 'react';
import 'jest-dom/extend-expect';
import { render, getByText, cleanup, fireEvent } from 'react-testing-library';
import CompAnimacionContenedor from './CompAnimacionContenedor';
import { getConsolaMock } from '../../UtilidadesJest';

afterEach(cleanup);

const consolasMock = getConsolaMock();

const ElePrueba = () => {
    return <div>elemento de prueba</div>;
};

describe('core::components::CompAnimacionContenedor', () => {
    describe('Renderización', () => {
        test('Recibe Animación contenedor y se renderiza', () => {
            render(
                <CompAnimacionContenedor>
                    <ElePrueba />
                </CompAnimacionContenedor>
            );
        });

        test('Recibe Animación contenedor sin visible y se muestra el error', () => {
            render(
                <CompAnimacionContenedor>
                    <ElePrueba />
                </CompAnimacionContenedor>
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(
                    /The prop `visible` is marked as required/
                )
            );
        });

        test('Recibe Animación contenedor sin animacion y se muestra el error', () => {
            render(
                <CompAnimacionContenedor>
                    <ElePrueba />
                </CompAnimacionContenedor>
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(
                    /The prop `animacion` is marked as required/
                )
            );
        });
    });
});
