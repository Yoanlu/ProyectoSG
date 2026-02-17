import React from 'react';
import { render, cleanup } from 'react-testing-library';

import EleMenuEmergente from './EleMenuEmergente';

import { getConsolaMock } from '../../UtilidadesJest';

const consolasMock = getConsolaMock();

afterEach(cleanup);

describe('core::elements::EleDesplegablesVentana', () => {
    describe('Renderización', () => {
        test('Recibe Elemento Menú Emergente  y se renderiza', () => {
            render(<EleMenuEmergente />);
        });

        test('Recibe obligatoriamente un children de lo contrario salta error', () => {
            render(<EleMenuEmergente />);

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `children` is marked as required/)
            );
        });
    });
});

/*
-Comprobar que cuando hago click me ha generado el hijo.
-Cuando hago click sobre el hijo lo oculta.
*/
