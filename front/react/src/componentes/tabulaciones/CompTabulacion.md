Ejemplo del Componente Tabulación con varias pestañas:
```js
class Elemento extends React.Component {
    
    render() {
        return (
            <CompTabulacion>
                <div titulo={'Pestaña 1'}>
                   <p>Contenido de la pestaña 1 </p>
                </div>
                <div titulo={'Pestaña 2'}>
                   <p>Contenido de la pestaña 2 </p>
                </div>
                <div titulo={'Pestaña 3'}>
                   <p>Contenido de la pestaña 3 </p>
                </div>
                <div titulo={'Pestaña 4'}>
                   <p>Contenido de la pestaña 4 </p>
                </div>
            </CompTabulacion>
        );
    }
}

<Elemento />

```