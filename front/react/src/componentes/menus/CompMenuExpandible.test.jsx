import React from 'react';
import 'jest-dom/extend-expect';
import { render, getByText, fireEvent, cleanup } from 'react-testing-library';
import '../i18n';

import CompMenuExpandible from './CompMenuExpandible';

afterEach(cleanup);

describe('core::components::CompMenuExpandible', () => {
    describe('Renderización', () => {
        test('Recibe menu lateral y se renderiza', () => {
            let pruebaNav = [
                {
                    titulo: 'algo'
                }
            ];

            render(<CompMenuExpandible funcionOnSelect={() => {}} opcionesMenu={pruebaNav} />);
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe las opciones del menu en props y las muestra', () => {
            const spy = jest.fn();

            const opcionesPrueba = [
                {
                    titulo: 'Menu prueba con onclick',
                    desactivado: false,
                    ruta: '/login'
                }
            ];

            const { container } = render(<CompMenuExpandible funcionOnSelect={spy} opcionesMenu={opcionesPrueba} />);

            const menuOnclick = getByText(container, 'Menu prueba con onclick');

            fireEvent(
                menuOnclick,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('Recibe la función de traducción y la usa', () => {
            const opcionesPrueba = [
                {
                    titulo: 'Menu prueba'
                }
            ];

            const spy = jest.fn();

            render(<CompMenuExpandible funcionOnSelect={() => {}} opcionesMenu={opcionesPrueba} />);

            expect(spy).toHaveBeenCalledTimes(0);
        });
    });
});
