import React from "react";
import PropTypes from "prop-types";

import Snackbar from "@mui/material/Snackbar";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";

import { IconButton } from "@mui/material";
import EleIcono from "../iconos/EleIcono";

/**
 * Componente contenedor de un snackbar.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class EleNotificaciones extends React.PureComponent {
    static propTypes = {
        /**
         * Función que se llama cuando se cierra la notificación
         */
        funcionCierraNotificacion: PropTypes.func.isRequired,
        /**
         * Texto de la notificación
         */
        mensaje: PropTypes.string.isRequired,
        /**
         * Texto de la notificación
         */
        transicion: PropTypes.oneOf(["Grow", "Fade", "Slide"])
    };

    static defaultProps = {
        transicion: "Grow"
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.props.funcionCierraNotificacion();
    };

    render() {
        let componenteTransicion = Grow;

        switch (this.props.transicion) {
            case "Fade":
                componenteTransicion = Fade;
                break;
            case "Slide":
                componenteTransicion = Slide;
                break;
            case "Grow":
            default:
                componenteTransicion = Grow;
                break;
        }

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                TransitionComponent={componenteTransicion}
                open={this.props.visible}
                autoHideDuration={6000}
                onClose={this.handleClose}
                message={this.props.mensaje}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                        <EleIcono icono="close" />
                    </IconButton>
                }
            />
        );
    }
}

export default EleNotificaciones;
