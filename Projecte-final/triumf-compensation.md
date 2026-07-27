Te he preparado las dos propuestas siguiendo prácticamente la estructura que pide el profesor. Están redactadas para que puedas copiarlas directamente a un `PROPOSTA.md` y enseñárselas. He intentado que parezcan proyectos reales y no excesivamente ambiciosos.

---

# Proposta 1 · TRIUMPH AI Coach

## Nom del projecte

**TRIUMPH AI Coach**

---

## Problema que resol

Durant una partida de TRIUMPH, especialment quan els jugadors encara estan aprenent, és habitual tenir dubtes sobre quantes bases apostar o com valorar una mà de cartes.

L'aplicació ajuda el jugador a analitzar la seva mà abans de començar la ronda i ofereix una recomanació estratègica basada en les regles del joc.

No pretén jugar per l'usuari, sinó explicar els punts forts i febles de la mà perquè pugui prendre una millor decisió.

---

## Usuari destinatari

Jugadors de TRIUMPH, tant principiants com experimentats, que vulguin millorar la seva estratègia.

---

## Funcionalitats principals

- Seleccionar el nombre de jugadors.
- Seleccionar la facció de triomf.
- Indicar el nombre de cartes de la ronda.
- Introduir les cartes de la mà mitjançant selectors (facció i número).
- Mostrar les cartes introduïdes i permetre eliminar-les.
- Analitzar la mà amb Intel·ligència Artificial.
- Generar un informe amb:
    - punts forts de la mà;
    - punts febles;
    - nivell de risc;
    - recomanació del nombre de bases a apostar;
    - explicació de la recomanació.

---

## Tecnologies

- HTML5
- CSS3
- JavaScript
- Manipulació del DOM
- Arrays i objectes
- Validació de formularis
- Fetch API
- Ollama (Intel·ligència Artificial)

---

## Esbós de la interfície

```
-------------------------------------------------

TRIUMPH AI Coach

Jugadors
[ 4 ▼ ]

Triomf
[ Dracs ▼ ]

Cartes de la ronda
[ 6 ▼ ]

Afegir carta

Facció
[ Robots ▼ ]

Número
[ 8 ▼ ]

[ Afegir carta ]

----------------------------------

La meva mà

Robots 8
Dracs 10
Dimonis 4
Dríades 7

[ Analitzar mà ]

----------------------------------

Resultat IA

✔ Punts forts

⚠ Punts febles

🎯 Bases recomanades

📝 Explicació

-------------------------------------------------
```

---

# Proposta 2 · TRIUMPH Balance Lab

## Nom del projecte

**TRIUMPH Balance Lab**

---

## Problema que resol

Durant el desenvolupament d'un joc de taula és difícil saber si totes les faccions, cartes o poders estan equilibrats.

L'aplicació permet registrar partides de prova, obtenir estadístiques automàtiques i utilitzar Intel·ligència Artificial per detectar possibles problemes de balanç i proposar millores.

Està pensada com una eina de suport per als creadors del joc.

---

## Usuari destinatari

Dissenyadors i desenvolupadors del joc TRIUMPH.

---

## Funcionalitats principals

- Registrar noves partides de prova.
- Introduir:
    - nombre de jugadors;
    - facció de cada jugador;
    - puntuació final;
    - jugador guanyador;
    - observacions de la partida.

- Consultar l'historial de partides.
- Mostrar estadístiques automàtiques:
    - nombre de partides;
    - victòries per facció;
    - puntuació mitjana;
    - facció amb millor rendiment.

- Analitzar les estadístiques amb Intel·ligència Artificial.
- Generar un informe amb:
    - possibles desequilibris;
    - patrons detectats;
    - elements que convindria revisar;
    - propostes de proves futures.

---

## Tecnologies

- HTML5
- CSS3
- JavaScript
- Manipulació del DOM
- Arrays i objectes
- Validació de dades
- Fetch API
- Ollama (Intel·ligència Artificial)

---

## Esbós de la interfície

```
-------------------------------------------------

TRIUMPH Balance Lab

Nova partida

Jugadors: [ 4 ]

Guanyador:
[ Marta ▼ ]

Facció guanyadora:
[ Dracs ▼ ]

Puntuació:
[ 86 ]

Observacions:

__________________________

[ Desar partida ]

----------------------------------

Estadístiques

Partides: 18

Dracs: 8 victòries

Robots: 5 victòries

Dimonis: 3 victòries

Dríades: 2 victòries

----------------------------------

[ Analitzar amb IA ]

Resultat

✔ Possibles desequilibris

✔ Hipòtesis

✔ Recomanacions

✔ Properes proves

-------------------------------------------------
```

---

## 💡 Mi recomendación

De las dos, **yo presentaría las dos al profesor** y le preguntaría cuál considera más adecuada para el proyecto.

- **TRIUMPH AI Coach** está más orientado al **usuario final** y es una aplicación interactiva.
- **TRIUMPH Balance Lab** está orientado al **desarrollo del juego** y me parece mucho más original. Además, reutiliza un proyecto real en el que ya estás trabajando y muestra un uso de la IA con un propósito muy concreto, no como un simple chatbot.

Si el profesor valora especialmente la originalidad y que la IA aporte algo diferente, creo que **TRIUMPH Balance Lab** tiene muchas posibilidades de llamar la atención.
