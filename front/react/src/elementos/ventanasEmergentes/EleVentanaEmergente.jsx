import React from "react";
import PropTypes from "prop-types";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { CircularProgress } from "@mui/material";
import { withNamespaces } from "react-i18next";

import EleBoton from "../botones/EleBoton";
import estilos from "./EleVentanaEmergente.module.css";
import EleTitulo from "../titulos/EleTitulo";

/**
 * Elemento correspodiente a una ventana de mantenimiento emergente.
 *
 * @version 0.2
 * @author [Iván Barriga] <ivan.barriga@sandav.es>
 */

const EleVentanaEmergente = ({
    titulo,
    mensaje,
    mostrarError = false,
    aceptarCancelar = false,
    sino = false,
    borrar = false,
    mostrarCargando = false,
    deshabilitaTeclaESC = false,
    claseCss,
    textoBoton = "",
    textoBotonOk,
    iconoBoton = "close",
    ancho = "md",
    funcionCerrarVentana,
    funcionAceptarSecundario,
    funcionAceptar,
    funcionBorrar = function() {
        return;
    },
    desactivarPortal = false,
    modoConsulta,
    autoGuardar = false,
    desactivado,
    esdesmontable = true,
    t
}) => {
    let mensajeTextoPlano = true;
    if (typeof mensaje === "object" || (typeof mensaje === "string" && mensaje.includes("<!DOCTYPE html>"))) {
        mensajeTextoPlano = false;
    }

    let refSubmit = React.createRef();

    const funcionValidar = () => {
        refSubmit.current.click();
    };

    const detectaEnter = evento => {
        if (evento.key === "Enter" && !evento.ctrlKey && !desactivado) {
            if (evento.target && evento.target.type === "textarea") {
                return;
            }

            evento.preventDefault();
            evento.stopPropagation();

            funcionValidar();
        }
    };

    const funcionGuardar = evento => {
        evento.preventDefault();
        evento.stopPropagation();

        funcionAceptar();
    };

    return (
        <Dialog
            scroll="paper"
            onClose={funcionCerrarVentana}
            open={mostrarError || esdesmontable === false}
            aria-describedby="alert-dialog-description"
            aria-labelledby="simple-dialog-title"
            disableEscapeKeyDown={deshabilitaTeclaESC === undefined ? false : deshabilitaTeclaESC}
            className={claseCss + " " + estilos.fondo + " " + (!mostrarError && !esdesmontable ? estilos.invisible : "")}
            fullWidth={ancho !== null || ancho.length !== 0 || ancho !== "undefined"}
            maxWidth={ancho}
        >
            <form
                disabled={modoConsulta}
                onKeyDown={detectaEnter}
                className={estilos.fieldset + (modoConsulta ? " soloLectura" : "")}
                onSubmit={funcionGuardar}
            >
                <DialogTitle id="simple-dialog-title">{titulo}</DialogTitle>
                <DialogContent>
                    <div disabled={modoConsulta} className={estilos.fieldset}>
                        {mensajeTextoPlano ? <EleTitulo color="textPrimary">{mensaje}</EleTitulo> : <EleTitulo>{mensaje}</EleTitulo>}
                    </div>
                </DialogContent>

                <input type="submit" ref={refSubmit} className={estilos.invisible} />

                <DialogActions className={estilos.contenedorBotones}>
                    {mostrarCargando && (
                        <div className={estilos.cargando}>
                            <CircularProgress />
                        </div>
                    )}
                    {funcionAceptarSecundario !== undefined && (
                        <EleBoton
                            apariencia="contained"
                            color="error"
                            funcionOnClick={funcionCerrarVentana}
                            icono="close"
                            texto={t("cancel")}
                            claseCss={estilos.borrar}
                        />
                    )}
                    {borrar ? (
                        <EleBoton
                            apariencia="contained"
                            color={"warning"}
                            tipo="button"
                            funcionOnClick={funcionBorrar}
                            icono="delete"
                            texto={t("delete")}
                            claseCss={estilos.borrar}
                        />
                    ) : null}
                    &nbsp;
                    <EleBoton
                        apariencia="contained"
                        color="error"
                        funcionOnClick={funcionAceptarSecundario ? funcionAceptarSecundario : funcionCerrarVentana}
                        icono={iconoBoton === undefined ? "close" : iconoBoton}
                        texto={textoBoton ? textoBoton : aceptarCancelar ? t("cancel") : sino ? t("no") : ""}
                    />
                    &nbsp;
                    {aceptarCancelar || sino ? (
                        <EleBoton
                            // referencia={getReferenciaSubmit}
                            apariencia="contained"
                            color="success"
                            tipo="button"
                            funcionOnClick={funcionValidar}
                            icono={textoBotonOk === "Excel" ? "description" : (sino ? "check" : "save")}
                            desactivado={desactivado}
                            texto={textoBotonOk ? textoBotonOk : aceptarCancelar && autoGuardar ? t("save") : aceptarCancelar ? t("accept") : t("yes")}
                        />
                    ) : null}
                </DialogActions>
            </form>
        </Dialog>
    );
};

EleVentanaEmergente.propTypes = {
    /**
     * Título que llevará la ventana emergente, situado en la cabecera ( Valor obligatorio. ).
     */
    titulo: PropTypes.string.isRequired,

    /**
     * Contenido del elemento  de tipo nodo, cadena de texto o array ( Valor obligatorio.).
     */
    mensaje: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.array]).isRequired,

    /**
     * Define si la ventana se mostrará o no. ( Valor obligatorio. ).
     */
    mostrarError: PropTypes.bool.isRequired,

    /**
     * Define si la ventana tendrá un botón para aceptar y otro para cancelar
     */
    aceptarCancelar: PropTypes.bool,

    /**
     * Define si hay un botón de borrar
     */
    borrar: PropTypes.bool,

    /**
     * Define si la ventana tendrá un botón para sí y otro para no
     */
    sino: PropTypes.bool,

    /**
     * Define si se puede editar o si solo se puede visualizar.
     */
    modoConsulta: PropTypes.bool,

    /**
     * Define si se puede utilizar la tecla escape para lanzar el evento de cierre de la ventana.
     */
    deshabilitaTeclaESC: PropTypes.bool,

    /**
     * Define el texto que contendrá el botón de cierre de la ventana. ( Valor opcional. ).
     */
    textoBoton: PropTypes.string,

    /**
     * Define el texto que contendrá el botón de aceptar de la ventana. ( Valor opcional. ).
     */
    textoBotonOk: PropTypes.string,

    /**
     * Define el icono que llevará el botón de cierre. Si se omite el mismo, por defecto tendrá el icono de cierre.
     */
    iconoBoton: PropTypes.string,

    /**
     * Define si el componente puede desmontarse.
     */
    esdesmontable: PropTypes.bool,

    /**

     * Define el tamaño de la ventana mediante el valor del enumerador 'xs', 'sm', 'md', 'lg', 'xl'
     */
    ancho: PropTypes.string,

    /**
     * Determina si la ventana guarda definitivamemente en BB.DD
     */
    autoGuardar: PropTypes.bool,

    /**
     * Define si se muestra un icono de cargando o no.
     */
    mostrarCargando: PropTypes.bool,

    /**
     * Define el estado del boton submit (Activado/Desactivado).
     */
    desactivado: PropTypes.bool,

    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.any,

    /**
     * Función que se disparará  al cerrar el elemento (Valor obligatorio.).
     */
    funcionCerrarVentana: PropTypes.func.isRequired,

    /**
     * Función que se disparará pulsar el botón secundario de la ventana.
     */
    funcionAceptarSecundario: PropTypes.func,

    /**
     * @ignore
     * Define si se va a comportar con modo portal para los elementos o se va a comportar jerarquicamente.
     */
    desactivarPortal: PropTypes.bool
};

export default withNamespaces(["translations", "grid"])(EleVentanaEmergente);
