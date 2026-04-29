import { PROCESS_STEPS } from "@/lib/constants";
import type { ProcessStep } from "@/types";
import { useEffect, useRef, useState } from "react";

interface StepProps {
  step: ProcessStep;
  index: number;
  total: number;
  visible: boolean;
}

function Step({ step, index, total, visible }: StepProps) {
  const isLast = index === total - 1;

  return (
    <div className="flex flex-col items-center relative flex-1 min-w-0">
      {/* Connector line (desktop only, between steps) */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-7 left-1/2 w-full h-[2px] z-0"
          style={{ left: "50%", width: "100%" }}
          aria-hidden="true"
        >
          {/* Dashed base */}
          <div
            className="absolute inset-0"
            style={{
              borderTop: "2px dashed rgba(29,161,242,0.35)",
            }}
          />
          {/* Animated dot travelling along the line */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full
              transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
            style={{
              background: "#1DA1F2",
              boxShadow: "0 0 8px 2px rgba(29,161,242,0.5)",
              animation: visible
                ? `travel-dot 2.4s ${index * 0.6}s ease-in-out infinite`
                : "none",
              left: 0,
            }}
          />
        </div>
      )}

      {/* Step circle */}
      <div
        className={`
          relative z-10 w-14 h-14 rounded-full flex items-center justify-center
          font-black text-xl text-white shadow-lg
          transition-all duration-500
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
        `}
        style={{
          background: "linear-gradient(135deg, #1DA1F2 0%, #0d85d0 100%)",
          transitionDelay: visible ? `${index * 150}ms` : "0ms",
          boxShadow: "0 4px 16px rgba(29,161,242,0.4)",
        }}
        aria-label={`Step ${step.step}`}
        data-ocid={`process.step.${index + 1}`}
      >
        {step.step}
      </div>

      {/* Icon above step number — shown below circle */}
      <div
        className={`
          text-2xl mt-3 select-none
          transition-all duration-500
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
        `}
        style={{ transitionDelay: visible ? `${index * 150 + 100}ms` : "0ms" }}
        aria-hidden="true"
      >
        {step.icon}
      </div>

      {/* Title */}
      <h3
        className={`
          mt-2 font-bold text-base text-center px-2
          transition-all duration-500
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
        `}
        style={{
          color: "#0B3C5D",
          transitionDelay: visible ? `${index * 150 + 180}ms` : "0ms",
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className={`
          mt-1 text-xs sm:text-sm text-muted-foreground text-center px-2 leading-relaxed
          transition-all duration-500
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        `}
        style={{ transitionDelay: visible ? `${index * 150 + 240}ms` : "0ms" }}
      >
        {step.description}
      </p>
    </div>
  );
}

function MobileStep({ step, index, total, visible }: StepProps) {
  const isLast = index === total - 1;

  return (
    <div className="relative flex gap-4 pb-8">
      {/* Vertical connector */}
      {!isLast && (
        <div
          className="absolute left-6 top-14 bottom-0 w-[2px] z-0"
          style={{ borderLeft: "2px dashed rgba(29,161,242,0.35)" }}
          aria-hidden="true"
        >
          {/* Animated travelling dot */}
          <div
            className={`absolute -left-[5px] w-3 h-3 rounded-full
              transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
            style={{
              background: "#1DA1F2",
              boxShadow: "0 0 8px 2px rgba(29,161,242,0.5)",
              animation: visible
                ? `travel-dot-vertical 2.4s ${index * 0.6}s ease-in-out infinite`
                : "none",
              top: 0,
            }}
          />
        </div>
      )}

      {/* Circle */}
      <div
        className={`
          relative z-10 shrink-0 w-12 h-12 rounded-full flex items-center justify-center
          font-black text-lg text-white shadow-md
          transition-all duration-500
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}
        `}
        style={{
          background: "linear-gradient(135deg, #1DA1F2 0%, #0d85d0 100%)",
          transitionDelay: visible ? `${index * 150}ms` : "0ms",
          boxShadow: "0 4px 12px rgba(29,161,242,0.35)",
        }}
        data-ocid={`process.step.mobile.${index + 1}`}
      >
        {step.step}
      </div>

      {/* Content */}
      <div
        className={`
          flex flex-col justify-center
          transition-all duration-500
          ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
        `}
        style={{ transitionDelay: visible ? `${index * 150 + 120}ms` : "0ms" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {step.icon}
          </span>
          <h3 className="font-bold text-base" style={{ color: "#0B3C5D" }}>
            {step.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function ProcessSection() {
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
      className="w-full py-16 sm:py-20 bg-slate-50"
      data-ocid="process.section"
      aria-labelledby="process-heading"
    >
      {/* Keyframe styles injected */}
      <style>{`
        @keyframes travel-dot {
          0%   { left: 0%;   opacity: 1; }
          80%  { left: 100%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes travel-dot-vertical {
          0%   { top: 0%;   opacity: 1; }
          80%  { top: 100%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          data-ocid="process.heading"
        >
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: "#0B3C5D" }}
          >
            How It Works
          </h2>
          <div className="flex justify-center">
            <div
              className="h-1 w-16 rounded-full"
              style={{ background: "#1DA1F2" }}
              aria-hidden="true"
            />
          </div>
          <p className="mt-4 text-muted-foreground text-base max-w-sm mx-auto">
            4 simple steps to your perfect rental property
          </p>
        </div>

        {/* Desktop layout: horizontal */}
        <div className="hidden lg:flex items-start gap-0 relative">
          {PROCESS_STEPS.map((step, i) => (
            <Step
              key={step.step}
              step={step}
              index={i}
              total={PROCESS_STEPS.length}
              visible={visible}
            />
          ))}
        </div>

        {/* Mobile layout: vertical */}
        <div className="lg:hidden max-w-sm mx-auto">
          {PROCESS_STEPS.map((step, i) => (
            <MobileStep
              key={step.step}
              step={step}
              index={i}
              total={PROCESS_STEPS.length}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
