import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompEntradaFicheroMultiple.module.css";
import EleBoton from "../../elementos/botones/EleBoton";
import { CircularProgress } from "@mui/material";

/**
 * Componente que va a permitir la entrada de ficheros externos.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompEntradaFicheroMultiple extends React.PureComponent {
    static propTypes = {
        /**
         * Nombre asociado el componente. Valor Requerido.
         */
        nombre: PropTypes.string.isRequired,
        /**
         * Imágen seleccionada.
         */
        valor: PropTypes.array,
        /**
         * Texto del botón.
         */
        textoBoton: PropTypes.string,
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

        this.inputFichero = React.createRef();
        this.selectOculto = React.createRef();

        this.state = {
            subiendo: false
        };
    }

    funcionOnClickBoton = () => {
        this.inputFichero.current.click();
    };

    funcionFicheroSubido = evt => {
        this.setState({ subiendo: true });
        this.hayCambios = true;

        let ficheros = evt.target.files;

        for (let index in ficheros) {
            let indice = parseInt(index);
            const fichero = ficheros[indice];
            this.funcionLeerImagen(fichero);
        }
    };

    funcionLeerImagen = fichero => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.props.funcionOnChange(reader.result, this.props.campo, null, fichero.name, fichero.type);
            this.setState({ subiendo: false });
        };

        try {
            // reader.readAsDataURL(fichero);

            if (fichero.type === "text/csv" || fichero.type === "application/vnd.ms-excel" || fichero.name.includes(".csv")) {
                reader.readAsText(fichero);
            } else {
                reader.readAsDataURL(fichero);
            }
        } catch (excp) {}
    };

    funcionBorrar = indice => {
        this.hayCambios = true;
        this.props.funcionOnChange(null, this.props.campo, indice);
        this.selectOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
    };

    render() {
        let lista = [];

        for (let indice in this.props.valor) {
            let fichero = this.props.valor[indice];

            lista.push(
                <div key={indice} className={estilos.contenidoFichero}>
                    {!this.props.obligatorio && this.props.valor && this.props.valor.length > 0 && (
                        <EleBoton
                            claseCss={estilos.boton}
                            desactivado={this.props.desactivado}
                            primario
                            icono="delete"
                            tipo="button"
                            apariencia="contained"
                            funcionOnClick={this.funcionBorrar.bind(this, indice)}
                        />
                    )}
                    <span className={estilos.nombreFichero}>{fichero.nombre}</span>
                </div>
            );
        }

        return (
            <div className={estilos.contenedorEntradaFichero}>
                {this.state.subiendo === true ? <CircularProgress /> : null}
                <EleBoton
                    claseCss={estilos.boton}
                    desactivado={this.props.desactivado}
                    primario
                    apariencia="contained"
                    icono="photo"
                    texto={" " + this.props.nombre}
                    funcionOnClick={this.funcionOnClickBoton}
                />

                <div className={estilos.contenedorFicheros}>{lista}</div>

                <select hidden ref={this.selectOculto} className={estilos.entradaFichero} />

                <input
                    ref={this.inputFichero}
                    type="file"
                    name={this.props.campo}
                    // src={this.props.valor}
                    disabled={this.props.desactivado}
                    multiple="multiple"
                    className={this.props.claseCss + " " + estilos.entradaFichero}
                    required={this.props.obligatorio && this.hayCambios}
                    onFocus={this.props.funcionOnFocus}
                    onBlur={this.props.funcionOnBlur}
                    onMouseOver={this.props.funcionOnHover}
                    onChange={this.funcionFicheroSubido}
                />
            </div>
        );
    }
}

export default CompEntradaFicheroMultiple;
