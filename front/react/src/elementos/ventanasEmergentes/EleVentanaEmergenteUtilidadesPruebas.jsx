import { getByText } from 'react-testing-library';

class EleVentanaEmergenteUtilidadesPruebas {
    constructor(contenedor, texto, tipoPrueba) {
        this.dameVentanaEmergente = this.dameVentanaEmergente.bind(this);
        this.objeto = this.dameVentanaEmergente(contenedor, texto, tipoPrueba);

        if (this.objeto) {
            this.titulo = this.objeto.textContent;
            this.mensaje = this.objeto.textContent;
            this.claseCss = this.objeto.classList;
            this.nodoClick = this.objeto;
        }
    }

    dameVentanaEmergente(contenedor, texto, tipoPrueba) {
        if (tipoPrueba === 'css') {
            return getByText(contenedor, texto).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        } else {
            return getByText(contenedor, texto);
        }
    }
}

export default EleVentanaEmergenteUtilidadesPruebas;
