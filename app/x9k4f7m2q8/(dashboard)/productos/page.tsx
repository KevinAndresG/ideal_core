import Link from "next/link";
import { getAllProducts } from "@/lib/server/products";
import { deleteProductAction } from "@/lib/actions/product-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ConfirmSubmitButton } from "../../_components/ConfirmSubmitButton";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl text-gradient">Productos</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">
            {products.length} producto{products.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link href={`${ADMIN_BASE_PATH}/productos/nuevo`} className="petal-btn petal-btn-primary">
          + Nuevo producto
        </Link>
      </div>

      <div className="petal-card overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-[var(--surface-border)]">
              <th className="py-2 pr-4 font-medium">Producto</th>
              <th className="py-2 pr-4 font-medium">Categoría</th>
              <th className="py-2 pr-4 font-medium">Precio</th>
              <th className="py-2 pr-4 font-medium">Destacado</th>
              <th className="py-2 pr-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[var(--surface-border)] last:border-0"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{product.slug}</p>
                </td>
                <td className="py-3 pr-4 capitalize">{product.category}</td>
                <td className="py-3 pr-4">
                  ${product.price.toLocaleString("es-CO")}
                  {product.originalPrice && (
                    <span className="ml-2 text-xs text-[var(--color-ink-soft)] line-through">
                      ${product.originalPrice.toLocaleString("es-CO")}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4">{product.featured ? "Sí" : "No"}</td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`${ADMIN_BASE_PATH}/productos/${product.id}`}
                      className="petal-btn petal-btn-secondary !px-4 !py-2 text-xs"
                    >
                      Editar
                    </Link>
                    <form action={deleteProductAction.bind(null, product.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`}
                        className="petal-btn petal-btn-peach !px-4 !py-2 text-xs"
                      >
                        Eliminar
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[var(--color-ink-soft)]">
                  No hay productos todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
