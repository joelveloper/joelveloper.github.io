# Portafolio personal — Joel Cantero

**Paquete de especificación para Codex · v1.0 · 2026-10-18**

Este directorio contiene la documentación de partida para crear un repositorio **nuevo**, separado del repositorio de perfil `joelveloper/joelveloper`.

## Objetivo

Construir un portafolio profesional público, rápido, accesible y mantenible para documentar experiencia, tecnología y casos de estudio, con énfasis en soluciones empresariales y SaaS.

## Documentación y orden de lectura

1. [`docs/01-PRD.md`](docs/01-PRD.md): problema, objetivos, alcance, requisitos y criterios de aceptación.
2. [`docs/02-DISENO-VISUAL.md`](docs/02-DISENO-VISUAL.md): identidad visual inspirada en FullStackHero; tokens, componentes y responsive.
3. [`docs/03-ARQUITECTURA.md`](docs/03-ARQUITECTURA.md): tecnología, estructura, contenidos, publicación, SEO y CI/CD.
4. [`docs/04-PLAN-DE-TAREAS.md`](docs/04-PLAN-DE-TAREAS.md): backlog secuencial T00–T10 y Definition of Done.
5. [`docs/05-CONTENIDOS-Y-CASOS.md`](docs/05-CONTENIDOS-Y-CASOS.md): inventario de contenidos, estados y fichas de proyectos.
6. [`docs/06-CALIDAD-Y-VALIDACION.md`](docs/06-CALIDAD-Y-VALIDACION.md): pruebas, accesibilidad, seguridad y comprobaciones de publicación.
7. [`docs/adr/ADR-001-STATIC-ASTRO.md`](docs/adr/ADR-001-STATIC-ASTRO.md): justificación de arquitectura estática e islas React.
8. [`AGENTS.md`](AGENTS.md): instrucciones y límites para agentes.
9. [`prompts/T00-inicial.md`](prompts/T00-inicial.md): primer encargo para Codex.
10. [`prompts/plantilla-tarea.md`](prompts/plantilla-tarea.md): plantilla para ejecutar tareas posteriores.

## Repositorio

Repositorio: `joelveloper.github.io` (sitio de usuario para GitHub Pages). El repositorio remoto ya existe y la documentación se versiona desde este repositorio local. **Este paquete contiene documentación, no una implementación funcional del sitio.**

No utilizar el repositorio del README del perfil como sitio web. No subir informes privados, PDFs de clientes, contratos, datos personales ni código de sistemas propietarios.

## Referencias técnicas

- FullStackHero (inspiración, **no plantilla para copiar**): https://fullstackhero.net/
- Astro: https://docs.astro.build/
- shadcn/ui para Astro: https://ui.shadcn.com/docs/installation/astro
- Selector Radix shadcn/ui: https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default
- GitHub Pages con Astro: https://docs.astro.build/es/guides/deploy/github/

## Datos pendientes de aprobación

- Autorización para mostrar capturas/nombres/logos de terceros (en especial BoozHome y SGAA).
- Evidencia pública e indicadores verificables de los casos de estudio.
- URL real de BoozHome una vez que se complete el lanzamiento.
- Descripción técnica y resultados confirmados de AuditaPy.
- Diseño final revisado en móvil y escritorio.
