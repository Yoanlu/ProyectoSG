

Ejemplo de elemento Calendario mostrando un mes correspondiente a un año determinado.
```js
class Elemento extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dias: []
        };
        this.funcionClickDia = this.funcionClickDia.bind(this);
        this.year = 2018;
        this.mes= 1;
    }

    funcionClickDia(event) {
        const dia = {
            fecha: new Date(Date.UTC(this.year, event.target.attributes.mes.value, event.target.textContent)),
            color: this.props.color
        };

        alert ( "Se ha seleccionado la fecha " + dia.fecha)
    }
    render() {
        return (            
            <EleCalendario
                key={this.year + '/' + 2}
                claseCss="col-sm-4"
                year={this.year}
                mes={this.mes}
                funcionClick={this.funcionClickDia}
                selected={this.state.dias}
                lng={'es'}
            />
        );
    }
}

<Elemento />
```