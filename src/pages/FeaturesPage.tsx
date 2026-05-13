import { PageLayout } from "@/components/PageLayout";
import { Features } from "@/components/Features";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const deepDive = [
  {
    title: "AI-Powered Item Recognition",
    points: [
      "Snap a single photo — Gemini Vision identifies brand, model & condition",
      "Auto-categorizes across 15+ device types (AC, TV, fridge, laptop, smartwatch & more)",
      "Estimates fair-market eco-credit value before you confirm",
    ],
  },
  {
    title: "Mumbai-Wide Pickup Network",
    points: [
      "Verified recyclers across Andheri, Bandra, Powai, Thane, Navi Mumbai & more",
      "Pick from morning, afternoon or evening time slots",
      "Live order tracking from scheduled → in transit → completed",
    ],
  },
  {
    title: "Transparent Eco-Credits",
    points: [
      "Earn instantly when pickup is verified",
      "Redeem for UPI cashback, Amazon vouchers, or donate to plant trees",
      "Every transaction logged for full traceability",
    ],
  },
];

const FeaturesPage = () => (
  <PageLayout
    eyebrow="Platform"
    title="Features"
    subtitle="Everything you need to recycle e-waste responsibly in Mumbai — backed by AI, verified recyclers and real rewards."
  >
    <div className="reveal-on-scroll -mt-12">
      <Features />
    </div>

    <div className="mt-16 space-y-10">
      {deepDive.map((s) => (
        <div
          key={s.title}
          className="reveal-on-scroll bg-card border border-border rounded-2xl p-8 hover-lift"
        >
          <h2 className="text-2xl font-bold mb-4">{s.title}</h2>
          <ul className="space-y-3">
            {s.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground/85">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="mt-16 text-center reveal-on-scroll">
      <Link to="/auth">
        <Button variant="hero" size="lg" className="click-pop hover-lift">
          Try It Free <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  </PageLayout>
);

export default FeaturesPage;
