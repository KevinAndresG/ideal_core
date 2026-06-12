import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/server/products";
import { updateProductAction } from "@/lib/actions/product-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ProductForm } from "../../../_components/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const action = updateProductAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/productos`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver a productos
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">
          Editar producto
        </h1>
      </div>

      <ProductForm action={action} product={product} submitLabel="Guardar cambios" />
    </div>
  );
}
