import { Camera, Calendar, Truck, Gift } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "Upload E-Waste",
      description: "Take a photo of your electronics and upload. Our AI identifies and categorizes automatically.",
    },
    {
      icon: Calendar,
      title: "Schedule Pickup",
      description: "Choose your preferred date and time. We'll send a verified collector to your location.",
    },
    {
      icon: Truck,
      title: "Safe Collection",
      description: "Track the collector in real-time. Your e-waste is transported to certified recycling centers.",
    },
    {
      icon: Gift,
      title: "Get Rewarded",
      description: "Earn eco-credits instantly. Redeem for rewards, cashback, or contribute to green initiatives.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to make a real environmental impact
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-20 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-[var(--shadow-eco-lg)] z-10">
                  {index + 1}
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-[var(--shadow-eco-lg)] transition-all duration-300 hover:scale-105">
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
