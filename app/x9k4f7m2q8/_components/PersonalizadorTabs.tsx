import Link from "next/link";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";

const TABS = [
  { href: `${ADMIN_BASE_PATH}/personalizador`, label: "Ítems" },
  { href: `${ADMIN_BASE_PATH}/personalizador/bases`, label: "Bases" },
  { href: `${ADMIN_BASE_PATH}/personalizador/lazos`, label: "Lazos" },
] as const;

export function PersonalizadorTabs({ active }: { active: "items" | "bases" | "lazos" }) {
  return (
    <div className="flex gap-2 border-b border-[var(--surface-border)]">
      {TABS.map((tab, idx) => {
        const key = idx === 0 ? "items" : idx === 1 ? "bases" : "lazos";
        const isActive = key === active;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              isActive
                ? "border-[var(--color-bloom)] text-[var(--color-bloom)]"
                : "border-transparent text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
