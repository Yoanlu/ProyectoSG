import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByValue } from 'react-testing-library';
import i18n from '../i18n';
import CompEntradaFichero from './CompEntradaFichero';

i18n.changeLanguage('es');

afterEach(cleanup);

describe('core::components::CompEntradaFichero', () => {
    describe('Renderización', () => {
        test('Recibe entrada de fichero y se renderiza', () => {
            render(<CompEntradaFichero nombre="prueba_fichero" valor="" />);
        });

        test('Recibe valor y se muestra', () => {
            const { container } = render(
                <CompEntradaFichero nombre="etiqueta_fichero" valor="valor_fichero" nombreFichero="nombre_fichero" />
            );

            getByValue(container, 'nombre_fichero');
        });
    });
});
