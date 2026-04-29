import { useIsMobile } from "@/hooks/use-mobile";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/utils";
import { MessageCircle, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const WA_URL = buildWhatsAppUrl(
  "Hi PSR Rental! I need a rental property in Jodhpur. Please send me available options.",
);
const CALL_URL = buildCallUrl();

// Tooltip component
function Tooltip({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.15 }}
            role="tooltip"
            className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Floating desktop buttons
function FloatingButtons({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-8 right-6 z-50 hidden md:flex flex-col gap-3 items-end"
          aria-label="Quick contact buttons"
        >
          {/* WhatsApp */}
          <Tooltip label="Chat on WhatsApp">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="sticky.whatsapp_button"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-xl hover:scale-110 transition-smooth hover-glow"
              style={{
                boxShadow:
                  "0 0 0 0 rgba(37,211,102,0.5), 0 8px 24px rgba(37,211,102,0.35)",
                animation: "whatsapp-pulse 2.4s ease-in-out infinite",
              }}
            >
              <MessageCircle size={26} />
            </a>
          </Tooltip>

          {/* Call */}
          <Tooltip label="Call Now">
            <a
              href={CALL_URL}
              data-ocid="sticky.call_button"
              aria-label="Call PSR Rental"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-smooth"
            >
              <Phone size={20} />
            </a>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile bottom bar
function MobileBar({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          data-ocid="sticky.mobile_bar"
        >
          {/* Call half */}
          <a
            href={CALL_URL}
            data-ocid="sticky.mobile_call_button"
            aria-label="Call PSR Rental"
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-base py-4 min-h-[56px] active:opacity-80 transition-fast"
          >
            <Phone size={20} className="shrink-0" />
            <span>Call Now</span>
          </a>

          {/* Divider */}
          <div className="w-px bg-white/20" aria-hidden="true" />

          {/* WhatsApp half */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="sticky.mobile_whatsapp_button"
            aria-label="Chat on WhatsApp"
            className="flex-1 flex items-center justify-center gap-2 bg-whatsapp text-white font-bold text-base py-4 min-h-[56px] active:opacity-80 transition-fast"
          >
            <MessageCircle size={20} className="shrink-0" />
            <span>WhatsApp</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StickyActions() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so it slides in after page loads
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (isMobile === undefined) return null;

  return (
    <>
      {!isMobile && <FloatingButtons visible={visible} />}
      {isMobile && <MobileBar visible={visible} />}

      {/* Keyframe for WhatsApp pulse ring */}
      <style>{`
        @keyframes whatsapp-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.45), 0 8px 24px rgba(37,211,102,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(37,211,102,0), 0 8px 24px rgba(37,211,102,0.2); }
        }
      `}</style>
    </>
  );
}
