Ejemplo de EleTabla con un contenido determinado:

```js
const datosPrueba = [
    {
        name: 'Harv',
        state: 'Nevada',
        order: '35709',
        salary: 11800,
        color: '#0000FF',
        is_active: true
    },
    {
        name: 'Sandra',
        state: 'Texas',
        order: '35706',
        salary: 6150,
        color: '#FF0000',
        is_active: true
    },
    {
        name: 'Jim',
        state: 'Colorado',
        order: '35711',
        salary: 13200,
        color: '#FF0000',
        is_active: true
    },
    {
        name: 'Todd',
        state: 'Utah',
        order: '35983',
        salary: 16050,
        color: '#0000FF',
        is_active: false
    },
    {
        name: 'Clark',
        state: 'Nevada',
        order: '36987',
        salary: 14750,
        color: '#FF0000',
        is_active: false
    },
    {
        name: 'Paul',
        state: 'Colorado',
        order: '56272',
        salary: 11050,
        color: '#FF0000',
        is_active: true
    },
    {
        name: 'Robert',
        state: 'Nevada',
        order: '58463',
        salary: 8145,
        color: '#009846',
        is_active: true
    },
    {
        name: 'Todd',
        state: 'Nevada',
        order: '48563',
        salary: 16254,
        color: '#FF0000',
        is_active: true
    },
    {
        name: 'Clark',
        state: 'Washington',
        order: '69851',
        salary: 16254,
        color: '#0000FF',
        is_active: false
    },
    {
        name: 'Mark',
        state: 'Texas',
        order: '56241',
        salary: 6150,
        color: '#009846',
        is_active: true
    },
    {
        name: 'Linda',
        state: 'Texas',
        order: '47563',
        salary: 11050,
        color: '#FF0000',
        is_active: true
    },
    {
        name: 'Lisa',
        state: 'Washington',
        order: '36952',
        salary: 13200,
        color: '#FF0000',
        is_active: true
    },
    {
        name: 'William',
        state: 'California',
        order: '65230',
        salary: 16050,
        color: '#FF0000',
        is_active: false
    },
    {
        name: 'Mary',
        state: 'Illinois',
        order: '54213',
        salary: 14750,
        color: '#FF0000',
        is_active: true
    },
    {
        name: 'James',
        state: 'Texas',
        order: '51236',
        salary: 13200,
        color: '#009846',
        is_active: true
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

<CompTabla columnas={cabeceraPrueba} filas={datosPrueba} seleccionHabilitada />
```
