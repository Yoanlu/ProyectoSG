import React from "react";
import PropTypes from "prop-types";
import { FormLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import estilos from "./CompEntradaGrupoInterruptor.module.css";

import EleEntradaInterruptor from "../../elementos/entradaInterruptor/EleEntradaInterruptor";

/**
 * Componente que agrupa un número 'n' de elementos Switchs (Radio Button).
 * @version 0.2
 * @author [Iván Barriga](http://sandav.es) | [ivan.barriga@sandav.es](mailto:ivan.barriga@sandav.es)
 **/
class CompEntradaGrupoInterruptor extends React.PureComponent {
    static propTypes = {
        /**
         * Define si debe tener un elemento chequeado obligatorio.
         */
        obligatorio: PropTypes.bool,

        /**
         * Almacena las propiedades modificables del componente superior.
         */
        opciones: PropTypes.array.isRequired,

        /**
         * Clase CSS que aplica en el componente.
         */
        claseCss: PropTypes.string,

        /**
         * Etiqueta que tendrá el elemento Switch.
         */
        etiqueta: PropTypes.string,

        /**
         * Ubicación de la etiqueta del elemento Switch. Será un valor('start' izquierda, 'end' derecha, 'top' arriba, 'bottom' abajo), si se omite se ubica por defecto a la derecha.
         */
        ubicacionEtiqueta: PropTypes.string,

        /**
         * Indica si la dirección de los Switch es horizontal (por defecto es vertical).
         */
        modoHorizontal: PropTypes.bool,

        /**
         * Indica si se centran los Switch
         */
        centrado: PropTypes.bool,

        /**
         * Etiqueta que engloba al grupo de elementos.
         */
        etiquetaGrupo: PropTypes.string,

        /**
         * Etiqueta ubicada en el footer del grupo y que engloba a todos los elementos.
         */
        etiquetaFooter: PropTypes.string,

        /**
         * Identificador del elemento.
         */
        nombre: PropTypes.string.isRequired,

        /**
         * Especifica si el componente debe estar desactivado o no.
         */
        desactivado: PropTypes.bool,

        /**
         * Función que se lanza para cambiar el estado de en un elemento superior.
         */
        funcionCambiaEstados: PropTypes.func,

        /**
         * Función que se dispara después de que el valor del componente haya cambiado.
         */

        funcionOnChange: PropTypes.func.isRequired,

        /**
         * Función que se dispara cuando el componente pierde el foco.
         */
        funcionOnBlur: PropTypes.func,

        /**
         * Función que se dispara cuando el componente coge el foco.
         */
        funcionOnFocus: PropTypes.func
    };

    static defaultProps = {
        obligatorio: false,
        desactivado: false,
        modoHorizontal: false,
        centrado: false,
        nombre: "default",
        ubicacionEtiqueta: "start",
        funcionOnChange() {
            return;
        },
        funcionOnBlur() {
            return;
        },
        funcionOnFocus() {
            return;
        }
    };

    constructor(props) {
        super(props);
    }

    /**
     * @public
     * Función que valida cuando se puede modificar el elemento o no.
     */
    funcionOnChange = clave => {
        if (this.props.chequeado === clave && !this.props.obligatorio) {
            clave = 0;
        }

        this.props.funcionOnChange(clave);
    };

    render() {
        let grupo = this.props.opciones.map(opcion => {
            return (
                <div className={estilos.contenedorInterruptor} key={opcion.key}>
                    <EleEntradaInterruptor
                        ubicacionEtiqueta={this.props.ubicacionEtiqueta}
                        chequeado={this.props.chequeado === opcion.key}
                        desactivado={opcion.desactivado ? opcion.desactivado : false}
                        etiqueta={opcion.etiqueta}
                        nombre={this.props.nombre}
                        claseCss={this.props.claseCss}
                        onBlur={this.props.funcionOnBlur}
                        onFocus={this.props.funcionOnFocus}
                        funcionOnChange={this.funcionOnChange.bind(this, opcion.key)}
                    />
                </div>
            );
        });

        return (
            <FormControl className={estilos.formControl + " " + (this.props.centrado ? estilos.centrado : "")} margin="normal" data-testid="test_id_pruebas">
                <FormLabel data-testid="test_id_pruebas_titulo">{this.props.etiquetaGrupo}</FormLabel>
                <FormGroup className={estilos.formGroup} data-testid="test_id_grupo">
                    <div className={this.props.modoHorizontal ? estilos.modoHorizontal : ""}>{grupo}</div>
                </FormGroup>
                <FormHelperText data-testid="test_id_pruebas_footer">{this.props.etiquetaFooter}</FormHelperText>
            </FormControl>
        );
    }
}

export default CompEntradaGrupoInterruptor;
