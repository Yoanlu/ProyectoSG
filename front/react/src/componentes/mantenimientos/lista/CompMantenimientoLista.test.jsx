import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import '../../i18n';

import CompMantenimientoLista from './CompMantenimientoLista';

afterEach(cleanup);

const pruebaMant = () => <div />;

describe('core::components::CompMantenimientoLista', () => {
    describe('Renderización', () => {
        test('Recibe mantneimiento lista', () => {
            render(
                <CompMantenimientoLista
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    funcionControlPeticion={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );
        });
    });
});
