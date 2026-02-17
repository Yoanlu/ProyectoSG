import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByText } from 'react-testing-library';

import CompColumnaOpcionesIcono from './CompColumnaOpcionesIcono';

afterEach(cleanup);

describe('core::components::CompColumnaOpcionesIcono', () => {
    describe('Renderización', () => {
        test('Recibe valor a true', () => {
            const { container } = render(<CompColumnaOpcionesIcono value={true} />);

            getByText(container, 'check');
        });

        test('Recibe valor a false', () => {
            const { container } = render(<CompColumnaOpcionesIcono value={false} />);

            getByText(container, 'close');
        });
    });
});
