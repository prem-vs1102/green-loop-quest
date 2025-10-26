import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Award, TrendingUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="E-waste recycling"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <Recycle className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">
              Join 10,000+ Eco Warriors
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Turn Your E-Waste Into
            <span className="block mt-2">Eco Credits</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Schedule pickups, track your impact, and earn rewards for recycling electronics responsibly.
            Together, we're building a circular economy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="hero" size="lg" className="group bg-white text-primary hover:bg-white/90">
              Start Recycling
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary"
            >
              Watch Demo
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { icon: Recycle, label: "Items Recycled", value: "2.5M+" },
              { icon: Award, label: "Rewards Earned", value: "$1.2M+" },
              { icon: TrendingUp, label: "CO₂ Saved", value: "15K tons" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-effect backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20"
              >
                <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
