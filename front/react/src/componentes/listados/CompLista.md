Ejemplo de grid Lista

```js
const { BrowserRouter } = require('react-router-dom');

const datosPrueba = [
    {
        id:1,
        name: 'Harv',
        state: 'Nevada',
        order: '35709',
        salary: 11800,
        color: '#0000FF',
        is_active: true,
        nodo_padre:0
    },
    {
        id:2,
        name: 'Sandra',
        state: 'Texas',
        order: '35706',
        salary: 6150,
        color: '#FF0000',
        is_active: true,
        nodo_padre:0
    },
    {
        id:3,
        name: 'Jim',
        state: 'Colorado',
        order: '35711',
        salary: 13200,
        color: '#FF0000',
        is_active: true,
        nodo_padre:0
    },
    {
        
        id:4,
        name: 'Todd',
        state: 'Utah',
        order: '35983',
        salary: 16050,
        color: '#0000FF',
        is_active: false,
        nodo_padre:0
    },
    {
        
        id:5,
        name: 'Clark',
        state: 'Nevada',
        order: '36987',
        salary: 14750,
        color: '#FF0000',
        is_active: false,
        nodo_padre:0
    },
    {   
        
        id:6,
        name: 'Paul',
        state: 'Colorado',
        order: '56272',
        salary: 11050,
        color: '#FF0000',
        is_active: true,
        nodo_padre:0
    },
    {
        
        id:7,
        name: 'Robert',
        state: 'Nevada',
        order: '58463',
        salary: 8145,
        color: '#009846',
        is_active: true,
        nodo_padre:1
    },
    {   
        
        id:8,
        name: 'Todd',
        state: 'Nevada',
        order: '48563',
        salary: 16254,
        color: '#FF0000',
        is_active: true,
        nodo_padre:1
    },
    {           
        id:9,
        name: 'Clark',
        state: 'Washington',
        order: '69851',
        salary: 16254,
        color: '#0000FF',
        is_active: false,
        nodo_padre:1
    },
    {
        id:10,
        name: 'Mark',
        state: 'Texas',
        order: '56241',
        salary: 6150,
        color: '#009846',
        is_active: true,
        nodo_padre:8
    },
    {
        id:11,
        name: 'Linda',
        state: 'Texas',
        order: '47563',
        salary: 11050,
        color: '#FF0000',
        is_active: true,
        nodo_padre:8
    },
    {
        id:12,
        name: 'Lisa',
        state: 'Washington',
        order: '36952',
        salary: 13200,
        color: '#FF0000',
        is_active: true,
        nodo_padre:11
    },
    {
        id:13,
        name: 'William',
        state: 'California',
        order: '65230',
        salary: 16050,
        color: '#FF0000',
        is_active: false,
        nodo_padre:11
    },
    {
        id:14,
        name: 'Mary',
        state: 'Illinois',
        order: '54213',
        salary: 14750,
        color: '#FF0000',
        is_active: true,
        nodo_padre:2
    },
    {
        id:15,
        name: 'James',
        state: 'Texas',
        order: '51236',
        salary: 13200,
        color: '#009846',
        is_active: true,
        nodo_padre:2
    }
];

const cabeceraPrueba = [
    {
        campo: 'name',
        titulo: 'name'
    },
    {
        campo: 'state',
        titulo: 'state'
    },
    {
        campo: 'order',
        titulo: 'order'
    },
    {
        campo: 'salary',
        titulo: 'salary'
    },
    {
        campo: 'color',
        titulo: 'color',
        tipo: 'color'
    },
    {
        campo: 'is_active',
        titulo: 'active',
        tipo: 'opciones'
    }

];

const EjemploMantenimiento = () => <div>[Custom manteinment]</div>;

class Elemento extends React.PureComponent {
    constructor(props) {
        super(props);

        this.cambiaEstados = this.cambiaEstados.bind(this);
        this.recuperaDatos = this.recuperaDatos.bind(this);

        this.state = {
            datoEnEdicion: {},
            edicionVisible: false,
            datosLista: []
        };
    }

    traduccionPrueba(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    cambiaEstados(nuevoEstado) {
        this.setState(nuevoEstado);
    }

    recuperaDatos() {
        this.setState({ datosLista: datosPrueba });
    }

    render() {
        return (
            <BrowserRouter>
                <CompLista
                    objetosListados={this.traduccionPrueba('order')}
                    cabecera={cabeceraPrueba}
                    datos={this.state.datosLista}
                    datoEnEdicion={this.state.datoEnEdicion}
                    funcionRecuperarLista={this.recuperaDatos}
                    componenteMantenimiento={EjemploMantenimiento}
                    traduccion={this.traduccionPrueba}
                    cambiaEstados={this.cambiaEstados}
                    edicionVisible={this.state.edicionVisible}
                    filtroDefecto={[
                        {
                            columnName: 'is_active',
                            value: true
                        }
                    ]}
                    filtrosOpcionales={[
                        {
                            campoFiltrado: 'is_active',
                            esteticaFiltro: 'desplegable',
                            controlErrores: false,
                            valoresPosiblesFiltro: [{ id: 1, text: 'Activos', valor: true },{ id: 2, text: 'Inactivos', valor: false }]
                        }
                    ]}

                    arbolDeDatos={true}
                    columnaArbol={'name'}
                    campoIdPadre={'nodo_padre'}
                />
            </BrowserRouter>
        );
    }
}

<Elemento />;
```
