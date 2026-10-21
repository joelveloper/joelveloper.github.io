# Informe de implementación — T12

- **Tarea:** T12 — Rediseño: refactorización de copywriting y marca personal
- **Fecha:** 2026-10-20
- **Rama:** `feat/t09-visual-tokens-dot-background` (rama local de T09; no se creó rama nueva)
- **Commit de partida:** `8854baf1fa60ff7ec3efa1b140c79b1a9a7b81b1`, con T09 sin preparar en el árbol
- **Estado:** aprobada definitivamente por el propietario tras su revisión visual (2026-10-21) y versionada en el commit integrado de T09–T12 `feat(portfolio): complete personal identity redesign`, con commit y push de la rama autorizados; **sin PR, merge ni despliegue**. Cierre en §19.

---

## 1. Ejecución anticipada conjunta

T12 se implementó en la misma ejecución que T10 y T11, sobre T09 sin integrar, por autorización expresa del propietario (`T10-IMPLEMENTACION.md §1`). La misma instrucción autorizó cambios editoriales en los resúmenes MDX siempre que conserven hechos, estados, cifras y atribuciones (el backlog los condicionaba a esa aprobación).

## 2. Diagnóstico inicial

El copy fuera del Hero conservaba el tono de *landing* comercial identificado en INV-001 §3.1: eslóganes de producto («Productos construidos sobre problemas concretos», «Un proceso, no una plantilla», «Cuatro áreas, una mirada de extremo a extremo»), discurso SaaS («pensados para crecer sin perder orden»), *startup pitch* en Oñondive («necesidades reales del mercado paraguayo») y «profesional» de relleno en contacto, pie y etiquetas accesibles. La disponibilidad decía «… y colaboraciones», distinta de la confirmada en `01-PRD.md §2.4`.

## 3. Objetivo y alcance

Reescribir en primera persona el contenido del Home fuera del Hero, `profile.ts`, footer, metadatos y `aria-label` según `01-PRD.md §2`; etiquetas «Correo» y «Hablemos»; disponibilidad confirmada; resúmenes MDX solo donde había tono comercial. **Fuera de alcance:** el texto del Hero (T11, intacto), estados, cifras, fechas, rutas, enlaces, imágenes, Open Graph, favicon, sitemap, robots, `astro.config.mjs` y workflows.

## 4. Textos reemplazados

| Ubicación | Antes | Después |
|---|---|---|
| `profile.ts` `availability` | Abierto a oportunidades profesionales y colaboraciones | Abierto a oportunidades profesionales y proyectos a tiempo parcial. |
| `profile.ts` (nuevo `summary`) | — | Desarrollador de software en Asunción, Paraguay. |
| `profile.ts` `initiative` | `note`: Una iniciativa que estoy construyendo | `note`: Iniciativa personal; `description`: Oñondive es una iniciativa personal que estoy desarrollando para dar forma a nuevas ideas y proyectos de software en Paraguay. |
| Sobre mí, título | Del problema al software que evoluciona | Cómo llegué hasta aquí |
| Sobre mí, texto | 3 párrafos (proyectos de aprendizaje; app de 2020 origen de SGAA; evolución web desde agosto de 2025 «de extremo a extremo»; «software con identidad propia que resuelva problemas reales») | 4 párrafos en progresión: aprendizaje autodidacta con proyectos personales → aplicación de escritorio de 2020 para archivos de auditoría, comercializada, punto de partida de SGAA → SGAA web, comercializada desde agosto de 2025, con todas las etapas a mi cargo y trabajo con profesionales de auditoría → interés por la calidad y mantenibilidad y formación continua |
| Trayectoria | 3 hitos | Se añade «Inicios — Aprendizaje autodidacta con proyectos personales» (sin año, porque no hay fecha documentada); redacción más natural de 2020 y agosto de 2025; «Actualidad»: «Mantengo SGAA en producción y desarrollo AuditaPy y ControlLote» |
| Bloque de formación | Formación continua | Formación (título y estado sin cambios) |
| Especialidades, título | Cuatro áreas, una mirada de extremo a extremo | En qué trabajo |
| Especialidades, descripción | Trabajo en la intersección entre producto, arquitectura e implementación. La profundidad técnica se adapta a cada problema, no al revés. | Estas son las áreas en las que he adquirido experiencia desarrollando mis proyectos. |
| Tarjeta 1 | Aplicaciones empresariales — «Software para procesos de gestión…» | Aplicaciones web y sistemas de gestión — experiencia en procesos de gestión y control, como la organización y supervisión de auditorías |
| Tarjeta 2 | Plataformas SaaS — «Productos… pensados para crecer sin perder orden.» | Aplicaciones multiempresa — plataformas donde cada empresa opera de forma independiente, con su propia administración, usuarios e identidad |
| Tarjeta 3 | Arquitectura de software — «Diseño de soluciones modulares…» | Arquitectura de software — módulos con límites claros y responsabilidades separadas para mantener y ampliar el sistema |
| Tarjeta 4 | Automatización documental — lista de capacidades | Procesamiento y automatización documental — importación de PDF, extracción de datos y reglas contractuales para conciliar y detectar diferencias |
| Bloque de infraestructura | Full Stack — «Del análisis al despliegue» — «También cubro la infraestructura…» | Infraestructura — «También me ocupo de los servidores» — «Además del código, me encargo de la puesta en marcha: servidores Linux/Ubuntu, Nginx como proxy inverso y contenedores Docker.» |
| Proyectos, título | Productos construidos sobre problemas concretos | Proyectos en los que he trabajado |
| Proyectos, descripción (nueva) | — | Plataformas propias y un desarrollo para un cliente. En cada caso cuento el contexto, mi trabajo y el estado actual del proyecto. |
| Cómo trabajo, antetítulo / título | Cómo trabajo / Un proceso, no una plantilla | Proceso / Cómo trabajo (el antetítulo cambia para no repetir el título) |
| Cómo trabajo, descripción | Un enfoque personal para reducir incertidumbre… | Así suelo organizar mis proyectos, desde entender el problema hasta probar y mejorar lo que construyo. |
| Etapas (títulos conservados) | Textos breves con «de extremo a extremo» y «arquitectura que pueda evolucionar» | Reescritos en primera persona y sin jerga (contexto y restricciones; alcance, datos y reglas; desarrollo por partes con seguridad, claridad y usabilidad; pruebas con casos reales y ajustes) |
| Oñondive | Iniciativa / «Oñondive — Una iniciativa que estoy construyendo» / «…soluciones tecnológicas para necesidades reales del mercado paraguayo» / «…software útil, pensado para evolucionar y crecer…» | Iniciativa personal / «Oñondive» / texto propuesto por el propietario / «Todavía está en definición: por ahora es un proyecto propio que iré construyendo poco a poco.» |
| Contacto, título | Contacto profesional | Hablemos |
| Contacto, texto | Para conversar sobre un proyecto, una colaboración o una oportunidad profesional, el correo es el canal más directo. También puedes encontrarme en las redes profesionales. | Si quieres conversar sobre un proyecto, una oportunidad o una colaboración, puedes escribirme por correo o encontrarme en mis redes. + línea de disponibilidad con marcador verde |
| Contacto, etiquetas | Correo profesional · `aria-label="Redes profesionales"` | Correo · `aria-label="Redes"` |
| Footer | Software para problemas reales. Aplicaciones empresariales, plataformas SaaS y automatización documental. · `aria-label="Enlaces profesionales"` | Desarrollador de software en Asunción, Paraguay. (`profile.summary`) · `aria-label="Contacto y redes"` |
| `<title>` del Home | Joel Cantero — Full Stack .NET Developer | Joel Cantero \| Full Stack .NET Developer |
| `description` del Home | …Aplicaciones empresariales, plataformas SaaS, arquitectura de software y automatización documental. | Portafolio de Joel Cantero, desarrollador Full Stack .NET en Asunción, Paraguay. Conoce mi trayectoria, tecnologías y proyectos de software. |
| `auditapy.mdx` `summary` | Producto SaaS independiente que estoy desarrollando como evolución técnica de SGAA… | Plataforma SaaS independiente que estoy desarrollando como evolución técnica de SGAA… (resto igual) |
| `controllote.mdx` `summary` | Plataforma SaaS en desarrollo. Inició su utilización piloto en agosto de 2026 y prepara su disponibilidad comercial. Concilia comisiones inmobiliarias a partir de informes PDF y reglas contractuales. | Plataforma SaaS que estoy desarrollando para conciliar comisiones inmobiliarias a partir de informes PDF y reglas contractuales. Su uso piloto comenzó en agosto de 2026 y la estoy preparando para su comercialización. (216 caracteres; esquema 80–280) |

## 5. Contenidos conservados

- **Hero** (T11): texto aprobado intacto.
- **Hechos:** autodidacta; aplicación de escritorio de 2020 comercializada; SGAA web comercializada desde agosto de 2025 y en producción; trabajo con profesionales de auditoría; AuditaPy y ControlLote en desarrollo; uso piloto de ControlLote desde agosto de 2026; Diplomado en Ingeniería de Software Aplicada en curso; Oñondive como iniciativa en definición, no empresa.
- **Tecnologías:** los cuatro grupos (C#, .NET, ASP.NET Core, EF Core, SQL Server, PostgreSQL, Minimal APIs, Web API, CQRS, Vertical Slices, Monolito modular, Blazor, MudBlazor, React, Vite, TypeScript, Linux/Ubuntu, Nginx, Docker) y las líneas técnicas de cada tarjeta.
- **Proyectos:** nombres, estados, categorías («SaaS» como término técnico, «Desarrollo exclusivo»), tecnologías, orden, imágenes, rutas, indicadores (`facts`), fechas y cuerpos MDX sin cambios. Los resúmenes de SGAA y BoozHome no tenían tono promocional y no se tocaron.
- **Contacto:** correo, GitHub, YouTube e Instagram con las URL existentes; CTA «Escribir por correo» y «Ver GitHub»; sin formularios ni integraciones.
- **Anclas:** `#inicio`, `#sobre-mi`, `#especialidades`, `#proyectos`, `#proceso`, `#contacto`.
- **No modificados:** canonical, sitemap, robots, `astro.config.mjs`, rutas, imagen OG y su `alt` (sigue describiendo la imagen azul real), favicon, workflows, títulos de los casos de estudio (editoriales, no promocionales) y documentación histórica (INV-001, informes anteriores).

## 6. Auditoría editorial de `src/`

Búsqueda de: problemas reales, para evolucionar, extremo a extremo, productos construidos, profesional, pensada(s)/pensados para crecer, del problema al, proceso no una plantilla, propuesta de valor, evoluciona, mercado paraguayo, explorar proyectos, contactar. Resultados restantes, todos legítimos:

| Coincidencia | Clasificación |
|---|---|
| `profile.ts` `intro`: «…resolver problemas reales…» | Texto aprobado del Hero (no se reescribe) |
| `profile.ts` `availability`: «oportunidades profesionales» | Formulación confirmada en `01-PRD.md §2.4` |
| `index.astro`, `sgaa.mdx`, `auditapy.mdx`: «profesionales de auditoría» | Personas, descripción verdadera |

Se conservó también, por ser descripción técnica del proyecto y no eslogan, «arquitectura modular orientada a la evolución del producto» en el cuerpo de `auditapy.mdx`.

## 7. Decisiones

1. `profile.ts` es la fuente de verdad del Hero, el resumen del pie, la disponibilidad y Oñondive; se eliminaron los campos `headline` y `description`, que ya no se usaban, para que no quede texto contradictorio.
2. La disponibilidad aparece una vez, en Contacto, con la formulación exacta, sin ampliarla.
3. «Inicios» sin año: no hay fecha documentada del comienzo autodidacta y no se inventa.
4. «Desarrollo exclusivo» se mantiene como categoría de BoozHome (describe la relación con el cliente sin nombrarlo).
5. No se corrigió el `+` que `CaseStudyLayout` antepone a los indicadores (hallazgo de INV-001 §3.2): afecta a la presentación de métricas, que esta instrucción prohíbe modificar.

## 8. Archivos

| Archivo | Cambio |
|---|---|
| `src/data/profile.ts` | `summary`, `availability`, `initiative`; eliminados `headline` y `description` |
| `src/pages/index.astro` | Copy de Sobre mí, Especialidades, Proyectos, Cómo trabajo, Oñondive y Contacto; `<title>` y `description` |
| `src/components/layout/SiteFooter.astro` | Resumen personal y `aria-label` |
| `src/content/projects/auditapy.mdx` | `summary` |
| `src/content/projects/controllote.mdx` | `summary` |

Creados: este informe. Eliminados: ninguno. Dependencias: ninguna.

## 9. Comandos y pruebas

- Build final conjunto (`T10-IMPLEMENTACION.md §6`): `astro check` 0/0/0, build de 6 páginas, sitemap con 5 URL, `git diff --check` limpio.
- Matriz de 120 combinaciones sin incidencias (incluye `<title>` del Home y presencia de las 6 anclas) y axe sin violaciones en 24 ejecuciones (`T10-IMPLEMENTACION.md §7–8`).
- `dist/index.html`: `<title>Joel Cantero | Full Stack .NET Developer</title>` y `meta description` nueva; `og:title` y `twitter:title` heredan el mismo título; canonical y `og:image` sin cambios.
- Validación del esquema de contenidos en el build: los dos `summary` editados pasan `min(80).max(280)`.
- Revisión visual a 1440 (oscuro, página completa) y 375 (claro, página completa): sin textos cortados; se corrigió la alineación del marcador de disponibilidad cuando el texto ocupa dos líneas en móvil.

## 10. Accesibilidad, SEO, seguridad y privacidad

- Etiquetas accesibles sin «profesional» de relleno: «Redes», «Contacto y redes», «Redes sociales» (Hero). Los landmarks `nav` tienen nombres distintos.
- Un H1 por página; jerarquía H2/H3 sin cambios.
- La línea de disponibilidad usa `foreground` (14.55 / 16.81:1); el marcador verde es decorativo (`aria-hidden`).
- Sin datos personales nuevos: el correo y las redes son los ya publicados.

## 11. Riesgos y pendientes

- **Los textos nuevos necesitan la aprobación del propietario** (criterio de aceptación de T12). Son reescrituras sobre hechos ya documentados, pero el tono y la narrativa son nuevos.
- Frases a confirmar especialmente: «Aprendí a programar por mi cuenta» (basada en «desarrollador autodidacta», `05-CONTENIDOS-Y-CASOS.md §2`); «Todavía está en definición…» (Oñondive); la descripción de Proyectos («Plataformas propias y un desarrollo para un cliente»).
- El `alt` de la imagen OG sigue describiendo la imagen azul anterior; es correcto, pero la imagen ya no coincide con la identidad Cobre Mineral + Zinc (decisión pendiente, T13).
- El `+` delante de los indicadores de los casos sigue pendiente de decisión editorial.

## 12. Cumplimiento de criterios de aceptación (T12)

| Criterio | Estado |
|---|---|
| Ningún eslogan de producto ni «profesional» de relleno en etiquetas | Cumplido (§6) |
| Ningún hecho nuevo sin confirmación | Cumplido (§5, §7.3) |
| Textos aprobados por el propietario | **Pendiente** de su revisión |
| Títulos y descripciones SEO coherentes | Cumplido en el Home; casos sin cambios |
| Texto del Hero intacto | Cumplido |
| Sin cambios de estado, cifras o alcance | Cumplido |

## 13. Estado de Git

Igual que en `T10-IMPLEMENTACION.md §13`: sin preparar, sin commit ni push; este informe sin seguimiento (`??`).

## 14. Recomendaciones siguientes

Revisión del copy por el propietario en el preview local; ajustar las frases que no reconozca como propias; después, autorizar el versionado de T09–T12 y planificar T13 (sin iniciarla).

## 15. Revisión final previa al commit (2026-10-20)

Contexto y validaciones comunes: `T10-IMPLEMENTACION.md §15`. **No se reescribió ningún texto**; las propuestas quedan pendientes de aprobación del propietario.

### 15.1 Auditoría editorial

Texto del Hero comprobado literal en el árbol de accesibilidad; no se revisa (aprobado, `01-PRD.md §2.5`). Textos sin observaciones (fundamento suficiente): párrafos 2–4 de Sobre mí y Trayectoria (`sgaa.mdx` «Mi trabajo», `05-CONTENIDOS-Y-CASOS.md §3`), tarjetas «Aplicaciones web y sistemas de gestión», «Arquitectura de software» y «Procesamiento y automatización documental», bloque de infraestructura y etapas de Cómo trabajo (hechos ya presentes en el texto base), disponibilidad (`01-PRD.md §2.4`), footer, `<title>` y `description`, y los `summary` de AuditaPy y ControlLote (mismos hechos que la versión base y que el cuerpo MDX).

| # | Archivo y ubicación | Texto implementado | Fundamento | Posible problema | Propuesta |
|---|---|---|---|---|---|
| 1 | `src/pages/index.astro:297` (Proyectos, descripción) | «Plataformas propias y un desarrollo para un cliente. En cada caso cuento el contexto, mi trabajo y el estado actual del proyecto.» | Categorías `saas`/`client` del contenido | «propias» sugiere titularidad. No está documentada: los derechos de SGAA están pendientes (`05 §3`, `AGENTS.md`) y ControlLote nació para una empresa concreta (`controllote.mdx`). `AGENTS.md` prohíbe inventar propiedad intelectual | «Tres plataformas SaaS y un desarrollo exclusivo para un cliente. En cada caso cuento el contexto, mi trabajo y el estado actual del proyecto.» |
| 2 | `index.astro:151-152` (Sobre mí, párrafo 1) | «Aprendí a programar por mi cuenta. Empecé con proyectos personales de aprendizaje, en los que fui entendiendo cómo se construye una aplicación de principio a fin.» | `01-PRD.md §2.2` («aprendió a programar por su cuenta»), `05 §2` («autodidacta»); proyectos de aprendizaje en el texto base | La primera frase está respaldada literalmente. «de principio a fin» es una interpretación nueva, no un hecho documentado (riesgo bajo) | Opcional: «Aprendí a programar por mi cuenta, empezando con proyectos personales de aprendizaje.» |
| 3 | `index.astro:368-369` (Oñondive, párrafo 2) | «Todavía está en definición: por ahora es un proyecto propio que iré construyendo poco a poco.» | `01-PRD.md §2.2` («iniciativa en definición, no una empresa constituida») | «en definición» está respaldado. «iré construyendo poco a poco» es una intención, no un hecho; «proyecto propio» repite «iniciativa personal», que ya aparece en el antetítulo y en el párrafo anterior | Opcional: «Todavía está en definición.» |
| 4 | `src/data/profile.ts` `initiative.description` | «Oñondive es una iniciativa personal que estoy desarrollando para dar forma a nuevas ideas y proyectos de software en Paraguay.» | Solo §4 de este informe («texto propuesto por el propietario»); no figura en PRD, guía editorial ni ADR | Fundamento no materializado en documentación versionada | Confirmación expresa del propietario; sin cambio de texto |
| 5 | `index.astro:382` (Contacto, descripción) | «Si quieres conversar sobre un proyecto, una oportunidad o una colaboración, puedes escribirme por correo o encontrarme en mis redes.» | Texto base ya mencionaba «una colaboración» | `01-PRD.md §2.4` fija la disponibilidad en «oportunidades profesionales y proyectos a tiempo parcial» y esta tarea retiró «colaboraciones» de `availability`; la descripción reintroduce el término a dos líneas | «Si quieres conversar sobre un proyecto o una oportunidad, puedes escribirme por correo o encontrarme en mis redes.» |
| 6 | `index.astro:26` (Especialidades, tarjeta 2) | «…con su propia administración, usuarios e identidad.» | Arquitectura multiempresa de SGAA (`05 §3`); ASP.NET Identity en su stack | «identidad» es ambiguo (marca o autenticación) | «…con su propia administración, usuarios y control de acceso.» |

### 15.2 Indicadores de los casos de estudio

`src/layouts/CaseStudyLayout.astro:117` renderiza `+{fact.value}`: el `+` se antepone **siempre**, sin que lo indique el dato. Valores mostrados: SGAA «+26 Empresas registradas», «+161 Contribuyentes registrados»; ControlLote «+475 Contratos registrados», «+377 Lotes vendidos», «+5.314 Cuotas procesadas». Las `evidenceNote` describen recuentos («Empresas registradas en la plataforma», «Indicador agregado»), no cotas inferiores, así que «+26» se lee como «más de 26» y cambia el significado cuantitativo (hallazgo ya registrado en INV-001 §3.2).

Corrección semántica mínima propuesta (**no aplicada**, requiere decisión del propietario): sustituir `+{fact.value}` por `{fact.value}` en esa línea. Si algún valor es realmente una cota inferior, el `+` debe escribirse en el propio dato (`value: '+26'`), que ya es una cadena. No se modificaron datos ni métricas.

## 16. Revisión de diseño del propietario (2026-10-20)

Contexto común, archivos, comandos, matriz de pruebas y estado de Git: `T10-IMPLEMENTACION.md §16`. Sin reescritura editorial general: solo los cambios de texto indicados abajo.

### 16.1 Sobre mí: restauración literal

El propietario rechaza la reescritura de §4 (cuatro párrafos). `index.astro` muestra ahora exactamente sus tres párrafos, en el mismo orden y sin cambios de redacción ni puntuación:

1. «Empecé desarrollando proyectos personales de aprendizaje. En 2020 desarrollé una aplicación de escritorio que comercialicé para la gestión de archivos de auditoría; ese trabajo fue el origen de SGAA.»
2. «Desde entonces he trabajado en su evolución hacia una plataforma web de gestión de auditoría y aseguramiento, comercializada desde agosto de 2025. Me encargué del proceso de extremo a extremo: investigación, arquitectura, modelado, backend, frontend, infraestructura y despliegue. Colaboré con profesionales de auditoría para comprender las necesidades funcionales.»
3. «Me motiva crear software con identidad propia que resuelva problemas reales, cuidando la arquitectura, la calidad, la seguridad y la evolución del producto. Actualmente amplío esa base con formación continua en ingeniería de software.»

Comprobado en el DOM renderizado (comparación exacta tras normalizar espacios) en ambos temas. Se conservan el título «Cómo llegué hasta aquí», la trayectoria y la formación (diplomado «En curso»). Solo cambian tipografía (`1.0625rem` desde `sm`, `leading-relaxed`), espaciado (`gap-6`) y el fondo alterno. Con esta restauración desaparecen el párrafo observado en §15.1 #2 y el texto de §4 «Sobre mí, texto».

### 16.2 Signo `+` en los indicadores: decisión definitiva

El propietario confirma que el `+` se mantiene en todos los indicadores: los proyectos están activos y sus cantidades siguen creciendo. `CaseStudyLayout.astro` conserva `+{fact.value}` sin cambios; no se modificaron valores, etiquetas ni evidencias, ni se añadió actualización automática. Valores verificados en el navegador: SGAA `+26`, `+161`; ControlLote `+475`, `+377`, `+5.314`. **La propuesta de §15.2 queda sustituida por esta decisión y deja de ser un pendiente.** Registrado en ADR-002 (historial de revisiones).

### 16.3 Sección 02: cinco bloques asimétricos

- Componente nuevo `src/components/ui/ExperienceCard.astro` (`article` informativo, sin enlace, botón ni `tabindex`): numeración, título, descripción y barras decorativas (`aria-hidden`).
- Cuadrícula `md:grid-cols-2 lg:grid-cols-3`; bloque 2 `lg:col-span-2`; bloque 5 `md:col-span-2 lg:col-span-1`. Medido: 1440 px → fila 1: 355 + 725 px, fila 2: 3 × 355 px (alturas 320 / 298 px); 1024 px → 309 + 635 / 3 × 309; 768 px → 2 + 2 + 1 a 720 px; 375 px → una columna de 335 px. Sin overflow.
- Se eliminan las líneas de tecnologías de los bloques (0 en el DOM) y el bloque aparte «Infraestructura», que pasa a ser el bloque 5. Se mantiene la lista inferior «Tecnologías con las que he trabajado».

| # | Título | Descripción | Origen |
|---|---|---|---|
| 01 | Aplicaciones web y sistemas de gestión | Igual que la tarjeta 1 anterior | Texto existente |
| 02 | Arquitectura y backend .NET | Texto existente de «Arquitectura de software» + «También he trabajado con multitenencia, en plataformas donde cada empresa opera de forma independiente, con su propia administración, usuarios e identidad.» | Tarjetas 2 y 3 anteriores; «multitenencia» procede de su antigua línea técnica |
| 03 | Frontend e interfaces | «He desarrollado las interfaces de mis proyectos, tanto con Blazor como con React, buscando que sean claras y cómodas de usar.» | **Nuevo**: Blazor (SGAA, BoozHome) y React (AuditaPy, ControlLote) en los MDX; «cómoda de usar» del paso «Implementar» |
| 04 | Datos y automatización documental | Igual que la tarjeta 4 anterior | Texto existente |
| 05 | Infraestructura y despliegue | Igual que el bloque «Infraestructura» anterior | Texto existente |

Los títulos 02–05 y la descripción 03 son nuevos y **requieren la revisión del propietario**. La observación de §15.1 #6 («identidad», ambiguo) sigue aplicando al bloque 02.

### 16.4 Animación de los bloques

Interpretación propia del comportamiento observado en FSH (sin su código ni su verde), solo con `(hover: hover)`:

- Elevación de 4 px (`transform`) y borde con matiz cobre.
- Halo en la esquina superior derecha: `::before` con `radial-gradient` cobre ≤20 % y apoyo zinc, por `opacity` y `scale`.
- Seis barras verticales zinc con alturas variadas; con hover se superpone una capa cobre por opacidad y oscilan en `scaleY` (1,6 s, desfase escalonado).

Verificado en Chrome: en reposo `transform: none`, sin animación y halo con opacidad 0; con hover `translateY(-4px)`, animación `experience-bars` activa, halo a opacidad 1 y barras a escalas distintas (capturas a 500 y 1300 ms, oscuro y claro). Con `prefers-reduced-motion: reduce`: sin desplazamiento ni animación de barras (el halo aparece). En contexto táctil (`hover: none`), tras un toque: sin desplazamiento ni halo, composición estable. Solo se animan `transform` y `opacity`, y solo en la tarjeta con hover. Contraste en el peor caso (texto atenuado sobre el halo al 20 %): 4.83:1 oscuro y 4.76:1 claro.

### 16.5 Frases con tono de catálogo: propuestas para revisión (no aplicadas)

No se modificó ningún dato, MDX ni texto de proyecto. Siguen vigentes las propuestas de §15.1 #1 («Plataformas propias…», titularidad no documentada), #3, #4, #5 y #6. Casos adicionales:

| # | Ubicación | Texto | Observación | Propuesta |
|---|---|---|---|---|
| 7 | `sgaa.mdx` `title` | «SGAA: de procedimientos de auditoría dispersos a una gestión integrada y trazable» | Fórmula de transformación «de X a Y» propia de un *pitch* de producto | «SGAA: plataforma de gestión de auditoría y aseguramiento» |
| 8 | `auditapy.mdx:31` | «…con una arquitectura modular orientada a la evolución del producto.» | «evolución del producto» suena a hoja de ruta comercial | «…con una arquitectura modular pensada para seguir creciendo.» (o mantener) |
| 9 | `boozhome.mdx` `title` | «BoozHome: plataforma inmobiliaria con catálogo público y administración integrada» | Descriptivo; riesgo bajo | Sin cambio, salvo preferencia del propietario |

Los términos técnicos verdaderos (SaaS, multitenencia, monolito modular) se conservan.

### 16.6 Criterios

| Requisito | Estado |
|---|---|
| Sobre mí con los tres párrafos literales; trayectoria y formación conservadas | Cumplido |
| `+` conservado en todos los indicadores; valores sin cambios | Cumplido |
| Cinco bloques 1 + 2 / 1 + 1 + 1, tablet 2 columnas, móvil 1 | Cumplido (medido) |
| Sin stack repetido en los bloques | Cumplido |
| Movimiento, halo superior derecho y barras animadas; movimiento reducido y táctil | Cumplido (verificado en navegador) |
| Sin cambios en datos, MDX, rutas ni dependencias | Cumplido |

## 17. Segunda revisión visual del propietario (2026-10-20)

Contexto común, archivos, comandos y estado de Git: `T10-IMPLEMENTACION.md §17`. **No se modificó ningún texto**: ni Hero, ni «Sobre mí», ni contenidos de los cinco bloques, ni descripciones de proyectos. El signo `+` se conserva (`+26`, `+161`, `+475`, `+377`, `+5.314`, comprobado en el navegador).

### 17.1 Halo de esquina (secciones 02 y 04)

- El halo de §16.4 (22rem, cobre al 20 %) resultaba grande y llamativo en el bloque 1. Se sustituye por una clase compartida **`.card-glow`**: círculo de 12rem centrado en la esquina superior derecha (solo se ve un cuarto), cobre al 10 % → 6 % → 2 % → transparente al 70 % del radio. Aparece por `opacity` y `scale` con hover.
- `.experience-card` conserva la elevación de 4px y las barras; la cuadrícula 1 + 2 / 1 + 1 + 1 y la ausencia de stack no cambian.
- **Sección 04:** las cuatro tarjetas de «Cómo trabajo» añaden `card-glow` y conservan su elevación (`portfolio-card-hover`, 3px). Un solo sistema para ambas secciones.
- Medido: halo en reposo con opacidad 0; con hover, opacidad 1 y 192px de ancho, con elevación de −4px (02) y −3px (04). Con movimiento reducido el halo aparece sin desplazamiento.

### 17.2 Borde animado en las tarjetas de proyecto

- `ProjectCard.astro` añade `<span aria-hidden="true" class="project-card__border">`; la clase `project-card` posiciona la tarjeta.
- La capa cubre el borde de 1px (`inset: -1px`, `border-radius: inherit`, máscara `content-box` excluida) sobre el borde base, que sigue visible. Dentro, un cuadrado del tamaño de la diagonal de la tarjeta (`hypot(100cqw, 100cqh)`, con respaldo del 250 %) con un `conic-gradient` cobre (arco principal) y zinc (arco secundario) gira por `transform` en 16 s.
- Intensidad: opacidad 0,8 en reposo y 1 con hover o foco dentro de la tarjeta. Una primera versión (pico al 85 % y opacidad 0,55) apenas se percibía en las capturas, así que se subió sin cambiar el grosor de 1px.
- **Movimiento comprobado con píxeles:** el punto más cobrizo del perímetro de la tarjeta SGAA pasa de derecha (535, 396) a abajo (411, 615) y abajo-izquierda (146, 615) en 4 s, en oscuro y en claro. Con movimiento reducido permanece fijo en (409, 0) durante 4 s.
- No depende del hover; `pointer-events: none`; no cambia el orden de tabulación ni los enlaces. Oculto en colores forzados.

### 17.3 Enlaces externos de SGAA y BoozHome

- Se reutiliza el campo **`externalUrl`**, que ya existía en `content.config.ts` validado como HTTPS (`03-ARQUITECTURA.md`). En el frontmatter se añadió solo `externalUrl: 'https://redfor-ti.com.py/'` (SGAA) y `externalUrl: 'https://boozhome.com.py/'` (BoozHome). No se cambian estados (`production`, `prelaunch`), resúmenes ni cuerpos.
- `CaseStudyLayout.astro` muestra, bajo el resumen y solo si existe `externalUrl`, un `ButtonLink` secundario «Visitar sitio web» con icono externo (`aria-hidden`), `target="_blank"`, `rel="noopener noreferrer"` y `aria-label` «Visitar sitio web de {proyecto} (se abre en una pestaña nueva)». Sin condiciones por nombre de proyecto.
- Verificado en el navegador: SGAA y BoozHome tienen el enlace con esos atributos; AuditaPy y ControlLote no tienen ninguno. Al hacer clic se abre una pestaña nueva con el destino y `window.opener` es `null`.

**Comprobación remota de las URL (2026-10-20):**

| URL | Chrome | curl / openssl |
|---|---|---|
| `https://redfor-ti.com.py/` | HTTP 200, «RED FOR ti \| Sistema de Gestión de Auditoría - Paraguay», TLS 1.3, Let's Encrypt YR2, válido hasta 2026-12-12 | **Falla**: «unable to get local issuer certificate». El servidor solo envía el certificado final, sin el intermedio |
| `https://boozhome.com.py/` | HTTP 200, «Encuentra el hogar que se adapta a tu estilo de vida — Booz Home», Let's Encrypt YE2, válido hasta 2027-01-18 | HTTP 200, TLS verificado |

La cadena incompleta de `redfor-ti.com.py` no impide abrirlo en Chrome, que completa el intermedio, pero puede fallar en otros clientes (herramientas, algunos navegadores o rastreadores). Debe corregirse en ese servidor, fuera de este repositorio.

**Observación editorial:** BoozHome sigue marcado como «Prelanzamiento» y su resumen dice «En prelanzamiento», aunque su sitio responde públicamente. `AGENTS.md` pide no anunciar el sitio operativo sin comprobar dominio y despliegue y requiere aprobación: el propietario ha proporcionado y autorizado la URL, pero el posible cambio de estado queda **pendiente de su decisión**. No se modificó.

### 17.4 Decisiones editoriales pendientes

Por instrucción expresa del propietario **no se reemplazan todavía**, y no se eligió ninguna opción:

- Las descripciones (resúmenes) de SGAA, ControlLote, AuditaPy y BoozHome.
- El texto introductorio de la sección Proyectos («Plataformas propias y un desarrollo para un cliente…», ver también §15.1 #1).
- El CTA «Ver caso de estudio».

Siguen abiertas, además, las propuestas de §15.1 (#3–#6) y §16.5 (#7–#9) y la revisión de los textos nuevos de la sección 02 (§16.3).

## 18. Textos definitivos de la sección Proyectos (2026-10-20)

- **Rama / commit de partida:** `feat/t09-visual-tokens-dot-background`, `8854baf`, con T09–T12 sin preparar en el árbol (35 entradas en `git status --short` antes de editar).
- **Alcance:** solo la descripción de la sección Proyectos, los cuatro `summary` y el CTA de `ProjectCard`. El propietario seleccionó los textos; **se aplicaron literalmente, sin alternativas ni reescritura**. Esto cierra las decisiones pendientes de §17.4 y la observación de §15.1 #1.

### 18.1 Elecciones editoriales y textos implementados

| Ubicación | Opción | Texto definitivo | Caracteres |
|---|---|---|---|
| `src/pages/index.astro`, descripción de Proyectos (título «Proyectos en los que he trabajado» sin cambios) | A | Cada proyecto representa una parte de mi recorrido como desarrollador. Aquí comparto los problemas que me tocó resolver y lo que fui construyendo a partir de ellos. | 164 |
| `sgaa.mdx` `summary` | A | SGAA nació de una aplicación de escritorio que desarrollé en 2020 para organizar archivos de auditoría. Con el tiempo la transformé en una plataforma web que continúo desarrollando y manteniendo. | 195 |
| `controllote.mdx` `summary` | A | ControlLote surgió de una necesidad concreta de una empresa inmobiliaria: revisar cuotas cobradas y comisiones liquidadas. Desarrollé un sistema que utiliza reportes PDF y reglas contractuales para facilitar esa conciliación. | 225 |
| `auditapy.mdx` `summary` | B | Después de trabajar con SGAA, inicié AuditaPy para replantear su enfoque técnico desde una arquitectura modular. Es un proyecto en desarrollo donde continúo profundizando mis conocimientos de .NET y React. | 205 |
| `boozhome.mdx` `summary` | B | En BoozHome trabajé en el desarrollo de una plataforma inmobiliaria, conectando la presentación de propiedades con su administración. El proyecto me permitió aplicar .NET y Blazor a una necesidad concreta de un cliente. | 219 |

Los cuatro `summary` cumplen el esquema `z.string().min(80).max(280)` de `src/content.config.ts`; no hubo conflicto de longitud. El `summary` sigue siendo la única fuente: alimenta la tarjeta (`src/lib/projects.ts` → `index.astro`) y, en el detalle, el párrafo inicial y `description` (`CaseStudyLayout.astro`). No se crearon textos paralelos.

### 18.2 CTA de las tarjetas

`ProjectCard.astro`: etiqueta «Ver caso de estudio» → **«Ver proyecto»**; `aria-label` «Ver caso de estudio: {title}» → **«Ver proyecto: {title}»**. Sin cambios en `href`, variante `secondary` de `ButtonLink`, foco, hover ni semántica de enlace. El texto de respaldo «Caso de estudio en preparación» (solo sin `href`, no visible hoy) y «Volver a proyectos» del detalle no se modificaron.

### 18.3 Archivos modificados en esta ejecución

`src/pages/index.astro`, `src/components/ui/ProjectCard.astro`, `src/content/projects/{sgaa,controllote,auditapy,boozhome}.mdx` (solo la línea `summary`) y este informe. Creados / eliminados: ninguno. Dependencias: ninguna.

### 18.4 Comandos y resultados

| Comando | Resultado |
|---|---|
| `corepack pnpm exec astro sync` | Aprobado (contenido sincronizado, tipos generados) |
| `corepack pnpm exec astro check` | Aprobado: 28 archivos, 0 errores, 0 advertencias, 0 sugerencias |
| `corepack pnpm run build` | Aprobado: 6 páginas (`/`, 4 detalles, `404`) y `sitemap-index.xml` con 5 URL |
| `git diff --check` | Aprobado, sin salida |

Comprobaciones sobre `dist/` (HTML decodificado, comparación literal):

- Los cinco textos aparecen exactamente una vez en `index.html`; el texto anterior de la introducción y «Ver caso de estudio» aparecen 0 veces.
- 4 enlaces «Ver proyecto» con `aria-label` «Ver proyecto: SGAA / ControlLote / AuditaPy / BoozHome», hacia `/proyectos/{sgaa,controllote,auditapy,boozhome}/`.
- Cada página de detalle contiene su resumen en el párrafo inicial y en `meta description` (y sus derivados OG/Twitter); «Volver a proyectos» presente en las cuatro.
- Enlaces externos sin cambios: `redfor-ti.com.py/` solo en SGAA y `boozhome.com.py/` solo en BoozHome.
- Insignias `+3` de tecnologías restantes presentes en las tarjetas; `CaseStudyLayout.astro` (indicadores `+{fact.value}`) no se tocó.
- Preview local en `http://127.0.0.1:4322/` (`scripts/preview.mjs`, proceso ya en ejecución sobre `dist/`): sirve las 4 etiquetas nuevas y `/proyectos/controllote/` responde 200.

**No realizado:** revisión visual en navegador, matriz de viewports y axe en esta ejecución. El resumen de la tarjeta no tiene recorte (`line-clamp`) y las longitudes son similares a las anteriores (máx. 225 frente a 216), pero la revisión visual queda a cargo del propietario.

### 18.5 Integridad editorial

- Sin cambios en estados (`production`, `development`, `prelaunch`), indicadores, métricas, fechas, tecnologías, URL, assets, estilos, animaciones, Hero, «Sobre mí», bloques de la sección 02 ni Oñondive.
- Los nuevos resúmenes no añaden hechos: retiran algunas menciones (SGAA ya no cita agosto de 2025; ControlLote ya no cita el uso piloto de agosto de 2026; BoozHome ya no dice «En prelanzamiento»). Esos hechos siguen en los cuerpos MDX y en las insignias de estado.
- AuditaPy se presenta como «proyecto en desarrollo», no desplegado; BoozHome como trabajo para un cliente, sin atribuir propiedad.

### 18.6 Observaciones (sin acción)

- Los resúmenes (195–225 caracteres) se usan también como `meta description` de los detalles; superan la longitud habitual de fragmento en buscadores (~155–160), igual que la versión anterior. Solo es informativo: el texto está aprobado.
- Siguen abiertas las propuestas de §15.1 (#3–#6), §16.5 (#7–#9), la revisión de §16.3 y la decisión sobre el estado de BoozHome (§17.3).

### 18.7 Estado de Git

Sin `git add`, commit, push, PR, merge ni despliegue. Los archivos de esta ejecución quedan modificados sin preparar y este informe sigue sin seguimiento (`??`).

## 19. Validación editorial final previa al commit (2026-10-21)

Contexto común, comandos, matriz y propuesta de commit: `T10-IMPLEMENTACION.md §18`. En esta ejecución **no se modificó ningún texto**: los únicos cambios de código son el monograma del Hero (CSS) y el favicon.

Comprobado en el HTML renderizado del preview final (comparación literal tras normalizar espacios):

- Hero: identificador, H1 «Hola, soy Joel Cantero.», descripción y CTA «Hablemos» / «Ver mis proyectos», sin cambios.
- Sobre mí: los tres párrafos originales del propietario (§16.1), literales.
- Proyectos: la introducción y los cuatro `summary` elegidos (§18.1), literales; 4 enlaces «Ver proyecto» con su `aria-label` y destino.
- Enlaces «Visitar sitio web» solo en SGAA y BoozHome, con las URL de §17.3.
- Indicadores con el signo `+` (decisión definitiva del propietario, §16.2), presentes en SGAA y ControlLote. No se modificó ninguna cifra, métrica, estado ni dato.

Archivos de esta sección: solo este informe. Estado de Git: igual que en `T10 §18.7` (sin preparar, sin commit ni push; este informe, sin seguimiento).

## 19. Cierre (2026-10-21)

- El propietario aprobó definitivamente T12: los tres párrafos literales de «Sobre mí», los cinco bloques de la sección 02, los textos elegidos de Proyectos (§18.1: introducción A; SGAA A; ControlLote A; AuditaPy B; BoozHome B), el CTA «Ver proyecto», los enlaces externos de SGAA y BoozHome y el signo `+` en los indicadores.
- En la validación final (`T10-IMPLEMENTACION.md §19.4`), todos los textos aparecen literalmente en el build; hay 4 «Ver proyecto»; los indicadores con `+` y sus cifras siguen sin cambios.
- Sigue pendiente la decisión del propietario sobre el estado de BoozHome («Prelanzamiento», §17), que no se modificó.
- Commit integrado y push: `T10-IMPLEMENTACION.md §19`.
