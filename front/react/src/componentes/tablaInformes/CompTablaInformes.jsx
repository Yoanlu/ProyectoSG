import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import DataGrid, {
    Button,
    Selection,
    Column,
    Grouping,
    GroupPanel,
    Paging,
    Scrolling,
    SearchPanel,
    Pager,
    Summary,
    GroupItem,
    Export,
    TotalItem,
    ColumnFixing,
    MasterDetail,
    Sorting
} from "devextreme-react/data-grid";
import { jsPDF } from "jspdf";
import { exportDataGrid as exportPDF } from "devextreme/pdf_exporter";
import { exportDataGrid as exportExcel } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver"; // Importación estática de file-saver

import { locale, loadMessages } from "devextreme/localization";
import CompColumnaNumeroDetalle from "./CompColumnaNumeroDetalle";
import CompColumnaPorcentajeDetalle from "./CompColumnaPorcentajeDetalle";
import CompColumnaOpciones from "./CompColumnaOpciones";

import estilos from "./CompTablaInformes.module.css";
import CompColumnaBasica from "./CompColumnaBasica";

import enMessages from "devextreme/localization/messages/en.json";
import esMessages from "./localization/es.json";
import EleIcono from "../../elementos/iconos/EleIcono";
import CompColumnaBoton from "./CompColumnaBoton";
import { estaVacio, formatearNumero } from "../Utilidades";

const exportFormats = ["pdf", "xlsx"];

const onExporting = e => {
    if (e.format === "pdf") {
        const doc = new jsPDF({
            orientation: "landscape",
            compressPdf: true
        });
        
        exportPDF({
            jsPDFDocument: doc,
            component: e.component,
            indent: 3
        }).then(() => {
            doc.save("Informe.pdf");
        });

    } else if (e.format === "xlsx") {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Informe");

        exportExcel({
            component: e.component,
            worksheet: worksheet,
            autoFilterEnabled: true
        }).then(() => {
            workbook.xlsx.writeBuffer().then(buffer => {
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Informe.xlsx");
            });
        });

        e.cancel = true;
    }
};

class CompTablaInformes extends React.Component {
    static propTypes = {
        t: PropTypes.func.isRequired,
        lng: PropTypes.string.isRequired,

        columnas: PropTypes.array.isRequired,
        filas: PropTypes.array.isRequired,
        filasSeleccionadas: PropTypes.array,
        ordenarColumnasHabilitada: PropTypes.bool,
        panelGruposHabilitado: PropTypes.bool,
        campoBusquedaVisible: PropTypes.bool,
        gruposExpandidos: PropTypes.bool,
        detallesExpandidos: PropTypes.bool,
        numeroPaginasDefecto: PropTypes.number,
        numeroPaginasVisible: PropTypes.bool,
        exportHabilitado: PropTypes.bool,
        columnAutoWidth: PropTypes.bool,
        calcularSumatorios: PropTypes.func,
        funcionSeleccionCambiada: PropTypes.func,
        funcionRenderizarDetalle: PropTypes.func,
        agrupacionHabilitada: PropTypes.bool,
        seleccionHabilitada: PropTypes.bool,

        /**
         * Columnas por las que se va a ordenar de inicio.
         */
        campoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),

        /**
         * Sentido en el que se van a ordenar las columnas ordenables iniciales.
         */
        sentidoOrdenacion: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOf(["asc", "desc"])), PropTypes.string])
    };

    static defaultProps = {
        columnAutoWidth: false,
        agrupacionHabilitada: true,
        seleccionHabilitada: false,
        campoBusquedaVisible: false,
        gruposExpandidos: false,
        detallesExpandidos: false,
        campoOrdenacion: null,
        sentidoOrdenacion: null,
        numeroPaginasDefecto: 1000
    };

    constructor(props) {
        super(props);
        this.state = {
            columnasTraducidas: [],
            filasSeleccionadasControladas: [],
            hayColumnasFijas: false,
            cambiaIdioma: false
        };

        this.paginacion = [100, 1000, 0];

        locale(this.props.lng);
        loadMessages(esMessages);
        loadMessages(enMessages);
    }

    mensajesPorIdioma = () => {
        if (!this.idioma || this.idioma !== this.props.lng) {
            this.idioma = this.props.lng;
            this.traduccionColumnas();
        }
    };

    traduccionColumnas = () => {
        let hayColumnasFijas = false;

        let ordenFilas = [];
        if (Array.isArray(this.props.campoOrdenacion)) {
            for (let i = 0; i < this.props.campoOrdenacion.length; i++) {
                if (this.props.campoOrdenacion[i] && this.props.sentidoOrdenacion[i]) {
                    ordenFilas.push({
                        columna: this.props.campoOrdenacion[i],
                        direccion: this.props.sentidoOrdenacion[i],
                        indice: i
                    });
                }
            }
        } else {
            if (this.props.campoOrdenacion && this.props.sentidoOrdenacion) {
                ordenFilas.push({
                    columna: this.props.campoOrdenacion,
                    direccion: this.props.sentidoOrdenacion,
                    indice: 0
                });
            }
        }

        let arrayTraducciones = [];
        for (let i = 0; i < this.props.columnas.length; i++) {
            if (this.props.columnas[i].columnaFija === true) {
                hayColumnasFijas = true;
            }

            let datosColumna = {
                campo: this.props.columnas[i].campo || "",
                tipo: this.props.columnas[i].tipo,
                columnaFija: this.props.columnas[i].columnaFija,

                columna: this.props.columnas[i].columna,
                columnaNum: this.props.columnas[i].columnaNum,
                columnaTotal: this.props.columnas[i].columnaTotal,
                mostrarTextoResumen: this.props.columnas[i].mostrarTextoResumen,

                indiceOrden: undefined,
                direccionOrden: undefined,

                funcion: this.props.columnas[i].funcion,
                indiceGrupo: this.props.columnas[i].indiceGrupo,
                titulo: this.props.t(this.props.columnas[i].titulo),
                resumenArriba: this.props.columnas[i].resumenArriba,
                resumenAbajo: this.props.columnas[i].resumenAbajo,
                tituloDeTotal: this.props.t(this.props.columnas[i].tituloDeTotal)
            };

            let columnaOrden = ordenFilas.find(f => f.columna === datosColumna.campo);
            if (columnaOrden) {
                datosColumna.indiceOrden = columnaOrden.indice;
                datosColumna.direccionOrden = columnaOrden.direccion;
            }

            arrayTraducciones.push(datosColumna);
        }
        this.setState({
            columnasTraducidas: arrayTraducciones,
            cambiaIdioma: true,
            hayColumnasFijas: hayColumnasFijas
        });
    };

    pintarColumnas = (columna, index) => {
        let columnaFija = columna.columnaFija || false;

        let indiceOrden = columna.indiceOrden;
        let direccionOrden = columna.direccionOrden;

        if (columna.tipo === "boton") {
            return (
                <Column
                    key={index}
                    fixed={columnaFija}
                    cssClass={estilos.cabeceraColumna}
                    alignment="center"
                    // dataField={columna.campo}
                    // caption={columna.titulo}
                    defaultSortIndex={indiceOrden}
                    defaultSortOrder={direccionOrden}
                    groupIndex={columna.indiceGrupo}
                    cellRender={CompColumnaBoton.bind(this, columna)}
                />
            );
        } else if (columna.tipo === "porcentaje_detalle") {
            return (
                <Column
                    key={index}
                    fixed={columnaFija}
                    alignment="right"
                    cssClass={estilos.cabeceraColumna}
                    dataField={columna.campo || ""}
                    caption={columna.titulo}
                    defaultSortIndex={indiceOrden}
                    defaultSortOrder={direccionOrden}
                    // dataType="string"
                    groupIndex={columna.indiceGrupo}
                    cellRender={CompColumnaPorcentajeDetalle.bind(this, columna)}
                />
            );
        } else if (columna.tipo === "numero_detalle") {
            return (
                <Column
                    key={index}
                    fixed={columnaFija}
                    alignment="right"
                    cssClass={estilos.cabeceraColumna}
                    dataField={columna.campo || ""}
                    caption={columna.titulo}
                    defaultSortIndex={indiceOrden}
                    defaultSortOrder={direccionOrden}
                    // dataType="string"
                    groupIndex={columna.indiceGrupo}
                    cellRender={CompColumnaNumeroDetalle.bind(this, columna)}
                />
            );
        } else if (columna.tipo === "opciones") {
            return (
                <Column
                    key={index}
                    fixed={columnaFija}
                    alignment="right"
                    cssClass={estilos.cabeceraColumna}
                    dataField={columna.campo || ""}
                    caption={columna.titulo}
                    defaultSortIndex={indiceOrden}
                    defaultSortOrder={direccionOrden}
                    dataType="boolean"
                    groupIndex={columna.indiceGrupo}
                    cellRender={CompColumnaOpciones.bind(this, columna)}
                />
            );
        } else if (columna.tipo === "fecha" || columna.tipo === "fecha_hora" || columna.tipo === "fecha_horamin") {
            let formato = "dd/MM/yyyy";
            if (this.props.lng.includes("en-")) {
                formato = "MM-dd-yyyy";
            }

            if (columna.tipo === "fecha_horamin") {
                formato += " HH:mm";
            } else if (columna.tipo === "fecha_hora") {
                formato += " HH:mm:ss";
            }

            return (
                <Column
                    key={index}
                    fixed={columnaFija}
                    alignment="center"
                    cssClass={estilos.cabeceraColumna}
                    dataField={columna.campo || ""}
                    caption={columna.titulo}
                    defaultSortIndex={indiceOrden}
                    defaultSortOrder={direccionOrden}
                    groupIndex={columna.indiceGrupo}
                    //cellRender={CompColumnaBasica.bind(this, columna)}
                    dataType="datetime"
                    format={formato}
                />
            );
        } else {
            let alineacion = "left";
            let tipoDatoNumerico = columna.tipo === "numero" || columna.tipo === "porcentaje";

            if (tipoDatoNumerico) {
                alineacion = "right";
            }

            return (
                <Column
                    key={index}
                    fixed={columnaFija}
                    cssClass={estilos.cabeceraColumna}
                    alignment={alineacion}
                    dataField={columna.campo || ""}
                    caption={columna.titulo}
                    defaultSortIndex={indiceOrden}
                    defaultSortOrder={direccionOrden}
                    dataType={tipoDatoNumerico ? "number" : "string"}
                    groupIndex={columna.indiceGrupo}
                    cellRender={CompColumnaBasica.bind(this, columna)}
                />
            );
        }
    };

    filtrarPorResumen = columna => columna.resumenAbajo || columna.resumenArriba || columna.mostrarTextoResumen;

    pintarTotalesGrupos = (columna, index) => {
        let tipoDeResumen = columna.resumenAbajo || columna.resumenArriba;

        if (tipoDeResumen === "custom" && !this.props.calcularSumatorios) {
            // Si es custom y no se define el cálculo de sumatorios, no mostramos resumen
            return;
        }

        let formatoTotal = undefined;
        if (columna.mostrarTextoResumen && !tipoDeResumen) {
            if (typeof columna.mostrarTextoResumen === "string") {
                formatoTotal = `${this.props.t(columna.mostrarTextoResumen)}:`;
            } else {
                // Debo mostrar el texto "total" pero no un calculo
                formatoTotal = `${this.props.t("grid:total")}:`;
            }
        } else if (!columna.mostrarTextoResumen && tipoDeResumen) {
            // Debo mostrar el calculo sin el texto "total", lo dejamos por defecto
        } else if (columna.mostrarTextoResumen && tipoDeResumen) {
            // Debo mostrar el texto "total" con el calculo
            formatoTotal = `${this.props.t("grid:total")}: {0}`;
        } else {
            // Debo mostrar el calculo sin el texto "total", lo dejamos por defecto
        }

        return [
            <GroupItem
                key={`group-${index}`}
                name={columna.campo}
                column={columna.campo} // Usar el campo como referencia
                cssClass={estilos.alinearDerecha}
                valueFormat={this.formatearValorNumero}
                summaryType={tipoDeResumen ? tipoDeResumen : undefined} // Tipo de resumen (e.g., count, sum, avg)
                alignByColumn={true}
                showInGroupFooter={!estaVacio(columna.resumenAbajo)}
                // showInColumn={columna.campo} // Mostrar el total en la columna correspondiente
            />,
            <TotalItem
                key={`total-${index}`}
                name={columna.campo}
                column={columna.campo} // Campo para calcular el total
                cssClass={estilos.alinearDerecha}
                valueFormat={this.formatearValorNumero}
                summaryType={tipoDeResumen ? tipoDeResumen : undefined} // Tipo de resumen total (count)
                alignByColumn={true}
                displayFormat={formatoTotal} // Formato de visualización
                // showInColumn={columna.campo} // Mostrar el total en la columna correspondiente
            />
        ];
    };

    formatearValorNumero = value => {
        return formatearNumero(value, 2);
    };

    onSelectionChanged = ({ component, currentDeselectedRowKeys, currentSelectedRowKeys, selectedRowsData }) => {
        if (this.props.funcionSeleccionCambiada) {
            this.props.funcionSeleccionCambiada(selectedRowsData);
        } else {
            this.setState({
                filasSeleccionadasControladas: selectedRowsData
            });
        }
    };

    onRowClick = ({ cells, columns, component, data, element, key, loadIndex, rowElement, rowIndex, rowType, values }) => {
        if (this.props.funcionRenderizarDetalle) {
            // Es modo maestro detalle
            component.expandRow(key);
        }
    };

    onRowExpanding = ({ component, element, expanded, key }) => {
        if (this.props.funcionRenderizarDetalle) {
            // Es modo maestro detalle
            component.collapseAll(-1); // Colapsamos todas las filas
        }
    };

    onRowExpanded = ({ component, element, expanded, key }) => {
        // console.log("onRowExpanded:", expanded);
    };

    componentDidMount() {
        // Ocultamos el mensaje de licencia
        try {
            // No es necesario, se activa bien tras arreglar el import de devextreme/ui/themes
            // document.querySelector("dx-license svg").parentNode.click();
        } catch (error) {}
    }

    componentDidUpdate(oldProps, oldState) {
        this.mensajesPorIdioma();

        if (oldState.cambiaIdioma === false && this.state.cambiaIdioma) {
            locale(this.props.lng);
            this.setState({
                cambiaIdioma: false
            });
        }
    }

    render() {
        if (this.state.cambiaIdioma) {
            return null;
        }

        let hayFilasSeleccionadas = false;
        try {
            if (this.props.filasSeleccionadas.length > 0) {
                hayFilasSeleccionadas = true;
            }
        } catch (error) {}

        try {
            if (this.state.filasSeleccionadasControladas.length > 0) {
                hayFilasSeleccionadas = true;
            }
        } catch (error) {}

        return (
            <div className={estilos.contenedorDatagrid}>
                <DataGrid
                    dataSource={this.props.filas}
                    allowColumnReordering={this.props.ordenarColumnasHabilitada}
                    width="100%"
                    height="100%"
                    columnAutoWidth={this.props.columnAutoWidth}
                    showBorders={true}
                    onExporting={onExporting}
                    banded={false}
                    rowAlternationEnabled={true}
                    hoverStateEnabled={true}
                    allowSelectAll={true}
                    onSelectionChanged={this.onSelectionChanged}
                    onRowClick={this.onRowClick}
                    onRowExpanding={this.onRowExpanding}
                    onRowExpanded={this.onRowExpanded}
                    showCheckBoxesMode="onClick" // always" | "none" | "onClick" | "
                    selectedRowKeys={this.props.filasSeleccionadas || this.state.filasSeleccionadasControladas}
                >
                    <Selection
                        mode={this.props.funcionRenderizarDetalle ? "single" : this.props.seleccionHabilitada ? "multiple" : "none"} // single, multiple, none
                        selectAllMode="allPages" // allPages, page
                        selectByClick={false}
                    />

                    <Sorting mode="multiple" />
                    <Scrolling
                        columnRenderingMode="standard"
                        rowRenderingMode={this.props.filas && this.props.filas.length >= 500 ? "virtual" : "standard"}
                        showScrollbar="always"
                    />
                    <GroupPanel visible={this.props.panelGruposHabilitado} />
                    <SearchPanel visible={this.props.campoBusquedaVisible} />
                    <Grouping autoExpandAll={this.props.gruposExpandidos} showGroupedColumns={true} />
                    <Paging defaultPageSize={this.props.numeroPaginasDefecto} />
                    <Pager
                        showInfo={true}
                        visible={this.props.numeroPaginasVisible}
                        showPageSizeSelector={true}
                        allowedPageSizes={this.paginacion}
                        showNavigationButtons={true}
                    />

                    <Export
                        enabled={this.props.exportHabilitado}
                        formats={exportFormats}
                        allowExportSelectedData={this.props.seleccionHabilitada && hayFilasSeleccionadas}
                    />
                    <ColumnFixing enabled={this.state.hayColumnasFijas} />

                    {this.props.funcionRenderizarDetalle ? (
                        <Column type="buttons">
                            <Button cssClass={estilos.botonExpandir} name="view" /*width="max-content"*/>
                                <EleIcono icono="keyboard_arrow_right" color="action" claseCss={estilos.iconoExpandir} />
                            </Button>
                        </Column>
                    ) : null}
                    {this.state.columnasTraducidas.map(this.pintarColumnas)}

                    <Summary calculateCustomSummary={this.props.calcularSumatorios}>
                        {this.state.columnasTraducidas.filter(this.filtrarPorResumen).map(this.pintarTotalesGrupos)}
                    </Summary>

                    {this.props.funcionRenderizarDetalle ? (
                        <MasterDetail enabled={false} render={this.props.funcionRenderizarDetalle} autoExpandAll={this.props.detallesExpandidos} />
                    ) : null}
                </DataGrid>
            </div>
        );
    }
}

export default withNamespaces(["translations", "grid"])(CompTablaInformes);
