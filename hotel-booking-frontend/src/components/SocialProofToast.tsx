import { useEffect, useState, useRef, useCallback } from "react";
import { Building2, X } from "lucide-react";

type ProofEntry = {
  name: string;
  city: string;
  hotel: string;
};

const NAMES = [
  "Ahmed Hassan", "Sara Mahmoud", "Omar Al-Farooq", "Fatima Al-Zahra", "Mariam Ali",
  "Youssef Ibrahim", "Khaled Abdulrahman", "Tariq Saeed", "Mona El-Sherif", "Rania Khaled",
  "Ziad Mustafa", "Kareem Abdullah", "Nour El-Din", "Heba Suleiman", "Mustafa Hussein",
  "Mahmoud El-Awady", "Ali Al-Ghamdi", "Yasmin Al-Qahtani", "Rema Al-Mansoori", "Waleed Al-Zahrani",
];

const CITIES = [
  "Cairo", "Dubai", "Riyadh", "Jeddah", "Alexandria", "Abu Dhabi",
  "Amman", "Doha", "Kuwait City", "Sharm El Sheikh", "Hurghada", "Muscat",
];

const HOTELS = [
  "Nile Royal Hotel Cairo", "The Palm Dubai Resort", "Riyadh Oasis Hotel",
  "Sharm El Sheikh Beach Resort", "Jeddah Corniche Royal Hotel", "Hurghada Sunset Resort",
  "Etihad Towers Hotel Abu Dhabi", "Montaza Palace Hotel Alexandria", "The Pearl Doha Resort",
  "Royal Petra Hotel Amman",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomEntry(): ProofEntry {
  return { name: pick(NAMES), city: pick(CITIES), hotel: pick(HOTELS) };
}

const EXCLUDED_PATHS = ["/hotel/", "/booking", "/admin", "/add-hotel", "/edit-hotel"];

const SocialProofToast = () => {
  const [entry, setEntry] = useState<ProofEntry | null>(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();

  const showNext = useCallback(() => {
    const path = window.location.pathname;
    if (EXCLUDED_PATHS.some((p) => path.includes(p))) return;

    setEntry(randomEntry());
    setVisible(true);

    timeoutRef.current = setTimeout(() => setVisible(false), 4000);
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      showNext();
      intervalRef.current = setInterval(
        showNext,
        10000 + Math.random() * 8000,
      );
    }, 6000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [showNext]);

  const dismiss = () => {
    setVisible(false);
    clearTimeout(timeoutRef.current);
  };

  if (!entry) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 max-w-xs transition-all duration-500 ${
        visible
          ? "translate-x-0 opacity-100"
          : "-translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-large backdrop-blur-sm">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute right-2 top-2 rounded-full p-0.5 text-gray-300 transition-colors hover:text-gray-500"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Icon */}
        <div className="shrink-0 rounded-xl bg-primary-100 p-2.5">
          <Building2 className="h-5 w-5 text-primary-600" />
        </div>

        {/* Content */}
        <div className="pr-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{entry.name}</span> from{" "}
            <span className="font-medium text-gray-600">{entry.city}</span>
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            just booked{" "}
            <span className="font-medium text-primary-600">
              {entry.hotel}
            </span>
          </p>
          <p className="mt-1 text-[10px] text-gray-400">a few seconds ago ⚡</p>
        </div>

        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
      </div>
    </div>
  );
};

export default SocialProofToast;
