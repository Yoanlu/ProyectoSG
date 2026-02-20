# EleFiltroBasico: Ejemplo de uso y props necesarias

## Descripción
`EleFiltroBasico` es un componente reutilizable de React para construir filtros dinámicos en formularios, permitiendo entradas de texto, desplegables y botones de acción. Se utiliza, por ejemplo, en la vista `VistaTitular` para filtrar titulares por diferentes criterios.

---

## Props necesarias y valores por defecto

- **campos**: `Array<Object>`
  - Lista de objetos que definen cada campo del filtro. Cada objeto puede tener:
    - `tipo`: "EntradaTexto", "desplegable", "desplegable_multiseleccion", "botonImagen", etc.
    - `nombre`: string (clave única para el campo, usada en el objeto criterios)
    - `etiqueta`: string (texto a mostrar)
    - `datos`: array (para desplegables)
    - `funcionOnChange`: función para manejar cambios en el campo
    - Otros props según el tipo (ver ejemplos)
  - **Valores por defecto para cada campo:**
    - `obligatorio`: false
    - `desactivado`: false
    - `campoClave`: "id"
    - `campoVisible`: "texto"
    - Si no se pasan estas props, el componente usará estos valores por defecto.

- **criterios**: `Object`
  - Objeto con los valores actuales de los campos, donde cada key es el nombre del campo.

- **t**: `Function`
  - Función de traducción para etiquetas y textos. Si no se pasa, el valor por defecto es una función que devuelve el texto tal cual.

- **titulo**: `String`
  - Título a mostrar en el panel del filtro. Si no se pasa, el valor por defecto es una cadena vacía.

- **desactivado**: `Boolean`
  - Si no se pasa, el valor por defecto es false.

---

## Ejemplo de uso en VistaTitular

```jsx
<EleFiltroBasico
  campos={this.camposFiltro}
  t={this.props.t}
  titulo={this.props.t("filtro_titulares")}
  criterios={this.state.criterios}
/>
```

### Ejemplo de definición de camposFiltro

```js
get camposFiltro() {
  return [
    {
      tipo: "EntradaTexto",
      nombre: "valor_1",
      etiqueta: this.props.t("value"),
      maximo: 500,
      funcionOnChange: this.funcionOnChangeTextoFiltro,
      // Si no defines obligatorio o desactivado, serán false por defecto
    },
    {
      tipo: "desplegable",
      nombre: "tipo_notificacion_1",
      etiqueta: this.props.t("customer"),
      datos: [
        { id: "cliente_nombre", texto: this.props.t("customer") },
        { id: "documento", texto: this.props.t("document") }
      ],
      funcionOnChange: this.funcionOnChangeTextoFiltro,
      // Si no defines campoClave o campoVisible, serán "id" y "texto" por defecto
    },
    {
      tipo: "botonImagen",
      funcionOnClick: this.funcionBuscarFiltro,
      icono: 'search',
      tooltip: this.props.tooltipBoton || "modificar_tipo_notificacion",
      placement: "right"
    }
  ];
}
```

### Ejemplo de objeto criterios

```js
this.state = {
  criterios: {
    valor_1: "",
    tipo_notificacion_1: null
  }
};
```

---

## Notas importantes
- Cada campo debe tener un `nombre` único y debe estar presente como key en el objeto `criterios`.
- La función `funcionOnChange` debe actualizar el valor correspondiente en el objeto criterios del state del componente padre.
- Para los botones, la función `funcionOnClick` recibirá el objeto criterios actual como argumento.
- El componente espera que los valores de los inputs sean controlados desde el objeto `criterios`.
- Si no defines las props `obligatorio`, `desactivado`, `campoClave` o `campoVisible` en cada campo, el componente usará los valores por defecto indicados arriba.

---

## Ejemplo de función onChange en el padre

```js
funcionOnChangeTextoFiltro = (valor, campo) => {
  let criterios = { ...this.state.criterios };
  criterios[campo] = valor;
  this.setState({ criterios });
};
```

---

## Ejemplo de función onClick para el botón

```js
funcionBuscarFiltro = (criterios) => {
  console.log("Buscar con el filtro", criterios);
  // Aquí puedes hacer la petición o filtrado
};
```

---

## Resumen
- Define los campos y el objeto criterios en el padre.
- Pasa ambos como props a EleFiltroBasico.
- Controla los cambios y acciones desde el padre usando las funciones proporcionadas.
- Si no defines ciertas props en los campos, el componente usará valores por defecto para evitar errores y facilitar el uso.
