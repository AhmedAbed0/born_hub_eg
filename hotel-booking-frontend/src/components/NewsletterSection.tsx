import { useState } from "react";
import { Mail, Send, CheckCircle2, Plane } from "lucide-react";
import PageContainer from "./PageContainer";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
    // Reset after 4s so user can "subscribe" again (demo)
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800">
      {/* Decorative elements */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5 blur-3xl"
        aria-hidden
      />

      <PageContainer className="relative py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Icon */}
          <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <Plane className="h-8 w-8 text-white" />
          </div>

          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Get Exclusive Deals &amp; Travel Inspiration
          </h2>
          <p className="mb-8 text-white/80 max-w-md mx-auto">
            Subscribe to our newsletter and receive special offers, insider
            tips, and destination guides straight to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-emerald-300 animate-fade-in">
              <CheckCircle2 className="h-6 w-6" />
              <span className="text-lg font-medium">
                Thank you! You're subscribed 🎉
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-xl border-0 bg-white pl-11 pr-4 text-sm text-gray-800 shadow-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 font-semibold text-white shadow-medium transition-all hover:bg-amber-400 hover:shadow-large hover:-translate-y-0.5 active:scale-95"
              >
                <Send className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-white/50">
            No spam, unsubscribe anytime. By subscribing you agree to our
            Privacy Policy.
          </p>
        </div>
      </PageContainer>
    </section>
  );
};

export default NewsletterSection;
