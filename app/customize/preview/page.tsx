import { getCustomizerConfig } from "@/lib/server/customizer-config";
import { CustomizerView } from "@/components/customizer/CustomizerView";

// Vista previa del personalizador en vivo, ya conectada a Supabase
// (customizer_bases, customizer_items, customizer_ribbons).
//
// No está enlazada desde ningún lugar del sitio: /customize sigue
// mostrando el aviso "Próximamente". Cuando se quiera activar esta
// función, mueve este archivo a app/customize/page.tsx (reemplazando
// el aviso "Próximamente") y, si se desea, actualiza el badge/link en
// components/home/CustomizerTeaser.tsx.
export const dynamic = "force-dynamic";

export default async function CustomizePreviewPage() {
  const config = await getCustomizerConfig();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="aurora-band relative pt-32 pb-12 px-4 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-bloom font-semibold text-sm tracking-widest uppercase mb-4 block">
            Personalizador
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ink mb-4">
            Crea tu <span className="italic text-gradient">ancheta única</span>
          </h1>
          <p className="text-ink/55 text-lg leading-relaxed max-w-2xl mx-auto">
            Elige la base, agrega tus items favoritos, escribe un mensaje y
            selecciona el lazo. Tú decides cada detalle de tu regalo.
          </p>
        </div>
      </div>

      {/* Customizer */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <CustomizerView config={config} />
      </section>
    </div>
  );
}
