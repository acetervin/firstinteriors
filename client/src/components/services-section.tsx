import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Home, Building, Layout, Heart, Settings, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Complete home makeovers, room redesigns, and space optimization for modern living.',
  },
  {
    icon: Building,
    title: 'Commercial Spaces',
    description: 'Office interiors, retail spaces, and hospitality design that enhance business success.',
  },
  {
    icon: Layout,
    title: 'Space Planning',
    description: 'Strategic layout design and furniture arrangement for optimal functionality and flow.',
  },
  {
    icon: Heart,
    title: 'Design Consultation',
    description: 'Expert advice on color schemes, materials, and design direction for your project.',
  },
  {
    icon: Settings,
    title: 'Project Management',
    description: 'End-to-end project coordination from concept to completion with timeline management.',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Design',
    description: 'Specialized lighting solutions that enhance ambiance and functionality in every space.',
  },
];

export function ServicesSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 reveal ${hasIntersected ? 'active' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Our Services</h2>
          <p className="text-xl text-neutral-custom max-w-3xl mx-auto">
            Comprehensive interior design solutions tailored to your lifestyle and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`service-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 reveal ${hasIntersected ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-accent-custom/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-accent-custom" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary-custom">{service.title}</h3>
                <p className="text-neutral-custom leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
