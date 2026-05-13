import { Leaf, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const sections: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", to: "/features" },
        { label: "How It Works", to: "/how-it-works" },
        { label: "Pricing", to: "/pricing" },
        { label: "Eco-Wallet", to: "/eco-wallet" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Blog", to: "/blog" },
        { label: "Careers", to: "/careers" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
        { label: "Cookie Policy", to: "/cookies" },
        { label: "Refund Policy", to: "/refund" },
      ],
    },
  ];

  const socials = [
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { Icon: Github, href: "https://github.com", label: "GitHub" },
    { Icon: Mail, href: "mailto:hello@ecotrack.in", label: "Email" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 click-pop">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">EcoTrack</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn your e-waste into eco-credits. Building a sustainable future, one device at a time.
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h3 className="font-bold mb-4">{s.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {s.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-primary transition-colors story-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 EcoTrack. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
