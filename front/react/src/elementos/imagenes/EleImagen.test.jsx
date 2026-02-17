import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';

import EleImagen from './EleImagen';
import EleImagenUtilidadesPruebas from './EleImagenUtilidadesPruebas';

afterEach(cleanup);

describe('core::elements::EleImagen', () => {
    describe('Renderización', () => {
        test('Recibe un EleImagen y se renderiza', () => {
            render(<EleImagen />);
        });

        test('Recibe una imagen y la muestra', () => {
            const { container } = render(<EleImagen textoAlternativo={'TextAlt'} imagen="Prueba" />);

            const miComponente = new EleImagenUtilidadesPruebas(container, 'TextAlt');
            expect(miComponente.imagen).toEqual('http://localhost/Prueba');
        });

        test('Recibe un texto alternativo en props y se comprueba que no es nulo', () => {
            const { container } = render(<EleImagen textoAlternativo={'TextAlt'} />);

            const miComponente = new EleImagenUtilidadesPruebas(container, 'TextAlt');
            expect(miComponente.textoAlternativo).not.toEqual(null);
        });

        test('Recibe un texto alternativo en props y lo muestra al no tener imagen', () => {
            const { container } = render(<EleImagen textoAlternativo={'TextAlt'} />);

            const miComponente = new EleImagenUtilidadesPruebas(container, 'TextAlt');
            expect(miComponente.textoAlternativo).toEqual('TextAlt');
        });

        test('Recibe una clasecss en props y la establece el elemento ', () => {
            const { container } = render(<EleImagen claseCss="Pruebas" textoAlternativo={'TextAlt'} />);

            const miComponente = new EleImagenUtilidadesPruebas(container, 'TextAlt');
            expect(miComponente.claseCss).toContain('Pruebas');
        });

        test('Recibe un ancho y lo establece.', () => {
            const { container } = render(<EleImagen textoAlternativo={'TextAlt'} ancho={12} />);

            const miComponente = new EleImagenUtilidadesPruebas(container, 'TextAlt');
            expect(miComponente.ancho).toEqual(12);
        });

        test('Recibe un alto y lo establece.', () => {
            const { container } = render(<EleImagen textoAlternativo={'TextAlt'} alto={12} />);

            const miComponente = new EleImagenUtilidadesPruebas(container, 'TextAlt');
            expect(miComponente.alto).toEqual(12);
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onClick y se lanza', () => {
            const funcionPrueba = jest.fn();
            const { container } = render(<EleImagen textoAlternativo={'TextAlt'} funcionOnClick={funcionPrueba} />);

            const miComponente = new EleImagenUtilidadesPruebas(container, 'TextAlt');

            fireEvent(
                miComponente.nodoClick,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });
    });
});
