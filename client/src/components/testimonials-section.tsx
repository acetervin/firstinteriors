import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { RefObject } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
	{
		id: 1,
		name: 'Sarah Johnson',
		title: 'Homeowner, Karen',
		image:
			'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
		rating: 5,
		text: 'First Interior transformed our home beyond our wildest dreams. Their attention to detail and creative vision made our space both beautiful and functional.',
	},
	{
		id: 2,
		name: 'Michael Chen',
		title: 'CEO, TechCorp',
		image:
			'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
		rating: 5,
		text: 'The team\'s professionalism and expertise were evident throughout the project. They delivered exactly what we envisioned and more.',
	},
	{
		id: 3,
		name: 'Emily Rodriguez',
		title: 'Restaurant Owner',
		image:
			'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
		rating: 5,
		text: 'Working with First Interior was a pleasure from start to finish. They understood our needs perfectly and created a space we absolutely love.',
	},
];

export function TestimonialsSection() {
	const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();

	return (
		<section
			id="testimonials"
			className="py-20 bg-background transition-colors duration-300"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					ref={ref}
					className={`text-center mb-16 reveal ${
						hasIntersected ? 'active' : ''
					}`}
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-accent">
						What Our Clients Say
					</h2>
					<p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
						Hear from our satisfied clients about their experience with First
						Interior
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id}
							className={`gradient-bg rounded-2xl p-8 shadow-lg reveal ${
								hasIntersected ? 'active' : ''
							}`}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div className="flex items-center mb-4">
								<div className="flex text-accent">
									{[...Array(testimonial.rating)].map((_, i) => (
										<Star key={i} size={16} fill="currentColor" />
									))}
								</div>
							</div>
							<p className="text-sm sm:text-base text-muted-foreground mb-6 italic leading-relaxed">
								"{testimonial.text}"
							</p>
							<div className="flex items-center">
								<img
									src={testimonial.image}
									alt={`${testimonial.name} testimonial`}
									className="w-12 h-12 rounded-full mr-4 object-cover"
								/>
								<div>
									<div className="font-semibold text-primary">
										{testimonial.name}
									</div>
									<div className="text-sm text-muted-foreground">
										{testimonial.title}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
