# Informe de implementación — T01

**Tarea:** T01 — Base técnica reproducible  
**Fecha:** 2026-10-18  
**Rama:** `feat/t01-astro-foundation`  
**Estado:** Implementada y verificada; pendiente de revisión y autorización para commit.

## A. Estado inicial y rama

- HEAD inicial: `799923b chore: initialize portfolio documentation`.
- `main` estaba limpio, sincronizado con `origin/main`; T00 confirmada.
- No había modificaciones ajenas.
- Rama creada: `feat/t01-astro-foundation`.
- Runtime: Node `24.21.0`, Corepack `0.36.0`, pnpm `12.14.0` ejecutado mediante Corepack.
- No se instaló pnpm globalmente.
- No se ejecutó `git add`, commit, push ni PR.

## B. Versiones instaladas

| Paquete | Versión |
|---|---|
| pnpm | `12.14.0` |
| Astro | `7.4.0` |
| TypeScript | `6.0.3` |
| @astrojs/check | `0.9.10` |
| @astrojs/react | `7.1.0` |
| React / React DOM | `19.3.1` |
| Tailwind CSS | `4.3.3` |
| @tailwindcss/vite | `4.3.3` |
| shadcn CLI usado | `4.22.1` |
| shadcn dependencia | `4.22.0` |
| radix-ui | `1.8.1` |
| @types/node | `24.19.2` |

`packageManager` está fijado como `pnpm@12.14.0`.

## C. Archivos creados y modificados

Creados:

- `package.json`
- `pnpm-lock.yaml`
- `astro.config.mjs`
- `tsconfig.json`
- `components.json`
- `src/pages/index.astro`
- `src/styles/global.css`
- `src/lib/utils.ts`

No se modificó ningún archivo preexistente. `README.md`, `AGENTS.md`, `docs/` y `prompts/` permanecen intactos respecto a HEAD.

`node_modules/`, `.astro/` y `dist/` están ignorados correctamente.

## D. Arquitectura resultante

- Astro con `output: 'static'`.
- `site: 'https://joelveloper.github.io'`, sin `base`.
- `trailingSlash: 'always'`.
- React configurado mediante `@astrojs/react`, sin islas ni hidratación.
- Tailwind v4 mediante el plugin oficial `@tailwindcss/vite`; no se usa `@astrojs/tailwind`.
- Alias `@/*` configurado en `tsconfig.json` y Vite.
- Sin adaptador SSR ni dependencia de servidor.
- Página mínima únicamente en `/`, sin rutas de producto.

## E. Evidencia de Radix

- Se consultó `shadcn init --help`.
- Inicialización ejecutada con `--base radix --preset nova`.
- `components.json` contiene `"style": "radix-nova"`.
- `shadcn info --json` confirma:

```json
"style": "radix-nova",
"base": "radix"
```

- Se instaló `radix-ui@1.8.1`; no se instaló Base UI.

## F. Resultados de verificación

| Comando | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | Exit 0 |
| `pnpm exec astro check` | Exit 0; 0 errores, 0 warnings, 0 hints |
| `pnpm run check` | Exit 0 |
| `pnpm run build` | Exit 0; 1 página generada, output static |
| `tsc --showConfig` | `strict: true` |
| Preview HTTP | `/` respondió 200 con título correcto; CSS respondió 200 |
| `dist/index.html` | Enlace CSS presente; sin `<script>` ni `astro-island` |
| Tailwind | `.bg-slate-950` y `.text-sky-300` presentes en el CSS generado |
| SSR adapter | No existe |
| Docs | Sin cambios respecto a HEAD |
| Secretos/archivos sensibles | Ninguno detectado |

## G. Errores y soluciones

1. `astro check` falló inicialmente por `node:url` sin tipos. Se añadió `@types/node@24.19.2` como dependencia de desarrollo y se repitió la validación con éxito.
2. `shadcn init` solicitó un preset en modo no interactivo. Se repitió con `--preset nova`, manteniendo `--base radix`.
3. Astro 7 inició el preview en segundo plano; se detuvo con `astro preview stop`.
4. El build emite un chunk React (`client.*.js`) no referenciado por el HTML. No se carga ni existe hidratación global.

## H. Diff resumido

- 8 archivos nuevos.
- 0 archivos preexistentes modificados.
- `pnpm-lock.yaml` generado y validado con instalación congelada.
- El trabajo permanece sin preparar en Git, listo para revisión.

## I. Cumplimiento de T01

T01 queda implementada y verificada: pnpm reproducible, Astro estático, TypeScript estricto, Tailwind v4, React configurado sin SPA, shadcn/ui sobre Radix, alias, scripts, lockfile y build correcto. No se crearon páginas de producto, casos de estudio, workflows ni configuración de Pages.

## J. Riesgos y recomendación para T02

- `global.css` contiene el preset neutral de shadcn; T02 debe sustituirlo por los tokens dark-first de `docs/02-DISENO-VISUAL.md`.
- Debe decidirse y documentarse la tipografía final entre Geist y la alternativa Inter propuesta.
- Mantener las islas React sin hidratar salvo interacción real.
- T02 debería crear tokens, layout, header, footer, hero y componentes estructurales, sin contenido de casos ni diseño de producto final.
- Pendiente la revisión y autorización posterior para preparar el commit de T01.
