# Informe de implementación — T03

**Tarea:** T03 — Colección y contenido inicial
**Fecha:** 2026-10-18
**Estado:** implementado y validado localmente; pendiente de aprobación editorial y de autorización para versionar.

## A. Diagnóstico inicial del repositorio

- `main` local estaba en `9d68613` (merge de T02) y `origin/main` ya había avanzado a `7b3cf10` por el squash de DOC-01 (PR #3).
- Se actualizó `main` con `git merge --ff-only origin/main` a `7b3cf10`.
- No existían `src/content.config.ts`, `src/content/`, `src/data/` ni `public/`.
- No existía la integración `@astrojs/mdx`.
- `SiteHeader.astro` y `SiteFooter.astro` contenían identidad y enlaces de contacto hardcodeados.
- `src/pages/index.astro` definía su propia navegación en línea.
- El informe `docs/implementations/T01-IMPLEMENTACION.md` ya está versionado en `main`; no se modificó.

## B. Rama y HEAD de partida

- Rama creada: `feat/t03-content-model`
- Commit de partida: `7b3cf10 docs: establish implementation report policy (#3)`
- Árbol limpio al iniciar.

## C. Objetivo y alcance

Definir el modelo de contenido del portafolio y las cuatro fichas iniciales, con datos tipados, gate editorial y datos de perfil centralizados, sin adelantar las páginas de T04/T05.

**Incluido**

- Colección `projects` en `src/content.config.ts` con loader `glob()` y esquema Zod.
- Cuatro entradas MDX: SGAA, ControlLote, AuditaPy y BoozHome.
- Campo `publicApproved` y helper de lectura con gate.
- Centralización de identidad y canales en `src/data/`.
- Imágenes fallback originales (abstracciones SVG propias).
- Integración `@astrojs/mdx`.

**Excluido**

- Rutas de landing y detalle (`/`, `/proyectos/[id]/`): pertenecen a T04/T05.
- Navegación móvil, islas React y cualquier cambio de diseño de T02.
- Métricas, capturas, logos, URLs externas no verificadas.

## D. Decisiones de implementación

1. **Loader y esquema.** `defineCollection` con `glob({ pattern: '**/*.mdx', base: './src/content/projects' })`, `z` desde `astro/zod` (Zod v4 en Astro 7.4.0) y `defineCollection` desde `astro:content`.
2. **Validaciones del esquema.** `status` limitado a `production | development | prelaunch`; `category` a `saas | client`; `repositoryVisibility` fijado a `private`; `summary` entre 80 y 280 caracteres; `lastReviewed` con formato `YYYY-MM-DD`; `externalUrl` validado como URL HTTPS; `image.src` obligado a ruta absoluta desde la raíz pública.
3. **Gate editorial.** `publicApproved` es `false` en las cuatro fichas. `getPublicProjects()` filtra por ese campo y `getProjects()` devuelve todo el catálogo ordenado por `featuredOrder`.
4. **Estados.** SGAA `production`; AuditaPy y ControlLote `development`; BoozHome `prelaunch`.
5. **Orden editorial.** SGAA (1), ControlLote (2), AuditaPy (3), BoozHome (4), conforme a la preferencia de T02/PRD por abrir con SGAA y ControlLote.
6. **Tecnologías.** Solo se listan stacks declarados en `docs/05-CONTENIDOS-Y-CASOS.md` (ControlLote y BoozHome). SGAA y AuditaPy quedan con `technologies: []` porque el repositorio no confirma su stack; no se inventó.
7. **Enlaces externos.** Ninguna ficha define `externalUrl`: SGAA tiene un sitio de referencia con accesibilidad y derechos pendientes, y BoozHome no tiene dominio activo confirmado.
8. **Imágenes.** Se crearon cuatro SVG abstractos y originales en `public/images/projects/`. No simulan capturas ni reproducen interfaces reales; `usageApproved: true` porque son obra propia.
9. **Datos de perfil.** `src/data/profile.ts` centraliza nombre, monograma, rol, ubicación, correo, GitHub, YouTube, Instagram e iniciativa Oñondive. `src/data/navigation.ts` centraliza la navegación actual y los enlaces de contacto.
10. **Instalación de MDX.** `astro add mdx --yes` falló porque el CLI intenta invocar `pnpm` directamente y no hay shim global (se usa Corepack). Se aplicó el equivalente exacto: `corepack pnpm add @astrojs/mdx@^8.1.0 @astrojs/markdown-satteri@^0.4.4` y edición manual de `astro.config.mjs`.

## E. Archivos creados

- `src/content.config.ts` — colección `projects` y esquema Zod.
- `src/content/projects/sgaa.mdx`
- `src/content/projects/controllote.mdx`
- `src/content/projects/auditapy.mdx`
- `src/content/projects/boozhome.mdx`
- `src/data/profile.ts`
- `src/data/navigation.ts`
- `src/lib/projects.ts` — `getProjects()` / `getPublicProjects()`.
- `public/images/projects/sgaa.svg`
- `public/images/projects/auditapy.svg`
- `public/images/projects/controllote.svg`
- `public/images/projects/boozhome.svg`
- `docs/implementations/T03-IMPLEMENTACION.md` — este informe.

## F. Archivos modificados

- `astro.config.mjs` — se añadió `mdx()` a `integrations`, conservando `site`, `output: 'static'`, `trailingSlash: 'always'`, React, Tailwind y alias `@`.
- `package.json` — dependencias `@astrojs/mdx` y `@astrojs/markdown-satteri`.
- `pnpm-lock.yaml` — solo las entradas de las dos dependencias añadidas.
- `src/components/layout/SiteHeader.astro` — defaults de nombre y monograma desde `profile`.
- `src/components/layout/SiteFooter.astro` — nombre y enlaces desde `profile`/`contactLinks`; se retiraron props y literales duplicados.
- `src/pages/index.astro` — navegación desde `mainNavigation` y URL de GitHub desde `profile`.

## G. Archivos eliminados

Ninguno.

## H. Dependencias añadidas

| Paquete | Versión | Motivo |
|---|---|---|
| `@astrojs/mdx` | `^8.1.0` (instalada `8.1.0`) | Renderizar las entradas MDX de la colección. |
| `@astrojs/markdown-satteri` | `^0.4.4` (instalada `0.4.4`) | Peer dependency requerida por `@astrojs/mdx` 8.1.0. |

No se actualizó ninguna dependencia preexistente.

## I. Comandos ejecutados y resultados reales

| Comando | Exit | Resultado |
|---|---:|---|
| `corepack pnpm exec astro add mdx --yes` | 1 | Falló con `spawn pnpm ENOENT`; no modificó `astro.config.mjs`. |
| `corepack pnpm add @astrojs/mdx@^8.1.0 @astrojs/markdown-satteri@^0.4.4` | 0 | Dos dependencias añadidas; lockfile actualizado. |
| `corepack pnpm exec astro sync` | 0 | Contenido sincronizado y tipos generados. |
| `corepack pnpm exec astro check` | 0 | 18 archivos: 0 errores, 0 warnings, 0 hints. |
| `corepack pnpm build` | 0 | Build estático correcto; 1 página (`/index.html`). |
| Build con entrada inválida temporal (`status: shipped`) | 1 | `InvalidContentEntryDataError`: el esquema rechazó el estado. Entrada eliminada después. |
| `corepack pnpm build` final | 0 | Build limpio tras retirar la página temporal de verificación. |

## J. Pruebas funcionales y técnicas

1. **Ingesta de las cuatro entradas.** Se creó temporalmente `src/pages/t03-verify.astro`, que renderizó el resultado de `getProjects()`. Salida verificada:

   | id | status | category | featuredOrder | publicApproved | image |
   |---|---|---|---:|---|---|
   | `sgaa` | `production` | `saas` | 1 | `false` | `/images/projects/sgaa.svg` |
   | `controllote` | `development` | `saas` | 2 | `false` | `/images/projects/controllote.svg` |
   | `auditapy` | `development` | `saas` | 3 | `false` | `/images/projects/auditapy.svg` |
   | `boozhome` | `prelaunch` | `client` | 4 | `false` | `/images/projects/boozhome.svg` |

   La página temporal se eliminó y se reconstruyó el sitio; `dist/t03-verify/` ya no existe.

2. **Stack declarado.** ControlLote: `.NET 10`, `React 19`, `Vite 7`, `TypeScript`, `PostgreSQL 16`, `Tailwind CSS v4`, `Docker`. BoozHome: `.NET 10`, `C# 14`, `ASP.NET Core`, `Blazor WebApp`, `PostgreSQL`, `Tailwind CSS`, `Docker`. SGAA y AuditaPy: lista vacía por falta de confirmación.

3. **Gate.** `getPublicProjects()` devuelve `[]` mientras las cuatro fichas tengan `publicApproved: false`; `getProjects()` devuelve las cuatro ordenadas.

4. **Assets.** `dist/images/projects/` contiene los cuatro SVG tras el build.

5. **Sin hidratación nueva.** `dist/index.html` no contiene etiquetas `<script>`; T03 no añadió islas.

## K. Pruebas no ejecutadas

- No hay pruebas visuales ni de navegador: T03 no crea rutas ni renderiza las fichas.
- No se ejecutó Lighthouse, axe ni Playwright; corresponden a T07/T09.
- No se validó ningún enlace externo porque ninguna ficha define `externalUrl`.
- No se ejecutó `pnpm install --frozen-lockfile` desde cero; se usó el lockfile existente con `pnpm add`.

## L. Revisión de accesibilidad, SEO, seguridad y privacidad

- **Accesibilidad:** no se añadió UI nueva. Cada imagen define `alt` descriptivo en el frontmatter. El esquema no permite `alt` vacío (mínimo 10 caracteres).
- **SEO:** las fichas no generan rutas todavía; no se añadieron metadatos de página. `site` y `trailingSlash` se conservaron.
- **Seguridad:** sin secretos, credenciales ni datos de clientes. No se añadieron scripts, analítica, cookies ni formularios.
- **Privacidad:** no se publican nombres de clientes, contratos, montos, PDFs ni capturas. ControlLote solo menciona el histórico procesado (>18 meses por empresa) con la advertencia de que no equivale a antigüedad del servicio ni a clientes activos. BoozHome queda en `prelaunch` y no se declara «en producción».
- **Derechos:** las cuatro imágenes son abstracciones originales; no reproducen material de SGAA, ControlLote ni BoozHome.

## M. Problemas encontrados y soluciones

1. **`astro add mdx` falló (`spawn pnpm ENOENT`).** El CLI de Astro invoca `pnpm` directamente y el entorno solo expone Corepack. Solución: añadir las mismas dependencias con `corepack pnpm add` y editar `astro.config.mjs` a mano. No se instaló nada global ni se modificó la configuración del usuario.
2. **La página temporal con prefijo `_` no se generó.** Astro excluye del routing los archivos que empiezan con `_`. Solución: renombrar a `t03-verify.astro` durante la verificación y eliminarla después.
3. **Validación del esquema.** Se comprobó con una entrada inválida temporal que el build falla con `InvalidContentEntryDataError`; la entrada se eliminó y el build final volvió a pasar.

## N. Riesgos, limitaciones y pendientes

1. **Ninguna ficha está aprobada (`publicApproved: false`).** Es la opción conservadora mientras no exista aprobación editorial explícita (T09). Consecuencia: `getPublicProjects()` devuelve vacío. T04 debe decidir si construye con `getProjects()` y aplica el gate en publicación, o si el propietario aprueba fichas antes.
2. **SGAA y AuditaPy sin stack confirmado.** `technologies` queda vacío para no inventar. Debe completarse cuando el autor confirme el stack.
3. **SGAA sin enlace externo.** El sitio de referencia no se enlaza hasta comprobar accesibilidad y derechos.
4. **BoozHome sin URL ni aprobación.** Estado `prelaunch`; no se afirma despliegue público.
5. **`caseStudyStage`:** SGAA y ControlLote en `documented`; AuditaPy y BoozHome en `outline`. Ninguno alcanza `verified` por falta de evidencia pública.
6. **`@astrojs/markdown-satteri` como dependencia directa.** Es peer de `@astrojs/mdx` 8.1.0; se mantiene fijada por el lockfile.
7. **`dist/_astro/client.*.js`** se emite por la integración React aunque `index.html` no lo referencia. Es una condición preexistente de T02, no introducida por T03; conviene revisarla en T07/T08.
8. **Texto de SGAA sobre `redfor-ti.com.py`.** Se menciona como dominio de referencia no enlazado y con derechos pendientes. Si el propietario prefiere no nombrarlo, debe retirarse antes de publicar.

## O. Cumplimiento de los criterios de aceptación T03

| Criterio | Estado | Evidencia |
|---|---|---|
| Cuatro entradas válidas | Cumplido | Ingesta verificada y `astro check` sin errores. |
| Estado correcto de cada proyecto | Cumplido | SGAA `production`; AuditaPy/ControlLote `development`; BoozHome `prelaunch`. |
| Ninguna cifra falsa | Cumplido | Solo se cita el histórico >18 meses por empresa, con advertencia; sin métricas inventadas. |
| El build valida colecciones | Cumplido | Build 0 y prueba negativa con `InvalidContentEntryDataError`. |
| BoozHome prelaunch hasta comprobación | Cumplido | `status: prelaunch`, sin URL pública. |
| Sin screenshots privados | Cumplido | Solo SVG abstractos originales. |
| Informe de implementación | Cumplido | Este archivo. |

## P. Estado de Git y recomendaciones

- Rama: `feat/t03-content-model`.
- Base: `7b3cf10 docs: establish implementation report policy (#3)` (DOC-01 integrado).
- Los informes T01 y T02 permanecen intactos (`git diff HEAD -- docs/implementations/T01-IMPLEMENTACION.md docs/implementations/T02-IMPLEMENTACION.md` sin cambios).
- Bajo autorización de cierre, los archivos de T03 se preparan y se comprometen juntos; este informe acompaña al commit.
- No se ejecutó merge, auto-merge, borrado de ramas ni reescritura de historia.

## Q. Verificación de cierre (sesión 2026-10-18)

Reconstrucción sin asumir la sesión anterior:

| Comprobación | Resultado |
|---|---|
| Rama actual | `feat/t03-content-model` |
| HEAD | `7b3cf10` (DOC-01 integrado) |
| Remoto | `git@github.com:joelveloper/joelveloper.github.io.git` |
| Cambios ajenos a T03 | Ninguno |
| Informes T01/T02 | Intactos |
| Informe T03 | Presente |

### Q.1 Modelo y esquema

| Condición | Resultado |
|---|---|
| Exactamente cuatro registros | Sí: `sgaa`, `controllote`, `auditapy`, `boozhome` |
| Identificadores únicos | Sí, derivados de los nombres de archivo |
| `featuredOrder` único | Sí: 1, 2, 3, 4 |
| Categorías/estados correctos | Sí: SGAA `saas/production`; ControlLote y AuditaPy `saas/development`; BoozHome `client/prelaunch` |
| Validación Zod efectiva | Sí: una entrada temporal con `status: shipped` hizo fallar `astro sync` con `InvalidContentEntryDataError` y exit 1; la entrada se eliminó |
| Fechas y URLs | `lastReviewed` con formato `YYYY-MM-DD`; no hay `externalUrl` que validar en las fichas actuales |
| `publicApproved: false` | Sí, en las cuatro |
| `getPublicProjects()` | Filtro estricto por `publicApproved` |
| `getProjects()` | Devuelve las cuatro entradas ordenadas |
| Imágenes | Rutas existentes en `public/images/projects/`; SVG abstractos sin información privada |
| Datos profesionales duplicados | Identidad y canales centralizados en `src/data/`; solo quedan títulos/descripciones de página en `index.astro`, no datos de contacto |
| Enlaces a repositorios privados | Ninguno |

### Q.2 Dependencias

| Comando | Exit | Resultado |
|---|---:|---|
| `corepack pnpm install --frozen-lockfile` | 0 | Lockfile actualizado y reproducible |
| `corepack pnpm exec astro sync` | 0 | Contenido sincronizado y tipos generados |
| `corepack pnpm exec astro check` | 0 | 18 archivos, 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | 0 | Build estático correcto |

`@astrojs/markdown-satteri` está justificado: es peer dependency **no opcional** de `@astrojs/mdx@8.1.0` (y también dependencia de `astro@7.4.0`). El procedimiento oficial `astro add mdx` lo instala explícitamente. No se eliminaron ni actualizaron dependencias.

### Q.3 Renderizado MDX

- Se creó temporalmente `src/pages/t03-render-check.astro` usando `getCollection` y `render()` de `astro:content`.
- El build (exit 0) generó `/t03-render-check/index.html` con el cuerpo de SGAA: 12 encabezados `<h2>` y el texto del contexto renderizado.
- Se eliminó la ruta temporal y se reconstruyó: `dist/t03-render-check/` ya no existe.
- No quedan rutas de diagnóstico en `src/pages/` (solo `index.astro`).

### Q.4 Gate editorial

- Consulta interna: `4` entradas (`sgaa,controllote,auditapy,boozhome`).
- Consulta pública: `0` entradas.
- Se mantiene `publicApproved: false` en las cuatro fichas.
- La aprobación editorial seguirá siendo necesaria antes de mostrar los cuatro proyectos en la landing definitiva. T04 no se implementó.

### Q.5 Correcciones editoriales aplicadas en el cierre

La revisión detectó afirmaciones sobre el “problema original” que `docs/05-CONTENIDOS-Y-CASOS.md` marca como datos pendientes de recopilar. Se corrigieron sin añadir información:

- **SGAA:** “Problema original” pasa a declarar pendiente el proceso previo real y solo mantiene la necesidad confirmada de automatizar auditorías.
- **ControlLote:** “Contexto” elimina supuestos sobre volumen, variedad y lentitud; conserva el riesgo confirmado de inconsistencias, duplicados y diferencias.
- **BoozHome:** “Problema original” queda pendiente de documentar; se retira la motivación inferida “sin depender de un tercero”. “Analíticas básicas” pasa a “Analíticas”.

Tras las correcciones: `astro check` exit 0 y `astro build` exit 0.

### Q.6 Comprobaciones no ejecutadas en el cierre

- No se ejecutaron pruebas visuales ni de navegador (T03 no crea rutas de producto).
- No se ejecutó Lighthouse, axe ni Playwright.
- No se validó ningún enlace externo (no hay `externalUrl`).
- No se creó el Pull Request antes de actualizar este informe; se hará después del push autorizado.

**Siguiente tarea propuesta (sin implementar):** T04 — Landing personal, usando `getProjects()` para las cuatro tarjetas y definiendo explícitamente cómo interactúa el gate `publicApproved` con la publicación, además de resolver la navegación definitiva por anclas.
