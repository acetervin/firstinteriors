import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { RefObject } from 'react';

export function AboutSection() {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();

  return (
    <section id="about" className="py-20 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={ref} className={`reveal ${hasIntersected ? 'active' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-accent">About First Interior</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
              With over a decade of experience in transforming spaces, First Interior has established itself as Kenya's premier interior design consultancy. We specialize in creating bespoke interiors that reflect your personality while maintaining the highest standards of luxury and functionality.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
              Our team of award-winning designers brings international expertise to every project, ensuring that each space tells a unique story through carefully curated elements, premium materials, and innovative design solutions.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">200+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">Years Experience</div>
              </div>
            </div>
          </div>
          <div className={`reveal ${hasIntersected ? 'active' : ''}`} style={{ animationDelay: '0.3s' }}>
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Interior designer working on project plans" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
