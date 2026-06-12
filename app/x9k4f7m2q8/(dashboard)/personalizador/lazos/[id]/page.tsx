import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomizerRibbonById } from "@/lib/server/customizer-ribbons";
import { updateCustomizerRibbonAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { CustomizerRibbonForm } from "../../../../_components/CustomizerRibbonForm";

export const dynamic = "force-dynamic";

export default async function EditCustomizerRibbonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ribbon = await getCustomizerRibbonById(id);

  if (!ribbon) {
    notFound();
  }

  const action = updateCustomizerRibbonAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador/lazos`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver a lazos
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">Editar lazo</h1>
      </div>

      <CustomizerRibbonForm action={action} ribbon={ribbon} submitLabel="Guardar cambios" />
    </div>
  );
}
