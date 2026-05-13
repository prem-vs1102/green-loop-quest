import { PageLayout } from "@/components/PageLayout";
import { Wallet, Gift, TreePine, Smartphone } from "lucide-react";

const redemptions = [
  { icon: Smartphone, title: "UPI Cashback", desc: "Direct transfer to any UPI ID. Min 500 credits." },
  { icon: Gift, title: "Brand Vouchers", desc: "Amazon, Flipkart, BigBasket, Zomato and more." },
  { icon: TreePine, title: "Plant a Tree", desc: "Donate credits to verified Mumbai reforestation drives." },
];

const EcoWalletPage = () => (
  <PageLayout
    eyebrow="Rewards"
    title="Eco-Wallet"
    subtitle="Every kilo of e-waste you recycle becomes credits in your Eco-Wallet — spend them how you choose."
  >
    <div className="reveal-on-scroll bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-8 mb-12 flex items-center gap-6">
      <Wallet className="w-12 h-12 text-primary flex-shrink-0" />
      <div>
        <h2 className="text-2xl font-bold">1 credit = ₹1</h2>
        <p className="text-muted-foreground mt-1">
          No expiry. No fees. No fine print.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {redemptions.map((r) => (
        <div key={r.title} className="reveal-on-scroll bg-card border border-border rounded-2xl p-6 hover-lift">
          <r.icon className="w-8 h-8 text-primary mb-3" />
          <h3 className="font-bold text-lg">{r.title}</h3>
          <p className="text-sm text-muted-foreground mt-2">{r.desc}</p>
        </div>
      ))}
    </div>
  </PageLayout>
);

export default EcoWalletPage;
