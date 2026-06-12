import { getAllProducts } from "@/lib/server/products";
import { ProductsPageClient } from "./ProductsPageClient";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return <ProductsPageClient products={products} />;
}
