# Especificación de diseño visual — JC Portfolio

**Versión:** 1.0 · 2026-10-18  
**Inspiración:** https://fullstackhero.net/  
**Regla:** inspiración visual y de comunicación, nunca clonación de FullStackHero.

## 1. Dirección creativa

**Concepto:** _Technical editorial portfolio_. Una experiencia editorial, sobria y orientada a ingeniería: comunica rigor sin resultar fría. Priorizar títulos legibles, claridad, evidencia y navegación sobre efectos decorativos.

### De FullStackHero tomamos como inspiración

- Hero con titular contundente, subtítulo preciso y CTA comprensible.
- Jerarquía tipográfica marcada y secciones numeradas.
- Bloques de arquitectura/tecnología y diagramas tipo terminal.
- Superficies contenidas, bordes delgados, cuadrícula ordenada y mucho espacio negativo.
- Tono técnico de producto real, sin promesas exageradas.

### No tomar

- Logotipo, marca, código CSS/React, iconografía exclusiva, ilustraciones, textos, banners, elementos distintivos o composición exacta de FSH.
- Métricas falsas (estrellas, commits, clientes, años, evaluaciones) para rellenar.
- Copias exactas de terminales de ejemplo o fotografías sin licencia.

## 2. Identidad de Joel Cantero

**Nombre de display:** Joel Cantero.  
**Titular sugerido:** «Software para procesos complejos. Diseñado con criterio».  
**Bajada:** «Desarrollo plataformas SaaS y soluciones empresariales con C#, .NET y tecnologías web, integrando arquitectura, automatización y experiencia de usuario».  
**CTA principal:** «Ver proyectos».  
**CTA secundario:** «Contactar» o «GitHub» según contexto.

Oñondive: una única referencia discreta en el pie o sección «Iniciativas», sin usarla como cabecera de marca ni atribuirle derechos de los proyectos.

## 3. Sistema de color — propuesta dark-first

Los valores siguientes constituyen tokens **propuestos**, no equivalencias de FSH. Deben revisarse visualmente y por contraste antes de declarar su aprobación.

| Token | Oscuro | Claro (fase opcional) | Uso |
|---|---|---|---|
| `--color-background` | `#0B1019` | `#F8FAFC` | Fondo principal |
| `--color-surface` | `#111A28` | `#FFFFFF` | Tarjetas |
| `--color-surface-raised` | `#182337` | `#F0F4FA` | Hover / bloques técnicos |
| `--color-foreground` | `#F3F6FC` | `#152238` | Texto principal |
| `--color-muted` | `#B5C3D7` | `#465670` | Texto secundario |
| `--color-border` | `#344257` | `#CAD4E2` | Líneas y componentes |
| `--color-accent` | `#91B8FF` | `#2557A7` | Enlaces y foco |
| `--color-accent-foreground` | `#0B1019` | `#FFFFFF` | Texto sobre acento |
| `--color-positive` | `#70DDC0` | `#17674F` | Evidencias de estado real (moderado) |

Para shadcn/ui, definir tokens semánticos coherentes (`background`, `foreground`, `card`, `muted`, `border`, `ring`, `primary`...). Preferir OKLCH si el preset instalado así lo define, conservando una fuente única de colores. No mezclar definiciones duplicadas.

**Estilo de estados:** etiquetas generalmente neutrales; destacar «En producción» con moderación, sin convertir todas las tarjetas en un mosaico de colores.

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

## 5. Grid, espaciado y superficies

- Container general: `max-width: 1160–1200px` con padding lateral 20/24px móvil y 32px desktop.
- Secciones: `py-14` móvil, `py-20` tablet, `py-28` desktop como referencia (adaptar diseño final).
- Grid de proyectos: una columna hasta `md`, dos columnas desde `md`, evitando tres columnas comprimidas con textos extensos.
- Bordes: 1px semántico; radios suaves de 10–16px; sombras limitadas o ausentes.
- No utilizar glassmorphism como estilo base, ni gradientes saturados en todas las secciones.
- Usar detalles como numeradores `01 / 04`, separadores, etiquetas y fragmentos de terminal **originales**.

## 6. Estructura de la home

**Header:** marca textual «Joel Cantero» / monograma `JC` opcional, enlaces «Inicio», «Sobre mí», «Proyectos», «Contacto»; navegación móvil accesible. No mostrar Oñondive como marca del sitio.

**Hero:** kicker «SOFTWARE DEVELOPER · PARAGUAY»; H1 orientado a valor; descripción breve; CTA «Ver proyectos»; CTA GitHub o Contacto. La ilustración opcional debe ser abstracta y propia (p. ej. bloques de arquitectura), sin foto de cliente.

**Sobre mí:** dos párrafos: enfoque de trabajo y especialización .NET, sin biografía inventada. Foto personal del perfil autorizada si se decide usarla.

**Áreas de especialidad:** Aplicaciones empresariales, SaaS, Arquitectura de software, Integración/automatización documental. No prometer especialidades no demostradas.

**Proyectos:** cuatro tarjetas, empezando por SGAA y ControlLote (orden configurable), separando visualmente «Productos SaaS» y «Desarrollo exclusivo» o etiquetando cada ficha.

**Proceso técnico:** diagrama pequeño (problema → modelado → implementación → validación), no presentar método de trabajo contractual sin evidencia.

**Oñondive:** módulo breve «Iniciativa en construcción»; no confundir con producto o empleador.

**Contacto y footer:** correo, GitHub, YouTube, Instagram; aviso del año generado automáticamente, sin dirección, teléfono ni número de cliente.

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
| Button como enlace | HTML/Astro con estilos consistentes | Nativa |
| shadcn Card / Badge / Separator | React SSR o Astro equivalente según complejidad | No hidratar |
| Menú móvil si es complejo | shadcn Sheet / Radix | React island; hidratar solo si necesario |
| Dialog para imágenes ampliadas, si se aprueba | shadcn Dialog / Radix | React island |
| Theme toggle | Solo en fase posterior si aporta valor | React island opcional |

**Regla:** no introducir React o Radix únicamente para hacer más complejo un elemento que se puede construir semánticamente con HTML y CSS. La presencia de shadcn/Radix se justifica en los pocos componentes que requieren comportamiento accesible.

## 9. Accesibilidad y movimiento

- Contraste verificable mediante herramienta automática + revisión manual (mínimo 4.5:1 para texto normal, 3:1 para texto grande y controles aplicables).
- Foco visible para enlaces, tarjetas interactivas y CTA; skip link «Saltar al contenido».
- Semántica correcta de secciones, encabezados, links y botones.
- Menús y diálogos: Escape, tabulado, control del foco, etiquetas y ARIA donde correspondan.
- `prefers-reduced-motion`: desactivar o suavizar transiciones, aparición y desplazamiento.
- No scroll-jacking, efectos parallax de alto costo, carruseles automáticos ni contenido oculto solo al hover.

## 10. Breakpoints y capturas objetivo

Revisar 320px, 375px, 768px, 1024px, 1440px; sin scroll horizontal. Capturas de referencia: `home-desktop`, `home-mobile`, `proyecto-desktop`, `proyecto-mobile` y estados de navegación. Si se generan muestras locales, no subirlas al repo sin una decisión explícita.

## 11. Criterios de validación visual

- Coherencia de header, iconografía, espaciado y jerarquía.
- Los cuatro proyectos no compiten de manera idéntica; SGAA y ControlLote pueden tener mayor profundidad editorial.
- No hay falsas cifras de clientes/experiencia/resultados en el hero.
- UI usable con zoom al 200%, teclado y en modo de movimiento reducido.
- El diseño expresa una identidad personal diferenciada, aunque evoque el lenguaje editorial/técnico de FSH.
