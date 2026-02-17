import React from 'react';
import { Link } from '@mui/material';
import PropTypes from 'prop-types';
import EleBotonImagen from '../../../../elementos/botones/EleBotonImagen';
import { withNamespaces } from 'react-i18next';

class CompColumnaArchivo extends React.PureComponent {

    static propTypes = {
        value: PropTypes.string,
        iconoArchivo : PropTypes.string,
        iconoEnviar : PropTypes.string,
        puntoFinal :  PropTypes.string,
        enviar :  PropTypes.bool
    };

    funcionOnClick = evento => {
        evento.stopPropagation();
        this.props.column.function(this.props.row, this.props.value);
    };
       
    render() {
        let documento = this.props.value;

        if (!documento) {
            return null;
        }
        
        return (
            <React.Fragment>
                {<link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
                    integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
                    crossOrigin="anonymous"
                />}
                <Link
                    target='_blank' color="textPrimary" href={documento}>{
                        <EleBotonImagen
                            primario
                            fuente="small"
                            icono = {this.props.column.iconoArchivo}
                            tooltip={this.props.t("download")}
                            placement = "right-start"
                        ></EleBotonImagen>} 
                </Link>
                {this.props.column.enviar? 
                    <EleBotonImagen
                        primario
                        fuente="small"
                        icono = {this.props.column.iconoEnviar}
                        funcionOnClick = {this.funcionOnClick}
                        tooltip={this.props.t("send")}
                        placement = "right-start"
                    ></EleBotonImagen>
                    : false
                }
            </React.Fragment>
        );
    }
}

export default withNamespaces()(CompColumnaArchivo);
