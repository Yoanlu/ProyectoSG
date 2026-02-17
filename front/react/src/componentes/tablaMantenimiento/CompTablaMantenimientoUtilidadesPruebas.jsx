import { queryByText } from 'react-testing-library';

class EleTablaUtilidadesPruebas {
    constructor(contenedor, texto) {
        if (contenedor) {
            const botonAñadir = queryByText(contenedor, 'add');
            if (botonAñadir) {
                this.botonAñadir = botonAñadir.parentNode.parentNode;
            }

            const botonModificar = queryByText(contenedor, 'edit');
            if (botonModificar) {
                this.botonModificar = botonModificar.parentNode.parentNode;
            }

            const botonConsultar = queryByText(contenedor, 'visibility');
            if (botonConsultar) {
                this.botonConsultar = botonConsultar.parentNode.parentNode;
            }

            const botonEliminar = queryByText(contenedor, 'delete');
            if (botonEliminar) {
                this.botonEliminar = botonEliminar.parentNode.parentNode;
            }
        }
    }
}

export default EleTablaUtilidadesPruebas;
