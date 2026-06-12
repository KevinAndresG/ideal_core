"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function AdminNavLink({
  href,
  exact = false,
  children,
}: {
  href: string;
  exact?: boolean;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`rounded-2xl px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-[var(--color-violet)] text-white"
          : "text-[var(--color-ink)] hover:bg-[var(--surface-violet)]"
      }`}
    >
      {children}
    </Link>
  );
}
