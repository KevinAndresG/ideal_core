import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSlider } from "@/components/layout/CartSlider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "CORE — Regalos Personalizados con Amor",
  description: "Anchetas, flores preservadas, velas artesanales y decoraciones únicas hechas a mano. Personaliza cada detalle y regala algo CORE.",
  keywords: ["regalos", "anchetas", "personalizado", "artesanal", "flores", "velas", "manualidades"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('core-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <CartSlider />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--surface)",
              border: "2px solid var(--nav-border)",
              borderRadius: "16px",
              fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
              color: "var(--color-charcoal)",
            },
          }}
        />
      </body>
    </html>
  );
}
