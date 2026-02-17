import React from "react";

import { vistaContenedor } from "../../../../componentes/vistas/CompVistaContenedor";
import CompProteccionDatos from "../componentes/CompProteccionDatos";

/**
 * Vista en la que se va a visualizar la información relacionada con la ley de protección de datos.
 *
 * @version 0.1
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
class VistaProteccionDatos extends React.Component {
    render() {
        return <CompProteccionDatos />;
    }
}

export default vistaContenedor(VistaProteccionDatos);
