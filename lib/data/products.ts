import { getAllProducts } from "@/lib/server/products";

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

export const categories = [
  {
    id: "bouquets" as Category,
    label: "Bouquets & Ramos",
    emoji: "💐",
    description: "Rosas eternas hechas a mano",
  },
  {
    id: "anchetas" as Category,
    label: "Anchetas",
    emoji: "🎁",
    description: "Detalles y sorpresas completas",
  },
];

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.category === category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.featured);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}
