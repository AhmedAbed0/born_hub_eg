import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 400;

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 rounded-full bg-primary-600 p-3 text-white shadow-large transition-all duration-300 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-1 active:scale-95 ${
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
