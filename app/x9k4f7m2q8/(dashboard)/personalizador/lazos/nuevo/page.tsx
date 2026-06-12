import Link from "next/link";
import { createCustomizerRibbonAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { CustomizerRibbonForm } from "../../../../_components/CustomizerRibbonForm";

export default function NewCustomizerRibbonPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador/lazos`}
          className="text-sm text-[var(--color-ink-soft)] hover:underline"
        >
          ← Volver a lazos
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient mt-1">Nuevo lazo</h1>
      </div>

      <CustomizerRibbonForm action={createCustomizerRibbonAction} submitLabel="Crear lazo" />
    </div>
  );
}
