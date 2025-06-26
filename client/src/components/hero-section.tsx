import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

export function HeroSection() {
  const { ref, hasIntersected } = useIntersectionObserver();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapAvailable = typeof window !== 'undefined' && window.gsap;
    if (gsapAvailable) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      // Hero animations
      const tl = window.gsap.timeline({ delay: 1.2 });
      
      tl.from('.hero-title', {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
      })
      .from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
      }, '-=0.7')
      .from('.hero-buttons', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      }, '-=0.5');

      // Parallax effect
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        
        parallaxElements.forEach((element) => {
          const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
          const yPos = -(scrolled * speed);
          (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
        });
      };

      window.addEventListener('scroll', updateParallax, { passive: true });

      return () => {
        window.removeEventListener('scroll', updateParallax);
      };
    } else {
      // Fallback: ensure elements are visible if GSAP is not loaded
      const showElements = ['.hero-title', '.hero-subtitle', '.hero-buttons'];
      showElements.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'none';
        });
      });
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="parallax-layer absolute inset-0 z-0"
        data-speed="0.5"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Hero Content */}
      <div ref={heroRef} className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 opacity-0">
          Transforming Spaces,<br />
          <span className="text-accent">Creating Dreams</span>
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-8 font-light opacity-0">
          Premium interior design solutions that blend luxury with functionality
        </p>
        <div className="hero-buttons space-x-4 opacity-0">
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="btn-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Work
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="btn-outline px-8 py-4 rounded-lg font-semibold transition-all duration-300"
          >
            Get Consultation
          </button>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <button 
          onClick={() => scrollToSection('about')}
          className="text-white hover:text-accent transition-colors duration-300"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
}
