import Link from "next/link";
import { getAllProducts } from "@/lib/server/products";
import { getAllCustomizerItems } from "@/lib/server/customizer-items";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [products, items] = await Promise.all([
    getAllProducts(),
    getAllCustomizerItems(),
  ]);

  const featuredCount = products.filter((p) => p.featured).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-gradient">Panel de administración</h1>
        <p className="text-[var(--color-ink-soft)] mt-1">
          Gestiona los productos y los ítems del personalizador de la tienda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href={`${ADMIN_BASE_PATH}/productos`}
          className="petal-card petal-card-pink p-6 block"
        >
          <p className="text-sm text-[var(--color-ink-soft)]">Productos</p>
          <p className="font-serif text-4xl mt-1">{products.length}</p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            {featuredCount} destacados · bouquets y anchetas
          </p>
        </Link>

        <Link
          href={`${ADMIN_BASE_PATH}/personalizador`}
          className="petal-card petal-card-violet p-6 block"
        >
          <p className="text-sm text-[var(--color-ink-soft)]">Ítems del personalizador</p>
          <p className="font-serif text-4xl mt-1">{items.length}</p>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            Extras disponibles para personalizar anchetas
          </p>
        </Link>
      </div>

      <div className="petal-card petal-card-mint p-6 text-sm text-[var(--color-ink-soft)] space-y-2">
        <p className="font-medium text-[var(--color-ink)]">Nota sobre los datos</p>
        <p>
          Los productos y los ítems del personalizador se guardan en archivos JSON dentro
          de <code>data/</code>. En desarrollo (<code>npm run dev</code>) los cambios se
          reflejan de inmediato. En producción, después de crear, editar o eliminar algo,
          es posible que necesites volver a desplegar (rebuild) para que los cambios se
          vean en todo el sitio.
        </p>
      </div>
    </div>
  );
}
