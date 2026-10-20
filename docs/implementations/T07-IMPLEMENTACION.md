# Informe de implementación — T07

- **Tarea:** T07 — Accesibilidad, SEO y robustez
- **Fecha:** 2026-10-20
- **Rama:** `feat/t07-accessibility-seo`
- **Base:** `main` en `01bb342e210679923e623d357cb1afcec8dea624` (Merge PR #7 · T06 integrada)
- **Estado:** Implementación local completada y validada; **sin commit, push, PR, merge ni despliegue**. Pendiente de revisión y autorización del propietario.

---

## A. Identificación y contexto

- Repositorio: `joelveloper/joelveloper.github.io`.
- Tarea: T07 — Accesibilidad, SEO y robustez.
- Stack comprobado: Astro `7.4.0`, `output: 'static'`, `trailingSlash: 'always'`, Tailwind CSS `4.3.3`, React `19.3.1` y Radix `1.8.1` configurados pero sin uso runtime nuevo.
- Runtime local: Node `v24.21.0`, pnpm `12.14.0` mediante Corepack, Chrome `155.0.8059.84`.
- Documentos consultados: `AGENTS.md`, `docs/01-PRD.md`, `docs/02-DISENO-VISUAL.md`, `docs/03-ARQUITECTURA.md`, `docs/04-PLAN-DE-TAREAS.md`, `docs/implementations/T06-IMPLEMENTACION.md`.
- Alcance respetado: no se modificó contenido editorial, indicadores, estructura visual ni decisiones aprobadas de T06. Solo se aplicaron correcciones técnicas objetivas de accesibilidad y metadatos.

## B. Rama y commit de partida

| Comprobación | Resultado |
|---|---|
| Rama de partida | `feat/t06-minimal-interactivity` |
| HEAD de partida | `01bb342e210679923e623d357cb1afcec8dea624` (Merge PR #7 · T06) |
| `main` local | Actualizada por fast-forward a `01bb342` |
| Rama creada | `feat/t07-accessibility-seo` |
| Árbol inicial | Limpio (`git status --short` sin salida) |
| Commits creados en T07 | Ninguno |

La rama se creó sin operaciones destructivas:

1. `git fetch origin`.
2. `git switch main`.
3. `git merge --ff-only origin/main`.
4. `git switch -c feat/t07-accessibility-seo`.

## C. Diagnóstico inicial

Antes de T07, el layout compartido generaba únicamente `title`, `meta description` condicional, `viewport`, `color-scheme` y el tema inicial. Faltaban o eran mejorables:

- Canonical absoluto por ruta, `robots`, `author`, Open Graph y Twitter Card.
- Favicon propio y recursos sociales.
- Sitemap y `robots.txt`.
- Página 404 propia con contenido útil.
- Enlace de breadcrumb de caso con altura menor a 24 px.
- Color base de outline con alfa 50 %, que podía producir un indicador de foco transitorio por debajo de 3:1 en tema claro.
- El chunk React se emitía aunque no hubiera islas React referenciadas; se decidió no retirar la integración porque es una decisión arquitectónica de T01.

## D. Objetivo y alcance

**Incluido:**

- Títulos y descripciones por página, canonical, `robots`, Open Graph, Twitter Card y `author`.
- `sitemap.xml` mediante integración oficial y `robots.txt`.
- Favicon original SVG/ICO y OG image propia.
- Página 404 estática con `noindex`.
- Revisión de alt, foco, contraste, jerarquía de encabezados, enlaces y objetivos táctiles.
- Robustez de rutas y recursos, build estático y verificación local.
- Optimización del recurso social y documentación del JS no referenciado.

**Excluido:**

- T08 (CI/CD y GitHub Pages), T09 (QA de release), dominio propio, Lighthouse publicado.
- Analytics, cookies, formularios, scripts de terceros, CSP nueva, backend, SSR o API.
- Cambios editoriales, de indicadores o de estructura visual aprobada.
- Retirada de `@astrojs/react` o reestructuración de islas.

## E. Decisiones de implementación

1. **Metadatos centralizados en `BaseLayout`:** se añadieron props `type` y `noindex`; las páginas de caso usan `type="article"`, el resto `website`.
2. **Canonical absoluto:** se normaliza la ruta con barra final y se construye contra `Astro.site`. Si `site` falta, el build falla explícitamente.
3. **Canonical de 404:** Astro normaliza la ruta 404 a `/404/` por `trailingSlash: 'always'`; se añadió la prop opcional `canonical` y la página 404 declara `/404.html`, que es el archivo estático real.
4. **Imagen social única:** `public/images/social/og-image.jpg`, JPEG 1200×630, original y sin material de clientes. Se reutiliza en todas las rutas con alt descriptivo.
5. **Sitemap:** integración oficial `@astrojs/sitemap`; filtro explícito para excluir `/404/` y `/404.html`.
6. **Robots:** `User-agent: *`, `Allow: /` y referencia al `sitemap-index.xml`; sin rutas secretas ni `Disallow`.
7. **Favicon:** SVG escalable y ICO multtamaño (16, 32, 48 y 64 px), referenciados en el `<head>`.
8. **404:** página estática con H1 exacto, texto honesto, CTA al inicio, navegación de detalle y `noindex, nofollow`.
9. **Foco:** se eliminó el alfa 50 % del color base de outline para que el indicador de foco sea inmediatamente visible al 100 % del color de marca; el indicador final no cambia.
10. **Objetivo táctil:** el enlace «Proyectos» del breadcrumb de casos usa `inline-flex min-h-6 items-center`, alcanzando 24 px sin alterar el diseño.
11. **Sin datos estructurados JSON-LD:** no se añadieron porque no eran exigidos por T07 y no había datos verificables adicionales que justificaran el riesgo editorial.
12. **Sin eliminar React:** el chunk huérfano se documenta como optimización futura; retirar la integración cambiaría la base técnica aprobada.

## F. Archivos creados, modificados y eliminados

### Modificados

| Archivo | Cambio |
|---|---|
| `astro.config.mjs` | Integración `sitemap()` y filtro de 404. |
| `package.json` | Dependencia `@astrojs/sitemap` `3.7.4`. |
| `pnpm-lock.yaml` | Resolución y lockfile de la nueva dependencia. |
| `src/layouts/BaseLayout.astro` | SEO, canonical, OG, Twitter, favicon, `author`, `type`, `noindex` y override de canonical. |
| `src/layouts/CaseStudyLayout.astro` | `type="article"` y corrección del objetivo táctil del breadcrumb. |
| `src/styles/global.css` | Outline base sin alfa para foco inmediatamente contrastado. |

### Creados

| Archivo | Contenido |
|---|---|
| `src/pages/404.astro` | Página 404 estática. |
| `public/favicon.svg` | Favicon vectorial original. |
| `public/favicon.ico` | ICO multtamaño 16/32/48/64. |
| `public/robots.txt` | Reglas y referencia al sitemap. |
| `public/images/social/og-image.jpg` | Imagen social 1200×630, 106 408 B. |
| `docs/implementations/T07-IMPLEMENTACION.md` | Este informe. |

### Eliminados

Ninguno.

## G. Dependencias

- Añadida: `@astrojs/sitemap` `3.7.4` en `dependencies`.
- Lockfile actualizado: `pnpm-lock.yaml`.
- No se añadieron dependencias de runtime, analítica, cookies, formularios ni scripts externos.
- No se actualizaron dependencias mayores por inercia.

## H. Comandos ejecutados y resultados reales

| Comando | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Exit 0; lockfile actualizado y políticas de supply-chain correctas. |
| `corepack pnpm exec astro sync` | Exit 0; contenido y tipos sincronizados. |
| `corepack pnpm exec astro check` | Exit 0; 24 archivos, **0 errores, 0 warnings, 0 hints**. |
| `corepack pnpm run build` | Exit 0; 6 páginas generadas; sitemap creado. |
| `git diff --check` | Exit 0; sin errores de whitespace. |
| `git diff --exit-code 01bb342 -- src/content src/data` | Exit 0; sin cambios editoriales ni de datos. |
| `node /tmp/opencode/t07/check-links.mjs` | 6 páginas, 17 enlaces internos, 3 externos, `errors: []`. |
| `/tmp/opencode/t07/run-axe.sh` | 0 violaciones en las 6 páginas; home con 11 nodos incompletos de contraste para revisión manual. |
| `/tmp/opencode/t07/run-axe-themes.sh` | 12 combinaciones (home, SGAA, 404 × 4 modos): 0 violaciones. |
| `/tmp/opencode/t07/run-ui.sh` | 120 comprobaciones responsive, `issueCount: 0`; teclado, temas, foco y reduced motion verificados. |
| `curl` a GitHub, YouTube e Instagram | 200 en los tres enlaces externos. |
| `file`/`identify` de recursos | ICO con 4 tamaños; OG JPEG 1200×630. |
| Preview local | Ruta inexistente: HTTP 404 con la página propia; `/404.html`: 200; recursos: 200. |

No se ejecutó `pnpm lint` porque el proyecto no define script `lint`. No se ejecutó Lighthouse ni auditoría de dependencias.

## I. Pruebas funcionales, técnicas y visuales

### Metadatos por ruta

Se verificó en `dist` que las seis páginas tienen `lang="es"`, un solo `<h1>`, título y descripción únicos, canonical absoluto, `robots` y OG/Twitter:

| Ruta | Canonical | Robots | OG type |
|---|---|---|---|
| `/` | `https://joelveloper.github.io/` | `index, follow` | `website` |
| `/proyectos/sgaa/` | `https://joelveloper.github.io/proyectos/sgaa/` | `index, follow` | `article` |
| `/proyectos/controllote/` | `https://joelveloper.github.io/proyectos/controllote/` | `index, follow` | `article` |
| `/proyectos/auditapy/` | `https://joelveloper.github.io/proyectos/auditapy/` | `index, follow` | `article` |
| `/proyectos/boozhome/` | `https://joelveloper.github.io/proyectos/boozhome/` | `index, follow` | `article` |
| `/404.html` | `https://joelveloper.github.io/404.html` | `noindex, nofollow` | `website` |

Todas usan `https://joelveloper.github.io/images/social/og-image.jpg`, `summary_large_image` y un alt descriptivo.

### Sitemap y robots

- `dist/sitemap-index.xml` y `dist/sitemap-0.xml` generados.
- El sitemap contiene exactamente 5 URLs indexables: `/`, SGAA, ControlLote, AuditaPy y BoozHome.
- No incluye `/404/` ni `/404.html`.
- `dist/robots.txt` referencia `https://joelveloper.github.io/sitemap-index.xml`.

### 404 y recursos

- `dist/404.html` generado con H1 «404 — Página no encontrada», texto «La página que buscas no está disponible.» y CTA «Volver al inicio».
- En preview local, una ruta inexistente devuelve HTTP 404 y renderiza la página propia; `/404.html` directo devuelve 200.
- `favicon.ico`, `favicon.svg`, `robots.txt`, `sitemap-index.xml`, `sitemap-0.xml` y la OG image responden 200 con el `Content-Type` esperado.
- El ICO contiene 16, 32, 48 y 64 px; la imagen social es JPEG 1200×630 de 106 408 B.

### Teclado y foco

- Primer `Tab`: «Saltar al contenido»; activación lleva a `main#contenido`.
- Orden de tabulación coherente: skip link, marca, selector de apariencia, menú móvil, CTAs, enlaces del contenido.
- Menú móvil: abre con Enter/Espacio, `<dialog>` modal, foco contenido, ciclo de Tab y Shift+Tab, Escape cierra y devuelve el foco a «Abrir menú de navegación».
- Enlaces internos de misma página enfocan la sección destino.
- Selector de temas: Escape cierra y devuelve foco; `dark` persiste tras recarga; `light`, `system` y ArrowRight funcionan.
- Foco visible final: `outline` sólido de 2 px, offset 2 px, color de marca; tras corregir el alfa, el color es inmediatamente completo (sin transición desde un estado semitransparente).

### Responsive y temas

- Matriz final: 6 páginas × 5 anchos (320, 375, 768, 1024, 1440) × 4 modos (system-light, system-dark, manual-light, manual-dark) = **120 comprobaciones**.
- Resultado: `issueCount: 0`; sin desbordes horizontales, header fijo correcto, navegación visible, un H1 por página y 404 legible.
- Capturas revisadas: 404 a 320 px y 1440 px, home a 375 px, caso SGAA a 1440 px, en tema claro y oscuro.
- `prefers-reduced-motion`: transiciones y animaciones a `1e-05s`, `scroll-behavior: auto`.

### Contraste

- Pares semánticos principales en tema claro: **6.01:1–15.94:1**.
- Pares semánticos principales en tema oscuro: **7.21:1–17.60:1**.
- Indicador de foco: **6.69:1** en claro y **9.53:1** en oscuro.
- Los 11 nodos `color-contrast` incompletos de axe en la home (fondos compuestos) se revisaron manualmente; no se detectó un fallo de contraste.

## J. Revisión de accesibilidad y seguridad

### Accesibilidad

- Axe-core `4.10.3` sobre WCAG 2.0/2.1/2.2 A/AA: **0 violaciones** en las 6 páginas.
- Sin errores de `image-alt`, jerarquía de encabezados, nombres accesibles, landmarks, formularios o enlaces.
- Un solo H1 por página; breadcrumb y navegación con nombres claros.
- Objetivos táctiles relevantes ≥24 px; breadcrumb corregido con `min-h-6`.
- Foco visible y contraste no textual ≥3:1; foco final 6.69:1 en claro y 9.53:1 en oscuro.
- `prefers-reduced-motion` activo.
- No se realizó prueba con lector de pantalla ni en Firefox/Safari.

### Seguridad y privacidad

- Sin secretos, `.env`, claves, tokens ni datos personales no autorizados.
- Sin Analytics, cookies, píxeles, formularios remotos, scripts de terceros ni integraciones externas.
- Enlaces externos con `target="_blank"` usan `noopener noreferrer`.
- No se publicaron capturas de clientes, PDFs, contratos ni materiales no aprobados.
- Los tres enlaces externos respondieron 200.
- No se ejecutó `pnpm audit`; queda como recomendación para T08/T09.

## K. Problemas encontrados y soluciones

1. **Canonical de 404 incorrecto:** Astro generaba `/404/` por `trailingSlash: 'always'`, aunque el archivo real es `404.html`. Se añadió la prop `canonical` y la página 404 declara `/404.html`.
2. **Indicador de foco con alfa:** el outline base usaba `outline-ring/50`; la transición de color partía de 2.74:1 en claro. Se cambió a `outline-ring` y el foco es inmediatamente full color (6.69:1 en claro, 9.53:1 en oscuro).
3. **Objetivo táctil del breadcrumb:** el enlace «Proyectos» medía menos de 24 px; se corrigió con `inline-flex min-h-6 items-center`.
4. **Chunk React huérfano:** `dist/_astro/client.BmNEQPXu.js` (220 761 B) se sigue emitiendo sin referencias HTML. Un experimento con React desactivado lo eliminó, pero no se aplicó porque retirar la integración es una decisión de T01. Se documenta como pendiente de optimización.
5. **Falsos positivos de imágenes:** la comprobación inicial de recursos marcó imágenes lazy como ausentes; al validar los `src` contra `dist` y esperar la carga, no había roturas.
6. **Preview en puerto ocupado:** el primer intento de preview usó un puerto ya activo; se reutilizó el servidor existente y se detuvo al terminar. No afectó al build.

## L. Riesgos, limitaciones y pendientes

- **GitHub Pages no verificado:** el comportamiento real de 404 y el despliegue corresponden a T08/T09; no se afirma que la URL pública esté actualizada.
- **404 con `noindex` y canonical a `/404.html`:** es correcto para el archivo estático, pero el comportamiento de GitHub Pages ante rutas inexistentes debe confirmarse en T08.
- **`og:locale` es `es_ES`:** válido para contenido en español; si se desea alinear explícitamente con Paraguay, evaluar `es_PY` en T09.
- **Chunk React huérfano:** 220 761 B sin referencias; no se elimina por alcance arquitectónico. Evaluar en una tarea específica.
- **Lighthouse publicado:** no ejecutado; corresponde a T09.
- **Lectores de pantalla y navegadores:** solo se auditó con Chrome 155; no se probó NVDA, VoiceOver, Firefox ni Safari.
- **Preview social:** no se validó con depuradores de Facebook/LinkedIn/X; la imagen y metadatos están generados y son accesibles localmente.
- **Auditoría de dependencias:** no ejecutada; recomendar `pnpm audit` en CI/T08.
- **Sin commit:** todos los cambios y este informe permanecen locales.

## M. Cumplimiento de criterios de aceptación

| Criterio T07 | Estado | Evidencia |
|---|---|---|
| Títulos/metadatos por página | Cumplido | 6 páginas con title, description, canonical, robots y OG únicos. |
| Canonical | Cumplido | Canonical absoluto; 404 con override `/404.html`. |
| OG | Cumplido | OG y Twitter Card con imagen 1200×630 y alt. |
| Sitemap | Cumplido | 5 URLs indexables; 404 excluida. |
| Robots | Cumplido | `robots.txt` con sitemap; sin rutas secretas. |
| Favicon | Cumplido | SVG + ICO 16/32/48/64. |
| 404 | Cumplido en local | `dist/404.html`, preview 404 y 200 directo. |
| Alt y foco | Cumplido | Axe sin violaciones; foco 2 px sólido y contraste ≥6.69:1. |
| Contraste | Cumplido | Claro 6.01–15.94:1; oscuro 7.21–17.60:1. |
| Enlaces | Cumplido | 17 internos sin errores; 3 externos 200. |
| Optimización de recursos | Parcial documentado | OG 106 KB; CSS 34 761 B; JS React huérfano 220 761 B pendiente por alcance. |
| `astro check` / build | Cumplido | 0 errores/warnings/hints; build de 6 páginas. |
| Checklist QA | Cumplido en local | Axe, teclado, responsive, temas, reduced motion, preview y recursos. |
| Rutas/links | Cumplido en local | Preview y script de enlaces sin errores. |
| Sin vulnerabilidades evidentes | Cumplido en lo revisado | Sin scripts de terceros, secretos, cookies ni enlaces externos caídos; auditoría de dependencias pendiente. |

**Excepciones documentadas:** verificación en GitHub Pages, Lighthouse publicado, lectores de pantalla, navegadores adicionales y optimización del chunk React quedan fuera del cierre local de T07 y se trasladan a T08/T09 o a una tarea específica.

## N. Estado de Git y recomendaciones

Estado final observado (sin `git add`):

```text
 M astro.config.mjs
 M package.json
 M pnpm-lock.yaml
 M src/layouts/BaseLayout.astro
 M src/layouts/CaseStudyLayout.astro
 M src/styles/global.css
?? public/favicon.ico
?? public/favicon.svg
?? public/images/social/
?? public/robots.txt
?? src/pages/404.astro
?? docs/implementations/T07-IMPLEMENTACION.md
```

- No hay cambios preparados ni commits de T07.
- No se hizo push, PR, merge ni despliegue.
- El informe queda sin seguimiento hasta autorización expresa.
- Cuando se autorice versionar, este informe debe incluirse en el mismo commit/PR de T07.
- Siguiente tarea propuesta: **T08 — CI/CD y Pages**, sin implementarla en esta sesión. Antes de comenzar, revisar el estado de Git, la autorización remota y las limitaciones de 404 de GitHub Pages documentadas aquí.

## O. Incidencia detectada en revisión manual — Respuesta automática 404

- **Fecha:** 2026-10-20
- **Estado:** corrección local aplicada; pendiente de revisión y de verificación real en GitHub Pages durante T08.
- **Rama:** `feat/t07-accessibility-seo`
- **Commit de partida:** `01bb342e210679923e623d357cb1afcec8dea624` (sin cambios de HEAD).

### O.1. Síntoma

Al navegar a una URL inexistente, el propietario observó una página de error interna de Astro en lugar de la página 404 personalizada de T07. La revisión se centró en distinguir:

1. el comportamiento del servidor de desarrollo;
2. el comportamiento del preview de Astro;
3. el comportamiento esperado en GitHub Pages;
4. la diferencia entre una URL con barra final y sin ella.

### O.2. Diagnóstico reproducido

Se ejecutaron tres servidores locales en puertos explícitos y se solicitó la misma matriz de rutas:

- `astro dev` en `127.0.0.1:4401`.
- `astro preview` nativo en `127.0.0.1:4403`.
- Preview estático local orientado a GitHub Pages en `127.0.0.1:4402`.

| Ruta | `astro dev` | `astro preview` nativo | Preview local tipo Pages |
|---|---|---|---|
| `/` | 200 | 200 | 200 |
| `/proyectos/sgaa/` | 200 | 200 | 200 |
| `/proyectos/no-existe/` | 404 personalizada | 404 personalizada | 404 personalizada |
| `/ruta-inexistente/` | 404 personalizada | 404 personalizada | 404 personalizada |
| `/ruta-inexistente` | 404 interna de Astro | 404 interna de Astro | 404 personalizada |
| `/404.html` | 404 personalizada | 200 personalizada | 200 personalizada |
| `/404` | 404 interna de Astro | 404 interna de Astro | 404 personalizada |
| `/404/` | 404 personalizada | 200 personalizada | 404 personalizada |
| `/proyectos/sgaa` | 404 interna de Astro | 404 interna de Astro | 308 → `/proyectos/sgaa/` → 200 |

La página interna de `astro dev` para `/ruta-inexistente` tiene título `404: Not Found` y no contiene el H1 ni el diseño de la 404 del proyecto. La de `astro preview` tiene título `404: Not Found (trailingSlash is set to "always")`, tampoco devuelve `text/html` y no usa `dist/404.html`.

### O.3. Causa

El proyecto usa Astro `7.4.0`, `output: 'static'` y `trailingSlash: 'always'`. En esa versión, el servidor de desarrollo y el preview de Astro validan la barra final antes de aplicar el fallback al archivo estático `404.html`. Por eso una ruta inexistente **sin barra final** cae en la plantilla interna de Astro, mientras que la misma ruta **con barra final** sí llega a la 404 personalizada.

El comportamiento es coherente con el diseño de Astro y con la incidencia upstream `withastro/astro#15427`: en desarrollo se considera esperado y en producción depende de cómo el hosting sirva el `404.html`. La documentación de GitHub Pages confirma que un archivo `404.html` en la raíz del sitio se usa como página personalizada para rutas no encontradas.

Por tanto, el fallo no estaba en `src/pages/404.astro` ni en el HTML generado: `dist/404.html` existe en la raíz y es correcto. El problema era el servidor local usado para validar la experiencia, no el artefacto estático.

### O.4. Decisión de corrección

No se cambió `trailingSlash`, no se añadió SSR ni adaptadores, no se creó una ruta comodín, no se redirige a la portada, no se añadió una segunda página 404, no se modificó `src/pages/404.astro` y no se introdujo middleware de Astro.

Se añadió una utilidad local de preview estático que emula el comportamiento relevante de GitHub Pages:

- sirve `dist/` como sitio estático;
- responde con HTTP 404 real y el cuerpo de `dist/404.html` para cualquier ruta inexistente, tanto con barra final como sin ella;
- conserva la URL solicitada; no redirige a `/`;
- redirige con 308 los directorios existentes solicitados sin barra final, igual que un hosting estático habitual;
- sirve correctamente los recursos de `public/` y `dist/_astro/`;
- soporta `GET` y `HEAD`; rechaza otros métodos con 405;
- bloquea traversal de rutas y no lista directorios;
- no se ejecuta en producción ni forma parte del build.

La utilidad es deliberadamente local. No es middleware de la aplicación ni intercepta peticiones en GitHub Pages.

### O.5. Cambios realizados

| Archivo | Cambio |
|---|---|
| `scripts/preview.mjs` | Nuevo servidor estático local para `dist/` con 404 personalizada, MIME, `HEAD`, 308 para directorios y protecciones básicas de rutas. |
| `package.json` | `preview` pasa a `node scripts/preview.mjs`; se añade `preview:astro` como `astro preview` para conservar el comando nativo. |

No se modificaron en esta corrección `astro.config.mjs`, `src/pages/404.astro`, los layouts, los contenidos ni los recursos de T07.

### O.6. Pruebas ejecutadas

Comandos principales:

```text
corepack pnpm run check
corepack pnpm run build
corepack pnpm run preview -- --host 127.0.0.1 --port 4402
corepack pnpm run preview:astro -- --host 127.0.0.1 --port 4403
corepack pnpm exec astro dev --host 127.0.0.1 --port 4401
```

Resultados:

- `astro check`: 0 errores, 0 warnings y 0 hints en 25 archivos.
- `astro build`: 6 páginas generadas; `dist/404.html` en la raíz; `sitemap-index.xml` generado con 5 URLs.
- Preview local tipo Pages: matriz de O.2 correcta; todas las rutas inexistentes probadas devuelven 404 con el HTML personalizado.
- El hash SHA-256 del cuerpo 404 del preview coincide con `dist/404.html`: `7c419bff736df9f800402c2e6e545a56eca45fd6669b8b66186fa124b34aea6a`.
- `HEAD /ruta-inexistente`: 404, `Content-Type: text/html; charset=utf-8`, `Content-Length: 18614`.
- Recursos verificados: `favicon.ico` 200 (32 038 B), `favicon.svg` 200 (351 B), `robots.txt` 200 (81 B), `sitemap-index.xml` 200 (192 B), `og-image.jpg` 200 (106 408 B), CSS `/_astro/ButtonLink.BMXf-PA1.css` 200 (34 948 B).
- `/proyectos/sgaa` responde 308 a `/proyectos/sgaa/` y la URL final devuelve 200; no hay redirección de rutas inexistentes a la portada.
- Intentos de traversal (`/../package.json` y variantes codificadas) devuelven 404.
- Prueba de navegador sobre la 404 del preview local: título y H1 `404 — Página no encontrada`; texto y enlace «Volver al inicio» presentes; el enlace apunta a `/` y navega a la portada; header, footer, favicon, CSS y fuente Geist cargados; selector de tema funcional, tema oscuro aplicado y persistido en `localStorage`; URL de la petición conservada.
- `git diff --exit-code 01bb342 -- src/content src/data`: sin cambios editoriales.
- `git diff --check`: sin errores de whitespace.

### O.7. Compatibilidad con GitHub Pages y límites

`dist/404.html` está en la raíz del artefacto, que es la ubicación que GitHub Pages documenta para la página 404 personalizada. La comprobación real del sitio publicado no se ha realizado en esta sesión y queda para T08, después de autorizar despliegue.

Limitaciones que deben quedar explícitas:

1. `astro dev` y `preview:astro` siguen mostrando su 404 interna para rutas inexistentes sin barra final. Es un comportamiento del servidor de Astro 7.4.0, no del sitio generado.
2. Para validar la experiencia equivalente a producción debe usarse `pnpm preview` (el preview local tipo Pages), no `astro dev`.
3. El script `scripts/preview.mjs` es una herramienta de validación local; no debe desplegarse como servidor de producción.
4. La confirmación en GitHub Pages, incluyendo el código HTTP real y la respuesta para rutas sin barra final, sigue pendiente de T08.

### O.8. Estado de Git al cierre de esta corrección

El estado de la sección N es anterior a esta incidencia. El estado observado ahora, sin `git add`, es:

```text
 M astro.config.mjs
 M package.json
 M pnpm-lock.yaml
 M src/layouts/BaseLayout.astro
 M src/layouts/CaseStudyLayout.astro
 M src/styles/global.css
?? docs/implementations/T07-IMPLEMENTACION.md
?? public/favicon.ico
?? public/favicon.svg
?? public/images/social/
?? public/robots.txt
?? scripts/
?? src/pages/404.astro
```

- No hay cambios preparados, commits, push, PR, merge ni despliegue.
- El informe y `scripts/preview.mjs` permanecen sin seguimiento hasta autorización expresa.
- T07 no se declara cerrado hasta la revisión del propietario y, cuando corresponda, la verificación en Pages dentro de T08.

## P. Auditoría final de seguridad y preparación del cierre

- **Fecha:** 2026-10-20
- **Rama:** `feat/t07-accessibility-seo`
- **HEAD:** `01bb342e210679923e623d357cb1afcec8dea624` (sin cambios de HEAD)
- **Carácter:** auditoría final; no es una nueva implementación.
- **Restricciones respetadas:** no se modificó contenido editorial, datos, diseño ni elementos visuales; no se inició T08.

### P.1. Revisión del servidor de preview

Se revisó `scripts/preview.mjs` completo. El diseño observado es:

- Sirve exclusivamente desde `dist/`, resuelto contra `process.cwd()`.
- Normaliza la ruta solicitada, rechaza bytes nulos y comprueba contención lógica antes de tocar el sistema de archivos.
- Devuelve `308` para directorios existentes solicitados sin barra final, conservando la query.
- Devuelve `404` con el cuerpo exacto de `dist/404.html` para rutas inexistentes, con y sin barra final.
- Solo admite `GET` y `HEAD`; el resto responde `405` con `Allow: GET, HEAD`.
- No implementa listado de directorios.
- Escucha en `127.0.0.1` por defecto.

### P.2. Vulnerabilidad reproducida y corrección aplicada

**Hallazgo:** la contención lógica impedía traversal por `..`, pero `statSync`/`createReadStream` seguían enlaces simbólicos. Un enlace simbólico colocado dentro de `dist/` permitía servir archivos externos.

Evidencia antes de la corrección, con enlaces temporales creados y eliminados durante la prueba:

| Petición | Resultado anterior | Contenido |
|---|---|---|
| `/leak-file.txt` → `/etc/hostname` | **200**, 7 B | Archivo externo a `dist`. |
| `/leak-dir/implementations/T07-IMPLEMENTACION.md` → `docs/` | **200**, 25 709 B | Documentación interna del repositorio. |

**Corrección mínima:** se resolvió la ruta real con `realpathSync` y se comprobó que permaneciera dentro de `realRoot`, también resuelto. La comprobación se aplica antes de servir el archivo y el flujo usa la ruta real validada. No se cambiaron rutas públicas, códigos de estado ni comportamiento funcional.

Archivo modificado en esta auditoría:

| Archivo | Cambio |
|---|---|
| `scripts/preview.mjs` | Contención por ruta real: `realRoot`, `resolveFile()` con `realpathSync`, uso de la ruta validada al servir. Se conserva el mensaje amigable si falta `dist/404.html`. |

Resultado posterior: los tres intentos de enlace simbólico devuelven **404** con la página personalizada y no se sirve contenido externo.

### P.3. Casos de prueba ejecutados

Matriz final: 47 rutas solicitadas con `curl --path-as-is`, más comprobaciones de métodos, cabeceras y los 27 archivos de `dist/`.

| Categoría | Casos representativos | Resultado |
|---|---|---|
| Páginas válidas | `/`, `/index.html`, `/proyectos/sgaa/`, `/404.html` | 200 |
| Directorio sin barra final | `/proyectos/sgaa`, `/proyectos/sgaa?x=1` | 308 → `/proyectos/sgaa/` conservando `?x=1` |
| Rutas inexistentes | `/proyectos/no-existe`, `/proyectos/no-existe/`, `/ruta-inexistente`, `/404`, `/404/` | 404 con página personalizada |
| Recursos | `favicon.ico`, `favicon.svg`, `robots.txt`, sitemap, OG image, CSS | 200 con MIME correcto |
| Directorios sin índice | `/_astro/`, `/images/`, `/images/social/`, `/proyectos/` | 404, sin listado |
| Traversal y codificaciones | `/../package.json`, `/..%2f..%2fpackage.json`, `/%2e%2e/%2e%2e/package.json`, `/%252e%252e%252f...`, `/....//package.json`, `/.%2e/.%2e/package.json`, `/proyectos/..%2f..%2fpackage.json` | 404 |
| Separadores alternativos | `/..\\..\\package.json`, `/..%5c..%5cpackage.json`, `/%2e%2e%5c%2e%2e%5cpackage.json`, `/%5c..%5c..%5cpackage.json` | 404 |
| Rutas absolutas | `//etc/passwd`, `/etc/passwd`, `/%2Fetc%2Fpasswd` | 404 |
| Byte nulo | `/%00`, `/%2500`, `/%2e%2e%00/package.json` | 404 |
| Secretos y repositorio | `/.env`, `/.env.local`, `/.env.example`, `/package.json`, `/pnpm-lock.yaml`, `/AGENTS.md` | 404 |
| Código y documentación | `/src/pages/404.astro`, `/scripts/preview.mjs`, `/docs/implementations/T07-IMPLEMENTACION.md`, `/node_modules/astro/package.json` | 404 |
| Enlaces simbólicos | Archivo externo y directorio externo dentro de `dist/` | 404 tras la corrección |
| Métodos | `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`, `TRACE` sobre `/` y ruta inexistente | 405 con `Allow: GET, HEAD` |
| `HEAD` | `/` y `/ruta-inexistente` | 200 y 404 respectivamente, con `Content-Type` y `Content-Length` |
| Cuerpo 404 | `/ruta-inexistente` frente a `dist/404.html` | SHA-256 idéntico: `7c419bff736df9f800402c2e6e545a56eca45fd6669b8b66186fa124b34aea6a` |
| Archivos del build | Los 27 archivos de `dist/` solicitados por su ruta pública | 27/27 responden 200 |

No se observaron respuestas 200 para rutas fuera de `dist`, ni listados de directorio, ni exposición de `.env`, código fuente, repositorio o documentación interna.

### P.4. Confirmación de uso exclusivo en desarrollo

- `scripts/preview.mjs` solo se referencia en el script `preview` de `package.json`.
- `build` ejecuta únicamente `astro build`.
- No existe `.github/` ni workflow de despliegue en el repositorio.
- `dist/` no contiene el script, `src/`, `docs/`, `.env` ni archivos del repositorio.
- Los HTML generados no incluyen scripts externos.
- El script no participa en el artefacto estático ni se sirve desde GitHub Pages. La configuración de publicación sigue pendiente de T08.

### P.5. Comandos finales y resultados

| Comando | Resultado |
|---|---|
| `node --check scripts/preview.mjs` | Exit 0. |
| `corepack pnpm run check` | Exit 0; 25 archivos, 0 errores, 0 warnings, 0 hints. |
| `corepack pnpm run build` | Exit 0; 6 páginas, `dist/404.html` y sitemap generados. |
| `git diff --check` | Exit 0; sin errores de whitespace. |
| `git diff --exit-code 01bb342 -- src/content src/data` | Exit 0; sin cambios editoriales ni de datos. |
| Búsqueda de patrones de secretos en `src`, `public`, `scripts`, configuración y `package.json` | Sin coincidencias. |

No se ejecutó `pnpm lint` porque el proyecto no define ese script. No se ejecutó `pnpm audit` ni Lighthouse; siguen recomendados para T08/T09.

### P.6. Estado final de Git y archivos del futuro commit T07

Estado observado sin `git add`:

```text
 M astro.config.mjs
 M package.json
 M pnpm-lock.yaml
 M src/layouts/BaseLayout.astro
 M src/layouts/CaseStudyLayout.astro
 M src/styles/global.css
?? docs/implementations/T07-IMPLEMENTACION.md
?? public/favicon.ico
?? public/favicon.svg
?? public/images/social/
?? public/robots.txt
?? scripts/
?? src/pages/404.astro
```

Lista exacta de archivos que integrarían el commit T07:

1. `astro.config.mjs`
2. `package.json`
3. `pnpm-lock.yaml`
4. `scripts/preview.mjs`
5. `src/layouts/BaseLayout.astro`
6. `src/layouts/CaseStudyLayout.astro`
7. `src/styles/global.css`
8. `src/pages/404.astro`
9. `public/favicon.ico`
10. `public/favicon.svg`
11. `public/images/social/og-image.jpg`
12. `public/robots.txt`
13. `docs/implementations/T07-IMPLEMENTACION.md`

`dist/` está ignorado por Git y no forma parte del commit.

### P.7. Riesgos y limitaciones residuales

- La comprobación por `realpath` reduce la superficie, pero existe una ventana teórica TOCTOU entre validación y lectura; explotarla exige capacidad de escritura en `dist/`, que ya implicaría control del artefacto local. No se añadió complejidad adicional.
- `scripts/preview.mjs` es una herramienta local de validación, no un servidor de producción.
- La respuesta 404 real de GitHub Pages sigue pendiente de verificación en T08.
- No se ejecutó auditoría de dependencias ni Lighthouse.
- No se probó el preview con otros sistemas operativos; en Linux el separador alternativo se trata como carácter literal y la contención por ruta real se mantiene.

### P.8. Conclusión

La revisión de seguridad es satisfactoria tras corregir la fuga por enlaces simbólicos. No quedan vulnerabilidades reproducibles conocidas en el alcance auditado, el servidor solo sirve contenido dentro de `dist`, no expone secretos ni documentación interna, y su uso es exclusivamente local.

**T07 queda lista para autorización de versionado.** No se realizaron `git add`, commit, push, PR ni merge.

## Q. Aprobación final y autorización de versionado

- **Fecha:** 2026-10-20.
- **Estado:** implementación validada por el propietario.
- **Incidencia 404:** diagnosticada y documentada en la sección O; se distinguió el comportamiento de `astro dev`/`astro preview` del artefacto estático y del preview local orientado a GitHub Pages.
- **Servidor de preview local:** incorporado en `scripts/preview.mjs` para reproducir respuestas HTTP 404 reales y el comportamiento de directorios sin barra final durante las pruebas locales.
- **Seguridad:** vulnerabilidad de exposición mediante enlaces simbólicos reproducida y corregida; las pruebas posteriores confirmaron que solo se sirve contenido dentro de `dist/`.
- **Pruebas de seguridad:** satisfactorias dentro del alcance auditado, sin exposición de `.env`, archivos del repositorio, código fuente ni documentación interna.
- **Autorización:** el propietario autoriza expresamente la preparación de los 13 archivos de T07, la creación de un único commit local y el push de la rama `feat/t07-accessibility-seo` a `origin`.
- **Pendiente:** Pull Request, merge y despliegue no autorizados en esta ejecución.
- **Pendiente para T08:** verificación HTTP real de la página 404 y del sitio en GitHub Pages.

T07 no está integrada en `main`; la rama todavía debe publicarse y revisarse mediante el flujo correspondiente.
