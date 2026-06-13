"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ConfirmSubmitButton } from "./ConfirmSubmitButton";
import { deleteCustomizerBaseAction } from "@/lib/actions/customizer-actions";
import type { CustomizerBase } from "@/lib/data/customizer-items";

export function CustomizerBasesTable({ bases }: { bases: CustomizerBase[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return !q
      ? bases
      : bases.filter(
          (b) =>
            b.name.toLowerCase().includes(q) ||
            b.id.toLowerCase().includes(q) ||
            b.description.toLowerCase().includes(q)
        );
  }, [bases, search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre, ID o descripción…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="petal-input flex-1 min-w-[200px]"
        />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs text-[var(--color-ink-soft)]">
          {filtered.length} de {bases.length} base{bases.length === 1 ? "" : "s"}
        </p>
        <Link
          href={`${ADMIN_BASE_PATH}/personalizador/bases/nuevo`}
          className="petal-btn petal-btn-primary"
        >
          + Nueva base
        </Link>
      </div>

      <div className="petal-card overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-[var(--surface-border)]">
              <th className="py-2 pr-4 font-medium">Base</th>
              <th className="py-2 pr-4 font-medium">Descripción</th>
              <th className="py-2 pr-4 font-medium">Precio base</th>
              <th className="py-2 pr-4 font-medium">Color</th>
              <th className="py-2 pr-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((base) => (
              <tr
                key={base.id}
                className="border-b border-[var(--surface-border)] last:border-0"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium">
                    <span className="mr-2">{base.emoji}</span>
                    {base.name}
                  </p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{base.id}</p>
                </td>
                <td className="py-3 pr-4">{base.description}</td>
                <td className="py-3 pr-4">${base.basePrice.toLocaleString("es-CO")}</td>
                <td className="py-3 pr-4">
                  <span
                    className="inline-block w-5 h-5 rounded-full border border-[var(--surface-border)] align-middle"
                    style={{ background: base.color }}
                  />
                  <span className="ml-2 text-xs text-[var(--color-ink-soft)]">{base.color}</span>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`${ADMIN_BASE_PATH}/personalizador/bases/${base.id}`}
                      className="petal-btn petal-btn-secondary !px-4 !py-2 text-xs"
                    >
                      Editar
                    </Link>
                    <form action={deleteCustomizerBaseAction.bind(null, base.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`¿Eliminar "${base.name}"? Esta acción no se puede deshacer.`}
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
                <td colSpan={5} className="py-6 text-center text-[var(--color-ink-soft)]">
                  {bases.length === 0
                    ? "No hay bases todavía."
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
