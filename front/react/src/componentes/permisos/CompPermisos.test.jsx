import React from 'react';
import { render, cleanup, getByText, queryByText, prettyDOM } from 'react-testing-library';

import CompPermisos from './CompPermisos';
import { getHistoryMock } from '../../UtilidadesJest';
import { ProveedorPermisos } from './ProveedorPermisos';

const textoNecesario = 'Prueba vista con control de permisos';
const textoModificar = 'Se puede modificar';
const textoAñadir = 'Se puede añadir';
const textoBorrar = 'Se puede borrar';

const permisos_necesario = ['necesario', 'necesario2'];
const permisos_modificar = ['necesario', 'necesario2', 'modificar', 'modificar2'];
const permisos_añadir = ['necesario', 'necesario2', 'añadir', 'añadir2'];
const permisos_borrar = ['necesario', 'necesario2', 'borrar', 'borrar2'];

const historyMock = getHistoryMock();

class MiVista extends CompPermisos {
    constructor(props) {
        super(props);
        this.permisos_necesarios = ['necesario', 'necesario2'];
        this.permisos_modificar = ['modificar', 'modificar2'];
        this.permisos_añadir = ['añadir', 'añadir2'];
        this.permisos_borrar = ['borrar', 'borrar2'];
    }

    render() {
        this.compruebaPermisos();

        if (this.permiso.principal) {
            let textos = [textoNecesario];
            if (this.permiso.modificar) {
                textos = [...textos, textoModificar];
            }
            if (this.permiso.añadir) {
                textos = [...textos, textoAñadir];
            }
            if (this.permiso.borrar) {
                textos = [...textos, textoBorrar];
            }
            return (
                <div>
                    {textos.map(valor => {
                        return <p>{valor}</p>;
                    })}
                </div>
            );
        } else {
            return <div>No tiene permisos</div>;
        }
    }
}

afterEach(cleanup);

describe('core::components::CompVistaContenedor', () => {
    describe('Renderización', () => {
        test('Recibe permisos necesarios y se renderiza mostrando el texto correcto', () => {
            const { container } = render(
                <ProveedorPermisos.Provider value={permisos_necesario}>
                    <MiVista historia={historyMock} />
                </ProveedorPermisos.Provider>
            );

            let texto = getByText(container, textoNecesario);
            texto = queryByText(container, textoModificar);
            expect(texto).toBeNull();
            texto = queryByText(container, textoAñadir);
            expect(texto).toBeNull();
            texto = queryByText(container, textoBorrar);
            expect(texto).toBeNull();
        });

        test('Recibe permisos para modificar y se renderiza mostrando el texto correcto', () => {
            const { container } = render(
                <ProveedorPermisos.Provider value={permisos_modificar}>
                    <MiVista historia={historyMock} />
                </ProveedorPermisos.Provider>
            );

            let texto = getByText(container, textoNecesario);
            texto = getByText(container, textoModificar);
            texto = queryByText(container, textoAñadir);
            expect(texto).toBeNull();
            texto = queryByText(container, textoBorrar);
            expect(texto).toBeNull();
        });

        test('Recibe permisos para añadir y se renderiza mostrando el texto correcto', () => {
            const { container } = render(
                <ProveedorPermisos.Provider value={permisos_añadir}>
                    <MiVista historia={historyMock} />
                </ProveedorPermisos.Provider>
            );

            let texto = getByText(container, textoNecesario);
            texto = queryByText(container, textoModificar);
            expect(texto).toBeNull();
            texto = getByText(container, textoAñadir);
            texto = queryByText(container, textoBorrar);
            expect(texto).toBeNull();
        });

        test('Recibe permisos para borrar y se renderiza mostrando el texto correcto', () => {
            const { container } = render(
                <ProveedorPermisos.Provider value={permisos_borrar}>
                    <MiVista historia={historyMock} />
                </ProveedorPermisos.Provider>
            );

            let texto = getByText(container, textoNecesario);
            texto = queryByText(container, textoModificar);
            expect(texto).toBeNull();
            texto = queryByText(container, textoAñadir);
            expect(texto).toBeNull();
            texto = getByText(container, textoBorrar);
        });
    });

    describe('Funcionalidad', () => {
        test('No recibe permisos y redirecciona a /login', () => {
            render(<MiVista history={historyMock} />);
            expect(historyMock.push).toHaveBeenCalledWith('/login');
        });
    });
});
