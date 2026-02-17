import React from "react";

import estilos from "./ElePieLeyenda.module.css";

const LeyendaContexto = React.createContext([]);

/**
 * Componente básico para renderizar una leyenda personalizada.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class ElePieLeyenda extends React.PureComponent {
    static contextType = LeyendaContexto;

    render() {
        if (!this.context) {
            return undefined;
        }

        return <div className={estilos.leyenda}>{this.context}</div>;
    }
}

export { LeyendaContexto };
export default ElePieLeyenda;
