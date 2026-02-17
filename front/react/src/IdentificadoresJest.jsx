import { getByText } from "react-testing-library";

const dameBoton = function(contenedor, texto) {
    var miBoton = getByText(contenedor, texto);

    if (miBoton) {
        return miBoton.parentElement;
    } else {
        return null;
    }
};

const dameBotonImagen = function(contenedor, texto) {
    var miBoton = getByText(contenedor, texto);

    if (miBoton) {
        return miBoton.firstElementChild;
    } else {
        return null;
    }
};

export { dameBoton, dameBotonImagen };
