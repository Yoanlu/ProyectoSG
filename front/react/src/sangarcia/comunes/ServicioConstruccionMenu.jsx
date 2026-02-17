import permisos from "../../sangarcia/comunes/autorizacion/Permisos";

function construyeMenu(permisos_recibidos) {
    let menu = [
        // {
        //     titulo: 'home',
        //     ruta: permisos.home
        // }
    ];

    let general_opciones = [];

    if (permisos_recibidos && permisos_recibidos.length > 0) {
        let haypermiso = false;

        //General
        haypermiso = permisos_recibidos.find(permiso => permiso === permisos.auth.user.view);
        if (haypermiso) {
            general_opciones.push({
                titulo: permisos.auth.user.titulo,
                ruta: permisos.auth.user.ruta
            });
        }

        // Miembros
        haypermiso = permisos_recibidos.find(permiso => permiso === permisos.miembros.view);
        if (haypermiso) {
            general_opciones.push({
                titulo: permisos.miembros.titulo,
                ruta: permisos.miembros.ruta
            });
        }
        //Fiestas
        haypermiso = permisos_recibidos.find(permiso => permiso === permisos.fiestas.view);
        if (haypermiso) {
            general_opciones.push({
                titulo: permisos.fiestas.titulo,
                ruta: permisos.fiestas.ruta
            });
        }

    } else {
        menu.push({
            titulo: "login",
            ruta: "/login"
        });
    }

    if (general_opciones.length > 0) {
        menu.push({
            titulo: permisos.general.titulo,
            opciones: general_opciones
        });
    }

    return menu;
}

export default construyeMenu;
