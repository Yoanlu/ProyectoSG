Componente de Login:

```js

class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valorUsuario: '',
            valorContrasena: ''
        };
    }

    render() {
        return (
            <CompFormularioLogin
                textoUsuario={"Usuario"}
                textoLogin={"Login"}
                textoContrasena={"Contraseña"}
                textoBotonAcceder={"ACEPTAR"}
                valorUsuario={this.state.valorUsuario}
                valorContrasena={this.state.valorContrasena}
                funcionOnSubmit={this.enviarFormulario}
                funcionOnChangeNombre={cambiaNombre = valor => {
                                            this.setState({
                                                valorUsuario: valor
                                            });
                                        }}
                funcionOnChangeContrasena={cambiaContrasena = valor => {
                                                this.setState({
                                                    valorContrasena: valor
                                                });
                                            }}
                funcionOnSubmit={()=>{}}
                imagenEmpresa={
                    'http://www.sandav.es/sites/default/files/Logo-SANDAV-800x308.png'
                }
            />
        );
    }
}

<Elemento />
```