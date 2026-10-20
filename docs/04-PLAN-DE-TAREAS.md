# Plan de implementación — tareas controladas para Codex

**Versión:** 1.1 · 2026-10-18 · **Revisión:** 2026-10-20 (bloque de rediseño T09–T12 insertado antes de QA, ver [`adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md`](adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md))  
**Política:** una tarea por iteración, sin trabajo adelantado, con verificación y aprobación antes de commit/push.

## 1. Principios de ejecución

- No continuar trabajo inexistente: cada agente comprueba HEAD, Git status y documentación.
- No hacer suposiciones sobre configuraciones previas o instalaciones locales.
- Mantener PRs pequeños, idealmente una tarea por PR o grupo cohesivo de sub-tareas.
- La ejecución remota (crear repositorio, push, configurar Pages) requiere autorización explícita.
- En una tarea fallida, documentar diagnóstico antes de alterar requisitos.
- No trabajar con datos o capturas privadas de repositorios de clientes.

## 2. Dependencias y fases

```text
T00 Documentación y repositorio
  └─ T01 Scaffold Astro + Tailwind + shadcn/Radix
       ├─ T02 Tokens + layout + componentes visuales
       └─ T03 Modelo de contenido + esquema + borradores
            ├─ T04 Home
            └─ T05 Páginas de caso de estudio
                 └─ T06 Interacciones necesarias
                       └─ T07 Accesibilidad + SEO
                             └─ T08 CI/CD + GitHub Pages
                                   └─ T09 Rediseño — Tokens y fondo de puntos
                                        └─ T10 Rediseño — Header y toggle binario
                                             └─ T11 Rediseño — Hero con retrato y anillo orbital
                                                  └─ T12 Rediseño — Copywriting y marca personal
                                                       └─ T13 QA, accesibilidad y lanzamiento final
                                                            └─ T14 Casos enriquecidos (post-MVP)
```

**Renumeración (2026-10-20):** la antigua T09 «Validación y lanzamiento MVP» pasa a **T13** y la antigua T10 «Enriquecimiento editorial» pasa a **T14**. Los informes históricos T01–T08 no se modifican.

## 3. Backlog

### T00 — Inicialización controlada del repositorio y documentación

**Objetivo:** establecer un repositorio nuevo y revisable, sin tocar el README del perfil.

**Entrada:** documentación de este paquete y aprobación para crear remoto si se solicita.

**Trabajo:** inspeccionar repositorio local; identificar si ya existe remoto; crear proyecto remoto solo si está autorizado; copiar docs/AGENTS/prompts; establecer `.gitignore`, política de ramas y README de proyecto. Si el repositorio ya existe, no recrear ni borrar.

**Entregables:** raíz documental y reporte de estado de Git.

**Aceptación:** docs coherentes, `git status` explicado, ninguna modificación al repo `joelveloper/joelveloper`, ninguna credencial publicada.

**No incluye:** instalar Astro, construir UI, commits/push automáticos.

### T01 — Base técnica reproducible

**Depende de:** T00.

**Trabajo:** crear Astro con TypeScript, Tailwind v4 y React; instalar shadcn/ui con base Radix explícita; establecer alias `@/*`, scripts (`dev`, `build`, `check`, `lint` cuando se configure), lockfile, configuración estática y sitio canónico.

**Aceptación:** `pnpm install --frozen-lockfile`, `pnpm exec astro check`, `pnpm build` correctos; `components.json` evidencia Radix (según versión CLI); no rutas de producto todavía; no SSR.

**No incluye:** diseño definitivo, páginas de proyecto, CI de Pages.

### T02 — Sistema visual y componentes estructurales

**Depende de:** T01.

**Trabajo:** tokens semánticos, global.css, tipografía, contenedor, header, footer, botones/enlaces, headings, superficies, estados, layouts y componentes visuales base. Mock de diseño original inspirado en FSH.

**Aceptación:** versión móvil/escritorio coherente, contraste manual inicial, ningún asset ajeno, ningún contenido inventado. Storybook no requerido.

**No incluye:** interacciones sofisticadas o efecto parallax.

### T03 — Colección y contenido inicial

**Depende de:** T01.

**Trabajo:** definir `src/content.config.ts` con Zod y loader; cuatro MDX con campos y descripciones verificables; gate `publicApproved`; datos de perfil centralizados; imágenes fallback originales.

**Aceptación:** cuatro entradas válidas; estado de cada proyecto correcto; ninguna cifra falsa; build valida colecciones; BoozHome prelaunch hasta comprobación; sin screenshots privados.

**No incluye:** indicadores de impacto no verificados.

### T04 — Landing personal

**Depende de:** T02, T03.

**Trabajo:** home hero, sobre mí, competencias, catálogo, proceso de trabajo, referencia Oñondive y contacto. Navegación por anclas y a detalle.

**Aceptación:** copy limpio y correcto; four cards; CTAs útiles; responsive a 320px; sin enlaces a repositorios privados; SEO básico de portada.

**No incluye:** sección de blog, contadores ficticios.

### T05 — Plantilla y rutas de caso de estudio

**Depende de:** T02, T03.

**Trabajo:** `[id].astro` con `getStaticPaths`, layout compartido, MDX y panel de evidencia; estructura de casos SGAA, AuditaPy, ControlLote, BoozHome con lagunas editoriales identificadas.

**Aceptación:** cuatro rutas estáticas navegables; contenidos sin placeholders públicos como `TODO` (usar texto honesto o sección omitida); sin enlaces muertos; componentes comparten diseño.

**No incluye:** fotos no autorizadas ni métricas inferidas.

### T06 — Interactividad mínima

**Depende de:** T04, T05.

**Trabajo:** evaluar si el menú móvil y algún diálogo de imágenes requieren Radix; implementar solo donde sea necesario con islas React; respetar `prefers-reduced-motion`.

**Aceptación:** menú teclado/Escape/foco correcto; no hidratar toda la página; sin JS innecesario para tarjetas o enlaces.

**No incluye:** modo oscuro/claro como obligación (dark-first fijo en MVP); filtros y búsqueda quedan fuera.

### T07 — Accesibilidad, SEO y robustez

**Depende de:** T04, T05, T06.

**Trabajo:** títulos/metadatos por página, canonical, OG, sitemap, robots, favicon, 404; alt y foco; contraste; enlaces; optimización de recursos.

**Aceptación:** checklist QA completo, `astro check`/build, verificación de rutas/links, no vulnerabilidades evidentes por enlaces y scripts.

**No incluye:** Google Analytics ni integraciones de seguimiento.

### T08 — CI/CD y Pages

**Depende de:** T07 y autorización remota.

**Trabajo:** Actions de CI en PR y deploy desde main, permisos mínimos, Pages como source GitHub Actions; comprobar la configuración `site` para repo de usuario.

**Aceptación:** Actions verdes en repositorio real, URL desplegada, recursos CSS y links internos funcionando; no afirmar publicación sin comprobación del URL.

**No incluye:** dominio propio ni Nginx.

### T09 — Rediseño: tokens y fondo de puntos

**Depende de:** T08 integrada en `main` y ADR-002.

**Trabajo:** sustituir la paleta azul por la base zinc neutra (`--background` oscuro `#0d0e11`) y fijar los valores claro/oscuro de superficies, texto y bordes; definir el acento cálido propio (ámbar/naranja neutro) en ambos temas; crear la utilidad `bg-dots` con máscara radial y token de color propio; aplicarla como capa decorativa en `BaseLayout`; restringir el acento a elementos interactivos principales; reducir las bandas `border-y` que rompen la continuidad del fondo. Referencia: `02-DISENO-VISUAL.md §3 y §5`.

**Aceptación:** contraste WCAG 2.2 AA documentado para texto y controles en ambos temas; patrón decorativo con `aria-hidden`, sin JS ni recursos de red; ilustraciones de proyecto legibles en ambos temas; ningún valor cromático de acento copiado de FSH; `astro check` y `build` correctos.

**No incluye:** header, toggle, hero, copy.

### T10 — Rediseño: header y toggle binario de 2 estados

**Depende de:** T09.

**Trabajo:** header de 56px (`h-14`), ancho máximo 1280px, sin `border-b`; navegación principal limitada a «Inicio», «Sobre mí», «Proyectos», «Contacto» (escritorio y móvil), conservando las anclas de las demás secciones; monograma JC circular (`size-8 rounded-full`); sustituir el selector de 3 estados por un toggle circular de 32px con área táctil de 40px que alterna Claro/Oscuro; estado inicial según `prefers-color-scheme` si no hay preferencia guardada; adaptar el script anti-destello y mantener sincronizado `data-appearance`; actualizar `--site-header-height` y `scroll-padding-top`. Referencia: `02-DISENO-VISUAL.md §6`.

**Aceptación:** operable por teclado con foco visible; `aria-label` que describe la acción; sin destello de tema en la carga; comportamiento razonable sin JavaScript; anclas no quedan ocultas bajo el header; sin desbordes a 320px; menú móvil con los 4 accesos.

**No incluye:** hero, copy, nuevas secciones.

### T11 — Rediseño: hero con retrato y anillo orbital

**Depende de:** T10.

**Trabajo:** hero de 2 columnas (retrato a la izquierda, presentación a la derecha; apilado en móvil); componente de retrato con `astro:assets` (AVIF/WebP, varios anchos, dimensiones explícitas, carga prioritaria) y anillo `portrait-ring` con gradiente orbital animado mediante `transform`; titular «Hola, soy Joel Cantero», bajada, CTA «Hablemos», CTA secundario y redes; *placeholder* `1:1` original, sin EXIF, hasta recibir la foto definitiva; retirar la tarjeta decorativa del hero anterior. Referencia: `02-DISENO-VISUAL.md §2 y §6`.

**Aceptación:** animación detenida con `prefers-reduced-motion`; sin desplazamiento de layout al cargar la imagen; `alt` correcto (y honesto si es placeholder); un único H1; contraste del texto sobre el fondo de puntos; legible a 320px.

**No incluye:** reescritura del copy fuera del hero; uso de fotografías no autorizadas.

### T12 — Rediseño: refactorización de copywriting y marca personal

**Depende de:** T11.

**Trabajo:** reescribir en primera persona los textos de `profile.ts`, home, footer, metadatos y `aria-label` según `01-PRD.md §2` y la auditoría de INV-001 §3.1; retirar eslóganes comerciales; etiquetas «Correo» y «Hablemos»; incorporar la disponibilidad confirmada; revisar los resúmenes MDX de tono comercial solo con aprobación del propietario.

**Aceptación:** ningún eslogan de producto ni «profesional» de relleno en etiquetas; ningún hecho nuevo sin confirmación; textos aprobados por el propietario; títulos y descripciones SEO coherentes con el nuevo tono.

**No incluye:** cambios de estado, cifras o alcance de los proyectos.

### T13 — QA, accesibilidad y lanzamiento final

**Depende de:** T12.

**Trabajo:** revisión editorial con el propietario; comprobar URLs y estados, permiso para activos visuales, capturas móvil/escritorio, pruebas teclado, accesibilidad automatizada, Lighthouse, smoke y release notes. Incluye la verificación del rediseño: contraste en ambos temas, movimiento reducido, LCP del retrato y decisión sobre publicar con la foto definitiva o con el placeholder.

**Aceptación:** todos los requisitos FR-01 a FR-11 cubiertos o excepciones documentadas; criterios de `02-DISENO-VISUAL.md §11` revisados; SEO correcto; release aprobado y enlazable desde README de GitHub.

**No incluye:** enriquecimiento con resultados inexistentes.

### T14 — Enriquecimiento editorial (post-MVP)

**Depende de:** T13 y obtención de evidencia.

**Trabajo:** incorporar resultados/diagramas/capturas aprobadas a SGAA y ControlLote; actualizar lanzamiento real de BoozHome; enriquecer AuditaPy según hitos; opcional segunda lengua/blog evaluados por ADR.

**Aceptación:** cada cifra incluye origen y método; materiales de cliente aprobados; no altera arquitectura sin motivo.

## 4. Matriz de trazabilidad

| Requisito | Tareas |
|---|---|
| FR-01 Hero | T02, T04, T11 |
| FR-02 Navegación | T02, T04, T06, T07, T10 |
| FR-03 Tarjetas | T03, T04 |
| FR-04 Casos de estudio | T03, T05, T14 |
| FR-05 Contenido tipado | T03, T05 |
| FR-06 Contacto | T04, T07, T12 |
| FR-07 Estados correctos | T03, T05, T13 |
| FR-08 Oñondive | T04, T12, T13 |
| FR-09 Recursos aprobados | T03, T05, T11, T13 |
| FR-10 Navegación entre casos | T05, T07 |
| FR-11 404 | T07, T13 |

## 5. Definition of Done por tarea

Cada tarea se considera cerrada solamente cuando:

1. Se ha declarado el alcance con sus exclusiones.
2. Todos los cambios pertenecen a los archivos previstos y no pisan cambios externos.
3. Se han ejecutado las pruebas posibles; si una es imposible, se explica sin afirmar éxito.
4. Los criterios de aceptación se prueban o quedan explícitamente pendientes.
5. El diff y los riesgos son reportados.
6. La aprobación para commit/push/PR se solicita antes de realizar esas acciones.
7. El informe `docs/implementations/Txx-IMPLEMENTACION.md` existe y refleja los resultados de implementación.
8. El informe contiene evidencia verificable y declara las limitaciones.
9. El informe está preparado para versionarse junto con la tarea.
10. El cierre definitivo requiere que el informe forme parte de los cambios integrados, salvo excepción aprobada.

La regla del informe (puntos 7 a 10) se aplica a T03–T14 y a cualquier tarea nueva, conforme a la «Política obligatoria de informes de implementación» de `AGENTS.md`. No modifica el alcance funcional de las tareas existentes.

## 6. Convención de prompts

Un prompt de tarea debe incluir: `Txx`, objetivo, repositorio, documentación a leer, archivos probables, exclusiones, comandos de verificación, definición de éxito y condición de parada. Usar `prompts/plantilla-tarea.md`.

## 7. Priorización / versión más austera

Si el tiempo es limitado: T00 → T01 → T02 → T03 → T04 → T05 → T07 → T08 → T09 → T10 → T11 → T12 → T13, documentando la decisión de omitir T06 si el menú móvil se resuelve con HTML/CSS accesible sin estado adicional. **No** añadir complejidad solo para demostrar Radix: mantenerlo integrado y preparado, y utilizarlo cuando exista una interacción que lo justifique.
