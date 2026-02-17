import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';

import EleBotonImagen from './EleBotonImagen';
import EleBotonImagenUtilidadesPruebas from './EleBotonImagenUtilidadesPruebas';

afterEach(cleanup);

describe('core::elemets::EleBotonImagen', () => {
    describe('Renderización', () => {
        test('Recibe boton y se renderiza', () => {
            render(<EleBotonImagen />);
        });

        test('Recibe disabled a true en props y lo desactiva', () => {
            const { container } = render(<EleBotonImagen desactivado={true} />);

            const miBoton = new EleBotonImagenUtilidadesPruebas(container, 'Elemento_BotonImagen');
            expect(miBoton.desactivado).toBeTruthy();
        });

        test('Recibe disabled a false en props y lo activa', () => {
            const { container } = render(<EleBotonImagen texto="Pruebas" desactivado={false} />);

            const miBoton = new EleBotonImagenUtilidadesPruebas(container, 'Elemento_BotonImagen');
            expect(miBoton.desactivado).toBeFalsy();
        });

        test('Recibe una clase css y la aplica', () => {
            const { container } = render(<EleBotonImagen claseCss={'clasePrueba'} />);

            const miBoton = new EleBotonImagenUtilidadesPruebas(container, 'Elemento_BotonImagen');
            expect(miBoton.claseCss).toContain('clasePrueba');
        });

        test('Recibe un icono y la renderiza en el botón', () => {
            const { container } = render(<EleBotonImagen icono="star" />);

            const miBoton = new EleBotonImagenUtilidadesPruebas(container, 'Elemento_BotonImagen');

            expect(miBoton.icono).toEqual('star');
        });

        test('Recibe un color primario y la aplica', () => {
            const { container } = render(<EleBotonImagen primario={true} />);

            const miBoton = new EleBotonImagenUtilidadesPruebas(container, 'Elemento_BotonImagen');

            expect(miBoton.primario).toContain('colorPrimary');
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onClick y se lanza', () => {
            const funcionPrueba = jest.fn();
            const { container } = render(<EleBotonImagen texto="Pruebas" funcionOnClick={funcionPrueba} />);

            const miBoton = new EleBotonImagenUtilidadesPruebas(container, 'Elemento_BotonImagen');

            fireEvent(
                miBoton.nodoClick,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });

        test('Recibe función onHover y se lanza', () => {
            const funcionPrueba = jest.fn();
            const { container } = render(<EleBotonImagen texto="Pruebas" funcionOnHover={funcionPrueba} />);
            const miBoton = new EleBotonImagenUtilidadesPruebas(container, 'Elemento_BotonImagen');
            fireEvent(
                miBoton.nodoHover,
                new MouseEvent('mouseover', {
                    bubbles: true, // hover events must bubble for React to see it
                    cancelable: true
                })
            );
            expect(funcionPrueba).toHaveBeenCalledTimes(1);
        });
    });
});
