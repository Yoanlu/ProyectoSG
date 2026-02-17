import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByText, fireEvent, prettyDOM } from 'react-testing-library';

import EleColumnaOrden from './EleColumnaOrden';

afterEach(cleanup);

const funcionPrueba = jest.fn();
const ElementoPrueba = () => (
    <EleColumnaOrden
        onSort={funcionPrueba}
        children={<span>columnaPrueba</span>}
        direction="desc"
        column={{
            name: 'otraPrueba'
        }}
    />
);

describe('core::components::EleColumnaOrden', () => {
    describe('Renderización', () => {
        test('Renderiza elemento', () => {
            render(<ElementoPrueba />);
        });

        test('Renderiza elemento y recibe nombre columna', () => {
            const { container } = render(<ElementoPrueba />);

            getByText(container, 'columnaPrueba');
        });

        test('Renderiza elemento y recibe icono', () => {
            const { container } = render(<ElementoPrueba />);

            getByText(container, 'arrow_upward');
        });
    });

    describe('Funcionalidad', () => {
        test('Renderiza elemento', () => {
            const { container } = render(<ElementoPrueba />);
            let miBoton = container.firstElementChild;

            fireEvent(
                miBoton,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });
    });
});
