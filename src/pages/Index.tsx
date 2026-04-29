import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Impact } from "@/components/Impact";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Index = () => {
  const navigate = useNavigate();
  useScrollReveal();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <div className="reveal-on-scroll"><Features /></div>
      <div className="reveal-on-scroll"><HowItWorks /></div>
      <div className="reveal-on-scroll"><Impact /></div>
      <div className="reveal-on-scroll"><CTA /></div>
      <Footer />
    </div>
  );
};

export default Index;
