import { PageLayout } from "@/components/PageLayout";
import { Impact } from "@/components/Impact";
import { Trees, Droplets, Zap, Globe2 } from "lucide-react";

const breakdown = [
  { icon: Trees, label: "Trees equivalent saved", value: "62,400" },
  { icon: Droplets, label: "Litres of water conserved", value: "3.1M" },
  { icon: Zap, label: "kWh of energy recovered", value: "8.7M" },
  { icon: Globe2, label: "Mumbai neighbourhoods served", value: "120+" },
];

const ImpactPage = () => (
  <PageLayout
    eyebrow="Together we recycle"
    title="Our Impact"
    subtitle="Real numbers from a growing community of Mumbai recyclers turning waste into a circular economy."
  >
    <div className="reveal-on-scroll -mt-12">
      <Impact />
    </div>

    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
      {breakdown.map((b) => (
        <div
          key={b.label}
          className="reveal-on-scroll bg-card border border-border rounded-2xl p-6 text-center hover-lift"
        >
          <b.icon className="w-8 h-8 text-primary mx-auto mb-3" />
          <div className="text-2xl font-bold text-gradient">{b.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{b.label}</div>
        </div>
      ))}
    </div>

    <div className="mt-16 reveal-on-scroll bg-card border border-border rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-4">Why it matters</h2>
      <p className="text-muted-foreground leading-relaxed">
        India generates over 1.6 million tonnes of e-waste annually, with Mumbai contributing one of
        the largest shares. Less than 25% is processed responsibly. Every device collected through
        EcoTrack avoids landfill, recovers valuable metals like copper and gold, and keeps toxic
        compounds out of soil and groundwater.
      </p>
    </div>
  </PageLayout>
);

export default ImpactPage;
