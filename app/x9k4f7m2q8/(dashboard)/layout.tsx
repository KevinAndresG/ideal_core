import Link from "next/link";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";
import { logout } from "@/lib/actions/auth-actions";
import { AdminNavLink } from "../_components/AdminNavLink";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-[var(--surface-border)] bg-[var(--surface)] p-6 flex flex-col gap-6">
        <div>
          <p className="font-serif text-xl text-gradient">Ideal Core</p>
          <p className="text-xs text-[var(--color-ink-soft)]">Panel de administración</p>
        </div>

        <nav className="flex flex-col gap-1">
          <AdminNavLink href={ADMIN_BASE_PATH} exact>
            Dashboard
          </AdminNavLink>
          <AdminNavLink href={`${ADMIN_BASE_PATH}/productos`}>Productos</AdminNavLink>
          <AdminNavLink href={`${ADMIN_BASE_PATH}/personalizador`}>
            Personalizador
          </AdminNavLink>
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Link href="/" className="text-sm text-[var(--color-ink-soft)] hover:underline">
            ← Volver al sitio
          </Link>
          <form action={logout}>
            <button type="submit" className="petal-btn petal-btn-secondary w-full">
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
