import { PHONE_RAW, RATING, REVIEW_COUNT, TAGLINE } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import { ChevronDown, MessageCircle, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/assets/generated/hero-jodhpur-city.dim_1400x800.jpg",
  "/assets/generated/property-2bhk-sardarpura.dim_600x400.jpg",
  "/assets/generated/property-3bhk-residency.dim_600x400.jpg",
  "/assets/generated/property-office-basni.dim_600x400.jpg",
];

const TRUST_BADGES = [
  {
    icon: <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />,
    label: `${RATING} Rating`,
  },
  {
    icon: <span className="text-sm">👥</span>,
    label: `${REVIEW_COUNT} Happy Clients`,
  },
  { icon: <span className="text-sm">⚡</span>, label: "Fast Response" },
  { icon: <span className="text-sm">✔</span>, label: "Verified Listings" },
];

const WA_URL = buildWhatsAppUrl(
  "Hi PSR Rental! I need rental property options in Jodhpur. Please send me available listings.",
);

function HeroBackground({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeIndex ? 1 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            style={{
              animation:
                i === activeIndex ? "kenBurns 6s ease-in-out forwards" : "none",
            }}
          />
        </div>
      ))}
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />
      {/* Bottom gradient into page */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/90 to-transparent" />
    </div>
  );
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSearch = () => {
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      <HeroBackground activeIndex={activeIndex} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center pt-12 pb-20">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-wide uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#1DA1F2] animate-pulse" />
          {TAGLINE}
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white leading-[1.1] tracking-tight"
          >
            Find Rental Properties
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-5">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black leading-[1.1] tracking-tight"
          >
            <span className="text-gradient-accent">in Jodhpur</span>
            <span className="text-white"> — Instantly</span>
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-white/80 font-medium max-w-xl mb-8"
        >
          Fast response. Genuine listings. No time wasted.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm sm:max-w-none mb-10"
        >
          {/* WhatsApp CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.whatsapp_button"
            aria-label="Get properties on WhatsApp"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-full bg-[#25D366] text-white font-bold text-base shadow-xl transition-smooth hover:bg-[#1db854] hover:scale-105 active:scale-95"
            style={{
              boxShadow:
                "0 0 0 0 rgba(37,211,102,0.5), 0 8px 28px rgba(37,211,102,0.4)",
              animation: "whatsapp-hero-pulse 2.4s ease-in-out infinite",
            }}
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            Get Properties on WhatsApp
          </a>

          {/* Call CTA */}
          <a
            href={`tel:+${PHONE_RAW}`}
            data-ocid="hero.call_button"
            aria-label="Call PSR Rental now"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 border-2 border-white/60 text-white font-bold text-base backdrop-blur-sm transition-smooth hover:bg-white/20 hover:border-white hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5 shrink-0" />
            Call Now
          </a>
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {TRUST_BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-semibold"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToSearch}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to search"
        data-ocid="hero.scroll_indicator"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-fast"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Slide indicator dots */}
      <div
        className="absolute bottom-8 right-6 z-10 hidden md:flex flex-col gap-1.5"
        aria-hidden="true"
      >
        {HERO_IMAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "h-5 bg-[#1DA1F2]"
                : "h-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Ken Burns + WhatsApp pulse keyframes */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
        @keyframes whatsapp-hero-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.45), 0 8px 28px rgba(37,211,102,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(37,211,102,0), 0 8px 24px rgba(37,211,102,0.2); }
        }
      `}</style>
    </section>
  );
}
