import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import SignatureCanvas from "react-signature-canvas";

import estilos from "./CompEntradaFirma.module.css";
import EleBoton from "../../elementos/botones/EleBoton";
import { withTheme } from "@mui/styles";
import { withNamespaces } from "react-i18next";

/**
 * Componente que permite capturar firmas mediante un canvas
 *
 * @version 0.1
 */
function EleFirmaEnPantalla({ theme, funcionOnChange, t, color = theme.palette.primary.main }) {
    const sigCanvas = useRef({});

    function clear() {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
    }

    function trim() {
        if (sigCanvas.current) {
            let objetoCanvas = sigCanvas.current.getCanvas();
            let imagenCanvas = objetoCanvas.toDataURL("image/png");
            funcionOnChange(imagenCanvas);
            clear();
        }
    }

    return (
        <>
            <div className={estilos.container}>
                <fieldset className={estilos.contenedorFirma}>
                    <SignatureCanvas ref={sigCanvas} penColor={color} canvasProps={{ className: "signatureCanvas" }} />
                </fieldset>
                <div>
                    <EleBoton
                        tipo="button"
                        apariencia="contained"
                        color="warning"
                        claseCss={estilos.botonFirma}
                        claseIcono={estilos.iconoBotonFirma}
                        texto={t("clear")}
                        iconoIzquierda={true}
                        icono="clear"
                        tamano="large"
                        // cargando={this.state.cargando}
                        desactivado={false}
                        primario={undefined}
                        funcionOnClick={clear}
                    />
                    &nbsp;&nbsp;
                    <EleBoton
                        tipo="button"
                        apariencia="contained"
                        color="success"
                        claseCss={estilos.botonFirma}
                        claseIcono={estilos.iconoBotonFirma}
                        texto={t("accept")}
                        iconoIzquierda={true}
                        icono="check"
                        tamano="large"
                        // cargando={this.state.cargando}
                        desactivado={false}
                        primario={undefined}
                        funcionOnClick={trim}
                    />
                </div>
            </div>
        </>
    );
}

EleFirmaEnPantalla.propTypes = {
    /**
     * Valor de la firma capturada (base64)
     */
    valor: PropTypes.string,
    /**
     * Título que se muestra sobre el componente
     */
    titulo: PropTypes.string,
    /**
     * Función que se ejecuta cuando se captura una nueva firma
     */
    funcionOnChange: PropTypes.func.isRequired,
    /**
     * Función que traduce textos
     */
    traduccion: PropTypes.func,
    /**
     * Nombre del campo
     */
    nombre: PropTypes.string.isRequired
};

export default withNamespaces("grid")(withTheme(EleFirmaEnPantalla));
