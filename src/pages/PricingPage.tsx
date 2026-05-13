import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Resident",
    price: "Free",
    desc: "Perfect for households recycling their own devices.",
    features: [
      "Unlimited pickups",
      "AI item recognition",
      "Eco-credit wallet",
      "UPI cashback redemption",
    ],
    cta: "Get Started",
  },
  {
    name: "Resident Plus",
    price: "₹99/mo",
    desc: "Priority slots and bonus credits for active recyclers.",
    features: [
      "Everything in Resident",
      "Priority pickup slots",
      "1.25× eco-credit multiplier",
      "Quarterly impact report",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Business",
    price: "Custom",
    desc: "For offices, schools and societies with bulk e-waste.",
    features: [
      "Bulk scheduled pickups",
      "Compliance certificates",
      "Multi-user dashboard",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
  },
];

const PricingPage = () => (
  <PageLayout
    eyebrow="Pricing"
    title="Simple, Transparent Pricing"
    subtitle="EcoTrack is free for residents — you're paid for recycling, not the other way around."
  >
    <div className="grid md:grid-cols-3 gap-6 mt-4">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={`reveal-on-scroll rounded-2xl p-8 border hover-lift ${
            t.highlight
              ? "border-primary bg-primary/5 shadow-[var(--shadow-eco-lg)]"
              : "border-border bg-card"
          }`}
        >
          <h3 className="text-xl font-bold">{t.name}</h3>
          <div className="text-4xl font-bold mt-3 text-gradient">{t.price}</div>
          <p className="text-muted-foreground text-sm mt-3 mb-6">{t.desc}</p>
          <ul className="space-y-3 mb-8">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link to={t.name === "Business" ? "/contact" : "/auth"}>
            <Button
              variant={t.highlight ? "hero" : "outline"}
              className="w-full click-pop"
            >
              {t.cta}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  </PageLayout>
);

export default PricingPage;
