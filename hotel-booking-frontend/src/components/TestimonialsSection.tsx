import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";
import PageContainer from "./PageContainer";

type Testimonial = {
  id: number;
  name: string;
  city: string;
  avatar: string;
  rating: number;
  text: string;
  hotelName: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sara Mahmoud",
    city: "Riyadh, Saudi Arabia",
    avatar: "SM",
    rating: 5,
    text: "Stunning experience! The booking process was seamless and the hotel exceeded all expectations. Will definitely use HolidayHotel again for all my trips.",
    hotelName: "Nile Royal Hotel Cairo",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    city: "Cairo, Egypt",
    avatar: "AH",
    rating: 5,
    text: "Best price I found anywhere online. Customer support helped me with a last-minute change with high professionalism and speed.",
    hotelName: "The Palm Dubai Resort",
  },
  {
    id: 3,
    name: "Omar Al-Farooq",
    city: "Dubai, UAE",
    avatar: "OF",
    rating: 5,
    text: "Great selection of hotels across the Middle East. The search filters made it so easy to find the perfect stay for my family.",
    hotelName: "Sharm El Sheikh Beach Resort",
  },
  {
    id: 4,
    name: "Mariam Ali",
    city: "Amman, Jordan",
    avatar: "MA",
    rating: 5,
    text: "I've been using HolidayHotel for 2 years for family and business trips. Exclusive deals and smooth booking keep me coming back!",
    hotelName: "Riyadh Oasis Hotel",
  },
  {
    id: 5,
    name: "Fatima Al-Zahra",
    city: "Casablanca, Morocco",
    avatar: "FZ",
    rating: 5,
    text: "The verified hotels feature gives real peace of mind. Every hotel I've booked was exactly as described and shown in photos.",
    hotelName: "Jeddah Corniche Royal Hotel",
  },
  {
    id: 6,
    name: "Youssef Ibrahim",
    city: "Alexandria, Egypt",
    avatar: "YI",
    rating: 4,
    text: "Free cancellation saved me when my travel plans changed unexpectedly. No hassle, full refund processed immediately!",
    hotelName: "The Pearl Doha Resort",
  },
];

const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const count = TESTIMONIALS.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, count - visibleCount);

  const goNext = useCallback(
    () => setActive((p) => (p >= maxIndex ? 0 : p + 1)),
    [maxIndex],
  );
  const goPrev = useCallback(
    () => setActive((p) => (p <= 0 ? maxIndex : p - 1)),
    [maxIndex],
  );

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 5000);
    return () => clearInterval(intervalRef.current);
  }, [goNext]);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 5000);
  };

  return (
    <section className="bg-white">
      <PageContainer className="py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            What Our Guests Say
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Real feedback from travelers across the Arab world who booked with HolidayHotel
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              goPrev();
              resetTimer();
            }}
            className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2.5 shadow-medium transition-all hover:shadow-large hover:scale-110 hidden md:flex items-center justify-center border border-gray-100"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => {
              goNext();
              resetTimer();
            }}
            className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2.5 shadow-medium transition-all hover:shadow-large hover:scale-110 hidden md:flex items-center justify-center border border-gray-100"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden mx-0 md:mx-8">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${active * (100 / visibleCount + (isMobile ? 0 : 2))}%)`,
              }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.id}
                  className="min-w-full md:min-w-[calc(33.333%-16px)] shrink-0"
                >
                  <div className="group relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-soft transition-all duration-300 hover:shadow-large hover:-translate-y-1">
                    {/* Quote icon */}
                    <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-100 group-hover:text-primary-100 transition-colors" />

                    {/* Stars */}
                    <div className="mb-4 flex gap-0.5">
                      {Array.from({ length: 5 }, (_, si) => (
                        <Star
                          key={si}
                          className={`h-4 w-4 ${si < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="mb-6 text-sm leading-relaxed text-gray-600 italic">
                      "{t.text}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-bold`}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {t.name}
                        </p>
                        <p className="text-xs text-gray-400">{t.city}</p>
                      </div>
                    </div>

                    {/* Hotel tag */}
                    <div className="mt-4 pt-3 border-t border-gray-50">
                      <p className="text-xs text-gray-400">
                        Stayed at{" "}
                        <span className="font-medium text-primary-600">
                          {t.hotelName}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  resetTimer();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-primary-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default TestimonialsSection;
