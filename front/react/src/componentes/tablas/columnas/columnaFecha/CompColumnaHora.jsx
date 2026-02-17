import { withNamespaces } from "react-i18next";
import CompColumnaFechaGenerico from "./CompColumnaFechaGenerico";

class CompColumnaHora extends CompColumnaFechaGenerico {
    constructor(props) {
        super(props);

        this.formatoMoment = "LTS";
    }
}

export default withNamespaces()(CompColumnaHora);
