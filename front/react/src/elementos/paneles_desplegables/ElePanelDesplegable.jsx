import React from "react";
import PropTypes from "prop-types";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

/**
 * Elemento panel
 *
 * @version 0.1
 * @author [Sara García] <sara.garcia@sandavteam.com>
 */
const ElePanelDesplegable = ({ claseCss, titulo, claseCssTitulo, children, desplegadoPorDefecto }) => {
    return (
        <Accordion className={"panel-desplegable " + claseCss} defaultExpanded={desplegadoPorDefecto}>
            <AccordionSummary sx={claseCssTitulo} expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                <span>{titulo}</span>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

ElePanelDesplegable.propTypes = {
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCss: PropTypes.string,
    /**
     * Clase CSS que aplica en el elemento.
     */
    titulo: PropTypes.string,
    /**
     * Clase CSS que aplica en el elemento.
     */
    claseCssTitulo: PropTypes.object,
    /**
     * Objeto contenido en el elemento.
     */
    children: PropTypes.node,
    /**
     * Objeto contenido en el elemento.
     */
    desplegadoPorDefecto: PropTypes.bool
};

export default ElePanelDesplegable;
