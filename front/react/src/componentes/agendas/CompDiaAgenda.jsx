import React from "react";
import PropTypes from "prop-types";

import { TableCell, Hidden } from "@mui/material";
import { withStyles } from "@mui/styles";
import estilos from "./CompAgenda.module.css";
import { estaVacio, fechaUTC, fechaUTCString } from "../Utilidades";
import EleIcono from "../../elementos/iconos/EleIcono";
import EleEntradaInterruptor from "../../elementos/entradaInterruptor/EleEntradaInterruptor";

/**
 * Componente Dia del componente Agenda (td de tabla).
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */

class CompDiaAgenda extends React.PureComponent {
    static propTypes = {
        /**
         * Fecha de inicio del día.
         */
        startDate: PropTypes.instanceOf(Date).isRequired,

        /**
         * Fecha de fin del día.
         */
        endDate: PropTypes.instanceOf(Date).isRequired,

        /**
         * Indica si el día pertenece al mes visualizado o no.
         */
        otherMonth: PropTypes.bool,

        /**
         * Indica si el día es el actual.
         */
        today: PropTypes.bool,

        /**
         * Indica si se dede mostrar en modo movil/agenda en una fila.
         */
        modoMovil: PropTypes.bool,

        /**
         * Array con todos los eventos que se produzcan este día.
         */
        eventos: PropTypes.array,

        /**
         * Función que se ejecuta al hacer click sobre un día.
         */
        funcionOnClickDia: PropTypes.func,

        /**
         * Función que se ejecuta al hacer click sobre un evento.
         */
        funcionOnClickEvento: PropTypes.func,

        /**
         * Función que se ejecuta al hacer click sobre copia.
         */
        funcionOnClickCopia: PropTypes.func,
        /**
         * Función que se ejecuta al hacer click sobre check.
         */
        funcionOnClickCheck: PropTypes.func,

        /**
         * Objeto con todas las clases css del tema.
         */
        classes: PropTypes.objectOf(PropTypes.string),

        /**
         * Función que calcula el color de contraste para el texto a partir del color de fondo.
         */
        funcionTextoDeContraste: PropTypes.func,

        /**
         * Objeto que trata las fechas.
         */
        moment: PropTypes.func.isRequired
    };

    static defaultProps = {
        funcionOnClickCopia: undefined,
        funcionOnClickCheck: () => {},
        funcionOnClickDia: () => {},
        funcionOnClickEvento: () => {},
        funcionTextoDeContraste: () => {
            return "black";
        }
    };

    /**
     * Función que se dispara al hacer click sobre un día.
     */
    funcionOnClickDia = evento => {
        evento.preventDefault();
        if (evento.target === evento.currentTarget) {
            const fechaDia = fechaUTC(this.props.startDate);
            this.props.funcionOnClickDia(fechaDia);
        }
    };

    funcionOnClickComentario = evento => {
        evento.preventDefault();
        const fechaDia = fechaUTCString(fechaUTC(this.props.startDate));
        this.props.funcionOnClickComentario(fechaDia);
    };

    funcionOnClickCopia = evento => {
        evento.preventDefault();
        const fechaDia = fechaUTCString(fechaUTC(this.props.startDate));
        this.props.funcionOnClickCopia(fechaDia);
    };

    funcionOnClickCheck = rest => {
        this.props.funcionOnClickCheck(rest);
    };

    render() {
        if (this.props.otherMonth === undefined) {
            let diaPc = this.props.moment(this.props.startDate).format("dddd");
            let diaMovil = this.props.moment(this.props.startDate).format("dd");

            return (
                <TableCell className={estilos.nombreDia + " " + this.props.classes.root + " " + this.props.classes.nombreDia}>
                    <Hidden smUp implementation="css">
                        {diaMovil}
                    </Hidden>
                    <Hidden smDown implementation="css">
                        {diaPc}
                    </Hidden>
                </TableCell>
            );
        }

        let fechaDia = fechaUTC(this.props.startDate);
        let dia = fechaDia.getUTCDate();

        let numeroDia = fechaDia.getUTCDay();

        let claseCss = estilos.cell + " " + this.props.classes.root + " " + this.props.classes.columnaDia;
        let claseDia = estilos.hoy + " " + this.props.classes.otroDia;

        if (this.props.otherMonth) {
            claseCss += " " + this.props.classes.otroMes;
        }

        if (numeroDia === 0) {
            claseCss += " " + this.props.classes.domingo;
        }

        if (this.props.today) {
            claseDia = estilos.hoy + " " + this.props.classes.hoy;
        }

        let hayComentarioDia = false;
        if (this.props.comentarios && this.props.comentarios.length > 0) {
            let fechaTexto = fechaUTCString(fechaDia);
            let comentarioDia = this.props.comentarios.filter(fila => fila.fecha === fechaTexto);

            if (comentarioDia.length > 0) {
                hayComentarioDia = true;
            }
        }

        let textoDia = "";
        if (this.props.modoMovil) {
            textoDia = this.props.moment(fechaDia).format("dddd");
        }

        return (
            <TableCell className={claseCss}>
                <div className={estilos.contenedorDia} onClick={this.funcionOnClickDia}>
                    <div onClick={this.funcionOnClickDia}>
                        <div className={claseDia}>{dia}</div>
                        {textoDia ? <b>&nbsp;&nbsp;{textoDia}</b> : undefined}
                    </div>

                    {this.props.funcionOnClickCopia && (
                        <div className={estilos.copia} onClick={this.funcionOnClickCopia}>
                            <EleIcono color={"disabled"} icono={"content_copy"} />
                        </div>
                    )}

                    {this.props.funcionOnClickComentario && this.props.comentarios && (
                        <div className={hayComentarioDia ? estilos.verComentario : estilos.nuevoComentario} onClick={this.funcionOnClickComentario}>
                            <EleIcono color={hayComentarioDia ? "primary" : "disabled"} icono={"comment"} />
                        </div>
                    )}

                    <div className={estilos.contenedorEventosDia}>
                        {this.props.eventos.map(evento => {
                            const { id, fecha, titulo, color, estado } = evento;

                            const eventoCompleto = { id, fecha, titulo, color, estado, ...evento };
                            return (
                                <div
                                    key={id + " - " + fecha + " - " + titulo}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        backgroundColor: color,
                                        margin: 5
                                    }}
                                >
                                    <div
                                        key={id + " - " + fecha + " - " + titulo}
                                        style={{
                                            backgroundColor: color
                                        }}
                                        className={estilos.evento}
                                        onClick={this.props.funcionOnClickEvento.bind(this, fecha, id)}
                                    >
                                        <span
                                            style={{
                                                color: estaVacio(color) ? "grey" : this.props.funcionTextoDeContraste(color)
                                            }}
                                        >
                                            {titulo}
                                        </span>
                                    </div>
                                    <div onClick={this.funcionOnClickCheck.bind(this, eventoCompleto)}>
                                        <span
                                            style={{
                                                color: estaVacio(color) ? "grey" : this.props.funcionTextoDeContraste(color)
                                            }}
                                        >
                                            {this.props.funcionOnClickCheck &&
                                                (estado === 3 ? (
                                                    <EleEntradaInterruptor
                                                        chequeado={estado === 2}
                                                        etiqueta={estado === 2 ? "Visitado" : "No visitado"}
                                                        ubicacionEtiqueta="start"
                                                        nombre="la_mejor"
                                                        funcionOnChange={() => {}}
                                                    />
                                                ) : estado === 2 ? (
                                                    <EleEntradaInterruptor
                                                        chequeado={estado === 2}
                                                        etiqueta={estado === 2 ? "Visitado" : "No visitado"}
                                                        ubicacionEtiqueta="start"
                                                        nombre="la_mejor"
                                                        funcionOnChange={() => {}}
                                                    />
                                                ) : null)}
                                        </span>

                                        <span></span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </TableCell>
        );
    }
}

const estiloDiaTematizado = tema => ({
    root: {
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        borderLeftColor: tema.palette.divider,
        "&:hover": {
            backgroundColor: tema.palette.action.hover
        },
        [tema.breakpoints.down("sm")]: {
            fontSize: "60%"
        }
    },
    columnaDia: {
        height: "90px",
        [tema.breakpoints.down("sm")]: {
            height: "60px"
        }
    },
    domingo: {
        backgroundColor: tema.palette.background.default
    },
    nombreDia: {
        backgroundColor: tema.palette.background.default,
        color: tema.palette.primary.main,
        [tema.breakpoints.down("sm")]: {
            fontSize: "60%"
        }
    },
    otroMes: {
        color: tema.palette.action.disabled
    },
    hoy: {
        backgroundColor: tema.palette.primary.main,
        color: tema.palette.primary.contrastText
    },
    otroDia: {
        // backgroundColor: tema.palette.action.active,
        color: tema.palette.primary.contrastText
    }
});

export default withStyles(estiloDiaTematizado)(CompDiaAgenda);
