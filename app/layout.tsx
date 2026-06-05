import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { CartSlider } from "@/components/layout/CartSlider";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Ideal Core Regalos Personalizados con Amor",
  description:
    "Regala algo único. Regala algo CORE. Anchetas, flores preservadas, velas artesanales y decoraciones únicas hechas a mano. Personaliza cada detalle y regala algo CORE.",
  keywords: [
    "regalos",
    "anchetas",
    "personalizado",
    "artesanal",
    "flores",
    "velas",
    "manualidades",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script id="core-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('core-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <CartSlider />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--surface-solid)",
              border: "1.5px solid rgba(196, 181, 253, 0.35)",
              borderRadius: "18px",
              fontFamily: "Inter, system-ui, sans-serif",
              color: "var(--color-ink)",
              boxShadow: "0 8px 32px rgba(139, 92, 246, 0.12)",
            },
          }}
        />
      </body>
    </html>
  );
}
