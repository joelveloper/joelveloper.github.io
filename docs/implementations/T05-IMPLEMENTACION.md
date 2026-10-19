# Informe de implementación — T05

**Tarea:** T05 — Plantilla y páginas de casos de estudio
**Fecha:** 2026-10-19
**Rama:** `feat/t05-case-studies`
**Base:** `main` en `5147872` (Merge PR #5 · T04 integrada)
**Estado:** implementación funcional y aprobación editorial completadas; cinco páginas estáticas validadas localmente; pendiente de versionado e integración.

**Vigencia del documento:** las secciones A–R registran etapas anteriores del trabajo. La sección S refleja la aprobación editorial, la activación de los cuatro casos y el estado funcional definitivo. Cuando exista discrepancia, prevalece S.

---

## A. Diagnóstico inicial de Git

| Comprobación | Resultado |
|---|---|
| PR #5 | Fusionado el 2026-10-19T12:37:44Z |
| Commit de merge | `51478723645eba1cef967d86ec0e908481c7bbbb` |
| Rama de partida | `feat/t04-portfolio-home` |
| Árbol de partida | Limpio |
| `main` local antes del fetch | `07e9103`, por detrás de `origin/main` |
| `origin/main` | `5147872` |
| T04 integrada | Sí: `5dfbf9d` contenido en `5147872` |
| Cambios ajenos | Ninguno |
| Informes T01–T04 | Intactos |

Procedimiento aplicado:

1. `git fetch origin main`.
2. `git checkout main`.
3. `git merge --ff-only origin/main` → fast-forward `07e9103..5147872`.
4. `git checkout -b feat/t05-case-studies`.

No se usó rebase, reset destructivo, force push ni merge no autorizado. `main` no recibió commits locales.

## B. Rama y HEAD de partida

- Rama: `feat/t05-case-studies`.
- HEAD de partida: `51478723645eba1cef967d86ec0e908481c7bbbb`.
- Árbol limpio.
- Sin cambios de T04 pendientes.

## C. Arquitectura de la plantilla

### Archivos creados

- `src/layouts/CaseStudyLayout.astro`: layout compartido de los cuatro casos.
- `src/pages/proyectos/[id].astro`: ruta estática dinámica.

### Archivos modificados

- `src/data/navigation.ts`: nueva navegación de detalle con anclas absolutas.
- `src/lib/projects.ts`: `href` opcional en las tarjetas, solo para casos públicos.
- `src/pages/index.astro`: pasa `href` a `ProjectCard`.
- `src/styles/global.css`: estilos de lectura para el cuerpo MDX.
- `src/content/projects/{sgaa,controllote,auditapy,boozhome}.mdx`: revisión editorial y eliminación del H1 duplicado.

### Composición

`CaseStudyLayout` reutiliza `BaseLayout`, `Container`, `ButtonLink`, `StatusBadge`, `Surface` y `TechBadge`. Presenta:

- Ruta de navegación «Proyectos / {nombre}».
- Categoría, estado, H1, resumen y fecha de revisión.
- Imagen autorizada o aviso de ausencia de imagen.
- Stack tecnológico.
- Cuerpo MDX en un contenedor de lectura de 68ch.
- Panel lateral con ficha del caso, evidencias y criterio de lectura.
- Enlace de regreso a `/#proyectos`.

No se añadió React, Radix ni hidratación. El layout y la ruta son Astro estático.

## D. Implementación de `getStaticPaths`

`src/pages/proyectos/[id].astro` utiliza exclusivamente `getPublicProjects()`:

```ts
export const getStaticPaths = async () => {
  const projects = await getPublicProjects();

  return projects.map((project) => ({
    params: { id: project.id },
    props: { project },
  }));
};
```

Comprobaciones:

- No se usa `getProjects()` para generar rutas.
- No se usa `cardApproved` como autorización de página completa.
- No existe variable de entorno, query string, parámetro de runtime ni bypass editorial.
- `render(project)` se importa desde `astro:content`.
- Mientras las cuatro entradas mantienen `publicApproved: false`, `getStaticPaths()` devuelve un array vacío y Astro no genera ninguna ruta de detalle.

## E. Integración MDX y jerarquía de encabezados

- El H1 se renderiza una sola vez en `CaseStudyLayout`.
- Los cuatro cuerpos MDX comienzan directamente en H2.
- Se eliminaron los H1 y las líneas de metadatos duplicadas de los MDX.
- El cuerpo se renderiza con `<Content />` dentro del slot del layout.
- Los estilos `.case-study-prose` cubren H2, H3, párrafos, listas, enlaces, código, citas y separadores.
- El ancho de lectura se limita a 68ch y la tipografía base es de 16px con interlineado 1.75.
- No se añadieron componentes React para texto o estructura.

## F. Revisión editorial por proyecto

### SGAA

- Contexto: SaaS de auditoría y aseguramiento en producción; primera solución comercial de escritorio en 2020; versión web comercializada desde agosto de 2025.
- Problema: coordinación de clientes, encargos, equipos, fases, procedimientos, supervisión y control de calidad.
- Participación: investigación, arquitectura, backend, frontend, modelado y despliegue a cargo del autor; colaboración funcional con profesionales de auditoría.
- Solución: gestión de clientes, encargos, equipos, fases, procedimientos, seguimiento, supervisión, control de calidad y arquitectura multiempresa.
- Arquitectura: .NET 8, ASP.NET Core Web API, Finbuckle, MediatR, Ardalis, CQRS, ASP.NET Identity, Blazor/MudBlazor, SQL Server, Linux Ubuntu y Nginx.
- Estado: producción.
- Limitaciones: sin métricas públicas, sin capturas ni documentos de clientes; enlace `redfor-ti.com.py` no mostrado hasta verificar disponibilidad y permisos.
- No se atribuye SGAA a Oñondive.

### ControlLote

- Contexto: SaaS de conciliación de contratos y comisiones inmobiliarias; desarrollo privado y piloto real desde agosto de 2026.
- Problema: comparar cuotas cobradas con condiciones contractuales y detectar diferencias, comisiones o intereses incorrectos y duplicaciones.
- Participación: se documenta el producto y su estado; no se atribuye el desarrollo completo ni funciones individuales no verificadas.
- Solución: condiciones contractuales, listados oficiales de precios, informes PDF, documento original conservado, reglas porcentuales, conciliación, consulta por contrato y lote, históricos y reportes por período.
- Arquitectura: .NET 10, React 19, Vite 7, TypeScript, PostgreSQL 16, Tailwind CSS v4 y Docker.
- Estado: desarrollo privado con piloto; no es un SaaS público.
- Limitaciones: sin nombres de empresas, contratos, importes, PDFs ni datos identificables; sin tasas de exactitud ni resultados del piloto.
- El histórico superior a 18 meses por empresa se presenta como volumen procesado, no como antigüedad del servicio.

### AuditaPy

- Contexto: producto SaaS independiente en desarrollo funcional, inspirado por la experiencia y las limitaciones de evolución de SGAA.
- Problema: replantear la arquitectura y la separación de responsabilidades de una plataforma de auditoría.
- Participación: no se detalla el reparto individual ni el estado de cada módulo; no se atribuye el desarrollo completo sin confirmación.
- Solución: monolito modular, Vertical Slices, .NET 10, C# 14, Minimal APIs, EF Core 10, React, Vite y TypeScript; interfaces de administración y cliente separadas.
- Áreas arquitectónicas mencionadas: Identity, Auditing, Files, Notifications, Multitenancy, Chat y Webhooks.
- Estado: desarrollo funcional; no desplegada ni disponible públicamente.
- Limitaciones: no se presentan módulos terminados, capturas, métricas ni fechas de lanzamiento.
- No se describe como actualización desplegada de SGAA ni se afirma que comparta dominio, infraestructura, base de datos o despliegue.

### BoozHome

- Contexto: plataforma web exclusiva para un cliente inmobiliario; catálogo de residencias en Paraguay; prelanzamiento.
- Problema: publicación y administración de un catálogo con fichas de ubicación, precio, descripción y galería.
- Participación: desarrollo tecnológico a cargo del autor; proyecto exclusivo del cliente, sin atribuir titularidad a Oñondive.
- Solución: catálogo público, fichas, contacto por WhatsApp como funcionalidad del producto y panel administrativo de contenido y propiedades.
- Arquitectura: .NET 10, C# 14, ASP.NET Core Minimal APIs, Blazor WebApp, PostgreSQL, Tailwind CSS y Docker; catálogo SSR y panel InteractiveServer.
- Estado: prelanzamiento. Dominio `https://boozhome.com.py/` adquirido, funcionamiento público no confirmado.
- Limitaciones: sin logos, capturas, teléfonos, datos de propiedades ni información del cliente sin autorización; el dominio no se enlaza.
- WhatsApp se mantiene como funcionalidad del producto, no como canal profesional del autor.

## G. Cambios aplicados a los cuerpos MDX

- Se eliminó el H1 de los cuatro cuerpos.
- Se eliminó la línea de metadatos que duplicaba categoría, estado y nivel de caso.
- Se sustituyeron secciones genéricas de «Pendiente de documentar» por contenido confirmado, límites explícitos o secciones omitidas.
- Se organizaron los casos en contexto, problema, participación, solución, arquitectura, decisiones, estado, limitaciones y evolución.
- Se mantuvieron `cardApproved: true` y `publicApproved: false` en los cuatro proyectos.
- Se conservó `usageApproved: true` en las cuatro imágenes.
- No se añadieron métricas, clientes, testimonios, capturas, PDFs ni datos identificables.
- No se modificó el repositorio de BoozHome.

## H. Elementos visuales y navegación

- Encabezado con breadcrumb «Proyectos / {nombre}».
- Categoría y estado visibles antes del H1.
- Título principal único, resumen y fecha de revisión.
- Imagen abstracta original con `alt` descriptivo y `width`/`height` explícitos.
- Stack en badges.
- Panel lateral con naturaleza, estado, repositorio privado y nivel de documentación.
- Bloques de evidencia y criterio de lectura.
- Enlace de regreso a `/#proyectos` en el breadcrumb, en el header y al final del cuerpo.
- Navegación del header convertida a anclas absolutas (`/#inicio`, `/#sobre-mi`, etc.) para que funcione desde una ruta de detalle.
- La landing conserva sus anclas relativas y muestra «Caso de estudio en preparación» mientras el caso no es público.

## I. Validación de rutas temporales

Procedimiento autorizado y reversible:

1. Se copiaron los cuatro MDX finales a `/tmp/opencode/t05/final-mdx/`.
2. Se cambiaron temporalmente los cuatro `publicApproved: false` a `true` en el árbol de trabajo.
3. Build temporal: exit 0; 5 páginas generadas.
4. Preview local en `127.0.0.1:4321`; no se usó servidor público.
5. Se validaron las cuatro rutas y la landing con Chrome headless 155.0.8059.84 y Chrome DevTools Protocol.
6. Se capturaron evidencias en `/tmp/opencode/t05/`.
7. Se restauraron los cuatro MDX desde las copias y se comprobó igualdad exacta con `cmp`.
8. Build final: exit 0; solo `/index.html`.
9. Se confirmó que no queda ningún bypass en el código.

Build temporal:

```text
/proyectos/sgaa/index.html
/proyectos/controllote/index.html
/proyectos/auditapy/index.html
/proyectos/boozhome/index.html
/index.html
```

Rutas HTTP durante el preview temporal: 200 en las cuatro.

Evidencias visuales locales:

- `/tmp/opencode/t05/sgaa-desktop.png`
- `/tmp/opencode/t05/sgaa-mobile.png`
- `/tmp/opencode/t05/controllote-desktop.png`
- `/tmp/opencode/t05/auditapy-desktop.png`
- `/tmp/opencode/t05/boozhome-desktop.png`

Las capturas no se versionaron.

## J. Resultado del build final sin casos aprobados

- `publicApproved: false` en las cuatro fichas.
- `cardApproved: true` en las cuatro fichas.
- Build final: 1 página (`/index.html`).
- `dist/proyectos/` no existe.
- `/proyectos/sgaa/` y `/proyectos/auditapy/` respondieron 404 en el preview final.
- Landing: 4 tarjetas, 4 textos «Caso de estudio en preparación», 0 enlaces a `/proyectos/`.
- Header de la landing: 6 anclas relativas con destino válido.
- 0 `<script>`, 0 `astro-island` y 0 directivas `client:` en el HTML final.
- No se generó canonical para rutas inexistentes.

## K. Pruebas responsive y accesibilidad

Validación temporal de las cuatro rutas en 320, 375, 768, 1024 y 1440px: 20/20 combinaciones correctas.

| Comprobación | Resultado |
|---|---|
| Sin overflow horizontal | 20/20 |
| Un solo H1 | 20/20 |
| Cuerpo comienza en H2 | 20/20 |
| Sin H1 dentro del cuerpo MDX | 20/20 |
| Imagen cargada y con alt | 20/20 |
| Sin textos de placeholders | 20/20 |
| Sin enlaces vacíos ni `href="#"` | 20/20 |
| Sin enlaces a otros casos | 20/20 |
| Header con 6 anclas absolutas | 20/20 |
| Sin errores de consola, excepciones ni solicitudes fallidas | 20/20 |
| Sin recortes detectados en contenedores | 20/20 |

Mediciones:

- 320px: ancho del documento 320, cuerpo 280px.
- 375px: ancho del documento 375, cuerpo 335px.
- 768px: ancho del documento 768, cuerpo 720px.
- 1024px: ancho del documento 1024, cuerpo 608px.
- 1440px: ancho del documento 1440, cuerpo 721px.

Accesibilidad:

- Skip link: primer `Tab` enfoca «Saltar al contenido», con contorno de 2px.
- `Enter` lleva a `#contenido` y enfoca `main#contenido`.
- Foco visible con color `--ring`.
- `prefers-reduced-motion: reduce`: `scroll-behavior: auto` y transición de `1e-05s`.
- Imágenes con `alt` descriptivo.
- Estados con texto además de color.
- Contraste sobre los tokens existentes: foreground/background 17.60:1, primary/background 9.53:1, muted/background 10.66:1, muted/surface 9.78:1.
- Revisión visual de las capturas de SGAA en escritorio y móvil, ControlLote, AuditaPy y BoozHome: sin solapamientos ni recortes observados.

Pruebas no ejecutadas:

- Lighthouse.
- axe o Playwright.
- Safari, Firefox y dispositivos reales.
- Zoom real al 200 %.
- Auditoría de contraste con herramienta automática sobre las nuevas páginas.

## L. Comandos y dependencias

### Comandos ejecutados

| Comando | Resultado |
|---|---|
| `corepack pnpm install --frozen-lockfile` | Exit 0; lockfile actualizado y sin cambios |
| `corepack pnpm exec astro sync` | Exit 0; tipos generados |
| `corepack pnpm run check` | Exit 0; 20 archivos, 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | Exit 0; build estático de 1 página |
| `rm -rf dist && corepack pnpm run build` | Exit 0; build limpio de 1 página; sin `dist/proyectos` |
| `git diff --check` | Exit 0; sin errores de espacio |
| Preview local + Chrome/CDP | 20/20 combinaciones correctas; sin errores de consola o red |
| Restauración con `cmp` | Exit 0; los cuatro MDX coinciden con los respaldos |

La comprobación `check` se ejecutó de nuevo después de los últimos ajustes editoriales. El build final se repitió desde un `dist` vacío para descartar artefactos de la validación temporal.

### Dependencias

No se añadieron, actualizaron ni eliminaron dependencias. `package.json` y `pnpm-lock.yaml` no cambiaron.

### Creados

- `src/layouts/CaseStudyLayout.astro`
- `src/pages/proyectos/[id].astro`
- `docs/implementations/T05-IMPLEMENTACION.md`

### Modificados

- `src/content/projects/sgaa.mdx`
- `src/content/projects/controllote.mdx`
- `src/content/projects/auditapy.mdx`
- `src/content/projects/boozhome.mdx`
- `src/data/navigation.ts`
- `src/lib/projects.ts`
- `src/pages/index.astro`
- `src/styles/global.css`

### Eliminados

Ninguno.

## M. Riesgos de seguridad y privacidad

- No se publican secretos, credenciales, IP, configuraciones de servidor ni topologías internas.
- SGAA no expone detalles sensibles de seguridad ni enlaces no verificados.
- ControlLote no publica empresas, contratos, montos, PDFs ni datos identificables.
- AuditaPy no presenta módulos futuros como terminados ni comparte datos de SGAA.
- BoozHome no publica logos, capturas, teléfonos, datos de propiedades ni información del cliente; el dominio no se enlaza.
- No se añadieron formularios, cookies, analítica, servicios externos, scripts ni hidratación React.
- Las cuatro imágenes son abstracciones originales y no simulan capturas reales.
- No se modificó el repositorio de BoozHome.
- El build final no contiene rutas de casos no aprobados.

Riesgo residual: el preview final solicitó `/favicon.ico` y recibió 404. No se añadió favicon porque corresponde a T07; no afecta a las rutas ni a los enlaces.

## N. Aspectos pendientes de aprobación editorial

1. **SGAA:** confirmar disponibilidad y condiciones de uso de `redfor-ti.com.py` antes de enlazarlo; confirmar si se autoriza algún material visual.
2. **ControlLote:** confirmar el alcance exacto de responsabilidades del autor y posibles colaboradores; decidir si se publican datos agregados del piloto.
3. **AuditaPy:** confirmar qué módulos están implementados y cuáles son solo áreas de diseño; confirmar el rol del autor.
4. **BoozHome:** verificar dominio, HTTPS y funcionamiento público; obtener autorización para nombre, logo, capturas y datos; confirmar estado de lanzamiento.
5. **Los cuatro:** aprobar el cuerpo completo y decidir el paso de `publicApproved` a `true`.
6. **Los cuatro:** decidir si `caseStudyStage` debe cambiar de `documented`/`outline` a `verified` cuando exista evidencia suficiente.
7. **Evidencia:** definir si se incorporarán capturas autorizadas, diagramas propios o métricas verificables en una fase posterior.

## O. Cumplimiento de criterios de aceptación

| Criterio | Estado |
|---|---|
| Plantilla compartida de caso de estudio | Cumplido |
| Ruta `[id].astro` con `getStaticPaths` | Cumplido |
| Generación basada solo en casos públicos aprobados | Cumplido |
| Cuatro rutas en código | Cumplido |
| Cuatro rutas generadas en el build final | Pendiente de aprobación editorial |
| Contenidos sin placeholders públicos | Cumplido |
| Sin enlaces muertos | Cumplido |
| Componentes comparten diseño | Cumplido |
| Un solo H1 por página | Cumplido en la validación temporal |
| Navegación de regreso a `/#proyectos` | Cumplido |
| Header funcional desde detalle | Cumplido |
| Sin activar `publicApproved` | Cumplido |
| Sin enlaces a casos no aprobados | Cumplido |
| Build estático y `astro check` | Cumplido |
| Informe T05 | Cumplido |
| T05 completamente cerrada | No: las cuatro rutas siguen pendientes de aprobación |

## P. Estado final de Git

- Rama: `feat/t05-case-studies`.
- HEAD: `5147872`.
- Archivos modificados: 8.
- Archivos nuevos sin seguimiento: `src/layouts/CaseStudyLayout.astro`, `src/pages/proyectos/[id].astro` y este informe.
- Sin `git add`, commit, push, PR, merge, rebase ni despliegue.
- Informes T01–T04 intactos.
- `publicApproved: false` en los cuatro MDX.
- `git diff --check`: exit 0.
- Sin archivos temporales ni builds de prueba dentro del repositorio.

## Q. Recomendaciones para la aprobación de los casos

1. Revisar y aprobar el cuerpo de cada caso con el propietario.
2. Verificar el enlace de SGAA y el dominio de BoozHome antes de publicarlos.
3. Confirmar permisos de material visual y datos de cliente.
4. Precisar la participación del autor en ControlLote y Auditapy.
5. Cambiar `publicApproved` a `true` solo después de la aprobación editorial.
6. Reconstruir y repetir las pruebas de rutas, navegación, responsive y accesibilidad con las cuatro páginas activas.
7. No iniciar T06 hasta cerrar la aprobación editorial de T05 o recibir una instrucción específica.

---

## R. Ajuste editorial posterior a la revisión del propietario

**Fecha:** 2026-10-19
**Rama:** `feat/t05-case-studies`
**Base:** `5147872`
**Estado:** ajustes aplicados y validados localmente; casos preparados para la aprobación final del propietario. Las rutas públicas siguen desactivadas.

Esta sección conserva la historia anterior y documenta la nueva información proporcionada por el propietario, las correcciones aplicadas y las validaciones de esta ejecución.

### R.1 Información nueva recibida

- SGAA sigue en producción y continuará recibiendo soporte y mantenimiento; el desarrollo estratégico de nuevas capacidades se concentra en AuditaPy.
- SGAA: 26 empresas registradas como tenants y 161 contribuyentes registrados entre los tenants. Un indicador adicional de capacidad quedó excluido de la publicación por decisión del propietario.
- ControlLote no tiene como problema el formato de los PDF: los reportes siguen una convención estable. El desafío es verificar importes contra cláusulas contractuales y listados oficiales de precios.
- ControlLote: participación integral confirmada del autor; piloto iniciado en agosto de 2026; etapa de pruebas superada; dominio en preparación; comercialización general no iniciada.
- ControlLote: métricas agregadas con corte de agosto de 2026, procesadas en septiembre de 2026.
- AuditaPy: responsabilidades del autor confirmadas; independencia de SGAA; 12 módulos y 24 proyectos de bibliotecas; estado funcional de los módulos principales de la Fase 1.
- BoozHome: sin correcciones nuevas autorizadas. Se mantiene el contenido aprobado.

### R.2 Correcciones por proyecto

#### SGAA

- Se amplió «Mi participación» con investigación, análisis funcional, arquitectura, modelado, backend, frontend, base de datos, infraestructura, servidor, despliegue y mantenimiento.
- Se aclaró que las consultas con profesionales de auditoría no atribuyen autoría técnica a terceros.
- Se añadió el bloque de resultados con los dos indicadores autorizados y sus advertencias. Un indicador adicional de capacidad quedó excluido por decisión posterior del propietario.
- Se actualizó «Estado actual» para reflejar soporte y mantenimiento continuos.
- Se actualizó «Evolución» para distinguir SGAA de AuditaPy y evitar presentar AuditaPy como despliegue o migración automática.
- Se retiró la afirmación de que no existían datos operativos; ahora se publican solo los agregados autorizados.
- Se conservó el stack y la arquitectura confirmados.

#### ControlLote

- Se reescribió «Problema» para explicar la conciliación contractual y descartar el formato PDF como causa del problema.
- Se incorporaron clasificación de observaciones, correcciones manuales justificadas, pendientes de intervención externa y solicitud de aclaraciones.
- Se reemplazó la participación desconocida por la responsabilidad integral confirmada del autor.
- Se documentó el origen en una necesidad empresarial y la posterior oportunidad de SaaS, sin afirmar comercialización a escala.
- Se actualizó el estado con el piloto de agosto de 2026, la etapa de pruebas superada y el dominio en preparación.
- Se añadieron las siete métricas agregadas y las aclaraciones sobre errores tratados, diferencias y excepciones pendientes.
- Se estableció el corte de agosto de 2026, procesado en septiembre de 2026.
- Se retiró la referencia a documentos heterogéneos como problema principal.

#### AuditaPy

- Se reemplazó la participación desconocida por la dirección y ejecución técnica y funcional del autor.
- Se aclaró que no se atribuye la coordinación de un equipo específico sin integrantes confirmados.
- Se reforzó la independencia de SGAA: arquitectura, infraestructura, configuración, base de datos y dominio propios; sin migración automática.
- Se añadieron los 12 módulos y 24 proyectos de bibliotecas, con la advertencia de que no son un indicador de calidad o productividad.
- Se documentó la Fase 1 y el estado de AuditEngagement, ClientManagement, Identity, Multitenancy y Operator.
- Se mantuvieron Chat, Webhooks, Notifications y Files como áreas no terminadas.
- Se actualizó el estado funcional y las limitaciones.

#### BoozHome

- No se modificó el MDX. Se conservan desarrollo exclusivo, prelanzamiento, catálogo, panel administrativo, WhatsApp como funcionalidad del producto, stack y ausencia de enlace público verificado.
- La fecha de modificación del archivo permaneció en `2026-10-19 09:55:13`, anterior a esta ejecución.

### R.3 Métricas incorporadas

Se reutilizó el campo `facts` existente, sin cambiar el esquema Zod. Cada hecho usa `label`, `value` y `evidenceNote`; la nota contiene procedencia, fecha de referencia cuando existe y aclaración contextual. No se añadieron dependencias ni un dashboard.

| Caso | Indicador | Valor | Semántica y límites |
|---|---|---:|---|
| SGAA | Empresas registradas como tenants | 26 | Dato agregado autorizado; sin nombres ni fecha de corte confirmada. |
| SGAA | Contribuyentes registrados entre los tenants | 161 | Dato agregado autorizado; no se afirma unicidad entre empresas; sin fecha de corte confirmada. |
| ControlLote | Históricos de reportes procesados | 18 meses | Horizonte de información procesada; no es antigüedad del servicio. |
| ControlLote | Contratos registrados | 475 | Agregado al corte de agosto de 2026. |
| ControlLote | Lotes vendidos | 377 | Agregado al corte de agosto de 2026. |
| ControlLote | Registros de cuotas procesados | 5.314 | Agregado al corte de agosto de 2026. |
| ControlLote | Registros con errores tratados o procesados | 1.252 | Incluyen incidencias corregidas o gestionadas; no implica resolución definitiva. |
| ControlLote | Lotes con diferencias detectadas | 110 | No equivalen a incumplimientos demostrados ni a fraude. |
| ControlLote | Excepciones pendientes de corrección | 62 | No confundir con los 1.252 registros tratados. |

Las métricas se muestran mediante un bloque de indicadores en `CaseStudyLayout`, antes del cuerpo MDX. Cada tarjeta presenta valor y nota juntos para evitar que la cifra quede separada de su explicación. No se muestran en las tarjetas de la landing.

### R.4 Privacidad y seguridad

- No se publican nombres de empresas, de la loteadora, contratos, clientes, montos, PDFs, cláusulas específicas ni titularidad identificable.
- No se añadieron secretos, credenciales, formularios, analítica, cookies ni servicios externos.
- No se añadieron enlaces externos nuevos.
- Las cifras son agregadas y autorizadas; no se etiquetan como auditadas externamente.
- No se calcularon porcentajes, tasas de error ni promedios no validados.

### R.5 Cambios de archivos

Modificados en esta ejecución:

- `src/content/projects/sgaa.mdx`
- `src/content/projects/controllote.mdx`
- `src/content/projects/auditapy.mdx`
- `src/layouts/CaseStudyLayout.astro`
- `docs/implementations/T05-IMPLEMENTACION.md`

Sin cambios:

- `src/content/projects/boozhome.mdx`
- `src/content.config.ts`
- `src/lib/projects.ts`
- `src/pages/proyectos/[id].astro`
- `src/pages/index.astro`
- `package.json`, `pnpm-lock.yaml`, `astro.config.mjs`

El campo `facts` ya existía en el esquema; no se modificó. No se crearon rutas nuevas ni se alteró el gate.

### R.6 Validación técnica

| Comando | Exit | Resultado |
|---|---:|---|
| `corepack pnpm install --frozen-lockfile` | 0 | Lockfile reproducible; sin cambios |
| `corepack pnpm exec astro sync` | 0 | Contenido y tipos sincronizados |
| `corepack pnpm exec astro check` | 0 | 20 archivos; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | 0 | Build estático; 1 página (`/index.html`) |
| `git diff --check` | 0 | Sin errores de espacios ni conflictos |

Comprobaciones del build final:

- `publicApproved: false` en los cuatro MDX.
- `cardApproved: true` en los cuatro MDX.
- `dist/` sin `proyectos/`; solo `index.html`, assets e imágenes.
- Cuatro tarjetas y cuatro textos «Caso de estudio en preparación» en la landing.
- Ningún enlace a `/proyectos/` en el HTML final.
- Sin secretos, credenciales ni datos de clientes en el contenido revisado.
- BoozHome conserva WhatsApp como funcionalidad del producto.

### R.7 Validación visual local reversible

Para comprobar la representación de los casos y los indicadores sin activar el gate en el árbol de trabajo, se creó una copia temporal fuera del repositorio en `/tmp/opencode/t05-preview/`, se activaron temporalmente los cuatro `publicApproved` en esa copia y se construyó allí.

Resultados:

- Build temporal: exit 0; 5 páginas generadas.
- `/`, `/proyectos/sgaa/`, `/proyectos/controllote/`, `/proyectos/auditapy/` y `/proyectos/boozhome/`: HTTP 200 en preview local.
- Un único `H1` por página.
- El bloque «Datos agregados autorizados» se renderizó en SGAA y ControlLote.
- SGAA mostró únicamente los dos indicadores operativos aprobados.
- ControlLote mostró la distinción entre 1.252 registros tratados y 62 excepciones pendientes.
- Capturas locales: SGAA y ControlLote en escritorio y 320px; revisadas sin solapamientos ni recortes evidentes.
- El servidor de preview se detuvo y la copia temporal no forma parte del repositorio.
- El árbol de trabajo conserva `publicApproved: false` en los cuatro MDX.

La copia temporal usó un enlace simbólico a `node_modules`; pnpm emitió un aviso de instalación, pero el build y el preview local finalizaron correctamente. Ese aviso no afectó al repositorio.

### R.8 Riesgos y pendientes

- El propietario todavía no ha aprobado la versión final completa de los cuatro cuerpos MDX.
- SGAA no tiene fecha de corte confirmada para sus indicadores.
- ControlLote puede evaluarse para una futura reclasificación de `development` a `prelaunch`, pero no se cambió el estado sin decisión editorial.
- Los enlaces de SGAA y BoozHome siguen sin publicarse.
- No se ejecutaron Lighthouse, axe, Playwright, Safari, Firefox ni dispositivos reales.
- No se validó el zoom real al 200 %.
- No se ejecutó un build de producción remoto ni despliegue.

### R.9 Criterios de aceptación pendientes

| Criterio | Estado |
|---|---|
| Correcciones editoriales de SGAA aplicadas | Cumplido |
| Métricas de SGAA incorporadas y clasificadas | Cumplido |
| Problema de negocio de ControlLote corregido | Cumplido |
| Participación y métricas de ControlLote incorporadas | Cumplido |
| AuditaPy actualizada con responsabilidad y estado funcional | Cumplido |
| BoozHome intacto | Cumplido |
| Indicadores visibles en los casos | Cumplido en la copia temporal de validación |
| Gate sin activar | Cumplido |
| Build final sin rutas públicas | Cumplido |
| Aprobación final del propietario | Pendiente |
| Cierre definitivo de T05 | Pendiente |

### R.10 Estado final de Git

- Rama: `feat/t05-case-studies`.
- HEAD: `5147872`.
- Sin `git add`, commit, push, PR, merge, rebase ni despliegue.
- `publicApproved: false` en los cuatro MDX.
- `cardApproved: true` en los cuatro MDX.
- Sin cambios en `caseStudyStage`.
- Informes T01–T04 intactos.
- Sin cambios temporales de aprobación en el árbol de trabajo.
- T06 no iniciada.

---

## S. Aprobación editorial y activación definitiva de casos

**Fecha de aprobación:** 2026-10-19
**Rama:** `feat/t05-case-studies`
**Base:** `5147872`
**Estado:** cuatro casos aprobados y activados localmente; cinco páginas estáticas generadas; cambios sin comprometer.

Esta sección sustituye, para el estado final de publicación, las comprobaciones de gate de R.6, R.7, R.8, R.9 y R.10. La historia anterior se conserva como registro del proceso.

### S.1 Aprobación de los cuatro casos

El propietario aprobó expresamente la publicación de los cuatro cuerpos MDX completos:

- SGAA.
- ControlLote.
- AuditaPy.
- BoozHome.

La aprobación autoriza `publicApproved: true` y la generación de las cuatro rutas públicas. El versionado y la publicación de la rama se realizan conforme a la autorización específica de cierre. No autoriza merge ni despliegue.

### S.2 Exclusión de un indicador de SGAA

Por decisión expresa del propietario, se excluyó de la publicación un indicador adicional de capacidad de SGAA. No se reproduce su valor ni su formulación.

La exclusión se aplicó en:

- Frontmatter `facts` de `src/content/projects/sgaa.mdx`.
- Cuerpo MDX de SGAA.
- Renderizado de indicadores en `CaseStudyLayout.astro`.
- HTML generado de `/proyectos/sgaa/`.
- Referencias del informe T05 que contenían el valor numérico.

El informe conserva la trazabilidad de la exclusión sin reproducir la cifra. El indicador de 62 excepciones pendientes de ControlLote es independiente, está autorizado y permanece publicado.

### S.3 Métricas finales publicadas

| Caso | Indicador | Valor |
|---|---|---:|
| SGAA | Empresas registradas como tenants | 26 |
| SGAA | Contribuyentes registrados entre los tenants | 161 |
| ControlLote | Contratos registrados | 475 |
| ControlLote | Registros de cuotas procesados | 5.314 |
| ControlLote | Lotes con diferencias detectadas | 110 |
| ControlLote | Históricos de reportes procesados | 18 meses |
| ControlLote | Lotes vendidos | 377 |
| ControlLote | Registros con errores tratados o procesados | 1.252 |
| ControlLote | Excepciones pendientes de corrección | 62 |

Corte de ControlLote: agosto de 2026, último período mensual cerrado, procesado en septiembre de 2026.

Se mantienen las aclaraciones sobre errores tratados, diferencias detectadas y excepciones pendientes. No se calculan porcentajes, tasas ni promedios.

Las cifras estructuradas viven en `facts` y se renderizan en el bloque de indicadores. El cuerpo MDX no las duplica: explica su procedencia, fecha de corte y límites para evitar divergencias entre fuentes.

### S.4 Cambios aplicados en los MDX

#### SGAA

- Se retiró un indicador adicional de capacidad del frontmatter y del cuerpo.
- Se ajustó la participación a investigación, relevamiento y análisis, arquitectura, modelado, backend, frontend, base de datos, infraestructura, despliegue y mantenimiento.
- Se eliminó la aclaración defensiva sobre autoría técnica de terceros.
- Se conservaron 26 tenants y 161 contribuyentes con sus límites.
- Se mantuvo la continuidad de soporte y mantenimiento, con el desarrollo estratégico en AuditaPy.

#### ControlLote

- Se mantuvo el problema contractual y se evitó presentar el formato PDF como causa principal.
- Se conservaron las siete métricas y el corte de agosto de 2026.
- Se reordenaron los indicadores para priorizar 475 contratos, 5.314 registros y 110 lotes con diferencias.
- Se mantuvieron las aclaraciones sobre errores tratados, diferencias y excepciones pendientes.

#### AuditaPy

- Se conservaron la responsabilidad integral del autor, la independencia de SGAA, los 12 módulos, los 24 proyectos de bibliotecas y los estados de los módulos de la Fase 1.
- No se presentan los módulos como prueba de calidad o finalización.

#### BoozHome

- No se realizaron cambios editoriales.
- Se conserva WhatsApp como funcionalidad del producto.
- Se mantiene `prelaunch` y la ausencia de enlace público verificado.

### S.5 Activación de publicaciones

| Proyecto | `cardApproved` | `publicApproved` | `caseStudyStage` |
|---|---|---|---|
| SGAA | `true` | `true` | `documented` |
| ControlLote | `true` | `true` | `documented` |
| AuditaPy | `true` | `true` | `outline` |
| BoozHome | `true` | `true` | `outline` |

No se modificó `caseStudyStage`. No se añadió una tercera capa de autorización ni un bypass por variables o query strings.

### S.6 Enlaces del catálogo

`getApprovedProjectCards()` deriva el `href` de `publicApproved`; no se usa un arreglo manual. La landing muestra enlaces reales para:

- `/proyectos/sgaa/`
- `/proyectos/controllote/`
- `/proyectos/auditapy/`
- `/proyectos/boozhome/`

`ProjectCard` conserva el comportamiento condicional: si `cardApproved` es verdadero y `publicApproved` es falso, la tarjeta permanece visible y muestra «Caso de estudio en preparación» sin enlace.

### S.7 Resultado de las cinco rutas

Build limpio con `rm -rf dist` y `corepack pnpm run build`:

```text
dist/index.html
dist/proyectos/sgaa/index.html
dist/proyectos/controllote/index.html
dist/proyectos/auditapy/index.html
dist/proyectos/boozhome/index.html
```

Resultado: **5 páginas HTML estáticas**. `output: 'static'` y `trailingSlash: 'always'` se conservaron.

### S.8 Prueba negativa del gate

Se realizó en una copia temporal fuera del repositorio, cambiando temporalmente `publicApproved` a `false` en `auditapy.mdx`.

Resultados:

- Build: exit 0; 4 páginas.
- `dist/proyectos/auditapy/index.html`: no generado.
- La tarjeta de AuditaPy permaneció visible.
- La landing mostró tres enlaces de caso y un texto «Caso de estudio en preparación».
- No se generó un enlace a `/proyectos/auditapy/`.
- La copia temporal se eliminó.
- El árbol de trabajo conserva los cuatro `publicApproved: true`.

### S.9 Validación responsive

Se validaron las cinco páginas en 320, 375, 768, 1024 y 1440 px mediante Chrome headless y Chrome DevTools Protocol, sobre preview local.

- 25/25 combinaciones sin overflow horizontal.
- 25/25 con un único `H1`.
- Imágenes cargadas.
- Indicadores sin desbordamiento.
- Enlaces internos del header y de regreso presentes.
- Capturas locales generadas para las cinco páginas en 320 y 1440 px, fuera del repositorio.
- No se versionaron capturas.

### S.10 Accesibilidad

- Skip link: primer `Tab` enfoca «Saltar al contenido» en landing y en un caso.
- `Enter` lleva a `#contenido` y enfoca `main#contenido`.
- Foco visible con el token existente.
- `prefers-reduced-motion: reduce`: `scroll-behavior: auto` y transición `1e-05s`.
- Sin formularios, scripts ni islas Astro en el HTML generado.
- Navegación por teclado comprobada en landing y SGAA.
- No se ejecutó axe ni una auditoría automatizada de contraste. Se mantienen los tokens y ratios validados en T02/T04 y se revisaron las capturas localmente.

### S.11 Seguridad y privacidad

- Sin secretos, credenciales, IP de servidores ni topologías sensibles.
- Sin nombres de empresas participantes ni de la loteadora.
- Sin contratos, montos, PDFs, datos de clientes ni información identificable.
- Sin enlaces a repositorios privados.
- Sin enlaces a dominios de proyectos no verificados.
- El indicador excluido de SGAA no aparece en el HTML ni en los MDX.
- ControlLote conserva el dato autorizado de excepciones pendientes.
- BoozHome no se declara en producción.
- AuditaPy no se presenta como producto comercialmente disponible.
- Sin formularios, analítica, cookies ni terceros añadidos.

### S.12 Pruebas no ejecutadas

- Lighthouse.
- axe o Playwright.
- Safari, Firefox y dispositivos reales.
- Zoom real al 200 %.
- Auditoría automatizada de contraste.
- Validación de disponibilidad pública de dominios externos.
- Despliegue o build remoto.

### S.13 Riesgos restantes

- El preview local registró un 404 de `/favicon.ico`, correspondiente a T07. No afecta a las rutas ni a los enlaces.
- Canonical, Open Graph, sitemap, robots y favicon siguen pendientes de T07.
- La autorización de commit no incluye merge ni despliegue.
- Los dominios de SGAA y BoozHome permanecen como texto y no se enlazan.
- ControlLote sigue en `development`; una eventual reclasificación a `prelaunch` requiere decisión editorial.

### S.14 Resultado técnico

| Comando | Exit | Resultado |
|---|---:|---|
| `corepack pnpm install --frozen-lockfile` | 0 | Lockfile reproducible; sin cambios |
| `corepack pnpm exec astro sync` | 0 | Contenido y tipos sincronizados |
| `corepack pnpm exec astro check` | 0 | 20 archivos; 0 errores, 0 warnings, 0 hints |
| `corepack pnpm run build` | 0 | 5 páginas estáticas |
| `git diff --check` | 0 | Sin errores de espacios ni conflictos |

### S.15 Estado de Git al preparar el versionado

- Rama: `feat/t05-case-studies`.
- HEAD de partida: `5147872`.
- Cuatro `cardApproved: true`.
- Cuatro `publicApproved: true`.
- Sin cambios en `caseStudyStage`.
- Informes T01–T04 intactos.
- Sin archivos temporales de prueba dentro del repositorio.
- Los once archivos de T05 se preparan con rutas explícitas.
- El informe se incluye en el mismo commit.
- El commit y el push se ejecutan después de esta actualización, sin modificar el contenido funcional.
- T06 no iniciada.

### S.16 Recomendaciones para T06

1. Reevaluar la navegación móvil si el header necesita un menú desplegable.
2. Mantener el gate condicional de tarjetas para futuras publicaciones parciales.
3. No añadir hidratación React mientras la navegación siga siendo HTML/CSS.
4. Dejar favicon, canonical, Open Graph, sitemap y robots para T07.
5. Revisar el 404 de `/favicon.ico` en T07.
6. Versionar T05 y abrir el Pull Request en borrador; no iniciar T06.
