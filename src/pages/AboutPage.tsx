import { PageLayout } from "@/components/PageLayout";

const AboutPage = () => (
  <PageLayout
    eyebrow="Our Story"
    title="About EcoTrack"
    subtitle="A Mumbai-born platform building India's most accessible e-waste recycling network."
  >
    <div className="space-y-8 text-foreground/85 leading-relaxed">
      <div className="reveal-on-scroll bg-card border border-border rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-3">Why we exist</h2>
        <p>
          Mumbai produces over 120,000 tonnes of e-waste each year — most of it ends up in informal
          scrap yards or landfills. We built EcoTrack so any resident can responsibly dispose of an
          old phone, AC, fridge or laptop in under a minute, and get paid for it.
        </p>
      </div>
      <div className="reveal-on-scroll bg-card border border-border rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-3">Our mission</h2>
        <p>
          Make responsible e-waste disposal the default option for every Indian household by 2030 —
          starting with Mumbai, expanding to Pune, Delhi and Bengaluru next.
        </p>
      </div>
      <div className="reveal-on-scroll bg-card border border-border rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-3">How we work</h2>
        <p>
          We partner only with CPCB-authorised recyclers, verify every pickup with AI, and publish
          quarterly impact reports so our community can see exactly where their devices end up.
        </p>
      </div>
    </div>
  </PageLayout>
);

export default AboutPage;
