import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompEntradaImagenEstatica.module.css";
import EleBoton from "../../elementos/botones/EleBoton";
import { CircularProgress } from "@mui/material";
import { ProveedorModoconsulta } from "../mantenimientos/contenedor/CompMantenimientoContenedor";

/**
 * Componente que va a permitir la entrada de Imagenes externas.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompEntradaImagenEstatica extends React.PureComponent {
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
         * Texto que aparece en el caso de no haber cargado la imagen seleccionada.
         */
        alternativo: PropTypes.string,
        /**
         * Desactiva o activa el componente.
         */
        desactivado: PropTypes.bool,
        /**
         * Indica si el componente permite subida multiple de imagenes.
         */
        multiple: PropTypes.bool,
        /**
         * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
         */
        obligatorio: PropTypes.bool,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCss: PropTypes.string,
        /**
         * Clase que establece los estilos de la imagen del componente.
         */
        claseCssImagen: PropTypes.string,
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
        funcionOnHover: PropTypes.func,
        /**
         * Establece una condicion para la entrada imagen acepte todo tipo de imagen o unicamente SVG
         */
        obligatorioSVG: PropTypes.bool
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

        this.inputImagen = React.createRef();
        this.selectOculto = React.createRef();

        this.state = {
            subiendo: false
        };
    }

    funcionOnClickBoton = () => {
        this.inputImagen.current.click();
    };

    funcionImagenSubida = evt => {
        this.setState({ subiendo: true });
        this.hayCambios = true;

        let fotos = evt.target.files;

        for (let index in fotos) {
            let indice = parseInt(index);
            const foto = fotos[indice];
            this.funcionLeerImagen(foto, indice);
        }
    };

    funcionLeerImagen = (imagen, indice) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.props.funcionOnChange(reader.result, this.props.nombre, indice);
            this.setState({ subiendo: false });
        };

        try {
            reader.readAsDataURL(imagen);
        } catch (excp) { }
    };

    funcionBorrar = () => {
        this.hayCambios = true;
        this.props.funcionOnChange(null, this.props.nombre);
        this.selectOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
    };

    funcionAbrirImagen = () => {
        var imagen = new Image();
        imagen.src = this.props.valor;
        imagen.style = "max-width: 100vw; max-height: 100vh;";

        let ventanaImagen = window.open("");
        ventanaImagen.document.body.style = "text-align: center;";
        ventanaImagen.document.body.appendChild(imagen);
    };

    render() {
        let mostrarBorrar = !this.props.obligatorio && this.props.valor;

        return (
            <ProveedorModoconsulta.Consumer>
                {modoConsulta => (
                    <div className={estilos.contenedorEntradaImagen}>
                        {this.state.subiendo === true ? <CircularProgress className={estilos.imagen} /> : null}

                        <img
                            onClick={this.funcionAbrirImagen}
                            src={this.props.valor}
                            alt={this.props.alternativo}
                            className={this.props.claseCssImagen + ' ' + estilos.imagen}
                        />

                        <select hidden ref={this.selectOculto} className={estilos.entradaFichero} />

                        <input
                            ref={this.inputImagen}
                            type="file"
                            accept={this.props.obligatorioSVG ? "image/svg+xml" : "image/*"}
                            name={this.props.nombre}
                            src={this.props.valor}
                            disabled={this.props.desactivado}
                            multiple={this.props.multiple ? "multiple" : undefined}
                            className={this.props.claseCss + " " + estilos.entradaFichero}
                            required={this.props.obligatorio && this.hayCambios}
                            onFocus={this.props.funcionOnFocus}
                            onBlur={this.props.funcionOnBlur}
                            onMouseOver={this.props.funcionOnHover}
                            onChange={this.funcionImagenSubida}
                        />
                    </div>
                )}
            </ProveedorModoconsulta.Consumer>
        );
    }
}

export default CompEntradaImagenEstatica;
