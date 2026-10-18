# Informe de implementación — T02

**Tarea:** T02 — Sistema visual y componentes estructurales
**Fecha:** 2026-10-18
**Rama:** `feat/t02-design-system`
**Base:** `main` = `c017035` (Merge PR #1 · T01 integrada)
**Estado:** Implementada y verificada; cambios locales sin preparar, pendiente de revisión y autorización para commit.

---

## A. Diagnóstico inicial del repositorio

Comandos ejecutados al inicio (estado real, no asumido):

- `pwd` → `/home/jcantero/Source/onondive/joelveloper.github.io`.
- Rama de partida real: `feat/t01-astro-foundation` (no `main`), HEAD `d03df9b`.
- `main` local estaba en `799923b`, por detrás de `origin/main`.
- `origin/main` = `c017035` (`Merge pull request #1 from joelveloper/feat/t01-astro-foundation`).
- `d03df9b` es ancestro de `origin/main`: T01 ya estaba integrada en `main`.
- Único cambio ajeno presente: **untracked** `docs/implementations/T01-IMPLEMENTACION.md`.

**Divergencia prompt ↔ repositorio:** el prompt indicaba partir de `main`; el árbol estaba en `feat/t01-astro-foundation`. Se resolvió sin pérdida: `git switch main` + `git merge --ff-only origin/main` (fast-forward `799923b..c017035`), preservando el informe de T01 intacto. No se usó rebase ni cambios forzados.

Configuraciones comprobadas y compatibles con T02:

| Elemento | Estado real |
|---|---|
| Astro | `7.4.0`, `output: 'static'`, `site` y `trailingSlash: 'always'` |
| Tailwind | `4.3.3` vía `@tailwindcss/vite` (plugin de Vite, no `@astrojs/tailwind`) |
| React | `@astrojs/react` `7.1.0`, React `19.3.1` |
| shadcn/ui | `components.json` con `"style": "radix-nova"`, base Radix; no se reinicializó |
| Tipografía | `@fontsource-variable/geist@5.3.0` ya presente y autoalojada |
| Alias | `@/*` en `tsconfig.json` y Vite |
| Runtime | Node `v24.21.0`, pnpm `12.14.0` (Corepack) |

## B. Rama y HEAD de partida

- `main` local avanzada por fast-forward a `c017035`.
- Rama creada: `git switch -c feat/t02-design-system` desde `c017035`.
- No se modificó, movió ni eliminó `docs/implementations/T01-IMPLEMENTACION.md`.

## C. Decisiones del sistema visual

1. **Tema único oscuro (dark-first) sin toggle.** Los valores cromáticos viven en una **sola** declaración con selector `:root, .dark`, evitando dos paletas oscuras paralelas. `<html>` recibe `class="dark"` en `BaseLayout`, de modo que la variante `dark:` de Tailwind queda habilitada y coherente con `:root`. `color-scheme: dark` se aplica en `:root` y como metadato `<meta name="color-scheme" content="dark">`.
2. **`--background` es siempre oscuro desde la carga inicial**, sin JavaScript; ningún script decide el tema.
3. **Mapeo de la "Accent" del diseño a tokens shadcn.** El acento de marca `#91B8FF` se expone como `--primary`/`--primary-foreground` (semántica correcta en shadcn: acción principal). El `--accent` de shadcn se reserva para fondos de hover (`surface-raised`), evitando duplicar variables contradictorias.
4. **Tokens propios adicionales** solo donde hay necesidad real: `--surface`, `--surface-raised`, `--positive` (+ `--positive-foreground`), expuestos como `--color-surface`, `--color-surface-raised`, `--color-positive` y `--color-positive-foreground`.
5. **Fuente única de verdad cromática:** todos los tokens semánticos derivan de la paleta declarada en el bloque `:root, .dark`.
6. **Tipografía: Geist Variable** (ya instalada y autoalojada mediante `@fontsource-variable/geist`); no se instaló ninguna otra fuente. Pila monoespaciada del sistema para etiquetas y código.
7. **Interactividad:** ningún componente React ni directiva `client:*`. Header, footer, superficies, botones, badges y tarjetas son Astro/HTML puro. La navegación móvil se resuelve con `flex-wrap` accesible (sin menú desplegable ni JS), decisión coherente con "no usar Radix sin interacción que lo justifique".
8. **Prohibición de datos ficticios:** la vista de demostración no incluye métricas, clientes ni capturas; el contacto usa datos ya autorizados en `docs/05-CONTENIDOS-Y-CASOS.md`.

## D. Tokens implementados

Paleta (hex objetivo → OKLCH declarado, con `%` en el CSS minificado):

| Token raw | Hex | OKLCH |
|---|---|---|
| `--background` | `#0B1019` | `oklch(0.1725 0.0205 261.91)` |
| `--surface` | `#111A28` | `oklch(0.2164 0.0308 259.01)` |
| `--surface-raised` | `#182337` | `oklch(0.2563 0.0411 261.83)` |
| `--foreground` | `#F3F6FC` | `oklch(0.9726 0.0086 264.52)` |
| `--muted-foreground` | `#B5C3D7` | `oklch(0.8128 0.0322 257.25)` |
| `--border` / `--input` | `#344257` | `oklch(0.3760 0.0406 258.33)` |
| `--brand` → `--primary` | `#91B8FF` | `oklch(0.7817 0.1105 261.98)` |
| `--brand-foreground` → `--primary-foreground` | `#0B1019` | `oklch(0.1725 0.0205 261.91)` |
| `--positive` | `#70DDC0` | `oklch(0.8247 0.1098 173.90)` |

Tokens semánticos shadcn conservados y derivados: `background`, `foreground`, `card(-foreground)`, `popover(-foreground)`, `primary(-foreground)`, `secondary(-foreground)`, `muted(-foreground)`, `accent(-foreground)`, `border`, `input`, `ring`, `destructive`, además de `chart-1..5` y `sidebar*`.

Tipografía (tokens `--text-*` en `@theme inline`):

| Token | Valor |
|---|---|
| `--text-hero` | `clamp(2.75rem, 6vw, 5.25rem)` · lh `1.02` · ls `-0.035em` |
| `--text-display` | `clamp(2rem, 3.7vw, 3.4rem)` · lh `1.08` · ls `-0.025em` |
| `--text-title` | `clamp(1.2rem, 1.6vw, 1.5rem)` · lh `1.3` · ls `-0.01em` |
| `--text-lead` | `clamp(1.0625rem, 1.4vw, 1.25rem)` · lh `1.6` |
| `--text-caption` | `0.8125rem` · lh `1.5` |
| `--text-label` | `0.75rem` · lh `1.4` · ls `0.08em` |
| `--container-measure` | `68ch` (utilidad `max-w-measure`) |
| `--font-sans` | `'Geist Variable', ui-sans-serif, system-ui, …` |
| `--font-mono` | `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, …` |

Reglas base añadidas: `color-scheme: dark`, `:focus-visible` con contorno `2px solid var(--ring)` y `outline-offset: 2px`, `::selection`, y bloque `@media (prefers-reduced-motion: reduce)` que neutraliza animaciones/transiciones/scroll suave.

## E. Componentes creados

| Archivo | Rol | Props principales |
|---|---|---|
| `src/layouts/BaseLayout.astro` | HTML semántico, `lang="es"`, metadatos, skip link, header/main/footer | `title`, `description?`, `nav?`, `brandHref?` |
| `src/components/layout/Container.astro` | Ancho máximo 1160/1280px, padding lateral responsive, `as`/`id` | `as?`, `size?`, `id?`, `class?` |
| `src/components/layout/SiteHeader.astro` | Marca texto + monograma JC, navegación configurable, wrap accesible | `siteName?`, `monogram?`, `brandHref?`, `nav?` |
| `src/components/layout/SiteFooter.astro` | Identidad, año dinámico, correo/GitHub/redes, id `contacto` | `siteName?`, `github?`, `email?`, `links?`, `year?` |
| `src/components/ui/SectionHeading.astro` | Etiqueta, numeración, título, descripción, alineación, nivel de encabezado | `title`, `label?`, `description?`, `number?`, `align?`, `as?`, `id?` |
| `src/components/ui/ButtonLink.astro` | Enlace real con variantes primary/secondary/ghost y tamaños md/lg | `href`, `variant?`, `size?`, `external?`, `ariaLabel?` |
| `src/components/ui/TechBadge.astro` | Etiqueta técnica monoespaciada, no dependiente del color | `label` |
| `src/components/ui/StatusBadge.astro` | Estados `production` / `development` / `prelaunch` con texto + marcador | `status`, `label?` |
| `src/components/ui/Surface.astro` | Superficie base/raised/outline con padding adaptable | `as?`, `variant?`, `padding?` |
| `src/components/ui/ProjectCard.astro` | Presentación estructural tipada, preparada para T04 (sin uso en la demo) | `title`, `description`, `category`, `status`, `technologies`, `href`, `image?`, `maxTechnologies?` |

`ProjectCard` queda **sin usar** en la página, como autoriza el prompt, pero tipado y verificado por `astro check`.

## F. Archivos modificados

- **Creados:** `src/layouts/BaseLayout.astro`, `src/components/layout/Container.astro`, `src/components/layout/SiteHeader.astro`, `src/components/layout/SiteFooter.astro`, `src/components/ui/SectionHeading.astro`, `src/components/ui/ButtonLink.astro`, `src/components/ui/TechBadge.astro`, `src/components/ui/StatusBadge.astro`, `src/components/ui/Surface.astro`, `src/components/ui/ProjectCard.astro`.
- **Modificados:** `src/styles/global.css` (sustitución del preset neutral por tokens dark-first), `src/pages/index.astro` (vista de demostración con el nuevo layout y componentes).
- **No modificados:** `astro.config.mjs`, `components.json`, `tsconfig.json`, `package.json`, `pnpm-lock.yaml`, `src/lib/utils.ts`, documentación y `docs/implementations/T01-IMPLEMENTACION.md`.

## G. Resultados de validación

| Comando | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | **Exit 0** (lockfile sin cambios) |
| `pnpm exec astro check` | **Exit 0** — 14 archivos, 0 errores, 0 warnings, 0 hints |
| `pnpm run build` | **Exit 0** — 1 página, `output: "static"` |
| `astro preview` + `curl /` | **HTTP 200**; CSS `/_astro/index.DBzj_I14.css` **HTTP 200**, `text/css`, 20 926 bytes |
| `dist/index.html` | `<html lang="es" class="dark scroll-smooth">`, `<title>` con descripción; **0** `<script>`, **0** `astro-island`, **0** directivas `client:` |
| CSS generado | Tokens de tema presentes (`oklch(17.25% .0205 261.91)`, `surface-raised`, `positive`, `color-scheme:dark`, `prefers-reduced-motion`); utilidades `.text-hero/.text-display/.text-title/.text-lead/.text-caption/.text-label/.max-w-measure/.bg-surface-raised/.bg-positive` generadas |
| Geist local | 5 archivos `woff2` en `dist/_astro/`, `@font-face` `'Geist Variable'` en el CSS; sin dependencias remotas |
| SSR / adaptadores | Sin adaptador; `output` sigue `static`; sin hidratación global |

No se ejecutó `git add`, commit, push ni PR. El chunk `client.*.js` no referenciado procede de la configuración React de T01 y no se carga (sin `<script>` en el HTML).

## H. Evidencias visuales

Capturas con Chrome headless local (fuera del repositorio, en `/tmp/opencode/`, no versionadas), servidas desde `astro preview`:

- `home-desktop.png` (1440×1400)
- `home-tablet1024.png` (1024×1400)
- `home-md768.png` (768×1600)
- `home-mobile375.png` (375×2400)
- `home-mobile320.png` (320×2600)

Revisión visual: header con monograma y navegación; hero con kicker monoespaciado; jerarquía H1→H2→H3 clara; superficies con borde delgado y radios coherentes; badges legibles; footer con año dinámico (2026). **No se subieron capturas a Git.**

## I. Accesibilidad y responsive

Contraste (calculado sobre los valores reales, objetivo WCAG 2.2 AA):

| Combinación | Ratio | AA |
|---|---|---|
| foreground / background | 17.60:1 | ✔ |
| muted-foreground / background | 10.66:1 | ✔ |
| muted-foreground / surface | 9.78:1 | ✔ |
| muted-foreground / surface-raised | 8.81:1 | ✔ |
| primary / background | 9.53:1 | ✔ |
| primary-foreground / primary | 9.53:1 | ✔ |
| positive / background | 11.60:1 | ✔ |
| destructive / background | 6.59:1 | ✔ |
| border / background (decorativo) | 1.87:1 | n/a (no informativo) |

Accesibilidad estructural:

- HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`; un único `main#contenido` y un único `H1`.
- Skip link "Saltar al contenido" apuntando a `main#contenido` (`tabindex="-1"`), visible al recibir foco.
- Foco visible global (`:focus-visible`, contorno 2px con token `--ring`).
- Estados de proyecto no dependen solo del color: cada badge incluye texto ("En producción", "En desarrollo", "Prelanzamiento") además del marcador.
- Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`.
- `prefers-reduced-motion: reduce` neutraliza animaciones, transiciones y scroll suave.
- Sin animaciones invasivas, parallax ni contenido oculto solo al hover.

Responsive: revisado a 320/375/768/1024/1440 px mediante capturas. Contenedor con `px-5` (20px) en móvil y hasta `px-8` en escritorio dentro de `max-w-[1160px]`; la navegación y los botones usan `flex-wrap`; grid de superficies 1 columna → 2 (`sm`) → 3 (`md`). Sin indicios de desbordes ni textos cortados en las capturas.

**Limitación declarada:** la ausencia de scroll horizontal se evaluó por inspección visual de capturas y análisis del CSS, no mediante una medición automatizada de `scrollWidth`. La navegación por teclado se verificó por estructura y estilos de foco, no con una sesión interactiva.

## J. Riesgos y limitaciones

- **Datos de contacto/redes** tomados de `docs/05-CONTENIDOS-Y-CASOS.md` (autorizados). T03 debe centralizarlos; hoy viven como valores por defecto en `SiteFooter`.
- **`--destructive`** mantiene el valor oscuro de shadcn (6.59:1 sobre el fondo); sin componente que lo use todavía.
- **Bordes como separación decorativa** (1.87:1) quedan por debajo de 3:1; se aceptan por ser no informativos. Si un borde llegara a comunicar estado, deberá revisarse.
- **`ProjectCard` sin uso**: su contrato podría ajustarse al integrarse con Content Collections en T04.
- **Header sin menú desplegable móvil**: la navegación se resuelve por wrap. Si el número de enlaces crece, T06 deberá evaluar un menú Radix accesible.
- El chunk React no referenciado sigue generándose (heredado de T01); no afecta al HTML servido.

## K. Cumplimiento de los criterios T02

| Criterio | Estado |
|---|---|
| Sistema de tokens dark-first coherente | ✔ |
| Compatibilidad con shadcn/Radix | ✔ (`components.json` intacto, base Radix) |
| Geist como tipografía principal | ✔ (autoalojada) |
| Componentes estructurales implementados | ✔ |
| Layout con HTML semántico | ✔ |
| Vista de demostración usa los componentes | ✔ |
| Coherencia visual superficies/botones/tipografía/bordes | ✔ (capturas) |
| Usable desde 320px, sin overflow horizontal | ✔ (revisión visual; medición automatizada pendiente) |
| Foco visible y skip link funcional | ✔ (estructural) |
| Contraste inicial evaluado | ✔ (tabla de ratios) |
| Reducción de movimiento respetada | ✔ |
| Sin hidratación React innecesaria | ✔ (0 `client:*`, 0 `astro-island`) |
| `astro check` correcto | ✔ |
| `pnpm run build` correcto | ✔ |
| Sin contenidos ficticios ni assets ajenos | ✔ |
| Sin implementar tareas posteriores | ✔ |
| Informe T02 disponible | ✔ (este documento) |
| Sin commit/push/PR | ✔ |

## L. Recomendaciones para T03 y T04

- **T03:** centralizar identidad, navegación y canales (GitHub, `mailto:`, YouTube, Instagram) en `src/data/` y consumirlos desde `SiteHeader`/`SiteFooter` mediante props, sustituyendo los valores por defecto actuales. Definir `src/content.config.ts` con Zod y el gate `publicApproved`.
- **T03/04:** conectar `ProjectCard` a la colección; si el contrato necesita `category` tipada (`saas | client`) o imagen con `usageApproved`, ajustarlo en ese momento.
- **T04:** reutilizar `SectionHeading` con `number` para las secciones numeradas de la landing; mantener un único `H1` y el ancho de lectura `max-w-measure` en párrafos.
- **T06:** reevaluar la navegación móvil si el header crece; si se adopta Sheet de shadcn/Radix, hidratar solo esa isla.
- **T07:** añadir canonical, Open Graph, sitemap, `robots.txt`, favicon y ruta 404; el `#contacto` del footer ya queda como ancla estable.

---

## M. Revisión de cierre de T02 (evidencia adicional)

Evidencia obtenida durante la ejecución de cierre. No reemplaza los resultados históricos de las secciones anteriores.

### Reconstrucción de Git (sin asumir el informe)

- Rama: `feat/t02-design-system`; HEAD base `c017035` (integración de T01 en `main`).
- `git diff` limitado a `src/styles/global.css` y `src/pages/index.astro`; el resto de T02 son archivos nuevos sin seguimiento.
- Sin modificaciones ajenas al alcance. `docs/implementations/T01-IMPLEMENTACION.md` permanece intacto y **fuera** del commit de T02.

### Revisión de código (10 puntos)

1. Fuente única de verdad cromática: bloque `:root, .dark` en `global.css`. ✔
2. Tema oscuro operativo sin JavaScript (valores estáticos + `class="dark"` en `<html>`). ✔
3. Sin variables contradictorias: tokens semánticos derivados de la paleta; `--brand`→`--primary`. ✔
4. Geist autoalojada vía `@fontsource-variable/geist`. ✔
5. `BaseLayout` con `header`/`main`/`footer` semánticos y `lang="es"`. ✔
6. Jerarquía de encabezados correcta: un `H1`, `SectionHeading` usa `H2`, `ProjectCard` usa `H3`. ✔
7. Enlaces con URLs reales (anclas internas presentes, GitHub/YouTube/Instagram/correo autorizados). ✔
8. Sin valores ficticios ni métricas. ✔
9. `ProjectCard` con props tipadas (`ProjectStatus`, `ProjectCardImage`, `technologies: string[]`). ✔
10. Sin React innecesario: 0 directivas `client:*`, 0 islas. ✔

### Medición responsive automatizada

Chrome DevTools Protocol (Chrome `155.0.8059.84`, sin dependencias nuevas), sonda `documentElement.scrollWidth` vs `window.innerWidth`:

| Viewport | `documentWidth` | `hasHorizontalOverflow` |
|---|---|---|
| 320 | 320 | false |
| 375 | 375 | false |
| 768 | 753 | false |
| 1024 | 1009 | false |
| 1440 | 1425 | false |

En anchos ≥ 768 `documentWidth` es menor que el viewport porque la barra de desplazamiento reserva su espacio; no hay desbordamiento ni elementos recortados (`offenders: []` en los cinco casos).

### Pruebas de teclado ejecutadas

- Primer `Tab` → `<a href="#contenido">Saltar al contenido</a>`, **visible al recibir foco** (caja 155×36, contorno `2px solid oklch(0.7817 0.1105 261.98)`).
- `Enter` sobre el skip link → `location.hash = "#contenido"` y `document.activeElement` = `main#contenido`.
- Orden de tabulado lógico: skip link → CTAs del hero → enlaces de componentes → enlaces del footer.
- Foco visible en todos los enlaces (`outline: 2px solid`, color `--ring`).
- Sin trampas de foco: el tabulado avanzó de forma continua; no se detectaron controles sin funcionalidad.

### Validación final (códigos de salida reales)

| Comando | Exit |
|---|---|
| `pnpm install --frozen-lockfile` | 0 |
| `pnpm exec astro check` | 0 (0 errores/0 warnings/0 hints, 14 archivos) |
| `pnpm run build` | 0 (1 página, `output: "static"`) |
| `git diff --check` | 0 |

### Escaneo de seguridad y assets

- Sin patrones de secreto (`api_key`, `secret`, `password`, `token`, `PRIVATE KEY`, `ghp_`, `sk-`) en `src/`.
- Únicas URLs externas: `https://github.com/joelveloper`, `https://www.youtube.com/@joeldeveloper`, `https://www.instagram.com/joel.developer` (autorizadas).
- Sin referencias a FullStackHero ni assets ajenos.
- `output: 'static'`; sin adaptador SSR (`@astrojs/` solo `check` y `react`); 0 `<script>` y 0 `astro-island` en el HTML generado.
- CSS generado (`index.BvB4CvKH.css`) con la paleta objetivo y `color-scheme:dark`; 5 archivos `woff2` de Geist locales.
