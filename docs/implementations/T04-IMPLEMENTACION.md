# Informe de implementación — T04

**Tarea:** T04 — Landing personal
**Fecha:** 2026-10-19
**Rama:** `feat/t04-portfolio-home`
**Base:** `main` actualizada por fast-forward hasta `07e9103` (Merge PR #4 · T03 integrada)
**Estado:** implementada y validada localmente; cierre controlado documentado en la sección T.

---

## A. Diagnóstico inicial y Git

### Estado real al comenzar

| Comprobación | Resultado |
|---|---|
| Rama local de partida | `feat/t03-content-model` |
| HEAD de partida | `a46ff6c feat(content): establish portfolio content model` |
| Árbol de trabajo | limpio |
| `origin/main` | `07e9103 Merge pull request #4 from joelveloper/feat/t03-content-model` |
| `main` local | `7b3cf10`, por detrás de `origin/main` |
| T03 integrada en `main` | Sí: `07e9103` contiene `a46ff6c` |
| Cambios ajenos | Ninguno |

### Actualización y rama

1. `git switch main`.
2. `git merge --ff-only origin/main` → fast-forward `7b3cf10..07e9103`.
3. `git switch -c feat/t04-portfolio-home`.

No se usó `reset`, `rebase`, `force push` ni ningún comando destructivo. `main` no recibió commits directos locales.

### Diagnóstico técnico

- Astro `7.4.0`, `output: 'static'`, `site: 'https://joelveloper.github.io'`, `trailingSlash: 'always'`.
- Tailwind CSS `4.3.3` mediante `@tailwindcss/vite`.
- React `19.3.1` configurado, sin islas ni hidratación.
- shadcn/ui sobre Radix ya inicializado; no se reinicializó.
- Colección `projects` con cuatro entradas MDX y gate `publicApproved: false`.
- `getProjects()` y `getPublicProjects()` existentes.
- No existían rutas de detalle ni navegación definitiva.
- Node `v24.21.0`, pnpm `12.14.0` mediante Corepack.

---

## B. Objetivo y alcance

### Incluido

- Landing definitiva en `/` con hero, sobre mí, especialidades, proyectos, proceso, Oñondive y contacto.
- Navegación por anclas realmente presentes.
- Tarjetas de proyecto alimentadas por Content Collections.
- Aprobación editorial separada para tarjetas y casos completos.
- Adaptación de `ProjectCard` para detalle opcional y estado neutral.
- SEO básico de portada.
- Validación técnica, responsive, accesibilidad y contenido.

### Excluido

- Páginas de caso de estudio (`/proyectos/[id]/`): pertenecen a T05.
- Interactividad React/Radix, menú desplegable, formularios, analítica o cookies.
- Open Graph completo, sitemap, robots y favicon: T07.
- Cambios de infraestructura, CI o despliegue.
- Cualquier dato no confirmado por el autor.

---

## C. Decisiones editoriales aplicadas

1. **Identidad:** Joel Cantero, `Full Stack .NET Developer`, Asunción, Paraguay.
2. **Titular:** «Software para problemas reales. Diseñado para evolucionar.»
3. **Hero:** descripción confirmada sobre soluciones empresariales, análisis, arquitectura, implementación, seguridad y despliegue; kicker `FULL STACK .NET DEVELOPER · PARAGUAY`.
4. **CTAs:** «Explorar proyectos» → `#proyectos`; «Contactar» → `#contacto`; GitHub como acción secundaria discreta.
5. **Sobre mí:** tres párrafos con la trayectoria confirmada:
   - proyectos personales de aprendizaje;
   - aplicación de escritorio comercializada en 2020 para gestión de archivos de auditoría, origen de SGAA;
   - evolución a plataforma web, comercializada desde agosto de 2025;
   - trabajo de extremo a extremo y colaboración puntual con profesionales de auditoría;
   - motivación por arquitectura, calidad, seguridad y evolución.
6. **Formación:** «Diplomado en Ingeniería de Software Aplicada — En curso», mostrado discretamente. No se presenta como certificación obtenida, título universitario ni finalización.
7. **Especialidades:** cuatro áreas confirmadas y una nota transversal de Full Stack e infraestructura. No se declara dominio experto de todas las tecnologías; se indica que la profundidad varía según el proyecto.
8. **Proyectos:** cuatro tarjetas con nombres, categorías, estados y resúmenes aprobados. No se añadieron métricas, clientes, testimonios, certificaciones ni años de experiencia.
9. **SGAA:** SaaS en producción; origen de escritorio en 2020; plataforma web comercializada desde agosto de 2025; SQL Server, .NET 8, ASP.NET Core, Blazor/MudBlazor, CQRS e Identity. No se enlaza `redfor-ti.com.py`.
10. **AuditaPy:** producto SaaS independiente en desarrollo; evolución técnica de SGAA, no actualización desplegada. Stack .NET 10, C# 14, Minimal APIs, EF Core 10, React, Vite y TypeScript. Las capacidades arquitectónicas no se presentan como terminadas.
11. **ControlLote:** SaaS en desarrollo con validación piloto en entorno real desde agosto de 2026; procesa más de 18 meses de histórico por empresa, dato que no equivale a antigüedad del servicio ni a clientes activos. No se nombra a la empresa participante.
12. **BoozHome:** desarrollo exclusivo para cliente, en prelanzamiento; no se enlaza el dominio, no se declara en producción y no se publican capturas, logos ni datos del cliente.
13. **Oñondive:** referencia secundaria como «Iniciativa en construcción»; no se describe como empresa constituida, empleador ni titular de los proyectos.
14. **Contacto:** correo profesional, GitHub, YouTube e Instagram. Sin WhatsApp, formulario, backend, cookies ni servicios de terceros.

---

## D. Separación entre `cardApproved` y `publicApproved`

Se mantienen dos aprobaciones independientes:

| Campo | Alcance | Efecto en T04 |
|---|---|---|
| `cardApproved` | Nombre, categoría, estado y resumen de la tarjeta | Permite mostrar la tarjeta en la landing |
| `publicApproved` | Publicación del caso de estudio MDX completo y su ruta | Sigue en `false`; no crea rutas ni habilita el caso completo |

Esta separación permite publicar las cuatro tarjetas aprobadas sin afirmar que los cuerpos MDX completos están listos. `getProjects()` queda como acceso interno; `getPublicProjects()` sigue seleccionando casos completos aprobados; la landing usa exclusivamente `getApprovedProjectCards()`.

Estado aplicado:

| Proyecto | `cardApproved` | `publicApproved` | `featuredOrder` |
|---|---|---|---|
| SGAA | `true` | `false` | 1 |
| ControlLote | `true` | `false` | 2 |
| AuditaPy | `true` | `false` | 3 |
| BoozHome | `true` | `false` | 4 |

---

## E. Cambios de esquema y contenido

### `src/content.config.ts`

Se añadieron dos campos obligatorios al esquema Zod:

- `cardTitle: z.string().min(1).max(40)`
- `cardApproved: z.boolean()`

Se conservaron `publicApproved`, `usageApproved`, `status`, `category`, `featuredOrder` y las validaciones existentes.

### Fichas MDX

Se actualizaron únicamente los datos editoriales necesarios para las tarjetas:

- `cardTitle`: SGAA, ControlLote, AuditaPy, BoozHome.
- `cardApproved: true` en las cuatro.
- `publicApproved: false` en las cuatro.
- `lastReviewed: '2026-10-19'`.
- Stacks confirmados de SGAA y AuditaPy.
- Resúmenes actualizados de SGAA, ControlLote, AuditaPy y BoozHome.
- BoozHome: se conservó «Contacto por WhatsApp» en el cuerpo MDX como característica confirmada del producto; la tarjeta usa un resumen genérico de contacto y la landing no incorpora WhatsApp como canal profesional. Se mantuvo `prelaunch`.

No se publicaron cuerpos completos ni se generaron rutas de detalle.

---

## F. Cambios de componentes y datos

### Helper de tarjetas

`src/lib/projects.ts` incorpora:

- tipos `ProjectCategory`, `ProjectStatus` y `ApprovedProjectCard`;
- `getApprovedProjectCards()`, que filtra `cardApproved`, ordena por `featuredOrder` y solo incluye imagen cuando `usageApproved === true`;
- sin duplicar manualmente los datos de los proyectos en la landing.

### `ProjectCard.astro`

- `href` pasa a ser opcional.
- El título solo es enlace cuando existe `href`.
- Sin `href`, no se renderiza un botón inactivo: se muestra «Caso de estudio en preparación» como texto neutral.
- La categoría se traduce a etiquetas legibles (`SaaS`, `Desarrollo exclusivo`).
- La tarjeta mantiene semántica `article`, estado textual y badges técnicos.
- Las imágenes solo se renderizan si el helper entrega una imagen aprobada.

### Navegación y perfil

- `src/data/navigation.ts`: nueva navegación de seis anclas realmente presentes.
- `src/data/profile.ts`: rol, titular, descripción, disponibilidad, formación en curso e iniciativa.
- `SiteHeader.astro`: enlaces con mayor área de pulsación vertical.
- `SiteFooter.astro`: se retiró el `id="contacto"` duplicado; el ancla vive ahora en la sección de contacto. Se actualizó el copy y se mantuvieron los enlaces centralizados.

### Landing

`src/pages/index.astro` sustituye la demostración de T02 por:

1. Hero con composición técnica abstracta original y `aria-hidden` decorativo.
2. Sobre mí con trayectoria y formación continua.
3. Cuatro especialidades, nota Full Stack y grupos de tecnologías.
4. Cuatro tarjetas de proyecto desde Content Collections.
5. Proceso de trabajo en cuatro pasos.
6. Referencia secundaria a Oñondive.
7. Contacto con correo y redes.
8. Footer existente.

No se añadió fotografía personal, WhatsApp, formulario, isla React ni animación compleja.

---

## G. Archivos modificados

### Modificados

- `src/content.config.ts`
- `src/content/projects/sgaa.mdx`
- `src/content/projects/controllote.mdx`
- `src/content/projects/auditapy.mdx`
- `src/content/projects/boozhome.mdx`
- `src/lib/projects.ts`
- `src/components/ui/ProjectCard.astro`
- `src/components/layout/SiteHeader.astro`
- `src/components/layout/SiteFooter.astro`
- `src/data/navigation.ts`
- `src/data/profile.ts`
- `src/pages/index.astro`

### Creados

- `docs/implementations/T04-IMPLEMENTACION.md` (este informe)

### Eliminados

Ninguno.

### Dependencias

No se añadieron, actualizaron ni eliminaron dependencias. `pnpm-lock.yaml` no cambió.

---

## H. Comandos ejecutados y resultados reales

| Comando | Exit | Resultado |
|---|---:|---|
| `corepack pnpm install --frozen-lockfile` | 0 | Lockfile reproducible; sin cambios |
| `corepack pnpm exec astro sync` | 0 | Contenido y tipos sincronizados |
| `corepack pnpm exec astro check` | 0 | 18 archivos; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | 0 | Build estático; 1 página (`/index.html`) |
| `git diff --check` | 0 | Sin errores de espacios ni conflictos |

**Build:** `output: "static"`, sin adaptador SSR.

---

## I. Verificación funcional de las cuatro tarjetas

Consulta real del DOM generado:

| Orden | Tarjeta | Categoría mostrada | Estado mostrado |
|---:|---|---|---|
| 1 | SGAA | SaaS | En producción |
| 2 | ControlLote | SaaS | En desarrollo |
| 3 | AuditaPy | SaaS | En desarrollo |
| 4 | BoozHome | Desarrollo exclusivo | Prelanzamiento |

Comprobaciones:

- 4 tarjetas en `#proyectos`; 4 imágenes SVG cargadas (`naturalWidth: 320`, `naturalHeight: 180` tras `decode()`).
- 4 textos «Caso de estudio en preparación».
- 0 enlaces a `/proyectos/...`; `dist` solo contiene `index.html`.
- Los cuatro MDX conservan `publicApproved: false`.
- `getPublicProjects()` sigue siendo el selector de casos completos; no se usó para el catálogo de tarjetas.
- Las imágenes se incluyen solo con `usageApproved: true`.

### Prueba negativa temporal

Se cambió temporalmente `sgaa.mdx` a `cardApproved: false`:

- build correcto;
- 3 tarjetas renderizadas;
- SGAA ausente de los títulos de tarjeta.

Después se restauró `cardApproved: true`, se reconstruyó y se confirmaron de nuevo 4 tarjetas. El valor final es `true`.

---

## J. Validación responsive

Medición real con Chrome headless `155.0.8059.84` y Chrome DevTools Protocol sobre `astro preview`:

| Viewport | `documentWidth` | Overflow horizontal | Tarjetas | Navegación con destino |
|---:|---:|---|---:|---|
| 320 px | 320 | No | 4 | 6/6 |
| 375 px | 375 | No | 4 | 6/6 |
| 768 px | 768 | No | 4 | 6/6 |
| 1024 px | 1024 | No | 4 | 6/6 |
| 1440 px | 1440 | No | 4 | 6/6 |

- `offenders: []` en los cinco anchos.
- Sin enlaces internos rotos (`brokenAnchors: []`).
- 21 enlaces totales; 0 `href` vacíos; 0 `<button>` sin función.
- Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`.
- Header: en 320/375 el contenido se distribuye en varias filas (altura 145 px), sin desbordamiento; en 768/1024/1440 cabe en una fila.
- Capturas locales generadas en `/tmp/opencode/t04/final-{320,375,768,1024,1440}.png`; no se versionaron.

**Incidencia encontrada y corregida:** el halo decorativo absoluto del hero ampliaba `scrollWidth` 12 px en 320 y 375. Se añadió `overflow-hidden` a la sección del hero; tras el cambio, la medición quedó sin overflow en todos los anchos.

### Zoom 200 %

No se ejecutó un cambio de zoom real del navegador. Como aproximación de reflujo se probaron anchos CSS de 720 px y 640 px (equivalentes al ancho de un zoom 200 % sobre 1440/1280 px): sin overflow y sin elementos recortados. La comprobación con zoom real al 200 % queda pendiente para T07/T09.

---

## K. Accesibilidad

| Comprobación | Resultado |
|---|---|
| `lang="es"` | Presente |
| Un único `H1` | Sí |
| Jerarquía `H1` → `H2` → `H3` | H2 de secciones, H3 de tarjetas y pasos |
| Skip link | Primer `Tab` enfoca «Saltar al contenido», visible con contorno de 2 px |
| Skiplink funcional | `Enter` lleva a `#contenido` y enfoca `main#contenido` |
| Foco visible | `outline: 2px solid` con token `--ring` |
| Navegación | 6 anclas presentes y accesibles; enlaces con 28 px de alto |
| Estados | Texto además de color: «En producción», «En desarrollo», «Prelanzamiento» |
| Imágenes | Cuatro SVG con `alt` descriptivo |
| Enlaces nuevos | Sin botones inactivos; el estado de caso pendiente es texto |
| `prefers-reduced-motion` | Emulado: `transitionDuration: 1e-05s`, `scroll-behavior: auto` |
| Enlaces externos | `noopener noreferrer` en los 8 enlaces con `target="_blank"` |
| Contenido solo hover | No se usa |

### Contraste calculado sobre colores renderizados

| Combinación | Ratio | WCAG AA |
|---|---:|---|
| foreground / background | 17.60:1 | ✔ |
| primary / background | 9.53:1 | ✔ |
| muted-foreground / background | 10.66:1 | ✔ |
| muted-foreground / surface | 9.78:1 | ✔ |
| positive / surface-raised | 9.59:1 | ✔ |
| enlace de navegación / header | 10.66:1 | ✔ |

---

## L. SEO básico de portada

- `<title>`: «Joel Cantero — Full Stack .NET Developer».
- `meta description`: nombre, rol, ubicación, especialidades y automatización documental.
- `lang="es"` conservado.
- `site: 'https://joelveloper.github.io'` conservado en `astro.config.mjs`.
- Un `H1` y jerarquía semántica.
- No se implementaron Open Graph, sitemap, robots, favicon ni canonical: corresponden a T07.
- No se genera ninguna ruta de detalle ni se indexan borradores.

---

## M. Seguridad, privacidad y publicación

- Sin secretos, claves, tokens ni credenciales en `src/`, `public/` o este informe.
- Sin enlaces a repositorios privados.
- Sin nombres de clientes, contratos, montos, PDFs, datos financieros ni capturas de clientes.
- La landing no incorpora formularios, cookies, analítica, WhatsApp ni integraciones externas. El cuerpo MDX de BoozHome conserva WhatsApp como funcionalidad confirmada del producto, no como canal de contacto del portafolio.
- SGAA no enlaza `redfor-ti.com.py`.
- BoozHome no enlaza `boozhome.com.py` y permanece en `prelaunch`.
- Los cuatro SVG son abstracciones originales; no simulan capturas reales.
- `output: 'static'`; sin adaptador SSR; 0 `<script>`, 0 `astro-island`, 0 directivas `client:` en el HTML generado.

---

## N. Problemas encontrados y soluciones

1. **Overflow horizontal de 12 px en 320/375 px.** Causado por el halo absoluto del hero. Solución: `overflow-hidden` en la sección del hero. Verificado después en los cinco anchos.
2. **Imágenes lazy sin cargar en la primera captura.** Las capturas iniciales mostraban los huecos de las tarjetas porque las imágenes estaban fuera del viewport. Solución de prueba: desplazamiento y `decode()` antes de capturar; la aplicación mantiene `loading="lazy"` en producción.
3. **Ausencia de páginas de detalle.** Solución: `href` opcional en `ProjectCard` y texto neutral «Caso de estudio en preparación», sin botones inactivos ni enlaces rotos.

---

## O. Pruebas no ejecutadas

- Lighthouse.
- axe / auditoría automatizada de accesibilidad.
- Playwright.
- Safari, Firefox y dispositivos móviles reales.
- Zoom real al 200 % del navegador.
- Validación de disponibilidad de `redfor-ti.com.py` y `boozhome.com.py`.
- Lighthouse o pruebas de rendimiento.

No se afirma que estas comprobaciones hayan pasado.

---

## P. Riesgos y pendientes

1. **Casos completos sin aprobar.** Los cuatro MDX mantienen `publicApproved: false`. T05 no debe publicar rutas hasta que exista aprobación editorial específica.
2. **Sin rutas de detalle.** Las tarjetas muestran un estado neutral; cuando T05 cree las rutas, `ProjectCard` puede recibir `href` sin cambiar su contrato.
3. **Enlaces externos de proyecto no verificados.** SGAA y BoozHome no se enlazan. Debe comprobarse disponibilidad, derechos y estado antes de añadir URLs.
4. **ControlLote.** El piloto y el histórico superior a 18 meses están declarados con matices; no deben convertirse en métricas de uptime o clientes.
5. **AuditaPy.** El cuerpo MDX mantiene secciones pendientes y no debe presentarse como producto desplegado.
6. **BoozHome.** Estado `prelaunch`; no se declara producción ni se enlaza el dominio.
7. **Header móvil.** Se resuelve con `flex-wrap`; si T06 añade más enlaces o un menú, deberá revisarse el patrón accesible.
8. **SEO avanzado.** Canonical, OG, sitemap, robots y favicon quedan para T07.
9. **Chunk React no referenciado.** `dist/_astro/client.*.js` se sigue emitiendo por la integración React aunque el HTML no lo carga; condición preexistente, revisable en T07/T08.

---

## Q. Cumplimiento de criterios de aceptación

| Criterio | Estado |
|---|---|
| La landing sustituye la demo de T02 | ✔ |
| Hero con autor y especialización | ✔ |
| Sobre mí con trayectoria confirmada | ✔ |
| Cuatro especialidades | ✔ |
| Cuatro tarjetas aprobadas | ✔ |
| Estados correctos | ✔ |
| Fichas desde Content Collections | ✔ |
| Aprobación de tarjetas independiente de casos | ✔ |
| Ningún MDX completo habilitado | ✔ (`publicApproved: false`) |
| Sin enlaces de caso rotos | ✔ |
| Proceso de trabajo confirmado | ✔ |
| Diplomado en curso | ✔ |
| Oñondive secundaria | ✔ |
| Contacto con canales autorizados | ✔ |
| Sin WhatsApp como canal del portafolio, sin foto ni contenido ficticio | ✔ (BoozHome conserva WhatsApp como funcionalidad del producto) |
| Identidad visual T02 conservada | ✔ |
| Coherencia móvil/escritorio | ✔ |
| Accesible con teclado | ✔ (skip link, foco, anclas) |
| Build estático y `astro check` correctos | ✔ |
| Sin T05–T09 | ✔ |
| Informe T04 completo | ✔ |
| Sin commit, push ni PR durante la implementación | ✔ |

---

## R. Estado de Git al finalizar la implementación

- Rama: `feat/t04-portfolio-home`.
- HEAD: `07e9103` (sin commits nuevos durante la implementación).
- Archivos modificados: 12 archivos versionados.
- Archivo nuevo sin seguimiento: `docs/implementations/T04-IMPLEMENTACION.md`.
- No se ejecutó `git add`, commit, push, PR, merge, rebase ni borrado de ramas.
- Los informes de T01, T02 y T03 no se modificaron.
- `git diff --check`: exit 0.

---

## S. Recomendaciones para T05

1. Mantener `publicApproved: false` hasta recibir aprobación explícita del propietario para cada caso completo.
2. Implementar `/proyectos/[id]/` con `getStaticPaths` basado en `getPublicProjects()`; no usar `getProjects()` para publicar.
3. Reutilizar `ProjectCard` pasando `href` solo cuando la ruta exista y esté aprobada.
4. Revisar cada cuerpo MDX para retirar pendientes editoriales, evitar datos de clientes y no convertir capacidades planificadas en funciones terminadas.
5. Verificar SGAA y BoozHome antes de añadir cualquier enlace externo visible.
6. Mantener `usageApproved` como condición para imágenes y revisar metadatos/permisos de cualquier recurso nuevo.
7. Tras T05, reevaluar la navegación móvil y el chunk React en T06/T08.


---

## T. Cierre controlado — revisión final y corrección editorial (2026-10-19)

Este apartado documenta la revisión de cierre previa al commit. Conserva la historia anterior y no reescribe los resultados de implementación.

### T.1 Reconstrucción de Git

| Comprobación | Resultado |
|---|---|
| Rama | `feat/t04-portfolio-home` |
| HEAD | `07e9103` (T03 integrada en `main`) |
| Archivos modificados | 12 |
| Informe T04 | nuevo, sin seguimiento antes del cierre |
| Cambios ajenos | ninguno |
| Informes T01–T03 | intactos |
| Archivos temporales en el repositorio | ninguno |

### T.2 Revisión editorial final

Se revisaron la landing visible y el frontmatter de los cuatro MDX:

- Hero: Joel Cantero como Full Stack .NET Developer, con la especialización y ubicación confirmadas.
- Trayectoria: proyectos personales, aplicación de escritorio de 2020, origen de SGAA, plataforma web comercializada desde agosto de 2025, trabajo de extremo a extremo y colaboración puntual con profesionales de auditoría.
- Formación: «Diplomado en Ingeniería de Software Aplicada — En curso»; no se declara título universitario ni certificación obtenida.
- SGAA: SaaS en producción, SQL Server, .NET 8, ASP.NET Core, Blazor/MudBlazor, CQRS e Identity.
- AuditaPy: producto independiente en desarrollo; no se presenta como actualización desplegada de SGAA.
- ControlLote: desarrollo con validación piloto en entorno real desde agosto de 2026; histórico superior a 18 meses por empresa, sin convertirlo en antigüedad del servicio.
- BoozHome: prelanzamiento; sin enlace al dominio, sin capturas del cliente y sin declaración de producción.
- Sin métricas, clientes, testimonios, certificaciones ni años de experiencia inventados.
- Oñondive: iniciativa en construcción, subordinada a la identidad profesional.
- Contacto: correo, GitHub, YouTube e Instagram; sin disponibilidad a tiempo completo y sin WhatsApp como canal del portafolio.

### T.3 Corrección editorial de BoozHome

La revisión detectó que el cuerpo MDX de BoozHome había sustituido «Contacto por WhatsApp» por una formulación genérica. WhatsApp es una característica confirmada del producto en `docs/05-CONTENIDOS-Y-CASOS.md` y no debía eliminarse del cuerpo del caso sin justificación.

Corrección mínima aplicada:

- `src/content/projects/boozhome.mdx`: se restauró el objetivo funcional «Contacto por WhatsApp».
- La tarjeta pública mantiene el resumen genérico de «contacto» definido para la landing; la mención específica de WhatsApp se conserva en el cuerpo del caso, no en la portada.
- No se añadió WhatsApp a la sección de contacto profesional ni a la landing.
- No se modificó ningún otro cuerpo MDX.

### T.4 Control de aprobación

| Comprobación | Resultado |
|---|---|
| `cardApproved: true` en las cuatro fichas | ✔ |
| `publicApproved: false` en las cuatro fichas | ✔ |
| `usageApproved: true` en las cuatro imágenes | ✔ |
| `getApprovedProjectCards()` filtra `cardApproved` y ordena | ✔ |
| `getPublicProjects()` filtra casos completos aprobados | ✔ |
| `getProjects()` no se usa en la landing para eludir aprobaciones | ✔ |
| La landing no genera rutas `/proyectos/...` | ✔ |

### T.5 Revisión técnica

- Un único `H1`; 6 `H2` y 17 `H3` en orden jerárquico.
- HTML semántico con `header`, `nav`, `main`, `section`, `article` y `footer`.
- 6/6 enlaces de navegación con destino existente; 0 anclas rotas.
- CTAs reales; 0 `<button>` inactivos y 0 `href` vacíos.
- 0 `<script>`, 0 `astro-island` y 0 directivas `client:` en el HTML generado.
- Sin duplicación manual de los datos de proyectos en la landing.
- Sin enlaces a repositorios privados.
- `output: 'static'` y ausencia de adaptador SSR.

### T.6 Validación técnica final

| Comando | Exit |
|---|---:|
| `corepack pnpm install --frozen-lockfile` | 0 |
| `corepack pnpm exec astro sync` | 0 |
| `corepack pnpm exec astro check` | 0 (18 archivos, 0 errores/warnings/hints) |
| `corepack pnpm run build` | 0 (1 página estática) |
| `git diff --check` | 0 |

### T.7 Comprobación final en navegador

Chrome headless `155.0.8059.84` con Chrome DevTools Protocol sobre `astro preview`:

- `/` respondió HTTP 200.
- 4 tarjetas visibles: SGAA, ControlLote, AuditaPy y BoozHome.
- Sin overflow horizontal en 320, 375, 768, 1024 y 1440 px (`documentWidth` igual al viewport).
- 0 enlaces internos rotos y 0 `href` vacíos.
- Las cuatro imágenes SVG cargaron correctamente tras entrar en viewport y `decode()` (`naturalWidth: 320`, `naturalHeight: 180`).
- Skip link: primer `Tab` lo enfoca; `Enter` lleva el foco a `main#contenido`.
- Foco visible con contorno de 2 px.
- Sin errores de consola, excepciones, solicitudes fallidas ni respuestas HTTP >= 400.
- No se encontraron textos temporales de T02 en la vista.

### T.8 Estado de Git al cierre editorial

- 12 archivos modificados y `docs/implementations/T04-IMPLEMENTACION.md` nuevo.
- Sin cambios ajenos ni informes históricos alterados.
- Sin archivos temporales en el repositorio.
- El staging, commit, push y PR se ejecutan a continuación conforme a la autorización expresa de cierre. Este informe se incluye en el mismo commit.
- T05 no fue iniciada.
