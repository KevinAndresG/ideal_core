import Link from "next/link";
import { getAllProducts } from "@/lib/server/products";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ProductsTable } from "../../_components/ProductsTable";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-gradient">Productos</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {products.length} producto{products.length === 1 ? "" : "s"} en total
          </p>
        </div>
        <Link href={`${ADMIN_BASE_PATH}/productos/nuevo`} className="petal-btn petal-btn-primary">
          + Nuevo producto
        </Link>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}
