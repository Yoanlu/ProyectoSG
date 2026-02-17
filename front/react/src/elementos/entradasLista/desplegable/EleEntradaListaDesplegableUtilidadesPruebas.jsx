class EleEntradaListaDesplegableUtilidadesPruebas {
    constructor(contenedor) {
        if (contenedor) {
            this.input = contenedor.querySelector('input');
            this.label = contenedor.querySelector('label');

            this.nombre = this.input && this.input.name;
            this.etiqueta = this.label && this.label.textContent;
            this.claseCss = this.input && this.input.parentElement.className;
            this.valor = this.input && this.input.value;

            /*this.desactivado = this.objeto.className;
            this.nodoOnChange = this.objeto.firstElementChild.firstElementChild.nextSibling;*/
        }
    }
}

export default EleEntradaListaDesplegableUtilidadesPruebas;
