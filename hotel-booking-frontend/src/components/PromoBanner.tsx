import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const DISMISSED_KEY = "promo-banner-dismissed";

const PromoBanner = () => {
  const [visible, setVisible] = useState(() => {
    return sessionStorage.getItem(DISMISSED_KEY) !== "1";
  });

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  if (!visible) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white">
      {/* Shimmer overlay */}
      <div
        className="pointer-events-none absolute inset-0 animate-shimmer"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-8xl items-center justify-center gap-3 px-4 py-2.5 text-center text-sm font-medium sm:text-base">
        <Sparkles className="h-4 w-4 shrink-0 animate-bounce-gentle" />
        <span>
          🎉 Summer Sale: Up to <span className="font-bold">30% off</span> on
          selected hotels!
        </span>
        <Link
          to="/search"
          className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold backdrop-blur-sm transition-all hover:bg-white/30"
        >
          Book Now
          <ArrowRight className="h-3 w-3" />
        </Link>

        <button
          onClick={dismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-white/20"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
