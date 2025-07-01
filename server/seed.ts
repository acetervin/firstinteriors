import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import dotenv from 'dotenv';

dotenv.config();

const portfolioData = [
	{
		id: 1,
		title: 'Modern Kitchen Design',
		description:
			'Contemporary kitchen with premium finishes and smart storage solutions.',
		image:
			'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
		category: 'Kitchen',
		location: 'Westlands, Nairobi',
		year: '2024',
	},
	{
		id: 2,
		title: 'Master Bedroom Suite',
		description:
			'Luxurious bedroom design with custom furniture and ambient lighting.',
		image:
			'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
		category: 'Bedroom',
		location: 'Karen, Nairobi',
		year: '2023',
	},
	{
		id: 3,
		title: 'Corporate Office',
		description:
			'Professional workspace designed for productivity and collaboration.',
		image:
			'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
		category: 'Office',
		location: 'Upper Hill, Nairobi',
		year: '2022',
	},
	{
		id: 4,
		title: 'Dining Room Elegance',
		description:
			'Sophisticated dining space perfect for entertaining guests.',
		image:
			'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
		category: 'Residential',
		location: 'Runda, Nairobi',
		year: '2021',
	},
	{
		id: 5,
		title: 'Living Room Comfort',
		description:
			'Inviting living space designed for relaxation and family time.',
		image:
			'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
		category: 'Residential',
		location: 'Lavington, Nairobi',
		year: '2020',
	},
	{
		id: 6,
		title: 'Spa-Like Bathroom',
		description:
			'Luxurious bathroom retreat with premium materials and fixtures.',
		image:
			'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400',
		category: 'Bathroom',
		location: 'Kileleshwa, Nairobi',
		year: '2024',
	},
];

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

async function seed() {
  console.log('Seeding database...');

  // Clear existing data
  await db.delete(schema.portfolioItems);

  const itemsToInsert = portfolioData.map(item => ({
    category: item.category,
    image: item.image,
    title: item.title,
    description: item.description,
    location: item.location,
    year: item.year,
  }));

  await db.insert(schema.portfolioItems).values(itemsToInsert);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
