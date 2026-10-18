# ADR-001 — Astro estático con islas React, shadcn/ui y Radix

- **Estado:** Aceptado como propuesta inicial para el MVP; sujeto a revisión al iniciar T01.
- **Fecha:** 2026-10-18
- **Decisores:** propietario del portafolio.

## Contexto

El sitio es informativo: presenta una persona, competencias, cuatro proyectos y casos de estudio. No necesita identidad de usuario, persistencia, motor de búsqueda remoto, integraciones de negocio ni contenido que cambie por solicitud. La necesidad principal es publicar HTML legible, accesible y posicionable con bajo costo de mantenimiento.

El propietario seleccionó Astro, Tailwind CSS, shadcn/ui y Radix UI, con estética inspirada en FullStackHero.

## Decisión

- Astro con `output: 'static'`.
- Tailwind CSS v4 para utilidades y tokens.
- React integrado, pero hidratado solo en componentes interactivos concretos.
- shadcn/ui con opción explícita `--base radix` (la base por defecto actual puede no ser Radix).
- Contenido y metadatos en Astro Content Collections + MDX, renderizados en build.
- Hosting GitHub Pages con Actions, inicialmente en `joelveloper.github.io`.

## Alternativas evaluadas

| Alternativa | Ventaja | Motivo para no elegirla en MVP |
|---|---|---|
| React SPA/Vite | Ecosistema amplio, toda la UI en React | JavaScript y navegación cliente innecesarios para contenido editorial |
| Next.js con SSG | Opciones de servidor, imágenes, rutas | Complejidad y convenciones extra sin necesidad de servidor |
| Blazor WebAssembly/Server | Familiaridad .NET | Bundle/hosting o servidor no justificados para portafolio informativo |
| HTML estático manual | Máximo control y mínima dependencia | Menos mantenible para cuatro casos de estudio tipados |
| CMS externo | Edición sin repositorio | Superficie de ataque, dependencia de servicio y mantenimiento innecesarios |

## Consecuencias positivas

- HTML estático y enlaces navegables sin JavaScript.
- Buena base SEO y rendimiento.
- Contenido tipado y mantenible, coste de infraestructura inicial mínimo.
- shadcn/Radix para accesibilidad en interacciones puntuales.

## Costes y riesgos

- shadcn/ui incorpora componentes React; su uso indiscriminado aumenta el JS. Mitigación: preferir Astro/HTML donde no hay estado.
- Github Pages no procesa backend ni funciones. Esto está alineado con el alcance; reconsiderar hosting únicamente si cambian requisitos.
- Configuración de Dark-first y temas puede generar duplicación; la primera versión utiliza un único tema.
- Las fuentes y recursos ajenos requieren licencias/permiso.

## Criterios para revisar el ADR

Nuevos requisitos reales que demanden contenido personalizado, autenticación, formularios con backend, CMS o datos dinámicos. Antes de cambiar la arquitectura, documentar un nuevo ADR con alternativas y coste operativo.

## Referencias

- https://docs.astro.build/
- https://ui.shadcn.com/docs/installation/astro
- https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default
- https://docs.astro.build/es/guides/deploy/github/
