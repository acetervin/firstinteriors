import { useEffect } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ChevronDown, ArrowRight, Home as HomeIcon, Building, Users, Star, Phone, Award } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const { ref: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver();
  const { ref: featuresRef, hasIntersected: featuresIntersected } = useIntersectionObserver();
  const { ref: statsRef, hasIntersected: statsIntersected } = useIntersectionObserver();

  useEffect(() => {
    document.title = 'First Interior - Premium Interior Design Solutions in Kenya';
    
    // Initialize GSAP when component mounts
    if (typeof window !== 'undefined' && window.gsap) {
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
          element.style.transform = `translateY(${yPos}px)`;
        });
      };

      window.addEventListener('scroll', updateParallax, { passive: true });

      return () => {
        window.removeEventListener('scroll', updateParallax);
      };
    }

    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: HomeIcon,
      title: 'Residential Design',
      description: 'Transform your home into a sanctuary that reflects your personality and lifestyle.',
      link: '/services'
    },
    {
      icon: Building,
      title: 'Commercial Spaces',
      description: 'Create inspiring work environments that boost productivity and reflect your brand.',
      link: '/services'
    },
    {
      icon: Users,
      title: 'Expert Consultation',
      description: 'Get professional advice from our team of experienced interior designers.',
      link: '/contact'
    }
  ];

  const stats = [
    { number: '200+', label: 'Projects Completed', icon: Award },
    { number: '15+', label: 'Years Experience', icon: Star },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '98%', label: 'Satisfaction Rate', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <LoadingScreen />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
            <span className="text-accent-custom">Creating Dreams</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 font-light opacity-0">
            Premium interior design solutions that blend luxury with functionality for over 15 years
          </p>
          <div className="hero-buttons space-x-4 opacity-0">
            <Link href="/portfolio">
              <button className="btn-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Explore Our Work
              </button>
            </Link>
            <Link href="/contact">
              <button className="btn-outline px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Get Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-white hover:text-accent-custom transition-colors duration-300"
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuresRef} className={`text-center mb-16 reveal ${featuresIntersected ? 'active' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">What We Do Best</h2>
            <p className="text-xl text-neutral-custom max-w-3xl mx-auto">
              Comprehensive interior design solutions tailored to your unique needs and vision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} href={feature.link}>
                  <div
                    className={`service-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center group reveal ${featuresIntersected ? 'active' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-accent-custom/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-accent-custom" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary-custom group-hover:text-accent-custom transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-custom leading-relaxed mb-6">{feature.description}</p>
                    <div className="flex items-center justify-center text-accent-custom group-hover:translate-x-2 transition-transform">
                      <span className="mr-2 text-sm font-medium">Learn More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`reveal ${statsIntersected ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-accent-custom/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent-custom" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-accent-custom mb-2">{stat.number}</div>
                  <div className="text-sm text-neutral-custom uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Explore More</h2>
            <p className="text-xl text-neutral-custom max-w-3xl mx-auto">
              Discover our full range of services and see why clients choose First Interior
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'About Us', description: 'Learn about our story and values', link: '/about', color: 'bg-blue-50 hover:bg-blue-100' },
              { title: 'Our Services', description: 'Explore our design solutions', link: '/services', color: 'bg-green-50 hover:bg-green-100' },
              { title: 'Portfolio', description: 'View our stunning projects', link: '/portfolio', color: 'bg-purple-50 hover:bg-purple-100' },
              { title: 'Client Reviews', description: 'Read what clients say', link: '/testimonials', color: 'bg-orange-50 hover:bg-orange-100' },
            ].map((item, index) => (
              <Link key={item.title} href={item.link}>
                <div className={`${item.color} rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
                  <h3 className="text-lg font-semibold mb-2 text-primary-custom">{item.title}</h3>
                  <p className="text-neutral-custom text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-custom text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let's bring your vision to life with our expert design services. Contact us today for a free consultation.
          </p>
          <div className="space-x-4">
            <Link href="/contact">
              <button className="btn-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Start Your Project
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="btn-outline px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                View Our Work
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
