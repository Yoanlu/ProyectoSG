import React from 'react';
import 'jest-dom/extend-expect';
import CompEntradaGrupoInterruptor from './CompEntradaGrupoInterruptor';
import CompEntradaGrupoInterruptorUtilidadesPruebas from './CompEntradaGrupoInterruptorUtilidadesPruebas';
import EleEntradaInterruptor from '../../elementos/entradaInterruptor/EleEntradaInterruptor';

import { render, cleanup, fireEvent } from 'react-testing-library';

afterEach(cleanup);

describe('core::elements::CompEntradaGrupoInterruptor', () => {
    describe('Renderización', () => {
        test('Recibe entrada Grupo de interruptores y se renderiza', () => {
            render(<CompEntradaGrupoInterruptor opciones={[]} />);
        });

        test('Recibe una clase css y la aplica', () => {
            const { container } = render(
                <CompEntradaGrupoInterruptor
                    claseCss={'clasePrueba'}
                    opciones={[
                        {
                            key: 1,
                            etiqueta: 'Etiqueta desactivada'
                        }
                    ]}
                    funcionOnChange={() => {}}
                />
            );

            const miGrupo = new CompEntradaGrupoInterruptorUtilidadesPruebas(
                container,
                'id_testing_elemento' //Hacemos referencia al id del elemento simple
            );
            expect(miGrupo.claseCss).toContain('clasePrueba');
        });

        test('Recibe titulo en props y lo muestra', () => {
            const { container } = render(
                <CompEntradaGrupoInterruptor
                    etiquetaGrupo="titulo_grupo"
                    opciones={[
                        {
                            key: 1,
                            etiqueta: 'Etiqueta'
                        }
                    ]}
                />
            );
            const miGrupo = new CompEntradaGrupoInterruptorUtilidadesPruebas(container, 'test_id_pruebas_titulo');

            expect(miGrupo.etiquetaGrupo).toEqual('titulo_grupo');
        });

        test('Recibe titulo en props y lo muestra', () => {
            const { container } = render(
                <CompEntradaGrupoInterruptor
                    etiquetaFooter="titulo_footer"
                    opciones={[
                        {
                            key: 1,
                            etiqueta: 'Etiqueta'
                        }
                    ]}
                />
            );
            const miGrupo = new CompEntradaGrupoInterruptorUtilidadesPruebas(container, 'test_id_pruebas_footer');

            expect(miGrupo.etiquetaFooter).toEqual('titulo_footer');
        });

        test('Recibe un número n de elementos simples en props y los pinta todos', () => {
            const { container } = render(
                <CompEntradaGrupoInterruptor
                    etiquetaFooter="titulo_footer"
                    opciones={[
                        {
                            key: 1,
                            etiqueta: 'Etiqueta'
                        },
                        {
                            key: 2,
                            etiqueta: 'Etiqueta2'
                        },
                        {
                            key: 3,
                            etiqueta: 'Etiqueta3'
                        },
                        {
                            key: 4,
                            etiqueta: 'Etiqueta4'
                        },
                        {
                            key: 5,
                            etiqueta: 'Etiqueta5'
                        },
                        {
                            key: 6,
                            etiqueta: 'Etiqueta6'
                        }
                    ]}
                />
            );
            const miGrupo = new CompEntradaGrupoInterruptorUtilidadesPruebas(container, 'test_id_grupo', 'contarHijos');

            expect(miGrupo.elementos).toBe(6);
        });
    });

    describe('Funcionalidad', () => {
        test('Recibe función onChange y se lanza', () => {
            const funcionEspia = jest.fn();
            const { container } = render(<EleEntradaInterruptor funcionOnChange={funcionEspia} />);
            const miInterruptor = new CompEntradaGrupoInterruptorUtilidadesPruebas(
                container,
                'id_testing_elemento',
                'click'
            );
            fireEvent(
                miInterruptor.nodoChange,
                new MouseEvent('click', {
                    bubbles: true, // click events must bubble for React to see it
                    cancelable: true
                })
            );

            expect(funcionEspia).toHaveBeenCalledTimes(1);
        });
    });
});
