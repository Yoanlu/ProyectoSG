import React from 'react';
import estilos from './CompPanelLateral.module.css';
import CompMenuExpandible from '../menus/CompMenuExpandible';
import { Drawer } from '@mui/material';
import ElePanel from '../../elementos/paneles/ElePanel';
import anchoContenedor from '../anchoContenedor';

/**
 * Componente que visualiza panel con un menú de opciones.
 *
 * @version 0.1
 * @author [Mario Cantelar](https://www.sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
const CompPanelLateral = ({ ...props }) => {
    const menuExpandible = <CompMenuExpandible {...props} />;
    let esMovilTablet = props.width === "xs" || props.width === "sm" || props.width === "md";

    return (
        <React.Fragment>
            <Drawer
                className={estilos.panelLateralMovil}
                open={esMovilTablet === true && props.menuLateralVisible}
                onClose={props.funcionCerrar}
                variant="temporary"
            >
                {menuExpandible}
            </Drawer>

            <div className={estilos.contenedorPanelPc + " " + (!esMovilTablet && props.menuLateralVisible ? "" : estilos.panelPcCerrado)}>
                <ElePanel claseCss={estilos.panelPc} cuadrado={true}>
                    {menuExpandible}
                </ElePanel>
            </div>
        </React.Fragment>
    );
};

export default anchoContenedor(CompPanelLateral);
