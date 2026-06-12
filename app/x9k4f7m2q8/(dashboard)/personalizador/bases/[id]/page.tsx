import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomizerBaseById } from "@/lib/server/customizer-bases";
import { updateCustomizerBaseAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { CustomizerBaseForm } from "../../../../_components/CustomizerBaseForm";

export const dynamic = "force-dynamic";

export default async function EditCustomizerBasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const base = await getCustomizerBaseById(id);

  if (!base) {
    notFound();
  }

  const action = updateCustomizerBaseAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador/bases`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver a bases
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">Editar base</h1>
      </div>

      <CustomizerBaseForm action={action} base={base} submitLabel="Guardar cambios" />
    </div>
  );
}
