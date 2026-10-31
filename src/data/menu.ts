export interface AnatomicalCallout {
  id: string;
  label: string;
  detail: string;
  xPercent: number; // Position on the museum display
  yPercent: number;
}

export interface MenuItem {
  id: string;
  name: string;
  priceFormatted: string;
  priceNumeric: number;
  description: string;
  isPendingDescription?: boolean;
  isPendingPriceConfirmation?: boolean;
  badge?: string;
  image: string;
  photoBrief: string;
  allergensNote?: string;
}

export interface MuseumBurger extends MenuItem {
  subtitle: string;
  mythologyRank: string;
  recommendedHall: string;
  callouts: AnatomicalCallout[];
}

export interface MenuCategory {
  id: "entrantes" | "burgers" | "patatas" | "postres" | "bebidas";
  shortTabLabel: string;
  officialEpicTitle: string;
  subtitle: string;
  items: MenuItem[];
}

export const MUSEUM_BURGERS: MuseumBurger[] = [
  {
    id: "odin",
    name: "Odín",
    subtitle: "El Padre de Todos · Cuádruple Smash",
    mythologyRank: "PIEZA DE MUSEO I · LA MÁS PODEROSA",
    recommendedHall: "Valhalla Capuchinos",
    priceFormatted: "17,90 €",
    priceNumeric: 17.9,
    isPendingPriceConfirmation: true,
    description:
      "La más poderosa del Valhalla. 4 carnes smash de vaca rubia gallega, salsa cheddar fundida, mayonesa, barbacoa y bacon crujiente en pan brioche artesanal.",
    badge: "4 CARNES SMASH",
    image: "/images/burger-odin.jpg",
    photoBrief:
      "Bodegón macro vertical de la burger Odín mostrando las 4 capas de costra Maillard, cascada de cheddar y bacon crujiente sobre fondo carbón (#0E0B0A).",
    callouts: [
      {
        id: "odin-bun",
        label: "Brioche Dorado",
        detail: "Pan brioche tostado en mantequilla en la propia plancha",
        xPercent: 50,
        yPercent: 18,
      },
      {
        id: "odin-meat",
        label: "4× Vaca Rubia Gallega",
        detail: "Cuatro discos smasheados al límite con bordes de encaje crujiente",
        xPercent: 32,
        yPercent: 48,
      },
      {
        id: "odin-cheese",
        label: "Cheddar & Bacon Crujiente",
        detail: "Salsa cheddar cremosa + tiras de bacon ahumado al punto",
        xPercent: 72,
        yPercent: 60,
      },
      {
        id: "odin-sauce",
        label: "Doble Emulsión",
        detail: "Equilibrio entre salsa barbacoa y mayonesa clásica",
        xPercent: 45,
        yPercent: 78,
      },
    ],
  },
  {
    id: "thor",
    name: "Thor",
    subtitle: "El Dios del Trueno · Martillo & Brasa",
    mythologyRank: "PIEZA DE MUSEO II · GOLPE DE PLANCHA",
    recommendedHall: "Valhalla Teatinos",
    priceFormatted: "15,95 €",
    priceNumeric: 15.95,
    isPendingPriceConfirmation: true,
    description:
      "Bacon calcinado, carnes de vaca rubia gallega aplastadas por su martillo, queso cheddar, barbacoa ahumada con mayo Hellmann's y dos aros de cebolla crujientes.",
    badge: "BACON CALCINADO",
    image: "/images/burger-thor.jpg",
    photoBrief:
      "Bodegón en claroscuro de la burger Thor destacando la altura de los dos aros de cebolla, el bacon negro caramelizado y el brillo de la barbacoa ahumada.",
    callouts: [
      {
        id: "thor-rings",
        label: "Doble Aro de Cebolla",
        detail: "Dos anillos dorados que coronan la estructura con crujido limpio",
        xPercent: 56,
        yPercent: 25,
      },
      {
        id: "thor-bacon",
        label: "Bacon Calcinado",
        detail: "Pasado por hierro hasta caramelizar su grasa al extremo",
        xPercent: 28,
        yPercent: 46,
      },
      {
        id: "thor-smash",
        label: "Smash del Martillo",
        detail: "Vaca rubia gallega aplastada con costra profunda y cheddar",
        xPercent: 68,
        yPercent: 62,
      },
      {
        id: "thor-bbq",
        label: "BBQ Ahumada & Hellmann's",
        detail: "Humo dulce fundido con la cremosidad de la mayo Hellmann's",
        xPercent: 40,
        yPercent: 79,
      },
    ],
  },
  {
    id: "balder",
    name: "Balder",
    subtitle: "El Dios de la Luz · Smash & Pulled Pork",
    mythologyRank: "PIEZA DE MUSEO III · CAMPOS DEL NORTE",
    recommendedHall: "Valhalla Santa Paula",
    priceFormatted: "16,95 €",
    priceNumeric: 16.95,
    isPendingPriceConfirmation: true,
    description:
      "Doble carne smasheada de vaca rubia gallega, pulled pork cocinado a baja temperatura, bacon crujiente y salsa ranchera blanca como los helados campos nórdicos.",
    badge: "PULLED PORK + RANCHERA",
    image: "/images/burger-balder.jpg",
    photoBrief:
      "Bodegón macro de la burger Balder mostrando las hebras melosas de pulled pork sobre la doble smash y el contraste visual de la salsa ranchera blanca.",
    callouts: [
      {
        id: "balder-pork",
        label: "Pulled Pork a Baja Temp.",
        detail: "Cerdo desmigado tras horas de cocción lenta y jugosa",
        xPercent: 62,
        yPercent: 30,
      },
      {
        id: "balder-ranch",
        label: "Ranchera Blanca Nórdica",
        detail: "Salsa blanca especiada que contrasta con el calor de la carne",
        xPercent: 30,
        yPercent: 45,
      },
      {
        id: "balder-double",
        label: "Doble Smash Rubia Gallega",
        detail: "Dos discos smasheados al momento con bacon crujiente",
        xPercent: 66,
        yPercent: 66,
      },
    ],
  },
];

export const SEASONAL_SPECIAL = {
  enabled: true,
  eyebrow: "EDICIÓN ESPECIAL DE TEMPORADA · REINO DEL FUEGO",
  name: "Muspelheim",
  seasonLabel: "Especial Halloween [CONFIRMAR temporada activa]",
  priceFormatted: "14,50 €",
  priceNumeric: 14.5,
  description:
    "Forjada en el reino primordial del fuego: burger de vaca rubia gallega smasheada en pan brioche con salsa de queso blanca fundida y nacho crujiente coronándola.",
  image: "/images/burger-muspelheim.jpg",
  photoBrief:
    "Bodegón dramático con iluminación rojiza/brasa (#D9582B) de la burger Muspelheim coronada por el nacho sobre salsa de queso blanca.",
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "burgers",
    shortTabLabel: "Burgers",
    officialEpicTitle: "Burgers · Los Dioses del Valhalla",
    subtitle:
      "Vaca rubia gallega smasheada al momento sobre hierro candente. Precios de referencia oct. 2026 [CONFIRMAR].",
    items: [
      {
        id: "odin",
        name: "Odín",
        priceFormatted: "17,90 €",
        priceNumeric: 17.9,
        isPendingPriceConfirmation: true,
        badge: "4 CARNES · LA MÁS PODEROSA",
        description:
          "La más poderosa del Valhalla. 4 carnes smash de vaca rubia gallega, salsa cheddar, mayonesa, barbacoa y bacon crujiente en pan brioche.",
        image: "/images/burger-odin.jpg",
        photoBrief: "Foto macro de Odín sobre fondo carbón.",
      },
      {
        id: "balder",
        name: "Balder",
        priceFormatted: "16,95 €",
        priceNumeric: 16.95,
        isPendingPriceConfirmation: true,
        badge: "PULLED PORK",
        description:
          "Doble carne smasheada, pulled pork a baja temperatura, bacon crujiente y salsa ranchera blanca «como los helados campos nórdicos».",
        image: "/images/burger-balder.jpg",
        photoBrief: "Foto macro de Balder con pulled pork y salsa ranchera blanca.",
      },
      {
        id: "thor",
        name: "Thor",
        priceFormatted: "15,95 €",
        priceNumeric: 15.95,
        isPendingPriceConfirmation: true,
        badge: "FAVORITA DE LOS GUERREROS",
        description:
          "Bacon calcinado, carnes aplastadas «por su martillo», cheddar, barbacoa ahumada con mayo Hellmann's y dos aros de cebolla.",
        image: "/images/burger-thor.jpg",
        photoBrief: "Foto macro de Thor con aros de cebolla y bacon calcinado.",
      },
      {
        id: "kratos",
        name: "Kratos",
        priceFormatted: "15,95 €",
        priceNumeric: 15.95,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        description:
          "Vaca rubia gallega smasheada con carácter espartano-nórdico. [CONFIRMAR: Descripción exacta de ingredientes pendiente — pedir al cliente].",
        image: "/images/burger-kratos.jpg",
        photoBrief: "Retrato de Kratos sobre tabla oscura en claroscuro.",
      },
      {
        id: "beyonce",
        name: "Beyoncé",
        priceFormatted: "15,95 €",
        priceNumeric: 15.95,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        badge: "BURGER DEL MES",
        description:
          "Edición especial en carta. [CONFIRMAR: Descripción exacta de ingredientes de Beyoncé pendiente — pedir al cliente].",
        image: "/images/burger-beyonce.jpg",
        photoBrief: "Retrato de Beyoncé sobre fondo granate oscuro.",
      },
      {
        id: "tyr",
        name: "Tyr",
        priceFormatted: "14,95 €",
        priceNumeric: 14.95,
        isPendingPriceConfirmation: true,
        description:
          "Doble carne smasheada, salsa cheddar, huevo a la plancha, mayo Hellmann's, toque exótico de curry-mango y cebolla crujiente.",
        image: "/images/burger-tyr.jpg",
        photoBrief: "Foto de Tyr con la yema de huevo rompiéndose sobre el doble smash.",
      },
      {
        id: "frigg",
        name: "Frigg",
        priceFormatted: "14,95 €",
        priceNumeric: 14.95,
        isPendingPriceConfirmation: true,
        badge: "TRUFADA",
        description:
          "Vaca rubia gallega, huevo a la plancha, mayonesa de trufa aromática y queso gouda fundido. «La más campera del Valhalla».",
        image: "/images/burger-frigg.jpg",
        photoBrief: "Foto de Frigg mostrando el gouda fundido, huevo y mayo de trufa.",
      },
      {
        id: "sajona",
        name: "Sajona",
        priceFormatted: "14,95 €",
        priceNumeric: 14.95,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        description:
          "Receta de conquista en pan brioche. [CONFIRMAR: Descripción exacta de ingredientes de Sajona pendiente — pedir al cliente].",
        image: "/images/burger-sajona.jpg",
        photoBrief: "Retrato de Sajona en iluminación cálida lateral.",
      },
      {
        id: "heimdall",
        name: "Heimdall",
        priceFormatted: "14,95 €",
        priceNumeric: 14.95,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        description:
          "El guardián del Bifröst hecho smash. [CONFIRMAR: Descripción exacta de ingredientes de Heimdall pendiente — pedir al cliente].",
        image: "/images/burger-heimdall.jpg",
        photoBrief: "Retrato de Heimdall en iluminación cálida lateral.",
      },
      {
        id: "torvi",
        name: "Torvi",
        priceFormatted: "13,95 €",
        priceNumeric: 13.95,
        isPendingPriceConfirmation: true,
        badge: "LA CLÁSICA EN POTATO ROLL",
        description:
          "La pureza del smash clásico: vaca rubia gallega, doble queso gouda fundido y mayo Hellmann's en esponjoso potato roll.",
        image: "/images/burger-torvi.jpg",
        photoBrief: "Primer plano de Torvi mostrando el brillo del potato roll y el doble gouda.",
      },
      {
        id: "combo-valhalla",
        name: "Combo Valhalla",
        priceFormatted: "17,95 €",
        priceNumeric: 17.95,
        isPendingPriceConfirmation: true,
        badge: "MENÚ COMPLETO",
        description:
          "El banquete completo del guerrero: tu burger a elegir + ración de patatas crunchy + bebida [CONFIRMAR suplementos según burger].",
        image: "/images/burger-odin.jpg",
        photoBrief: "Bodegón de Burger + patatas crunchy + bebida en mesa del salón.",
      },
    ],
  },
  {
    id: "entrantes",
    shortTabLabel: "Entrantes",
    officialEpicTitle: "El banquete de los dioses del Valhalla comienza por el honor en la lucha",
    subtitle: "Para abrir fuego en el centro de la mesa antes de las burgers.",
    items: [
      {
        id: "nachos-midgard",
        name: "Nachos Midgard",
        priceFormatted: "11,95 €",
        priceNumeric: 11.95,
        isPendingPriceConfirmation: true,
        badge: "IMPRESCINDIBLE",
        description:
          "Totopos crujientes bañados en queso fundido, carnes del Valhalla y salsas artesanas para compartir entre guerreros [CONFIRMAR desglose exacto].",
        image: "/images/entrante-nachos.jpg",
        photoBrief: "Plano cenital 45º de los Nachos Midgard humeantes en fuente.",
      },
      {
        id: "croquetas-mac-cheese",
        name: "Croquetas de Mac & Cheese",
        priceFormatted: "10,95 €",
        priceNumeric: 10.95,
        isPendingPriceConfirmation: true,
        description:
          "Rebozado extracrujiente con interior cremoso de macarrones al cheddar fundido.",
        image: "/images/entrante-croquetas-mac.jpg",
        photoBrief: "Croqueta abierta por la mitad mostrando el interior fundente de mac & cheese.",
      },
      {
        id: "croquetas-costillar",
        name: "Croquetas de Costillar",
        priceFormatted: "9,95 €",
        priceNumeric: 9.95,
        isPendingPriceConfirmation: true,
        badge: "BAJA TEMPERATURA",
        description:
          "Bechamel melosa trabajada con carne de costillar asado lentamente a fuego lento.",
        image: "/images/entrante-croquetas-costillar.jpg",
        photoBrief: "Bodegón de croquetas de costillar sobre pizarra/cerámica oscura.",
      },
    ],
  },
  {
    id: "patatas",
    shortTabLabel: "Patatas & Guarnición",
    officialEpicTitle: "El instrumento que utilizan los vikingos para hacer sus banquetes eternos",
    subtitle: "Patatas crunchy coronadas al estilo de los nueve reinos.",
    items: [
      {
        id: "fries-asgard",
        name: "Fries Asgard",
        priceFormatted: "[CONFIRMAR €]",
        priceNumeric: 8.95,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        badge: "REINO DE ASGARD",
        description:
          "Patatas crunchy con nuestra combinación insignia de salsas y toppings del Valhalla [CONFIRMAR ingredientes exactos y precio].",
        image: "/images/fries-asgard.jpg",
        photoBrief: "Primer plano de Fries Asgard con queso y bacon crujiente.",
      },
      {
        id: "fries-jotunheim",
        name: "Fries Jotunheim",
        priceFormatted: "[CONFIRMAR €]",
        priceNumeric: 8.95,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        badge: "REINO DE LOS GIGANTES",
        description:
          "Ración colosal de patatas crunchy cargadas para compartir en el salón [CONFIRMAR ingredientes exactos y precio].",
        image: "/images/fries-jotunheim.jpg",
        photoBrief: "Primer plano de Fries Jotunheim.",
      },
    ],
  },
  {
    id: "postres",
    shortTabLabel: "Postres",
    officialEpicTitle: "Las celebraciones nórdicas acaban con un delicioso sabor dulce",
    subtitle: "El cierre goloso del banquete en nuestros tres salones.",
    items: [
      {
        id: "postres-valhalla",
        name: "Postres Artesanos del Salón",
        priceFormatted: "[CONFIRMAR €]",
        priceNumeric: 6.5,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        description:
          "Consulta en la carta viva de Qamarero de tu salón (Capuchinos, Teatinos o Santa Paula) las tartas de queso y tentaciones dulces disponibles hoy [CONFIRMAR listado de postres fijos y precios].",
        image: "/images/postre-valhalla.jpg",
        photoBrief: "Porción de tarta cremosa iluminada con luz cálida lateral en fondo oscuro.",
      },
    ],
  },
  {
    id: "bebidas",
    shortTabLabel: "Skoll (Bebidas)",
    officialEpicTitle: "Skoll",
    subtitle: "Alza tu copa en honor a los caídos en la plancha.",
    items: [
      {
        id: "cervezas-hidromiel",
        name: "Cervezas, Refrescos & Brindis Nórdico",
        priceFormatted: "[CONFIRMAR €]",
        priceNumeric: 2.9,
        isPendingDescription: true,
        isPendingPriceConfirmation: true,
        description:
          "Selección de cervezas bien frías, refrescos y bebidas para acompañar tu smash burger en sala o a domicilio [CONFIRMAR carta de bebidas y si trabajan hidromiel / cervezas especiales].",
        image: "/images/bebida-skoll.jpg",
        photoBrief: "Copa helada sobre barra oscura con reflejos dorados.",
      },
    ],
  },
];
