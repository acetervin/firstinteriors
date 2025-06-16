import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Homeowner, Karen',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b45bb442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    text: "First Interior transformed our home beyond our wildest dreams. Their attention to detail and creative vision made our space both beautiful and functional.",
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'CEO, TechCorp',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    text: "The team's professionalism and expertise were evident throughout the project. They delivered exactly what we envisioned and more.",
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Restaurant Owner',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100',
    rating: 5,
    text: "Working with First Interior was a pleasure from start to finish. They understood our needs perfectly and created a space we absolutely love.",
  },
];

export function TestimonialsSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`text-center mb-16 reveal ${hasIntersected ? 'active' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Client Testimonials</h2>
          <p className="text-xl text-neutral-custom max-w-3xl mx-auto">
            Hear from our satisfied clients about their experience with First Interior
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`gradient-bg rounded-2xl p-8 shadow-lg reveal ${hasIntersected ? 'active' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-accent-custom">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-neutral-custom mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.name} testimonial`} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-semibold text-primary-custom">{testimonial.name}</div>
                  <div className="text-sm text-neutral-custom">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
