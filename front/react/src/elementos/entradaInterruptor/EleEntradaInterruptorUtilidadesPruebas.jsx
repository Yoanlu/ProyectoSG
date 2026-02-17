import { getByTestId } from 'react-testing-library';

class EleEntradaInterruptorUtilidadesPruebas {
    constructor(contenedor, texto) {
        this.dameInterruptor = this.dameInterruptor.bind(this);
        this.objeto = this.dameInterruptor(contenedor, texto);

        if (this.objeto) {
            this.chequeado = this.objeto.className;
            this.claseCss = this.objeto.className;
            this.desactivado = this.objeto.className;
            this.etiqueta = this.objeto.textContent;
            this.ubicacionEtiqueta = this.objeto.className;
            this.nodoChange = this.objeto.firstElementChild.lastElementChild;
        }
    }

    dameInterruptor(contenedor, texto) {
        return getByTestId(contenedor, texto);
    }
}

export default EleEntradaInterruptorUtilidadesPruebas;
