# Especificación de diseño visual — JC Portfolio

**Versión:** 1.1 · 2026-10-18 · **Revisión:** 2026-10-20 (rediseño de identidad personal, ver [`adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md`](adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md))  
**Inspiración:** https://fullstackhero.net/  
**Regla:** inspiración visual y de comunicación, nunca clonación de FullStackHero.  
**Investigación de soporte:** [`investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md`](investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md)

## 1. Dirección creativa

**Concepto:** _Personal technical portfolio_. Una presentación personal, sobria y cercana: Joel Cantero como persona, con su trayectoria y su trabajo técnico como evidencia. Priorizar claridad, legibilidad, el retrato y la navegación sobre efectos decorativos. Un único efecto en movimiento (el anillo del retrato) concentra la atención.

### De FullStackHero tomamos como inspiración (principios, no implementación)

- Fondo oscuro neutro con una textura de puntos muy tenue que se desvanece.
- Header compacto, ancho y sin línea divisoria; navegación breve.
- Controles pequeños y circulares (monograma, selector de tema) de presencia sutil.
- Disciplina cromática: casi todo neutro y el acento reservado a la interacción.
- Jerarquía tipográfica marcada, secciones numeradas y mucho espacio negativo.

### No tomar

- Logotipo, marca, código CSS/React, iconografía exclusiva, ilustraciones, textos, banners, elementos distintivos o composición exacta de FSH.
- Los valores cromáticos de acento de FSH: el acento cálido de este sitio se define con valores propios (§3).
- Métricas falsas (estrellas, commits, clientes, años, evaluaciones) para rellenar.
- Copias exactas de terminales de ejemplo o fotografías sin licencia.

## 2. Identidad de Joel Cantero

**Nombre de display:** Joel Cantero.  
**Kicker:** «DESARROLLADOR FULL STACK .NET · ASUNCIÓN, PARAGUAY».  
**Titular (H1):** «Hola, soy Joel Cantero».  
**Bajada (2 líneas):** en primera persona, sobre su trayectoria autodidacta y su trabajo con C#/.NET en sistemas de gestión y auditoría. Texto final a aprobar en T11/T12 según `01-PRD.md §2`.  
**CTA principal:** «Hablemos».  
**CTA secundario:** «Ver proyectos», más enlaces a redes (GitHub, YouTube, Instagram).  
**Disponibilidad:** «Abierto a oportunidades profesionales y proyectos a tiempo parcial» (confirmada, `01-PRD.md §2.4`).

**Retirado:** los titulares de tono comercial anteriores («Software para procesos complejos. Diseñado con criterio», «Software para problemas reales. Diseñado para evolucionar»).

Oñondive: una única referencia discreta en el pie o sección «Iniciativas», sin usarla como cabecera de marca ni atribuirle derechos de los proyectos.

## 3. Sistema de color — base zinc neutra y acento cálido

La paleta azul anterior (`#0B1019`, acento `#91B8FF`) queda **sustituida**. El sitio mantiene tema claro y oscuro con una única fuente de verdad por token (`light-dark()` en `src/styles/global.css`).

| Token | Oscuro | Claro | Uso | Estado |
|---|---|---|---|---|
| `--background` | `#0d0e11` | Neutro muy claro de la escala zinc | Fondo principal | Oscuro **aprobado**; claro a fijar en T09 |
| `--surface` / `--surface-raised` | Escalones zinc ligeramente más claros que el fondo | Blanco / zinc muy claro | Tarjetas, hover, bloques técnicos | A fijar en T09 |
| `--foreground` / `--muted-foreground` | Zinc claro / zinc medio | Zinc muy oscuro / zinc medio-oscuro | Texto principal y secundario | A fijar en T09 |
| `--border` | Zinc oscuro de bajo contraste | Zinc claro | Líneas y componentes | A fijar en T09 |
| `--brand` (acento) | Ámbar/naranja neutro propio, luminoso | Ámbar/naranja más oscuro, apto para texto sobre blanco | Solo elementos interactivos principales | Tono **aprobado**; valores a fijar en T09 |
| `--positive` | Se conserva | Se conserva | Estado «En producción» (moderado) | Sin cambios |

**Uso del acento (obligatorio):** solo CTA primario, anillo del retrato, anillo de foco, hover/estado activo de la navegación y enlaces destacados. No se usa en numeradores, fechas, etiquetas ni badges decorativos, que pasan a tonos neutros.

**Contraste:** los valores finales deben cumplir WCAG 2.2 AA en ambos temas (4.5:1 texto normal, 3:1 texto grande y controles) y documentarse en el informe de T09. El ámbar suele fallar como texto sobre fondo claro: la variante clara debe oscurecerse lo necesario.

Para shadcn/ui, los tokens semánticos (`primary`, `ring`, `accent`, `card`, etc.) siguen derivándose de esta paleta. Preferir OKLCH y no duplicar definiciones.

**Estilo de estados:** etiquetas generalmente neutrales; destacar «En producción» con moderación, sin convertir las tarjetas en un mosaico de colores.

## 4. Tipografía

- Texto: `Inter` o tipografía del sistema equivalente; prioridad a claridad, carga rápida y licencia válida.
- Titulares: `Geist`/`Inter` o fallback del sistema, pesos 600–700, interlineado compacto sin sacrificar legibilidad.
- Código/etiquetas técnicas: `JetBrains Mono` o `ui-monospace`.
- No depender de fuentes obtenidas mediante CDN de terceros; si se incorporan, documentar licencia y alojarlas localmente. Nunca copiar archivos de fuentes de este entorno.

### Escala sugerida

| Elemento | Desktop | Móvil |
|---|---|---|
| H1 | `clamp(2.8rem, 6vw, 5.5rem)` | mismo `clamp()` con wrapping correcto |
| H2 | `clamp(2rem, 3.7vw, 3.4rem)` | `clamp()` |
| H3 | `1.3–1.65rem` | `1.2–1.45rem` |
| Body | `1rem` / `line-height: 1.65` | `1rem` |
| Meta | `0.75–0.875rem`, sin texto ilegible | mínimo legible |

Ancho máximo de texto continuo: `66–72ch`. Usar `text-wrap: balance` en titulares si es compatible.

## 5. Fondo, grid, espaciado y superficies

### Fondo de puntos

- Patrón de puntos (`bg-dots`) generado con CSS (`radial-gradient`), sin imágenes ni red.
- Atenuado con **máscara radial** para que se desvanezca hacia los bordes y hacia abajo; nunca compite con el texto.
- Color del punto definido con un token propio en `light-dark()`, de opacidad muy baja en ambos temas.
- Capa decorativa con `aria-hidden="true"` y `pointer-events: none`, detrás del contenido.

### Grid y espaciado

- Container de contenido: `max-width: 1160–1200px` con padding lateral 20/24px móvil y 32px desktop.
- Container del header: `1280px` (`max-w-7xl`), más ancho que el contenido (§6).
- Secciones: `py-14` móvil, `py-20` tablet, `py-28` desktop como referencia (adaptar diseño final).
- Reducir las bandas horizontales a ancho completo (`border-y` con fondo distinto) para que el fondo de puntos dé continuidad a la página.
- Grid de proyectos: una columna hasta `md`, dos columnas desde `md`, evitando tres columnas comprimidas con textos extensos.

### Superficies

- Bordes: 1px semántico; radios suaves de 10–16px; sombras limitadas, salvo la del retrato (§6).
- No utilizar glassmorphism como estilo base, ni gradientes saturados en todas las secciones. Un desenfoque ligero limitado al header se admite como excepción puntual (§6).
- Usar detalles como numeradores `01 / 04`, separadores, etiquetas y fragmentos de terminal **originales**.

## 6. Estructura de la home

### Header

- **Alto:** 56px (`h-14`).
- **Ancho máximo:** 1280px (`max-w-7xl`).
- **Sin línea inferior:** se elimina por completo el `border-b`. La separación con el contenido la da el fondo del header (sólido, o translúcido con desenfoque ligero; se decide en T10 con validación visual).
- **Navegación principal:** estrictamente 4 accesos: «Inicio», «Sobre mí», «Proyectos», «Contacto». Las demás secciones («Especialidades», «Cómo trabajo») siguen en la página y conservan sus anclas, pero salen de la barra principal y del menú móvil.
- **Identificador JC:** monograma dentro de un círculo pequeño (`size-8 rounded-full`), con borde sutil; el nombre «Joel Cantero» puede acompañarlo desde `sm`.
- **Selector de tema:** ver «Toggle de tema».
- Navegación móvil accesible con los mismos 4 accesos. No mostrar Oñondive como marca del sitio.

### Toggle de tema

- Botón **circular de 32px**, minimalista, con borde casi invisible, y **área táctil ampliada a 40px** (pseudo-elemento), que cumple WCAG 2.5.8.
- **Binario:** alterna entre **Claro** y **Oscuro** con un clic. No hay panel ni opción explícita «Sistema».
- Sin preferencia guardada, el estado inicial sigue `prefers-color-scheme`. Al pulsar, la elección se persiste localmente.
- `aria-label` descriptivo de la acción («Cambiar a tema claro» / «Cambiar a tema oscuro»).
- Sin JavaScript, el control se oculta y el sitio sigue la preferencia del sistema; sin destello de tema en la carga.

### Hero

- **Layout de 2 columnas** en desktop:
  - **Izquierda:** fotografía de Joel Cantero con encuadre circular `1:1`, envuelta en un anillo con **gradiente orbital animado en CSS** (`portrait-ring`) y una sombra elegante.
  - **Derecha:** kicker, titular «Hola, soy Joel Cantero», bajada de 2 líneas, CTA «Hablemos», CTA secundario y enlaces a redes.
- **Móvil:** columnas apiladas, retrato arriba y centrado.
- **Anillo orbital:** gradiente cónico con el color de acento, rotado mediante `transform` (animación compuesta, sin repintado por fotograma), ritmo lento (≈12 s por vuelta). Con `prefers-reduced-motion` queda estático. Implementación propia; referencia técnica en INV-001 §4.3.
- **Fotografía:** procesada con `astro:assets` (formatos AVIF/WebP, varios anchos), sin metadatos EXIF, con `alt` descriptivo y dimensiones explícitas para evitar desplazamientos de layout. Al ser candidata a LCP, carga prioritaria.
- **Placeholder:** mientras no se entregue la foto definitiva, se usa un *placeholder* `1:1` comprimido con `astro:assets` (AVIF/WebP) y libre de EXIF. Debe ser original y **no simular una fotografía real de una persona** (por ejemplo, monograma o composición abstracta), con `alt` honesto. Publicar en producción con el placeholder requiere decisión expresa en T13.
- Queda retirada la tarjeta decorativa tipo panel de sistema del hero anterior.

### Resto de secciones

**Sobre mí:** trayectoria en primera persona, especialización .NET y formación, sin biografía inventada. La foto personal pasa al hero.

**Áreas de especialidad:** Aplicaciones empresariales, SaaS, Arquitectura de software, Integración/automatización documental. No prometer especialidades no demostradas. Fuera de la navegación principal.

**Proyectos:** cuatro tarjetas, empezando por SGAA y ControlLote (orden configurable), separando visualmente «Productos SaaS» y «Desarrollo exclusivo» o etiquetando cada ficha.

**Proceso técnico:** diagrama pequeño (problema → modelado → implementación → validación), no presentar método de trabajo contractual sin evidencia. Fuera de la navegación principal.

**Oñondive:** módulo breve «Iniciativa en construcción»; no confundir con producto o empleador.

**Contacto y footer:** título «Hablemos»; etiqueta «Correo» (no «Correo profesional»); disponibilidad confirmada (§2); correo, GitHub, YouTube, Instagram; aviso del año generado automáticamente, sin dirección, teléfono ni número de cliente.

## 7. Diseño de tarjetas y caso de estudio

### ProjectCard

- Categoría y estado como metadatos (legibles, no exclusivamente por color).
- Nombre y resumen en dos o tres líneas naturales.
- Tecnologías en chips discretos (máximo 4 visibles y `+N` opcional, accesible).
- CTA «Ver caso de estudio». Todo el componente es semántico y accesible.
- Visual opcional local: abstracción CSS/SVG propia o imagen aprobada; nunca pantalla ficticia parecida a una captura real.

### ProjectDetail

- Encabezado con contexto, categoría, estado y alcance.
- Bloques: desafío; solución; mi participación; arquitectura; flujo; evidencias; resultados; aprendizajes.
- Bloque «Resultados»: texto «Sin métricas públicas verificadas» si corresponde, en vez de 100% o 10x inventados.
- Una navegación de regreso a proyectos y enlaces entre casos, sin dependencia de JavaScript.

## 8. Componentes recomendados

| Pieza | Implementación preferida | Interactividad |
|---|---|---|
| Header / Footer / Hero / SectionHeading | Astro | No |
| ProjectCard / TechBadge / MetricCard | Astro | No |
| Retrato con anillo orbital (`portrait-ring`) | Astro + CSS (`astro:assets`) | No (animación CSS) |
| Fondo de puntos (`bg-dots`) | Utilidad CSS de Tailwind v4 | No |
| Button como enlace | HTML/Astro con estilos consistentes | Nativa |
| shadcn Card / Badge / Separator | React SSR o Astro equivalente según complejidad | No hidratar |
| Menú móvil si es complejo | shadcn Sheet / Radix | React island; hidratar solo si necesario |
| Dialog para imágenes ampliadas, si se aprueba | shadcn Dialog / Radix | React island |
| Theme toggle binario | Astro + `<script>` mínimo y script inline anti-destello | Sí, sin React |

**Regla:** no introducir React o Radix únicamente para hacer más complejo un elemento que se puede construir semánticamente con HTML y CSS. La presencia de shadcn/Radix se justifica en los pocos componentes que requieren comportamiento accesible.

## 9. Accesibilidad y movimiento

- Contraste verificable mediante herramienta automática + revisión manual (mínimo 4.5:1 para texto normal, 3:1 para texto grande y controles aplicables), en **ambos temas**.
- Foco visible para enlaces, tarjetas interactivas y CTA; skip link «Saltar al contenido».
- Semántica correcta de secciones, encabezados, links y botones.
- Menús y diálogos: Escape, tabulado, control del foco, etiquetas y ARIA donde correspondan.
- Controles pequeños (monograma, toggle) con área táctil de al menos 24px (objetivo 40px para el toggle).
- `prefers-reduced-motion`: desactivar o suavizar transiciones, aparición y desplazamiento; el anillo del retrato queda estático.
- El fondo de puntos es decorativo y no debe reducir el contraste efectivo del texto.
- No scroll-jacking, efectos parallax de alto costo, carruseles automáticos ni contenido oculto solo al hover.

## 10. Breakpoints y capturas objetivo

Revisar 320px, 375px, 768px, 1024px, 1440px; sin scroll horizontal. Capturas de referencia: `home-desktop`, `home-mobile`, `proyecto-desktop`, `proyecto-mobile` y estados de navegación. Si se generan muestras locales, no subirlas al repo sin una decisión explícita.

## 11. Criterios de validación visual

- Coherencia de header, iconografía, espaciado y jerarquía.
- Header de 56px, sin línea inferior, con exactamente 4 accesos.
- El acento cálido aparece solo en elementos interactivos principales y en el anillo del retrato.
- El fondo de puntos es perceptible pero no compite con el contenido en ningún tema.
- Los cuatro proyectos no compiten de manera idéntica; SGAA y ControlLote pueden tener mayor profundidad editorial.
- No hay falsas cifras de clientes/experiencia/resultados en el hero ni eslóganes comerciales.
- UI usable con zoom al 200%, teclado y en modo de movimiento reducido.
- El diseño expresa una identidad personal diferenciada, aunque evoque principios visuales de FSH.
