import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import '../i18n';

import CompPanelLateral from './CompPanelLateral';

afterEach(cleanup);

const pruebaNav = [
    {
        titulo: 'algo'
    }
];

describe('core::component::CompPanelLateral', () => {
    describe('Renderización', () => {
        test('Recibe panel lateral y se renderiza', () => {
            render(<CompPanelLateral funcionOnSelect={() => {}} opcionesMenu={pruebaNav} />);
        });
    });
});
