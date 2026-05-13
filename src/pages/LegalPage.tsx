import { PageLayout } from "@/components/PageLayout";
import { ReactNode } from "react";

interface Section {
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  subtitle: string;
  sections: Section[];
}

export const LegalPage = ({ title, subtitle, sections }: LegalPageProps) => (
  <PageLayout eyebrow="Legal" title={title} subtitle={subtitle}>
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">Last updated: May 13, 2026</p>
      {sections.map((s) => (
        <section key={s.heading} className="reveal-on-scroll bg-card border border-border rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-3">{s.heading}</h2>
          <div className="text-foreground/85 leading-relaxed space-y-3">{s.body}</div>
        </section>
      ))}
    </div>
  </PageLayout>
);

export const PrivacyPage = () => (
  <LegalPage
    title="Privacy Policy"
    subtitle="What data we collect, why we collect it, and how we keep it safe."
    sections={[
      { heading: "Information we collect", body: <p>Account details (name, email, phone), pickup addresses, e-waste photos, and order history. We never sell personal data.</p> },
      { heading: "How we use it", body: <p>To schedule pickups, validate items via AI, calculate eco-credits, and improve service quality.</p> },
      { heading: "Data security", body: <p>All data is encrypted in transit and at rest, protected by row-level security so only you can access your records.</p> },
      { heading: "Your rights", body: <p>You can export or delete your data at any time from your dashboard, or by emailing privacy@ecotrack.in.</p> },
    ]}
  />
);

export const TermsPage = () => (
  <LegalPage
    title="Terms of Service"
    subtitle="The rules that keep EcoTrack safe and fair for everyone."
    sections={[
      { heading: "Eligibility", body: <p>You must be 18+ and a resident of a serviceable Mumbai pincode to schedule pickups.</p> },
      { heading: "Acceptable use", body: <p>Only genuine e-waste may be uploaded. Fraudulent uploads (non-e-waste, duplicates) result in account suspension and credit forfeiture.</p> },
      { heading: "Eco-credits", body: <p>Credits are awarded after recycler verification. Credit values may change with market rates.</p> },
      { heading: "Liability", body: <p>EcoTrack is not liable for personal data left on devices — please factory-reset before pickup.</p> },
    ]}
  />
);

export const CookiePage = () => (
  <LegalPage
    title="Cookie Policy"
    subtitle="How and why we use cookies on EcoTrack."
    sections={[
      { heading: "Essential cookies", body: <p>Required for sign-in, session persistence and security (reCAPTCHA).</p> },
      { heading: "Analytics cookies", body: <p>Anonymous usage stats so we can improve the experience. You can opt out in your browser.</p> },
      { heading: "No advertising cookies", body: <p>We do not use third-party ad trackers.</p> },
    ]}
  />
);

export const RefundPage = () => (
  <LegalPage
    title="Refund Policy"
    subtitle="How refunds and cancellations work for EcoTrack services."
    sections={[
      { heading: "Free pickups", body: <p>Resident pickups are free — there is nothing to refund.</p> },
      { heading: "Resident Plus subscription", body: <p>Cancel anytime. Pro-rated refund for the unused portion of the current month.</p> },
      { heading: "Business plans", body: <p>Refer to your signed agreement; standard terms include 14-day money-back guarantee for first-time customers.</p> },
      { heading: "Eco-credit redemptions", body: <p>UPI and voucher redemptions are final once processed. Failed transactions are auto-reversed within 7 days.</p> },
    ]}
  />
);
