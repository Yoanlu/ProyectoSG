import { getByText } from 'react-testing-library';

class EleIconoUtilidadesPruebas {
    constructor(contenedor, texto) {
        this.dameEleBoton = this.dameEleBoton.bind(this);
        this.objeto = this.dameEleBoton(contenedor, texto);
        if (this.objeto) {
            this.icono = this.objeto.textContent;
            this.claseCss = this.objeto.className;
        }
    }
    dameEleBoton(contenedor, texto) {
        return getByText(contenedor, texto);
    }
}

export default EleIconoUtilidadesPruebas;
