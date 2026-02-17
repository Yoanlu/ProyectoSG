import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByText, fireEvent, queryByText, prettyDOM } from 'react-testing-library';

import i18n from '../../componentes/i18n';
import EleCalendario from './EleCalendario';
import { I18nextProvider } from 'react-i18next';

afterEach(cleanup);

let buenasProps = {
    mes: 1,
    year: 2016,
    selected: [
        {
            fecha: new Date(Date.UTC(2016, 1, 8)),
            color: 'red'
        },
        {
            fecha: new Date(Date.UTC(2016, 1, 15)),
            color: 'yellow'
        }
    ],
    funcionClick: jest.fn(),
    claseCss: 'TestCSS'
};

i18n.changeLanguage('es');

describe('core::elements::EleCalendario', () => {
    describe('Renderización', () => {
        test('Recibe propiedades correctas y se renderiza', () => {
            render(<EleCalendario {...buenasProps} />);
        });

        test('Recibe propiedades correctas de febrero en español y debe mostrar ese texto', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);

            const mes = getByText(container, 'febrero');
            expect(mes).not.toBeNull();
        });
        test('Recibe propiedades correctas de febrero en español y debe tener el dia 29', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);

            const dia = getByText(container, '29');
            expect(dia).not.toBeNull();
        });
        test('Recibe propiedades correctas de febrero en español y no debe tener el dia 30', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);

            const dia = queryByText(container, '30');
            expect(dia).toBeNull();
        });
        test('Recibe propiedades correctas de febrero en español y debe mostrar el texto l en la semana', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);

            const diaSemana = getByText(container, 'l');
            expect(diaSemana).not.toBeNull();
        });
        test('Recibe propiedades correctas de febrero en español con el dia 8/2 seleccionado en rojo', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);

            const dia = getByText(container, '8');
            expect(dia.style.background).toBe('red');
        });
        test('Recibe propiedades correctas de febrero en español con el dia 15/2 seleccionado en amarillo', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);

            const dia = getByText(container, '15');
            expect(dia.style.background).toBe('yellow');
        });
        test('Recibe propiedades correctas de febrero seleccionable y debe mostrar el cursor apropiado', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);

            const dia = getByText(container, '15');
            // expect(dia).toHaveStyle('cursor: pointer');
            // expect(dia.style.cursor).toBe('pointer');
        });
    });
    describe('Funcionalidad', () => {
        test('Recibe propiedades correctas y se llama a la función al hacer click sobre un día', () => {
            const { container } = render(<EleCalendario {...buenasProps} />);
            fireEvent(
                getByText(container, '8'),
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(buenasProps.funcionClick).toHaveBeenCalledTimes(1);
        });
    });
});
