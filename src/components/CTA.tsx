import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">
                Special Launch Offer
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of eco-warriors turning e-waste into rewards. 
              Start your recycling journey today and earn credits instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button
                  variant="hero"
                  size="lg"
                  className="group bg-white text-primary hover:bg-white/95 shadow-eco-lg font-semibold"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary font-semibold backdrop-blur-sm"
              >
                Contact Sales
              </Button>
            </div>

            <p className="text-sm text-white/70 mt-6">
              No credit card required • 100% free to start • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
