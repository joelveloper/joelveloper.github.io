# Informe de implementación — T11

- **Tarea:** T11 — Rediseño: hero con retrato y anillo orbital
- **Fecha:** 2026-10-20
- **Rama:** `feat/t09-visual-tokens-dot-background` (rama local de T09; no se creó rama nueva)
- **Commit de partida:** `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1`, con T09 sin preparar en el árbol
- **Estado:** aprobada definitivamente por el propietario tras su revisión visual (2026-10-21) y versionada en el commit integrado de T09–T12 `feat(portfolio): complete personal identity redesign`, con commit y push de la rama autorizados; **sin PR, merge ni despliegue**. Cierre en §20.

---

## 1. Ejecución anticipada conjunta

T11 se implementó en la misma ejecución que T10 y T12, sobre T09 sin integrar, por autorización expresa del propietario (detalle en `T10-IMPLEMENTACION.md §1`). El estado inicial, la verificación de que T09 se conserva y la lista de documentos leídos están en `T10-IMPLEMENTACION.md §2`.

## 2. Diagnóstico inicial

El Hero heredado (`src/pages/index.astro`) mostraba:

- H1 `profile.headline`: «Software para problemas reales. Diseñado para evolucionar.»
- Bajada `profile.description`: «Desarrollo soluciones empresariales de extremo a extremo…»
- Etiqueta cobre «Full Stack .NET Developer · Paraguay», CTA «Explorar proyectos», «Contactar» y «GitHub», y la línea «Asunción, Paraguay · Trabajo de extremo a extremo».
- Columna derecha decorativa (`aria-hidden`): tarjeta «sistema / portafolio» con subdivisión «Interfaz / Aplicación / Arquitectura / Datos e infraestructura», el lema «Del problema al despliegue» y un resplandor `bg-primary/5 blur-3xl`.

No existía `src/assets/` ni fotografía del propietario.

## 3. Objetivo y alcance

Según `04-PLAN-DE-TAREAS.md` T11, `01-PRD.md §2.5` y `02-DISENO-VISUAL.md §2 y §6`: Hero de dos columnas (retrato a la izquierda, presentación a la derecha; apilado en móvil con el retrato arriba), componente de retrato preparado para `astro:assets`, anillo orbital cobre en CSS puro, texto aprobado literal, CTA y redes reales, placeholder original y retirada de la tarjeta «sistema / portafolio».

## 4. Texto implementado (literal, sin cambios)

| Elemento | Texto | Fuente de verdad |
|---|---|---|
| Identificador | Full Stack .NET Developer | `profile.role` |
| H1 | Hola, soy Joel Cantero. | `profile.greeting` |
| Descripción | Construyo aplicaciones web y sistemas de gestión con C# y .NET. Me apasiona resolver problemas reales mediante código bien estructurado, desde la arquitectura hasta el despliegue. | `profile.intro` |
| CTA principal | Hablemos → `#contacto` | `index.astro` |
| CTA secundario | Ver mis proyectos → `#proyectos` | `index.astro` |
| Redes | GitHub, YouTube, Instagram (URL existentes) | `socialLinks` |

La matriz de pruebas compara el texto renderizado del identificador, el H1, la descripción y los dos CTA (texto y destino) con estos valores en las 24 combinaciones del Home: coinciden en todas.

## 5. Decisiones de implementación

1. **Componente `ProfilePortrait.astro`** (`src/components/ui/`):
   - Con `photo` (tipo `ProfilePortrait`: `ImageMetadata` + `alt`), usa `<Picture>` de `astro:assets` con `formats={['avif','webp']}`, anchos 176/288/352/576, `sizes`, `width`/`height` explícitos de 576, `loading="eager"` y `fetchpriority="high"`.
   - Sin `photo`, dibuja el **placeholder**: monograma «JC» sobre círculos concéntricos neutros, hecho con HTML y CSS (sin petición de red, nítido en cualquier densidad y adaptado al tema). Lleva `role="img"` y el texto alternativo honesto «Monograma JC de Joel Cantero. Imagen provisional, la fotografía aún no está disponible.». No simula un rostro ni una fotografía.
   - La fotografía se activa desde un único punto, `export const portrait` en `src/data/profile.ts` (hoy `undefined`), con un comentario que indica cómo importarla desde `src/assets/`.
   - **Desviación justificada respecto a la guía:** `02-DISENO-VISUAL.md §6` sugiere un placeholder raster optimizado con `astro:assets`. Un placeholder vectorial en HTML/CSS cumple el mismo objetivo sin generar ni versionar una imagen, y el procesado AVIF/WebP queda preparado para cuando exista la foto real.
2. **Anillo orbital** (`.portrait-ring` en `global.css`), implementación propia:
   - `::before` con `conic-gradient` de dos arcos cobre (90 % y 35 % de `--brand`) que gira con `transform: rotate()` (`@keyframes portrait-orbit`, 12 s, lineal e infinita), con `will-change: transform`. Sin JavaScript ni bibliotecas.
   - El contenedor (`overflow: hidden`, `padding: 3px`) recorta el gradiente a un anillo de 3 px; `::after` dibuja el anillo base neutro (`--border`), así el contorno nunca desaparece.
   - Separación de 5 px del color de fondo entre el anillo y la imagen; sombra discreta adaptada al tema (`light-dark()`), con un matiz cobre del 30 %. Sin resplandores.
   - `prefers-reduced-motion: reduce` → `animation: none` y arco fijo a −40°. `forced-colors` → borde `CanvasText` en la imagen.
   - Tamaño: `clamp(10.5rem, 46vw, 13rem)` en móvil y tablet; 18 rem (288 px) desde 1024 px.
   - Se descartó el arco verde (`--positive`) de la referencia de INV-001 §4.3: el anillo es solo cobre, como pide ADR-002.
3. **Composición:** `grid` con `lg:grid-cols-[auto_minmax(0,1fr)]`; en móvil y tablet el retrato va arriba y centrado, y el texto, centrado; desde 1024 px, alineado a la izquierda.
4. **Tipografía del H1:** `clamp(2.5rem, 5.5vw, 4.5rem)`, interlineado 1.05 y `text-balance`. A 1440 px se reparte en «Hola, soy / Joel Cantero.»; a 1024 y 768, en una línea; a 320 y 375, en dos, sin cortes. La descripción usa `text-lead`, `max-w-[58ch]` y `text-pretty`. Ningún ajuste de longitud tocó el texto.
5. **Jerarquía cromática:** el identificador pasa de cobre a `text-muted-foreground` (secundario, según §2 de la guía). El cobre queda en el CTA principal, el foco y el anillo.
6. **Redes en el Hero:** enlaces de texto discretos («GitHub ↗», …) con `target="_blank"` y `rel="noopener noreferrer"`, en una lista con `aria-label="Redes sociales"` (no un landmark `nav`, para no duplicar el de Contacto). No se usan logotipos de terceros.
7. **Espaciado vertical:** `pt-14 sm:pt-20 lg:pt-24` y `pb-6 sm:pb-10 lg:pb-12`, ajustado tras la revisión visual para que «Sobre mí» no quedara demasiado lejos.
8. **Retirado:** tarjeta «sistema / portafolio», subdivisión «Interfaz / Aplicación / Arquitectura / Datos e infraestructura», «Del problema al despliegue», resplandor cobre, CTA «Explorar proyectos» / «Contactar» / «GitHub» y la línea «Trabajo de extremo a extremo».

## 6. Archivos

| Archivo | Cambio |
|---|---|
| `src/components/ui/ProfilePortrait.astro` | **Nuevo:** retrato con `astro:assets` o placeholder |
| `src/data/profile.ts` | `greeting`, `intro`, tipo `ProfilePortrait` y `portrait` (fuente de verdad del Hero); se elimina `headline` y `description` |
| `src/pages/index.astro` | Nuevo Hero (sección `#inicio`) |
| `src/styles/global.css` | `.portrait-ring`, `.portrait-placeholder`, `@keyframes portrait-orbit`, reglas de movimiento reducido y `forced-colors` |

Creados: `ProfilePortrait.astro` y este informe. Eliminados: ninguno. Dependencias: ninguna (`astro:assets` forma parte de Astro).

## 7. Comandos

Los mismos del build final conjunto (`T10-IMPLEMENTACION.md §6`): `install --frozen-lockfile`, `astro sync`, `astro check` (0/0/0 en 26 archivos), `build` (6 páginas) y `git diff --check`, todos con exit 0.

## 8. Pruebas

- **Matriz** de 120 combinaciones (`T10-IMPLEMENTACION.md §7.1`): 0 incidencias. En el Home, además: texto literal del Hero, CTA y destinos, 6 anclas presentes y `<title>`.
- **Anillo:** `animation-name: portrait-orbit`, `12s`, `infinite`; fondo `conic-gradient(…)`; el `transform` del pseudo-elemento cambia entre dos lecturas separadas 600 ms. Es la **única animación** de la página (`document.getAnimations().length === 1`).
- **Movimiento reducido:** `animation-name: none` y 0 animaciones.
- **Placeholder:** `role="img"`, etiqueta con «provisional» y 288×288 px a 1440. Dimensiones fijas por CSS (`inline-size` + `aspect-ratio`), sin desplazamiento de layout por carga de imagen (no hay imagen).
- **Un único H1** en todas las páginas.
- **Sin overflow** a 320 px.
- **Revisión visual** (capturas a 1440 claro/oscuro, 1024 claro, 768 oscuro, 375 oscuro, 320 claro): retrato centrado en móvil, encima del texto; dos columnas desde 1024; el anillo se percibe como un arco cobre fino, sin brillos; el texto no se corta en ningún ancho.

## 9. Accesibilidad y contraste

- axe-core: 0 violaciones (24 ejecuciones). Incompleto `color-contrast` en el monograma porque axe no resuelve fondos con pseudo-elementos. Medición manual: `muted-foreground` sobre `surface` 6.33:1 (claro) y 7.19:1 (oscuro); sobre la zona más densa del gradiente (surface + 7 % + 5 % de `foreground`), 5.06:1 y 5.24:1. Es texto grande (umbral 3:1) y, además, decorativo dentro de un `role="img"`.
- Identificador y descripción (`muted-foreground` sobre fondo): 6.02 / 7.90:1. H1 (`foreground`): 14.55 / 16.81:1. CTA «Hablemos» (texto sobre cobre): 5.82 / 9.15:1; en hover 4.78 / 7.59:1 (medidos en T09, mismas clases). Enlaces de redes: 6.02 / 7.90:1. Peor caso de texto secundario sobre un punto del fondo: 4.75 / 5.78:1 (T09).
- Anillo (decorativo): cobre al 90 % frente al fondo, 4.67:1 (claro) y 7.91:1 (oscuro).
- Teclado: tras el header, el orden es Hablemos → Ver mis proyectos → GitHub → YouTube → Instagram; foco cobre visible.

## 10. Riesgos, limitaciones y pendientes

- **Fotografía definitiva pendiente.** El Hero muestra el placeholder. Publicar con el placeholder requiere decisión expresa en T13 (`02-DISENO-VISUAL.md §6`).
- **La ruta con fotografía no se ha ejecutado:** `<Picture>` compila y pasa `astro check`, pero sin imagen real no se ha comprobado el resultado AVIF/WebP, el peso ni el LCP. Cuando llegue la foto hay que comprobar el EXIF, el recorte 1:1 y el `alt` definitivo, y medir el LCP (T13).
- La animación usa un pseudo-elemento al 200 % del retrato con `will-change`; coste bajo, pero no medido con Lighthouse ni perfiles de rendimiento.
- Solo Chrome; no se verificó Safari ni Firefox.

## 11. Cumplimiento de criterios de aceptación (T11)

| Criterio | Estado |
|---|---|
| Texto del Hero idéntico al aprobado | Cumplido (verificado automáticamente) |
| Dos columnas en desktop, apilado en móvil con retrato arriba | Cumplido |
| Retrato con `astro:assets` (AVIF/WebP, anchos, dimensiones, prioridad) | Preparado; sin foto real todavía (§10) |
| Anillo cobre CSS con `transform`, ≈12 s | Cumplido |
| Detenido con `prefers-reduced-motion` | Cumplido |
| Sin desplazamiento de layout | Cumplido (tamaño fijo por CSS) |
| `alt` honesto del placeholder | Cumplido |
| Un único H1 | Cumplido |
| Contraste del texto sobre el fondo de puntos | Cumplido (§9) |
| Legible a 320 px | Cumplido |
| Tarjeta «sistema / portafolio» retirada | Cumplido |

## 12. Estado de Git

Igual que en `T10-IMPLEMENTACION.md §13`: sin preparar, sin commit ni push; `ProfilePortrait.astro` y este informe sin seguimiento (`??`).

## 13. Recomendaciones siguientes

Aportar la fotografía (JPEG o PNG de al menos 576×576 px, sin EXIF, con autorización) para activarla en `profile.ts`, y validarla en T13 junto con el LCP.

## 14. Revisión final previa al commit (2026-10-20)

Contexto y validaciones comunes: `T10-IMPLEMENTACION.md §15`. Sin cambios de código.

### 14.1 Semántica del retrato provisional (`ProfilePortrait.astro`)

| Comprobación | Resultado |
|---|---|
| Semántica | `<div role="img" aria-label="Monograma JC de Joel Cantero. Imagen provisional, la fotografía aún no está disponible.">` |
| Árbol de accesibilidad (snapshot ARIA de `#inicio`) | Un único nodo `img` con ese nombre; el texto «JC» (`aria-hidden`) no se expone aparte; el contenedor `.portrait-ring` y sus `::before`/`::after` (sin `content` textual) no aparecen |
| Atributo `alt` en elementos no `img` | Ninguno |
| Imagen real frente a provisional | Con `portrait` definido se usa `<Picture>` con el `alt` del dato; sin él, el nombre accesible declara que es provisional. No simula una fotografía |
| Movimiento reducido | `animation-name: none`, 0 animaciones; sin la preferencia, `portrait-orbit` y 1 animación |
| Dimensiones | 288×288 px a 1440 (fijadas por `inline-size` + `aspect-ratio`) |
| Desplazamiento de layout | CLS de carga 0,0046 (umbral «bueno» 0,1). Las fuentes del desplazamiento son nodos de texto del Hero y de Sobre mí; **el retrato no figura**. Con la fuente web bloqueada el CLS es 0: lo produce el intercambio de Geist, no T11 |

Conclusión: sin defectos; no se modifica. Queda intacta la preparación para `astro:assets`. Observación no bloqueante: `will-change: transform` permanece con movimiento reducido (coste mínimo, sin efecto en accesibilidad).

### 14.2 Revisión visual definitiva

Capturas reales del preview de producción (127.0.0.1:4322), con `prefers-reduced-motion` para fijar el anillo, inspeccionadas en mosaicos:

- Hero a 320, 375, 768, 1024 y 1440 en claro y oscuro: H1 en dos líneas a 320/375 y 1440, en una a 768/1024, sin cortes; descripción legible; retrato centrado sobre el texto hasta 768 y a la izquierda, centrado verticalmente con el bloque de texto, desde 1024; CTA en una fila salvo a 320, donde se apilan centrados.
- Header escritorio y móvil, toggle (luna/sol según el tema), menú móvil abierto a 375 en ambos temas.
- Home completa a 375, 768, 1024 y 1440 en ambos temas: Sobre mí, Especialidades, Proyectos, Cómo trabajo, Oñondive, Contacto y footer sin solapes ni textos cortados; texto legible sobre el fondo de puntos.
- Los cuatro casos a 320 y 1440 (SGAA y ControlLote también a 768) en ambos temas, y la 404 en los cinco anchos y ambos temas.

Sin incidencias visuales. Observación: las ilustraciones de proyecto conservan el acento verde de estado (`#70DDC0` / `#17674F`), decisión documentada en `T09-IMPLEMENTACION.md §18`; queda a criterio del propietario si encaja con «un único acento cobre» (ADR-002).

## 15. Revisión de diseño del propietario (2026-10-20)

Contexto común, archivos, comandos, matriz de pruebas y estado de Git: `T10-IMPLEMENTACION.md §16`. El texto del Hero **no** se modificó.

### 15.1 Hero de primera pantalla

- Nueva clase `.hero-screen` (`global.css`): `min-height: calc(100vh - var(--site-header-height))` y, a continuación, `calc(100svh - …)`. `svh` no cambia al ocultarse la barra del navegador móvil (sin saltos de layout); `vh` es el respaldo. Es una altura **mínima**: si el contenido no cabe, el Hero crece.
- `#inicio` pasa a `flex flex-col justify-center` para centrar verticalmente el contenido; relleno uniforme `py-12 sm:py-16 lg:py-16` en lugar del asimétrico anterior. Sin *scroll snap* ni bloqueo de desplazamiento.
- Se conservan las dos columnas en escritorio y el retrato arriba en móvil.

**Medición real (Chrome, ambos temas con el mismo resultado), posición del borde superior de `#sobre-mi`:**

| Viewport | Antes | Después | Alto del Hero / contenido | ¿«Sobre mí» fuera de la primera pantalla? |
|---|---|---|---|---|
| 320 × 568 | 854 | 878 | 822 / 822 (crece) | Sí |
| 375 × 667 | 775 | 799 | 743 / 743 (crece) | Sí |
| 390 × 844 | 782 | **844** | 788 / 750 | Sí (antes no) |
| 768 × 1024 | 757 | **1024** | 968 / 741 | Sí (antes no) |
| 1366 × 768 | 650 | **768** | 712 / 578 | Sí (antes no) |
| 1440 × 900 | 654 | **900** | 844 / 582 | Sí (antes no) |
| 1920 × 1080 | 654 | **1080** | 1024 / 582 | Sí (antes no) |

En todas las resoluciones el header mide 56 px y no hay overflow horizontal. A 320 × 568 y 375 × 667 el contenido es más alto que la pantalla: el Hero crece y los CTA y las redes quedan debajo de la primera pantalla, sin recorte (comportamiento pedido). A 1920 × 1080 el contenido queda centrado con ≈220 px libres arriba y abajo.

### 15.2 Retrato simplificado

- Se eliminan el `repeating-radial-gradient` (un círculo cada 16 px) y el brillo radial del placeholder, y la sombra cobre del anillo (queda una sola sombra neutra).
- Círculos visibles: **3** — anillo orbital (pista neutra + gradiente cobre giratorio, un único anillo), disco del retrato y un círculo interior tenue de 1 px (`::before`, `inset: 12%`, `foreground` al 9 %). Se conserva la separación de 5 px en `--background` entre anillo y disco.
- Monograma: `0.24` → `0.34 × --portrait-size` (≈2× visual en área), color `--muted-foreground` → `--foreground`, `text-box: trim-both cap alphabetic` como mejora progresiva del centrado óptico. Medido a 1440 px: retrato de 320 px, `font-size` 108,8 px, desviación del centro 0 px en ambos ejes.
- Tamaños estables por breakpoint: `clamp(11rem, 48vw, 14rem)`; 15rem desde 768 px; 18rem desde 1024 px; 20rem desde 1280 px con altura ≥ 896 px.
- Se conservan `role="img"` y `aria-label` («Monograma JC de Joel Cantero. Imagen provisional, la fotografía aún no está disponible.»), el anillo estático con `prefers-reduced-motion` (verificado: `animation-name: none`), el modo de colores forzados y la ruta con fotografía de `ProfilePortrait.astro` (`astro:assets`), que no se modificó.

### 15.3 Revisión visual

Capturas inspeccionadas: Hero a 1440 (oscuro y claro), 1920 × 1080 oscuro, 1366 × 768 claro, 768 × 1024 oscuro, 390 × 844 oscuro, 375 × 667 claro y 320 × 568 oscuro. El monograma se lee claramente en la captura completa del Hero en ambos temas; el anillo cobre es el único efecto. Las capturas se guardaron fuera del repositorio.

### 15.4 Criterios

| Requisito | Estado |
|---|---|
| Hero ≥ primera pantalla; «Sobre mí» fuera en alturas habituales | Cumplido (medido en 7 viewports × 2 temas) |
| Crece sin recortar en pantallas pequeñas | Cumplido |
| Monograma mayor y centrado | Cumplido |
| Máximo tres círculos concéntricos; un único anillo orbital; cobre conservado | Cumplido |
| Texto del Hero literal | Cumplido (comprobado en el DOM) |
| `astro:assets`, dimensiones estables, movimiento reducido, semántica | Conservados |

## 16. Segunda revisión visual del propietario (2026-10-20)

Contexto común, archivos, comandos y estado de Git: `T10-IMPLEMENTACION.md §17`. El texto del Hero no se modificó y el Hero sigue ocupando la primera pantalla.

### 16.1 Retrato de cinco círculos

El propietario observó que la versión de §15.2 solo dejaba distinguir dos niveles (el interior y el anillo exterior). Cambios en `global.css`, sin tocar `ProfilePortrait.astro`:

| # | Círculo | Implementación |
|---|---|---|
| 1 | Anillo orbital cobre | Sin cambios (3px, pista neutra + `conic-gradient`) |
| 2 | Borde del disco | Disco `--surface` separado del anillo por 5px de `--background` |
| 3 | Intermedio exterior | `::before`, `inset: 8%`, 1px, `--foreground` al 10 % |
| 4 | Intermedio interior | `::after`, `inset: 15%`, 1px, `--foreground` al 15 % |
| 5 | Círculo principal con «JC» | El propio `span` del monograma: `inset: 22%`, 1px al 22 %, relleno al 4 % |

- Radios ≈42 %, 35 % y 28 % del disco: separaciones regulares, intensidad creciente hacia el centro. En una primera captura en claro los círculos 3 y 4 se distinguían poco; se subieron de 8/12/18 % a 10/15/22 % sin engrosar los trazos.
- Monograma: `0.34` → `0.30 × --portrait-size` para que quepa con aire en el círculo principal (96px a 1440 px, frente a los 69px de T11 original). Centrado medido: desviación 0 px en ambos ejes.
- Tamaño del retrato sin cambios (320 px a 1440; 187 px a 390); sin overflow a 320 px.
- **Anillo:** `portrait-orbit` de 12 s a **24 s** por vuelta, lineal y continuo (`animation-duration` medido: `24s`). Con movimiento reducido: `animation-name: none`.
- Colores forzados: los tres círculos nuevos usan `CanvasText`.
- Con fotografía (`astro:assets`) solo se muestran el anillo y la foto; los círculos 3–5 pertenecen al placeholder.

### 16.2 Verificación

Capturas a 1440 (claro y oscuro), 1920, 768 claro, 390 oscuro y 320 claro, y primeros planos del retrato en ambos temas: los cinco niveles se distinguen y no hay brillos superpuestos. «Sobre mí» sigue fuera de la primera pantalla: 878 px (320×568, el Hero crece), 844 (390×844), 1024 (768×1024), 900 (1440×900) y 1080 (1920×1080).

## 17. Ajuste final del monograma (2026-10-21)

Último ajuste del propietario antes del commit conjunto de T09–T12. El contexto común (estado inicial, validación integral, revisión de Git y propuesta de commit) está en `T10-IMPLEMENTACION.md §18`. No se tocaron el H1, la descripción, los CTA, las redes, la altura de primera pantalla, la posición del retrato ni el header.

### 17.1 Diagnóstico

- El círculo 5 (`.portrait-placeholder__monogram`) tenía un relleno `color-mix(--foreground 4 %)` detrás de «JC». El propietario lo considera innecesario y pide más protagonismo para las letras.
- Al medir la **tinta** real de las letras (no la caja del elemento, que era lo que se midió en §15.2 y §16.1), aparecieron dos desviaciones previas: −10 px en vertical y +5,5 px en horizontal a 1440. La causa: `text-box` no se aplica a un contenedor `grid` (solo a contenedores de bloque), y el interletrado negativo también se añade después de la «C».

### 17.2 Cambios (solo `src/styles/global.css`)

| Elemento | Antes | Después |
|---|---|---|
| Relleno del círculo 5 | `--foreground` al 4 % | **Ninguno** (`background-color` eliminado) |
| Círculo 3 (`::before`) | `inset: 8%` | `inset: 6%` (borde 1px al 10 %, sin relleno) |
| Círculo 4 (`::after`) | `inset: 15%` | `inset: 11%` (borde 1px al 15 %, sin relleno) |
| Círculo 5 (monograma) | `inset: 22%` | `inset: 16%` (borde 1px al 22 %, sin relleno) |
| Tamaño de «JC» | `0.30 × --portrait-size` | `0.44 × --portrait-size` (+47 % de altura; ≈2,2× de área) |
| Peso | 600 | **700** |
| Centrado | `display: grid` + `place-items` | `display: block` + `align-content: center` + `text-align: center` (así `text-box: trim-both cap alphabetic` sí recorta) y `text-indent: -0.06em` para compensar el interletrado final |
| Interletrado y color | `-0.06em`, `--foreground` | Sin cambios |

- Los radios de los círculos 3–5 pasan a ≈44 %, 39 % y 34 % del disco, con separaciones regulares (6 %, 5 % y 5 %). Así el círculo 5 tiene más espacio para letras grandes, sin añadir ni quitar círculos.
- **Sin cambios:** anillo orbital (`::before` del contenedor, `conic-gradient` cobre, 24 s), pista neutra (`::after`), separación de 5px, sombra neutra, tamaños por breakpoint, `prefers-reduced-motion`, `forced-colors` (los tres bordes interiores siguen en `CanvasText`) y `ProfilePortrait.astro`. La ruta con fotografía (`<Picture>`) no usa estas clases y sigue igual.
- **Fondo del disco:** el disco conserva `--surface`. Es el círculo 2 y también tapa el gradiente giratorio del anillo, así que no puede ser transparente sin rehacer el anillo. Por eso, «sin fondo» significa que no hay ningún relleno propio detrás de las letras ni en los pseudoelementos.

### 17.3 Medición en navegador (Chrome, preview 4322, movimiento reducido)

Tinta = píxeles próximos a `--foreground` dentro del círculo 5. Margen = distancia mínima entre la tinta y el borde interior del círculo 5. Mismos resultados en claro y oscuro (±0,5 px).

| Viewport | Retrato | `font-size` | Radios círculos 1–5 (px) | Tinta «JC» | % del ancho del círculo 5 | Desviación (x, y) | Margen hasta el círculo 5 |
|---|---|---|---|---|---|---|---|
| 320 × 568 | 176 | 77,4 px | 88 / 85 / 70,4 / 62,4 / 54,4 | 82 × 53 | 75 % | 1 / 0,5 px | 10,3 px |
| 390 × 844 | 187 | 82,4 px | 93,6 / 90,6 / 75,3 / 66,8 / 58,2 | 87 × 55 | 75 % | 0,5 / 1,5 px | 11,4 px |
| 768 × 1024 | 240 | 105,6 px | 120 / 117 / 98,6 / 87,4 / 76,2 | 111 × 72 | 73 % | 1,5 / 0 px | 16,8 px |
| 1440 × 900 | 320 | 140,8 px | 160 / 157 / 133,8 / 118,6 / 103,4 | 149 × 96 | 72 % | 1,5 / −1 px | 24,6 px |
| 1920 × 1080 | 320 | 140,8 px | ídem | 149 × 96 | 72 % | 1,5 / −1 px | 24,6 px |

Antes del ajuste, a 1440: `font-size` 96 px. Con el tamaño nuevo y el centrado anterior, la tinta quedaba desviada (5,5 / −10 px), y el margen era de 17,6 px.

Comprobaciones en las 10 combinaciones (5 anchos × 2 temas): `background-color` del círculo 5 `rgba(0, 0, 0, 0)` y `background-image: none`; `::before` y `::after` del placeholder con `rgba(0, 0, 0, 0)`; sin overflow horizontal; H1 «Hola, soy Joel Cantero.»; con movimiento reducido, `animation-name: none`. Sin la preferencia, `portrait-orbit` con `24s`, y el `transform` del anillo cambia entre dos lecturas separadas 800 ms.

**Contraste del monograma:** `#252526` sobre el disco `#FFFFFF`, 15,31:1 (claro); `#F1EFEB` sobre `#19191B`, 15,29:1 (oscuro). Sin relleno intermedio, el fondo efectivo es el propio disco.

### 17.4 Revisión visual

Capturas del Hero completo y primeros planos del retrato a 320, 390, 768, 1440 y 1920 en ambos temas, inspeccionadas en mosaicos. «JC» destaca claramente sobre el disco y no tiene ningún fondo propio. Se distinguen los cinco círculos (anillo cobre, borde del disco y tres trazos finos). Las letras no tocan el círculo 5. El anillo y la sombra siguen como antes, y la composición del Hero no cambió. Las capturas se guardaron fuera del repositorio y no se versionan.

### 17.5 Criterios

| Requisito | Estado |
|---|---|
| Sin fondo detrás de «JC» ni pseudoelementos con relleno | Cumplido (medido en el DOM) |
| Letras sustancialmente mayores, en peso destacado | Cumplido (0,30 → 0,44; 600 → 700) |
| Centradas, sin superponerse a los círculos | Cumplido (≤1,5 px; margen ≥10,3 px) |
| Cinco círculos y un único anillo orbital de 24 s | Conservados |
| Tamaño del retrato, responsive, sombra, movimiento reducido, temas y accesibilidad | Conservados |
| Ruta con fotografía real | Intacta (sin cambios en `ProfilePortrait.astro`) |

**Limitación:** el monograma usa la pila `--font-mono` del sistema (aquí, DejaVu Sans Mono). En macOS o Windows se usará SF Mono o Consolas. Todas tienen el mismo avance (0,6 em), pero la tinta puede variar algunos píxeles. El margen mínimo de 10 px cubre esa variación, aunque no se comprobó en esos sistemas.

## 18. Corrección final: «JC» superpuesto a los círculos (2026-10-21)

Corrección pedida por el propietario tras su última revisión visual, antes del commit integrado de T09–T12. Alcance limitado al monograma del retrato y al favicon (este último, en `T09-IMPLEMENTACION.md §25`). Rama `feat/t09-visual-tokens-dot-background`, partida desde `8854baf` con los cambios de T09–T12 sin preparar, que se conservan.

### 18.1 Diagnóstico

- En §17 las letras crecieron de `0.30` a `0.44 × --portrait-size`, y para dejarles espacio los círculos 3–5 se ampliaron (`inset` 8/15/22 % → 6/11/16 %). Las letras quedaban encerradas en el círculo 5. El propietario rechaza ese acoplamiento: quiere «JC» más grande y **por delante** de los trazos, sin que los círculos se ajusten a las letras.
- Causa estructural: el círculo 5 era el borde del propio `span` del monograma, así que el tamaño y la posición de las letras y la geometría del círculo dependían del mismo elemento.

### 18.2 Decisiones

- **Dos capas** en el placeholder de `ProfilePortrait.astro`:
  - **Decoración (inferior):** `::before` (círculo 3) y `::after` (círculo 4) del placeholder, como antes, y un nuevo `span.portrait-placeholder__circle` (círculo 5) con el `inset: 16%` y el borde de 1px al 22 % que antes tenía el monograma. El anillo orbital y el disco siguen en el contenedor (`.portrait-ring`).
  - **Monograma (superior):** `span.portrait-placeholder__monogram` sin borde ni fondo, absoluto con `inset: 0` sobre todo el disco y `z-index: 1`. `isolation: isolate` en el placeholder limita ese `z-index` al retrato (sin conflictos con el header ni con otras capas). `pointer-events: none` y `white-space: nowrap`.
- **Geometría sin cambios:** se conservan los `inset` actuales (6/11/16 %), intensidades (10/15/22 %), grosores, la separación de 5px, la sombra y el tamaño del retrato por breakpoint. Se interpretó «mantener sus dimensiones, radios y posiciones actuales» como el estado vigente (§17), no como volver al de §16 (8/15/22 %).
- **Tamaño de «JC»:** `0.44` → `0.62 × --portrait-size`. Es una medida relativa: `--portrait-size` ya es responsive (`clamp(11rem, 48vw, 14rem)` y 15/18/20rem por breakpoint), así que las letras escalan con el retrato y no con los círculos. Se eligió para que la tinta cruzara con claridad el círculo 5 sin llegar al borde del disco ni competir con el anillo cobre. Se mantienen peso 700, `--foreground`, interletrado `-0.06em`, `text-indent` y el centrado con `text-box`.
- **Anillo orbital:** `portrait-orbit` de 24 s a **45 s** por vuelta, lineal y continuo. Se interpretó «Cambiar su rotación de 45 segundos» como «a 45 segundos». Movimiento reducido: estático, como antes.
- **Colores forzados:** `CanvasText` pasa del monograma (ya sin borde) al nuevo círculo 5.
- **Con fotografía:** la rama `<Picture>` (`astro:assets`) no cambia. Las dos capas solo existen en la rama sin `photo`, así que desaparecen al configurar una fotografía.
- Sin efectos nuevos, sin disco, placa, degradado ni superficie detrás de «JC».

### 18.3 Archivos

| Archivo | Cambio |
|---|---|
| `src/components/ui/ProfilePortrait.astro` | Nuevo `span.portrait-placeholder__circle` (decorativo, `aria-hidden`) antes del monograma; comentario de cabecera |
| `src/styles/global.css` | `.portrait-placeholder` con `isolation`; nueva regla `.portrait-placeholder__circle`; `.portrait-placeholder__monogram` con `inset: 0`, `z-index: 1`, sin borde, `0.62`, `nowrap` y `pointer-events: none`; `portrait-orbit` a 45 s; `forced-colors` y comentarios |
| `docs/02-DISENO-VISUAL.md` | Cabecera, §1 (45 s), anillo orbital, composición del retrato y checklist |

Sin dependencias añadidas ni modificadas. Sin cambios en textos, contenidos, CTA, redes, H1, estructura del Hero, header ni rutas.

### 18.4 Geometría antes y después (Chrome, preview 4322, movimiento reducido)

Valores leídos en el DOM (`getComputedStyle` y `getBoundingClientRect`) en las 10 combinaciones (5 anchos × 2 temas), antes y después de la corrección. Radios en px; los círculos 3 y 4 se calculan a partir del `inset` y de la caja de relleno del disco, y el 5 es la caja medida del elemento que lo dibuja.

| Viewport | Retrato | Disco | `inset` 3 / 4 / 5 (antes = después) | Radios 3 / 4 / 5 antes | Radios 3 / 4 / 5 después |
|---|---|---|---|---|---|
| 320 × 568 | 176 | 170 | 9,59 / 17,59 / 25,59 px | 70,4 / 62,4 / 54,4 | 70,4 / 62,4 / 54,4 |
| 390 × 844 | 187,2 | 181,2 | 10,27 / 18,83 / 27,38 px | 75,3 / 66,8 / 58,2 | 75,3 / 66,8 / 58,2 |
| 768 × 1024 | 240 | 234 | 13,44 / 24,63 / 35,83 px | 98,6 / 87,4 / 76,2 | 98,6 / 87,4 / 76,2 |
| 1440 × 900 | 320 | 314 | 18,23 / 33,44 / 48,63 px | 133,8 / 118,6 / 103,4 | 133,8 / 118,6 / 103,4 |
| 1920 × 1080 | 320 | 314 | ídem | ídem | ídem |

**Diferencia de geometría: 0 px** en todos los casos. El tamaño del retrato y del disco tampoco cambia.

| Viewport | `font-size` antes → después | Tinta «JC» antes → después | Radio máx. de la tinta | Radio del círculo 5 | Desviación (x, y) | Margen hasta el borde del disco |
|---|---|---|---|---|---|---|
| 320 | 77,4 → 109,1 px | 82 × 53 → 114 × 74 | 59,5 | 54,4 | 1 / 0 px | 20,5 px |
| 390 | 82,4 → 116,1 px | 87 × 55 → 122 × 79 | 63,7 | 58,2 | 1,5 / 0 px | 21,9 px |
| 768 | 105,6 → 148,8 px | 111 × 72 → 157 × 100 | 81,5 | 76,2 | 1,5 / 0 px | 30,5 px |
| 1440 / 1920 | 140,8 → 198,4 px | 149 × 96 → 210 × 135 | 109,1 | 103,4 | 2 / −0,5 px | 42,9 px |

La tinta mide un 41 % más de ancho y alto y sobrepasa el radio del círculo 5 (se superpone a su trazo) sin alcanzar el borde del disco. Mismos valores en claro y oscuro.

Comprobaciones en el DOM: monograma con `z-index: 1`, `inset: 0`, borde 0, `background-color: rgba(0, 0, 0, 0)`, `background-image: none` y `pointer-events: none`; `elementFromPoint` en el centro del retrato devuelve el placeholder (la capa no intercepta eventos); sin overflow horizontal en ningún ancho; H1 «Hola, soy Joel Cantero.» y `aria-label` del retrato sin cambios. Sin movimiento reducido: `portrait-orbit 45s linear infinite`, y el `transform` del anillo cambia entre dos lecturas separadas 800 ms. Con movimiento reducido: `animation-name: none`.

### 18.5 Revisión visual

Capturas del Hero completo y primeros planos del retrato a 320, 390, 768, 1440 y 1920 en ambos temas, inspeccionadas en mosaicos. «JC» queda claramente por delante: el trazo del círculo 5 pasa por detrás de las letras y se interrumpe bajo la tinta (según la medición de §18.4, la tinta no llega al círculo 4). Los cinco círculos siguen visibles y en su sitio, sin deformaciones; el anillo cobre está intacto; no hay fondo propio detrás de las letras. La composición del Hero (columnas, textos, CTA y redes) no cambió en escritorio ni en móvil. Las capturas están fuera del repositorio y no se versionan.

**Contraste:** las letras son opacas y tapan los trazos que cruzan, así que el fondo efectivo sigue siendo el disco: `#252526` sobre `#FFFFFF`, 15,31:1 (claro), y `#F1EFEB` sobre `#19191B`, 15,29:1 (oscuro), como en §17.3. Los trazos al 10–22 % de `--foreground` quedan siempre por debajo de la tinta.

### 18.6 Validaciones

| Comando / prueba | Resultado |
|---|---|
| `corepack pnpm exec astro sync` | Aprobado (contenido y tipos generados) |
| `corepack pnpm exec astro check` | Aprobado: 0 errores, 0 avisos, 0 sugerencias |
| `corepack pnpm run build` | Aprobado: 6 páginas |
| `git diff --check` | Aprobado: sin salida |
| Preview `node scripts/preview.mjs --port 4322` | `/` y las cuatro páginas de proyecto 200; `favicon.svg` y `favicon.ico` 200 |
| Regresión en Chrome | 4 enlaces «Ver proyecto»; 4 indicadores «+3» (todos los de la página); menú móvil abre (`aria-expanded="true"`) y cierra con Escape; el selector de tema cambia a claro; 0 errores de consola |
| Archivos de contenido | Esta corrección solo modificó `ProfilePortrait.astro`, `global.css`, `favicon.svg`, `favicon.ico` y la documentación (comprobado por fecha de modificación): textos del Hero, los tres párrafos de «Sobre mí» y las descripciones de proyectos no se tocaron |
| axe-core | **No ejecutado** en esta corrección (el árbol de accesibilidad no cambia: el nuevo `span` es `aria-hidden` dentro de un `role="img"`) |
| Safari, Firefox, macOS y Windows | **No comprobados** |

### 18.7 Riesgos y pendientes

- **Fuente del monograma:** sigue la pila `--font-mono` del sistema (aquí, DejaVu Sans Mono). En otros sistemas la tinta puede variar algunos píxeles; con el margen mínimo de 20 px hasta el borde del disco no debería tocarlo, pero no se comprobó.
- **Interpretaciones a confirmar por el propietario:** (1) geometría conservada en 6/11/16 % y no restaurada a 8/15/22 % (§16); si prefiere esta última, basta con cambiar los tres `inset`; (2) anillo a 45 s.
- **ADR-002** describe todavía el favicon sobre disco zinc y el anillo de 24 s; no se modificó porque la corrección solo pedía actualizar informes y guía. Conviene registrar esta corrección como entrada nueva del ADR antes del commit, si el propietario lo autoriza.
- Pendiente la revisión visual del propietario. La corrección **no** está aprobada.

### 18.8 Inventario para el commit integrado T09–T12 (no ejecutado)

Estado de Git al cierre: rama `feat/t09-visual-tokens-dot-background`, HEAD `8854baf`, nada preparado; 30 archivos modificados (1206 inserciones, 611 eliminaciones) y 7 sin seguimiento.

- **Documentación:** `docs/02-DISENO-VISUAL.md`, `docs/adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md`, `docs/implementations/T09-IMPLEMENTACION.md`, `T10-IMPLEMENTACION.md`, `T11-IMPLEMENTACION.md` y `T12-IMPLEMENTACION.md` (nuevos).
- **Recursos públicos:** `public/favicon.ico`, `public/favicon.svg` y los ocho SVG de `public/images/projects/` (`auditapy`, `boozhome`, `controllote` y `sgaa`, cada uno con su variante `-light`).
- **Componentes:** `src/components/layout/` (`MobileNavigation`, `SiteFooter`, `SiteHeader`, `ThemeSwitcher`) y `src/components/ui/` (`ButtonLink`, `ProjectCard`, `SectionHeading`, `StatusBadge`; nuevos: `ExperienceCard`, `Icon`, `ProfilePortrait`).
- **Contenido y datos:** los cuatro MDX de `src/content/projects/`, `src/data/navigation.ts` y `src/data/profile.ts`.
- **Layouts, páginas y estilos:** `src/layouts/BaseLayout.astro`, `src/layouts/CaseStudyLayout.astro`, `src/pages/index.astro` y `src/styles/global.css`.

Fuera del inventario: `dist/`, `.astro/` y `node_modules/` (ignorados) y las herramientas y capturas temporales del directorio temporal de la sesión. No se ejecutaron `git add`, commit, push, PR, merge, despliegue ni cambio de rama.

## 19. Revisión del propietario: cuatro círculos equiespaciados e interior transparente (2026-10-21)

Petición del propietario tras revisar §18: el anillo exterior no cambia; dentro deben verse **cuatro** círculos proporcionales desde el centro hasta el anillo, sin que el primero sea demasiado pequeño, y el retrato no debe tener fondo blanco. El favicon de `T09-IMPLEMENTACION.md §25` queda **aprobado** por el propietario y no se tocó. Misma rama y HEAD (`8854baf`), con T09–T12 sin preparar.

### 19.1 Diagnóstico

- Se percibían solo tres círculos interiores: el borde del disco (círculo 2 de §16) apenas se distingue del anillo, y los círculos 3–5 (`inset` 6/11/16 %) estaban concentrados en la mitad exterior, lejos del centro.
- El disco tenía relleno `--surface` (blanco en claro) y una franja de 5px en `--background`. Era necesario porque tapaba el gradiente giratorio y la pista neutra, que llenaban todo el contenedor.

### 19.2 Cambios

| Archivo | Cambio |
|---|---|
| `src/components/ui/ProfilePortrait.astro` | Cuatro `span.portrait-placeholder__circle` (`aria-hidden`) en lugar de uno |
| `src/styles/global.css` | `--portrait-ring-width: 3px`. Máscara radial (`mask`) en `::before` (gradiente) y `::after` (pista) del anillo, que solo dejan visible el anillo de 3px. `.portrait-ring__media` con borde de 5px transparente y `background-clip: padding-box` (el `--surface` queda solo bajo una futura fotografía). `.portrait-placeholder` con fondo transparente. Se eliminan `::before`/`::after` del placeholder; los cuatro círculos se dimensionan con `--circle-scale` y `--circle-alpha` por `:nth-child`. `forced-colors` aplicado a los cuatro círculos |
| `docs/02-DISENO-VISUAL.md` | Composición del retrato |

Sin cambios en el anillo exterior (tamaño, 3px, `conic-gradient`, 45 s, movimiento reducido), en el tamaño del retrato por breakpoint, la sombra, el monograma (§18), los textos, los CTA ni el favicon. Sin dependencias nuevas.

### 19.3 Geometría (Chrome, preview 4322)

Los diámetros se derivan de `--portrait-size`, es decir, del diámetro exterior del anillo: 1/5, 2/5, 3/5 y 4/5. Así, el centro, los cuatro círculos y el anillo quedan a la misma distancia entre sí (20 % del radio exterior).

| Viewport | Anillo exterior | Diámetros de los círculos 1–4 (px) | Separación radial | Desviación del centro |
|---|---|---|---|---|
| 320 × 568 | 176 | 35,2 / 70,4 / 105,6 / 140,8 | 17,6 px | ≤0,02 px |
| 390 × 844 | 187,2 | 37,4 / 74,9 / 112,3 / 149,8 | 18,7 px | 0 px |
| 768 × 1024 | 240 | 48 / 96 / 144 / 192 | 24 px | 0 px |
| 1440 × 900 y 1920 × 1080 | 320 | 64 / 128 / 192 / 256 | 32 px | 0 px |

Igual en claro y oscuro. El anillo exterior mide lo mismo que en §18. En el DOM: `background-color` del disco `rgba(0, 0, 0, 0)`, borde de 5px `rgba(0, 0, 0, 0)`, monograma sin fondo, `z-index: 1`. Sin overflow horizontal.

### 19.4 Revisión visual

Primeros planos a 320, 390 y 1440 en ambos temas: el interior es transparente y se ven los puntos del fondo, sin disco blanco ni oscuro. El anillo cobre conserva su grosor y su gradiente, con bordes suavizados. Se ven los cuatro círculos y «JC» por delante. El círculo más pequeño queda en gran parte detrás de las letras y se ve entre la «J» y la «C». Las capturas están fuera del repositorio.

**Contraste del monograma:** el fondo efectivo pasa a ser el de la sección Hero (`--background`): `#252526` sobre `#FAF9F7` y `#F1EFEB` sobre `#0D0E11` superan 15:1 (tabla de tokens de T09). Los puntos del patrón son tenues y quedan por debajo de la tinta.

### 19.5 Validaciones

| Comando / prueba | Resultado |
|---|---|
| `astro sync` / `astro check` / `run build` | Aprobados (0 errores, 0 avisos, 0 sugerencias; 6 páginas) |
| `git diff --check` | Aprobado |
| Regresión en Chrome | Anillo `portrait-orbit 45s linear infinite` y en movimiento; con movimiento reducido, `none`. H1 sin cambios, 4 «Ver proyecto», 4 «+3», menú móvil, selector de tema y las cinco rutas con 200. 0 errores de consola |
| axe-core, Safari, Firefox, macOS y Windows | **No ejecutados** |

### 19.6 Riesgos y pendientes

- `mask` sin prefijo requiere Chrome 120, Safari 15.4 y Firefox 53 o versiones posteriores. En navegadores más antiguos sin soporte, el gradiente y la pista llenarían el interior del retrato. No se comprobó.
- En colores forzados, el retrato ya no dibuja el borde del disco (ahora transparente); se ven los cuatro círculos en `CanvasText`.
- Con fotografía, la imagen sigue llenando el interior. La franja de 5px entre el anillo y la foto es ahora transparente. No se comprobó con una foto real.
- ADR-002 sigue sin registrar las correcciones de §18 y §19 (pendiente de autorización).
- Pendiente de la revisión visual del propietario. Inventario del commit sin cambios respecto a §18.8. No se ejecutaron `git add`, commit, push, PR, merge, despliegue ni cambio de rama.

## 20. Cierre: retrato definitivo con un círculo interior (2026-10-21)

Contexto común, validaciones finales y Git en `T10-IMPLEMENTACION.md §19`.

### 20.1 Decisión del propietario

Tras §19, el propietario editó `ProfilePortrait.astro` directamente (fuera de la sesión del agente) y dejó **un único círculo interior** de los cuatro. Antes del commit se le consultó la discrepancia con su mensaje de aprobación («cinco círculos») y **confirmó conservar un círculo interior**. Los cambios del agente se limitaron a eliminar una línea de solo espacios del componente y a simplificar el CSS al círculo que queda: se eliminan las reglas `:nth-child(2–4)` sin elementos, el círculo queda con `0.8 × --portrait-size` y `--foreground` al 10 %, y se actualizan los comentarios. El resultado visual es idéntico al de la edición del propietario.

### 20.2 Estado definitivo

- Anillo orbital cobre de 3px (máscara radial), 45 s por vuelta, estático con movimiento reducido.
- Un círculo interior de 1px centrado: 140,8 / 149,8 / 192 / 256 px de diámetro a 320 / 390 / 768 / 1440 px (80 % del retrato), desviación del centro ≤0,02 px. Igual en claro y oscuro.
- Interior transparente: disco `rgba(0, 0, 0, 0)` y borde de 5px transparente; se ve el fondo de puntos.
- «JC» en capa superior (`z-index: 1`, `inset: 0`), sin fondo, al 62 % del retrato. A 1440 px, la tinta alcanza 109 px del centro y el círculo está a 128 px: las letras van por delante, pero ya no cruzan el trazo.
- Ruta con fotografía (`<Picture>`, `astro:assets`) sin cambios.
- Capturas de los primeros planos a 320, 390, 768, 1440 y 1920 en ambos temas, revisadas en mosaico y guardadas fuera del repositorio.

### 20.3 Criterios

| Requisito | Estado |
|---|---|
| Geometría elegida por el propietario (anillo + un círculo) | Cumplido |
| «JC» en capa superior independiente, sin fondo | Cumplido (DOM) |
| Interior transparente | Cumplido (DOM y capturas) |
| Anillo de 45 s y movimiento reducido | Cumplido |
| Validaciones finales | Aprobadas (`T10 §19.4`) |
| Pruebas en otros navegadores, sistemas y con fotografía real | **No realizadas** (T13) |
