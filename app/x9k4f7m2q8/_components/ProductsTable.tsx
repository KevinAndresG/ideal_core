"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { ConfirmSubmitButton } from "./ConfirmSubmitButton";
import { deleteProductAction } from "@/lib/actions/product-actions";
import type { Product } from "@/lib/data/products";

export function ProductsTable({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
      const matchCategory = !category || p.category === category;
      const matchFeatured =
        !featured || (featured === "yes" ? p.featured : !p.featured);
      return matchSearch && matchCategory && matchFeatured;
    });
  }, [products, search, category, featured]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Buscar por nombre o slug…"
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
          <option value="bouquets">Bouquets</option>
          <option value="anchetas">Anchetas</option>
        </select>
        <select
          value={featured}
          onChange={(e) => setFeatured(e.target.value)}
          className="petal-input w-auto"
        >
          <option value="">Destacado: todos</option>
          <option value="yes">Solo destacados</option>
          <option value="no">No destacados</option>
        </select>
      </div>

      <p className="text-xs text-[var(--color-ink-soft)]">
        {filtered.length} de {products.length} producto{products.length === 1 ? "" : "s"}
      </p>

      <div className="petal-card overflow-x-auto p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-[var(--surface-border)]">
              <th className="py-2 pr-4 font-medium">Producto</th>
              <th className="py-2 pr-4 font-medium">Categoría</th>
              <th className="py-2 pr-4 font-medium">Precio</th>
              <th className="py-2 pr-4 font-medium">Destacado</th>
              <th className="py-2 pr-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[var(--surface-border)] last:border-0"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{product.slug}</p>
                </td>
                <td className="py-3 pr-4 capitalize">{product.category}</td>
                <td className="py-3 pr-4">
                  ${product.price.toLocaleString("es-CO")}
                  {product.originalPrice && (
                    <span className="ml-2 text-xs text-[var(--color-ink-soft)] line-through">
                      ${product.originalPrice.toLocaleString("es-CO")}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4">{product.featured ? "Sí" : "No"}</td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`${ADMIN_BASE_PATH}/productos/${product.id}`}
                      className="petal-btn petal-btn-secondary !px-4 !py-2 text-xs"
                    >
                      Editar
                    </Link>
                    <form action={deleteProductAction.bind(null, product.id)}>
                      <ConfirmSubmitButton
                        confirmMessage={`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`}
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
                  {products.length === 0
                    ? "No hay productos todavía."
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
