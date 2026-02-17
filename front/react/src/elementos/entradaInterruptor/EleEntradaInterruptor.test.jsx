import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';

import EleEntradaInterruptor from './EleEntradaInterruptor';
import EleEntradaInterruptorUtilidadesPruebas from './EleEntradaInterruptorUtilidadesPruebas';

afterEach(cleanup);

describe('core::elements::EleEntradaInterruptor', () => {
    describe('Renderización', () => {
        test('Recibe entrada interruptor y se renderiza', () => {
            render(<EleEntradaInterruptor />);
        });

        test('Recibe una clase css y la aplica', () => {
            const { container } = render(<EleEntradaInterruptor claseCss="clasePrueba" />);
            const miInterruptor = new EleEntradaInterruptorUtilidadesPruebas(container, 'id_testing_etiqueta');
            expect(miInterruptor.claseCss).toContain('clasePrueba');
        });

        test('Recibe nombre etiqueta en props y la recibe', () => {
            const { container } = render(<EleEntradaInterruptor etiqueta="Pruebas" />);
            const miInterruptor = new EleEntradaInterruptorUtilidadesPruebas(container, 'id_testing_etiqueta');
            expect(miInterruptor.etiqueta).toEqual('Pruebas');
        });

        test('Recibe desactivado a true en props y el componente está inactivo', () => {
            const { container } = render(<EleEntradaInterruptor desactivado={true} />);

            const miInterruptor = new EleEntradaInterruptorUtilidadesPruebas(container, 'id_testing_etiqueta');

            expect(miInterruptor.desactivado).toContain('MuiFormControlLabel-disabled');
        });

        test('Recibe desactivado a false en props el componente está desactivado', () => {
            const { container } = render(<EleEntradaInterruptor desactivado={false} />);

            const miInterruptor = new EleEntradaInterruptorUtilidadesPruebas(container, 'id_testing_etiqueta');
            expect(miInterruptor.desactivado).not.toContain('MuiFormControlLabel-disabled');
        });

        test('Recibe ubicacion de etiqueta en props el componente tiene la etiqueta ubicada', () => {
            const { container } = render(<EleEntradaInterruptor ubicacionEtiqueta={'top'} />);

            const miInterruptor = new EleEntradaInterruptorUtilidadesPruebas(container, 'id_testing_etiqueta');
            expect(miInterruptor.ubicacionEtiqueta).toContain('labelPlacementTop');
        });

        test('Recibe chequeado a true en props el componente está chequeado', () => {
            const { container } = render(<EleEntradaInterruptor chequeado={true} />);

            const miInterruptor = new EleEntradaInterruptorUtilidadesPruebas(container, 'id_testing_elemento');
            expect(miInterruptor.chequeado).toContain('MuiSwitch-checked');
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onChange y se lanza', () => {
            const funcionEspia = jest.fn();
            const { container } = render(<EleEntradaInterruptor funcionOnChange={funcionEspia} />);
            const miInterruptor = new EleEntradaInterruptorUtilidadesPruebas(container, 'id_testing_elemento');

            fireEvent(
                miInterruptor.nodoChange,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );

            expect(funcionEspia).toHaveBeenCalledTimes(1);
        });
    });
});
