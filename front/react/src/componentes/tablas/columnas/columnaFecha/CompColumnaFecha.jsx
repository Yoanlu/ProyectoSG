import { withNamespaces } from "react-i18next";
import CompColumnaFechaGenerico from "./CompColumnaFechaGenerico";

class CompColumnaFecha extends CompColumnaFechaGenerico {
    constructor(props) {
        super(props);
        
        this.formatoMoment = "L";
    }
}

export default withNamespaces()(CompColumnaFecha);
