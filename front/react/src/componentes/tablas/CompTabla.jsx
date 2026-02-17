import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import {
    SelectionState,
    PagingState,
    IntegratedPaging,
    IntegratedSelection,
    IntegratedFiltering,
    FilteringState,
    SearchState,
    DataTypeProvider,
    SortingState,
    IntegratedSorting,
    GroupingState,
    IntegratedGrouping,
    TreeDataState,
    CustomTreeData,
    EditingState,
    RowDetailState,
    IntegratedSummary,
    SummaryState,
    VirtualTableState
} from "@devexpress/dx-react-grid";

import { GridExporter } from "@devexpress/dx-react-grid-export";

import {
    Grid,
    VirtualTable,
    Toolbar,
    TableHeaderRow,
    TableSelection,
    TableColumnResizing,
    DragDropProvider,
    TableColumnReordering,
    ColumnChooser,
    SearchPanel,
    GroupingPanel,
    TableGroupRow,
    TableColumnVisibility,
    PagingPanel,
    TableFilterRow,
    TableTreeColumn,
    TableBandHeader,
    Table,
    TableEditRow,
    TableEditColumn,
    TableInlineCellEditing,
    ExportPanel,
    TableRowDetail,
    TableSummaryRow
} from "@devexpress/dx-react-grid-material-ui";

import estilos from "./CompTabla.module.css";
import { withStyles } from "@mui/styles";

import FiltroDesplegable from "./filtrosPersonalizados/FiltroDesplegable";
import CompColumnaArchivo from "./columnas/columnaArchivo/CompColumnaArchivo";
import CompColumColor from "./columnas/columnaColor/CompColumColor";
import CompColumColorNombre from "./columnas/columnaColorNombre/CompColumColorNombre";
import CompColumColorTexto from "./columnas/columnaColorTexto/CompColumColorTexto";

import CompColumnaFecha from "./columnas/columnaFecha/CompColumnaFecha";
import CompObs from "./columnas/columnaObs/CompObs";
import CompColumnaHora from "./columnas/columnaFecha/CompColumnaHora";
import CompColumnaFechaHora from "./columnas/columnaFecha/CompColumnaFechaHora";

import CompColumnaNumero from "./columnas/columnaNumero/CompColumnaNumero";
import CompColumnaOpcionesIcono from "./columnas/columnaOpciones/CompColumnaOpcionesIcono";
import EleColumnaOrden, { OrdenContexto } from "./columnas/columnaOrden/EleColumnaOrden";
import Componente from "../Componente";
import { EleColumnaSeleccion, EleColumnaSeleccionCabecera } from "./columnas/columnaSeleccion/EleColumnaSeleccion";
import EleColumnaBoton from "./columnas/columnaBoton/EleColumnaBoton";
import EleColumnaImagen from "./columnas/columnaImagen/EleColumnaImagen";
import EleColumnaCorreo from "./columnas/columnaCorreo/EleColumnaCorreo";
import FiltroOpciones from "./filtrosPersonalizados/FiltroOpciones";
import { clonar, estaVacio, limpiaCadena } from "../Utilidades";
import CompColumnaGenerica from "./columnas/columnaGenerica/CompColumnaGenerica";
import EleColumnaIcono from "./columnas/columnaIcono/EleColumnaIcono";
import CompEntrada from "../entrada/CompEntrada";
import EleIcono from "../../elementos/iconos/EleIcono";
import { CompCRUDFilaEditable, CompCRUDTablaColumna, CompCRUDTablaFila } from "./columnasEditables/CompCRUDTabla";
import EleVentanaEmergente from "../../elementos/ventanasEmergentes/EleVentanaEmergente";
import { Template, TemplateConnector, TemplatePlaceholder } from "@devexpress/dx-react-core";
import saveAs from "file-saver";
import EleBotonImagen from "../../elementos/botones/EleBotonImagen";
import EleColumnaTripleBoton from "./columnas/columnaTripleBoton/EleColumnaTripleBoton";
import CompTablaFila from "./columnasEditables/CompTablaFila";
import CompTablaFilaConsulta from "./columnasEditables/CompTablaFilaConsulta";
import CompTablaFilaSinSeleccion from "./columnasEditables/CompTablaFilaSinSeleccion";
import CompTablaFilaSinSeleccionConsulta from "./columnasEditables/CompTablaFilaSinSeleccionConsulta";
import calculoResumen from "./CalculoResumen";
import ElePieLeyenda, { LeyendaContexto } from "./ElePieLeyenda";
import CompTablaFilaSinBoton from "./columnasEditables/CompTablaFilaSinBoton";

const VIRTUAL_PAGE_SIZE = 100;

/**
 * Componente tabla configurable.
 *
 * @version 0.2
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompTabla extends Componente {
    static propTypes = {
        /**
         * Array que recibe la definición de la lista (nombre de columna, tipo, etc).
         */
        columnas: PropTypes.array.isRequired,

        /**
         * Array con el registro modificable.
         */
        filas: PropTypes.array.isRequired,

        /**
         * Booleano que indica si el usuario puede seleccionar filas.
         */
        seleccionHabilitada: PropTypes.bool,

        /**
         * Booleano que indica si se paginan las filas.
         */
        paginacionHabilitada: PropTypes.bool,

        /**
         * Booleano que indica si se pueden agrupar las columnas.
         */
        agrupacionHabilitada: PropTypes.bool,

        /**
         * Booleano que indica si se pueden realizar búsquedas.
         */
        busquedaHabilitada: PropTypes.bool,

        /**
         * Booleano que indica si se pueden seleccionar las columnas visibles.
         */
        seleccionColumnasHabilitada: PropTypes.bool,

        /**
         * Booleano que indica si se pueden seleccionar todas las filas.
         */
        seleccionarTodo: PropTypes.bool,

        /**
         * Booleano que indica si se activa la opción de ver solo las filas seleccionadas.
         */
        verSoloSeleccionados: PropTypes.bool,

        /**
         * Booleano que indica si se pueden seleccionar las filas por click.
         */
        seleccionClickHabilitado: PropTypes.bool,

        /**
         * Array con las filas seleccionadas por el usuario.
         */
        seleccion: PropTypes.array,

        /**
         * Función que se lanza al seleccionar/desseleccionar filas.
         */
        funcionSeleccion: PropTypes.func,

        /**
         * Nombre del campo que se va a representar como un arbol.
         */
        columnaArbol: PropTypes.string,

        /**
         * Componente con el detalle de cada fila.
         */
        detalleFila: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

        /**
         * Booleano que indica si la lista va a ser un Arbol de datos.
         */
        arbolDeDatos: PropTypes.bool,

        /**
         * Booleano que visibiliza el botón de ver/modificar.
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
         * Columnas por las que se va a ordenar de inicio.
         */
        campoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),

        /**
         * Sentido en el que se van a ordenar las columnas ordenables iniciales.
         */
        sentidoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOf(["asc", "desc"])), PropTypes.string]),

        /**
         * Función que recibe el nuevo tamaño de las columnas.
         */
        funcionCambioAnchoColumna: PropTypes.func,

        /**
         * Array de objetos estructurados {columnName: XXX , value: XX } que marcarán el filtro inicial
         */
        filtroDefecto: PropTypes.array,

        /**
         * Booleano que indica si la lista se va a poder redimensionar por el usuario o si el ancho de los campos es automático.
         */
        listaRedimensionable: PropTypes.bool,

        /**
         * Booleano que indica si la lista se va a poder filtrar o no.
         */
        listaFiltrable: PropTypes.bool,

        /**
         * Booleano que indica si la lista se va a poder ordenar o no.
         */
        listaOrdenable: PropTypes.bool,

        /**
         * Pasa un componente generico como leyenda ocupando el espacio izquierdo de la paginacion
         */
        leyenda: PropTypes.object
    };

    static defaultProps = {
        seleccionHabilitada: false,
        paginacionHabilitada: false,
        listaFiltrable: false,
        seleccionColumnasHabilitada: false,
        seleccionarTodo: false,
        seleccionClickHabilitado: false,
        campoOrdenacion: null,
        sentidoOrdenacion: null,
        listaRedimensionable: true,
        editableEnLineaBotones: false,
        modificarInvisible: false,
        editableEnLineaClick: false,
        listaOrdenable: true,
        filtroDefecto: [],
        agrupacionInicial: [],
        arbolDeDatos: false,
        columnaArbol: "",
        funcionCambioAnchoColumna() {
            return;
        },
        funcionSeleccion() {
            return;
        }
    };

    constructor(props) {
        super(props);

        this.arrayVacio = [];
        this.exporterRef = React.createRef();
        this.columnasFechas = [];
        this.columnasHoras = [];
        this.columnasFechasHoras = [];
        this.columnasObservaciones = [];

        this.columnasArchivo = [];
        this.columnasOpciones = [];
        this.columnasColores = [];
        this.columnasColoresNombres = [];
        this.columnasColoresTextos = [];
        this.columnasNumero = [];
        this.columnasBoton = [];
        this.columnasTripleBoton = [];
        this.columnasImagen = [];
        this.columnasIcono = [];
        this.columnasCorreo = [];
        this.columnasNormales = [];

        this.columnasEditables = [];
        this.columnasResumen = [];
        this.columnasResumenAgrupadas = [];

        this.cabeceraTraducida = [];
        let ordenFilas = [];
        this.columnasEnBandas = null;
        this.mensajesTraducidos = {};
        this.mensajesExportarTraducidos = {};
        this.filtroAutomatico = [];
        this.paginacion = [100, 1000, 0];

        this.filtrosFechas = ["contains", "notContains", "startsWith", "endsWith"];
        this.filtrosNumericos = ["equal", "notEqual", "contains", "notContains", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual"];

        let ordenColumnas = this.calcularOrdenInicialColumnas();
        let anchoColumnasUsuario = this.dameAnchoCabecerasUsuario();

        if (Array.isArray(this.props.campoOrdenacion)) {
            for (let i = 0; i < this.props.campoOrdenacion.length; i++) {
                if (this.props.campoOrdenacion[i] && this.props.sentidoOrdenacion[i]) {
                    ordenFilas.push({
                        columnName: this.props.campoOrdenacion[i],
                        direction: this.props.sentidoOrdenacion[i]
                    });
                }
            }
        } else {
            if (this.props.campoOrdenacion && this.props.sentidoOrdenacion) {
                ordenFilas.push({
                    columnName: this.props.campoOrdenacion,
                    direction: this.props.sentidoOrdenacion
                });
            }
        }

        this.state = {
            filtro: clonar(this.props.filtroDefecto),
            paginaActual: 0,
            filasPorPagina: 1000,
            anchoCabeceras: this.dameAnchoCabeceras(anchoColumnasUsuario),
            anchoCabecerasUsuario: anchoColumnasUsuario,
            visibleMensaje: false,
            visibleMensajeExportar: false,
            ordenFilas: ordenFilas,
            ordenColumnas: ordenColumnas,
            agrupacion: clonar(this.props.agrupacionInicial),
            busqueda: "",
            filasExpandidas: [],
            seleccionFiltrada: [],
            filasExpandidasIds: [],

            skip: 0,
            requestedSkip: 0,
            take: VIRTUAL_PAGE_SIZE * 2,
            totalCount: 0,
            loading: false,
            lastQuery: ""
        };

        this.filtrosColumnas = [];

        this.compruebaTiposColumnas();

        if (this.props.funcionCambiaBorrarEstadoLista) {
            this.props.funcionCambiaBorrarEstadoLista(this.funcionBorrarEstadoLista);
        }
    }

    funcionBorrarEstadoLista = () => {
        this.props.funcionHayEstadoLista(false);

        window.localStorage.removeItem("grid/position/" + this.props.objetosListados + window.location.pathname);
        window.localStorage.removeItem("grid/width/" + this.props.objetosListados + window.location.pathname);

        this.setState({
            ordenColumnas: this.calcularOrdenInicialColumnas(),
            anchoCabeceras: this.dameAnchoCabeceras(),
            anchoCabecerasUsuario: []
        });
    };

    calcularOrdenInicialColumnas() {
        let ordenColumnas = [];

        let ordenColumnasUsuario = window.localStorage.getItem("grid/position/" + this.props.objetosListados + window.location.pathname);

        if (ordenColumnasUsuario) {
            this.props.funcionHayEstadoLista(true);
            ordenColumnasUsuario = ordenColumnasUsuario.split(",");

            let indice = 0;
            let continuar = true;
            while (continuar) {
                let columnaBase = this.props.columnas[indice];
                let columnaUsuario = ordenColumnasUsuario[indice];

                if (!columnaBase && !columnaUsuario) {
                    continuar = false;
                } else if (columnaBase && columnaBase.campo === columnaUsuario) {
                    // La columna es la misma
                    ordenColumnas.push(columnaBase.campo);
                } else if (columnaBase && columnaBase.campo && columnaUsuario) {
                    // Ambos arrays tienen columna y no son iguales

                    // Comprobamos si la columna de usuario existe en las columnas base
                    let existeColumna = this.props.columnas.find(col => col.campo === columnaUsuario);
                    if (existeColumna) {
                        ordenColumnas.pushSetPriority(columnaUsuario);
                    }

                    ordenColumnas.pushSet(columnaBase.campo);
                } else if (columnaUsuario) {
                    ordenColumnas.pushSetPriority(columnaUsuario);
                } else if (columnaBase && columnaBase.campo) {
                    ordenColumnas.pushSet(columnaBase.campo);
                }

                indice++;
            }
        } else {
            for (let columna in this.props.columnas) {
                ordenColumnas.push(this.props.columnas[columna].campo);
            }
        }

        return ordenColumnas;
    }

    setfilasExpandidasIds = filasExpandidas => {
        if (filasExpandidas.length > 0) {
            let filaClickada = filasExpandidas[filasExpandidas.length - 1];
            filasExpandidas = [filaClickada];
        }

        this.setState({ filasExpandidasIds: filasExpandidas });
    };

    editarFilaDesdeColumna = filasEditar => {
        this.props.funcionModificar(null, filasEditar);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.objetosListados !== this.props.objetosListados) {
            this.limpiaFiltros();
        }

        if (prevProps.verSoloSeleccionados && !this.props.verSoloSeleccionados) {
            this.setState({
                seleccionFiltrada: []
            });
        } else if (!prevProps.verSoloSeleccionados && this.props.verSoloSeleccionados) {
            if (this.state.seleccionFiltrada.length === 0) {
                let seleccionFiltradaTmp = [];

                this.props.seleccion.forEach(indice => {
                    seleccionFiltradaTmp.push(this.props.filas[indice]);
                });

                this.setState({
                    seleccionFiltrada: seleccionFiltradaTmp
                });
            }
        }

        if (prevProps.columnas !== this.props.columnas) {
            this.estableceMensajes();
            this.forceUpdate();
        }
    }

    funcionAlternaDialogo = () => {
        this.seleccionLocal = undefined;
        this.setState({
            visibleMensaje: !this.state.visibleMensaje
        });
    };

    funcionAceptarSecundario = () => {
        // Seleccionamos solo las filas filtradas
        let nuevaSeleccion = [];

        this.filasFiltradas.forEach(filaFiltrada => {
            let indice = this.props.filas.findIndex(fila => fila.id === filaFiltrada.id);
            nuevaSeleccion.push(indice);
        });

        this.funcionSeleccion(nuevaSeleccion);
        this.funcionAlternaDialogo();
    };

    funcionAceptar = () => {
        this.funcionSeleccion(this.seleccionLocal);
        this.funcionAlternaDialogo();
    };

    estableceMensajes = () => {
        this.mensajesExportarTraducidos.showExportMenu = this.props.t("grid:export");
        this.mensajesExportarTraducidos.exportAll = this.props.t("grid:export_all_data");
        this.mensajesExportarTraducidos.exportSelected = this.props.t("grid:export_selected_rows");

        this.mensajesTraducidos.tabla = {
            noData: this.state.datosRecuperados === "error" ? this.props.t("grid:retrieve_error") : this.props.t("grid:no_data")
        };

        this.mensajesTraducidos.busqueda = {
            searchPlaceholder: this.props.t("grid:search")
        };

        this.mensajesTraducidos.visibilidadColumnas = {
            noColumns: this.props.t("grid:no_columns") + "..."
        };

        this.mensajesTraducidos.seleccionColumnas = {
            showColumnChooser: this.props.t("grid:choose_columns")
        };

        this.mensajesTraducidos.panelAgrupacion = {
            groupByColumn: this.props.t("grid:group_by_column")
        };

        this.mensajesTraducidos.resumen = {
            count: this.props.t("grid:total"),
            sum: this.props.t("grid:sum"),
            sumOf: this.props.t("grid:sumOf"),
            max: this.props.t("grid:max"),
            min: this.props.t("grid:min"),
            avg: this.props.t("grid:avg")
        };

        this.mensajesTraducidos.resumenAgrupado = {
            count: this.props.t("grid:count"),
            sum: this.props.t("grid:sum"),
            sumOf: this.props.t("grid:sumOf"),
            max: this.props.t("grid:max"),
            min: this.props.t("grid:min"),
            avg: this.props.t("grid:avg")
        };

        this.mensajesTraducidos.panelPaginacion = {
            showAll: this.props.t("grid:show_all"),
            rowsPerPage: this.props.t("grid:rows_per_page"),
            info: this.props.t("grid:info")
        };

        this.mensajesTraducidos.filtro = {
            filterPlaceholder: this.props.t("grid:filter") + "...",
            contains: this.props.t("grid:contains"),
            notContains: this.props.t("grid:not_contains"),
            startsWith: this.props.t("grid:starts_with"),
            endsWith: this.props.t("grid:ends_with"),
            equal: this.props.t("grid:equal"),
            notEqual: this.props.t("grid:not_equal"),
            greaterThan: this.props.t("grid:greater_than"),
            greaterThanOrEqual: this.props.t("grid:greater_than_or_equal"),
            lessThan: this.props.t("grid:less_than"),
            lessThanOrEqual: this.props.t("grid:less_than_or_equal")
        };

        let nuevaCabeceraTraducida = [];
        for (let columna in this.props.columnas) {
            const datosColumna = this.props.columnas[columna];

            if (datosColumna.campo) {
                let titulo = this.props.t(datosColumna.titulo);
                if (datosColumna.tipo === "porcentaje") {
                    titulo = "% " + titulo;
                }

                nuevaCabeceraTraducida[columna] = {
                    name: datosColumna.campo,
                    campo2: datosColumna.campo2,
                    title: titulo,
                    function: datosColumna.funcion,
                    iconoTrue: datosColumna.iconoTrue,
                    iconoFalse: datosColumna.iconoFalse,
                    enviar: datosColumna.enviar,
                    tipo: datosColumna.tipo,
                    iconoArchivo: datosColumna.iconoArchivo,
                    iconoEnviar: datosColumna.iconoEnviar,
                    campoEnlace: datosColumna.campoEnlace,
                    evitarDesactivado: datosColumna.evitarDesactivado,
                    icono: datosColumna.icono,
                    tooltip: datosColumna.tooltip,
                    listado: datosColumna.listado,
                    listado_campo: datosColumna.listado_campo,
                    listado_ID: datosColumna.campoID
                };
            }
        }

        if (JSON.stringify(nuevaCabeceraTraducida) !== JSON.stringify(this.cabeceraTraducida)) {
            this.cabeceraTraducida = nuevaCabeceraTraducida;
        }
    };

    limpiaFiltros = () => {
        this.funcionSeleccion([]);
        this.setState({
            filtro: this.props.filtroDefecto,
            busqueda: ""
        });
    };

    filtroTexto = (value, filter, row) => {
        if (!filter.value.length) return true;

        value = limpiaCadena(value);
        filter.value = filter.value = limpiaCadena(filter.value);

        return IntegratedFiltering.defaultPredicate(value, filter, row);
    };

    filtroNumero = (value, filter, row) => {
        if (estaVacio(value)) return true;

        let filtro = clonar(filter);
        filtro.value = filtro.value.replace(",", ".");

        return IntegratedFiltering.defaultPredicate(parseFloat(value), filtro, row);
    };

    calculaCabeceras = () => {
        for (let columna in this.props.columnas) {
            const datosColumna = this.props.columnas[columna];

            if (datosColumna.dependientes && datosColumna.dependientes.length > 0) {
                let dependientes = [];

                if (this.columnasEnBandas === null) {
                    this.columnasEnBandas = [];
                }

                for (let i = 0; i < datosColumna.dependientes.length; i++) {
                    dependientes.push({ columnName: datosColumna.dependientes[i] });
                }

                this.columnasEnBandas.push({
                    title: this.props.t(datosColumna.titulo),
                    children: dependientes
                });
            }
        }
    };

    dameAnchoCabeceras = (anchoColumnasUsuario = []) => {
        let anchoCabeceras = [];

        if (!this.props.listaRedimensionable) {
            return [];
        }

        for (let columna in this.props.columnas) {
            const datosColumna = this.props.columnas[columna];
            anchoCabeceras[columna] = {
                columnName: datosColumna.campo,
                width: datosColumna.ancho || (datosColumna.tipo === "icono" ? 50 : 200)

                // Comentado, porque si alineamos las etiquetas de numeros a la derecha, la flecha de orden no cabe
                // align: datosColumna.tipo === "numero" || datosColumna.tipo === "porcentaje" ? "right" : "left"
            };
        }

        anchoColumnasUsuario.forEach(col => {
            let indice = anchoCabeceras.findIndex(columna => columna.columnName === col.columnName);
            if (indice >= 0) {
                anchoCabeceras[indice] = col;
            }
        });

        return anchoCabeceras;
    };

    dameAnchoCabecerasUsuario = () => {
        let anchoColumnasUsuario = window.localStorage.getItem("grid/width/" + this.props.objetosListados + window.location.pathname);

        if (anchoColumnasUsuario) {
            this.props.funcionHayEstadoLista(true);
            return JSON.parse(anchoColumnasUsuario);
        }

        return [];
    };

    compruebaTiposColumnas = () => {
        for (let columna in this.props.columnas) {
            const datosColumna = this.props.columnas[columna];
            let esEditable = datosColumna.editable === undefined ? true : datosColumna.editable;

            let columnaActual = {
                columnName: datosColumna.campo,
                editingEnabled: esEditable
            };

            if (datosColumna.resumen) {
                // let estaAgrupado = this.state.agrupacion.filter(fila => fila.columnName === datosColumna.campo).length > 0;

                // Posibles valores: sum, max, min, avg, count
                if (Array.isArray(datosColumna.resumen)) {
                    datosColumna.resumen.forEach(datocolResumen => {
                        this.columnasResumen.push({
                            columnName: datosColumna.campo,
                            type: datocolResumen
                        });

                        this.columnasResumenAgrupadas.push({
                            columnName: datosColumna.campo,
                            type: datocolResumen,
                            showInGroupFooter: false,
                            alignByColumn: false
                        });
                    });
                } else {
                    this.columnasResumen.push({
                        columnName: datosColumna.campo,
                        type: datosColumna.resumen
                    });

                    this.columnasResumenAgrupadas.push({
                        columnName: datosColumna.campo,
                        type: datosColumna.resumen,
                        showInGroupFooter: false,
                        alignByColumn: false
                    });
                }
            }

            if (!datosColumna.tipo) {
                this.filtrosColumnas.push({
                    columnName: datosColumna.campo,
                    predicate: this.filtroTexto
                });

                this.columnasNormales.push(datosColumna.campo);
            } else if (datosColumna.tipo === "fecha") {
                this.columnasFechas.push(datosColumna.campo);
            } else if (datosColumna.tipo === "hora") {
                this.columnasHoras.push(datosColumna.campo);
            } else if (datosColumna.tipo === "fechahora") {
                this.columnasFechasHoras.push(datosColumna.campo);
            } else if (datosColumna.tipo === "observaciones") {
                this.columnasObservaciones.push(datosColumna.campo);
            } else if (datosColumna.tipo === "opciones") {
                this.columnasOpciones.push(datosColumna.campo);

                this.filtroAutomatico.push({
                    campoFiltrado: datosColumna.campo,
                    esteticaFiltro: datosColumna.tipo
                });

                this.state.filtro.push({
                    columnName: datosColumna.campo,
                    value: datosColumna.filtroInicial === undefined ? "" : datosColumna.filtroInicial
                });
            } else if (datosColumna.tipo === "color") {
                this.columnasColores.push(datosColumna.campo);
            } else if (datosColumna.tipo === "colorNombre") {
                this.columnasColoresNombres.push(datosColumna.campo);
            } else if (datosColumna.tipo === "colorTexto") {
                this.columnasColoresTextos.push(datosColumna.campo);
            } else if (datosColumna.tipo === "numero" || datosColumna.tipo === "porcentaje") {
                this.filtrosColumnas.push({
                    columnName: datosColumna.campo,
                    predicate: this.filtroNumero
                });

                this.columnasNumero.push(datosColumna.campo);
            } else if (datosColumna.tipo === "boton") {
                this.filtrosColumnas.push({
                    columnName: datosColumna.campo,
                    predicate: this.filtroTexto
                });
                this.columnasBoton.push(datosColumna.campo);
            } else if (datosColumna.tipo === "tripleBoton") {
                this.filtrosColumnas.push({
                    columnName: datosColumna.campo,
                    predicate: this.filtroTexto
                });
                this.columnasTripleBoton.push(datosColumna.campo);
            } else if (datosColumna.tipo === "imagen") {
                this.columnasImagen.push(datosColumna.campo);
            } else if (datosColumna.tipo === "icono") {
                this.columnasIcono.push(datosColumna.campo);
            } else if (datosColumna.tipo === "correo") {
                this.filtrosColumnas.push({
                    columnName: datosColumna.campo,
                    predicate: this.filtroTexto
                });
                this.columnasCorreo.push(datosColumna.campo);
            } else if (datosColumna.tipo === "archivo") {
                this.columnasArchivo.push(datosColumna.campo);
            } else {
                this.columnasNormales.push(datosColumna.campo);
            }

            this.columnasEditables.push(columnaActual);
        }
    };

    cambioAnchoColumna = anchoNuevo => {
        if (this.props.objetosListados) {
            for (let indice = 0; indice < anchoNuevo.length; indice++) {
                if (this.state.anchoCabeceras[indice].width !== anchoNuevo[indice].width) {
                    let anchoColumnasUsuario = clonar(this.state.anchoCabecerasUsuario);
                    anchoColumnasUsuario.pushSetPriority(anchoNuevo[indice]);

                    window.localStorage.setItem("grid/width/" + this.props.objetosListados + window.location.pathname, JSON.stringify(anchoColumnasUsuario));
                    this.setState({ anchoCabecerasUsuario: anchoColumnasUsuario });
                    break;
                }
            }

            this.props.funcionHayEstadoLista(true);
        }

        this.setState({ anchoCabeceras: anchoNuevo });
        this.props.funcionCambioAnchoColumna();
    };

    cambiaOrdenColumnas = nuevoOrden => {
        if (this.props.objetosListados) {
            window.localStorage.setItem("grid/position/" + this.props.objetosListados + window.location.pathname, nuevoOrden);
            this.props.funcionHayEstadoLista(true);
        }

        this.setState({ ordenColumnas: nuevoOrden });
    };

    cambiaOrdenFilas = nuevoOrden => {
        const ordenColumna = nuevoOrden[0];
        let ordenAux = this.state.ordenFilas.slice();

        const columna = ordenAux.findIndex(fila => fila.columnName === ordenColumna.columnName);
        if (columna >= 0) {
            if (ordenAux[columna].direction === "desc") {
                ordenAux.splice(columna, 1);
            } else {
                ordenAux[columna] = ordenColumna;
            }
        } else {
            ordenAux.push(ordenColumna);
        }

        this.setState({ ordenFilas: ordenAux });
    };

    cambiaAgrupacion = nuevaAgrupacion => {
        this.setState({ agrupacion: nuevaAgrupacion });
    };

    cambiaBusqueda = busqueda => {
        // this.funcionSeleccion([]);
        this.setState({
            busqueda: busqueda
        });
    };

    cambiaPaginaActual = nuevaPaginaActual => {
        this.setState({
            paginaActual: nuevaPaginaActual
        });
    };

    cambiaFilasPorPagina = nuevasFilasPorPagina => {
        this.setState({
            filasPorPagina: nuevasFilasPorPagina
        });
    };

    cambiaFiltro = filtro => {
        // this.funcionSeleccion([]);

        this.setState({
            filtro: filtro
        });
    };

    cambiaFilasExpandidas = filasExpandidas => {
        this.setState({ filasExpandidas });
    };

    celdaFiltradoPersonalizado = props => {
        const { column, filter, onFilter } = props;

        for (let i in this.props.filtrosOpcionales) {
            const filtroOpcional = this.props.filtrosOpcionales[i];
            if (column.name === filtroOpcional.campoFiltrado && filtroOpcional.esteticaFiltro === "desplegable") {
                return (
                    <FiltroDesplegable
                        {...props}
                        valoresPosiblesFiltro={filtroOpcional.valoresPosiblesFiltro}
                        nombre={filtroOpcional.campoFiltrado}
                        campoVisibleFiltro={filtroOpcional.campoVisibleFiltro}
                        campoClaveFiltro={filtroOpcional.campoClaveFiltro}
                        controlErrores={filtroOpcional.controlErrores}
                        desplegableFiltroLista={true}
                        desactivado={filtroOpcional.desactivado}
                    />
                );
            }
        }

        if (column.tipo === "icono" || column.tipo === "imagen" || column.tipo === "archivo") {
            return <TableFilterRow.Cell filteringEnabled={false} getMessage={props.getMessage} />;
        }

        for (let i in this.filtroAutomatico) {
            const filtroOpcional = this.filtroAutomatico[i];
            if (column.name === filtroOpcional.campoFiltrado && filtroOpcional.esteticaFiltro === "opciones") {
                return <FiltroOpciones filter={filter || undefined} onFilter={onFilter} />;
            }
        }

        return <TableFilterRow.Cell {...props} />;
    };

    commitChanges = ({ added, changed, deleted }) => {
        // let changedRows;
        // let rows = this.props.filas;

        // if (added) {
        //     const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        //     changedRows = [
        //         ...rows,
        //         ...added.map((row, index) => ({
        //             id: startingAddedId + index,
        //             ...row
        //         }))
        //     ];
        // }

        if (changed) {
            let indiceFila = Object.keys(changed)[0];
            let filaOriginal = this.props.filas[indiceFila];
            let cambiosFila = changed[indiceFila];
            let filaCambiada = { ...filaOriginal, ...cambiosFila };
            this.props.funcionGuardarEnLinea(filaCambiada, cambiosFila, "modificacion");

            // changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }

        // if (deleted) {
        //     const deletedSet = new Set(deleted);
        //     changedRows = rows.filter(row => !deletedSet.has(row.id));
        // }

        // setRows(changedRows);
    };

    funcionSeleccion = seleccion => {
        if (this.props.previsualizacion && seleccion.length > 0) {
            let indiceFilaSeleccionada = seleccion[seleccion.length - 1];
            this.setfilasExpandidasIds([indiceFilaSeleccionada]);
        }

        this.props.funcionSeleccion(seleccion);
    };

    funcionSeleccionLocal = seleccion => {
        if (this.props.filas && seleccion.length === this.props.filas.length) {
            let filtrosActivos = this.state.filtro.filter(fila => fila.value && fila.value.length > 0);
            if (filtrosActivos.length > 0) {
                this.seleccionLocal = seleccion;
                this.setState({
                    visibleMensaje: true
                });

                return;
            }
        }

        this.funcionSeleccion(seleccion);
    };

    mensajesPorIdioma = () => {
        if (!this.idioma || this.idioma !== this.props.lng) {
            this.idioma = this.props.lng;
            this.calculaCabeceras();
            this.estableceMensajes();
        }
    };

    /**
     * Función que recibe los Grid a exportar y realiza el export a csv
     */
    startExportCSV(options) {
        this.exporterRef.current.exportGrid(options);
    }

    startExport = this.startExportCSV.bind(this);

    onSave = workbook => {
        this.workbook = workbook;
        setTimeout(this.funcionAlternarExportar, 10);
    };

    funcionExportarExcel = () => {
        this.workbook.xlsx.writeBuffer().then(buffer => {
            let ficheroExportar = new Blob([buffer], {
                type: "application/octet-stream"
            });
            saveAs(ficheroExportar, "export.xlsx");
            this.funcionAlternarExportar();
        });
    };

    funcionExportarCSV = () => {
        this.workbook.csv.writeBuffer({ formatterOptions: { delimiter: ";" } }).then(buffer => {
            let ficheroExportar = new Blob(["\uFEFF" + buffer], {
                type: "text/csv;charset=utf-8;"
            });
            saveAs(ficheroExportar, "export.csv");
            this.funcionAlternarExportar();
        });
    };

    funcionAlternarExportar = () => {
        let nuevoVisibleMensajeExportar = !this.state.visibleMensajeExportar;

        if (nuevoVisibleMensajeExportar === false) {
            delete this.workbook;
        }

        this.setState({
            visibleMensajeExportar: nuevoVisibleMensajeExportar
        });
    };

    getRemoteRows = (requestedSkip, take) => {
        this.setState({
            requestedSkip: requestedSkip,
            take: take
        });
        // dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
    };

    render() {
        this.mensajesPorIdioma();

        let commandComponent = undefined;
        if (this.props.seleccionHabilitada === false && this.props.seleccionClickHabilitado === true) {
            commandComponent = CompTablaFilaSinBoton;
        } else if (this.props.seleccionHabilitada === false) {
            if (this.props.modificar) {
                commandComponent = CompTablaFilaSinSeleccion;
            } else {
                commandComponent = CompTablaFilaSinSeleccionConsulta;
            }
        } else {
            if (this.props.modificar) {
                commandComponent = CompTablaFila;
            } else {
                commandComponent = CompTablaFilaConsulta;
            }
        }

        return (
            <LeyendaContexto.Provider value={this.props.leyenda}>
                <OrdenContexto.Provider value={this.state.ordenFilas}>
                    <div className={estilos.gridRoot + " " + (this.props.seleccionClickHabilitado ? estilos.selecClick : "")}>
                        <Grid rows={this.props.verSoloSeleccionados ? this.state.seleccionFiltrada : this.props.filas} columns={this.cabeceraTraducida}>
                            {(this.props.seleccionHabilitada || this.props.seleccionClickHabilitado) && (
                                <SelectionState
                                    selection={this.props.seleccion}
                                    onSelectionChange={this.props.verSoloSeleccionados ? this.props.funcionDesseleccionVisible : this.funcionSeleccionLocal}
                                />
                            )}
                            {this.props.seleccionHabilitada || this.props.seleccionClickHabilitado ? <IntegratedSelection /> : undefined}

                            {(this.props.listaOrdenable || this.props.agrupacionHabilitada) && (
                                <SortingState sorting={this.state.ordenFilas} onSortingChange={this.cambiaOrdenFilas} />
                            )}
                            {(this.props.listaOrdenable || this.props.agrupacionHabilitada) && <IntegratedSorting />}

                            <DataTypeProvider formatterComponent={CompColumnaFecha} availableFilterOperations={this.filtrosFechas} for={this.columnasFechas} />
                            <DataTypeProvider formatterComponent={CompColumnaHora} availableFilterOperations={this.filtrosFechas} for={this.columnasHoras} />
                            <DataTypeProvider
                                formatterComponent={CompColumnaFechaHora}
                                availableFilterOperations={this.filtrosFechas}
                                for={this.columnasFechasHoras}
                            />

                            <DataTypeProvider formatterComponent={CompColumnaOpcionesIcono} for={this.columnasOpciones} />
                            <DataTypeProvider formatterComponent={CompColumColor} for={this.columnasColores} />
                            <DataTypeProvider formatterComponent={CompObs} for={this.columnasObservaciones} />
                            <DataTypeProvider formatterComponent={CompColumColorNombre} for={this.columnasColoresNombres} />
                            <DataTypeProvider formatterComponent={CompColumColorTexto} for={this.columnasColoresTextos} />
                            <DataTypeProvider
                                formatterComponent={CompColumnaNumero}
                                availableFilterOperations={this.filtrosNumericos}
                                for={this.columnasNumero}
                            />
                            <DataTypeProvider formatterComponent={EleColumnaBoton} for={this.columnasBoton} />
                            <DataTypeProvider formatterComponent={EleColumnaTripleBoton} for={this.columnasTripleBoton} />
                            <DataTypeProvider formatterComponent={EleColumnaImagen} for={this.columnasImagen} />
                            <DataTypeProvider formatterComponent={EleColumnaIcono} for={this.columnasIcono} />
                            <DataTypeProvider formatterComponent={EleColumnaCorreo} for={this.columnasCorreo} />
                            <DataTypeProvider formatterComponent={CompColumnaArchivo} for={this.columnasArchivo} />
                            <DataTypeProvider formatterComponent={CompColumnaGenerica} for={this.columnasNormales} />

                            {this.columnasResumenAgrupadas.length > 0 ? undefined : <DragDropProvider />}

                            {this.props.busquedaHabilitada && <SearchState value={this.state.busqueda} onValueChange={this.cambiaBusqueda} />}

                            {this.props.listaFiltrable && (
                                <FilteringState
                                    filters={this.props.verSoloSeleccionados ? this.props.seleccion : this.state.filtro}
                                    onFiltersChange={this.cambiaFiltro}
                                />
                            )}

                            {(this.props.listaFiltrable || this.props.busquedaHabilitada) && <IntegratedFiltering columnExtensions={this.filtrosColumnas} />}

                            {this.props.agrupacionHabilitada && (
                                <GroupingState
                                    grouping={this.state.agrupacion}
                                    onGroupingChange={this.cambiaAgrupacion}
                                    defaultExpandedGroups={this.props.agrupacionExpandidaInicial}
                                />
                            )}
                            {this.props.agrupacionHabilitada && <IntegratedGrouping />}

                            {this.props.paginacionHabilitada || this.props.previsualizacion ? (
                                <PagingState
                                    currentPage={this.state.paginaActual}
                                    onCurrentPageChange={this.cambiaPaginaActual}
                                    pageSize={this.props.verSoloSeleccionados || this.props.previsualizacion ? 0 : this.state.filasPorPagina}
                                    onPageSizeChange={this.cambiaFilasPorPagina}
                                />
                            ) : (
                                undefined
                            )}

                            {this.props.paginacionHabilitada || this.props.previsualizacion ? <IntegratedPaging /> : undefined}

                            {this.props.arbolDeDatos ? (
                                <TreeDataState expandedRowIds={this.state.filasExpandidas} onExpandedRowIdsChange={this.cambiaFilasExpandidas} />
                            ) : (
                                undefined
                            )}
                            {this.props.arbolDeDatos ? <CustomTreeData getChildRows={this.props.recuperaNodosArbol} /> : undefined}

                            {this.props.editableEnLineaBotones || this.props.editableEnLineaClick ? (
                                <EditingState
                                    onCommitChanges={this.commitChanges}
                                    onAddedRowsChange={addedRows => {
                                        addedRows.forEach(fila => {
                                            if (!fila.id) {
                                                if (!this.contador) {
                                                    this.contador = -1;
                                                }

                                                fila.id = this.contador--;
                                                fila.usuario_nombre = "#" + fila.id;
                                            }
                                        });

                                        return addedRows;
                                    }}
                                    columnExtensions={this.columnasEditables}
                                />
                            ) : (
                                <EditingState editingRowIds={this.arrayVacio} onEditingRowIdsChange={this.editarFilaDesdeColumna} />
                            )}

                            {this.props.detalleFila ? (
                                <RowDetailState expandedRowIds={this.state.filasExpandidasIds} onExpandedRowIdsChange={this.setfilasExpandidasIds} />
                            ) : (
                                undefined
                            )}

                            {/* Posibles valores de tipo para SummaryState: count, sum, max, min, avg */}
                            <SummaryState totalItems={this.columnasResumen} groupItems={this.columnasResumenAgrupadas} />
                            <IntegratedSummary calculator={calculoResumen} />

                            {/* <VirtualTableState
                                infiniteScrolling={false}
                                loading={this.state.loading}
                                totalRowCount={this.state.totalCount}
                                pageSize={VIRTUAL_PAGE_SIZE}
                                skip={this.state.skip}
                                getRows={this.getRemoteRows}
                            /> */}
                            <VirtualTable
                                height="auto"
                                tableComponent={ComponenteTabla}
                                columnExtensions={this.state.anchoCabeceras}
                                messages={this.mensajesTraducidos.tabla}
                            />

                            {this.props.listaRedimensionable ? (
                                <TableColumnResizing
                                    minColumnWidth={100}
                                    columnWidths={this.state.anchoCabeceras}
                                    onColumnWidthsChange={this.cambioAnchoColumna}
                                />
                            ) : (
                                undefined
                            )}

                            <TableHeaderRow
                                showGroupingControls={this.props.showGroupingControls}
                                showSortingControls={this.props.listaOrdenable}
                                sortLabelComponent={EleColumnaOrden}
                            />

                            {this.props.detalleFila ? <TableRowDetail rowComponent={FilaDetalle} contentComponent={this.props.detalleFila} /> : undefined}

                            {this.props.editableEnLineaBotones || this.props.editableEnLineaClick ? (
                                <TableEditRow cellComponent={CompCRUDFilaEditable} />
                            ) : (
                                undefined
                            )}
                            {this.props.editableEnLineaBotones || this.props.editableEnLineaClick ? (
                                <TableEditColumn
                                    width={90}
                                    // Da fallo al editar las filas nuevas, hay que configurarlo en modo controlado
                                    showAddCommand={false}
                                    showDeleteCommand={false}
                                    showEditCommand={this.props.editableEnLineaBotones === true}
                                    commandComponent={CompCRUDTablaFila}
                                    cellComponent={CompCRUDTablaColumna}
                                    headerCellComponent={CompCRUDTablaColumna}
                                />
                            ) : (
                                <TableEditColumn
                                    width={this.props.seleccionHabilitada === false && this.props.modificarInvisible === false ? 30 : 15}
                                    // showAddCommand={false}
                                    showEditCommand={
                                        (this.props.seleccionHabilitada && !this.props.modificarInvisible && !this.props.verSoloSeleccionados) ||
                                        (this.props.seleccionHabilitada === false &&
                                            this.props.modificarInvisible === false &&
                                            !this.props.verSoloSeleccionados)
                                    }
                                    // showDeleteCommand={false}
                                    commandComponent={commandComponent}
                                />
                            )}

                            {this.props.editableEnLineaClick && <TableInlineCellEditing cellComponent={CompCRUDFilaEditable} />}

                            {(this.props.seleccionColumnasHabilitada || this.props.busquedaHabilitada || this.props.agrupacionHabilitada) && <Toolbar />}

                            {this.props.busquedaHabilitada && <SearchPanel inputComponent={InputBusqueda} messages={this.mensajesTraducidos.busqueda} />}

                            {this.props.arbolDeDatos ? <TableTreeColumn for={this.props.columnaArbol} /> : undefined}
                            
                            <TableSummaryRow messages={this.mensajesTraducidos.resumen} />

                            <TableColumnVisibility messages={this.mensajesTraducidos.visibilidadColumnas} />

                            {this.props.seleccionColumnasHabilitada && (
                                <ColumnChooser messages={this.mensajesTraducidos.seleccionColumnas} toggleButtonComponent={BotonSeleccionColumnas} />
                            )}

                            {(this.props.listaOrdenable || this.props.agrupacionHabilitada) && (
                                <TableColumnReordering order={this.state.ordenColumnas} onOrderChange={this.cambiaOrdenColumnas} />
                            )}

                            {this.props.seleccionHabilitada || this.props.seleccionClickHabilitado ? (
                                <TableSelection
                                    headerCellComponent={EleColumnaSeleccionCabecera}
                                    cellComponent={EleColumnaSeleccion}
                                    showSelectAll={
                                        !this.props.seleccionHabilitada && this.props.seleccionClickHabilitado
                                            ? false
                                            : this.props.seleccionarTodo && this.state.agrupacion.length === 0
                                    }
                                    highlightRow={true}
                                    selectByRowClick={this.props.seleccionClickHabilitado ? true : false}
                                    showSelectionColumn={!this.props.seleccionHabilitada && this.props.seleccionClickHabilitado ? false : true}
                                />
                            ) : (
                                undefined
                            )}

                            {this.props.agrupacionHabilitada && (
                                <TableGroupRow
                                    // summaryCellComponent={algo => {
                                    //     console.log(algo);
                                    //     return algo.children;
                                    // }}
                                    messages={this.mensajesTraducidos.resumenAgrupado}
                                    showColumnsWhenGrouped={true}
                                    columnExtensions={this.state.agrupacion}
                                />
                            )}
                            {this.props.agrupacionHabilitada && (
                                <GroupingPanel
                                    showGroupingControls={this.columnasResumenAgrupadas.length > 0 ? false : true}
                                    showSortingControls
                                    messages={this.mensajesTraducidos.panelAgrupacion}
                                />
                            )}

                            {this.props.paginacionHabilitada || this.props.previsualizacion ? (
                                <PagingPanel
                                    containerComponent={CompPaginacionTematizado}
                                    pageSizes={this.props.verSoloSeleccionados || this.props.previsualizacion ? undefined : this.paginacion}
                                    messages={this.mensajesTraducidos.panelPaginacion}
                                />
                            ) : (
                                undefined
                            )}

                            {this.columnasEnBandas ? <TableBandHeader columnBands={this.columnasEnBandas} /> : undefined}

                            {this.props.listaFiltrable && (
                                <TableFilterRow
                                    toggleButtonComponent={BotonExportar}
                                    showFilterSelector
                                    cellComponent={this.celdaFiltradoPersonalizado}
                                    messages={this.mensajesTraducidos.filtro}
                                />
                            )}

                            {this.props.seleccionColumnasHabilitada || this.props.busquedaHabilitada || this.props.agrupacionHabilitada ? (
                                <ExportPanel messages={this.mensajesExportarTraducidos} startExport={this.startExport} />
                            ) : (
                                undefined
                            )}

                            <Template name="root">
                                <TemplateConnector>
                                    {({ rows: filteredRows }) => {
                                        this.filasFiltradas = filteredRows;
                                        return <TemplatePlaceholder />;
                                    }}
                                </TemplateConnector>
                            </Template>
                        </Grid>

                        {(this.props.seleccionColumnasHabilitada || this.props.busquedaHabilitada || this.props.agrupacionHabilitada) && (
                            <GridExporter
                                ref={this.exporterRef}
                                rows={this.props.verSoloSeleccionados ? this.state.seleccionFiltrada : this.props.filas}
                                columns={this.cabeceraTraducida}
                                grouping={this.state.agrupacion}
                                selection={this.props.seleccion}
                                sorting={this.state.ordenFilas}
                                filters={this.props.verSoloSeleccionados ? this.props.seleccion : this.state.filtro}
                                onSave={this.onSave}
                            />
                        )}

                        <EleVentanaEmergente
                            textoBoton="CSV"
                            textoBotonOk="Excel"
                            iconoBoton="text_snippet"
                            sino={true}
                            ancho="xs"
                            titulo={this.props.t("export_file")}
                            funcionAceptar={this.funcionExportarExcel}
                            mostrarError={this.state.visibleMensajeExportar}
                            mensaje={this.props.t("export_format")}
                            funcionAceptarSecundario={this.funcionExportarCSV}
                            funcionCerrarVentana={this.funcionAlternarExportar}
                        />

                        <EleVentanaEmergente
                            textoBoton={this.props.t("filtered_rows")}
                            textoBotonOk={this.props.t("all_rows")}
                            iconoBoton="filter_list"
                            sino={true}
                            ancho="sm"
                            titulo={this.props.t("row_selection")}
                            funcionAceptar={this.funcionAceptar}
                            mostrarError={this.state.visibleMensaje}
                            mensaje={this.props.t("select_rows_message")}
                            funcionAceptarSecundario={this.funcionAceptarSecundario}
                            funcionCerrarVentana={this.funcionAlternaDialogo}
                        />
                    </div>
                </OrdenContexto.Provider>
            </LeyendaContexto.Provider>
        );
    }
}

const InputBusqueda = props => {
    let mensaje = props.getMessage("searchPlaceholder");

    return (
        <CompEntrada
            claseCss={estilos.campoBuscar}
            tipoEntrada="EntradaTexto"
            obligatorio={false}
            textoInfoCampo={mensaje}
            tipo="text"
            mensajeValidacion={null}
            adornoIzquierdo={<EleIcono color="disabled" icono="search" />}
            valor={props.value}
            funcionOnChange={props.onValueChange}
            perderFocoConEnter={true}
        />
    );
};

const BotonSeleccionColumnas = props => {
    let mensaje = props.getMessage("showColumnChooser");

    return (
        <EleBotonImagen
            referencia={props.buttonRef}
            fuente="small"
            icono="visibility_off"
            tooltip={mensaje}
            placement="right-start"
            funcionOnClick={props.onToggle}
        />
    );
};

const BotonExportar = props => {
    return (
        <EleBotonImagen
            desactivado={props.disabled}
            referencia={props.buttonRef}
            fuente="small"
            icono={props.children}
            placement="right-start"
            funcionOnClick={props.onToggle}
        />
    );
};

const estiloTematizado = tema => ({
    tableStriped: {
        "& tbody td": {
            padding: "8px"
        },
        "& tbody td > *": {
            minHeight: "21px"
        },
        '& tbody tr[class*="TableSelectRow-selected"]': {
            backgroundColor: `${tema.palette.primary.main}40`
        },
        '& tbody tr[class*="TableSelectRow-selected"]:nth-of-type(odd)': {
            backgroundColor: `${tema.palette.primary.main}60`
        },
        '& tbody tr[class*="TableSelectRow-selected"]:hover': {
            backgroundColor: `${tema.palette.primary.main}90 !important`
        },
        "& tbody tr:nth-of-type(odd)": {
            backgroundColor: tema.palette.action.selected
        },
        "& tbody tr:nth-of-type(even) td > div": {
            backgroundColor: "transparent"
        },
        "& tbody tr.consulta td": {
            color: "gray"
        },
        marginBottom: "0px !important"
    }
});

const ComponenteTablaBase = ({ classes, ...restProps }) => <Table.Table {...restProps} className={classes.tableStriped + " " + estilos.tablaBase} />;

const ComponenteTabla = withStyles(estiloTematizado, {
    name: "TableComponent"
})(ComponenteTablaBase);

const FilaDetalle = props => {
    return <Table.Row style={props.style}>{props.children}</Table.Row>;
};

const estiloPaginacionTematizado = tema => ({
    activo: {
        "& .Pagination-text": {
            color: tema.palette.text.primary + " !important"
        }
    },
    inactivo: {
        "& .Pagination-text": {
            color: tema.palette.text.disabled + " !important"
        }
    }
});

const CompPaginacion = ({ ...props }) => {
    return (
        <div className={estilos.contenedorLeyenda}>
            <ElePieLeyenda />
            <PagingPanel.Container className={props.totalPages === 1 ? props.classes.inactivo : props.classes.activo} {...props} />
        </div>
    );
};

const CompPaginacionTematizado = withStyles(estiloPaginacionTematizado)(CompPaginacion);

export default withNamespaces(["translations", "grid"])(CompTabla);
