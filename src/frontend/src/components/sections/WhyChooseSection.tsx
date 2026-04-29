import { WHY_CHOOSE } from "@/lib/constants";
import type { WhyChooseItem } from "@/types";
import { useEffect, useRef, useState } from "react";

interface WhyCardProps {
  item: WhyChooseItem;
  index: number;
  visible: boolean;
}

function WhyCard({ item, index, visible }: WhyCardProps) {
  return (
    <div
      className={`
        group relative bg-card rounded-2xl p-6 border border-border
        border-l-4 card-lift hover-glow
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      style={{
        borderLeftColor: "#1DA1F2",
        transitionDelay: visible ? `${index * 120}ms` : "0ms",
      }}
      data-ocid={`why-choose.item.${index + 1}`}
    >
      {/* Icon */}
      <div
        className="text-5xl mb-4 select-none inline-block
          transition-transform duration-300 ease-out
          group-hover:scale-125 group-hover:-rotate-6"
        aria-hidden="true"
      >
        {item.icon}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-2 leading-snug"
        style={{ color: "#0B3C5D" }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.description}
      </p>

      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(29,161,242,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 sm:py-20 bg-card"
      data-ocid="why-choose.section"
      aria-labelledby="why-choose-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          data-ocid="why-choose.heading"
        >
          <h2
            id="why-choose-heading"
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: "#0B3C5D" }}
          >
            Why Choose PSR Rental?
          </h2>
          {/* Accent underline */}
          <div className="flex justify-center">
            <div
              className="h-1 w-16 rounded-full"
              style={{ background: "#1DA1F2" }}
              aria-hidden="true"
            />
          </div>
          <p className="mt-4 text-muted-foreground text-base max-w-md mx-auto">
            We're not just another broker — we're Jodhpur's fastest rental
            network.
          </p>
        </div>

        {/* 2×2 grid → 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_CHOOSE.map((item, i) => (
            <WhyCard key={item.title} item={item} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
