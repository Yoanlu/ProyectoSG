import React from 'react';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';

import EleEntradaListaMultiseleccion from './EleEntradaListaMultiseleccion';
import EleEntradaListaMultiseleccionUtilidadesPruebas from './EleEntradaListaMultiseleccionUtilidadesPruebas';

afterEach(cleanup);

class ErrorBoundary extends React.Component {
    componentDidCatch() {
        this.props.funcionError();
    }
    render() {
        return <EleEntradaListaMultiseleccion />;
    }
}

describe('core::elements::EleEntradaListaMultiseleccion', () => {
    describe('Renderización', () => {
        test('Recibe dato y se renderiza', () => {
            const datos = ['Dato1', 'Dato2', 'Dato3', 'Dato4'];
            render(<EleEntradaListaMultiseleccion datos={datos} />);
        });

        test('No recibe datos y falla el render.', () => {
            const spy = jest.fn();
            render(<ErrorBoundary funcionError={spy} />);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('Recibe nombre  en props y le pone el name al elemento', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            const { container } = render(<EleEntradaListaMultiseleccion datos={datos} nombre={'Pruebas'} />);

            const miDesplegable = new EleEntradaListaMultiseleccionUtilidadesPruebas(
                container,
                'Elemento_EntradaListaMulti'
            );
            expect(miDesplegable.nombre).toEqual('Pruebas');
        });

        test('Recibe una clase css y la aplica en el componente', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            const { container } = render(<EleEntradaListaMultiseleccion datos={datos} claseCss={'Pruebas'} />);

            const miDesplegable = new EleEntradaListaMultiseleccionUtilidadesPruebas(
                container,
                'Elemento_EntradaListaMulti'
            );
            expect(miDesplegable.claseCss).toContain('Pruebas');
        });

        test('Recibe un array de valores y sin modo chip y los pinta separados por comas.', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            const { container } = render(<EleEntradaListaMultiseleccion datos={datos} valor={[1, 2]} />);

            const miDesplegable = new EleEntradaListaMultiseleccionUtilidadesPruebas(
                container,
                'Elemento_EntradaListaMulti'
            );
            expect(miDesplegable.valor).toEqual('Dato1, Dato2');
        });

        test('Recibe un array de valores y con modo chip y el value es la concatenación.', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            const { container } = render(
                <EleEntradaListaMultiseleccion datos={datos} valor={[1, 2]} aparienciaChip={true} />
            );

            const miDesplegable = new EleEntradaListaMultiseleccionUtilidadesPruebas(
                container,
                'Elemento_EntradaListaMulti'
            );
            expect(miDesplegable.valor).toEqual('Dato1Dato2');
        });

        test('Recibe una label y la incorpora al elemento', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            const { container } = render(<EleEntradaListaMultiseleccion datos={datos} etiqueta={'etiquetaPrueba'} />);

            const miDesplegable = new EleEntradaListaMultiseleccionUtilidadesPruebas(
                container,
                'Elemento_EntradaListaMulti'
            );
            expect(miDesplegable.etiqueta).toContain('etiquetaPrueba');
        });

        test('Recibe modo chip y pinta los elementos chip.', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            const { container } = render(
                <EleEntradaListaMultiseleccion datos={datos} valor={[1, 2]} aparienciaChip={true} />
            );

            const miDesplegable = new EleEntradaListaMultiseleccionUtilidadesPruebas(
                container,
                'Elemento_EntradaListaMulti'
            );
            expect(miDesplegable.chip).toEqual(2);
        });

        test('Recibe modo chip a false y no pinta elementos chip.', () => {
            const datos = [{ id: 1, text: 'Dato1' }, { id: 2, text: 'Dato2' }, { id: 3, text: 'Dato3' }];
            const { container } = render(
                <EleEntradaListaMultiseleccion datos={datos} valor={[1, 2]} aparienciaChip={false} />
            );

            const miDesplegable = new EleEntradaListaMultiseleccionUtilidadesPruebas(
                container,
                'Elemento_EntradaListaMulti'
            );
            expect(miDesplegable.chip).toEqual(0);
        });
    });
});
