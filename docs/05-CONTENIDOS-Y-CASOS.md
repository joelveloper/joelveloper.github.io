# Guía editorial e inventario de casos de estudio

**Versión:** 1.0 · 2026-10-18

## 1. Guía de escritura

Tono: español claro, técnico y preciso, sin estilo publicitario grandilocuente. Explicar tanto el resultado funcional como el razonamiento técnico. Evitar frases genéricas («sistema innovador de última generación») sin evidencia.

**Identidad:** Joel Cantero = persona y experiencia. Oñondive = iniciativa futura. No convertir automáticamente productos en activos de Oñondive, ni atribuirse derechos de un proyecto exclusivo de cliente.

Cada dato debe distinguir:

- **Confirmado por el autor**: un hecho proporcionado directamente, pendiente de corroboración técnica si se publica como métrica.
- **Verificado**: respaldado por URL pública, prueba técnica reproducible o documento publicable.
- **No confirmado**: se omite o se expresa claramente como pendiente.

No publicar nombres/identificadores de clientes de ControlLote, documentos PDF, facturas, montos, números de contrato, teléfonos o datos personales sin autorización formal y anonimización.

## 2. Contenido global confirmado

- Nombre: Joel Cantero.
- Ubicación: Asunción, Paraguay.
- Perfil: desarrollador de software autodidacta; C#/.NET como especialización predominante.
- Ejes: plataformas SaaS, aplicaciones empresariales, procesos y automatización.
- Perfil de GitHub: https://github.com/joelveloper
- Contacto: `mailto:alfonzojoel@hotmail.com`
- YouTube: https://www.youtube.com/@joeldeveloper
- Instagram: https://www.instagram.com/joel.developer
- Oñondive Software Solutions: iniciativa/identidad en construcción, no entidad legal anunciada.

**Evitar:** empleador actual, años de experiencia, disponibilidad inmediata, títulos/certificados, número de clientes y precios sin datos explícitos.

## 3. SGAA — Caso 01

**Tipo:** SaaS.  
**Estado:** en producción.  
**Sitio de referencia proporcionado:** https://redfor-ti.com.py/ (accesibilidad actual y derechos de uso de material pendientes de comprobación).

**Título editorial:** «SGAA: de procedimientos de auditoría dispersos a una gestión integrada y trazable».

**Contexto aportado:** nació de la necesidad de automatizar procesos de auditoría. Combina tecnología, metodología y control para auditores que buscan eficiencia y precisión, integrando gestión de auditorías, aseguramientos y consultorías. Fue diseñado con participación de profesionales de auditoría y tecnología.

**Solución descrita:** gestión de clientes, encargos, equipos, fases, procedimientos, seguimiento, supervisión y control de calidad; arquitectura multiempresa.

**Datos a recopilar para estudio sólido:**

1. Proceso previo: planillas, documentos, correos y puntos de fricción reales.
2. Quiénes participaban en diseño funcional y qué funciones concretas realizó Joel.
3. Decisión técnica más difícil: modelado de fases/procedimientos, multitenencia, permisos, auditabilidad, publicación, etc.
4. Alcance en producción: funciones activas, si hay versiones y permisos para mencionarlas.
5. Resultados verificables: horas ahorradas, reducción de errores, encargos gestionados o feedback autorizado; dejar vacíos si no están medidos.
6. Diagramas/capturas permitidos y revisión de titularidad.

**Copy breve sugerido:** «Plataforma SaaS para organizar y supervisar trabajos de auditoría y aseguramiento, con flujos definidos para clientes, equipos, fases, procedimientos y control de calidad. Actualmente en producción.»

## 4. AuditaPy — Caso 02

**Tipo:** SaaS.  
**Estado:** nueva versión en desarrollo.

**Título editorial:** «AuditaPy: evolución tecnológica de una plataforma de gestión de auditorías».

**Enfoque:** explicar qué problemas reales de SGAA se están mejorando y en qué estado se encuentra cada avance. No anunciar beneficios implementados cuando aún son objetivos.

**Pendiente:** alcance actual versus planificado, componentes funcionales disponibles, rol de Joel, decisión arquitectónica, fechas/hitos verificables y captura de versión de desarrollo libre de datos sensibles.

**Copy breve sugerido:** «Segunda generación de una solución SaaS de auditoría, actualmente en desarrollo, orientada a fortalecer arquitectura, automatización y experiencia de gestión».

## 5. ControlLote — Caso 03

**Tipo:** SaaS.  
**Estado:** desarrollo privado con procesamiento histórico documentado por el autor.

**Título editorial:** «ControlLote: conciliación de comisiones inmobiliarias mediante reglas contractuales y procesamiento PDF».

**Problema:** los informes mensuales de cuotas cobradas deben ser auditados contra condiciones contractuales; hay riesgo de inconsistencias, duplicados y diferencias.

**Solución:** importación PDF con documento original conservado, extracción de datos, reglas porcentuales según modalidad de cobro, conciliación, manejo de excepciones y generación de reportes ejecutivos. Stack declarado: .NET 10, React 19, Vite 7, TypeScript, PostgreSQL 16, Tailwind CSS v4, Docker.

**Dato existente:** se están procesando **más de 18 meses de información por empresa**. No afirmar 18 meses de uptime, clientes activos o uso comercial continuo.

**Datos para resultados verificables:**

1. Cuántas empresas (puede expresarse en agregados sin nombres) y alcance temporal por cada una.
2. PDFs/mes, líneas/cuotas procesadas, contratos/lotes en conjunto, si son divulgables.
3. Variedad de formatos documentales y porcentaje de revisión manual necesaria.
4. Categorías de anomalías detectadas realmente y cuántas fueron confirmadas.
5. Método anterior y actual de conciliación, tiempos medidos si existen.
6. Responsabilidad de Joel y contribuciones de colaboradores.
7. Capturas con datos sintéticos o irreversiblemente anonimizados y permiso para difundir.

**Copy breve sugerido:** «Plataforma SaaS que importa informes PDF, aplica reglas contractuales y concilia comisiones, facilitando la detección de diferencias y la elaboración de reportes. Procesa históricos superiores a 18 meses de información por empresa».

## 6. BoozHome — Caso 04

**Tipo:** desarrollo exclusivo para cliente.  
**Estado a 2026-10-18 según el autor:** aplicación preparada, publicación esta semana a la espera de activación del dominio. **Confirmar nuevamente** antes de desplegar el portafolio.

**Título editorial:** «BoozHome: plataforma inmobiliaria con catálogo público y administración integrada».

**Solución:** catálogo y fichas públicas, WhatsApp, panel administrativo, propiedades, imágenes, estados, usuarios y analíticas. Stack: .NET 10 / C# 14, ASP.NET Core Minimal APIs, Blazor WebApp con catálogo SSR y panel InteractiveServer, PostgreSQL, Tailwind CSS y Docker.

**Precauciones:** el cliente y su titularidad deben respetarse. No exponer diagramas de seguridad, credenciales, teléfono personal, estructura de autenticación sensible ni capturas del panel con datos reales no autorizados. No decir «en producción» hasta probar dominio, HTTPS y funcionamiento público.

**Datos necesarios:** URL definitiva y fecha efectiva de lanzamiento, permiso escrito o confirmado para nombre/logo/capturas/caso, contexto del problema, responsabilidad de Joel, restricciones editoriales.

**Copy breve sugerido:** «Plataforma web desarrollada exclusivamente para un cliente inmobiliario. Incluye catálogo público, detalle de propiedades, contacto por WhatsApp y gestión administrativa de contenido. Preparada para publicación».

## 7. Plantilla por caso

```markdown
# {Título del caso}

Categoría · Estado · Tecnologías · Fecha de revisión

## Contexto
## Problema original
## Objetivos funcionales
## Mi participación
## Solución implementada
## Decisiones de arquitectura y por qué
## Flujo relevante (diagrama o captura autorizada)
## Validación y evidencias
## Resultados verificados (o sección omitida)
## Lecciones y evolución
## Alcance y limitaciones
## Enlaces autorizados
```

## 8. Control de publicación por evidencia

Antes de publicar una cifra, testimonio, captura, logo o URL externa: identificar propietario, origen, permiso y fecha de revisión. Una captura de panel puede contener información identificable incluso cuando se desenfoca un campo; usar preferentemente datos sintéticos y revisar metadatos de imágenes.
