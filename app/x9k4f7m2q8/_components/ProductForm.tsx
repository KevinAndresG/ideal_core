"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import type { Product } from "@/lib/data/products";
import type { ProductFormState } from "@/lib/actions/product-actions";
import { uploadProductImage } from "@/lib/actions/upload-actions";

type ProductAction = (
  prevState: ProductFormState,
  formData: FormData
) => Promise<ProductFormState>;

export function ProductForm({
  action,
  product,
  submitLabel,
}: {
  action: ProductAction;
  product?: Product;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [manualUrl, setManualUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadProductImage(formData);
      if (result.error) {
        setUploadError(result.error);
      } else if (result.url) {
        setImages((prev) => [...prev, result.url!]);
      }
    } catch {
      setUploadError("No se pudo subir la imagen. Intenta de nuevo.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleAddUrl() {
    const url = manualUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setManualUrl("");
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state?.error && (
        <p className="petal-card petal-card-peach px-4 py-3 text-sm">{state.error}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={product?.name}
            required
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            name="slug"
            defaultValue={product?.slug}
            required
            placeholder="bouquet-rosas-rojas"
            className="petal-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
          rows={4}
          className="petal-input"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Precio
          </label>
          <input
            id="price"
            type="number"
            name="price"
            defaultValue={product?.price}
            required
            min={0}
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="originalPrice" className="block text-sm font-medium mb-1">
            Precio original (opcional)
          </label>
          <input
            id="originalPrice"
            type="number"
            name="originalPrice"
            defaultValue={product?.originalPrice}
            min={0}
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product?.category ?? "bouquets"}
            className="petal-input"
          >
            <option value="bouquets">Bouquets</option>
            <option value="anchetas">Anchetas</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-1">
          Tags (separados por coma)
        </label>
        <input
          id="tags"
          type="text"
          name="tags"
          defaultValue={product?.tags?.join(", ")}
          placeholder="rosas, premium, regalo"
          className="petal-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Imágenes</label>

        {images.length > 0 && (
          <ul className="space-y-2 mb-3">
            {images.map((src, i) => (
              <li
                key={`${src}-${i}`}
                className="flex items-center gap-3 p-2 rounded-lg border border-bloom/15 bg-surface"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="w-14 h-14 object-cover rounded-md flex-shrink-0 bg-mist"
                />
                <span className="text-xs text-ink/60 truncate flex-1">{src}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="text-xs text-red-600 hover:underline cursor-pointer flex-shrink-0"
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 items-center">
          <label
            className={`petal-btn petal-btn-secondary text-sm cursor-pointer ${
              uploading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {uploading ? "Subiendo..." : "Subir imagen"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="o pega una URL de imagen"
            className="petal-input flex-1 min-w-[180px]"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="petal-btn petal-btn-secondary text-sm"
          >
            Agregar
          </button>
        </div>

        {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
        {images.length === 0 && (
          <p className="text-xs text-[var(--color-ink-soft)] mt-1">
            Agrega al menos una imagen (sube un archivo o pega una URL).
          </p>
        )}

        <input type="hidden" name="images" value={images.join(",")} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium mb-1">
            Calificación (0-5)
          </label>
          <input
            id="rating"
            type="number"
            name="rating"
            defaultValue={product?.rating ?? 5}
            min={0}
            max={5}
            step={0.1}
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="reviews" className="block text-sm font-medium mb-1">
            Reseñas
          </label>
          <input
            id="reviews"
            type="number"
            name="reviews"
            defaultValue={product?.reviews ?? 0}
            min={0}
            className="petal-input"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="customizable"
            defaultChecked={product?.customizable ?? true}
          />
          Personalizable
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} />
          Destacado
        </label>
      </div>

      <button type="submit" disabled={pending} className="petal-btn petal-btn-primary">
        {pending ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
