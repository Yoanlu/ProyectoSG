import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import EleMedidorPorcentaje from './EleMedidorPorcentaje';

afterEach(cleanup);

describe('core::elements::EleMedidorProcentaje', () => {
    describe('Renderización', () => {
        test('Recibe un EleMedidorProcentaje y se renderiza', () => {
            render(<EleMedidorPorcentaje />);
        });
    });
});
