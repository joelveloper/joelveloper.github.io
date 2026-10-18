# PRD — Portafolio Profesional de Joel Cantero

**Versión:** 1.0 (propuesta para revisión)  
**Fecha:** 2026-10-18  
**Producto:** portafolio personal  
**Responsable de decisiones:** Joel Cantero  
**Repositorio propuesto:** `joelveloper.github.io`

## 1. Problema y oportunidad

El perfil de GitHub ya presenta conocimientos y proyectos, pero sus repositorios principales permanecen privados. Esta circunstancia impide que potenciales clientes, reclutadores y profesionales puedan evaluar fácilmente el problema abordado, el alcance de la solución y la participación técnica del desarrollador. Un README no ofrece suficiente espacio para capturas autorizadas, flujos funcionales, decisiones de arquitectura y resultados verificados.

El sitio debe complementar, no reemplazar, el GitHub personal. También debe mantener separadas la identidad profesional de Joel y la eventual marca comercial Oñondive.

## 2. Visión de producto

Una web personal de alto nivel editorial y técnico que comunique con claridad la experiencia de Joel Cantero desarrollando aplicaciones empresariales, SaaS y software exclusivo para clientes; con cuatro proyectos reales y casos de estudio que puedan enriquecerse sin reescribir el sitio.

**Propuesta de valor inicial:** «Desarrollo software para automatizar procesos, mejorar la gestión y resolver problemas reales».

## 3. Usuarios objetivo y necesidades

| Segmento | Necesidad | Evidencia esperada |
|---|---|---|
| Empresas y potenciales clientes | Entender capacidades, confianza y pertinencia sectorial | Problema resuelto, solución, alcance y contacto |
| Reclutadores | Ubicar especialización y experiencia | Stack, funciones realizadas, proyectos, GitHub |
| Arquitectos y desarrolladores | Comprender rigor técnico | Decisiones de arquitectura, trade-offs y stack |
| Personas que conocen la futura marca Oñondive | Relacionar proyectos con trayectoria personal | Referencia secundaria, sin atribución legal prematura |

## 4. Objetivos y señales de éxito

- Publicar una versión accesible bajo una URL propia de GitHub Pages.
- Mostrar cuatro proyectos veraces y categorizados correctamente.
- Proveer cuatro rutas de detalle con contenido útil; al menos SGAA y ControlLote tendrán estructura de caso de estudio desde el MVP, aunque algunos resultados estén pendientes de verificación.
- Ofrecer un contacto funcional (correo, GitHub y redes actuales).
- Permitir actualizar estados, textos e imágenes desde ficheros de contenido tipados.
- Cumplir criterios de calidad de `docs/06-CALIDAD-Y-VALIDACION.md`.

No se promete una cantidad de visitas, solicitudes de empleo ni leads: pueden medirse posteriormente, si se decide añadir analítica respetuosa de la privacidad.

## 5. Alcance MVP

**Páginas públicas:**

1. `/`: header, hero, presentación, competencias, proyectos destacados, enfoque de trabajo, mención discreta de Oñondive y contacto.
2. `/proyectos/sgaa/`.
3. `/proyectos/auditapy/`.
4. `/proyectos/controllote/`.
5. `/proyectos/boozhome/`.
6. `/404/` o comportamiento 404 apropiado para hosting estático.

**Funcionalidades:** navegación con teclado, menú móvil usable, enlaces externos, metadatos sociales/SEO, `sitemap.xml`, `robots.txt`, estilos adaptables y contenido estructurado por proyecto.

**No alcance MVP:** backend, cuentas, base de datos, formularios con almacenamiento, newsletter, blog, CMS, dashboard, analítica por terceros, chat, administración, búsqueda compleja, internacionalización, reseñas/testimonios inventados o integración con API de GitHub para estadísticas.

## 6. Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| FR-01 | Hero con identidad, especialización, propuesta de valor y CTA | Se entiende el perfil sin desplazamiento excesivo en desktop; móvil mantiene legibilidad |
| FR-02 | Navegación a secciones y proyectos | Enlaces válidos, foco visible, menú móvil operable sin ratón |
| FR-03 | Catálogo de cuatro proyectos | Cada ficha refleja tipo, estado, resumen, stack y CTA de detalle |
| FR-04 | Página individual de cada proyecto | Contexto, problema, solución, rol, ingeniería, estado, evidencia, resultados y límites |
| FR-05 | Publicación desde contenido tipado | Cambiar estado/título/resumen no requiere modificar componentes de UI |
| FR-06 | Canales profesionales | GitHub, correo `mailto:` y redes enlazan al destino correcto |
| FR-07 | Estados con semántica correcta | Prelanzamiento ≠ producción; histórico procesado ≠ meses activo |
| FR-08 | Referencia a Oñondive | Iniciativa en desarrollo, secundaria a la identidad personal |
| FR-09 | Enlaces y recursos bajo aprobación | No se publica evidencia no autorizada; falta de captura no rompe el layout |
| FR-10 | Acceso directo a casos | Desde homepage se llega a cada proyecto y puede volver al inicio |
| FR-11 | Comportamiento 404 | Rutas inexistentes no se presentan como proyectos válidos |

## 7. Modelo editorial de cada caso de estudio

1. Identificación: título, categoría (SaaS / proyecto para cliente), estado.
2. Contexto: sector y origen del problema, sin revelar información contractual.
3. Desafío: tareas o riesgos del flujo anterior.
4. Solución: capacidades funcionales relevantes, sin promesas no verificadas.
5. Mi participación: responsabilidades atribuibles de forma verificable.
6. Arquitectura: tecnologías, razones de elección y compromisos.
7. Flujo visual: diagrama original o captura autorizada.
8. Resultados: cifras solo con fuente y método; si no se conocen, «pendiente de documentación».
9. Evolución y aprendizajes: estado actual y decisiones futuras.
10. Enlace externo solamente si funciona y puede publicarse.

## 8. Inventario inicial y afirmaciones permitidas

| Proyecto | Naturaleza | Estado inicial permitido | Observaciones |
|---|---|---|---|
| SGAA | SaaS | En producción | URL de referencia `https://redfor-ti.com.py/`; acceso y autorizaciones visuales por comprobar |
| AuditaPy | SaaS | Nueva versión en desarrollo | Evolución de SGAA; no confundir con producto ya lanzado |
| ControlLote | SaaS | En desarrollo / procesamiento histórico en uso (precisar) | Procesa más de 18 meses de información por empresa, dato proporcionado por el autor |
| BoozHome | Proyecto exclusivo para un cliente | Preparado para lanzamiento, dominio pendiente | No afirmar despliegue público hasta verificarlo; no atribuir a Oñondive titularidad |

**Criterio editorial:** las descripciones dadas por el autor sirven de base, pero no sustituyen la revisión de capturas, estadísticas, permisos, licencias o titularidad de los productos.

## 9. Requisitos no funcionales

- **Rendimiento:** sitio prerenderizado; mínimo JavaScript hidratado; imágenes optimizadas. Meta de Lighthouse (ensayo en móvil): rendimiento ≥ 90 en mediciones controladas, sin tratarla como garantía de campo.
- **Accesibilidad:** objetivo WCAG 2.2 AA; navegación por teclado, foco, jerarquía de encabezados, alt, contraste y reducción de movimiento.
- **Seguridad:** sin secretos en el repo, sin scripts o trackers no aprobados, dependencias fijadas y enlaces seguros.
- **Compatibilidad:** Chrome, Firefox, Safari, Edge actuales; ancho de referencia 320/375/768/1024/1440 px.
- **SEO:** títulos y descripciones únicas, OG, canonical y sitemap basados en URL real.
- **Mantenibilidad:** TypeScript estricto, componentes pequeños, MDX con esquema validado y contenido desacoplado.
- **Privacidad:** no recopilar datos ni integrar telemetría por defecto.

## 10. Restricciones y dependencias

- Hosting estático inicialmente en GitHub Pages; repositorio `joelveloper.github.io` (raíz, sin `base` de subruta).
- Los repositorios de proyectos permanecen privados.
- No debe copiarse el diseño, código, assets ni identidad de FullStackHero: solo se toma inspiración de principios visuales generales.
- BoozHome requiere consentimiento del cliente para recursos protegidos o información no pública.
- El nombre Oñondive no supone todavía una entidad constituida ni derechos de marca confirmados.

## 11. Criterios de aceptación del release MVP

- Cuatro fichas y cuatro rutas generan estáticamente sin errores.
- No existen datos ficticios presentados como hechos, logos ajenos no autorizados ni enlaces vacíos.
- La página principal y casos son navegables por teclado en móvil y desktop.
- `pnpm install --frozen-lockfile`, `pnpm exec astro check`, `pnpm build` y pruebas disponibles terminan correctamente.
- CI en PR comprueba el build y la publicación por GitHub Actions es verificable mediante URL real.
- Se revisan las imágenes, enlaces y textos para no filtrar datos empresariales.
- Estado de BoozHome y demás proyectos revisado inmediatamente antes de publicar.

## 12. Preguntas abiertas que no bloquean el diseño

- Autorización de uso de capturas de BoozHome y material de SGAA.
- Detalle verificable del rol y resultados de SGAA.
- Empresas, documentos, cuotas y anomalías agregadas de ControlLote (sin identificadores personales).
- URL de producción y fecha efectiva de lanzamiento de BoozHome.
- Si debe mostrarse disponibilidad profesional o invitación a contrataciones; **no** afirmar que está disponible sin confirmación.
