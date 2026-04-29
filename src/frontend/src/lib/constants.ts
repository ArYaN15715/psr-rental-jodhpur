import type {
  Category,
  ProcessStep,
  PropertyCard,
  Testimonial,
  WhyChooseItem,
} from "@/types";

export const WHATSAPP_NUMBER = "919829012345";
export const PHONE_NUMBER = "+91 98290 12345";
export const PHONE_RAW = "919829012345";
export const BUSINESS_NAME = "PSR Rental";
export const TAGLINE = "Jodhpur's Fastest Rental Property Network";
export const RATING = "4.9";
export const REVIEW_COUNT = "269+";
export const PROPERTIES_LISTED = "1000+";

export const AREAS = [
  "All Areas",
  "Sardarpura",
  "Paota",
  "Shastri Nagar",
  "Ratanada",
  "Chopasni Housing Board",
  "Pal Road",
  "Mandore",
  "Basni",
  "Bhagat Ki Kothi",
  "Shyam Nagar",
  "Residency Road",
  "Kamla Nehru Nagar",
];

export const BUDGET_RANGES = [
  "Any Budget",
  "Under ₹5,000",
  "₹5,000 – ₹8,000",
  "₹8,000 – ₹12,000",
  "₹12,000 – ₹18,000",
  "₹18,000 – ₹25,000",
  "Above ₹25,000",
];

export const BHK_TYPES = [
  "Any Type",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "Studio",
  "Single Room",
  "PG (Sharing)",
  "PG (Private)",
  "Ground Floor Shop",
  "First Floor Office",
];

export const CATEGORIES: Category[] = [
  {
    id: "home",
    label: "1BHK / 2BHK Homes",
    icon: "🏠",
    description: "Furnished & unfurnished flats",
    count: 320,
  },
  {
    id: "pg",
    label: "PG / Rooms",
    icon: "🛏️",
    description: "Single & sharing rooms",
    count: 180,
  },
  {
    id: "shop",
    label: "Shops",
    icon: "🏪",
    description: "Ground floor commercial",
    count: 95,
  },
  {
    id: "office",
    label: "Offices",
    icon: "🏢",
    description: "Ready-to-move offices",
    count: 65,
  },
];

export const PROPERTIES: PropertyCard[] = [
  {
    id: "1",
    title: "2 BHK Flat — Sardarpura",
    price: "₹12,000/mo",
    priceNum: 12000,
    location: "Sardarpura, Near Circuit House",
    area: "Sardarpura",
    type: "home",
    badge: "Just Added",
    badgeType: "new",
    image: "/assets/generated/property-2bhk-sardarpura.dim_600x400.jpg",
    bedrooms: 2,
    floor: "2nd Floor",
    tags: ["Semi-Furnished", "2nd Floor", "Parking"],
  },
  {
    id: "2",
    title: "1 BHK Flat — Ratanada",
    price: "₹8,500/mo",
    priceNum: 8500,
    location: "Ratanada, Near Shiv Mandir",
    area: "Ratanada",
    type: "home",
    badge: "Available Now",
    badgeType: "available",
    image: "/assets/generated/property-1bhk-ratanada.dim_600x400.jpg",
    bedrooms: 1,
    floor: "1st Floor",
    tags: ["Furnished", "1st Floor", "24/7 Water"],
  },
  {
    id: "3",
    title: "PG Room — Paota",
    price: "₹4,500/mo",
    priceNum: 4500,
    location: "Paota B Road, Near Collectorate",
    area: "Paota",
    type: "pg",
    badge: "Hot",
    badgeType: "hot",
    image: "/assets/generated/property-pg-paota.dim_600x400.jpg",
    tags: ["Sharing", "WiFi", "Meals Available"],
  },
  {
    id: "4",
    title: "Office Space — Basni",
    price: "₹18,000/mo",
    priceNum: 18000,
    location: "Basni Phase 2, Industrial Area",
    area: "Basni",
    type: "office",
    badge: "Just Added",
    badgeType: "new",
    image: "/assets/generated/property-office-basni.dim_600x400.jpg",
    floor: "Ground Floor",
    tags: ["600 sq ft", "Reception Area", "Parking"],
  },
  {
    id: "5",
    title: "Shop — Shastri Nagar",
    price: "₹15,000/mo",
    priceNum: 15000,
    location: "Shastri Nagar Main Road",
    area: "Shastri Nagar",
    type: "shop",
    badge: "Available Now",
    badgeType: "available",
    image: "/assets/generated/property-shop-shastri.dim_600x400.jpg",
    floor: "Ground Floor",
    tags: ["Corner Shop", "400 sq ft", "High Footfall"],
  },
  {
    id: "6",
    title: "2 BHK Flat — Pal Road",
    price: "₹10,500/mo",
    priceNum: 10500,
    location: "Pal Road, Near Petrol Pump",
    area: "Pal Road",
    type: "home",
    badge: "Available Now",
    badgeType: "available",
    image: "/assets/generated/property-2bhk-pal.dim_600x400.jpg",
    bedrooms: 2,
    floor: "3rd Floor",
    tags: ["Unfurnished", "Lift", "3rd Floor"],
  },
  {
    id: "7",
    title: "PG — Chopasni Housing Board",
    price: "₹5,000/mo",
    priceNum: 5000,
    location: "Chopasni HB, Near Metro College",
    area: "Chopasni Housing Board",
    type: "pg",
    badge: "Hot",
    badgeType: "hot",
    image: "/assets/generated/property-pg-chopasni.dim_600x400.jpg",
    tags: ["Private Room", "AC", "Attached Bath"],
  },
  {
    id: "8",
    title: "3 BHK Premium — Residency Road",
    price: "₹22,000/mo",
    priceNum: 22000,
    location: "Residency Road, Posh Locality",
    area: "Residency Road",
    type: "home",
    badge: "Just Added",
    badgeType: "new",
    image: "/assets/generated/property-3bhk-residency.dim_600x400.jpg",
    bedrooms: 3,
    floor: "1st Floor",
    tags: ["Fully Furnished", "Modular Kitchen", "Gym"],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    rating: 5,
    review:
      "Got a 2BHK in Sardarpura within 2 days. Very fast and genuine. No broker games.",
    location: "Sardarpura",
    date: "2 weeks ago",
    propertyType: "2 BHK Home",
  },
  {
    id: "2",
    name: "Priya Verma",
    rating: 5,
    review:
      "Found a PG room near my office in just one call. Super responsive team!",
    location: "Paota",
    date: "1 month ago",
    propertyType: "PG Room",
  },
  {
    id: "3",
    name: "Mohit Jain",
    rating: 5,
    review:
      "Rented a shop on Shastri Nagar main road. Best location, best deal. Highly recommend.",
    location: "Shastri Nagar",
    date: "3 weeks ago",
    propertyType: "Shop",
  },
  {
    id: "4",
    name: "Sneha Rathore",
    rating: 5,
    review:
      "Trusted service. They showed me properties matching exactly what I wanted. No time waste.",
    location: "Ratanada",
    date: "1 month ago",
    propertyType: "1 BHK Home",
  },
  {
    id: "5",
    name: "Deepak Bishnoi",
    rating: 5,
    review:
      "Office space in Basni was perfect for our startup. Reasonable rent and quick process.",
    location: "Basni",
    date: "2 months ago",
    propertyType: "Office",
  },
  {
    id: "6",
    name: "Kavita Meghwal",
    rating: 4,
    review:
      "Very helpful and quick response. Found a great flat on Pal Road within 3 days.",
    location: "Pal Road",
    date: "3 weeks ago",
    propertyType: "2 BHK Home",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Send Requirement",
    description: "WhatsApp or call us with your needs",
    icon: "📱",
  },
  {
    step: 2,
    title: "Get Options Instantly",
    description: "We send matching properties fast",
    icon: "⚡",
  },
  {
    step: 3,
    title: "Visit Property",
    description: "We arrange your property visit",
    icon: "🏠",
  },
  {
    step: 4,
    title: "Finalize Quickly",
    description: "Lock the deal with confidence",
    icon: "✅",
  },
];

export const WHY_CHOOSE: WhyChooseItem[] = [
  {
    icon: "⚡",
    title: "Lightning Fast Response",
    description: "We respond within minutes, not hours. Your time matters.",
  },
  {
    icon: "🤝",
    title: "Genuine Deals",
    description: "No fake listings. Every property is real and verified.",
  },
  {
    icon: "📍",
    title: "Local Expertise",
    description: "Born and raised in Jodhpur — we know every locality.",
  },
  {
    icon: "✔️",
    title: "Verified Listings",
    description: "All properties personally checked before listing.",
  },
];
