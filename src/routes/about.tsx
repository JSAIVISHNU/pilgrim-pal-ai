import { createFileRoute } from "@tanstack/react-router";
import { Heart, Users, Zap, Shield, Globe, LogOut } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hajj Guide AI" },
      { name: "description", content: "Learn about Hajj Guide AI and our mission." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const team = [
    { name: "Ahmed Rashid", role: "Founder & CEO", emoji: "👨‍💼" },
    { name: "Fatima Hassan", role: "Lead Developer", emoji: "👩‍💻" },
    { name: "Muhammad Ali", role: "AI & Translation", emoji: "🧠" },
    { name: "Layla Ibrahim", role: "UX Designer", emoji: "🎨" },
  ];

  const features = [
    { title: "AI-Powered Translation", description: "Support for 25+ languages with high accuracy", icon: Globe },
    { title: "Real-time OCR", description: "Scan signs and documents instantly", icon: Zap },
    { title: "Pilgrim-Focused", description: "Built specifically for Hajj & Umrah pilgrims", icon: Heart },
    { title: "Privacy First", description: "Your data is secure and private", icon: Shield },
  ];

  const milestones = [
    { date: "June 2024", event: "App Launch", milestone: "🚀" },
    { date: "August 2024", event: "10K+ Users", milestone: "📈" },
    { date: "October 2024", event: "25 Languages", milestone: "🌍" },
    { date: "December 2024", event: "50K+ Translations", milestone: "✨" },
  ];

  return (
    <MobileShell title="About">
      <div className="space-y-4 p-4 pb-24">
        {/* App Header */}
        <div className="rounded-2xl bg-gradient-primary p-6 text-primary-foreground text-center shadow-elegant">
          <div className="text-5xl mb-3">🕋</div>
          <h1 className="text-2xl font-bold mb-2">Hajj Guide AI</h1>
          <p className="text-sm opacity-90 mb-3">Translation & Guidance for Pilgrims</p>
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="font-semibold">Version 1.0.0</span>
            <span className="opacity-70">•</span>
            <span className="opacity-70">Released June 2024</span>
          </div>
        </div>

        {/* Mission */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            Our Mission
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To empower pilgrims visiting Mecca with instant, accurate translations and guidance, making their spiritual journey smoother and more meaningful.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We believe every pilgrim deserves to understand their surroundings, connect with locals, and focus on their worship without language barriers.
          </p>
        </div>

        {/* Key Features */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Why Choose Us?</h2>
          <div className="space-y-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
                  <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Our Team
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {team.map((member) => (
              <div key={member.name} className="p-3 rounded-lg bg-secondary/50 text-center hover:bg-secondary/70 transition-colors">
                <div className="text-3xl mb-2">{member.emoji}</div>
                <p className="font-semibold text-sm text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Our Journey</h2>
          <div className="space-y-2">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="text-2xl flex-shrink-0">{milestone.milestone}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{milestone.event}</p>
                  <p className="text-xs text-muted-foreground">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Technology</h2>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "TanStack", "OCR", "AI/ML", "MyMemory API"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-2">
          <button className="w-full text-left p-2.5 rounded-lg hover:bg-secondary/50 transition-colors text-sm text-foreground font-medium">
            Privacy Policy
          </button>
          <button className="w-full text-left p-2.5 rounded-lg hover:bg-secondary/50 transition-colors text-sm text-foreground font-medium">
            Terms of Service
          </button>
          <button className="w-full text-left p-2.5 rounded-lg hover:bg-secondary/50 transition-colors text-sm text-foreground font-medium">
            Acknowledgments
          </button>
        </div>

        {/* Contact */}
        <div className="rounded-2xl bg-gradient-primary p-4 text-primary-foreground text-center shadow-elegant">
          <p className="text-sm mb-3">Have questions? We'd love to hear from you!</p>
          <a
            href="mailto:hello@hajjguideai.com"
            className="inline-block rounded-lg bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/30 transition-colors"
          >
            Contact Us
          </a>
        </div>

        <button 
          onClick={() => window.location.href = "/login"}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 font-semibold text-destructive hover:bg-destructive/20 transition-colors active:scale-[0.98]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </MobileShell>
  );
}
