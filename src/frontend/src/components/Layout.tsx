import { Button } from "@/components/ui/button";
import { PHONE_NUMBER } from "@/lib/constants";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/utils";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: "Properties", href: "#properties" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function PSRLogo() {
  return (
    <a
      href="#hero"
      className="flex items-center gap-2.5 group"
      aria-label="PSR Rental Home"
    >
      <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center shadow-md group-hover:shadow-accent-glow transition-smooth">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <title>PSR Rental Logo</title>
          <path
            d="M10 2L3 8V18H8V13H12V18H17V8L10 2Z"
            fill="white"
            strokeWidth="0"
          />
          <path d="M10 2L3 8" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <circle cx="14" cy="6" r="2.5" fill="white" opacity="0.8" />
          <path
            d="M13 5.5L14 6.5L16 4.5"
            stroke="#1DA1F2"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <span className="font-display font-extrabold text-lg leading-none text-foreground tracking-tight">
          PSR <span className="text-gradient-accent">Rental</span>
        </span>
        <p className="text-[10px] text-muted-foreground leading-none font-medium tracking-wide uppercase mt-0.5">
          Jodhpur
        </p>
      </div>
    </a>
  );
}

export function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-smooth ${
          scrolled
            ? "bg-card border-b border-border shadow-nav backdrop-blur-md"
            : "bg-card/95 border-b border-border/60"
        }`}
        data-ocid="header"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <PSRLogo />

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-fast rounded-lg hover:bg-muted/60"
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={buildCallUrl()}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-foreground border border-border rounded-lg hover:bg-muted/60 transition-fast"
                data-ocid="header.call_button"
                aria-label={`Call ${PHONE_NUMBER}`}
              >
                <Phone className="w-4 h-4 text-[#1DA1F2]" />
                <span className="hidden lg:inline">{PHONE_NUMBER}</span>
                <span className="lg:hidden">Call</span>
              </a>
              <a
                href={buildWhatsAppUrl(
                  "Hi PSR Rental, I need help finding a rental property in Jodhpur.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="header.whatsapp_button"
                aria-label="Chat on WhatsApp"
              >
                <Button
                  size="sm"
                  className="bg-whatsapp text-white font-semibold gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-muted/60 transition-fast"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-ocid="header.mobile_menu_toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t border-border bg-card animate-slide-up"
            data-ocid="header.mobile_menu"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 rounded-lg transition-fast"
                  data-ocid={`nav.mobile.${link.label.toLowerCase().replace(" ", "_")}.link`}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-2 pt-2 pb-1">
                <a
                  href={buildCallUrl()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold border border-border rounded-lg hover:bg-muted/60 transition-fast"
                  data-ocid="header.mobile.call_button"
                >
                  <Phone className="w-4 h-4 text-[#1DA1F2]" />
                  Call Now
                </a>
                <a
                  href={buildWhatsAppUrl(
                    "Hi PSR Rental, I need help finding a rental property in Jodhpur.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold bg-whatsapp text-white rounded-lg transition-fast"
                  data-ocid="header.mobile.whatsapp_button"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content — extra bottom padding on mobile for sticky action bar */}
      <main className="flex-1 pb-[56px] md:pb-0 overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-[#0B3C5D] text-white"
        id="footer"
        data-ocid="footer"
      >
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#1DA1F2] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <title>PSR Rental</title>
                    <path d="M10 2L3 8V18H8V13H12V18H17V8L10 2Z" fill="white" />
                  </svg>
                </div>
                <span className="font-display font-bold text-xl text-white">
                  PSR Rental
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                Jodhpur's fastest rental property network. Fast response,
                genuine listings, zero time wasted.
              </p>
              <div className="flex items-center gap-0.5 mt-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={`star-${n}`} className="text-yellow-400 text-sm">
                    ⭐
                  </span>
                ))}
                <span className="text-sm text-white/80 ml-1.5">
                  4.9 · 269+ reviews
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-sm text-white/70 hover:text-white transition-fast"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
                Contact Us
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href={buildCallUrl()}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-fast"
                  data-ocid="footer.call_link"
                >
                  <Phone className="w-4 h-4 text-[#1DA1F2]" />
                  {PHONE_NUMBER}
                </a>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-fast"
                  data-ocid="footer.whatsapp_link"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
                <p className="text-sm text-white/60 flex items-start gap-2">
                  <span className="mt-0.5">📍</span>
                  Sardarpura, Jodhpur, Rajasthan
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} PSR Rental. All rights reserved.
            </p>
            <p className="text-sm text-white/40">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white underline underline-offset-2 transition-fast"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div
        className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 md:bottom-6"
        data-ocid="floating_actions"
      >
        <a
          href={buildCallUrl()}
          className="w-12 h-12 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center shadow-elevated hover:shadow-accent-glow transition-smooth hover:-translate-y-1"
          aria-label="Call PSR Rental"
          data-ocid="floating.call_button"
        >
          <Phone className="w-5 h-5" />
        </a>
        <a
          href={buildWhatsAppUrl(
            "Hi PSR Rental, I need help finding a rental property in Jodhpur.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-elevated animate-float hover:shadow-lg transition-smooth hover:-translate-y-1"
          aria-label="Chat on WhatsApp"
          data-ocid="floating.whatsapp_button"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}

export default Layout;
