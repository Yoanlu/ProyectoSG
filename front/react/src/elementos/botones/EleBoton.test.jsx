import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent, cleanup } from 'react-testing-library';

import EleBoton from './EleBoton';

import EleBotonUtilidadesPruebas from './EleBotonUtilidadesPruebas';

afterEach(cleanup);

describe('core::elemets::EleBoton', () => {
    describe('Renderización', () => {
        test('Recibe boton y se renderiza', () => {
            render(<EleBoton />);
        });

        test('Recibe texto en props y lo muestra', () => {
            const { container } = render(<EleBoton texto="Pruebas" />);
            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');
            expect(miBoton.texto).toEqual('Pruebas');
        });

        test('Recibe tipo en props y lo establece', () => {
            const { container } = render(<EleBoton tipo="submit" />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');
            expect(miBoton.tipo).toEqual('submit');
        });

        test('Recibe disabled a true en props y lo desactiva', () => {
            const { container } = render(<EleBoton desactivado={true} />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');
            expect(miBoton.desactivado).toBeTruthy();
        });

        test('Recibe disabled a false en props y lo activa', () => {
            const { container } = render(<EleBoton texto="Pruebas" desactivado={false} />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');
            expect(miBoton.desactivado).toBeFalsy();
        });

        test('Recibe una clase css y la aplica', () => {
            const { container } = render(<EleBoton claseCss={'clasePrueba'} />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');
            expect(miBoton.claseCss).toContain('clasePrueba');
        });

        test('Recibe una apariencia y la aplica', () => {
            const { container } = render(<EleBoton apariencia="text" />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');
            expect(miBoton.apariencia).toContain('text');
        });

        test('Recibe un icono y la renderiza en el botón', () => {
            const { container } = render(<EleBoton icono="star" />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');

            expect(miBoton.icono).toEqual('star');
        });

        test('Recibe una imagen y la renderiza en el botón', () => {
            const { container } = render(<EleBoton imagenUrl="ImagenUrl" />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');

            expect(miBoton.imagenUrl).toContain('ImagenUrl');
        });

        test('Recibe un tamaño de botón y la aplica', () => {
            const { container } = render(<EleBoton tamano="large" />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');

            expect(miBoton.tamano).toContain('sizeLarge');
        });

        test('Recibe un color primario y la aplica', () => {
            const { container } = render(<EleBoton primario={true} />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');

            expect(miBoton.primario).toContain('textPrimary');
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onClick y se lanza', () => {
            const funcionPrueba = jest.fn();
            const { container } = render(<EleBoton texto="Pruebas" funcionOnClick={funcionPrueba} />);

            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');

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
            const { container } = render(<EleBoton texto="Pruebas" funcionOnHover={funcionPrueba} />);
            const miBoton = new EleBotonUtilidadesPruebas(container, 'Elemento_Boton');
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
