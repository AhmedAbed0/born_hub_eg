import {
  ShieldCheck,
  BadgePercent,
  Headset,
  CalendarX2,
} from "lucide-react";
import PageContainer from "./PageContainer";
import { useEffect, useRef, useState, useCallback } from "react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
};

const FEATURES: Feature[] = [
  {
    icon: BadgePercent,
    title: "Best Price Guarantee",
    description:
      "We guarantee the lowest prices. Found a lower price? We'll match it and give you an extra 10% off.",
    gradient: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified Hotels",
    description:
      "Every property is personally verified by our team. Book with confidence knowing quality is assured.",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    description:
      "Our dedicated team is available round the clock. Get help anytime, anywhere in the world.",
    gradient: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  {
    icon: CalendarX2,
    title: "Easy Cancellation",
    description:
      "Plans change — we understand. Enjoy free cancellation on most bookings up to 24 hours before check-in.",
    gradient: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
];

const WhyChooseUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && !visible) setVisible(true);
    },
    [visible],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(onIntersect, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onIntersect]);

  return (
    <section ref={ref} className="bg-gray-50/80">
      <PageContainer className="py-16">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-700 mb-4">
            Why travelers love us
          </span>
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              HolidayHotel
            </span>
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Discover what sets us apart from other booking platforms and why over
            150,000 travelers trust us for their stays.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-soft transition-all duration-500 hover:shadow-large hover:-translate-y-1 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: visible ? `${i * 120}ms` : "0ms",
                }}
              >
                {/* Icon container */}
                <div
                  className={`mb-5 inline-flex rounded-xl bg-gradient-to-br ${feature.gradient} p-3.5 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon
                    className={`h-7 w-7 ${feature.iconColor} transition-transform duration-300 group-hover:-translate-y-0.5`}
                  />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>

                {/* Bottom highlight bar */}
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 group-hover:w-1/2" />
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
};

export default WhyChooseUs;
