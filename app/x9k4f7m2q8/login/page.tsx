"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth-actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <div className="min-h-screen flex items-center justify-center px-4 aurora-band">
      <div className="petal-card petal-card-violet w-full max-w-sm p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="font-serif text-2xl text-gradient">Panel de administración</h1>
          <p className="text-sm text-[var(--color-ink-soft)]">Acceso restringido</p>
        </div>

        <form action={formAction} className="space-y-4">
          {state?.error && (
            <p className="petal-card petal-card-peach px-4 py-3 text-sm text-center">
              {state.error}
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="username"
              className="petal-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="petal-input"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="petal-btn petal-btn-primary w-full"
          >
            {pending ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
