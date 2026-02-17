const servicioCompruebaPermisos = (permisosNecesarios = [], permisosModificar = [], permisosAñadir = [], permisosBorrar = [], permisosUsuario) => {
    let permisosDisponibles = {
        principal: false,
        modificar: false,
        añadir: false,
        borrar: false,
        modoConsulta: true
    };

    if (permisosUsuario) {
        for (let indice = 0; indice < permisosNecesarios.length; indice++) {
            if (permisosUsuario.includes(permisosNecesarios[indice])) {
                permisosDisponibles.principal = true;
                continue;
            }
        }

        for (let indice = 0; indice < permisosModificar.length; indice++) {
            if (permisosUsuario.includes(permisosModificar[indice])) {
                permisosDisponibles.modificar = true;
                permisosDisponibles.modoConsulta = false;
                continue;
            }
        }

        for (let indice = 0; indice < permisosAñadir.length; indice++) {
            if (permisosUsuario.includes(permisosAñadir[indice])) {
                permisosDisponibles.añadir = true;
                continue;
            }
        }

        for (let indice = 0; indice < permisosBorrar.length; indice++) {
            if (permisosUsuario.includes(permisosBorrar[indice])) {
                permisosDisponibles.borrar = true;
                continue;
            }
        }
    } else {
        permisosDisponibles.principal = false;
        permisosDisponibles.modificar = false;
        permisosDisponibles.añadir = false;
        permisosDisponibles.borrar = false;
    }

    return permisosDisponibles;
};

const unePermisos = (...permisos) => {
    let nuevosPermisos = {
        permisos_necesarios: [],
        permisos_modificar: [],
        permisos_añadir: [],
        permisos_borrar: []
    };

    for (let i = 0; i < permisos.length; i++) {
        nuevosPermisos.permisos_necesarios = nuevosPermisos.permisos_necesarios.concat(permisos[i].permisos_necesarios);
        nuevosPermisos.permisos_modificar = nuevosPermisos.permisos_modificar.concat(permisos[i].permisos_modificar);
        nuevosPermisos.permisos_añadir = nuevosPermisos.permisos_añadir.concat(permisos[i].permisos_añadir);
        nuevosPermisos.permisos_borrar = nuevosPermisos.permisos_borrar.concat(permisos[i].permisos_borrar);
    }

    return nuevosPermisos;
};

export { servicioCompruebaPermisos, unePermisos };
