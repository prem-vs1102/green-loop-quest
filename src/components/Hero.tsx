import { Button } from "@/components/ui/button";
import { ArrowRight, Recycle, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-primary/60 to-black/75" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-lg">
            <Recycle className="w-4 h-4 text-accent" />
            <span className="text-sm text-white font-semibold tracking-wide">
              Join 10,000+ Eco Warriors
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-shadow-hero">
            <span className="text-[hsl(48,90%,88%)]">Turn Your E-Waste Into</span>
            <span className="block mt-3 bg-gradient-to-r from-[hsl(84,90%,70%)] via-[hsl(60,95%,75%)] to-[hsl(142,80%,70%)] bg-clip-text text-transparent">
              Eco Credits
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto font-medium text-shadow-hero">
            Schedule pickups, track your impact, and earn rewards for recycling electronics responsibly.
            Together, we're building a circular economy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 click-pop hover-lift">
                Start Recycling
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary click-pop"
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
                className="backdrop-blur-md bg-white/95 dark:bg-card p-6 rounded-2xl border border-white/30 shadow-eco"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
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
