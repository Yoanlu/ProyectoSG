import React from "react";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";
import moment from "moment";
import "moment/locale/es";

import { Scheduler, Toolbar, MonthView, DateNavigator, ViewSwitcher } from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { recogerIdioma, fechaUTC } from "../Utilidades";

import estilos from "./CompAgenda.module.css";
import EleBoton from "../../elementos/botones/EleBoton";
import EleTitulo from "../../elementos/titulos/EleTitulo";
import CompDiaAgenda from "./CompDiaAgenda";
import { withTheme } from "@mui/styles";
import anchoContenedor from "../anchoContenedor";
import CompDesplegable from "../desplegables/CompDesplegable";

/**
 * Componente agenda (programador) con eventos.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompAgenda extends React.PureComponent {
    static propTypes = {
        /**
         * Array con todos los eventos que va a mostrar la agenda.
         */
        eventos: PropTypes.array.isRequired,

        /**
         * Mes visible al crearse el componente. Por defecto será el actual.
         */
        mesInicial: PropTypes.instanceOf(Date),

        /**
         * Opción para evitar que se active el modo diario
         */
        desactivarModoDiario: PropTypes.bool,

        /**
         * Indica si los botones deben estar desactivados
         */
        desactivado: PropTypes.bool,

        /**
         * Función que genera el texto que se muestra junto al del mes visible.
         */
        funcionTextoMes: PropTypes.func,

        /**
         * Función que se ejecuta al hacer click sobre un día.
         */
        funcionOnClickDia: PropTypes.func,

        /**
         * Función que se ejecuta al hacer click sobre un evento.
         */
        funcionOnClickEvento: PropTypes.func,

        /**
         * Función que se ejecuta al cambiar el mes visible.
         */
        funcionMesCambiado: PropTypes.func,

        /**
         * Función que se ejecuta al pulsar un comentario
         */
        funcionOnClickComentario: PropTypes.func,

        /**
         * Función que se ejecuta al pulsar copia
         */
        funcionOnClickCopia: PropTypes.func,
        /**
         * Función que se ejecuta al pulsar check
         */
        funcionOnClickCheck: PropTypes.func
    };

    static defaultProps = {
        desactivado: false,
        desactivarModoDiario: false,
        funcionTextoMes: () => {
            return "";
        },
        funcionOnClickDia: () => {
            return;
        },
        funcionOnClickEvento: () => {
            return;
        },
        funcionMesCambiado: () => {
            return;
        },
        funcionOnClickComentario: () => {
            return;
        },
        funcionOnClickCopia: undefined,
        funcionOnClickCheck: () => {
            return;
        }
    };

    lista_modos = [
        {
            id: "day_mode",
            text: this.props.t("grid:day_mode")
        },
        {
            id: "month_mode",
            text: this.props.t("grid:month_mode")
        }
    ];

    constructor(props) {
        super(props);

        this.moment = moment;
        this.idioma = this.props.lng;
        this.realizarAnimacion = false;
        this.configuraMoment();

        this.esMovilTablet = props.width === "xs" || props.width === "sm" || props.width === "md";
        this.state = {
            modo: this.esMovilTablet ? "day_mode" : "month_mode",
            mesVisible: this.props.mesInicial || fechaUTC(),
            irHastaHoyActivo: false
        };

        if (this.props.mesInicial) {
            let fechaInicial = this.moment(this.props.mesInicial).format("YY-MM");
            let fechaActual = this.moment(fechaUTC()).format("YY-MM");

            if (fechaInicial !== fechaActual) {
                this.state.irHastaHoyActivo = true;
            }
        }
    }

    componentWillUnmount() {
        this.moment = null;
    }

    configuraMoment = () => {
        let idioma = recogerIdioma(this.idioma);
        try {
            require("moment/locale/" + idioma);
        } catch (excp) {}
        this.moment.locale(idioma);
    };

    funcionCambiaModo = (valor, campo) => {
        let datoCambiar = {};
        datoCambiar[campo] = valor;
        this.setState(datoCambiar);
    }

    /**
     * Función que se dispara cada vez que cambia el mes visible.
     */
    funcionCambioMes = nuevoMes => {
        this.realizarAnimacion = true;
        let mesVisible = nuevoMes.getUTCMonth();
        let anioVisible = nuevoMes.getUTCFullYear();

        let actual = fechaUTC();
        let mesActual = actual.getUTCMonth();
        let anioActual = actual.getUTCFullYear();

        let irHastaHoyActivo = true;
        if (anioVisible === anioActual && mesVisible === mesActual) {
            irHastaHoyActivo = false;
        }

        this.setState({
            mesVisible: nuevoMes,
            irHastaHoyActivo: irHastaHoyActivo
        });

        this.props.funcionMesCambiado(anioVisible, mesVisible + 1);
    };

    /**
     * Función que se dispara al pulsar sobre el botoón de "hoy", que hace visible el mes actual.
     */
    irHastaHoy = () => {
        this.funcionCambioMes(fechaUTC());
    };

    gridEscala = () => {
        return null;
    };

    gridEvento = ({ children }) => {
        let dias = children.map((dia, indice) => {
            let fechaActual = fechaUTC(dia.props.startDate);

            // Comprobamos si es del mes actual
            if (this.state.mesVisible.getUTCMonth() !== fechaActual.getUTCMonth()) {
                return undefined;
            }

            let eventosDia = this.props.eventos.filter(
                dato =>
                    fechaActual.getUTCFullYear() === fechaUTC(dato.fecha).getUTCFullYear() &&
                    fechaActual.getUTCMonth() === fechaUTC(dato.fecha).getUTCMonth() &&
                    fechaActual.getUTCDate() === fechaUTC(dato.fecha).getUTCDate()
            );

            return (
                <tr key={indice}>
                    <CompDiaAgenda
                        {...dia.props}
                        eventos={eventosDia}
                        comentarios={this.props.comentarios}
                        funcionOnClickCheck={this.props.funcionOnClickCheck}
                        funcionOnClickCopia={this.props.funcionOnClickCopia}
                        funcionOnClickComentario={this.props.funcionOnClickComentario}
                        funcionOnClickDia={this.props.funcionOnClickDia}
                        funcionOnClickEvento={this.props.funcionOnClickEvento}
                        funcionTextoDeContraste={this.props.theme.palette.getContrastText}
                        modoMovil={true}
                        moment={this.moment}
                    />
                </tr>
            );
        });

        return <>{dias}</>;
    };

    /**
     * Función que pinta un día con todos sus eventos.
     */
    evento = argumentos => {
        let fechaActual = fechaUTC(argumentos.startDate);

        let eventosDia = this.props.eventos.filter(
            dato =>
                fechaActual.getUTCFullYear() === fechaUTC(dato.fecha).getUTCFullYear() &&
                fechaActual.getUTCMonth() === fechaUTC(dato.fecha).getUTCMonth() &&
                fechaActual.getUTCDate() === fechaUTC(dato.fecha).getUTCDate()
        );

        return (
            <CompDiaAgenda
                {...argumentos}
                eventos={eventosDia}
                comentarios={this.props.comentarios}
                funcionOnClickCopia={this.props.funcionOnClickCopia}
                funcionOnClickCheck={this.props.funcionOnClickCheck}
                funcionOnClickComentario={this.props.funcionOnClickComentario}
                funcionOnClickDia={this.props.funcionOnClickDia}
                funcionOnClickEvento={this.props.funcionOnClickEvento}
                funcionTextoDeContraste={this.props.theme.palette.getContrastText}
                moment={this.moment}
            />
        );
    };

    /**
     * Función que pinta los 7 días de la semana.
     */
    diasSemana = argumentos => {
        return <CompDiaAgenda {...argumentos} moment={this.moment} />;
    };

    toolbar = () => (
        <Toolbar.FlexibleSpace>
            <div className={estilos.toolbar}>
                {this.props.toolbar}
                <div className={estilos.toolbarAgenda}>
                    <EleBoton
                        desactivado={this.props.desactivado || !this.state.irHastaHoyActivo}
                        claseCss={estilos.botonMes}
                        primario
                        texto={this.props.t("today")}
                        apariencia="contained"
                        funcionOnClick={this.irHastaHoy}
                    />
                    &nbsp;&nbsp;
                    <CompDesplegable
                        tipoDesplegable="desplegable"
                        nombre="modo"
                        obligatorio={true}
                        datos={this.lista_modos}
                        idSeleccionado={this.state.modo}
                        campoClave="id"
                        campoVisible="text"
                        etiqueta={this.props.t("grid:mode")}
                        controlErrores={null}
                        funcionOnChange={this.funcionCambiaModo}
                    />
                </div>
                &nbsp;
            </div>
        </Toolbar.FlexibleSpace>
    );

    mostrarTiempo = () => {
        const mes = this.moment(this.state.mesVisible).format("MMMM");
        const textoMes = this.props.funcionTextoMes(this.state.mesVisible);

        return (
            <EleTitulo color="textPrimary" enLinea claseCss={estilos.capital}>
                <b>{mes + " " + this.state.mesVisible.getUTCFullYear()}</b>
                {textoMes ? " (" + textoMes + ")" : ""}
            </EleTitulo>
        );
    };

    render() {
        if (this.idioma !== this.props.lng) {
            this.idioma = this.props.lng;
            this.configuraMoment();
        }

        let animacion = "";
        if (this.realizarAnimacion) {
            animacion = " animated fadeIn faster";
            this.realizarAnimacion = false;
        }

        return (
            <Scheduler
                locale={this.props.lng}
                firstDayOfWeek={recogerIdioma(this.props.lng) === "en" ? 0 : 1}
                rootComponent={({ children }) => {
                    return (
                        <div className={estilos.contenedorScheduler + animacion + (this.props.desactivado ? " " + estilos.desactivado : "")}>{children}</div>
                    );
                }}
            >
                <ViewState
                    currentDate={this.state.mesVisible}
                    // defaultCurrentViewName={this.esMovilTablet ? "day_mode" : "month_mode"}
                    currentViewName={this.props.desactivarModoDiario === true ? "month_mode" : this.state.modo}
                    onCurrentDateChange={this.funcionCambioMes}
                />
                <MonthView name="month_mode" dayScaleCellComponent={this.diasSemana} timeTableCellComponent={this.evento} />

                <MonthView
                    name="day_mode"
                    dayScaleCellComponent={this.diasSemana}
                    timeTableCellComponent={this.evento}
                    dayScaleLayoutComponent={this.gridEscala}
                    timeTableRowComponent={this.gridEvento}
                />

                <Toolbar flexibleSpaceComponent={this.toolbar} />
                <DateNavigator openButtonComponent={this.mostrarTiempo} />
            </Scheduler>
        );
    }
}

export default anchoContenedor(withTheme(withNamespaces(["translations", "grid"])(CompAgenda)));
