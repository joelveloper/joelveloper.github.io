# AGENTS.md — Contrato de trabajo con agentes

## Autoridad y orden de fuentes

1. Estado real de Git, archivos, código y configuración **del nuevo repositorio de portafolio**.
2. PRD, arquitectura, guía visual, tareas y ADR versionados.
3. Instrucción actual del usuario.
4. Hipótesis de los prompts (si discrepan del repositorio, identificar y documentar).

No asumir trabajo de otros agentes ni contextos no materializados en el repositorio. Leer `README.md`, `docs/01-PRD.md`, `docs/02-DISENO-VISUAL.md`, `docs/03-ARQUITECTURA.md` y `docs/04-PLAN-DE-TAREAS.md` antes de modificar archivos.

## Ejecución por tarea

- Una tarea `Txx` a la vez; reconstruir el contexto desde Git y documentos en cada sesión.
- Antes de editar: identificar `HEAD`, rama, estado del árbol y archivos implicados; resumir brevemente estrategia, riesgos y pruebas.
- No descartar cambios preexistentes del usuario; ante modificaciones no relacionadas, informar y esperar.
- Mantener el alcance mínimo acordado; no adelantar tareas del backlog.
- Validar con comandos apropiados; reportar exactamente qué pasó, qué no se pudo ejecutar y por qué.
- No afirmar que un despliegue, una prueba o un sitio externo funcionan sin evidencia observable.
- No hacer `git add`, `git commit`, `git push`, abrir PR, crear repositorio remoto ni cambiar configuración de Pages sin autorización explícita.
- Prohibido publicar secretos, datos personales no autorizados, muestras de PDF de clientes, contratos o capturas confidenciales.

## Arquitectura innegociable para MVP

- Astro estático: sin SSR, API, autenticación, base de datos ni Docker para producción.
- Tailwind CSS v4 y `shadcn/ui` configurado explícitamente sobre **Radix** (`--base radix`).
- React solo para interactividad necesaria; no hidratar componentes puramente visuales.
- Contenidos mediante Astro Content Collections, con verificación de estados, evidencias y enlaces.
- El producto visual debe ser original: no copiar código, ilustraciones, logos, textos ni assets de FullStackHero.
- No añadir analítica, rastreo, cookies de seguimiento, formularios remotos ni integraciones externas sin nueva decisión.
- Idioma MVP español; evitar traducciones automáticas no revisadas.

## Criterios de publicación

- SGAA: en producción, pero los detalles de plataforma y la publicación de materiales visuales requieren validación de autorizaciones.
- AuditaPy: nueva generación en desarrollo; **no** presentarla como desplegada.
- ControlLote: histórico procesado de **más de 18 meses por empresa**; **no** confundir con 18 meses operando en producción.
- BoozHome: proyecto exclusivo de un cliente; **no** anunciar sitio operativo hasta comprobar dominio y despliegue; requerir aprobación para su presentación y capturas.
- Oñondive: marca/iniciativa en definición, **no** empresa constituida.
- Nunca inventar métricas, clientes, testimonios, cifras de ahorro, empleo, certificaciones ni propiedad intelectual.

## Entrega estándar de cada tarea

1. Estado inicial y alcance.
2. Resumen de cambios y lista de archivos modificados.
3. Evidencia de comandos y pruebas (aprobados / fallidos / no ejecutados).
4. Revisión de SEO, accesibilidad, seguridad y privacidad según corresponda.
5. Riesgos, decisiones y cuestiones pendientes.
6. Propuesta de siguiente tarea **sin implementarla**.
