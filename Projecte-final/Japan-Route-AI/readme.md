¿Puede criticarse que los vuelos sean locales?

Podría ocurrir si el proyecto se presenta diciendo que “consume Amadeus” cuando realmente solo carga vuelos.json. Por eso conviene describirlo con precisión:

La aplicación dispone de una capa de comparación de vuelos preparada para recibir ofertas de un proveedor externo. En el prototipo académico se emplea un proveedor local de respaldo con datos simulados, ya que las credenciales privadas de una API de vuelos no pueden exponerse en JavaScript del navegador.

El antiguo portal Self-Service de Amadeus fue retirado el 17 de julio de 2026 y el acceso actual se dirige a las APIs Enterprise, que requieren solicitar acceso y una relación más formal con Amadeus.

La comparación de vuelos se ha diseñado mediante una capa desacoplada. El prototipo utiliza un conjunto local validado porque las ofertas reales requieren autenticación segura desde servidor y el proyecto se desarrolla exclusivamente con JavaScript de navegador. Los datos se identifican expresamente como simulados y existe gestión de respaldo y errores. En una versión de producción, el proveedor local se sustituiría por un endpoint servidor conectado con una API de vuelos.




--------


Cómo defender la IA actual

Ante el profesor:

La IA generativa no toma decisiones críticas ni inventa la ruta. JavaScript selecciona, ordena y valida los destinos de forma comprobable. El modelo local recibe un contexto estructurado y se utiliza para transformar ese resultado en una explicación comprensible. La respuesta se exige en JSON, se valida y dispone de control de errores. Esto permite combinar un algoritmo explicable con generación de lenguaje natural sin delegar datos objetivos al modelo.

Esta separación es uno de los puntos más fuertes del proyecto.



aloración respecto a la rúbrica

Sin disponer del texto exacto de la rúbrica, la combinación final tendría bastante solidez:

Apartado	Implementación
Datos propios	ciudades.json, conexiones.json, respaldo de vuelos
API externa real	Frankfurter o BCE para EUR/JPY
Biblioteca externa	Leaflet
Datos cartográficos externos	OpenStreetMap
Inteligencia artificial	Qwen local con Ollama
Algoritmo propio	puntuación, selección, orden, días, aeropuertos y vuelos
DOM	renderizado completo y dinámico
Asincronía	fetch, async/await, Ollama y API de divisas
Validación	formularios, JSON, respuesta de Qwen y servicios
Gestión de errores	errores globales y degradaciones locales
Responsive	interfaz mobile first
Seguridad	sin claves privadas en el frontend




3. Criterios económicos utilizados

Estas cantidades son decisiones del prototipo, no precios reales:

Nivel ajustado
Alojamiento: 55 €/día
Comida: 30 €/día
Actividades: 15 €/día

Nivel medio
Alojamiento: 95 €/día
Comida: 45 €/día
Actividades: 30 €/día

Nivel alto
Alojamiento: 160 €/día
Comida: 75 €/día
Actividades: 50 €/día

La aplicación debe explicarlo claramente como estimación.

Sobre alojamiento y duración

Para mantener coherencia con el formulario, utilizaremos:

alojamientoPorDia *
duracionDias

Es decir, una duración calculada de siete días genera siete unidades de alojamiento en la estimación. Más adelante se podría diferenciar entre días y noches, pero ahora mantendremos el mismo criterio usado en toda la aplicación.