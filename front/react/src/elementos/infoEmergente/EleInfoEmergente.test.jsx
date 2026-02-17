import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByTitle } from 'react-testing-library';

import EleInfoEmergente from './EleInfoEmergente';

afterEach(cleanup);

describe('core::elemets::EleInfoEmergente', () => {
    describe('Renderización', () => {
        test('Recibe tooltip y se renderiza', () => {
            render(
                <EleInfoEmergente titulo={'Prueba'}>
                    <div>hola</div>
                </EleInfoEmergente>
            );
        });

        test('Recibe texto en props y lo muestra', () => {
            const { container } = render(
                <EleInfoEmergente titulo={'Pruebas'}>
                    <div>hola</div>
                </EleInfoEmergente>
            );
            getByTitle(container, 'Pruebas');
        });
    });
});
