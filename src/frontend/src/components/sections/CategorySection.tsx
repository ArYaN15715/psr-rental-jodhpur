import { CATEGORIES } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";
import type { Category } from "@/types";
import { motion } from "motion/react";

const CATEGORY_IMAGES: Record<string, string> = {
  home: "/assets/generated/category-homes.dim_400x300.jpg",
  pg: "/assets/generated/category-pg-rooms.dim_400x300.jpg",
  shop: "/assets/generated/category-shops.dim_400x300.jpg",
  office: "/assets/generated/category-offices.dim_400x300.jpg",
};

const CATEGORY_GRADIENT: Record<string, string> = {
  home: "from-blue-900/80 to-blue-700/60",
  pg: "from-indigo-900/80 to-indigo-700/60",
  shop: "from-teal-900/80 to-teal-700/60",
  office: "from-slate-900/80 to-slate-700/60",
};

function buildCategoryWhatsAppUrl(category: Category): string {
  const message = `Hi PSR Rental, I'm looking for ${category.label} in Jodhpur. Please send available options. Thanks!`;
  return buildWhatsAppUrl(message);
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const waUrl = buildCategoryWhatsAppUrl(category);
  const image = CATEGORY_IMAGES[category.id];
  const gradient = CATEGORY_GRADIENT[category.id];

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ocid={`category.item.${index + 1}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-md border border-border cursor-pointer card-lift hover-glow"
      aria-label={`Browse ${category.label}`}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={category.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-70`}
        />

        {/* Count badge */}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow">
          {category.count}+ listings
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Icon + Label */}
        <div className="flex items-center gap-3">
          <motion.span
            className="text-3xl leading-none"
            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          >
            {category.icon}
          </motion.span>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground text-base leading-tight truncate">
              {category.label}
            </h3>
            <p className="text-muted-foreground text-xs mt-0.5">
              {category.description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-border">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent/80 transition-colors duration-200">
            View All
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.6,
                ease: "easeInOut",
              }}
            >
              →
            </motion.span>
          </span>
        </div>
      </div>

      {/* Accent border reveal on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.a>
  );
}

export function CategorySection() {
  return (
    <section
      id="categories"
      className="py-14 md:py-20 bg-muted/30"
      data-ocid="categories.section"
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
            <span className="inline-block bg-accent/10 border border-accent/30 rounded-full px-3 py-0.5">
              01 — Categories
            </span>
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            Browse by{" "}
            <span className="text-gradient-accent">Property Type</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-base max-w-lg mx-auto">
            From cozy PG rooms to premium offices — find exactly what you need
            in Jodhpur.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          data-ocid="categories.list"
        >
          {CATEGORIES.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href={buildWhatsAppUrl(
              "Hi PSR Rental, I want to see all available rental properties in Jodhpur. Please share options. Thanks!",
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="categories.all_categories_button"
            className="inline-flex items-center gap-2 bg-whatsapp text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl cta-pulse hover:scale-105 transition-smooth text-base"
          >
            <span>💬</span>
            See All Properties on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
