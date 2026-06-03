export type Category = "anchetas" | "decoraciones" | "velas" | "flores" | "sets" | "manualidades";

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
    slug: "ancheta-amor-eterno",
    name: "Ancheta Amor Eterno",
    description: "Una hermosa ancheta con chocolates artesanales, flores preservadas y una vela aromática. Perfecta para celebrar momentos especiales.",
    price: 185000,
    originalPrice: 220000,
    category: "anchetas",
    tags: ["regalo", "romántico", "cumpleaños"],
    customizable: true,
    featured: true,
    images: ["/products/ancheta-1.jpg"],
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "2",
    slug: "ancheta-baby-shower",
    name: "Ancheta Baby Shower",
    description: "Dulce sorpresa para la mamá que espera. Incluye artículos para bebé, snacks saludables y una tarjeta personalizada.",
    price: 210000,
    category: "anchetas",
    tags: ["bebé", "baby shower", "mamá"],
    customizable: true,
    featured: true,
    images: ["/products/ancheta-2.jpg"],
    rating: 4.8,
    reviews: 94,
  },
  {
    id: "3",
    slug: "ancheta-wellness",
    name: "Ancheta Wellness & Self-Care",
    description: "Cuídate como mereces. Jabones naturales, crema corporal artesanal, vela de soya y té premium.",
    price: 165000,
    category: "anchetas",
    tags: ["bienestar", "autoestima", "regalo"],
    customizable: true,
    featured: true,
    images: ["/products/ancheta-3.jpg"],
    rating: 4.7,
    reviews: 76,
  },
  {
    id: "4",
    slug: "corona-flores-eternas",
    name: "Corona de Flores Eternas",
    description: "Flores preservadas en una corona artesanal que dura años. Decoración única para cualquier espacio.",
    price: 145000,
    category: "flores",
    tags: ["flores", "decoración", "hogar"],
    customizable: false,
    featured: true,
    images: ["/products/flores-1.jpg"],
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "5",
    slug: "centro-mesa-flores",
    name: "Centro de Mesa Floral",
    description: "Centro de mesa con flores secas y preservadas. Arte floral que transforma cualquier espacio.",
    price: 98000,
    category: "flores",
    tags: ["flores", "hogar", "evento"],
    customizable: true,
    featured: false,
    images: ["/products/flores-2.jpg"],
    rating: 4.6,
    reviews: 45,
  },
  {
    id: "6",
    slug: "vela-soya-lavanda",
    name: "Vela de Soya y Lavanda",
    description: "Vela 100% de soya con esencia de lavanda y flor de algodón. Quema limpia por 40 horas.",
    price: 55000,
    category: "velas",
    tags: ["vela", "aromaterapia", "relajación"],
    customizable: false,
    featured: false,
    images: ["/products/vela-1.jpg"],
    rating: 4.8,
    reviews: 167,
  },
  {
    id: "7",
    slug: "vela-cera-abeja",
    name: "Vela de Cera de Abeja",
    description: "Vela natural de cera de abeja con mecha de algodón. Purifica el aire y huele a miel.",
    price: 75000,
    category: "velas",
    tags: ["vela", "natural", "artesanal"],
    customizable: true,
    featured: false,
    images: ["/products/vela-2.jpg"],
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "8",
    slug: "guirnalda-eucalipto",
    name: "Guirnalda de Eucalipto",
    description: "Guirnalda decorativa de eucalipto natural preservado. Perfecta para eventos y fotografías.",
    price: 85000,
    category: "decoraciones",
    tags: ["decoración", "evento", "natural"],
    customizable: false,
    featured: false,
    images: ["/products/deco-1.jpg"],
    rating: 4.7,
    reviews: 52,
  },
  {
    id: "9",
    slug: "caja-macarons",
    name: "Caja de Macarons Artesanales",
    description: "12 macarons de diferentes sabores elaborados artesanalmente. Presentación elegante en caja decorada.",
    price: 78000,
    category: "manualidades",
    tags: ["dulces", "regalo", "elegante"],
    customizable: false,
    featured: false,
    images: ["/products/mac-1.jpg"],
    rating: 4.8,
    reviews: 134,
  },
  {
    id: "10",
    slug: "set-spa-completo",
    name: "Set Spa Completo",
    description: "Kit completo de spa para disfrutar en casa. Sales de baño, mascarilla, aceite y vela.",
    price: 195000,
    category: "sets",
    tags: ["spa", "relajación", "bienestar"],
    customizable: true,
    featured: true,
    images: ["/products/set-1.jpg"],
    rating: 5.0,
    reviews: 61,
  },
  {
    id: "11",
    slug: "set-cafe-gourmet",
    name: "Set Café Gourmet",
    description: "Para los amantes del café. Café de origen, tazas artesanales, galletas especiadas y molinillo manual.",
    price: 155000,
    category: "sets",
    tags: ["café", "gourmet", "regalo"],
    customizable: false,
    featured: false,
    images: ["/products/set-2.jpg"],
    rating: 4.7,
    reviews: 88,
  },
  {
    id: "12",
    slug: "ancheta-navidad",
    name: "Ancheta Navidad Dorada",
    description: "Celebra la temporada con esta ancheta temática llena de detalles navideños y productos artesanales.",
    price: 245000,
    originalPrice: 285000,
    category: "anchetas",
    tags: ["navidad", "temporada", "regalo"],
    customizable: true,
    featured: false,
    images: ["/products/ancheta-4.jpg"],
    rating: 4.9,
    reviews: 42,
  },
  {
    id: "13",
    slug: "marco-flores-secas",
    name: "Marco con Flores Secas",
    description: "Marco decorativo hecho a mano con flores secas y preservadas. Cada pieza es única.",
    price: 72000,
    category: "manualidades",
    tags: ["flores", "arte", "decoración"],
    customizable: true,
    featured: false,
    images: ["/products/manual-1.jpg"],
    rating: 4.6,
    reviews: 33,
  },
  {
    id: "14",
    slug: "difusor-bambu",
    name: "Difusor en Bambú",
    description: "Difusor de varillas en bambú natural con aceite esencial de bergamota y ylang ylang.",
    price: 68000,
    category: "decoraciones",
    tags: ["aroma", "hogar", "natural"],
    customizable: false,
    featured: false,
    images: ["/products/deco-2.jpg"],
    rating: 4.5,
    reviews: 29,
  },
  {
    id: "15",
    slug: "ancheta-cumpleanos-custom",
    name: "Ancheta Cumpleaños Custom",
    description: "¡La más especial! Arma tu ancheta de cumpleaños completamente a tu gusto con nuestro personalizador.",
    price: 120000,
    category: "anchetas",
    tags: ["cumpleaños", "custom", "personalizable"],
    customizable: true,
    featured: true,
    images: ["/products/ancheta-5.jpg"],
    rating: 5.0,
    reviews: 217,
  },
];

export const categories = [
  { id: "anchetas" as Category, label: "Anchetas", emoji: "🎁", description: "Cestas llenas de amor" },
  { id: "flores" as Category, label: "Flores", emoji: "🌸", description: "Flores eternas preservadas" },
  { id: "velas" as Category, label: "Velas", emoji: "🕯️", description: "Aromas que envuelven" },
  { id: "decoraciones" as Category, label: "Decoraciones", emoji: "✨", description: "Decora con arte" },
  { id: "sets" as Category, label: "Sets", emoji: "💝", description: "Colecciones completas" },
  { id: "manualidades" as Category, label: "Manualidades", emoji: "🎨", description: "Hechos a mano" },
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
