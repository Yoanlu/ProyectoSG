import { ProveedorPermisos } from "./ProveedorPermisos";
import { servicioCompruebaPermisos } from "./ServicioPermisos";
import Componente from "../Componente";

/**
 * Componente de la cual extienden las vistas facilitando así los permisos necesarios para acceder a la información.
 *
 * @version 0.1
 * @author [Mario Cantelar](http://sandav.es) | [mario.cantelar@sandav.es](mailto:mario.cantelar@sandav.es)
 */
class CompPermisos extends Componente {
    static contextType = ProveedorPermisos;

    constructor(props) {
        super(props);

        this.permiso = {
            principal: false,
            modificar: false,
            añadir: false,
            borrar: false
        };

        this.permisos_necesarios = [];
        this.permisos_modificar = [];
        this.permisos_añadir = [];
        this.permisos_borrar = [];
    }

    compruebaPermisos = () => {
        this.permisosUsuario = this.context;

        this.permiso = servicioCompruebaPermisos(
            this.permisos_necesarios,
            this.permisos_modificar,
            this.permisos_añadir,
            this.permisos_borrar,
            this.permisosUsuario
        );

        if (this.permiso.principal === false && this.props.history) {
            this.montado = false;
            
            if (window.location.pathname !== "/login") {
                window.localStorage.setItem("previous_login", window.location.pathname);
            }

            this.props.history.push("/login");
            return;
        }
    };

    controlURL = () => {
        try {
            let idURL = this.props.match.params.id;
            if (idURL) {
                this.setState({
                    edicionVisible: true,
                    datoEnEdicion: {
                        id: parseInt(idURL)
                    }
                });
            }
        } catch (error) {}
    };

    componentDidMount() {
        this.controlURL();
    }

    UNSAFE_componentWillMount() {
        this.compruebaPermisos();
    }
}

export default CompPermisos;
