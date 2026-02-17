import React from "react";
import { recuperarListaIdiomas, recuperarListaTraducciones, borrarTraduccion, guardarTraduccion } from "./ServicioTraduccion";
import CompIdiomaTraduccion from "./CompIdiomaTraduccion";
import { clonar } from "../Utilidades";
import EleVentanaEmergente from "../../elementos/ventanasEmergentes/EleVentanaEmergente";
import { ProveedorPeticion } from "../ProveedorPeticion";

class CompSeleccionTraduccion extends React.PureComponent {
    static contextType = ProveedorPeticion;

    constructor(props) {
        super(props);

        this.state = {
            traduccionesRecuperadas: false,
            listaPaises: [],
            listaTraducciones: [this.generarFilaNueva()],
            visibleConfirmar: false
        };

        this.traduccionNueva = {};
        this.indiceBorrar = null;
    }

    componentDidMount() {
        this.puntoFinalTraducciones = this.context.puntoFinalTraducciones;
        this.puntoFinalIdiomas = this.context.puntoFinalIdiomas;
        this.peticionServidor = this.context.peticionServidor;

        this.recuperarPaises();
        this.recuperarTraducciones();
    }

    recuperarPaises = async () => {
        let paises = await recuperarListaIdiomas(this.peticionServidor, this.puntoFinalIdiomas);

        if (paises.codigo === 200) {
            this.setState({
                listaPaises: paises.respuesta
            });
        }
    };

    recuperarTraducciones = async () => {
        let traducciones = await recuperarListaTraducciones(
            this.peticionServidor,
            this.props.tabla,
            this.props.columna,
            this.props.idColumna,
            this.puntoFinalTraducciones
        );

        if (traducciones.codigo === 200) {
            let nuevaListaTraducciones = traducciones.respuesta;
            nuevaListaTraducciones.push(this.generarFilaNueva());

            this.setState({
                traduccionesRecuperadas: true,
                listaTraducciones: nuevaListaTraducciones
            });
        }
    };

    filaNueva = () => {
        let nuevasTraducciones = clonar(this.state.listaTraducciones);
        let nuevos = nuevasTraducciones.filter(fila => !fila.idioma && !fila.traduccion);

        if (nuevos.length === 0) {
            nuevasTraducciones.push(this.generarFilaNueva());

            this.setState({
                listaTraducciones: nuevasTraducciones
            });
        } else if (nuevos.length > 1) {
            for (let i = 1; i < nuevos.length; i++) {
                let fila = nuevasTraducciones.indexOf(nuevos[i]);
                delete nuevasTraducciones[fila];
            }

            this.setState({
                listaTraducciones: nuevasTraducciones
            });
        }
    };

    generarFilaNueva = () => {
        return {
            tabla: this.props.tabla,
            columna: this.props.columna,
            columna_id: this.props.idColumna
        };
    };

    cambiaTraduccion = async (nuevosDatos, indice) => {
        let nuevasTraducciones = clonar(this.state.listaTraducciones);

        if (indice === undefined) {
            nuevasTraducciones.push(nuevosDatos);
        } else {
            nuevasTraducciones[indice] = nuevosDatos;
        }

        this.setState(
            {
                listaTraducciones: nuevasTraducciones
            },
            this.filaNueva
        );

        return true;
    };

    funcionGuardar = async indice => {
        let datoAGuardar = this.state.listaTraducciones[indice];
        let respuestaGuardado = await guardarTraduccion(this.peticionServidor, datoAGuardar, this.puntoFinalTraducciones);

        if (!respuestaGuardado.error) {
            let nuevasTraducciones = clonar(this.state.listaTraducciones);
            nuevasTraducciones[indice] = respuestaGuardado.respuesta;

            this.setState({
                listaTraducciones: nuevasTraducciones
            });
            return true;
        }

        return false;
    };

    funcionComprobacionBorrar = async indice => {
        let idTraduccion = this.state.listaTraducciones[indice].id;
        this.indiceBorrar = indice;

        if (idTraduccion) {
            this.funcionAlternaDialogo();
        } else {
            this.funcionBorrar();
        }
    };

    funcionBorrar = async () => {
        let filaTraduccion = this.state.listaTraducciones[this.indiceBorrar];
        if (!filaTraduccion) {
            return;
        }

        if (filaTraduccion.id) {
            let respuestaBorrado = await borrarTraduccion(this.peticionServidor, filaTraduccion.id, this.puntoFinalTraducciones);

            if (respuestaBorrado.error) {
                return;
            }
        }

        let nuevasTraducciones = clonar(this.state.listaTraducciones);
        delete nuevasTraducciones[this.indiceBorrar];

        this.setState(
            {
                listaTraducciones: nuevasTraducciones,
                visibleConfirmar: false
            },
            this.filaNueva
        );
    };

    funcionAlternaDialogo = () => {
        this.setState({
            visibleConfirmar: !this.state.visibleConfirmar
        });
    };

    render() {
        let ventana = this.state.listaTraducciones.map((traduccion, indice) => (
            <CompIdiomaTraduccion
                desactivado={this.state.traduccionesRecuperadas === false}
                key={indice}
                indice={indice}
                t={this.props.t}
                listaPaises={this.state.listaPaises}
                datoEnEdicion={traduccion}
                cambiaTraduccion={this.cambiaTraduccion}
                funcionGuardar={this.funcionGuardar}
                funcionBorrar={this.funcionComprobacionBorrar}
            />
        ));

        return (
            <React.Fragment>
                {ventana}
                <EleVentanaEmergente
                    sino
                    titulo={this.props.t("delete") + " " + this.props.t("translate")}
                    funcionAceptar={this.funcionBorrar}
                    mostrarError={this.state.visibleConfirmar}
                    mensaje={this.props.t("continue")}
                    funcionCerrarVentana={this.funcionAlternaDialogo}
                />
            </React.Fragment>
        );
    }
}

export default CompSeleccionTraduccion;
