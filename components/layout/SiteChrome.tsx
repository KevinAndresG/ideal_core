"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { CartSlider } from "@/components/layout/CartSlider";
import { Footer } from "@/components/layout/Footer";
import { ADMIN_BASE_PATH } from "@/lib/admin-config";

const toastOptions = {
  style: {
    background: "var(--surface-solid)",
    border: "1.5px solid rgba(196, 181, 253, 0.35)",
    borderRadius: "18px",
    fontFamily: "Inter, system-ui, sans-serif",
    color: "var(--color-ink)",
    boxShadow: "0 8px 32px rgba(139, 92, 246, 0.12)",
  },
} as const;

/**
 * Renders the public site chrome (Navbar, cart slider, footer) everywhere
 * except under the admin panel, which has its own layout.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith(ADMIN_BASE_PATH) ?? false;

  if (isAdmin) {
    return (
      <>
        {children}
        <Toaster position="bottom-right" toastOptions={toastOptions} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <CartSlider />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster position="bottom-right" toastOptions={toastOptions} />
    </>
  );
}
