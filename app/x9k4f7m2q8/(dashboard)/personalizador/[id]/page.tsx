import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomizerItemById } from "@/lib/server/customizer-items";
import { updateCustomizerItemAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { CustomizerItemForm } from "../../../_components/CustomizerItemForm";

export const dynamic = "force-dynamic";

export default async function EditCustomizerItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getCustomizerItemById(id);

  if (!item) {
    notFound();
  }

  const action = updateCustomizerItemAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver al personalizador
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">Editar ítem</h1>
      </div>

      <CustomizerItemForm action={action} item={item} submitLabel="Guardar cambios" />
    </div>
  );
}
