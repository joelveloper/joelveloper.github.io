# ADR-002: Rediseño de marca personal y dirección visual inspirada en FSH

## Estado
Aprobado (2026-10-20 14:08)

## Contexto
El sitio web presentaba una estética y lenguaje orientados a la venta de productos SaaS/software corporativo, alejándose del objetivo principal del propietario: presentar su marca personal, trayectoria, formación y experiencia real en desarrollo .NET / C#.

## Decisión
1. Reorientar todo el copywriting hacia la primera persona y la trayectoria personal de Joel Cantero, confirmando disponibilidad para oportunidades y proyectos a tiempo parcial.
2. Reemplazar la paleta azul corporativa por una base zinc neutra y un patrón de fondo con puntos (`bg-dots`) con máscara radial.
3. Simplificar el header a 56px de alto, sin bordes inferiores, ancho de 1280px y limitar la navegación a 4 accesos principales.
4. Implementar un selector de tema binario (Claro / Oscuro) de 32px.
5. Reestructurar la sección Hero para dar protagonismo al retrato personal envuelto en un anillo orbital animado con CSS puro en la columna izquierda, dejando la presentación, CTA y redes en la columna derecha.

## Consecuencias

### Positivas
- El sitio comunica quién es Joel y no un producto; el tono coincide con el objetivo del propietario.
- Navegación más breve y header más ligero; menos ruido visual en toda la página.
- El retrato y el acento cálido dan una identidad propia que no depende de imitar componentes de FSH.
- Todo se resuelve con Astro + CSS: no se añade React, dependencias de red ni JavaScript hidratado.

### Costes y riesgos
- **Contraste:** el cambio de paleta y el acento ámbar invalidan la verificación de contraste de T07; debe repetirse en ambos temas (T09 y T13).
- **Selector binario:** al elegir un tema ya no existe la opción explícita «Sistema»; el sistema solo se respeta mientras no haya preferencia guardada.
- **Retrato:** la imagen pasa a ser candidata a LCP; hay que vigilar peso y formato. Hasta recibir la foto definitiva se usa un placeholder que no debe simular una fotografía real.
- **Proximidad visual con FSH:** el fondo `#0d0e11` coincide con el valor observado en FSH y el patrón de puntos es un principio que también usa. La identidad se diferencia con acento, retrato, tipografía y copy propios; no se reutilizan código, assets, textos ni valores de acento de FSH.
- **Retrabajo:** el bloque de rediseño (T09–T12) se ejecuta antes de la QA final, lo que retrasa el lanzamiento respecto al plan original.

## Restricciones que se mantienen
- ADR-001 sigue vigente: Astro estático, Tailwind CSS v4, shadcn/ui sobre Radix y React solo para interactividad necesaria.
- Prohibido copiar código, logos, ilustraciones, textos o composición exacta de FSH (`AGENTS.md`, `01-PRD.md §10`, `02-DISENO-VISUAL.md §1`).
- No inventar métricas, clientes, testimonios, años de experiencia ni certificaciones.
- Sin analítica, rastreo, cookies de seguimiento ni integraciones externas.

## Documentos afectados
- `docs/01-PRD.md` §2 (visión, propuesta de valor, tono y disponibilidad), §5, FR-01, FR-06 y §12.
- `docs/02-DISENO-VISUAL.md` §1, §2, §3, §5, §6, §8, §9 y §11.
- `docs/04-PLAN-DE-TAREAS.md`: nuevas T09–T12; la QA y el lanzamiento pasan a T13 y el enriquecimiento editorial a T14.

## Referencias
- `docs/investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md`
- `docs/adr/ADR-001-STATIC-ASTRO.md`
- https://fullstackhero.net/ (inspiración de principios visuales, no plantilla)
