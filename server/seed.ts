import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import dotenv from 'dotenv';

dotenv.config();

const categories = [
	'Bathrooms',
	'Doors & Door Frames',
	'Floors & Ceilings',
	'Gazebo',
	'Gypsum',
	'Kitchens',
	'Office Desks',
	'Painting',
	'Stairs',
	'Wardrobes',
];

let id = 1;
const portfolioData = categories.flatMap((category) =>
	Array.from({ length: 30 }, (_, i) => ({
		id: id++,
		title: `${category} Project ${i + 1}`,
		description: `Description for ${category} project ${i + 1}.`,
		image:
			'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
		category,
		location: 'Nairobi, Kenya',
		year: `${2020 + (i % 5)}`,
	}))
);

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

	const itemsToInsert = portfolioData.map((item) => ({
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
