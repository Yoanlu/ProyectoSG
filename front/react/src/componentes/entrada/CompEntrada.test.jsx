import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import '../i18n';

import CompEntrada from './CompEntrada';

afterEach(cleanup);

describe('core::elements::CompEntrada', () => {
    describe('Renderización', () => {
        test('Recibe entrada de texto y se renderiza', () => {
            render(<CompEntrada tipoEntrada={'EntradaTexto'} />);
        });

        test('Recibe entrada de número y se renderiza', () => {
            render(<CompEntrada tipoEntrada={'EntradaNumero'} />);
        });

        test('Recibe entrada de fecha y se renderiza', () => {
            render(<CompEntrada tipoEntrada={'EntradaFecha'} />);
        });
    });
});
