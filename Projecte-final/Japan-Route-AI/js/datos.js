/* Japan Route AI
   Carga y validación de datos 
*/

/*
    * 1. cargar ciudades.json;
    * 2. cargar conexiones.json;
    * 3. validar los datos recibidos;
    * 4. gestionar errores de carga.
*/

/* RUTAS DE LOS ARCHIVOS */

const RUTA_CIUDADES = "./data/ciudades.json";

const RUTA_CONEXIONES = "./data/conexiones.json";

const RUTA_VUELOS = "./data/vuelos.json";

// VALIDACIÓN DE DATOS

/* VALIDACIÓN DE CIUDADES */

/* Comprueba que una ciudad contiene las propiedades necesarias. */
function validarCiudad(ciudad) {
    if (
        !ciudad ||
        typeof ciudad !== "object"
    ) {
        return false;
    }

    if (
        typeof ciudad.id !== "string" ||
        ciudad.id.trim() === ""
    ) {
        return false;
    }

    if (
        typeof ciudad.nombre !== "string" ||
        ciudad.nombre.trim() === ""
    ) {
        return false;
    }

    if (
        typeof ciudad.nombreInternacional !== "string" ||
        ciudad.nombreInternacional.trim() === ""
    ) {
        return false;
    }

    if (
        typeof ciudad.nombreJapones !== "string" ||
        ciudad.nombreJapones.trim() === ""
    ) {
        return false;
    }

    if (
        typeof ciudad.prefectura !== "string" ||
        ciudad.prefectura.trim() === ""
    ) {
        return false;
    }

    if (
        typeof ciudad.zona !== "string" ||
        ciudad.zona.trim() === ""
    ) {
        return false;
    }

    if (
        typeof ciudad.ordenGeografico !== "number"
    ) {
        return false;
    }

    if (
        !ciudad.coordenadas ||
        typeof ciudad.coordenadas !== "object"
    ) {
        return false;
    }

    const latitud =
        ciudad.coordenadas.latitud;

    const longitud =
        ciudad.coordenadas.longitud;

    if (
        typeof latitud !== "number" ||
        latitud < -90 ||
        latitud > 90 ||
        typeof longitud !== "number" ||
        longitud < -180 ||
        longitud > 180 ||
        typeof ciudad.coordenadas.tipoPunto !== "string" ||
        ciudad.coordenadas.tipoPunto.trim() === ""
    ) {
        return false;
    }

    if (
        !ciudad.estacionPrincipal ||
        typeof ciudad.estacionPrincipal !== "object" ||
        typeof ciudad.estacionPrincipal.id !== "string" ||
        ciudad.estacionPrincipal.id.trim() === "" ||
        typeof ciudad.estacionPrincipal.nombre !== "string" ||
        ciudad.estacionPrincipal.nombre.trim() === ""
    ) {
        return false;
    }

    if (
        !Array.isArray(ciudad.intereses) ||
        ciudad.intereses.length === 0
    ) {
        return false;
    }

    if (
        !Array.isArray(ciudad.tiposExperiencia) ||
        ciudad.tiposExperiencia.length === 0
    ) {
        return false;
    }

    if (
        !Array.isArray(ciudad.nivelesPresupuesto) ||
        ciudad.nivelesPresupuesto.length === 0
    ) {
        return false;
    }

    if (
        typeof ciudad.diasMinimos !== "number" ||
        ciudad.diasMinimos <= 0
    ) {
        return false;
    }

    if (
        typeof ciudad.diasRecomendados !== "number" ||
        ciudad.diasRecomendados <
            ciudad.diasMinimos
    ) {
        return false;
    }

    if (
        !Array.isArray(ciudad.aeropuertosCercanos) ||
        ciudad.aeropuertosCercanos.length === 0
    ) {
        return false;
    }

    if (
        typeof ciudad.esDestinoPrincipal !== "boolean"
    ) {
        return false;
    }

    if (
        !ciudad.datosGeograficos ||
        typeof ciudad.datosGeograficos !== "object" ||
        typeof ciudad.datosGeograficos.estadoVerificacion !== "string" ||
        typeof ciudad.datosGeograficos.fechaVerificacion !== "string" ||
        !Array.isArray(
            ciudad.datosGeograficos.fuentesReferencia,
        )
    ) {
        return false;
    }

    return true;
}


/* Comprueba que la lista de ciudades contiene datos válidos. */
function validarCiudades(ciudades) {
   if (!Array.isArray(ciudades)) {
      throw new Error("El archivo de ciudades no contiene un array.");
   }

   if (ciudades.length === 0) {
      throw new Error("El archivo de ciudades está vacío.");
   }

   const ciudadesInvalidas = ciudades.filter(
      function (ciudad) {
         return !validarCiudad(ciudad);
      },
   );

   if (ciudadesInvalidas.length > 0) {
      throw new Error(
         "Una o más ciudades contienen datos incompletos o incorrectos.",
      );
   }

   return true;
}


/* VALIDACIÓN DE CONEXIONES */

/* Comprueba que una conexión contiene las propiedades necesarias. */
function validarConexion(conexion) {
    if (
        !conexion ||
        typeof conexion !== "object"
    ) {
        return false;
    }

    if (
        typeof conexion.id !== "string" ||
        conexion.id.trim() === ""
    ) {
        return false;
    }

    if (
        typeof conexion.origen !== "string" ||
        conexion.origen.trim() === ""
    ) {
        return false;
    }

    if (
        typeof conexion.destino !== "string" ||
        conexion.destino.trim() === ""
    ) {
        return false;
    }

    if (
        conexion.origen === conexion.destino
    ) {
        return false;
    }

    if (
        typeof conexion.estacionOrigen !== "string" ||
        conexion.estacionOrigen.trim() === ""
    ) {
        return false;
    }

    if (
        typeof conexion.estacionDestino !== "string" ||
        conexion.estacionDestino.trim() === ""
    ) {
        return false;
    }

    if (
        typeof conexion.medio !== "string" ||
        conexion.medio.trim() === ""
    ) {
        return false;
    }

    if (
        typeof conexion.duracionMinutos !== "number" ||
        conexion.duracionMinutos <= 0
    ) {
        return false;
    }

    if (
        typeof conexion.precioAproximadoYenes !== "number" ||
        conexion.precioAproximadoYenes < 0
    ) {
        return false;
    }

    if (
        !Number.isInteger(
            conexion.transbordos,
        ) ||
        conexion.transbordos < 0
    ) {
        return false;
    }

    if (
        typeof conexion.bidireccional !== "boolean"
    ) {
        return false;
    }

    if (
        typeof conexion.tipoDato !== "string" ||
        conexion.tipoDato.trim() === ""
    ) {
        return false;
    }

    if (
        typeof conexion.fechaVerificacion !== "string" ||
        conexion.fechaVerificacion.trim() === ""
    ) {
        return false;
    }

    if (
        !Array.isArray(
            conexion.fuentesReferencia,
        ) ||
        conexion.fuentesReferencia.length === 0
    ) {
        return false;
    }

    return true;
}

/* Comprueba que la lista de conexiones contiene datos válidos. */
function validarConexiones(conexiones) {
    if (!Array.isArray(conexiones)) {
        throw new Error(
            "El archivo de conexiones no contiene un array.",
        );
    }

    if (conexiones.length === 0) {
        throw new Error(
            "El archivo de conexiones está vacío.",
        );
    }

    const conexionesInvalidas =
        conexiones.filter(
            function (conexion) {
                return !validarConexion(
                    conexion,
                );
            },
        );

    if (
        conexionesInvalidas.length > 0
    ) {
        throw new Error(
            "Una o más conexiones contienen datos incompletos o incorrectos.",
        );
    }

    return true;
}



/* CARGA DE DATOS */

/* Carga el archivo JSON que contiene las ciudades. */
export async function cargarCiudades() {
   try {
      const respuesta = await fetch(RUTA_CIUDADES);

   if (!respuesta.ok) {
      throw new Error(`No se ha podido cargar ciudades.json. Código: ${respuesta.status}`);
   }

   const ciudades = await respuesta.json();

   validarCiudades(ciudades);

   return ciudades;
   } catch (error) {
      console.error('Error al cargar las ciudades:', error);

      throw error;
   }
}

/* Carga el archivo JSON que contiene las conexiones. */
export async function cargarConexiones() {
   try {
      const respuesta = await fetch(RUTA_CONEXIONES);

      if (!respuesta.ok) {
         throw new Error(`No se ha podido cargar conexiones.json. Código: ${respuesta.status}`);
      }

      const conexiones = await respuesta.json();

      validarConexiones(conexiones);

      return conexiones;
      
   } catch (error) {
      console.error("Error al cargar las conexiones:", error);

      throw error;
   }
}




/* VALIDACIÓN DE VUELOS */

/* Comprueba que una opción de vuelo tenga los datos necesarios. */
function validarVuelo(vuelo) {
    if (
        !vuelo ||
        typeof vuelo !== "object"
    ) {
        return false;
    }

    if (
        typeof vuelo.id !== "string" ||
        vuelo.id.trim() === ""
    ) {
        return false;
    }

    if (
        typeof vuelo.origen !== "string" ||
        vuelo.origen.length !== 3
    ) {
        return false;
    }

    if (
        typeof vuelo.destino !== "string" ||
        vuelo.destino.length !== 3
    ) {
        return false;
    }

    if (
        typeof vuelo.aerolinea !== "string" ||
        vuelo.aerolinea.trim() === ""
    ) {
        return false;
    }

    if (
        typeof vuelo.precioPorPersona !== "number" ||
        vuelo.precioPorPersona <= 0
    ) {
        return false;
    }

    if (
        typeof vuelo.duracionMinutos !== "number" ||
        vuelo.duracionMinutos <= 0
    ) {
        return false;
    }

    if (
        typeof vuelo.escalas !== "number" ||
        vuelo.escalas < 0
    ) {
        return false;
    }

    if (
        vuelo.tipoDato !== "simulado"
    ) {
        return false;
    }

    return true;
}


/* Comprueba el array completo de vuelos. */
function validarVuelos(vuelos) {
    if (
        !Array.isArray(vuelos) ||
        vuelos.length === 0
    ) {
        throw new Error(
            "No se han encontrado datos locales de vuelos.",
        );
    }

    const todosValidos =
        vuelos.every(
            validarVuelo,
        );

    if (!todosValidos) {
        throw new Error(
            "Uno o más vuelos contienen datos incorrectos.",
        );
    }

    return true;
}


/* Carga las opciones locales de vuelo. */
export async function cargarVuelosLocales() {
    try {
        const response =
            await fetch(
                RUTA_VUELOS,
            );

        if (!response.ok) {
            throw new Error(
                `No se han podido cargar los vuelos locales. Estado ${response.status}.`,
            );
        }

        const vuelos =
            await response.json();

        validarVuelos(
            vuelos,
        );

        return vuelos;
    } catch (error) {
        console.error(
            "Error al cargar los vuelos locales:",
            error,
        );

        throw error;
    }
}