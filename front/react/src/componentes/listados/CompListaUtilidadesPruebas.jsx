import { queryByText, queryByPlaceholderText } from 'react-testing-library';

class CompListaUtilidadesPruebas {
    constructor(contenedor, texto) {
        if (contenedor) {
            const botonRecuperar = queryByText(contenedor, 'refresh');
            if (botonRecuperar) {
                this.botonRecuperar = botonRecuperar.parentNode.parentNode;
            }

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

            this.primerFiltro = queryByPlaceholderText(contenedor, 'filter...');
        }
    }
}

export default CompListaUtilidadesPruebas;
