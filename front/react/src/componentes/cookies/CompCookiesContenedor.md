Ejemplo de comtenedor de cookies aportando la animación.
```js
const { BrowserRouter } = require('react-router-dom');


class Elemento extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            visible: false
        }
   }


    render() {
        return (
            <div>
                <EleBoton texto={"Boton de activar Cookies"} funcionOnClick={()=>{
                    window.localStorage.setItem('cookies', false);
                    this.setState({
                        visible: !this.state.visible
                    })
                }} />
                {this.state.visible ? 
                    <BrowserRouter>            
                        <CompCookiesContenedor />                
                    </BrowserRouter> :null}
            </div>
        );
    }
}

<Elemento />
 
````