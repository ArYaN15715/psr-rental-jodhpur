import { PropertyModal } from "@/components/PropertyModal";
import { PROPERTIES } from "@/lib/constants";
import { buildPropertyWhatsAppUrl, buildWhatsAppUrl } from "@/lib/utils";
import type { PropertyCard } from "@/types";
import { motion } from "motion/react";
import { useState } from "react";

const TYPE_LABELS: Record<string, string> = {
  home: "Home",
  pg: "PG / Room",
  shop: "Shop",
  office: "Office",
};

const TYPE_COLORS: Record<string, string> = {
  home: "bg-blue-100 text-blue-800",
  pg: "bg-indigo-100 text-indigo-800",
  shop: "bg-teal-100 text-teal-800",
  office: "bg-slate-100 text-slate-800",
};

const BADGE_STYLES: Record<string, { bg: string; dot: string; label: string }> =
  {
    new: { bg: "bg-emerald-500", dot: "bg-white", label: "Just Added" },
    hot: { bg: "bg-red-500", dot: "bg-yellow-300", label: "🔥 Hot" },
    available: { bg: "bg-emerald-500", dot: "bg-white", label: "Available" },
  };

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border shadow-sm">
      <div className="h-52 shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 shimmer rounded-md" />
        <div className="h-4 w-1/2 shimmer rounded-md" />
        <div className="h-4 w-2/3 shimmer rounded-md" />
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-16 shimmer rounded-full" />
          <div className="h-6 w-20 shimmer rounded-full" />
        </div>
      </div>
    </div>
  );
}

interface PropertyCardItemProps {
  property: PropertyCard;
  index: number;
  onOpen: (p: PropertyCard) => void;
}

function PropertyCardItem({ property, index, onOpen }: PropertyCardItemProps) {
  const waUrl = buildPropertyWhatsAppUrl(property.title, property.location);
  const badge = property.badgeType ? BADGE_STYLES[property.badgeType] : null;
  const typeLabel = TYPE_LABELS[property.type] ?? property.type;
  const typeColor =
    TYPE_COLORS[property.type] ?? "bg-muted text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border shadow-md card-lift"
      data-ocid={`property_feed.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-muted">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />

        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-3 left-3 flex items-center gap-1.5 ${badge.bg} text-white text-xs font-bold px-2.5 py-1 rounded-full shadow`}
          >
            {property.badgeType === "new" && (
              <span
                className={`w-1.5 h-1.5 rounded-full ${badge.dot} animate-pulse`}
                aria-hidden="true"
              />
            )}
            {badge.label}
          </div>
        )}

        {/* Type tag */}
        <div
          className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full ${typeColor}`}
        >
          {typeLabel}
        </div>

        {/* Hover overlay — desktop only */}
        <div className="hidden md:flex absolute inset-0 bg-foreground/60 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`property_feed.whatsapp_button.${index + 1}`}
            className="flex items-center gap-2 bg-whatsapp text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-smooth text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <span>📱</span>
            Quick WhatsApp
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Price */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xl font-extrabold text-accent leading-tight">
            {property.price}
          </span>
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            Available
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <p className="text-muted-foreground text-xs flex items-start gap-1 leading-snug">
          <span aria-hidden="true" className="mt-0.5 flex-shrink-0">
            📍
          </span>
          <span className="line-clamp-1">{property.location}</span>
        </p>

        {/* Tags */}
        {property.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {property.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA row */}
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(property);
            }}
            data-ocid={`property_feed.details_button.${index + 1}`}
            className="flex-1 py-2.5 text-xs font-bold text-primary border border-primary rounded-xl hover:bg-primary hover:text-primary-foreground transition-fast"
          >
            View Details
          </button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid={`property_feed.mobile_whatsapp_button.${index + 1}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-whatsapp text-white font-semibold py-2.5 rounded-xl text-xs transition-fast hover:opacity-90"
            onClick={(e) => e.stopPropagation()}
          >
            <span>💬</span>
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function PropertyFeed() {
  const visibleProperties = PROPERTIES.slice(0, 6);
  const [selected, setSelected] = useState<PropertyCard | null>(null);

  return (
    <section
      id="properties"
      className="py-14 md:py-20 bg-background overflow-x-hidden"
      data-ocid="property_feed.section"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent font-bold text-sm tracking-widest uppercase mb-2">
            <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-3 py-0.5">
              02 — Properties
              <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                ● LIVE
              </span>
            </span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            Latest <span className="text-gradient-accent">Properties</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            <span className="font-semibold text-foreground">Available Now</span>{" "}
            in Jodhpur — updated daily
          </p>
        </motion.div>

        {/* Grid — responsive, no horizontal scroll */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          data-ocid="property_feed.list"
        >
          {visibleProperties.map((property, index) => (
            <PropertyCardItem
              key={property.id}
              property={property}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm mb-4">
            Showing 6 of {PROPERTIES.length}+ active listings
          </p>
          <a
            href={buildWhatsAppUrl(
              "Hi PSR Rental, I want to see all available rental properties in Jodhpur. Please share the full list. Thanks!",
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="property_feed.view_all_button"
            className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-smooth text-base"
          >
            <span>🏘️</span>
            View All Properties
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </a>
          <p className="text-muted-foreground text-xs mt-3 flex items-center justify-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            Get options within minutes on WhatsApp
          </p>
        </motion.div>
      </div>

      {/* Property Detail Modal */}
      <PropertyModal
        property={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
