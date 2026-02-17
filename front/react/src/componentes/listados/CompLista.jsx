import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { CircularProgress, LinearProgress } from "@mui/material";
import { withNamespaces } from "react-i18next";

import EleVentanaEmergente from "../../elementos/ventanasEmergentes/EleVentanaEmergente";
import ElePanel from "../../elementos/paneles/ElePanel";
import estilos from "./CompLista.module.css";

import { clonar } from "../Utilidades";
import anchoContenedor from "../anchoContenedor";
import EleBotonImagen from "../../elementos/botones/EleBotonImagen";
import Componente from "../Componente";
import EleBoton from "../../elementos/botones/EleBoton";

const CompTabla = lazy(() => import("../tablas/CompTabla"));

/**
 * Componente lista configurable.
 *
 * @version 0.2
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompLista extends Componente {
    static propTypes = {
        /**
         * Array con todas las filas a mostrar.
         */
        datos: PropTypes.array.isRequired,
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
         * Booleano que indica si se tiene permisos para añadir nuevos registros.
         */
        añadir: PropTypes.bool,
        /**
         * Booleano que indica si se tiene permisos para modificar registros existentes.
         */
        modificar: PropTypes.bool,
        /**
         * Booleano que indica si se tiene que ver el botón de ver/modificar registros existentes.
         */
        modificarInvisible: PropTypes.bool,
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
         * Booleano que indica si se tiene permisos para eliminar registros existentes.
         */
        eliminar: PropTypes.bool,
        /**
         * Booleano que indica si la lista se va a poder redimensionar por el usuario o si el ancho de los campos es automático.
         */
        listaRedimensionable: PropTypes.bool,
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
         * Componente con el detalle de cada fila.
         */
        detalleFila: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
         * Función que recibe una clave y devuelve el texto traducido al idioma de la aplicación.
         */
        t: PropTypes.func.isRequired,
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
         * Función que se dispara cuando se borran registros de la lista.
         */
        funcionGuardarEliminado: PropTypes.func,
        /**
         * Función que se actualiza el padre seleccionado en un arbol de datos.
         */
        actualizaPadreSeleccionado: PropTypes.func,
        /**
         * Función que recibe el nuevo tamaño de las columnas.
         */
        funcionCambioAnchoColumna: PropTypes.func,
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
         * Componente de navegación
         */
        navegacion: PropTypes.object,
        /**
         * Botón para exportar Sage visible o no.
         */
        botonSage: PropTypes.bool,
        /**
         * Función del botón para exportar Sage.
         */
        marcarAsientos: PropTypes.func,
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
         * Función del botón para enviar correos.
         */
        enviarCorreo: PropTypes.func,
        /**
         * Función del botón para exportar Facturas.
         */
        descargarFacturas: PropTypes.func,
        /**
         * Pasa un componente generico como leyenda ocupando el espacio izquierdo de la paginacion
         */
        leyenda: PropTypes.object
    };

    static defaultProps = {
        previsualizacion: false,
        listaFiltrable: true,
        seleccionarTodo: true,
        paginacionHabilitada: true,
        agrupacionHabilitada: true,
        seleccionColumnasHabilitada: true,
        seleccionHabilitada: true,
        mostrarBotonesMant: true,
        busquedaHabilitada: true,
        objetosListados: "",
        añadir: true,
        modificar: true,
        eliminar: true,
        mensajeBorrado: "continue",
        modificarInvisible: false,
        funcionGuardarEliminado() {
            return;
        },
        cambiaEstados() {
            return;
        },
        actualizaPadreSeleccionado() {
            return;
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            visibleConfirmar: false,
            datosRecuperados: false,
            seleccion: [],
            verSoloSeleccionados: false,
            unicoPadre: true,
            exportarSage: false,
            exportarFacturas: false,
            hayEstadoLista: false,
            fncBorrarEstadoLista: () => {}
        };

        this.contenedorConNavegacion = { height: "100%" };
        this.montado = true;
        this.idioma = this.props.lng;

        this.estiloFallback = { textAlign: "center", paddingTop: "10%" };
    }

    funcionCambiaBorrarEstadoLista = nuevaFncBorrarEstadoLista => {
        this.setState({
            fncBorrarEstadoLista: nuevaFncBorrarEstadoLista
        });
    };

    funcionHayEstadoLista = nuevoHayEstadoLista => {
        this.setState({
            hayEstadoLista: nuevoHayEstadoLista
        });
    };

    funcionRecuperarLista = async () => {
        this.setState({
            datosRecuperados: false
        });

        let respuestaLista = await this.props.funcionRecuperarLista();
        if (respuestaLista === true) {
            this.setState({
                datosRecuperados: true
            });
        } else {
            this.setState({
                datosRecuperados: "error"
            });
        }
    };

    funcionDesseleccionVisible = (seleccion, otro) => {};

    funcionSeleccion = seleccion => {
        if (this.props.previsualizacion === true && seleccion.length > 1) {
            // Solo puede haber un registro seleccionado, nos quedamos con el último
            seleccion = [seleccion[seleccion.length - 1]];
        }

        let callback = null;
        if (this.props.seleccionClickHabilitado && !this.props.seleccionHabilitada && seleccion.length === 1) {
            callback = this.funcionModificar;
        } else if (this.props.previsualizacion && seleccion.length === 0) {
            callback = this.funcionCerrar;
        }

        if (this.props.arbolDeDatos) {
            this.setState(
                {
                    unicoPadre: !(seleccion.length > 1),
                    seleccion: seleccion
                },
                callback
            );
        } else {
            this.setState(
                {
                    seleccion: seleccion
                },
                callback
            );
        }
    };

    funcionAlta = () => {
        this.props.cambiaEstados({
            datoEnEdicion: {},
            edicionVisible: true
        });

        if (this.props.arbolDeDatos) {
            this.props.actualizaPadreSeleccionado(this.props.datos[this.state.seleccion] ? this.props.datos[this.state.seleccion].id : 0);
        }
    };

    funcionModificar = (evento, filasEditar = this.state.seleccion) => {
        const filaDato = filasEditar[0];
        const fila = this.props.datos[filaDato];

        if (this.props.datoEnEdicion && fila.id === this.props.datoEnEdicion.id) {
            this.props.cambiaEstados({
                edicionVisible: true
            });
        } else {
            const filaAux = clonar(fila);
            this.props.cambiaEstados({
                datoEnEdicion: filaAux,
                edicionVisible: true
            });
        }

        if (!this.props.previsualizacion) {
            this.setState({
                seleccion: []
            });
        }

        if (this.props.arbolDeDatos) {
            this.props.actualizaPadreSeleccionado(this.props.datos[this.state.seleccion] ? this.props.datos[this.state.seleccion].id : 0);
        }
    };

    // funcionDuplicar = () => {
    //     const filaDato = this.state.seleccion[0];
    //     const fila = this.props.datos[filaDato];

    //     const filaAux = clonar(fila);
    //     delete filaAux.id;

    //     this.props.cambiaEstados({
    //         datoEnEdicion: filaAux,
    //         edicionVisible: true
    //     });

    //     if (!this.props.previsualizacion) {
    //         this.setState({
    //             seleccion: []
    //         });
    //     }

    //     if (this.props.arbolDeDatos) {
    //         this.props.actualizaPadreSeleccionado(this.props.datos[this.state.seleccion] ? this.props.datos[this.state.seleccion].id : 0);
    //     }
    // };

    funcionCerrar = () => {
        this.props.cambiaEstados({
            datoEnEdicion: {},
            edicionVisible: false
        });
    };

    ordenarNumeros(a, b) {
        return a - b;
    }

    funcionEliminar = () => {
        let filasBorrar = this.state.seleccion.slice();
        filasBorrar.sort(this.ordenarNumeros).reverse();

        let datosAux = this.props.datos;

        for (let i = 0; i < filasBorrar.length; i++) {
            let fila = filasBorrar[i];
            let id_fila = datosAux[fila].id;

            this.funcionEliminarFila(id_fila);
        }

        this.setState({
            visibleConfirmar: false,
            seleccion: []
        });
    };

    funcionEliminarFila = async id_fila => {
        let llamada_borrar = await this.props.funcionGuardarEliminado(id_fila, this.props.history);
        if (llamada_borrar !== false) {
            let datosAux = this.props.datos;
            let indexBorrar = datosAux.findIndex(function(o) {
                return o.id === id_fila;
            });

            if (indexBorrar !== -1) {
                datosAux.splice(indexBorrar, 1);
            }

            this.props.cambiaEstados({
                datosLista: datosAux
            });
        }
    };

    funcionAlternaDialogo = dato => {
        this.setState({
            visibleConfirmar: !this.state.visibleConfirmar
        });
    };

    setState(...datos) {
        if (this.montado && datos !== undefined) {
            super.setState(...datos);
        }
    }

    componentWillUnmount() {
        this.montado = false;
    }

    componentDidMount() {
        this.funcionRecuperarLista();
    }

    recuperaNodosArbol = (fila, filas) => {
        const nodosArbol = filas.filter(r => {
            if (fila) {
                return r[this.props.campoIdPadre] === fila.id;
            } else {
                return !r[this.props.campoIdPadre];
            }
        });

        return nodosArbol.length ? nodosArbol : null;
    };

    /* 	funcionExportarCsv = () => {
		exportarACsv(this.props.cabecera, this.props.datos, this.props.t);
	}; */

    funcionExportarPDF = async () => {
        let filasSeleccionadas = clonar(this.state.seleccion).slice();

        let datosAux = this.props.datos;
        let listaFilasExportar = [];

        for (let i = 0; i < filasSeleccionadas.length; i++) {
            let nfila = filasSeleccionadas[i];
            let datos_fila = clonar(datosAux[nfila]);
            listaFilasExportar.push(datos_fila);
        }

        this.props.exportarAPdf(listaFilasExportar);
    };

    funcionExportarExcel = async () => {
        let filasSeleccionadas = clonar(this.state.seleccion).slice();

        let datosAux = this.props.datos;
        let listaFilasExportar = [];

        for (let i = 0; i < filasSeleccionadas.length; i++) {
            let nfila = filasSeleccionadas[i];
            let datos_fila = clonar(datosAux[nfila]);
            listaFilasExportar.push(datos_fila);
        }

        this.props.funcionGenerarExcel(listaFilasExportar);
    };

    funcionExportarFacturas = async () => {
        if (this.state.visibleConfirmar === true) {
            let arrayTemp = clonar(this.props.datos);
            let arrayFacturas = [];

            for (let i = this.props.datos.length; i >= 0; i--) {
                if (this.state.seleccion.indexOf(i) === -1) {
                    arrayTemp.splice(i, 1);
                    continue;
                }

                arrayFacturas.push(arrayTemp[i].id);
            }

            let envio = { id: arrayFacturas };

            if (arrayTemp.length > 0) {
                let zipFacturas = await this.props.descargarFacturas(envio, this.props.history);

                let enlace = document.createElement("a");
                enlace.setAttribute("href", "data:application/zip;base64," + zipFacturas.respuesta);
                enlace.download = "facturas.zip";
                enlace.style.display = "none";
                document.body.appendChild(enlace);
                enlace.click();
                document.body.removeChild(enlace);
            }

            this.setState({
                visibleConfirmar: false,
                exportarFacturas: false
            });
        } else {
            this.setState({
                visibleConfirmar: true,
                exportarFacturas: true
            });
        }
    };

    funcionExportarSage = async () => {
        if (this.state.visibleConfirmar === true) {
            let arrayTemp = this.props.datos.slice(0, this.props.datos.length);
            let arrayAsientos = [];

            for (let i = this.props.datos.length; i >= 0; i--) {
                if (this.state.seleccion.indexOf(i) === -1) {
                    arrayTemp.splice(i, 1);
                    continue;
                }

                if (arrayTemp[i]["exportado"] === true) {
                    arrayTemp.splice(i, 1);
                    continue;
                }
                arrayAsientos.push({ id: arrayTemp[i].id });
                this.props.datos[i].exportado = true;
            }

            if (arrayTemp.length > 0) {
                //exportarACsv(this.props.cabecera, arrayTemp, this.props.t);
                await this.props.marcarAsientos(arrayAsientos, this.props.history);

                this.setState({
                    visibleConfirmar: false,
                    exportarSage: false,
                    seleccion: []
                });
                this.funcionRecuperarLista();
            }
        } else {
            this.setState({
                visibleConfirmar: true,
                exportarSage: true
            });
        }
    };

    funcionEnviarCorreo = async () => {
        this.props.enviarCorreo(this.state.seleccion);
        this.setState({
            seleccion: []
        });
    };

    mostrarBoton = (datosBoton, indice) => {
        let filasSeleccionadas = clonar(this.state.seleccion).slice();

        let listaIds = [];
        for (let i = 0; i < filasSeleccionadas.length; i++) {
            let nfila = filasSeleccionadas[i];
            listaIds.push(this.props.datos[nfila].id);
        }

        return (
            <EleBotonImagen
                key={indice}
                desactivarOndas={true}
                funcionOnClick={datosBoton.funcionOnClick.bind(this, listaIds)}
                desactivado={this.state.verSoloSeleccionados || !this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                primario
                icono={datosBoton.icono}
                tooltip={this.props.t(datosBoton.tooltip)}
            />
        );
    };

    funcionGenerarFactura = async () => {
        let filasSeleccionadas = clonar(this.state.seleccion).slice();

        let datosAux = this.props.datos;
        let listaIdsGenerar = [];

        for (let i = 0; i < filasSeleccionadas.length; i++) {
            let nfila = filasSeleccionadas[i];
            listaIdsGenerar.push(datosAux[nfila].id);
        }

        this.props.generarFactura(listaIdsGenerar);
        this.setState({
            seleccion: []
        });
    };

    limpiaSeleccion = () => {
        this.setState({
            seleccion: [],
            verSoloSeleccionados: false
        });
    };

    verSeleccionadas = () => {
        this.setState({
            verSoloSeleccionados: !this.state.verSoloSeleccionados
        });
    };

    componentDidUpdate(oldProps) {
        if (this.props.lng !== this.idioma) {
            this.idioma = this.props.lng;
            this.funcionRecuperarLista();
        }

        if (this.props.datos !== oldProps.datos) {
            this.setState({
                seleccion: []
            });
        }
    }

    alturaNavegacion = contenedorNavegacion => {
        if (!contenedorNavegacion) {
            return;
        }

        let altura = contenedorNavegacion.clientHeight;
        this.contenedorConNavegacion = { height: "calc(100% - " + altura + "px)" };
    };

    render() {
        return (
            <React.Fragment>
                {this.props.navegacion ? (
                    <div className={estilos.contenedorNavegacion} ref={this.alturaNavegacion}>
                        {this.props.navegacion}
                    </div>
                ) : null}

                <div className={estilos.contenedorConNavegacion} style={this.contenedorConNavegacion}>
                    <div className={estilos.contenedorAnimacion}>
                        <div className={estilos.lista}>
                            <ElePanel claseCss={estilos.panel}>
                                {this.props.mostrarBotonesMant ? (
                                    <div className={estilos.contenedorPlugins}>
                                        <EleBotonImagen
                                            funcionOnClick={this.funcionRecuperarLista}
                                            desactivado={
                                                this.props.listaRecuperando === true ||
                                                !(this.state.datosRecuperados && this.props.listaRecuperando !== true) ||
                                                this.state.verSoloSeleccionados
                                            }
                                            icono="refresh"
                                            fuente={this.props.width === "xs" ? "small" : undefined}
                                            primario
                                            tooltip={this.props.t("grid:refresh")}
                                        />

                                        {this.props.añadir === true ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionAlta}
                                                desactivado={this.state.verSoloSeleccionados || !this.state.unicoPadre || this.state.seleccion.length > 0}
                                                icono="add"
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                tooltip={this.props.t("grid:add")}
                                            />
                                        ) : null}

                                        {this.props.añadir === true && this.props.arbolDeDatos === true ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionAlta}
                                                desactivado={this.state.verSoloSeleccionados || !this.state.unicoPadre || this.state.seleccion.length !== 1}
                                                icono="add_comment"
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                tooltip={this.props.t("grid:add")}
                                            />
                                        ) : null}

                                        {this.props.modificarInvisible !== true && this.props.seleccionHabilitada !== false ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionModificar}
                                                desactivado={this.state.verSoloSeleccionados || this.state.seleccion.length !== 1}
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                icono={this.props.modificar ? "edit" : "visibility"}
                                                tooltip={this.props.modificar ? this.props.t("grid:edit") : this.props.t("grid:view")}
                                            />
                                        ) : null}

                                        {/*}
                                        Da demasiados problemas el botón de duplicar
                                        Cuando hay Serializer y ReadSerializer no funciona, ya que reemplaza ids con texto
                                        {this.props.modificarInvisible !== true &&
                                        this.props.seleccionHabilitada !== false &&
                                        this.props.modificar &&
                                        this.props.añadir ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionDuplicar}
                                                desactivado={this.state.verSoloSeleccionados || this.state.seleccion.length !== 1}
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                icono={"control_point_duplicate"}
                                                tooltip={this.props.t("grid:duplicate")}
                                            />
                                        ) : null}
                                        {*/}

                                        {this.props.eliminar === true && this.props.seleccionHabilitada !== false ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionAlternaDialogo}
                                                desactivado={this.state.verSoloSeleccionados || this.state.seleccion.length === 0}
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                icono="delete"
                                                tooltip={this.props.t("grid:delete")}
                                            />
                                        ) : null}

                                        {this.props.cabecera && this.props.cabecera.length > 1 ? (
                                            <EleBotonImagen
                                                funcionOnClick={this.state.fncBorrarEstadoLista}
                                                desactivado={!this.state.hayEstadoLista}
                                                icono="restart_alt"
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                tooltip={this.props.t("grid:reset_columns")}
                                            />
                                        ) : (
                                            undefined
                                        )}

                                        {this.props.seleccionHabilitada && !this.props.arbolDeDatos && (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.verSeleccionadas}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                icono={this.state.verSoloSeleccionados ? "checklist" : "list"}
                                                tooltip={this.props.t("view_selected")}
                                            />
                                        )}

                                        {/*
                                        No hace falta este botón
                                        {this.props.seleccionHabilitada && !this.props.arbolDeDatos && (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.limpiaSeleccion}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                primario
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                icono="clear_all"
                                                tooltip={this.props.t("clean_selecteds")}
                                            />
                                        )} */}

                                        {this.props.botonesExtraLista ? this.props.botonesExtraLista : undefined}

                                        {this.props.botonesExtraDinamicos ? this.props.botonesExtraDinamicos.map(this.mostrarBoton) : undefined}

                                        {/*
													<EleBotonImagen
													desactivarOndas={true}
													funcionOnClick={this.funcionExportarCsv}
													desactivado={
														this.state.verSoloSeleccionados ||
														!this.props.datos ||
														this.props.datos.length === 0
													}
													fuente={this.props.width === 'xs' ? 'small' : undefined}
													primario
													icono="cloud_download"
													tooltip={this.props.t('export_csv')}
												/> */}

                                        {this.props.botonSage === true ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionExportarSage}
                                                desactivado={
                                                    this.state.verSoloSeleccionados ||
                                                    !this.props.datos ||
                                                    this.props.datos.length === 0 ||
                                                    this.state.seleccion.length < 1
                                                }
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                primario
                                                icono="attachment"
                                                tooltip={this.props.t("export_sage")}
                                            />
                                        ) : null}

                                        {this.props.botonFactura === true ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionExportarFacturas}
                                                desactivado={
                                                    this.state.verSoloSeleccionados ||
                                                    !this.props.datos ||
                                                    this.props.datos.length === 0 ||
                                                    this.state.seleccion.length < 1
                                                }
                                                fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                                                primario
                                                icono="assessment"
                                                tooltip={this.props.t("export_invoices")}
                                            />
                                        ) : null}

                                        {this.props.botonPDF === true ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionExportarPDF}
                                                desactivado={
                                                    this.state.verSoloSeleccionados ||
                                                    !this.props.datos ||
                                                    this.props.datos.length === 0 ||
                                                    this.state.seleccion.length < 1
                                                }
                                                fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                                                primario
                                                icono="picture_as_pdf"
                                                tooltip="PDF"
                                            />
                                        ) : null}

                                        {this.props.funcionGenerarExcel !== undefined ? (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionExportarExcel}
                                                desactivado={
                                                    this.state.verSoloSeleccionados ||
                                                    !this.props.datos ||
                                                    this.props.datos.length === 0 ||
                                                    this.state.seleccion.length < 1
                                                }
                                                fuente={this.props.width === "xs" || this.props.width === "sm" ? "small" : undefined}
                                                primario
                                                icono="file_download"
                                                tooltip="Excel"
                                            />
                                        ) : null}

                                        {this.props.botonEnviarCorreo && (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionEnviarCorreo}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                primario
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                icono="forward_to_inbox"
                                                tooltip={this.props.t("send_email")}
                                            />
                                        )}

                                        {this.props.botonGenerarFacturas && (
                                            <EleBotonImagen
                                                desactivarOndas={true}
                                                funcionOnClick={this.funcionGenerarFactura}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                primario
                                                fuente={this.props.width === "xs" ? "small" : undefined}
                                                icono="task_alt"
                                                tooltip={this.props.t("billing")}
                                            />
                                        )}

                                        {this.props.botonActualizarPrecioProductoEmpresa && (
                                            <EleBoton
                                                // claseCss={estilos.boton}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                primario
                                                apariencia="contained"
                                                icono="refresh"
                                                texto={"Actualizar precios"}
                                                funcionOnClick={() => {
                                                    let datosActualizarPrecio = [];

                                                    for (let seleccionado of this.state.seleccion) {
                                                        datosActualizarPrecio.push(this.props.datos[seleccionado]);
                                                    }

                                                    this.props.botonActualizarPrecioProductoEmpresa(datosActualizarPrecio);
                                                }}
                                            />
                                        )}

                                        {this.props.botonCancelarEnvio && (
                                            <EleBoton
                                                claseCss={estilos.separacionEntreBotones}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                primario
                                                apariencia="contained"
                                                texto={"Cancelar"}
                                                funcionOnClick={() => {
                                                    let datosActualizarPrecio = [];

                                                    for (let seleccionado of this.state.seleccion) {
                                                        datosActualizarPrecio.push(this.props.datos[seleccionado].id);
                                                    }

                                                    this.props.botonCancelarEnvio(datosActualizarPrecio);
                                                }}
                                            />
                                        )}

                                        {this.props.botonDevolverEnvio && (
                                            <EleBoton
                                                claseCss={estilos.separacionEntreBotones}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                primario
                                                apariencia="contained"
                                                texto={"Devolver"}
                                                funcionOnClick={() => {
                                                    let datosDevolverEnvio = [];

                                                    for (let seleccionado of this.state.seleccion) {
                                                        datosDevolverEnvio.push(this.props.datos[seleccionado].id);
                                                    }

                                                    this.props.botonDevolverEnvio(datosDevolverEnvio);
                                                }}
                                            />
                                        )}

                                        {this.props.botonTraerLabel && (
                                            <EleBoton
                                                claseCss={estilos.separacionEntreBotones}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length < 1}
                                                primario
                                                apariencia="contained"
                                                texto={"Label"}
                                                funcionOnClick={() => {
                                                    let datosTraerLabel = [];

                                                    for (let seleccionado of this.state.seleccion) {
                                                        datosTraerLabel.push(this.props.datos[seleccionado].id);
                                                    }

                                                    this.props.botonTraerLabel(datosTraerLabel);
                                                }}
                                            />
                                        )}

                                        {this.props.botonGenerarPreAlert && (
                                            <EleBoton
                                                claseCss={estilos.separacionEntreBotones}
                                                desactivado={!this.props.datos || this.props.datos.length === 0 || this.state.seleccion.length !== 1}
                                                primario
                                                apariencia="contained"
                                                texto={"Pre-Alert"}
                                                funcionOnClick={() => {
                                                    const indexSeleccionado = this.state.seleccion;
                                                    const envioSeleccionado = this.props.datos[indexSeleccionado];
                                                    this.props.botonGenerarPreAlert(envioSeleccionado);
                                                }}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    undefined
                                )}

                                {this.state.datosRecuperados && this.props.listaRecuperando !== true ? (
                                    undefined
                                ) : (
                                    <div className={estilos.contenedorCargando}>
                                        <div className={estilos.cargando}>
                                            <LinearProgress />
                                        </div>
                                    </div>
                                )}
                                <Suspense
                                    fallback={
                                        <div style={this.estiloFallback}>
                                            <CircularProgress size={50} />
                                        </div>
                                    }
                                >
                                    <CompTabla
                                        funcionCambiaBorrarEstadoLista={this.funcionCambiaBorrarEstadoLista}
                                        funcionHayEstadoLista={this.funcionHayEstadoLista}
                                        filas={
                                            (this.state.datosRecuperados === "error" && this.props.listaRecuperando !== false) ||
                                            this.state.datosRecuperados === false
                                                ? []
                                                : this.props.datos
                                        }
                                        t={this.props.t}
                                        columnas={this.props.cabecera}
                                        funcionCambioAnchoColumna={this.props.funcionCambioAnchoColumna}
                                        listaRedimensionable={this.props.listaRedimensionable}
                                        filtroDefecto={this.props.filtroDefecto}
                                        filtrosOpcionales={this.props.filtrosOpcionales}
                                        listaFiltrable={this.props.listaFiltrable && !this.state.verSoloSeleccionados}
                                        campoOrdenacion={this.props.campoOrdenacion}
                                        sentidoOrdenacion={this.props.sentidoOrdenacion}
                                        listaOrdenable={this.props.listaOrdenable}
                                        arbolDeDatos={this.props.arbolDeDatos}
                                        columnaArbol={this.props.columnaArbol}
                                        recuperaNodosArbol={this.recuperaNodosArbol}
                                        funcionSeleccion={this.funcionSeleccion}
                                        funcionDesseleccionVisible={this.funcionDesseleccionVisible}
                                        seleccion={this.state.seleccion}
                                        seleccionClickHabilitado={this.props.seleccionClickHabilitado && !this.state.verSoloSeleccionados}
                                        objetosListados={this.props.objetosListados}
                                        seleccionHabilitada={this.props.seleccionHabilitada && !this.state.verSoloSeleccionados}
                                        modificarInvisible={this.props.modificarInvisible}
                                        seleccionarTodo={this.props.seleccionarTodo && !this.state.verSoloSeleccionados}
                                        paginacionHabilitada={this.props.paginacionHabilitada}
                                        agrupacionHabilitada={this.props.agrupacionHabilitada && this.props.cabecera.length > 1 && !this.props.arbolDeDatos}
                                        agrupacionInicial={this.props.agrupacionInicial}
                                        agrupacionExpandidaInicial={this.props.agrupacionExpandidaInicial}
                                        busquedaHabilitada={this.props.busquedaHabilitada === true && this.props.cabecera.length > 1}
                                        seleccionColumnasHabilitada={this.props.seleccionColumnasHabilitada && this.props.cabecera.length > 1}
                                        verSoloSeleccionados={this.state.verSoloSeleccionados}
                                        previsualizacion={this.props.previsualizacion}
                                        detalleFila={this.props.detalleFila}
                                        leyenda={this.props.leyenda}
                                        //Edición en linea
                                        funcionModificar={this.funcionModificar}
                                        modificar={this.props.modificar}
                                        editableEnLineaClick={this.props.editableEnLineaClick && !this.state.verSoloSeleccionados}
                                        editableEnLineaBotones={this.props.editableEnLineaBotones && !this.state.verSoloSeleccionados}
                                        funcionGuardarEnLinea={this.state.verSoloSeleccionados ? undefined : this.props.funcionGuardarEnLinea}
                                    />
                                </Suspense>
                                {/* ) : (
                                    <div className={estilos.cargando}>
                                        <LinearProgress />
                                    </div>
                                )} */}
                            </ElePanel>

                            <EleVentanaEmergente
                                sino
                                titulo={
                                    this.state.exportarSage === true
                                        ? this.props.t("export_sage")
                                        : this.state.exportarFacturas === true
                                        ? this.props.t("export_invoices")
                                        : this.props.t("delete") + " " + this.props.t(this.props.objetosListados)
                                }
                                funcionAceptar={
                                    this.state.exportarSage === true
                                        ? this.funcionExportarSage
                                        : this.state.exportarFacturas === true
                                        ? this.funcionExportarFacturas
                                        : this.funcionEliminar
                                }
                                mostrarError={this.state.visibleConfirmar}
                                mensaje={this.props.t(this.props.mensajeBorrado)}
                                funcionCerrarVentana={this.funcionAlternaDialogo}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default anchoContenedor(withNamespaces(["translations", "grid"])(CompLista));
