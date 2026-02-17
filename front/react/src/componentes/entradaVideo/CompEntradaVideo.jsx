import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompEntradaVideo.module.css";
import EleBoton from "../../elementos/botones/EleBoton";
import { withNamespaces } from "react-i18next";
import { CircularProgress } from "@mui/material";

/**
 * Componente que va a permitir la entrada de videos externos.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompEntradaVideo extends React.PureComponent {
    static propTypes = {
        /**
         * Nombre asociado el componente. Valor Requerido.
         */
        nombre: PropTypes.string.isRequired,
        /**
         * Imágen seleccionada.
         */
        valor: PropTypes.string,
        /**
         * Texto del botón.
         */
        textoBoton: PropTypes.string,
        /**
         * Texto que aparece en el caso de no haber cargado el video seleccionado.
         */
        alternativo: PropTypes.string,
        /**
         * Desactiva o activa el componente.
         */
        desactivado: PropTypes.bool,
        /**
         * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
         */
        obligatorio: PropTypes.bool,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCss: PropTypes.string,
        /**
         * Función que se dispara al cambiar el valor del componente.
         */
        funcionOnChange: PropTypes.func,
        /**
         * Función que se dispara cuando el componente coge el foco.
         */
        funcionOnFocus: PropTypes.func,
        /**
         * Función que se dispara cuando el componente pierde el foco.
         */
        funcionOnBlur: PropTypes.func,
        /**
         * Función que se dispara al poner el raton sobre el componente.
         */
        funcionOnHover: PropTypes.func
    };

    static defaultProps = {
        valor: undefined,
        desactivado: false,
        obligatorio: false,
        claseCss: "",
        funcionOnChange: () => {
            return;
        }
    };

    constructor(props) {
        super(props);

        this.hayCambios = false;

        this.inputVideo = React.createRef();
        this.selectOculto = React.createRef();

        this.state = {
            subiendo: false
        };
    }

    funcionOnClickBoton = () => {
        this.inputVideo.current.click();
    };

    funcionVideoSubido = evt => {
        this.setState({ subiendo: true });
        this.hayCambios = true;
        let video = evt.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            this.props.funcionOnChange(reader.result, this.props.nombre);
            this.setState({ subiendo: false });
        };

        try {
            reader.readAsDataURL(video);
        } catch (excp) {}
    };

    funcionBorrar = () => {
        this.hayCambios = true;
        this.props.funcionOnChange(null, this.props.nombre);
        this.selectOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
    };

    render() {
        return (
            <div className={estilos.bloqueEntradaVideo}>
                <div className={estilos.contenedorEntradaVideo}>
                    {this.state.subiendo === true ? <CircularProgress className={estilos.video} /> : null}

                    {this.props.desactivado || (
                        <EleBoton
                            claseCss={estilos.boton}
                            primario
                            apariencia="contained"
                            icono="video_library"
                            texto={this.props.textoBoton}
                            funcionOnClick={this.funcionOnClickBoton}
                        />
                    )}

                    {this.props.valor && (
                        <a target="_blank" rel="noopener noreferrer" href={this.props.valor}>
                            <video controls className={estilos.video}>
                                <source src={this.props.valor} />
                                {this.props.t("no_video_support")}
                            </video></a>)}

                    {!this.props.desactivado && !this.props.obligatorio && this.props.valor && (<EleBoton claseCss={estilos.boton} primario icono="delete" tipo="button" apariencia="contained" funcionOnClick={this.funcionBorrar} />
                    )}

                    <select hidden ref={this.selectOculto} className={estilos.entradaFichero} />

                    <input
                        ref={this.inputVideo}
                        type="file"
                        accept="video/*"
                        name={this.props.nombre}
                        src={this.props.valor}
                        disabled={this.props.desactivado}
                        className={this.props.claseCss + " " + estilos.entradaFichero}
                        required={this.props.obligatorio && this.hayCambios}
                        onFocus={this.props.funcionOnFocus}
                        onBlur={this.props.funcionOnBlur}
                        onMouseOver={this.props.funcionOnHover}
                        onChange={this.funcionVideoSubido}
                    />
                </div>
            </div>
        );
    }
}

export default withNamespaces()(CompEntradaVideo);
