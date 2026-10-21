# Especificación de diseño visual — JC Portfolio

**Versión:** 1.3 · 2026-10-18 · **Revisión:** 2026-10-20 (rediseño de identidad personal; consolidación de la identidad cromática Cobre Mineral + Zinc y del texto aprobado del Hero, ver [`adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md`](adr/ADR-002-REDISENO-IDENTIDAD-PERSONAL.md)) · **Revisión de diseño del propietario:** 2026-10-20 (Hero de primera pantalla, monograma simplificado, enlaces sin subrayado, header discreto, encabezados con línea, cinco bloques asimétricos con animación propia y alternancia de fondos; prevalece sobre las propuestas visuales anteriores) · **Segunda revisión visual del propietario:** 2026-10-20 (retrato de cinco círculos y anillo de 24 s, navegación en seminegrita con sección activa, monograma del header mayor, encabezados «01 · Sobre mí ───», halo reducido y compartido en 02 y 04, borde animado en Proyectos, iconos en el footer y enlaces «Visitar sitio web»; registrada en ADR-002) · **Ajustes finales del propietario:** 2026-10-21 (monograma del retrato sin relleno y mayor; favicon Cobre Mineral + Zinc) · **Corrección final del propietario:** 2026-10-21 («JC» del retrato en capa propia por delante de los círculos, anillo de 45 s y favicon con fondo transparente; después, interior transparente y un único círculo interior) · **Aprobación definitiva del propietario:** 2026-10-21 (T09–T12, ver ADR-002)

**Inspiración:** https://fullstackhero.net/

**Regla:** inspiración visual y de comunicación, nunca clonación de FullStackHero.

**Investigación de soporte:** [`investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md`](investigations/INV-001-REDISENO-IDENTIDAD-PERSONAL.md)

## 1. Dirección creativa

**Concepto:** _Personal technical portfolio_. Una presentación personal, sobria y cercana: Joel Cantero como persona, con su trayectoria y su trabajo técnico como evidencia. Priorizar claridad, legibilidad, el retrato y la navegación sobre efectos decorativos. Los efectos en movimiento continuo son lentos y de baja intensidad: el anillo del retrato (45 s por vuelta) y el borde de las tarjetas de proyecto (16 s); las tarjetas de las secciones 02 y 04 solo se animan mientras el puntero está encima (§7).

### De FullStackHero tomamos como inspiración (principios, no implementación)

- Fondo oscuro neutro con una textura de puntos muy tenue que se desvanece.
- Header compacto, ancho y sin línea divisoria; navegación breve.
- Controles pequeños y circulares (monograma, selector de tema) de presencia sutil.
- Disciplina cromática: casi todo neutro y el acento reservado a la interacción.
- Jerarquía tipográfica marcada, secciones numeradas y mucho espacio negativo.

### No tomar

- Logotipo, marca, código CSS/React, iconografía exclusiva, ilustraciones, textos, banners, elementos distintivos o composición exacta de FSH.
- Los valores cromáticos de acento de FSH: el acento de este sitio es el cobre propio definido en §3. La referencia a FSH se limita a contraste, composición, espaciado y sutileza.
- Métricas falsas (estrellas, commits, clientes, años, evaluaciones) para rellenar.
- Copias exactas de terminales de ejemplo o fotografías sin licencia.

## 2. Identidad de Joel Cantero

**Nombre de display:** Joel Cantero.

**Identificador profesional:** «Full Stack .NET Developer». Visualmente secundario respecto de la presentación personal (tamaño, peso y color neutros; no compite con el H1).

**Encabezado principal (H1):** «Hola, soy Joel Cantero.»

**Texto introductorio:** «Construyo aplicaciones web y sistemas de gestión con C# y .NET. Me apasiona resolver problemas reales mediante código bien estructurado, desde la arquitectura hasta el despliegue.»

**CTA principal:** «Hablemos».

**CTA secundario:** «Ver mis proyectos», más enlaces a redes (GitHub, YouTube, Instagram).

**Disponibilidad:** «Abierto a oportunidades profesionales y proyectos a tiempo parcial» (confirmada, `01-PRD.md §2.4`).

**Texto aprobado por el propietario (2026-10-20).** El encabezado y el texto introductorio anteriores son la versión oficial del Hero (`01-PRD.md §2.5`):

- No se reescriben por iniciativa propia en T09, T10, T11 ni T12, ni se sustituyen por frases genéricas sobre aprendizaje, creatividad, innovación o pasión por la tecnología.
- Si aparece un problema objetivo de longitud o de presentación responsive, se resuelve con tipografía, anchura de texto (`max-w-measure` o similar) o distribución, nunca alterando el contenido.
- Los CTA reutilizan los destinos reales existentes: «Hablemos» → sección de contacto (`#contacto`); «Ver mis proyectos» → catálogo (`#proyectos`). Las redes salen de `src/data/profile.ts`. No se inventan teléfonos, contactos, redes ni enlaces.

**Retirado:** los titulares de tono comercial anteriores («Software para procesos complejos. Diseñado con criterio», «Software para problemas reales. Diseñado para evolucionar») y las bajadas provisionales propuestas en INV-001 §3.1.

Oñondive: una única referencia discreta en el pie o sección «Iniciativas», sin usarla como cabecera de marca ni atribuirle derechos de los proyectos.

## 3. Sistema de color — Cobre Mineral + Zinc

**Identidad aprobada (2026-10-20): Cobre Mineral + Zinc.** La paleta azul anterior (`#0B1019`, acento `#91B8FF`) queda **sustituida** y se descartan tanto un acento azul corporativo como la propuesta genérica de acento ámbar. El sitio mantiene tema claro y oscuro con una única fuente de verdad por token (`light-dark()` en `src/styles/global.css`).

La identidad debe transmitir sobriedad, madurez técnica, cercanía, elegancia, personalidad y equilibrio entre tecnología y dimensión humana: una base zinc casi neutra y un único acento cobre, contenido y de baja saturación.

### Valores de referencia aprobados

**Tema oscuro**

| Función | Color |
|---|---|
| Fondo principal | `#0D0E11` |
| Superficie base | `#19191B` |
| Superficie elevada / borde de referencia | `#343438` |
| Acento cobre | `#E6A47B` |
| Texto principal | `#F1EFEB` |

**Tema claro (referencias iniciales)**

| Función | Color |
|---|---|
| Fondo principal | `#FAF9F7` |
| Texto principal | `#252526` |
| Acento cobre profundo | `#98532A` |

**Fondo alterno de secciones (revisión de diseño, 2026-10-20):** `--background-alt` = `#19191B` en oscuro (superficie base aprobada) y `#F1F0ED` en claro (escalón zinc cálido ya existente en la paleta). No es un acento nuevo. Ver §5.

Estos siete valores **no** constituyen por sí solos una paleta accesible completa. Los bordes, el texto secundario, las superficies del tema claro, los estados (`--positive`, foco, hover, deshabilitado), el color del punto de `bg-dots` y el texto sobre los botones de acento se completan técnicamente en T09.

### Correspondencia con los tokens

| Token | Oscuro | Claro | Estado |
|---|---|---|---|
| `--background` | `#0D0E11` | `#FAF9F7` | **Aprobado** |
| `--surface` | `#19191B` | Escalón próximo a `#FAF9F7` | Oscuro **aprobado**; claro a fijar en T09 |
| `--surface-raised` | `#343438` (referencia) | Escalón zinc claro | Referencia; a fijar en T09 |
| `--foreground` | `#F1EFEB` | `#252526` | **Aprobado** |
| `--muted-foreground` | Zinc medio | Zinc medio-oscuro | A fijar en T09 |
| `--border` | `#343438` (referencia) | Zinc claro | Referencia; a fijar en T09 |
| `--brand` (acento cobre) | `#E6A47B` | `#98532A` | **Aprobado** |
| `--brand-foreground` | Texto sobre cobre | Texto sobre cobre | A fijar en T09 |
| `--positive` | Se conserva el tono | Se conserva el tono | Revalidar contraste sobre los nuevos fondos en T09 |

### Uso restringido del cobre (obligatorio)

- El cobre se reserva para CTA principal, enlaces destacados, indicador de foco, estados activos (navegación, toggle) y el anillo orbital del retrato.
- No se usa en numeradores, fechas, etiquetas ni badges decorativos, que pasan a tonos neutros.
- Se evitan grandes superficies cobre, brillos excesivos, resplandores y saturación innecesaria. Variantes translúcidas del acento solo como matiz puntual (hover, sombra del retrato), nunca como fondo de sección.

### Contraste

Los valores finales deben cumplir **WCAG 2.2 AA** en ambos temas (4.5:1 texto normal, 3:1 texto grande, 3:1 componentes de interfaz e indicador de foco) y documentarse **medidos** en el informe de T09. No se da por aprobado ningún contraste sin medición.

Medición preliminar de los pares de referencia (fórmula de luminancia relativa WCAG 2.x, calculada el 2026-10-20 durante la consolidación documental). Orienta T09, pero no sustituye la validación de las combinaciones finales:

| Par | Ratio |
|---|---|
| `#F1EFEB` sobre `#0D0E11` / `#19191B` / `#343438` | 16.81 / 15.29 / 10.79 : 1 |
| `#E6A47B` sobre `#0D0E11` / `#19191B` / `#343438` | 9.15 / 8.33 / 5.88 : 1 |
| `#252526` sobre `#FAF9F7` | 14.55 : 1 |
| `#98532A` sobre `#FAF9F7` | 5.53 : 1 |
| `#343438` sobre `#0D0E11` / `#19191B` (no textual) | 1.56 / 1.42 : 1 |

`#343438` no alcanza 3:1 frente a los fondos oscuros: sirve como separador decorativo, pero no puede ser el único indicador visual del contorno de un control (WCAG 1.4.11). T09 y T10 deben resolverlo con otro token o con un indicador adicional, por ejemplo en el toggle de tema.

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
- Color del punto definido con un token propio en `light-dark()`, derivado de la escala zinc neutra (no del cobre) y de **intensidad baja** en ambos temas.
- Capa decorativa con `aria-hidden="true"` y `pointer-events: none`, detrás del contenido.

### Grid y espaciado

- Container de contenido: `max-width: 1160–1200px` con padding lateral 20/24px móvil y 32px desktop.
- Container del header: `1280px` (`max-w-7xl`), más ancho que el contenido (§6).
- Secciones: `py-14` móvil, `py-20` tablet, `py-28` desktop como referencia (adaptar diseño final).
- **Alternancia de fondos (decisión del propietario, 2026-10-20; sustituye a la indicación anterior de reducir bandas):** cada sección del Home se distingue por su fondo: Hero `--background`, Sobre mí `--background-alt`, Especialidades `--background`, Proyectos `--background-alt`, Cómo trabajo `--background`, Oñondive `--background-alt`, Contacto `--background`; el footer usa `--background-alt` con su borde superior. La clase `.section-alt` aplica el fondo alterno y cambia de escalón las tarjetas que contiene (`--card`: `#0D0E11` en oscuro, blanco en claro; `--surface-raised` claro: `#FAF9F7`) para que no se fundan con la sección. El cambio de fondo sustituye a los bordes entre secciones; no se añaden bandas saturadas. La textura de puntos se ve en las secciones con `--background` (las alternas son opacas).
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
- **Identificador JC:** monograma dentro de un círculo pequeño (`size-8 rounded-full`), con fondo transparente (nunca blanco ni relleno contrastante), borde neutro decorativo (`--border`) y texto `--foreground` para conservar la legibilidad; el nombre «Joel Cantero» lo acompaña. Segunda revisión: letras de 14px (antes 11px), seminegrita, interletrado `-0.04em`, centradas; el círculo sigue en 32px y el header en 56px.
- **Favicon (corrección final, 2026-10-21; sustituye al disco zinc `#0D0E11` del mismo día):** monograma «JC» geométrico, dibujado con trazos (sin depender de fuentes), con **fondo transparente**: sin disco, placa ni superficie propia, sin azul, sin blanco, sin órbitas ni círculos concéntricos. El monograma ocupa casi todo el ancho del icono. `public/favicon.svg` es la versión principal y adaptativa (`prefers-color-scheme`): cobre profundo `#98532A` en tema claro y cobre mineral `#E6A47B` en oscuro, con `#B36F46` (cobre intermedio de la misma rampa) como respaldo si no se aplica el CSS. `public/favicon.ico` es la variante estática con canal alfa en `#B36F46` (contraste ≥3:1 en pestañas claras y oscuras habituales), con 16, 32 y 48 px rasterizados desde el mismo SVG.
- **Selector de tema:** ver «Toggle de tema».
- Navegación móvil accesible con los mismos 4 accesos. No mostrar Oñondive como marca del sitio.
- **Peso y sección activa (segunda revisión, 2026-10-20):** los 4 accesos van en seminegrita (`600`) en el header y el menú móvil. El acceso de la sección visible pasa a cobre y muestra un punto cobre a su izquierda (indicador de forma además del color), con transición suave y sin subrayado; lleva `aria-current="location"` y solo hay un acceso actual por navegación. Se actualiza al desplazarse (no solo al hacer clic) con un único `IntersectionObserver` sobre una franja fina al 40 % del alto del viewport, sin escuchar el evento de scroll. Las secciones intermedias heredan el acceso de la sección navegable anterior («Especialidades» → «Sobre mí»; «Cómo trabajo» → «Proyectos»); con el pie visible completo se marca «Contacto». Estado inicial: «Inicio». En las páginas de detalle, «Proyectos» llega marcado desde el servidor (`aria-current="true"`, también sin JavaScript); sin JavaScript, la portada no marca ningún acceso.

### Toggle de tema

- Botón **circular de 32px**, minimalista, con **área táctil ampliada a 40px** (pseudo-elemento), que cumple WCAG 2.5.8.
- **Presencia discreta (revisión de diseño, 2026-10-20):** fondo transparente, borde neutro decorativo (`--border`), icono en `--muted-foreground` (≥4.5:1, identifica el control). En hover el icono pasa a `--foreground` y el borde a `--input`; el cobre se reserva al foco (outline) y al estado activo (pulsación). Sin resplandores. El disparador del menú móvil comparte este estilo.
- **Binario:** alterna entre **Claro** y **Oscuro** con un clic. No hay panel ni opción explícita «Sistema».
- Sin preferencia guardada, el estado inicial sigue `prefers-color-scheme`. Al pulsar, la elección se persiste localmente.
- `aria-label` descriptivo de la acción («Cambiar a tema claro» / «Cambiar a tema oscuro»).
- Sin JavaScript, el control se oculta y el sitio sigue la preferencia del sistema; sin destello de tema en la carga.

### Hero

- **Primera pantalla completa (decisión del propietario, 2026-10-20):** el Hero ocupa como mínimo el alto visible menos el header: `min-height: calc(100svh - var(--site-header-height))`, con respaldo `100vh`. Al entrar se ven el header y el Hero, y el comienzo de «Sobre mí» queda fuera de la primera pantalla. El contenido se centra verticalmente; si no cabe (por ejemplo, 320 × 568), el Hero crece y nunca recorta texto, CTA, redes ni retrato. Sin *scroll snap* ni bloqueo del desplazamiento.
- **Layout de 2 columnas** en desktop:
  - **Izquierda:** fotografía circular de Joel Cantero (`1:1`), envuelta en un anillo con **gradiente orbital cobre animado en CSS** (`portrait-ring`) y una sombra discreta.
  - **Derecha, en este orden:** identificador «Full Stack .NET Developer» (secundario), encabezado «Hola, soy Joel Cantero.», texto introductorio aprobado (§2), CTA «Hablemos», CTA «Ver mis proyectos» y enlaces a redes reales.
- **Centrado en la persona:** el Hero presenta a Joel Cantero, no un producto. No se recupera la tarjeta tipo dashboard «sistema / portafolio».
- **Móvil:** columnas apiladas, retrato arriba y centrado.
- **Texto introductorio:** ancho de lectura limitado y tamaño `text-lead` o equivalente; cualquier ajuste por longitud se hace con tipografía, anchura o distribución, sin modificar el texto aprobado (§2).
- **Anillo orbital:** gradiente cónico con el acento cobre, rotado mediante `transform` (animación compuesta, sin repintado por fotograma), movimiento continuo, uniforme y lento: **45 s por vuelta** (corrección final, 2026-10-21; antes 24 s y, en la primera revisión, ≈12 s). Con `prefers-reduced-motion` queda estático. Implementación propia; referencia técnica en INV-001 §4.3 (adaptando sus colores al cobre).
- **Fotografía:** procesada con `astro:assets` (formatos AVIF/WebP, varios anchos), sin metadatos EXIF, con `alt` descriptivo y dimensiones explícitas para evitar desplazamientos de layout. Al ser candidata a LCP, carga prioritaria.
- **Composición del retrato (revisión definitiva aprobada, 2026-10-21):** **dos círculos concéntricos**: (1) el anillo orbital cobre exterior y (2) un único círculo interior de 1px con el 80 % del diámetro exterior del retrato (`--foreground` al 10 %), elegido por el propietario en lugar de los cuatro equiespaciados de la propuesta previa. Esta geometría deriva del tamaño del retrato y no del texto: el círculo no se desplaza ni se redimensiona para acomodar las letras. El interior del retrato es **transparente**: sin disco, sin `--surface` ni franja en `--background` entre el anillo y los círculos. Una máscara radial limita el gradiente cobre y su pista neutra al anillo de 3px. **Monograma:** el placeholder tiene dos capas. La inferior contiene el círculo interior y la superior, solo «JC»: capa absoluta a todo el retrato (`inset: 0`), por encima de la decoración, sin fondo, borde, disco ni eventos de puntero. Las letras miden el 62 % del diámetro del retrato, en peso 700 y `--foreground`, centradas ópticamente en ambos ejes (recorte `text-box` a la altura de mayúsculas), y van **por delante** de las líneas circulares, que quedan detrás (con el círculo al 80 %, la tinta no llega a cruzarlo). Sin bordes gruesos, sin brillos superpuestos ni halo cobre en la sombra (solo una sombra neutra). El tamaño del retrato no cambia (sin desbordes en móvil). Con fotografía, solo se muestran el anillo y la foto. _Historial:_ como máximo tres círculos en la primera revisión (2026-10-20); en la segunda (2026-10-20), cinco círculos con el borde del disco y tres trazos interiores; el 2026-10-21, monograma sin relleno al 44 %, después en capa propia al 62 %, después cuatro círculos equiespaciados con el interior transparente y, finalmente, un único círculo interior por decisión del propietario.
- **Placeholder:** la fotografía definitiva sigue pendiente de aportación y autorización. Mientras tanto se usa un *placeholder* original `1:1` optimizado con `astro:assets` (AVIF/WebP) y libre de EXIF. **No** se inventa ni se genera un retrato realista del propietario: el placeholder debe ser, por ejemplo, un monograma o una composición abstracta, con `alt` honesto. Publicar en producción con el placeholder requiere decisión expresa en T13.
- Retrato, anillo y nuevo Hero se implementan en **T11**; no forman parte de T09 ni de T10.
- Queda retirada la tarjeta decorativa tipo panel de sistema del hero anterior.

### Resto de secciones

**Encabezados de sección 01–04 (segunda revisión, 2026-10-20; corrige la disposición anterior «01 ──── Sobre mí»):** `01 · Sobre mí ──────────`: número, separador `·`, nombre de la sección y, después del texto, una línea fina horizontal (`--border`, escala zinc, 1px) que ocupa todo el espacio restante hasta el borde del contenedor. Sin línea antes del número ni entre número y nombre; el nombre no se trunca. El separador y la línea son `aria-hidden`: los lectores de pantalla leen «01 Sobre mí». Implementado en `SectionHeading` (separador siempre que haya número y etiqueta; línea con `rule` en 01–04). Interpretación propia del principio compositivo de FSH.

**Sobre mí:** el texto es **literal, aprobado por el propietario (2026-10-20)**, en tres párrafos que no se reescriben, resumen ni amplían:

1. «Empecé desarrollando proyectos personales de aprendizaje. En 2020 desarrollé una aplicación de escritorio que comercialicé para la gestión de archivos de auditoría; ese trabajo fue el origen de SGAA.»
2. «Desde entonces he trabajado en su evolución hacia una plataforma web de gestión de auditoría y aseguramiento, comercializada desde agosto de 2025. Me encargué del proceso de extremo a extremo: investigación, arquitectura, modelado, backend, frontend, infraestructura y despliegue. Colaboré con profesionales de auditoría para comprender las necesidades funcionales.»
3. «Me motiva crear software con identidad propia que resuelva problemas reales, cuidando la arquitectura, la calidad, la seguridad y la evolución del producto. Actualmente amplío esa base con formación continua en ingeniería de software.»

Se conservan los bloques de trayectoria y formación (diplomado en curso). Solo se ajustan tipografía, ancho e interlineado. La foto personal pasa al hero.

**Áreas de especialidad (sección 02):** **cinco bloques horizontales y asimétricos** (decisión del propietario, 2026-10-20; sustituye a las cuatro tarjetas altas): en desktop, cuadrícula de 3 columnas con 1 + 2 en la primera fila y 1 + 1 + 1 en la segunda; en tablet, 2 columnas con el quinto bloque a lo ancho; en móvil, una columna. Áreas: aplicaciones web y sistemas de gestión; arquitectura y backend .NET (incluye multitenencia); frontend e interfaces; datos y automatización documental; infraestructura y despliegue. Cada bloque contiene numeración, título y descripción breve de lo que Joel ha trabajado, sin líneas de tecnologías (el stack se agrupa una sola vez en la lista inferior) y sin tono de catálogo de servicios. No prometer especialidades no demostradas. Fuera de la navegación principal. Animación: §7.

**Proyectos:** cuatro tarjetas, empezando por SGAA y ControlLote (orden configurable), separando visualmente «Productos SaaS» y «Desarrollo exclusivo» o etiquetando cada ficha.

**Proceso técnico:** diagrama pequeño (problema → modelado → implementación → validación), no presentar método de trabajo contractual sin evidencia. Fuera de la navegación principal. Sus cuatro tarjetas usan el mismo halo de esquina que la sección 02 (§7).

**Oñondive:** módulo breve «Iniciativa en construcción»; no confundir con producto o empleador.

**Contacto y footer:** título «Hablemos»; etiqueta «Correo» (no «Correo profesional»); disponibilidad confirmada (§2); correo, GitHub, YouTube, Instagram; aviso del año generado automáticamente, sin dirección, teléfono ni número de cliente. Segunda revisión: cada enlace del footer lleva un icono SVG local de trazo (sobre, GitHub, YouTube, Instagram) de 16px, `aria-hidden`, en color neutro con hover suave; el texto sigue identificando el destino. Sin dependencias nuevas.

## 7. Diseño de tarjetas y caso de estudio

### ProjectCard

- Categoría y estado como metadatos (legibles, no exclusivamente por color).
- Nombre y resumen en dos o tres líneas naturales.
- Tecnologías en chips discretos (máximo 4 visibles y `+N` opcional, accesible).
- CTA **«Ver proyecto»** (elección del propietario, 2026-10-20; sustituye a «Ver caso de estudio»), con `aria-label` «Ver proyecto: {título}». Todo el componente es semántico y accesible.
- **Borde animado (segunda revisión, 2026-10-20):** sobre el borde base, que sigue visible, una capa de 1px enmascarada (`.project-card__border`) muestra un arco cobre con apoyo zinc que recorre el perímetro (`conic-gradient` girado por `transform`, 16 s por vuelta). Intensidad baja en reposo y algo mayor con hover o foco dentro de la tarjeta; el giro no depende del hover (táctil incluido). Con `prefers-reduced-motion` queda un arco estático. Decorativo (`aria-hidden`, sin eventos de puntero): no altera tabulación, enlaces, ilustraciones ni contenidos.
- Visual opcional local: abstracción CSS/SVG propia o imagen aprobada; nunca pantalla ficticia parecida a una captura real.

### Tarjetas de experiencia (sección 02)

Interpretación original del comportamiento observado en las tarjetas de FSH, con la paleta propia (sin verde, sin código ni assets de terceros). Componente `ExperienceCard` + `.card-glow` y `.experience-card` en `global.css`:

- **Movimiento:** con hover, el bloque se eleva 4px (`transform`) y el borde toma un matiz cobre.
- **Halo superior derecho (segunda revisión, 2026-10-20; reducido):** clase compartida `.card-glow` (secciones 02 y 04): círculo de 12rem centrado en la esquina, del que solo se ve un cuarto, con cobre al 10 % que se desvanece de forma gradual (6 %, 2 %, transparente al 70 % del radio). Aparece por `opacity`/`scale` solo con hover; matiz sutil, nunca una mancha ni una superficie cobre. Antes: 22rem y cobre al 20 %.
- **Barras inferiores:** seis barras verticales decorativas (`aria-hidden`), zinc en reposo con alturas variadas; con hover se superpone una capa cobre por opacidad y oscilan en `scaleY` de forma escalonada. No representan datos.
- **Rendimiento:** solo `transform` y `opacity`; la animación continua solo existe en la tarjeta con hover, nunca en reposo.
- **Sin hover (táctil):** composición estable y completa; nada se revela solo con hover.
- **Semántica:** son `article` informativos; no son enlaces ni botones y no reciben `tabindex`.
- **`prefers-reduced-motion`:** sin desplazamiento ni oscilación (el halo aparece sin transición).

### Enlaces

**Sin subrayado en ningún estado** (normal, hover, focus, visited) en todo el sitio (decisión del propietario, 2026-10-20). Sustitutos que no dependen solo del color: contexto de contenedor (navegación, listas de redes, tarjetas, superficie «Correo»), indicadores `↗` en enlaces externos, flecha «←» en el breadcrumb y peso `600` (más `↗` si es externo) en enlaces dentro de la prosa MDX. No se reemplaza por otra línea inferior. El foco conserva el outline cobre de 2px.

### ProjectDetail

- Encabezado con contexto, categoría, estado y alcance.
- **Sitio web del proyecto (segunda revisión, 2026-10-20):** si el proyecto tiene `externalUrl` (campo opcional ya existente en la colección, validado como HTTPS), el encabezado muestra el enlace «Visitar sitio web» con icono de enlace externo, en pestaña nueva con `rel="noopener noreferrer"` y nombre accesible «Visitar sitio web de {proyecto} (se abre en una pestaña nueva)». Sin condiciones por nombre de proyecto. URL aprobadas por el propietario: SGAA `https://redfor-ti.com.py/` y BoozHome `https://boozhome.com.py/`. La URL no cambia el estado editorial (`status`) ni las descripciones.
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
- `prefers-reduced-motion`: desactivar o suavizar transiciones, aparición y desplazamiento; el anillo del retrato y el borde de las tarjetas de proyecto quedan estáticos y las tarjetas de las secciones 02 y 04 no se desplazan ni animan sus barras.
- El fondo de puntos es decorativo y no debe reducir el contraste efectivo del texto.
- No scroll-jacking, efectos parallax de alto costo, carruseles automáticos ni contenido oculto solo al hover.

## 10. Breakpoints y capturas objetivo

Revisar 320px, 375px, 768px, 1024px, 1440px; sin scroll horizontal. Capturas de referencia: `home-desktop`, `home-mobile`, `proyecto-desktop`, `proyecto-mobile` y estados de navegación. Si se generan muestras locales, no subirlas al repo sin una decisión explícita.

## 11. Criterios de validación visual

- Coherencia de header, iconografía, espaciado y jerarquía.
- Header de 56px, sin línea inferior, con exactamente 4 accesos; toggle y monograma discretos, sin fondo blanco.
- El Hero ocupa la primera pantalla: el comienzo de «Sobre mí» no es visible al entrar en las alturas habituales (medido en el navegador).
- «Sobre mí» muestra literalmente los tres párrafos aprobados (§6).
- Ningún enlace muestra subrayado en ningún estado; el foco sigue visible.
- Navegación en seminegrita con un único acceso activo que sigue al scroll.
- Retrato con dos círculos visibles (anillo y un círculo interior al 80 %), interior transparente, «JC» por delante y anillo de 45 s; encabezados «01 · Sobre mí ───».
- Halos de esquina sutiles en 02 y 04; borde animado lento en Proyectos; todo detenido con movimiento reducido.
- Los fondos alternan entre secciones en ambos temas sin perder contraste.
- El acento cobre aparece solo en CTA, enlaces destacados, foco, estados activos y el anillo del retrato; ninguna superficie amplia es cobre.
- El Hero muestra literalmente el encabezado y el texto introductorio aprobados (§2).
- El fondo de puntos es perceptible pero no compite con el contenido en ningún tema.
- Los cuatro proyectos no compiten de manera idéntica; SGAA y ControlLote pueden tener mayor profundidad editorial.
- No hay falsas cifras de clientes/experiencia/resultados en el hero ni eslóganes comerciales.
- UI usable con zoom al 200%, teclado y en modo de movimiento reducido.
- El diseño expresa una identidad personal diferenciada, aunque evoque principios visuales de FSH.
