import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WHATSAPP_NUMBER } from "./constants";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Build a WhatsApp click-to-chat URL with an optional pre-filled message.
 */
export function buildWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a WhatsApp inquiry URL for a specific property.
 */
export function buildPropertyWhatsAppUrl(
  propertyTitle: string,
  location: string,
): string {
  const message = `Hi PSR Rental, I'm interested in: ${propertyTitle} at ${location}. Please share more details.`;
  return buildWhatsAppUrl(message);
}

/**
 * Build a WhatsApp URL for a search query.
 */
export function buildSearchWhatsAppUrl(
  propertyType: string,
  area: string,
  budget: string,
): string {
  const parts = ["Hi PSR Rental, I need a rental property:"];
  if (propertyType && propertyType !== "home")
    parts.push(`Type: ${propertyType}`);
  if (area && area !== "All Areas") parts.push(`Area: ${area}`);
  if (budget && budget !== "Any Budget") parts.push(`Budget: ${budget}`);
  parts.push("Please send me available options. Thanks!");
  return buildWhatsAppUrl(parts.join("\n"));
}

/**
 * Build a phone call URL.
 */
export function buildCallUrl(): string {
  return `tel:+${WHATSAPP_NUMBER}`;
}

/**
 * Format price number for display.
 */
export function formatPrice(price: number): string {
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(0)}K`;
  return `₹${price}`;
}
