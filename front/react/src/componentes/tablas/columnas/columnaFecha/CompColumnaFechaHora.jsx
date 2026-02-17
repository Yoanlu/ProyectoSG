import { withNamespaces } from "react-i18next";
import CompColumnaFechaGenerico from "./CompColumnaFechaGenerico";

class CompColumnaFechaHora extends CompColumnaFechaGenerico {
    constructor(props) {
        super(props);
        
        this.formatoMoment = "L - LTS";
    }
}

export default withNamespaces()(CompColumnaFechaHora);
