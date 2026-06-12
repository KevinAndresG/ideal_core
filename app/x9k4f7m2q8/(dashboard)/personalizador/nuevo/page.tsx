import Link from "next/link";
import { createCustomizerItemAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { CustomizerItemForm } from "../../../_components/CustomizerItemForm";

export default function NewCustomizerItemPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver al personalizador
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">Nuevo ítem</h1>
      </div>

      <CustomizerItemForm action={createCustomizerItemAction} submitLabel="Crear ítem" />
    </div>
  );
}
