import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Home, Building, Layout, Heart, Settings, Lightbulb, Palette, Ruler, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import { BackButton } from '@/components/back-button';

const mainServices = [
	{
		icon: Home,
		title: 'Residential Design',
		description:
			'Complete home makeovers, room redesigns, and space optimization for modern living.',
		features: [
			'Living room design',
			'Bedroom suites',
			'Kitchen renovation',
			'Bathroom design',
			'Home office setup',
		],
		price: 'From $2,500',
	},
	{
		icon: Building,
		title: 'Commercial Spaces',
		description:
			'Office interiors, retail spaces, and hospitality design that enhance business success.',
		features: [
			'Office layouts',
			'Retail design',
			'Restaurant interiors',
			'Hotel lobbies',
			'Co-working spaces',
		],
		price: 'From $5,000',
	},
	{
		icon: Layout,
		title: 'Space Planning',
		description:
			'Strategic layout design and furniture arrangement for optimal functionality and flow.',
		features: [
			'Floor plan design',
			'Furniture placement',
			'Traffic flow optimization',
			'3D visualization',
			'CAD drawings',
		],
		price: 'From $800',
	},
];

const additionalServices = [
	{
		icon: Heart,
		title: 'Design Consultation',
		description:
			'Expert advice on color schemes, materials, and design direction for your project.',
	},
	{
		icon: Settings,
		title: 'Project Management',
		description:
			'End-to-end project coordination from concept to completion with timeline management.',
	},
	{
		icon: Lightbulb,
		title: 'Lighting Design',
		description:
			'Specialized lighting solutions that enhance ambiance and functionality in every space.',
	},
	{
		icon: Palette,
		title: 'Color Consultation',
		description:
			'Professional color selection and coordination for harmonious interior schemes.',
	},
	{
		icon: Ruler,
		title: 'Custom Furniture',
		description:
			'Bespoke furniture design and manufacturing tailored to your specific needs.',
	},
	{
		icon: ShoppingBag,
		title: 'Procurement Services',
		description:
			'Sourcing and purchasing of furniture, fixtures, and decorative elements.',
	},
];

const process = [
	{
		step: '01',
		title: 'Initial Consultation',
		description:
			'We meet to understand your vision, requirements, and budget for the project.',
	},
	{
		step: '02',
		title: 'Design Development',
		description:
			'Our team creates detailed design concepts and 3D visualizations for your approval.',
	},
	{
		step: '03',
		title: 'Material Selection',
		description:
			'We help you choose the perfect materials, colors, and finishes for your space.',
	},
	{
		step: '04',
		title: 'Implementation',
		description:
			'Our skilled craftsmen bring the design to life with precision and attention to detail.',
	},
];

export default function Services() {
	const {
		ref: heroRef,
		hasIntersected: heroIntersected,
	} = useIntersectionObserver();
	const {
		ref: servicesRef,
		hasIntersected: servicesIntersected,
	} = useIntersectionObserver();
	const {
		ref: additionalRef,
		hasIntersected: additionalIntersected,
	} = useIntersectionObserver();
	const {
		ref: processRef,
		hasIntersected: processIntersected,
	} = useIntersectionObserver();

	useEffect(() => {
		document.title = 'Our Services - First Interior | Interior Design Solutions';
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-warm-white">
			<Navigation />
			<div className="mt-4 ml-4">
				<BackButton />
			</div>

			{/* Hero Section */}
			<section className="pt-24 pb-20 bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="mb-6 mt-12 text-left">
						<BackButton />
					</div>
					<div
						ref={heroRef as React.RefObject<HTMLDivElement>}
						className={`text-center reveal ${
							heroIntersected ? 'active' : ''
						}`}
					>
						<h1 className="text-5xl md:text-6xl font-bold mb-6 text-accent">
							Our Services
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Discover our full range of interior design services for residential and
							commercial spaces
						</p>
					</div>
				</div>
			</section>

			{/* Main Services */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div
						ref={servicesRef as React.RefObject<HTMLDivElement>}
						className={`text-center mb-16 reveal ${
							servicesIntersected ? 'active' : ''
						}`}
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">
							Core Services
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Our flagship services designed to transform your space completely
						</p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8">
						{mainServices.map((service, index) => {
							const Icon = service.icon ?? (() => null);
							return (
								<div
									key={service.title}
									className={`service-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 reveal ${
										servicesIntersected ? 'active' : ''
									}`}
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
										{Icon && <Icon className="w-8 h-8 text-accent" />}
									</div>
									<h3 className="text-2xl font-semibold mb-4 text-primary">
										{service.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed mb-6">
										{service.description}
									</p>

									<div className="mb-6">
										<h4 className="font-semibold text-primary mb-3">
											What's Included:
										</h4>
										<ul className="space-y-2">
											{service.features.map((feature, idx) => (
												<li
													key={idx}
													className="flex items-center text-sm text-muted-foreground"
												>
													<div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
													{feature}
												</li>
											))}
										</ul>
									</div>

									<div className="border-t pt-6">
										<div className="flex items-center justify-between">
											<span className="text-2xl font-bold text-accent">
												{service.price}
											</span>
											<Link href="/contact">
												<button className="btn-primary px-6 py-2 rounded-lg font-semibold text-sm">
													Get Quote
												</button>
											</Link>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Additional Services */}
			<section className="py-20 gradient-bg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div
						ref={additionalRef as React.RefObject<HTMLDivElement>}
						className={`text-center mb-16 reveal ${
							additionalIntersected ? 'active' : ''
						}`}
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">
							Additional Services
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							Specialized services to complement your main design project
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{additionalServices.map((service, index) => {
							const Icon = service.icon ?? (() => null);
							return (
								<div
									key={service.title}
									className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 reveal ${
										additionalIntersected ? 'active' : ''
									}`}
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
										{Icon && <Icon className="w-6 h-6 text-accent" />}
									</div>
									<h3 className="text-xl font-semibold mb-3 text-primary">
										{service.title}
									</h3>
									<p className="text-muted-foreground leading-relaxed">
										{service.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div
						ref={processRef as React.RefObject<HTMLDivElement>}
						className={`text-center mb-16 reveal ${
							processIntersected ? 'active' : ''
						}`}
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-accent">
							Our Process
						</h2>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
							A structured approach that ensures exceptional results every time
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{process.map((step, index) => (
							<div
								key={step.step}
								className={`text-center reveal ${
									processIntersected ? 'active' : ''
								}`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
									{step.step}
								</div>
								<h3 className="text-xl font-semibold mb-4 text-primary">
									{step.title}
								</h3>
								<p className="text-muted-foreground leading-relaxed">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-primary-custom text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">
						Ready to Get Started?
					</h2>
					<p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
						Let's discuss your project and create a custom solution that fits your
						needs and budget.
					</p>
					<div className="space-x-4">
						<Link href="/contact">
							<button className="btn-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
								Get Free Consultation
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