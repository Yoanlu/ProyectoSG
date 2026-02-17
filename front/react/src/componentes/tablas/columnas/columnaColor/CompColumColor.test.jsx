import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import CompColumColor from './CompColumColor';

afterEach(cleanup);

describe('core::elements::CompColumColor', () => {
    describe('Renderización', () => {
        test('Recibe entrada de texto y se renderiza', () => {
            render(<CompColumColor />);
        });
    });
});
