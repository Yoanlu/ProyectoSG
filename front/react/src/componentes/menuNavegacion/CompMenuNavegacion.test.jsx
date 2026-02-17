import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { getConsolaMock } from '../../UtilidadesJest';
import '../i18n';

import CompMenuNavegacion from './CompMenuNavegacion';

const consolasMock = getConsolaMock();
const datosPerfil = {
    fotoUsuario: null,
    dameFoto: () => {}
};

var dameUrlDominio = () => {
    return '';
};

const construyeMenu = () => {
    return [];
};

afterEach(cleanup);

describe('core::components::CompMenuNavegacion', () => {
    describe('Renderización', () => {
        test('Recibe componente con los menus de navegación y se renderiza', () => {
            render(
                <Router>
                    <CompMenuNavegacion
                        dameUrlDominio={dameUrlDominio}
                        construyeMenu={construyeMenu}
                        actualizarPerfil={datosPerfil}
                    />
                </Router>
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledTimes(2);
        });

        test('Recibe componente sin campos obligatorios y muestra fallo', () => {
            render(
                <Router>
                    <CompMenuNavegacion
                        dameUrlDominio={dameUrlDominio}
                        construyeMenu={construyeMenu}
                        actualizarPerfil={datosPerfil}
                    />
                </Router>
            );

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `children` is marked as required/)
            );
        });
    });
});
