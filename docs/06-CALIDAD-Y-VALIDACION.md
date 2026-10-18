# Estrategia de calidad y checklist de publicación

**Versión:** 1.0 · 2026-10-18

## 1. Pirámide liviana de pruebas

1. **Chequeos de código:** Astro check, ESLint/Prettier o equivalentes reales que configure el proyecto.
2. **Build:** Astro estático sin errores y lockfile reproducible.
3. **Datos editoriales:** esquema tipado y revisión de `publicApproved`, títulos, orden, estados, URLs, descripciones y capturas.
4. **Smoke en navegador:** rutas, navegación móvil y enlaces internos.
5. **Accesibilidad:** automatización (axe/Playwright) + revisión humana de foco, lenguaje, semántica y teclado.
6. **SEO/performance:** títulos únicos, metadatos, sitemap, Lighthouse en despliegue real.

## 2. Comandos mínimos esperados

```bash
pnpm install --frozen-lockfile
pnpm exec astro check
pnpm build
# Una vez configurados:
pnpm lint
pnpm test
```

No fingir que funcionan antes de que existan. El agente debe reportar el `exit code` y un resumen de salida real.

## 3. Checklist funcional

- [ ] Hero comunica especialización; CTA apunta a proyectos y correo válido.
- [ ] Menú desktop y móvil navegan correctamente y por teclado.
- [ ] Aparecen cuatro proyectos con categoría y estado veraces.
- [ ] Existen cuatro rutas individuales y una ruta desconocida devuelve 404.
- [ ] Todos los enlaces internos y externos aprobados funcionan.
- [ ] La mención Oñondive es secundaria y no señala empresa legal ya constituida.
- [ ] No hay texto público `TODO`, `Lorem ipsum`, ejemplos fingidos ni ratios irreales.

## 4. Checklist editorial y legal

- [ ] Derechos/consentimiento para nombres, logos, capturas y testimonios comprobados.
- [ ] BoozHome no cambia a producción sin verificar dominio, HTTPS y contenido.
- [ ] SGAA no se atribuye comercialmente a Oñondive sin comprobar titularidad.
- [ ] ControlLote mantiene «más de 18 meses de información por empresa», sin convertirlo en disponibilidad de servicio.
- [ ] Ninguna cifra de clientes, tiempo ahorrado, montos o tasa de error fue inventada.
- [ ] No se publicaron PDFs, datos de contratos, documentos fiscales, usuarios o contraseñas de proyectos privados.
- [ ] En las fotos/screenhots se revisaron metadatos y datos sensibles.

## 5. Accesibilidad

- [ ] `html lang=es`, un H1 por página, jerarquía correcta, landmarks.
- [ ] Skip link disponible y foco visible en todos los controles.
- [ ] Navegación únicamente por teclado y Escape en menús/diálogos.
- [ ] Contrast ratios objetivo WCAG 2.2 AA; no depender del color para el estado.
- [ ] Zoom 200% y ancho mínimo 320px sin pérdida significativa de contenido.
- [ ] Reducción de movimiento respetada.
- [ ] Enlaces y botones expresan propósito; imágenes informativas con `alt`.

## 6. SEO y metadatos

- [ ] Título y descripción únicos por página.
- [ ] Canonical correcto con `https://joelveloper.github.io` hasta cambiar dominio.
- [ ] Sitemap de rutas publicables, no entradas en borrador.
- [ ] Open Graph y favicon con recursos originales/licenciados.
- [ ] Enlaces externos seguros y no rotos.
- [ ] La vista previa social no incluye datos privados ni logos sin autorización.

## 7. Performance y estabilidad

- [ ] HTML estático donde es posible; revisar JS hidratado y dependencias.
- [ ] Imágenes dimensionadas, optimizadas y con carga diferida cuando corresponda.
- [ ] Fuentes del sistema o autoalojadas licenciadas, sin bloqueos de render.
- [ ] Lighthouse móvil como referencia: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95 (medición controlada, no garantía permanente).
- [ ] Sin errores de consola ni errores de red del sitio en despliegue.

## 8. Release / Go–No-Go

**Go** si: build/CI verdes, URL real comprobada, permisos editoriales resueltos, rutas correctas y sin problemas graves de accesibilidad o exposición de datos.

**No-Go** si: dominio o ruta errónea, contenido de cliente no autorizado, status de proyecto falso, secretos publicados, JS/hidratación rotos, navegación móvil inutilizable o canonical incorrecto.

## 9. Evidencia de validación que debe entregar Codex

- Comandos ejecutados y resultado real.
- Lista de rutas generadas o verificadas.
- Cambios por archivo, diff y capturas cuando las herramientas estén disponibles.
- Riesgos y elementos pendientes con impacto.
- Confirmación explícita de lo no validado: sin afirmaciones de éxito infundadas.
