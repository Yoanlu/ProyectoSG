import React from 'react';
import PropTypes from 'prop-types';

import TableCell from '@mui/material/TableCell';

import estilos from './Filtros.module.css';

import CompDesplegable from '../../desplegables/CompDesplegable';
/**
 * Componente que permite el crear una celda de filtrado personalizada.
 *
 * @version 0.1
 * @author [Sara García](http://enlace.a.la.web.del.programador.com) | [sara.garcia@sandav.es](mailto:sara.garcia@sandav.es)
 */
const FiltroDesplegable = ({
    filter,
    onFilter,
    valoresPosiblesFiltro,
    nombre,
    campoVisibleFiltro,
    campoClaveFiltro,
    desplegableFiltroLista=false,
    controlErrores,
    desactivado,
}) => (
    <TableCell className={estilos.filtro}>
        <CompDesplegable
            tipoDesplegable="desplegable"
            nombre={nombre}
            datos={valoresPosiblesFiltro}
            //idSeleccionado={filter ? (filter.value ? filter.value : 'sinFiltro') : 'sinFiltro'}
            idSeleccionado={filter ? filter.id : ''}
            campoVisible={campoVisibleFiltro}
            campoClave={campoClaveFiltro}
            controlErrores={controlErrores}
            desactivado={desactivado}
            desplegableFiltroLista={desplegableFiltroLista}
            funcionOnChange={(id) => {
                let valorNuevo = valoresPosiblesFiltro.find((fila) => fila.id === id);
                onFilter(valorNuevo ? { id: valorNuevo.id, value: valorNuevo.valor } : null);
            }}
        />
    </TableCell>
);

FiltroDesplegable.propTypes = {
    /**
     * Objeto a filtrar
     */
    filter: PropTypes.object,
    /**
     * Función de filtrado.
     */
    onFilter: PropTypes.func,
    /**
     * Etiqueta del componente en este caso del desplegable.
     */
    nombre: PropTypes.string,
    /**
     * Filtros que se van a aplicar de los distintos campos.
     */
    valoresPosiblesFiltro: PropTypes.array,
    /**
     * Selección de las diferentes opciones del desplegable.
     */
    idSeleccionado: PropTypes.any,
    /**
     * Campos que se van a visualizar en las opciones del desplegable.
     */
    campoVisibleFiltro: PropTypes.string,
    /**
     * Campos clave de cada una de las opciones del desplegable.
     */
    campoClaveFiltro: PropTypes.string,
    /**
     * Opción de visualizar u oculatar el control de errores.
     */
    controlErrores: PropTypes.bool,
    /**
     * Activar o desactivar el elemento de filtrado.
     */
    desactivado: PropTypes.bool,
    /**
     * si es un desplegable perteneciente al filtrado de una Lista.
     */
    desplegableFiltroLista: PropTypes.bool,
};

export default FiltroDesplegable;
