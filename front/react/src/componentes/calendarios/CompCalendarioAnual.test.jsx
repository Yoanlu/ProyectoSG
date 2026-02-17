import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByText, queryByText } from 'react-testing-library';

import CompCalendarioAnual from './CompCalendarioAnual';

import i18n from '../i18n';

afterEach(cleanup);

i18n.changeLanguage('es');

let buenasProps = {
    year: 2016,
    funcionActualizaDiasSeleccionados: jest.fn(),
    claseCss: 'TestCSSClass',
    color: 'blue',
    seleccionable: true
};

describe('core::elements::EleCalendario', () => {
    describe('Renderización', () => {
        test('Recibe propiedades correctas y se renderiza', () => {
            render(<CompCalendarioAnual {...buenasProps} />);
        });
        test('Recibe propiedades correctas de 2016 en español y debe mostrar ese texto', () => {
            const { container } = render(<CompCalendarioAnual {...buenasProps} />);

            const year = getByText(container, '2016');
            expect(year).not.toBeNull();
        });
        test('Recibe propiedades correctas de 2016 en español y debe mostrar el texto de los meses', () => {
            const { container } = render(<CompCalendarioAnual {...buenasProps} />);

            let mes = getByText(container, 'enero');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'febrero');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'marzo');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'abril');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'mayo');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'junio');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'julio');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'agosto');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'septiembre');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'octubre');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'noviembre');
            expect(mes).not.toBeNull();
            mes = getByText(container, 'diciembre');
            expect(mes).not.toBeNull();
        });
        test('Recibe propiedades correctas de 2016 en español y no debe tener el dia 30 de febrero', () => {
            const { container } = render(<CompCalendarioAnual {...buenasProps} />);

            const mes = getByText(container, 'febrero');
            const dia = queryByText(mes.parentNode, '30');
            expect(dia).toBeNull();
        });
    });
    describe('Funcionalidad', () => {
        /*test('Recibe propiedades correctas y se pinta un día del color recibido al hacer click', () => {
            const { container } = render(<CompCalendarioAnual {...buenasProps} />);
            const mes = getByText(container, 'febrero');
            const dia = getByText(mes.parentNode, '8');
            fireEvent(
                dia,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(dia).toHaveStyle('border-bottom-color: blue');
            expect(dia).toHaveStyle('border-top-color: blue');
            expect(dia).toHaveStyle('border-left-color: blue');
            expect(dia).toHaveStyle('border-rigth-color: blue');
            expect(dia.style.borderColor).toBe('blue');
        });*/
    });
});
