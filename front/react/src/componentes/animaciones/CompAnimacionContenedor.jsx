import React from 'react';
import PropTypes from 'prop-types';
import CompDelayed from '../CompDelayed';

import estilos from './CompAnimacionContenedor.module.css';

/**
 * Componente que aporta animación al componente que se le pasa como hijo.
 *
 * @version 0.3
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompAnimacionContenedor extends React.PureComponent {
    static propTypes = {
        /**
         * Contenido que se quiere animar. Valor Requerido.
         */
        children: PropTypes.any.isRequired,
        /**
         * Indicador de la visiblidad del componente. Valor Requerido.
         */
        visible: PropTypes.bool.isRequired,
        /**
         * Indica si el contenido permanece o no en el DOM.
         */
        permanente: PropTypes.bool,
        /**
         * Valor que indica la velocidad de la animación.
         */
        velocidad: PropTypes.oneOf(['slower', 'slow', 'fast', 'faster', 'extrafaster', '']),
        /**
         * Valor que indica la velocidad de la animación siendo esta slower, slow , fast , faster.
         */
        animacion: PropTypes.string.isRequired,
        /**
         * Valor que indica la dirección en la que se mueve la animación.
         */
        direccion: PropTypes.string,
        /**
         * Estilos Css que van a afectar al Componente.
         */
        estiloCss: PropTypes.string,
        /**
         * Tiempo de espera para montar el componente.
         */
        esperaMontar: PropTypes.number,
        /**
         *Tiempo de espera para desmontar el componente.
         */
        esperaDesmontar: PropTypes.number
    };

    static defaultProps = {
        velocidad: '',
        direccion: '',
        estiloCss: '',
        permanente: false,
        esperaMontar: 0,
        esperaDesmontar: undefined
    };

    constructor(props) {
        super(props);

        this.state = {
            primeraAnimacion: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.visible !== prevProps.visible && !this.state.primeraAnimacion) {
            this.setState({
                primeraAnimacion: true
            });
        }
    }

    render() {
        let claseAnimacion = this.props.animacion;

        if (this.props.direccion) {
            claseAnimacion += this.props.visible ? 'In' : 'Out';
            claseAnimacion += this.props.direccion;
        }

        let esperaDesmontar = this.props.esperaDesmontar;
        if (esperaDesmontar === undefined) {
            switch (this.props.velocidad) {
                case 'slower':
                    esperaDesmontar = 3000;
                    break;

                case 'slow':
                    esperaDesmontar = 2000;
                    break;

                case 'fast':
                    esperaDesmontar = 800;
                    break;

                case 'faster':
                    esperaDesmontar = 500;
                    break;

                case 'extrafaster':
                    esperaDesmontar = 300;
                    break;

                default:
                    esperaDesmontar = 1000;
                    break;
            }
        }

        let clasesCss = this.props.estiloCss;

        if (this.props.permanente && !this.props.visible) {
            if (!this.state.primeraAnimacion) {
                clasesCss += '' + estilos.invisible;
            } else {
                clasesCss += ' ' + estilos.oculto;
            }
        }

        if (this.state.primeraAnimacion) {
            clasesCss += ' animated ' + this.props.velocidad + ' ' + claseAnimacion;
        }

        let contenido = <div className={clasesCss + ' ' + estilos.componenteAnimado}>{this.props.children}</div>;

        return (
            <React.Fragment>
                {this.props.permanente ? (
                    contenido
                ) : (
                    <CompDelayed mounted={this.props.visible} mountAfter={this.props.esperaMontar} unmountAfter={esperaDesmontar}>
                        {contenido}
                    </CompDelayed>
                )}
            </React.Fragment>
        );
    }
}

export default CompAnimacionContenedor;
