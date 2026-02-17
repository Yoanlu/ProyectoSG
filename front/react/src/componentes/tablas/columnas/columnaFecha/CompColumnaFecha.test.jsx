import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import i18n from '../../../i18n';
import CompColumnaFecha from './CompColumnaFecha';

afterEach(cleanup);

describe('core::components::CompColumnaFecha', () => {
    describe('Renderización', () => {
        test('Recibe una fecha como valor y se renderiza', () => {
            i18n.changeLanguage('es');
            const { container } = render(<CompColumnaFecha value="2000-01-05" />);

            expect(container.textContent).toContain('05/01/2000');
        });

        test('Recibe una fecha como valor y se renderiza', () => {
            i18n.changeLanguage('en');
            const { container } = render(<CompColumnaFecha value="2000-01-05" />);

            expect(container.textContent).toContain('01/05/2000');
        });
    });
});
