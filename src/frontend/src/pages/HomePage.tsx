import { CTASection } from "@/components/sections/CTASection";
import { CategorySection } from "@/components/sections/CategorySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MapSection } from "@/components/sections/MapSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PropertyFeed } from "@/components/sections/PropertyFeed";
import { SearchSection } from "@/components/sections/SearchSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* 1. Hero — full viewport */}
      <HeroSection />

      {/* 2. Search — overlaps hero on desktop */}
      <div className="-mt-8 md:-mt-16 relative z-20">
        <SearchSection />
      </div>

      {/* 3. Categories */}
      <CategorySection />

      {/* 4. Property Feed */}
      <PropertyFeed />

      {/* 5. Stats / counters */}
      <StatsSection />

      {/* 6. Why Choose Us */}
      <WhyChooseSection />

      {/* 7. Process steps */}
      <ProcessSection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. Google Maps */}
      <MapSection />

      {/* 10. Final CTA */}
      <CTASection />
    </div>
  );
}
