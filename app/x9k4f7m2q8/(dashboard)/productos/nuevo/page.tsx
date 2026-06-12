import Link from "next/link";
import { createProductAction } from "@/lib/actions/product-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ProductForm } from "../../../_components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/productos`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver a productos
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">Nuevo producto</h1>
      </div>

      <ProductForm action={createProductAction} submitLabel="Crear producto" />
    </div>
  );
}
