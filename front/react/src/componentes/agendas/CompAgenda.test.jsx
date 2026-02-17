import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup, getByText, queryByText } from 'react-testing-library';

import CompAgenda from './CompAgenda';
import i18n from '../i18n';

afterEach(cleanup);

i18n.changeLanguage('es');

let buenasProps = {
    mesInicial: new Date('2000-02-01'),
    eventos: []
};

describe('core::components::CompAgenda', () => {
    describe('Renderización', () => {
        test('Recibe propiedades correctas y se renderiza', () => {
            render(<CompAgenda {...buenasProps} />);
        });

        test('Recibe propiedades correctas de 2000 en español y debe mostrar ese texto', () => {
            const { container } = render(<CompAgenda {...buenasProps} />);

            getByText(container, 'febrero 2000');
        });

        test('Recibe propiedades correctas de 2000 en español y debe mostrar el texto de los días de la semana', () => {
            const { container } = render(<CompAgenda {...buenasProps} />);

            getByText(container, 'lunes');
            getByText(container, 'martes');
            getByText(container, 'miércoles');
            getByText(container, 'jueves');
            getByText(container, 'viernes');
            getByText(container, 'sábado');
            getByText(container, 'domingo');
        });

        test('Recibe propiedades correctas de 2000 en español y debe tener el dia 29 pero no el 30 de febrero', () => {
            const { container } = render(<CompAgenda {...buenasProps} />);

            getByText(container, '29');
            let dia30 = queryByText(container, '30');
            expect(dia30).toBeNull();
        });
    });
});
