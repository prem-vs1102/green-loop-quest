import { Leaf, Users, Recycle, Award } from "lucide-react";

export const Impact = () => {
  const stats = [
    {
      icon: Recycle,
      value: "2.5M+",
      label: "Items Recycled",
      color: "from-primary to-accent",
    },
    {
      icon: Users,
      value: "10K+",
      label: "Active Users",
      color: "from-accent to-primary",
    },
    {
      icon: Leaf,
      value: "15K",
      label: "Tons CO₂ Saved",
      color: "from-primary to-accent",
    },
    {
      icon: Award,
      value: "$1.2M",
      label: "Rewards Distributed",
      color: "from-accent to-primary",
    },
  ];

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Together, we're creating measurable change for our planet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-[var(--shadow-eco-lg)] transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12 shadow-[var(--shadow-soft)]">
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
            <div>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-4 italic">
                "EcoTrack made recycling my old electronics so easy! I earned credits, tracked my environmental impact, and felt great knowing my devices were recycled responsibly. Highly recommend!"
              </p>
              <div>
                <div className="font-bold text-primary">Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">Gold Recycler • 45 items recycled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
