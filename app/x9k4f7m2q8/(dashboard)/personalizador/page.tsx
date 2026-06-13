import { getAllCustomizerItems } from "@/lib/server/customizer-items";
import { PersonalizadorTabs } from "../../_components/PersonalizadorTabs";
import { CustomizerItemsTable } from "../../_components/CustomizerItemsTable";

export const dynamic = "force-dynamic";

export default async function PersonalizadorPage() {
  const items = await getAllCustomizerItems();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl md:text-3xl text-gradient">Personalizador</h1>
        <p className="text-sm text-[var(--color-ink-soft)]">
          Bases, ítems y lazos para el personalizador de anchetas
        </p>
      </div>

      <PersonalizadorTabs active="items" />

      <CustomizerItemsTable items={items} />
    </div>
  );
}
