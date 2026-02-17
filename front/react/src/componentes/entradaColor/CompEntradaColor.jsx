import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompEntradaColor.module.css";
import CompEntrada from "../../componentes/entrada/CompEntrada";
import EleBoton from "../../elementos/botones/EleBoton";
import { SketchPicker, CirclePicker } from "react-color";
import EleMenuEmergente from "../../elementos/menuEmergente/EleMenuEmergente";

/**
 * Componente que permitirá la entrada de colores, pudiendo escribirse o ser seleccionado en las distintas paletas.
 *
 * @version 0.1
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompEntradaColor extends React.PureComponent {
    static propTypes = {
        /**
         * Valor del color seleccionado.
         */
        color: PropTypes.string,
        /**
         * nombre del campo de color.
         */
        nombre: PropTypes.string,
        /**
         * Permite visualizar la el nivel de transparencia del componente color grande.
         */
        activaTransparencia: PropTypes.bool,
        /**
         * Color por defecto.
         */
        coloresPredeterminados: PropTypes.array,
        /**
         * Valor del ancho del componente.
         */
        ancho: PropTypes.number,
        /**
         * elemento renderizadores del componente de color grande.
         */
        renderizadores: PropTypes.object,
        /**
         * Función que se dispara cuando cambia el valor del componente.
         */
        funcionOnChange: PropTypes.func,
        /**
         * Función que se dispara cuando cambia el valor del componentes color.
         */
        funcionOnChangeComplete: PropTypes.func,
        /**
         * Muestra la etiqueta del componente.
         */
        etiqueta: PropTypes.string,
        /**
         * Función que se dispara cuando cambia el valor del input del componente.
         */
        funcionOnChangeCompEntrada: PropTypes.func,
        /**
         * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
         */
        obligatorio: PropTypes.bool
    };

    static defaultProps = {
        activaTransparencia: true,
        funcionOnChangeComplete() {
            return;
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            activaPaletaBasica: false,
            activaPaletaCompleta: false
        };

        //Propiedades del ciclePicker
        this.tamañoCirculos = 16;
        this.separacionCirculos = 11;

        this.inputOculto = React.createRef();
    }

    funcionVisiblePaletaBasica = () => {
        this.inputOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
        this.setState({
            activaPaletaBasica: !this.state.activaPaletaBasica,
            activaPaletaCompleta: false
        });
    };

    funcionVisiblePaletaCompleta = () => {
        this.inputOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
        this.setState({
            activaPaletaBasica: false,
            activaPaletaCompleta: !this.state.activaPaletaCompleta
        });
    };

    funcionOnClickCirculos = () => {
        this.setState({ activaPaletaBasica: false });
    };

    cerrarPaletaCompleta = () => {
        this.inputOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
        this.setState({
            activaPaletaCompleta: false
        });
    };

    funcionOnChangeComplete = argumentos => {
        this.inputOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
        this.props.funcionOnChangeComplete(argumentos, this.props.nombre);
    };

    dameContenedorEntradaColor = contenedorEntradaTexto => {
        this.anchorEntradaTexto = contenedorEntradaTexto;
    };

    funcionOnChangeCompEntrada = (...argumentos) => {
        return this.props.funcionOnChangeCompEntrada(...argumentos, this.props.nombre);
    };

    funcionOnChange = (...argumentos) => {
        return this.props.funcionOnChange(...argumentos, this.props.nombre);
    };

    render() {

        return (
            <React.Fragment>
                <select ref={this.inputOculto} name={this.props.etiqueta} hidden />
                <div className={estilos.contenedorEntradaColor} ref={this.dameContenedorEntradaColor}>
                    <CompEntrada
                        tipoEntrada={"EntradaTexto"}
                        obligatorio={this.props.obligatorio}
                        tipo="text"
                        etiqueta={this.props.etiqueta}
                        valor={this.props.color || undefined}
                        funcionOnChange={this.funcionOnChangeCompEntrada}
                        funcionOnClick={this.funcionVisiblePaletaBasica}
                    />
                    <EleBoton
                        claseCss={estilos.botonSeleccionColor}
                        estilos={{ backgroundColor: this.props.color || undefined }}
                        funcionOnClick={this.funcionVisiblePaletaCompleta}
                    />
                </div>
                <EleMenuEmergente
                    ancla={this.anchorEntradaTexto}
                    visible={this.state.activaPaletaBasica}
                    alineacionAncla={{
                        horizontal: "left",
                        vertical: "bottom"
                    }}
                    alineacionContenido={{
                        horizontal: "left",
                        vertical: "top"
                    }}
                    claseCss={estilos.popupWrapper}
                    claseCssContenido={estilos.popupContent}
                    funcionClickFuera={this.funcionOnClickCirculos}
                >
                    <span onClick={this.funcionOnClickCirculos}>
                        <CirclePicker
                            className={estilos.contenedorColores}
                            color={this.props.color || undefined}
                            width={83}
                            circleSize={this.tamañoCirculos}
                            circleSpacing={this.separacionCirculos}
                            onChange={this.funcionOnChange}
                            onChangeComplete={this.funcionOnChangeComplete}
                            onSwatchHover={this.props.funcionOnSwatchHover}
                        />
                    </span>
                </EleMenuEmergente>

                <EleMenuEmergente
                    ancla={this.anchorEntradaTexto}
                    visible={this.state.activaPaletaCompleta}
                    alineacionAncla={{
                        horizontal: "right",
                        vertical: "bottom"
                    }}
                    alineacionContenido={{
                        horizontal: "right",
                        vertical: "top"
                    }}
                    claseCss={estilos.popupWrapper}
                    claseCssContenido={estilos.popupContent}
                    funcionClickFuera={this.cerrarPaletaCompleta}
                >
                <span>
                    <SketchPicker
                        color={this.props.color || undefined}
                        disableAlpha={this.props.activaTransparencia}
                        presetnColors={this.props.coloresPredeterminados}
                        width={this.ancho}
                        renders={this.props.renderizadores}
                        onChange={this.funcionOnChange}
                        onChangeComplete={this.funcionOnChangeComplete}
                        onSwatchHover={this.props.funcionOnSwatchHover}
                    />
                </span>
                </EleMenuEmergente>
            </React.Fragment>
        );
    }
}

export default CompEntradaColor;
