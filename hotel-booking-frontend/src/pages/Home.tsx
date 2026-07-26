import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";
import Hero from "../components/Hero";
import PageContainer from "../components/PageContainer";
import { StaggerItem, StaggerScope } from "../components/ui/stagger";
import PromoBanner from "../components/PromoBanner";
import StatsCounter from "../components/StatsCounter";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";

/** Match LatestDestinationCard height so footer does not jump while hotels load */
const DEST_SKELETON_COUNT = 3;

const Home = () => {
  const { data: hotels, isLoading } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels(),
  );

  const handleSearch = (_searchData: unknown) => {
    // Search is handled by Hero → SearchContext / navigation
  };

  return (
    <>
      {/* Promo banner — dismissible, above hero */}
      <PromoBanner />

      {/* Hero paints blue bg immediately; its own StaggerItems animate copy/card */}
      <Hero onSearch={handleSearch} />

      {/* Animated stats counter — counts up on scroll */}
      <StatsCounter />

      <PageContainer className="py-6">
        <StaggerScope resetKey="home-destinations">
          <StaggerItem index={0} className="text-center mb-6">
            <h2 className="text-lg md:text-2xl font-medium text-gray-700">
              Latest Destinations
            </h2>
            <p className="text-sm md:text-lg text-gray-600 font-normal">
              Most recent destinations added by our hosts
            </p>
          </StaggerItem>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: DEST_SKELETON_COUNT }, (_, i) => (
                  <div
                    key={`dest-skel-${i}`}
                    className="h-[350px] w-full rounded-2xl bg-gray-100 animate-pulse border border-gray-100"
                    aria-hidden
                  />
                ))
              : hotels?.map((hotel, i) => (
                  <StaggerItem key={hotel._id} index={1 + Math.min(i, 8)}>
                    <LatestDestinationCard hotel={hotel} />
                  </StaggerItem>
                ))}
          </div>
        </StaggerScope>
      </PageContainer>

      {/* Why Choose Us — feature highlights */}
      <WhyChooseUs />

      {/* Testimonials carousel */}
      <TestimonialsSection />

      {/* Newsletter subscription */}
      <NewsletterSection />
    </>
  );
};

export default Home;
