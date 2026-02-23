import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompEntradaFicheroDragDrop.module.css";
import EleBoton from "../../elementos/botones/EleBoton";
import { CircularProgress } from "@mui/material";

/**
 * Componente que permite la entrada de ficheros externos mediante drag & drop o selección manual.
 * Basado en CompEntradaFicheroMultiple pero con funcionalidad de arrastrar y soltar.
 *
 * @version 0.1
 */
class CompEntradaFicheroDragDrop extends React.PureComponent {
    static propTypes = {
        /**
         * Nombre asociado el componente. Valor Requerido.
         */
        nombre: PropTypes.string.isRequired,
        /**
         * Array de ficheros seleccionados.
         */
        valor: PropTypes.array,
        /**
         * Nombre del campo para el formulario.
         */
        campo: PropTypes.string,
        /**
         * Texto del botón.
         */
        textoBoton: PropTypes.string,
        /**
         * Desactiva o activa el componente.
         */
        desactivado: PropTypes.bool,
        /**
         * Establece la obligatoriedad del elemento, permitiendo o no el valor nulo.
         */
        obligatorio: PropTypes.bool,
        /**
         * Clase que establece los estilos del componente.
         */
        claseCss: PropTypes.string,
        /**
         * Función que se dispara al cambiar el valor del componente.
         */
        funcionOnChange: PropTypes.func,
        /**
         * Función que se dispara cuando el componente coge el foco.
         */
        funcionOnFocus: PropTypes.func,
        /**
         * Función que se dispara cuando el componente pierde el foco.
         */
        funcionOnBlur: PropTypes.func,
        /**
         * Función que se dispara al poner el ratón sobre el componente.
         */
        funcionOnHover: PropTypes.func,
        /**
         * Tipos de archivo aceptados (ej: '.pdf,.doc,.docx')
         */
        tiposAceptados: PropTypes.string,
        /**
         * Tamaño máximo de archivo en bytes
         */
        tamañoMaximo: PropTypes.number,
        /**
         * Permite la subida de múltiples ficheros (por defecto solo permite uno)
         */
        multiple: PropTypes.bool
    };

    static defaultProps = {
        valor: undefined,
        desactivado: false,
        obligatorio: false,
        claseCss: "",
        tiposAceptados: "*",
        tamañoMaximo: 10485760, // 10MB por defecto
        multiple: false,
        funcionOnChange: () => {
            return;
        }
    };

    constructor(props) {
        super(props);

        this.hayCambios = false;

        this.inputFichero = React.createRef();
        this.selectOculto = React.createRef();
        this.dropZone = React.createRef();

        this.state = {
            subiendo: false,
            arrastrando: false,
            error: null
        };
    }

    funcionOnClickBoton = () => {
        this.inputFichero.current.click();
    };

    funcionFicheroSubido = evt => {
        const ficheros = evt.target.files;
        this.procesarFicheros(ficheros);
    };

    procesarFicheros = ficheros => {
        if (!ficheros || ficheros.length === 0) {
            return;
        }

        // Si no es múltiple, validar que no haya más de uno
        if (!this.props.multiple && ficheros.length > 1) {
            this.setState({
                error: "Solo se permite subir un archivo a la vez",
                subiendo: false
            });
            return;
        }

        // Si no es múltiple y ya hay uno, reemplazarlo
        if (!this.props.multiple && this.props.valor && this.props.valor.length > 0) {
            // Primero eliminar el fichero existente
            this.funcionBorrar(0);
        }

        this.setState({ subiendo: true, error: null });
        this.hayCambios = true;

        for (let index in ficheros) {
            let indice = parseInt(index);
            const fichero = ficheros[indice];

            // Validar tamaño
            if (fichero.size > this.props.tamañoMaximo) {
                this.setState({
                    error: `El fichero ${fichero.name} supera el tamaño máximo permitido`,
                    subiendo: false
                });
                continue;
            }

            this.funcionLeerFichero(fichero);

            // Si no es múltiple, solo procesar el primero
            if (!this.props.multiple) {
                break;
            }
        }
    };

    funcionLeerFichero = fichero => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.props.funcionOnChange(reader.result, this.props.campo, null, fichero.name, fichero.type);
            this.setState({ subiendo: false });
        };

        try {
            if (fichero.type === "text/csv" || fichero.type === "application/vnd.ms-excel" || fichero.name.includes(".csv")) {
                reader.readAsText(fichero);
            } else {
                reader.readAsDataURL(fichero);
            }
        } catch (excp) {
            this.setState({
                error: `Error al leer el fichero ${fichero.name}`,
                subiendo: false
            });
        }
    };

    funcionBorrar = indice => {
        this.hayCambios = true;
        this.props.funcionOnChange(null, this.props.campo, indice);
        this.selectOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
    };

    // Funciones para Drag & Drop
    funcionOnDragOver = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this.props.desactivado) {
            this.setState({ arrastrando: true });
        }
    };

    funcionOnDragEnter = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this.props.desactivado) {
            this.setState({ arrastrando: true });
        }
    };

    funcionOnDragLeave = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        this.setState({ arrastrando: false });
    };

    funcionOnDrop = evt => {
        evt.preventDefault();
        evt.stopPropagation();
        this.setState({ arrastrando: false });

        if (this.props.desactivado) {
            return;
        }

        const ficheros = evt.dataTransfer.files;
        this.procesarFicheros(ficheros);
    };

    obtenerIconoFichero = nombreFichero => {
        if (!nombreFichero) return "insert_drive_file";

        const nombre = nombreFichero.toLowerCase();

        if (nombre.includes(".pdf")) return "picture_as_pdf";
        if (nombre.includes(".doc")) return "description";
        if (nombre.includes(".xls")) return "table_chart";
        if (
            nombre.includes(".jpg") ||
            nombre.includes(".jpeg") ||
            nombre.includes(".png") ||
            nombre.includes(".gif") ||
            nombre.includes(".bmp") ||
            nombre.includes(".svg")
        )
            return "image";
        if (nombre.includes(".zip") || nombre.includes(".rar")) return "folder_zip";
        if (nombre.includes(".txt")) return "article";

        return "insert_drive_file";
    };

    formatearTamaño = bytes => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    };

    funcionDescargar = indice => {
        const fichero = this.props.valor[indice];
        if (!fichero || !fichero.contenido || !fichero.nombre) {
            return;
        }

        try {
            // Crear un enlace temporal para descargar
            const link = document.createElement("a");
            link.href = fichero.contenido;
            link.download = fichero.nombre;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
        }
    };

    render() {
        let lista = [];

        for (let indice in this.props.valor) {
            let fichero = this.props.valor[indice];

            lista.push(
                <div key={indice} className={estilos.contenidoFichero}>
                    <span className={`material-icons ${estilos.iconoFichero}`}>{this.obtenerIconoFichero(fichero.nombre)}</span>
                    <span className={estilos.nombreFichero}>{fichero.nombre}</span>
                    <div className={estilos.botonesAccion}>
                        <EleBoton
                            claseCss={estilos.botonDescargar}
                            primario={false}
                            icono="download"
                            tipo="button"
                            apariencia="text"
                            tooltip="Descargar"
                            funcionOnClick={this.funcionDescargar.bind(this, indice)}
                        />
                        {!this.props.obligatorio && this.props.valor && this.props.valor.length > 0 && (
                            <EleBoton
                                claseCss={estilos.botonBorrar}
                                desactivado={this.props.desactivado}
                                primario
                                icono="delete"
                                tipo="button"
                                apariencia="text"
                                tooltip="Eliminar"
                                funcionOnClick={this.funcionBorrar.bind(this, indice)}
                            />
                        )}
                    </div>
                </div>
            );
        }

        const claseDropZone = `${estilos.dropZone} ${this.state.arrastrando ? estilos.arrastrando : ""} ${this.props.desactivado ? estilos.desactivado : ""}`;

        return (
            <div className={estilos.contenedorEntradaFichero}>
                {this.state.subiendo === true && (
                    <div className={estilos.cargando}>
                        <CircularProgress />
                    </div>
                )}

                <div
                    ref={this.dropZone}
                    className={claseDropZone}
                    onDragOver={this.funcionOnDragOver}
                    onDragEnter={this.funcionOnDragEnter}
                    onDragLeave={this.funcionOnDragLeave}
                    onDrop={this.funcionOnDrop}
                >
                    <div className={estilos.contenidoDropZone}>
                        <span className={`material-icons ${estilos.iconoUpload}`}>cloud_upload</span>
                        <p className={estilos.textoDropZone}>{this.props.multiple ? "Arrastra los archivos aquí o" : "Arrastra el archivo aquí o"}</p>
                        <EleBoton
                            claseCss={estilos.botonSeleccionar}
                            desactivado={this.props.desactivado}
                            primario
                            apariencia="contained"
                            icono="folder_open"
                            texto={this.props.textoBoton || (this.props.multiple ? "Seleccionar archivos" : "Seleccionar archivo")}
                            funcionOnClick={this.funcionOnClickBoton}
                        />
                        <p className={estilos.infoFormato}>Tamaño máximo: {this.formatearTamaño(this.props.tamañoMaximo)}</p>
                    </div>
                </div>

                {this.state.error && (
                    <div className={estilos.mensajeError}>
                        <span className="material-icons">error</span>
                        {this.state.error}
                    </div>
                )}

                {lista.length > 0 && (
                    <div className={estilos.contenedorFicheros}>
                        <h4 className={estilos.tituloArchivos}>{this.props.multiple ? "Archivos seleccionados:" : "Archivo seleccionado:"}</h4>
                        {lista}
                    </div>
                )}

                <select hidden ref={this.selectOculto} className={estilos.entradaFichero} />

                <input
                    ref={this.inputFichero}
                    type="file"
                    name={this.props.campo}
                    disabled={this.props.desactivado}
                    multiple={this.props.multiple ? "multiple" : undefined}
                    accept={this.props.tiposAceptados}
                    className={this.props.claseCss + " " + estilos.entradaFichero}
                    required={this.props.obligatorio && this.hayCambios}
                    onFocus={this.props.funcionOnFocus}
                    onBlur={this.props.funcionOnBlur}
                    onMouseOver={this.props.funcionOnHover}
                    onChange={this.funcionFicheroSubido}
                />
            </div>
        );
    }
}

export default CompEntradaFicheroDragDrop;
