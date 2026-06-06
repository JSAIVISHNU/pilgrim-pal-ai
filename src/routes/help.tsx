import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, BookOpen, Phone, Mail, AlertCircle, ChevronRight, LogOut } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { useState } from "react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — Hajj Guide AI" },
      { name: "description", content: "Get help and support for using Hajj Guide AI." },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const [messageSent, setMessageSent] = useState(false);

  const faqs = [
    {
      question: "How accurate is the translation?",
      answer: "Our translations are powered by MyMemory API which uses statistical machine translation. For critical information, we recommend consulting with official guides or staff.",
    },
    {
      question: "How does the scan feature work?",
      answer: "The scan feature uses OCR (Optical Character Recognition) to extract text from images of signs, documents, and other printed materials. Take a clear photo for best results.",
    },
    {
      question: "Does it work offline?",
      answer: "Some features like OCR can work offline after the initial download. However, translation requires an internet connection.",
    },
    {
      question: "Can I save translations?",
      answer: "Coming soon! We're working on a favorites feature to save and revisit your translations.",
    },
    {
      question: "Which languages are supported?",
      answer: "We support 25+ languages including Arabic, English, Spanish, French, German, Chinese, Japanese, Hindi, Urdu, Persian, Turkish, and many more.",
    },
    {
      question: "How do I report a problem?",
      answer: "Use the contact form below or email us at support@hajjguideai.com. We'll respond within 24 hours.",
    },
  ];

  const tutorialTopics = [
    {
      title: "Getting Started",
      description: "Learn the basics of Hajj Guide AI",
      icon: "🚀",
    },
    {
      title: "Using Text Translation",
      description: "Translate text between languages instantly",
      icon: "📝",
    },
    {
      title: "Scanning Signs",
      description: "Take photos of signs and get instant translations",
      icon: "📸",
    },
    {
      title: "Voice Commands",
      description: "Use your voice to translate and interact",
      icon: "🎤",
    },
    {
      title: "Saving Favorites",
      description: "Bookmark important translations",
      icon: "⭐",
    },
    {
      title: "Offline Mode",
      description: "Use the app without internet",
      icon: "📡",
    },
  ];

  return (
    <MobileShell title="Help & Support">
      <div className="space-y-4 p-4 pb-24">
        {/* Quick Support */}
        <div className="rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-elegant">
          <h2 className="font-semibold mb-3">Quick Support</h2>
          <div className="space-y-2">
            <button 
              onClick={() => alert("Opening chat support...")}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium text-sm">Chat with Us</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => window.location.href = "mailto:support@hajjguideai.com"}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span className="font-medium text-sm">Email Support</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-2xl bg-card p-4 shadow-card">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-3 flex items-center justify-between bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <span className="text-sm font-medium text-foreground text-left">{faq.question}</span>
                  <span
                    className={`flex-shrink-0 transform transition-transform ${
                      expandedFaq === index ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="p-3 bg-secondary/30 text-sm text-muted-foreground border-t border-border">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tutorials */}
        <div className="rounded-2xl bg-card p-4 shadow-card">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Tutorials
          </h2>
          <div className="space-y-2">
            {tutorialTopics.map((tutorial, index) => (
              <button
                key={index}
                className="w-full p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{tutorial.icon}</span>
                  <div>
                    <p className="font-medium text-sm text-foreground">{tutorial.title}</p>
                    <p className="text-xs text-muted-foreground">{tutorial.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl bg-card p-4 shadow-card space-y-3">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Contact Us</h2>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Subject</label>
            <input
              type="text"
              placeholder="How can we help?"
              value={contactForm.subject}
              onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              className="w-full rounded-lg bg-secondary px-3 py-2.5 text-sm text-secondary-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Message</label>
            <textarea
              placeholder="Tell us what's on your mind..."
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full rounded-lg bg-secondary px-3 py-2.5 text-sm text-secondary-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>

          <button 
            onClick={() => {
              if (contactForm.subject && contactForm.message) {
                setMessageSent(true);
                setContactForm({ subject: "", message: "" });
                setTimeout(() => setMessageSent(false), 3000);
              } else {
                alert("Please fill in all fields");
              }
            }}
            className="w-full rounded-lg bg-gradient-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity active:scale-[0.98]"
          >
            {messageSent ? "✓ Message Sent" : "Send Message"}
          </button>
        </div>

        {/* Emergency Contact */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-amber-900">Emergency?</p>
            <p className="text-amber-800 text-xs mt-1">
              For medical emergencies, call your nearest hospital directly or contact local authorities.
            </p>
          </div>
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
