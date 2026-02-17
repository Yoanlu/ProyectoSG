import React from 'react';
import { render, cleanup, getByText } from 'react-testing-library';
import { getConsolaMock } from '../../UtilidadesJest';

import '../../componentes/i18n.js';

import EleMenuLista from './EleMenuLista';

const consolasMock = getConsolaMock();

afterEach(cleanup);

class ErrorBoundaryDatos extends React.Component {
    componentDidCatch() {
        this.props.funcionError();
    }

    render() {
        return <EleMenuLista campoClave={'id'} campoVisible={'text'} funcionOnClick={() => {}} />;
    }
}

describe('core::components::EleMenuLista', () => {
    describe('Renderización', () => {
        const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];

        test('Recibe todos los campos requeridos y lo renderiza', () => {
            render(<EleMenuLista datos={datos} campoClave={'id'} campoVisible={'text'} funcionOnClick={() => {}} />);
        });

        test('Recibe no recibe datos y da un error', () => {
            const spy = jest.fn();
            render(<ErrorBoundaryDatos funcionError={spy} />);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('Recibe campoVisible en props y muestra un nombre', () => {
            const { container } = render(<EleMenuLista datos={datos} campoVisible={'text'} />);

            const miMenu = getByText(container, 'Dato1');
            const miMenu2 = getByText(container, 'Dato2');
            const miMenu3 = getByText(container, 'Dato3');

            expect(miMenu).not.toEqual(null);
            expect(miMenu2).not.toEqual(null);
            expect(miMenu3).not.toEqual(null);
        });

        test('Recibe componente sin campoClave obligatorios y muestra fallo', () => {
            render(<EleMenuLista datos={datos} />);

            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `campoClave` is marked as required/)
            );
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `campoVisible` is marked as required/)
            );
        });
    });
});
