# Protocolo "UNSHIP": Iteración Segura y No Destructiva de UI

Este protocolo rige todas las modificaciones complejas de interfaz y componentes en el proyecto para prevenir regresiones y garantizar alineación estética impecable.

## Principios del Protocolo

1. **Aislamiento (Isolation):**
   - Cuando se requiere una nueva funcionalidad o rediseño visual, se generan de 2 a 3 variantes envolviéndolas en atributos HTML explícitos:
     - `data-unship-pick="A"`
     - `data-unship-pick="B"`
     - `data-unship-pick="C"`

2. **Pausa (Human-in-the-Loop - HitL):**
   - El agente detiene la mutación destructiva y solicita la revisión cualitativa en el servidor de previsualización local (`http://localhost:8085/index.html`).

3. **Purga (Purge & Clean):**
   - Una vez que el usuario selecciona la variante ganadora (ej. Opción A), el agente elimina de forma limpia e irreversible el código de las opciones no seleccionadas y retira los atributos temporales `data-unship-pick` de la variante definitiva.
