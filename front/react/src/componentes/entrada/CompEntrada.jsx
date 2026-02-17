import React from "react";
import PropTypes from "prop-types";

import EleEntradaTexto from "../../elementos/entradasTexto/EleEntradaTexto";
import EleEntradaNumero from "../../elementos/entradasNumero/EleEntradaNumero";
import EleEntradaFecha from "../../elementos/entradasFecha/EleEntradaFecha";
import Componente from "../Componente";
import { comprobarAdmiteInputMonth, estaVacio, fechaSinDiaUTC, formatearNumero } from "../Utilidades";
import { withNamespaces } from "react-i18next";
import { ProveedorModoconsulta } from "../mantenimientos/contenedor/CompMantenimientoContenedor";

/**
 * Componente que generará un input dependiendo del tipo de entrada que se necesite.
 *
 * @version 0.3
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 * @author [Iván Barriga](http://sandav.es) | [ivan.barriga@sandav.es](mailto:ivan.barriga@sandav.es)
 */
class CompEntrada extends Componente {
    static propTypes = {
        /**
         * Tipo de input que queremos cargar.
         */
        tipoEntrada: PropTypes.oneOf(["EntradaTexto", "EntradaNumero", "EntradaNumeroAvanzado", "EntradaFecha"]).isRequired,
        /**
         * Identificador del elemento
         */
        identificador: PropTypes.string,
        /**
         * Nombre del elemento.
         */
        nombre: PropTypes.string,
        /**
         * Tipo de entrada que va a permitir el elemento.
         */
        tipo: PropTypes.string,
        /**
         * Valor actual del elemento objeto [string , numero, date].
         */
        valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
        /**
         * Cambia la apariencia visual del elemento mediante el uso de opciones de estilo alternativas.
         */
        apariencia: PropTypes.oneOf(["standard", "filled", "outlined"]),
        /**
         * Establece el valor mínimo permitido.
         */
        minimo: PropTypes.number,
        /**
         * Establece el valor máximo permitido.
         */
        maximo: PropTypes.number,
        /**
         * Indica si va a tener o no separador para los millares (por defecto no)
         */
        separadorMillares: PropTypes.bool,
        /**
         * Indica la cantidad máxima de decimales que puede tener
         */
        decimalesMaximos: PropTypes.number,
        /**
         * Indica si se muestran siempre los decimales indicados
         */
        decimalesFijos: PropTypes.bool,
        /**
         * Estable el paso que habrá entre números.
         */
        paso: PropTypes.any,
        /**
         * Patrón o máscara que deber seguir el valor ingresado en el campo.
         */
        mascara: PropTypes.array,
        /**
         * Caracter que se muestra ocupando las posiciones sin rellenar de la máscara.
         */
        caracterPlaceholder: PropTypes.string,
        /**
         * Opción de habilitar o deshabilitar el elemento.
         */
        desactivado: PropTypes.bool,
        /**
         * Opción de habilitar o deshabilitar el subrayado.
         */
        desactivarSubrayado: PropTypes.bool,
        /**
         * Opción para que el input pierda el foco al pulsar enter.
         */
        perderFocoConEnter: PropTypes.bool,
        /**
         * Muestra una etiqueta para el elemento.
         */
        etiqueta: PropTypes.string,
        /**
         * Clase CSS que aplica en el elemento.
         */
        claseCss: PropTypes.string,
        /**
         * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
         */
        obligatorio: PropTypes.bool,
        /**
         * Opción de autovalidar el contenido del elemento.
         */
        validacion: PropTypes.bool,
        /**
         * Muestra el mensaje de la autovalidación.
         */
        mensajeValidacion: PropTypes.string,
        /**
         * Opción de habilitar el autocompletado del campo.
         */
        autocompletado: PropTypes.string,
        /**
         * Opción de introducir varias líneas.
         */
        multilineas: PropTypes.bool,
        /**
         * Número de líneas.
         */
        lineas: PropTypes.number,
        /**
         * En caso de tener multilineas determina el número máximo de las mismas.
         */
        lineasMaximas: PropTypes.number,
        /**
         * Texto informativo que contendrá el campo cuando no se haya introducido valor.
         */
        textoInfoCampo: PropTypes.string,
        /**
         * Decoración que se podrá situar en el interior del input a la izquierda.
         */
        adornoIzquierdo: PropTypes.node,
        /**
         * Decoración que se podrá situar en el interior del input a la derecha.
         */
        adornoDerecho: PropTypes.node,
        /**
         * Función que se dispara cuando el elemento coge el foco.
         */
        funcionOnFocus: PropTypes.func,
        /**
         * Función que se dispara cuando el elemento pierde el foco.
         */
        funcionOnBlur: PropTypes.func,
        /**
         * Función que se dispara el ratón está sobre el elemento.
         */
        funcionOnHover: PropTypes.func,
        /**
         * Función que se dispara después de que el valor del elemento ha cambiado.
         */
        funcionOnChange: PropTypes.func,
        /**
         * Función que se dispara cuando se hace click en el elemento.
         */
        funcionOnClick: PropTypes.func
    };

    static defaultProps = {
        valor: "",
        claseCss: "",
        desactivado: false,
        identificador: undefined,
        decimalesMaximos: 0,
        etiqueta: undefined,
        mensajeValidacion: " ",
        obligatorio: false,
        perderFocoConEnter: false,
        autocompletado: "off",
        funcionOnChange: () => {},
        funcionOnFocus: () => {},
        funcionOnBlur: () => {}
    };

    constructor(props) {
        super(props);

        this.ultimoCaracterSeparadorDecimal = false;
        this.admiteInputMonth = comprobarAdmiteInputMonth();

        this.state = {
            tieneFoco: false
        };

        this.refInput = React.createRef();
    }

    cogeValor = e => {
        let valor = e.target.value;
        if (this.props.tipo === "datetime-local" && estaVacio(valor)) {
            // Si es fecha sin valor debe ir vacio, no como string ni undefined
            valor = null;
        }

        this.props.funcionOnChange(valor, this.props.nombre, e.target);
    };

    cogeValorFecha = (e, valor) => {
        valor = e.target.value;

        if (valor === "" || valor === undefined) {
            valor = null;
        }

        if (this.props.maximo !== undefined) {
            if (valor > this.props.maximo) {
                valor = this.props.maximo;
            }
        } else if (new Date(valor) > new Date("2099-12-31")) {
            valor = "2099-12-31";
        } else if (typeof valor === "object") {
            valor = null;
        }

        if (this.props.tipo === "month" && !this.admiteInputMonth && !estaVacio(valor)) {
            valor = new Date(valor);
            valor.setDate(1);
            valor = fechaSinDiaUTC(valor);
        }

        this.props.funcionOnChange(valor, this.props.nombre, e.target);
    };

    funcionOnChangeNumeroBasico = evento => {
        let valor = evento.target.value;

        if (estaVacio(valor)) {
            valor = null;

            if (this.props.obligatorio) {
                if (this.props.minimo === 0 || this.props.maximo === 0) {
                    valor = 0;
                } else if (0 < this.props.minimo) {
                    valor = this.props.minimo;
                } else if (0 > this.props.maximo) {
                    valor = this.props.maximo;
                }
            }
        } else {
            let tieneSeparadorDecimal = valor.includes(".") || valor.includes(",");

            if (tieneSeparadorDecimal) {
                valor = valor.replace(",", ".");
                if (this.props.decimalesMaximos === 0) {
                    // El número no puede tener decimales
                    let conjunto_numero = valor.toString().split(".");
                    valor = conjunto_numero[0];
                } else if (this.props.decimalesMaximos > 0) {
                    // El número tiene límite de decimales
                    let conjunto_numero = valor.toString().split(".");

                    if (conjunto_numero[1] && conjunto_numero[1].length > this.props.decimalesMaximos) {
                        // Acortamos los decimales
                        let parte_decimal = conjunto_numero[1].substring(0, this.props.decimalesMaximos);
                        valor = parseFloat(conjunto_numero[0] + "." + parte_decimal);
                    }
                }
            }

            let valorNumerico = parseFloat(valor);
            if (valorNumerico < this.props.minimo) {
                valor = this.props.minimo;
            } else if (valorNumerico > this.props.maximo) {
                valor = this.props.maximo;
            }
        }

        this.props.funcionOnChange(valor, this.props.nombre, evento.target);
    };

    funcionOnkeyDownNumeroBasico = evento => {
        // if (evento.altKey || evento.ctrlKey || evento.shiftKey) {
        //     evento.preventDefault();
        //     return;
        // }

        let esSeparadorDecimal = evento.key === "," || evento.key === ".";

        if ((evento.keyCode >= 48 && evento.keyCode <= 57) || (evento.keyCode >= 96 && evento.keyCode <= 105)) {
            // Es un número
            if (this.props.desactivado) {
                evento.preventDefault();
                return;
            }
        } else if (evento.keyCode === 8) {
            // Es retroceso
        } else if (evento.keyCode === 9) {
        } else if (evento.keyCode === 35 || evento.keyCode === 36) {
            // Es inicio/fin
        } else if (evento.keyCode === 46) {
            // Es un suprimir

            if (this.props.desactivado) {
                evento.preventDefault();
                return;
            }
        } else if (evento.keyCode >= 37 && evento.keyCode <= 40) {
            // Son flechas

            if (this.props.desactivado) {
                evento.preventDefault();
                return;
            }

            /* Si es tipo numérico no hay que controlar las flechas por código
            if (evento.keyCode === 38) {
                // Flecha Arriba
                let valor = this.props.valor;
                if (estaVacio(valor)) {
                    valor = 0;
                }

                let valorNuevo = parseFloat(valor) + 1;
                if (this.props.maximo === undefined || valorNuevo <= this.props.maximo) {
                    this.props.funcionOnChange(valorNuevo, this.props.nombre, evento.target);
                }
            } else if (evento.keyCode === 40) {
                // Flecha Abajo
                let valor = this.props.valor;
                if (estaVacio(valor)) {
                    valor = 0;
                }

                let valorNuevo = parseFloat(valor) - 1;
                if (this.props.minimo === undefined || valorNuevo >= this.props.minimo) {
                    this.props.funcionOnChange(valorNuevo, this.props.nombre, evento.target);
                }
            }
            */
        } else if (evento.key === "-") {
            evento.preventDefault();

            if (this.props.minimo >= 0) {
                // Si no puede haber negativos, no podemos invertir el signo
                return;
            }

            let valor = this.props.valor;
            if (estaVacio(valor)) {
                valor = "";
            } else {
                // Invertimos el signo
                if (valor.toString().includes("-")) {
                    valor = valor.toString().replace("-", "");
                } else {
                    valor = "-" + valor;
                }
            }

            this.props.funcionOnChange(valor, this.props.nombre, evento.target);
        } else if (esSeparadorDecimal) {
            // Es una coma o un punto

            if (this.props.desactivado) {
                evento.preventDefault();
                return;
            }

            if (!estaVacio(this.props.valor) && this.props.valor.includes(".")) {
                // Si el usuario pone coma o punto, y ya había, lo descartamos
                evento.preventDefault();
                return;
            }

            if (this.props.decimalesMaximos === 0) {
                // Si no puede tener decimales, descartamos el separador
                evento.preventDefault();
                return;
            }

            let valorString = this.props.valor.toString();
            if (valorString.includes(".") || valorString.includes(",")) {
                // Si ya tenía decimales, no hacemos nada
                evento.preventDefault();
                return;
            } else {
                valorString = this.props.valor.replace(",", ".");
            }

            this.props.funcionOnChange(valorString, this.props.nombre, evento.target);
        } else if ((evento.keyCode >= 65 && evento.keyCode <= 90) || (evento.keyCode >= 97 && evento.keyCode <= 122)) {
            // Ha introducido una letra
            evento.preventDefault();
        } else {
            // Ha introducido un caracter no controlado
            evento.preventDefault();
        }
    };

    cogeValorNumero = valor => {
        if (!this.montado) {
            return;
        }

        if (valor === "" || valor === undefined) {
            valor = null;
        } else {
            if (valor < this.props.minimo) {
                valor = this.props.minimo;
            } else if (valor > this.props.maximo) {
                valor = this.props.maximo;
            }
        }

        this.props.funcionOnChange(valor, this.props.nombre);
    };

    funcionOnKeyDownTexto = evento => {
        if ((this.props.perderFocoConEnter === true && evento.keyCode === 13) || evento.keyCode === 10) {
            let referenciaInput = this.props.inputEntrada || this.refInput;
            referenciaInput.current.blur();
        }
    };

    funcionOnFocus = evento => {
        this.setState({
            tieneFoco: true
        });

        this.props.funcionOnFocus(evento);
    };

    funcionOnBlur = evento => {
        if (!estaVacio(this.props.valor)) {
            let numeroString = this.props.valor.toString();
            let ultimoCaracter = numeroString.slice(-1);

            if (ultimoCaracter === "." || ultimoCaracter === ",") {
                // Si acaba en separador decimal y pierde el foco, lo quitamos
                numeroString = numeroString.slice(0, -1);

                if (typeof this.props.valor === "number") {
                    this.props.funcionOnChange(parseFloat(numeroString), this.props.nombre, evento.target);
                } else {
                    this.props.funcionOnChange(numeroString, this.props.nombre, evento.target);
                }
            }
        }

        this.setState({
            tieneFoco: false
        });

        this.props.funcionOnBlur(evento);
    };

    render() {
        if (!this.montado) {
            return;
        }

        if (this.props.tipoEntrada === "EntradaFecha") {
            if (estaVacio(this.props.valor)) {
                this.fechaConvertida = "";
            } else {
                if (this.props.valor.includes("+")) {
                    this.fechaConvertida = this.props.valor.toString().split("+")[0];
                } else {
                    this.fechaConvertida = this.props.valor;
                }

                this.fechaConvertida = !this.admiteInputMonth && this.props.tipo === "month" ? this.fechaConvertida + "-01" : this.fechaConvertida;
            }
        }

        if (this.props.tipoEntrada === "EntradaNumero") {
            if (estaVacio(this.props.valor)) {
                this.numeroVisible = "";
            } else {
                if (this.state.tieneFoco) {
                    // Mostramos el valor tal cual
                    this.numeroVisible = this.props.valor.toString();

                    if (this.props.lng.includes("en-")) {
                        // Usamos separador inglés
                        this.numeroVisible = this.numeroVisible.replace(",", ".");
                    } else {
                        // Usamos separador español
                        this.numeroVisible = this.numeroVisible.replace(".", ",");
                    }
                } else {
                    // Formateamos el valor con millares
                    let decimales = undefined;
                    if (this.props.decimalesFijos) {
                        decimales = this.props.decimalesMaximos;
                    }

                    this.numeroVisible = formatearNumero(this.props.valor, decimales, this.props.decimalesMaximos);
                }
            }
        }

        return (
            <ProveedorModoconsulta.Consumer>
                {modoConsulta => (
                    <React.Fragment>
                        {this.props.tipoEntrada === "EntradaTexto" ? (
                            <EleEntradaTexto
                                identificador={this.props.identificador}
                                inputEntrada={this.props.inputEntrada || this.refInput}
                                nombre={this.props.nombre}
                                tipo={this.props.tipo === undefined ? "text" : this.props.tipo}
                                valor={this.props.valor ? this.props.valor : ""}
                                apariencia={this.props.apariencia}
                                desactivado={this.props.desactivado}
                                desactivarSubrayado={this.props.desactivarSubrayado}
                                modoConsulta={modoConsulta}
                                etiqueta={this.props.etiqueta}
                                claseCss={this.props.claseCss}
                                obligatorio={this.props.obligatorio}
                                validacion={this.props.validacion}
                                mensajeValidacion={this.props.mensajeValidacion}
                                autocompletado={this.props.autocompletado}
                                multilineas={this.props.multilineas}
                                lineas={this.props.lineas}
                                lineasMaximas={this.props.lineasMaximas}
                                textoInfoCampo={this.props.textoInfoCampo}
                                adornoIzquierdo={this.props.adornoIzquierdo}
                                adornoDerecho={this.props.adornoDerecho}
                                mascara={this.props.mascara}
                                maximo={this.props.maximo}
                                caracterPlaceholder={this.props.caracterPlaceholder}
                                funcionOnFocus={this.props.funcionOnFocus}
                                funcionOnBlur={this.props.funcionOnBlur}
                                funcionOnHover={this.props.funcionOnHover}
                                funcionOnChange={this.cogeValor}
                                funcionOnClick={this.props.funcionOnClick}
                                funcionOnkeyDown={this.funcionOnKeyDownTexto}
                            />
                        ) : null}

                        {this.props.tipoEntrada === "EntradaNumeroAvanzado" ? (
                            <EleEntradaNumero
                                identificador={this.props.identificador}
                                inputEntrada={this.props.inputEntrada || this.refInput}
                                nombre={this.props.nombre}
                                valor={this.props.valor === undefined ? "" : this.props.valor}
                                apariencia={this.props.apariencia}
                                desactivado={this.props.desactivado}
                                desactivarSubrayado={this.props.desactivarSubrayado}
                                modoConsulta={modoConsulta}
                                etiqueta={this.props.etiqueta}
                                claseCss={this.props.claseCss}
                                obligatorio={this.props.obligatorio}
                                validacion={this.props.validacion}
                                mensajeValidacion={this.props.mensajeValidacion}
                                autocompletado={this.props.autocompletado}
                                minimo={this.props.minimo}
                                maximo={this.props.maximo}
                                separadorMillares={this.props.separadorMillares}
                                decimalesMaximos={this.props.decimalesMaximos}
                                decimalesFijos={this.props.decimalesFijos}
                                paso={this.props.paso}
                                adornoIzquierdo={this.props.adornoIzquierdo}
                                adornoDerecho={this.props.adornoDerecho}
                                funcionOnFocus={this.props.funcionOnFocus}
                                funcionOnBlur={this.props.funcionOnBlur}
                                funcionOnHover={this.props.funcionOnHover}
                                funcionOnChange={this.cogeValorNumero}
                                funcionOnClick={this.props.funcionOnClick}
                            />
                        ) : null}

                        {this.props.tipoEntrada === "EntradaNumero" ? (
                            <EleEntradaTexto
                                identificador={this.props.identificador}
                                inputEntrada={this.props.inputEntrada || this.refInput}
                                nombre={this.props.nombre}
                                tipo="number"
                                valor={this.numeroVisible}
                                apariencia={this.props.apariencia}
                                desactivado={this.props.desactivado}
                                desactivarSubrayado={this.props.desactivarSubrayado}
                                modoConsulta={modoConsulta}
                                etiqueta={this.props.etiqueta}
                                claseCss={this.props.claseCss}
                                obligatorio={this.props.obligatorio}
                                validacion={this.props.validacion}
                                mensajeValidacion={this.props.mensajeValidacion}
                                autocompletado={this.props.autocompletado}
                                multilineas={false}
                                lineas={1}
                                lineasMaximas={1}
                                minimo={this.props.minimo}
                                maximo={this.props.maximo}
                                // separadorMillares={this.props.separadorMillares} // Solo se usa en el EntradaNumeroAvanzado
                                decimalesMaximos={this.props.decimalesMaximos}
                                decimalesFijos={this.props.decimalesFijos}
                                paso={this.props.paso}
                                adornoIzquierdo={this.props.adornoIzquierdo}
                                adornoDerecho={this.props.adornoDerecho}
                                funcionOnFocus={this.funcionOnFocus}
                                funcionOnBlur={this.funcionOnBlur}
                                funcionOnHover={this.props.funcionOnHover}
                                funcionOnChange={this.funcionOnChangeNumeroBasico}
                                funcionOnClick={this.funcionOnClick}
                                funcionOnkeyDown={this.funcionOnkeyDownNumeroBasico}
                            />
                        ) : null}

                        {this.props.tipoEntrada === "EntradaFecha" ? (
                            <EleEntradaFecha
                                identificador={this.props.identificador}
                                inputEntrada={this.props.inputEntrada || this.refInput}
                                nombre={this.props.nombre}
                                tipo={this.props.tipo === undefined ? "date" : this.props.tipo === "month" && !this.admiteInputMonth ? "date" : this.props.tipo}
                                valor={this.fechaConvertida}
                                desactivado={this.props.desactivado}
                                apariencia={this.props.apariencia}
                                desactivarSubrayado={this.props.desactivarSubrayado}
                                modoConsulta={modoConsulta}
                                etiqueta={this.props.etiqueta}
                                claseCss={this.props.claseCss}
                                minimo={this.props.minimo}
                                maximo={this.props.maximo}
                                paso={this.props.paso}
                                obligatorio={this.props.obligatorio}
                                validacion={this.props.validacion}
                                mensajeValidacion={this.props.mensajeValidacion}
                                autocompletado={this.props.autocompletado}
                                adornoIzquierdo={this.props.adornoIzquierdo}
                                adornoDerecho={this.props.adornoDerecho}
                                funcionOnFocus={this.props.funcionOnFocus}
                                funcionOnBlur={this.props.funcionOnBlur}
                                funcionOnHover={this.props.funcionOnHover}
                                funcionOnChange={this.cogeValorFecha}
                                funcionOnClick={this.funcionOnClick}
                            />
                        ) : null}
                    </React.Fragment>
                )}
            </ProveedorModoconsulta.Consumer>
        );
    }
}

export default withNamespaces()(CompEntrada);
