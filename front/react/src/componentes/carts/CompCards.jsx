import React from "react";
import PropTypes from "prop-types";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { clockClasses } from "@mui/x-date-pickers";

/**
 * Componente que va a permitir la entrada de Imagenes externas.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompCards extends React.PureComponent {
    static propTypes = {
        titulo: PropTypes.string, // Título de la tarjeta
        descripcion: PropTypes.string, // Descripción del contenido
        imagen: PropTypes.string, // URL de la imagen
        textoAlternativo: PropTypes.string, // Texto alternativo para accesibilidad
        claseCssCartContenedor:PropTypes.string,
        claseCssCartContenido: PropTypes.string,
        claseCssCartTitulo:PropTypes.string,
        claseCssCartDescripcion:PropTypes.string,
        claseCssCartBotones:PropTypes.string,
        botonAccionVisible: PropTypes.bool,// Visible el boton de acciones 
        botonLeerMasVisible: PropTypes.bool,
        textoBotonAccion: PropTypes.string,// Texto del botón que realiza la acción
        textoBotonLeerMas:PropTypes.string,// Texto del botón de leer Más
        funcionBotonAccion: PropTypes.func, // Función para el botón "Share"
        funcionLeerMasClick: PropTypes.func // Función para el botón "Learn More"

    };

    static defaultProps = {
        title: "Default Title",
        description: "Default description",
        image: "https://i0.wp.com/4dreams.es/wp-content/uploads/sello-4d.png?resize=110%2C108&ssl=1",
        altText: "Image description",
        botonAccionVisible: false,// Visible el boton de acciones 
        botonLeerMasVisible: false,
        onShareClick: () => alert("Share button clicked!"),
        onLearnMoreClick: () => alert("Learn More button clicked!")
        
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className={this.props.claseCssCartContenedor}>
                {this.props.imagen ? (
                    <CardMedia
                        component="img"
                        alt={this.props.textoAlternativo}
                        height="140"
                        image={this.props.imagen}
                        src={this.props.imagen}
                    />
                ):undefined}
                <CardContent className={this.props.claseCssCartContenido}>
                    <Typography gutterBottom variant="h5" component="div" className={this.props.claseCssCartTitulo} >
                        {this.props.titulo}
                    </Typography>
                    <Typography variant="body2" className={this.props.claseCssCartDescripcion}>
                        {this.props.descripcion}
                    </Typography>
                </CardContent>
                <CardActions className={this.props.claseCssCartBotones} >
                    {this.props.botonAccionVisible ? (
                        <Button size="small" onClick={this.props.funcionBotonAccion}>{this.props.textoBotonAccion}</Button>
                    ): undefined }
                    {this.props.botonLeerMasVisible ? (
                        <Button size="small" onClick={this.props.funcionLeerMasClick}>{this.props.textoBotonLeerMas}</Button>
                    ): undefined } 
                </CardActions>
            </Card>
        );
    }
}

export default CompCards;