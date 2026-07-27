/* Japan Route AI
   Creación y actualización del mapa con Leaflet */


/* REFERENCIAS Y VARIABLES */

const contenedorMapa =
    document.querySelector(
        "#mapaRuta",
    );

let mapa = null;
let capaRuta = null;


/* VALIDACIÓN */

/* Comprueba que una ciudad tenga coordenadas válidas. */
function tieneCoordenadasValidas(ciudad) {
    if (
        !ciudad ||
        !ciudad.coordenadas
    ) {
        return false;
    }

    const latitud =
        ciudad.coordenadas.latitud;

    const longitud =
        ciudad.coordenadas.longitud;

    return (
        typeof latitud === "number" &&
        typeof longitud === "number" &&
        latitud >= -90 &&
        latitud <= 90 &&
        longitud >= -180 &&
        longitud <= 180
    );
}


/* PREPARACIÓN DEL MAPA */

/* Crea el mapa la primera vez que se necesita. */
function inicializarMapa() {
    if (typeof L === "undefined") {
        throw new Error(
            "Leaflet no se ha cargado correctamente.",
        );
    }

    if (!contenedorMapa) {
        throw new Error(
            "No se ha encontrado el contenedor del mapa.",
        );
    }

    if (mapa) {
        return mapa;
    }

    contenedorMapa.classList.remove(
        "mapa-ruta--error",
    );

    contenedorMapa.innerHTML = "";

    mapa = L.map(
        contenedorMapa,
        {
            zoomControl: true,
            scrollWheelZoom: false,
        },
    );

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
    ).addTo(mapa);

    capaRuta =
        L.layerGroup().addTo(mapa);

    return mapa;
}


/* Elimina los marcadores y líneas de la ruta anterior. */
function limpiarMapa() {
    if (capaRuta) {
        capaRuta.clearLayers();
    }
}


/* MARCADORES */

/* Crea un marcador numerado personalizado. */
function crearIconoMarcador(numero) {
    return L.divIcon({
        className:
            "marcador-ruta",

        html:
            `<span>${numero}</span>`,

        iconSize:
            [36, 36],

        iconAnchor:
            [18, 18],

        popupAnchor:
            [0, -20],
    });
}


/* Crea el contenido del popup de una ciudad. */
function crearContenidoPopup(
    ciudad,
    numeroParada,
) {
    const contenedor =
        document.createElement("div");

    contenedor.className =
        "popup-ciudad";

    const etiqueta =
        document.createElement("small");

    etiqueta.textContent =
        `Parada ${numeroParada}`;

    const titulo =
        document.createElement("strong");

    titulo.textContent =
        `${ciudad.nombre} · ${ciudad.nombreJapones}`;

    const periodo =
        document.createElement("span");

    if (
        ciudad.diaInicio ===
        ciudad.diaFin
    ) {
        periodo.textContent =
            `Día ${ciudad.diaInicio}`;
    } else {
        periodo.textContent =
            `Días ${ciudad.diaInicio}-${ciudad.diaFin}`;
    }

    const duracion =
        document.createElement("span");

    duracion.textContent =
        ciudad.diasAsignados === 1
            ? "1 día asignado"
            : `${ciudad.diasAsignados} días asignados`;

    contenedor.append(
        etiqueta,
        titulo,
        periodo,
        duracion,
    );

    return contenedor;
}


/* Añade al mapa los marcadores de todas las ciudades. */
function añadirMarcadores(
    ciudades,
) {
    ciudades.forEach(
        function (ciudad, indice) {
            const coordenadas = [
                ciudad.coordenadas.latitud,
                ciudad.coordenadas.longitud,
            ];

            const marcador =
                L.marker(
                    coordenadas,
                    {
                        icon:
                            crearIconoMarcador(
                                indice + 1,
                            ),

                        title:
                            `${indice + 1}. ${ciudad.nombre}`,
                    },
                );

            marcador.bindPopup(
                crearContenidoPopup(
                    ciudad,
                    indice + 1,
                ),
            );

            marcador.addTo(
                capaRuta,
            );
        },
    );
}


/* LÍNEA DE LA RUTA */

/* Dibuja una línea entre las ciudades según el orden de la ruta. */
function dibujarLineaRuta(
    ciudades,
) {
    const coordenadasRuta =
        ciudades.map(
            function (ciudad) {
                return [
                    ciudad.coordenadas.latitud,
                    ciudad.coordenadas.longitud,
                ];
            },
        );

    const colorRojo =
        getComputedStyle(
            document.documentElement,
        )
            .getPropertyValue(
                "--color-rojo",
            )
            .trim() || "#c90032";

    const lineaRuta =
        L.polyline(
            coordenadasRuta,
            {
                color:
                    colorRojo,

                weight:
                    4,

                opacity:
                    0.8,

                dashArray:
                    "8 8",

                lineCap:
                    "round",

                lineJoin:
                    "round",
            },
        );

    lineaRuta.addTo(
        capaRuta,
    );

    return lineaRuta;
}


/* RENDERIZADO PRINCIPAL */

/* Representa las ciudades y la ruta en el mapa. */
export function renderizarMapaRuta(
    ciudades,
) {
    if (
        !Array.isArray(ciudades) ||
        ciudades.length === 0
    ) {
        throw new Error(
            "No se puede mostrar un mapa sin ciudades.",
        );
    }

    const ciudadesValidas =
        ciudades.filter(
            tieneCoordenadasValidas,
        );

    if (
        ciudadesValidas.length !==
        ciudades.length
    ) {
        throw new Error(
            "Una o más ciudades no tienen coordenadas válidas.",
        );
    }

    const mapaRuta =
        inicializarMapa();

    limpiarMapa();

    añadirMarcadores(
        ciudadesValidas,
    );

    const lineaRuta =
        dibujarLineaRuta(
            ciudadesValidas,
        );

    requestAnimationFrame(
        function () {
            mapaRuta.invalidateSize({
                pan: false,
            });

            mapaRuta.fitBounds(
                lineaRuta.getBounds(),
                {
                    padding:
                        [45, 45],

                    maxZoom:
                        8,
                },
            );
        },
    );
}