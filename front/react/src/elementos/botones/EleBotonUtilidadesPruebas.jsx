import { getByTestId } from 'react-testing-library';

class EleBotonUtilidadesPruebas {
    constructor(contenedor, texto) {
        this.dameEleBoton = this.dameEleBoton.bind(this);
        this.objeto = this.dameEleBoton(contenedor, texto);
        if (this.objeto) {
            this.texto = this.objeto.firstElementChild.textContent;
            this.tipo = this.objeto.type;
            this.desactivado = this.objeto.disabled;
            this.claseCss = this.objeto.className;
            this.apariencia = this.objeto.className;
            try {
                this.icono = this.objeto.firstElementChild.firstElementChild.textContent;
            } catch (error) {
                this.icono = null;
            }

            try {
                this.imagenUrl = this.objeto.firstElementChild.firstElementChild.src;
            } catch (error) {
                this.imagenUrl = null;
            }

            this.tamano = this.objeto.className;
            this.primario = this.objeto.className;

            this.nodoClick = this.objeto;
            this.nodoHover = this.objeto;
        }
    }
    dameEleBoton(contenedor, texto, tipoPrueba) {
        return getByTestId(contenedor, texto);
    }
}

export default EleBotonUtilidadesPruebas;
