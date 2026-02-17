import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';

import EleEntradaTexto from './EleEntradaTexto';
import EleEntradaTextoUtilidadesPruebas from './EleEntradaTextoUtilidadesPruebas';

afterEach(cleanup);

describe('core::elements::EleEntradaTexto', () => {
    describe('Renderización', () => {
        test('Recibe entrada de texto y se renderiza', () => {
            render(<EleEntradaTexto />);
        });

        test('Recibe el identificador en props y lo renderiza', () => {
            const { container } = render(<EleEntradaTexto identificador="Pruebas" />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.identificador).toEqual('Pruebas');
        });

        test('Recibe un tipo en props y controla dicho tipo.', () => {
            const { container } = render(<EleEntradaTexto tipo="pruebas" />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.tipo).toEqual('pruebas');
        });

        test('Recibe el valor en props y pone dicho valor.', () => {
            const { container } = render(<EleEntradaTexto valor="Pruebas" />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.valor).toEqual('Pruebas');
        });

        test('Recibe nombre etiqueta en props y muestra un span con el label y el input', () => {
            const { container } = render(<EleEntradaTexto etiqueta="Pruebas" />);
            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.etiqueta).toEqual('Pruebas');
        });

        test('Recibe nombre de clase en props y lo establece', () => {
            const { container } = render(<EleEntradaTexto claseCss="pruebas" />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.claseCss).toContain('pruebas');
        });

        test('Recibe disabled a true en props y lo desactiva', () => {
            const { container } = render(<EleEntradaTexto desactivado={true} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.desactivado).toBeTruthy();
        });

        test('Recibe disabled a falso en props y lo activa', () => {
            const { container } = render(<EleEntradaTexto desactivado={false} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.desactivado).toBeFalsy();
        });

        test('Recibe obligatorio a true en props y lo hace requerido', () => {
            const { container } = render(<EleEntradaTexto obligatorio={true} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.obligatorio).toBeTruthy();
        });

        test('Recibe obligatorio a false en props y lo hace no requerido', () => {
            const { container } = render(<EleEntradaTexto obligatorio={false} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.obligatorio).toBeFalsy();
        });

        test('Recibe validación a true y establece un estilo y un mensaje de ciertas validaciones', () => {
            const { container } = render(<EleEntradaTexto validacion={true} mensajeValidacion={'PruebaValidacion'} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.mensajeValidacion).toContain('PruebaValidacion');
        });

        test('Recibe autocompletado off', () => {
            const { container } = render(<EleEntradaTexto autocompletado={'off'} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.autocompletado).toContain('off');
        });

        test('Recibe autocompletado on', () => {
            const { container } = render(<EleEntradaTexto autocompletado={'on'} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.autocompletado).toContain('on');
        });

        test('Recibe multineas a true y lo convierte en textarea', () => {
            const { container } = render(<EleEntradaTexto multilineas={true} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.multilinea).toContain('multiline');
        });

        test('Recibe un elemento en adornoIzquierdo y lo situa posicionandolo a la izquierda.', () => {
            const adornos = <div>{'adornoIzquierdo'}</div>;
            const { container } = render(<EleEntradaTexto adornoIzquierdo={adornos} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.adornoIzquierdo).toContain('adornoIzquierdo');
        });

        test('Recibe un elemento en adornoDerecho y lo situa posicionandolo a la derecha.', () => {
            const adornos = <div>{'adornoDerecho'}</div>;
            const { container } = render(<EleEntradaTexto adornoDerecho={adornos} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');
            expect(miInput.adornoDerecho).toContain('adornoDerecho');
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onChange y se lanza', () => {
            const funcionPrueba = jest.fn();

            const { container } = render(<EleEntradaTexto funcionOnChange={funcionPrueba} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');

            fireEvent.change(miInput.nodoOnChange, {
                target: { value: 'valor de Prueba' }
            });

            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });

        test('Recibe función onHover y se lanza', () => {
            const funcionPrueba = jest.fn();
            const { container } = render(<EleEntradaTexto etiqueta="Pruebas" funcionOnHover={funcionPrueba} />);

            const miInput = new EleEntradaTextoUtilidadesPruebas(container, 'Elemento_EntradaTexto');

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
