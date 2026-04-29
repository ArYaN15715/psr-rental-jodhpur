import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PHONE_RAW, WHATSAPP_NUMBER } from "@/lib/constants";
import type { PropertyCard } from "@/types";
import { MapPin, MessageCircle, Phone, X } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  home: "Residential",
  pg: "PG / Room",
  shop: "Commercial Shop",
  office: "Office Space",
};

const TYPE_BADGE_COLORS: Record<string, string> = {
  home: "bg-blue-100 text-blue-800",
  pg: "bg-indigo-100 text-indigo-800",
  shop: "bg-teal-100 text-teal-800",
  office: "bg-slate-100 text-slate-800",
};

const BADGE_STYLES: Record<string, { bg: string; label: string }> = {
  new: { bg: "bg-emerald-500", label: "Just Added" },
  hot: { bg: "bg-red-500", label: "🔥 Hot Deal" },
  available: { bg: "bg-emerald-500", label: "Available Now" },
};

interface PropertyModalProps {
  property: PropertyCard | null;
  open: boolean;
  onClose: () => void;
}

export function PropertyModal({ property, open, onClose }: PropertyModalProps) {
  if (!property) return null;

  const badge = property.badgeType ? BADGE_STYLES[property.badgeType] : null;
  const typeLabel = TYPE_LABELS[property.type] ?? property.type;
  const typeColor =
    TYPE_BADGE_COLORS[property.type] ?? "bg-muted text-muted-foreground";

  const waMessage = encodeURIComponent(
    `Hi PSR Rental! I'm interested in: "${property.title}" at ${property.price} in ${property.location}. Please share more details.`,
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
  const callUrl = `tel:+${PHONE_RAW}`;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="p-0 overflow-hidden max-w-lg w-[calc(100%-1rem)] sm:w-full rounded-2xl border-0 shadow-2xl"
        data-ocid="property_modal.dialog"
      >
        {/* Visually hidden accessible title */}
        <DialogTitle className="sr-only">{property.title}</DialogTitle>

        {/* Property Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
          {/* Dark gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top badges overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {badge && (
              <span
                className={`${badge.bg} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow`}
              >
                {badge.label}
              </span>
            )}
            <span
              className={`${typeColor} text-xs font-semibold px-2.5 py-1 rounded-full`}
            >
              {typeLabel}
            </span>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close property details"
            data-ocid="property_modal.close_button"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-fast"
          >
            <X size={16} />
          </button>

          {/* Price at bottom of image */}
          <div className="absolute bottom-3 left-3">
            <span className="text-2xl font-extrabold text-white drop-shadow-lg">
              {property.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <h2 className="text-xl font-extrabold text-foreground leading-tight">
              {property.title}
            </h2>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1.5">
              <MapPin size={13} className="text-accent shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          {/* Details grid */}
          {(property.bedrooms || property.floor) && (
            <div className="grid grid-cols-2 gap-3">
              {property.bedrooms && (
                <div className="bg-secondary rounded-xl px-3 py-2.5 text-center">
                  <p className="text-lg font-bold text-foreground">
                    {property.bedrooms} BHK
                  </p>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                </div>
              )}
              {property.floor && (
                <div className="bg-secondary rounded-xl px-3 py-2.5 text-center">
                  <p className="text-lg font-bold text-foreground">
                    {property.floor}
                  </p>
                  <p className="text-xs text-muted-foreground">Floor</p>
                </div>
              )}
            </div>
          )}

          {/* Features / Tags */}
          {property.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-medium border border-border"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Availability indicator */}
          <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold">Available Now</span>
            <span className="text-emerald-600">— Quick move-in possible</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="property_modal.whatsapp_button"
              className="flex-1 flex items-center justify-center gap-2.5 bg-whatsapp text-white font-bold py-3.5 px-5 rounded-xl text-sm shadow-md hover:opacity-90 active:scale-[0.98] transition-fast"
            >
              <MessageCircle size={18} className="shrink-0" />
              Enquire on WhatsApp
            </a>
            <a
              href={callUrl}
              data-ocid="property_modal.call_button"
              className="sm:w-auto flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-3.5 px-5 rounded-xl text-sm hover:bg-primary hover:text-primary-foreground active:scale-[0.98] transition-fast"
            >
              <Phone size={17} className="shrink-0" />
              Call Now
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
