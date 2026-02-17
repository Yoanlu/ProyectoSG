import React from 'react';
import { render, cleanup, getByTestId } from 'react-testing-library';
import ElePanel from './ElePanel';

afterEach(cleanup);

describe('core::elements::ElePanel', () => {
    describe('Renderización', () => {
        test('Recibe panel y se renderiza', () => {
            const { container } = render(<ElePanel />);
            const miPanel = getByTestId(container, 'prueba-elepanel');
            expect(miPanel).not.toEqual(null);
        });

        test('Recibe nombre de clase en props y lo establece', () => {
            const { container } = render(<ElePanel claseCss="pruebas" />);
            const miPanel = getByTestId(container, 'prueba-elepanel');
            expect(miPanel.className).toContain('pruebas');
        });
    });
});
