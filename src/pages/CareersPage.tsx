import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin } from "lucide-react";

const roles = [
  { title: "Senior Full-Stack Engineer", location: "Mumbai (Hybrid)", type: "Full-time" },
  { title: "Operations Lead — Pickup Network", location: "Mumbai", type: "Full-time" },
  { title: "Product Designer", location: "Remote (India)", type: "Full-time" },
  { title: "Community Manager", location: "Mumbai", type: "Contract" },
];

const CareersPage = () => (
  <PageLayout
    eyebrow="Join us"
    title="Careers"
    subtitle="Help us build the cleanest city in India. We hire kind, curious people who care about the planet."
  >
    <div className="space-y-4">
      {roles.map((r) => (
        <div
          key={r.title}
          className="reveal-on-scroll flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border rounded-xl p-6 hover-lift"
        >
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" /> {r.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> {r.location} • {r.type}
            </p>
          </div>
          <Button variant="outline" className="click-pop">Apply</Button>
        </div>
      ))}
    </div>
  </PageLayout>
);

export default CareersPage;
