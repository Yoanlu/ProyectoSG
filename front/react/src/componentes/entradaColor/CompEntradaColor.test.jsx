import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import CompEntradaColor from './CompEntradaColor';
import { getConsolaMock } from '../../UtilidadesJest';

afterEach(cleanup);

const consolasMock = getConsolaMock();

describe('core::elements::EleEntradaColor', () => {
    describe('Renderización', () => {
        test('Recibe entrada de color y se renderiza', () => {
            render(<CompEntradaColor />);
        });

        /*test('Recibe entrada de color sin funcionOnChange y se muestra el error', () => {
            render(<CompEntradaColor />);

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(
                    /The prop `funcionOnChange` is marked as required/
                )
            );
        });

        test('Recibe entrada de color sin funcionOnChangeEleEntradaTexto y se muestra el error', () => {
            render(<CompEntradaColor />);

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(
                    /The prop `funcionOnChangeEleEntradaTexto` is marked as required/
                )
            );
        });*/
    });
});
