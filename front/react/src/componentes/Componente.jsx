import { PureComponent } from 'react';
import { clonar } from './Utilidades';

class Componente extends PureComponent {
    constructor(props) {
        super(props);

        this.montado = true;
    }

    setState(actualizador, llamada) {
        if (!this.montado) {
            return;
        }

        if (actualizador !== null && actualizador !== undefined) {
            if (actualizador.constructor.name === 'Object') {
                for (let indice in actualizador) {
                    let clave = actualizador[indice];
                    if (typeof clave === 'object') {
                        actualizador[indice] = clonar(clave);
                    }
                }
            }
        }

        super.setState(actualizador, llamada);
    }

    componentWillUnmount() {
        this.montado = false;
    }
}

export default Componente;
