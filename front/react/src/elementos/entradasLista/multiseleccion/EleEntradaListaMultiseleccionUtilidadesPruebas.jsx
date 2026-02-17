import { getByTestId } from 'react-testing-library';

class EleEntradaListaMultiseleccionUtilidadesPruebas {
    constructor(contenedor, texto) {
        this.dameDesplegable = this.dameDesplegable.bind(this);
        this.objeto = this.dameDesplegable(contenedor, texto);
        if (this.objeto) {
            this.nombre = this.objeto.firstElementChild.firstElementChild.nextElementSibling.name;
            this.valor = this.objeto.firstElementChild.firstElementChild.firstElementChild.textContent;
            this.claseCss = this.objeto.className;
            this.etiqueta = this.objeto.parentNode.textContent;
            this.chip = this.objeto.firstElementChild.firstElementChild.firstElementChild.childElementCount;

            this.desactivado = this.objeto.className;

            this.nodoOnclick = this.objeto.firstElementChild.firstElementChild.nextSibling;
        }
    }

    dameDesplegable(contenedor, texto) {
        return getByTestId(contenedor, texto);
    }
}

export default EleEntradaListaMultiseleccionUtilidadesPruebas;
