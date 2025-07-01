import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { PortfolioItem } from '@/types/portfolio';
import { Skeleton } from '@/components/ui/skeleton';

async function fetchPortfolioItems(): Promise<PortfolioItem[]> {
	const response = await fetch('/api/portfolio');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
}

export function PortfolioSection() {
	const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>();
	const { data: portfolioItems = [], isLoading, isError } = useQuery({
		queryKey: ['portfolioItems'],
		queryFn: fetchPortfolioItems,
	});

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
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-accent">
						Featured Projects
					</h2>
					<p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
						Explore our portfolio of stunning interiors that showcase our
						commitment to excellence
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{isLoading ? (
						Array.from({ length: 6 }).map((_, index) => (
							<Skeleton key={index} className="h-96 w-full" />
						))
					) : isError ? (
						<div className="text-center text-red-500 col-span-full">Error loading portfolio items.</div>
					) : (
						portfolioItems.slice(0, 6).map((item, index) => (
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
									<h3 className="text-lg sm:text-xl font-semibold mb-2 text-primary">
										{item.title}
									</h3>
									<p className="text-muted-foreground">
										{item.description}
									</p>
								</div>
							</div>
						))
					)}
				</div>

				<div
					className={`text-center mt-12 reveal ${
						hasIntersected ? 'active' : ''
					}`}
				>
					<button className="btn-primary px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
						View All Projects
					</button>
				</div>
			</div>
		</section>
	);
}
