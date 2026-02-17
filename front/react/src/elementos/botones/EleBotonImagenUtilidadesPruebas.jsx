import { getByTestId } from 'react-testing-library';

class EleBotonImagenUtilidadesPruebas {
    constructor(contenedor, texto) {
        this.dameEleBoton = this.dameEleBoton.bind(this);
        this.objeto = this.dameEleBoton(contenedor, texto);

        if (this.objeto) {
            this.desactivado = this.objeto.disabled;
            this.claseCss = this.objeto.className;
            this.primario = this.objeto.className;

            try {
                this.icono = this.objeto.firstElementChild.firstElementChild.textContent;
            } catch (error) {
                this.icono = null;
            }

            this.nodoClick = this.objeto;
            this.nodoHover = this.objeto;
        }
    }

    dameEleBoton(contenedor, texto) {
        return getByTestId(contenedor, texto);
    }
}

export default EleBotonImagenUtilidadesPruebas;
