import Link from "next/link";
import { getAllCustomizerItems } from "@/lib/server/customizer-items";
import { deleteCustomizerItemAction } from "@/lib/actions/customizer-actions";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ConfirmSubmitButton } from "../../_components/ConfirmSubmitButton";
import { PersonalizadorTabs } from "../../_components/PersonalizadorTabs";

export const dynamic = "force-dynamic";

const POSITION_LABELS: Record<string, string> = {
  top: "Arriba",
  middle: "Centro",
  bottom: "Abajo",
  side: "Lateral",
};

export default async function PersonalizadorPage() {
  const items = await getAllCustomizerItems();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient">Personalizador</h1>
        <p className="text-sm text-[var(--color-ink-soft)]">
          Bases, ítems y lazos para el personalizador de anchetas
        </p>
      </div>

      <PersonalizadorTabs active="items" />

      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-[var(--color-ink-soft)]">
          {items.length} ítem{items.length === 1 ? "" : "s"}
        </p>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador/nuevo`}
          className="petal-btn petal-btn-primary"
        >
          + Nuevo ítem
        </Link>
      </div>

      <div className="petal-card overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-[var(--surface-border)]">
              <th className="py-2 pr-4 font-medium">Ítem</th>
              <th className="py-2 pr-4 font-medium">Categoría</th>
              <th className="py-2 pr-4 font-medium">Precio</th>
              <th className="py-2 pr-4 font-medium">Posición</th>
              <th className="py-2 pr-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--surface-border)] last:border-0"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium">
                    <span className="mr-2">{item.emoji}</span>
                    {item.name}
                  </p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{item.id}</p>
                </td>
                <td className="py-3 pr-4">{item.category}</td>
                <td className="py-3 pr-4">${item.price.toLocaleString("es-CO")}</td>
                <td className="py-3 pr-4">
                  {POSITION_LABELS[item.positionHint] ?? item.positionHint}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`${ADMIN_BASE_PATH}/personalizador/${item.id}`}
                      className="petal-btn petal-btn-secondary !px-4 !py-2 text-xs"
                    >
                      Editar
                    </Link>
                    <form action={deleteCustomizerItemAction.bind(null, item.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`¿Eliminar "${item.name}"? Esta acción no se puede deshacer.`}
                        className="petal-btn petal-btn-peach !px-4 !py-2 text-xs"
                      >
                        Eliminar
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[var(--color-ink-soft)]">
                  No hay ítems todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
