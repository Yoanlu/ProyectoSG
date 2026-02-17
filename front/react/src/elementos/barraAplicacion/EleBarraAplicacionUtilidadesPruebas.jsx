class EleBarraAplicacionUtilidadesPruebas {
    constructor(contenedor) {
        if (contenedor) {
            this.objeto = contenedor.firstChild;
            this.texto = this.objeto.firstChild.textContent;
        }
    }
}

export default EleBarraAplicacionUtilidadesPruebas;
