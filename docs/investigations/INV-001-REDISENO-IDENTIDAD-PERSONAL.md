# INV-001 — Diagnóstico y propuesta de rediseño: identidad personal con estética inspirada en FSH

- **Tipo:** investigación de solo lectura (no es una tarea `Txx` ni modifica código).
- **Fecha:** 2026-10-20
- **Rama de análisis:** `feat/t08-github-pages-cicd`
- **Commit de partida:** `89cd826` (árbol limpio; 1 commit por delante de `main`, T08 aún sin integrar).
- **Estado:** propuesta pendiente de validación por el propietario. Ninguna decisión aquí descrita está aprobada.

## Fuentes consultadas

- Repositorio: `README.md`, `AGENTS.md`, `docs/01` a `docs/05`, `docs/adr/ADR-001-STATIC-ASTRO.md`, `docs/implementations/T08-IMPLEMENTACION.md`, todo `src/`, `astro.config.mjs`, `package.json`, `components.json`.
- FullStackHero (https://fullstackhero.net/): HTML y CSS públicos inspeccionados el 2026-10-20 **solo para observación**, con copia temporal fuera del repositorio. No se ha incorporado ningún código, asset ni texto de FSH.
- No se ejecutaron `pnpm build` ni `astro check`: no eran necesarios para un análisis sin cambios.

## Restricciones del repositorio que condicionan la propuesta

1. **Originalidad:** `AGENTS.md`, `docs/01-PRD.md §10` y `docs/02-DISENO-VISUAL.md §1` prohíben copiar código, logos, textos o la composición exacta de FSH. La petición de «replicar fielmente la sutileza» se interpreta como reproducir el *principio visual* con implementación propia. Los fragmentos de este documento están escritos desde cero.
2. **Fuera del backlog:** el rediseño no figura en `docs/04-PLAN-DE-TAREAS.md`. T09 (QA y lanzamiento) validaría un diseño que va a cambiar; hay que añadir tareas nuevas y actualizar la documentación de diseño antes de implementar.
3. **Foto personal:** `docs/02-DISENO-VISUAL.md §6` define el hero con «ilustración abstracta y propia» y contempla la foto personal solo en «Sobre mí» y si se autoriza. Usarla en el hero exige cambiar la especificación. La foto no existe en el repositorio y debe aportarla el propietario.

---

## 1. Diagnóstico de arquitectura y estilos

### Estructura

Astro 7.4 estático (`output: 'static'`, `trailingSlash: 'always'`):

- `src/layouts/`: `BaseLayout.astro`, `CaseStudyLayout.astro`.
- `src/components/layout/`: `SiteHeader`, `MobileNavigation`, `ThemeSwitcher`, `SiteFooter`, `Container`.
- `src/components/ui/`: `ButtonLink`, `Surface`, `ProjectCard`, `StatusBadge`, `TechBadge`, `SectionHeading`, `ProjectIllustration`.
- Datos centralizados en `src/data/profile.ts` y `src/data/navigation.ts`.
- Proyectos como Content Collection MDX validada con Zod (`src/content.config.ts`).

### Assets

Todo en `public/`: SVG originales por proyecto con variante `-light` e imagen OG. No se usa `astro:assets`; para una fotografía conviene usarlo (AVIF/WebP y tamaños responsivos).

### Motor de estilos

Tailwind CSS v4 con `src/styles/global.css` como única fuente de tokens:

- Colores definidos con `light-dark()` en `:root` (valor claro y oscuro por token). Buena base: el rediseño cambia valores, no la arquitectura.
- Tokens shadcn/ui derivados de la paleta, Geist Variable autoalojada y escala tipográfica propia (`text-hero`, `text-display`, `text-title`, `text-lead`, `text-label`).
- shadcn/ui configurado (`radix-nova`), sin componentes React en `src/`. Toda la interactividad es Astro + `<script>`, coherente con T06.

### Tema oscuro

Tres estados (Sistema / Claro / Oscuro):

- Script inline en `src/layouts/BaseLayout.astro:75` que evita el destello inicial.
- `src/components/layout/ThemeSwitcher.astro`: botón de 44 px (`size-11 rounded-lg`) que abre un panel con tres radios.
- Las ilustraciones de proyecto dependen de `data-appearance` (`src/styles/global.css:198-236`).

### Comportamiento y fluidez

- Home de una página con anclas y `scroll-smooth`; casos de estudio como páginas completas que vuelven con `/#ancla`.
- JS mínimo: tema, menú móvil y script inline.
- Sin prefetch. Activar `prefetch` de Astro haría casi instantánea la navegación home → caso sin JS de framework; es la mejora de fluidez más barata. No se recomienda `ClientRouter` por ahora (más JS y complejidad).
- Abundancia de bandas horizontales (`border-y` + `bg-surface/40` en Especialidades, Proceso y Contacto; `border-b` en el hero). Produce sensación de bloques corporativos apilados, contraria a la continuidad de FSH sobre un fondo con textura.

---

## 2. Comparativa: portafolio actual vs. FSH

| Pilar | Portafolio actual | FSH (observado 2026-10-20) | Propuesta |
|---|---|---|---|
| Fondo | Color plano navy `#0B1019`, sin patrón. | Casi negro neutro `#0d0e11` con retícula de **puntos** (~24 px) desvanecida con máscara radial; resplandor difuminado animado. | Retícula propia (líneas o puntos) con máscara radial y tokens `light-dark()`. Sin resplandor animado detrás del texto; la animación se concentra en el retrato. |
| Ancho del header | `max-w-[1160px]` (`Container` por defecto). | `max-w-7xl` (1280 px). | `Container size="wide"` (1280 px) o variante de 1320 px. |
| Alto del header | ~77 px (`--site-header-height: calc(4.75rem + 1px)`, `py-4`). | 64 px (`h-16`). | 56 px (`h-14`). |
| Línea inferior | `border-b border-border` fija (`src/components/layout/SiteHeader.astro:30`). | Sin línea en reposo; línea tenue al hacer scroll. | Eliminarla por completo; separación mediante `bg-background/80` + desenfoque ligero (o fondo sólido). |
| Navegación | 6 elementos (`src/data/navigation.ts:4-11`). | 4 elementos en píldora centrada. | 4: Inicio, Sobre mí, Proyectos, Contacto. Ya era la especificación de `docs/02-DISENO-VISUAL.md §6`; la implementación se había desviado. |
| Logo JC | Cuadrado `size-9 rounded-md` + nombre. | Imagen de 28 px redondeada + marca textual. | Círculo `size-8 rounded-full`, borde sutil, «JC» en mono; nombre visible desde `sm`. |
| Toggle de tema | 44 px, `rounded-lg`, panel de 3 opciones. | 32 px circular, un clic alterna, borde casi invisible. | 32 px circular con área táctil ampliada a 40 px mediante pseudo-elemento (cumple WCAG 2.5.8). |
| Paleta | Navy azulado; acento azul pastel `#91B8FF`. | Zinc neutro; primario verde (`#15803d` / `#4ade80`); acento ámbar (`#e8a54b`). Color reservado a puntos de interacción. | Neutralizar el fondo (menos azul) y mantener un acento propio. No adoptar el verde de FSH (es su identidad). |
| Tipografía | Geist Variable + mono del sistema. | Outfit (titulares), Figtree (texto), JetBrains Mono. | Mantener Geist (autoalojada, OFL) y añadir Geist Mono para etiquetas. |

### Uso del acento

Lo atractivo de FSH es la **disciplina cromática**: casi todo es gris neutro y el acento se reserva para CTA primario, anillo de foco, estado activo y un único elemento decorativo. Propuesta: acento solo en CTA, foco, hover de navegación, *kicker* y anillo del retrato. Hoy `text-primary` aparece además en numeradores, badges y fechas. Cualquier cambio de color debe repetir la verificación de contraste de T07.

---

## 3. Del tono de «venta de software» a una marca personal

### 3.1 Auditoría de copywriting

Las propuestas son borradores para validar. Solo usan hechos confirmados en `docs/05-CONTENIDOS-Y-CASOS.md §2` y en el contenido actual: autodidacta, C#/.NET, Asunción, origen de SGAA en 2020, diplomado en curso y Oñondive como iniciativa. No añaden años de experiencia, clientes ni disponibilidad.

| Ubicación | Texto actual | Problema | Propuesta |
|---|---|---|---|
| `src/data/profile.ts:12` | «Software para problemas reales. Diseñado para evolucionar.» | Eslogan de producto. | «Hola, soy Joel. Desarrollo software con C# y .NET.» |
| `src/data/profile.ts:13-14` | «Desarrollo soluciones empresariales de extremo a extremo…» | Propuesta comercial. | «Aprendí a programar por mi cuenta. Hoy construyo aplicaciones web para la gestión de auditorías y otros procesos, desde el análisis hasta el despliegue.» |
| `src/data/profile.ts:15` | «Abierto a oportunidades profesionales y colaboraciones» | `docs/01-PRD.md §12` prohíbe afirmar disponibilidad sin confirmación. | Eliminar o confirmar explícitamente. |
| `src/pages/index.astro:112` | «Explorar proyectos» | Ligeramente de producto. | «Ver mis proyectos» |
| `src/pages/index.astro:119` | «… · Trabajo de extremo a extremo» | Muletilla repetida. | «Asunción, Paraguay» |
| `src/pages/index.astro:128,166` | «sistema / portafolio», «Del problema al despliegue» | Tarjeta que imita un dashboard de producto. | Sustituir (ver §4). |
| `src/pages/index.astro:181` | «Del problema al software que evoluciona» | Eslogan. | «Cómo llegué hasta aquí» |
| `src/pages/index.astro:25` | «Productos … pensados para crecer sin perder orden» | Discurso de venta SaaS. | «He construido plataformas donde cada empresa gestiona sus propios datos y usuarios.» |
| `src/pages/index.astro:250-251` | «Cuatro áreas, una mirada de extremo a extremo» / «La profundidad técnica se adapta a cada problema, no al revés» | Pretencioso. | «En qué trabajo» / «Las áreas en las que más he aprendido construyendo proyectos reales.» |
| `src/pages/index.astro:279` | «Del análisis al despliegue» | Muletilla. | «También me ocupo de los servidores» |
| `src/pages/index.astro:322` | «Productos construidos sobre problemas concretos» | Catálogo de productos. | «Proyectos en los que he trabajado» |
| `src/pages/index.astro:349-350` | «Un proceso, no una plantilla» / «Un enfoque personal para reducir incertidumbre…» | Tono de consultoría. | «Cómo trabajo» / «Lo que intento hacer en cada proyecto.» |
| `src/pages/index.astro:391,395` | «soluciones tecnológicas para necesidades reales del mercado paraguayo», «crecer con quienes lo utilizan» | Tono de *startup pitch*. | «Oñondive es una idea que estoy madurando: un espacio propio para los proyectos que quiero construir en Paraguay.» |
| `src/pages/index.astro:407` | «Contacto profesional» | «Profesional» innecesario. | «Hablemos» |
| `src/pages/index.astro:411-412` | «…oportunidad profesional… redes profesionales» | Repetitivo y rígido. | «Si quieres comentarme algo, escríbeme. Respondo por correo.» |
| `src/pages/index.astro:427` | «Correo profesional» | Pedido explícito del propietario. | «Correo» o «Escríbeme» |
| `src/pages/index.astro:437`, `src/components/layout/SiteFooter.astro:27` | `aria-label` «Redes profesionales» / «Enlaces profesionales» | Mismo patrón. | «Redes» / «Dónde encontrarme» |
| `src/components/layout/SiteFooter.astro:22-23` | «Software para problemas reales. Aplicaciones empresariales…» | Eslogan duplicado. | «Desarrollador de software en Asunción, Paraguay.» |
| `src/content/projects/auditapy.mdx:4`, `src/content/projects/controllote.mdx:4` | «Producto SaaS independiente», «prepara su disponibilidad comercial» | Comercial, aunque describe el proyecto. | Primera persona («Proyecto que estoy desarrollando…»). Decisión editorial del propietario. |

**Documentación afectada:** `docs/01-PRD.md §2` («Propuesta de valor») y `docs/02-DISENO-VISUAL.md §2` («Titular sugerido») recomiendan el tono de eslogan que se quiere eliminar; deberían actualizarse antes de cambiar el copy.

### 3.2 Hallazgo fuera de alcance (veracidad)

`src/layouts/CaseStudyLayout.astro:117` antepone `+` a todas las cifras (`+{fact.value}`). «26 empresas registradas» se muestra como «+26», que se lee como «más de 26». Si los valores son exactos, contradice la regla de no exagerar métricas. Registrado, no corregido.

---

## 4. Especificación técnica del nuevo Home

### 4.1 Estructura

```text
[Header 56px · ancho 1280 · sin línea]  (JC)  Inicio  Sobre mí  Proyectos  Contacto   (◐)
┌──────────────────────── fondo con retícula enmascarada ───────────────────────┐
│  ┌─ Izquierda (presentación) ────────────┐   ┌─ Derecha (opcional) ─────────┐ │
│  │  ◯ foto 176px + anillo animado        │   │  «Ahora mismo»               │ │
│  │  DESARROLLADOR DE SOFTWARE · PARAGUAY │   │  · SGAA — en producción      │ │
│  │  Hola, soy Joel.                      │   │  · AuditaPy — en desarrollo  │ │
│  │  Bajada personal (2 líneas)           │   │  · Diplomado — en curso      │ │
│  │  [Ver mis proyectos] [Escríbeme]      │   └──────────────────────────────┘ │
│  └───────────────────────────────────────┘                                    │
└───────────────────────────────────────────────────────────────────────────────┘
```

La columna derecha sustituye la tarjeta «sistema / portafolio» por datos reales ya publicados. En móvil la foto queda centrada arriba.

### 4.2 Retícula de fondo (`src/styles/global.css`)

```css
:root {
  --grid-line: light-dark(oklch(0.30 0.02 260 / 0.07), oklch(0.96 0.01 260 / 0.055));
  --grid-size: 2rem;
}

/* Variante líneas: «pequeñas cuadrículas» */
@utility bg-grid {
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%);
}

/* Variante puntos (más próxima a la sensación de FSH) */
@utility bg-dots {
  background-image: radial-gradient(var(--grid-line) 1.2px, transparent 1.6px);
  background-size: 1.75rem 1.75rem;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 100%);
}
```

Uso en `src/layouts/BaseLayout.astro` (capa decorativa sin JS ni red):

```astro
<body class="relative isolate flex min-h-dvh flex-col">
  <div aria-hidden="true" class="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh]"></div>
```

### 4.3 Retrato con anillo en movimiento circular

Se rota con `transform` un pseudo-elemento con `conic-gradient` (compuesto en GPU, coste casi nulo). Se descarta animar una propiedad `@property --angle`, que obliga a repintar en cada fotograma.

```astro
---
// src/components/home/ProfilePortrait.astro
import { Picture } from 'astro:assets';
import portrait from '@/assets/profile/joel-cantero.jpg'; // aportada por el propietario, sin EXIF

interface Props { class?: string }
const { class: className } = Astro.props;
---
<div class:list={['portrait-ring', className]}>
  <Picture
    src={portrait}
    formats={['avif', 'webp']}
    widths={[176, 352]}
    sizes="(min-width: 640px) 176px, 144px"
    alt="Fotografía de Joel Cantero"
    loading="eager"
    fetchpriority="high"
    pictureAttributes={{ class: 'block size-full' }}
    class="portrait-ring__img"
  />
</div>
```

```css
@layer components {
  .portrait-ring {
    position: relative;
    isolation: isolate;
    inline-size: clamp(9rem, 18vw, 11rem);
    aspect-ratio: 1;
    border-radius: 9999px;
    padding: 2px;                          /* grosor del anillo */
    overflow: hidden;                      /* recorta el gradiente, no la sombra propia */
    box-shadow:
      0 0 0 1px color-mix(in oklab, var(--border) 70%, transparent),
      0 28px 56px -28px color-mix(in oklab, var(--brand) 55%, transparent),
      0 14px 28px -18px rgb(0 0 0 / 0.45);
  }

  /* Anillo base: el borde nunca desaparece del todo */
  .portrait-ring::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -2;
    border-radius: inherit;
    background: var(--border);
  }

  /* Gradiente que orbita */
  .portrait-ring::before {
    content: "";
    position: absolute;
    inset: -50%;                           /* cubre el círculo en cualquier ángulo */
    z-index: -1;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      color-mix(in oklab, var(--brand) 90%, transparent) 60deg,
      transparent 130deg,
      transparent 200deg,
      color-mix(in oklab, var(--positive) 60%, transparent) 260deg,
      transparent 330deg
    );
    animation: portrait-orbit 12s linear infinite;
  }

  .portrait-ring__img {
    inline-size: 100%;
    block-size: 100%;
    border-radius: 9999px;
    border: 3px solid var(--background);   /* separación entre anillo y foto */
    object-fit: cover;
    background: var(--surface);
  }
}

@keyframes portrait-orbit {
  to { transform: rotate(1turn); }
}

@media (prefers-reduced-motion: reduce) {
  .portrait-ring::before { animation: none; }
}
```

Notas:

- 12 s por vuelta con dos arcos cortos: movimiento orgánico perceptible por visión periférica, sin competir con el texto.
- Con movimiento reducido el anillo queda estático.
- La foto será probablemente el LCP del home; por eso `loading="eager"` y `fetchpriority="high"`.

### 4.4 Header y toggle (esqueleto)

```astro
<header class="fixed inset-x-0 top-0 z-40 bg-background/80 backdrop-blur-md">
  <Container size="wide" class="flex h-14 items-center justify-between gap-4">
    <a href={brandHref} class="inline-flex items-center gap-2.5 rounded-full">
      <span aria-hidden="true"
        class="grid size-8 place-items-center rounded-full border border-border/70 bg-card font-mono text-[0.6875rem] font-semibold text-primary">JC</span>
      <span class="hidden text-sm font-semibold tracking-tight sm:inline">{siteName}</span>
    </a>
    <nav aria-label="Navegación principal" class="hidden md:block">
      <ul class="flex items-center gap-1 text-[0.8125rem]">
        {nav.map((item) => (
          <li><a href={item.href}
            class="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground">{item.label}</a></li>
        ))}
      </ul>
    </nav>
    <div class="flex items-center gap-2"><ThemeToggle /><MobileNavigation … /></div>
  </Container>
</header>
```

- **Toggle:** `<button>` `size-8 rounded-full border-border/70` con `after:absolute after:-inset-1` para el área táctil; `aria-label` dinámico («Cambiar a tema claro» / «Cambiar a tema oscuro»).
- **Lógica:** sin preferencia guardada sigue al sistema; el clic alterna claro/oscuro y lo persiste. Mantener `data-appearance` sincronizado por las ilustraciones de proyecto.
- **Variables:** `--site-header-height` pasa a `3.5rem` (afecta a `main { padding-top }` y `scroll-padding-top`).
- **Glassmorphism:** `docs/02-DISENO-VISUAL.md §5` lo desaconseja como estilo base. Un `backdrop-blur` limitado al header es un uso puntual defendible; alternativa: fondo sólido.

---

## 5. Plan de refactorización propuesto

Tareas nuevas, una por iteración, cada una con su informe `docs/implementations/Txx-IMPLEMENTACION.md`:

| Paso | Contenido | Archivos principales |
|---|---|---|
| 0. Prerrequisito | Integrar T08 (PR y merge) y crear la rama del rediseño desde `main`. | — |
| 1. Documentación | Actualizar `docs/02-DISENO-VISUAL.md` (dirección visual, paleta, header, hero con foto), `docs/01-PRD.md §2` (tono personal) y `docs/04-PLAN-DE-TAREAS.md` (tareas nuevas antes de T09). Posible ADR-002 «Rediseño de identidad personal». | `docs/` |
| 2. Tokens y fondo | Paleta neutralizada, `--grid-line`, utilidades `bg-grid`/`bg-dots`, Geist Mono, reducción de bandas `border-y`. | `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `package.json` |
| 3. Header y navegación | 4 elementos, 56 px, ancho 1280, sin línea, JC circular, toggle circular de 32 px. | `src/components/layout/SiteHeader.astro`, `ThemeSwitcher.astro` (reescritura), `MobileNavigation.astro`, `src/data/navigation.ts` |
| 4. Copy | Reemplazos de §3.1 aprobados por el propietario. | `src/data/profile.ts`, `src/pages/index.astro`, `src/components/layout/SiteFooter.astro`, opcionalmente MDX |
| 5. Hero con retrato | `ProfilePortrait.astro`, foto en `src/assets/`, nueva columna derecha. | `src/pages/index.astro`, componente nuevo |
| 6. QA | `astro check`, `build`, viewports 320–1440, contraste, teclado, `prefers-reduced-motion`, LCP. | Informe de la tarea |

---

## 6. Riesgos y decisiones pendientes

1. **Foto:** aportación y autorización de publicación por el propietario; eliminar metadatos EXIF antes de versionarla.
2. **Numeración:** insertar el rediseño como tareas nuevas antes de T09 (p. ej. T09–T12) y renumerar QA/lanzamiento.
3. **Fondo:** retícula de líneas («pequeñas cuadrículas») o de puntos (más fiel a la sensación de FSH).
4. **Toggle:** 2 estados (claro/oscuro, sistema solo por defecto) como FSH; implica perder la opción explícita «Sistema» tras elegir un tema.
5. **Acento:** mantener el azul propio o explorar otro tono; se desaconseja el verde de FSH.
6. **Columna derecha del hero:** bloque «Ahora mismo» con datos reales, o hero a una sola columna.
7. **Disponibilidad profesional:** confirmar o eliminar.
8. **Contraste:** todo cambio de paleta y la opacidad de la retícula requieren nueva verificación de contraste.
9. **Rendimiento:** la foto se convierte en candidata a LCP; validar peso y formato tras implementarla.

## 7. Siguiente paso recomendado (no implementado)

Paso 1 del plan: actualizar documentación de diseño, PRD y backlog con las decisiones que tome el propietario sobre §6. Solo después tocar código.
