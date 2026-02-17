import React from 'react';
import { render, cleanup, getByText, fireEvent, getByLabelText, getByTestId } from 'react-testing-library';
import CompFormularioLogin from './CompFormularioLogin';
import { getConsolaMock } from '../../UtilidadesJest';

afterEach(cleanup);
const consolasMock = getConsolaMock();

describe('core::elements::CompFormularioLogin', () => {
    describe('Renderización', () => {
        test('Recibe formulario login y se renderiza', () => {
            render(<CompFormularioLogin />);
        });

        test('Recibe valor texto de login y lo renderiza', () => {
            const { container } = render(<CompFormularioLogin textoLogin="pruebaTexto" />);
            getByText(container, 'pruebaTexto');
        });

        test('Recibe valor texto boton acceder y lo renderiza', () => {
            const { container } = render(<CompFormularioLogin textoBotonAcceder="pruebaTexto" />);
            getByText(container, 'pruebaTexto');
        });

        test('No recibe props obligatorias y manda numero de errores a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledTimes(11);
        });

        test('No recibe textoLogin por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `textoLogin` is marked as required/) &&
                    expect.stringMatching(/The prop `children` is marked as required/)
            );
        });

        test('No recibe textoUsuario por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `textoUsuario` is marked as required/)
            );
        });

        test('No recibe textoContrasena por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `textoContrasena` is marked as required/)
            );
        });

        test('No recibe textoBotonAcceder por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `textoBotonAcceder` is marked as required/)
            );
        });

        test('No recibe textoLoginErroneo por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `textoLoginErroneo` is marked as required/)
            );
        });

        test('No recibe textoBotonAcceder por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `valorUsuario` is marked as required/)
            );
        });

        test('No recibe textoBotonAcceder por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `valorContrasena` is marked as required/)
            );
        });

        test('No recibe funcionOnChangeNombre por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `funcionOnChangeNombre` is marked as required/)
            );
        });

        test('No recibe funcionOnChangeContrasena por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `funcionOnChangeContrasena` is marked as required/)
            );
        });

        test('No recibe funcionOnSubmit por props y manda error a console.error', () => {
            render(<CompFormularioLogin />);
            expect(consolasMock.FalsoError).toHaveBeenCalledWith(
                expect.stringMatching(/The prop `funcionOnSubmit` is marked as required/)
            );
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onSubmit y se lanza', () => {
            const spy = jest.fn();
            const { container } = render(<CompFormularioLogin funcionOnSubmit={spy} />);

            const miForm = getByTestId(container, 'formularioLogin');

            fireEvent(
                miForm,
                new Event('submit', {
                    bubbles: true, // hover events must bubble for React to see it
                    cancelable: true
                })
            );

            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
