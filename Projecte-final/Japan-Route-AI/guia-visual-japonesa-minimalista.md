La interfaz debería transmitir una mezcla de **Japón tradicional, calma visual y tecnología moderna**, evitando caer en una estética demasiado temática o recargada. Las referencias que has enviado tienen tres rasgos muy claros:

- fondos cálidos y claros;
- formas redondeadas y limpias;
- uso del rojo japonés como acento;
- ilustraciones inspiradas en el sol naciente, montañas, olas y arquitectura;
- mucho espacio en blanco;
- tipografía elegante y minimalista.

La dirección visual más adecuada sería algo parecido a:

> **Minimalismo japonés contemporáneo + aplicación de viajes premium.**

# 1. Concepto visual general

La app debería sentirse:

- tranquila;
- ordenada;
- elegante;
- visual;
- fácil de entender;
- con detalles japoneses sutiles.

No haría una interfaz llena de torii, cerezos, kanjis y dibujos japoneses en todas partes. Eso podría parecer una web temática o turística genérica.

Usaría esos recursos únicamente como elementos de identidad:

- un círculo rojo como sol;
- líneas de ondas;
- siluetas de montañas;
- pequeñas ilustraciones;
- patrones suaves inspirados en papel japonés;
- iconos finos.

La base sería moderna, no tradicional.

# 2. Paleta de colores

Tomando como referencia las imágenes, usaría esta paleta:

```css
:root {
    --color-fondo: #f7f2ee;
    --color-superficie: #fffdf9;
    --color-superficie-alt: #f1e7e2;

    --color-rojo: #c90032;
    --color-rojo-hover: #a9002a;
    --color-rojo-suave: #f5dce2;

    --color-negro: #1c1c1c;
    --color-texto: #2d2927;
    --color-texto-secundario: #77706c;

    --color-arena: #d8c2a8;
    --color-dorado: #b8925a;

    --color-borde: #e3d9d3;
    --color-sombra: rgba(60, 35, 25, 0.08);
}
```

## Uso de los colores

El rojo no debería ocupar grandes superficies.

Lo usaría para:

- botones principales;
- estados activos;
- puntos de ruta;
- iconos destacados;
- etiquetas;
- pequeños círculos decorativos.

El fondo principal sería un blanco cálido o beige muy claro.

El negro serviría para:

- texto principal;
- botones secundarios;
- cabecera;
- algunos contrastes.

El dorado o arena podría aparecer en:

- rutas premium;
- detalles del mapa;
- iconos;
- etiquetas culturales;
- fondos especiales.

# 3. Tipografía

Usaría una tipografía sans serif limpia para toda la interfaz.

Opciones adecuadas:

- Manrope;
- Inter;
- DM Sans;
- Noto Sans;
- Plus Jakarta Sans.

Para títulos especiales podrías usar una serif elegante:

- Noto Serif;
- Cormorant Garamond;
- Lora.

Una combinación bonita sería:

```css
font-family: "Manrope", sans-serif;
```

Y para títulos destacados:

```css
font-family: "Noto Serif", serif;
```

Por ejemplo:

```text
Planifica tu ruta por Japón
```

en serif suave, y el resto de la interfaz en sans serif.

No usaría una tipografía japonesa falsa o decorativa, porque puede dificultar la lectura y hacer que la app parezca menos profesional.

# 4. Estilo de los componentes

## Tarjetas

Las tarjetas deberían ser:

- blancas o beige muy claro;
- redondeadas;
- con sombras suaves;
- con bastante espacio interior;
- sin bordes muy marcados.

```css
.card {
    background: var(--color-superficie);
    border: 1px solid var(--color-borde);
    border-radius: 24px;
    padding: 20px;
    box-shadow: 0 12px 30px var(--color-sombra);
}
```

## Botones

Botón principal:

```css
.btn-principal {
    background: var(--color-negro);
    color: white;
    border: none;
    border-radius: 999px;
    padding: 14px 24px;
}
```

Podrías reservar el rojo para acciones importantes:

```css
.btn-destacado {
    background: var(--color-rojo);
}
```

Ejemplos:

- Planificar viaje;
- Generar ruta;
- Ver recomendación IA.

## Inputs

Los campos deberían ser grandes y táctiles:

```css
.input {
    width: 100%;
    border: 1px solid var(--color-borde);
    border-radius: 16px;
    padding: 14px 16px;
    background: white;
}
```

En móvil deberían tener una altura mínima cercana a 48 px.

# 5. Estructura general de la app

Yo dividiría la experiencia en cinco pantallas o bloques principales.

# Pantalla 1: bienvenida

En móvil:

```text
[Ilustración japonesa]

Planifica tu ruta ideal por Japón

Descubre qué ciudades visitar, cómo moverte
y por qué aeropuerto entrar y salir.

[Empezar]

Explorar ejemplo
```

Visualmente podría tener:

- un gran sol rojo;
- una silueta de montaña;
- una pagoda o skyline sencillo;
- ondas suaves;
- fondo claro.

No haría una pantalla de registro obligatoria. Para un proyecto académico, complica innecesariamente la experiencia.

# Pantalla 2: formulario de preferencias

No pondría todo el formulario de golpe.

Lo dividiría en pasos.

```text
Paso 1 de 4
Información del viaje
```

```text
Paso 2 de 4
¿Qué tipo de Japón quieres descubrir?
```

```text
Paso 3 de 4
Ritmo y preferencias
```

```text
Paso 4 de 4
Presupuesto y vuelos
```

Esto funcionará mucho mejor en móvil.

## Paso 1: datos básicos

- ciudad de salida;
- fechas;
- número de días;
- personas;
- presupuesto.

## Paso 2: intereses

Mostraría tarjetas seleccionables con icono:

```text
[⛩ Cultura]
[🍜 Gastronomía]
[🌿 Naturaleza]
[🌃 Grandes ciudades]
[🏯 Pueblos tradicionales]
[🎮 Anime y tecnología]
```

Al pulsarlas:

- cambian de fondo;
- aparece un borde rojo;
- se marca un pequeño círculo.

## Paso 3: estilo de viaje

Aquí usaría sliders:

```text
Tradicional ───────── Urbano
```

```text
Local ───────── Turístico
```

```text
Relajado ───────── Intenso
```

También:

```text
¿Quieres cambiar muchas veces de alojamiento?

Pocos cambios    Equilibrado    Me da igual
```

## Paso 4: transporte

- conducir: sí/no;
- prioridad: precio, rapidez o equilibrio;
- equipaje ligero o pesado;
- aeropuerto preferido, si tiene alguno.

# Pantalla 3: procesamiento

Mientras la app calcula, mostraría una pantalla breve:

```text
Estamos preparando tu ruta
```

Con una animación inspirada en:

- un círculo rojo;
- una línea de tren;
- puntos que conectan ciudades;
- ondas japonesas.

Mensajes dinámicos:

```text
Analizando tus preferencias...
Comparando ciudades...
Calculando la ruta...
Revisando vuelos...
Preparando la recomendación IA...
```

# Pantalla 4: resultados

Esta sería la pantalla más importante.

En móvil, los resultados deberían estar organizados en bloques verticales.

## Cabecera del resultado

```text
Tu viaje ideal por Japón

12 días · Ritmo equilibrado
Cultura · Gastronomía · Naturaleza
```

Debajo:

```text
Osaka → Nara → Kioto → Kanazawa → Tokio
```

Con una línea horizontal o vertical con puntos.

## Recomendación principal

Una tarjeta destacada:

```text
Ruta recomendada

Entrada: Osaka
Salida: Tokio

Esta opción reduce desplazamientos y evita
tener que volver al punto inicial.
```

Podría tener un círculo rojo grande de fondo, como en tus referencias.

## Comparación de vuelos

Tres tarjetas:

```text
Más económico
730 €
19 h · 2 escalas
```

```text
Más rápido
910 €
15 h · 1 escala
```

```text
Recomendado por IA
910 €
Mejor equilibrio
```

En móvil aparecerían en carrusel horizontal o una debajo de otra.

En escritorio, en tres columnas.

## Mapa

Un mapa sencillo con:

- círculos numerados;
- línea roja;
- ciudades;
- aeropuerto de entrada;
- aeropuerto de salida.

Evitaría llenar el mapa de iconos.

Los marcadores podrían ser:

```text
1 Osaka
2 Kioto
3 Kanazawa
4 Tokio
```

## Itinerario

En móvil, usaría acordeones:

```text
Día 1 · Osaka
Día 2 · Osaka
Día 3 · Nara
Día 4 · Kioto
```

Al abrir cada día:

- actividades;
- transporte;
- duración;
- recomendación;
- consejo IA.

## Transportes

Tarjetas compactas:

```text
Osaka → Nara
45 min
Tren regional
```

```text
Kioto → Kanazawa
2 h 10 min
Limited Express + Shinkansen
```

## Presupuesto

Podría mostrarse como una barra o resumen:

```text
Vuelos          910 €
Alojamiento     720 €
Transporte      310 €
Comida          480 €
Actividades     180 €

Total estimado  2.600 €
```

# Pantalla 5: modificar ruta

La app debería permitir cambiar algunos datos sin empezar de nuevo.

Por ejemplo:

```text
Haz la ruta más barata
Reduce ciudades
Añade más naturaleza
Quiero menos cambios de hotel
Cambia Tokio por Hiroshima
```

Esto podría aparecer como botones rápidos.

No hace falta crear un chat completo. Basta con acciones predefinidas y una caja opcional de texto.

# 6. Navegación móvil

En móvil usaría una navegación inferior:

```text
Inicio
Planificar
Ruta
Guardados
```

Pero para la primera versión podría reducirse a:

```text
Inicio
Mi viaje
```

También podrías tener una barra superior sencilla:

```text
Japan Route AI        Menú
```

La barra inferior debería aparecer solo cuando ya exista una ruta generada.

# 7. Diseño para escritorio

En escritorio no ampliaría simplemente el móvil.

Reorganizaría la información en columnas.

## Formulario

```text
┌───────────────────────┬───────────────────────┐
│ Explicación visual    │ Formulario             │
│                       │                        │
│ Ilustración Japón     │ Preferencias           │
│ Texto introductorio   │ Intereses              │
│                       │ Presupuesto             │
└───────────────────────┴───────────────────────┘
```

## Resultados

```text
┌──────────────────────────────────────────────┐
│ Resumen de la ruta                          │
└──────────────────────────────────────────────┘

┌───────────────────────┬──────────────────────┐
│ Mapa                  │ Recomendación IA     │
│                       │ Vuelos               │
│                       │ Presupuesto          │
└───────────────────────┴──────────────────────┘

┌──────────────────────────────────────────────┐
│ Itinerario por días                         │
└──────────────────────────────────────────────┘
```

Otra opción:

- 60% mapa;
- 40% resumen y vuelos;
- itinerario debajo.

# 8. Responsive y mobile first

Empezaría diseñando para unos 360–390 px.

## Móvil

- una columna;
- botones a ancho completo;
- campos grandes;
- tarjetas apiladas;
- mapa de 300–350 px de altura;
- pestañas o acordeones;
- márgenes laterales de 16–20 px.

## Tablet

- formulario en dos columnas;
- tarjetas de vuelos en dos columnas;
- mapa más ancho.

## Escritorio

- ancho máximo de 1200–1280 px;
- dos columnas;
- mapa y resultados simultáneos;
- tarjetas de vuelo en tres columnas.

Breakpoints orientativos:

```css
@media (min-width: 768px) {
    /* tablet */
}

@media (min-width: 1024px) {
    /* escritorio */
}
```

# 9. Detalles visuales japoneses

Usaría detalles como:

## Sol rojo

Un círculo rojo detrás de:

- títulos;
- tarjetas importantes;
- ilustraciones;
- recomendación IA.

## Ondas

Líneas horizontales finas para:

- separadores;
- pie de página;
- cargador;
- transición entre secciones.

## Papel japonés

Una textura extremadamente sutil en el fondo.

No debería dificultar la lectura.

## Kanji

Solo como detalle secundario, por ejemplo:

```text
旅
Viaje
```

o:

```text
日本
Japón
```

Pero nunca como información principal, salvo que añadas traducción.

## Ilustraciones

Preferiría ilustraciones planas y modernas:

- Fuji;
- pagoda;
- olas;
- tren bala;
- edificios de Tokio;
- torii.

Todas deberían seguir el mismo estilo.

# 10. Iconografía

Los iconos deberían ser lineales y sencillos.

Ejemplos:

- avión;
- tren;
- templo;
- montaña;
- comida;
- calendario;
- maleta;
- mapa;
- presupuesto.

No mezclaría iconos realistas, emojis e iconos lineales en la misma interfaz.

Puedes usar emojis durante el prototipo, pero en la versión final sería mejor usar una librería de iconos consistente, como Lucide Icons.

# 11. Animaciones

Las animaciones deberían ser suaves:

- aparición de tarjetas;
- transición entre pasos;
- dibujo progresivo de la ruta;
- puntos del mapa que aparecen uno a uno;
- botón con pequeño estado de carga.

Evitaría:

- rebotes;
- elementos muy rápidos;
- animaciones constantes;
- fondos en movimiento.

Ejemplo:

```css
.card {
    animation: aparecer 0.4s ease;
}

@keyframes aparecer {
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

# 12. Wireframe móvil propuesto

```text
┌──────────────────────────┐
│ Japan Route AI       ☰   │
│                          │
│        ●                 │
│     ilustración          │
│                          │
│ Planifica tu ruta ideal  │
│ por Japón                │
│                          │
│ Viajes pensados según    │
│ tus intereses, tiempo    │
│ y presupuesto.           │
│                          │
│ [ Empezar planificación ]│
└──────────────────────────┘
```

Formulario:

```text
┌──────────────────────────┐
│ ←    Paso 2 de 4         │
│                          │
│ ¿Qué quieres descubrir?  │
│                          │
│ [ Cultura ] [ Naturaleza]│
│ [ Anime   ] [ Comida    ]│
│ [ Templos ] [ Compras   ]│
│                          │
│ Tradicional      Urbano  │
│ ●───────────────○        │
│                          │
│ [ Continuar ]            │
└──────────────────────────┘
```

Resultados:

```text
┌──────────────────────────┐
│ Tu ruta por Japón        │
│ 12 días · Equilibrado    │
│                          │
│ Osaka                    │
│   ↓                      │
│ Kioto                    │
│   ↓                      │
│ Kanazawa                 │
│   ↓                      │
│ Tokio                    │
│                          │
│ [ Ver mapa ]             │
│                          │
│ Recomendación IA         │
│ Entrar por Osaka y salir │
│ por Tokio evita volver   │
│ hacia atrás.             │
│                          │
│ Vuelo recomendado        │
│ 910 € · 15 h             │
│                          │
│ [ Ver itinerario ]       │
└──────────────────────────┘
```

# 13. Estilo final que te recomiendo

La mejor mezcla sería:

- fondos marfil;
- rojo intenso como acento;
- negro carbón;
- beige y dorado suave;
- tarjetas blancas;
- bordes muy redondeados;
- ilustraciones planas;
- mucho espacio;
- iconos lineales;
- títulos elegantes;
- detalles de sol y ondas.

Visualmente debería parecer una mezcla entre:

> una app de viaje premium, una editorial japonesa y una interfaz moderna de planificación.

La clave es que la estética japonesa aparezca en la **composición y los detalles**, no en recargar toda la interfaz con símbolos.
