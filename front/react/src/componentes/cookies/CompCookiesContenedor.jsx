import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import { withNamespaces } from "react-i18next";

import "./CompCookiesContenedor.module.css";
import { recogerIdioma } from "../Utilidades";
import { withStyles } from "@mui/styles";

/**
 * Componente contenedor que dota de animación a las cookies.
 *
 * @version 0.2
 * @author [Mario](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompCookiesContenedor extends React.PureComponent {
    static propTypes = {
        claseCSSCookie: PropTypes.string
    };

    static defaultProps = {
        /**
         * Clase css que establece los estilos del componente.
         */
        claseCSSCookie: ""
    };

    constructor(props) {
        super(props);

        this.icono = "warning";
        this.iconoBoton = "close";

        this.idioma = recogerIdioma(this.props.lng);
        this.tema = localStorage.getItem("theme"); //this.props.theme.palette.type;

        document.body.classList.add(this.props.classes.root);
    }

    configurarCookies = () => {
        if (!window.cookieconsent) {
            return;
        }

        window.cookieconsent.run({
            notice_banner_type: "headline", //"simple",
            consent_type: "express",
            change_preferences_selector: "#changePreferences",
            palette: this.tema,
            language: this.idioma,
            website_name: document.location.hostname,
            cookies_policy_url: document.location.origin + "/cookies-policy"
        });
    };

    componentDidMount() {
        this.configurarCookies();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.classes.root !== this.props.classes.root) {
            document.body.classList.remove(prevProps.classes.root);
            document.body.classList.add(this.props.classes.root);
        }
    }

    render() {
        return null;
    }
}

const estiloDiaTematizado = tema => ({
    root: {
        "& .cc_dialog .cc_b_ok": {
            backgroundColor: tema.palette.primary.main + " !important"
        },
        "& .cookie-consent-preferences-overlay button": {
            backgroundColor: tema.palette.primary.main + " !important"
        },
        "& .cookie-consent-preferences-overlay input[type='checkbox']:checked + label::before": {
            backgroundColor: tema.palette.primary.main + " !important"
        }
    }
});

export default withNamespaces()(withRouter(withStyles(estiloDiaTematizado)(CompCookiesContenedor)));
