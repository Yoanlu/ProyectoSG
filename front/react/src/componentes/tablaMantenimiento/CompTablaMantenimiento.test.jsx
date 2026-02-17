import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import '../i18n';

import CompTablaMantenimiento from './CompTablaMantenimiento';
import CompTablaMantenimientoUtilidadesPruebas from './CompTablaMantenimientoUtilidadesPruebas';

afterEach(cleanup);

const pruebaCabeceras = [
    {
        campo: 'prueba',
        titulo: 'prueba'
    }
];

describe('core::components::CompTablaMantenimiento', () => {
    describe('Renderización', () => {
        test('Recibe lista', () => {
            render(<CompTablaMantenimiento columnas={pruebaCabeceras} filas={[]} />);
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe añadir a false y no muestra el boton de añadir', () => {
            const { container } = render(
                <CompTablaMantenimiento añadir={false} columnas={pruebaCabeceras} filas={[]} />
            );

            const miLista = new CompTablaMantenimientoUtilidadesPruebas(container);

            expect(miLista.botonAñadir).toBeUndefined();
        });

        test('Recibe añadir a true y muestra el boton de añadir', () => {
            const { container } = render(
                <CompTablaMantenimiento añadir={true} columnas={pruebaCabeceras} filas={[]} />
            );

            const miLista = new CompTablaMantenimientoUtilidadesPruebas(container);

            expect(miLista.botonAñadir).toBeDefined();
        });

        test('Recibe modificar a false y no muestra el boton de modificar', () => {
            const { container } = render(
                <CompTablaMantenimiento modificar={false} columnas={pruebaCabeceras} filas={[]} />
            );

            const miLista = new CompTablaMantenimientoUtilidadesPruebas(container);

            expect(miLista.botonModificar).toBeUndefined();
            expect(miLista.botonConsultar).toBeDefined();
        });

        test('Recibe modificar a true y muestra el boton de modificar', () => {
            const { container } = render(
                <CompTablaMantenimiento modificar={true} columnas={pruebaCabeceras} filas={[]} />
            );

            const miLista = new CompTablaMantenimientoUtilidadesPruebas(container);

            expect(miLista.botonModificar).toBeDefined();
            expect(miLista.botonConsultar).toBeUndefined();
        });

        test('Recibe eliminar a false y no muestra el boton de eliminar', () => {
            const { container } = render(
                <CompTablaMantenimiento eliminar={false} columnas={pruebaCabeceras} filas={[]} />
            );

            const miLista = new CompTablaMantenimientoUtilidadesPruebas(container);

            expect(miLista.botonEliminar).toBeUndefined();
        });

        test('Recibe eliminar a true y muestra el boton de eliminar', () => {
            const { container } = render(
                <CompTablaMantenimiento eliminar={true} columnas={pruebaCabeceras} filas={[]} />
            );

            const miLista = new CompTablaMantenimientoUtilidadesPruebas(container);

            expect(miLista.botonEliminar).toBeDefined();
        });
    });
});
