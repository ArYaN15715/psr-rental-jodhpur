import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AREAS, BUDGET_RANGES } from "@/lib/constants";
import { buildSearchWhatsAppUrl } from "@/lib/utils";
import type { PropertyType } from "@/types";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Tab {
  id: PropertyType;
  label: string;
  icon: string;
  types: string[];
}

const TABS: Tab[] = [
  {
    id: "home",
    label: "Rent Home",
    icon: "🏠",
    types: ["Any Type", "1 BHK", "2 BHK", "3 BHK", "Studio"],
  },
  {
    id: "pg",
    label: "PG / Room",
    icon: "🛏️",
    types: ["Any Type", "PG (Sharing)", "PG (Private)", "Single Room"],
  },
  {
    id: "office",
    label: "Office",
    icon: "🏢",
    types: ["Any Type", "Small Office", "Large Office", "Co-working"],
  },
  {
    id: "shop",
    label: "Shop",
    icon: "🏪",
    types: ["Any Type", "Ground Floor", "First Floor", "Corner Shop"],
  },
];

export function SearchSection() {
  const [activeTab, setActiveTab] = useState<PropertyType>("home");
  const [area, setArea] = useState("All Areas");
  const [budget, setBudget] = useState("Any Budget");
  const [propertySubType, setPropertySubType] = useState("Any Type");

  const currentTab = TABS.find((t) => t.id === activeTab)!;

  const handleTabChange = (tabId: PropertyType) => {
    setActiveTab(tabId);
    setPropertySubType("Any Type");
  };

  const handleFindNow = () => {
    const typeLabel =
      propertySubType !== "Any Type"
        ? `${currentTab.label} - ${propertySubType}`
        : currentTab.label;
    const url = buildSearchWhatsAppUrl(typeLabel, area, budget);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="search"
      className="relative z-10 px-4 -mt-8 pb-4"
      data-ocid="search.section"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="bg-card rounded-2xl shadow-[0_8px_40px_rgba(11,60,93,0.18)] border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              Find Your Perfect Rental
            </h2>
            <div className="mt-1 h-1 w-14 rounded-full gradient-accent" />
          </div>

          {/* Tab Bar */}
          <div className="px-5 pt-1 pb-3">
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              data-ocid="search.tab"
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabChange(tab.id)}
                    data-ocid={`search.tab.${tab.id}`}
                    whileTap={{ scale: 0.96 }}
                    className={[
                      "relative flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground",
                    ].join(" ")}
                    style={isActive ? { background: "var(--psr-accent)" } : {}}
                  >
                    <span className="text-base leading-none">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "var(--psr-accent)", zIndex: -1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="px-5 pb-5"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Area */}
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Area
                  </span>
                  <Select value={area} onValueChange={setArea}>
                    <SelectTrigger
                      className="w-full bg-background border-input hover-glow transition-fast"
                      data-ocid="search.area.select"
                      aria-label="Select area"
                    >
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {AREAS.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget */}
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Budget
                  </span>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger
                      className="w-full bg-background border-input hover-glow transition-fast"
                      data-ocid="search.budget.select"
                      aria-label="Select budget"
                    >
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_RANGES.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    Type
                  </span>
                  <Select
                    value={propertySubType}
                    onValueChange={setPropertySubType}
                  >
                    <SelectTrigger
                      className="w-full bg-background border-input hover-glow transition-fast"
                      data-ocid="search.type.select"
                      aria-label="Select property type"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentTab.types.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* CTA */}
                <div className="sm:self-end">
                  <span
                    className="hidden sm:block text-xs font-semibold text-transparent mb-1.5 uppercase tracking-wide select-none"
                    aria-hidden="true"
                  >
                    &nbsp;
                  </span>
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={handleFindNow}
                      data-ocid="search.find_now.primary_button"
                      className="w-full sm:w-auto px-7 py-5 font-bold text-base text-white shadow-md hover:shadow-lg transition-smooth rounded-xl"
                      style={{ background: "var(--psr-accent)" }}
                    >
                      <Search className="w-4 h-4 mr-2 flex-shrink-0" />
                      Find Now
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
