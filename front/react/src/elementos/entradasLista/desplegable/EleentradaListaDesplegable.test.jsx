import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import EleEntradaListaDesplegable from './EleEntradaListaDesplegable';
import EleEntradaListaDesplegableUtilidadesPruebas from './EleEntradaListaDesplegableUtilidadesPruebas';

afterEach(cleanup);

const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }, { id: 4, text: 'Dato4' }];

describe('core::elements::EleEntradaListaDesplegable', () => {
    describe('Renderización', () => {
        test('Recibe entrada lista y se renderiza', () => {
            render(<EleEntradaListaDesplegable datos={datos} />);
        });

        test('Recibe nombre en props y muestra un nombre', () => {
            const { container } = render(<EleEntradaListaDesplegable datos={datos} nombre="Prueba" />);
            const miDesplegable = new EleEntradaListaDesplegableUtilidadesPruebas(container);
            expect(miDesplegable.nombre).toEqual('Prueba');
        });

        test('Recibe nombre etiqueta en props y muestra un span con el label', () => {
            const { container } = render(<EleEntradaListaDesplegable datos={datos} etiqueta="Pruebas" />);
            const miDesplegable = new EleEntradaListaDesplegableUtilidadesPruebas(container);
            expect(miDesplegable.etiqueta).toContain('Pruebas');
        });

        test('Recibe clase css en props y muestra un span con el label', () => {
            const { container } = render(<EleEntradaListaDesplegable datos={datos} claseCss="Pruebas" />);

            const miDesplegable = new EleEntradaListaDesplegableUtilidadesPruebas(container);
            expect(miDesplegable.claseCss).toContain('Pruebas');
        });

        test('Recibe un valor los pinta.', () => {
            const { container } = render(<EleEntradaListaDesplegable datos={datos} idSeleccionado={1} />);

            const miDesplegable = new EleEntradaListaDesplegableUtilidadesPruebas(container);
            expect(miDesplegable.valor).toEqual('Dato1');
        });
    });
});
