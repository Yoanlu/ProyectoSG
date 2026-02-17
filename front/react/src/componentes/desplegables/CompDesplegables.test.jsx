import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import CompDesplegable from './CompDesplegable';

afterEach(cleanup);

class ErrorBoundaryDatos extends React.Component {
    componentDidCatch() {
        this.props.funcionError();
    }

    render() {
        return <CompDesplegable tipoDesplegable={'desplegable'} />;
    }
}

describe('core::elements::CompDesplegable', () => {
    describe('Renderización', () => {
        test('Recibe entrada de datos y se renderiza', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            render(<CompDesplegable datos={datos} tipoDesplegable={'desplegable'} idSeleccionado={1} />);
        });

        test('Recibe entrada de datos y se renderiza', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];

            render(<CompDesplegable datos={datos} tipoDesplegable={'multiseleccion'} />);
        });

        test('Recibe no recibe datos y da un error', () => {
            const funcionPrueba = jest.fn();
            render(<ErrorBoundaryDatos funcionError={funcionPrueba} />);
            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });
    });
});
