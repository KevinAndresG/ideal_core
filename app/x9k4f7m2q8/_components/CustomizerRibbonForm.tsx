"use client";

import { useActionState } from "react";
import type { RibbonColor } from "@/lib/data/customizer-items";
import type { CustomizerRibbonFormState } from "@/lib/actions/customizer-actions";

type CustomizerRibbonAction = (
  prevState: CustomizerRibbonFormState,
  formData: FormData
) => Promise<CustomizerRibbonFormState>;

export function CustomizerRibbonForm({
  action,
  ribbon,
  submitLabel,
}: {
  action: CustomizerRibbonAction;
  ribbon?: RibbonColor;
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
            defaultValue={ribbon?.id}
            required
            placeholder="dorado"
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={ribbon?.name}
            required
            placeholder="Dorado"
            className="petal-input"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Color
          </label>
          <div className="flex items-center gap-2">
            <input
              id="color"
              type="color"
              name="color"
              defaultValue={ribbon?.color ?? "#D4AF37"}
              className="h-10 w-14 rounded-lg border border-[var(--surface-border)] cursor-pointer"
            />
            <span className="text-xs text-[var(--color-ink-soft)]">Color del lazo</span>
          </div>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Precio adicional
          </label>
          <input
            id="price"
            type="number"
            name="price"
            defaultValue={ribbon?.price ?? 0}
            required
            min={0}
            className="petal-input"
          />
          <p className="text-xs text-[var(--color-ink-soft)] mt-1">0 = incluido sin costo extra</p>
        </div>
      </div>

      <button type="submit" disabled={pending} className="petal-btn petal-btn-primary">
        {pending ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
