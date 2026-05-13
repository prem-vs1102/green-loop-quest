import { ReactNode, useEffect } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  eyebrow?: string;
}

export const PageLayout = ({ title, subtitle, children, eyebrow }: PageLayoutProps) => {
  useScrollReveal();

  useEffect(() => {
    document.title = `${title} • EcoTrack`;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <header className="pt-32 pb-16 bg-gradient-to-b from-secondary/30 to-background border-b border-border/40">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          {eyebrow && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">{title}</span>
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </header>
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-5xl">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
