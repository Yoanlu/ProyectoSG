Ejemplo de menú expandible:

```js
const opcionesNav = [
    {
        titulo: 'Lista 1',
        opciones: [{ titulo: 'Opción 1', ruta: 'lo1' }, { titulo: 'Opción 2', ruta: 'l1o2' }]
    },
    {
        titulo: 'Lista 2',
        opciones: [
            { titulo: 'Opción 1', ruta: 'l2o1' },
            { titulo: 'Opción 2', ruta: 'l2o2' },
            { titulo: 'Opción 3', ruta: 'l2o3' },
            { titulo: 'Opción 4', ruta: 'l2o4' },
            { titulo: 'Opción 5', ruta: 'l2o5' },
            { titulo: 'Opción 6', ruta: 'l2o6' }
        ]
    }
];

class Elemento extends React.Component {
    constructor(props) {
        super(props);

        this.funcionSelect = this.funcionSelect.bind(this);

        this.state = {
            seleccionado: ''
        };
    }

    funcionSelect(itemSeleccionado) {
        if (itemSeleccionado) {
            this.setState({
                seleccionado: itemSeleccionado
            });
        }
    }

    render() {
        return (
            <CompMenuExpandible
                seleccionado={this.state.seleccionado}
                funcionOnSelect={this.funcionSelect}
                opcionesMenu={opcionesNav}
            >
                Barra Aplicación básica
            </CompMenuExpandible>
        );
    }
}

<Elemento />;
```
