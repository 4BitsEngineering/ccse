import { SiteHeader } from "@/components/ui/site-header";
import { ProgresoSyncer } from "@/components/progreso/ProgresoSyncer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <ProgresoSyncer />
      {children}
    </>
  );
}
