import { getByTestId, queryByText } from 'react-testing-library';

class EleEntradaTextoUtilidadesPruebas {
    constructor(contenedor, texto, tipoPrueba) {
        if (tipoPrueba === 'adorno') {
            this.dameEleEntradaTextoAdorno = this.dameEleEntradaTexto.bind(this);
        } else {
            this.dameEleEntradaTexto = this.dameEleEntradaTexto.bind(this);
        }

        if (tipoPrueba === 'adorno') {
            this.objeto = this.dameEleEntradaTextoAdorno(contenedor, texto);
        } else {
            this.objeto = this.dameEleEntradaTexto(contenedor, texto);
        }

        if (this.objeto) {
            this.validacion = this.objeto.parentNode.lastElementChild;
            this.mensajeValidacion = this.objeto.parentNode.lastElementChild.textContent;
            this.identificador = this.objeto.firstChild.firstChild.id;
            this.tipo = this.objeto.firstChild.firstChild.type;
            this.valor = this.objeto.firstChild.firstChild.value;
            this.etiqueta = this.objeto.parentNode.parentNode.firstElementChild.firstChild.textContent;
            this.claseCss = this.objeto.className;
            this.desactivado = this.objeto.firstChild.firstChild.disabled;
            this.obligatorio = this.objeto.firstChild.firstChild.required;
            this.autocompletado = this.objeto.firstChild.firstChild.autocomplete;
            this.minimo = this.objeto.firstChild.firstChild.min;
            this.maximo = this.objeto.firstChild.firstChild.max;
            this.paso = this.objeto.firstChild.firstChild.step;
            this.multilinea = this.objeto.lastElementChild.className;
            this.lineasMaximas = this.objeto.getAttribute('maxrows');

            try {
                this.adornoIzquierdo = this.objeto.firstElementChild.firstElementChild.textContent;
            } catch (error) {
                this.adornoIzquierdo = null;
            }

            try {
                this.adornoDerecho = this.objeto.lastElementChild.textContent;
            } catch (error) {
                this.adornoDerecho = null;
            }

            this.nodoOnChange = this.objeto.firstElementChild.firstChild;
            this.nodoOnHover = this.objeto.firstElementChild.firstChild;
        }
    }

    dameEleEntradaTexto(contenedor, texto) {
        return getByTestId(contenedor, texto);
    }

    dameEleEntradaTextoAdorno(contenedor, texto) {
        return queryByText(contenedor, texto);
    }
}

export default EleEntradaTextoUtilidadesPruebas;
