# Informe de implementación — T08

- **Tarea:** T08 — CI/CD y despliegue en GitHub Pages
- **Fecha:** 2026-10-20
- **Rama:** `feat/t08-github-pages-cicd`
- **Base:** `main` en `4fd0da30f7eec03a0ea6ca040a043ea08d5856d9` (Merge PR #8 · T07 integrada)
- **Estado:** implementación local completada y validada; **sin `git add`, commit, push, PR, merge, despliegue ni cambio remoto de Pages**. La validación remota queda pendiente.

---

## 1. Estado inicial de Git

| Comprobación | Resultado |
|---|---|
| Rama de partida | `main` |
| `origin/main` | `4fd0da30f7eec03a0ea6ca040a043ea08d5856d9` |
| Árbol de trabajo | Limpio |
| Rama creada | `feat/t08-github-pages-cicd` |
| HEAD de T08 | `4fd0da30f7eec03a0ea6ca040a043ea08d5856d9` |
| Commits de T08 | Ninguno |

Procedimiento ejecutado, sin operaciones destructivas:

```text
git fetch origin
git switch main
git merge --ff-only origin/main
git switch -c feat/t08-github-pages-cicd
```

No se ejecutó reset, rebase ni force push. No se modificó `main` local ni remoto.

## 2. Dependencia de T07

La primera comprobación de T08 detectó que T07 aún no estaba integrada: `origin/main` seguía en `01bb342`, el commit `71d1dde` no era ancestro y el informe T07 no existía en `main`. El PR #8 estaba abierto. La tarea se detuvo y se reportó el bloqueo.

Tras la confirmación del propietario, se verificó:

| Comprobación | Resultado |
|---|---|
| Pull Request T07 | #8, `state=closed`, `merged=true` |
| Fecha de merge | `2026-10-20T14:25:03Z` |
| Commit de merge | `4fd0da30f7eec03a0ea6ca040a043ea08d5856d9` |
| Commit T07 `71d1dde` | Ancestro de `origin/main` |
| Informe T07 | Presente en `origin/main` |
| Cambios de SEO, favicon, sitemap y 404 | Presentes en `main` |

No se reconstruyó T07 ni se aplicó cherry-pick.

## 3. Configuración previa de GitHub Pages

| Comprobación | Resultado real |
|---|---|
| Repositorio público | Sí |
| Rama por defecto | `main` |
| `has_pages` en la API del repositorio | `true` |
| Workflows previos | Ninguno; no existía `.github/` |
| API autenticada de Pages | No disponible; consulta sin autenticación devuelve HTTP 404 |
| URL pública `https://joelveloper.github.io/` | HTTP 200 |
| Generador del HTML público | **Jekyll v3.10.0**, no el build Astro |
| `/proyectos/sgaa/` público | HTTP 404 |
| `/sitemap-index.xml` público | HTTP 404 |
| `/robots.txt` público | HTTP 404 |
| `/favicon.svg` público | HTTP 404 |
| `/images/social/og-image.jpg` público | HTTP 404 |
| Ruta inexistente pública | HTTP 404 con página por defecto «Page not found · GitHub Pages» |

La evidencia indica que Pages está activo, pero **todavía no publica el artefacto de GitHub Actions**: el sitio público responde con una página generada por Jekyll y no contiene los recursos de T07. No fue posible confirmar ni modificar la configuración exacta mediante las herramientas disponibles.

**Acción requerida del propietario:** en `Settings → Pages → Build and deployment`, establecer `Source: GitHub Actions`. Sin este cambio, el job de despliegue de T08 no podrá publicar el artefacto.

Se recomienda además restringir el environment `github-pages` para permitir despliegues únicamente desde `main`. No se modificó ninguna configuración remota.

## 4. Arquitectura de CI/CD

- **CI:** se ejecuta solamente en Pull Requests hacia `main`, valida instalación, contenido, tipos, build y artefactos. No tiene permisos ni pasos de publicación.
- **Deploy:** se ejecuta en push a `main` o por `workflow_dispatch` manual. Consta de dos jobs: `build` prepara y sube el artefacto; `deploy` publica con el environment `github-pages`.
- **Separación:** el código de un PR nunca recibe permisos de publicación. El despliegue usa exclusivamente el artefacto generado desde `main`.
- **Sin rama `gh-pages`:** no se versiona `dist/` ni se usa una rama de publicación.
- **Sin secretos:** se utiliza el `GITHUB_TOKEN` efímero mediante permisos declarados.

```text
PR hacia main
  └─ CI: install → sync → check → build → verificación de artefactos

Push a main / workflow_dispatch en main
  ├─ build: install → check → build → configure-pages → upload-pages-artifact
  └─ deploy: environment github-pages → deploy-pages
```

## 5. Workflow de CI

Archivo: `.github/workflows/ci.yml`.

| Elemento | Configuración |
|---|---|
| Nombre | `CI` |
| Disparador | `pull_request` hacia `main` |
| Permisos | `contents: read` |
| Runner | `ubuntu-latest` |
| Concurrencia | Por número de PR; cancela ejecuciones anteriores |
| Node.js | 24 |
| pnpm | 12.14.0 desde `packageManager` |

Pasos:

1. `actions/checkout@v7.0.1`.
2. `pnpm/action-setup@v6.1.0`.
3. `actions/setup-node@v7.1.0` con caché de pnpm.
4. `pnpm install --frozen-lockfile`.
5. `pnpm exec astro sync`.
6. `pnpm exec astro check`.
7. `pnpm run build`.
8. Verificación en `dist/` de 12 artefactos obligatorios; el paso falla si alguno falta o está vacío.

Artefactos comprobados:

- `index.html`.
- `proyectos/sgaa/index.html`.
- `proyectos/controllote/index.html`.
- `proyectos/auditapy/index.html`.
- `proyectos/boozhome/index.html`.
- `404.html`.
- `robots.txt`.
- `sitemap-index.xml`.
- `sitemap-0.xml`.
- `favicon.svg`.
- `favicon.ico`.
- `images/social/og-image.jpg`.

## 6. Workflow de despliegue

Archivo: `.github/workflows/deploy.yml`.

| Elemento | Configuración |
|---|---|
| Nombre | `Deploy GitHub Pages` |
| Disparadores | Push a `main`; `workflow_dispatch` |
| Restricción adicional | Ambos jobs exigen `github.ref == 'refs/heads/main'` |
| Permisos globales | `contents: read` |
| Concurrencia | Grupo `pages`; no cancela despliegues en curso |

### Job `build`

- Permisos: `contents: read`, `pages: read`.
- Pasos: checkout, pnpm, Node 24, instalación congelada, `astro check`, build, `actions/configure-pages@v6.0.0`, `actions/upload-pages-artifact@v5.0.0` con `path: dist`.

### Job `deploy`

- Depende de `build`.
- Permisos: `contents: read`, `pages: write`, `id-token: write`.
- Environment: `github-pages`, con URL tomada de `steps.deployment.outputs.page_url`.
- Paso: `actions/deploy-pages@v5.0.1`.

No se despliega desde Pull Requests ni desde ramas feature. `workflow_dispatch` ejecutado sobre otra rama queda bloqueado por la condición de `ref`.

## 7. Versiones de las acciones utilizadas

Versiones estables consultadas en las releases oficiales el 2026-10-20:

| Acción | Versión | Publicación | Estado |
|---|---|---|---|
| `actions/checkout` | `v7.0.1` | 2026-07-20 | Estable, no prerelease |
| `actions/setup-node` | `v7.1.0` | 2026-10-08 | Estable, no prerelease |
| `pnpm/action-setup` | `v6.1.0` | 2026-09-05 | Estable, no prerelease |
| `actions/configure-pages` | `v6.0.0` | 2026-03-25 | Estable, no prerelease |
| `actions/upload-pages-artifact` | `v5.0.0` | 2026-04-10 | Estable, no prerelease |
| `actions/deploy-pages` | `v5.0.1` | 2026-09-01 | Estable, no prerelease |

Se fijaron versiones completas de parche; no se usan `@main`, `@latest` ni alias flotantes.

## 8. Permisos y seguridad

- CI: únicamente `contents: read`.
- Build de despliegue: `contents: read` y `pages: read`; sin escritura.
- Deploy: `contents: read`, `pages: write`, `id-token: write`; sin `contents: write`.
- Sin `pull_request_target`.
- Sin Personal Access Tokens, secretos estáticos ni credenciales adicionales.
- Sin `git push`, `gh-pages` ni escritura en ramas.
- Sin ejecución de código de PR en el workflow de despliegue.
- Sin impresión de secretos.
- Sin `--force` ni operaciones destructivas.
- Concurrencia `pages` para evitar despliegues simultáneos.
- Separación estricta entre validación y publicación.

## 9. Runtime Node y pnpm

- Node.js de CI/CD: 24, compatible con `engines.node >= 22.22.0`.
- pnpm: 12.14.0, obtenido desde `packageManager` mediante `pnpm/action-setup`; no se duplica la versión en los workflows.
- Runtime local usado para validar: Node `v24.21.0`, pnpm `12.14.0`.

## 10. Instalación reproducible

- `pnpm install --frozen-lockfile` en CI y deploy.
- `pnpm-lock.yaml` versionado.
- Sin scripts `preinstall`, `install` ni `postinstall` en `package.json`.
- pnpm verificó las políticas de supply-chain del lockfile en la ejecución local.
- Sin dependencias descargadas mediante scripts arbitrarios.

## 11. Artefactos

Build local con 6 páginas estáticas:

- `/`.
- `/proyectos/sgaa/`.
- `/proyectos/controllote/`.
- `/proyectos/auditapy/`.
- `/proyectos/boozhome/`.
- `/404.html`.

Los 12 artefactos obligatorios existen y no están vacíos. El sitemap contiene exactamente 5 URLs indexables y excluye la 404. `dist/` no contiene `.github`, `scripts/`, `src/`, `docs/`, `.env` ni `CNAME`.

## 12. Configuración de dominio

`astro.config.mjs` conserva sin cambios:

```text
site: 'https://joelveloper.github.io'
output: 'static'
trailingSlash: 'always'
```

- Repositorio de sitio de usuario: sin `base`.
- Sin dominio personalizado.
- Sin `CNAME`.
- Canonical generado: `https://joelveloper.github.io/`.
- Recursos del HTML con rutas absolutas desde la raíz (`/_astro/`, `/images/`, `/favicon.*`).

## 13. Resultados de pruebas locales

| Comando / comprobación | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Exit 0; lockfile sin cambios |
| `corepack pnpm exec astro sync` | Exit 0 |
| `corepack pnpm exec astro check` | 25 archivos; **0 errores, 0 warnings, 0 hints** |
| `corepack pnpm run build` | Exit 0; **6 páginas** |
| Verificación de 12 artefactos | **12/12 presentes y no vacíos** |
| URLs del sitemap | **5** |
| Canonical de producción | Correcto en home y caso SGAA |
| YAML de ambos workflows | Sintaxis válida con PyYAML `BaseLoader` |
| `git diff --check` | Exit 0 |
| `git diff --exit-code 4fd0da3 -- src/content src/data` | Exit 0; sin cambios editoriales |
| Búsqueda de patrones prohibidos en workflows | Sin `pull_request_target`, secretos, PAT, `gh-pages`, force ni tags flotantes |

No se ejecutaron los workflows en GitHub. No se ejecutó Lighthouse, auditoría de dependencias ni pruebas de navegador en producción.

## 14. Resultados remotos

**No disponibles todavía.** En esta ejecución no se autorizó `git add`, commit, push, PR, merge ni despliegue. Por tanto:

- No hay ejecución de CI en un PR real.
- No hay build registrado en GitHub Actions.
- No hay despliegue desde `main`.
- No se verificó el environment `github-pages` en GitHub.
- No se comprobó la URL pública con el artefacto de T08.

## 15. Verificación de publicación

Pendiente. El estado público actual no corresponde a T08: sirve una página Jekyll y devuelve 404 para los recursos de T07. No se afirma que T08 esté publicado.

Tras el merge autorizado y el cambio de Pages a GitHub Actions, deben verificarse:

- Landing y cuatro casos con HTTP 200.
- CSS, JavaScript requerido, fuentes e ilustraciones claras/oscuras.
- Favicon SVG/ICO, imagen social, `robots.txt` y sitemap.
- Canonical apuntando a `https://joelveloper.github.io`.
- Ausencia de errores de consola y de red.

## 16. Verificación HTTP 404

Pendiente en producción. Criterios de aceptación posteriores al despliegue:

| Ruta | Resultado esperado |
|---|---|
| `/ruta-inexistente/` | HTTP 404 real con página propia |
| `/ruta-inexistente` | HTTP 404 real con página propia |
| `/proyectos/ruta-inexistente/` | HTTP 404 real con página propia |
| `/404.html` | HTTP 200 del archivo estático |

En cada 404 se debe comprobar H1 «404 — Página no encontrada», header, footer, CSS, favicon, enlace «Volver al inicio» y conservación de la URL solicitada.

Estado público actual: las rutas inexistentes devuelven 404, pero con la página por defecto de GitHub Pages, no con `dist/404.html`. Esto es una limitación del despliegue actual basado en Jekyll, no del artefacto Astro.

No se añadieron redirecciones ni se convirtieron errores en HTTP 200.

## 17. Problemas encontrados

1. **T07 no integrada al inicio:** PR #8 abierto y `main` sin T07. Se detuvo T08 y se reportó; el propietario fusionó el PR y se reanudó la tarea.
2. **Pages no publica el artefacto Astro:** la URL pública sirve Jekyll v3.10.0 y carece de recursos T07. Es necesario cambiar la fuente de Pages a GitHub Actions desde la interfaz del repositorio.
3. **Configuración de Pages no verificable:** sin `gh` autenticado, la API pública de Pages devuelve 404; no se modificó ninguna configuración remota.
4. **Versiones de acciones actualizadas:** se consultaron las releases oficiales y se fijaron versiones estables actuales, evitando tags flotantes.
5. **Permisos de lectura para Pages:** el job de build necesita `pages: read` para `configure-pages`; mantiene la separación respecto a los permisos de escritura y OIDC del job de deploy.

## 18. Riesgos y limitaciones

- **Validación remota pendiente:** CI, deploy, environment, URL pública y 404 real no están comprobados.
- **Bloqueo hasta cambiar Pages a GitHub Actions:** el workflow no podrá publicar mientras la fuente siga siendo la rama/Jekyll.
- **Environment sin restricción verificada:** se recomienda limitar `github-pages` a `main`; no se aplicó.
- **Pins de parche:** ofrecen reproducibilidad, pero requieren actualización periódica; no se añadió Dependabot por estar fuera de alcance.
- **Chunk React huérfano:** condición heredada de T04–T07; T08 no modifica el producto.
- **Sin auditoría de dependencias:** `pnpm audit` queda para T09 o una tarea específica.
- **Sin Lighthouse publicado:** corresponde a T09.

## 19. Archivos modificados

### Creados

| Archivo | Contenido |
|---|---|
| `.github/workflows/ci.yml` | CI de Pull Requests con validación y artefactos. |
| `.github/workflows/deploy.yml` | Build y despliegue a Pages desde `main`. |
| `docs/implementations/T08-IMPLEMENTACION.md` | Este informe. |

### Modificados o eliminados

Ninguno. No se modificaron MDX, contenidos, componentes, estilos, configuración de Astro, favicon, imagen social, navegación ni textos de la 404.

## 20. Estado final de Git

Estado observado sin `git add`:

```text
?? .github/
?? docs/implementations/T08-IMPLEMENTACION.md
```

- HEAD: `4fd0da30f7eec03a0ea6ca040a043ea08d5856d9`.
- Sin cambios preparados, commits, push, PR, merge ni despliegue.
- Sin cambio remoto de configuración de Pages.
- El informe y los workflows permanecen sin seguimiento hasta autorización expresa.

## 21. Pendientes para T09

1. Autorizar y ejecutar `git add`, commit y push de T08.
2. Crear Pull Request y verificar CI real en GitHub.
3. Fusionar T08 tras aprobación.
4. Cambiar `Settings → Pages → Source` a **GitHub Actions**.
5. Verificar el despliegue real desde `main` y el environment `github-pages`.
6. Comprobar URL pública, rutas, recursos, canonical, sitemap y robots.
7. Verificar los cuatro casos de 404 y su comportamiento HTTP real.
8. Revisar restricciones del environment `github-pages`.
9. Ejecutar Lighthouse, auditoría de dependencias y validación cruzada de navegadores en T09.

**T08 está implementada y validada localmente. No está publicada ni integrada en `main`.** No se inició T09.
