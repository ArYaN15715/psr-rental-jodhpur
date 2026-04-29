import { buildCallUrl, buildWhatsAppUrl } from "@/lib/utils";
import { MessageCircle, Phone, Zap } from "lucide-react";
import { motion } from "motion/react";

const WA_URL = buildWhatsAppUrl(
  "Hi PSR Rental! I need a rental property in Jodhpur. Please send me available options.",
);
const CALL_URL = buildCallUrl();

export function CTASection() {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative overflow-hidden gradient-cta"
      data-ocid="cta.section"
    >
      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full border border-white/5 absolute" />
        <div className="w-[900px] h-[900px] rounded-full border border-white/[0.03] absolute" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest"
        >
          <Zap size={12} className="text-amber-400" />
          Act Fast — Properties Get Taken Quickly
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
        >
          Need a Rental Property{" "}
          <span className="text-gradient-accent">Fast?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-white/70 mb-10 leading-relaxed"
        >
          Get options within minutes.{" "}
          <span className="text-accent font-medium">No fees. No hassle.</span>
          <br className="hidden sm:block" />
          Just fast, genuine results from Jodhpur's #1 rental network.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* WhatsApp CTA */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="cta.whatsapp_button"
            className="cta-pulse flex items-center justify-center gap-3 w-full sm:w-auto bg-whatsapp hover:bg-[#1db854] text-white font-bold text-lg px-8 py-4 rounded-2xl transition-fast shadow-lg shadow-green-900/30 min-w-[240px]"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={22} className="shrink-0" />
            Chat Now on WhatsApp
          </a>

          {/* Call CTA */}
          <a
            href={CALL_URL}
            data-ocid="cta.call_button"
            className="flex items-center justify-center gap-3 w-full sm:w-auto border-2 border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-semibold text-base px-8 py-4 rounded-2xl transition-fast min-w-[180px]"
            aria-label="Call PSR Rental"
          >
            <Phone size={20} className="shrink-0" />
            Call Now
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-6 flex items-center justify-center gap-2 text-white/50 text-sm"
        >
          <Zap size={14} className="text-amber-400 shrink-0" />
          Usually responds in under 5 minutes
        </motion.p>
      </div>
    </section>
  );
}
