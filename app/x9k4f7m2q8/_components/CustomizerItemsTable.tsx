"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ConfirmSubmitButton } from "./ConfirmSubmitButton";
import { deleteCustomizerItemAction } from "@/lib/actions/customizer-actions";
import type { CustomizerItem } from "@/lib/data/customizer-items";

const POSITION_LABELS: Record<string, string> = {
  top: "Arriba",
  middle: "Centro",
  bottom: "Abajo",
  side: "Lateral",
};

export function CustomizerItemsTable({ items }: { items: CustomizerItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) => {
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      const matchCategory = !category || item.category === category;
      const matchPosition = !position || item.positionHint === position;
      return matchSearch && matchCategory && matchPosition;
    });
  }, [items, search, category, position]);

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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="petal-input w-auto"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="petal-input w-auto"
        >
          <option value="">Todas las posiciones</option>
          {Object.entries(POSITION_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs text-[var(--color-ink-soft)]">
          {filtered.length} de {items.length} ítem{items.length === 1 ? "" : "s"}
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
            {filtered.map((item) => (
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[var(--color-ink-soft)]">
                  {items.length === 0
                    ? "No hay ítems todavía."
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
