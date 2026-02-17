import { getByTestId, queryByText } from 'react-testing-library';

class EleEntradaFechaUtilidadesPruebas {
    constructor(contenedor, texto, tipoPrueba) {
        if (tipoPrueba === 'adorno') {
            this.dameEleEntradaFechaAdorno = this.dameEleEntradaFecha.bind(this);
        } else {
            this.dameEleEntradaFecha = this.dameEleEntradaFecha.bind(this);
        }

        if (tipoPrueba === 'adorno') {
            this.objeto = this.dameEleEntradaFechaAdorno(contenedor, texto);
        } else {
            this.objeto = this.dameEleEntradaFecha(contenedor, texto);
        }

        if (this.objeto) {
            this.identificador = this.objeto.firstChild.firstChild.id;
            this.tipo = this.objeto.firstChild.firstChild.type;
            this.valor = this.objeto.firstChild.firstChild.value;
            this.etiqueta = this.objeto.parentNode.parentNode.firstElementChild.firstChild.textContent;
            this.claseCss = this.objeto.className;
            this.desactivado = this.objeto.firstChild.firstChild.disabled;
            this.obligatorio = this.objeto.firstChild.firstChild.required;
            this.validacion = this.objeto.parentNode.lastElementChild;
            this.mensajeValidacion = this.objeto.parentNode.lastElementChild.textContent;
            this.autocompletado = this.objeto.firstChild.firstChild.autocomplete;
            this.minimo = this.objeto.firstChild.firstChild.min;
            this.maximo = this.objeto.firstChild.firstChild.max;
            this.paso = this.objeto.firstChild.firstChild.step;

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

    dameEleEntradaFecha(contenedor, texto) {
        return getByTestId(contenedor, texto);
    }

    dameEleEntradaFechaAdorno(contenedor, texto) {
        return queryByText(contenedor, texto);
    }
}

export default EleEntradaFechaUtilidadesPruebas;
