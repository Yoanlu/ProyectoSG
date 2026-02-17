import React, { createRef } from "react";
import PropTypes from "prop-types";
import CompDelayed from "../../CompDelayed";

import CompMantenimientoContenedor from "../contenedor/CompMantenimientoContenedor";

import estilos from "./CompMantenimientoLista.module.css";
import CompLista from "../../listados/CompLista";
import Componente from "../../Componente";
import { clonar, customScroll } from "../../Utilidades";
import { CircularProgress } from "@mui/material";

class CompMantenimientoLista extends Componente {
    static propTypes = {
        /**
         * Array con todas las filas a mostrar.
         */
        datos: PropTypes.array.isRequired,
        /**
         * Objeto con el registro modificable.
         */
        datoEnEdicion: PropTypes.any,
        /**
         * Datos necesarios de la vista para el mantenimiento.
         */
        datosExtra: PropTypes.any,
        /**
         * Booleano que indica si se muestra una previsualizacion a la derecha del mantenimiento.
         */
        previsualizacion: PropTypes.bool,
        /**
         * Booleano que indica si se muestra el mantenimiento (o la lista en caso contrario).
         */
        edicionVisible: PropTypes.bool,
        /**
         * Booleano que indica si se puede editar en línea con botones.
         */
        editableEnLineaBotones: PropTypes.bool,
        /**
         * Booleano que indica si se puede editar en línea con un click.
         */
        editableEnLineaClick: PropTypes.bool,
        /**
         * Función con las filas a guardar.
         */
        funcionGuardarEnLinea: PropTypes.func,
        /**
         * Booleano que indica si se pueden seleccionar todas las filas.
         */
        seleccionarTodo: PropTypes.bool,
        /**
         * Booleano que indica si se pueden seleccionar las filas por click.
         */
        seleccionClickHabilitado: PropTypes.bool,
        /**
         * Booleano que indica si se estan recuperando los datos desde fuera
         */
        listaRecuperando: PropTypes.bool,
        /**
         * Columnas por las que se va a ordenar de inicio.
         */
        campoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
        /**
         * Sentido en el que se van a ordenar las columnas ordenables iniciales.
         */
        sentidoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOf(["asc", "desc"])), PropTypes.string]),
        /**
         * Nombre de la entidad que se visualiza para listar o mantener.
         */
        objetosListados: PropTypes.string,
        /**
         * Booleano que indica si se actualiza la lista al cancelar.
         */
        refrescarListaSiempre: PropTypes.bool,
        /**
         * Booleano que indica si se tiene permisos para añadir nuevos registros.
         */
        añadir: PropTypes.bool,
        /**
         * Booleano que indica si se tiene permisos para modificar registros existentes.
         */
        modificar: PropTypes.bool,
        /**
         * Booleano que visibiliza el botón de ver/modificar.
         */
        modificarInvisible: PropTypes.bool,
        /**
         * Booleano que indica si se tiene permisos para eliminar registros existentes.
         */
        eliminar: PropTypes.bool,
        /**
         * Booleano que indica si la lista se va a poder redimensionar por el usuario o si el ancho de los campos es automático.
         */
        listaRedimensionable: PropTypes.bool,
        /**
         * Booleano que indica si el botón de aplicar está deshabilitado.
         */
        aplicarDeshabilitado: PropTypes.bool,
        /**
         * Booleano que indica si la lista se va a poder filtrar o no.
         */
        listaFiltrable: PropTypes.bool,
        /**
         * Array de objetos estructurados {columnName: XXX , value: XX } que marcarán el filtro inicial
         */
        filtroDefecto: PropTypes.array,
        /**
         * Array de objetos estructurados {
                        campoFiltrado: 'nombre del campo que se va a filtrar,
                        esteticaFiltro: 'tipo de Input del filtro',
                        controlErrores: 'acepta control de errores',
                        valoresPosiblesFiltro: [{ id: 1, text: 'Filtro por activos', valor: 'null' }] (valores posibles del filtro)
                    }
         *que marcarán el conjunto de filtrados que se van a añadir a la lista
         */
        filtrosOpcionales: PropTypes.array,
        /**
         * Componente con el detalle de cada fila.
         */
        detalleFila: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        /**
         * Nombre del campo que se va a representar como un arbol.
         */
        columnaArbol: PropTypes.string,
        /**
         * Booleano que indica si la lista va a ser un Arbol de datos.
         */
        arbolDeDatos: PropTypes.bool,
        /**
         * Campo que identifica el padre del nodo en el árbol de datos.
         */
        campoIdPadre: PropTypes.string,
        /**
         * Booleano que indica si la lista se va a poder ordenar o no.
         */
        listaOrdenable: PropTypes.bool,
        /**
         * Controla que la respuesta de las llamadas al api rest funcionan correctamente
         * en caso de error se mostrara un mensaje con el error
         *
         *  @param {Object} llamada - objeto request de la llamada
         */
        funcionControlPeticion: PropTypes.func.isRequired,
        /**
         * Función que recupera los datos actuales de la entidad y los asigna al estado que le llega a la lista.
         */
        funcionRecuperarLista: PropTypes.func.isRequired,
        /**
         * Función que se dispara cuando se pulsa sobre guardar en el mantenimiento inherente a la lista.
         */
        funcionGuardar: PropTypes.func,
        /**
         * Función que se dispara cuando se borran registros de la lista.
         */
        funcionGuardarEliminado: PropTypes.func,
        /**
         * Función que recibe el nuevo tamaño de las columnas.
         */
        funcionCambioAnchoColumna: PropTypes.func,
        /**
         * Booleano que indica si la lista se va a poder agrupar o no.
         */
        agrupacionHabilitada: PropTypes.bool,
        /**
         * Booleano que indica si la lista se va a poder paginar o no.
         */
        paginacionHabilitada: PropTypes.bool,
        /**
         * Booleano que indica si la lista se va a poder buscar o no.
         */
        busquedaHabilitada: PropTypes.bool,
        /**
         * Booleano que indica si la lista se va a poder seleccionar columnas o no.
         */
        seleccionColumnasHabilitada: PropTypes.bool,
        /**
         * Booleano que indica si en la lista se va a poder seleccionar filas o no.
         */
        seleccionHabilitada: PropTypes.bool,
        /**
         * Función que llama a la función setState de un componente de react superior, asignando el objeto recibido por argumento.
         */
        cambiaEstados: PropTypes.func,
        /**
         * Array que recibe la definición de la lista;
         *  - Campo: Nombre del campo
         *  - Título: Código de la traducción que se va a visualizar
         *  - Tipo: fecha, opciones, color, numero
         *  - Dependientes: Array con los campos que saldrían agrupados en el header (si hay dependientes, la columna no debe tener campo, pero sí título)
         */
        cabecera: PropTypes.array.isRequired,
        /**
         * Componente de react sin montar del mantenimiento de la entidad.
         */
        componenteMantenimiento: PropTypes.func,
        /**
         * Componente con los botones opcionales del mantenimiento.
         */
        botonesExtraMantenimiento: PropTypes.any,
        /**
         * Componente con los botones flotantes opcionales.
         */
        botonesExtraFlotantes: PropTypes.any,
        /**
         * Boleano que indica si los botones del mantenimiento se muestran como FAB.
         */
        botonesFlotantes: PropTypes.bool,
        /**
         * Componente de cabecera que se mostrará sobre el mantenimiento.
         */
        cabeceraExtraMantenimiento: PropTypes.any,
        /**
         * Clase css que se le va a aplicar al panel contenedor del mantenimiento.
         */
        estiloPanel: PropTypes.string,
        /**
         * Componente de navegación
         */
        navegacion: PropTypes.object,
        /**
         * Botón para exportar Sage visible o no.
         */
        botonSage: PropTypes.bool,
        /**
         * Botón para exportar Facturas visible o no.
         */
        botonFactura: PropTypes.bool,
        /**
         * Botón para exportar filas a PDF.
         */
        botonPDF: PropTypes.bool,
        /**
         * Función para exportar filas a Excel.
         */
        funcionGenerarExcel: PropTypes.func,
        /**
         * Botón para enviar correos visible o no.
         */
        botonEnviarCorreo: PropTypes.bool,
        /**
         * Botón para imprimir el mantenimiento.
         */
        botonImprimirMantVisible: PropTypes.bool,
        /**
         * Función del botón para enviar correos.
         */
        enviarCorreo: PropTypes.func,
        /**
         * Establece el mantenimiento en modo consulta independientemente de los permisos.
         */
        mantenimientoSoloLectura: PropTypes.bool,
        /**
         * Indica si la navegacion se muestra con el mantenimiento
         */
        mantenimientoConNavegacion: PropTypes.bool,
        /**
         * Pasa un componente generico como leyenda ocupando el espacio izquierdo de la paginacion
         */
        leyenda: PropTypes.object
    };

    static defaultProps = {
        detalle: false,
        previsualizacion: false,
        seleccionarTodo: true,
        mantenimientoSoloLectura: false,
        modificarInvisible: false,
        refrescarListaSiempre: false,
        mantenimientoConNavegacion: false,
        aplicarDeshabilitado: false
    };

    constructor(props) {
        super(props);

        this.state = {
            mantenimientosExportarPDF: [],
            filasExportarPDF: [],
            filasRestantes: -1,
            mostrarLoadingPDF: false,
            padreSeleccionado: 0,
            hayCambios: false,
            previsualizacionCRUD: false
        };

        this.contenedorNavegacion = createRef();
        this.primeraAnimacion = false;
        this.contAnimacion = null;
    }

    exportarAPdf = filas => {
        let nFilas = filas.length;
        this.nFilasExportarPDFTotal = nFilas;

        this.setState(
            {
                mostrarLoadingPDF: true,
                filasRestantes: nFilas,
                filasExportarPDF: filas,
                mantenimientosExportarPDF: []
            },
            this.exportarAPdfFilas
        );
    };

    exportarAPdfFilas = () => {
        // Exportamos la primera fila
        this.cargarPDFFilaMant(0);
    };

    cargarPDFFilaMant = indice => {
        let nFilas = this.state.filasExportarPDF.length;
        if (indice >= nFilas || this.state.filasRestantes <= 0) {
            // La anterior era la última fila a exportar, paramos el proceso
            return;
        }

        let cambiaEstadosTemp = nuevosDatos => {
            let filasNuevas = this.state.filasExportarPDF;
            filasNuevas[indice] = nuevosDatos;

            this.setState({
                filasExportarPDF: filasNuevas
            });
        };

        let filaAPintar = (
            <div key={this.state.filasExportarPDF[indice].id} className={"fila-" + this.state.filasExportarPDF[indice].id}>
                <CompMantenimientoContenedor
                    compMantenimiento={this.props.componenteMantenimiento}
                    botonesExtraMantenimiento={this.props.botonesExtraMantenimiento}
                    cabeceraExtraMantenimiento={this.props.cabeceraExtraMantenimiento}
                    funcionCancelar={() => {}}
                    funcionGuardar={() => {}}
                    datoEnEdicion={this.state.filasExportarPDF[indice] || []}
                    funcionCambiaEstados={cambiaEstadosTemp}
                    estiloPanel={this.props.estiloPanel}
                    objetosListados={this.props.objetosListados}
                    datosExtra={this.props.datosExtra}
                    estiloFormulario={this.props.estiloFormulario}
                    hayCambios={false}
                    actualizaCambios={() => {}}
                    funcionControlPeticion={this.props.funcionControlPeticion}
                    mantenimientoSoloLectura={this.props.mantenimientoSoloLectura}
                    padreSeleccionado={this.state.padreSeleccionado}
                    mantTerminado={this.exportarInformePDFFila.bind(this, this.state.filasExportarPDF[indice], indice)}
                />
            </div>
        );

        this.state.mantenimientosExportarPDF[indice] = filaAPintar;
        this.setState({
            mantenimientosExportarPDF: this.state.mantenimientosExportarPDF
        });
    };

    exportarInformePDFFila = (dato_fila_actual, indice) => {
        let documento_hdr = document.querySelector(".fila-" + dato_fila_actual.id);
        this.props.exportarInformePDF(documento_hdr, dato_fila_actual);

        let indice_fila = this.state.filasExportarPDF.findIndex(fila => fila.datoEnEdicion.id === dato_fila_actual.id);
        this.state.filasExportarPDF[indice_fila] = {
            datoEnEdicion: {}
        };
        this.state.mantenimientosExportarPDF[indice_fila] = null;

        this.setState(
            {
                filasRestantes: this.state.filasRestantes - 1,
                filasExportarPDF: this.state.filasExportarPDF,
                mantenimientosExportarPDF: this.state.mantenimientosExportarPDF
            },
            this.funcionCargarSiguientePDF.bind(this, indice + 1)
        );
    };

    funcionCargarSiguientePDF = indice => {
        // Cargamos el siguiente PDF con un pequeño retardo
        setTimeout(this.cargarPDFFilaMant.bind(this, indice), 500);
    };

    funcionCancelar = () => {
        this.actualizaCambios(false);
        this.props.cambiaEstados({
            datoEnEdicion: {},
            edicionVisible: false
        });

        if (this.props.refrescarListaSiempre) {
            this.props.funcionRecuperarLista();
        } else if (this.props.previsualizacion) {
            this.props.cambiaEstados({
                datosLista: clonar(this.props.datos)
            });
        }

        this.funcionPrevisualizacionCRUD(null, false);
        this.scrollArriba();
    };

    funcionPrevisualizacionCRUD = (evento, prevCrud = !this.state.previsualizacionCRUD) => {
        this.setState({
            previsualizacionCRUD: prevCrud
        });
    };

    controlRefrescarLista = () => {
        if (this.refrescarLista) {
            this.props.funcionRecuperarLista();
            this.refrescarLista = false;
        }
    };

    actualizaPadreSeleccionado = nuevoPadreSeleccionado => {
        this.setState({
            padreSeleccionado: nuevoPadreSeleccionado
        });
    };

    actualizaCambios = nuevoHayCambios => {
        this.state.hayCambios = nuevoHayCambios;
    };

    guardar = async (evt, modoAplicar = false) => {
        evt.preventDefault();
        if (!this.props.funcionGuardar) {
            return;
        }

        let edicionAux = this.props.datoEnEdicion;

        if (this.state.padreSeleccionado) {
            edicionAux[this.props.campoIdPadre] = this.state.padreSeleccionado;
        }

        let datoActualizadoJSON = await this.props.funcionGuardar();
        if (!datoActualizadoJSON) {
            this.refrescarLista = true;

            delete edicionAux.pendienteGuardar;

            this.props.cambiaEstados({
                datos: edicionAux
            });

            return;
        }

        let nuevoDatoEnEdicion = clonar(this.props.datoEnEdicion);
        let datosNuevo = this.props.datos;
        if (edicionAux.id === undefined) {
            datosNuevo.push(datoActualizadoJSON);
        } else {
            let fila = datosNuevo.findIndex(dato => dato.id === datoActualizadoJSON.id);
            datosNuevo[fila] = datoActualizadoJSON;
        }

        if (datoActualizadoJSON.id) {
            // Añadimos datoActualizadoJSON a datoEnEdicion por si la vista no lo hace
            // Si en la vista no se hace, falla el botón de aplicar, y no se recuperan datos nuevos del back ni el Id en el alta
            nuevoDatoEnEdicion = datoActualizadoJSON;
        }

        this.refrescarLista = true;
        this.controlRefrescarLista();
        this.props.cambiaEstados({
            // edicionVisible: this.props.detalle ? true : false,
            edicionVisible: modoAplicar ? true : false,
            previsualizacionCRUD: this.props.detalle ? this.state.previsualizacionCRUD : false,
            datos: datosNuevo,
            datoEnEdicion: nuevoDatoEnEdicion
        });

        this.actualizaCambios(false);

        this.scrollArriba();
    };

    isCssSmoothSCrollSupported() {
        return "scrollBehavior" in document.documentElement.style;
    }

    scrollArriba = () => {
        customScroll(0, 0, "smooth", this.contAnimacion);
    };

    dameContenedorAnimacion = obj => {
        this.contAnimacion = obj;
    };

    componentDidUpdate(oldProps, oldState) {
        if (this.props.edicionVisible === true && this.state.previsualizacionCRUD === false && !(this.props.datoEnEdicion.id > 0)) {
            // Si la vista tiene modo prev y modo mant pero es una alta, no permitimos previsualizar y pasamos a modo crud
            this.setState({
                previsualizacionCRUD: true
            });
        }

        if (this.state.previsualizacionCRUD === true && oldProps.edicionVisible !== this.props.edicionVisible) {
            // Si en modo previsualizacion se vuelve a la lista, desactivamos el modo crud
            this.setState({
                previsualizacionCRUD: false
            });
        }

        if (oldState.filasRestantes > 0 && this.state.filasRestantes === 0) {
            this.setState({
                mostrarLoadingPDF: false,
                filasExportarPDF: [],
                mantenimientosExportarPDF: []
            });
        }

        if (oldProps && oldProps.datoEnEdicion) {
            if (!oldProps.datoEnEdicion.hayCambios && this.props.datoEnEdicion.hayCambios === true) {
                // Se ha cambiado algún campo internamente
                this.setState({
                    hayCambios: true
                });
            }
        }
    }

    render() {
        let animacionLista = "";
        let animacionMantenimiento = "";

        if (this.props.edicionVisible && !this.primeraAnimacion) {
            this.primeraAnimacion = true;
        }

        if (this.props.previsualizacion) {
            animacionLista = this.props.edicionVisible ? estilos.listaPrevMant : estilos.listaPrev;
            animacionMantenimiento = this.props.edicionVisible ? estilos.prevMantVisible : estilos.prevMant;

            if (this.state.previsualizacionCRUD) {
                animacionLista += " " + estilos.listaPrevCrud;
                animacionMantenimiento += " " + estilos.prevMantCrud;
            }
        } else if (this.primeraAnimacion) {
            animacionLista = "animated extrafaster " + (!this.props.edicionVisible ? "slideInLeft " + estilos.contenedorVisible : "slideOutLeft");
            animacionMantenimiento = "animated extrafaster " + (this.props.edicionVisible ? "slideInRight " + estilos.contenedorVisible : "slideOutRight");
        }

        return (
            <React.Fragment>
                {this.props.navegacion &&
                (this.props.mantenimientoConNavegacion === true || !this.props.edicionVisible || this.props.previsualizacion === true) ? (
                    <div
                        className={estilos.contenedorNavegacion + " " + (this.state.previsualizacionCRUD ? estilos.navOculta : "")}
                        ref={this.contenedorNavegacion}
                    >
                        {this.props.navegacion}
                    </div>
                ) : null}

                <div className={estilos.invisible}>{this.state.mantenimientosExportarPDF}</div>

                {this.state.mostrarLoadingPDF ? (
                    <div className={estilos.cargando}>
                        <div>
                            {this.state.filasRestantes} - {this.nFilasExportarPDFTotal}
                        </div>
                        <CircularProgress />
                    </div>
                ) : (
                    undefined
                )}

                <div className={estilos.contenedorConNavegacion + " " + (this.state.mostrarLoadingPDF ? estilos.mantListaEnEspera : "")}>
                    <div ref={this.dameContenedorAnimacion} className={estilos.contenedorAnimacion}>
                        <div className={estilos.lista + " " + animacionLista}>
                            <CompLista
                                previsualizacion={this.props.previsualizacion}
                                cambiaEstados={this.props.cambiaEstados}
                                datos={this.props.datos}
                                datoEnEdicion={this.props.datoEnEdicion}
                                añadir={this.props.añadir}
                                modificar={this.props.modificar}
                                eliminar={this.props.eliminar}
                                mensajeBorrado={this.props.mensajeBorrado}
                                listaRecuperando={this.props.listaRecuperando}
                                funcionRecuperarLista={this.props.funcionRecuperarLista}
                                funcionGuardarEliminado={this.props.funcionGuardarEliminado}
                                cabecera={this.props.cabecera}
                                campoOrdenacion={this.props.campoOrdenacion}
                                sentidoOrdenacion={this.props.sentidoOrdenacion}
                                objetosListados={this.props.objetosListados}
                                funcionControlPeticion={this.props.funcionControlPeticion}
                                listaRedimensionable={this.props.listaRedimensionable}
                                filtrosOpcionales={this.props.filtrosOpcionales}
                                filtroDefecto={this.props.filtroDefecto}
                                columnaArbol={this.props.columnaArbol}
                                arbolDeDatos={this.props.arbolDeDatos}
                                campoIdPadre={this.props.campoIdPadre}
                                listaFiltrable={this.props.listaFiltrable}
                                actualizaPadreSeleccionado={this.actualizaPadreSeleccionado}
                                agrupacionInicial={this.props.agrupacionInicial}
                                agrupacionExpandidaInicial={this.props.agrupacionExpandidaInicial}
                                // navegacion={this.props.navegacion}
                                botonesExtraLista={this.props.botonesExtraLista}
                                botonesExtraDinamicos={this.props.botonesExtraDinamicos}
                                botonSage={this.props.botonSage}
                                botonFactura={this.props.botonFactura}
                                funcionGenerarExcel={this.props.funcionGenerarExcel}
                                botonPDF={this.props.botonPDF}
                                exportarAPdf={this.exportarAPdf}
                                botonEnviarCorreo={this.props.botonEnviarCorreo}
                                descargarFacturas={this.props.descargarFacturas}
                                marcarAsientos={this.props.marcarAsientos}
                                enviarCorreo={this.props.enviarCorreo}
                                seleccionarTodo={this.props.seleccionarTodo}
                                seleccionClickHabilitado={this.props.seleccionClickHabilitado}
                                paginacionHabilitada={this.props.paginacionHabilitada}
                                agrupacionHabilitada={this.props.agrupacionHabilitada}
                                busquedaHabilitada={this.props.busquedaHabilitada}
                                mostrarBotonesMant={this.props.mostrarBotonesMant}
                                seleccionColumnasHabilitada={this.props.seleccionColumnasHabilitada}
                                seleccionHabilitada={this.props.seleccionHabilitada}
                                modificarInvisible={this.props.modificarInvisible}
                                detalleFila={this.props.detalleFila}
                                leyenda={this.props.leyenda}
                                //Edición en linea
                                editableEnLineaClick={this.props.editableEnLineaClick}
                                editableEnLineaBotones={this.props.editableEnLineaBotones}
                                funcionGuardarEnLinea={this.props.funcionGuardarEnLinea}
                                // Props no genéricas, habrá que borrarlas
                                botonActualizarPrecioProductoEmpresa={this.props.botonActualizarPrecioProductoEmpresa}
                                botonCancelarEnvio={this.props.botonCancelarEnvio}
                                botonDevolverEnvio={this.props.botonDevolverEnvio}
                                botonTraerLabel={this.props.botonTraerLabel}
                                botonGenerarPreAlert={this.props.botonGenerarPreAlert}
                                generarFactura={this.props.generarFactura}
                                botonGenerarFacturas={this.props.botonGenerarFacturas}
                            />
                        </div>
                        <div className={estilos.mantenimiento + " " + animacionMantenimiento}>
                            <CompDelayed mounted={this.props.edicionVisible} unmountAfter={600}>
                                <CompMantenimientoContenedor
                                    compMantenimiento={this.props.componenteMantenimiento}
                                    botonesExtraMantenimiento={this.props.botonesExtraMantenimiento}
                                    botonesExtraFlotantes={this.props.botonesExtraFlotantes}
                                    botonesFlotantes={this.props.botonesFlotantes}
                                    botonImprimirVisible={this.props.botonImprimirMantVisible}
                                    cabeceraExtraMantenimiento={this.props.cabeceraExtraMantenimiento}
                                    funcionCancelar={this.funcionCancelar}
                                    datoEnEdicion={this.props.datoEnEdicion}
                                    funcionGuardar={this.guardar}
                                    aplicarDeshabilitado={this.props.aplicarDeshabilitado}
                                    funcionCambiaEstados={this.props.cambiaEstados}
                                    funcionPrevisualizacionCRUD={this.funcionPrevisualizacionCRUD}
                                    funcionRecuperarLista={this.props.funcionRecuperarLista}
                                    previsualizacionCRUD={this.state.previsualizacionCRUD}
                                    previsualizacion={this.props.previsualizacion}
                                    estiloPanel={this.props.estiloPanel}
                                    objetosListados={this.props.objetosListados}
                                    datosExtra={this.props.datosExtra}
                                    estiloFormulario={this.props.estiloFormulario}
                                    hayCambios={this.state.hayCambios}
                                    actualizaCambios={this.actualizaCambios}
                                    funcionControlPeticion={this.props.funcionControlPeticion}
                                    mantenimientoSoloLectura={this.props.mantenimientoSoloLectura}
                                    padreSeleccionado={this.state.padreSeleccionado}
                                    detalle={this.props.detalle}
                                />
                            </CompDelayed>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CompMantenimientoLista;
