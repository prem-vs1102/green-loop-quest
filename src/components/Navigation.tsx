import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/impact", label: "Impact" },
    { to: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 click-pop">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">EcoTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-foreground/80 hover:text-primary transition-colors story-link"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/auth">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-up">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/auth" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">Login</Button>
              </Link>
              <Link to="/auth" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Button variant="hero" size="sm" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
