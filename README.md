# Motocare PWA (motocare-pwa)

Motocare

## Instalar dependencias

Primero, es necesario que tengas NodeJS version 20 instalado. (podria andar con versiones superiores)

Descargar desde https://nodejs.org/en/download/prebuilt-installer 

```bash
npm i
```

### Iniciar localmente
```bash
quasar dev
```

### Archivos de datos

Los archivos que contienen datos que podrias tener modificaciones mas frecuentes son:

#### `fichas.json` 
Ubicado en la carpeta raiz del sitio, se puede acceder desde https://motocare.com.ar/fichas.json.
Este archivo contiene todas las especificaciones tecnicas de cada moto. Ademas define que motos se van a mostrar y tambien respeta el orden.

El archivo contiene una lista de objetos, cada ojeto representa una moto.

Este archivo no es parte de la aplicacion.

#### `src/i18n/es.js` y `src/i18n/en.js` 

Estos archivos, contienen todos los textos del sitio en ambos idiomas. Tambien contienen datos como el costo de la hotel y comida.

### Compilar para produccion
Para poder subir los archivos del sitio, primero es necesario compilarlo.
```bash
quasar build
```

Una vez compilado, se debe subir los archivos ubicados en la carpeta `dist/spa`


