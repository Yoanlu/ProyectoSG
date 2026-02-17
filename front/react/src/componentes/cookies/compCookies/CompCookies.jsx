import React from "react";
import PropTypes from "prop-types";

import estilos from "./CompCookies.module.css";
import { withNamespaces } from "react-i18next";
import EleTitulo from "../../../elementos/titulos/EleTitulo";
import ElePanel from "../../../elementos/paneles/ElePanel";

/**
 * Componente que se va a visualizar para aceptar la política de datos.
 *
 * @version 0.2
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
const CompCookies = ({ t, lng }) => {
    return (
        <div className={estilos.contenedorCookies}>
            <ElePanel claseCss={estilos.panel}>
                <EleTitulo enLinea={true} tipoTitulo="h4" color="primary">
                    <b>Cookies</b>
                </EleTitulo>

                <div className={estilos.bloque}>
                    Cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre
                    otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información
                    que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.. El navegador del usuario memoriza
                    cookies en el disco duro solamente durante la sesión actual ocupando un espacio de memoria mínimo y no perjudicando al ordenador. Las
                    cookies no contienen ninguna clase de información personal específica, y la mayoría de las mismas se borran del disco duro al finalizar la
                    sesión de navegador (las denominadas cookies de sesión).
                </div>
                <div className={estilos.bloque}>
                    La mayoría de los navegadores aceptan como estándar a las cookies y, con independencia de las mismas, permiten o impiden en los ajustes de
                    seguridad las cookies temporales o memorizadas.
                </div>
                <div className={estilos.bloque}>
                    Sin su expreso consentimiento –mediante la activación de las cookies en su navegador–el Propietario no enlazará en las cookies los datos
                    memorizados con sus datos personales proporcionados en el momento del registro o la compra..
                </div>

                <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                    ¿Qué tipos de cookies utiliza esta página web?
                </EleTitulo>

                <div className={estilos.bloque}>
                    <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                        Cookies técnicas:
                    </EleTitulo>
                    Son aquéllas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes
                    opciones o servicios que en ella existan como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder
                    a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la
                    solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la
                    difusión de videos o sonido o compartir contenidos a través de redes sociales.
                </div>
                <div className={estilos.bloque}>
                    <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                        Cookies de personalización:
                    </EleTitulo>
                    Son aquéllas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una
                    serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio,
                    la configuración regional desde donde accede al servicio, etc.
                </div>
                <div className={estilos.bloque}>
                    <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                        Cookies de análisis:
                    </EleTitulo>
                    Son aquéllas que bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y
                    análisis estadístico de la utilización que hacen los usuarios del servicio ofertado. Para ello se analiza su navegación en esta página web
                    con el fin de mejorar la oferta de productos o servicios que le ofrecemos.
                </div>
                <div className={estilos.bloque}>
                    <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                        Cookies publicitarias:
                    </EleTitulo>
                    Son aquéllas que, bien tratadas por nosotros o por terceros, nos permiten gestionar de la forma más eficaz posible la oferta de los espacios
                    publicitarios que hay en la página web, adecuando el contenido del anuncio al contenido del servicio solicitado o al uso que realice de esta
                    página web. Para ello podemos analizar sus hábitos de navegación en Internet y podemos mostrarle publicidad relacionada con su perfil de
                    navegación.
                </div>
                <div className={estilos.bloque}>
                    <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                        Cookies de publicidad comportamental:
                    </EleTitulo>
                    Son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido
                    en una página web, aplicación o plataforma desde la que presta el servicio solicitado. Estas cookies almacenan información del
                    comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un
                    perfil específico para mostrar publicidad en función del mismo.
                </div>
                <div className={estilos.bloque}>
                    <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                        Cookies de terceros:
                    </EleTitulo>
                    El Sitio Web puede utilizar servicios de terceros que, por cuenta del Propietario, recopilaran información con fines estadísticos, de uso
                    del Site por parte del usuario y para la prestacion de otros servicios relacionados con la actividad del Website y otros servicios de
                    Internet.
                </div>
                <div className={estilos.bloque}>
                    <EleTitulo enLinea={true} tipoTitulo="h6" color="primary">
                        GOOGLE ANALYTICS y PIXEL DE FACEBOOK:
                    </EleTitulo>
                    Google Analytics y Pixel son dos herramientas de análisis web que principalmente permite que los propietarios de sitios web conozcan cómo
                    interactúan los usuarios con su sitio web. Para realizar las estadísticas de uso de esta Web utilizamos las cookies con la finalidad de
                    conocer el nivel de recurrencia de nuestros visitantes y los contenidos que resultan más interesantes. De esta manera podemos concentrar
                    nuestros esfuerzos en mejorar las áreas más visitadas y hacer que el usuario encuentre más fácilmente lo que busca. En esta Web puede
                    utilizarse la información de su visita para realizar evaluaciones y cálculos estadísticos sobre datos anónimos, así como para garantizar la
                    continuidad del servicio o para realizar mejoras en sus sitios Web. Para más detalles, consulte en el siguiente enlace la política de
                    privacidad:
                    <a href="https://www.google.com/intl/es/policies/privacy/">Política de privacidad de google</a>
                </div>
                <div className={estilos.bloque}>
                    El Usuario acepta expresamente, por la utilización de este Site, el tratamiento de la información recabada en la forma y con los fines
                    anteriormente mencionados. Y asimismo reconoce conocer la posibilidad de rechazar el tratamiento de tales datos o información rechazando el
                    uso de Cookies mediante la selección de la configuración apropiada a tal fin en su navegador. Si bien esta opción de bloqueo de Cookies en
                    su navegador puede no permitirle el uso pleno de todas las funcionalidades del Website.
                </div>
                <div className={estilos.bloque}> Además, el Usuario puede oponerse al uso de determinadas cookies mediante los siguientes servicios:</div>

                <ul>
                    <li>
                        <a href="http://www.criteo.com/deactivate-criteo-banners/">http://www.criteo.com/deactivate-criteo-banners/</a>
                    </li>
                    <li>
                        <a href="http://youronlinechoices.eu/">http://youronlinechoices.eu/</a>
                    </li>
                    <li>
                        <a href="http://www.networkadvertising.org/choices/">http://www.networkadvertising.org/choices/</a>
                    </li>
                    <li>
                        <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a>
                    </li>
                </ul>

                <div className={estilos.bloque}>
                    Por otro lado, el Usuario, en todo momento, podrá rechazar la instalación de Cookies a través de la configuración del navegador que utilice:
                    <ul>
                        <li>
                            <EleTitulo enLinea={true} color="primary">
                                <b>Internet Explorer: </b>
                            </EleTitulo>
                            Herramientas -{">"} Opciones de Internet -{">"} Privacidad -{">"} Configuración. Para más información, puede consultar el soporte de
                            Microsoft o la Ayuda del navegador.
                        </li>
                        <li>
                            <EleTitulo enLinea={true} color="primary">
                                <b>Firefox: </b>
                            </EleTitulo>
                            Herramientas -{">"} Opciones -{">"} Privacidad -{">"} Historial -{">"} Configuración Personalizada. Para más información, puede
                            consultar el soporte de Mozilla o la Ayuda del navegador.
                        </li>
                        <li>
                            <EleTitulo enLinea={true} color="primary">
                                <b>Chrome: </b>
                            </EleTitulo>
                            Configuración -{">"} Mostrar opciones avanzadas -{">"} Privacidad -{">"} Configuración de contenido. Para más información, puede
                            consultar el soporte de Google o la Ayuda del navegador.
                        </li>
                        <li>
                            <EleTitulo enLinea={true} color="primary">
                                <b>Safari: </b>
                            </EleTitulo>
                            Preferencias -{">"} Seguridad. Para más información, puede consultar el soporte de Apple o la Ayuda del navegador.
                        </li>
                    </ul>
                </div>

                <div className={estilos.bloque}>
                    Igualmente, si eres usuario registrado e inicias sesión, también instalaremos varias cookies para guardar tu información de inicio de sesión
                    y tus opciones de visualización de pantalla.
                </div>
            </ElePanel>
        </div>
    );
};

CompCookies.propTypes = {
    /**
     * Contenido que se va a visualizar para las cookies
     */
    contenido: PropTypes.node,
    /**
     * Icono al lado izquierdo.
     */
    icono: PropTypes.string,
    /**
     * Icono del botón de cancelar.
     */
    iconoBoton: PropTypes.string
};

export default withNamespaces("cookies")(CompCookies);
