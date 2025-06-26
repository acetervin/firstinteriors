import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const portfolioItems = [
	{
		id: 1,
		title: 'Modern Kitchen Design',
		description:
			'Contemporary kitchen with premium finishes and smart storage solutions.',
		image:
			'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
	},
	{
		id: 2,
		title: 'Master Bedroom Suite',
		description:
			'Luxurious bedroom design with custom furniture and ambient lighting.',
		image:
			'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
	},
	{
		id: 3,
		title: 'Corporate Office',
		description:
			'Professional workspace designed for productivity and collaboration.',
		image:
			'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
	},
	{
		id: 4,
		title: 'Dining Room Elegance',
		description:
			'Sophisticated dining space perfect for entertaining guests.',
		image:
			'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
	},
	{
		id: 5,
		title: 'Living Room Comfort',
		description:
			'Inviting living space designed for relaxation and family time.',
		image:
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
	},
	{
		id: 6,
		title: 'Spa-Like Bathroom',
		description:
			'Luxurious bathroom retreat with premium materials and fixtures.',
		image:
			'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
	},
];

export function PortfolioSection() {
	const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();

	return (
		<section
			id="portfolio"
			className="py-20 bg-background transition-colors duration-300"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					ref={ref}
					className={`text-center mb-16 reveal ${
						hasIntersected ? 'active' : ''
					}`}
				>
					<h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">
						Featured Projects
					</h2>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Explore our portfolio of stunning interiors that showcase our
						commitment to excellence
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{portfolioItems.map((item, index) => (
						<div
							key={item.id}
							className={`portfolio-item rounded-2xl overflow-hidden shadow-lg reveal ${
								hasIntersected ? 'active' : ''
							}`}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<img
								src={item.image}
								alt={item.title}
								className="w-full h-64 object-cover"
							/>
							<div className="p-6 bg-background">
								<h3 className="text-xl font-semibold mb-2 text-primary">
									{item.title}
								</h3>
								<p className="text-muted-foreground">
									{item.description}
								</p>
							</div>
						</div>
					))}
				</div>

				<div
					className={`text-center mt-12 reveal ${
						hasIntersected ? 'active' : ''
					}`}
				>
					<button className="btn-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
						View All Projects
					</button>
				</div>
			</div>
		</section>
	);
}
