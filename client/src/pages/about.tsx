import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { Award, Users, Target, Heart } from 'lucide-react';
import { BackButton } from '@/components/back-button';

const stats = [
	{ number: '200+', label: 'Projects Completed' },
	{ number: '15+', label: 'Years Experience' },
	{ number: '50+', label: 'Happy Clients' },
	{ number: '10+', label: 'Design Awards' },
];

const values = [
	{
		icon: Target,
		title: 'Excellence',
		description:
			'We strive for perfection in every detail, ensuring exceptional quality in all our design solutions.',
	},
	{
		icon: Heart,
		title: 'Passion',
		description:
			'Our love for design drives us to create spaces that truly reflect our clients personalities.',
	},
	{
		icon: Users,
		title: 'Collaboration',
		description:
			'We work closely with clients throughout the process, ensuring their vision becomes reality.',
	},
	{
		icon: Award,
		title: 'Innovation',
		description:
			'We embrace new trends and technologies to deliver cutting-edge interior design solutions.',
	},
];

export default function About() {
	const { ref: heroRef, hasIntersected: heroIntersected } =
		useIntersectionObserver();
	const { ref: storyRef, hasIntersected: storyIntersected } =
		useIntersectionObserver();
	const { ref: valuesRef, hasIntersected: valuesIntersected } =
		useIntersectionObserver();

	useEffect(() => {
		document.title = 'About Us - First Interior | Premium Interior Design Solutions';
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="min-h-screen bg-background dark:bg-background">
			<Navigation />

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
							About First Interior
						</h1>
						<p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							Transforming spaces with passion, creativity, and unmatched expertise
							for over 15 years
						</p>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 bg-card dark:bg-card">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div
								key={stat.label}
								className={`text-center reveal ${heroIntersected ? 'active' : ''}`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="text-4xl md:text-5xl font-bold text-accent dark:text-accent mb-2">
									{stat.number}
								</div>
								<div className="text-sm text-muted-foreground dark:text-muted-foreground uppercase tracking-wide">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Our Story Section */}
			<section className="py-20 bg-background dark:bg-background">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div
							ref={storyRef as React.RefObject<HTMLDivElement>}
							className={`reveal ${storyIntersected ? 'active' : ''}`}
						>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
								Our Story
							</h2>
							<p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6 leading-relaxed">
								Founded in 2009, First Interior began as a small design studio with
								a big vision: to create exceptional interior spaces that enhance
								people's lives. What started as a passion project has grown into
								Kenya's most trusted interior design consultancy.
							</p>
							<p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6 leading-relaxed">
								Our journey has been marked by continuous learning, innovation, and
								an unwavering commitment to excellence. We've had the privilege of
								transforming over 200 spaces, from intimate homes to grand
								commercial establishments.
							</p>
							<p className="text-lg text-muted-foreground dark:text-muted-foreground leading-relaxed">
								Today, we continue to push boundaries, combining timeless design
								principles with contemporary aesthetics to create spaces that are
								both beautiful and functional.
							</p>
						</div>
						<div
							className={`reveal ${storyIntersected ? 'active' : ''}`}
							style={{ animationDelay: '0.3s' }}
						>
							<img
								src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
								alt="Interior design team working on project"
								className="rounded-2xl shadow-2xl w-full h-auto"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-20 bg-card dark:bg-card">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div
						ref={valuesRef as React.RefObject<HTMLDivElement>}
						className={`text-center mb-16 reveal ${valuesIntersected ? 'active' : ''}`}
					>
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
							Our Values
						</h2>
						<p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto">
							The principles that guide everything we do
						</p>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{values.map((value, index) => {
							const Icon = value.icon;
							return (
								<div
									key={value.title}
									className={`text-center reveal ${valuesIntersected ? 'active' : ''}`}
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className="w-16 h-16 bg-accent/10 dark:bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
										<Icon className="w-8 h-8 text-accent" />
									</div>
									<h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary">
										{value.title}
									</h3>
									<p className="text-muted-foreground dark:text-muted-foreground leading-relaxed">
										{value.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-20 gradient-bg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
							Meet Our Team
						</h2>
						<p className="text-xl text-neutral-custom max-w-3xl mx-auto">
							Talented professionals dedicated to bringing your vision to life
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								name: 'Sarah Mitchell',
								role: 'Creative Director',
								image:
									'https://images.unsplash.com/photo-1494790108755-2616b45bb442?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=400',
								bio: 'With over 12 years of experience, Sarah leads our creative vision with passion and expertise.',
							},
							{
								name: 'Michael Chen',
								role: 'Senior Designer',
								image:
									'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=400',
								bio: 'Michael specializes in modern residential design and sustainable interior solutions.',
							},
							{
								name: 'Emily Rodriguez',
								role: 'Project Manager',
								image:
									'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=400',
								bio: 'Emily ensures every project runs smoothly from concept to completion with meticulous attention.',
							},
						].map((member, index) => (
							<div
								key={member.name}
								className={`text-center reveal ${valuesIntersected ? 'active' : ''}`}
								style={{ animationDelay: `${index * 0.2}s` }}
							>
								<img
									src={member.image}
									alt={member.name}
									className="w-64 h-80 object-cover rounded-2xl mx-auto mb-6 shadow-lg"
								/>
								<h3 className="text-2xl font-semibold mb-2 text-primary-custom">
									{member.name}
								</h3>
								<p className="text-accent-custom font-medium mb-4">
									{member.role}
								</p>
								<p className="text-neutral-custom leading-relaxed">
									{member.bio}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}