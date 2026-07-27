// Japan Route AI
// Archivo principal de la aplicación

import {inicializarFormulario} from "./formulario.js";

import {cargarCiudades, cargarConexiones, cargarVuelosLocales} from "./datos.js";

import {puntuarCiudades, calcularCantidadDestinos, seleccionarCiudades, ordenarRuta, recomendarAeropuertos, obtenerTransportesRuta, distribuirDiasRuta, crearResultadoViaje, compararVuelos, calcularPresupuestoViaje} from "./algoritmo.js";

import {renderizarResultadoViaje, renderizarError, volverAlPlanificador, renderizarExplicacionIA, renderizarErrorExplicacionIA, renderizarVuelos, renderizarErrorVuelos, renderizarPresupuesto} from "./render.js";

import {generarExplicacionIA, obtenerTipoCambioEURJPY} from "./servicios.js";


// GESTIÓN PRINCIPAL

/* Recibe las preferencias y carga los datos necesarios. */
async function procesarPreferencias(preferenciasViaje) {
    try {
        console.log("Preferencias del viaje:", preferenciasViaje);

        const ciudades = await cargarCiudades();

        const conexiones =  await cargarConexiones();

        console.log("Conexiones cargadas:", conexiones);

        console.log("Ciudades cargadas:", ciudades);

        const ciudadesPuntuadas =
            puntuarCiudades(
                ciudades,
                preferenciasViaje,
            );

        console.log(
            "Ciudades puntuadas:",
            
            ciudadesPuntuadas,
        );

        console.table(
            ciudadesPuntuadas.map(
                function (ciudad) {
                    return {
                        ciudad: ciudad.nombre,
                        puntuacion:
                            ciudad.puntuacion,
                        motivos:
                            ciudad.motivosPuntuacion
                                .join(" | "),
                    };
                },
            ),
        );

        const cantidadDestinos = calcularCantidadDestinos(preferenciasViaje);

        console.log("Cantidad de destinos:", cantidadDestinos);

        const ciudadesSeleccionadas =
            seleccionarCiudades(
                ciudadesPuntuadas,
                preferenciasViaje,
            );

        console.log(
            "Ciudades seleccionadas:",
            ciudadesSeleccionadas,
        );

        console.table(
            ciudadesSeleccionadas.map(
                function (ciudad, indice) {
                    return {
                        ordenSeleccion:
                            indice + 1,

                        ciudad:
                            ciudad.nombre,

                        puntuacion:
                            ciudad.puntuacion,

                        diasMinimos:
                            ciudad.diasMinimos,

                        diasRecomendados:
                            ciudad.diasRecomendados,
                    };
                },
            ),
        );

        const resultadoRuta =
        ordenarRuta(
            ciudadesSeleccionadas,
        );

        console.log(
            "Sentido de la ruta:",
            resultadoRuta.sentido,
        );

        console.log(
            "Ruta ordenada:",
            resultadoRuta.ciudades,
        );

        console.table(
            resultadoRuta.ciudades.map(
                function (ciudad, indice) {
                    return {
                        parada:
                            indice + 1,

                        ciudad:
                            ciudad.nombre,

                        ordenGeografico:
                            ciudad.ordenGeografico,

                        puntuacion:
                            ciudad.puntuacion,
                    };
                },
            ),
        );

        const aeropuertosRecomendados =
            recomendarAeropuertos(
                resultadoRuta.ciudades,
                preferenciasViaje,
            );

        console.log(
            "Aeropuertos recomendados:",
            aeropuertosRecomendados,
        );

        const transportesRuta =  obtenerTransportesRuta(resultadoRuta.ciudades, conexiones);

        console.log(
            "Transportes de la ruta:",
            transportesRuta,
        );

        console.table(
            transportesRuta.map(
                function (
                    transporte,
                    indice,
                ) {
                    return {
                        trayecto:
                            indice + 1,

                        recorrido:
                            `${transporte.nombreOrigen} → ${transporte.nombreDestino}`,

                        estaciones:
                            `${transporte.estacionOrigen} → ${transporte.estacionDestino}`,

                        medio:
                            transporte.medio,

                        duracionMinutos:
                            transporte.duracionMinutos,

                        precioAproximadoYenes:
                            transporte.precioAproximadoYenes,

                        transbordos:
                            transporte.transbordos,

                        disponible:
                            transporte.disponible,

                        sentidoInverso:
                            transporte
                                .conexionEnSentidoInverso,

                        tipoDato:
                            transporte.tipoDato,
                    };
                },
            ),
        );

        const rutaConDias =
            distribuirDiasRuta(
                resultadoRuta.ciudades,
                preferenciasViaje,
            );

        console.log(
            "Distribución de días:",
            rutaConDias,
        );

        console.table(
            rutaConDias.map(
                function (ciudad, indice) {
                    let periodo;

                    if (ciudad.diaInicio === ciudad.diaFin) {
                        periodo = `Día ${ciudad.diaInicio}`;
                    } else {
                        periodo =
                            `Días ${ciudad.diaInicio}-${ciudad.diaFin}`;
                    }

                    return {
                        parada:
                            indice + 1,

                        ciudad:
                            ciudad.nombre,

                        puntuacion:
                            ciudad.puntuacion,

                        diasMinimos:
                            ciudad.diasMinimos,

                        diasRecomendados:
                            ciudad.diasRecomendados,

                        diasAsignados:
                            ciudad.diasAsignados,

                        periodo:
                            periodo,
                    };
                },
            ),
        );

        // comprobacion visible ----
        const totalDiasAsignados = rutaConDias.reduce(
                function (total, ciudad) {
                    return (
                        total +
                        ciudad.diasAsignados
                    );
                },
                0,
            );

        console.log(
            "Total de días asignados:",
            totalDiasAsignados,
        );

        // Resultados viaje

        const resultadoViaje = crearResultadoViaje(
                preferenciasViaje,
                resultadoRuta,
                aeropuertosRecomendados,
                rutaConDias,
                transportesRuta,
            );

        console.log(
            "Resultado completo del viaje:",
            resultadoViaje,
        );

        // fase 12 ???
        resultadoViaje.vuelos = comparacionVuelos;

        // tabla comprobacion vidual:
        console.table([
            {
                duracionDias:
                    resultadoViaje.resumen
                        .duracionDias,

                diasAsignados:
                    resultadoViaje.resumen
                        .diasAsignados,

                cantidadDestinos:
                    resultadoViaje.resumen
                        .cantidadDestinos,

                cantidadTransportes:
                    resultadoViaje.resumen
                        .cantidadTransportes,

                sentidoRuta:
                    resultadoViaje.resumen
                        .sentidoRuta,

                duracionTransportesMinutos:
                    resultadoViaje.resumen
                        .duracionTransportesMinutos,

                precioTransportesPorPersona:
                    resultadoViaje.resumen
                        .precioTransportesYenesPorPersona,

                precioTransportesTotal:
                    resultadoViaje.resumen
                        .precioTransportesYenesTotal,
            },
        ]);

        console.log(
            "Avisos del viaje:",
            resultadoViaje.avisos,
        );

        renderizarResultadoViaje(
            resultadoViaje,
        );

        /* COMPARACIÓN DE VUELOS */
        try {
            const vuelosLocales =
                await cargarVuelosLocales();

            const comparacionVuelos =
                compararVuelos(
                    vuelosLocales,
                    preferenciasViaje,
                    aeropuertosRecomendados,
                );

            resultadoViaje.vuelos =
                comparacionVuelos;

            renderizarVuelos(
                comparacionVuelos,
            );

            console.log(
                "Comparación de vuelos:",
                comparacionVuelos,
            );
        } catch (errorVuelos) {
            resultadoViaje.vuelos = {
                disponible:
                    false,

                origenDatos:
                    "local-respaldo",

                error:
                    errorVuelos.message,
            };

            renderizarErrorVuelos(
                errorVuelos,
            );
        }

        /* ESTIMACIÓN DE PRESUPUESTO */

        const tipoCambio =
            await obtenerTipoCambioEURJPY();

        resultadoViaje.divisa =
            tipoCambio;

        const presupuestoEstimado =
            calcularPresupuestoViaje(
                resultadoViaje,
                tipoCambio,
            );

        resultadoViaje.presupuesto =
            presupuestoEstimado;

        renderizarPresupuesto(
            presupuestoEstimado,
        );

        console.log(
            "Tipo de cambio EUR/JPY:",
            tipoCambio,
        );

        console.log(
            "Presupuesto estimado:",
            presupuestoEstimado,
        );

        /* EXPLICACIÓN DE IA */
        try {
            const explicacionIA =
                await generarExplicacionIA(
                    resultadoViaje,
                );

            resultadoViaje.ia =
                explicacionIA;

            renderizarExplicacionIA(
                explicacionIA,
            );

            console.log(
                "Explicación generada por Qwen:",
                explicacionIA,
            );
            
        } catch (errorIA) {
            resultadoViaje.ia = {
                disponible:
                    false,

                modelo:
                    "qwen2.5:3b",

                origen:
                    "ollama-local",

                error:
                    errorIA.message,
            };

            renderizarErrorExplicacionIA(
                errorIA,
            );
        }

        /*
            * En las siguientes fases esta parte llamará a:
            *
            * 1. distribuir los días;
            * 2. crear el resultado completo;
            * 3. renderizar los resultados.
            */

    } catch (error) {
        console.error("No se ha podido procesar el viaje:", error);
        renderizarError(error);
    }
}



/* ACCIONES DE LOS RESULTADOS */

const btnModificarPreferencias = document.querySelector("#btnModificarPreferencias");

btnModificarPreferencias.addEventListener("click", function () {
    volverAlPlanificador();
});



/* INICIALIZACIÓN */

inicializarFormulario(procesarPreferencias);

