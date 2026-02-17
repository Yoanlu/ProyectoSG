function esBase64(string) {
    let inicio = string.substr(0, 4);

    if (inicio === "data") {
        return true;
    }

    return false;
}

async function readFileAsDataURL(file) {
    let result_base64 = await new Promise(resolve => {
        let fileReader = new FileReader();
        fileReader.onload = e => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });

    return result_base64;
}

const convertirUrlBase64 = async url => {
    let esTipoBase64 = esBase64(url);
    if (esTipoBase64) {
        return url;
    }

    let llamada = await fetch(url);
    let respuesta = await llamada.blob();
    let ficheroBase64 = await readFileAsDataURL(respuesta);

    return ficheroBase64;
};

export { convertirUrlBase64 };
