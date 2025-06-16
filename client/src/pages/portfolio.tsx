import { useEffect, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Filter, ExternalLink } from 'lucide-react';

const categories = ['All', 'Residential', 'Commercial', 'Kitchen', 'Bedroom', 'Office'];

const portfolioItems = [
  {
    id: 1,
    title: 'Modern Kitchen Design',
    category: 'Kitchen',
    description: 'Contemporary kitchen with premium finishes and smart storage solutions.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Westlands, Nairobi',
    year: '2024',
  },
  {
    id: 2,
    title: 'Master Bedroom Suite',
    category: 'Bedroom',
    description: 'Luxurious bedroom design with custom furniture and ambient lighting.',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Karen, Nairobi',
    year: '2024',
  },
  {
    id: 3,
    title: 'Corporate Office',
    category: 'Office',
    description: 'Professional workspace designed for productivity and collaboration.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Upper Hill, Nairobi',
    year: '2023',
  },
  {
    id: 4,
    title: 'Elegant Dining Room',
    category: 'Residential',
    description: 'Sophisticated dining space perfect for entertaining guests.',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Runda, Nairobi',
    year: '2023',
  },
  {
    id: 5,
    title: 'Contemporary Living Room',
    category: 'Residential',
    description: 'Inviting living space designed for relaxation and family time.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Kileleshwa, Nairobi',
    year: '2023',
  },
  {
    id: 6,
    title: 'Spa-Like Bathroom',
    category: 'Residential',
    description: 'Luxurious bathroom retreat with premium materials and fixtures.',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Lavington, Nairobi',
    year: '2022',
  },
  {
    id: 7,
    title: 'Modern Restaurant Interior',
    category: 'Commercial',
    description: 'Stylish restaurant design that enhances the dining experience.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'CBD, Nairobi',
    year: '2024',
  },
  {
    id: 8,
    title: 'Executive Office Suite',
    category: 'Office',
    description: 'Premium executive office with custom millwork and luxury finishes.',
    image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Westlands, Nairobi',
    year: '2023',
  },
  {
    id: 9,
    title: 'Boutique Hotel Lobby',
    category: 'Commercial',
    description: 'Welcoming hotel lobby design with local cultural elements.',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600',
    location: 'Karen, Nairobi',
    year: '2022',
  },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  const { ref: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver();
  const { ref: portfolioRef, hasIntersected: portfolioIntersected } = useIntersectionObserver();

  useEffect(() => {
    document.title = 'Portfolio - First Interior | Our Best Interior Design Projects';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className={`text-center reveal ${heroIntersected ? 'active' : ''}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">Our Portfolio</h1>
            <p className="text-xl text-neutral-custom max-w-3xl mx-auto leading-relaxed">
              Discover our stunning collection of interior design projects that showcase our expertise and creativity
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 mr-6">
              <Filter className="w-5 h-5 text-neutral-custom" />
              <span className="text-neutral-custom font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent-custom text-white'
                      : 'bg-gray-100 text-neutral-custom hover:bg-accent-custom/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                ref={index === 0 ? portfolioRef : undefined}
                className={`portfolio-item group rounded-2xl overflow-hidden shadow-lg bg-white reveal ${portfolioIntersected ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="text-white p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent-custom text-white text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-primary-custom group-hover:text-accent-custom transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-custom mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-custom">
                    <span>{item.location}</span>
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-custom mb-2">200+</div>
              <div className="text-sm text-neutral-custom uppercase tracking-wide">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-custom mb-2">15+</div>
              <div className="text-sm text-neutral-custom uppercase tracking-wide">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-custom mb-2">50+</div>
              <div className="text-sm text-neutral-custom uppercase tracking-wide">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-custom mb-2">10+</div>
              <div className="text-sm text-neutral-custom uppercase tracking-wide">Design Awards</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}