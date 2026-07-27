
/* Japan Route AI
   Integración con servicios externos */

/*
    * 1. consultar Ollama;
    * 2. consultar el backend de Amadeus;
    * 3. cargar vuelos de demostración;
    * 4. gestionar errores de los servicios.
    */



/* CONFIGURACIÓN DE OLLAMA */

const URL_OLLAMA = "http://127.0.0.1:11434/api/generate";

const MODELO_OLLAMA = "qwen3:4b-instruct";

const TIEMPO_MAXIMO_OLLAMA = 60000;


/* PREPARACIÓN DE DATOS */

/* Devuelve únicamente los datos necesarios para la explicación. */
function prepararContextoIA(
    resultadoViaje,
) {
    return {
        duracionDias:
            resultadoViaje.resumen
                .duracionDias,

        numeroViajeros:
            resultadoViaje.preferencias
                .numeroViajeros,

        presupuestoPorPersona:
            resultadoViaje.preferencias
                .presupuestoPorPersona,

        nivelPresupuesto:
            resultadoViaje.preferencias
                .nivelPresupuesto,

        intereses:
            [
                ...resultadoViaje
                    .preferencias
                    .intereses,
            ],

        ritmoViaje:
            resultadoViaje.preferencias
                .ritmoViaje,

        tipoExperiencia:
            resultadoViaje.preferencias
                .tipoExperiencia,

        prioridadVuelo:
            resultadoViaje.preferencias
                .prioridadVuelo,

        sentidoRuta:
            resultadoViaje.resumen
                .sentidoRuta,

        aeropuertoEntrada: {
            codigo:
                resultadoViaje
                    .aeropuertos
                    .entrada
                    .codigo,

            ciudadReferencia:
                resultadoViaje
                    .aeropuertos
                    .entrada
                    .ciudadReferencia,
        },

        aeropuertoSalida: {
            codigo:
                resultadoViaje
                    .aeropuertos
                    .salida
                    .codigo,

            ciudadReferencia:
                resultadoViaje
                    .aeropuertos
                    .salida
                    .ciudadReferencia,
        },

        motivoAeropuertos:
            resultadoViaje.aeropuertos
                .motivo,

        ciudades:
            resultadoViaje.ciudades.map(
                function (ciudad) {
                    return {
                        nombre:
                            ciudad.nombre,

                        diasAsignados:
                            ciudad.diasAsignados,

                        diaInicio:
                            ciudad.diaInicio,

                        diaFin:
                            ciudad.diaFin,

                        puntuacion:
                            ciudad.puntuacion,

                        motivosPuntuacion:
                            [
                                ...ciudad
                                    .motivosPuntuacion,
                            ],
                    };
                },
            ),

        transportes:
            resultadoViaje.transportes.map(
                function (transporte) {
                    return {
                        origen:
                            transporte.nombreOrigen,

                        destino:
                            transporte.nombreDestino,

                        medio:
                            transporte.medio,

                        duracionMinutos:
                            transporte.duracionMinutos,

                        transbordos:
                            transporte.transbordos,

                        disponible:
                            transporte.disponible,
                    };
                },
            ),

        avisos:
            [
                ...resultadoViaje.avisos,
            ],
    };
}


/* CONSTRUCCIÓN DEL PROMPT */

/* Construye el prompt utilizando datos controlados por JavaScript. */
function construirPromptExplicacion(
    contextoIA,
) {
    return `
Actúa como un asistente especializado en planificación de viajes por Japón.

Tu tarea es explicar una ruta que ya ha sido calculada y validada por una aplicación JavaScript.

REGLAS OBLIGATORIAS:

- Responde en castellano.
- Escribe con ortografía española correcta, incluyendo todas las tildes necesarias.
- Evita frases promocionales o genéricas.
- No cambies ninguna ciudad.
- No cambies el orden de la ruta.
- No cambies los días asignados.
- No inventes precios, horarios, vuelos, actividades ni transportes.
- No contradigas los datos recibidos.
- No afirmes que se han realizado reservas.
- No utilices Markdown.
- No incluyas títulos dentro de los textos.
- No menciones que eres un modelo de lenguaje.
- Utiliza un tono claro, cercano y profesional.
- Explica de forma breve y concreta.
- Devuelve únicamente un objeto JSON válido.

El JSON debe contener exactamente:

{
    "titulo": "Una frase breve de máximo 8 palabras",
    "resumen": "Un párrafo breve de máximo 45 palabras",
    "motivos": [
        "Primer motivo de máximo 30 palabras",
        "Segundo motivo de máximo 30 palabras",
        "Tercer motivo de máximo 30 palabras"
    ],
    "consejo": "Un consejo práctico de máximo 35 palabras"
}

DATOS VALIDADOS DEL VIAJE:

${JSON.stringify(
    contextoIA,
    null,
    2,
)}
`;
}


/* VALIDACIÓN DE LA RESPUESTA */

/* Comprueba que Ollama ha devuelto la estructura solicitada. */
function validarExplicacionIA(
    explicacion,
) {
    if (
        !explicacion ||
        typeof explicacion !== "object"
    ) {
        return false;
    }

    if (
        typeof explicacion.titulo !== "string" ||
        explicacion.titulo.trim() === ""
    ) {
        return false;
    }

    if (
        typeof explicacion.resumen !== "string" ||
        explicacion.resumen.trim() === ""
    ) {
        return false;
    }

    if (
        !Array.isArray(
            explicacion.motivos,
        ) ||
        explicacion.motivos.length !== 3 ||
        explicacion.motivos.some(
            function (motivo) {
                return (
                    typeof motivo !== "string" ||
                    motivo.trim() === ""
                );
            },
        )
    ) {
        return false;
    }

    if (
        typeof explicacion.consejo !== "string" ||
        explicacion.consejo.trim() === ""
    ) {
        return false;
    }

    return true;
}


/* ERRORES DE OLLAMA */

/* Devuelve un mensaje comprensible según el error recibido. */
function crearErrorOllama(
    response,
    datosError,
) {
    if (response.status === 404) {
        return new Error(
            `No se ha encontrado el modelo ${MODELO_OLLAMA} en Ollama.`,
        );
    }

    if (
        datosError &&
        typeof datosError.error === "string"
    ) {
        return new Error(
            datosError.error,
        );
    }

    return new Error(
        `Ollama ha respondido con el estado ${response.status}.`,
    );
}


/* GENERACIÓN CON OLLAMA */

/* Solicita a Qwen una explicación estructurada del resultado. */
export async function generarExplicacionIA(
    resultadoViaje,
) {
    if (
        !resultadoViaje ||
        !Array.isArray(
            resultadoViaje.ciudades,
        ) ||
        resultadoViaje.ciudades.length === 0
    ) {
        throw new Error(
            "No se puede generar una explicación sin un viaje válido.",
        );
    }

    const controlador =
        new AbortController();

    const temporizador =
        setTimeout(
            function () {
                controlador.abort();
            },
            TIEMPO_MAXIMO_OLLAMA,
        );

    try {
        const contextoIA =
            prepararContextoIA(
                resultadoViaje,
            );

        const prompt =
            construirPromptExplicacion(
                contextoIA,
            );

        const response =
            await fetch(
                URL_OLLAMA,
                {
                    method:
                        "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                            model: MODELO_OLLAMA,
                            prompt: prompt,
                            stream: false,
                            format: {
                                type:
                                    "object",

                                properties: {
                                    titulo: {
                                        type:
                                            "string",
                                    },

                                    resumen: {
                                        type:
                                            "string",
                                    },

                                    motivos: {
                                        type:
                                            "array",

                                        items: {
                                            type:
                                                "string",
                                        },

                                        minItems:
                                            3,

                                        maxItems:
                                            3,
                                    },

                                    consejo: {
                                        type:
                                            "string",
                                    },
                                },

                                required: [
                                    "titulo",
                                    "resumen",
                                    "motivos",
                                    "consejo",
                                ],
                            },

                            options: {
                                temperature:
                                    0.3,

                                num_predict:
                                    350,
                            },

                            keep_alive:
                                "5m",
                        }),

                    signal:
                        controlador.signal,
                },
            );

        if (!response.ok) {
            let datosError = null;

            try {
                datosError =
                    await response.json();
            } catch {
                datosError = null;
            }

            throw crearErrorOllama(
                response,
                datosError,
            );
        }

        const datosRespuesta =
            await response.json();

        if (
            typeof datosRespuesta.response !==
            "string" ||
            datosRespuesta.response.trim() === ""
        ) {
            throw new Error(
                "Qwen ha devuelto una respuesta vacía.",
            );
        }

        let explicacion;

        try {
            explicacion = 
                JSON.parse(
                    datosRespuesta.response,
                );
        } catch {
            throw new Error(
                "Qwen no ha devuelto un JSON válido.",
            );
        }

        if (
            !validarExplicacionIA(
                explicacion,
            )
        ) {
            throw new Error(
                "La explicación generada no contiene la estructura esperada.",
            );
        }

        return {
            disponible:
                true,

            modelo:
                MODELO_OLLAMA,

            origen:
                "ollama-local",

            titulo:
                explicacion.titulo.trim(),

            resumen:
                explicacion.resumen.trim(),

            motivos:
                explicacion.motivos.map(
                    function (motivo) {
                        return motivo.trim();
                    },
                ),

            consejo:
                explicacion.consejo.trim(),
        };
    } catch (error) {
        if (
            error.name === "AbortError"
        ) {
            throw new Error(
                "Qwen ha tardado demasiado en responder.",
            );
        }

        if (
            error instanceof TypeError
        ) {
            throw new Error(
                "No se ha podido conectar con Ollama. Comprueba que esté abierto.",
            );
        }

        throw error;
    } finally {
        clearTimeout(
            temporizador,
        );
    }
}




/* TIPO DE CAMBIO EUR / JPY */

const URL_TIPO_CAMBIO = "https://api.frankfurter.dev/v2/rate/EUR/JPY";

/* Valor fijo utilizado únicamente si la API no responde. */
const TIPO_CAMBIO_RESPALDO =  185;


/* Comprueba que la respuesta contiene una tasa válida. */
function validarTipoCambio(datosCambio) {
    return (
        datosCambio &&
        typeof datosCambio === "object" &&
        datosCambio.base === "EUR" &&
        datosCambio.quote === "JPY" &&
        typeof datosCambio.rate === "number" &&
        datosCambio.rate > 0
    );
}


/* Devuelve un cambio local para que el presupuesto pueda calcularse. */
function crearTipoCambioRespaldo(error) {
    console.warn(
        "Se utilizará el tipo de cambio local de respaldo:",
        error,
    );

    return {
        disponible:
            true,

        origenDatos:
            "local-respaldo",

        esRespaldo:
            true,

        base:
            "EUR",

        destino:
            "JPY",

        yenesPorEuro:
            TIPO_CAMBIO_RESPALDO,

        fecha:
            null,

        aviso:
            "No se ha podido consultar el cambio actual. Se utiliza una conversión local orientativa.",
    };
}


/* Consulta el cambio EUR/JPY y aplica respaldo si la API falla. */
export async function obtenerTipoCambioEURJPY() {
    try {
        const response =
            await fetch(
                URL_TIPO_CAMBIO,
            );

        if (!response.ok) {
            throw new Error(
                `La API de divisas ha respondido con el estado ${response.status}.`,
            );
        }

        const datosCambio =
            await response.json();

        if (
            !validarTipoCambio(
                datosCambio,
            )
        ) {
            throw new Error(
                "La API de divisas ha devuelto datos incorrectos.",
            );
        }

        return {
            disponible:
                true,

            origenDatos:
                "frankfurter",

            esRespaldo:
                false,

            base:
                datosCambio.base,

            destino:
                datosCambio.quote,

            yenesPorEuro:
                datosCambio.rate,

            fecha:
                datosCambio.date,

            aviso:
                "Conversión calculada con el tipo de cambio consultado mediante Frankfurter.",
        };
    } catch (error) {
        return crearTipoCambioRespaldo(
            error,
        );
    }
}