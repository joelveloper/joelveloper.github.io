# Arquitectura técnica — Portafolio estático Astro

**Versión:** 1.0 · 2026-10-18  
**Estado:** decisión propuesta; implementar por tareas en `04-PLAN-DE-TAREAS.md`.

## 1. Decisión

Generar un sitio 100% estático con Astro. Emplear Tailwind CSS v4 para estilos, shadcn/ui **sobre Radix** y React solo en componentes que precisan estado o accesibilidad interactiva. Los casos de estudio y sus metadatos residirán en Content Collections y MDX. Publicar con GitHub Pages y GitHub Actions.

La justificación se encuentra en `adr/ADR-001-STATIC-ASTRO.md`.

## 2. Dependencias

| Grupo | Tecnología | Observación |
|---|---|---|
| Núcleo | Astro actual compatible | Fijar versión real en `package.json` y lockfile al implementar |
| Lenguaje | TypeScript estricto | `astro/tsconfigs/strict` y paths aliases |
| Estilos | Tailwind CSS 4 | Tokens semánticos, una fuente de verdad |
| UI | shadcn/ui CLI, Radix | Inicializar explícitamente con `--base radix` |
| Interactividad | React, `@astrojs/react` | Islands; evitar SPA global |
| Contenido | `@astrojs/mdx`, Content Collections | `src/content.config.ts`, `glob()` y Zod |
| SEO | `@astrojs/sitemap`, OG estáticas | Metadatos por proyecto, `site` correcto |
| Calidad | `astro check`, ESLint, Prettier, Playwright smoke | Configurar por tareas; sin tooling superfluo |
| Entrega | GitHub Actions y Pages | Actions como fuente de Pages |

**CLI orientativo a contrastar con la versión actual:**

```bash
pnpm dlx shadcn@latest init -t astro --base radix
# Confirmar opciones del scaffold interactivo, React y Tailwind v4.
# Después: pnpm exec astro add mdx sitemap (o equivalente soportado).
```

Si se parte de un Astro scaffold existente, configurar `@astrojs/react`, Tailwind, alias `@/*` e invocar `shadcn init --base radix`. Evitar ejecutar un segundo scaffold que reemplace el proyecto. El agente debe comprobar la ayuda del CLI y la documentación instalada en el momento de T01.

## 3. Estructura objetivo

```text
joelveloper.github.io/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── AGENTS.md
├── README.md
├── astro.config.mjs
├── components.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── docs/
│   ├── 01-PRD.md
│   ├── 02-DISENO-VISUAL.md
│   ├── 03-ARQUITECTURA.md
│   ├── 04-PLAN-DE-TAREAS.md
│   ├── 05-CONTENIDOS-Y-CASOS.md
│   ├── 06-CALIDAD-Y-VALIDACION.md
│   └── adr/
├── prompts/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/projects/           # Solo activos aprobados
└── src/
    ├── components/
    │   ├── astro/                  # Header, Hero, ProjectCard, Footer...
    │   ├── interactive/            # React islands si se precisan
    │   └── ui/                     # componentes generados de shadcn
    ├── content/
    │   └── projects/
    │       ├── sgaa.mdx
    │       ├── auditapy.mdx
    │       ├── controllote.mdx
    │       └── boozhome.mdx
    ├── content.config.ts
    ├── data/
    │   ├── profile.ts
    │   └── navigation.ts
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── CaseStudyLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── 404.astro
    │   └── proyectos/[id].astro
    └── styles/
        └── global.css
```

La estructura es objetivo, no afirmación de existencia. Se admite ajustar carpetas por convención oficial vigente, dejando registro de la divergencia.

## 4. Flujo de datos y renderizado

```text
MDX frontmatter + contenido
         │
         ▼
Astro Content Collection + esquema Zod
         │
     build estático
         │
         ├──→ /  (tarjetas + enlaces)
         ├──→ /proyectos/sgaa/
         ├──→ /proyectos/auditapy/
         ├──→ /proyectos/controllote/
         └──→ /proyectos/boozhome/
         │
         ▼
GitHub Actions → GitHub Pages → HTML/CSS/JS mínimo
```

- No dependencias de red en runtime para renderizar proyectos.
- Sin llamada al GitHub API para contar commits, seguidores o contribuciones.
- React únicamente en las islas estrictamente necesarias (`client:load` si la interacción es crítica y visible; `client:idle`/`client:visible` cuando procede).
- Componentes React sin directiva `client:*` se prerenderizan sin hidratar.

## 5. Colección `projects` (modelo propuesto)

Schema en `src/content.config.ts` usando `defineCollection`, `glob()` y `z` de Astro. Tipos representativos:

```ts
{
  title: string;                 // requerido
  summary: string;               // 80–280 caracteres recomendados
  category: 'saas' | 'client';
  status: 'production' | 'development' | 'prelaunch';
  featuredOrder: number;
  technologies: string[];
  repositoryVisibility: 'private';
  caseStudyStage: 'outline' | 'documented' | 'verified';
  publicApproved: boolean;       // falso hasta revisión editorial
  externalUrl?: string;          // validar protocolo HTTPS
  image?: {src:string; alt:string; usageApproved:boolean};
  lastReviewed: string;          // YYYY-MM-DD
  facts?: Array<{label:string; value:string; evidenceNote:string}>;
}
```

- Identificador derivado del nombre del archivo MDX (si la versión instalada expone IDs así); generar con `getStaticPaths` desde la colección.
- Validar `status`, duplicados de orden, enlaces y capturas antes de publicar.
- `publicApproved=false` excluye el contenido de producción y obliga al pipeline a reportar fichas faltantes; el MVP necesita aprobación para las cuatro fichas.
- El campo `facts` **no** implica poner un contador visual. Solo usarlo si la prueba es verificable y apta para divulgación.
- Si `image` está ausente, mostrar una abstracción CSS/SVG original y descriptiva sin fingir ser screenshot.
- El contenido MDX es **de confianza** y mantenido en el repo: no aceptar MDX cargado por usuarios.

## 6. Contrato de SEO

- `site: 'https://joelveloper.github.io'` en `astro.config.mjs`, `output: 'static'`.
- No configurar `base` para un repositorio de sitio de usuario; rutas desde `/`.
- `trailingSlash: 'always'` como convención sugerida, homogénea en enlaces y canonicals.
- Cada ruta: `title` (descriptivo), `meta description`, canonical absoluto, OG title/description/type y `og:image` únicamente con recurso válido.
- `sitemap.xml` construido con integración oficial y `robots.txt` sin rutas secretas.
- `lang="es"`, HTML semántico, `404` apropiado, favicon original.
- OG global opcional hecho de forma propia; no usar imágenes ni logos de clientes sin licencia.

## 7. Despliegue y CI

**Ramas:** PRs hacia `main`; CI sin despliegue para PR, Pages desde `main` tras merge.

CI mínimo: instalar con lockfile, `astro check`, lint, build y smoke de rutas generadas. No exponer secretos; Actions con permisos mínimos. Deployment oficial con `withastro/action` y `actions/deploy-pages` según documentación de la versión utilizada. Configurar Pages → Source: GitHub Actions.

Para un sitio de usuario en `joelveloper.github.io` no se requiere `/joelveloper.github.io/` como prefijo de ruta.

No crear dominio personalizado aún; cuando exista, registrar ADR para DNS, canonical, redirect y verificación HTTPS.

## 8. Seguridad y privacidad

- Ninguna clave de API, variable sensible o `.env` personal debe versionarse.
- No recibir datos de formularios porque no habrá formulario remoto.
- No añadir Google Analytics, widgets de terceros, cookies, capturas de CRM ni scripts publicitarios por defecto.
- Enlaces externos: `rel="noopener noreferrer"` si se usa `target="_blank"`.
- No mostrar números de teléfono, correos de terceros, contratos, facturas o PDFs con información identificable.
- Mantener licencias de librerías y atribuciones que correspondan.

## 9. Estrategia de pruebas

- **Build y tipos:** `pnpm exec astro check`, `pnpm build`.
- **Contenido:** comprobar cuatro IDs, categorías, estados, URLs y aprobación editorial.
- **Smoke:** `/`, cada detalle y 404; no links internos rotos.
- **Navegación:** header, CTA, menú móvil, foco visible y botón de regreso.
- **Visual:** viewport 320/375/768/1024/1440; textos sin desbordes.
- **Accesibilidad:** axe + revisión manual de teclado y `prefers-reduced-motion`.
- **Performance:** Lighthouse orientativo en build publicado y evaluación de JS cargado.

## 10. Versionado y mantenimiento

- Convención sugerida: `feat(portfolio): ...`, `docs: ...`, `fix(a11y): ...`, `chore(ci): ...`.
- Cada PR enlaza una tarea Txx, declara criterios de aceptación y aporta evidencia de pruebas.
- No actualizar dependencias mayores por inercia; generar lockfile y fijar versiones reproducibles.
- Prohibido introducir un monorepo, microservicios, CMS o backend sin ADR que lo justifique.
