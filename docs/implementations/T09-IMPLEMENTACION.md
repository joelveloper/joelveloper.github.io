# Informe de implementación — T09

- **Tarea:** T09 — Rediseño: tokens Cobre Mineral + Zinc y fondo de puntos
- **Fecha:** 2026-10-20
- **Rama:** `feat/t09-visual-tokens-dot-background`
- **Base:** `main` en `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1` (Merge PR #10 · FASE 1 documental, ADR-002)
- **Estado:** aprobada definitivamente por el propietario tras su revisión visual (2026-10-21) y versionada en el commit integrado de T09–T12 `feat(portfolio): complete personal identity redesign`, con commit y push de la rama autorizados; **sin PR, merge ni despliegue**. Cierre en §26.

---

## 1. Estado inicial y rama

| Comprobación | Resultado |
|---|---|
| Rama al iniciar la sesión | `docs/adr-002-rediseno-identidad` (`597f5c8`), sincronizada con `origin`, árbol limpio |
| Primeros intentos de T09 | Detenidos: el PR #10 seguía abierto (`state: open`, `merged: false` en la API de GitHub) y `597f5c8` no estaba en `origin/main` |
| `git fetch origin` (tras el merge) | `origin/main` avanzó `f6f3be5..8854baf` |
| `main` local | Actualizada **solo por fast-forward** (`git merge --ff-only origin/main`, `4fd0da3..8854baf`) |
| Rama creada | `feat/t09-visual-tokens-dot-background` desde `8854baf` |
| Rama documental | `docs/adr-002-rediseno-identidad` conservada intacta |
| Árbol al crear la rama | Limpio |
| Operaciones destructivas | Ninguna (sin reset, rebase ni cherry-pick) |

## 2. Commit de partida

`8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1` — «Merge pull request #10 from joelveloper/docs/adr-002-rediseno-identidad».

## 3. Confirmación de FASE 1 integrada

- API pública de GitHub para el PR #10: `state: closed`, `merged: true`, `merged_at: 2026-10-20T18:22:38Z`, `merge_commit_sha: 8854baf…`.
- `git merge-base --is-ancestor 8854baf origin/main`: verdadero.
- `docs/adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md` y `docs/investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md` existen en `origin/main`.
- `docs/02-DISENO-VISUAL.md §3` define «Cobre Mineral + Zinc» y `docs/04-PLAN-DE-TAREAS.md` define T09 como «Rediseño: tokens y fondo de puntos».

Documentos leídos: `AGENTS.md`, `README.md`, `docs/01-PRD.md` (por referencias), `docs/02-DISENO-VISUAL.md`, `docs/03-ARQUITECTURA.md` (restricciones), `docs/04-PLAN-DE-TAREAS.md`, `docs/06-CALIDAD-Y-VALIDACION.md`, ADR-001, ADR-002, INV-001 (por referencias de ADR-002) e informes T07 y T08 (metodología de pruebas).

## 4. Referencia a ADR-002

ADR-002 §Decisión 2, 3 y 8: sustituir el azul corporativo por **Cobre Mineral + Zinc** con siete valores aprobados; patrón `bg-dots` con máscara radial y tono neutro; contraste WCAG 2.2 AA **medido** en ambos temas. Este informe completa los tokens que ADR-002 y `02-DISENO-VISUAL.md §3` dejaban «a fijar en T09».

## 5. Diagnóstico del sistema cromático anterior

- `src/styles/global.css` definía una paleta azul: fondo claro `#f8fafc`, marca `#2557a7`/`oklch(0.7817 0.1105 261.98)` (≈ `#91B8FF`), fondos oscuros con tono 259–262° (azul pizarra), `--muted-foreground` y `--border` azulados.
- `--input` era un alias de `--border`; ningún token garantizaba 3:1 en contornos de controles.
- `--chart-3..5` eran azules (tonos 235–250°), aunque no se usan en la interfaz.
- El cobre de ADR-002 aún no existía; el `--brand` azul se aplicaba a CTA, foco y también a numeradores, fechas, etiquetas y al marcador «En desarrollo», usos decorativos que `02-DISENO-VISUAL.md §3` pasa a tonos neutros.
- El Home tenía cuatro bandas a ancho completo: borde inferior del Hero, `border-y bg-surface/40` en Especialidades y en Cómo trabajo, y `border-t bg-surface` (opaco) en Contacto.
- Las ilustraciones SVG de proyecto (`public/images/projects/*.svg`) tenían codificados los hex de la paleta azul (`#0B1019`, `#91B8FF`, `#344257`, `#2557A7`, `#CAD4E2`…).

## 6. Paleta oscura definitiva

| Token | Valor | Origen |
|---|---|---|
| `--background` | `#0D0E11` | Aprobado ADR-002 |
| `--surface` (`--card`, `--muted`, `--sidebar`) | `#19191B` | Aprobado |
| `--surface-raised` (`--popover`, `--secondary`, `--accent`) | `#343438` | Aprobado |
| `--foreground` | `#F1EFEB` | Aprobado |
| `--brand` (`--primary`, `--ring`) | `#E6A47B` | Aprobado |
| `--muted-foreground` | `#A6A5AC` | T09 (zinc medio; ≥4.5:1 incluso sobre `#343438`) |
| `--border` | `#343438` | Referencia ADR-002; **solo separador decorativo** |
| `--input` | `#6B6B72` | T09: contorno de controles ≥3:1 sobre fondo y superficie |
| `--brand-foreground` (`--primary-foreground`) | `#0D0E11` | T09: texto oscuro sobre cobre (el blanco solo da 2.11:1) |
| `--positive` | `oklch(0.8247 0.1098 173.90)` ≈ `#70DDC0` | Conservado (tono propio de éxito) |
| `--positive-foreground` | `#0D0E11` | Ajustado al nuevo fondo |
| `--destructive` | `oklch(0.704 0.191 22.216)` | Sin cambios |
| `--dots-color` | `rgb(241 239 235 / 0.13)` | T09: derivado de `--foreground`, neutro |

## 7. Paleta clara definitiva

| Token | Valor | Origen |
|---|---|---|
| `--background` | `#FAF9F7` | Aprobado ADR-002 |
| `--foreground` | `#252526` | Aprobado |
| `--brand` (`--primary`, `--ring`) | `#98532A` | Aprobado |
| `--surface` | `#FFFFFF` | T09: escalón inmediato sobre `#FAF9F7` |
| `--surface-raised` | `#F1F0ED` | T09: zinc cálido claro |
| `--muted-foreground` | `#5F5F66` | T09 |
| `--border` | `#E3E2DE` | T09: separador decorativo |
| `--input` | `#86858A` | T09: contorno de controles ≥3:1 |
| `--brand-foreground` | `#FFFFFF` | T09: medido 5.82:1 sobre `#98532A` |
| `--positive` / `--positive-foreground` | `#17674F` / `#FFFFFF` | Conservados |
| `--destructive` | `#B42318` | Sin cambios |
| `--dots-color` | `rgb(37 37 38 / 0.12)` | T09: derivado de `--foreground`, más tenue que en oscuro |

Los valores se escriben en hex para coincidir exactamente con los aprobados en ADR-002 (las mediciones preliminares de `02-DISENO-VISUAL.md §3` se reprodujeron con los mismos valores: 16.81, 9.15, 14.55, 5.53, 1.56:1…). `--positive` y `--destructive` oscuros se mantienen en OKLCH porque no cambian.

## 8. Tabla de tokens CSS modificados (`src/styles/global.css`)

| Token | Antes (claro / oscuro) | Después (claro / oscuro) |
|---|---|---|
| `--background` | `#f8fafc` / `oklch(0.1725 0.0205 261.91)` | `#faf9f7` / `#0d0e11` |
| `--surface` | `#ffffff` / `oklch(0.2164 0.0308 259.01)` | `#ffffff` / `#19191b` |
| `--surface-raised` | `#f0f4fa` / `oklch(0.2563 0.0411 261.83)` | `#f1f0ed` / `#343438` |
| `--foreground` | `#152238` / `oklch(0.9726 0.0086 264.52)` | `#252526` / `#f1efeb` |
| `--muted-foreground` | `#465670` / `oklch(0.8128 0.0322 257.25)` | `#5f5f66` / `#a6a5ac` |
| `--border` | `#cad4e2` / `oklch(0.3760 0.0406 258.33)` | `#e3e2de` / `#343438` |
| `--brand` | `#2557a7` / `oklch(0.7817 0.1105 261.98)` | `#98532a` / `#e6a47b` |
| `--brand-foreground` | `#ffffff` / `oklch(0.1725 0.0205 261.91)` | `#ffffff` / `#0d0e11` |
| `--positive-foreground` | `#ffffff` / `oklch(0.1725 0.0205 261.91)` | `#ffffff` / `#0d0e11` |
| `--input` | `var(--border)` | `#86858a` / `#6b6b72` |
| `--chart-3` | `#6b7fa3` / `oklch(0.70 0.09 250)` | `var(--muted-foreground)` |
| `--chart-4` | `#8a9ab5` / `oklch(0.62 0.08 240)` | `var(--input)` |
| `--chart-5` | `#a7b4c8` / `oklch(0.52 0.07 235)` | `#b9b8bd` / `#4c4c52` |
| `--dots-color` | — | `rgb(37 37 38 / 0.12)` / `rgb(241 239 235 / 0.13)` |
| `--dots-size` | — | `1px` |
| `--dots-gap` | — | `28px` |

Sin cambios: `--positive`, `--destructive` y todos los alias shadcn/ui (`--card`, `--popover`, `--primary`, `--secondary`, `--muted`, `--accent`, `--ring`, `--sidebar-*`), que siguen derivándose de los tokens base mediante `var()`. Tampoco cambian el bloque `@theme inline` ni la mecánica `light-dark()` / `.light` / `.dark`. Los tokens `--chart-*` no se usan en ningún componente; se neutralizaron solo para eliminar los residuos azules.

## 9. Construcción de `bg-dots`

Utilidad propia definida con `@utility bg-dots` en `global.css`:

- **Patrón:** un único `radial-gradient(circle at center, var(--dots-color) var(--dots-size), transparent calc(var(--dots-size) + 0.5px))`, repetido con `background-size: var(--dots-gap) var(--dots-gap)` (28 px) y anclado en `center top`.
- **Máscara:** `mask-image` y `-webkit-mask-image` (Safari) con `radial-gradient(ellipse 90% 75% at 50% 25%, #000 20%, transparent 100%)`; el patrón es pleno en la zona superior central y se desvanece hacia los laterales y hacia abajo.
- **Color:** neutro, derivado del texto principal con alfa bajo (no cobre). Adapta su tema con `light-dark()`.
- **Modo de alto contraste:** `@media (forced-colors: active) { display: none; }`.
- Sin imágenes, sin peticiones de red, sin animación ni JavaScript.

Intensidad efectiva medida (punto pleno, sin máscara): `#E0DFDE` sobre `#FAF9F7` = 1.27:1 en claro y `#2A2B2D` sobre `#0D0E11` = 1.37:1 en oscuro. Es decorativo por diseño, pero en el peor caso (texto secundario encima de un punto) mantiene 4.75:1 en claro y 5.78:1 en oscuro.

## 10. Integración con `BaseLayout`

```html
<body class="isolate flex min-h-dvh flex-col">
  <div aria-hidden="true" class="bg-dots pointer-events-none fixed inset-0 -z-10"></div>
```

- `aria-hidden="true"`, `pointer-events: none`, no focalizable (es un `div` sin `tabindex`).
- `position: fixed; inset: 0`: ocupa el viewport, nunca el ancho del documento, y no produce scroll horizontal.
- `-z-10` dentro de `body.isolate`: el `body` crea su propio contexto de apilamiento, así que la capa se pinta sobre el fondo y bajo todo el contenido sin depender del contexto raíz. El header (`z-40`), el panel de tema (`z-50`), el enlace de salto (`z-50`) y el `<dialog>` del menú móvil (capa superior) no se ven afectados.
- El script anti-destello y el resto del `<head>` no se modificaron.

## 11. Cambios de continuidad visual en Home (`src/pages/index.astro`)

| Sección | Antes | Después | Motivo |
|---|---|---|---|
| Hero (`#inicio`) | `overflow-hidden border-b border-border` | `overflow-hidden` | Continuidad Hero → «Sobre mí» |
| Especialidades | `border-y border-border bg-surface/40` | sin clases de banda | La banda velaba el patrón y cortaba la página |
| Cómo trabajo | `border-y border-border bg-surface/40` | sin clases de banda | Igual |
| Contacto | `border-t border-border bg-surface` | `border-t border-border` | Se conserva la línea como límite funcional del cierre; se retira el bloque opaco |

Se conservan sin cambios los espaciados (`py-16 sm:py-20 lg:py-24`), las tarjetas, el separador «Tecnologías con las que he trabajado», los divisores de la lista de redes, el pie (`border-t bg-surface`) y la línea inferior del header (T10).

**Restricción del cobre** (`04-PLAN-DE-TAREAS.md` T09: «restringir el cobre a CTA, enlaces destacados, foco y estados activos»; `02-DISENO-VISUAL.md §3`: numeradores, fechas, etiquetas y badges pasan a neutro):

- `index.astro`: fechas de Trayectoria, numeradores de Especialidades y Cómo trabajo y etiqueta «Full Stack» pasan de `text-primary` a `text-muted-foreground`; el borde de Oñondive pasa de `border-primary/40` a `border-border`.
- El **Hero no se tocó** (su etiqueta cobre, la tarjeta «sistema / portafolio» y el resplandor siguen como estaban, ahora con colores de token cobre/zinc). Se sustituye en T11.

No se modificaron textos, títulos, orden de secciones, datos, proyectos, CTA, navegación, distribución del Hero ni tamaños del header.

## 12. Mediciones de contraste

Método: fórmula de luminancia relativa WCAG 2.x. Pares de tokens calculados con un script propio (`contrast.mjs`). Mezclas efectivas (alfa, `color-mix`, hover y foco) medidas en Chrome 155 sobre el build: cada color computado se resuelve a sRGB con canvas y se compone sobre el fondo efectivo de sus ancestros (92 mediciones, 0 fallos).

### 12.1 Pares de tokens

| Par | Claro | Oscuro | Mínimo |
|---|---|---|---|
| `foreground` / `background` | 14.55 | 16.81 | 4.5 |
| `foreground` / `surface` | 15.31 | 15.29 | 4.5 |
| `foreground` / `surface-raised` | 13.44 | 10.79 | 4.5 |
| `muted-foreground` / `background` | 6.02 | 7.90 | 4.5 |
| `muted-foreground` / `surface` | 6.33 | 7.19 | 4.5 |
| `muted-foreground` / `surface-raised` | 5.56 | 5.08 | 4.5 |
| `brand` (enlace/texto) / `background` | 5.53 | 9.15 | 4.5 |
| `brand` / `surface` | 5.82 | 8.33 | 4.5 |
| `brand` / `surface-raised` | 5.11 | 5.88 | 4.5 |
| `brand-foreground` / `brand` (texto sobre cobre) | 5.82 (blanco) | 9.15 (`#0D0E11`) | 4.5 |
| `positive` / `background` | 6.46 | 11.76 | 4.5 |
| `positive` / `surface` | 6.80 | 10.69 | 4.5 |
| `positive` / `surface-raised` | 5.96 | 7.55 | 4.5 |
| `positive-foreground` / `positive` | 6.80 | 11.76 | 4.5 |
| `destructive` / `background` (sin uso en UI) | 6.25 | ≈6.68 | 4.5 |
| `ring` (foco) / `background` | 5.53 | 9.15 | 3 |
| `ring` / `surface` | 5.82 | 8.33 | 3 |
| `input` (contorno de control) / `background` | 3.48 | 3.65 | 3 |
| `input` / `surface` | 3.66 | 3.32 | 3 |
| `input` / `surface-raised` | 3.21 | **2.34** | 3 |
| `border` (decorativo) / `background` | 1.23 | 1.56 | — |
| `border` / `surface` | 1.30 | 1.42 | — |
| `foreground` / selección (cobre 30 %) | 9.44 | 9.17 | 4.5 |

`input` sobre `surface-raised` en oscuro (2.34:1) no cumple, pero **ningún control se coloca sobre `surface-raised`**: las superficies elevadas (Formación continua, Full Stack, correo) solo contienen texto y enlaces de texto. Queda como restricción documentada (§21). `#FFFFFF` sobre `#E6A47B` daría 2.11:1, por eso en oscuro el texto sobre cobre es `#0D0E11`.

### 12.2 Mezclas efectivas y estados (medidas en el navegador)

| Elemento | Claro | Oscuro | Mínimo |
|---|---|---|---|
| CTA primario en reposo | 5.82 | 9.15 | 4.5 |
| CTA primario en hover (`bg-primary/90`, fondo efectivo `#A2633E` / `#D19571`) | 4.78 | 7.59 | 4.5 |
| Botón secundario en hover (texto sobre `surface-raised`) | 13.44 | 10.79 | 4.5 |
| Contorno botón secundario sobre fondo | 3.48 | 3.65 | 3 |
| Contorno botón secundario dentro de ProjectCard | 3.66 | 3.32 | 3 |
| Contorno en hover (`hover:border-primary`) | 5.53 / 5.82 | 9.15 / 8.33 | 3 |
| Contorno selector de tema · menú móvil · cerrar menú | 3.48 | 3.65 | 3 |
| Indicador de foco (2 px sólido, `--ring`) | 5.82 | 8.33 | 3 |
| Panel de tema: icono activo (cobre sobre `primary/10`) | 5.03 | 6.93 | 3 |
| Panel de tema: icono inactivo | 6.33 | 7.19 | 3 |
| Enlaces de navegación / hover | 6.02 / 14.55 | 7.90 / 16.81 | 4.5 |
| Numeradores, fechas y etiquetas (muted) | 6.02–6.33 | 7.19–7.90 | 4.5 |
| StatusBadge / TechBadge (texto) | 6.33 | 7.19 | 4.5 |
| Marcadores de estado (producción / desarrollo) | 6.80 / 6.33 | 10.69 / 7.19 | 3 |
| Breadcrumb y categoría del caso (sobre `surface/40`) | 6.14 | 7.64 | 4.5 |
| Prosa de caso de estudio | 6.02 | 7.90 | 4.5 |
| Enlace «Saltar al contenido» | 5.82 | 9.15 | 4.5 |
| Hero (sin cambios de clase): etiqueta cobre / etiqueta cobre sobre `primary/10` | 5.53 / 5.03 | 9.15 / 6.93 | 4.5 |
| Borde de tarjeta en hover o `focus-within` (informativo, no es control) | 2.63 | 4.26 | — |
| Peor caso: texto secundario sobre un punto | 4.75 | 5.78 | 4.5 |

## 13. Resultados de accesibilidad

- **axe-core 4.14.0** (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`) en 6 páginas × 4 modos = 24 ejecuciones: **0 violaciones y 0 nodos incompletos**. axe no evalúa la textura `bg-dots` contra el texto, porque no es ancestro del texto; por eso el peor caso se midió manualmente (§12.2).
- Foco visible: contorno sólido de 2 px en cobre, 5.53–5.82:1 en claro y 8.33–9.15:1 en oscuro.
- Contorno de controles ≥3:1 en reposo y en hover (§12.2), lo que resuelve la regla de ADR-002 sobre `#343438`.
- Un H1 por página en las 120 combinaciones.
- La capa decorativa no recibe foco (60 pulsaciones de Tab), no intercepta el puntero y se oculta en `forced-colors`.
- Movimiento reducido: sin animaciones CSS activas; la capa no anima.

## 14. Matriz responsive y temas

Script con Playwright y Chrome 155 sobre `corepack pnpm run preview`: 6 páginas (`/`, `/proyectos/sgaa/`, `/proyectos/controllote/`, `/proyectos/auditapy/`, `/proyectos/boozhome/`, `/ruta-inexistente/` → 404) × 5 anchos (320, 375, 768, 1024, 1440) × 4 escenarios (Sistema con SO claro, Sistema con SO oscuro, Claro manual con SO oscuro, Oscuro manual con SO claro) = **120 combinaciones, 0 incidencias**.

Comprobaciones en cada combinación: ausencia de overflow horizontal, un H1, color de fondo efectivo del tema esperado, `data-appearance` correcto, capa `bg-dots` presente (`aria-hidden`, `pointer-events: none`, `fixed`, `z-index: -10`, gradiente y máscara radiales, no focalizable, sin desbordar el ancho), capa sin interceptar el puntero, header en `top: 0`, variante de ilustración acorde al tema, imágenes sin roturas, consola sin errores y red sin respuestas ≥400.

En la ruta 404 se excluye únicamente el aviso de consola que Chrome emite porque el propio documento responde HTTP 404, que es el comportamiento esperado.

**Visibilidad real de los puntos** (análisis de píxeles de capturas en franjas vacías bajo el header y en el margen lateral): hay píxeles de punto periódicos en Home, SGAA y 404, a 375 y 1440 px y en ambos temas, con una desviación máxima de 18–39 niveles sobre el fondo. En el caso de estudio los puntos atraviesan la cabecera translúcida `bg-surface/40`.

**Revisión visual de capturas** (inspeccionadas una a una): Home a 1440 en claro y oscuro (Hero, Sobre mí, Especialidades, Proyectos, Contacto), Home a 375 en oscuro, SGAA a 1440 en oscuro, 404 a 375 en claro, ControlLote a 1024 en claro con el panel de tema abierto, Proyectos a 768 en claro con foco por teclado y menú móvil a 375 en oscuro. La textura se percibe sin competir con títulos, párrafos, botones ni tarjetas, y es más tenue en claro. Las capturas se guardaron fuera del repositorio y no se versionan.

## 15. Pruebas de componentes interactivos

26 de 26 comprobaciones correctas:

- **ThemeSwitcher (tres estados conservados):** Sistema por defecto; Enter abre el panel (`aria-expanded=true`) con foco en la opción activa; las flechas aplican Claro y luego Oscuro; persistencia en `localStorage`; el foco vuelve al disparador; Escape cierra; la preferencia persiste tras recargar; clic en Claro; Sistema sigue en vivo el cambio de `prefers-color-scheme`.
- **Sin destello:** con «oscuro» guardado y SO claro, el fondo en `DOMContentLoaded` ya es `#0D0E11` (clase `dark`); con «claro» guardado y SO oscuro ya es `#FAF9F7`.
- **MobileNavigation (375 px):** abre como `dialog` modal, opaco sobre la textura; los enlaces quedan por encima de cualquier capa; el foco queda atrapado; Escape cierra y devuelve el foco; un enlace de ancla cierra el menú y enfoca la sección; sin overflow.
- **Teclado:** el primer Tab va a «Saltar al contenido»; orden de tabulación sin cambios; la capa nunca recibe foco.
- **Tarjetas:** el hover mantiene la elevación (`translateY(-3px)`) y el borde cobre mezclado; `focus-within` también.
- **Paridad:** el selector de tema se comportó de forma idéntica en el build inicial y en el de T09 (misma secuencia de estados y foco).

## 16. Tamaño de recursos

| Recurso | Antes (`8854baf`) | Después | Diferencia |
|---|---|---|---|
| CSS (`_astro/ButtonLink.*.css`) | 37 512 B · gzip 8 114 B | 37 756 B · gzip 8 208 B | +244 B · +94 B gzip |
| JS externo (`client.BmNEQPXu.js`, chunk React heredado de T07, no referenciado) | 220 761 B | 220 761 B (mismo hash) | 0 |
| JS inline por página | 3 141 B | 3 141 B | 0 |
| SVG de proyecto (8 archivos) | 603–1 386 B | idénticos en bytes | 0 |

Sin nuevas fuentes, imágenes, scripts, canvas ni WebGL. Las únicas URL absolutas del build son enlaces y metadatos ya existentes; no hay peticiones externas de recursos.

## 17. Validaciones Astro

| Comando | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Exit 0; lockfile al día, sin cambios |
| `corepack pnpm exec astro sync` | Exit 0 |
| `corepack pnpm exec astro check` | Exit 0; 25 archivos, **0 errores, 0 warnings, 0 hints** |
| `corepack pnpm run build` | Exit 0; 6 páginas; sitemap generado |
| `git diff --check` | Exit 0 |
| `corepack pnpm run preview` | Preview estático local de T07 usado en todas las pruebas de navegador |
| `git diff --stat -- src/data src/content .github public/favicon.* public/images/social astro.config.mjs package.json pnpm-lock.yaml scripts` | Vacío: sin cambios |

No ejecutado: `pnpm lint` (el proyecto no define el script), Lighthouse y auditoría de dependencias. Las herramientas de prueba (`playwright-core` 1.64.1 y `axe-core` 4.14.0) se instalaron en un directorio temporal fuera del repositorio; no se añadieron dependencias al proyecto.

## 18. Archivos modificados

| Archivo | Cambio | Justificación |
|---|---|---|
| `src/styles/global.css` | Paleta Cobre Mineral + Zinc, `--input` propio, `--chart-*` neutros, tokens `--dots-*`, utilidad `bg-dots` | Núcleo de T09 |
| `src/layouts/BaseLayout.astro` | `isolate` en `body` y capa decorativa `bg-dots` | Integración prevista |
| `src/pages/index.astro` | Continuidad de secciones (§11) y cobre retirado de numeradores, fechas y etiquetas | Prevista; restricción del cobre según backlog T09 |
| `src/components/ui/ButtonLink.astro` | Secundario: `border-border` → `border-input`; hover `border-primary/60` → `border-primary` | Contorno ≥3:1 (§3 del prompt); el hover con alfa bajaba a 2.55:1 en claro |
| `src/components/layout/ThemeSwitcher.astro` | Disparador: mismo cambio de contorno y hover | Igual; sin cambios de estructura, script ni estados |
| `src/components/layout/MobileNavigation.astro` | Disparador y botón cerrar: mismo cambio de contorno y hover | Igual; sin cambios de script |
| `src/components/ui/SectionHeading.astro` | Numerador sin `text-primary` (hereda el muted del eyebrow) | Cobre fuera de numeradores (§3 guía) |
| `src/components/ui/StatusBadge.astro` | Marcador «En desarrollo»: `bg-primary` → `bg-muted-foreground` | Badges decorativos en neutro; el estado sigue indicado por texto y el marcador sigue distinguiéndose del hueco de «Prelanzamiento» |
| `src/components/layout/SiteFooter.astro` | Etiqueta de rol: `text-primary` → `text-muted-foreground` | Etiqueta decorativa |
| `src/layouts/CaseStudyLayout.astro` | Etiqueta de categoría: `text-primary` → `text-muted-foreground` | Etiqueta decorativa |
| `public/images/projects/{sgaa,controllote,auditapy,boozhome}{,-light}.svg` (8) | Sustitución 1:1 de hex azules por zinc, sin cambios de geometría | Criterio T09 «ilustraciones legibles en ambos temas» y sin azul residual; el verde de estado se conserva |
| `docs/implementations/T09-IMPLEMENTACION.md` | Este informe | Política de informes |

Mapa de color de las ilustraciones: oscuro `#0B1019→#0D0E11`, `#111A28→#141518`, `#182337→#232327`, `#344257→#343438`, `#91B8FF→#A6A5AC`; claro `#F8FAFC→#FAF9F7`, `#F0F4FA→#F1F0ED`, `#CAD4E2→#D6D5D1`, `#2557A7→#5F5F66`. `#70DDC0`, `#17674F` y `#FFFFFF` se conservan.

Creados: este informe. Eliminados: ninguno. Dependencias: ninguna añadida ni modificada.

## 19. Cambios editoriales

**Ninguno.** No se modificaron `src/data/profile.ts`, `src/data/navigation.ts`, `src/content/`, los MDX, cifras, estados, descripciones, metadatos SEO, imagen Open Graph, favicon ni workflows de CI/CD. Tampoco se implementó el texto del Hero de ADR-002 (corresponde a T11).

## 20. Problemas detectados y corregidos

1. **Hover de controles con alfa en claro.** `hover:border-primary/60` daba 2.55:1 (y 2.61:1 dentro de tarjetas), por debajo del contorno en reposo. Se cambió a `hover:border-primary`: ahora 5.53–5.82:1 en claro y 8.33–9.15:1 en oscuro.
2. **Punto demasiado marcado en claro.** Con alfa 0.16, el texto secundario sobre un punto bajaba a 4.40:1. Con alfa 0.12 queda en 4.75:1 y la textura resulta más tenue, como pide la guía.
3. **Ilustraciones azules.** Recoloreadas por sustitución de hex (§18).
4. **Falso positivo de la matriz por la caché del preview.** `scripts/preview.mjs` lee `404.html` una sola vez al arrancar (`readFileSync`); tras recompilar, la 404 servida apuntaba al CSS con el hash anterior. Se resolvió reiniciando el preview después de cada build. No afecta a producción y no se modificó el script (fuera de alcance).
5. **Artefacto de captura con `scroll-smooth`.** Algunas capturas tomadas durante el desplazamiento suave mostraban el header desplazado. Se comprobó que el header está siempre en `top: 0` (también en el build inicial) y se repitieron las capturas con desplazamiento instantáneo.
6. **Errores de mis scripts de prueba**, corregidos sin cambiar el sitio: la secuencia de flechas del selector de tema (cada flecha aplica y cierra el panel, comportamiento de T06) y una llamada a `getAnimations`.
7. **Error de edición propio.** Una edición de `BaseLayout.astro` dejó `<` en lugar de `<a`; se corrigió de inmediato, antes de cualquier build.

## 21. Limitaciones y riesgos

- **`--input` sobre `--surface-raised` en oscuro: 2.34:1.** Hoy no hay controles en esa superficie; si T10–T12 colocan un control con contorno sobre ella, habrá que usar otro indicador.
- **CTA primario en hover en claro: 4.78:1**, por encima de 4.5 pero con poco margen; evitar aclarar más el hover.
- **El Hero conserva su composición anterior**: la etiqueta cobre, la tarjeta «sistema / portafolio» con `bg-primary/10` y el resplandor `bg-primary/5 blur-3xl`, que en oscuro se percibe como un halo alrededor de la tarjeta. Todos sus pares miden ≥4.5:1, pero el uso decorativo del cobre en el Hero se resuelve en T11.
- **El cobre sigue en el monograma JC del header y del menú móvil**: se resuelve con el rediseño del header en T10.
- **La línea inferior del header** se mantiene (T10).
- **Imagen Open Graph**: sigue siendo azul y su `alt` dice «fondo azul». Es correcto respecto a la imagen actual, pero ya no coincide con la identidad; cambiarla está fuera de T09 (protección editorial y SEO).
- **Máscara relativa al viewport**: al ser una capa `fixed`, la textura se desvanece hacia la parte inferior de la ventana y no del documento; las capturas de página completa no la representan fielmente.
- **`surface-raised` oscuro (`#343438`)** es un escalón marcado sobre `#0D0E11`; es el valor aprobado y se usa en tres bloques del Home.
- **Cobertura de navegadores**: solo Chrome 155 (Linux). No se probaron Safari (`-webkit-mask-image` incluido, pero no verificado en Safari real), Firefox ni lectores de pantalla.
- Lighthouse no se ejecutó.

## 22. Estado final de Git

- Rama: `feat/t09-visual-tokens-dot-background`; `HEAD` = `main` = `origin/main` = `8854baf`.
- 18 archivos modificados sin preparar (`git diff --stat`: 108 inserciones, 72 eliminaciones) y este informe sin seguimiento (`??`).
- **Sin `git add`, commit, push, PR, merge ni despliegue.** El informe queda guardado localmente sin seguimiento, a la espera de la autorización del propietario para versionarse con los cambios de T09.

## 23. Pendientes para T10

- Header de 56 px sin `border-b` y monograma JC circular, que retirará el cobre del monograma.
- Toggle binario de 32 px con área táctil de 40 px: su contorno «casi invisible» necesita un indicador adicional ≥3:1 (`--input`, el foco cobre o el estado activo), porque `--border` no llega a 3:1.
- Decidir en T10 si el header será sólido o translúcido con desenfoque, y comprobar que la textura no se transparente de forma que reduzca el contraste de la navegación.
- Revisar que, al limitar la navegación a 4 accesos, se conserven las anclas de las secciones ya sin bandas.
- Opcional, fuera de T10 si no se aprueba: que el preview recargue `404.html` en cada petición o al recompilar.

## Cumplimiento de los criterios de aceptación de T09

| Criterio (`04-PLAN-DE-TAREAS.md`) | Estado |
|---|---|
| Contraste WCAG 2.2 AA medido y documentado para texto, controles y foco en ambos temas | Cumplido (§12; única excepción documentada: `input`/`surface-raised` oscuro, sin uso) |
| Contornos de controles ≥3:1 o indicador alternativo | Cumplido (`--input`, hover cobre, foco 2 px) |
| Patrón decorativo con `aria-hidden`, sin JS ni recursos de red | Cumplido |
| Ilustraciones de proyecto legibles en ambos temas | Cumplido (recoloreadas y verificadas en capturas) |
| Ningún valor de acento copiado de FSH | Cumplido (cobre `#E6A47B` / `#98532A` de ADR-002; no se usa `#e8a54b`) |
| `astro check` y `build` correctos | Cumplido |
| Cobre restringido a CTA, enlaces, foco y estados activos | Cumplido fuera del Hero y del header; Hero → T11 y monograma → T10 |
| Bandas `border-y` reducidas | Cumplido en el Home |

## 24. Ajuste final: favicon Cobre Mineral + Zinc (2026-10-21)

Último ajuste del propietario antes del commit conjunto de T09–T12. El contexto común está en `T10-IMPLEMENTACION.md §18`. Se registra aquí porque completa la sustitución de la identidad azul (§5).

### 24.1 Diagnóstico

`public/favicon.svg` (versionado desde T07) era un cuadrado redondeado azul `#2557A7` con «JC» blanco en `<text>` (dependía de las fuentes del sistema). `public/favicon.ico` tenía 4 imágenes en la misma identidad azul. Era el último recurso de marca en azul junto con la imagen Open Graph, que queda para T13.

### 24.2 Diseño

- Disco zinc `#0D0E11` (fondo oscuro aprobado), sin fondo blanco y transparente fuera del círculo. El círculo enlaza con el monograma circular del header y con el retrato del Hero.
- «JC» en cobre `#E6A47B`, dibujado con dos trazos geométricos de 6,5 unidades sobre una retícula de 64 (`stroke-linecap: round`): la «J» es un fuste con un gancho semicircular y la «C», un arco abierto de 260°. Al ser trazos y no texto, se ve igual en cualquier sistema y el ICO coincide con el SVG. Las letras ocupan el 77 % del ancho y el 44 % del alto del icono.
- Sin azul, sin órbitas, sin círculos concéntricos y sin degradados. 334 bytes.
- `role="img"` y `aria-label="JC"`, como el SVG anterior.

### 24.3 Generación del ICO

Con herramientas locales y sin dependencias del proyecto: Chrome del sistema (mediante `playwright-core`, temporal y fuera del repositorio) rasterizó el SVG directamente a 16, 32 y 48 px con fondo transparente. ImageMagick (`convert`, ya instalado) los empaquetó en `public/favicon.ico`.

| Comprobación | Resultado |
|---|---|
| `file public/favicon.ico` | `MS Windows icon resource - 3 icons, 16x16, 32 bits/pixel, 32x32, 32 bits/pixel` (y 48×48, según `identify`) |
| Pillow, lectura del ICO | Tamaños `16, 32, 48`; modo RGBA; diferencia máxima con los PNG fuente: **0**; esquina (0,0) transparente; 0 píxeles azulados |
| SVG | XML válido (`xml.dom.minidom`); 0 apariciones de `2557a7` |
| `dist/` | `favicon.svg` y `favicon.ico` idénticos a `public/` (`cmp`); servidos con 200, `image/svg+xml` (334 B) e `image/x-icon` (15 086 B) |
| `BaseLayout.astro` | Referencias sin cambios: `/favicon.ico` con `sizes="32x32"` y `/favicon.svg` con `type="image/svg+xml"` (el navegador prefiere el SVG y el ICO queda como respaldo) |

### 24.4 Verificación visual

Lámina renderizada en Chrome: el icono a 16, 32 y 48 px a tamaño real, a 16 y 32 px ampliados ×8 sin suavizado y a 128 px en vectorial, sobre una barra de pestañas clara (`#DEE1E6`, pestaña `#FFFFFF`) y otra oscura (`#202124`, pestaña `#35363A`). «JC» se lee a 16 px (trazo de ≈1,6 px) y a 32 px en ambos fondos.

| Par | Contraste |
|---|---|
| Cobre sobre el disco zinc | 9,15:1 |
| Disco sobre pestaña clara / blanca | 14,72:1 / 19,3:1 |
| Disco sobre pestaña oscura `#202124` / `#35363A` | 1,2:1 / 1,6:1: el disco se funde, pero el cobre sigue legible frente a la pestaña (7,64:1) |

**No observado:** la pestaña real de un navegador con interfaz. Chrome sin interfaz no la muestra, así que la lámina simula los colores de las pestañas. Esa comprobación queda para la revisión del propietario, con una ventana privada o la caché vaciada, porque los navegadores guardan el favicon en caché.

### 24.5 Fuera de alcance

La imagen Open Graph (`public/images/social/`) sigue en azul y con su `alt` actual. Su revisión cromática queda para T13. Las rutas, el canonical, Open Graph, Twitter Card, el sitemap y el SEO no cambiaron.

## 25. Favicon definitivo: fondo transparente (2026-10-21)

Corrección del propietario tras su última revisión visual, antes del commit integrado de T09–T12. Sustituye al diseño de §24.2. El contexto de la corrección conjunta (monograma del Hero e inventario del commit) está en `T11-IMPLEMENTACION.md §18`. Rama `feat/t09-visual-tokens-dot-background`, partida desde `8854baf` con T09–T12 sin preparar.

### 25.1 Diagnóstico

El favicon de §24 dibujaba «JC» sobre un disco propio `#0D0E11`. El propietario no aprueba ese fondo: el monograma debe integrarse con el fondo de la pestaña, sin disco negro ni ninguna superficie decorativa.

### 25.2 Diseño

- **Sin fondo:** se elimina el `<circle>`. Todo lo que no es trazo es transparente. Sin azul, sin blanco, sin anillos ni efectos.
- **Mismo monograma, mayor:** los dos trazos de §24.2 (fuste con gancho semicircular y arco abierto de 260°) se escalan ×1,25 respecto al centro de la retícula de 64, ya sin el límite del disco. Trazo de 8 unidades (2px a 16 px, antes ≈1,6px). Las letras ocupan el 96 % del ancho y el 55 % del alto del icono (antes 77 % y 44 %).
- **SVG adaptativo** (`prefers-color-scheme` en un `<style>` interno): cobre profundo `#98532A` en tema claro y cobre mineral `#E6A47B` en tema oscuro, los valores de `--brand`. El atributo `stroke="#b36f46"` es el respaldo si no se aplica el CSS (el CSS tiene prioridad sobre los atributos de presentación). 415 bytes. Conserva `role="img"` y `aria-label="JC"`.
- **ICO estático:** un ICO no admite comportamiento por tema, así que usa un solo color, `#B36F46`: un cobre intermedio de la rampa entre `#98532A` y `#E6A47B`, elegido para equilibrar el contraste en pestañas claras y oscuras. Es el mismo color del respaldo del SVG.

| Color | `#FFFFFF` | `#F1F3F4` | `#DEE1E6` | `#202124` | `#35363A` | `#1C1B22` |
|---|---|---|---|---|---|---|
| `#98532A` (SVG, claro) | 5,82 | 5,23 | 4,44 | 2,76 | 2,07 | 2,93 |
| `#E6A47B` (SVG, oscuro) | 2,11 | 1,89 | 1,61 | 7,64 | 5,72 | 8,10 |
| `#B36F46` (ICO y respaldo) | 3,98 | 3,57 | 3,03 | 4,05 | 3,03 | 4,29 |

Fondos de referencia: pestañas y barras de Chrome claro y oscuro y de Firefox oscuro (`#1C1B22`). Cada variante del SVG supera 4,4:1 en los fondos de su tema; el ICO supera 3:1 (umbral para gráficos) en los seis.

### 25.3 Generación del ICO

Igual que en §24.3: Chrome del sistema mediante `playwright-core` (temporal, fuera del repositorio) rasterizó a 16, 32 y 48 px, con fondo transparente, la variante estática del SVG (el mismo archivo sin el `<style>`). ImageMagick (`convert`) los empaquetó en `public/favicon.ico`.

| Comprobación | Resultado |
|---|---|
| `file public/favicon.ico` | `MS Windows icon resource - 3 icons, 16x16, 32 bits/pixel, 32x32, 32 bits/pixel`; `identify` también lista 48×48 |
| Pillow, lectura del ICO | Tamaños `16, 32, 48`; modo RGBA; diferencia máxima con los PNG fuente: 0; las cuatro esquinas con alfa 0; píxeles totalmente transparentes: 150/256, 709/1024 y 1661/2304; 0 píxeles azulados; 0 píxeles oscuros; color opaco `(179, 111, 70)` = `#B36F46` |
| SVG | XML válido (`xml.dom.minidom`); 0 apariciones de `0d0e11`, `2557a7`, `<circle>` o `<rect>` |
| `dist/` | `favicon.svg` y `favicon.ico` idénticos a `public/` (`cmp`); servidos con 200, `image/svg+xml` e `image/x-icon` (15 086 B) |
| `BaseLayout.astro` | Rutas y atributos sin cambios (`/favicon.ico` `sizes="32x32"`, `/favicon.svg` `type="image/svg+xml"`) |

### 25.4 Verificación visual

Lámina renderizada en Chrome con `prefers-color-scheme` claro y oscuro emulados: el SVG a 16, 32 y 48 px y el ICO a 16, 32 y 48 px, más el PNG de 16 px ampliado ×8 sin suavizado, sobre `#FFFFFF`, `#F1F3F4` y `#DEE1E6` (claro) y `#202124`, `#35363A` y `#1C1B22` (oscuro). El SVG cambia de color según el tema emulado. «JC» se lee a 16 y 32 px en los seis fondos, sin disco ni superficie alrededor. En el 16 px ampliado, la «J» y la «C» quedan separadas por al menos un píxel.

**No observado:** la pestaña real de un navegador con interfaz. Chrome sin interfaz no la muestra. Esa comprobación queda para el propietario, con una ventana privada o la caché vaciada, porque los navegadores guardan el favicon en caché. Tampoco se comprobó qué hace cada navegador cuando su tema no coincide con el del sistema: en ese caso el SVG podría usar el tono del otro tema (contraste mínimo 1,61:1).

### 25.5 Criterios

| Requisito | Estado |
|---|---|
| Fondo transparente, sin disco negro, azul ni blanco | Cumplido (canal alfa medido) |
| «JC» con protagonismo, en Cobre Mineral + Zinc | Cumplido (96 % del ancho; tonos de `--brand`) |
| SVG adaptativo con respaldo legible | Cumplido (`#98532A` / `#E6A47B`; respaldo `#B36F46`) |
| ICO estático con alfa y 16/32/48 px | Cumplido |
| Rutas de favicon sin cambios | Cumplido |
| Prueba en pestaña real | **No realizada**: pendiente del propietario |

No se ejecutaron `git add`, commit, push, PR, merge, despliegue ni cambio de rama. Pendiente de la revisión visual del propietario.

## 26. Cierre (2026-10-21)

- El propietario aprobó definitivamente T09, incluido el favicon de §25 (transparente, SVG adaptativo `#98532A` / `#E6A47B` con respaldo `#B36F46`, ICO estático transparente de 16/32/48 px). No consta que esa aprobación incluyera una prueba en pestaña real; esa comprobación sigue anotada como no realizada por el agente.
- Los favicons no cambiaron después de §25 y están en el inventario del commit.
- Validaciones finales, commit integrado y push: `T10-IMPLEMENTACION.md §19`.
- Pendiente para T13: imagen Open Graph en la identidad nueva y QA de contraste en navegadores y dispositivos reales.
