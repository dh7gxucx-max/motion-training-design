import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TopFreelancersSection from "@/components/home/TopFreelancersSection";
import StatsSection from "@/components/home/StatsSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import CTASection from "@/components/home/CTASection";
import RewardsSection from "@/components/home/RewardsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <RewardsSection />
        <StatsSection />
        <HowItWorksSection />
        <TopFreelancersSection />
        <ReviewsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
