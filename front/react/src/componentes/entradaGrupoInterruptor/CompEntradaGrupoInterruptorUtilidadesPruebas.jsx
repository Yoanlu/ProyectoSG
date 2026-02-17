import { getByTestId } from 'react-testing-library';

class CompEntradaGrupoInterruptorUtilidadesPruebas {
    constructor(contenedor, texto, tipo) {
        this.dameGrupoInterruptor = this.dameGrupoInterruptor.bind(this);
        this.objeto = this.dameGrupoInterruptor(contenedor, texto, tipo);

        if (this.objeto) {
            this.claseCss = this.objeto.parentNode.parentNode.className;
            this.etiquetaGrupo = this.objeto.textContent;
            this.etiquetaFooter = this.objeto.textContent;
            if (tipo === 'click') {
                this.nodoChange = this.objeto.firstElementChild.lastElementChild;
            }
            if (tipo === 'contarHijos') {
                this.elementos = this.objeto.childElementCount;
            }
        }
    }

    dameGrupoInterruptor(contenedor, texto, tipo) {
        return getByTestId(contenedor, texto);
    }
}

export default CompEntradaGrupoInterruptorUtilidadesPruebas;
