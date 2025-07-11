import { useEffect } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { ChevronDown, ArrowRight, Home as HomeIcon, Building, Users, Star, Phone, Award } from 'lucide-react';
import { Link } from 'wouter';
import clsx from 'clsx';
import { BackButton } from '@/components/back-button';

export default function Home() {
  const { ref: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver<HTMLDivElement>();
  const { ref: featuresRef, hasIntersected: featuresIntersected } = useIntersectionObserver<HTMLDivElement>();
  const { ref: statsRef, hasIntersected: statsIntersected } = useIntersectionObserver<HTMLDivElement>();

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
          const el = element as HTMLElement;
          const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
          const yPos = -(scrolled * speed);
          el.style.transform = `translateY(${yPos}px)`;
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
    },
    {
      icon: Star,
      title: '3D Visualization',
      description: 'Experience your future space with immersive 3D renderings and virtual walkthroughs.',
      link: '/services'
    },
    {
      icon: Phone,
      title: 'Project Management',
      description: 'Seamless coordination from concept to completion, ensuring every detail is perfect.',
      link: '/services'
    },
    {
      icon: Award,
      title: 'Custom Furniture Design',
      description: 'Bespoke furniture solutions tailored to your space and style preferences.',
      link: '/services'
    }
  ];

  const stats = [
    { number: '200+', label: 'Projects Completed', icon: Award },
    { number: '15+', label: 'Years Experience', icon: Star },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '98%', label: 'Satisfaction Rate', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background transition-colors duration-500">
      <LoadingScreen />
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute left-0 top-0 z-30 mt-12 ml-4">
          <BackButton />
        </div>
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-accent/30 via-primary/10 to-background/80 blur-2xl" />
        {/* Parallax Image Layer */}
        <div 
          className="parallax-layer absolute inset-0 z-0"
          data-speed="0.5"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Remove backgroundAttachment: 'fixed' to avoid stacking issues on some browsers
            opacity: 0.6,
            zIndex: 0,
          }}
        />
        {/* Glassmorphism Overlay */}
        {/* <div className="absolute inset-0 bg-background/60 dark:bg-background/80 backdrop-blur-md z-10" /> */}
        {/* Hero Content */}
        <div ref={heroRef} className="relative z-30 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
          <p className="hero-subtitle text-2xl md:text-3xl mb-10 font-light text-foreground/80">
            Premium interior design solutions that blend luxury with functionality for over 15 years
          </p>
          {/* NEW: Hero Badge/USP */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="inline-block bg-accent/10 text-accent font-semibold px-6 py-2 rounded-full text-lg tracking-wide shadow-sm border border-accent/20">
              Kenya’s #1 Award-Winning Interior Design Studio
            </span>
            <span className="inline-block text-muted-foreground text-base">Trusted by 200+ clients • 15+ years of excellence</span>
          </div>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/portfolio">
              <button className="bg-accent hover:bg-accent/90 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
                Explore Our Work
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all duration-300">
                Get Consultation
              </button>
            </Link>
          </div>
        </div>
        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float z-30">
          <button 
            onClick={() => scrollToSection('features')}
            className="bg-background/80 dark:bg-background/90 shadow-lg rounded-full p-3 text-accent hover:bg-accent hover:text-white transition-colors duration-300 border border-accent/20 backdrop-blur-md"
          >
            <ChevronDown size={28} />
          </button>
        </div>
        {/* Gradient Fade Transition to Next Section 
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-20"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--background) 100%)"
          }}
        />*/}
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 bg-[#F5FFFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={featuresRef} className={clsx('text-center mb-20 reveal', featuresIntersected && 'active')}>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-accent">What We Do Best</h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive interior design solutions tailored to your unique needs and vision
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white border border-accent/20 rounded-2xl shadow-lg p-6 sm:p-10 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#FFF0EB] hover:border-accent hover:shadow-2xl cursor-pointer">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 rounded-full bg-[#FFF7F3] transition-colors duration-300 group-hover:bg-accent/10">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-1 sm:mb-2">{feature.description}</p>
                </div>
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
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background dark:bg-background transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">Why Choose First Interior?</h2>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">Our Expertise</h2>
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
              <div
                key={service.title}
                className="service-card group relative flex flex-col items-stretch overflow-hidden cursor-pointer"
                style={{ minHeight: '370px' }}
              >
                {/* Card Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-2xl rounded-b-2xl mb-0 transition-transform duration-500 group-hover:scale-105"
                />
                {/* Card Content */}
                <div className="flex-1 flex flex-col justify-between p-8 pt-6">
                  <h3 className="card-title text-[1.35rem] font-bold mb-2 text-gray-900 group-hover:text-accent transition-colors">{service.title}</h3>
                  <p className="card-desc text-[1.05rem] text-[#555] mb-0 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-left">
            <Link href="/services">
              <button className="text-accent hover:text-accent/80 font-semibold flex items-center group bg-transparent px-0 py-0 text-lg transition-colors duration-300">
                View All Services
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 bg-[#F5FFFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">Featured Projects</h2>
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
                <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white border border-accent/20">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 opacity-90"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      {project.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mt-4 group-hover:text-accent transition-colors text-gray-900">
                  {project.title}
                </h3>
              </div>
            ))}
          </div>

          <div className="text-left">
            <Link href="/portfolio">
              <button className="text-accent hover:text-accent/80 font-semibold flex items-center group bg-transparent px-0 py-0 text-lg transition-colors duration-300">
                View All Projects
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">What Our Clients Say</h2>
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
              <div key={testimonial.name} className="bg-white p-8 rounded-2xl shadow-lg">
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
      <section className="py-20 bg-[#F5FFFA] flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto px-4">
          <div className="rounded-2xl shadow-2xl bg-white/80 p-8 text-center border border-accent/10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary drop-shadow-lg">Ready to Transform Your Space?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto opacity-90 text-muted-foreground">
              Let's bring your vision to life with our expert design services. Explore our portfolio or start your project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/portfolio">
                <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-bold text-base shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  View Our Portfolio
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 rounded-full font-bold text-base shadow-xl transition-all duration-300 w-full sm:w-auto bg-white">
                  Start Your Project
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}