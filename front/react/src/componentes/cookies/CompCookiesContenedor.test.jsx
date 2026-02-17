import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import '../i18n';

import CompCookiesContenedor from './CompCookiesContenedor';

afterEach(cleanup);

describe('core::elements::CompCookiesContenedor', () => {
    describe('Renderización', () => {
        test('Recibe Animación contenedor y se renderiza', () => {
            render(
                <Router>
                    <CompCookiesContenedor />
                </Router>
            );
        });
    });
});
