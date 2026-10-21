# Informe de implementación — T13 (fase 1)

- **Tarea:** T13 — QA, accesibilidad y lanzamiento final. **Fase 1:** imagen Open Graph de la identidad Cobre Mineral + Zinc y diagnóstico de las diferencias tipográficas en móviles.
- **Fecha:** 2026-10-21
- **Rama:** `fix/t13-social-preview-mobile-typography`, creada desde `origin/main` actualizado
- **Commit de partida:** `1bcb0e4` (merge del PR #11, rediseño T09–T12)
- **Estado:** **fase 1 aprobada por el propietario para su publicación (2026-10-21)**, con commit, push, PR, merge tras CI y verificación del despliegue autorizados. La tipografía no se modifica por decisión del propietario. T13 **no** está cerrada: el resto de la QA final sigue pendiente (§14). Publicación: §15.

---

## 1. Diagnóstico inicial

- Árbol limpio en `feat/t09-visual-tokens-dot-background` (`640b168`). `git fetch` trajo `origin/main` = `1bcb0e4` (merge del PR #11). La rama de T13 se creó desde ahí; `main` no se modificó.
- `src/layouts/BaseLayout.astro` apuntaba a `/images/social/og-image.jpg` (JPEG 1200×630, 106 408 B, creado en T07) con un `alt` que describía «fondo azul». La imagen mostraba la identidad azul anterior y el eslogan retirado en T12 («Software para problemas reales. Diseñado para evolucionar»), además de «Asunción, Paraguay» y la URL. ADR-002 y T09 ya dejaban su revisión para T13.
- `.github/workflows/ci.yml` exige `dist/images/social/og-image.jpg` entre los artefactos obligatorios.
- Tipografía: `@import "@fontsource-variable/geist"` en `global.css`; `--font-sans` empieza por `'Geist Variable'`; `--font-mono` es una pila solo de fuentes del sistema.

## 2. Objetivo y alcance

1. Sustituir la imagen social por una original en la identidad aprobada, con fuente editable, y actualizar sus metadatos.
2. Averiguar si la tipografía cambia realmente en móviles o si las diferencias vienen del renderizado y de las fuentes de reserva, antes de tocar ninguna fuente.

Fuera de alcance: el resto de la QA de T13 (Lighthouse, axe, capturas finales, release notes, decisión sobre el retrato), cambios de escala tipográfica o de diseño responsive.

## 3. Imagen Open Graph

### 3.1 Diseño

| Aspecto | Valor |
|---|---|
| Lienzo | 1200 × 630 px |
| Fondo | `#0D0E11` |
| Puntos | 28 px de separación, radio 1,1 px, `#F1EFEB` al 13 % (los tokens `--dots-*` del sitio), atenuados por una máscara radial detrás del texto y hacia los bordes |
| Monograma | Trazos «JC» de `public/favicon.svg` (no depende de fuentes) en `#F1EFEB`, dentro de un anillo cobre `#E6A47B` de 3 px en degradado hacia una pista tenue y un círculo interior de 1 px al 80 % (`#F1EFEB` al 10 %), como el retrato del Hero |
| Nombre | «Joel Cantero», Geist 600, 104 px, interletrado −3,6 px, `#F1EFEB` |
| Identificador | «Full Stack .NET Developer», Geist 500, 40 px, `#F1EFEB` al 86 % |
| Línea técnica | «C# · .NET · Desarrollo web», Geist 400, 26 px, `#A6A5AC`, separadores `·` en cobre |
| Composición | Centrada. Tinta medida entre x 308–898 e y 115–516: márgenes de 115 px arriba y abajo y ≥ 300 px a los lados |

Sin métricas, proyectos, fotografías, logos de clientes ni eslóganes. No se usaron elementos gráficos de FullStackHero ni imágenes generadas de personas. Se retiraron respecto a la imagen anterior el eslogan comercial, la ciudad y la URL (la URL ya la muestran las plataformas en la tarjeta).

**Decisión — composición centrada:** algunas apps recortan la imagen a un cuadrado central en sus vistas compactas. En una primera versión, el nombre a 116 px ocupaba 660 px y se cortaba en el cuadrado central de 630 px. Se redujo a 104 px (≈ 592 px de tinta) para que el nombre quepa entero en ese recorte, conservando su protagonismo.

### 3.2 Contraste (WCAG 2.x, sobre `#0D0E11`)

| Texto | Ratio |
|---|---|
| Nombre `#F1EFEB` | 16,81 : 1 |
| Identificador `#F1EFEB` al 86 % (≈ `#D1D0CC`) | 12,50 : 1 |
| Línea técnica `#A6A5AC` | 7,90 : 1 |
| Separadores y anillo `#E6A47B` | 9,15 : 1 |

### 3.3 Fuente editable y exportación

- Fuente: `design/social/joel-cantero-og-2026.svg`, fuera de `public/` para no publicarla. El texto es editable. Declara un `@font-face` que carga `geist-latin-wght-normal.woff2` desde `node_modules/@fontsource-variable/geist` (OFL-1.1, ya en las dependencias).
- Exportación con herramientas locales, sin dependencias nuevas:

```bash
google-chrome --headless --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=3000 \
  --screenshot=/ruta/temporal/render.png "file://$PWD/design/social/joel-cantero-og-2026.svg"
convert /ruta/temporal/render.png -strip -colorspace sRGB -sampling-factor 4:4:4 -quality 88 \
  public/images/social/joel-cantero-og-2026.jpg
```

(Google Chrome 155.0.8059.84 e ImageMagick `convert` del sistema. `--allow-file-access-from-files` permite que el SVG abierto con `file://` cargue la fuente.)

- **Comprobación de que el texto se dibujó con Geist:** se renderizó una copia con la URL de la fuente rota (cae en Noto Sans, la sans-serif del sistema). Difieren 33 232 píxeles con respecto al render final, lo que confirma que la exportación usó Geist y no una fuente de reserva.

### 3.4 Resultado

| Comprobación | Resultado |
|---|---|
| Archivo | `public/images/social/joel-cantero-og-2026.jpg` (copiado a `dist/` idéntico, `cmp` correcto) |
| Dimensiones | 1200 × 630 (`identify`) |
| MIME | `image/jpeg` (`file --mime-type`); el preview lo sirve como `image/jpeg` con HTTP 200 |
| Peso | 54 171 B (la anterior pesaba 106 408 B), calidad 88, croma 4:4:4 para que no se emborronen el cobre ni los trazos finos |
| Metadatos | `-strip`: sin EXIF ni otros metadatos (`identify -format "%[EXIF:*]"` vacío) |
| Datos confidenciales | Ninguno: solo nombre, rol y tecnologías públicas del perfil |
| Miniaturas | Revisadas en simulaciones genéricas a 552 px, 330 px, 200 × 105 px y recorte cuadrado de 96 px. El nombre y el rol se leen desde 200 px; la línea técnica, discreta por diseño, solo se lee desde unos 330 px |

La imagen anterior `public/images/social/og-image.jpg` se **eliminó** del árbol de trabajo para no seguir sirviendo la identidad azul. Se puede recuperar con `git restore public/images/social/og-image.jpg`. Consecuencia: la URL antigua devuelve 404. Las plataformas que la tuvieran en caché conservan su copia hasta que vuelvan a leer la página.

## 4. Metadatos actualizados

`src/layouts/BaseLayout.astro`:

- `ogImage` → `new URL('/images/social/joel-cantero-og-2026.jpg', site)`: URL HTTPS absoluta `https://joelveloper.github.io/images/social/joel-cantero-og-2026.jpg`, usada por `og:image` y `twitter:image`. Es una ruta nueva, no un parámetro de versión, para que las cachés sociales la traten como otro recurso. El canonical no se tocó.
- `ogImageAlt` (usado por `og:image:alt` y `twitter:image:alt`): «Monograma JC dentro de un anillo, el nombre Joel Cantero, el rol Full Stack .NET Developer y el texto C#, .NET y Desarrollo web.» No menciona colores ni elementos que no aparecen.
- `og:image:type` (`image/jpeg`), `og:image:width` (1200) y `og:image:height` (630) ya existían y siguen siendo correctos para el recurso nuevo.
- No cambian el título aprobado, las descripciones, el canonical, `robots` ni el sitemap.

`.github/workflows/ci.yml`: la lista de artefactos obligatorios pasa de `dist/images/social/og-image.jpg` a `dist/images/social/joel-cantero-og-2026.jpg`. Sin este cambio el CI fallaría al retirar la imagen antigua. Es una línea y no cambia la lógica.

**HTML estático generado (verificado en `dist/`):** las 6 páginas (`/`, las 4 rutas `/proyectos/*/` y `404.html`) emiten el `og:image` y el `twitter:image` nuevos, los dos `alt` nuevos, `og:image:width` 1200, `og:image:height` 630, `twitter:card` `summary_large_image` y su canonical propio. La 404 conserva `noindex, nofollow`. Ninguna página ni recurso de `dist/` hace referencia a `og-image`. El sitemap incluye las 5 URL indexables y excluye la 404.

**Cachés sociales:** no se ha comprobado ninguna previsualización real de WhatsApp, LinkedIn, Facebook ni X, porque los cambios son locales. Cada plataforma guarda su propia caché de imágenes y metadatos. Después del despliegue habrá que volver a comprobar la previsualización (con los depuradores de cada plataforma donde existan) y, en algunas apps, esperar a que caduque su caché.

## 5. Diagnóstico tipográfico

### 5.1 Inspección del build

| Punto | Resultado |
|---|---|
| `@font-face` generadas | 5 en el CSS del build, una por subconjunto: `cyrillic-ext`, `cyrillic`, `vietnamese`, `latin-ext`, `latin` (solo estilo normal; no se importan las cursivas) |
| Familia | `font-family: Geist Variable`, que coincide con el primer valor de `--font-sans` |
| Archivos | `/_astro/geist-*-wght-normal.<hash>.woff2`, con rutas absolutas desde la raíz, válidas en GitHub Pages (sitio de usuario en `/`) |
| Pesos | Variable `100 900`: cubre 400, 500, 600 y 700 sin síntesis |
| Formato | `format("woff2-variations")`, tal como lo publica Fontsource 5.3.0. Chrome lo acepta (medido: carga y dibuja Geist). Safari también admite esta sintaxis antigua, según su compatibilidad documentada, pero no se pudo comprobar aquí |
| Subconjunto español | El subconjunto `latin` declara `U+0000-00FF`, que incluye á é í ó ú ü ñ Ñ ¿ ¡. Es el único que se descarga en el Home: no hace falta `latin-ext` |
| `font-display` | `swap` |
| `font-family` efectiva | Cuerpo, títulos, menú y botones: `"Geist Variable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`. Elementos `font-mono`: `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` |
| CSS responsive | Los tamaños cambian por diseño (`clamp()` y prefijos `sm:`/`lg:`), no por error: H1 72 px en escritorio frente a 40 px a 412 px de ancho; párrafo del Hero 20 px frente a 17 px; «Sobre mí» 17 px frente a 16 px. Los pesos no cambian con el ancho |
| `text-size-adjust` | El CSS del proyecto no lo declara. El valor computado es `100%` en escritorio y en emulación (preflight de Tailwind v4), así que el navegador no infla el texto automáticamente |
| Suavizado | `antialiased` (`-webkit-font-smoothing`) solo tiene efecto en macOS; no actúa en Android, iOS ni Windows |
| `font-synthesis` | `weight style small-caps` (valor por defecto): si una fuente del sistema no tiene negrita, el navegador la sintetiza |
| Errores de carga | Ninguno: `.woff2` con HTTP 200 y `font/woff2` y sin peticiones fallidas |

### 5.2 Mediciones en navegador

Herramientas: Google Chrome 155.0.8059.84 (headless) controlado con `playwright-core` 1.64.1 desde la caché de npx (sin añadirlo al proyecto), contra el preview estático `scripts/preview.mjs` en `127.0.0.1:4331`. En cada caso se esperó `document.fonts.ready`. La fuente **realmente dibujada** se obtuvo con CDP `CSS.getPlatformFontsForNode` (el panel «Rendered Fonts» de DevTools), no con `document.fonts.check()`. Tema oscuro.

Contextos: **escritorio** 1440 × 900 a DPR 1, y **emulación Android** 412 × 915 a DPR 2,625 con `isMobile`, táctil y agente de usuario de Android 14.

| Elemento | Escritorio: tamaño / peso / interlineado | Android emulado: tamaño / peso / interlineado | Fuente dibujada (ambos) |
|---|---|---|---|
| H1 del Hero | 72 px / 600 / 75,6 px | 40 px / 600 / 42 px | Geist (web) |
| Párrafo del Hero | 20 px / 400 / 32 px | 17 px / 400 / 27,2 px | Geist (web) |
| «Sobre mí», párrafo | 17 px / 400 / 27,6 px | 16 px / 400 / 26 px | Geist (web) |
| Menú de navegación | 14 px / 600 / 20 px | 16 px / 600 / 24 px (diálogo móvil) | Geist (web) |
| Botones «Hablemos» / «Ver mis proyectos» | 16 px / 500 / 24 px | 16 px / 500 / 24 px | Geist (web) |
| Rol del Hero (`font-mono`) | 12 px / 400 / 16,8 px | igual | **Liberation Mono (sistema)** |
| Etiqueta «01 · Sobre mí» (`font-mono`) | 12 px / 400 / 16,8 px | igual | **Liberation Mono (sistema)** |
| Badges técnicos (`font-mono`) | 12 px / 400 / 16 px | igual | **Liberation Mono (sistema)** |
| Monograma del header (`font-mono`) | 14 px / 600 | igual | **Liberation Mono (sistema)** |
| «JC» del retrato del Hero (`font-mono`) | 198,4 px / 700 | 122,6 px / 700 | **Liberation Mono (sistema)** |

`document.fonts`: estado `loaded`. Solo se descarga y queda `loaded` la cara `latin`; las otras cuatro quedan `unloaded` porque ningún carácter de la página cae en sus rangos. Red: una única petición `.woff2` (HTTP 200, `font/woff2`, 29 400 B). Sin errores de consola.

**Prueba de control (escenario B forzado):** se bloquearon los `.woff2` de Geist. El `font-family` computado **no cambió** (sigue empezando por `"Geist Variable"`), pero Chrome pasó a dibujar **Noto Sans (sistema)** en el H1 y los párrafos, y la cara `latin` quedó en `error`. El estilo computado no revela el uso de una fuente de reserva; solo lo revela la fuente dibujada. Las capturas de ambos casos (con Geist y sin Geist) sirven de referencia visual para compararlas con el teléfono.

**Regresión:** las mediciones se repitieron tras los cambios de esta fase y dieron los mismos valores.

### 5.3 Interpretación por escenarios

- **A. Geist carga correctamente (comprobado en Chrome de escritorio y en emulación).** Títulos, párrafos, menú y botones se dibujan con Geist, que se sirve desde el propio sitio. No hay fallo de ruta, formato ni subconjunto. Cuando Geist carga, las diferencias de tamaño entre escritorio y móvil son las de la escala responsive aprobada. En un teléfono real, el motor de rasterizado (Skia en Android, Core Text en iOS), la densidad de píxeles y el suavizado distinto pueden hacer que la misma fuente parezca más fina o más gruesa. Esto **no** se ha verificado en un dispositivo.
- **B. Fuente de reserva.** No se reprodujo: Geist cargó en todas las páginas y contextos probados. No se puede descartar en el teléfono del propietario (red, bloqueadores o modo de ahorro de datos) hasta comprobarlo allí. Si ocurriera, la reserva sería `system-ui`/`sans-serif`: en Android normalmente Roboto y en iOS San Francisco, con formas visiblemente distintas de Geist.
- **C. Etiquetas monoespaciadas (causa más probable, sin confirmar en dispositivo).** Todo lo `font-mono` depende de las fuentes del sistema operativo. La medición demuestra que la emulación Android de escritorio **dibuja con las fuentes del equipo anfitrión** (Liberation Mono en este Linux), así que la simulación no puede reproducir lo que muestra un teléfono. Según la compatibilidad documentada de los navegadores (no medido aquí): `ui-monospace` solo lo resuelve Safari (SF Mono en iOS y macOS). En Chrome para Android, ninguna familia de la pila existe, así que se usa el `monospace` genérico del sistema (Droid Sans Mono o la fuente que ponga el fabricante). En Windows se usa Consolas y en Linux, Liberation Mono. El elemento más visible es el **«JC» grande del retrato**, en peso 700 y al 62 % del diámetro: si la monoespaciada del teléfono no tiene negrita, el navegador la sintetiza (`font-synthesis: weight`), y cambian la forma, el grosor y el ancho de las letras. Afecta también a las etiquetas de sección, el rol, los badges, las fechas y el monograma del header.

Otro factor posible, sin comprobar: el centrado del «JC» del retrato usa `text-box: trim-both cap alphabetic`. Los navegadores móviles sin soporte (versiones antiguas de Safari o Chrome) ignoran la propiedad y el monograma podría quedar algo desplazado en vertical.

**Conclusión:** **no hay ninguna causa confirmada en dispositivo real.** Lo comprobado es que Geist carga y se dibuja correctamente, y que la emulación de escritorio no sirve para juzgar las fuentes `font-mono` porque usa las del equipo anfitrión. La hipótesis principal es el escenario C, con efecto especialmente visible en el «JC» del retrato.

### 5.4 Correcciones tipográficas

**Ninguna.** No se reprodujo ningún fallo de carga, ruta, familia ni subconjunto, así que el código tipográfico queda intacto. Tampoco se instaló otra tipografía monoespaciada: no se ha demostrado que la diferencia observada venga de ahí. Si el dispositivo lo confirma, las opciones (alojar una monoespaciada OFL, unos 20–40 KB por peso, o pasar el «JC» del retrato a Geist) requieren decisión del propietario.

### 5.5 Navegadores y dispositivos

| Entorno | Estado |
|---|---|
| Chrome de escritorio (Linux) | **Comprobado** |
| Chrome con emulación Android | **Comprobado** (fuentes del anfitrión, ver §5.3) |
| WebKit/Safari emulado | **No ejecutado:** el navegador WebKit de Playwright no está instalado y no se descargó. Aunque estuviera, WebKit en Linux no trae SF Mono ni las fuentes de iOS, así que no reproduciría el iPhone |
| Dispositivo físico (depuración remota) | **No ejecutado:** no hay dispositivo conectado (`adb` no está disponible) |

## 6. Archivos

| Archivo | Cambio |
|---|---|
| `design/social/joel-cantero-og-2026.svg` | **Creado.** Fuente editable de la imagen social |
| `public/images/social/joel-cantero-og-2026.jpg` | **Creado.** Imagen Open Graph 1200×630 |
| `public/images/social/og-image.jpg` | **Eliminado.** Imagen social azul anterior |
| `src/layouts/BaseLayout.astro` | **Modificado.** Ruta de `og:image`/`twitter:image` y texto alternativo |
| `.github/workflows/ci.yml` | **Modificado.** Artefacto obligatorio apunta a la imagen nueva |
| `docs/implementations/T13-IMPLEMENTACION.md` | **Creado.** Este informe |

Sin cambios en `global.css`, componentes, contenidos, textos, configuración de Astro ni informes T01–T12. **Dependencias:** ninguna añadida ni modificada (`package.json` y `pnpm-lock.yaml` intactos). Herramientas externas usadas solo localmente: Google Chrome, ImageMagick y `playwright-core` de la caché de npx. Los scripts de medición y la página de revisión están en el scratchpad de la sesión, fuera del repositorio.

## 7. Comandos y resultados

| Comando | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Correcto: «Lockfile is up to date», exit 0 |
| `corepack pnpm exec astro sync` | Correcto, exit 0 |
| `corepack pnpm exec astro check` | 28 archivos: 0 errores, 0 avisos, 0 sugerencias |
| `corepack pnpm run build` | 6 páginas generadas; `sitemap-index.xml` creado |
| `git diff --check` | Sin salida, exit 0 |
| Paso «Verify required static artifacts» del CI, ejecutado localmente con `bash -euo pipefail` | «Artefactos estáticos verificados: 12», exit 0 |
| `curl` al preview (`127.0.0.1:4331`) | `/` y las 4 rutas de proyecto: 200; `/no-existe/`: 404 (página 404 propia); `sitemap-index.xml` y `sitemap-0.xml`: 200 `application/xml`; imagen nueva: 200 `image/jpeg` 54 171 B; `og-image.jpg`: 404; Geist `latin`: 200 `font/woff2` |

## 8. Pruebas funcionales y visuales

Pasada de humo con Chrome headless sobre las 6 rutas, en escritorio (1440 × 900) y móvil (390 × 844, DPR 3, táctil), en tema oscuro y claro (24 combinaciones):

- Estado HTTP esperado en todas: 200, y 404 en la ruta inexistente.
- Un único `h1` por página.
- Sin desbordamiento horizontal (`scrollWidth` ≤ ancho de la ventana).
- Geist `loaded` en todas.
- **0 errores de consola** y 0 peticiones fallidas. En `/no-existe/` se excluyó del recuento el aviso del propio estado 404 del documento, que es el esperado.
- **Menú móvil:** se abre con el botón y se cierra con Escape (tema oscuro y claro).
- Sin regresiones de diseño: esta fase no toca CSS ni componentes, y las mediciones tipográficas posteriores coinciden con las iniciales.

## 9. Accesibilidad, SEO, seguridad y privacidad

- **Accesibilidad:** el texto alternativo describe el contenido real de la imagen. Contraste de la imagen ≥ 7,9 : 1 (§3.2). El contraste del sitio no cambia (no se tocaron tokens). No se ejecutaron axe ni Lighthouse en esta fase.
- **SEO:** URL de imagen HTTPS absoluta. Canonical, título, descripciones y sitemap sin cambios. La 404 sigue con `noindex`.
- **Seguridad y privacidad:** imagen sin EXIF. No se añadieron analítica, rastreo ni integraciones. Sin datos de clientes, contratos ni capturas.

## 10. Problemas encontrados y soluciones

- `playwright-core` 1.64.1 esperaba un Chromium (1248) que no estaba instalado. Se usó el Google Chrome del sistema (`executablePath`) en lugar de descargar navegadores.
- El primer selector del botón también coincidía con el enlace «Contacto» del header, y el menú móvil está dentro de un diálogo plegado. Se ajustaron los selectores y el script abre el diálogo antes de medir.
- El nombre se cortaba en el recorte cuadrado central: se redujo de 116 a 104 px (§3.1).
- Retirar `og-image.jpg` habría roto el CI: se actualizó la lista de artefactos (§4).

## 11. Riesgos, limitaciones y pendientes

- **Sin prueba en teléfono real.** La causa de la diferencia que observa el propietario sigue sin confirmar (§5.3). Procedimiento propuesto: Chrome para Android con depuración USB desde `chrome://inspect` y, en el nodo del «JC» del retrato y de una etiqueta `font-mono`, consultar «Rendered Fonts» en *Computed*. En iPhone, Web Inspector de Safari desde macOS. Comparar visualmente también con las capturas con y sin Geist.
- **Cachés sociales** pendientes de comprobar tras el despliegue (§4).
- La URL antigua `og-image.jpg` dejará de existir al desplegar.
- WebKit no se probó (§5.5).
- La imagen está **pendiente de aprobación** del propietario antes de publicarse.

## 12. Cumplimiento (fase 1)

| Criterio | Estado |
|---|---|
| Imagen OG nueva, original, 1200×630, identidad Cobre Mineral + Zinc | Cumplido; pendiente de aprobación del propietario |
| Fuente editable versionable | Cumplido (`design/social/…svg`) |
| Metadatos `og:image*`/`twitter:image*` con ruta nueva y `alt` correcto | Cumplido en las 6 páginas |
| Título, canonical y sitemap conservados | Cumplido |
| Diagnóstico de Geist (carga, familia, rutas, pesos, subconjuntos, `font-display`) | Cumplido |
| Comparación escritorio / emulación Android | Cumplido |
| WebKit / dispositivo físico | **No ejecutado** (no disponibles) |
| Causa tipográfica confirmada | **No:** hipótesis principal documentada (escenario C) |
| Código tipográfico sin cambios injustificados | Cumplido (sin cambios) |

## 13. Estado de Git

Rama `fix/t13-social-preview-mobile-typography` desde `1bcb0e4`, cambios sin preparar:

```
 M .github/workflows/ci.yml
 D public/images/social/og-image.jpg
 M src/layouts/BaseLayout.astro
?? design/
?? docs/implementations/T13-IMPLEMENTACION.md
?? public/images/social/joel-cantero-og-2026.jpg
```

Ese era el estado al cerrar la implementación local. Tras la autorización del propietario (§15), este informe se incluye en el mismo commit y PR que los cambios de la fase.

## 14. Recomendaciones siguientes (sin implementar)

1. Aprobación de la imagen Open Graph por el propietario y, después, autorización de commit y PR de esta fase.
2. Comprobación en el teléfono real del propietario según §11, para confirmar o descartar el escenario C antes de decidir sobre la monoespaciada o el «JC» del retrato.
3. Tras el despliegue, comprobar la previsualización en las plataformas sociales.
4. Resto de T13: axe y Lighthouse sobre el despliegue, capturas móvil y escritorio, pruebas de teclado, decisión sobre publicar con el placeholder del retrato y release notes.

## 15. Publicación de la fase 1 (2026-10-21)

### 15.1 Autorización y decisiones

- El propietario **aprobó la imagen Open Graph** tal como se describe en §3 y autorizó commit, push, PR, merge mediante merge commit (solo con CI correcta) y la verificación del despliegue de GitHub Pages. La imagen no se regeneró ni se rediseñó.
- **Tipografía sin cambios por decisión del propietario.** El diagnóstico (§5) no encontró fallos de carga de Geist en los entornos probados. No se tocan la familia Geist, las variables tipográficas, la escala responsive, Fontsource, el monograma JC, las fuentes de reserva ni las monoespaciadas.
- **La diferencia observada en el teléfono real no tiene aún una causa confirmada** y no se da por resuelta. Sigue sin prueba en dispositivo físico (§5.5, §11).

### 15.2 Estado previo a la publicación

- Rama `fix/t13-social-preview-mobile-typography` en `1bcb0e4123f3cee17118d17502f3d5079b5c75ca`. Tras `git fetch origin`, `origin/main` y la base común coinciden con ese SHA: no hay divergencia.
- El inventario coincide exactamente con los archivos de §6. No hay cambios en `src/styles`, `src/components`, `src/data`, `src/content`, `package.json` ni `pnpm-lock.yaml`. `deploy.yml` no se modifica. El diff de `ci.yml` se limita a la línea del artefacto de imagen.

### 15.3 Validaciones previas (repetidas)

| Comprobación | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Correcto, exit 0 |
| `corepack pnpm exec astro sync` | Correcto, exit 0 |
| `corepack pnpm exec astro check` | 28 archivos: 0 errores, 0 avisos, 0 sugerencias |
| `corepack pnpm run build` | 6 páginas; `sitemap-index.xml` y `sitemap-0.xml` generados; `dist/404.html` presente |
| `git diff --check` | Sin salida, exit 0 |
| `dist/images/social/joel-cantero-og-2026.jpg` | 1200×630, JPEG, `image/jpeg`, 54 171 B |
| Metadatos en las 6 páginas | `og:image` y `twitter:image` con la URL nueva; los dos `alt` nuevos; 1200 × 630; ninguna referencia a `og-image` en `dist/` |
| Título y canonical del Home | `Joel Cantero | Full Stack .NET Developer` y `https://joelveloper.github.io/`, sin cambios |

### 15.4 Pendientes de T13 tras esta fase

- Prueba en un teléfono físico para confirmar o descartar la causa de la diferencia tipográfica (§11).
- Comprobación de las vistas previas en redes sociales una vez renovadas sus cachés.
- axe, Lighthouse, capturas móvil y escritorio, pruebas de teclado, decisión sobre el placeholder del retrato y release notes.
