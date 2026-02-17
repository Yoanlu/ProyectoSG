import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';

import EleEntradaNumero from './EleEntradaNumero';
import EleEntradaNumeroUtilidadesPruebas from './EleEntradaNumeroUtilidadesPruebas';
import '../../componentes/i18n';

afterEach(cleanup);

describe('core::elements::EleEntradaNumero', () => {
    describe('Renderización', () => {
        test('Recibe entrada de Número y se renderiza', () => {
            render(<EleEntradaNumero />);
        });

        test('Recibe el identificador en props y lo renderiza', () => {
            const { container } = render(<EleEntradaNumero identificador="Pruebas" />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');

            expect(miInput.identificador).toEqual('Pruebas');
        });

        test('Recibe el valor en props y pone dicho valor.', () => {
            const { container } = render(<EleEntradaNumero valor="25" />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.valor).toEqual('25');
        });

        test('Recibe el valor no numérico en props y no pone dicho valor.', () => {
            const { container } = render(<EleEntradaNumero valor="esto no es un valor numérico" />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.valor).toEqual('');
        });

        test('Recibe nombre etiqueta en props y muestra un span con el label y el input', () => {
            const { container } = render(<EleEntradaNumero etiqueta="Pruebas" />);
            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.etiqueta).toEqual('Pruebas');
        });

        test('Recibe nombre de clase en props y lo establece', () => {
            const { container } = render(<EleEntradaNumero claseCss="pruebas" />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.claseCss).toContain('pruebas');
        });

        test('Recibe disabled a true en props y lo desactiva', () => {
            const { container } = render(<EleEntradaNumero desactivado={true} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.desactivado).toBeTruthy();
        });

        test('Recibe disabled a falso en props y lo activa', () => {
            const { container } = render(<EleEntradaNumero desactivado={false} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.desactivado).toBeFalsy();
        });

        test('Recibe obligatorio a true en props y lo hace requerido', () => {
            const { container } = render(<EleEntradaNumero obligatorio={true} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.obligatorio).toBeTruthy();
        });

        test('Recibe obligatorio a false en props y lo hace no requerido', () => {
            const { container } = render(<EleEntradaNumero obligatorio={false} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.obligatorio).toBeFalsy();
        });

        test('Recibe validación a true y establece un estilo y un mensaje de ciertas validaciones', () => {
            const { container } = render(<EleEntradaNumero validacion={true} mensajeValidacion={'PruebaValidacion'} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.mensajeValidacion).toContain('PruebaValidacion');
        });

        test('Recibe autocompletado off', () => {
            const { container } = render(<EleEntradaNumero autocompletado={'off'} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.autocompletado).toContain('off');
        });

        test('Recibe autocompletado on', () => {
            const { container } = render(<EleEntradaNumero autocompletado={'on'} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.autocompletado).toContain('on');
        });

        test('Recibe mínimo y el elemento tiene el atributro', () => {
            const { container } = render(<EleEntradaNumero minimo={0} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.minimo).toEqual('0');
        });

        test('Recibe máximo y el elemento tiene el atributro', () => {
            const { container } = render(<EleEntradaNumero maximo={10} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.maximo).toEqual('10');
        });

        test('Recibe máximo y el elemento tiene el atributro', () => {
            const { container } = render(<EleEntradaNumero paso="1" />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');
            expect(miInput.paso).toEqual('1');
        });

        test('Recibe un elemento en adornoIzquierdo y lo situa posicionandolo a la izquierda.', () => {
            const adornos = <div>{'adornoIzquierdo'}</div>;
            const { container } = render(<EleEntradaNumero adornoIzquierdo={adornos} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero', 'adorno');

            expect(miInput.adornoIzquierdo).toContain('adornoIzquierdo');
        });

        test('Recibe un elemento en adornoDerecho y lo situa posicionandolo a la derecha.', () => {
            const adornos = <div>{'adornoDerecho'}</div>;
            const { container } = render(<EleEntradaNumero adornoDerecho={adornos} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero', 'adorno');
            expect(miInput.adornoDerecho).toContain('adornoDerecho');
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onChange y se lanza', () => {
            const funcionPrueba = jest.fn();

            const { container } = render(<EleEntradaNumero funcionOnChange={funcionPrueba} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');

            fireEvent.change(miInput.nodoOnChange, {
                target: { value: '2' }
            });

            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });

        test('Recibe función onHover y se lanza', () => {
            const funcionPrueba = jest.fn();
            const { container } = render(<EleEntradaNumero etiqueta="Pruebas" funcionOnHover={funcionPrueba} />);

            const miInput = new EleEntradaNumeroUtilidadesPruebas(container, 'Elemento_EntradaNumero');

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
