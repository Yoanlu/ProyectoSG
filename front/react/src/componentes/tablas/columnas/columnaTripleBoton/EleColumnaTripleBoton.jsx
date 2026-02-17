import { Button, IconButton, ButtonGroup } from "@mui/material";
import React from "react";
import { withNamespaces } from "react-i18next";
import EleIcono from "../../../../elementos/iconos/EleIcono";

// import EleBotonImagen from "../../../../elementos/botones/EleBotonImagen";
import estilos from "./EleColumnaBoton.module.css";

class EleColumnaBotonTriple extends React.PureComponent {
  funcionOnClick = (evento) => {
    
    this.props.column.function(this.props.row, evento);
  };

  render() {
  


    return (
      <span className={estilos.contenedorColumna}>
        <span className={estilos.contenidoColumna}>
          {this.props.value ? (
            <ButtonGroup variant="outlined" aria-label="outlined button group">
             
             <IconButton color="primary" value={'notas'} aria-label="add to shopping cart" onClick={()=>this.funcionOnClick('notas')}>
              <EleIcono color="primary" icono={'article'}  tooltip="Comentarios" />
              </IconButton>

              <IconButton color="primary" aria-label="add to shopping cart"  onClick={()=>this.funcionOnClick('task')}>
              <EleIcono color="primary" icono={'task'} tooltip="Tareas" />
              </IconButton>

              <IconButton color="primary" aria-label="add to shopping cart"  onClick={()=>this.funcionOnClick('history')}>
              <EleIcono color="primary" icono={'history'}   tooltip="Historial"/>
              </IconButton>
             
              
            </ButtonGroup>
          ) : (
            <></>
          )}

          {/* {this.props.value} */}
        </span>
      </span>
    );
  }
}

export default withNamespaces()(EleColumnaBotonTriple);
