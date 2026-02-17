import React from 'react';
import 'jest-dom/extend-expect';
import {
    render,
    cleanup,
    getByLabelText,
    prettyDOM
} from 'react-testing-library';

import CompCookies from './CompCookies';

afterEach(cleanup);

describe('core::elements::CompCookies', () => {
    describe('Renderización', () => {
        test('Recibe entrada de color y se renderiza', () => {
            render(<CompCookies />);
        });
    });
});
