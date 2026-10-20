# ADR-002: Rediseño de marca personal y dirección visual inspirada en FSH

## Estado
Aprobado (2026-10-20 14:08)

Revisado (2026-10-20): consolidación de la identidad cromática **Cobre Mineral + Zinc** y del texto definitivo del Hero (ver «Historial de revisiones»).

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

## Referencias
- `docs/investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md`
- `docs/adr/ADR-001-STATIC-ASTRO.md`
- https://fullstackhero.net/ (inspiración de principios visuales, no plantilla)
