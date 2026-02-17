import React from 'react';
import { render, cleanup, getByText } from 'react-testing-library';
import '../i18n';

import { vistaContenedor } from './CompVistaContenedor';

const textoVistaPrueba = 'prueba vista con hoc';
class MiVista extends React.Component {
    funcionPeticion = () => {
        let llamada = {
            error: true,
            codigo: 400,
            respuesta: {
                problema: 'En esta prueba doy fallo',
                otroProblema: 'Este es por hacer la broma'
            }
        };

        this.props.funcionControlPeticion(llamada);
    };

    render() {
        return (
            <div>
                {textoVistaPrueba}
                <button onClick={this.funcionPeticion}>prueba peticion</button>
            </div>
        );
    }
}

afterEach(cleanup);

describe('core::components::CompVistaContenedor', () => {
    describe('Renderización', () => {
        test('Recibe componente vista contenedor y se renderiza', () => {
            const PruebaVistaCont = vistaContenedor(MiVista);
            render(<PruebaVistaCont />);
        });

        test('Recibe componente vista contenedor y se recupera', () => {
            const PruebaVistaCont = vistaContenedor(MiVista);
            const { container } = render(<PruebaVistaCont />);

            let miComponente = getByText(container, textoVistaPrueba);
            expect(miComponente).not.toBeNull();
        });
    });
});
