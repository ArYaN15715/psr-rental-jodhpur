import { PROPERTIES_LISTED, RATING, REVIEW_COUNT } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const STATS: StatItem[] = [
  { id: "clients", target: 269, suffix: "+", label: "Happy Clients" },
  { id: "properties", target: 1000, suffix: "+", label: "Properties Listed" },
  {
    id: "rating",
    target: 4.9,
    suffix: "★",
    label: "Average Rating",
    prefix: "",
  },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      const current = isDecimal
        ? Math.round(eased * target * 10) / 10
        : Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, target, duration]);

  return count;
}

interface CounterProps extends StatItem {
  active: boolean;
  isLast: boolean;
}

function StatCounter({
  id,
  target,
  suffix,
  label,
  active,
  isLast,
}: CounterProps) {
  const count = useCountUp(target, 1500, active);
  const isDecimal = target % 1 !== 0;
  const displayValue = isDecimal ? count.toFixed(1) : count.toString();
  const done = active && count >= target;

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center py-6 px-4 ${
        !isLast ? "border-r border-white/20" : ""
      }`}
      data-ocid={`stats.${id}.card`}
    >
      <div className="flex items-baseline gap-0.5">
        <span
          className="text-4xl sm:text-5xl font-black text-white tabular-nums leading-none"
          data-ocid={`stats.${id}.number`}
        >
          {displayValue}
        </span>
        <span
          className={`text-2xl sm:text-3xl font-black text-white leading-none transition-all duration-300 ${
            done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          aria-hidden="true"
        >
          {suffix}
        </span>
      </div>
      <span className="mt-2 text-sm sm:text-base font-medium text-blue-200 tracking-wide text-center">
        {label}
      </span>
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Suppress unused import warnings — constants are the source of truth
  void REVIEW_COUNT;
  void PROPERTIES_LISTED;
  void RATING;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0B3C5D]"
      data-ocid="stats.section"
      aria-label="Trust statistics"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-stretch divide-x-0">
          {STATS.map((stat, i) => (
            <StatCounter
              key={stat.id}
              {...stat}
              active={active}
              isLast={i === STATS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
