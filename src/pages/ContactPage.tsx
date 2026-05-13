import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message sent", description: "We'll respond within 1 business day." });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <PageLayout
      eyebrow="Get in touch"
      title="Contact Us"
      subtitle="Questions, partnerships, or media — we'd love to hear from you."
    >
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: Mail, label: "Email", value: "hello@ecotrack.in" },
          { icon: Phone, label: "Phone", value: "+91 22 4040 1234" },
          { icon: MapPin, label: "Office", value: "Andheri East, Mumbai 400069" },
        ].map((c) => (
          <div key={c.label} className="reveal-on-scroll bg-card border border-border rounded-xl p-6 text-center hover-lift">
            <c.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">{c.label}</div>
            <div className="font-semibold mt-1">{c.value}</div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="reveal-on-scroll bg-card border border-border rounded-2xl p-8 space-y-5 max-w-2xl mx-auto">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" required />
        </div>
        <div>
          <Label htmlFor="msg">Message</Label>
          <Textarea id="msg" rows={5} required />
        </div>
        <Button type="submit" variant="hero" className="w-full click-pop" disabled={submitting}>
          {submitting ? "Sending…" : "Send Message"}
        </Button>
      </form>
    </PageLayout>
  );
};

export default ContactPage;
