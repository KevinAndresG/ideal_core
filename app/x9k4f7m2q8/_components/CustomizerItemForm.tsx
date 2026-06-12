"use client";

import { useActionState } from "react";
import type { CustomizerItem } from "@/lib/data/customizer-items";
import type { CustomizerItemFormState } from "@/lib/actions/customizer-actions";

type CustomizerItemAction = (
  prevState: CustomizerItemFormState,
  formData: FormData
) => Promise<CustomizerItemFormState>;

export function CustomizerItemForm({
  action,
  item,
  submitLabel,
}: {
  action: CustomizerItemAction;
  item?: CustomizerItem;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-5 max-w-xl">
      {state?.error && (
        <p className="petal-card petal-card-peach px-4 py-3 text-sm">{state.error}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="id" className="block text-sm font-medium mb-1">
            Identificador (slug)
          </label>
          <input
            id="id"
            type="text"
            name="id"
            defaultValue={item?.id}
            required
            placeholder="choco-belga"
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="emoji" className="block text-sm font-medium mb-1">
            Emoji
          </label>
          <input
            id="emoji"
            type="text"
            name="emoji"
            defaultValue={item?.emoji}
            required
            placeholder="🍫"
            className="petal-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={item?.name}
          required
          placeholder="Chocolates Belgas"
          className="petal-input"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Categoría
          </label>
          <input
            id="category"
            type="text"
            name="category"
            defaultValue={item?.category}
            required
            placeholder="Dulces"
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Precio
          </label>
          <input
            id="price"
            type="number"
            name="price"
            defaultValue={item?.price}
            required
            min={0}
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="positionHint" className="block text-sm font-medium mb-1">
            Posición
          </label>
          <select
            id="positionHint"
            name="positionHint"
            defaultValue={item?.positionHint ?? "middle"}
            className="petal-input"
          >
            <option value="top">Arriba</option>
            <option value="middle">Centro</option>
            <option value="bottom">Abajo</option>
            <option value="side">Lateral</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={pending} className="petal-btn petal-btn-primary">
        {pending ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
