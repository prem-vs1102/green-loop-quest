import { PageLayout } from "@/components/PageLayout";
import { Calendar } from "lucide-react";

const posts = [
  {
    title: "Mumbai's hidden e-waste crisis — and how residents can help",
    date: "May 2, 2026",
    excerpt: "An inside look at where your old electronics actually end up, and the network of informal scrap dealers handling 80% of the city's e-waste.",
  },
  {
    title: "How AI changed the way we verify recycling",
    date: "April 18, 2026",
    excerpt: "From pixel detection to model recognition — the tech behind every pickup on EcoTrack.",
  },
  {
    title: "Top 10 devices Indians replace too often",
    date: "March 30, 2026",
    excerpt: "Smartphones aren't even number one. Here's what's really filling our landfills.",
  },
  {
    title: "The economics of eco-credits",
    date: "March 12, 2026",
    excerpt: "How we calculate the value of your e-waste — and why it varies by device type.",
  },
];

const BlogPage = () => (
  <PageLayout
    eyebrow="Insights"
    title="Blog"
    subtitle="Stories, data and ideas from the frontline of India's circular economy."
  >
    <div className="space-y-6">
      {posts.map((p) => (
        <article
          key={p.title}
          className="reveal-on-scroll bg-card border border-border rounded-2xl p-6 hover-lift cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{p.date}</span>
          </div>
          <h2 className="text-xl font-bold mb-2">{p.title}</h2>
          <p className="text-muted-foreground">{p.excerpt}</p>
        </article>
      ))}
    </div>
  </PageLayout>
);

export default BlogPage;
