import React from "react";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import estilos from "./EleEntradaInterruptor.module.css";
import { ProveedorModoconsulta } from "../../componentes/mantenimientos/contenedor/CompMantenimientoContenedor";

/**
 * Elemento interruptor que permite alternar entre los estados marcados y no marcados.
 *
 * @version 0.2
 *
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 * @author [Iván Barriga](http://sandav.es) | [ivan.barriga@sandav.es](mailto:ivan.barriga@sandav.es)
 */
const EleEntradaInterruptor = ({
    identificador,
    chequeado=false,
    claseCss,
    desactivado=false,
    nombre,
    etiqueta,
    ubicacionEtiqueta="end",
    funcionOnChange=() => {},
    funcionOnBlur=() => {},
    funcionOnFocus=() => {},
}) => {
    let cogeValor = (e, valor) => {
        funcionOnChange(e, valor, nombre, e.target);
    };

    return (
        <ProveedorModoconsulta.Consumer>
            {modoConsulta => (
                <FormControlLabel
                    data-testid="id_testing_etiqueta"
                    className={claseCss + " " + (ubicacionEtiqueta === "end" ? estilos.entradaInterruptorEnd : estilos.entradaInterruptor)}
                    control={
                        <Switch
                            color="primary"
                            data-testid="id_testing_elemento"
                            disableRipple={false}
                            id={identificador}
                            checked={chequeado}
                            disabled={desactivado || modoConsulta}
                            name={nombre}
                            onChange={cogeValor}
                            onBlur={funcionOnBlur}
                            onFocus={funcionOnFocus}
                        />
                    }
                    label={etiqueta}
                    labelPlacement={ubicacionEtiqueta}
                />
            )}
        </ProveedorModoconsulta.Consumer>
    );
};

EleEntradaInterruptor.propTypes = {
    /**
     * Identificador del elemento
     */
    identificador: PropTypes.string,

    /**
     * Contiene si el elemento está chequeado o no.
     */
    chequeado: PropTypes.bool,

    /**
     *  Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,

    /**
     * Indica donde estará ubicada la etiqueta del elemento.
     */
    ubicacionEtiqueta: PropTypes.string,

    /**
     * Indica si el elemento se crea de manera deshabilitada.
     */
    desactivado: PropTypes.bool,

    /**
     * nombre del elemento.
     */
    nombre: PropTypes.string,

    /**
     * Texto de la etiqueta que tendrá el elemento.
     */
    etiqueta: PropTypes.string,

    /**
     * Evento lanzado cuando el elemento cambia.
     */
    funcionOnChange: PropTypes.func.isRequired,

    /**
     * Evento lanzado cuando el elemento pierde el foco.
     */
    funcionOnBlur: PropTypes.func,

    /**
     * Evento lanzado cuando el elemento coge el foco.
     */
    funcionOnFocus: PropTypes.func
};

export default EleEntradaInterruptor;
