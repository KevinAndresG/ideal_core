import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de administración",
  description: "Panel privado de administración",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
