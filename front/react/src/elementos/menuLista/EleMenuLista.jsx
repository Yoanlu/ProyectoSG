import React from "react";
import PropTypes from "prop-types";

import { withNamespaces } from "react-i18next";

import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Componente from "../../componentes/Componente";
import EleIcono from "../iconos/EleIcono";
import { cssListas } from "../../componentes/Utilidades";

/**
 * Elemento Menu con opciones.
 *
 * @version 0.1
 * @author [Sara García] <sara.garcia@sandav.es>
 */

class EleMenuLista extends Componente {
    static propTypes = {
        /**
         * Datos que se van a cargar en el listado.
         */
        datos: PropTypes.array.isRequired,
        /**
         * Dato seleccionado inicial
         */
        seleccionado: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /**
         * Campo que va a tener el valor Clave para posteriormente identificar el click
         */
        campoClave: PropTypes.string.isRequired,
        /**
         * Campo a mostrar en el listado.
         */
        campoVisible: PropTypes.string.isRequired,
        /**
         * Función que se dispara al hacer click en alguno de los items del listado.
         */
        funcionOnClick: PropTypes.func
    };

    static defaultProps = {
        funcionOnClick() {
            return;
        }
    };

    render() {
        return (
            <MenuList>
                {this.props.datos.map((opcion, i) => (
                    <MenuItem
                        sx={cssListas}
                        key={i}
                        selected={opcion[this.props.campoClave] === this.props.seleccionado}
                        onClick={this.props.funcionOnClick.bind(this, opcion[this.props.campoClave])}
                    >
                        {opcion["icono"] ? <EleIcono icono={opcion["icono"]} /> : undefined}
                        {this.props.t(opcion[this.props.campoVisible], undefined, "auto")}
                    </MenuItem>
                ))}
            </MenuList>
        );
    }
}

export default withNamespaces()(EleMenuLista);
