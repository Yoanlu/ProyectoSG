import React, { Component } from "react";

import estilos from "./VistaProteccionDatos.module.css";

import { vistaContenedor } from "../../vistas/CompVistaContenedor";
import ElePanel from "../../../elementos/paneles/ElePanel";
import { Link } from "react-router-dom";

/**
 * Componente que contiene el texto que se va a visualizar en la ley de protección de datos en inglés o en español.
 *
 * @version 0.1
 * @author [Sara García](http://sandav.es) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
class VistaProteccionDatos extends Component {
    render() {
        return (
            <div className={estilos.contenedorProteccionDatos}>
                <ElePanel claseCss={estilos.panel}>
                    <p>
                        En cumplimiento con el deber de información recogido en el{" "}
                        <b>artículo 10 de la Ley 34/2002 de 11 de julio, de Servicios de la Sociedad de la Información y el Comercio electrónico</b>, a
                        continuación se reflejan los siguientes datos:
                    </p>
                    <p>
                        La empresa titular de esta website es SANDAV CONSULTORES, S.L., (en adelante SANDAV), bajo la denominación de marca SANDAV, domiciliada
                        en C/ Orense, 16 Planta 2, 28020 - Madrid, provista del C.I.F. B-85219186 Inscrita en el Registro Mercantil de Madrid en el Tomo 24.891,
                        Folio 79, Sección 8, Hoja M-448117, Inscripción 1.
                    </p>
                    <ol>
                        <li>
                            Buzón de contacto: <Link to="info@sandav.es" />
                        </li>
                        <li>
                            Como titular responsable de los ficheros automatizados derivados de dicho website, SANDAV desea poner en conocimiento de los
                            visitantes y usuarios de su página web su política de protección y tratamiento de datos de carácter personal, que será aplicable en
                            caso de que los usuarios decidan rellenar algún formulario de www.sandav.es donde se recaben datos de carácter personal, sin
                            perjuicio de lo indicado en la Cláusula de Privacidad aplicable a cada formulario concreto. En cualquier caso, SANDAV garantiza en
                            todo momento el íntegro y pleno cumplimiento de las obligaciones dispuestas por la Ley Orgánica 15/1999, de 13 de diciembre, de
                            Protección de Datos Personales, así como las dispuestas en el Real Decreto 994/1999, por el que se aprueba el Reglamento de Medidas
                            de Seguridad así como el resto de normativa de desarrollo.
                        </li>

                        <li>
                            Los datos de carácter personal que sean facilitados por los usuarios o visitantes del website serán incluidos en un fichero
                            automatizado cuyo Responsable es <b>SANDAV CONSULTORES, S.L.</b> con la finalidad de facilitarel acceso a los contenidos ofrecidos a
                            través de la página web; prestar, gestionar, administrar, ampliar y mejorar los servicios y/o contenidos ofrecidos en la página;
                            adecuar dichos servicios a las preferencias y gustos de los usuarios; el estudio de la utilización de los servicios por parte de los
                            usuarios y visitantes; la gestión de incidencias y mantenimiento de la página web; así como con fines publicitarios y de prospección
                            comercial respecto de productos y servicios de SANDAV CONSULTORES, S.L.
                        </li>

                        <li>
                            SANDAV informará a los usuarios y visitantes de la página de la obligatoriedad o no de facilitar todos y cada uno de los datos de
                            carácter personal que le sean solicitados en los formularios de acceso y registro a los servicios y/o contenidos ofrecidos en la
                            página web. El aviso se realizará en el momento de recogida a través de avisos visuales tales como ventanas flotantes, colocación de
                            asteriscos o símbolos junto al dato solicitado, o medios análogos a los anteriormente citados. En cualquier caso, la negativa
                            asuministrar los datos personales solicitados, la entrega de datos inexactos o de datos incompletos, podría ocasionar la prestación
                            inadecuada, ineficiente, defectuosa o la no prestación de los servicios y/o contenidos ofrecidos a los usuarios y visitantes.
                        </li>
                        <li>
                            SANDAV solicitará a los usuarios y visitantes de la página web su autorización expresa en cada formulario que cumplimenten para la
                            cesión de los datos de carácter personal que faciliten a la entidades pertenecientes a SANDAV para el envío de información y
                            publicidad. El visitante y/o usuario podrá oponerse a esta cesión tanto en el formulario que deberá cumplimentar inicialmente, como
                            en cualquier momento posterior, enviando, en este último caso, su solicitud al correo de contacto: <Link to="info@sandav.es" />
                        </li>

                        <li>
                            SANDAV puede modificar esta Política de Privacidad en función de exigencias legislativas, normativas o con la finalidad de adaptar
                            dicha política a las instrucciones dictadas por la <b>Agencia Española de Protección de Datos</b>, por ello se aconseja a los
                            usuarios que la visiten periódicamente.
                        </li>

                        <li>
                            SANDAV tiene plena conciencia del uso y tratamiento que se debedar a los datos personales que se puedan requerir o que se puedan
                            obtener delos usuarios en sus páginas web con el fin de gestionar los servicios ofrecidoso para remitirles comunicaciones
                            comerciales de productos o servicios que puedan resultar de su interés.
                        </li>

                        <li>
                            SANDAV adoptará las medidas de índole técnica y organizativa necesarias para garantizar la seguridad de los datos de carácter
                            personal y evitar así su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología de
                            acuerdo con lo establecido por el Reglamento de Medidas de Seguridad de los ficheros automatizados que contengandatos de carácter
                            personal aprobado por el Real Decreto 994/1999, de 11 dejulio.
                        </li>
                        <li>
                            Los usuarios responderán, en cualquier caso, de la veracidad de los datos facilitados y se hacen responsables de comunicar a SANDAV
                            cualquier modificación en los mismos, quedando SANDAV exento de cualquier tipo de responsabilidad a este respecto a través del
                            correo de contacto: <Link to="info@sandav.es" />
                        </li>

                        <li>
                            Los usuarios tienen reconocidos y podrán ejercitar los derechos de acceso, cancelación, rectificación y oposición, mediante
                            comunicación escrita alas direcciones indicadas en cada caso o a la dirección: <Link to="info@sandav.es" />
                        </li>

                        <li>
                            SANDAV informa a los usuarios que, podrán oponerse al envío de mensajes comerciales siguiendo las instrucciones indicadas en cada
                            caso o comunicándolo por escrito al correo de contacto: <Link to="info@sandav.es" />
                        </li>

                        <li>
                            En relación con los datos personales de menores de 18 años, SANDAV nunca utilizará estos datos para fines inadecuados para la edad
                            del menor, sino que lo hará en consonancia con la edad, conocimiento y la madurez de este público objetivo, y nunca recabará datos
                            relativos o relacionados con la situación económica o la intimidad de los miembros de su familia. SANDAV facilitará a los padres o
                            tutores la posibilidad de que puedan ejercer los derechos de acceso, cancelación, rectificación y oposición de los datos de sus
                            hijos o tutelados y animará a los menores a que consulten con ellos antes de proporcionar datos. En caso de tratarse de menores de
                            14 años, estos deberán aportar a SANDAV CONSULTORES, S.L., autorización escrita de sus padres, tutores o representantes legales,
                            consintiendo el tratamiento de sus datos.
                        </li>
                    </ol>
                </ElePanel>
            </div>
        );
    }
}

export default vistaContenedor(VistaProteccionDatos);
