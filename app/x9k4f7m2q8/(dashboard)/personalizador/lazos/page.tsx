import Link from "next/link";
import { getAllCustomizerRibbons } from "@/lib/server/customizer-ribbons";
import { deleteCustomizerRibbonAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ConfirmSubmitButton } from "../../../_components/ConfirmSubmitButton";
import { PersonalizadorTabs } from "../../../_components/PersonalizadorTabs";

export const dynamic = "force-dynamic";

export default async function PersonalizadorLazosPage() {
  const ribbons = await getAllCustomizerRibbons();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient">Personalizador</h1>
        <p className="text-sm text-[var(--color-ink-soft)]">
          Bases, ítems y lazos para el personalizador de anchetas
        </p>
      </div>

      <PersonalizadorTabs active="lazos" />

      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {ribbons.length} lazo{ribbons.length === 1 ? "" : "s"}
        </p>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador/lazos/nuevo`}
          className="petal-btn petal-btn-primary"
        >
          + Nuevo lazo
        </Link>
      </div>

      <div className="petal-card overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-[var(--surface-border)]">
              <th className="py-2 pr-4 font-medium">Lazo</th>
              <th className="py-2 pr-4 font-medium">Color</th>
              <th className="py-2 pr-4 font-medium">Precio adicional</th>
              <th className="py-2 pr-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ribbons.map((ribbon) => (
              <tr
                key={ribbon.id}
                className="border-b border-[var(--surface-border)] last:border-0"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium">{ribbon.name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{ribbon.id}</p>
                </td>
                <td className="py-3 pr-4">
                  <span
                    className="inline-block w-5 h-5 rounded-full border border-[var(--surface-border)] align-middle"
                    style={{ background: ribbon.color }}
                  />
                  <span className="ml-2 text-xs text-[var(--color-ink-soft)]">{ribbon.color}</span>
                </td>
                <td className="py-3 pr-4">
                  {ribbon.price > 0 ? `+$${ribbon.price.toLocaleString("es-CO")}` : "Gratis"}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`${ADMIN_BASE_PATH}/personalizador/lazos/${ribbon.id}`}
                      className="petal-btn petal-btn-secondary !px-4 !py-2 text-xs"
                    >
                      Editar
                    </Link>
                    <form action={deleteCustomizerRibbonAction.bind(null, ribbon.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`¿Eliminar "${ribbon.name}"? Esta acción no se puede deshacer.`}
                        className="petal-btn petal-btn-peach !px-4 !py-2 text-xs"
                      >
                        Eliminar
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {ribbons.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-[var(--color-ink-soft)]">
                  No hay lazos todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
