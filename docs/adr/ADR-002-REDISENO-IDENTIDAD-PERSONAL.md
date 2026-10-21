# ADR-002: Rediseño de marca personal y dirección visual inspirada en FSH

## Estado
Aprobado (2026-10-20 14:08)

Revisado (2026-10-20): consolidación de la identidad cromática **Cobre Mineral + Zinc** y del texto definitivo del Hero; después, revisión de diseño del propietario sobre la implementación local de T09–T12 (ver «Historial de revisiones»).

## Contexto
El sitio web presentaba una estética y lenguaje orientados a la venta de productos SaaS/software corporativo, alejándose del objetivo principal del propietario: presentar su marca personal, trayectoria, formación y experiencia real en desarrollo .NET / C#.

## Decisión
1. Reorientar todo el copywriting hacia la primera persona y la trayectoria personal de Joel Cantero, confirmando disponibilidad para oportunidades y proyectos a tiempo parcial.
2. Adoptar la identidad cromática **Cobre Mineral + Zinc** y **eliminar el azul corporativo** anterior: base zinc casi neutra y un único acento cobre reservado a CTA, enlaces destacados, foco, estados activos y el anillo orbital. Valores de referencia aprobados:
   - Oscuro: fondo `#0D0E11`, superficie base `#19191B`, superficie elevada / borde de referencia `#343438`, acento cobre `#E6A47B`, texto principal `#F1EFEB`.
   - Claro (referencias iniciales): fondo `#FAF9F7`, texto principal `#252526`, acento cobre profundo `#98532A`.
   - Los demás tokens (bordes, texto secundario, superficies claras, estados) se completan en T09. Detalle en `02-DISENO-VISUAL.md §3`.
3. Aplicar un patrón de fondo de puntos (`bg-dots`) con máscara radial y baja intensidad, en tono neutro.
4. Simplificar el header a 56px de alto, sin bordes inferiores, ancho de 1280px y limitar la navegación a 4 accesos principales.
5. Implementar un selector de tema binario (Claro / Oscuro) de 32px.
6. Reestructurar la sección Hero para dar protagonismo a la fotografía circular de Joel Cantero, envuelta en un anillo orbital con gradiente cobre animado con CSS puro en la columna izquierda, dejando la presentación, CTA y redes en la columna derecha.
7. Usar en el Hero el texto definitivo aprobado por el propietario, sin reescribirlo durante T09–T12:
   - Identificador (secundario): «Full Stack .NET Developer».
   - Encabezado: «Hola, soy Joel Cantero.»
   - Texto introductorio: «Construyo aplicaciones web y sistemas de gestión con C# y .NET. Me apasiona resolver problemas reales mediante código bien estructurado, desde la arquitectura hasta el despliegue.»
   - CTA: «Hablemos» (principal) y «Ver mis proyectos» (secundario).
8. Exigir contraste **WCAG 2.2 AA** medido en ambos temas para todas las combinaciones finales de color; ningún contraste se da por aprobado sin medición.
9. Implementar el rediseño de forma incremental (T09 tokens y fondo → T10 header y toggle → T11 Hero → T12 copywriting → T13 QA) sin modificar la arquitectura estática de Astro (ADR-001).

## Consecuencias

### Positivas
- El sitio comunica quién es Joel y no un producto; el tono coincide con el objetivo del propietario.
- Navegación más breve y header más ligero; menos ruido visual en toda la página.
- El retrato y el acento cobre dan una identidad propia que no depende de imitar componentes de FSH.
- Todo se resuelve con Astro + CSS: no se añade React, dependencias de red ni JavaScript hidratado.

### Costes y riesgos
- **Contraste:** el cambio de paleta invalida la verificación de contraste de T07; debe repetirse en ambos temas (T09 y T13). Los siete valores de referencia no forman por sí solos una paleta accesible completa: `#343438` frente a los fondos oscuros queda por debajo de 3:1 y no puede ser el único contorno de un control (`02-DISENO-VISUAL.md §3`).
- **Selector binario:** al elegir un tema ya no existe la opción explícita «Sistema»; el sistema solo se respeta mientras no haya preferencia guardada.
- **Retrato:** la imagen pasa a ser candidata a LCP; hay que vigilar peso y formato. Hasta recibir la foto definitiva se usa un placeholder que no debe simular una fotografía real.
- **Texto del Hero:** el texto aprobado es más largo que una bajada de dos líneas; su encaje responsive se resuelve con diseño, no reescribiéndolo.
- **Proximidad visual con FSH:** el fondo `#0D0E11` coincide con el valor observado en FSH y el patrón de puntos es un principio que también usa. La identidad se diferencia con el acento cobre, el retrato, la tipografía y el copy propios; no se reutilizan código, assets, textos ni valores de acento de FSH (el ámbar observado en FSH, `#e8a54b`, no forma parte de esta paleta).
- **Retrabajo:** el bloque de rediseño (T09–T12) se ejecuta antes de la QA final, lo que retrasa el lanzamiento respecto al plan original.

## Restricciones que se mantienen
- ADR-001 sigue vigente: Astro estático, Tailwind CSS v4, shadcn/ui sobre Radix y React solo para interactividad necesaria.
- Prohibido copiar código, logos, ilustraciones, textos o composición exacta de FSH (`AGENTS.md`, `01-PRD.md §10`, `02-DISENO-VISUAL.md §1`).
- No inventar métricas, clientes, testimonios, años de experiencia ni certificaciones.
- Sin analítica, rastreo, cookies de seguimiento ni integraciones externas.

## Documentos afectados
- `docs/01-PRD.md` §2 (visión, propuesta de valor, tono, disponibilidad y presentación personal aprobada §2.5), §5, FR-01, FR-06 y §12.
- `docs/02-DISENO-VISUAL.md` §1, §2, §3, §5, §6, §8, §9 y §11.
- `docs/04-PLAN-DE-TAREAS.md`: nuevas T09–T12; la QA y el lanzamiento pasan a T13 y el enriquecimiento editorial a T14.
- `docs/investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md`: nota de precedencia; sus observaciones originales se conservan.

## Historial de revisiones
- **2026-10-20 14:08 — Aprobación inicial.** Base zinc neutra con un acento cálido genérico (ámbar/naranja) pendiente de valores, fondo de puntos, header de 56px, toggle binario y Hero con retrato.
- **2026-10-20 — Consolidación (FASE 1).** El acento cálido genérico se concreta como **Cobre Mineral + Zinc** con valores de referencia para ambos temas; se fija el texto definitivo del Hero y los CTA «Hablemos» / «Ver mis proyectos»; se explicitan el requisito de contraste medido WCAG 2.2 AA y la implementación incremental T09–T13. No cambia la arquitectura ni las decisiones de header, navegación y toggle.
- **2026-10-20 — Revisión de diseño del propietario (sobre T09–T12 locales).** Decisiones expresas del propietario que prevalecen sobre las propuestas visuales anteriores (detalle en `02-DISENO-VISUAL.md` §3, §5, §6, §7 y §11; implementación en los informes T10–T12):
  1. **Hero de altura completa:** como mínimo el alto visible menos el header (`100svh`, respaldo `100vh`); el inicio de «Sobre mí» queda fuera de la primera pantalla; en pantallas bajas el Hero crece sin recortar contenido.
  2. **Monograma simplificado:** máximo tres círculos concéntricos (anillo orbital, disco y un círculo interior tenue), monograma «JC» mucho mayor, sin brillos superpuestos; se mantienen el anillo cobre, `prefers-reduced-motion` y la preparación para `astro:assets`.
  3. **Sobre mí:** se restauran literalmente los tres párrafos aprobados por el propietario; se rechazan las reescrituras previas de T12.
  4. **Nuevas tarjetas asimétricas:** la sección 02 pasa a cinco bloques (1 + 2 / 1 + 1 + 1 en desktop) sin líneas de tecnologías repetidas.
  5. **Animaciones originales inspiradas en FSH:** elevación del bloque, halo cobre/zinc en la esquina superior derecha y barras verticales decorativas animadas, solo con hover y solo con `transform`/`opacity`; sustituyen el verde de la referencia por la paleta propia.
  6. **Alternancia de fondos:** secciones alternas con `--background-alt` (`#19191B` / `#F1F0ED`), sin acentos nuevos.
  7. **Header:** toggle y monograma discretos (fondo transparente, borde neutro, icono atenuado; cobre solo en foco y estado activo); encabezados 01–04 con línea fina zinc; enlaces sin subrayado en todo el sitio.
  8. **Permanencia del signo `+` en los indicadores:** el `+` antepuesto en `CaseStudyLayout.astro` (`+{fact.value}`) es la presentación aprobada de indicadores de proyectos activos cuyas cantidades siguen creciendo. Se conserva tal cual; no indica una cifra actualizada en tiempo real ni se modifica ningún valor. Sustituye la propuesta anterior de eliminarlo (T12 §15.2), que deja de ser un pendiente.

  No cambia la arquitectura (ADR-001), ni se añaden dependencias, rutas o integraciones.
- **2026-10-20 — Segunda revisión visual del propietario (tras probar la versión local).** Decisiones expresas que modifican la revisión anterior (detalle en `02-DISENO-VISUAL.md` §1, §6, §7, §9 y §11; implementación en los informes T10–T12):
  1. **Retrato:** se pasa de un máximo de tres a **cinco círculos concéntricos visibles** en total (anillo orbital, borde del disco, dos círculos intermedios finos y el círculo principal con «JC»), porque la simplificación dejaba solo dos niveles perceptibles. El anillo pasa de 12 s a **24 s por vuelta**. _(Composición, duración y geometría sustituidas por la revisión definitiva del 2026-10-21.)_
  2. **Navegación:** accesos en seminegrita y **sección activa** (cobre + punto, `aria-current="location"`) actualizada al desplazarse mediante `IntersectionObserver`; «Proyectos» marcado desde el servidor en las páginas de detalle. Sustituye a la decisión de T10 de no tener estado activo.
  3. **Monograma del header:** letras mayores (14px) dentro del mismo círculo de 32px.
  4. **Encabezados numerados:** disposición corregida a «01 · Sobre mí ───» (la línea, después del nombre); sustituye a «01 ─── Sobre mí».
  5. **Halo de las tarjetas:** más pequeño y tenue, compartido por las secciones 02 y 04 (`.card-glow`).
  6. **Proyectos:** borde con gradiente cobre animado, lento y de baja intensidad, también sin hover; estático con movimiento reducido.
  7. **Footer:** iconos SVG locales junto a Correo, GitHub, YouTube e Instagram.
  8. **Sitios web de proyectos:** enlace «Visitar sitio web» a partir del campo `externalUrl` para SGAA (`https://redfor-ti.com.py/`) y BoozHome (`https://boozhome.com.py/`), URL proporcionadas por el propietario. No modifica estados (`production`, `prelaunch`) ni descripciones.

  Se mantienen todas las decisiones anteriores (Hero de primera pantalla, textos literales del Hero y de «Sobre mí», signo `+`, paleta, fondo de puntos, alternancia de fondos, 4 accesos, toggle binario, cinco bloques sin stack, enlaces sin subrayado). Las descripciones de los proyectos, el texto introductorio de Proyectos y el CTA «Ver caso de estudio» quedan **pendientes de elección del propietario** y no se modifican. _(Resuelto en la revisión definitiva del 2026-10-21.)_ Sin dependencias nuevas.
- **2026-10-21 — Ajustes finales del propietario (previos al commit de T09–T12).**
  1. **Monograma del Hero:** se elimina el relleno del círculo que contiene «JC» y las letras pasan del 30 % al 44 % del diámetro del retrato, en peso 700. Se conservan los cinco círculos, el único anillo orbital cobre de 24 s, la sombra, el tamaño del retrato y la preparación para la fotografía. _(Sustituido por la revisión definitiva del 2026-10-21.)_
  2. **Favicon:** se sustituye el favicon azul (`#2557A7`) por un monograma «JC» cobre `#E6A47B` sobre disco zinc `#0D0E11`, en SVG e ICO (16/32/48 px). _(Sustituido por la revisión definitiva del 2026-10-21: sin disco de fondo.)_

  La imagen Open Graph sigue en la identidad azul anterior; su revisión queda para T13. Sin dependencias nuevas.
- **2026-10-21 — Revisión definitiva (aprobación del propietario y cierre de T09–T12).** El propietario revisó visualmente la implementación local y aprobó definitivamente T09–T12. Esta entrada fija el estado vigente y prevalece sobre las entradas anteriores en lo que las contradiga (detalle en `02-DISENO-VISUAL.md` §5 y §6; implementación en `T09-IMPLEMENTACION.md §25` y `T11-IMPLEMENTACION.md §18–§19`):
  1. **Retrato y monograma del Hero:** **dos círculos concéntricos**: el anillo orbital exterior y un único círculo interior de 1px, con el 80 % del diámetro exterior y `--foreground` al 10 %. Es la geometría final que eligió el propietario, editando él mismo el componente: redujo los cuatro círculos interiores equiespaciados de la propuesta previa a uno solo, y lo confirmó antes del commit. Sustituye a los «cinco círculos» de las entradas anteriores. Esta geometría no depende del texto: el círculo no se desplaza ni se redimensiona para acomodar las letras. El interior del retrato es transparente, sin disco ni relleno. «JC» va en una **capa superior independiente**, centrada, al 62 % del diámetro del retrato y en peso 700, **por delante** de las líneas circulares, sin fondo, disco ni placa propios. Al configurar la fotografía personal (`astro:assets`), el monograma y los círculos interiores desaparecen y solo quedan el anillo y la foto.
  2. **Anillo orbital:** gradiente Cobre Mineral, limitado por máscara a un anillo de 3px. Rotación continua y lineal de **45 s por vuelta**. Estático con `prefers-reduced-motion`.
  3. **Favicon:** monograma «JC» de trazos, **sin disco de fondo** y con transparencia real. El SVG es adaptativo (`prefers-color-scheme`): cobre profundo `#98532A` en tema claro, cobre mineral `#E6A47B` en oscuro y respaldo `#B36F46`. El ICO es estático y transparente (16/32/48 px, `#B36F46`). Sin colores de la identidad azul anterior.
  4. **Proyectos (decisiones editoriales del propietario):** introducción de la sección, opción A; resúmenes de SGAA y ControlLote, opción A; de AuditaPy y BoozHome, opción B (textos literales en `T12-IMPLEMENTACION.md §18.1`). El CTA de las tarjetas es **«Ver proyecto»**.

  Se mantienen las demás decisiones de las revisiones anteriores (Hero de primera pantalla y sus textos literales, tres párrafos de «Sobre mí», cinco bloques asimétricos, animaciones de tarjetas, alternancia de fondos, navegación activa, toggle binario, header discreto, encabezados «01 · Sobre mí ───», enlaces sin subrayado, enlaces externos de SGAA y BoozHome, signo `+` en los indicadores). No cambia la arquitectura (ADR-001), ni se añaden dependencias, rutas o integraciones. La imagen Open Graph y la QA final siguen pendientes de T13.

## Referencias
- `docs/investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md`
- `docs/adr/ADR-001-STATIC-ASTRO.md`
- https://fullstackhero.net/ (inspiración de principios visuales, no plantilla)
