import React from "react";
import Link from "@mui/material/Link";

import estilos from "./EleColumnaCorreo.module.css";

const EleColumnaCorreo = ({ value }) => (
    <Link color="textPrimary" className={estilos.enlaceCorreo} variant="subtitle2" href={"mailto:" + value}>
        {value}
    </Link>
);

export default EleColumnaCorreo;
