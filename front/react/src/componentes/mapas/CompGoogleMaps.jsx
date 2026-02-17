/*global google*/
import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompGoogleMaps.module.css";

import { GoogleMap, StandaloneSearchBox, Marker, LoadScript } from "@react-google-maps/api";

import CompMarcaMapa from "./CompMarcaMapa";

/**
 * Componente donde se visualiza un mapa terrestre de Google.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompGoogleMaps extends React.Component {
    static propTypes = {
        marcas: PropTypes.array
    };

    entradaBusqueda = null;

    state = {
        currentLocation: {
            lat: this.props.longitud ? parseFloat(this.props.latitud) : 0,
            lng: this.props.latitud ? parseFloat(this.props.longitud) : 0
        },
        zoom: 15,
        markers: [],
        bounds: null
    };

    libs = ["geometry", "drawing", "places", "visualization"];

    onMapLoad = map => {
        // Por defecto debe ubicarse en nuestra localizacion
        if (!this.props.longitud && !this.props.latitud) {
            let ubicacionUsuario = false;
            navigator?.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
                let pos = { lat, lng };
                ubicacionUsuario = true;
                this.setState({
                    currentLocation: pos,
                    zoom: 15
                });
            });

            if (!ubicacionUsuario) {
                let pos = { lat: 40.418888888889, lng: -3.6919444444444 };
                this.setState({
                    currentLocation: pos,
                    zoom: 15
                });
            }
        }

        google.maps.event.addListener(map, "bounds_changed", () => {
            try {
                this.setState({ bounds: map.getBounds() });
            } catch (error) {}
        });
    };

    onSBLoad = ref => {
        this.searchBox = ref;
    };

    onPlacesChanged = () => {
        let results = this.searchBox.getPlaces();
        let lugar;
        for (let i = 0; i < 1; i++) {
            let place = results[i].geometry.location;

            lugar = {
                lat: place.lat(),
                lng: place.lng()
            };

            this.setState({
                currentLocation: lugar,
                zoom: 15
            });
        }

        this.props.nuevaUbicacion(lugar.lat, lugar.lng);
    };

    clickMapa = ({ latLng, pixel, qa, wa }) => {
        let latitud = latLng.lat();
        let longitud = latLng.lng();

        this.props.nuevaUbicacion(latitud, longitud);
    };

    generarMarcas = (marca, indice) => <CompMarcaMapa key={indice} {...marca} />;

    moverMarca = ({ lat, lng }) => {
        let latitud = lat();
        let longitud = lng();

        this.props.nuevaUbicacion(latitud, longitud);
    };

    cambiaDireccion = () => {
        let focoActual = document.activeElement;
        this.entradaBusqueda.focus();
        this.entradaBusqueda.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 13 }));
        focoActual.focus();
    };

    componentDidUpdate(oldProps) {
        if (this.props.direccion !== oldProps.direccion && this.entradaBusqueda) {
            this.entradaBusqueda.disabled = false;
            this.cambiaDireccion();
            this.entradaBusqueda.disabled = true;
        }
    }

    entradaBusquedaMontada = ref => {
        this.entradaBusqueda = ref;
    };

    render() {
        return (
            <fieldset className={estilos.fieldset}>
                <LoadScript googleMapsApiKey={this.props.googleMapKey} libraries={this.libs}>
                    <div id="searchbox" className={estilos.searchbox}>
                        <StandaloneSearchBox onLoad={this.onSBLoad} onPlacesChanged={this.onPlacesChanged} bounds={this.state.bounds}>
                            <input
                                ref={this.entradaBusquedaMontada}
                                disabled
                                type="text"
                                className={estilos.busquedaMapa}
                                value={this.props.direccion}
                                onChange={this.cambiaDireccion}
                            />
                        </StandaloneSearchBox>
                    </div>

                    <div className={estilos.contenedorgmap}>
                        <GoogleMap center={this.state.currentLocation} zoom={this.state.zoom} onClick={this.clickMapa} onLoad={map => this.onMapLoad(map)}>
                            {this.props.marcas ? this.props.marcas.map(this.generarMarcas) : undefined}

                            {this.props.latitud && this.props.longitud ? (
                                <CompMarcaMapa
                                    movil={true}
                                    ubicacion={{
                                        lat: parseFloat(this.props.latitud),
                                        lng: parseFloat(this.props.longitud)
                                    }}
                                    moverMarca={this.moverMarca}
                                />
                            ) : (
                                undefined
                            )}
                        </GoogleMap>
                    </div>
                </LoadScript>
            </fieldset>
        );
    }
}

export default CompGoogleMaps;
