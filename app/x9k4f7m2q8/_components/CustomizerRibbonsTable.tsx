"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ConfirmSubmitButton } from "./ConfirmSubmitButton";
import { deleteCustomizerRibbonAction } from "@/lib/actions/customizer-actions";
import type { RibbonColor } from "@/lib/data/customizer-items";

export function CustomizerRibbonsTable({ ribbons }: { ribbons: RibbonColor[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q
      ? ribbons
      : ribbons.filter(
          (r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
        );
  }, [ribbons, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre o ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="petal-input flex-1 min-w-[200px]"
        />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs text-[var(--color-ink-soft)]">
          {filtered.length} de {ribbons.length} lazo{ribbons.length === 1 ? "" : "s"}
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
            {filtered.map((ribbon) => (
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-[var(--color-ink-soft)]">
                  {ribbons.length === 0
                    ? "No hay lazos todavía."
                    : "Sin resultados para los filtros aplicados."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
