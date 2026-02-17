import React from "react";
import PropTypes from "prop-types";
import estilos from "./CompEntradaFirma.module.css";
import EleBoton from "../../elementos/botones/EleBoton";

/**
 * Componente que permite capturar firmas mediante un canvas
 * 
 * @version 0.1
 */
class CompEntradaFirma extends React.PureComponent {
    static propTypes = {
        /**
         * Valor de la firma capturada (base64)
         */
        valor: PropTypes.string,
        /**
         * Título que se muestra sobre el componente
         */
        titulo: PropTypes.string,
        /**
         * Función que se ejecuta cuando se captura una nueva firma
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
        this.canvasRef = React.createRef();
        this.state = {
            firmando: false,
            dibujando: false
        };
    }

    componentDidMount() {
        this.inicializarCanvas();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.firmando !== prevState.firmando && this.state.firmando) {
            this.inicializarCanvas();
        }
    }

    inicializarCanvas = () => {
        if (!this.canvasRef.current) return;

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Configurar el canvas para una mejor calidad en dispositivos de alta resolución
        const { width, height } = canvas.getBoundingClientRect();
        const scale = window.devicePixelRatio;
        canvas.width = width * scale;
        canvas.height = height * scale;
        ctx.scale(scale, scale);
        
        // Establecer estilo de línea
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Limpiar canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
    };

    iniciarDibujo = (e) => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        
        this.setState({ dibujando: true });
        
        // Obtener coordenadas del mouse o touch
        const x = (e.clientX - rect.left) * scale;
        const y = (e.clientY - rect.top) * scale;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    dibujar = (e) => {
        if (!this.state.dibujando) return;
        
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        
        // Obtener coordenadas del mouse o touch
        const x = (e.clientX - rect.left) * scale;
        const y = (e.clientY - rect.top) * scale;
        
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    terminarDibujo = () => {
        this.setState({ dibujando: false });
    };

    limpiarFirma = () => {
        if (!this.canvasRef.current) return;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    guardarFirma = () => {
        if (!this.canvasRef.current) return;
        
        const canvas = this.canvasRef.current;
        canvas.toBlob(
            blob => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.props.funcionOnChange(reader.result, this.props.nombre, blob);
                    this.setState({ firmando: false });
                };
                reader.readAsDataURL(blob);
            },
            'image/png'
        );
    };

    render() {
        return (
            <div className={estilos.contenedorFirma}>
                <h6>{this.props.titulo}</h6>
                {this.state.firmando ? (
                    <>
                        <div className={estilos.contenedorCanvas}>
                            <canvas
                                ref={this.canvasRef}
                                className={estilos.canvas}
                                onMouseDown={this.iniciarDibujo}
                                onMouseMove={this.dibujar}
                                onMouseUp={this.terminarDibujo}
                                onMouseLeave={this.terminarDibujo}
                            />
                        </div>
                        <div className={estilos.contenedorBotones}>
                            <EleBoton
                                apariencia="contained"
                                claseCss={estilos.botonAccion}
                                primario
                                tipo="button"
                                funcionOnClick={this.guardarFirma}
                                texto={this.props.traduccion("guardar")}
                                desactivado={false}
                            />
                            <EleBoton
                                apariencia="contained"
                                claseCss={estilos.botonAccion}
                                tipo="button"
                                funcionOnClick={this.limpiarFirma}
                                texto={this.props.traduccion("limpiar")}
                                desactivado={false}
                            />
                            <EleBoton
                                apariencia="contained"
                                claseCss={estilos.botonAccion}
                                tipo="button"
                                funcionOnClick={() => this.setState({ firmando: false })}
                                texto={this.props.traduccion("cancelar")}
                                desactivado={false}
                            />
                        </div>
                    </>
                ) : (
                    <div className={estilos.contenedorPreview}>
                        {this.props.valor ? (
                            <img
                                src={this.props.valor}
                                alt="Firma capturada"
                                className={estilos.preview}
                            />
                        ) : (
                            <div className={estilos.contenedorBotonInicial}>
                                <EleBoton
                                    apariencia="contained"
                                    claseCss={estilos.botonAccion}
                                    primario
                                    tipo="button"
                                    funcionOnClick={() => this.setState({ firmando: true })}
                                    texto={this.props.traduccion("firmar")}
                                    desactivado={false}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default CompEntradaFirma; 