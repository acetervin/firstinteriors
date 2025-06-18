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

      {/* About Preview Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Why Choose First Interior?</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With over 15 years of experience transforming spaces across Kenya, we've established ourselves as the premier interior design consultancy. Our team combines international expertise with local understanding to create spaces that truly reflect your vision.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
              <Link href="/about">
                <button className="text-accent hover:text-accent/80 font-semibold flex items-center group">
                  Learn More About Us
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Interior design team working" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Our Expertise</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From residential homes to commercial spaces, we deliver comprehensive design solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Residential Design",
                description: "Transform your home into a sanctuary that reflects your personality and lifestyle.",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Commercial Spaces", 
                description: "Create inspiring work environments that boost productivity and reflect your brand.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              },
              {
                title: "Consultation Services",
                description: "Expert advice and guidance for all your interior design needs and projects.",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
              }
            ].map((service, index) => (
              <div key={service.title} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover some of our most stunning interior design transformations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Modern Kitchen Design",
                category: "Kitchen",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              },
              {
                title: "Luxury Bedroom Suite", 
                category: "Bedroom",
                image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              },
              {
                title: "Executive Office",
                category: "Commercial",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              }
            ].map((project, index) => (
              <div key={project.title} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center justify-center h-full">
                      <span className="text-white font-semibold">View Project</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                name: "Sarah Johnson",
                role: "Homeowner, Karen",
                text: "First Interior transformed our home beyond our wildest dreams. Their attention to detail and creative vision made our space both beautiful and functional.",
                image: "https://images.unsplash.com/photo-1494790108755-2616b45bb442?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
              },
              {
                name: "Michael Chen", 
                role: "CEO, TechCorp",
                text: "The team's professionalism and expertise were evident throughout the project. They delivered exactly what we envisioned and more.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
              }
            ].map((testimonial, index) => (
              <div key={testimonial.name} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/testimonials">
              <button className="text-accent hover:text-accent/80 font-semibold flex items-center mx-auto group">
                Read More Reviews
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Let's bring your vision to life with our expert design services. Explore our portfolio or start your project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/portfolio">
              <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                View Our Portfolio
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 w-full sm:w-auto">
                Start Your Project
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
