import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import i18n from '../../../i18n';
import CompColumnaNumero from './CompColumnaNumero';

afterEach(cleanup);

i18n.changeLanguage('es');

describe('core::components::CompColumnaNumero', () => {
    describe('Renderización', () => {
        test('Recibe una fecha como valor y se renderiza', () => {
            const { container } = render(<CompColumnaNumero value="12564.32" />);

            expect(container.textContent).toContain('12.564,32');
        });
    });
});
