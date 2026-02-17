import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from 'react-testing-library';
import { getConsolaMock } from '../../../UtilidadesJest';
import '../../i18n';

import CompMantenimientoContenedor from './CompMantenimientoContenedor';

afterEach(cleanup);

const consolasMock = getConsolaMock();
const PruebaMantenimiento = () => <div />;

describe('core::components::CompMantenimientoContenedor', () => {
    describe('Renderización', () => {
        test('Recibe componente mantenimiento y se renderiza', () => {
            render(
                <Router>
                    <CompMantenimientoContenedor compMantenimiento={PruebaMantenimiento} datoEnEdicion={{}} />
                </Router>
            );
        });

        test('Recibe componente mantenimiento', () => {
            render(
                <Router>
                    <CompMantenimientoContenedor compMantenimiento={PruebaMantenimiento} datoEnEdicion={{}} />
                </Router>
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledTimes(7);
        });

        test('Recibe componente con los menus de navegación y se renderiza', () => {
            render(
                <Router>
                    <CompMantenimientoContenedor compMantenimiento={PruebaMantenimiento} datoEnEdicion={{}} />
                </Router>
            );

            expect(consolasMock.FalsoError).not.toHaveBeenCalledWith(
                expect.stringMatching(/The prop `compMantenimiento` is marked as required/)
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `funcionCancelar` is marked as required/)
            );

            expect(consolasMock.FalsoError).not.toHaveBeenCalledWith(
                expect.stringMatching(/The prop `datoEnEdicion` is marked as required/)
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `funcionGuardar` is marked as required/)
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `funcionCambiaEstados` is marked as required/)
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `actualizaCambios` is marked as required/)
            );
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `hayCambios` is marked as required/)
            );
        });
    });
});
