import { useEffect } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  useEffect(() => {
    // Initialize GSAP when component mounts
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-warm-white">
      <LoadingScreen />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
