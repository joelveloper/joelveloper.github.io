# Informe de implementación — T06

**Tarea:** T06 — Interactividad mínima, navegación móvil accesible y refinamiento editorial
**Fecha:** 2026-10-19
**Rama:** `feat/t06-minimal-interactivity`
**Base:** `main` actualizada por fast-forward hasta `0ee51ce` (Merge PR #6 · T05 integrada)
**Estado:** **Implementación completada y aprobada por el propietario; pendiente de commit e integración.**

**Actualización 2026-10-19:** el propietario aprobó una ampliación del alcance de T06. Las secciones A–V se conservan sin reescribir y documentan la implementación inicial del menú móvil. La sección W documenta el refinamiento editorial, la identidad personal y el sistema de apariencia clara, oscura y automática.

**Corrección editorial definitiva 2026-10-19:** el propietario aprobó los textos finales de los cuatro casos, el conjunto cerrado de indicadores y las variantes claras de las ilustraciones. Las secciones A–W se conservan como historial; la sección X documenta la sustitución literal y la adaptación de los SVG a los temas.

---

## A. Identificación y fecha

- Repositorio: `joelveloper/joelveloper.github.io`.
- Tarea: T06 — Interactividad mínima.
- Fecha de ejecución: 2026-10-19.
- Stack vigente comprobado: Astro `7.4.0`, `output: 'static'`, TypeScript estricto, Tailwind CSS `4.3.3`, React `19.3.1` y Radix `1.8.1` configurados pero no usados en runtime, Content Collections + MDX.
- Runtime local: Node `v24.21.0`, pnpm `12.14.0` mediante Corepack, Chrome `155.0.8059.84`.

---

## B. Rama y HEAD inicial

| Comprobación | Resultado real |
|---|---|
| Rama de partida | `feat/t05-case-studies` |
| HEAD de partida | `4b56e94cb6fc0c28c6e87039009bb0be511c6790` (`feat(portfolio): publish project case studies`) |
| `origin/main` | `0ee51ceeee65f39854834437e9d564ab6e3c02d8` (Merge PR #6) |
| `main` local | `5147872`, por detrás de `origin/main` |
| Árbol de trabajo | limpio (`git status --short` sin salida) |

Actualización y rama creada sin operaciones destructivas:

1. `git checkout main`.
2. `git merge --ff-only origin/main` → fast-forward `5147872..0ee51ce`.
3. `git checkout -b feat/t06-minimal-interactivity`.

No se usó `reset`, `rebase`, `force push` ni borrado de ramas. T05 está integrada en `origin/main`.

---

## C. Estado inicial de Git

- Una sola worktree: `/home/jcantero/Source/onondive/joelveloper.github.io`.
- Sin cambios locales ajenos ni archivos temporales en el repositorio.
- Informes T01–T05 presentes e intactos.
- Las cinco rutas de T05 presentes en el build base: `/`, `/proyectos/sgaa/`, `/proyectos/controllote/`, `/proyectos/auditapy/`, `/proyectos/boozhome/`.
- `client.BmNEQPXu.js` (React, 220 761 bytes) ya se emitía sin referencia desde el HTML en T04/T05. Condición preexistente.

---

## D. Diagnóstico del header móvil

Auditoría ejecutada con el build base y Chrome headless + DevTools Protocol sobre `astro preview` antes de tocar código. Medición real del encabezado actual (`flex-wrap`, HTML/CSS puro):

| Viewport | Altura header | Enlaces en el header | Filas de navegación | Alto de cada enlace | Overflow horizontal |
|---:|---:|---:|---:|---:|---|
| 320 px | 145 px | 6 | 2 (+ fila de marca) | 28 px | No |
| 375 px | 145 px | 6 | 2 (+ fila de marca) | 28 px | No |
| 768 px | 69 px | 6 | 1 | 28 px | No |
| 1024 px | 69 px | 6 | 1 | 28 px | No |
| 1440 px | 69 px | 6 | 1 | 28 px | No |

Coordenadas reales a 320 px: marca en `y=16` (36 px de alto), navegación en `y=64` con dos filas (`y=64` y `y=100`), terminando en `y=128`; borde inferior del header en `145 px`.

Orden de tabulación base (primeros 10 `Tab`) a 320 px: `Saltar al contenido` → marca (`/`) → los 6 enlaces del header → CTAs del hero. Sin trampa de foco y con foco visible (`outline: 2px solid`). Los destinos de las anclas existían en la portada; desde los casos de estudio las anclas son absolutas (`/#...`) y navegan a la portada.

Los seis enlaces del header se conservan en todos los casos de estudio (`detailNavigation`), sin cambios de texto.

---

## E. Problemas reales detectados

1. En móvil (320 y 375 px) el header consume **145 px** de alto (~18 % de un viewport de 812 px) porque la navegación se reparte en **dos filas** bajo la marca.
2. El área de pulsación de cada enlace es de **28 px de alto**, por debajo del tamaño táctil recomendado (44 px), aunque supera el mínimo exigible de 24 px.
3. La navegación compite visualmente con el hero en la primera pantalla del móvil y diluye la jerarquía editorial.

Estos datos confirman un problema real de comodidad/higiene móvil y justifican **Opción B**. En escritorio (≥768 px) el header cabe en una fila de 69 px y la navegación es adecuada; no procede modificarla.

---

## F. Alternativas evaluadas

### F.1 HTML/CSS nativo con `flex-wrap` (Opción A)

- Ventaja: cero JavaScript; ya implementado.
- Motivo para no elegirla: mantiene 145 px de header y enlaces de 28 px en móvil; no resuelve los problemas de la sección E.

### F.2 Patrón nativo `<details>`

- Ventaja: plegable sin JavaScript.
- Motivo para no elegirlo: no ofrece cierre con `Escape` ni restauración de foco uniformes; habría requerido JavaScript para cubrir los requisitos de teclado y foco sin ventaja clara.

### F.3 Diálogo modal nativo `<dialog>` + `showModal()` con micro-script

- Ventaja: semántica modal nativa (`role="dialog"`, `modal=true`), foco contenido por el navegador, `Escape` nativo, sin `inert` manual y sin dependencias.
- Coste: un script mínimo para abrir/cerrar, cerrar al seleccionar enlace, restaurar foco y cerrar al pasar a escritorio; el navegador no delimita el ciclo de `Tab`, por lo que se añaden unas pocas líneas de contención de foco.
- Decisión: **elegida**.

### F.4 Isla React con Radix `Dialog`/Sheet (Opción B con React)

- Ventaja: Radix ya aporta contención de foco, cierre con `Escape`, portal y restauración.
- Motivo para descartarla: obligaría a hidratar una isla React y emitir el runtime de React/Radix para una navegación que el elemento nativo `<dialog>` resuelve sin hidratación. Contradice «no incorporar JavaScript simplemente para demostrar React/Radix» y el enfoque de islas estrictamente necesarias del ADR-001.

No se implementaron dos soluciones: solo la elegida (F.3).

---

## G. Decisión técnica y justificación

**Opción B — menú móvil accesible construido sobre `<dialog>` modal nativo**, con un micro-script de ~1,4 KB en línea (671 B gzip) y sin dependencias nuevas.

Justificación:

- Resuelve los problemas reales de la sección E (header compacto de 77 px, control de 44 px, enlaces de 48 px).
- Mantiene Astro estático: cero islas, cero hidratación, cero `client:*`, cero scripts externos nuevos.
- Reutiliza una única fuente de verdad de la navegación: el mismo arreglo `nav` que ya se pasa a `SiteHeader` (`src/data/navigation.ts` → `mainNavigation` / `detailNavigation`).
- La contención de foco se delega en el navegador (elemento modal); solo se añade el ciclo de `Tab` que `<dialog>` no delimita por sí mismo.

---

## H. Archivos modificados y creados

### Creados

- `src/components/layout/MobileNavigation.astro` — control de apertura, diálogo modal nativo, navegación móvil, respaldo `<noscript>` y micro-script de comportamiento.
- `docs/implementations/T06-IMPLEMENTACION.md` — este informe (sin preparar).

### Modificados

- `src/components/layout/SiteHeader.astro` — la navegación de escritorio pasa a `hidden md:block`; se inserta `<MobileNavigation>` reutilizando `nav`, `siteName`, `monogram` y `brandHref`.
- `src/styles/global.css` — bloqueo de scroll del fondo mientras el diálogo está abierto: `body:has([data-mobile-nav-dialog][open]) { overflow: hidden; }`.

### Eliminados

- Ninguno.

### No modificados (verificado)

- `src/content/projects/*.mdx` y `src/content.config.ts` (textos y métricas aprobados en T05 intactos).
- `src/data/navigation.ts`, `src/data/profile.ts`, `src/layouts/*`, `src/pages/*`, `src/components/ui/*`.
- `astro.config.mjs` (`output: 'static'` intacto, sin adaptador), `package.json`, `pnpm-lock.yaml`, `components.json`, `tsconfig.json`.
- `docs/implementations/T01-IMPLEMENTACION.md` … `T05-IMPLEMENTACION.md` y el resto de `docs/`.

---

## I. Dependencias

- **No se añadieron, actualizaron ni eliminaron dependencias.** No se reinicializó shadcn/ui. `components.json` permanece intacto. `pnpm-lock.yaml` no cambió. `corepack pnpm install --frozen-lockfile` finalizó con exit 0 sin cambios.

---

## J. Comportamiento del menú implementado

### Presentación

- **Móvil (<768 px):** se muestra la marca `JC` + «Joel Cantero» y un control «Menú» (44 px, `aria-label="Abrir menú de navegación"`). La lista horizontal se oculta sin eliminar los enlaces: viven en el diálogo y en el respaldo `<noscript>`.
- **Menú abierto:** panel modal superior (`<dialog>` en la capa superior) con marca, botón «Cerrar menú de navegación» (44×44) y **6 opciones** de navegación con 48 px de alto.
- **Escritorio (≥768 px):** navegación horizontal intacta; el control y el diálogo quedan ocultos (`md:hidden`). Sin controles innecesarios.

### Comportamiento

- Apertura con pulsación/`Enter`/`Space` sobre el botón (elemento `<button type="button">` nativo).
- `aria-expanded` cambia a `true`/`false`; `aria-controls="mobile-navigation"`; `aria-haspopup="dialog"`.
- `Escape` cierra (nativo) y devuelve el foco al control de apertura.
- El botón «Cerrar», un clic en el fondo (backdrop) y la transición a escritorio cierran el menú.
- Al seleccionar un enlace de la misma página, el menú se cierra y el foco pasa a la sección destino (se añade `tabindex="-1"` de forma programática la primera vez).
- Al seleccionar un enlace que navega a otra página, el menú se cierra y la navegación continúa.
- Fondo inerte mientras el diálogo está abierto (`showModal()`); scroll del `body` bloqueado con `:has(...)`.
- Sin animaciones: se respeta `prefers-reduced-motion` sin transiciones añadidas.

---

## K. Pruebas de teclado, Escape y foco

Ejecutadas con Chrome headless + DevTools Protocol (eventos reales `Input.dispatchKeyEvent`):

| Prueba | Resultado |
|---|---|
| Orden cerrado 320 px (`Tab`) | `Saltar al contenido` → marca → `Menú` → CTAs del hero. Enlaces del diálogo no alcanzables |
| Apertura con `Enter` sobre «Menú` | Diálogo abierto; foco en «Cerrar menú»; `aria-expanded=true` |
| Apertura con `Space` | Diálogo abierto; foco en «Cerrar menú» |
| `Tab` dentro del diálogo | Ciclo contenido: `Cerrar` → marca → 6 enlaces → `Cerrar` (sin salir) |
| `Shift+Tab` desde «Cerrar» | Envuelve al último enlace (`Contacto`) |
| `Escape` | Diálogo cerrado; `aria-expanded=false`; foco restaurado en «Menú» |
| Clic en «Cerrar» | Cerrado; foco restaurado en «Menú» |
| Clic en backdrop | Cerrado; foco restaurado en «Menú» |
| Foco visible | `:focus-visible` con contorno de 2 px (`--ring`) en control, enlaces y cierre |
| Cierre por enlace de misma página | Foco en la sección destino (`#proyectos`, `#contacto`, …); scroll correcto |
| Cambio de viewport 320 → 768 con menú abierto | Diálogo cerrado, `aria-expanded=false`; control oculto y navegación horizontal visible |
| 320 → 767 con menú abierto | Permanece abierto (sigue siendo móvil) |

Nota: el ciclo de `Tab` dentro del diálogo se refuerza con un manejador de `keydown` que solo delimita el primero/último elemento; la contención y el comportamiento modal los aporta `<dialog>`, no una implementación manual de foco.

---

## L. Validación de navegación en las cinco páginas

- Desde `/` los seis enlaces usan anclas relativas (`#inicio` … `#contacto`) y todas las secciones existen; el menú se cierra y el foco va al destino.
- Desde `/proyectos/sgaa/`, `/proyectos/controllote/`, `/proyectos/auditapy/` y `/proyectos/boozhome/` los seis enlaces son absolutos (`/#inicio` … `/#contacto`); los 24 clics (6 × 4 páginas) llegan a la portada con el hash correcto y el menú cerrado.
- La diferencia `mainNavigation` (portada) vs `detailNavigation` (casos) se conserva.
- Verificación de integridad de enlaces internos en las cinco páginas: sin `href` vacíos, sin anclas inexistentes y sin rutas 404. Las cuatro tarjetas conservan sus enlaces `/proyectos/.../`.
- No se detectaron enlaces duplicados incorrectos ni rutas relativas rotas.

---

## M. Validación responsive

25 combinaciones (5 páginas × 5 viewports) medidas con Chrome headless:

- **25/25 sin overflow horizontal** (`scrollWidth === clientWidth`, salvo el ancho de barra de desplazamiento en ≥768, sin desbordamiento).
- **25/25 con un único `H1`** y estructura intacta.
- Header móvil: **77 px** en 320/375 px (control de 44 px) frente a 145 px previos.
- Header escritorio: **69 px**, una fila; control móvil oculto.
- Menú abierto en 320/375: panel de **395 px**, **6 enlaces de 48 px**, sin overflow.
- Casos de estudio intactos: indicadores de SGAA (`En producción`) y ControlLote (`En desarrollo`) presentes; BoozHome (`Prelanzamiento`); contenido MDX sin alteraciones.
- Aproximación a zoom 200 %: se probaron anchos CSS de **720 y 640 px** (equivalentes a 200 % sobre 1440/1280): menú funcional, sin overflow ni recortes. **No se ejecutó un cambio de zoom real del navegador.**
- Capturas locales de estados abierto/cerrado en 320 y 375 px para las cinco páginas, en `/tmp/opencode/t06/`, **no versionadas**.

---

## N. Accesibilidad

- `<dialog>` modal nativo: `role="dialog"`, nombre accesible «Navegación del sitio» (`aria-labelledby`), `modal=true` verificado en el árbol de accesibilidad.
- Control: `<button type="button">` con nombre accesible, `aria-expanded`, `aria-controls`, `aria-haspopup="dialog"`.
- Árbol de accesibilidad: con el menú **cerrado** los enlaces del panel no se exponen; con el menú **abierto** se exponen los seis enlaces y la página de fondo queda inerte.
- Foco visible global (2 px con `--ring`); skip link «Saltar al contenido» intacto.
- Contraste: los enlaces del menú heredan `foreground/background` (17.6:1, ya validado en T02/T04); el borde es decorativo. No se recalcularon ratios nuevos.
- `prefers-reduced-motion: reduce` emulado: `transition-duration: 1e-05s`, `animation-duration: 1e-05s`, `scroll-behavior: auto`.
- Sin formularios, cookies, terceros ni contenido solo accesible al hover.
- **No se ejecutó axe ni una auditoría automatizada** (no estaba disponible); la comprobación se hizo con el árbol de accesibilidad de Chrome y teclado real. No se declara cumplimiento total de WCAG por estas pruebas limitadas.

---

## O. Impacto en JavaScript y rendimiento

| Métrica | Antes (T05) | Después (T06) |
|---|---:|---:|
| Scripts externos en el HTML | 0 | 0 |
| Islas Astro / `client:*` | 0 / 0 | 0 / 0 |
| JavaScript en línea por página | 0 | 1 script, 1 426 B (671 B gzip) |
| `dist/index.html` | 35 649 B | 41 280 B (7 057 B gzip) |
| `client.BmNEQPXu.js` (React, no referenciado) | 220 761 B | 220 761 B (sin cambios) |

- El menú **no hidrata React** y **no añade peticiones de red**: el micro-script se inserta en línea en cada página.
- El crecimiento de HTML (~5,6 KB en la portada) proviene del marcado del diálogo y del respaldo `<noscript>` (la navegación se renderiza desde el mismo arreglo, sin duplicar datos).
- Se confirmó que ninguna otra sección se hidrata accidentalmente.
- No se establece ninguna cifra ficticia de mejora: el único efecto medible es que el header móvil baja de 145 px a 77 px y que el coste de JavaScript es de 1 426 B en línea.

---

## P. Decisión respecto del diálogo de imágenes (lightbox)

**No se implementa lightbox en T06.** Justificación:

- Las imágenes de las cuatro tarjetas y de los cuatro casos son **abstracciones SVG originales** de 320×180, no capturas de producto; ampliarlas no aporta información funcional nueva.
- No existe una necesidad demostrable ni recursos autorizados que justifiquen un diálogo modal.
- Convertir ilustraciones decorativas en elementos interactivos contradiría el propósito del componente.
- Requeriría además una isla React (Radix `Dialog`) solo para ampliar imágenes decorativas.

Esta evaluación se registra como resultado válido de T06. No se crearon capturas ficticias ni se usaron imágenes privadas de SGAA, ControlLote, AuditaPy o BoozHome.

---

## Q. Problemas encontrados y soluciones

1. **Ciclo de `Tab` no delimitado por `<dialog>`.** El navegador no envuelve el foco tras el último elemento; se añadió un manejador de `keydown` que intercepta el paso del primero al último y viceversa. Verificado: `Tab` y `Shift+Tab` no salen del panel.
2. **Restauración de foco dependiente del elemento previamente enfocado.** Se sustituyó por una intención explícita de foco al cerrar: «Menú» para cierres normales y la sección destino para enlaces de misma página. Verificado en `Escape`, «Cerrar» y backdrop.
3. **Foco perdido al seleccionar un enlace.** Se enfoca la sección destino (con `tabindex="-1"` programático) y se conserva el desplazamiento del ancla.
4. **Apertura programática de un control oculto en escritorio.** Se añadió una guarda `trigger.getClientRects().length === 0` para no abrir el diálogo cuando el control móvil no está visible.
5. **Bloqueo del scroll del fondo.** Se resolvió con `body:has([data-mobile-nav-dialog][open]) { overflow: hidden; }`, sin JavaScript adicional.
6. **Enlaces `md:hidden` del panel.** Se comprobó que, cerrado, el panel no expone enlaces al árbol de accesibilidad ni al orden de `Tab`.

---

## R. Riesgos y limitaciones

1. **Dependencia de JavaScript para el menú.** Sin JS, el control se oculta y se muestra un respaldo `<noscript>` con los seis enlaces (patrón `flex-wrap`), de modo que la navegación móvil sigue siendo posible sin JavaScript, aunque sin panel modal.
2. **Marcado de navegación repetido.** La navegación se renderiza tres veces (escritorio, diálogo y `<noscript>`) siempre desde el mismo arreglo. No hay datos duplicados a mano, pero sí más HTML.
3. **`client.BmNEQPXu.js` sin referenciar.** Procede de la configuración React de T01 y sigue emitiéndose sin cargarse. Preexistente; revisable en T07/T08.
4. **`<dialog>` y navegadores antiguos.** El patrón `<dialog>` + `:has()` requiere navegadores modernos; no se probó en Safari ni Firefox reales.
5. **Sin auditoría automatizada.** No se ejecutó axe/Playwright ni Lighthouse; no hay medición de campo.
6. **Zoom real.** La comprobación al 200 % es por equivalencia de ancho, no un zoom real del navegador.
7. **`tabindex="-1"` en secciones destino.** Se añade de forma programática tras la primera selección de un enlace; no altera el orden de tabulación normal.

---

## S. Pruebas ejecutadas y no ejecutadas

### Ejecutadas

- `corepack pnpm install --frozen-lockfile` → exit 0.
- `corepack pnpm exec astro sync` → exit 0.
- `corepack pnpm exec astro check` → exit 0 (21 archivos; 0 errores, 0 warnings, 0 hints).
- `corepack pnpm run build` → exit 0 (5 páginas estáticas, `output: "static"`).
- `git diff --check` → exit 0.
- Verificación de las cinco rutas `dist/...` presentes.
- Auditoría de header base y final en 320/375/768/1024/1440 px (Chrome headless + CDP).
- Pruebas de teclado, `Enter`, `Space`, `Escape`, foco y contención.
- Navegación de los seis enlaces desde las cinco páginas.
- 25 combinaciones responsive sin overflow.
- Árbol de accesibilidad (`getFullAXTree` / `getPartialAXTree`).
- `prefers-reduced-motion` emulado.
- Respaldo sin JavaScript (`Emulation.setScriptExecutionDisabled`).

### No ejecutadas

- Lighthouse.
- axe / Playwright.
- Safari, Firefox y dispositivos móviles reales.
- Zoom real al 200 % del navegador.
- Auditoría automatizada de contraste.
- Despliegue o build remoto.
- Validación de disponibilidad de dominios externos.

---

## T. Cumplimiento de criterios de aceptación

| Criterio | Estado |
|---|---|
| Se evaluó el encabezado móvil existente | ✔ (sección D) |
| Se documentó la necesidad real de interactividad | ✔ (sección E) |
| La solución elegida mantiene una experiencia profesional | ✔ (capturas locales) |
| La navegación móvil es usable desde 320 px | ✔ |
| Los seis enlaces funcionan | ✔ (desde las cinco páginas) |
| El comportamiento con teclado es correcto | ✔ |
| `Escape` y foco funcionan correctamente | ✔ |
| Si hay diálogo modal, el foco queda gestionado | ✔ (`<dialog>` modal + contención de `Tab`) |
| La navegación funciona desde las cuatro páginas de proyecto | ✔ |
| No se hidrata toda la página | ✔ (0 islas, 0 `client:*`) |
| No se añade JavaScript innecesario | ✔ (1 426 B en línea, sin dependencias) |
| Las tarjetas permanecen estáticas | ✔ |
| Los cuatro casos de estudio permanecen intactos | ✔ (MDX sin cambios) |
| La decisión sobre las imágenes está documentada | ✔ (sección P) |
| Se respeta `prefers-reduced-motion` | ✔ |
| No existen enlaces internos rotos | ✔ |
| El build continúa generando cinco páginas | ✔ |
| `astro check` termina correctamente | ✔ |
| El informe T06 existe | ✔ (este documento) |
| No se inició T07–T10 | ✔ |
| No se realizó commit ni push | ✔ |

---

## U. Estado final de Git

- Rama: `feat/t06-minimal-interactivity`.
- HEAD: `0ee51ce` (sin commits nuevos durante la implementación).
- `git status --short`:
  - ` M src/components/layout/SiteHeader.astro`
  - ` M src/styles/global.css`
  - `?? src/components/layout/MobileNavigation.astro`
  - `?? docs/implementations/T06-IMPLEMENTACION.md`
- `git diff --stat`: 2 archivos modificados, 7 inserciones y 1 eliminación (más 1 componente nuevo y este informe, sin seguimiento).
- Informes T01–T05 intactos. Sin cambios en MDX, configuración, dependencias ni lockfile.
- No se ejecutó `git add`, commit, push, PR, merge, rebase ni borrado de ramas.
- `main` no recibió commits directos; solo la actualización fast-forward previa.

---

## V. Recomendaciones para T07

1. Mantener el menú móvil como está: no introducir React ni Radix mientras `<dialog>` cubra los requisitos.
2. Resolver en T07 el 404 de `/favicon.ico`, canonical, Open Graph, sitemap y `robots.txt`.
3. Revisar el `client.BmNEQPXu.js` no referenciado (preexistente) y decidir si puede excluirse del build.
4. Evaluar si el HTML duplicado de la navegación (escritorio/diálogo/`<noscript>`) conviene reducirlo.
5. Ejecutar axe/Lighthouse y una prueba real de zoom al 200 % y de navegadores alternativos en T07/T09.
6. No modificar los textos MDX ni los indicadores aprobados en T05; cualquier cambio de estado de proyecto requiere decisión editorial.

---

## W. Refinamiento editorial, identidad personal y sistema de apariencia

**Fecha de esta ampliación:** 2026-10-19.
**Alcance:** portada, cuatro casos MDX, `CaseStudyLayout`, footer, separador de tecnologías y selector de apariencia.
**Restricción respetada:** no se inició T07–T10, no se añadieron dependencias y no se ejecutó `git add`, commit, push ni PR.

### W.1 Aprobación del nuevo alcance

La revisión visual del propietario actualizó T06 con tres decisiones expresas:

1. El portafolio debía hablar en primera persona y dejar de sonar como un informe editorial escrito por un tercero.
2. Las explicaciones administrativas sobre autorizaciones, verificaciones y gates debían salir de la interfaz pública sin debilitar los controles internos.
3. Se añadía un sistema de apariencia `Sistema / Claro / Oscuro`, con preferencia del SO por defecto, persistencia local y selector accesible en el header.

La implementación original del menú móvil con `<dialog>` nativo se conservó. No se creó una segunda navegación ni se reescribieron los MDX desde cero: se mantuvieron hechos, tecnologías, estados, métricas, gates y fechas operativas.

### W.2 Diagnóstico editorial inicial

Antes de editar se revisaron las cinco rutas y los cuatro MDX. Los problemas principales eran:

- Tercera persona o voz pasiva en la participación: «La responsabilidad del autor», «El autor tuvo a cargo», «El desarrollo tecnológico estuvo a cargo del autor».
- Explicaciones de control editorial visibles: «Datos agregados autorizados», «No constituyen una auditoría externa», «Caso documentado», «Última revisión», «No se presentan objetivos futuros como funcionalidades entregadas».
- Paneles laterales que repetían información administrativa y competían con el cuerpo del caso.
- Una descripción de Oñondive centrada en lo que no era, en lugar de explicar la iniciativa de forma personal.
- Una frase inferior en Tecnologías que duplicaba el rótulo y no aportaba información nueva.
- Un footer con copyright y repetición del nombre.
- Una única paleta oscura fija en `html.dark`, sin alternativa clara ni preferencia automática.

### W.3 Frases administrativas eliminadas de la interfaz

Se eliminaron de la vista pública, entre otras:

- «Cuatro proyectos con información aprobada para su presentación pública…».
- «Las tarjetas muestran nombres, categorías, estados y resúmenes aprobados…».
- «Última revisión: … · Caso documentado».
- Los rótulos «Esquema editorial» y «Caso verificado».
- «Datos agregados autorizados».
- El párrafo sobre cifras proporcionadas y autorizadas y la auditoría externa.
- Los paneles «Evidencia» y «Lectura del caso».
- «La imagen del encabezado es una abstracción original. No se publican capturas…».
- «Las capacidades descritas corresponden a información confirmada por el autor».
- «No es una empresa constituida ni representa la titularidad de los proyectos».
- «© 2026 Joel Cantero. Todos los derechos reservados».

Los controles internos permanecen intactos: `cardApproved`, `publicApproved`, `usageApproved`, `caseStudyStage`, `lastReviewed`, validación HTTPS, validación de rutas de imagen y restricciones de privacidad. Las notas de privacidad de ControlLote sobre identificadores, importes y datos de clientes se conservaron porque explican el alcance de los datos, no el proceso de autorización.

### W.4 Cambios de redacción por sección

**Portada — Sobre mí.** Se mantuvo la historia real: proyectos personales, aplicación de escritorio de 2020, evolución a SGAA web, comercialización desde agosto de 2025, trabajo de extremo a extremo y colaboración con profesionales de auditoría. Se ajustó la voz a primera persona: «he trabajado», «me encargué», «colaboré».

**Portada — Cómo trabajo.** Las cuatro etapas se conservaron, pero sus descripciones pasaron a primera persona: «Escucho», «Defino», «Construyo», «Pruebo». No se añadieron metodologías ni compromisos contractuales.

**Portada — Proyectos.** Se conservó el título «Productos construidos sobre problemas concretos» y las cuatro tarjetas. Se eliminaron la descripción del `SectionHeading` y el párrafo inferior. No se añadió un texto sustituto.

**Portada — Oñondive.** Se sustituyó la presentación defensiva por una descripción personal y positiva. El nombre y la nota se centralizaron en `src/data/profile.ts`.

**Portada — Trayectoria.** «Comienza la comercialización…» pasó a «Comencé la comercialización…»; «SGAA en producción, AuditaPy en desarrollo y nuevos proyectos en curso» pasó a «Mantengo SGAA en producción y desarrollo AuditaPy».

### W.5 Cambios en los cuatro MDX

| Proyecto | Cambio principal |
|---|---|
| SGAA | Participación reescrita en primera persona; eliminación de la sección de limitaciones administrativas y del párrafo sobre el dominio; indicadores renombrados y notas de alcance simplificadas. |
| ControlLote | Participación en primera persona; corrección del histórico de 18 meses; eliminación de descargos de autorización; notas de indicadores reescritas; nueva sección breve «Alcance de los datos». |
| AuditaPy | Participación en primera persona; eliminación de descargos sobre auditorías de seguridad, capturas y permisos; límites funcionales conservados en los módulos. |
| BoozHome | Participación en primera persona; contexto sin explicaciones de autorización; WhatsApp conservado; dominio mencionado sin enlace; estado de prelanzamiento intacto. |

No se añadieron métricas, clientes, testimonios, años de experiencia, certificaciones ni funcionalidades nuevas.

### W.6 Ajuste de ControlLote respecto a los 18 meses históricos

La interpretación correcta quedó fijada así:

> Hasta el último corte documentado se procesaron reportes históricos correspondientes a 18 meses por empresa.

Se corrigieron `summary`, cuerpo, indicador y nota:

- El corte es agosto de 2026 y el procesamiento se realizó en septiembre de 2026.
- Es un resultado acumulado.
- No es un límite del sistema.
- No representa 18 meses de operación continua ni antigüedad del servicio.
- No se afirma comercialización general ni disponibilidad pública.
- `status: development` se mantiene.

Las siete cifras se conservaron: 18 meses, 475 contratos, 377 lotes vendidos, 5.314 registros de cuotas, 1.252 registros con errores tratados o procesados, 110 lotes con diferencias y 62 excepciones pendientes. No se crearon porcentajes ni tasas derivadas.

### W.7 Simplificación de `CaseStudyLayout`

- Se eliminaron `reviewedAt`, `stageLabels` y la línea «Última revisión · Caso documentado».
- Se eliminó la nota «Este caso no incluye una imagen pública autorizada»; si no hay imagen, simplemente no se renderiza.
- Se eliminó el pie «Abstracción original… No es una captura del producto».
- «Datos agregados autorizados» pasó a **«Alcance en cifras»**.
- Se eliminó el párrafo sobre cifras autorizadas y auditoría externa.
- Se eliminaron los paneles laterales «Ficha del caso», «Evidencia» y «Lectura del caso».
- El cuerpo pasó a una columna centrada de lectura cómoda (`max-w-[72ch]`), sin barra lateral injustificada.
- Se conservaron categoría, estado, resumen, stack, imagen aprobada y botón de regreso.
- `lastReviewed` y `caseStudyStage` siguen en el esquema y en el frontmatter, aunque ya no se muestran.

### W.8 Simplificación del footer

- Se eliminó el bloque completo de copyright.
- Se eliminó la prop `year` y su variable; no quedaban consumidores.
- Se conservaron identidad, rol, descripción breve y enlaces de contacto.
- Se evitó repetir «Joel Cantero» dos veces contiguas: el kicker pasó a ser el rol profesional y el nombre quedó como titular.
- No se modificaron licencias del repositorio.

### W.9 Separador de tecnologías

Se eliminó la frase inferior:

> «Tecnologías con las que he trabajado. El nivel de profundidad varía según el proyecto y el contexto».

Se reutilizó únicamente el rótulo **«Tecnologías con las que he trabajado»**, integrado en la línea horizontal:

```text
────  Tecnologías con las que he trabajado  ───────────────
```

Composición implementada:

- Tramo corto de línea a la izquierda en `sm+`.
- Rótulo en mono, alineado a la izquierda.
- Línea restante a la derecha con `flex-1`.
- Sin línea atravesando las letras.
- A 320 px se oculta el tramo corto para evitar overflow; el rótulo mide 248 px, permanece en una sola línea y la línea derecha ocupa el espacio restante.
- Los cuatro grupos y todas las tecnologías se conservaron.

### W.10 Arquitectura de temas

La fuente de verdad cromática sigue en `src/styles/global.css`. Se sustituyó el bloque único oscuro por tokens con `light-dark()`:

```css
:root {
  color-scheme: light dark;
  --background: light-dark(#f8fafc, oklch(...));
  /* ... */
}
:root.light { color-scheme: light; }
:root.dark  { color-scheme: dark; }
```

Ventajas:

- Una sola declaración por token, con valor claro y oscuro.
- `.light` y `.dark` fuerzan una preferencia manual.
- Sin clase, `color-scheme: light dark` deja que el navegador resuelva la preferencia del sistema, incluso sin JavaScript.
- Los tokens semánticos (`card`, `muted`, `border`, `ring`, `primary`, `surface`, `surface-raised`, `positive`) se derivan de la misma paleta.
- `color-scheme` actualiza controles nativos y barras de desplazamiento.
- No se usan utilidades `dark:` que puedan desincronizarse; los componentes consumen tokens.

### W.11 Detección de preferencias del SO

- Por defecto, `data-appearance="system"` y ninguna clase de tema.
- `prefers-color-scheme` lo resuelve `light-dark()` mediante `color-scheme`.
- Si el SO cambia mientras la página está abierta y la preferencia es Sistema, el CSS se actualiza sin recargar. Verificado con emulación de CDP.
- No se usa hora, geolocalización, servicios externos ni analítica.

### W.12 Persistencia de preferencias

- Clave de `localStorage`: `appearance`.
- Valores válidos: `system`, `light`, `dark`.
- Solo se guarda la preferencia de apariencia.
- Lectura y escritura están protegidas con `try/catch`.
- Si el almacenamiento falla, el cambio de tema se aplica durante la sesión y el sitio sigue navegable.
- «Sistema» elimina las clases y devuelve el control al SO.

### W.13 Prevención de parpadeo

- `BaseLayout` incluye un script inline en `<head>` que lee `localStorage` y aplica `data-appearance` y la clase `light`/`dark` antes de que se pinte el cuerpo.
- El HTML ya no lleva `class="dark"` fijo.
- `data-appearance="system"` queda como valor inicial seguro.
- No hay islas React ni hidratación, por lo que no existe riesgo de desajuste de hidratación.
- No se observó un cambio visible de tema tras recargar en las pruebas de captura; no se midió con grabación de vídeo ni con trazas de paint.

### W.14 Accesibilidad del selector

- Un único botón con icono en el header, con `aria-label="Cambiar apariencia"`, `aria-expanded` y `aria-controls="theme-options"`.
- Panel con `fieldset`, `legend` oculto y tres radios: Sistema, Claro y Oscuro.
- Nombres accesibles verificados en el árbol de accesibilidad: «Sistema», «Claro» y «Oscuro».
- El icono del botón refleja la preferencia actual (monitor, sol o luna), no solo el color.
- La opción seleccionada se indica con fondo, color y una marca de verificación; no depende únicamente del color.
- `Enter` y `Space` abren el panel.
- Las flechas del grupo de radios cambian la selección; el panel se cierra y el foco vuelve al botón.
- `Escape` cierra el panel y restaura el foco.
- Un clic o un cambio de foco fuera del selector cierra el panel.
- Foco visible de 2 px en el botón y en la opción enfocada.
- Sin JavaScript, el selector se oculta con `<noscript>` para no dejar un control muerto; el CSS sigue la preferencia del SO.

### W.15 Integración con el menú móvil

- No se creó un segundo menú móvil.
- El selector de apariencia permanece en el header y es accesible cuando el menú está cerrado.
- El `<dialog>` modal sigue usando la capa superior nativa; su backdrop y su bloqueo de scroll no compiten con el panel de tema.
- Al abrir el menú móvil con el panel de tema abierto, el panel se cierra y el foco entra en el diálogo.
- Los controles de tema y menú no se solapan en 320, 375, 768, 1024 ni 1440 px.
- El único cambio en `MobileNavigation.astro` fue ocultar la etiqueta visible «Menú» por debajo de `sm` para dejar espacio al selector; el `aria-label` y todo el comportamiento del diálogo se conservaron.

### W.16 Tokens claros y oscuros

Paleta clara aplicada:

| Token | Claro | Oscuro actual |
|---|---|---|
| `background` | `#F8FAFC` | `#0B1019` |
| `surface` | `#FFFFFF` | `#111A28` |
| `surface-raised` | `#F0F4FA` | `#182337` |
| `foreground` | `#152238` | `#F3F6FC` |
| `muted-foreground` | `#465670` | `#B5C3D7` |
| `border` | `#CAD4E2` | `#344257` |
| `brand` | `#2557A7` | `#91B8FF` |
| `brand-foreground` | `#FFFFFF` | `#0B1019` |
| `positive` | `#17674F` | `#70DDC0` |

Contrastes calculados (WCAG):

| Par | Claro | Oscuro |
|---|---:|---:|
| Texto principal / fondo | 15,23:1 | 17,60:1 |
| Texto secundario / fondo | 7,10:1 | 10,66:1 |
| Acento / fondo | 6,69:1 | 9,53:1 |
| Texto de botón / acento | 7,00:1 | 9,53:1 |
| Texto principal / superficie | 15,94:1 | 16,14:1 |

Los bordes son decorativos y no se usan como único indicador de estado.

### W.17 Impacto de JavaScript

| Elemento | Bytes | gzip |
|---|---:|---:|
| Inicialización de tema en `<head>` | 591 | 295 |
| Script del selector de tema | 1.224 | 578 |
| Script del menú móvil (T06 previo) | 1.426 | 671 |
| **Total JS en línea por página** | **3.241** | **1.544** |

- 3 etiquetas `<script>` por página, todas en línea.
- 0 referencias a archivos `.js` externos en el HTML.
- 0 islas Astro y 0 directivas `client:*`.
- No se cargan React, Radix ni librerías de tema.
- `client.BmNEQPXu.js` (220.761 B) sigue emitiéndose sin referencia desde el HTML; condición preexistente de la configuración React de T01.
- No se añadieron dependencias ni se modificó `pnpm-lock.yaml`.

### W.18 Pruebas técnicas

| Comando | Exit | Resultado real |
|---|---:|---|
| `corepack pnpm install --frozen-lockfile` | 0 | Lockfile reproducible; sin cambios |
| `corepack pnpm exec astro sync` | 0 | Contenido y tipos sincronizados |
| `corepack pnpm exec astro check` | 0 | 22 archivos; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | 0 | 5 páginas estáticas |
| `git diff --check` | 0 | Sin errores de espacios ni conflictos |

Rutas generadas y comprobadas físicamente:

```text
dist/index.html
dist/proyectos/sgaa/index.html
dist/proyectos/controllote/index.html
dist/proyectos/auditapy/index.html
dist/proyectos/boozhome/index.html
```

No se generaron rutas adicionales. No hay adaptador SSR; `output: 'static'` se mantiene.

### W.19 Pruebas responsive

Se ejecutaron 50 combinaciones: 5 páginas × 5 viewports (320, 375, 768, 1024, 1440) × 2 preferencias del SO en modo Sistema.

Resultados:

- 50/50 sin overflow horizontal.
- 50/50 con un único `H1`.
- 50/50 con imágenes cargadas.
- Header de 77 px en todos los viewports; selector de tema visible y sin solapamiento con el botón de menú.
- Menú móvil visible en 320, 375 y 768; navegación de escritorio en 768, 1024 y 1440.
- Separador de tecnologías: 0 solapamientos y 0 overflows en los 50 casos; a 320 px permanece en una sola línea (248 px) con línea a la derecha.
- Casos sin barra lateral; ancho de lectura de 265 px a 320, 705 px a 768 y 721 px a 1440.
- Indicadores de SGAA (2) y ControlLote (7) visibles y sin desbordamiento.
- Footer sin copyright en todas las páginas.
- Sin enlaces a `redfor-ti.com.py` ni a `boozhome.com.py`.

### W.20 Pruebas de teclado y accesibilidad

Ejecutadas con Chrome headless 155.0.8059.84 y Chrome DevTools Protocol:

| Prueba | Resultado |
|---|---|
| Orden inicial de tabulación a 320 px | `Saltar al contenido` → marca → selector de tema → menú |
| Foco visible | 2 px sólido en skip link, marca, tema, menú y opciones |
| Abrir tema con `Enter` | Abre; foco en la opción seleccionada; `aria-expanded=true` |
| Abrir tema con `Space` | Abre correctamente |
| `Escape` en el panel de tema | Cierra; foco vuelve a «Cambiar apariencia» |
| Flecha derecha en el grupo de radios | Cambia a Claro y luego a Oscuro; persiste en `localStorage` |
| Abrir menú móvil con `Enter` | Abre; foco en «Cerrar menú de navegación» |
| Abrir menú móvil con `Space` | Abre correctamente |
| Ciclo de `Tab` dentro del diálogo | 9/9 focos dentro del diálogo |
| `Escape` en el menú | Cierra; foco vuelve a «Abrir menú de navegación» |
| Cerrar con botón | Cierra; foco restaurado |
| Cerrar con backdrop | Cierra; foco restaurado |
| Enlace `#proyectos` | Cierra el menú y enfoca la sección destino |
| Panel de tema + menú móvil | Nunca quedan abiertos a la vez; el foco entra en el diálogo |
| Nombres accesibles | «Cambiar apariencia», «Sistema», «Claro», «Oscuro», «Abrir menú de navegación» |
| `lang` y `H1` | `lang="es"` y un `H1` por página |
| `prefers-reduced-motion: reduce` | `scroll-behavior: auto`; transición `1e-05s` |

No se ejecutó axe ni Lighthouse. No se probaron Safari, Firefox ni dispositivos reales. No se declara cumplimiento total de WCAG 2.2 AA; se aportan las comprobaciones realizadas.

### W.21 Pruebas de preferencia y persistencia

| Prueba | Resultado |
|---|---|
| Sin preferencia guardada, SO claro | Tema claro; `data-appearance="system"` |
| Sin preferencia guardada, SO oscuro | Tema oscuro; `data-appearance="system"` |
| Seleccionar Claro | Clase `light`, `localStorage=light`, fondo claro |
| Seleccionar Oscuro | Clase `dark`, `localStorage=dark`, fondo oscuro |
| Sistema con SO oscuro | Cambia a oscuro sin recargar |
| Sistema con SO claro | Cambia a claro sin recargar |
| Oscuro manual con SO claro | Permanece oscuro |
| Recarga con Oscuro manual | Persiste oscuro |
| Volver a Sistema y recargar con SO claro | Sigue en claro |
| Sin JavaScript con SO oscuro/claro | El CSS sigue el SO; selector oculto con `<noscript>` |
| `localStorage` bloqueado | El sitio carga en Sistema; el cambio manual funciona en la sesión sin persistir |

### W.22 Capturas locales disponibles

Se generaron 54 capturas organizadas por página, tema y viewport en:

```text
/tmp/opencode/t06-editorial-review/screens/
```

Incluyen:

- 5 páginas × 2 temas × 5 viewports = 50 capturas de página completa.
- Home a 320 px con menú abierto en claro y oscuro.
- Home a 1440 px con selector de tema abierto en claro y oscuro.

Se añadieron tres recortes de detalle fuera de `screens/`:

```text
/tmp/opencode/t06-editorial-review/tech-divider-light.png
/tmp/opencode/t06-editorial-review/tech-divider-dark.png
/tmp/opencode/t06-editorial-review/panel-320-light.png
```

No se versionó ninguna captura.

### W.23 Riesgos y limitaciones

1. **`light-dark()` requiere navegadores modernos** (Chrome/Edge 123+, Firefox 120+, Safari 17.5+). Es coherente con la matriz de navegadores actuales, pero no se probó en Safari ni Firefox reales.
2. **Las cuatro abstracciones SVG conservan su paleta oscura original en modo claro.** Se evaluó su integración y se mantuvieron sin alterar para respetar «conservar las abstracciones originales». Quedan a revisión visual del propietario.
3. **Favicon 404 preexistente.** El único error de consola observado es el 404 de `/favicon.ico`, pendiente de T07.
4. **Chunk React no referenciado.** `client.BmNEQPXu.js` sigue emitiéndose sin cargarse; condición preexistente.
5. **Sin auditoría automatizada completa.** No se ejecutó axe, Lighthouse ni una prueba real de zoom al 200 %.
6. **Sin prueba real de parpadeo.** La resolución se hace antes del cuerpo, pero no se midió con trazas de pintura ni grabación.
7. **El panel de tema es un grupo de radios, no un `menu` ARIA.** Se eligió por robustez y por el comportamiento nativo de teclado; los nombres y estados se verificaron en el árbol de accesibilidad.
8. **Sin despliegue.** No se comprobó GitHub Pages, dominio ni CI remoto.

### W.24 Archivos creados, modificados y eliminados

**Creado en esta ampliación:**

- `src/components/layout/ThemeSwitcher.astro`.

**Creado en la implementación inicial y conservado (sin seguimiento):**

- `src/components/layout/MobileNavigation.astro`; único ajuste posterior: ocultar la etiqueta visible «Menú» por debajo de `sm` para dejar espacio al selector, manteniendo el `aria-label` y todo el comportamiento.

**Actualizado:**

- `docs/implementations/T06-IMPLEMENTACION.md`; ya existía, no se duplicó ni se reescribió su historial.

**Modificados:**

- `src/components/layout/SiteFooter.astro`.
- `src/components/layout/SiteHeader.astro`.
- `src/content/projects/auditapy.mdx`.
- `src/content/projects/boozhome.mdx`.
- `src/content/projects/controllote.mdx`.
- `src/content/projects/sgaa.mdx`.
- `src/data/profile.ts`.
- `src/layouts/BaseLayout.astro`.
- `src/layouts/CaseStudyLayout.astro`.
- `src/pages/index.astro`.
- `src/styles/global.css`.

**Eliminados:** ninguno.

No se modificaron `src/content.config.ts`, `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `components.json`, `tsconfig.json` ni los informes T01–T05.

### W.25 Estado final de Git y pendientes

- Rama: `feat/t06-minimal-interactivity`.
- HEAD: `0ee51ce`.
- 11 archivos versionados modificados.
- 3 archivos sin seguimiento: `MobileNavigation.astro`, `ThemeSwitcher.astro` y el informe T06.
- `git diff --check`: exit 0.
- No se ejecutó `git add`, commit, push, PR, merge, rebase, force push ni despliegue.
- `main` no se actualizó.

Pendientes para la revisión visual del propietario:

1. Confirmar el tono editorial de la portada y los cuatro casos.
2. Revisar el aspecto de las abstracciones SVG oscuras sobre superficies claras.
3. Confirmar el tamaño y la posición del selector de tema en móvil y escritorio.
4. Confirmar que el footer sin copyright sigue comunicando identidad suficiente.
5. Autorizar, si procede, el commit y el PR de T06; no iniciar T07 hasta entonces.

---

## X. Revisión manual del propietario y corrección editorial definitiva

**Fecha:** 2026-10-19.
**Alcance:** sustitución literal de los cuatro cuerpos MDX, conjunto cerrado de indicadores, simplificación del layout de caso y variantes SVG adaptadas a los temas.
**Restricción respetada:** no se ejecutó `git add`, commit, push, PR, merge, rebase ni despliegue; no se inició T07.

### X.1 Observaciones recibidas

La revisión manual del propietario detectó:

1. Los textos de los cuatro casos todavía no eran los definitivos.
2. SGAA debía mostrar solo dos indicadores y ControlLote solo tres.
3. La tarjeta de ControlLote no debía mencionar los 18 meses históricos.
4. El layout de caso debía simplificarse y usar el nombre corto como `H1`.
5. Las cuatro ilustraciones SVG conservaban la paleta oscura en tema claro.
6. El resto del diseño y de las interacciones se consideró satisfactorio.

### X.2 Aprobación expresa del nuevo texto

El propietario aprobó literalmente los cuerpos de SGAA, ControlLote, AuditaPy y BoozHome. La implementación no reinterpretó, resumió, amplió ni sustituyó ninguna palabra, signo de puntuación o encabezado.

### X.3 Sustitución literal de los cuatro cuerpos MDX

Se reemplazó íntegramente el cuerpo de:

- `src/content/projects/sgaa.mdx`
- `src/content/projects/controllote.mdx`
- `src/content/projects/auditapy.mdx`
- `src/content/projects/boozhome.mdx`

La comparación automática entre el texto aprobado y el cuerpo extraído de cada MDX dio `exact=True` en los cuatro casos, además de coincidencia con espacios colapsados. Los encabezados resultantes son:

| Proyecto | Encabezados del cuerpo |
|---|---|
| SGAA | `Contexto`, `Mi trabajo`, `Solución` |
| ControlLote | `Contexto`, `Mi trabajo`, `Solución`, `Evolución` |
| AuditaPy | `Contexto`, `Mi trabajo`, `Solución en desarrollo` |
| BoozHome | `Contexto`, `Mi trabajo`, `Solución` |

No se añadieron párrafos, notas, advertencias ni secciones nuevas.

### X.4 Secciones eliminadas

Se eliminaron completamente, sin recuperar frases:

- SGAA: Problema, Arquitectura y stack, Decisiones técnicas, Estado actual, Resultados y evidencias, Limitaciones y evidencia, Evolución.
- ControlLote: Problema, Participación, Arquitectura y stack, Decisiones técnicas, Estado actual, Resultados y alcance, Resultados y evidencias, Alcance de los datos, Limitaciones y evidencia.
- AuditaPy: Problema, Participación, Fase actual, Arquitectura y decisiones, Estado actual, Limitaciones y evidencia, Evolución.
- BoozHome: Problema, Mi participación, Arquitectura y stack, Decisiones técnicas, Estado actual, Limitaciones y evidencia, Evolución.

También se eliminaron del cuerpo de AuditaPy las listas de módulos funcionales (`AuditEngagement`, `12 módulos`, `24 proyectos`, etc.). La información técnica permanece en el frontmatter y en las etiquetas de tecnologías.

### X.5 Indicadores visibles finales

| Proyecto | Indicadores visibles |
|---|---|
| SGAA | `+26` Empresas registradas; `+161` Contribuyentes registrados |
| ControlLote | `+475` Contratos registrados; `+377` Lotes vendidos; `+5.314` Cuotas procesadas |
| AuditaPy | Ninguno |
| BoozHome | Ninguno |

Se conservaron los valores numéricos exactos en `facts` y el símbolo `+` se añade en la presentación. `evidenceNote` sigue existiendo porque el esquema lo exige, pero no se renderiza en la interfaz pública. No se añadieron fechas, notas ni explicaciones bajo las cifras.

En ControlLote se retiraron del frontmatter público los indicadores de 18 meses, 1.252 registros con errores, 110 lotes con diferencias y 62 excepciones pendientes.

### X.6 Tarjeta de ControlLote

El `summary` de la tarjeta pasó de mencionar el procesamiento de 18 meses históricos a conservar únicamente el resto del resumen:

> Plataforma SaaS en desarrollo. Inició su utilización piloto en agosto de 2026 y prepara su disponibilidad comercial. Concilia comisiones inmobiliarias a partir de informes PDF y reglas contractuales.

No se añadió contenido sustituto y no se modificaron los resúmenes de SGAA, AuditaPy ni BoozHome.

### X.7 Simplificación del layout de caso

`CaseStudyLayout` ahora muestra:

1. Ruta de navegación.
2. Categoría y estado.
3. `cardTitle` como `H1`.
4. Resumen.
5. Ilustración.
6. Tecnologías.
7. Franja de indicadores, solo si existen.
8. Cuerpo MDX.
9. Enlace «Volver a proyectos».

El título largo del frontmatter se conserva en el `<title>` del documento. Se eliminaron los paneles laterales, las notas de evidencia, la fecha de revisión y el nivel de documentación. La franja de indicadores es una banda discreta con valores y rótulos, sin notas ni párrafos.

### X.8 SVG originales conservados

Los cuatro archivos originales no se modificaron:

- `public/images/projects/sgaa.svg`
- `public/images/projects/controllote.svg`
- `public/images/projects/auditapy.svg`
- `public/images/projects/boozhome.svg`

Siguen siendo las variantes oscuras. `git status` no muestra modificaciones en esos archivos.

### X.9 Variantes claras creadas

Se crearon:

- `public/images/projects/sgaa-light.svg`
- `public/images/projects/controllote-light.svg`
- `public/images/projects/auditapy-light.svg`
- `public/images/projects/boozhome-light.svg`

Se aplicó exclusivamente la equivalencia de color aprobada:

| Oscuro | Claro |
|---|---|
| `#0B1019` | `#F8FAFC` |
| `#111A28` | `#FFFFFF` |
| `#182337` | `#F0F4FA` |
| `#344257` | `#CAD4E2` |
| `#91B8FF` | `#2557A7` |
| `#70DDC0` | `#17674F` |

Se verificó que, al revertir los colores, cada variante clara es idéntica al original correspondiente: geometría, coordenadas, `viewBox`, tamaño y disposición se conservan. No se usaron filtros `invert()`, imágenes de terceros ni ilustraciones nuevas.

### X.10 Mecanismo de selección por tema

Se creó `src/components/ui/ProjectIllustration.astro`, utilizado por `ProjectCard.astro` y `CaseStudyLayout.astro`.

- Si existe una variante `-light.svg`, renderiza las dos variantes.
- La visibilidad se controla con CSS según `data-appearance="light|dark|system"`.
- En Sistema se usa `prefers-color-scheme`.
- La variante oculta queda con `display: none`, fuera del layout y del árbol de accesibilidad.
- El conjunto se expone como un único `role="img"` con el texto alternativo existente; las dos imágenes internas son decorativas.
- Si una imagen futura no tiene variante clara, se renderiza solo la original, sin generar rutas inexistentes.
- No se añadió React, JavaScript de selección ni una isla nueva.

### X.11 Pruebas de cambio manual y automático

Se ejecutaron 100 combinaciones: 5 páginas × 5 viewports × 4 modos (`light`, `dark`, `system-light`, `system-dark`).

Resultados:

- 100/100 auditorías sin overflow horizontal.
- 100/100 con un único `H1`.
- 0 fallos de ilustración: siempre una variante visible, cargada y con el color correspondiente al tema.
- En Claro y Sistema-Claro se muestra `*-light.svg`.
- En Oscuro y Sistema-Oscuro se muestra el SVG original.
- El cambio manual de tema actualiza la ilustración inmediatamente, sin recarga.
- El cambio de preferencia del SO en Sistema actualiza la ilustración sin recarga.
- En landing y en detalle se obtiene el mismo resultado.
- Sin JavaScript, el CSS sigue al SO: claro → `sgaa-light.svg`; oscuro → `sgaa.svg`; el selector de tema se oculta y el respaldo de navegación sigue disponible.

### X.12 Pruebas de teclado y navegación

| Prueba | Resultado |
|---|---|
| Orden inicial a 320 px | Skip link → marca → tema → menú |
| Foco visible | 2 px sólido en los controles |
| Abrir tema con `Enter` | Panel abierto; foco en la opción activa |
| `Escape` en tema | Cierra y devuelve el foco a «Cambiar apariencia» |
| Abrir menú móvil con `Enter` | Diálogo abierto; foco en «Cerrar menú» |
| `Escape` en menú | Cierra y devuelve el foco a «Abrir menú de navegación» |
| Enlace `#proyectos` | Cierra el menú y enfoca `#proyectos` |
| 768 px | Navegación de escritorio visible y menú móvil oculto; nunca ambos |

El menú móvil, el selector de tema, la persistencia y los tokens cromáticos existentes se conservaron.

### X.13 Comparación literal de contenidos

Se ejecutó una comparación automática en `/tmp/opencode/t06-final-editorial/verify_literal.py`:

- Extracción del cuerpo MDX posterior al frontmatter.
- Comparación exacta contra el texto aprobado.
- Comparación adicional con espacios colapsados.

Resultado:

```text
sgaa: exact=True collapsed=True
controllote: exact=True collapsed=True
auditapy: exact=True collapsed=True
boozhome: exact=True collapsed=True
ALL_BODIES_LITERAL_MATCH
```

También se comprobó que no quedaran secciones antiguas ni indicadores excluidos en `dist`.

### X.14 Resultados de Astro check y build

| Comando | Exit | Resultado |
|---|---:|---|
| `corepack pnpm install --frozen-lockfile` | 0 | Sin cambios de lockfile |
| `corepack pnpm exec astro sync` | 0 | Contenido y tipos sincronizados |
| `corepack pnpm exec astro check` | 0 | 23 archivos; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | 0 | 5 páginas estáticas |
| `git diff --check` | 0 | Sin errores |

Rutas generadas:

```text
dist/index.html
dist/proyectos/sgaa/index.html
dist/proyectos/controllote/index.html
dist/proyectos/auditapy/index.html
dist/proyectos/boozhome/index.html
```

Sin rutas adicionales, sin errores MDX y sin islas React nuevas.

### X.15 Archivos creados y modificados

**Creados:**

- `src/components/ui/ProjectIllustration.astro`.
- `public/images/projects/sgaa-light.svg`.
- `public/images/projects/controllote-light.svg`.
- `public/images/projects/auditapy-light.svg`.
- `public/images/projects/boozhome-light.svg`.

**Modificados:**

- `src/content/projects/sgaa.mdx`.
- `src/content/projects/controllote.mdx`.
- `src/content/projects/auditapy.mdx`.
- `src/content/projects/boozhome.mdx`.
- `src/layouts/CaseStudyLayout.astro`.
- `src/components/ui/ProjectCard.astro`.
- `src/styles/global.css`.
- `docs/implementations/T06-IMPLEMENTACION.md`.

Se conservaron sin cambios los SVG originales, el esquema de contenido, `ThemeSwitcher`, `MobileNavigation`, el footer, la portada, Oñondive, especialidades, proceso, hero y contacto.

### X.16 Capturas locales disponibles

Se generaron 16 capturas en:

```text
/tmp/opencode/t06-final-editorial/screens/
```

Incluyen:

- Landing claro y oscuro, escritorio.
- Landing claro y oscuro, móvil.
- SGAA, ControlLote, AuditaPy y BoozHome en claro y oscuro.
- Detalle ampliado de indicadores de SGAA y ControlLote en claro y oscuro.

No se versionaron capturas ni se generaron PDF o presentaciones.

### X.17 Riesgos y limitaciones

1. `light-dark()` requiere navegadores modernos; no se probaron Safari ni Firefox reales.
2. El único error de consola observado es el 404 preexistente de `/favicon.ico`, pendiente de T07.
3. No se ejecutó axe ni Lighthouse en esta corrección.
4. No se probó un zoom real al 200%.
5. La selección de variantes depende de CSS; si el CSS no cargara, ambas imágenes podrían mostrarse visualmente, aunque el contenedor seguiría exponiendo una sola imagen accesible.
6. El chunk React no referenciado `client.BmNEQPXu.js` sigue emitiéndose sin cargarse; condición preexistente.
7. No se verificó el despliegue en GitHub Pages ni CI remoto.

### X.18 Estado final de Git

- Rama: `feat/t06-minimal-interactivity`.
- HEAD: `0ee51ce`.
- 12 archivos versionados modificados.
- 8 archivos sin seguimiento: el informe T06, los cuatro SVG claros, `MobileNavigation.astro`, `ThemeSwitcher.astro` y `ProjectIllustration.astro`.
- `git diff --check`: exit 0.
- Sin `git add`, commit, push, PR, merge, rebase, force push ni despliegue.
- `main` sin actualizar.

### X.19 Revisión visual pendiente

T06 no se declara definitivamente aprobada. Queda pendiente:

1. Confirmar visualmente los cuatro textos finales.
2. Confirmar la franja de indicadores de SGAA y ControlLote.
3. Confirmar las ilustraciones claras en landing y detalle.
4. Confirmar que la tarjeta de ControlLote ya no menciona los 18 meses.
5. Autorizar, si procede, el commit y el PR de T06. No iniciar T07 hasta esa confirmación.

---

## Y. Ajustes visuales finales aprobados — Hover uniforme y header fijo

**Fecha:** 2026-10-20.
**Rama:** `feat/t06-minimal-interactivity`.
**Base:** HEAD `0ee51ce` (sin commits nuevos).
**Alcance:** una única animación de hover para las tarjetas de Especialidades, Proyectos y Cómo trabajo; header fijo con compensación de altura y navegación por anclas.
**Restricción respetada:** no se modificó contenido editorial, MDX, indicadores, estados, tecnologías, Oñondive, footer ni ilustraciones SVG. No se ejecutó `git add`, commit, push, PR, merge, rebase ni despliegue. No se inició T07.

### Y.1 Solicitud y aprobación del propietario

El propietario aprobó definitivamente el contenido editorial y solicitó exclusivamente dos ajustes visuales:

1. Aplicar la misma animación de hover a las tarjetas de `#especialidades`, `#proyectos` y `#proceso`, sin convertir las tarjetas informativas en enlaces ni añadir `cursor: pointer`.
2. Mantener el header visible durante el desplazamiento mediante `position: fixed`, sin ocultar contenido y sin romper las anclas, el menú móvil ni el selector de apariencia.

Se conservaron todos los cambios locales de T06 y no se restauró ninguna versión anterior de los componentes.

### Y.2 Implementación compartida del hover

Se añadió una única clase en `src/styles/global.css`:

```css
.portfolio-card-hover {
  transition:
    transform 200ms ease-out,
    border-color 200ms ease-out;
}
```

La clase se reutiliza en exactamente tres grupos:

| Sección | Contenedor | Aplicación |
|---|---|---|
| `#especialidades` | `Surface as="article"` | `portfolio-card-hover` |
| `#proyectos` | contenedor `Surface` de `ProjectCard` | `portfolio-card-hover` |
| `#proceso` | `Surface as="li"` | `portfolio-card-hover` |

No se aplicó a otras secciones ni a otros componentes.

Valores exactos:

- Desplazamiento: `transform: translateY(-3px)`.
- Borde: `border-color: color-mix(in oklab, var(--primary) 55%, var(--border))`.
- Transición: `transform 200ms ease-out, border-color 200ms ease-out`.
- Sin `scale()`, sombras, efectos 3D, brillos ni JavaScript.
- Sin cambios de tamaño, padding, distribución interna ni contenido.
- El cursor calculado permanece `auto`; no se añadió `cursor: pointer`.
- El hover se limita con `@media (hover: hover)`, de modo que los dispositivos táctiles no conservan una elevación tras tocar la tarjeta.
- `:focus-within` reutiliza el mismo borde y, solo en dispositivos con hover, el mismo desplazamiento, para dar una respuesta coherente al foco de teclado en las tarjetas de Proyectos. Las tarjetas informativas no se hicieron enfocables.

Las reglas se declararon fuera de las capas de Tailwind para que el color de borde pudiera sustituir a la utilidad `border-border` sin recurrir a `!important`. No se añadieron dependencias ni islas React.

### Y.3 Movimiento reducido

Con `prefers-reduced-motion: reduce`:

- Se desactiva la transición de la clase (`transition: none`).
- Se anula el desplazamiento (`transform: none`).
- Se conserva el cambio inmediato de borde como indicación de interacción, tanto en hover como en `:focus-within`.

La regla global existente que reduce animaciones y transiciones se mantiene.

### Y.4 Header fijo

`SiteHeader` pasó de un header en el flujo a:

```html
<header class="fixed inset-x-0 top-0 z-40 border-b border-border bg-background">
```

- `position: fixed`, `top: 0`, ancho completo.
- `z-index: 40`, por encima del contenido ordinario y por debajo del skip link (`z-50`).
- Fondo `bg-background` completamente opaco; se conservaron borde y paleta.
- Sin blur, sin efecto de cristal y sin sombras.
- Se conservaron marca JC, nombre, navegación de escritorio, menú móvil y selector Sistema / Claro / Oscuro.
- El `<dialog>` móvil sigue usando la capa superior nativa, por encima del header fijo.

### Y.5 Compensación de la altura del header

Se definió una única variable compartida:

```css
:root {
  --site-header-height: calc(4.75rem + 1px);
}

main {
  padding-top: var(--site-header-height);
}
```

La altura corresponde a la composición real del header: `2.75rem` del control más alto (44 px), `2rem` de padding vertical (`py-4`) y `1px` de borde inferior. Al medir en Chrome, la altura real fue **77 px** en 320, 375, 768, 1024 y 1440 px, y el `padding-top` de `main` fue también **77 px** en los 50 casos.

La fórmula usa `rem`, por lo que acompaña la ampliación del tamaño de texto del navegador. No se añadió JavaScript de medición ni márgenes distintos por breakpoint.

### Y.6 Navegación por anclas

Se retiraron las utilidades `scroll-mt-24` de las secciones de la portada y se sustituyeron por una regla global:

```css
html {
  scroll-padding-top: calc(var(--site-header-height) + 1rem);
}
```

Con 77 px de header, el desplazamiento reservado es de **93 px**. Resultados medidos con navegación real por hash y desplazamiento suave:

| Ancla | `top` tras navegar | Visible bajo el header |
|---|---:|---|
| `#inicio` | 77,00 px (scroll 0) | Sí |
| `#sobre-mi` | 92,66 px | Sí |
| `#especialidades` | 93,05 px | Sí |
| `#proyectos` | 93,00 px | Sí |
| `#proceso` | 92,52 px | Sí |
| `#contacto` | 109,30 px | Sí |

`#contacto` queda algo más abajo porque el documento no permite desplazarse más allá del final; aun así, el inicio de la sección queda completamente visible bajo el header.

También se verificó el enlace absoluto `/#proyectos` desde `/proyectos/sgaa/`: la portada se cargó con hash y la sección quedó a 93 px, visible bajo el header. Se conservaron las rutas relativas de la portada, las absolutas de los casos, el skip link, el foco en el contenido y el scroll suave.

### Y.7 Pruebas de teclado y foco

Con Chrome 155 y eventos reales de teclado:

| Prueba | Resultado |
|---|---|
| Primer `Tab` | «Saltar al contenido» visible sobre el header (`z-50`) |
| `Enter` en el skip link | Foco en `main#contenido`; hash `#contenido`; sin ocultar contenido |
| `Tab` hasta un enlace de tarjeta de Proyectos | Foco visible con contorno sólido de 2 px (`--ring`) |
| Respuesta de la tarjeta con `:focus-within` | Borde primario y desplazamiento de −3 px tras la transición |
| Apertura del menú móvil con `Enter` | Diálogo abierto; foco en «Cerrar menú de navegación» |
| `Escape` en el menú | Cierra, restaura el foco en «Abrir menú de navegación» y libera el scroll |
| Selector de tema con el header desplazado | Abre, cambia a Oscuro, persiste y cierra el panel |

### Y.8 Compatibilidad con el menú móvil y el selector de tema

- El menú móvil se abrió a 320 px con el header fijo: panel en `top: 0`, capa superior nativa, fondo bloqueado (`overflow: hidden`) y foco dentro del diálogo.
- `Escape` cerró el diálogo y devolvió el foco al botón.
- El selector de apariencia fue visible y operable a 320 y 1440 px con la página desplazada.
- El cambio a Oscuro aplicó `data-appearance="dark"`, la clase `dark` y `localStorage="dark"`.
- La preferencia persistió tras recargar.
- En modo Sistema, la emulación del SO oscuro mostró el tema oscuro y la ilustración oscura; el SO claro mostró el tema claro y la ilustración clara.
- No se solaparon el selector de tema, el botón de menú y la navegación de escritorio.

### Y.9 Pruebas responsive

Se ejecutaron 50 combinaciones: 5 páginas × 5 viewports (320, 375, 768, 1024 y 1440 px) × 2 temas.

Resultados:

- 50/50 sin overflow horizontal.
- 50/50 con un único `H1`.
- 50/50 con header `fixed`, `top: 0`, ancho igual al viewport y altura de 77 px.
- 50/50 con `main` compensado a 77 px y el primer contenido comenzando en 77 px.
- En 320, 375 y 720 px se muestra el menú móvil; en 768, 1024 y 1440 px se muestra la navegación de escritorio.
- A 768 px no aparecen simultáneamente ambos sistemas: menú móvil `none`, navegación de escritorio `block`.
- El header conserva fondo opaco y borde en ambos temas.

Se añadieron 10 comprobaciones de equivalencia a zoom del 200 % (anchos CSS de 720 y 640 px sobre 1440 y 1280): las cinco páginas mantuvieron header fijo, selector visible, sin overflow y sin contenido oculto. No se ejecutó un cambio de zoom real del navegador.

### Y.10 Pruebas de hover

Se validaron las 12 tarjetas (4 especialidades, 4 proyectos, 4 pasos) en tema claro y oscuro con Chrome 155 y capacidad de hover habilitada: **24/24 casos** con:

- `transform: matrix(1, 0, 0, 1, 0, -3)`.
- Desplazamiento real de **−3 px**.
- Cambio efectivo de `border-color` al color mezclado con el primario.
- Cursor `auto`.
- Sin movimiento de las tarjetas vecinas.
- Regreso a `transform: none` y al borde original tras retirar el cursor (24/24).

Con `prefers-reduced-motion: reduce`, el hover cambió el borde pero mantuvo `transform: none` y el mismo `top`. Con la capacidad de hover desactivada a nivel de navegador, el desplazamiento también permaneció en `none`.

### Y.11 Capturas locales

Se generaron 57 capturas en:

```text
/tmp/opencode/t06-final-visual/screens/
```

Incluyen las 50 combinaciones de página, viewport y tema, tres estados de hover, el menú móvil abierto y tres vistas con el header fijo durante el desplazamiento. No se versionó ninguna captura.

### Y.12 Resultados técnicos

| Comando | Exit | Resultado real |
|---|---:|---|
| `corepack pnpm install --frozen-lockfile` | 0 | Lockfile reproducible; sin cambios |
| `corepack pnpm exec astro sync` | 0 | Contenido y tipos sincronizados |
| `corepack pnpm exec astro check` | 0 | 23 archivos; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | 0 | 5 páginas estáticas; `output: "static"` |
| `git diff --check` | 0 | Sin errores de espacios ni conflictos |

Rutas generadas:

```text
dist/index.html
dist/proyectos/sgaa/index.html
dist/proyectos/controllote/index.html
dist/proyectos/auditapy/index.html
dist/proyectos/boozhome/index.html
```

No se añadieron dependencias, no se modificó el esquema editorial, no se añadieron islas React y no se cambió `output: 'static'`.

### Y.13 Archivos modificados en esta intervención

- `src/components/layout/SiteHeader.astro`: header fijo con `z-40` y fondo opaco.
- `src/components/ui/ProjectCard.astro`: clase compartida de hover en el contenedor de la tarjeta.
- `src/pages/index.astro`: clase compartida en Especialidades y Cómo trabajo; retirada de `scroll-mt-24` en favor del `scroll-padding-top` global. No se alteró ningún texto.
- `src/styles/global.css`: variable de altura, compensación de `main`, `scroll-padding-top` y reglas compartidas de hover con movimiento reducido.
- `docs/implementations/T06-IMPLEMENTACION.md`: esta sección Y.

No se modificaron los MDX, `profile.ts`, footer, ilustraciones SVG, `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `components.json` ni los informes T01–T05.

### Y.14 Riesgos y limitaciones

1. **Altura del header derivada por CSS.** `--site-header-height` replica la composición actual (`2.75rem + 2rem + 1px`) y escala con `rem`. Si en el futuro se añadiera un control más alto o el contenido del header pasara a varias filas por una ampliación extrema de texto, la separación podría requerir revisión. No se añadió JavaScript de medición.
2. **Hover en dispositivos táctiles.** La elevación está condicionada por `@media (hover: hover)`; se verificó con la capacidad de hover desactivada, pero no en hardware táctil real.
3. **Navegadores alternativos.** Las pruebas se hicieron con Chrome 155 headless; no se probaron Safari ni Firefox reales.
4. **Auditoría automatizada.** No se ejecutó axe ni Lighthouse.
5. **Zoom real.** La comprobación al 200 % es por equivalencia de ancho CSS, no por cambio real del zoom del navegador.
6. **Despliegue.** No se comprobó GitHub Pages, dominio ni CI remoto.

### Y.15 Estado final de Git

- Rama: `feat/t06-minimal-interactivity`.
- HEAD: `0ee51ce`.
- 12 archivos versionados modificados; 8 sin seguimiento (el informe T06, los cuatro SVG claros y los tres componentes nuevos de T06).
- `git diff --check`: exit 0.
- El contenido editorial permanece intacto en esta intervención.
- Sin `git add`, commit, push, PR, merge, rebase, force push ni despliegue.
- `main` no se actualizó.
- T06 no se declara integrada ni publicada.

---

## Z. Aprobación final del propietario y autorización de commit

**Fecha de aprobación:** 2026-10-20.
**Rama:** `feat/t06-minimal-interactivity`.
**HEAD de partida:** `0ee51ceeee65f39854834437e9d564ab6e3c02d8`.

### Z.1 Aprobación de contenidos y experiencia visual

El propietario revisó manualmente la implementación completa de T06 y aprobó:

- La navegación móvil accesible.
- El header fijo.
- El hover uniforme de las tarjetas.
- Los temas Sistema, Claro y Oscuro.
- La persistencia de la apariencia.
- Las ilustraciones SVG adaptadas a los temas.
- La redacción editorial definitiva.
- La estructura de los cuatro casos de estudio.
- Los indicadores públicos.
- El footer y el separador de tecnologías.

Confirmó expresamente que no se requieren cambios adicionales en T06. No se realizaron modificaciones funcionales, editoriales ni visuales después de esta aprobación.

### Z.2 Validaciones técnicas ya ejecutadas

- `corepack pnpm install --frozen-lockfile`: exit 0, sin cambios de lockfile.
- `corepack pnpm exec astro sync`: exit 0.
- `corepack pnpm exec astro check`: exit 0, 23 archivos, 0 errores, 0 warnings y 0 hints.
- `corepack pnpm run build`: exit 0, cinco páginas estáticas con `output: "static"`.
- `git diff --check`: exit 0.
- Verificación de las cinco rutas: `/`, `/proyectos/sgaa/`, `/proyectos/controllote/`, `/proyectos/auditapy/` y `/proyectos/boozhome/`.
- Pruebas visuales y funcionales documentadas en las secciones M, W, X e Y: responsive, header fijo, anclas, hover compartido, movimiento reducido, menú móvil, selector de apariencia, persistencia del tema y navegación de teclado.

### Z.3 Pruebas no ejecutadas

No se presentan como satisfactorias:

- Lighthouse.
- axe, Playwright u otra auditoría automatizada de accesibilidad.
- Safari y Firefox reales.
- Dispositivos móviles o táctiles físicos.
- Zoom real del navegador al 200 % (se usó equivalencia por ancho CSS).
- GitHub Pages, CI remoto o cualquier despliegue.

### Z.4 Autorización del commit

El propietario autorizó exclusivamente el commit local de T06 con el mensaje:

```text
feat(portfolio): complete T06 navigation themes and case studies
```

El commit debe incluir los 20 archivos identificados en esta tarea: 12 modificados, 7 nuevos de implementación y este informe. No se autorizan `git push`, Pull Request, merge, rebase, force push, despliegue, eliminación de ramas ni actualización de `main`.

### Z.5 Estado documental

Este informe queda actualizado con la aprobación final y el cierre documental de T06. Las secciones A–Y se conservan íntegras como historial. El estado general del documento es:

> **Implementación completada y aprobada por el propietario; pendiente de commit e integración.**
