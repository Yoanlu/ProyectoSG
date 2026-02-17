import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';

import EleEntradaFecha from './EleEntradaFecha';
import EleEntradaFechaUtilidadesPruebas from './EleEntradaFechaUtilidadesPruebas';

afterEach(cleanup);

describe('core::elements::EleEntradaFecha', () => {
    describe('Renderización', () => {
        test('Recibe entrada de fecha y se renderiza', () => {
            render(<EleEntradaFecha />);
        });

        test('Recibe el identificador en props y lo renderiza', () => {
            const { container } = render(<EleEntradaFecha identificador="Pruebas" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.identificador).toEqual('Pruebas');
        });

        test('Recibe un tipo en props y controla dicho tipo.', () => {
            const { container } = render(<EleEntradaFecha tipo="pruebas" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.tipo).toEqual('pruebas');
        });

        test('Recibe el valor en props y pone dicho valor.', () => {
            const { container } = render(<EleEntradaFecha valor="2012-12-12" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.valor).toEqual('2012-12-12');
        });

        test('Recibe el valor no fecha en props y no pone dicho valor.', () => {
            const { container } = render(<EleEntradaFecha valor="esto no es un valor fecha" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.valor).toEqual('');
        });

        test('Recibe nombre etiqueta en props y muestra un span con el label y el input', () => {
            const { container } = render(<EleEntradaFecha etiqueta="Pruebas" />);
            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.etiqueta).toEqual('Pruebas');
        });

        test('Recibe nombre de clase en props y lo establece', () => {
            const { container } = render(<EleEntradaFecha claseCss="pruebas" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.claseCss).toContain('pruebas');
        });

        test('Recibe disabled a true en props y lo desactiva', () => {
            const { container } = render(<EleEntradaFecha desactivado={true} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.desactivado).toBeTruthy();
        });

        test('Recibe disabled a falso en props y lo activa', () => {
            const { container } = render(<EleEntradaFecha desactivado={false} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.desactivado).toBeFalsy();
        });

        test('Recibe obligatorio a true en props y lo hace requerido', () => {
            const { container } = render(<EleEntradaFecha obligatorio={true} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.obligatorio).toBeTruthy();
        });

        test('Recibe obligatorio a false en props y lo hace no requerido', () => {
            const { container } = render(<EleEntradaFecha obligatorio={false} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.obligatorio).toBeFalsy();
        });

        test('Recibe validación a true y establece un estilo y un mensaje de ciertas validaciones', () => {
            const { container } = render(<EleEntradaFecha validacion={true} mensajeValidacion={'PruebaMensaje'} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.mensajeValidacion).toContain('PruebaMensaje');
        });

        test('Recibe autocompletado off', () => {
            const { container } = render(<EleEntradaFecha autocompletado={'off'} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.autocompletado).toContain('off');
        });

        test('Recibe autocompletado on', () => {
            const { container } = render(<EleEntradaFecha autocompletado={'on'} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.autocompletado).toContain('on');
        });
        test('Recibe mínimo y el elemento tiene el atributro', () => {
            const { container } = render(<EleEntradaFecha minimo="0" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.minimo).toEqual('0');
        });

        test('Recibe máximo y el elemento tiene el atributro', () => {
            const { container } = render(<EleEntradaFecha maximo="10" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.maximo).toEqual('10');
        });

        test('Recibe step y el elemento tiene el atributro', () => {
            const { container } = render(<EleEntradaFecha paso="1" />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.paso).toEqual('1');
        });

        test('Recibe un elemento en adornoIzquierdo y lo situa posicionandolo a la izquierda.', () => {
            const adornos = <div>{'adornoIzquierdo'}</div>;
            const { container } = render(<EleEntradaFecha adornoIzquierdo={adornos} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.adornoIzquierdo).toContain('adornoIzquierdo');
        });

        test('Recibe un elemento en adornoDerecho y lo situa posicionandolo a la derecha.', () => {
            const adornos = <div>{'adornoDerecho'}</div>;
            const { container } = render(<EleEntradaFecha adornoDerecho={adornos} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');
            expect(miInput.adornoDerecho).toContain('adornoDerecho');
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onChange y se lanza', () => {
            const funcionPrueba = jest.fn();

            const { container } = render(<EleEntradaFecha funcionOnChange={funcionPrueba} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');

            fireEvent.change(miInput.nodoOnChange, {
                target: { value: '2012-12-12' }
            });

            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });

        test('Recibe función onHover y se lanza', () => {
            const funcionPrueba = jest.fn();
            const { container } = render(<EleEntradaFecha etiqueta="Pruebas" funcionOnHover={funcionPrueba} />);

            const miInput = new EleEntradaFechaUtilidadesPruebas(container, 'Elemento_EntradaFecha');

            fireEvent(
                miInput.nodoOnHover,
                new MouseEvent('mouseover', {
                    bubbles: true, // hover events must bubble for React to see it
                    cancelable: true
                })
            );

            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });
    });
});
