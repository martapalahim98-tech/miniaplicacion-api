/* Japan Route AI
   Navegación, validación y recogida de preferencias */


/* FUNCIÓN PRINCIPAL DEL FORMULARIO */

/* Inicializa la navegación, validaciones y eventos del formulario. */
export function inicializarFormulario(alEnviarFormulario) {
    /* REFERENCIAS AL DOM */

    const formPlanificador = document.querySelector('#formPlanificador');

    const pasoDatosViaje = document.querySelector('#pasoDatosViaje');

    const pasoPreferenciasViaje = document.querySelector(
        '#pasoPreferenciasViaje',
    );

    const aeropuertoSalida = document.querySelector(
        '#aeropuertoSalida',
    );

    const fechaIda = document.querySelector('#fechaIda');

    const fechaVuelta = document.querySelector('#fechaVuelta');

    const numeroViajeros = document.querySelector(
        '#numeroViajeros',
    );

    const presupuestoPorPersona = document.querySelector(
        '#presupuestoPorPersona',
    );

    const checkboxIntereses = document.querySelector(
        '#checkboxIntereses',
    );

    const btnContinuarPaso1 = document.querySelector(
        '#btnContinuarPaso1',
    );

    const btnAnteriorPaso2 = document.querySelector(
        '#btnAnteriorPaso2',
    );

    const mensajeFormulario = document.querySelector(
        '#mensajeFormulario',
    );

    const textoPasoActual = document.querySelector(
        '#textoPasoActual',
    );

    const porcentajeProgreso = document.querySelector(
        '#porcentajeProgreso',
    );

    const barraProgreso = document.querySelector(
        '#barraProgreso',
    );

    const barraProgresoContenedor = document.querySelector(
        '.progreso-formulario__barra',
    );

    const indicadoresProgreso = document.querySelectorAll(
        '[data-progress-step]',
    );

    const resultadosViaje = document.querySelector(
        '#resultadosViaje',
    );

    const estadoCarga = document.querySelector(
        '#estadoCarga',
    );

    const estadoError = document.querySelector(
        '#estadoError',
    );

    const btnModificarPreferencias = document.querySelector(
        '#btnModificarPreferencias',
    );

    const btnGenerarOtraRuta = document.querySelector(
        '#btnGenerarOtraRuta',
    );

    const btnReintentar = document.querySelector(
        '#btnReintentar',
    );

    const tituloPasoDatosViaje = document.querySelector(
        '#tituloPasoDatosViaje',
    );

    const tituloPasoPreferenciasViaje = document.querySelector(
        '#tituloPasoPreferenciasViaje',
    );

    const seccionPlanificador = document.querySelector(
        '#planificador',
    );


    /* VARIABLES DE ESTADO */

    let pasoActual = 1;


    /* FUNCIONES AUXILIARES */

    /* Muestra un mensaje dentro del formulario. */
    function mostrarMensaje(texto, tipo = 'error') {
        mensajeFormulario.textContent = texto;

        mensajeFormulario.className =
            `mensaje-formulario mensaje-formulario--${tipo}`;
    }


    /* Elimina el mensaje mostrado en el formulario. */
    function limpiarMensaje() {
        mensajeFormulario.textContent = '';

        mensajeFormulario.className =
            'mensaje-formulario';
    }


    /* Marca un campo como incorrecto. */
    function marcarCampoInvalido(campo) {
        campo.setAttribute(
            'aria-invalid',
            'true',
        );
    }


    /* Elimina el estado de error de un campo. */
    function limpiarCampoInvalido(campo) {
        campo.removeAttribute('aria-invalid');
    }


    /* Elimina todos los estados de error del primer paso. */
    function limpiarErroresPaso1() {
        const camposPaso1 = [
            aeropuertoSalida,
            fechaIda,
            fechaVuelta,
            numeroViajeros,
            presupuestoPorPersona,
        ];

        camposPaso1.forEach(function (campo) {
            limpiarCampoInvalido(campo);
        });
    }


    /* Devuelve los intereses seleccionados. */
    function obtenerInteresesSeleccionados() {
        return Array.from(
            document.querySelectorAll(
                'input[name="intereses"]:checked',
            ),
        );
    }


    /* Convierte un texto de fecha en un objeto Date. */
    function convertirFecha(fecha) {
        return new Date(`${fecha}T00:00:00`);
    }


    /* Calcula los días existentes entre dos fechas. */
    function calcularDuracionDias(inicio, final) {
        const fechaInicio = convertirFecha(inicio);

        const fechaFinal = convertirFecha(final);

        const milisegundosPorDia =
            1000 * 60 * 60 * 24;

        return Math.round(
            (fechaFinal - fechaInicio) /
            milisegundosPorDia,
        );
    }


    /* Clasifica el presupuesto introducido por el usuario. */
    function clasificarPresupuesto(presupuesto) {
        if (presupuesto < 2500) {
            return 'ajustado';
        }

        if (presupuesto <= 4500) {
            return 'medio';
        }

        return 'alto';
    }


    /* PROGRESO Y NAVEGACIÓN */

    /* Actualiza la barra y los indicadores de progreso. */
    function actualizarProgreso(numeroPaso) {
        const porcentaje =
            numeroPaso === 1 ? 50 : 100;

        textoPasoActual.textContent =
            `Paso ${numeroPaso} de 2`;

        porcentajeProgreso.textContent =
            `${porcentaje}%`;

        barraProgreso.style.width =
            `${porcentaje}%`;

        barraProgresoContenedor.setAttribute(
            'aria-valuenow',
            String(numeroPaso),
        );

        indicadoresProgreso.forEach(
            function (indicador) {
                const pasoIndicador = Number(
                    indicador.dataset.progressStep,
                );

                indicador.classList.remove(
                    'esta-activo',
                    'esta-completado',
                );

                indicador.removeAttribute(
                    'aria-current',
                );

                if (pasoIndicador === numeroPaso) {
                    indicador.classList.add(
                        'esta-activo',
                    );

                    indicador.setAttribute(
                        'aria-current',
                        'step',
                    );
                }

                if (pasoIndicador < numeroPaso) {
                    indicador.classList.add(
                        'esta-completado',
                    );
                }
            },
        );
    }


    /* Muestra uno de los pasos del formulario. */
    function mostrarPaso(numeroPaso) {
        pasoActual = numeroPaso;

        const mostrarPrimerPaso =
            numeroPaso === 1;

        pasoDatosViaje.hidden =
            !mostrarPrimerPaso;

        pasoPreferenciasViaje.hidden =
            mostrarPrimerPaso;

        pasoDatosViaje.classList.toggle(
            'esta-activo',
            mostrarPrimerPaso,
        );

        pasoPreferenciasViaje.classList.toggle(
            'esta-activo',
            !mostrarPrimerPaso,
        );

        actualizarProgreso(numeroPaso);

        limpiarMensaje();

        if (mostrarPrimerPaso) {
            tituloPasoDatosViaje.focus({
                preventScroll: true,
            });
        } else {
            tituloPasoPreferenciasViaje.focus({
                preventScroll: true,
            });
        }

        seccionPlanificador.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }


    /* VALIDACIONES */

    /* Valida todos los campos del primer paso. */
    function validarPaso1() {
        limpiarMensaje();

        limpiarErroresPaso1();

        const viajeros = Number(
            numeroViajeros.value,
        );

        const presupuesto = Number(
            presupuestoPorPersona.value,
        );

        const prioridadVuelo =
            document.querySelector(
                'input[name="prioridadVuelo"]:checked',
            );

        if (aeropuertoSalida.value === '') {
            marcarCampoInvalido(
                aeropuertoSalida,
            );

            mostrarMensaje(
                'Selecciona el aeropuerto desde el que quieres salir.',
            );

            aeropuertoSalida.focus();

            return false;
        }

        if (fechaIda.value === '') {
            marcarCampoInvalido(fechaIda);

            mostrarMensaje(
                'Selecciona una fecha de ida.',
            );

            fechaIda.focus();

            return false;
        }

        if (fechaVuelta.value === '') {
            marcarCampoInvalido(fechaVuelta);

            mostrarMensaje(
                'Selecciona una fecha de vuelta.',
            );

            fechaVuelta.focus();

            return false;
        }

        const inicio =
            convertirFecha(fechaIda.value);

        const final =
            convertirFecha(fechaVuelta.value);

        if (
            Number.isNaN(inicio.getTime()) ||
            Number.isNaN(final.getTime())
        ) {
            mostrarMensaje(
                'Las fechas introducidas no son válidas.',
            );

            return false;
        }

        if (final <= inicio) {
            marcarCampoInvalido(fechaVuelta);

            mostrarMensaje(
                'La fecha de vuelta debe ser posterior a la fecha de ida.',
            );

            fechaVuelta.focus();

            return false;
        }

        const duracionDias =
            calcularDuracionDias(
                fechaIda.value,
                fechaVuelta.value,
            );

        if (duracionDias < 7) {
            marcarCampoInvalido(fechaVuelta);

            mostrarMensaje(
                'El viaje debe tener una duración mínima de 7 días.',
            );

            fechaVuelta.focus();

            return false;
        }

        if (duracionDias > 21) {
            marcarCampoInvalido(fechaVuelta);

            mostrarMensaje(
                'El viaje no puede superar los 21 días.',
            );

            fechaVuelta.focus();

            return false;
        }

        if (
            !Number.isInteger(viajeros) ||
            viajeros < 1 ||
            viajeros > 4
        ) {
            marcarCampoInvalido(
                numeroViajeros,
            );

            mostrarMensaje(
                'El número de viajeros debe estar entre 1 y 4.',
            );

            numeroViajeros.focus();

            return false;
        }

        if (
            Number.isNaN(presupuesto) ||
            presupuesto < 1000 ||
            presupuesto > 10000
        ) {
            marcarCampoInvalido(
                presupuestoPorPersona,
            );

            mostrarMensaje(
                'El presupuesto por persona debe estar entre 1.000 € y 10.000 €.',
            );

            presupuestoPorPersona.focus();

            return false;
        }

        if (!prioridadVuelo) {
            mostrarMensaje(
                'Selecciona una prioridad para los vuelos.',
            );

            return false;
        }

        return true;
    }


    /* Valida las preferencias del segundo paso. */
    function validarPaso2() {
        limpiarMensaje();

        const interesesSeleccionados =
            obtenerInteresesSeleccionados();

        const ritmoViaje =
            document.querySelector(
                'input[name="ritmoViaje"]:checked',
            );

        const tipoExperiencia =
            document.querySelector(
                'input[name="tipoExperiencia"]:checked',
            );

        if (
            interesesSeleccionados.length === 0
        ) {
            mostrarMensaje(
                'Selecciona al menos un interés para personalizar la ruta.',
            );

            checkboxIntereses
                .querySelector('input')
                .focus();

            return false;
        }

        if (
            interesesSeleccionados.length > 3
        ) {
            mostrarMensaje(
                'Puedes seleccionar un máximo de tres intereses.',
            );

            return false;
        }

        if (!ritmoViaje) {
            mostrarMensaje(
                'Selecciona el ritmo que prefieres para el viaje.',
            );

            return false;
        }

        if (!tipoExperiencia) {
            mostrarMensaje(
                'Selecciona el tipo de experiencia que buscas.',
            );

            return false;
        }

        return true;
    }


    /* PREFERENCIAS DEL VIAJE */

    /* Crea el objeto con todas las preferencias del usuario. */
    function crearPreferenciasViaje() {
        const prioridadVuelo =
            document.querySelector(
                'input[name="prioridadVuelo"]:checked',
            );

        const ritmoViaje =
            document.querySelector(
                'input[name="ritmoViaje"]:checked',
            );

        const tipoExperiencia =
            document.querySelector(
                'input[name="tipoExperiencia"]:checked',
            );

        const intereses =
            obtenerInteresesSeleccionados()
                .map(function (checkbox) {
                    return checkbox.value;
                });

        const presupuesto = Number(
            presupuestoPorPersona.value,
        );

        return {
            aeropuertoSalida:
                aeropuertoSalida.value,

            fechaIda:
                fechaIda.value,

            fechaVuelta:
                fechaVuelta.value,

            duracionDias:
                calcularDuracionDias(
                    fechaIda.value,
                    fechaVuelta.value,
                ),

            numeroViajeros:
                Number(numeroViajeros.value),

            presupuestoPorPersona:
                presupuesto,

            nivelPresupuesto:
                clasificarPresupuesto(
                    presupuesto,
                ),

            prioridadVuelo:
                prioridadVuelo.value,

            intereses:
                intereses,

            ritmoViaje:
                ritmoViaje.value,

            tipoExperiencia:
                tipoExperiencia.value,
        };
    }


    /* Vuelve a mostrar el planificador. */
    function volverAlPlanificador(
        numeroPaso = 1,
    ) {
        estadoCarga.hidden = true;

        resultadosViaje.hidden = true;

        estadoError.hidden = true;

        seccionPlanificador.hidden = false;

        mostrarPaso(numeroPaso);
    }


    /* EVENTOS */

    btnContinuarPaso1.addEventListener(
        'click',
        () => {
            if (!validarPaso1()) {
                return;
            }

            mostrarPaso(2);
        },
    );


    btnAnteriorPaso2.addEventListener(
        'click',
        () => {
            mostrarPaso(1);
        },
    );


    formPlanificador.addEventListener(
        'submit',
        (evento) => {
            evento.preventDefault();

            if (!validarPaso1()) {
                mostrarPaso(1);

                return;
            }

            if (!validarPaso2()) {
                return;
            }

            const preferenciasViaje =
                crearPreferenciasViaje();

            mostrarMensaje(
                'Las preferencias se han recogido correctamente. El siguiente paso será calcular la ruta.',
                'exito',
            );

            if (
                typeof alEnviarFormulario ===
                'function'
            ) {
                alEnviarFormulario(
                    preferenciasViaje,
                );
            }
        },
    );


    checkboxIntereses.addEventListener(
        'change',
        (evento) => {
            const interesesSeleccionados =
                obtenerInteresesSeleccionados();

            if (
                interesesSeleccionados.length > 3
            ) {
                evento.target.checked = false;

                mostrarMensaje(
                    'Puedes seleccionar un máximo de tres intereses.',
                );

                return;
            }

            limpiarMensaje();
        },
    );


    fechaIda.addEventListener(
        'change',
        () => {
            limpiarCampoInvalido(fechaIda);

            limpiarCampoInvalido(fechaVuelta);

            if (fechaIda.value !== '') {
                fechaVuelta.min =
                    fechaIda.value;
            }
        },
    );


    fechaVuelta.addEventListener(
        'change',
        () => {
            limpiarCampoInvalido(
                fechaVuelta,
            );
        },
    );


    aeropuertoSalida.addEventListener(
        'change',
        () => {
            limpiarCampoInvalido(
                aeropuertoSalida,
            );
        },
    );


    numeroViajeros.addEventListener(
        'input',
        () => {
            limpiarCampoInvalido(
                numeroViajeros,
            );
        },
    );


    presupuestoPorPersona.addEventListener(
        'input',
        () => {
            limpiarCampoInvalido(
                presupuestoPorPersona,
            );
        },
    );


    btnModificarPreferencias.addEventListener(
        'click',
        () => {
            volverAlPlanificador(2);
        },
    );


    btnGenerarOtraRuta.addEventListener(
        'click',
        () => {
            volverAlPlanificador(1);
        },
    );


    btnReintentar.addEventListener(
        'click',
        () => {
            volverAlPlanificador(
                pasoActual,
            );
        },
    );


    /* INICIALIZACIÓN */

    actualizarProgreso(1);
}