# Memoria del Proyecto: Landing Taller Alfajores & Chocolatería

Este documento sirve como contexto persistente para el agente de IA (Antigravity) sobre el trabajo realizado para los talleres de Ariel Ferreyra (Blanc Sucre Patissier), en colaboración con Laura Fuentes y Flavia Pereyra.

---

## 1. Contexto del Cliente
- **Instructor:** Ariel Ferreyra (Creador de Blanc Sucre Patissier).
- **Perfil:** 12 años de trayectoria en pastelería y chocolatería. Enfoque en docencia, técnicas modernas y transmisión generosa de conocimientos.
- **Marca:** Profesional, técnica, creativa pero cercana.

## 2. Definiciones de Estilo y Tono
- **Tono:** Cercano, amigable, cálido (voseo rioplatense: vos, tenés, querés) sin perder el profesionalismo.
- **Rol del Agente:** Presentador/Organizador que presenta a Ariel como la autoridad técnica (Sesgo de Autoridad).

## 3. Talleres y Contenidos

### Taller de Alfajores (Las Piedras)
- **Variedades:** Maicena, Marplatense, Harina de almendras y nuez con choco blanco y frutos rojos, Clásico Havanna (azúcar impalpable), Merengue y coco, Ricarditos.
- **Público:** Hobbistas, futuras emprendedoras y emprendedoras actuales.

### Seminario de Chocolatería Moderna (Montevideo)
- **Concepto:** Chocolate SIN templar.
- **Técnicas:** Pintura sobre moldes, brillo impecable, rellenos de autor, polvos metalizados.
- **Diferenciador:** Éxito previo en Las Piedras, ahora llega a Montevideo en Tres Cruces.
- **Lugar:** Boulevard Eventos, Tres Cruces, Montevideo. Domingo 24.
- **Web de referencia:** https://landing-chocolateria.vercel.app/

## 4. Activos Generados (9 de Abril, 2026)
- **Guiones de Video (5 para Alfajores):** Segmentados por nivel de conciencia.
- **Guiones de Video (5 para Chocolatería):** Enfocados en la técnica sin templar y el éxito en Montevideo.
- **Sección FAQ (Chocolatería):** Redactada para derribar objeciones.

## 5. Estrategia de Marketing (Skills aplicadas)
- **Copywriting:** Claridad sobre creatividad, beneficios sobre características.
- **Page-CRO:** Recomendaciones de mejora para la landing de chocolatería.
- **Marketing Psychology:** Aplicación de autoridad, escasez y reciprocidad.

---

## 6. Pricing Definitivo (Actualizado 10 de Abril)

### Taller Individual (Alfajores o Chocolatería)
| Fase | Contado / Transf. | Tarjeta (12 cuotas) | Vigencia |
|------|-------------------|---------------------|----------|
| **Preventa 1** | **$2.900** | $3.190 | Hasta el 30 de Abril |
| **Preventa 2** | **$3.150** | $3.490 | Del 1 al 15 de Mayo |
| **Precio Final** | **$3.400** | $3.790 | Desde el 16 de Mayo |

### Pack Combo (Alfajores + Chocolatería) — 15% de descuento
| Modalidad | Precio |
|-----------|--------|
| **Contado / Transferencia** | **$4.930** |
| **Tarjeta (12 cuotas)** | $5.420 |

> **Nota estratégica:** El precio de contado/transferencia se muestra PRIMERO y con máxima relevancia visual (bloque verde). Nos conviene más cobrar en efectivo y al cliente le beneficia el 10% OFF.

---

## 7. Arquitectura del Sitio

### Archivos principales
| Archivo | Función |
|---------|---------|
| `index.html` | Landing principal del taller de Alfajores. Diseño premium con hero, beneficios, variedades, testimonios. |
| `opciones.html` | **Página de checkout / embudo de conversión**. Contiene pricing, checkout, extensión combo y modal de pago. |
| `gracias.html` | Página post-pago para tracking de conversiones. |
| `style.css` | Estilos principales de la landing. |
| `script.js` | JS auxiliar de la landing. |
| `MEMORIA_PROYECTO.md` | Este archivo. |
| `Datos del taller.txt` | Información cruda del taller. |

### Carpetas de assets
| Carpeta | Contenido |
|---------|-----------|
| `Alfajores/` | Fotos de alfajores para la landing principal. |
| `Chocolate/` | Fotos del seminario de chocolatería (bombones, polvos metalizados). Los nombres de archivo son largos tipo WhatsApp (`WhatsApp Image 2026-04-07 at 13.18.43 (1).jpeg`). |
| `Fotos y videos/` | Material multimedia adicional. |

---

## 8. Embudo de Conversión: `opciones.html` (Detalle técnico)

### Estructura del flujo
```
1. [Página carga] → Hero + Pricing stages + Checkout card
2. [Click "Reservar mi lugar"] → Se EXTIENDE la página (no modal)
   → Aparece "¿QUERÉS APRENDER MÁS?" con efecto shimmer dorado
   → Se revela sección combo con fotos, info y pricing del pack
   → Botón cambia a "SOLO QUIERO ESTE TALLER" (abre modal)
3. [Click "Quiero el combo" / "Solo este taller"] → Abre MODAL de checkout
4. [Modal] → Formulario (nombre, apellido, email, teléfono)
           → Opción 1: Mercado Pago (botón azul, redirige a WA con datos)
           → Opción 2: Transferencia (datos bancarios BROU + botón "ENVIAR COMPROBANTE", redirige a WA)
```

### Sistemas implementados
- **Scarcity Counter (barra superior sticky):** Inicia en 20 cupos. Se descuentan 3 cada vez que el usuario vuelve (>2 min entre visitas). Mínimo: 4 cupos. Persistido en `localStorage`.
- **Toast Notifications (prueba social):** 2 notificaciones en la primera visita (3s y 93s). Con cada toast se resta 1 cupo. Controlado por `sessionStorage`.
- **Reveal Animation:** Sección combo oculta (`display:none`) → se muestra con `animation: revealSection 0.8s` al click. AOS se refresca para animar elementos internos.
- **Modal Premium:** Tema chocolate oscuro, backdrop blur. Contenido dinámico (cambia precios y textos según tipo combo/solo). Validación de campos vacíos (borde rojo).

### Meta Pixel & Tracking
- **Pixel ID:** `4195775177312015`
- **Advanced Matching:** `external_id` generado y persistido en `localStorage`.
- **Eventos disparados:**
  - `PageView` → Al cargar
  - `ViewContent` → Al cargar + al revelar la sección combo
  - `InitiateCheckout` → Al abrir el modal de pago
  - `AddPaymentInfo` → Al elegir Mercado Pago
  - `Purchase` → Al elegir Transferencia/Comprobante

### Paleta de colores
| Token | Hex | Uso |
|-------|-----|-----|
| `--chocolate` | `#4A3320` | Fondo principal, headers, botones primarios |
| `--caramelo` | `#B0743E` | Acentos, labels, eyebrows |
| `--crema` | `#FCFAEF` | Background general |
| `--oro` | `#D4AF37` | Badges premium, combo |
| `--verde` | `#1a8a4a` | Precio contado, ahorro, CTAs de transferencia |

### Tipografías
- **Playfair Display** (serif): Títulos, precios grandes.
- **Outfit** (sans-serif): Cuerpo, labels, botones.

### Datos bancarios en el modal
- Titular: Flavia Pereira
- Banco: BROU USD (742150-0001) / PREX (158186)
- Ubicación: Cala Salón de Eventos (La Paz)
> ✅ **COMPLETADO:** Datos oficiales actualizados.

### WhatsApp de contacto
- Número actual: `59899000000`
> ⚠️ **PENDIENTE:** Reemplazar con el número real de WhatsApp del cliente.

---

## 9. Decisiones de Diseño Clave

1. **Precio contado = héroe visual.** Se muestra primero, en verde, más grande. El precio de tarjeta es secundario.
2. **Combo oculto hasta el click.** La página "termina" en el checkout. Solo si el usuario interactúa se revela la oportunidad del combo. Esto genera curiosidad y engagement.
3. **Modal en vez de redirección.** Captura datos (nombre, email, teléfono) ANTES de enviar a WhatsApp/MP. Esto genera leads recuperables.
4. **Sin iconos en checkout header.** El diseño queda más limpio y profesional.
5. **"Recetario incluido"** en vez de "Materiales incluidos" — más específico y atractivo.

---

## 10. Pendientes

- [x] ✅ Confirmar datos bancarios reales (BROU, Flavia Pereira, 742150-0001, Ahorros USD). *Confirmado y actualizado en opciones.html.*
- [x] ⚠️ Confirmar número de WhatsApp definitivo del cliente. *Confirmado: `59898058264` en todas las páginas.*
- [x] ✅ Configurar enlaces de Mercado Pago (Modal Popup) para Combo y Solo Taller.
- [x] ✅ Actualizar dirección física a Cala Salón de Eventos (La Paz).
- [ ] Definir método de confirmación manual para transferencias que active el evento de conversión.
- [ ] Subir a GitHub y desplegar en Vercel. *(Retenido temporalmente por orden del usuario)*
- [x] Revisar responsividad final en dispositivos reales.
- [x] Renombrar archivos de imágenes/videos (eliminar espacios y paréntesis del nombre). *Hecho (las imágenes de Chocolate fueron renombradas).*
- [x] Comprimir videos Hero (~77 MB c/u → target 3-5 MB). *Ya optimizados por el usuario (`hero.mp4`, `hero_movil.mp4`).*
- [x] Comprimir imágenes a WebP (ej: Ariel.png = 8.4 MB → ~200 KB). *Ya optimizado en la carpeta `webp`.*
- [x] Agregar `poster` attribute a los videos del hero (requiere imagen del cliente). *Hecho, apunta a `1.webp`.*
- [x] Agregar archivo `favicon.png` real (el `<link>` ya está en las 3 páginas). *Hecho, el archivo se encuentra en raíz.*
- [x] Reemplazar `og:image` provisional (Ariel.png, 8.4 MB) por una imagen optimizada para redes (~1200x630px, <300 KB). *Hecho, el archivo se encuentra en raíz.*

---

## 11. Auditoría y Correcciones (13 de Abril, 2026 — Mañana)

### Bugs Críticos Corregidos
| Problema | Archivo | Corrección |
|----------|---------|------------|
| `@keyframes fadeInUp` nunca definido → títulos invisibles | `style.css` | Agregado keyframes completo |
| Selectores muertos `.card`, `.expert-box` en IntersectionObserver | `script.js` | Reemplazados por `.split-col`, `.info-box`, `.org-layout-card`, `.expert-editorial` |
| Modal overlay usaba `display:none` → impedía transición CSS | `opciones.html` | Cambiado a `visibility:hidden` + `pointer-events:none` |
| `.syllabus-list` duplicado (counter-reset DESPUÉS de li::before) | `style.css` | Fusionado en una sola declaración |

### Mejoras Aplicadas
| Mejora | Archivo |
|--------|---------|
| Meta Open Graph para social sharing | `index.html`, `gracias.html` |
| `.hero-badge` extraído de inline styles a clase CSS | `style.css` + `index.html` |
| `line-height: 1.6` en párrafos (era 1.35, demasiado apretado) | `style.css` |
| `text-rendering: optimizeLegibility` | `style.css` |
| Focus styles accesibles (`:focus-visible`) | `style.css` |
| IDs semánticos en secciones (`#produccion`, `#cuando-donde`, `#equipo`) | `index.html` |
| CSS muerto `.menu-content` eliminado | `style.css` |
| `overflow-x: hidden` en gracias | `gracias.html` |

---

## 12. Segunda Ronda de Mejoras (13 de Abril, 2026 — Noche)

### Correcciones de UX/Confianza
| Cambio | Archivo | Detalle |
|--------|---------|---------|
| Botón "IR A MERCADO PAGO" → "COORDINAR PAGO CON TARJETA" | `opciones.html` | Evita prometer MP cuando redirige a WhatsApp |
| Validación de formato de email en formulario | `opciones.html` | Regex básica + feedback visual al usuario |
| Pool de toasts expandido de 2 a 6 nombres | `opciones.html` | Más variedad = más credibilidad |

### Mejoras de Performance
| Cambio | Archivo | Detalle |
|--------|---------|---------|
| `.animate` movido de inyección JS a `style.css` | `style.css` + `script.js` | Elimina reflow innecesario por inyección de CSS en runtime |
| `loading="lazy"` en foto de Ariel (8.4 MB) | `index.html` | No bloquea el render inicial de la página |

### Mejoras de SEO/Social
| Cambio | Archivo |
|--------|---------|
| `og:image` agregado | `index.html`, `opciones.html`, `gracias.html` |
| `og:type`, `og:title`, `og:description` agregados | `opciones.html` (faltaban) |
| `<link rel="icon">` (favicon) agregado | `index.html`, `opciones.html`, `gracias.html` |

### Accesibilidad
| Cambio | Archivo |
|--------|---------|
| `aria-label="Cerrar modal"` en botón ✕ | `opciones.html` |
| Cerrar modal con tecla Escape | `opciones.html` |

### UX del Countdown
| Cambio | Archivo | Detalle |
|--------|---------|---------|
| Post-evento: muestra "¡EL EVENTO YA COMENZÓ!" en vez de 00:00:00:00 | `index.html` | Aplica en desktop (nav) y mobile (separador) |

---

## 13. Ronda Final de Pulido y Preparación para Lanzamiento (14 de Abril, 2026)

### Prueba Social Dinámica y Realista
- **Names Pool Variado:** Se implementó una pool de más de 30 nombres y 6 tipos de acciones aleatorias para los toasts. Esto asegura que cada usuario vea una secuencia única de notificaciones, aumentando la credibilidad.
- **Persistencia Mejorada:** Los toasts ahora se limitan estrictamente a 3 por cada sesión de usuario (usando `localStorage` para recordar cuántos vio incluso si cierra la pestaña) con intervalos de 30s entre ellos.

### Lógica de Escasez (Scarcity) Refinada
- **Umbral de Cupos:** El contador ahora puede bajar hasta un mínimo de 2 cupos reales (antes se detenía en 4). 
- **Sincronización:** Cada vez que aparece una notificación de venta (toast), el contador de cupos en pantalla disminuye visualmente en 1, reforzando la urgencia.
- **Revisita:** Se restan 3 cupos automáticamente si el usuario regresa después de 2 minutos de ausencia.

### UX y Navegación (Scroll Inteligente)
- **Offset Dinámico:** Se corrigió el error de "desfasaje" al revelar la sección de combo. Ahora el scroll automático compensa la altura de la barra superior tanto en desktop como en móvil (usando `-220px` y `-120px` respectivamente), asegurando que el título "¿Querés ir un paso más allá?" quede perfectamente visible.
- **Consistencia de Botones:** El botón "Solo este taller" en la sección de combo fue renombrado a **"RESERVAR MI LUGAR"**, alineándose con el CTA principal para evitar confusión.

### Preparación para Checkout y Leads
- **Lead Tracking:** Se confirmó la funcionalidad de `trackLead()` que captura datos antes del pago, permitiendo la recuperación de carritos abandonados vía Webhook (pendiente URL de Make/Zapier).
- **Mercado Pago Strategy:** Se definieron las dos rutas (Checkout Pro Modal vs Direct Link) para la integración final.

---

## 14. Actualización Final de Lanzamiento y Flujos de Pago (14 de Abril, 2026 - Tarde)

### Ubicación y Fecha Final
- **Lugar:** Cala Salón de Eventos (La Paz, Canelones).
- **Dirección:** Dr. L.A. de Herrera 552.
- **Fecha:** Lunes 25 de Mayo (14 a 20 hs).
> ✅ **COMPLETADO:** Se eliminaron todas las referencias a Montevideo y Tres Cruces.

### Reingeniería del Flujo de Pago
- **Pago con Tarjeta Directo:** Se restauró el botón celeste premium (**"PAGO CON TARJETA"**). Ahora abre Mercado Pago en un popup y redirige inmediatamente la página principal a `gracias.html?method=card`.
- **Transferencia Optimizada:** Se eliminó la cuenta BROU, dejando solo **PREX (158186)** a nombre de Flavia Pereira. El mensaje de WhatsApp capturado incluye ahora Nombre, Apellido, Email y Teléfono del usuario automáticamente.

### Página de Agradecimiento Dinámica (`gracias.html`)
- **Mensaje de Felicitación:** Se reemplazó el texto genérico por una felicitación cálida y profesional.
- **Comunidad WhatsApp:** Se integró el link al grupo oficial de alumnos (`https://chat.whatsapp.com/BGKuvkzAdYX62bUxhJRLMe?mode=gi_t`) para información y soporte post-venta.
- **Soporte de Administradoras:** Se incluyó aviso de que las administradoras están disponibles en el grupo para cualquier consulta.

*Última actualización: 14 de Abril, 2026 — 12:45 UYT*

