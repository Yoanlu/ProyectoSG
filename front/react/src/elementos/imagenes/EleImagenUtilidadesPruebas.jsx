import { getByAltText } from 'react-testing-library';

class EleImagenUtilidadesPruebas {
    constructor(contenedor, texto) {
        this.dameEleImagen = this.dameEleImagen.bind(this);
        this.objeto = this.dameEleImagen(contenedor, texto);

        if (this.objeto) {
            this.imagen = this.objeto.src;
            this.textoAlternativo = this.objeto.alt;
            this.claseCss = this.objeto.className;

            this.ancho = this.objeto.width;
            this.alto = this.objeto.height;

            this.nodoClick = this.objeto;
        }
    }
    dameEleImagen(contenedor, texto) {
        return getByAltText(contenedor, texto);
    }
}

export default EleImagenUtilidadesPruebas;
