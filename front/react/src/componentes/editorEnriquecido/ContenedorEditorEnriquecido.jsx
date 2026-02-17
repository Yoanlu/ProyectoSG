import React from "react";
import PropTypes from "prop-types";
import JoditReact from "jodit-react-ts";

// import "jodit/build/jodit.min.css";
import "./jodit-2015.min.css";

import { recogerIdioma } from "../Utilidades";
import { withNamespaces } from "react-i18next";
import { withTheme } from "@mui/styles";

/**
 * Componente editor de texto enriquecido.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class ContenedorEditorEnriquecido extends React.PureComponent {
    static propTypes = {
        /**
         * Valor HTML inicial del editor.
         */
        valorInicial: PropTypes.string,
        /**
         * Nombre del elemento.
         */
        nombre: PropTypes.string,
        /**
         * Función que recibe el html del editor.
         */
        funcionOnChange: PropTypes.func,
        /**
         * Url del css que se quiere agregar (para previsualización del html)
         */
        hoja_estilos: PropTypes.string
    };

    static defaultProps = {
        valorInicial: "",
        funcionOnChange: () => {}
    };

    constructor(props) {
        super(props);

        this.valorInicial = this.props.valorInicial;
        this.selectOculto = React.createRef();
        let tokenAcceso = window.localStorage.getItem("access_token");

        let defaultUploader = this.props.dameUrl
            ? {
                  url: this.props.dameUrl,
                  prepareData: function(data) {
                      data.append("token_auth", tokenAcceso);
                      return data;
                  }
              }
            : {
                  insertImageAsBase64URI: true
              };

        this.configuracion = {
            uploader: defaultUploader,
            maxHeight: 500,
            allowResizeY: true,
            enter: "BR",
            language: recogerIdioma(props.lng),
            theme: props.theme.palette.mode === "dark" ? "dark" : "default",
            toolbarAdaptive: false,
            readonly: false,
            buttons:
                "bold,strikethrough,underline,italic,|,ul,ol,|,outdent,indent,|,font,brush,paragraph,|,image,file,video,table,link,|,align,undo,redo,\n,cut,hr,eraser,copyformat,|,selectall,print,source"
        };

        // se quita ,fontsize, por problemas en producción
    }

    funcionOnChange = nuevoValor => {
        this.props.funcionOnChange(nuevoValor, this.props.nombre);
        this.selectOculto.current.dispatchEvent(new Event("change", { bubbles: true }));
    };

    render() {
        return (
            <>
                {this.props.hoja_estilos ? <link rel="stylesheet" type="text/css" href={this.props.hoja_estilos} media="screen" /> : undefined}
                <JoditReact
                    config={this.configuracion}
                    onChange={this.funcionOnChange}
                    defaultValue={this.valorInicial}
                />
                <select hidden ref={this.selectOculto} />
            </>
        );
    }
}

export default withNamespaces()(withTheme(ContenedorEditorEnriquecido));
