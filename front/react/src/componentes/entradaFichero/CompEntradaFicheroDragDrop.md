# CompEntradaFicheroDragDrop

Componente que permite la entrada de ficheros externos mediante drag & drop o selección manual. Basado en `CompEntradaFicheroMultiple` pero con funcionalidad de arrastrar y soltar archivos.

## Características

- ✨ **Drag & Drop**: Arrastra y suelta archivos directamente en la zona designada
- 📁 **Selección manual**: Botón para seleccionar archivos mediante el explorador del sistema
- 📎 **Múltiples archivos**: Soporta la carga de uno o varios archivos simultáneamente
- 🎨 **Interfaz visual**: Zona de drop con indicadores visuales cuando se arrastra un archivo
- ✅ **Validación**: Control de tamaño máximo de archivo
- 🗑️ **Gestión de archivos**: Eliminar archivos seleccionados individualmente
- 📊 **Iconos por tipo**: Muestra iconos diferentes según el tipo de archivo

## Uso básico

```jsx
import React from 'react';
import CompEntradaFicheroDragDrop from './componentes/entradaFichero/CompEntradaFicheroDragDrop';

class MiComponente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ficheros: []
        };
    }

    funcionOnChangeFichero = (valor, nombreCampo, indice, nombreFichero, tipoFichero) => {
        let nuevosFicheros = [...this.state.ficheros];
        
        if (valor === null) {
            // Eliminar fichero
            nuevosFicheros.splice(indice, 1);
        } else {
            // Agregar nuevo fichero
            let nuevoFichero = {
                nombre: nombreFichero,
                tipo: tipoFichero,
                contenido: valor
            };
            nuevosFicheros.push(nuevoFichero);
        }
        
        this.setState({ ficheros: nuevosFicheros });
    };

    render() {
        return (
            <CompEntradaFicheroDragDrop
                nombre="Subir documentos"
                campo="documento"
                valor={this.state.ficheros}
                funcionOnChange={this.funcionOnChangeFichero}
            />
        );
    }
}

export default MiComponente;
```

## Propiedades

| Propiedad | Tipo | Requerido | Por defecto | Descripción |
|-----------|------|-----------|-------------|-------------|
| `nombre` | string | Sí | - | Nombre/título que se muestra en el componente |
| `campo` | string | No | - | Nombre del campo para el formulario |
| `valor` | array | No | undefined | Array de objetos con los ficheros seleccionados |
| `funcionOnChange` | function | No | () => {} | Callback cuando cambia el valor. Recibe: (valor, nombreCampo, indice, nombreFichero, tipoFichero) |
| `desactivado` | boolean | No | false | Desactiva el componente |
| `obligatorio` | boolean | No | false | Marca el campo como obligatorio |
| `tiposAceptados` | string | No | "*" | Tipos de archivo aceptados (ej: '.pdf,.doc,.docx') |
| `tamañoMaximo` | number | No | 10485760 | Tamaño máximo en bytes (por defecto 10MB) |
| `multiple` | boolean | No | false | Permite la subida de múltiples ficheros (por defecto solo uno) |
| `textoBoton` | string | No | "Seleccionar archivo/s" | Texto del botón de selección |
| `claseCss` | string | No | "" | Clase CSS adicional |
| `funcionOnFocus` | function | No | - | Callback cuando el componente obtiene el foco |
| `funcionOnBlur` | function | No | - | Callback cuando el componente pierde el foco |
| `funcionOnHover` | function | No | - | Callback cuando se pasa el ratón sobre el componente |

## Ejemplos de uso

### Ejemplo 1: Solo PDFs

```jsx
<CompEntradaFicheroDragDrop
    nombre="Subir PDFs"
    campo="documentos_pdf"
    valor={this.state.ficherosPDF}
    tiposAceptados=".pdf"
    funcionOnChange={this.handleChangePDF}
/>
```

### Ejemplo 2: Imágenes con tamaño limitado

```jsx
<CompEntradaFicheroDragDrop
    nombre="Subir imágenes"
    campo="imagenes"
    valor={this.state.imagenes}
    tiposAceptados=".jpg,.jpeg,.png,.gif"
    tamañoMaximo={5242880} // 5MB
    funcionOnChange={this.handleChangeImagenes}
/>
```

### Ejemplo 3: Documentos con validación obligatoria

```jsx
<CompEntradaFicheroDragDrop
    nombre="Documentos requeridos"
    campo="documentos"
    valor={this.state.documentos}
    obligatorio={true}
    tiposAceptados=".pdf,.doc,.docx"
    funcionOnChange={this.handleChangeDocumentos}
/>
```

### Ejemplo 4: Componente desactivado

```jsx
<CompEntradaFicheroDragDrop
    nombre="Archivos (solo lectura)"
    campo="archivos"
    valor={this.state.archivos}
    desactivado={true}
    funcionOnChange={this.handleChangeArchivos}
/>
```

### Ejemplo 5: Múltiples ficheros (multiple=true)

```jsx
<CompEntradaFicheroDragDrop
    nombre="Subir documentos"
    campo="documentos_multiples"
    valor={this.state.documentosMultiples}
    multiple={true}
    tiposAceptados=".pdf,.doc,.docx"
    funcionOnChange={this.handleChangeDocumentosMultiples}
/>
```

**Nota:** Por defecto, el componente solo permite subir un archivo (`multiple=false`). Si deseas permitir múltiples archivos, establece `multiple={true}`.

## Estructura del objeto fichero

Cada fichero en el array `valor` debe tener la siguiente estructura:

```javascript
{
    nombre: "documento.pdf",        // Nombre del fichero
    tipo: "application/pdf",        // Tipo MIME
    contenido: "data:application/pdf;base64,..." // Contenido en base64 o texto
}
```

## Callback funcionOnChange

La función `funcionOnChange` recibe los siguientes parámetros:

```javascript
funcionOnChange(valor, nombreCampo, indice, nombreFichero, tipoFichero)
```

- `valor`: Contenido del fichero en base64 o texto. `null` si se elimina un fichero
- `nombreCampo`: Nombre del campo (prop `campo`)
- `indice`: Índice del fichero si se está eliminando, `null` si se está agregando
- `nombreFichero`: Nombre del fichero
- `tipoFichero`: Tipo MIME del fichero

## Tipos de archivo soportados

El componente detecta automáticamente el tipo de archivo y muestra un icono apropiado:

- 📄 PDF: `picture_as_pdf`
- 📝 Word: `description`
- 📊 Excel: `table_chart`
- 🖼️ Imágenes (jpg, png, gif, etc.): `image`
- 📦 Archivos comprimidos (zip, rar): `folder_zip`
- 📃 Texto: `article`
- 📎 Otros: `insert_drive_file`

## Notas

- El componente lee archivos CSV como texto plano, el resto como base64
- La zona de drop muestra una animación visual cuando se arrastra un archivo sobre ella
- Los archivos se validan por tamaño antes de ser procesados
- El componente es totalmente responsive y se adapta a pantallas móviles
