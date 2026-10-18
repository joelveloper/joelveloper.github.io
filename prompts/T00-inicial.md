# Prompt inicial para Codex — T00 (NO implementar la web todavía)

IMPORTANTE — NUEVO REPOSITORIO Y NUEVA SESIÓN

Esta tarea inicia la construcción del portafolio personal de Joel Cantero. No asumir que existen archivos, ramas, commits ni configuraciones fuera del repositorio y de la documentación materializada.

Trabajar **solo** sobre el repositorio nuevo propuesto `joelveloper.github.io`. Está prohibido modificar el repositorio del README de perfil `joelveloper/joelveloper` o cualquier proyecto SGAA, AuditaPy, ControlLote o BoozHome.

## Objetivo

Ejecutar la tarea **T00 — Inicialización controlada del repositorio y documentación**.

## Fuentes y prioridad

1. Estado real de Git y archivos locales.
2. `AGENTS.md`.
3. `docs/01-PRD.md`, `docs/02-DISENO-VISUAL.md`, `docs/03-ARQUITECTURA.md`, `docs/04-PLAN-DE-TAREAS.md`, `docs/05-CONTENIDOS-Y-CASOS.md`, `docs/06-CALIDAD-Y-VALIDACION.md`.
4. `docs/adr/ADR-001-STATIC-ASTRO.md`.

El repositorio prevalece si difiere de las hipótesis del prompt. Documentar contradicciones.

## Protocolo obligatorio

1. Inspeccionar `pwd`, `git status --short`, `git branch --show-current`, `git log -1 --oneline`, `git remote -v` y listar archivos actuales. Si aún no existe repositorio Git, informarlo claramente.
2. Identificar si ya existe el remoto esperado `joelveloper/joelveloper.github.io`. No suponer que se creó.
3. Revisar integridad y coherencia del paquete de documentación.
4. Establecer un plan de archivos mínimos para T00; no crear scaffold de Astro.
5. Si la ruta es segura, inicializar Git localmente solo cuando sea necesario, preservando archivos existentes. Si crear el repositorio remoto requiere GitHub CLI o permisos, **pedir autorización explícita** y detenerse antes de esa operación.
6. No alterar PRD, arquitectura o backlog para ocultar contradicciones; proponer aclaraciones primero.
7. Mostrar diff/estado final y lista de validaciones realizadas.

## Restricciones

- Prohibido instalar dependencias, ejecutar `npm create`, `pnpm create`, `shadcn init` o generar la UI en T00.
- Prohibido borrar archivos ajenos o reescribir historia Git.
- No hacer `git add`, commit, push, crear repositorio remoto, configurar Pages o abrir PR sin aprobación explícita.
- No incluir clientes, PDFs ni secretos de los proyectos privados.
- No inventar pruebas ni resultados.

## Entrega solicitada

A. Diagnóstico del estado del repositorio.
B. Estructura documental y chequeos de coherencia.
C. Cambios locales T00, si se hicieron, con diff resumido.
D. Riesgos/preguntas que bloquean T01.
E. Comandos realmente ejecutados y resultado.
F. Recomendación de continuación en **T01**, sin ejecutarla.
