import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { RefObject } from 'react';

export function CTASection() {
  const { ref, hasIntersected } = useIntersectionObserver() as { ref: RefObject<HTMLDivElement>, hasIntersected: boolean };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center reveal ${hasIntersected ? 'active' : ''}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let's bring your vision to life with our expert design services. Contact us today for a free consultation.
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-outline px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
