Ejemplo Radio Button en la que todos los elementos pueden estar desactivados:

```js

class Elemento extends React.Component {
  

    constructor(props) {
        super(props);

        this.state={
            chequeado:false
        };
    }

    render() {
        return (
                <CompEntradaGrupoInterruptor
                    chequeado={this.state.chequeado}
                    obligatorio={false}
                    etiquetaGrupo={'Etiqueta Grupo'}
                    opciones={[{key: 1, etiqueta:'Etiqueta 1'}, 
                                {key: 2, etiqueta:'Etiqueta 2'}, 
                                {key: 3, etiqueta:'Etiqueta 3'}]}
                    etiquetaFooter={'Etiqueta Footer'}            
                    nombre="radioButton"
                    funcionOnChange={funcionOnChangeInterruptor = clave => {
                                        this.setState({ chequeado: clave });
                                    }}
                />
        );
    }
}
<Elemento  />

```

Ejemplo Radio Button en la que tiene que haber un elementos activado:

```js

class Elemento extends React.Component {
  

    constructor(props) {
        super(props);

        this.state={
            chequeado:false,
            obligatorio:true
        };
    }

    render() {
        return (
                <CompEntradaGrupoInterruptor
                    
                    obligatorio={this.state.obligatorio}
                    chequeado={this.state.chequeado}
                    etiquetaGrupo={'Etiqueta Grupo'}
                    opciones={[{key: 1, etiqueta:'Etiqueta 1'}, 
                                {key: 2, etiqueta:'Etiqueta 2'}, 
                                {key: 3, etiqueta:'Etiqueta 3'}]}
                    etiquetaFooter={'Etiqueta Footer'}
                    nombre="radioButton"
                    funcionOnChange={funcionOnChangeInterruptor = clave => {
                                        this.setState({ chequeado: clave });
                                    }}
                />
        );
    }
}
<Elemento  />
```