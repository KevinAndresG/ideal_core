import Link from "next/link";
import { createCustomizerBaseAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { CustomizerBaseForm } from "../../../../_components/CustomizerBaseForm";

export default function NewCustomizerBasePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador/bases`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver a bases
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">Nueva base</h1>
      </div>

      <CustomizerBaseForm action={createCustomizerBaseAction} submitLabel="Crear base" />
    </div>
  );
}
