import { useEffect, useRef, useState, useCallback } from "react";
import { Building2, Users, MapPin, Star } from "lucide-react";
import PageContainer from "./PageContainer";

type StatItem = {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
};

const STATS: StatItem[] = [
  {
    icon: Building2,
    value: 2500,
    suffix: "+",
    label: "Hotels Available",
    color: "text-blue-400",
  },
  {
    icon: Users,
    value: 150000,
    suffix: "+",
    label: "Happy Guests",
    color: "text-emerald-400",
  },
  {
    icon: MapPin,
    value: 120,
    suffix: "+",
    label: "Cities Worldwide",
    color: "text-amber-400",
  },
  {
    icon: Star,
    value: 48000,
    suffix: "+",
    label: "5-Star Reviews",
    color: "text-rose-400",
  },
];

/** Eased count-up for a single number */
function useCountUp(target: number, duration: number, start: boolean): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return current;
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return n.toLocaleString();
}

const SingleStat = ({
  stat,
  started,
}: {
  stat: StatItem;
  started: boolean;
}) => {
  const count = useCountUp(stat.value, 2000, started);
  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center gap-3 text-center group">
      <div className="rounded-2xl bg-white/10 p-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/15">
        <Icon className={`h-8 w-8 ${stat.color}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white md:text-4xl tabular-nums">
          {formatNumber(count)}
          <span className="text-white/70">{stat.suffix}</span>
        </p>
        <p className="mt-1 text-sm text-white/70 font-medium">{stat.label}</p>
      </div>
    </div>
  );
};

const StatsCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting && !started) setStarted(true);
    },
    [started],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(onIntersect, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onIntersect]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900"
    >
      {/* Decorative dots */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-white/[0.03] bg-[size:40px_40px]"
        aria-hidden
      />

      <PageContainer className="relative py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <SingleStat key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default StatsCounter;
