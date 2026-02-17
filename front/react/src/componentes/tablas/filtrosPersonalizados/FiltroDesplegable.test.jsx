import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import i18n from '../../i18n';
import FiltroDesplegable from './FiltroDesplegable';

afterEach(cleanup);

i18n.changeLanguage('es');

describe('core::components::FiltroDesplegable', () => {
    describe('Renderización', () => {
        test('Recibe una fecha como valor y se renderiza', () => {
            render(
                <FiltroDesplegable valoresPosiblesFiltro={[{ id: 1, text: 'Filtro por activos', valor: 'prueba' }]} />
            );
        });
    });
});
