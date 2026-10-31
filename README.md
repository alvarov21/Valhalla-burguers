# Valhalla Grill Burger — Web Flagship One-Page (3 Salones en Málaga)

Web editorial de alta gastronomía ("El Gran Salón") para **Valhalla Grill Burger** (`@valhallagrillburger`), con secciones independientes para sus tres salones en Málaga: **Capuchinos (Capítulo I)**, **Teatinos (Capítulo II)** y **Santa Paula (Capítulo III)**.

## 1. Arranque en Local y Despliegue en Vercel

```bash
npm install
npm run dev
# Abre http://localhost:3000
```

Para compilación de producción / Vercel:
```bash
npm run build
npm run start
```

## 2. Archivos Únicos de Datos (Single Source of Truth)

- **[`src/data/locations.ts`](./src/data/locations.ts)**: Contiene las direcciones NAP idénticas a Google Business Profile, horarios por día para el cálculo en vivo en zona horaria `Europe/Madrid`, teléfonos, enlaces de pedido directo a **Qamarero**, coordenadas y reseñas.
- **[`src/data/menu.ts`](./src/data/menu.ts)**: Contiene las 3 burgers "Pieza de Museo" (**Odín**, **Thor**, **Balder**) con desglose anatómico, el módulo de temporada (**Muspelheim**) y las 5 secciones de carta con sus títulos épicos oficiales y precios tabulares.

## 3. Lista de Datos `[CONFIRMAR]` Pendientes del Cliente

1. **Código Postal de Capuchinos**: Confirmar si en Google Business Profile figura `29013` o `29014`.
2. **Cierre de mediodía en Teatinos**: Confirmar si el turno de mediodía cierra a las `16:00` o a las `16:30`.
3. **Teléfonos de los 3 locales**: Sustituir `[CONFIRMAR TELÉFONO ...]` y `phoneHref` en `src/data/locations.ts`.
4. **Servicio a domicilio en Santa Paula**: Confirmar si ya operan reparto propio o solo sala + recogida.
5. **Descripciones pendientes de carta**: Completar los ingredientes de **Kratos** (15,95 €), **Beyoncé** (15,95 €), **Sajona** (14,95 €) y **Heimdall** (14,95 €) en `src/data/menu.ts`.
6. **Precios de Entrantes / Fries / Postres / Bebidas**: Confirmar importes exactos de *Fries Asgard*, *Fries Jotunheim*, postres y bebidas.
7. **Enlaces secundarios de Delivery**: Añadir URLs de Glovo, Uber Eats y Just Eat por cada local si se desean enlazar.
8. **Reseñas de Google Business Profile**: Volcar literalmente 4–6 reseñas reales con nombre de pila + inicial, además de la nota media y el número de reseñas por salón.
9. **FAQ Sin Gluten / Vegetarianas y Promo L–J**: Confirmar protocolo de alérgenos/pan sin gluten y vigencia de la promo de lunes a jueves (Burger + patatas 9,99 €).

## 4. Lista de Fotografías Reales Necesarias y Encuadre

Todas las rutas residen en `/public/images/` y cuentan actualmente con placeholders editoriales en claroscuro con su ficha técnica:

- `/images/valhalla-logo.svg` — SVG vectorial original del casco de Valhalla Grill Burger.
- `/images/hero-smash-macro.jpg` — Macro 16:9 en claroscuro de la costra Maillard en plancha con queso fundiéndose y vapor.
- `/images/placeholder-capuchinos-interior.jpg`, `-sala.jpg`, `-plancha.jpg`, `-odin.jpg` — Salón de la Noche (Alameda de Capuchinos, 61).
- `/images/placeholder-teatinos-interior.jpg`, `-sala.jpg`, `-thor.jpg`, `-delivery.jpg` — Salón de los Dos Fuegos (Calle Jano, 9).
- `/images/placeholder-santa-paula-interior.jpg`, `-fachada.jpg`, `-balder.jpg`, `-ambiente.jpg` — Salón del Mar (Avenida de los Guindos, 29).
- `/images/burger-odin.jpg`, `burger-thor.jpg`, `burger-balder.jpg`, `burger-muspelheim.jpg` (+ resto de burgers de carta) — Bodegones sobre fondo carbón (`#0E0B0A`) con iluminación lateral cálida rasante.
