import { WHATSAPP_NUMBER } from "@/lib/constants";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";

const JODHPUR_AREAS = [
  { name: "Ratanada", icon: "🏘️" },
  { name: "Sardarpura", icon: "🏙️" },
  { name: "Paota", icon: "📍" },
  { name: "Shastri Nagar", icon: "🏫" },
  { name: "Residency Road", icon: "🏛️" },
];

function buildAreaWhatsApp(area: string) {
  const msg = encodeURIComponent(
    `Hi PSR Rental! I'm looking for a rental property in ${area}, Jodhpur. Please send me available options.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function MapSection() {
  return (
    <section
      id="map"
      className="py-14 md:py-20 bg-muted/30 overflow-x-hidden"
      data-ocid="map.section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 text-accent font-bold text-sm tracking-widest uppercase mb-3 bg-accent/10 border border-accent/30 rounded-full px-3 py-0.5">
            <MapPin size={13} />
            Coverage
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            We Cover All of{" "}
            <span className="text-gradient-accent">Jodhpur</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-md mx-auto">
            From Sardarpura to Ratanada — find rental properties in every prime
            locality of the Blue City.
          </p>
        </motion.div>

        {/* Area chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-6"
          data-ocid="map.area_chips"
        >
          {JODHPUR_AREAS.map((area, i) => (
            <a
              key={area.name}
              href={buildAreaWhatsApp(area.name)}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`map.area_chip.${i + 1}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-semibold shadow-sm hover:border-accent hover:text-accent hover:shadow-md transition-fast min-h-[44px]"
            >
              <span aria-hidden="true">{area.icon}</span>
              {area.name}
            </a>
          ))}
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border">
            + Many More Areas
          </span>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-lg border border-border bg-muted"
        >
          <iframe
            title="Jodhpur City Map — PSR Rental coverage area"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114877.35684689376!2d72.97761893261718!3d26.238263143558037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394182e0879bfaad%3A0x36c4f4b9a1731d50!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
            width="100%"
            height="360"
            className="w-full block md:h-[400px] h-[260px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Below map hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-xs sm:text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2"
        >
          <MapPin size={13} className="text-accent shrink-0" />
          Click an area above to instantly get properties via WhatsApp
        </motion.p>
      </div>
    </section>
  );
}
