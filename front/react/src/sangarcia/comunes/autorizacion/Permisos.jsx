const permisos = {
    admin: {
        logentry: {
            add: "admin.add_logentry",
            change: "admin.change_logentry",
            delete: "admin.delete_logentry",
            view: "admin.view_logentry"
        }
    },

    auth: {
        user: {
            add: "auth.add_user",
            change: "auth.change_user",
            delete: "auth.delete_user",
            view: "auth.view_user",
            titulo: "users",
            ruta: "/users"
        },
        group: {
            add: "auth.add_group",
            change: "auth.change_group",
            delete: "auth.delete_group",
            view: "auth.view_group"
        },
        permission: {
            add: "auth.add_permission",
            change: "auth.change_permission",
            delete: "auth.delete_permission",
            view: "auth.view_permission"
        }
    },

    general: {
        titulo: "general"
    },

    oauth2: {
        accesstoken: {
            add: "oauth2_provider.add_accesstoken",
            change: "oauth2_provider.change_accesstoken",
            delete: "oauth2_provider.delete_accesstoken",
            view: "oauth2_provider.view_accesstoken"
        },
        application: {
            add: "oauth2_provider.add_application",
            change: "oauth2_provider.change_application",
            delete: "oauth2_provider.delete_application",
            view: "oauth2_provider.view_application"
        },
        grant: {
            add: "oauth2_provider.add_grant",
            change: "oauth2_provider.change_grant",
            delete: "oauth2_provider.delete_grant",
            view: "oauth2_provider.view_grant"
        },
        refreshtoken: {
            add: "oauth2_provider.add_refreshtoken",
            change: "oauth2_provider.change_refreshtoken",
            delete: "oauth2_provider.delete_refreshtoken",
            view: "oauth2_provider.view_refreshtoken"
        }
    },

    sessions: {
        session: {
            add: "sessions.add_session",
            change: "sessions.change_session",
            delete: "sessions.delete_session",
            view: "sessions.view_session"
        }
    },

    // En Permisos.js
    miembros: {
        view: "miembros.view_miembro",
        add: "miembros.add_miembro",
        change: "miembros.change_miembro",
        delete: "miembros.delete_miembro",
        titulo: "members",
        ruta: "/miembros",

        // ESTE ES EL BLOQUE QUE FALTA:
        documentos: {
            view: "miembros.view_miembrodocumento",
            add: "miembros.add_miembrodocumento",
            change: "miembros.change_miembrodocumento",
            delete: "miembros.delete_miembrodocumento"
        }
    },

    fiestas: {
        view: "fiestas.view_fiesta",
        add: "fiestas.add_fiesta",
        change: "fiestas.change_fiesta",
        delete: "fiestas.delete_fiesta",
        titulo: "parties", // Clave para la traducción
        ruta: "/fiestas" // La URL en el navegador
    },

    actividades: {
        view: "actividades.view_actividad",
        add: "actividades.add_actividad",
        change: "actividades.change_actividad",
        delete: "actividades.delete_actividad",
        titulo: "activities",
        ruta: "/actividades"
    },

    asistencias: {
        view: "asistencias.view_asistencia",
        add: "asistencias.add_asistencia",
        change: "asistencias.change_asistencia",
        delete: "asistencias.delete_asistencia",
        titulo: "assists",
        ruta: "/asistencias"
    }
};

export default permisos;
