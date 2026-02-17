import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, fireEvent } from 'react-testing-library';
import '../i18n';

import CompLista from './CompLista';
import CompListaUtilidadesPruebas from './CompListaUtilidadesPruebas';

afterEach(cleanup);

const pruebaMant = () => <div />;
const pruebaCabeceras = [
    {
        campo: 'prueba',
        titulo: 'prueba'
    }
];

describe('core::components::CompLista', () => {
    describe('Renderización', () => {
        test('Recibe lista', () => {
            render(
                <CompLista
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );
        });

        test('Recibe lista con filtro', async () => {
            const { container } = await render(
                <CompLista
                    cabecera={pruebaCabeceras}
                    listaFiltrable={true}
                    datos={[{ prueba: 'es una prueba' }]}
                    datoEnEdicion={{}}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);
            expect(miLista.primerFiltro).not.toBeNull();
        });

        test('Recibe lista sin filtro', () => {
            const { container } = render(
                <CompLista
                    cabecera={pruebaCabeceras}
                    listaFiltrable={false}
                    datos={[]}
                    datoEnEdicion={{}}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);
            expect(miLista.primerFiltro).toBeNull();
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función recuperar lista y se llama de inicio', () => {
            const funcionRecuperar = jest.fn();

            render(
                <CompLista
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={funcionRecuperar}
                    componenteMantenimiento={pruebaMant}
                />
            );

            expect(funcionRecuperar).toHaveBeenCalledTimes(1);
        });

        test('Recibe función recuperar lista, se pulsa sobre refrescar y se refresca', async () => {
            const funcionRecuperar = jest.fn();

            const { container } = await render(
                <CompLista
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={funcionRecuperar}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);

            fireEvent(
                miLista.botonRecuperar,
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true
                })
            );

            expect(funcionRecuperar).toHaveBeenCalledTimes(2);
        });

        test('Recibe añadir a false y no muestra el boton de añadir', () => {
            const { container } = render(
                <CompLista
                    añadir={false}
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);

            expect(miLista.botonAñadir).toBeUndefined();
        });

        test('Recibe añadir a true y muestra el boton de añadir', async () => {
            const { container } = await render(
                <CompLista
                    añadir={true}
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);

            expect(miLista.botonAñadir).toBeDefined();
        });

        test('Recibe modificar a false y no muestra el boton de modificar', async () => {
            const { container } = await render(
                <CompLista
                    modificar={false}
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);

            expect(miLista.botonModificar).toBeUndefined();
            expect(miLista.botonConsultar).toBeDefined();
        });

        test('Recibe modificar a true y muestra el boton de modificar', async () => {
            const { container } = await render(
                <CompLista
                    modificar={true}
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);

            expect(miLista.botonModificar).toBeDefined();
            expect(miLista.botonConsultar).toBeUndefined();
        });

        test('Recibe eliminar a false y no muestra el boton de eliminar', () => {
            const { container } = render(
                <CompLista
                    eliminar={false}
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);

            expect(miLista.botonEliminar).toBeUndefined();
        });

        test('Recibe eliminar a true y muestra el boton de eliminar', async () => {
            const { container } = await render(
                <CompLista
                    eliminar={true}
                    datos={[]}
                    datoEnEdicion={{}}
                    cabecera={[]}
                    funcionRecuperarLista={() => {}}
                    componenteMantenimiento={pruebaMant}
                />
            );

            const miLista = new CompListaUtilidadesPruebas(container);

            expect(miLista.botonEliminar).toBeDefined();
        });
    });
});
