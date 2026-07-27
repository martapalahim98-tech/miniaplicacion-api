

# Plan de acción completo

## Fase 0 · Base del proyecto

### Estado

Prácticamente completada.

### Incluye

* HTML semántico.
* CSS propio y responsive.
* Formulario en dos pasos.
* Navegación entre pasos.
* Validación de datos.
* Creación de `preferenciasViaje`.
* Mensajes de error.
* Barra de progreso.
* Accesibilidad inicial.

### Pendiente mínimo

* Cambiar el texto de “10, 14 o 21 días” por “7 a 21 días”.
* Eliminar HTML comentado innecesario.
* Añadir estilos de campos con `aria-invalid`.
* Comprobar que no hay errores en consola.

### Criterio para cerrar la fase

El formulario debe poder completarse de principio a fin y generar correctamente:

```javascript
{
    aeropuertoSalida: "MAD",
    fechaIda: "2026-08-28",
    fechaVuelta: "2026-09-07",
    duracionDias: 10,
    numeroViajeros: 2,
    presupuestoPorPersona: 4000,
    nivelPresupuesto: "medio",
    prioridadVuelo: "equilibrio",
    intereses: [
        "cultura-templos",
        "gastronomia",
        "japon-tradicional"
    ],
    ritmoViaje: "equilibrado",
    tipoExperiencia: "equilibrada"
}
```

**Esta fase ya está superada.**

---

# Fase 1 · Reorganización con módulos ES6

Antes de crear el algoritmo, debemos evitar que todo acabe dentro de un único `app.js`.

## Objetivo

Separar las responsabilidades principales.

## Estructura prevista

```text
js/
├── app.js
├── formulario.js
├── datos.js
├── algoritmo.js
├── render.js
└── servicios.js
```

## Responsabilidad de cada archivo

### `app.js`

Coordina la aplicación:

* inicialización;
* envío del formulario;
* llamada al algoritmo;
* control general del flujo.

### `formulario.js`

Contendrá:

* navegación;
* validaciones;
* cálculo de duración;
* creación de preferencias;
* mensajes del formulario.

### `datos.js`

Contendrá:

* carga de JSON;
* validación de los datos recibidos;
* gestión de errores de carga.

### `algoritmo.js`

Contendrá:

* puntuación de ciudades;
* selección;
* orden geográfico;
* distribución de días;
* aeropuertos;
* conexiones.

### `render.js`

Contendrá:

* resumen;
* ruta;
* aeropuertos;
* transportes;
* días;
* vuelos;
* explicación IA.

### `servicios.js`

Contendrá posteriormente:

* Ollama;
* Amadeus;
* fallbacks.

## Cambio en el HTML

```html
<script type="module" src="js/app.js"></script>
```

## Criterio para cerrar la fase

* El formulario debe seguir funcionando igual.
* No debe aparecer ningún error de importación.
* El objeto `preferenciasViaje` debe seguir generándose.
* La aplicación deberá ejecutarse desde servidor local, no abriendo el HTML directamente.

---

# Fase 2 · Base de datos local de ciudades

## Objetivo

Crear la fuente controlada de destinos.

## Archivo

```text
data/ciudades.json
```

## Ciudades iniciales

* Tokio
* Kioto
* Osaka
* Nara
* Hiroshima
* Kanazawa
* Hakone

## Datos mínimos por ciudad

```json
{
    "id": "kioto",
    "nombre": "Kioto",
    "ordenGeografico": 3,
    "coordenadas": {
        "latitud": 35.0116,
        "longitud": 135.7681
    },
    "intereses": [
        "cultura-templos",
        "gastronomia",
        "japon-tradicional"
    ],
    "tiposExperiencia": [
        "esencial",
        "equilibrada"
    ],
    "diasMinimos": 2,
    "diasRecomendados": 3,
    "nivelesPresupuesto": [
        "medio",
        "comodo"
    ],
    "aeropuertosCercanos": [
        "KIX"
    ],
    "esDestinoPrincipal": true
}
```

## Funciones necesarias

```javascript
cargarCiudades()
validarCiudades()
```

## Gestión de errores

* JSON no encontrado.
* Respuesta no válida.
* Array vacío.
* Ciudad sin propiedades necesarias.

## Criterio para cerrar la fase

Al cargar la web, la consola debe mostrar un array válido con las siete ciudades.

---

# Fase 3 · Algoritmo de puntuación

## Objetivo

Comparar las preferencias del usuario con cada ciudad.

## Reglas iniciales

Por cada ciudad:

* interés coincidente: `+3`;
* tipo de experiencia coincidente: `+2`;
* destino esencial en experiencia esencial: `+2`;
* presupuesto compatible: `+1`;
* ciudad poco adecuada al presupuesto: posible penalización;
* ritmo relajado: favorecer destinos con más días recomendados;
* ritmo intenso: permitir más destinos.

## Resultado esperado

```javascript
[
    {
        id: "kioto",
        nombre: "Kioto",
        puntuacion: 11
    },
    {
        id: "osaka",
        nombre: "Osaka",
        puntuacion: 8
    }
]
```

## Funciones necesarias

```javascript
calcularPuntuacionCiudad()
puntuarCiudades()
ordenarPorPuntuacion()
```

## Criterio para cerrar la fase

Cambiar intereses o tipo de experiencia debe cambiar el ranking de ciudades.

---

# Fase 4 · Selección de destinos

## Objetivo

Escoger un número razonable de ciudades.

## Regla inicial según duración

```text
7–9 días: 3 destinos
10–14 días: 4 destinos
15–21 días: 5 destinos
```

## Ajuste por ritmo

### Relajado

* reduce un destino;
* mínimo tres.

### Equilibrado

* mantiene la cantidad.

### Intenso

* puede aumentar uno;
* máximo cinco.

## Funciones necesarias

```javascript
calcularCantidadDestinos()
seleccionarCiudades()
```

## Validaciones

* no seleccionar más de cinco;
* no seleccionar menos de tres;
* respetar días mínimos;
* evitar que todas las ciudades tengan puntuación cero.

## Criterio para cerrar la fase

El algoritmo debe devolver entre tres y cinco ciudades coherentes con las preferencias.

---

# Fase 5 · Ordenación de la ruta y aeropuertos

## Objetivo

Ordenar las ciudades sin calcular rutas complejas.

## Estrategia

Utilizar:

```javascript
ordenGeografico
```

Las ciudades se podrán ordenar:

* oeste → este;
* este → oeste.

## Decisión de sentido

Se comparará cuál de los extremos está mejor conectado con:

* Osaka / Kansai;
* Tokio / Haneda o Narita.

## Resultado esperado

```text
Osaka → Kioto → Kanazawa → Tokio
```

## Aeropuertos

```javascript
{
    entrada: {
        codigo: "KIX",
        nombre: "Kansai",
        ciudad: "Osaka"
    },
    salida: {
        codigo: "HND",
        nombre: "Haneda",
        ciudad: "Tokio"
    }
}
```

## Funciones necesarias

```javascript
ordenarRuta()
determinarSentidoRuta()
recomendarAeropuertos()
```

## Criterio para cerrar la fase

La ruta no debe contener retrocesos geográficos evidentes.

---

# Fase 6 · Conexiones y transportes

## Objetivo

Obtener los desplazamientos internos.

## Archivo

```text
data/conexiones.json
```

## Datos por conexión

```json
{
    "origen": "kioto",
    "destino": "kanazawa",
    "medio": "Tren",
    "duracionMinutos": 125,
    "precioAproximadoYenes": 7700,
    "transbordos": 1
}
```

## Funciones necesarias

```javascript
cargarConexiones()
buscarConexion()
obtenerTransportesRuta()
```

## Gestión de errores

Si no existe una conexión:

```javascript
{
    medio: "Conexión no disponible",
    duracionMinutos: null,
    precioAproximadoYenes: null
}
```

La aplicación debe seguir funcionando y mostrar un aviso.

## Criterio para cerrar la fase

Cada tramo entre ciudades debe mostrar:

* origen;
* destino;
* medio;
* duración;
* precio;
* transbordos.

---

# Fase 7 · Distribución de días

## Objetivo

Asignar todos los días disponibles entre las ciudades.

## Reglas

1. Dar primero los días mínimos.
2. Calcular los días restantes.
3. Repartirlos según:

   * puntuación;
   * días recomendados;
   * ritmo.
4. No perder ni crear días.
5. Considerar Nara como excursión si encaja mejor.

## Funciones necesarias

```javascript
asignarDiasMinimos()
repartirDiasRestantes()
distribuirDias()
```

## Comprobación obligatoria

```javascript
sumaDiasCiudades === preferenciasViaje.duracionDias
```

O, si se reserva el primer o último día para vuelos:

```javascript
sumaDiasCiudades === diasUtiles
```

Esta decisión deberá quedar claramente definida.

## Criterio para cerrar la fase

La suma debe coincidir exactamente con la duración utilizada por el algoritmo.

---

# Fase 8 · Creación del resultado completo

## Objetivo

Agrupar todos los cálculos en un único objeto.

## Estructura prevista

```javascript
const resultadoViaje = {
    preferencias: preferenciasViaje,
    ciudadesSeleccionadas: [],
    ruta: [],
    aeropuertos: {},
    transportes: [],
    distribucionDias: [],
    vuelos: [],
    recomendacionIA: "",
    usaDatosDemostracion: false
};
```

## Criterio para cerrar la fase

Debe poder mostrarse en consola un objeto completo y coherente antes de tocar el HTML de resultados.

---

# Fase 9 · Renderizado dinámico del resultado

## Objetivo

Eliminar el contenido fijo de demostración y generar los resultados desde JavaScript.

## Elementos dinámicos

* intereses;
* resumen;
* ruta;
* aeropuertos;
* transportes;
* distribución de días;
* vuelos;
* explicación IA.

## Funciones necesarias

```javascript
renderizarResumen()
renderizarIntereses()
renderizarRuta()
renderizarAeropuertos()
renderizarTransportes()
renderizarDistribucionDias()
renderizarResultados()
```

## Cambios en el HTML

Estos contenedores quedarán vacíos:

```html
<div id="resumenIntereses"></div>
<div id="rutaRecomendada"></div>
<div id="comparacionVuelos"></div>
<div id="listaTransportes"></div>
<div id="distribucionDias"></div>
```

## Criterio para cerrar la fase

Dos formularios diferentes deben producir resultados visualmente distintos.

---

# Fase 10 · Estado de carga y flujo completo

## Objetivo

Conectar formulario, proceso y resultados.

## Flujo

```text
Formulario
↓
Estado de carga
↓
Resultados
```

## Funciones necesarias

```javascript
mostrarEstadoCarga()
actualizarProcesoCarga()
ocultarEstadoCarga()
mostrarResultados()
mostrarErrorGeneral()
```

## Mejoras UX

* desactivar botón;
* cambiar texto;
* `aria-busy`;
* evitar doble envío;
* mover foco al resultado;
* permitir volver al formulario.

## Criterio para cerrar la fase

El usuario debe completar el recorrido sin saltos ni pantallas incoherentes.

---

# Fase 11 · Mapa con Leaflet

## Objetivo

Representar la ruta ya calculada.

## Incluye

* mapa;
* capa OpenStreetMap;
* marcador por ciudad;
* línea entre ciudades;
* ajuste automático del encuadre.

## Funciones necesarias

```javascript
inicializarMapa()
limpiarMapa()
renderizarMapaRuta()
```

## Precaución

Leaflet no decidirá la ruta. Solo representará las coordenadas del JSON.

## Criterio para cerrar la fase

El mapa debe cambiar según las ciudades seleccionadas.

---

# Fase 12 · Integración con Ollama y Qwen

## Objetivo

Generar una explicación natural utilizando datos ya calculados.

## Funciones necesarias

```javascript
construirPrompt()
consultarOllama()
generarExplicacionLocal()
```

## Datos enviados

* preferencias;
* ruta;
* aeropuertos;
* transportes;
* días;
* vuelos disponibles.

## Restricciones

* no inventar datos;
* no cambiar la ruta;
* no introducir ciudades nuevas;
* no inventar precios;
* responder en español;
* longitud controlada.

## Fallback

Si Ollama falla:

```javascript
generarExplicacionLocal(resultadoViaje)
```

## Criterio para cerrar la fase

Con Ollama apagado, la aplicación debe seguir mostrando una explicación útil.

---

# Fase 13 · Vuelos de demostración

## Objetivo

Garantizar que la comparación de vuelos siempre funcione.

## Archivo

```text
data/vuelos-demo.json
```

## Clasificación

* más barato;
* más rápido;
* recomendado.

## Funciones necesarias

```javascript
cargarVuelosDemo()
compararVuelos()
seleccionarVueloRecomendado()
```

## Criterio para cerrar la fase

La interfaz debe mostrar tres opciones aunque Amadeus no esté disponible.

---

# Fase 14 · Amadeus y PHP

## Objetivo

Integrar una API externa real sin exponer credenciales.

## Archivos

```text
php/
├── config.php
└── buscar-vuelos.php
```

## Flujo

```text
app.js
→ buscar-vuelos.php
→ Amadeus
→ buscar-vuelos.php
→ app.js
```

## Gestión de fallos

Si falla:

```text
Amadeus
↓
vuelos-demo.json
```

## Criterio para cerrar la fase

* al menos una consulta real debe funcionar;
* las claves no aparecen en JavaScript;
* el modo demo entra automáticamente si falla.

---

# Fase 15 · Accesibilidad y UX final

## Revisiones

* navegación por teclado;
* foco al cambiar de pantalla;
* `aria-live`;
* `aria-busy`;
* `aria-current`;
* contraste;
* mensajes no basados solo en color;
* etiquetas;
* mapa accesible;
* movimiento reducido;
* botones desactivados durante carga.

## Mejoras útiles

* duración calculada visible;
* contador de intereses;
* aviso de datos demo;
* botón para reiniciar;
* mantener preferencias al editar.

## Criterio para cerrar la fase

Toda la aplicación debe poder utilizarse con teclado y los estados deben entenderse sin depender únicamente del color.

---

# Fase 16 · Limpieza y calidad del código

## Tareas

* eliminar comentarios antiguos;
* eliminar `console.log()` innecesarios;
* conservar solo logs útiles;
* eliminar funciones sin usar;
* revisar nombres;
* evitar duplicación;
* añadir JSDoc donde ayude;
* ordenar imports;
* comprobar rutas de archivos;
* unificar formato.

## Criterio para cerrar la fase

La consola no debe mostrar:

* errores;
* advertencias propias;
* referencias inexistentes.

---

# Fase 17 · Pruebas completas

## Casos del formulario

* vacío;
* fechas incorrectas;
* menos de 7 días;
* más de 21;
* presupuesto incorrecto;
* 0 intereses;
* intento de seleccionar 4;
* volver y modificar.

## Casos del algoritmo

* 7 días relajado;
* 7 días intenso;
* 14 días equilibrado;
* 21 días intenso;
* ruta esencial;
* alternativa;
* intereses urbanos;
* intereses tradicionales.

## Casos de error

* JSON no disponible;
* Ollama apagado;
* Amadeus falla;
* PHP no disponible;
* conexión interna no encontrada;
* mapa no disponible.

## Responsive

* 320 px;
* 375 px;
* 768 px;
* 1024 px;
* pantalla grande.

## Criterio para cerrar la fase

Todos los casos deben terminar con resultado o mensaje controlado, nunca con la aplicación bloqueada.

---

# Fase 18 · README

## Contenido obligatorio

* nombre;
* autor;
* descripción;
* problema;
* destinatario;
* funcionalidades;
* tecnologías;
* estructura;
* ejecución;
* Ollama;
* PHP;
* Amadeus;
* modo demo;
* IA;
* fuentes de datos;
* limitaciones;
* mejoras futuras.

## Criterio para cerrar la fase

Otra persona debe poder ejecutar el proyecto siguiendo únicamente el README.

---

# Fase 19 · Presentación final

## Preparar una demostración breve

### 1. Problema

Organizar una ruta coherente por Japón.

### 2. Formulario

Explicar preferencias y validaciones.

### 3. Algoritmo

Mostrar que JavaScript decide ciudades y orden.

### 4. Resultado

Enseñar ruta, mapa, vuelos y transportes.

### 5. IA

Explicar que Qwen justifica, pero no inventa la ruta.

### 6. Errores y fallback

Mostrar que funciona incluso sin Amadeus.

### 7. Dificultades

* diseño del algoritmo;
* conexión de datos;
* servicios externos.

### 8. Mejoras futuras

* más ciudades;
* NAVITIME;
* hoteles;
* clima;
* preferencias de destino.

---

# Orden real de trabajo

No construiremos las integraciones externas hasta que el núcleo funcione.

## Bloque A · Aplicación principal

1. Módulos ES6.
2. `ciudades.json`.
3. Carga con `fetch`.
4. Puntuación.
5. Selección.
6. Ordenación.
7. `conexiones.json`.
8. Transportes.
9. Distribución de días.
10. Resultado completo.
11. Renderizado.

## Bloque B · Experiencia visual

12. Flujo de carga.
13. Resultados dinámicos.
14. Leaflet.
15. Accesibilidad y UX.

## Bloque C · Servicios avanzados

16. Ollama.
17. Fallback IA.
18. Vuelos demo.
19. Amadeus y PHP.
20. Fallback Amadeus.

## Bloque D · Entrega

21. Limpieza.
22. Pruebas.
23. README.
24. Presentación.

# Próximo paso

El siguiente paso será exclusivamente la **Fase 1: dividir el JavaScript actual en módulos ES6 sin cambiar su funcionamiento**. No empezaremos todavía el JSON ni el algoritmo hasta comprobar que el formulario sigue funcionando exactamente igual.
