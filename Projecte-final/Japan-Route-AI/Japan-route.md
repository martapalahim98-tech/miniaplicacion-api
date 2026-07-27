# Propuesta de proyecto final

## Japan Route AI: Asistente inteligente para planificar rutas por Japón

## 1. Nombre del proyecto

**Japan Route AI**

### Subtítulo

Asistente inteligente para recomendar rutas personalizadas por Japón según las preferencias, el presupuesto y la duración del viaje.

---

## 2. Descripción general

Japan Route AI será una aplicación web que ayudará al usuario a organizar un viaje personalizado por Japón.

La aplicación no se limitará a generar un itinerario genérico. Su objetivo principal será analizar las preferencias del usuario y recomendar:

- qué ciudades o destinos visitar;
- en qué orden recorrerlos;
- por qué aeropuerto conviene entrar a Japón;
- por qué aeropuerto conviene salir;
- qué transportes utilizar entre destinos;
- cuántos días dedicar a cada lugar;
- qué ruta se adapta mejor al presupuesto y al estilo de viaje;
- qué opción de vuelo resulta más conveniente.

La aplicación combinará datos estructurados, algoritmos desarrollados con JavaScript, información obtenida mediante una API externa y un modelo de inteligencia artificial local ejecutado con Ollama.

---

## 3. Problema que resuelve

Organizar un viaje por Japón puede resultar complicado porque existen muchas ciudades, aeropuertos, conexiones ferroviarias y tipos de viaje posibles.

Un viajero puede saber qué lugares le interesan, pero no necesariamente:

- qué destinos encajan realmente en los días disponibles;
- si es mejor entrar por Tokio u Osaka;
- si conviene volver desde el mismo aeropuerto;
- en qué orden visitar las ciudades;
- cuánto tiempo se perderá en desplazamientos;
- si la ruta incluye demasiados cambios de alojamiento;
- qué transporte es más apropiado;
- si la propuesta encaja con su presupuesto.

Los generadores de itinerarios tradicionales suelen crear una lista de actividades, pero no siempre justifican por qué una ruta es mejor que otra.

Japan Route AI pretende resolver este problema ofreciendo una recomendación razonada y personalizada.

---

## 4. Público objetivo

La aplicación estaría dirigida principalmente a:

- personas que viajan por primera vez a Japón;
- viajeros que no conocen bien la geografía ni los transportes del país;
- personas que quieren combinar ciudades grandes con destinos tradicionales;
- usuarios que necesitan adaptar el viaje a un número limitado de días;
- viajeros que buscan una ruta equilibrada entre coste, tiempo y preferencias personales.

---

## 5. Funcionamiento de la aplicación

El usuario completará un formulario con los datos principales del viaje.

### Datos generales

- aeropuerto o ciudad de origen;
- fechas aproximadas;
- número de días;
- número de viajeros;
- presupuesto aproximado;
- primera visita a Japón: sí o no;
- disposición para cambiar de alojamiento;
- posibilidad de alquilar coche: sí o no.

### Preferencias del viaje

El usuario podrá seleccionar intereses como:

- grandes ciudades;
- cultura tradicional;
- templos y santuarios;
- naturaleza;
- pueblos tradicionales;
- gastronomía;
- anime y tecnología;
- compras;
- vida nocturna;
- senderismo;
- destinos poco turísticos;
- parques temáticos.

También podrá indicar el ritmo deseado:

- relajado;
- equilibrado;
- intenso.

Además, se podrían incluir controles como:

```text
Japón tradicional ───────── Japón urbano
```

```text
Destinos locales ───────── Destinos turísticos
```

Cuando el usuario pulse el botón **Planificar viaje**, la aplicación procesará los datos y generará varias opciones.

---

## 6. Resultado que recibirá el usuario

La aplicación mostrará una propuesta organizada en diferentes apartados.

### 6.1 Comparación de vuelos

Por ejemplo:

```text
Vuelo más económico

Barcelona → Tokio
730 €
19 horas
2 escalas
```

```text
Vuelo más rápido

Barcelona → Osaka
910 €
15 horas
1 escala
```

```text
Opción recomendada

La segunda opción permite empezar el viaje por Osaka y reduce el tiempo
de vuelo en cuatro horas sin superar el presupuesto máximo indicado.
```

La aplicación no realizará reservas. Solo mostrará y comparará opciones disponibles.

---

### 6.2 Aeropuerto de entrada y salida

La aplicación comparará diferentes posibilidades:

- entrar y salir por Tokio;
- entrar y salir por Osaka;
- entrar por Tokio y salir por Osaka;
- entrar por Osaka y salir por Tokio.

Por ejemplo:

```text
Entrada recomendada: Aeropuerto de Kansai, Osaka

Salida recomendada: Aeropuerto de Haneda, Tokio
```

La aplicación podrá recomendar una ruta abierta cuando sea más eficiente:

```text
Osaka → Kioto → Kanazawa → Tokio
```

De esta forma se evita regresar al punto inicial y se reducen desplazamientos innecesarios.

---

### 6.3 Ruta recomendada

Ejemplo:

```text
Osaka
↓
Nara
↓
Kioto
↓
Kanazawa
↓
Tokio
```

La ruta dependerá del perfil del usuario.

Un usuario interesado en grandes ciudades, tecnología y compras podría recibir:

```text
Tokio → Yokohama → Osaka → Kioto
```

Un usuario interesado en cultura tradicional y destinos menos urbanos podría recibir:

```text
Osaka → Nara → Kioto → Kanazawa → Takayama
```

---

### 6.4 Distribución de días

La aplicación indicará cuántos días dedicar a cada destino.

Por ejemplo:

```text
Osaka: 2 días
Nara: excursión de 1 día
Kioto: 3 días
Kanazawa: 2 días
Tokio: 4 días
```

La distribución se calculará teniendo en cuenta:

- duración total del viaje;
- días mínimos recomendados por ciudad;
- preferencias del usuario;
- tiempo necesario para desplazarse;
- ritmo de viaje seleccionado.

---

### 6.5 Transporte interno

La aplicación recomendará el transporte entre destinos.

Por ejemplo:

```text
Osaka → Nara
Tren regional
Duración aproximada: 45 minutos
```

```text
Kioto → Kanazawa
Tren Limited Express y Shinkansen
Duración aproximada: 2 horas
```

```text
Kanazawa → Tokio
Shinkansen
Duración aproximada: 2 horas y 30 minutos
```

En la primera versión, estos datos procederán de una base de datos local en formato JSON con las conexiones principales.

Como ampliación futura, podrían obtenerse mediante una API especializada como NAVITIME.

---

### 6.6 Itinerario diario generado por IA

Una vez seleccionada la ruta, Qwen generará una propuesta diaria.

Por ejemplo:

```text
Día 1 — Llegada a Osaka

Llegada al aeropuerto de Kansai y desplazamiento hasta el alojamiento.
Paseo tranquilo por Dotonbori y cena en la zona de Namba.
```

```text
Día 2 — Osaka urbana

Visita al castillo de Osaka, zona de Umeda y barrio de Shinsekai.
```

```text
Día 3 — Excursión a Nara

Visita al parque de Nara, templo Todai-ji y barrio tradicional de Naramachi.
```

El modelo tendrá restricciones para no inventar destinos, precios, vuelos ni conexiones.

---

## 7. Uso de la inteligencia artificial

La inteligencia artificial utilizada será:

- **Ollama** como entorno de ejecución local;
- **Qwen2.5:3B** como modelo de lenguaje.

La IA no será responsable de calcular por sí sola toda la ruta.

Su función será:

- explicar por qué una opción es más adecuada;
- comparar rutas calculadas previamente;
- redactar el itinerario diario;
- adaptar las recomendaciones al perfil del usuario;
- ofrecer consejos relacionados con el ritmo, el presupuesto y los intereses;
- presentar los resultados de forma clara y natural.

La aplicación proporcionará al modelo únicamente datos seleccionados y verificados.

Por ejemplo, Qwen recibirá:

- preferencias del usuario;
- ciudades candidatas;
- puntuación obtenida por cada ciudad;
- rutas finalistas;
- tiempos y precios disponibles;
- vuelos obtenidos mediante la API;
- restricciones sobre la respuesta.

De esta forma, la IA no inventará la estructura del viaje, sino que explicará y desarrollará una propuesta calculada por la aplicación.

---

## 8. Algoritmos desarrollados con JavaScript

La aplicación tendrá una parte importante de programación propia.

### 8.1 Puntuación de ciudades

Cada ciudad tendrá características almacenadas en JSON.

Ejemplo:

```json
{
    "nombre": "Kioto",
    "tipos": ["tradicional", "cultura", "templos"],
    "nivelUrbano": 2,
    "nivelTradicional": 5,
    "nivelTuristico": 5,
    "naturaleza": 3,
    "gastronomia": 4,
    "diasMinimos": 2,
    "diasRecomendados": 3
}
```

JavaScript comparará estas características con las preferencias del usuario.

Por ejemplo:

- interés en templos: suma puntos a Kioto y Nara;
- interés en anime: suma puntos a Tokio y Osaka;
- búsqueda de tranquilidad: resta puntos a destinos muy masificados;
- primera visita a Japón: prioriza algunos destinos esenciales;
- pocos días: elimina ciudades que obligarían a demasiados desplazamientos.

---

### 8.2 Generación de rutas

La aplicación seleccionará las ciudades mejor puntuadas y generará diferentes órdenes posibles.

Por ejemplo:

```text
Ruta A
Tokio → Kanazawa → Kioto → Osaka
```

```text
Ruta B
Osaka → Kioto → Kanazawa → Tokio
```

```text
Ruta C
Tokio → Kioto → Osaka → Kanazawa
```

Después calculará el coste de cada ruta.

---

### 8.3 Puntuación de rutas

Las rutas se valorarán teniendo en cuenta:

- duración total de los desplazamientos;
- coste aproximado;
- número de transbordos;
- número de cambios de alojamiento;
- retrocesos geográficos;
- adecuación al aeropuerto de entrada;
- adecuación al aeropuerto de salida;
- ritmo seleccionado por el usuario.

Una fórmula simplificada podría ser:

```javascript
puntuacion =
    minutosDesplazamiento +
    transbordos * 45 +
    cambiosAlojamiento * 90 +
    retrocesosGeograficos * 120;
```

Cuanto menor sea la puntuación, más cómoda y eficiente será la ruta.

Los valores se podrían ajustar según el perfil del usuario. Por ejemplo, un viajero con ritmo relajado recibiría una penalización mayor por cada cambio de hotel.

---

## 9. Datos utilizados

La aplicación utilizará varios archivos JSON locales.

### Archivo de ciudades

Contendrá:

- nombre;
- coordenadas;
- categorías;
- nivel turístico;
- nivel tradicional;
- nivel urbano;
- intereses relacionados;
- días mínimos;
- aeropuerto cercano;
- descripción breve.

### Archivo de conexiones

Contendrá las conexiones principales entre ciudades:

```json
{
    "origen": "Tokio",
    "destino": "Kioto",
    "medio": "Shinkansen",
    "duracionMinutos": 130,
    "precioAproximadoYenes": 14000,
    "transbordos": 0
}
```

### Archivo de actividades

Contendrá actividades y lugares de interés:

```json
{
    "nombre": "Templo Senso-ji",
    "ciudad": "Tokio",
    "categorias": ["cultura", "templos", "tradicional"],
    "duracionHoras": 2,
    "precioAproximado": 0,
    "aptoNinos": true
}
```

Estos datos permitirán que la aplicación limite las respuestas de la IA a información controlada.

---

## 10. APIs externas

### Amadeus API

Se utilizará principalmente para:

- buscar vuelos desde el aeropuerto de origen;
- comparar precios;
- consultar duración;
- consultar número de escalas;
- identificar aeropuertos;
- comparar Tokio y Osaka como puntos de entrada o salida.

Las claves de la API no estarán visibles en JavaScript. Las peticiones se realizarán desde PHP.

La aplicación no comprará ni reservará vuelos.

---

### OpenStreetMap y Leaflet

Se podrán utilizar para mostrar visualmente la ruta recomendada en un mapa.

Cada ciudad tendrá coordenadas guardadas en el JSON y se representará mediante marcadores.

El mapa podría mostrar:

```text
Osaka → Kioto → Kanazawa → Tokio
```

Leaflet será responsable de visualizar el mapa, pero no de calcular la recomendación.

---

### Posible ampliación futura: NAVITIME

NAVITIME podría utilizarse más adelante para obtener:

- rutas de tren;
- autobuses;
- tiempos reales;
- transbordos;
- información de transporte interno.

No se considera imprescindible para la primera versión debido al tiempo limitado y a las posibles restricciones de acceso a su API.

---

## 11. Tecnologías utilizadas

### Frontend

- HTML;
- CSS;
- JavaScript;
- Leaflet para visualizar el mapa.

### Backend

- PHP.

### Inteligencia artificial

- Ollama;
- Qwen2.5:3B.

### APIs y datos

- Amadeus API;
- OpenStreetMap;
- archivos JSON propios.

---

## 12. Arquitectura general

```text
Usuario
↓
Formulario HTML
↓
JavaScript procesa preferencias
↓
JSON de ciudades, actividades y transportes
↓
Algoritmo selecciona ciudades
↓
Algoritmo genera y compara rutas
↓
PHP consulta vuelos en Amadeus
↓
JavaScript selecciona las mejores opciones
↓
Qwen recibe datos estructurados
↓
Generación de explicación e itinerario
↓
Resultado mostrado en la interfaz y en el mapa
```

---

## 13. Alcance de la primera versión

Para mantener el proyecto viable, la aplicación no incluirá todo Japón.

La primera versión estará limitada a aproximadamente diez destinos:

- Tokio;
- Kioto;
- Osaka;
- Nara;
- Hiroshima;
- Kanazawa;
- Takayama;
- Hakone;
- Nikko;
- Shirakawa-go.

También se establecerán límites como:

- viajes de entre 5 y 14 días;
- salida desde un grupo reducido de aeropuertos españoles;
- máximo de cinco destinos principales por ruta;
- rutas centradas en la zona central de Japón;
- ausencia de reservas reales;
- precios aproximados para el transporte interno;
- vuelos según disponibilidad de la API;
- actividades obtenidas de una base de datos propia.

---

## 14. Producto mínimo viable

La primera versión funcional deberá permitir:

1. completar las preferencias del viaje;
2. seleccionar ciudades compatibles con el perfil;
3. generar distintas rutas;
4. puntuar las rutas;
5. recomendar un aeropuerto de entrada y otro de salida;
6. consultar opciones de vuelo mediante Amadeus;
7. mostrar los transportes internos principales;
8. generar una explicación mediante Qwen;
9. crear un itinerario básico por días;
10. visualizar la ruta en un mapa.

---

## 15. Elementos opcionales

Solo se desarrollarían si las funciones principales están terminadas:

- comparación de hoteles;
- actividades obtenidas mediante API;
- información meteorológica;
- exportación del itinerario;
- modificación manual de la ruta;
- cálculo más preciso del presupuesto;
- consulta de transporte mediante NAVITIME;
- enlaces externos para comparar vuelos en Skyscanner.

---

## 16. Plan de desarrollo

### Fase 1: interfaz y formulario

- diseñar el formulario;
- recoger preferencias;
- validar los datos;
- mostrar una pantalla de resultados básica.

### Fase 2: base de datos local

- crear el JSON de ciudades;
- crear el JSON de conexiones;
- crear el JSON de actividades;
- cargar y filtrar los datos con JavaScript.

### Fase 3: algoritmo de recomendación

- puntuar ciudades;
- limitar el número de destinos;
- generar rutas;
- calcular tiempo, coste y transbordos;
- seleccionar las mejores rutas.

### Fase 4: integración con Ollama

- construir el prompt;
- enviar los datos seleccionados a Qwen;
- limitar el formato de la respuesta;
- mostrar la explicación y el itinerario.

### Fase 5: integración con Amadeus

- configurar las credenciales;
- realizar las peticiones desde PHP;
- comparar vuelos;
- relacionar los vuelos con los aeropuertos de entrada y salida.

### Fase 6: mapa y pruebas

- añadir Leaflet;
- colocar marcadores;
- dibujar la ruta;
- probar perfiles de usuario diferentes;
- controlar errores y ausencia de resultados.

---

## 17. Ejemplo completo de funcionamiento

El usuario introduce:

```text
Duración: 12 días
Presupuesto: 2.500 €
Primera visita: sí
Ritmo: equilibrado

Intereses:
- cultura tradicional;
- gastronomía;
- templos;
- naturaleza.

Preferencias:
- evitar demasiados cambios de alojamiento;
- combinar destinos conocidos con lugares tradicionales;
- no conducir.
```

La aplicación podría devolver:

```text
Aeropuerto de entrada recomendado:
Kansai, Osaka

Aeropuerto de salida recomendado:
Haneda, Tokio
```

```text
Ruta recomendada:
Osaka → Nara → Kioto → Kanazawa → Tokio
```

```text
Distribución:
Osaka: 2 días
Nara: excursión de 1 día
Kioto: 3 días
Kanazawa: 2 días
Tokio: 4 días
```

```text
Transporte:
Osaka → Nara: tren regional
Osaka → Kioto: tren
Kioto → Kanazawa: tren
Kanazawa → Tokio: Shinkansen
```

La IA explicaría:

> Se recomienda entrar por Osaka y salir por Tokio porque la ruta avanza progresivamente hacia el este y evita volver al punto inicial. Kioto, Nara y Kanazawa responden al interés por la cultura tradicional, mientras que Tokio aporta una parte más urbana y gastronómica. La propuesta mantiene un ritmo equilibrado y reduce los cambios innecesarios de alojamiento.

---

## 18. Valor técnico del proyecto

El proyecto no consistirá únicamente en enviar una pregunta a una inteligencia artificial.

Incluirá:

- consumo de una API externa;
- tratamiento de respuestas JSON;
- programación asíncrona;
- conexión entre frontend y PHP;
- manipulación del DOM;
- validación de formularios;
- filtros y puntuaciones;
- generación y comparación de rutas;
- representación de datos en un mapa;
- integración de un modelo de lenguaje local;
- control de las instrucciones enviadas a la IA;
- separación entre datos reales, lógica y texto generado.

La inteligencia artificial será una parte del sistema, pero las decisiones principales estarán apoyadas por algoritmos y datos estructurados.

---

## 19. Limitaciones reconocidas

La aplicación será un prototipo académico y no una agencia de viajes.

Por tanto:

- los precios pueden cambiar;
- algunos transportes internos tendrán valores aproximados;
- no se realizarán reservas;
- no se garantizará disponibilidad;
- no se cubrirá todo Japón;
- la aplicación no sustituirá las páginas oficiales de transporte;
- el itinerario será una recomendación que deberá verificarse antes de viajar.

Estas limitaciones se mostrarán claramente al usuario.

---

## 20. Posibles ampliaciones

En una versión futura se podría incorporar:

- NAVITIME para transporte japonés en tiempo real;
- hoteles y actividades mediante Amadeus;
- meteorología;
- rutas para otras regiones de Japón;
- optimización avanzada mediante grafos;
- cálculo del Japan Rail Pass;
- creación de cuentas de usuario;
- guardado de itinerarios;
- exportación a PDF;
- modificación interactiva del viaje;
- conexión con calendarios;
- comparación externa mediante Skyscanner.

---

## 21. Conclusión

Japan Route AI será una aplicación web especializada en la planificación inteligente de viajes por Japón.

Su principal aportación no será generar automáticamente una lista de lugares, sino decidir qué ruta tiene más sentido según:

- los días disponibles;
- el presupuesto;
- los intereses;
- el ritmo;
- los vuelos;
- los aeropuertos;
- las distancias;
- los transportes;
- el número de cambios de alojamiento.

La aplicación combinará programación tradicional, datos estructurados, una API de viajes, mapas e inteligencia artificial.

El alcance se limitará a un conjunto reducido de destinos y conexiones, lo que permitirá desarrollar un prototipo funcional, comprensible y ampliable.

La pregunta principal que resolverá será:

> **¿Cuál es la mejor forma de recorrer Japón según el tipo de viajero, sus preferencias y el tiempo disponible?**
