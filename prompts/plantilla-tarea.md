# Plantilla de prompt para Codex — ejecutar UNA TAREA

IMPORTANTE — RECONSTRUIR CONTEXTO DESDE REPOSITORIO

No asumir continuidad de otras sesiones ni trabajos no comprometidos. El repositorio y sus documentos son la fuente de verdad.

## Tarea

- **ID:** Txx (reemplazar)
- **Título:** (reemplazar)
- **Objetivo:** (reemplazar)
- **Alcance incluido:** (reemplazar)
- **Fuera de alcance:** (reemplazar)

## Fuentes obligatorias

1. Git (HEAD, rama, status, último commit).
2. `AGENTS.md`.
3. `docs/01-PRD.md` a `docs/06-CALIDAD-Y-VALIDACION.md` y ADR aplicables.
4. Código real actual, configuraciones y lockfile.

## Ejecución

1. Reconstruir el contexto real y detectar diferencias con el plan.
2. Informar estrategia, archivos previstos, riesgos y criterios de aceptación.
3. Modificar únicamente el alcance de esta tarea.
4. Validar con comandos pertinentes y documentar resultados exactos.
5. Revisar accesibilidad, privacidad, contenido y SEO cuando aplique.
6. Reportar diff, archivos modificados y riesgos residuales.
7. **No ejecutar commit, push, PR ni despliegue sin autorización explícita.**
8. Detenerse tras Txx; no anticipar Txx+1.

## Criterios de éxito

- (Copiar literalmente los criterios Txx del backlog y añadir verificaciones concretas.)
- Ninguna cifra inventada, ningún activo privado, ninguna dependencia innecesaria.
- Cualquier comando fallido se reporta como fallido, no como aprobado.

## Entrega

Resumen de implementación, evidencia de pruebas, diferencias respecto del diseño, riesgos pendientes y propuesta de siguiente tarea.
