"use client";

import { useActionState } from "react";
import type { CustomizerBase } from "@/lib/data/customizer-items";
import type { CustomizerBaseFormState } from "@/lib/actions/customizer-actions";

type CustomizerBaseAction = (
  prevState: CustomizerBaseFormState,
  formData: FormData
) => Promise<CustomizerBaseFormState>;

export function CustomizerBaseForm({
  action,
  base,
  submitLabel,
}: {
  action: CustomizerBaseAction;
  base?: CustomizerBase;
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
            defaultValue={base?.id}
            required
            placeholder="caja-kraft"
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
            defaultValue={base?.emoji}
            required
            placeholder="📦"
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
          defaultValue={base?.name}
          required
          placeholder="Caja Kraft"
          className="petal-input"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Descripción
        </label>
        <input
          id="description"
          type="text"
          name="description"
          defaultValue={base?.description}
          required
          placeholder="Caja de cartón kraft con acabado natural"
          className="petal-input"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="basePrice" className="block text-sm font-medium mb-1">
            Precio base
          </label>
          <input
            id="basePrice"
            type="number"
            name="basePrice"
            defaultValue={base?.basePrice}
            required
            min={0}
            className="petal-input"
          />
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium mb-1">
            Color
          </label>
          <div className="flex items-center gap-2">
            <input
              id="color"
              type="color"
              name="color"
              defaultValue={base?.color ?? "#D4A373"}
              className="h-10 w-14 rounded-lg border border-[var(--surface-border)] cursor-pointer"
            />
            <span className="text-xs text-[var(--color-ink-soft)]">
              Color asociado a esta base
            </span>
          </div>
        </div>
      </div>

      <button type="submit" disabled={pending} className="petal-btn petal-btn-primary">
        {pending ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
