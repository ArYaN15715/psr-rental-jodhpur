import { TESTIMONIALS } from "@/lib/constants";
import type { Testimonial } from "@/types";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-rose-600",
  "bg-amber-600",
  "bg-cyan-600",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {STAR_KEYS.map((key, i) => (
        <Star
          key={key}
          size={16}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: { testimonial: Testimonial; index: number }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className="bg-card rounded-2xl p-6 shadow-md border border-border flex flex-col gap-4 h-full select-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`${color} shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm`}
            aria-hidden="true"
          >
            {getInitials(testimonial.name)}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-foreground text-sm truncate">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-xs">
              {testimonial.location}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      <p className="text-foreground/80 text-sm leading-relaxed italic flex-1">
        "{testimonial.review}"
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
        <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
          {testimonial.propertyType}
        </span>
        <span>{testimonial.date}</span>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const advance = useCallback(
    (newDir: number) => {
      setDir(newDir);
      setCurrent((prev) => (prev + newDir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => advance(1), 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, advance]);

  const prev = () => advance(-1);
  const next = () => advance(1);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-background"
      data-ocid="testimonials.section"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star size={22} className="fill-amber-400 text-amber-400" />
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Client Reviews
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Real reviews from 269+ happy clients who found their perfect rental
            through PSR.
          </p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-ocid="testimonials.card"
        >
          <div className="min-h-[220px] md:min-h-[200px]">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="w-full"
              >
                <TestimonialCard
                  testimonial={TESTIMONIALS[current]}
                  index={current}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrow buttons — desktop only */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            data-ocid="testimonials.prev_button"
            className="hidden md:flex absolute left-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow items-center justify-center text-foreground hover:bg-secondary transition-fast"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            data-ocid="testimonials.next_button"
            className="hidden md:flex absolute right-[-48px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border shadow items-center justify-center text-foreground hover:bg-secondary transition-fast"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div
          className="flex justify-center gap-2 mt-7"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              type="button"
              key={t.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to review ${i + 1}`}
              data-ocid={`testimonials.dot.${i + 1}`}
              onClick={() => {
                setDir(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2.5 bg-accent"
                  : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">4.9</span> Rating on
            Google
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div>
            <span className="font-semibold text-foreground">269+</span> Happy
            Clients
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div>
            <span className="font-semibold text-foreground">1000+</span>{" "}
            Properties Listed
          </div>
        </motion.div>
      </div>
    </section>
  );
}
