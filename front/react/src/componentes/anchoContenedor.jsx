import React from "react";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

/*
    ¡¡IMPORTANTE!!
    Lo incorporan todos los mantenimientos (a través de CompMantenimientoContenedor)
    Y todas las vistas (a través de CompVistaContenedor)
*/

export default function anchoContenedor(ComponenteSinAncho) {
    const getWidth = (theme, keys) => {
        return (
            keys.reduce((output, key) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const matches = useMediaQuery(theme.breakpoints.up(key));
                return !output && matches ? key : output;
            }, null) || "xs"
        );
    };

    return props => {
        const theme = useTheme();
        const keys = [...theme.breakpoints.keys].reverse();
        const miAncho = getWidth(theme, keys);

        return <ComponenteSinAncho {...props} width={miAncho} />;
    };
}
