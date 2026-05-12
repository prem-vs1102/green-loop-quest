import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl">
          {/* Dark themed background using new palette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #2E0014 0%, #442220 55%, #1a0a14 100%)",
            }}
          />

          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl animate-float"
              style={{ background: "#809848" }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl animate-float"
              style={{ background: "#B5DEAD", animationDelay: "2s" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            <div
              className="inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(181, 222, 173, 0.12)",
                border: "1px solid rgba(181, 222, 173, 0.35)",
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: "#B5DEAD" }} />
              <span className="text-sm font-medium" style={{ color: "#B5DEAD" }}>
                Special Launch Offer
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#F5F1E8" }}
            >
              Ready to Make a Difference?
            </h2>
            <p
              className="text-xl max-w-2xl mx-auto mb-8"
              style={{ color: "rgba(245, 241, 232, 0.85)" }}
            >
              Join thousands of eco-warriors turning e-waste into rewards.
              Start your recycling journey today and earn credits instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="group font-semibold shadow-lg click-pop hover-lift"
                  style={{
                    backgroundColor: "#B5DEAD",
                    color: "#2E0014",
                  }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold backdrop-blur-sm bg-transparent click-pop"
                style={{
                  borderColor: "#B0CA87",
                  borderWidth: "2px",
                  color: "#B5DEAD",
                }}
              >
                Contact Sales
              </Button>
            </div>

            <p
              className="text-sm mt-6"
              style={{ color: "rgba(181, 222, 173, 0.7)" }}
            >
              No credit card required • 100% free to start • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
