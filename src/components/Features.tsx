import { Upload, MapPin, Coins, BarChart3, Shield, Zap } from "lucide-react";
import uploadIcon from "@/assets/upload-icon.png";
import pickupIcon from "@/assets/pickup-icon.png";
import rewardIcon from "@/assets/reward-icon.png";

export const Features = () => {
  const features = [
    {
      icon: Upload,
      image: uploadIcon,
      title: "Easy Upload",
      description: "Snap a photo of your e-waste and upload instantly. AI automatically categorizes your items.",
    },
    {
      icon: MapPin,
      image: pickupIcon,
      title: "Schedule Pickup",
      description: "Choose a convenient time and location. Track your collector in real-time on the map.",
    },
    {
      icon: Coins,
      image: rewardIcon,
      title: "Earn Rewards",
      description: "Get eco-credits for every item recycled. Redeem for cash, vouchers, or plant trees.",
    },
    {
      icon: BarChart3,
      title: "Track Impact",
      description: "View your environmental impact dashboard. See CO₂ saved and materials recovered.",
    },
    {
      icon: Shield,
      title: "Blockchain Verified",
      description: "Every transaction is logged on blockchain for complete transparency and traceability.",
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Get verified and rewarded within 24 hours. Fast, reliable, and hassle-free.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-gradient"> Recycle Smart</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform makes e-waste recycling simple, rewarding, and impactful
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-[var(--shadow-eco-lg)] transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 relative">
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-20 h-20 object-contain animate-float"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
