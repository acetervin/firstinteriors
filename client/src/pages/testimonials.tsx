import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Star, Quote } from 'lucide-react';
import { Link } from 'wouter';
import { BackButton } from '@/components/back-button';

const testimonials = [
	{
		id: 1,
		name: 'Sarah Johnson',
		title: 'Homeowner',
		location: 'Karen, Nairobi',
		image:
			'https://images.unsplash.com/photo-1494790108755-2616b45bb442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200',
		rating: 5,
		text: "First Interior transformed our home beyond our wildest dreams. Their attention to detail and creative vision made our space both beautiful and functional. The team was professional, punctual, and truly understood our lifestyle needs.",
		project: 'Complete Home Renovation',
	},
	{
		id: 2,
		name: 'Michael Chen',
		title: 'CEO',
		location: 'Westlands, Nairobi',
		image:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200',
		rating: 5,
		text: "Working with First Interior on our corporate headquarters was exceptional. They delivered exactly what we envisioned and more. The space now reflects our company's values and has significantly improved our team's productivity and morale.",
		project: 'Corporate Office Design',
	},
	{
		id: 3,
		name: 'Emily Rodriguez',
		title: 'Restaurant Owner',
		location: 'CBD, Nairobi',
		image:
			'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200',
		rating: 5,
		text: "The restaurant design exceeded all expectations. First Interior created an atmosphere that perfectly complements our cuisine and has become a talking point among our customers. Our bookings increased by 40% after the renovation!",
		project: 'Restaurant Interior Design',
	},
	{
		id: 4,
		name: 'David Kimani',
		title: 'Property Developer',
		location: 'Runda, Nairobi',
		image:
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200',
		rating: 5,
		text: "First Interior helped us design model units for our luxury development. Their sophisticated approach and understanding of market preferences resulted in faster sales and premium pricing. Truly professional service.",
		project: 'Luxury Apartment Staging',
	},
	{
		id: 5,
		name: 'Grace Wanjiku',
		title: 'Boutique Owner',
		location: 'Lavington, Nairobi',
		image:
			'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200',
		rating: 5,
		text: "The retail space design created by First Interior has transformed my boutique into a destination. The layout maximizes both aesthetic appeal and functionality, making shopping an experience for my customers.",
		project: 'Retail Space Design',
	},
	{
		id: 6,
		name: 'James Ochieng',
		title: 'Homeowner',
		location: 'Kilimani, Nairobi',
		image:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200',
		rating: 5,
		text: "From concept to completion, First Interior delivered excellence. They worked within our budget and timeline while never compromising on quality. Our new kitchen has become the heart of our home.",
		project: 'Kitchen Renovation',
	},
];

const stats = [
	{ number: '98%', label: 'Client Satisfaction Rate' },
	{ number: '4.9/5', label: 'Average Rating' },
	{ number: '85%', label: 'Repeat Clients' },
	{ number: '200+', label: 'Happy Customers' },
];

export default function Testimonials() {
	const { ref: heroRef, hasIntersected: heroIntersected } = useIntersectionObserver<HTMLDivElement>();
	const { ref: testimonialsRef, hasIntersected: testimonialsIntersected } = useIntersectionObserver<HTMLDivElement>();
	const { ref: statsRef, hasIntersected: statsIntersected } = useIntersectionObserver<HTMLDivElement>();

	useEffect(() => {
		document.title = 'Client Reviews - First Interior | What Our Clients Say';
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-warm-white">
			<Navigation />
			<div className="mt-4 ml-4">
				<BackButton />
			</div>

			{/* Hero Section */}
			<section className="pt-24 pb-20 bg-background dark:bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-6 mt-12 text-left">
						<BackButton />
					</div>
					<div
						ref={heroRef as React.RefObject<HTMLDivElement>}
						className={`text-center reveal ${heroIntersected ? 'active' : ''}`}
					>
						<h1 className="text-5xl md:text-6xl font-bold mb-6 text-accent dark:text-accent">
							Client Testimonials
						</h1>
						<p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Hear what our clients have to say about working with First Interior
						</p>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						{stats.map((stat, index) => (
							<div
								key={stat.label}
								className={`reveal ${statsIntersected ? 'active' : ''}`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="text-4xl md:text-5xl font-bold text-accent-custom mb-2">{stat.number}</div>
								<div className="text-sm text-neutral-custom uppercase tracking-wide">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials Grid */}
			<section className="py-20 gradient-bg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div ref={testimonialsRef} className={`text-center mb-16 reveal ${testimonialsIntersected ? 'active' : ''}`}>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">What Our Clients Say</h2>
						<p className="text-xl text-neutral-custom max-w-3xl mx-auto">
							Real stories from real people who trusted us to transform their spaces
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<div
								key={testimonial.id}
								className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 reveal ${testimonialsIntersected ? 'active' : ''}`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="flex items-center mb-6">
									<Quote className="w-8 h-8 text-accent-custom/30 mr-3" />
									<div className="flex text-accent-custom">
										{[...Array(testimonial.rating)].map((_, i) => (
											<Star key={i} size={16} fill="currentColor" />
										))}
									</div>
								</div>

								<p className="text-neutral-custom mb-6 italic leading-relaxed">
									"{testimonial.text}"
								</p>

								<div className="border-t pt-6">
									<div className="flex items-center">
										<img
											src={testimonial.image}
											alt={`${testimonial.name} testimonial`}
											className="w-12 h-12 rounded-full mr-4 object-cover"
										/>
										<div className="flex-1">
											<div className="font-semibold text-primary-custom">{testimonial.name}</div>
											<div className="text-sm text-neutral-custom">{testimonial.title}</div>
											<div className="text-xs text-neutral-custom">{testimonial.location}</div>
										</div>
									</div>
									<div className="mt-4 pt-4 border-t border-gray-100">
										<span className="text-sm font-medium text-accent-custom">Project: {testimonial.project}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Video Testimonials Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Video Testimonials</h2>
						<p className="text-xl text-neutral-custom max-w-3xl mx-auto">
							Watch our clients share their First Interior experience
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								name: 'Sarah & Mark Johnson',
								project: 'Home Renovation',
								thumbnail:
									'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
							},
							{
								name: 'Michael Chen',
								project: 'Office Design',
								thumbnail:
									'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
							},
							{
								name: 'Emily Rodriguez',
								project: 'Restaurant Design',
								thumbnail:
									'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
							},
						].map((video, index) => (
							<div
								key={video.name}
								className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
							>
								<img
									src={video.thumbnail}
									alt={`${video.name} video testimonial`}
									className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
									<div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
										<div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
									</div>
								</div>
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
									<h3 className="text-white font-semibold mb-1">{video.name}</h3>
									<p className="text-white/80 text-sm">{video.project}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary-custom text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join Our Happy Clients?</h2>
					<p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
						Experience the First Interior difference and create your own success story
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