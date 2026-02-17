import { createTheme } from "@mui/material/styles";

const esDesarrollo = Boolean(
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/) ||
        // localhost or 192.168.* is local/lan
        window.location.hostname.match(/(192.168|localhost|[::1]).*/)
);

const clonar = elemento => {
    if (Array.isArray(elemento)) {
        return elemento.slice();
    } else if (typeof elemento === "object") {
        return Object.assign({}, elemento);
    }
};

const estaVacio = elemento => {
    if (elemento === null || elemento === undefined || elemento === "") {
        return true;
    }

    if (elemento.constructor === Array && elemento.length === 0) {
        return true;
    }

    return elemento.constructor === Object && Object.keys(elemento).length === 0;
};

const fechaUTC = (fecha = new Date()) => {
    if (typeof fecha === "string") {
        let fechaParseada = fecha.replaceAll("-", "/");
        fecha = new Date(fechaParseada);
    }

    var now_utc = Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), fecha.getHours(), fecha.getMinutes(), fecha.getSeconds());

    return new Date(now_utc);
};

const comprobarAdmiteInputMonth = () => {
    let esFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") >= 0;
    if (esFirefox) {
        return false;
    }

    let esSafari = navigator.userAgent.toLowerCase().indexOf("safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0;
    if (esSafari) {
        return false;
    }

    return true;
};

const fechaSinDia = (fecha = new Date()) => {
    if (typeof fecha === "string") {
        let fechaParseada = fecha.replace("-", "/");
        fecha = new Date(fechaParseada);
    }

    var mes = fecha.getUTCMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }

    var ejercicio = fecha.getUTCFullYear();
    var now_utc_string = mes + "/" + ejercicio;

    return now_utc_string;
};

const fechaSinDiaUTC = (fecha = new Date()) => {
    if (typeof fecha === "string") {
        let fechaParseada = fecha.replace("-", "/");
        fecha = new Date(fechaParseada);
    }

    var mes = fecha.getUTCMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }

    var ejercicio = fecha.getUTCFullYear();
    var now_utc_string = ejercicio + "-" + mes;

    return now_utc_string;
};

const fechaUTCString = (fecha = new Date()) => {
    if (typeof fecha === "string") {
        let fechaParseada = fecha.replace("-", "/");
        fecha = new Date(fechaParseada);
    }

    var dia = fecha.getUTCDate();
    if (dia < 10) {
        dia = "0" + dia;
    }

    var mes = fecha.getUTCMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }

    var ejercicio = fecha.getUTCFullYear();
    var now_utc_string = ejercicio + "-" + mes + "-" + dia;

    return now_utc_string;
};

const fechaHoraUTCString = (fecha = new Date()) => {
    if (typeof fecha === "string") {
        let fechaParseada = fecha.replace("-", "/");
        fecha = new Date(fechaParseada);
    }

    var dia = fecha.getUTCDate();
    if (dia < 10) {
        dia = "0" + dia;
    }

    var mes = fecha.getUTCMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }

    var ejercicio = fecha.getUTCFullYear();

    var hora = fecha.getUTCHours();
    if (hora < 10) {
        hora = "0" + hora;
    }

    var minuto = fecha.getUTCMinutes();
    if (minuto < 10) {
        minuto = "0" + minuto;
    }

    var segundo = fecha.getUTCSeconds();
    if (segundo < 10) {
        segundo = "0" + segundo;
    }

    var now_utc_string = ejercicio + "-" + mes + "-" + dia + "T" + hora + ":" + minuto + ":" + segundo;

    return now_utc_string;
};

const fechaUtcFormateada = (fecha = new Date()) => {
    if (typeof fecha === "string") {
        let fechaParseada = fecha.replace("-", "/");
        fecha = new Date(fechaParseada);
    }

    var dia = fecha.getUTCDate();
    if (dia < 10) {
        dia = "0" + dia;
    }

    var mes = fecha.getUTCMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }

    var ejercicio = fecha.getUTCFullYear();
    var now_utc_string = dia + "/" + mes + "/" + ejercicio;

    return now_utc_string;
};

const recuperaSubCadena = (cadena, separador, indicadorSubcadena) => {
    let arraySubCadenas = [];
    arraySubCadenas = cadena.split(separador);
    return arraySubCadenas[indicadorSubcadena];
};

const recogerIdioma = idioma => {
    return recuperaSubCadena(idioma, "-", 0);
};

const formatearNumero = (valor, decimales = undefined, decimalesMaximos = undefined) => {
    if (isNaN(valor) || estaVacio(valor)) {
        return valor;
    }

    let valorFormateado = parseFloat(valor);

    if (!decimales) {
        // Si ya tiene decimales, los mantenemos
        let conjunto_numero = valor.toString().split(".");
        if (conjunto_numero[1]) {
            decimales = conjunto_numero[1].length;
        }
    }

    if (decimales > decimalesMaximos) {
        decimales = decimalesMaximos;
    }

    let opciones = undefined;
    if (decimales !== undefined) {
        opciones = {
            minimumFractionDigits: decimales,
            maximumFractionDigits: decimalesMaximos || decimales
        };
    } else if (decimalesMaximos !== undefined) {
        opciones = {
            maximumFractionDigits: decimalesMaximos
        };
    }

    let idioma = localStorage.getItem("i18nextLng");
    if (idioma.includes("en-")) {
        valorFormateado = new Intl.NumberFormat("en-US", opciones).format(valorFormateado);
    } else {
        valorFormateado = new Intl.NumberFormat("de-DE", opciones).format(valorFormateado);
    }

    return valorFormateado;
};

const crearTabla = (cabeceras, filas, traductor) => {
    let tabla = document.createElement("table");
    let camposVisibles = [];

    let cabecera = document.createElement("tr");
    for (let i in cabeceras) {
        let th = document.createElement("th");
        th.style.width = "700px";
        camposVisibles.push(cabeceras[i].campo);
        const nombre = traductor(cabeceras[i].titulo);
        const texto = document.createTextNode(nombre);
        th.appendChild(texto);
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for (let i in filas) {
        const fila = filas[i];
        let filaHTML = document.createElement("tr");
        for (let indice = 0; indice < camposVisibles.length; indice++) {
            let campo = camposVisibles[indice];
            if (Object.keys(fila).includes(campo)) {
                const td = document.createElement("td");
                const texto = document.createTextNode(fila[campo]);
                td.appendChild(texto);
                filaHTML.appendChild(td);
            } else {
                const td = document.createElement("td");
                const texto = document.createTextNode("");
                td.appendChild(texto);
                filaHTML.appendChild(td);
            }
        }
        tabla.appendChild(filaHTML);
    }

    return tabla;
};

const exportarACsv = (cabeceras, filas, traductor, tabla = null) => {
    if (!tabla) {
        tabla = crearTabla(cabeceras, filas, traductor);
    }

    let csv = [];
    let rows = tabla.querySelectorAll("tr");

    for (let i = 0; i < rows.length; i++) {
        let row = [];
        let cols = rows[i].querySelectorAll("th, td");

        for (let j = 0; j < cols.length; j++) {
            let columna = cols[j];

            if (columna.innerText === "null") {
                row.push('""');
            } else {
                row.push('"' + columna.innerText + '"');
            }
        }

        row.push("\n");
        csv.push(row.join(";"));
    }

    let enlace = document.createElement("a");
    //escapamos el texto para añadir las tildes.
    let procesada = escape(csv);

    //Eliminamos las comas que nos genera al principio de línea
    procesada = procesada.replace(/%2C/g, "");

    enlace.setAttribute("href", "data:text/csv;charset=utf-8," + procesada);
    enlace.download = "export.csv";
    enlace.style.display = "none";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    return false;
};

function exportTableToExcel(tablas, filename = "export.xls") {
    try {
        const XLSX = require("xlsx");
        const wb = XLSX.utils.book_new();

        tablas.forEach((tabla, indice) => {
            const ws = XLSX.utils.table_to_sheet(tabla);
            XLSX.utils.book_append_sheet(wb, ws, `Sheet_${indice + 1}`);
        });

        XLSX.writeFile(wb, filename);
    } catch (error) {
        return exportTableToHtmlExcel(tablas);
    }
}

const exportarAExcel = (cabeceras, filas, traductor, tabla = null, tablas = null) => {
    if (!tabla && !tablas) {
        tabla = crearTabla(cabeceras, filas, traductor);
    }

    if (!tablas) {
        tablas = [];
        tablas.push(tabla);
    }

    exportTableToExcel(tablas);
};

function exportTableToHtmlExcel(tablas) {
    var htmls = "";
    var uri = "data:application/vnd.ms-excel;base64,";
    var template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"></head><body>{table}</body></html>';

    var base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    };

    var format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
        });
    };

    tablas.forEach(filaTabla => {
        let element2 = filaTabla.cloneNode(true);
        let excluirExcel = element2.querySelectorAll(".excluirExcel");
        excluirExcel.forEach(elementoExcluir => {
            elementoExcluir.remove();
        });

        htmls += element2.outerHTML;
        htmls += "<br /><br />";
    });

    htmls = htmls.replaceAll("∞", "Inf");

    var ctx = {
        worksheet: "Worksheet",
        table: htmls
    };

    var link = document.createElement("a");
    link.download = "export.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
}

const redondear = (numero, decimales) => {
    return Number(Math.round(numero + "e" + decimales) + "e-" + decimales);
};

function isCssSmoothSCrollSupported() {
    return "scrollBehavior" in document.documentElement.style;
}

const customScroll = (left, top, method, target = window) => {
    if (isCssSmoothSCrollSupported()) {
        target.scrollTo({
            left: left,
            top: top,
            behavior: method
        });
    } else {
        target.scrollTo(left, top);
    }
};

const smoothScroll = (left, top, target) => {
    customScroll(left, top, "smooth", target);
};

const limpiaCadena = cadena => {
    if (!cadena || typeof cadena !== "string") {
        return cadena;
    }

    let r = cadena.toLowerCase();
    r = r.replace(new RegExp(/[àáâãäå]/g), "a");
    r = r.replace(new RegExp(/[èéêë]/g), "e");
    r = r.replace(new RegExp(/[ìíîï]/g), "i");
    r = r.replace(new RegExp(/[òóôõö]/g), "o");
    r = r.replace(new RegExp(/[ùúûü]/g), "u");
    //r = r.replace(new RegExp(/ñ/g),"n");
    return r;
};

const getIDsFromDicts = list => {
    return list.map(row => {
        return row.id;
    });
};

const arraysEquivalentes = function(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
};

const getCookie = function(name) {
    var match = decodeURIComponent(document.cookie).match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
};

const interpolateColor = (color1, color2) => {
    const hex = c => parseInt(c, 16);
    const r1 = hex(color1.slice(1, 3));
    const g1 = hex(color1.slice(3, 5));
    const b1 = hex(color1.slice(5, 7));

    const r2 = hex(color2.slice(1, 3));
    const g2 = hex(color2.slice(3, 5));
    const b2 = hex(color2.slice(5, 7));

    const r = Math.round(10 * Math.abs(r2 - r1));
    const g = Math.round(10 * Math.abs(g2 - g1));
    const b = Math.round(10 * Math.abs(b2 - b1));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
};

function dameColorSecundario(opcionesTema, colorPrincipal) {
    let colorDisponible = opcionesTema.find(fila => fila.ruta === colorPrincipal);

    if (colorDisponible) {
        let colorSecundario = colorDisponible.secundario;

        if (colorSecundario && colorSecundario !== colorPrincipal) {
            window.localStorage.setItem("themeColorSecondary", colorSecundario);
        }

        let degradado = colorDisponible.degradado === true;
        window.localStorage.setItem("themeGradient", degradado);

        let interpolado = colorDisponible.interpolado === true;
        window.localStorage.setItem("themeInterpolate", interpolado);

        return colorSecundario || colorPrincipal;
    }

    return colorPrincipal;
}

function damePixelesFuente(opcionesTema, colorPrincipal) {
    let colorDisponible = opcionesTema.find(fila => fila.ruta === colorPrincipal);

    if (colorDisponible && colorDisponible.pixelesFuente > 0) {
        return colorDisponible.pixelesFuente;
    }

    return 12;
}

const crearTema = (opcionesTema, nuevoColor, nuevaLuz, fuente = undefined) => {
    let colorTema;

    if (nuevoColor) {
        colorTema = nuevoColor;
        window.localStorage.setItem("themeColor", colorTema);
    } else {
        colorTema = window.localStorage.getItem("themeColor");
        if (colorTema) {
            let colorDisponible = opcionesTema.find(fila => fila.ruta === colorTema);
            if (!colorDisponible) {
                colorTema = null;
            }
        }

        if (!colorTema) {
            colorTema = opcionesTema[0].ruta;
            window.localStorage.setItem("themeColor", colorTema);
        }
    }

    let colorSecundario = dameColorSecundario(opcionesTema, colorTema);

    let luzTema;
    if (nuevaLuz) {
        luzTema = nuevaLuz;
        window.localStorage.setItem("theme", luzTema);
    } else {
        luzTema = window.localStorage.getItem("theme");
        if (!luzTema) {
            luzTema = "os";
            window.localStorage.setItem("theme", luzTema);
        }
    }

    if (luzTema === "os") {
        luzTema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    if (colorTema === "#e70f47") {
        colorTema = "#f45e2c";
    }

    // if (esDesarrollo) {
    //     colorTema += "cc";
    // }

    let pixelesFuente = damePixelesFuente(opcionesTema, colorTema);

    let nuevoTema = createTheme({
        palette: {
            mode: luzTema,
            primary: {
                main: colorTema,
                contrastText: "rgb(255, 255, 255)"
            },

            background: {
                panelIntermedio: "#cecece",
                fondoClaro: colorTema + "50"
            },

            secondary: {
                main: colorSecundario,
                contrastText: "rgb(255, 255, 255)"
            }

            /*error: {
                main: '#f44336',
            }*/
        },
        typography: {
            fontFamily: fuente,
            fontSize: pixelesFuente,
            useNextVariants: true
        }
    });

    if (luzTema === "dark") {
        nuevoTema = createTheme(nuevoTema, {
            palette: {
                background: {
                    panelIntermedio: "#737373",
                    default: "#303030",
                    paper: "#333333" // paper: "#424242"
                }
            }
        });
    }

    return nuevoTema;
};

const establecerIdioma = opcionesIdiomas => {
    let idioma = window.localStorage.getItem("i18nextLng");
    if (idioma) {
        for (const filaIdioma in opcionesIdiomas) {
            if (opcionesIdiomas[filaIdioma].ruta === idioma) {
                return;
            }
        }
    }

    let idiomaPorDefecto = opcionesIdiomas[0].ruta;
    window.localStorage.setItem("i18nextLng", idiomaPorDefecto);
    return idiomaPorDefecto;
};

const fechaEuropa = valor => {
    if (valor !== null) {
        let fechaCompleta = valor.match(/\d+/g),
            year = fechaCompleta[0],
            month = fechaCompleta[1],
            day = fechaCompleta[2];

        return day + "-" + month + "-" + year;
    } else {
        return "";
    }
};

const url_slug = (texto, separador = "-") => {
    if (!texto) {
        return undefined;
    }

    let slug = texto
        .toString()
        .normalize("NFD") // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, separador);

    return slug;
};

const esHoraMinutoSegundo = texto => {
    const regex = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    return regex.test(texto);
};

const convertirATotalSegundos = hora => {
    const [hh, mm, ss] = hora.split(":").map(Number);
    return hh * 3600 + mm * 60 + ss;
};

const convertirAHoraMinutoSegundo = totalSegundos => {
    const hh = Math.floor(totalSegundos / 3600);
    const mm = Math.floor((totalSegundos % 3600) / 60);
    const ss = totalSegundos % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
};

const getMobileOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "PC";
};

const modoVentana = () => {
    document.exitFullscreen();
};

const modoPantallaCompleta = () => {
    document.documentElement.requestFullscreen();
};

// Funcion push que actua como un Set, si el elemento ya existe en la lista, no se añade
Object.defineProperty(Array.prototype, "pushSet", {
    enumerable: false,
    value: function(elemento) {
        if (!this.includes(elemento)) {
            this.push(elemento);
        }
    }
});

// Funcion push que actua como un Set con prioridad, si el elemento ya existe en la lista, se borra el anterior
Object.defineProperty(Array.prototype, "pushSetPriority", {
    enumerable: false,
    value: function(elemento) {
        let indice = this.indexOf(elemento);
        if (indice >= 0) {
            this.splice(indice, 1);
        }
        this.push(elemento);
    }
});

const cssListas = {
    "&.Mui-selected": {
        backgroundColor: "primary.light",
        color: "primary.contrastText"
    },
    "&.Mui-selected:hover": {
        backgroundColor: "primary.dark",
        color: "primary.contrastText"
    },
    ":hover": {
        backgroundColor: "action.selected"
    }
};

const cssModoConsulta = {
    "& label[data-shrink='false']": {
        // color: "primary.contrastText",
        zIndex: 1
    },
    "& .MuiInputBase-root": {
        color: "background.contrastText",
        backgroundColor: "background.fondoClaro"
    },
    "& .MuiChip-root": {
        color: "primary.contrastText",
        backgroundColor: "primary.main"
    },
    "& .MuiInput-underline:before": {
        borderBottomWidth: "2px",
        borderBottomStyle: "dotted"
    },
    "& .MuiInput-underline:after": {
        borderBottomWidth: "2px",
        borderBottomStyle: "dotted"
    }
};

// Ocultamos el error de defaultProps arrastrado de Devexpress
const originalError = console.error;
console.error = (message, ...args) => {
    if (message.includes("Support for defaultProps will be removed")) {
        // console.warn(message, ...args);
        return;
    }
    originalError(message, ...args);
};

export {
    esDesarrollo,
    clonar,
    estaVacio,
    fechaUTC,
    comprobarAdmiteInputMonth,
    fechaSinDia,
    fechaSinDiaUTC,
    fechaUTCString,
    fechaHoraUTCString,
    recuperaSubCadena,
    recogerIdioma,
    exportarAExcel,
    exportarACsv,
    redondear,
    customScroll,
    smoothScroll,
    limpiaCadena,
    getIDsFromDicts,
    arraysEquivalentes,
    interpolateColor,
    getCookie,
    crearTema,
    establecerIdioma,
    formatearNumero,
    fechaEuropa,
    fechaUtcFormateada,
    url_slug,
    esHoraMinutoSegundo,
    convertirATotalSegundos,
    convertirAHoraMinutoSegundo,
    getMobileOperatingSystem,
    modoVentana,
    modoPantallaCompleta,
    cssListas,
    cssModoConsulta
};
