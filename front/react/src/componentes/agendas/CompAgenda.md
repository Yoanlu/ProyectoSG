Ejemplo de una agenda (programador) de eventos.

```js
let arrayEventos = [
    {
        color: '#ffa500',
        fecha: new Date('2000-01-01'),
        titulo: 'Go to a gym 1'
    },
    {
        color: '#ffa500',
        fecha: new Date('2000-01-01'),
        titulo: 'Go to a gym 2'
    },
    {
        color: '#ffa500',
        fecha: new Date('2000-01-01'),
        titulo: 'Go to a gym 3'
    },
    {
        color: '#ffa500',
        fecha: new Date('2000-01-01'),
        titulo: 'Go to a gym 4'
    },
    {
        color: '#ffa500',
        fecha: new Date('2000-01-01'),
        titulo: 'Go to a gym 5'
    },
    {
        color: '#ffa500',
        fecha: new Date('2000-01-01'),
        titulo: 'Go to a gym 6'
    },
    {
        color: '#6495ed',
        fecha: new Date('2000-01-02'),
        titulo: 'Volver del gimnasio'
    },
    {
        color: '#ff0000',
        fecha: new Date('2000-01-03'),
        titulo:
            'Utilizar el componente CompAgenda en algún sitio, o ampliarle la funcionalidad.'
    },
    {
        color: '#ff0000',
        fecha: new Date('2000-01-03'),
        titulo: 'Otro evento del mismo día'
    },
    {
        color: '#ffa500',
        fecha: new Date('2000-01-15'),
        titulo: 'Ir al trabajo 1'
    },
    {
        color: '#228b22',
        fecha: new Date('2000-01-15'),
        titulo: 'Ir al trabajo 2'
    },
    {
        color: '#228b22',
        fecha: new Date('2000-01-16'),
        titulo: 'Volver del trabajo'
    }
];

<CompAgenda eventos={arrayEventos} mesInicial={new Date('2000-01-01')} />
```
