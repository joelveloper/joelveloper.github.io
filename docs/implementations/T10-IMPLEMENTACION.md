# Informe de implementación — T10

- **Tarea:** T10 — Rediseño: header y toggle binario de 2 estados
- **Fecha:** 2026-10-20
- **Rama:** `feat/t09-visual-tokens-dot-background` (rama local de T09; no se creó rama nueva)
- **Commit de partida:** `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1` (Merge PR #10), con los cambios de T09 sin preparar en el árbol
- **Estado:** aprobada definitivamente por el propietario tras su revisión visual (2026-10-21) y versionada en el commit integrado de T09–T12 `feat(portfolio): complete personal identity redesign`, con commit y push de la rama autorizados; **sin PR, merge ni despliegue**. Cierre en §19.

---

## 1. Ejecución anticipada conjunta T10 + T11 + T12

El backlog (`docs/04-PLAN-DE-TAREAS.md §1 y §3`) prevé una tarea por iteración y que T10 dependa de T09 integrada. El propietario autorizó expresamente en esta sesión:

- implementar **T10, T11 y T12 en una sola ejecución**, sin esperar a que T09 esté integrada en `main`;
- trabajar sobre la rama local `feat/t09-visual-tokens-dot-background`, **conservando todos los cambios de T09**;
- sin autorización para `git add`, commit, push, PR, merge, despliegue, cambios de rama ni T13.

**Desviación registrada:** T10–T12 se implementan apilados sobre T09 sin versionar. T09 **no** está integrada ni publicada: solo estaba implementada y validada localmente (`docs/implementations/T09-IMPLEMENTACION.md`). Los informes T11 y T12 recogen la misma desviación.

## 2. Estado inicial y preservación de T09

| Comprobación | Resultado |
|---|---|
| `HEAD` | `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1` = `main` |
| Rama | `feat/t09-visual-tokens-dot-background` |
| `git status --short` inicial | 18 archivos `M` de T09 (8 SVG de proyecto, `MobileNavigation`, `SiteFooter`, `ThemeSwitcher`, `ButtonLink`, `SectionHeading`, `StatusBadge`, `BaseLayout`, `CaseStudyLayout`, `index.astro`, `global.css`) y `docs/implementations/T09-IMPLEMENTACION.md` sin seguimiento |
| Copia de referencia | `git diff` inicial guardado fuera del repositorio con hash SHA-256 para comparar al final |
| Procesos | Había un `astro dev` del usuario en `127.0.0.1:4321`; no se detuvo. El preview de esta tarea se ejecutó en el puerto 4322 |

**Verificación final de preservación:** los 12 archivos de T09 que T10–T12 no tocan (8 SVG, `ButtonLink`, `SectionHeading`, `StatusBadge`, `CaseStudyLayout`) tienen un diff idéntico al inicial (comparación por hash de cada bloque de diff). El informe T09 conserva su hash (`d0d83f05…`). En los archivos compartidos siguen presentes los cambios de T09: tokens Cobre Mineral + Zinc, `@utility bg-dots` y `--dots-*` en `global.css`; capa `bg-dots` en `BaseLayout`; contornos `border-input` en los controles; rol del pie en `text-muted-foreground`; ausencia de bandas `border-y … bg-surface/40` en el Home.

No se ejecutaron `git reset`, `stash`, `clean`, `checkout --`, rebase, cherry-pick ni cambios de rama.

Documentos leídos: `AGENTS.md`, `README.md`, `docs/01-PRD.md`, `docs/02-DISENO-VISUAL.md`, `docs/03-ARQUITECTURA.md`, `docs/04-PLAN-DE-TAREAS.md`, `docs/05-CONTENIDOS-Y-CASOS.md`, ADR-002, INV-001 (§3.1 y §4) e informe T09.

## 3. Objetivo y alcance

Según `04-PLAN-DE-TAREAS.md` T10 y `02-DISENO-VISUAL.md §6`:

- Header de 56 px, ancho máximo 1280 px, sin borde inferior.
- Navegación principal limitada a «Inicio», «Sobre mí», «Proyectos», «Contacto» (escritorio y móvil), conservando las anclas de «Especialidades» y «Cómo trabajo».
- Monograma JC circular `size-8 rounded-full`.
- Toggle binario Claro/Oscuro de 32 px con área táctil de 40 px, estado inicial según `prefers-color-scheme`, persistencia tras elegir, script anti-destello y `data-appearance` sincronizado.
- Actualizar `--site-header-height` y `scroll-padding-top`.

## 4. Decisiones de implementación

1. **Fondo del header translúcido con desenfoque ligero** (`bg-background/90 backdrop-blur-md`), excepción admitida por `02-DISENO-VISUAL.md §5–6`. Sin soporte de `backdrop-filter`, `not-supports-[backdrop-filter:blur(0)]:bg-background` lo vuelve opaco (verificado en el CSS generado: `@supports not ((-webkit-backdrop-filter:blur(0)) or (backdrop-filter:blur(0)))`). Se eligió el 90 % de opacidad tras calcular el peor caso de contraste (§8).
2. **Altura:** `min-h-14` en el contenedor del header (56 px exactos con JS). `--site-header-height: 3.5rem`; `scroll-padding-top` sigue siendo `calc(var(--site-header-height) + 1rem)`.
3. **Ancho:** `Container size="wide"` (1280 px), ya existente; el contenido sigue en 1160 px.
4. **Monograma:** círculo `size-8 rounded-full`, borde decorativo `border-border`, texto `text-foreground`. Se retira el cobre del monograma (pendiente que T09 dejó para T10). El nombre «Joel Cantero» se mantiene visible en todos los anchos (`text-sm`, `sm:text-base`).
5. **Toggle binario** (`ThemeSwitcher.astro` reescrito):
   - Un `<button>` circular de 32 px con contorno `border-input` (≥3:1 de T09) y un `::before` de 40 px. El pseudo-elemento se posiciona respecto a la caja de relleno (30 px por el borde de 1 px), por eso usa `-inset-[5px]` y no `-inset-1` (ver §10).
   - El icono muestra el tema de destino (luna en claro, sol en oscuro) y se resuelve **solo con CSS** a partir de `data-appearance` y `prefers-color-scheme`, sin esperar al script: no hay destello de icono.
   - `aria-label` describe la acción («Cambiar a tema claro» / «Cambiar a tema oscuro») y se actualiza al pulsar y cuando cambia el tema del sistema sin preferencia guardada. No se usa `aria-pressed`, para no combinar etiqueta cambiante y estado.
   - Al pulsar se guarda `light` o `dark` en `localStorage` (`appearance`), se aplica la clase y `data-appearance`. Errores de almacenamiento se ignoran (el tema se aplica en la sesión).
   - Sin JavaScript, el botón se oculta (`<noscript>`) y el sitio sigue al sistema.
6. **Script anti-destello** (`BaseLayout.astro`): solo acepta `light` o `dark`; cualquier otro valor, incluido el antiguo `system` del selector de tres estados, deja `data-appearance="system"` y el sitio sigue al SO. La lógica de las ilustraciones de T09 (`.project-illustration-*` según `data-appearance`) no cambia.
7. **Menú móvil:** disparador y botón de cierre pasan a círculos de 32 px con área de 40 px (coherencia con el toggle); el disparador pierde el texto visible «Menú» y conserva `aria-label="Abrir menú de navegación"`. La barra superior del diálogo usa también `min-h-14` y 1280 px. La lógica de diálogo, foco y Escape de T06 no cambia.
8. **Respaldo sin JavaScript:** el `<noscript>` con la navegación estaba dentro del grupo de botones; se trasladó a `SiteHeader` como fila propia del header y ajusta `--site-header-height` a `6.25rem` bajo 768 px para que el contenido no quede tapado.
9. **Sin estado activo de navegación** (scroll-spy): exigiría JavaScript adicional y no lo pide el backlog.

## 5. Archivos

| Archivo | Cambio |
|---|---|
| `src/data/navigation.ts` | Navegación principal de 4 accesos; comentario sobre anclas conservadas |
| `src/components/layout/SiteHeader.astro` | 56 px, 1280 px, sin `border-b`, fondo translúcido, monograma circular, `<noscript>` como fila propia |
| `src/components/layout/ThemeSwitcher.astro` | Reescrito: toggle binario |
| `src/components/layout/MobileNavigation.astro` | Botones circulares de 32/40 px, monograma neutro, barra de 56 px, `<noscript>` trasladado al header |
| `src/layouts/BaseLayout.astro` | Script anti-destello: solo `light`/`dark` explícitos |
| `src/styles/global.css` | `--site-header-height: 3.5rem`; reglas CSS del icono sol/luna (sustituyen a las de tres estados) |

Creados: este informe. Eliminados: ninguno. Dependencias: ninguna añadida ni modificada.

## 6. Comandos ejecutados (build final)

| Comando | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Exit 0; lockfile al día |
| `corepack pnpm exec astro sync` | Exit 0 |
| `corepack pnpm exec astro check` | Exit 0; 26 archivos, 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | Exit 0; 6 páginas; `sitemap-index.xml` con las 5 URL públicas (sin 404) |
| `git diff --check` | Exit 0 |
| `corepack pnpm run preview -- --port 4322` | Preview estático; reiniciado tras cada build (caché de la 404 en memoria, documentada en T09) |

No ejecutado: `pnpm lint` (no existe el script), Lighthouse, auditoría de dependencias. Herramientas de prueba reutilizadas de un directorio temporal fuera del repositorio: `playwright-core` 1.64.1 con Chrome del sistema y `axe-core` 4.10.3. No se añadieron dependencias al proyecto.

## 7. Pruebas

### 7.1 Matriz responsive y temas (Playwright)

6 páginas (`/`, 4 casos, ruta inexistente → 404) × 5 anchos (320, 375, 768, 1024, 1440) × 4 escenarios (Sistema con SO claro, Sistema con SO oscuro, Claro guardado con SO oscuro, Oscuro guardado con SO claro) = **120 combinaciones, 0 incidencias**.

Comprobado en cada combinación: sin overflow horizontal; un H1; fondo del tema esperado; `data-appearance` esperado; header de **56 px** en `top: 0` y **sin borde inferior** (`border-bottom-width: 0px`); `main` con `padding-top: 56px`; toggle de 32×32 px con `aria-label` correcto e icono correcto; navegación de escritorio con exactamente los 4 accesos desde 768 px y oculta debajo; menú móvil con los 4 accesos; imágenes cargadas; ilustraciones en la variante del tema; consola sin errores; ninguna respuesta ≥400 (salvo el propio documento de la 404, esperado).

### 7.2 Pruebas interactivas (34/34 correctas, incluidas las de T11)

Específicas de T10:

- Sin preferencia con SO oscuro: `data-appearance="system"`, fondo `#0D0E11`, nada guardado, etiqueta «Cambiar a tema claro».
- Clic → claro y se guarda `light`; ilustraciones en variante clara. Segundo clic → oscuro y se guarda `dark`. Persistencia tras recargar.
- Enter y Espacio activan el toggle; foco visible de 2 px sólido cobre.
- Área táctil: a 3,5 px fuera del borde (arriba, abajo, izquierda, derecha y diagonales) el clic llega al botón; a 6 px por la derecha ya no.
- Sin preferencia, el cambio en vivo del tema del SO actualiza fondo y `aria-label`.
- Valor heredado `system` guardado → sigue al SO.
- **Sin destello:** con `dark` guardado y SO claro, en `DOMContentLoaded` el fondo ya es `#0D0E11` y el icono ya es el sol; con `light` y SO oscuro, `#FAF9F7` y luna.
- Orden de tabulación: Saltar al contenido → marca → Inicio → Sobre mí → Proyectos → Contacto → toggle → Hablemos → Ver mis proyectos → GitHub → YouTube → Instagram.
- Anclas `#sobre-mi`, `#especialidades`, `#proyectos`, `#proceso`, `#contacto`: la sección queda a ≥72 px del borde superior (no la tapa el header).
- Menú móvil (375 px): disparador de 32 px; Enter abre con `aria-expanded="true"` y 4 accesos; foco atrapado; Escape cierra y devuelve el foco; un enlace cierra, enfoca la sección y no la tapa el header.
- **Sin JavaScript** (320, 375, 1024 px): toggle y disparador ocultos; los 4 enlaces visibles; en móvil el header mide 72 px y `main` reserva 100 px; en 1024 px, 56/56 px; sin overflow; tema del SO.

### 7.3 Revisión visual

Capturas inspeccionadas una a una: Home a 1440 (claro y oscuro), 1024 claro, 768 oscuro, 375 oscuro, 320 claro, página completa a 1440 oscuro y 375 claro, menú móvil abierto a 375, foco de teclado en el toggle, SGAA a 375 claro y a 1440 oscuro, 404 a 1440 oscuro. El header se ve compacto, sin línea, con la navegación centrada en escritorio y los dos controles circulares alineados en móvil. Las capturas se guardaron fuera del repositorio y no se versionan.

## 8. Accesibilidad y contraste

- axe-core 4.10.3 (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`), 6 páginas × 2 temas × 2 anchos = 24 ejecuciones: **0 violaciones**.
- **Incompletos de axe (no son violaciones):**
  - `color-contrast` en la marca y los enlaces del header: axe no resuelve el fondo porque es translúcido sobre el gradiente de puntos. Se midió manualmente el peor caso **sin contar el desenfoque**: fondo del header = 90 % `--background` + 10 % del color más desfavorable que pase por debajo. Enlaces (`muted-foreground`): ≥4.98:1 en claro y ≥6.31:1 en oscuro; marca e icono del toggle (`foreground`): ≥12.03:1 y ≥13.43:1.
  - `aria-valid-attr-value` en el disparador del menú a 375 px: axe no puede confirmar el `aria-controls` de un `<dialog>` cerrado. Esos atributos no se modificaron en T10. T09 obtuvo 0 incompletos con axe 4.14.0; aquí se usó 4.10.3 y no se investigó si la diferencia se debe a la versión.
- **Contorno del toggle:** `--input` frente al fondo del header mide 3.48:1 (claro) y 3.65:1 (oscuro) sobre fondo liso; en el peor caso teórico (texto oscuro o claro justo bajo la línea de 1 px, sin desenfoque) baja a 2.88 / 2.92:1. El control se identifica además por su icono (≥12:1 en el mismo peor caso), lo que cubre WCAG 1.4.11.
- Foco visible de 2 px cobre heredado de T09 (5.53–9.15:1).
- Área táctil del toggle y de los botones del menú: 40 px (WCAG 2.5.8 exige 24 px); entre el toggle y el disparador hay 8 px, de modo que sus áreas de 40 px se tocan sin solaparse.

## 9. Seguridad y privacidad

Sin dependencias, peticiones de red, cookies ni analítica nuevas. `localStorage` guarda solo `appearance` = `light`/`dark` (preferencia local, no se transmite). El JS inline del Home pasa de 3 141 B (T09) a 2 632 B.

## 10. Problemas encontrados y soluciones

1. **Área táctil de 38 px en lugar de 40.** `before:-inset-1` producía 38 px porque el pseudo-elemento absoluto se posiciona respecto a la caja de relleno (32 − 2 px de borde). Detectado por la prueba de puntos a 3,5 px; corregido con `before:-inset-[5px]` en los tres botones circulares.
2. **`<noscript>` de navegación dentro del grupo de botones**, heredado: sin JS los enlaces quedaban comprimidos junto a los controles. Se trasladó al header como fila propia con ajuste de altura.
3. **Comentario HTML en el header:** se había escrito como comentario HTML, que se publica en la salida; se pasó al frontmatter antes del primer build.
4. **Variante `supports-[not(...)]`:** se sustituyó por `not-supports-[…]`, la forma de Tailwind v4, y se verificó el CSS generado.
5. Falsos positivos de mis scripts (no del sitio): el `scroll-smooth` del `<html>` impedía cargar las imágenes diferidas al desplazarse con `scrollTo` (resuelto con `behavior: 'instant'`) y una cadena esperada de tabulación con espacios que `textContent` no produce.

## 11. Riesgos, limitaciones y pendientes

- Solo Chrome (Linux). No se probaron Safari (`-webkit-backdrop-filter` lo genera Tailwind, pero no se verificó en Safari real), Firefox ni lectores de pantalla.
- Al elegir un tema ya no hay opción explícita para volver a «Sistema» (consecuencia aceptada en ADR-002); se puede borrar `appearance` del almacenamiento del navegador.
- Sin JS en móvil, la altura reservada (100 px) supera en 28 px la del header (72 px): queda un margen extra, no contenido tapado.
- Sin estado activo en la navegación (no se pidió).
- Lighthouse no se ejecutó (T13).

## 12. Cumplimiento de criterios de aceptación (T10)

| Criterio | Estado |
|---|---|
| Header 56 px, 1280 px, sin `border-b` | Cumplido (medido en 120 combinaciones) |
| Navegación de 4 accesos en escritorio y móvil, anclas conservadas | Cumplido |
| Monograma `size-8 rounded-full` | Cumplido |
| Toggle 32 px con área de 40 px, binario | Cumplido |
| Estado inicial según `prefers-color-scheme`; persistencia tras elegir | Cumplido |
| Operable por teclado con foco visible; `aria-label` de acción | Cumplido |
| Sin destello de tema en la carga | Cumplido |
| Comportamiento razonable sin JavaScript | Cumplido |
| Anclas no ocultas bajo el header | Cumplido |
| Sin desbordes a 320 px | Cumplido |

## 13. Estado de Git

- Rama `feat/t09-visual-tokens-dot-background`; `HEAD` = `8854baf`.
- Cambios de T09 y de T10–T12 mezclados en el árbol, **sin preparar**; este informe y los de T09, T11 y T12, sin seguimiento (`??`).
- **Sin `git add`, commit, push, PR, merge ni despliegue.** La tarea no se considera cerrada mientras el informe no se versione con la autorización del propietario.

## 14. Recomendaciones siguientes

Revisión visual del propietario en el preview local. Después, decidir cómo versionar T09–T12 (un PR conjunto o varios) y continuar con **T13** (QA, accesibilidad, Lighthouse y decisión sobre la foto). No se ha iniciado T13.

## 15. Revisión final previa al commit (2026-10-20)

Revisión focalizada de T09–T12 solicitada por el propietario antes de versionar. `HEAD` `8854baf`, rama `feat/t09-visual-tokens-dot-background`, mismos 23 archivos `M` y 5 `??`; informe T09 con el mismo hash (`d0d83f05…`). **No se modificó código**: no se encontró ningún defecto verificable que corregir. Sin `reset`, `stash`, `clean`, `checkout` ni cambios de rama.

### 15.1 Incompleto `aria-controls` del menú móvil

| Pregunta | Resultado |
|---|---|
| Elemento | `button[data-menu-trigger]` (disparador del menú, `MobileNavigation.astro:21-41`) |
| Regla y mensaje de axe | `aria-valid-attr-value`, «Unable to determine if aria-controls referenced ID exists on the page while using aria-haspopup: aria-controls="mobile-navigation"» |
| ID referenciado | `mobile-navigation` |
| ¿Existe? | Sí: `<dialog id="mobile-navigation">`, en el DOM en todo momento (con y sin JS), cerrado y `display: none` en reposo |
| ¿Válido con el menú cerrado? | Sí. ARIA solo exige que el IDREF apunte a un elemento existente; puede estar oculto. `aria-haspopup="dialog"` es un valor válido en ARIA 1.2 |
| Con JS | Incompleto solo a 320 y 375 px (único rango en que el disparador es visible; `md:hidden` lo oculta desde 768). Con el menú abierto el disparador queda inerte y axe no lo evalúa: 0 violaciones, 0 incompletos ARIA |
| Sin JS | El `<noscript>` oculta el disparador; axe (HTML sin `<script>` y con `<noscript>` desplegado) no lo evalúa: 0 violaciones, 0 incompletos ARIA a 320, 375 y 1024 en ambos temas |
| Causa | **Limitación del analizador.** En axe-core 4.14.0 (`aria-valid-attr-value`, pre-check `aria-controls`), cuando `aria-haspopup` es distinto de `false` la regla marca «needs review» **sin buscar el ID** (devuelve `controlsWithinPopup` antes de cualquier búsqueda) |
| Decisión | Sin cambios. No hay falla de accesibilidad |

La diferencia con T09 (0 incompletos) no se verificó; T09 no detalla los anchos de su ejecución de axe, y el incompleto solo aparece a 320–375 px.

### 15.2 Validaciones ejecutadas en esta revisión

| Comando / prueba | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Exit 0, lockfile al día |
| `corepack pnpm exec astro sync` | Exit 0 |
| `corepack pnpm exec astro check` | Exit 0; 26 archivos, 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | Exit 0; 6 páginas; sitemap con las 5 URL públicas |
| `git diff --check` | Exit 0 |
| Preview | Reiniciado en 127.0.0.1:4322 tras el build. El `astro dev` del usuario en 4321 no se tocó |
| Matriz axe-core 4.14.0 (`wcag2a/aa`, `wcag21a/aa`, `wcag22aa`) + comprobaciones funcionales: 6 páginas × 5 anchos (320, 375, 768, 1024, 1440) × 2 temas | **60 ejecuciones, 0 violaciones, 0 incidencias** (overflow, un H1, fondo y `data-appearance` del tema, header de 56 px, imágenes, consola) |
| Incompletos de axe | `aria-valid-attr-value` (§15.1) y `color-contrast` en la marca y los enlaces del header y en el monograma del retrato: fondos translúcidos, degradados o pseudo-elementos que axe no resuelve. Ya medidos manualmente en T09–T11 (§8; T11 §9); no se repitió la medición manual |
| Sin JS real (320, 375, 1024 × 2 temas) | Disparador y toggle ocultos, 4 enlaces visibles en el header, sin overflow |
| Teclado 1440 | Saltar al contenido → marca → Inicio → Sobre mí → Proyectos → Contacto → toggle → Hablemos → Ver mis proyectos → GitHub → YouTube → Instagram; foco 2 px sólido |
| Menú 375 (2 temas) | Enter abre (`aria-expanded="true"`, foco en «Cerrar»), 4 accesos, foco atrapado tras 8 Tab, Escape cierra (`aria-expanded="false"`, foco al disparador), un enlace cierra y enfoca `#proyectos` a 131 px del borde |
| Toggle (SO claro y oscuro) | Sin preferencia sigue al SO; clic cambia y guarda; persiste al recargar; Espacio lo activa; `aria-label` coherente |

Falso positivo descartado: una primera lectura de `aria-expanded` inmediatamente después de Escape devolvió `"true"` porque el evento `close` del `<dialog>` se despacha de forma asíncrona; con la secuencia repetida (con y sin axe, con 0 y 8 Tab) el valor final es siempre `"false"`.

Herramientas: `playwright-core` 1.64.1 con Chrome del sistema y `axe-core` 4.14.0, instaladas en un directorio temporal fuera del repositorio. Sin dependencias nuevas en el proyecto.

## 16. Revisión de diseño del propietario (2026-10-20)

Ajustes visuales aprobados expresamente por el propietario sobre la implementación local de T09–T12. Esta sección recoge el contexto común, las validaciones y los cambios de header, enlaces, encabezados y fondos; el Hero está en `T11-IMPLEMENTACION.md §15` y «Sobre mí», el signo `+` y la sección 02 en `T12-IMPLEMENTACION.md §16`. No se inicia ninguna tarea nueva ni T13.

### 16.1 Estado inicial

| Comprobación | Resultado |
|---|---|
| `HEAD` / rama | `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1` / `feat/t09-visual-tokens-dot-background` |
| Árbol | 23 archivos `M` y 5 `??` (informes T09–T12 y `ProfilePortrait.astro`), sin preparar |
| Copia de referencia | `git diff` inicial (SHA-256 `ca727915…`) y hash por archivo, guardados fuera del repositorio |
| Procesos | Ningún servidor en 4321 ni 4322 al empezar |
| Medición previa | «Sobre mí» **visible** en la primera pantalla a 390×844 (782 px), 768×1024 (757), 1366×768 (650), 1440×900 (654) y 1920×1080 (654) |

Documentos leídos: `AGENTS.md`, `docs/01-PRD.md`, `docs/02-DISENO-VISUAL.md`, ADR-002, informes T09–T12, componentes y CSS vigentes. Referencia FSH observada solo con capturas en el navegador (composición de encabezados y comportamiento de tarjetas); no se copió código, markup, assets ni textos.

### 16.2 Cambios de esta sección

- **Toggle de tema** (`ThemeSwitcher.astro`): fondo transparente, borde decorativo `--border`, icono `--muted-foreground`; hover: icono `--foreground` y borde `--input`; `active:text-primary`; foco con el outline cobre global. Se conservan 32 px, área de 40 px, binario, sistema por defecto, persistencia, `aria-label` dinámico y anti-destello (sin cambios en la lógica).
- **Disparador y cierre del menú móvil** (`MobileNavigation.astro`): mismo estilo que el toggle, por coherencia en el header.
- **Monograma JC** (`SiteHeader.astro` y menú móvil): `bg-surface` (blanco en claro) → `bg-transparent`; borde `--border`; texto `--foreground`.
- **Enlaces sin subrayado**: regla base `a, a:hover, a:focus, a:visited { text-decoration-line: none }` y retirada de `underline-offset-4 hover:underline` en header (incluido `<noscript>`), menú móvil, redes del Hero, correo de Contacto, footer, título de `ProjectCard` y breadcrumb. Prosa MDX: sin subrayado, peso 600 y `↗` generado por CSS (con texto alternativo vacío) en enlaces externos. Breadcrumb: flecha «←» decorativa. Hover por color en enlaces de contexto inequívoco (navegación, listas, tarjetas).
- **Encabezados 01–04** (`SectionHeading.astro`, prop `rule`): línea `h-px flex-1 bg-border` (`aria-hidden`) entre la numeración y la etiqueta. En «Sobre mí» el encabezado sale de la columna izquierda y ocupa el ancho del contenedor para que las cuatro líneas sean iguales. «Contacto» (05) no lleva línea por quedar fuera del alcance indicado.
- **Fondos alternos** (`global.css`, `index.astro`, `SiteFooter.astro`): token `--background-alt` (`#F1F0ED` / `#19191B`), utilidad `bg-background-alt` y clase `.section-alt`, que además redefine `--card` (blanco / `#0D0E11`) y `--surface-raised` (claro `#FAF9F7`) dentro de la sección. Secciones alternas: Sobre mí, Proyectos y Oñondive (este último pasa a ser un `<section>` a ancho completo). Se retira `border-t` de Contacto (lo sustituye el cambio de fondo). Footer: `bg-surface` → `bg-background-alt`.

**Interpretación registrada:** la línea se sitúa **entre** la numeración y la etiqueta («01 ──── SOBRE MÍ»), que es el espacio libre a la izquierda de la etiqueta y mantiene el orden de lectura «01 Sobre mí». Si el propietario prefiere la línea a la derecha de la etiqueta, el cambio es una línea en `SectionHeading.astro`.

### 16.3 Archivos de toda la revisión

| Archivo | Cambio |
|---|---|
| `src/styles/global.css` | `--background-alt`, `bg-background-alt`, regla base de enlaces, prosa MDX, `.hero-screen`, retrato simplificado, `.section-alt`, `.experience-card` |
| `src/pages/index.astro` | Hero de primera pantalla, Sobre mí literal, cinco bloques, fondos alternos, líneas de encabezado, enlaces |
| `src/components/ui/ExperienceCard.astro` | **Nuevo**: bloque informativo de la sección 02 |
| `src/components/ui/SectionHeading.astro` | Prop `rule` |
| `src/components/layout/ThemeSwitcher.astro`, `MobileNavigation.astro`, `SiteHeader.astro`, `SiteFooter.astro` | Estilo discreto, monograma, enlaces, fondo del footer |
| `src/components/ui/ProjectCard.astro`, `src/layouts/CaseStudyLayout.astro` | Enlaces sin subrayado (título, breadcrumb). `+{fact.value}` intacto |
| `docs/02-DISENO-VISUAL.md`, `docs/adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md` | Decisiones del propietario; historial original del ADR conservado |
| Informes T10, T11, T12 | Esta sección y las §15 (T11) y §16 (T12) |

Sin cambios: `ProfilePortrait.astro` (el retrato se resolvió en CSS), datos e indicadores, MDX, rutas, workflows, dependencias, Open Graph, favicon y configuración. Eliminados: ninguno. Dependencias: ninguna.

**Preservación verificada:** los 15 archivos de T09–T12 no tocados (8 SVG, `StatusBadge`, `ButtonLink`, `BaseLayout`, `profile.ts`, `navigation.ts`, `auditapy.mdx`, `controllote.mdx`) conservan un diff idéntico al inicial (hash por archivo). Informes T01–T12, `package.json` y `pnpm-lock.yaml` con el mismo SHA-256 que al empezar (antes de añadir estas secciones). En los archivos compartidos se mantienen los cambios previos (p. ej., numeración neutra de `SectionHeading` de T09).

### 16.4 Comandos

| Comando | Resultado |
|---|---|
| `corepack pnpm exec astro sync` | Exit 0 |
| `corepack pnpm exec astro check` | Exit 0; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | Exit 0; **6 páginas**; `sitemap-0.xml` con las mismas 5 URL públicas; `dist/404.html` generado |
| `git diff --check` | Exit 0 |
| `corepack pnpm run preview -- --port 4322 --host 127.0.0.1` | Preview de esta sesión reiniciado tras el build final; responde 200 |

Herramientas temporales fuera del repositorio: `playwright-core` 1.56.1 con Chrome del sistema y `axe-core` 4.10.3. No ejecutado: Lighthouse, lectores de pantalla, Firefox y Safari.

### 16.5 Pruebas en navegador (Chrome)

| Prueba | Resultado |
|---|---|
| Matriz: 6 páginas × 5 anchos (320–1440) × 2 temas | **60 ejecuciones**: 0 violaciones axe (`wcag2a/aa`, `wcag21a/aa`, `wcag22aa`), 0 overflow horizontal, 1 H1 por página, 0 errores de consola (salvo la 404 del propio documento de error, esperada), **0 enlaces con subrayado** |
| Hover y foco en 8 tipos de enlace (navegación, redes, título de proyecto, correo, redes de contacto, footer, marca, breadcrumb) | `text-decoration-line: none` en hover y foco; outline visible en todos |
| Fondos (computados) | Oscuro: Hero/Especialidades/Cómo trabajo/Contacto transparentes sobre `#0D0E11`; Sobre mí, Proyectos, Oñondive y footer `rgb(25,25,27)`. Claro: alternos `rgb(241,240,237)` sobre `#FAF9F7` |
| Líneas 01–04 | Las cuatro filas van de x=172 a x=1268 (1440 px), 1 px de alto, `#343438` / `#E3E2DE`, `aria-hidden`; texto accesible «01Sobre mí» … «04Proceso» |
| Toggle | Sin preferencia sigue al SO (oscuro, «Cambiar a tema claro», nada guardado); clic → claro y guarda `light`; persiste al recargar; Enter → oscuro y guarda `dark`; outline de foco 2 px sólido cobre; 2/2 clics a 3,5 px fuera del borde llegan al botón |
| Monograma del header | Fondo transparente, borde `#343438`, texto `#F1EFEB` |
| Anclas | `#sobre-mi`, `#especialidades`, `#proyectos` a 72 px; `#proceso` 83 px; `#contacto` 86 px (1440, final de página) y 72 px (375); clic en «Contacto» del header y del menú móvil correcto |
| Casos de estudio y 404 | Capturas de SGAA (1440 oscuro), ControlLote (375 claro), AuditaPy (1440 claro), BoozHome (768 oscuro) y 404 (1440 oscuro, 375 claro): sin regresiones; ilustraciones cargadas (8/8) |

Falso positivo descartado: una primera lectura de `#contacto` (995 px) se hizo antes de que terminara el desplazamiento suave (`scroll-smooth`); con espera suficiente y con clic real el resultado es correcto.

**Incompletos de axe (no violaciones):** `aria-valid-attr-value` del disparador del menú (ya analizado en §15.1) y `color-contrast` donde axe no resuelve el fondo: header translúcido, monograma del retrato, numeración de las tarjetas 02 (halo en pseudo-elemento) y flecha decorativa del breadcrumb. Medidos manualmente (§16.6).

### 16.6 Contraste de las combinaciones nuevas (WCAG 2.x, calculado)

| Par | Oscuro | Claro |
|---|---|---|
| `foreground` / fondo alterno | 15.29 | 13.44 |
| `muted-foreground` / fondo alterno | 7.19 | 5.56 |
| `brand` / fondo alterno | 8.33 | 5.11 |
| `foreground` / tarjeta en sección alterna | 16.81 | 15.31 |
| `muted-foreground` / tarjeta en sección alterna | 7.90 | 6.33 |
| `muted-foreground` / superficie elevada en sección alterna | 5.08 | 6.02 |
| `positive` («En curso») / superficie elevada en sección alterna | 7.55 (`#70DDC0`, aproximación hex de T09) | 6.46 |
| Icono del toggle (`muted-foreground`) / fondo | 7.90 | 6.02 |
| Monograma del retrato / disco | 15.29 | 15.31 |

El borde del toggle (`--border`) y las líneas de encabezado son decorativos; el toggle se identifica por su icono (≥6:1), lo que cubre WCAG 1.4.11. Las mediciones sobre el header translúcido de §8 siguen vigentes (los colores de texto no cambian).

### 16.7 Riesgos y pendientes

- En claro, el contraste entre `#FAF9F7` y `#F1F0ED` es deliberadamente suave; la separación entre secciones es perceptible en capturas, pero depende de la pantalla. Si el propietario la quiere más marcada, puede añadirse una línea `--border` en los bordes de las secciones alternas.
- Las secciones alternas son opacas: la textura de puntos solo se ve en las secciones con el fondo principal.
- Solo Chrome en Linux; sin Safari, Firefox ni lectores de pantalla.

### 16.8 Estado de Git

Rama `feat/t09-visual-tokens-dot-background`, `HEAD` `8854baf`. Cambios de T09–T12 y de esta revisión mezclados y **sin preparar**; informes T09–T12, `ProfilePortrait.astro` y `ExperienceCard.astro` sin seguimiento. **Sin `git add`, commit, push, PR, merge ni despliegue.** Pendiente de revisión visual del propietario.

## 17. Segunda revisión visual del propietario (2026-10-20)

Decisiones expresas del propietario tras probar la versión local de §16. Esta sección recoge el contexto común, la navegación, el monograma del header, los encabezados, el footer, las validaciones y el estado de Git. El retrato está en `T11-IMPLEMENTACION.md §16`; las tarjetas, el borde animado y los enlaces externos, en `T12-IMPLEMENTACION.md §17`. No se inicia T13.

### 17.1 Estado inicial

`HEAD` `8854baf`, rama `feat/t09-visual-tokens-dot-background`; 26 archivos `M` y 6 `??` (estado final de §16). Servidores: un `astro dev` del usuario en `127.0.0.1:4321` (**no se tocó**) y el preview de esta tarea en 4322 (`scripts/preview.mjs -- --port 4322`), reiniciado de forma controlada tras cada build.

### 17.2 Cambios

- **Navegación activa** (`SiteHeader.astro`, `MobileNavigation.astro`, `global.css`): accesos en `font-semibold`; clase `.nav-link` con un punto cobre `::before` (5px, `opacity`/`scale`) y color `--brand` cuando el enlace tiene `aria-current`. Script en `SiteHeader` (sin React ni escucha de scroll): un `IntersectionObserver` con `rootMargin: -40% 0px -59% 0px` vigila las secciones `main > section`; cada sección hereda el acceso de la última sección navegable anterior; un segundo observador marca el último acceso con el pie visible completo. Solo hay un acceso actual por navegación (`aria-current="location"`); el resto se limpia. Las anclas se resuelven a partir del `href` de los enlaces, sin listas fijas.
- **Páginas de detalle**: prop `currentNav` en `BaseLayout` → `current` en `SiteHeader` y `MobileNavigation`; `CaseStudyLayout` pasa `/#proyectos`, que se renderiza con `aria-current="true"` (también en el `<noscript>`), sin JavaScript.
- **Monograma del header** (header y menú móvil): `text-[0.6875rem] tracking-normal` → `text-[0.875rem] leading-none tracking-[-0.04em]`, seminegrita; círculo de 32px, fondo transparente y borde neutro sin cambios.
- **Encabezados** (`SectionHeading.astro`): orden `número · etiqueta ───`; el separador `·` (`aria-hidden`) aparece cuando hay número y etiqueta; la línea (`rule`, `aria-hidden`, `ml-2 flex-1 bg-border`) va después de la etiqueta (`shrink-0`, sin truncar); separación `gap-2`. «Contacto» (05) muestra «05 · Contacto» sin línea, como antes.
- **Footer** (`SiteFooter.astro`, `Icon.astro` nuevo, `profile.ts`, `navigation.ts`): campo opcional `icon` en `ProfileLink`; iconos SVG de trazo de 16px (`aria-hidden`) para Correo, GitHub, YouTube e Instagram; mismos destinos y textos. El trazado de GitHub procede de Feather Icons (MIT, atribuido en el componente); el resto se dibujó para el sitio. Lucide 1.x (ya instalado) no incluye iconos de marca.

### 17.3 Archivos de esta ronda

| Archivo | Cambio |
|---|---|
| `src/styles/global.css` | Retrato de 5 círculos y 24 s, `.nav-link`, `.card-glow`, `.project-card__border` |
| `src/components/layout/SiteHeader.astro` | Seminegrita, `current`, `data-nav-link`, monograma, script de sección activa |
| `src/components/layout/MobileNavigation.astro` | Seminegrita, `current`, `data-nav-link`, monograma |
| `src/components/layout/SiteFooter.astro` | Iconos |
| `src/components/ui/Icon.astro` | **Nuevo**: iconos SVG locales |
| `src/components/ui/SectionHeading.astro` | Disposición «01 · Sobre mí ───» |
| `src/components/ui/ExperienceCard.astro`, `src/pages/index.astro` | Clase `card-glow` (02 y 04) |
| `src/components/ui/ProjectCard.astro` | Capa de borde animado |
| `src/layouts/BaseLayout.astro`, `src/layouts/CaseStudyLayout.astro` | `currentNav`; enlace «Visitar sitio web» |
| `src/data/profile.ts`, `src/data/navigation.ts` | Campo `icon` en los enlaces |
| `src/content/projects/sgaa.mdx`, `boozhome.mdx` | Solo `externalUrl` en el frontmatter |
| `docs/02-DISENO-VISUAL.md`, ADR-002, informes T10–T12 | Decisiones de la segunda revisión |

Sin cambios: textos del Hero y de «Sobre mí», descripciones y resúmenes MDX, estados, indicadores, `ProfilePortrait.astro`, rutas, workflows, `package.json` y `pnpm-lock.yaml`. Dependencias: ninguna.

### 17.4 Comandos

| Comando | Resultado |
|---|---|
| `corepack pnpm exec astro sync` | Exit 0 |
| `corepack pnpm exec astro check` | Exit 0; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | Exit 0; 6 páginas |
| `git diff --check` | Exit 0 |
| Preview 4322 | Reiniciado tras el build final; responde (§17.7) |

Herramientas temporales fuera del repositorio: `playwright-core` 1.56.1 con Chrome del sistema, `axe-core` 4.10.3 y `pngjs` 7.0.0 (lectura de píxeles).

### 17.5 Pruebas en navegador (Chrome)

| Prueba | Resultado |
|---|---|
| Matriz: 6 páginas × 5 anchos (320, 390, 768, 1440, 1920) × 2 temas | **60 ejecuciones, 0 incidencias**: 0 violaciones axe, 0 overflow, 1 H1, 0 errores de consola (salvo el 404 del propio documento de error), 0 enlaces subrayados |
| Estado inicial | «Inicio» activo (`aria-current="location"`), uno por navegación |
| Estilo activo / inactivo (claro) | Activo: 600, `#98532A`, punto opacidad 1, sin subrayado. Inactivo: 600, `#5F5F66`, punto 0 |
| Scroll programático | Sobre mí → «Sobre mí»; Especialidades → «Sobre mí»; Proyectos y Cómo trabajo → «Proyectos»; Oñondive y Contacto → «Contacto»; Inicio → «Inicio»; final de página → «Contacto» |
| Rueda del ratón desde arriba | Secuencia «Inicio → Sobre mí → Proyectos → Contacto», sin saltos ni duplicados |
| Clic en la navegación | Contacto, Sobre mí, Proyectos e Inicio: activo y hash correctos tras el desplazamiento suave |
| Carga directa `/#proyectos` | «Proyectos» activo |
| Menú móvil (390 px) | Abierto en Proyectos, marca «Proyectos» (600, cobre, punto); elegir «Contacto» cierra el menú y deja «Contacto» activo |
| Página de detalle | «Proyectos» con `aria-current="true"` en header y menú |
| Sin JavaScript | Portada: 0 enlaces marcados y los 4 accesos visibles; detalle BoozHome: «Proyectos» marcado |
| Foco | Outline sólido de 2px en el enlace activo |
| Encabezado 01 en el árbol accesible | `paragraph: 01 Sobre mí` (sin separador ni línea) |
| Monograma del header | 14px, 600, círculo 32px; header 56px |
| Footer | 4 enlaces con SVG `aria-hidden="true"` |
| Tema | SO claro sin preferencia → `system`, `#FAF9F7`; clic → oscuro guardado; persiste al recargar |

**Observación:** con el inicio de Oñondive en lo alto, el activo es «Contacto», porque Oñondive es corta y la franja de referencia (40 % del alto) ya cae en Contacto; coincide con lo que ocupa la pantalla.

**Incompletos de axe (no violaciones):** `aria-valid-attr-value` del disparador del menú (§15.1) y `color-contrast` en elementos con fondos que axe no resuelve (header translúcido, retrato, halos y capas decorativas).

### 17.6 Contraste

Enlace activo (`--brand`) sobre el fondo: 5.53:1 (claro) y 9.15:1 (oscuro), según la medición de §3 de la guía visual; sobre el header translúcido el fondo efectivo es al menos un 90 % `--background`, por lo que no se midió aparte. Iconos del footer (`--muted-foreground` sobre `--background-alt`): 5.56:1 y 7.19:1 (§16.6). El punto activo refuerza el estado sin depender solo del color.

### 17.7 Estado de Git y preview

Rama `feat/t09-visual-tokens-dot-background`, `HEAD` `8854baf`. Cambios **sin preparar**; sin seguimiento: informes T09–T12, `ProfilePortrait.astro`, `ExperienceCard.astro` e `Icon.astro`. **Sin `git add`, commit, push, PR, merge ni despliegue.** Preview de esta tarea en `http://127.0.0.1:4322/` reiniciado tras el último build; el servidor del usuario en 4321 no se tocó. Pendiente de la revisión visual del propietario.

## 18. Ajustes finales y preparación del commit de T09–T12 (2026-10-21)

El propietario aprobó los cambios visuales y editoriales de T09–T12 con dos ajustes finales: el monograma del Hero y el favicon. Esta sección recoge el contexto común, la validación integral de la rama, la revisión de Git y la propuesta de commit. El detalle del monograma está en `T11-IMPLEMENTACION.md §17`; el del favicon, en `T09-IMPLEMENTACION.md §24`; la integridad editorial, en `T12-IMPLEMENTACION.md §19`. No se inicia T13.

### 18.1 Estado inicial

- Rama `feat/t09-visual-tokens-dot-background`, `HEAD` `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1` (igual al commit base de referencia).
- 28 archivos `M` y 7 `??`, idénticos al estado final de §17 y de `T12 §18`. Se conservaron todos; no se ejecutó reset, stash, clean, rebase, cherry-pick ni cambio de rama (`git stash list` vacío).
- No había servidores en 4321 ni en 4322. El servidor de desarrollo del usuario (4321) no estaba en ejecución y no se inició ni se tocó. El preview de esta tarea se levantó en 4322.
- Documentos leídos: `AGENTS.md`, `README.md`, `01-PRD.md` (§2.5), `02-DISENO-VISUAL.md`, `04-PLAN-DE-TAREAS.md` (T09–T14), ADR-002 e informes T09–T12.

### 18.2 Archivos modificados en esta ejecución

| Archivo | Cambio |
|---|---|
| `src/styles/global.css` | Monograma sin relleno, círculos 3–5 redistribuidos, «JC» a 0,44 y peso 700, centrado por bloque (`T11 §17`) |
| `public/favicon.svg` | Nuevo diseño cobre/zinc (`T09 §24`) |
| `public/favicon.ico` | Regenerado: 16/32/48 px desde el SVG (`T09 §24`) |
| `docs/02-DISENO-VISUAL.md` | §6: composición final del retrato y favicon; cabecera de versiones |
| `docs/adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md` | Nueva entrada al final del historial (las anteriores no se modifican) |
| Informes T09, T10, T11, T12 | Secciones nuevas al final (T09 §24, T10 §18, T11 §17, T12 §19) |

Sin cambios: `ProfilePortrait.astro`, `BaseLayout.astro` (las referencias a los favicons ya eran correctas), textos, datos, MDX, rutas, SEO, Open Graph, workflows, `package.json` y `pnpm-lock.yaml`. Antes de editar se comprobó que los únicos archivos tocados en esta ejecución son los tres de código y recursos de la tabla (`find -newermt`). Creados: ninguno. Eliminados: ninguno. Dependencias: ninguna.

### 18.3 Validación integral de la rama

| Comando | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Exit 0; «Lockfile is up to date» |
| `corepack pnpm exec astro sync` | Exit 0 |
| `corepack pnpm exec astro check` | Exit 0; 28 archivos, 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | Exit 0; **6 páginas** (`/`, 4 detalles, `404`) y `sitemap-index.xml` |
| `git diff --check` | Exit 0, sin salida (repetido tras actualizar los informes) |

Preview 4322 (`node scripts/preview.mjs --port 4322 --host 127.0.0.1`), reiniciado tras el build final: `/`, los 4 detalles, `/404.html`, `/favicon.svg`, `/favicon.ico`, `/sitemap-index.xml` y `/sitemap-0.xml` responden 200; una ruta inexistente devuelve 404 con la página de error. `sitemap-0.xml`: 5 URL (inicio y 4 casos).

Herramientas temporales fuera del repositorio (directorio temporal de la sesión): `playwright-core` 1.56.1 con Chrome del sistema, `axe-core` 4.10.3 y `pngjs` 7.0.0. Ninguna se añadió al proyecto.

**Matriz en navegador:** 6 páginas × 5 anchos (320, 390, 768, 1440, 1920) × 2 temas = **60 ejecuciones, 0 incidencias**. En todas: 0 violaciones axe (WCAG 2.0/2.1/2.2 A y AA y buenas prácticas), sin overflow horizontal, un único H1, 0 enlaces subrayados y 0 errores de consola (salvo el 404 esperado del documento de error).

**Pruebas funcionales y editoriales (todas aprobadas):**

| Comprobación | Resultado |
|---|---|
| Navegación principal | «Inicio | Sobre mí | Proyectos | Contacto» → `#inicio`, `#sobre-mi`, `#proyectos`, `#contacto` |
| Navegación activa | Inicial: «Inicio» (uno solo). Tras desplazarse a Proyectos: «Proyectos». En los 4 detalles: «Proyectos» |
| Tema claro / oscuro | El clic cambia el fondo del `body` y la elección persiste al recargar |
| Menú móvil (390 px, oscuro) | Abre el diálogo con los 4 accesos y se cierra con Escape (`aria-expanded="false"`) |
| Enlaces externos | SGAA → `https://redfor-ti.com.py/` y BoozHome → `https://boozhome.com.py/`, ambos con `target="_blank"` y `rel="noopener noreferrer"`; ninguno en ControlLote ni en AuditaPy |
| Textos de Proyectos | La introducción y los 4 resúmenes elegidos por el propietario aparecen literalmente |
| «Ver proyecto» | 4 enlaces con `aria-label` «Ver proyecto: SGAA / ControlLote / AuditaPy / BoozHome» hacia sus detalles |
| Sobre mí | Los 3 párrafos originales, literales |
| Hero | Identificador, H1, descripción y los dos CTA, literales |
| Fondos alternados | Secciones del Home: `-alt-alt-alt-` (`.section-alt`) |
| Tarjetas animadas | 4 animaciones `project-border-spin` y `portrait-orbit`; la tarjeta de la sección 02 se eleva con hover (`transform` cambia) |
| Indicadores con `+` | Presentes en SGAA (2) y ControlLote (3); `CaseStudyLayout.astro` (`+{fact.value}`) no se modificó |

### 18.4 Seguridad y privacidad

Barrido del diff y de los archivos sin seguimiento: no hay claves, tokens de acceso, contraseñas, rutas locales ni PDF. El único correo es el de contacto público, que ya existía en `profile.ts` en `HEAD`. No hay capturas en el repositorio: se guardaron en el directorio temporal de la sesión. `dist/`, `.astro/` y `node_modules/` están ignorados. Tampoco hay analítica ni integraciones nuevas.

### 18.5 Revisión de Git previa al commit

Ejecutados `git status --short`, `git diff --stat` (30 archivos rastreados, 1186 inserciones y 611 eliminaciones, ya con los cambios de la guía visual y del ADR-002 de esta ejecución; los informes no aparecen porque no tienen seguimiento), `git diff --check` (exit 0) y `git ls-files --others --exclude-standard` (7 archivos). Sin archivos temporales, cachés, builds ni cambios ajenos al portafolio. Sin cambios en `package.json`, `pnpm-lock.yaml`, `.github/`, `astro.config.mjs`, `scripts/`, `src/content.config.ts` ni `public/images/social/`.

Clasificación (varios archivos compartidos acumulan cambios de más de una tarea; se indica el origen principal y los demás):

| Grupo | Archivos |
|---|---|
| 1. T09 — tokens, fondo de puntos y cobre restringido | `public/images/projects/{sgaa,controllote,auditapy,boozhome}{,-light}.svg` (8), `src/components/ui/ButtonLink.astro`, `src/components/ui/StatusBadge.astro`; compartidos: `global.css`, `BaseLayout.astro`, `index.astro`, `ThemeSwitcher.astro`, `MobileNavigation.astro`, `SectionHeading.astro`, `SiteFooter.astro`, `CaseStudyLayout.astro` |
| 2. T10 — header, toggle y navegación | `src/data/navigation.ts`, `src/components/layout/SiteHeader.astro`, `ThemeSwitcher.astro` (reescrito), `MobileNavigation.astro`; compartidos: `BaseLayout.astro` (anti-destello, `currentNav`), `global.css` (`--site-header-height`, `.nav-link`) |
| 3. T11 — Hero y retrato | `src/components/ui/ProfilePortrait.astro` (nuevo); compartidos: `profile.ts` (`greeting`, `intro`, `portrait`), `index.astro` (Hero), `global.css` (`.hero-screen`, `.portrait-*`) |
| 4. T12 — copywriting, tarjetas y enlaces | `src/components/ui/ExperienceCard.astro` (nuevo), `src/components/ui/Icon.astro` (nuevo), `src/content/projects/{sgaa,controllote,auditapy,boozhome}.mdx`, `src/components/ui/ProjectCard.astro`; compartidos: `profile.ts`, `index.astro`, `SiteFooter.astro`, `SectionHeading.astro`, `CaseStudyLayout.astro`, `global.css` (`.experience-card`, `.card-glow`, `.project-card__border`, `.section-alt`) |
| 5. Ajustes finales | `public/favicon.svg`, `public/favicon.ico`; `global.css` (monograma) |
| 6. Documentación e informes | `docs/02-DISENO-VISUAL.md`, `docs/adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md`, `docs/implementations/T09-IMPLEMENTACION.md`, `T10-IMPLEMENTACION.md`, `T11-IMPLEMENTACION.md`, `T12-IMPLEMENTACION.md` |

### 18.6 Propuesta de commit (no ejecutado)

Un único commit integrado, porque T09–T12 se implementaron juntas en esta rama local. Incluye **37 archivos**: los 30 modificados y los 7 sin seguimiento listados en §18.5. Preparación con rutas explícitas (sin `git add .` ni `git add -A`):

```bash
git add -- \
  docs/02-DISENO-VISUAL.md \
  docs/adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md \
  docs/implementations/T09-IMPLEMENTACION.md \
  docs/implementations/T10-IMPLEMENTACION.md \
  docs/implementations/T11-IMPLEMENTACION.md \
  docs/implementations/T12-IMPLEMENTACION.md \
  public/favicon.ico \
  public/favicon.svg \
  public/images/projects/auditapy-light.svg \
  public/images/projects/auditapy.svg \
  public/images/projects/boozhome-light.svg \
  public/images/projects/boozhome.svg \
  public/images/projects/controllote-light.svg \
  public/images/projects/controllote.svg \
  public/images/projects/sgaa-light.svg \
  public/images/projects/sgaa.svg \
  src/components/layout/MobileNavigation.astro \
  src/components/layout/SiteFooter.astro \
  src/components/layout/SiteHeader.astro \
  src/components/layout/ThemeSwitcher.astro \
  src/components/ui/ButtonLink.astro \
  src/components/ui/ExperienceCard.astro \
  src/components/ui/Icon.astro \
  src/components/ui/ProfilePortrait.astro \
  src/components/ui/ProjectCard.astro \
  src/components/ui/SectionHeading.astro \
  src/components/ui/StatusBadge.astro \
  src/content/projects/auditapy.mdx \
  src/content/projects/boozhome.mdx \
  src/content/projects/controllote.mdx \
  src/content/projects/sgaa.mdx \
  src/data/navigation.ts \
  src/data/profile.ts \
  src/layouts/BaseLayout.astro \
  src/layouts/CaseStudyLayout.astro \
  src/pages/index.astro \
  src/styles/global.css
```

Mensaje propuesto:

```text
feat(portfolio): complete personal identity redesign

- T09: Cobre Mineral + Zinc tokens, dotted background and restricted copper
- T10: 56px header, four-item navigation with active section, binary theme toggle
- T11: full-screen hero with portrait ring and borderless JC monogram
- T12: first-person copy, owner-approved project texts, experience cards,
  animated project borders and approved external links
- Copper/zinc favicon (SVG and ICO 16/32/48)
- Implementation reports T09–T12; visual spec and ADR-002 history updated
```

Antes de confirmar, conviene comprobar `git diff --cached --stat` (37 archivos) y `git status --short` (sin restos).

### 18.7 Estado de Git y preview

Rama `feat/t09-visual-tokens-dot-background`, `HEAD` `8854baf`. Los cambios siguen **sin preparar** y los informes T09–T12, `ProfilePortrait.astro`, `ExperienceCard.astro` e `Icon.astro` siguen sin seguimiento. **No se ejecutó `git add`, commit, push, PR, merge ni despliegue.** Los informes quedan guardados localmente sin seguimiento hasta que el propietario autorice el commit; por tanto, T09–T12 no se consideran cerradas del todo (política de informes, regla 9). Preview en `http://127.0.0.1:4322/` sobre el build final. Queda pendiente la revisión visual del propietario: solo el monograma del Hero y el favicon en la pestaña.

## 19. Cierre de T09–T12: validación final, commit integrado y push (2026-10-21)

Sección común de cierre. Las secciones finales de T09 (§26), T11 (§20) y T12 (§19) remiten aquí.

### 19.1 Autorización y decisiones recibidas

- El propietario revisó visualmente la implementación local y **aprobó definitivamente T09, T10, T11 y T12**. Autorizó actualizar la documentación pendiente, validar, preparar los archivos, crear un único commit integrado con el mensaje `feat(portfolio): complete personal identity redesign` y publicar la rama con push. **No** autorizó PR, merge en `main`, despliegue, cambios en la imagen Open Graph ni comenzar T13.
- La aprobación es una decisión del propietario, no una prueba técnica: aquí no se le atribuyen comprobaciones que no constan.
- **Discrepancia detectada antes del commit:** `src/components/ui/ProfilePortrait.astro` se modificó fuera de esta sesión de agente (09:50:39). Quedaba un único círculo interior de los cuatro de `T11 §19`, con una línea de solo espacios. Se consultó al propietario, que decidió **conservar un único círculo interior**. Se eliminó la línea de espacios y se simplificó el CSS a ese círculo, sin cambio visual. ADR-002, la guía visual y `T11 §20` se actualizaron en consecuencia.

### 19.2 Estado inicial verificado

| Comprobación | Resultado |
|---|---|
| Rama | `feat/t09-visual-tokens-dot-background` |
| `HEAD` / `origin/main` (tras `git fetch origin`) | `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1` / el mismo |
| Rama remota `feat/t09-visual-tokens-dot-background` | No existía (`git ls-remote` vacío) |
| `git status --short` | 37 entradas: 30 modificadas y 7 sin seguimiento (los cuatro informes, `ExperienceCard.astro`, `Icon.astro` y `ProfilePortrait.astro`) |
| `package.json`, `pnpm-lock.yaml`, `.github/`, `astro.config.mjs`, `public/images/social/` | Sin cambios: ninguna dependencia nueva, ni CI, ni imagen Open Graph |

### 19.3 Documentación actualizada en el cierre

- `docs/adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md`: nueva entrada «2026-10-21 — Revisión definitiva» con el retrato (anillo y un círculo interior, interior transparente, «JC» en capa superior), el anillo de 45 s, el favicon transparente adaptativo y las elecciones editoriales de Proyectos. Las entradas anteriores quedan intactas, con una marca de «sustituido» o «resuelto» donde se contradecían. El estado de aprobación, el contexto, ADR-001 y el historial no cambian.
- `docs/02-DISENO-VISUAL.md`: cabecera, composición del retrato (estado definitivo con historial breve), CTA «Ver proyecto» (antes figuraba como pendiente) y checklist §11.
- Informes T09–T12: estado de la cabecera y secciones de cierre.

### 19.4 Validaciones finales

Sobre el árbol final, con preview estático en `http://127.0.0.1:4322/` (`node scripts/preview.mjs`) y Chrome sin interfaz (`playwright-core` y `axe-core` temporales, fuera del repositorio).

| Comando / prueba | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Aprobado: lockfile al día, sin resolución |
| `corepack pnpm exec astro sync` | Aprobado |
| `corepack pnpm exec astro check` | Aprobado: 0 errores, 0 avisos, 0 sugerencias |
| `corepack pnpm run build` | Aprobado: 6 páginas (Home, 4 proyectos, 404), `sitemap-index.xml` y `sitemap-0.xml` |
| `git diff --check` | Aprobado |
| Textos literales | H1, texto introductorio, CTA «Hablemos» / «Ver mis proyectos», los tres párrafos de «Sobre mí» y los cinco textos de Proyectos (introducción A; SGAA A; ControlLote A; AuditaPy B; BoozHome B): presentes literalmente |
| «Ver proyecto» | 4 enlaces hacia `/proyectos/{sgaa,controllote,auditapy,boozhome}/` |
| Indicadores con `+` | SGAA `+26`, `+161`; ControlLote `+475`, `+377`, `+5.314`; chips `+3` en las tarjetas. Sin cambios de cifras |
| Enlaces externos | SGAA `https://redfor-ti.com.py/` y BoozHome `https://boozhome.com.py/`, con `noopener noreferrer` y `_blank`; redes del Hero sin cambios |
| Enlaces internos | 10 destinos internos del Home existen en `dist/` o en el DOM |
| Rutas | Home y 4 proyectos 200; ruta inexistente 404 con página propia; sitemaps, `robots.txt`, `favicon.svg` y `favicon.ico` 200 |
| Navegación | Un único acceso activo visible que sigue al scroll («Proyectos»); «Proyectos» activo en los cuatro detalles; menú móvil abre y cierra con Escape (320, 390) |
| Tema | Alterna y persiste tras recargar |
| Foco | Visible con teclado (`outline` sólido de 2px) |
| Movimiento reducido | Anillo detenido (`animation-name: none`) a 320, 390 y 768 |
| Responsive | Sin overflow horizontal a 320, 390 y 768 (y 1440/1920 en la medición del retrato) |
| Retrato | Anillo `portrait-orbit 45s`; un círculo interior; monograma con `z-index: 1` y sin fondo; interior transparente |
| axe-core (WCAG 2.0/2.1 A y AA y 2.2 AA), Home y SGAA, claro y oscuro | 0 violaciones; 1 incompleto `color-contrast` (axe no resuelve fondos con pseudo-elementos; contraste medido manualmente en T09 y T11) |
| Consola | 0 errores |

**No ejecutado (queda para T13):** Safari, Firefox, macOS, Windows y dispositivos reales; Lighthouse; zoom al 200 %; lector de pantalla; favicon en una pestaña real; verificación del despliegue en GitHub Pages.

### 19.5 Commit y push (planificados en este informe)

Este informe forma parte del propio commit, así que su SHA no puede figurar aquí; se obtiene con `git log`. Plan autorizado:

- Preparar solo las 37 rutas del inventario de `T11 §18.8`, contrastadas con `git status` (sin `git add .` ni `-A`). No incluir `dist/`, `.astro/`, `node_modules/` ni capturas o herramientas temporales, que quedan fuera del repositorio.
- Un único commit `feat(portfolio): complete personal identity redesign` con la identidad de autor del repositorio y la línea `Co-Authored-By` de la política de atribución.
- `git push -u origin feat/t09-visual-tokens-dot-background`, sin `--force`. Sin PR, merge, despliegue ni cambios en `main`.

### 19.6 Pendientes para T13

Imagen Open Graph en la identidad nueva; decisión sobre publicar con el placeholder o con la fotografía; posible cambio del estado de BoozHome (`T12 §17`); pruebas de navegadores y dispositivos listadas en §19.4; revisión del favicon en pestañas reales; PR, merge y despliegue cuando se autoricen.
