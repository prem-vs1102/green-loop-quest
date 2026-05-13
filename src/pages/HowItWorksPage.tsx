import { PageLayout } from "@/components/PageLayout";
import { HowItWorks } from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "What devices can I recycle?",
    a: "Phones, laptops, tablets, TVs, ACs, refrigerators, washing machines, microwaves, coolers, speakers, smartwatches, batteries, cables and more.",
  },
  {
    q: "How does the AI verify my upload?",
    a: "We use Google Gemini 2.5 Flash to confirm your photo actually shows e-waste before scheduling pickup — preventing fraud and protecting eco-credit value.",
  },
  {
    q: "When will the recycler arrive?",
    a: "You choose a date and a time slot (morning, afternoon, or evening). You'll see the order status update in real time on your dashboard.",
  },
  {
    q: "When do I receive eco-credits?",
    a: "Credits appear in your wallet immediately after the recycler verifies the item at pickup.",
  },
  {
    q: "Is my data safe?",
    a: "All data is protected with row-level security. Only you can see your orders, profile and credits.",
  },
];

const HowItWorksPage = () => (
  <PageLayout
    eyebrow="Process"
    title="How It Works"
    subtitle="Four simple steps from clutter to credits — most pickups in Mumbai happen within 48 hours."
  >
    <div className="reveal-on-scroll -mt-12">
      <HowItWorks />
    </div>

    <div className="mt-16">
      <h2 className="text-3xl font-bold text-center mb-10 reveal-on-scroll">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div
            key={f.q}
            className="reveal-on-scroll bg-card border border-border rounded-xl p-6 hover-lift"
          >
            <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-16 text-center reveal-on-scroll">
      <Link to="/auth">
        <Button variant="hero" size="lg" className="click-pop hover-lift">
          Schedule My First Pickup <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Link>
    </div>
  </PageLayout>
);

export default HowItWorksPage;
