import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-dom/extend-expect';
import { render, getByText, cleanup } from 'react-testing-library';
import '../i18n';
import CompBarraNavegacion from './CompBarraNavegacion';
import 'jest-localstorage-mock';

afterEach(cleanup);

var dameUrlDominio = () => {
    return '';
};

describe('core::components::CompBarraNavegacion', () => {
    describe('Renderización', () => {
        test('Recibe barra de navegacion y se renderiza', () => {
            render(
                <Router>
                    <CompBarraNavegacion dameUrlDominio={dameUrlDominio} />
                </Router>
            );
        });

        test('Recibe texto y se carga', () => {
            const { container } = render(
                <Router>
                    <CompBarraNavegacion texto="pagina de prueba" dameUrlDominio={dameUrlDominio} />
                </Router>
            );

            const miAppbar = getByText(container, 'pagina de prueba');
            expect(miAppbar).not.toEqual(null);
        });
    });

    describe('Funcionalidad', () => {
        /*test('Recibe función cambia idioma y se lanza', () => {
            // No se puede probar los elementos que están contenidos en un popup de Kendo.
            const spy = jest.fn();

            const { container } = render(
                <div>
                    <CompBarraNavegacion
                        funcionCambiaIdioma={spy}
                    />
                </div>
            );

            const mibotonvisible = dameKendoBotonConIcono(
                container,
                'globe-outline'
            );

            // Simulación de click en el botón para desplegar el menu de idiomas
            fireEvent(
                mibotonvisible,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );

            const containerBody = container.parentNode;
            let miPopup = dameKendoPopup(containerBody);

            let menuIngles = getByText(miPopup, 'languages.english');

            // Simulación de click en el menú de inglés
            fireEvent(
                menuIngles,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );

            expect(spy).toHaveBeenCalledTimes(1);
        });*/
    });
});
