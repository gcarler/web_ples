# PLAN MAESTRO — PLES Pro

> Documento vivo con todo lo realizado y lo pendiente de la plataforma `https://ples.com.co`.
> Última actualización: 2026-11-06.
> Leyenda: `[x]` hecho · `[ ]` pendiente · 🔒 bloqueado por decisión · ⚠️ riesgo

---

## 0. Contexto y arquitectura

| Elemento | Detalle |
|---|---|
| Aplicación | Next.js 15 (standalone) en cPanel, Node 22 (CloudLinux/Passenger), app `web_ples` |
| Repositorio | `git@github.com:gcarler/web_ples.git` (rama `master`) |
| Tipografía de marca | Comfortaa (`next/font`, subsets `latin` + `latin-ext`) |
| Idiomas | Español (`es`) e Inglés (`en`), sin banderas |
| Sistemas que NO se deben tocar | `/erp` (Dolibarr), `/correspondencia`, `/estratificacion`, `/FENG` |
| Catálogos externos (SPA) | `/brochureips/`, `/brochureples/` (contenido idéntico) |
| Respaldo del sitio antiguo (WordPress) | `backup_sitio_antiguo_20261105.zip` en el home del hosting |

### Proceso de despliegue (referencia)
1. `npm run build` → genera `.next/standalone/`.
2. Armar bundle: copiar `standalone/.` (incluye `.next/server`), `.next/static`, `public`, `.env`; comprimir a zip.
3. Subir por FTPS, extraer en `/home/plescomc1/web_ples/` y reiniciar Passenger (`tmp/restart.txt` + API de CloudLinux).
4. Verificar en producción y hacer `git push`.

> ⚠️ Al armar el bundle usar `cp -a standalone/.` (con punto). Con `standalone/*` se omite la carpeta oculta `.next` y el sitio sirve HTML viejo.

---

## 1. Completado ✅

- [x] Respaldo del sitio WordPress anterior.
- [x] Despliegue de Next.js 15 en cPanel (Node 22) y enrutado por `.htaccess` conservando subsistemas.
- [x] Corrección del selector de idioma (solo `es`/`en`, sin banderas, fallback de claves faltantes).
- [x] Corrección de más de 650 palabras con tildes/ñ corruptas (`?`) en 32 archivos.
- [x] Comfortaa con `latin-ext`.
- [x] Favicon oficial (p blanca Comfortaa Bold sobre `#009FE3`): `favicon.ico`, `icon.svg`, `icon.png`, `apple-touch-icon.png`.
- [x] Diagnóstico de rutas: todas responden 200.
- [x] Análisis de `/brochureips/` y `/brochureples/`.

---

## 2. Decisiones pendientes 🔒

| # | Decisión | Impacto |
|---|---|---|
| D1 | ¿Los casos de éxito del brochure son proyectos reales de PLES? (hospital Nivel III, SD-WAN 14 sedes, Quirófanos, Tier II, Sede corporativa 5 pisos, LPR) | Define si se publican como "casos de éxito" o como "arquitecturas de referencia" |
| D2 | ¿Qué brochure es el oficial? (IPS o PLES) ¿IPS queda como landing sectorial? | Redirecciones y SEO |
| D3 | ID de Google Analytics 4 (`G-XXXXXXXXXX`) y si se agregan Meta Pixel / LinkedIn Insight | Fase 2 |
| D4 | Correo receptor de solicitudes/radicados | Fase 5 |
| D5 | Qué sistemas monitorear en el estado de servicios (sitio, ERP, correspondencia…) | Fase 0 y 5 |

---

## 3. Fases

### Fase 0 — Higiene y seguridad *(≈ ½ día)*
- [ ] Bloquear/mover los `.zip` públicos (`brochureips_para_cpanel.zip`, `brochureples.zip`).
- [ ] Cabeceras de seguridad: HSTS, `X-Content-Type-Options`, `X-Frame-Options`/CSP `frame-ancestors`, `Referrer-Policy`, `Permissions-Policy`.
- [ ] Monitoreo externo (UptimeRobot / Better Stack) sobre `/`, `/ples-tic`, `/erp/` con alerta por correo.
- [ ] ⚠️ Rotar contraseña de cPanel y credenciales de BD (circularon en el chat y en scripts).
- [ ] Sacar credenciales de los scripts locales (usar variables de entorno).
- [ ] Revisar `robots.txt` (probable legado de WordPress).
- **Aceptación:** `curl -I` muestra las cabeceras; zips devuelven 403/404; alerta real al simular caída.

### Fase 1 — SEO y compartición *(≈ 1 día)*
- [ ] `metadata` por página (title, description, canonical, `alternates` es/en).
- [ ] Imagen `og:image` 1200×630 con branding (Comfortaa) + Twitter cards.
- [ ] `sitemap.xml` y `robots.txt` correctos (hoy `/sitemap.xml` da 404).
- [ ] JSON-LD: `Organization`, `LocalBusiness` (Cartagena), `Service` por línea.
- [ ] Alta en Google Search Console y envío de sitemap.
- **Aceptación:** vista previa correcta en LinkedIn/WhatsApp/X; Rich Results Test sin errores.

### Fase 2 — Analítica con consentimiento *(≈ ½ día)* 🔒 D3
- [ ] Banner de consentimiento + Consent Mode v2 + enlace a política de tratamiento de datos (Ley 1581/2012).
- [ ] GA4 con `next/script` (carga diferida).
- [ ] Eventos: `generate_lead`, `dimensioner_completed`, `catalog_opened`, `service_viewed`.
- [ ] Convenio UTM para redes (`utm_source/medium/campaign`).
- **Aceptación:** eventos en DebugView; sin cookies antes de aceptar.

### Fase 3 — Infraestructura & Cores nativos en PLES TIC *(≈ 2–3 días)* 🔒 D2
- [ ] Páginas indexables para los 5 Cores:
  1. Cómputo corporativo y endpoints
  2. Seguridad electrónica, CCTV y biometría
  3. Conectividad, cableado estructurado y networking
  4. Ciberseguridad, continuidad y licenciamiento
  5. Servicios gestionados, mesa de ayuda y SLA
- [ ] Sección de infraestructura en `/ples-tic` junto a las suites de software.
- [ ] Enlace en Header y Footer ("Infraestructura & Cores").
- [ ] Traducción ES/EN (sin acentos corruptos).
- [ ] Redirigir `/brochureips` y `/brochureples` al contenido canónico; conservar dossier PDF.
- **Aceptación:** contenido visible en `view-source`; Lighthouse ≥ 90 en SEO y Accesibilidad.

### Fase 4 — Casos de éxito / referencias *(≈ 1–2 días)* 🔒 D1
- [ ] Ficha por proyecto: reto, solución, métricas, tecnologías, entregables.
- [ ] Si son reales: logos/permiso del cliente. Si no: rotular "arquitectura de referencia".
- [ ] Contadores en Home y "Sobre nosotros" solo con cifras verificables.
- **Aceptación:** ninguna cifra publicada sin respaldo.

### Fase 5 — Solicitudes, radicados y notificaciones reales *(≈ 3–4 días)* 🔒 D4, D5
- [ ] Formulario → guardado en BD → correo de confirmación con ID de radicado.
- [ ] Pantalla de progreso con pasos que correspondan a acciones reales.
- [ ] Consulta de estado por ID no secuencial + verificación (correo/código) y límite de intentos.
- [ ] Indicador de estado de servicios alimentado por healthcheck real (no cifras decorativas).
- [ ] Dimensionador técnico en Next.js conectado a "Solicitar propuesta".
- **Aceptación:** prueba E2E (envío → correo → consulta); sin datos personales en URLs.

### Fase 6 — Redes y posicionamiento *(continuo)*
- [ ] Calendario de 4 semanas (LinkedIn, Instagram, X): píldoras técnicas, "detrás de la ingeniería", casos.
- [ ] Todos los enlaces con UTM y CTA a `ples.com.co`.
- [ ] Perfil de Google Business (Cartagena) y consistencia de datos (NAP).
- [ ] Revisión mensual de métricas en GA4/Search Console.

### Fase 7 — Calidad y mantenimiento *(continuo)*
- [ ] Revisar y arreglar los warnings del build (`@opentelemetry/exporter-jaeger`, `handlebars` en Genkit).
- [ ] Reducir los warnings repetidos de registro en `stderr.log` (Genkit "already has an entry").
- [ ] Revisar que `build` no omita validación de tipos/lint (`Skipping validation of types / linting`).
- [ ] Script de despliegue único y reproducible (sin credenciales embebidas).
- [ ] Verificación posdespliegue automática (chunks nuevos, tildes, favicon, rutas 200).
- [ ] Pruebas de accesibilidad (contraste, navegación por teclado) en ES/EN.

---

## 4. Orden recomendado

```
Fase 0 → Fase 1 → Fase 2 → Fase 3 → (Fase 4 y 5 al resolver D1/D4/D5) → Fase 6 y 7 en paralelo
```

## 5. Registro de riesgos

| Riesgo | Mitigación |
|---|---|
| Publicar métricas no verificadas | Resolver D1 antes de la Fase 4 |
| Cookies/analítica sin consentimiento | Banner + Consent Mode v2 (Fase 2) |
| Exposición de datos en radicados | ID no secuencial + verificación (Fase 5) |
| Credenciales expuestas | Rotación + variables de entorno (Fase 0) |
| Bundle incompleto en despliegue | `cp -a standalone/.` + verificación posdespliegue |
| Caídas sin evidencia | Monitoreo externo (Fase 0) |
