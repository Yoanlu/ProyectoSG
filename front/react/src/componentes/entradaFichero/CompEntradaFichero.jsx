import React from 'react';
import PropTypes from 'prop-types';

import estilos from './CompEntradaFichero.module.css';
import CompEntrada from '../../componentes/entrada/CompEntrada';
import EleBotonImagen from '../../elementos/botones/EleBotonImagen';
import { withNamespaces } from 'react-i18next';

/**
 * Componente que va a permitir la entrada de ficheros externos.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompEntradaFichero extends React.PureComponent {
    static propTypes = {
        /**
         * Nombre asociado el componente. Valor Requerido.
         */
        nombre: PropTypes.string.isRequired,
        /**
         * Nombre del campo.
        */
        etiqueta: PropTypes.string,
        /**
         * Valor en base 64 del fichero.
         */
        valor: PropTypes.string,
        /**
         * Nombre del fichero.
         */
        nombreFichero: PropTypes.string,
        /**
         * Desactiva o activa el componente.
         */
        desactivado: PropTypes.bool,
        /**
         * Muestra el mensaje de la autovalidación.
         */
        mensajeValidacion: PropTypes.string,
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
        funcionOnChange: PropTypes.func
    };

    static defaultProps = {
        valor: undefined,
        desactivado: false,
        obligatorio: false,
        claseCss: '',
        funcionOnChange: () => {
            return;
        }
    };

    constructor(props) {
        super(props);

        this.inputFichero = React.createRef();
        this.inputOculto = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.props.valor && prevProps.valor) {
            this.inputFichero.current.value = '';
        }
    }

    funcionOnClickBoton = () => {
        this.inputFichero.current.click();
    };

    funcionFicheroSubido = evt => {
        let fichero = evt.target.files[0];
        if (!fichero) {
            return;
        }

        let nombreFichero = fichero.name;
        let reader = new FileReader();
        reader.onloadend = () => {
            this.props.funcionOnChange(reader.result, this.props.nombre, nombreFichero, fichero.type);
        };

        try {
            if (
                fichero.type === 'text/csv' ||
                fichero.type === 'application/vnd.ms-excel' ||
                fichero.name.includes('.csv')
            ) {
                reader.readAsText(fichero);
            } else {
                reader.readAsDataURL(fichero);
            }
        } catch (excp) {}
    };

    funcionBorrar = () => {
        this.props.funcionOnChange(null, this.props.nombre, null);
        this.inputOculto.current.dispatchEvent(new Event('change', { bubbles: true }));
    };

    nombreIconoDescarga = () => {
        let nombreFichero = this.props.nombreFichero || '';
        nombreFichero = nombreFichero.toLowerCase();

        if (nombreFichero.includes('.pdf')) {
            return 'picture_as_pdf';
        } else if (nombreFichero.includes('.doc')) {
            return 'description';
        } else if (nombreFichero.includes('.xls')) {
            return 'description';
        } else if (nombreFichero.includes('.gif')) {
            return 'gif';
        } else if (nombreFichero.includes('.jpg')) {
            return 'image';
        } else if (nombreFichero.includes('.jpeg')) {
            return 'image';
        } else if (nombreFichero.includes('.png')) {
            return 'image';
        } else if (nombreFichero.includes('.bmp')) {
            return 'image';
        } else if (nombreFichero.includes('.tif')) {
            return 'image';
        } else if (nombreFichero.includes('.svg')) {
            return 'image';
        }

        return 'insert_drive_file';
    };

    colorIconoDescarga = () => {
        let nombreFichero = this.props.nombreFichero || '';
        nombreFichero = nombreFichero.toLowerCase();

        if (nombreFichero.includes('.pdf')) {
            return estilos.colorPdf;
        } else if (nombreFichero.includes('.xls')) {
            return estilos.colorExcel;
        } else if (nombreFichero.includes('.doc')) {
            return estilos.colorWord;
        }

        return '';
    };

    render() {
        return (
            <div className={estilos.contenedorEntradaFichero}>
                <CompEntrada
                    desactivado={this.props.desactivado}
                    claseCss={this.props.claseCss}
                    obligatorio={this.props.obligatorio}
                    etiqueta={this.props.etiqueta || this.props.nombre}
                    tipoEntrada="EntradaTexto"
                    valor={this.props.nombreFichero || ''}
                    mensajeValidacion={this.props.mensajeValidacion}
                    adornoIzquierdo={
                        this.props.valor ? (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={this.props.valor}
                                download={this.props.nombreFichero || this.props.nombre}
                                className={estilos.enlace}
                            >
                                <EleBotonImagen
                                    claseCss={estilos.boton + ' fichero ' + this.colorIconoDescarga()}
                                    icono={this.nombreIconoDescarga()}
                                    tooltip={this.props.t('download')}
                                />
                            </a>
                        ) : this.props.desactivado ? (
                            undefined
                        ) : (
                            <EleBotonImagen
                                claseCss={estilos.boton}
                                icono="file_upload"
                                tooltip={this.props.t('upload')}
                                funcionOnClick={this.funcionOnClickBoton}
                            />
                        )
                    }
                    adornoDerecho={
                        this.props.valor && !this.props.desactivado ? (
                            <EleBotonImagen
                                claseCss={estilos.boton}
                                icono="delete"
                                tooltip={this.props.t('delete')}
                                funcionOnClick={this.funcionBorrar}
                            />
                        ) : null
                    }
                />

                <select hidden ref={this.inputOculto} className={estilos.entradaFichero} />

                <input
                    hidden
                    ref={this.inputFichero}
                    type="file"
                    name={this.props.nombre}
                    className={estilos.entradaFichero}
                    disabled={this.props.desactivado}
                    required={this.props.obligatorio}
                    onChange={this.funcionFicheroSubido}
                />
            </div>
        );
    }
}

export default withNamespaces()(CompEntradaFichero);
