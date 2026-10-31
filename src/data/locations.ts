export type ShiftType = "day" | "night";

export interface TimeSlot {
  open: string; // "HH:MM" in 24h format (e.g., "13:30", "20:00")
  close: string; // "HH:MM" in 24h format ("00:00" treated as 24:00 end of day)
  shift: ShiftType;
  note?: string;
}

export interface DaySchedule {
  dayIndex: number; // 1 = Lunes ... 7 = Domingo (ISO weekday)
  dayName: string;
  shortName: string;
  slots: TimeSlot[];
  confirmNote?: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  aspect: "wide" | "tall" | "square";
  photoBrief: string;
}

export interface LocationData {
  id: "capuchinos" | "teatinos" | "santa-paula";
  chapter: "I" | "II" | "III";
  name: string;
  fullName: string;
  seoHeading: string;
  hallSubtitle: string;
  characterSummary: string;
  shortScheduleSummary: string;
  iconType: "moon" | "sun-moon" | "drakkar";
  address: {
    streetAddress: string;
    postalCode: string;
    postalCodeNote?: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    formattedNAP: string;
    neighborhoodContext: string;
    shortBarrio: string;
  };
  geo: {
    latitude: number;
    longitude: number;
    googleMapsDirectionsUrl: string;
    mapPreviewImage: string;
  };
  contact: {
    phoneDisplay: string;
    phoneHref: string;
    isPhonePendingConfirmation: boolean;
  };
  ordering: {
    qamareroUrl: string;
    qamareroModeLabel: string;
    glovoUrl: string;
    uberEatsUrl: string;
    justEatUrl: string;
    platformsPendingConfirmation: boolean;
  };
  services: {
    label: string;
    confirmed: boolean;
    note?: string;
  }[];
  reservationPolicy: string;
  schedule: DaySchedule[];
  heroImage: {
    src: string;
    alt: string;
    photoBrief: string;
  };
  gallery: GalleryItem[];
  differential: {
    eyebrow: string;
    title: string;
    description: string;
    recommendedBurgerId: string;
    recommendedBurgerName: string;
    recommendedBurgerTagline: string;
  };
  reviewsMeta: {
    ratingValue: string;
    reviewCount: string;
    googleReviewUrl: string;
    pendingConfirmation: boolean;
  };
}

export const BRAND_DATA = {
  name: "Valhalla Grill Burger",
  shortName: "Valhalla Grill",
  claim: "Más que hamburguesas.",
  heroH1: "Smash burgers legendarias en Málaga",
  heroSubtitle: "Más que hamburguesas. Tres salones, un mismo banquete.",
  reservationMotto: "En el Valhalla no se reserva: se conquista.",
  footerSignature: "BURGERS —— BUEN ROLLO —— MÁLAGA",
  siteUrl: "https://valhallagrillburger.com",
  social: {
    instagramHandle: "@valhallagrillburger",
    instagramUrl: "https://www.instagram.com/valhallagrillburger/",
    instagramFollowers: "≈10K guerreros",
    tiktokHandle: "@valhallagrillburger",
    tiktokUrl: "https://www.tiktok.com/@valhallagrillburger",
    tiktokFollowers: "≈12K guerreros",
  },
  directOrderAdvantage: {
    enabled: true,
    badge: "CANAL OFICIAL PRIORITARIO",
    text: "Pide directo en Qamarero: el banquete sale antes de cocina y sin intermediarios [CONFIRMAR ventaja opcional: bebida / -5%].",
  },
  credits: {
    agencyName: "Potencia tu Negocio",
    agencyUrl: "https://potenciatunegocio.eu",
  },
};

export const LOCATIONS: LocationData[] = [
  {
    id: "capuchinos",
    chapter: "I",
    name: "CAPUCHINOS",
    fullName: "Valhalla Grill Burger Capuchinos",
    seoHeading: "Hamburguesería en Capuchinos, Málaga",
    hallSubtitle: "El Salón de la Noche",
    characterSummary: "Solo noches · El salón original",
    shortScheduleSummary: "Todos los días · 20:00 – 00:00",
    iconType: "moon",
    address: {
      streetAddress: "Alameda de Capuchinos, 61",
      postalCode: "29014",
      postalCodeNote: "[CONFIRMAR CP: 29013/29014]",
      addressLocality: "Málaga",
      addressRegion: "Málaga",
      addressCountry: "ES",
      formattedNAP: "Alameda de Capuchinos, 61, 29014 Málaga [CONFIRMAR CP: 29013/29014]",
      neighborhoodContext: "En pleno Distrito Centro, zona Capuchinos / El Ejido",
      shortBarrio: "Distrito Centro · Capuchinos",
    },
    geo: {
      latitude: 36.7298,
      longitude: -4.4215,
      googleMapsDirectionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Valhalla+Grill+Burger+Alameda+de+Capuchinos+61+Malaga",
      mapPreviewImage: "/images/map-capuchinos.jpg",
    },
    contact: {
      phoneDisplay: "[CONFIRMAR TELÉFONO CAPUCHINOS]",
      phoneHref: "tel:+34951000001",
      isPhonePendingConfirmation: true,
    },
    ordering: {
      qamareroUrl: "https://www.qamarero.com/r/valhalla-grill",
      qamareroModeLabel: "Recogida y Domicilio",
      glovoUrl: "#confirmar-glovo-capuchinos",
      uberEatsUrl: "#confirmar-ubereats-capuchinos",
      justEatUrl: "#confirmar-justeat-capuchinos",
      platformsPendingConfirmation: true,
    },
    services: [
      { label: "Sala", confirmed: true },
      { label: "Recogida en local", confirmed: true },
      { label: "Domicilio", confirmed: true },
    ],
    reservationPolicy: "Sin reservas — mesa por orden de llegada",
    schedule: [
      {
        dayIndex: 1,
        dayName: "LUNES",
        shortName: "LUN",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 2,
        dayName: "MARTES",
        shortName: "MAR",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 3,
        dayName: "MIÉRCOLES",
        shortName: "MIÉ",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 4,
        dayName: "JUEVES",
        shortName: "JUE",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 5,
        dayName: "VIERNES",
        shortName: "VIE",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 6,
        dayName: "SÁBADO",
        shortName: "SÁB",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 7,
        dayName: "DOMINGO",
        shortName: "DOM",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
    ],
    heroImage: {
      src: "/images/placeholder-capuchinos-interior.jpg",
      alt: "Interior nocturno de Valhalla Grill Burger en Capuchinos, Málaga",
      photoBrief:
        "Encuadre horizontal 16:9 en claroscuro del salón de Alameda de Capuchinos 61 de noche. Luz cálida rasante tipo vela/antorcha, sombras hacia vino profundo (#2B0709) y neón/detalles dorados en penumbra.",
    },
    gallery: [
      {
        src: "/images/placeholder-capuchinos-sala.jpg",
        alt: "Ambiente nocturno en Valhalla Capuchinos Málaga",
        caption: "El Salón de la Noche · Alameda de Capuchinos, 61",
        aspect: "wide",
        photoBrief:
          "Plano general desde la entrada hacia la barra en servicio nocturno, con guerreros en mesa desenfocados (velocidad 1/30s) y foco nítido en los detalles vikingos.",
      },
      {
        src: "/images/placeholder-capuchinos-plancha.jpg",
        alt: "Plancha al rojo vivo forjando una smash burger en Capuchinos",
        caption: "Fuego nocturno · El sellado Maillard a máxima temperatura",
        aspect: "tall",
        photoBrief:
          "Plano vertical 4:5 de la espátula aplastando la bola de vaca rubia gallega en la plancha de Capuchinos, columna de vapor iluminada a contraluz cálido.",
      },
      {
        src: "/images/placeholder-capuchinos-odin.jpg",
        alt: "Burger Odín de cuatro carnes smasheadas en Valhalla Capuchinos",
        caption: "Odín · 4 carnes smash de vaca rubia gallega",
        aspect: "square",
        photoBrief:
          "Bodegón macro 1:1 de la burger Odín (4 pisos de costra caramelizada, cheddar cayendo y brioche brillante) sobre tabla oscura en fondo carbón (#0E0B0A).",
      },
    ],
    differential: {
      eyebrow: "EL PRIMER TEMPLO DEL VALHALLA",
      title: "El origen. Donde empezó la leyenda.",
      description:
        "Aquí se encendió la primera plancha. Capuchinos abre exclusivamente cuando cae el sol sobre el Distrito Centro: un refugio oscuro, íntimo y cargado de humo noble donde cada noche se rinde culto al smash original.",
      recommendedBurgerId: "odin",
      recommendedBurgerName: "Odín (4 carnes smash)",
      recommendedBurgerTagline: "El tributo supremo para conquistar el salón fundacional.",
    },
    reviewsMeta: {
      ratingValue: "4.8 [CONFIRMAR]",
      reviewCount: "[CONFIRMAR Nº RESEÑAS]",
      googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Valhalla+Grill+Burger+Capuchinos+Malaga",
      pendingConfirmation: true,
    },
  },
  {
    id: "teatinos",
    chapter: "II",
    name: "TEATINOS",
    fullName: "Valhalla Grill Burger Teatinos",
    seoHeading: "Hamburguesería en Teatinos, Málaga",
    hallSubtitle: "El Salón de los Dos Fuegos",
    characterSummary: "Mediodía y noche · El más grande en servicio",
    shortScheduleSummary: "Todos los días · 13:30–16:00 y 20:00–00:00",
    iconType: "sun-moon",
    address: {
      streetAddress: "Calle Jano, 9",
      postalCode: "29010",
      addressLocality: "Málaga",
      addressRegion: "Málaga",
      addressCountry: "ES",
      formattedNAP: "Calle Jano, 9, 29010 Málaga",
      neighborhoodContext: "Zona universitaria, El Romeral, junto al Jardín Botánico",
      shortBarrio: "Zona Universitaria · El Romeral",
    },
    geo: {
      latitude: 36.7168,
      longitude: -4.4745,
      googleMapsDirectionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Valhalla+Grill+Burger+Calle+Jano+9+Teatinos+Malaga",
      mapPreviewImage: "/images/map-teatinos.jpg",
    },
    contact: {
      phoneDisplay: "[CONFIRMAR TELÉFONO TEATINOS]",
      phoneHref: "tel:+34951000002",
      isPhonePendingConfirmation: true,
    },
    ordering: {
      qamareroUrl: "https://r.qamarero.com/valhalla-grill-burger-teatinos?mode=DELIVERY",
      qamareroModeLabel: "Domicilio y Recogida",
      glovoUrl: "#confirmar-glovo-teatinos",
      uberEatsUrl: "#confirmar-ubereats-teatinos",
      justEatUrl: "#confirmar-justeat-teatinos",
      platformsPendingConfirmation: true,
    },
    services: [
      { label: "Sala", confirmed: true },
      { label: "Recogida en local", confirmed: true },
      { label: "Domicilio en toda la zona", confirmed: true },
    ],
    reservationPolicy: "Sin reservas — mesa por orden de llegada",
    schedule: [
      {
        dayIndex: 1,
        dayName: "LUNES",
        shortName: "LUN",
        confirmNote: "[CONFIRMAR cierre mediodía 16:00/16:30]",
        slots: [
          { open: "13:30", close: "16:00", shift: "day", note: "[CONFIRMAR 16:00/16:30]" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 2,
        dayName: "MARTES",
        shortName: "MAR",
        slots: [
          { open: "13:30", close: "16:00", shift: "day", note: "[CONFIRMAR 16:00/16:30]" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 3,
        dayName: "MIÉRCOLES",
        shortName: "MIÉ",
        slots: [
          { open: "13:30", close: "16:00", shift: "day", note: "[CONFIRMAR 16:00/16:30]" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 4,
        dayName: "JUEVES",
        shortName: "JUE",
        slots: [
          { open: "13:30", close: "16:00", shift: "day", note: "[CONFIRMAR 16:00/16:30]" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 5,
        dayName: "VIERNES",
        shortName: "VIE",
        slots: [
          { open: "13:30", close: "16:00", shift: "day", note: "[CONFIRMAR 16:00/16:30]" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 6,
        dayName: "SÁBADO",
        shortName: "SÁB",
        slots: [
          { open: "13:30", close: "16:00", shift: "day", note: "[CONFIRMAR 16:00/16:30]" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 7,
        dayName: "DOMINGO",
        shortName: "DOM",
        slots: [
          { open: "13:30", close: "16:00", shift: "day", note: "[CONFIRMAR 16:00/16:30]" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
    ],
    heroImage: {
      src: "/images/placeholder-teatinos-interior.jpg",
      alt: "Interior del salón Valhalla Grill Burger en Teatinos, Calle Jano 9, Málaga",
      photoBrief:
        "Encuadre 16:9 de la sala amplia de Calle Jano 9 (Teatinos), equilibrando luz natural lateral filtrada con iluminación cálida de interior y tonos granate/oro.",
    },
    gallery: [
      {
        src: "/images/placeholder-teatinos-sala.jpg",
        alt: "Gran salón de Valhalla Teatinos en zona universitaria de Málaga",
        caption: "El Salón de los Dos Fuegos · Calle Jano, 9",
        aspect: "wide",
        photoBrief:
          "Perspectiva arquitectónica del salón de Teatinos mostrando su amplitud de mesas y decoración nórdica con tratamiento cromático vino/marfil.",
      },
      {
        src: "/images/placeholder-teatinos-thor.jpg",
        alt: "Smash burger Thor con bacon calcinado y aros de cebolla en Teatinos",
        caption: "Thor · Aplastada por el martillo con bacon calcinado",
        aspect: "tall",
        photoBrief:
          "Primer plano vertical 4:5 de la burger Thor mostrando los dos aros de cebolla crujientes, bacon calcinado y barbacoa ahumada con iluminación lateral dura.",
      },
      {
        src: "/images/placeholder-teatinos-delivery.jpg",
        alt: "Packaging premium de Valhalla Grill listo para reparto en Teatinos",
        caption: "Fuego a domicilio en toda la zona de Teatinos y El Romeral",
        aspect: "square",
        photoBrief:
          "Bodegón editorial 1:1 del packaging de Valhalla junto a unas Fries Asgard recién hechas sobre mesa oscura.",
      },
    ],
    differential: {
      eyebrow: "SOL Y LUNA · DOBLE SERVICIO DIARIO",
      title: "Mediodía y noche, todos los días.",
      description:
        "En el corazón de El Romeral y la zona universitaria, las brasas de Teatinos no descansan ningún día de la semana. Conquista tu mesa a mediodía o de noche, o pide directamente desde nuestro canal oficial con reparto rápido en todo el barrio.",
      recommendedBurgerId: "thor",
      recommendedBurgerName: "Thor (Bacon calcinado & aros)",
      recommendedBurgerTagline: "Carnes aplastadas por su martillo para el salón de mayor energía.",
    },
    reviewsMeta: {
      ratingValue: "4.8 [CONFIRMAR]",
      reviewCount: "[CONFIRMAR Nº RESEÑAS]",
      googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Valhalla+Grill+Burger+Teatinos+Malaga",
      pendingConfirmation: true,
    },
  },
  {
    id: "santa-paula",
    chapter: "III",
    name: "SANTA PAULA",
    fullName: "Valhalla Grill Burger Santa Paula",
    seoHeading: "Hamburguesería en Santa Paula, Málaga",
    hallSubtitle: "El Salón del Mar",
    characterSummary: "El más nuevo · Junto al mar",
    shortScheduleSummary: "L–X 20:00–00:00 · J–D 13:30–16:00 y 20:00–00:00",
    iconType: "drakkar",
    address: {
      streetAddress: "Avenida de los Guindos, 29",
      postalCode: "29004",
      addressLocality: "Málaga",
      addressRegion: "Málaga",
      addressCountry: "ES",
      formattedNAP: "Avenida de los Guindos, 29, 29004 Málaga",
      neighborhoodContext: "Junto a la playa de la Misericordia y La Térmica",
      shortBarrio: "Av. de los Guindos · Junto al Mar",
    },
    geo: {
      latitude: 36.6939,
      longitude: -4.4512,
      googleMapsDirectionsUrl:
        "https://www.google.com/maps/search/?api=1&query=Valhalla+Grill+Burger+Avenida+de+los+Guindos+29+Malaga",
      mapPreviewImage: "/images/map-santa-paula.jpg",
    },
    contact: {
      phoneDisplay: "[CONFIRMAR TELÉFONO SANTA PAULA]",
      phoneHref: "tel:+34951000003",
      isPhonePendingConfirmation: true,
    },
    ordering: {
      qamareroUrl: "https://r.qamarero.com/valhalla-grill-burger-santa-paula?mode=LOCAL",
      qamareroModeLabel: "Recogida en Local [CONFIRMAR Domicilio]",
      glovoUrl: "#confirmar-glovo-santa-paula",
      uberEatsUrl: "#confirmar-ubereats-santa-paula",
      justEatUrl: "#confirmar-justeat-santa-paula",
      platformsPendingConfirmation: true,
    },
    services: [
      { label: "Sala", confirmed: true },
      { label: "Recogida en local", confirmed: true },
      { label: "Domicilio [CONFIRMAR]", confirmed: false, note: "[CONFIRMAR domicilio]" },
    ],
    reservationPolicy: "Sin reservas — mesa por orden de llegada",
    schedule: [
      {
        dayIndex: 1,
        dayName: "LUNES",
        shortName: "LUN",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 2,
        dayName: "MARTES",
        shortName: "MAR",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 3,
        dayName: "MIÉRCOLES",
        shortName: "MIÉ",
        slots: [{ open: "20:00", close: "00:00", shift: "night" }],
      },
      {
        dayIndex: 4,
        dayName: "JUEVES",
        shortName: "JUE",
        slots: [
          { open: "13:30", close: "16:00", shift: "day" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 5,
        dayName: "VIERNES",
        shortName: "VIE",
        slots: [
          { open: "13:30", close: "16:00", shift: "day" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 6,
        dayName: "SÁBADO",
        shortName: "SÁB",
        slots: [
          { open: "13:30", close: "16:00", shift: "day" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
      {
        dayIndex: 7,
        dayName: "DOMINGO",
        shortName: "DOM",
        slots: [
          { open: "13:30", close: "16:00", shift: "day" },
          { open: "20:00", close: "00:00", shift: "night" },
        ],
      },
    ],
    heroImage: {
      src: "/images/placeholder-santa-paula-interior.jpg",
      alt: "Salón Valhalla Grill Burger Santa Paula en Avenida de los Guindos 29, Málaga",
      photoBrief:
        "Encuadre 16:9 del nuevo local de Av. de los Guindos 29 al atardecer/noche, con reflejos fríos de brisa marina combinados con el calor granate y dorado del interior.",
    },
    gallery: [
      {
        src: "/images/placeholder-santa-paula-fachada.jpg",
        alt: "Fachada e interior de Valhalla Santa Paula junto a la playa de la Misericordia",
        caption: "El Salón del Mar · Avenida de los Guindos, 29",
        aspect: "wide",
        photoBrief:
          "Toma exterior-interior en hora azul mostrando la fachada en Avenida de los Guindos 29 iluminada en cálido frente al azul nocturno de la costa.",
      },
      {
        src: "/images/placeholder-santa-paula-balder.jpg",
        alt: "Burger Balder con pulled pork y salsa ranchera blanca en Santa Paula",
        caption: "Balder · Doble smash, pulled pork a baja temperatura y ranchera blanca",
        aspect: "tall",
        photoBrief:
          "Retrato vertical 4:5 en claroscuro de la burger Balder mostrando las hebras jugosas de pulled pork, bacon crujiente y el contraste de la salsa ranchera blanca.",
      },
      {
        src: "/images/placeholder-santa-paula-ambiente.jpg",
        alt: "Brindis Skål en el salón de Santa Paula Málaga",
        caption: "De jueves a domingo, doble banquete junto a la Misericordia",
        aspect: "square",
        photoBrief:
          "Detalle editorial 1:1 de mesa servida con Nachos Midgard y bebidas en luz cálida rasante.",
      },
    ],
    differential: {
      eyebrow: "LA PROA DEL DRAKKAR EN LA COSTA",
      title: "Cena frente al mar.",
      description:
        "A un paso del paseo marítimo de la Misericordia y La Térmica, nuestro salón más nuevo desembarca en Avenida de los Guindos. Abre todas las noches y suma servicio de mediodía de jueves a domingo para alargar el banquete tras la playa.",
      recommendedBurgerId: "balder",
      recommendedBurgerName: "Balder (Doble smash & Pulled Pork)",
      recommendedBurgerTagline: "Coronada con salsa ranchera blanca como la espuma de los mares del norte.",
    },
    reviewsMeta: {
      ratingValue: "4.9 [CONFIRMAR]",
      reviewCount: "[CONFIRMAR Nº RESEÑAS]",
      googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Valhalla+Grill+Burger+Santa+Paula+Malaga",
      pendingConfirmation: true,
    },
  },
];

export interface RealReview {
  id: string;
  authorName: string; // First name + initial from public Google review
  locationId: "capuchinos" | "teatinos" | "santa-paula";
  locationLabel: string;
  quote: string;
  dateNote: string;
  isPendingClientCopy: boolean;
}

/**
 * Reseñas: preparadas como slots editoriales vinculados a cada local.
 * No se inventan cifras ni testimonios falsos; cada bloque señala qué reseña real
 * de Google Business Profile debe volcarse literalmente tras aprobación del cliente.
 */
export const GOOGLE_REVIEWS: RealReview[] = [
  {
    id: "rev-1",
    authorName: "[CONFIRMAR Nombre + Inicial · Reseña real Google]",
    locationId: "capuchinos",
    locationLabel: "Valhalla Capuchinos",
    quote:
      "[CONFIRMAR: Pegar aquí literal la reseña real seleccionada de Google Business Profile de Capuchinos destacando la jugosidad de la vaca rubia gallega y la costra del smash]",
    dateNote: "Reseña pública en Google · Capuchinos",
    isPendingClientCopy: true,
  },
  {
    id: "rev-2",
    authorName: "[CONFIRMAR Nombre + Inicial · Reseña real Google]",
    locationId: "teatinos",
    locationLabel: "Valhalla Teatinos",
    quote:
      "[CONFIRMAR: Pegar aquí literal la reseña real seleccionada de Google Business Profile de Teatinos sobre la burger Odín / Thor, los Nachos Midgard y el trato en sala]",
    dateNote: "Reseña pública en Google · Teatinos",
    isPendingClientCopy: true,
  },
  {
    id: "rev-3",
    authorName: "[CONFIRMAR Nombre + Inicial · Reseña real Google]",
    locationId: "santa-paula",
    locationLabel: "Valhalla Santa Paula",
    quote:
      "[CONFIRMAR: Pegar aquí literal la reseña real seleccionada de Google Business Profile de Santa Paula sobre el nuevo local junto a la playa de la Misericordia]",
    dateNote: "Reseña pública en Google · Santa Paula",
    isPendingClientCopy: true,
  },
  {
    id: "rev-4",
    authorName: "[CONFIRMAR Nombre + Inicial · Reseña real Google]",
    locationId: "teatinos",
    locationLabel: "Valhalla Teatinos",
    quote:
      "[CONFIRMAR: Pegar aquí literal la 4.ª reseña real seleccionada de Google Business Profile destacando la relación calidad-precio (13,95 € – 17,90 €) y el ambiente]",
    dateNote: "Reseña pública en Google · Málaga",
    isPendingClientCopy: true,
  },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  hasPendingConfirmation?: boolean;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-reservas",
    question: "¿Se puede reservar mesa en Valhalla Grill Burger?",
    answer:
      "No. En el Valhalla no se reserva: se conquista. En nuestros tres salones de Málaga (Capuchinos, Teatinos y Santa Paula) asignamos mesa estrictamente por orden de llegada para que todos los guerreros tengan las mismas oportunidades de entrar al banquete.",
  },
  {
    id: "faq-horarios",
    question: "¿Qué horario tiene cada local en Málaga?",
    answer:
      "Capuchinos (Alameda de Capuchinos, 61) abre todas las noches de lunes a domingo de 20:00 a 00:00. Teatinos (Calle Jano, 9) abre todos los días en doble turno: mediodía de 13:30 a 16:00 [CONFIRMAR 16:00/16:30] y noche de 20:00 a 00:00. Santa Paula (Avenida de los Guindos, 29) abre de lunes a miércoles de 20:00 a 00:00, y de jueves a domingo tanto a mediodía (13:30 a 16:00) como por la noche (20:00 a 00:00).",
    hasPendingConfirmation: true,
  },
  {
    id: "faq-domicilio",
    question: "¿Hacéis envío a domicilio y pedidos para recoger?",
    answer:
      "Sí. Puedes pedir tanto para recoger en el local como a domicilio desde Capuchinos y Teatinos, y para recoger en Santa Paula [CONFIRMAR domicilio en Santa Paula]. Te recomendamos hacer tu pedido directo desde nuestra web a través de Qamarero para que entre directo a plancha.",
    hasPendingConfirmation: true,
  },
  {
    id: "faq-alergenos-opciones",
    question: "¿Tenéis opciones sin gluten o vegetarianas?",
    answer:
      "[CONFIRMAR con cocina: disponibilidad de pan sin gluten, protocolo contra contaminación cruzada en plancha/freidora y alternativa vegetariana]. En nuestra carta online de Qamarero y en sala dispones de la tabla completa de alérgenos actualizada.",
    hasPendingConfirmation: true,
  },
  {
    id: "faq-ofertas",
    question: "¿Hay ofertas o promociones entre semana?",
    answer:
      "De lunes a jueves contamos con la promoción de Burger + patatas por 9,99 € [CONFIRMAR vigencia actual, locales adheridos y condiciones en sala/recogida]. Además, disponemos siempre del Combo Valhalla (burger a elegir + patatas crunchy + bebida por 17,95 €).",
    hasPendingConfirmation: true,
  },
  {
    id: "faq-smash-burger",
    question: "¿Qué es una smash burger y qué hace únicas las de Valhalla en Málaga?",
    answer:
      "La técnica smash consiste en aplastar con firmeza una esfera de carne fresca sobre la plancha a máxima temperatura durante los primeros segundos. Esa presión crea la reacción de Maillard: una costra exterior intensamente caramelizada y crujiente que sella todos los jugos en el interior. En Valhalla utilizamos exclusivamente carne de vaca rubia gallega, pan brioche o potato roll tostado al momento y recetas propias dignas de los dioses nórdicos.",
  },
];

export const PENDING_CONFIRMATIONS_CHECKLIST = [
  "Código Postal exacto de Capuchinos: confirmar si en Google Business Profile figura como 29013 o 29014 Málaga.",
  "Horario de cierre de mediodía en Teatinos: confirmar si cierra cocina/sala a las 16:00 o a las 16:30.",
  "Teléfonos oficiales de los 3 locales (Capuchinos, Teatinos y Santa Paula) para el botón Llamar y el JSON-LD.",
  "Servicio a domicilio en Santa Paula: confirmar si ya está activo el reparto propio o solo recogida en local.",
  "Descripciones oficiales de carta pendientes: Kratos (15,95 €), Beyoncé (15,95 €), Sajona (14,95 €) y Heimdall (14,95 €).",
  "Confirmación de vigencia de los precios de referencia (oct. 2026) y de la promo L–J Burger + patatas 9,99 €.",
  "Opciones sin gluten / vegetarianas exactas para la respuesta del FAQ.",
  "Enlaces secundarios a Glovo, Uber Eats y Just Eat por cada uno de los 3 locales.",
  "Textos literales de 4–6 reseñas reales de Google Business Profile + nota media y número de reseñas por local.",
  "Archivo SVG vectorial original del logo del casco de Valhalla Grill Burger y fotografías reales en alta resolución.",
];
