import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { PageShell } from "@/components/page-shell";
import { Services } from "@/components/services";
import { Team } from "@/components/team";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Marquee />
      <Services />
      <Team />
      <Contact />
    </PageShell>
  );
}
