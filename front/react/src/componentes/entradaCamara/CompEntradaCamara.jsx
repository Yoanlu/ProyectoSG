import React from "react";
import PropTypes from "prop-types";
import estilos from "./CompEntradaCamara.module.css";
import EleBoton from "../../elementos/botones/EleBoton";

/**
 * Componente que permite capturar imágenes usando la cámara del dispositivo
 * 
 * @version 0.1
 */
class CompEntradaCamara extends React.PureComponent {
    static propTypes = {
        /**
         * Valor de la imagen capturada
         */
        valor: PropTypes.string,
        /**
         * Título que se muestra sobre el componente
         */
        titulo: PropTypes.string,
        /**
         * Función que se ejecuta cuando se captura una nueva imagen
         */
        funcionOnChange: PropTypes.func.isRequired,
        /**
         * Función que traduce textos
         */
        traduccion: PropTypes.func.isRequired,
        /**
         * Nombre del campo
         */
        nombre: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.stream = null;
        
        this.state = {
            mostrarCamara: false,
            mostrarModal: false,
            fotoTemporal: null
        };
    }

    componentWillUnmount() {
        this.detenerCamara();
    }

    detenerCamara = () => {
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            });
            this.stream = null;
        }
        if (this.videoRef.current) {
            this.videoRef.current.srcObject = null;
        }
    };

    iniciarCamara = async () => {
        try {
            await new Promise(resolve => this.setState({ 
                mostrarModal: true,
                mostrarCamara: true 
            }, resolve));

            await new Promise(resolve => setTimeout(resolve, 100));

            if (!this.videoRef.current) {
                console.error("Referencia de video no encontrada después de montar");
                return;
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });

            this.stream = stream;

            if (this.videoRef.current) {
                this.videoRef.current.srcObject = stream;
                await new Promise(resolve => {
                    this.videoRef.current.onloadedmetadata = () => {
                        this.videoRef.current
                            .play()
                            .then(resolve)
                            .catch(err => {
                                console.error("Error reproduciendo video:", err);
                                resolve();
                            });
                    };
                });
            }
        } catch (err) {
            console.error("Error accediendo a la cámara:", err);
            this.setState({ 
                mostrarCamara: false,
                mostrarModal: false
            });
        }
    };

    capturarFoto = () => {
        if (this.videoRef.current) {
            const canvas = document.createElement("canvas");
            const video = this.videoRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(
                blob => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        this.setState({ 
                            mostrarModal: true, 
                            fotoTemporal: reader.result,
                            blobTemporal: blob
                        });
                    };
                    reader.readAsDataURL(blob);
                },
                "image/jpeg",
                0.95
            );
        }
    };

    confirmarFoto = () => {
        if (this.state.fotoTemporal) {
            this.props.funcionOnChange(this.state.fotoTemporal, this.props.nombre, this.state.blobTemporal);
            this.setState({ 
                mostrarCamara: false, 
                mostrarModal: false,
                fotoTemporal: null,
                blobTemporal: null
            });
            this.detenerCamara();
        }
    };

    cancelarCaptura = () => {
        this.setState({ 
            mostrarModal: false,
            fotoTemporal: null,
            blobTemporal: null
        });
    };

    borrarImagen = () => {
        this.props.funcionOnChange("", this.props.nombre, null);
        this.setState({ mostrarModal: false });
    };

    cancelarCamara = () => {
        this.setState({ 
            mostrarCamara: false,
            mostrarModal: false
        });
        this.detenerCamara();
    };

    render() {
        return (
            <div className={estilos.contenedorCamara}>
                <h6 className={estilos.tituloCompacto}>{this.props.titulo}</h6>
                {!this.state.mostrarModal && (
                    <div className={estilos.contenedorPreview}>
                        {this.props.valor ? (
                            <>
                                <img
                                    src={this.props.valor}
                                    alt="Imagen capturada"
                                    className={estilos.preview}
                                    onClick={() => this.setState({ mostrarModal: true })}
                                    style={{ cursor: 'pointer' }}
                                />
                            </>
                        ) : (
                            <div className={estilos.contenedorBotonInicial}>
                                <EleBoton
                                    apariencia="contained"
                                    claseCss={estilos.botonAccion}
                                    primario
                                    tipo="button"
                                    funcionOnClick={this.iniciarCamara}
                                    texto={this.props.traduccion("tomar_foto")}
                                    desactivado={false}
                                />
                            </div>
                        )}
                    </div>
                )}

                {this.state.mostrarModal && (
                    <div className={estilos.modal}>
                        <div className={estilos.modalContenido}>
                            {this.state.mostrarCamara && !this.state.fotoTemporal ? (
                                <>
                                    <div className={`${estilos.contenedorVideo} ${estilos.videoModal}`}>
                                        <video
                                            ref={this.videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className={estilos.video}
                                        />
                                    </div>
                                    <div className={estilos.contenedorBotones}>
                                        <EleBoton
                                            apariencia="contained"
                                            claseCss={estilos.botonAccion}
                                            primario
                                            tipo="button"
                                            funcionOnClick={this.capturarFoto}
                                            texto={this.props.traduccion("capturar")}
                                            desactivado={false}
                                        />
                                        <EleBoton
                                            apariencia="contained"
                                            claseCss={estilos.botonAccion}
                                            tipo="button"
                                            funcionOnClick={this.cancelarCamara}
                                            texto={this.props.traduccion("cancelar")}
                                            desactivado={false}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <img
                                        src={this.state.fotoTemporal || this.props.valor}
                                        alt="Imagen capturada"
                                        className={estilos.imagenModal}
                                    />
                                    <div className={estilos.contenedorBotones}>
                                        {this.state.fotoTemporal ? (
                                            <>
                                                <EleBoton
                                                    apariencia="contained"
                                                    claseCss={estilos.botonAccion}
                                                    primario
                                                    tipo="button"
                                                    funcionOnClick={this.confirmarFoto}
                                                    texto={this.props.traduccion("confirmar")}
                                                    desactivado={false}
                                                />
                                                <EleBoton
                                                    apariencia="contained"
                                                    claseCss={estilos.botonAccion}
                                                    tipo="button"
                                                    funcionOnClick={this.cancelarCaptura}
                                                    texto={this.props.traduccion("cancelar")}
                                                    desactivado={false}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <EleBoton
                                                    apariencia="contained"
                                                    claseCss={estilos.botonAccion}
                                                    tipo="button"
                                                    funcionOnClick={this.borrarImagen}
                                                    texto={this.props.traduccion("delete")}
                                                    desactivado={false}
                                                />
                                                <EleBoton
                                                    apariencia="contained"
                                                    claseCss={estilos.botonAccion}
                                                    tipo="button"
                                                    funcionOnClick={() => this.setState({ mostrarModal: false })}
                                                    texto={this.props.traduccion("close")}
                                                    desactivado={false}
                                                />
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default CompEntradaCamara; 