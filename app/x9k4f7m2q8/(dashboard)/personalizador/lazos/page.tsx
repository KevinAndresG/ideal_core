import { getAllCustomizerRibbons } from "@/lib/server/customizer-ribbons";
import { PersonalizadorTabs } from "../../../_components/PersonalizadorTabs";
import { CustomizerRibbonsTable } from "../../../_components/CustomizerRibbonsTable";

export const dynamic = "force-dynamic";

export default async function PersonalizadorLazosPage() {
  const ribbons = await getAllCustomizerRibbons();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient">Personalizador</h1>
        <p className="text-sm text-[var(--color-ink-soft)]">
          Bases, ítems y lazos para el personalizador de anchetas
        </p>
      </div>

      <PersonalizadorTabs active="lazos" />

      <CustomizerRibbonsTable ribbons={ribbons} />
    </div>
  );
}
