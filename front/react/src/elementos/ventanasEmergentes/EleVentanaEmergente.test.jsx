import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

import EleVentanaEmergente from './EleVentanaEmergente';
import { getConsolaMock } from '../../UtilidadesJest';
import EleVentanaEmergenteUtilidadesPruebas from './EleVentanaEmergenteUtilidadesPruebas';
import '../../componentes/i18n';

const consolasMock = getConsolaMock();

afterEach(cleanup);

describe('core::elements::EleVentanaEmergente', () => {
    describe('Renderización', () => {
        test('Recibe elemento ventana emergente y se renderiza', () => {
            render(<EleVentanaEmergente mostrarError={true} funcionCerrarVentana={() => {}} mensaje="" titulo="" />);
        });

        test('Recibe titulo en props y lo muestra', () => {
            const { container } = render(
                <EleVentanaEmergente
                    desactivarPortal={true}
                    mostrarError={true}
                    funcionCerrarVentana={() => {}}
                    mensaje=""
                    titulo="Pruebas"
                />
            );
            const miVentana = new EleVentanaEmergenteUtilidadesPruebas(container, 'Pruebas');
            expect(miVentana.titulo).toEqual('Pruebas');
        });

        test('Recibe mensaje en props y lo muestra', () => {
            const { container } = render(
                <EleVentanaEmergente
                    desactivarPortal={true}
                    mostrarError={true}
                    funcionCerrarVentana={() => {}}
                    mensaje="Pruebas"
                    titulo=""
                />
            );
            const miVentana = new EleVentanaEmergenteUtilidadesPruebas(container, 'Pruebas');
            expect(miVentana.mensaje).toEqual('Pruebas');
        });

        test('Recibe una clase css y la aplica', () => {
            const { container } = render(
                <EleVentanaEmergente
                    desactivarPortal={true}
                    mostrarError={true}
                    funcionCerrarVentana={() => {}}
                    mensaje="clasePrueba"
                    titulo=""
                    claseCss="clasePrueba"
                />
            );

            const miVentana = new EleVentanaEmergenteUtilidadesPruebas(container, 'clasePrueba', 'css');
            expect(miVentana.claseCss).toContain('clasePrueba');
        });

        test('Recibe elemento sin titulo y se muestra el error', () => {
            render(
                <EleVentanaEmergente
                    desactivarPortal={true}
                    mostrarError={true}
                    funcionCerrarVentana={() => {}}
                    mensaje=""
                />
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `titulo` is marked as required/)
            );
        });

        test('Recibe elemento sin mensaje y se muestra el error', () => {
            render(
                <EleVentanaEmergente
                    desactivarPortal={true}
                    mostrarError={true}
                    funcionCerrarVentana={() => {}}
                    titulo=""
                />
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `mensaje` is marked as required/)
            );
        });

        test('Recibe elemento sin funcionCerrarVentana y se muestra el error', () => {
            render(<EleVentanaEmergente desactivarPortal={true} mostrarError={true} mensaje="" titulo="" />);

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `funcionCerrarVentana` is marked as required/)
            );
        });
    });

    describe('Funcionalidad', () => {
        test('Se pulsa sobre "CERRAR" y la ventana se cierra', () => {
            const spy = jest.fn();

            const { container } = render(
                <EleVentanaEmergente
                    desactivarPortal={true}
                    mostrarError={true}
                    textoBoton="boton"
                    funcionCerrarVentana={spy}
                    mensaje=""
                    titulo=""
                />
            );

            const miVentana = new EleVentanaEmergenteUtilidadesPruebas(container, 'boton');

            fireEvent(
                miVentana.nodoClick,

                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
