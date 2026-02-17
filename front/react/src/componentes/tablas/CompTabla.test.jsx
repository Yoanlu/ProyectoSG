import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByText } from 'react-testing-library';
import '../i18n';

import CompTabla from './CompTabla';

afterEach(cleanup);

const pruebaColumnas = [
    {
        campo: 'prueba',
        titulo: 'prueba'
    }
];

const pruebaFilas = [
    {
        prueba: 'prueba primera'
    }
];

describe('core::components::CompTabla', () => {
    describe('Renderización', () => {
        test('Recibe lista', () => {
            render(<CompTabla columnas={pruebaColumnas} filas={[]} />);
        });

        test('Recibe lista con datos', () => {
            const { container } = render(<CompTabla columnas={pruebaColumnas} filas={pruebaFilas} />);

            getByText(container, 'prueba primera');
        });
    });
});
