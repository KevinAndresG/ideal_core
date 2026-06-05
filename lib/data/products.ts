export type Category = "anchetas" | "bouquets";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  tags: string[];
  customizable: boolean;
  featured: boolean;
  images: string[];
  colors?: string[];
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "bouquet-kuromi-eterno",
    name: "Bouquet Premium Kuromi Eterno",
    description: "Bouquet exclusivo con peluche Kuromi original, rosas eternas rojas hechas a mano y detalles plateados con dije lunar. Empaque negro premium con lazo rojo de satén. Una declaración de amor que dura para siempre.",
    price: 135000,
    originalPrice: 160000,
    category: "bouquets",
    tags: ["kuromi", "sanrio", "rosas eternas", "premium", "regalo"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-kuromi-eterno.jpg"],
    rating: 5.0,
    reviews: 184,
  },
  {
    id: "2",
    slug: "bouquet-kuromi-rosa",
    name: "Bouquet Kuromi Rosa Pasión",
    description: "Peluche Kuromi original rodeado de rosas eternas en degradé rosa y negro de la mejor calidad. Hechas a mano con foamiran premium. Empaque rosa pastel con lazo de satén dual. Ideal para San Valentín o aniversarios.",
    price: 115000,
    category: "bouquets",
    tags: ["kuromi", "sanrio", "rosas", "san valentín"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-kuromi-rosa.jpg"],
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "3",
    slug: "bouquet-kuromi-valentine",
    name: "Bouquet Kuromi Happy Valentine",
    description: "Edición San Valentín con peluche Kuromi, chocolates Ferrero Rocher dorados, topper holográfico y stickers kawaii. Rosas eternas y cintas en tonos lila. El detalle perfecto para una sorpresa inolvidable.",
    price: 125000,
    originalPrice: 150000,
    category: "bouquets",
    tags: ["kuromi", "valentine", "ferrero", "chocolates"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-kuromi-valentine.jpg"],
    rating: 4.9,
    reviews: 96,
  },
  {
    id: "4",
    slug: "bouquet-stitch-graduacion",
    name: "Bouquet Stitch Graduación",
    description: "Celebra el gran logro con este bouquet premium: peluche Stitch con birrete de graduación, rosas eternas en degradé azul hechas a mano y diploma decorativo. Empaque temático Stitch con cinta blanca. Recuerdo que dura toda la vida.",
    price: 130000,
    category: "bouquets",
    tags: ["stitch", "graduación", "disney", "rosas eternas"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-stitch-graduacion.jpg"],
    rating: 5.0,
    reviews: 167,
  },
  {
    id: "5",
    slug: "bouquet-toothless-eterno",
    name: "Bouquet Toothless Furia Nocturna",
    description: "Peluche Toothless (Cómo Entrenar a Tu Dragón) sobre cama de rosas eternas negras con detalles dorados y mariposas plateadas. Empaque negro y dorado de lujo. Para los amantes de los detalles únicos y misteriosos.",
    price: 140000,
    category: "bouquets",
    tags: ["toothless", "dragones", "rosas negras", "premium"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-toothless-eterno.jpeg"],
    rating: 4.9,
    reviews: 88,
  },
  {
    id: "6",
    slug: "bouquet-hello-kitty",
    name: "Bouquet Hello Kitty Dreamy",
    description: "Peluche Hello Kitty original con lazo rosa, rodeado de rosas eternas rosadas hechas a mano con perlas. Mariposas decorativas y empaque rosa pastel con cinta de satén. Tierno, elegante y para siempre.",
    price: 110000,
    category: "bouquets",
    tags: ["hello kitty", "sanrio", "rosas rosadas", "kawaii"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-hello-kitty.jpeg"],
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "7",
    slug: "bouquet-batman-my-love",
    name: "Bouquet Batman My Love",
    description: "Edición Happy Birthday con rosas eternas amarillas y negras en forma de corazón, logo Batman central y lazo negro de satén. Cintas con frases personalizables. El regalo épico para fans de DC.",
    price: 120000,
    category: "bouquets",
    tags: ["batman", "dc", "cumpleaños", "rosas eternas"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-batman-my-love.jpeg"],
    rating: 4.8,
    reviews: 119,
  },
  {
    id: "8",
    slug: "bouquet-dragon-ball-z",
    name: "Bouquet Dragon Ball Z Collection",
    description: "Colección de figuras Dragon Ball Z (Goku, Vegeta, Gohan y más) sobre cama de rosas eternas azules y naranjas. Empaque negro con gypsophila y lazo naranja. Pieza única para verdaderos guerreros.",
    price: 165000,
    originalPrice: 195000,
    category: "bouquets",
    tags: ["dragon ball", "anime", "goku", "figuras"],
    customizable: false,
    featured: true,
    images: ["/products/bouquet-dragon-ball-z.jpeg"],
    rating: 5.0,
    reviews: 73,
  },
  {
    id: "9",
    slug: "bouquet-real-madrid",
    name: "Bouquet Real Madrid Champions",
    description: "Balón oficial Real Madrid CF rodeado de rosas eternas azules y blancas hechas a mano, chocolates Ferrero Rocher dorados y base satinada con detalles dorados. Para el madridista que lo tiene todo.",
    price: 170000,
    category: "bouquets",
    tags: ["real madrid", "fútbol", "ferrero", "premium"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-real-madrid.jpg"],
    rating: 5.0,
    reviews: 64,
  },
  {
    id: "10",
    slug: "bouquet-barcelona-fcb",
    name: "Bouquet FC Barcelona Culé",
    description: "Balón oficial FC Barcelona como pieza central, rosas eternas rojas y azules hechas a mano y chocolates Ferrero Rocher dorados. Empaque negro premium. El regalo soñado para todo culé.",
    price: 170000,
    category: "bouquets",
    tags: ["barcelona", "fcb", "fútbol", "ferrero"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-barcelona-fcb.jpg"],
    rating: 4.9,
    reviews: 58,
  },
  {
    id: "11",
    slug: "bouquet-dodgers-hotwheels",
    name: "Bouquet LA Dodgers Hot Wheels",
    description: "Gorra oficial New Era LA Dodgers, carritos Hot Wheels coleccionables y rosas eternas azul rey hechas a mano con gypsophila blanca. Empaque negro con lazo azul. El combo perfecto para fans del béisbol y los autos.",
    price: 160000,
    category: "bouquets",
    tags: ["dodgers", "hot wheels", "gorra", "coleccionable"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-dodgers-hotwheels.jpg"],
    rating: 4.9,
    reviews: 47,
  },
  {
    id: "12",
    slug: "bouquet-hotwheels-te-amo",
    name: "Bouquet Hot Wheels Te Amo",
    description: "Para el protagonista de tu historia: carritos Hot Wheels originales, dulces Lulu, rosa azul eterna hecha a mano y topper personalizado 'Te Amo'. Empaque blanco con detalles azules. Regalo único para él.",
    price: 95000,
    category: "bouquets",
    tags: ["hot wheels", "te amo", "él", "dulces"],
    customizable: true,
    featured: false,
    images: ["/products/bouquet-hotwheels-te-amo.jpeg"],
    rating: 4.8,
    reviews: 91,
  },
  {
    id: "13",
    slug: "bouquet-grumpy-bear-azul",
    name: "Bouquet Grumpy Bear Eterno",
    description: "Peluche oficial Grumpy Care Bear celeste sobre cama abundante de rosas eternas azules y lila con perlas decorativas. Empaque azul cielo con lazo doble. Tierno, esponjoso y para conservar por años.",
    price: 125000,
    originalPrice: 145000,
    category: "bouquets",
    tags: ["care bears", "peluche", "rosas eternas", "premium"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-grumpy-bear-azul.jpeg"],
    rating: 4.9,
    reviews: 132,
  },
  {
    id: "14",
    slug: "bouquet-winnie-pooh",
    name: "Bouquet Winnie The Pooh Sunshine",
    description: "Diseño único con rosas eternas amarillas formando la cara de Winnie Pooh sobre base de rosas rojas. Mariposas decorativas y topper Happy Birthday personalizable. Pieza coleccionable hecha completamente a mano.",
    price: 150000,
    category: "bouquets",
    tags: ["winnie pooh", "disney", "cumpleaños", "artesanal"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-winnie-pooh.jpeg"],
    rating: 5.0,
    reviews: 79,
  },
  {
    id: "15",
    slug: "bouquet-girasoles-mariposas",
    name: "Bouquet Girasoles & Mariposas",
    description: "Anillo floral de girasoles eternos hechos a mano con centro de rosas blancas, mariposas doradas decorativas y corona dorada central. Empaque blanco con borde dorado. Elegancia eterna y luminosa.",
    price: 115000,
    category: "bouquets",
    tags: ["girasoles", "mariposas", "elegante", "rosas blancas"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-girasoles-mariposas.jpeg"],
    rating: 4.9,
    reviews: 104,
  },
  {
    id: "16",
    slug: "bouquet-congrats-graduacion",
    name: "Bouquet Congrats Graduación Dorado",
    description: "Caja rosa premium con birrete dorado decorativo y rosas eternas color champagne hechas a mano. Mariposas doradas y mensaje 'Congrats' grabado en oro. Para celebrar el logro con elegancia eterna.",
    price: 125000,
    category: "bouquets",
    tags: ["graduación", "congrats", "dorado", "rosas champagne"],
    customizable: true,
    featured: true,
    images: ["/products/bouquet-congrats-graduacion.jpeg"],
    rating: 5.0,
    reviews: 86,
  },
  {
    id: "17",
    slug: "ancheta-aniversario-te-amo",
    name: "Ancheta Feliz Aniversario Te Amo",
    description: "Caja premium con globo bubble personalizado 'Feliz Aniversario', globo estrella 'Te amo', peluche oso vainilla, rosas eternas azules y tarjeta personalizada. El detalle completo para celebrar el amor.",
    price: 135000,
    originalPrice: 160000,
    category: "anchetas",
    tags: ["aniversario", "te amo", "globos", "peluche"],
    customizable: true,
    featured: true,
    images: ["/products/ancheta-aniversario-te-amo.jpeg"],
    rating: 4.9,
    reviews: 112,
  },
  {
    id: "18",
    slug: "ancheta-labubu-birthday",
    name: "Ancheta Labubu Happy Birthday",
    description: "Globo gigante Labubu, mix de dulces premium (M&Ms, Skittles, Ruffles, Hershey's, Icee), rosas en foamiran rosa y empaque festivo con confetti. La sorpresa de cumpleaños que se vuelve viral.",
    price: 105000,
    category: "anchetas",
    tags: ["labubu", "cumpleaños", "dulces", "globos"],
    customizable: true,
    featured: false,
    images: ["/products/ancheta-labubu-birthday.jpeg"],
    rating: 4.8,
    reviews: 138,
  },
];

export const categories = [
  { id: "bouquets" as Category, label: "Bouquets & Ramos", emoji: "💐", description: "Rosas eternas hechas a mano" },
  { id: "anchetas" as Category, label: "Anchetas", emoji: "🎁", description: "Detalles y sorpresas completas" },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
