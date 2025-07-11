import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import dotenv from 'dotenv';

dotenv.config();

const kitchenImages = [
  'https://i.postimg.cc/nr30pYjM/2000-61d493ec4df8a-750x499-jpg.jpg',
  'https://i.postimg.cc/MHnjfy3n/2000-61d49428b0934-750x499-jpg.jpg',
  'https://i.postimg.cc/CK483Mfx/2000-61d4943cc5940-750x499-jpg.jpg',
  'https://i.postimg.cc/ydYRsqFX/2000-61d4944b22d6c-750x499-jpg.jpg',
  'https://i.postimg.cc/rFtr8Ntb/2000-61d49458617cd-750x499-jpg.jpg',
  'https://i.postimg.cc/gJSZ0Ms9/2000-61d4946a7e647-750x499-jpg.jpg',
  'https://i.postimg.cc/mkK1YtK8/2000-61d49488bd9cb-750x499-jpg.jpg',
  'https://i.postimg.cc/v8hPrMqM/2000-61d494ae2f6b0-750x499-jpg.jpg',
  'https://i.postimg.cc/wMq0CbBS/2000-61d494cd26dea-750x499-jpg.jpg',
  'https://i.postimg.cc/gk0g45Qh/2000-61d494f075aeb-750x499-jpg.jpg',
  'https://i.postimg.cc/v8KnFNDf/2000-61d4953714c4d-750x499-jpg.jpg',
  'https://i.postimg.cc/9QRJH9WF/2000-61d495bb52bd0-750x499-jpg.jpg',
  'https://i.postimg.cc/m268njW5/2000-61d495bb7d96f-750x499-jpg.jpg',
  'https://i.postimg.cc/Z5GjbqRP/2000-61d495bbd1346-750x499-jpg.jpg',
  'https://i.postimg.cc/1tPHFYDf/2000-61d495bc19d79-750x499-jpg.jpg',
  'https://i.postimg.cc/B6gCBcCN/2000-61d495bc46aea-750x499-jpg.jpg',
  'https://i.postimg.cc/Hnk9ZcZm/2000-61d495bceb791-750x499-jpg.jpg',
  'https://i.postimg.cc/NFC7WsSH/2000-61d495bd6b01f-750x499-jpg.jpg',
  'https://i.postimg.cc/sfTcBmxg/2000-61d495bde16ce-750x499-jpg.jpg',
  'https://i.postimg.cc/gkrK3hLq/2000-61d495be2d8af-750x499-jpg.jpg',
  'https://i.postimg.cc/L673Dszd/2000-61d495bed7067-750x499-jpg.jpg',
  'https://i.postimg.cc/L81BbMTJ/2000-61d495bf3e834-750x499-jpg.jpg',
  'https://i.postimg.cc/R0xQrbsX/2000-61d495bfc1483-750x499-jpg.jpg',
  'https://i.postimg.cc/tgdd9t8y/2000-61d495c16c90e-750x499-jpg.jpg',
  'https://i.postimg.cc/Fzz0gtzs/2000-61d495c16c90e-jpg.jpg',
  'https://i.postimg.cc/pT2fr5tj/2000-61d495c33bde9-750x499-jpg.jpg',
  'https://i.postimg.cc/T1sgtk5j/2000-61d495c344557-750x499-jpg.jpg',
  'https://i.postimg.cc/ydvFZ6Vb/2000-61d495c45c3d2-750x499-jpg.jpg',
  'https://i.postimg.cc/nc6q7PJp/2000-61d893a078738-750x499-jpg.jpg',
  'https://i.postimg.cc/c1kR1JkK/2000-61d893a724bfc-750x499-jpg.jpg',
  'https://i.postimg.cc/yYJFDz2L/2000-61d893a74749b-750x499-jpg.jpg',
  'https://i.postimg.cc/FH33xVrc/2000-61d893acc868d-750x499-jpg.jpg',
  'https://i.postimg.cc/HLm5v8nN/2000-61d893ad2dd27-750x499-jpg.jpg',
  'https://i.postimg.cc/g2F6rLV0/2000-61d89845312ad-750x499-jpg.jpg',
  'https://i.postimg.cc/Nj62XGDk/2000-61d898454471f-750x499-jpg.jpg',
  'https://i.postimg.cc/3w34FMb5/2000-61e553a8eed81-750x499-jpg.jpg',
  'https://i.postimg.cc/pdk900g9/2000-61e553d4abfb5-750x499-jpg.jpg',
  'https://i.postimg.cc/LXXJGtpx/2000-61e553eaf3cd2-750x499-jpg.jpg',
  'https://i.postimg.cc/2j1wZvZd/2000-6364d91109583-750x499-jpg.jpg',
  'https://i.postimg.cc/ZnvC5J03/2000-6364d9110b4df-750x499-jpg.jpg',
  'https://i.postimg.cc/1tj8S8Rs/2000-6364d91111bd8-750x499-jpg.jpg',
  'https://i.postimg.cc/yWqWJ2SG/2000-6364d91114ebc-750x499-jpg.jpg',
  'https://i.postimg.cc/9XsBtMd6/2000-6364dcf7eb801-750x499-jpg.jpg',
  'https://i.postimg.cc/rFWNhkgK/2000-6364dcf82b6a9-750x499-jpg.jpg',
  'https://i.postimg.cc/JzLcv2dK/2000-6364dd5e5cdae-750x499-jpg.jpg',
  'https://i.postimg.cc/g2HqWHCp/2000-6364dd8eb1b50-750x499-jpg.jpg',
  'https://i.postimg.cc/8CkdPrG6/Whats-App-Image-2024-03-11-at-12-37-17-PM-13-750x499.jpg',
  'https://i.postimg.cc/Zqf89KYD/Whats-App-Image-2024-03-11-at-12-37-17-PM-14-750x499.jpg',
  'https://i.postimg.cc/pTpDKbpV/Whats-App-Image-2024-03-11-at-12-37-17-PM-750x499.jpg',
  'https://i.postimg.cc/XJm98HCf/Whats-App-Image-2024-03-11-at-12-40-31-PM-1-720x499.jpg',
  'https://i.postimg.cc/pV5fTHwq/Whats-App-Image-2024-03-11-at-12-40-32-PM-10-750x499.jpg',
  'https://i.postimg.cc/MKkyfLxx/Whats-App-Image-2024-03-11-at-12-40-32-PM-11-750x499.jpg',
  'https://i.postimg.cc/BQx2TCQF/Whats-App-Image-2024-03-11-at-12-40-32-PM-12-750x499.jpg',
  'https://i.postimg.cc/2Srh2BVK/Whats-App-Image-2024-03-11-at-12-40-32-PM-13-750x499.jpg',
  'https://i.postimg.cc/8z4W3PvP/Whats-App-Image-2024-03-11-at-12-40-32-PM-14-750x499.jpg',
  'https://i.postimg.cc/KYYLyS77/Whats-App-Image-2024-03-11-at-12-40-32-PM-15-750x499.jpg',
  'https://i.postimg.cc/FKnSrWGM/Whats-App-Image-2024-03-11-at-12-40-32-PM-750x499.jpg',
  'https://i.postimg.cc/gjh8BVVf/Whats-App-Image-2024-03-11-at-12-40-32-PM-9-750x499.jpg',
];

const floorImages = [
  'https://i.postimg.cc/85wB0ym7/2000-61d48d3feb42e-474x499-jpg.jpg',
  'https://i.postimg.cc/RhFQ5cgX/2000-61d48d6fe1c62-750x499.jpg',
  'https://i.postimg.cc/NFz8g5VY/2000-61d48d9c54588-750x499-jpg.jpg',
  'https://i.postimg.cc/SNHL3YCf/2000-61d48dcb6767f-750x499-jpg.jpg',
  'https://i.postimg.cc/L6JBx3Ys/2000-61d48e3dc294b-750x499-jpg.jpg',
  'https://i.postimg.cc/4xtvg41k/2000-61d4925c05a5b-750x499-jpg.jpg',
  'https://i.postimg.cc/dQHjRx0X/2000-61d4a41043f62-750x499-jpg.jpg',
  'https://i.postimg.cc/MTGjvz1G/2000-61d4a2d62f45e-750x499.jpg',
  'https://i.postimg.cc/rs00NgnX/2000-61d4a35cb44e6-750x499-jpg.jpg',
  'https://i.postimg.cc/G2STD6jx/2000-61d4a386a64ec-750x499-jpg.jpg',
  'https://i.postimg.cc/VNfJVzGF/2000-61e55461951d5-750x499-jpg.jpg',
  'https://i.postimg.cc/D09WjsHW/2000-61e5547f78393-750x499-jpg.jpg',
  'https://i.postimg.cc/P5zLyC4x/2000-6364d6d3e7958-750x499-jpg.jpg',
  'https://i.postimg.cc/FR17hDQd/2000-6364d6e136d7c-750x499-jpg.jpg',
  'https://i.postimg.cc/SN9YXTYc/2000-6364d6e13d763-750x499-jpg.jpg',
];

const wardrobeImages = [
  'https://i.postimg.cc/xC330yJM/2000-61d48f6460932-750x499-jpg.jpg',
  'https://i.postimg.cc/V68FQH6z/2000-61d48feb2e3cc-750x499-jpg.jpg',
  'https://i.postimg.cc/J0T3XrQh/2000-61d88c9a42da8-750x499-jpg.jpg',
  'https://i.postimg.cc/2jT7MGff/2000-61d88c9a69e45-750x499-jpg.jpg',
  'https://i.postimg.cc/d3QmDkrX/2000-61d88c9aa5f32-750x499-jpg.jpg',
  'https://i.postimg.cc/dtxmt01H/2000-61d88c9aba3ac-750x499-jpg.jpg',
  'https://i.postimg.cc/3wMXmb22/2000-61d88c9ac4c15-750x499-jpg.jpg',
  'https://i.postimg.cc/JzH3yWH1/2000-61d88c9ad1ac4-750x499-jpg.jpg',
  'https://i.postimg.cc/L6X3pPHg/2000-61d88c9ad4821-750x499-jpg.jpg',
  'https://i.postimg.cc/XJL9Mjmg/2000-627029f84a2d1-750x499-jpg.jpg',
  'https://i.postimg.cc/vTmfGRdw/2000-627029f86960e-750x499-jpg.jpg',
  'https://i.postimg.cc/2544wFxM/2000-6364d84b8773e-750x499-jpg.jpg',
  'https://i.postimg.cc/TwfnHL7w/2000-6364d86ff1bd8-750x499-jpg.jpg',
  'https://i.postimg.cc/MHrRTsWM/Whats-App-Image-2024-03-11-at-12-40-31-PM-4-750x499.jpg',
  'https://i.postimg.cc/Kc9tJYnG/Whats-App-Image-2024-03-11-at-12-40-31-PM-5-750x499.jpg',
  'https://i.postimg.cc/ZKCpghcr/Whats-App-Image-2024-03-11-at-12-40-31-PM-6-750x499.jpg',
  'https://i.postimg.cc/yYtcCrQ2/Whats-App-Image-2024-03-11-at-12-40-31-PM-7-750x499.jpg',
  'https://i.postimg.cc/kgS8JFLG/Whats-App-Image-2024-03-11-at-12-40-31-PM-750x499.jpg',
];

const doorImages = [
  'https://i.postimg.cc/9QQtc7Cq/2000-61d4a30be6bc2-750x499-jpg.jpg',
  'https://i.postimg.cc/RZp1hZZp/2000-61d890bd6cb64-750x499-jpg.jpg',
  'https://i.postimg.cc/ZKZxDQQH/2000-61d890bd7a98b-750x499-jpg.jpg',
  'https://i.postimg.cc/Nf4kh4qc/2000-61d890bda02d1-750x499-jpg.jpg',
  'https://i.postimg.cc/bvGxtfGy/2000-61e55505e671d-750x499-jpg.jpg',
  'https://i.postimg.cc/J08Zvyp0/2000-61e555060ca81-750x499-jpg.jpg',
  'https://i.postimg.cc/QCq13Xzb/2000-61e555065e0a9-750x499-jpg.jpg',
  'https://i.postimg.cc/YqpQxW4y/2000-61e5550678067-750x499-jpg.jpg',
  'https://i.postimg.cc/HW0Q52Ly/2000-61e5550681bae-750x499-jpg.jpg',
  'https://i.postimg.cc/tgLhdvPh/2000-61e55506ebe1d-750x499-jpg.jpg',
  'https://i.postimg.cc/RFKwg1Q2/2000-61e55506ed746-750x499-jpg.jpg',
  'https://i.postimg.cc/jdZP3SPq/2000-6364d67e7c0e7-750x499-jpg.jpg',
];
const bathroomsImages = [
  'https://i.postimg.cc/8kb1zsGd/2000-61d88b4c0d2d3-750x499-jpg.jpg',
  'https://i.postimg.cc/tT39P4xj/2000-61d88ba029c95-750x499-jpg.jpg',
  'https://i.postimg.cc/hvMgyZsZ/2000-61e555aad117a-750x499-jpg.jpg',
  'https://i.postimg.cc/QCjhqZQW/2000-61e555ab25cb5-750x499-jpg.jpg',
  'https://i.postimg.cc/qMMph0BP/2000-61e555ab31377-750x499-jpg.jpg',
  'https://i.postimg.cc/65jtCSyy/2000-61e555ab59611-750x499-jpg.jpg',
];

const gazeboImages = [
  'https://i.postimg.cc/G2Lbfdkr/2000-61e54d5d1c6db-750x499-jpg.jpg',
  'https://i.postimg.cc/SK7yVJYD/2000-61e54d6f04ca9-750x499.jpg',
];

const officeDeskImages = [
  'https://i.postimg.cc/fTBq7Zbm/2000-61d4a47edf99e-719x499-jpg.jpg',
  'https://i.postimg.cc/kXnhtD77/2000-61d4a4af4205f-300x196-jpg.jpg',
  'https://i.postimg.cc/8zYy3HMC/2000-61d4a4af4205f-jpg.jpg',
  'https://i.postimg.cc/6pqjYS7S/Whats-App-Image-2024-03-11-at-12-40-32-PM-19-750x499.jpg',
  'https://i.postimg.cc/9fqxj7YY/Whats-App-Image-2024-03-11-at-12-40-32-PM-20-750x499.jpg',
];

const gypsumImages = [
  'https://i.postimg.cc/nV6hFbxK/2000-61d48d3feb42e-474x499-jpg.jpg',
  'https://i.postimg.cc/cLcxBvnT/2000-61d48d6fe1c62-750x499.jpg',
  'https://i.postimg.cc/TYgYh72z/2000-61d48d9c54588-750x499-jpg.jpg',
  'https://i.postimg.cc/zGNDhCVV/2000-61d48dcb6767f-750x499-jpg.jpg',
  'https://i.postimg.cc/SsHkx8BQ/2000-61d48e198be8d-750x499.jpg',
  'https://i.postimg.cc/Xv7VHnKW/2000-61d48e3dc294b-750x499-jpg.jpg',
  'https://i.postimg.cc/fyXZtysc/2000-61d48e58469ac-750x499-jpg.jpg',
  'https://i.postimg.cc/7LsqjjX2/2000-61d48e7d9626b-750x499-jpg.jpg',
  'https://i.postimg.cc/Kz1mbQss/2000-61d48e9e376b3-750x499-jpg.jpg',
  'https://i.postimg.cc/rytqYn4D/2000-61d48ecd4caf3-750x499-jpg.jpg',
  'https://i.postimg.cc/PrsdGWb2/2000-61d48f8a11bfd-750x499-jpg.jpg',
  'https://i.postimg.cc/BQT4JjMs/2000-61d492ad116e9-750x499-jpg.jpg',
];

const stairsImages = [
  'https://i.postimg.cc/zDkg3Gdw/2000-61d4a513cc566-750x499-jpg.jpg',
  'https://i.postimg.cc/3N94qtyf/2000-61d4a5158eaf0-750x499-jpg.jpg',
  'https://i.postimg.cc/D07459zb/2000-61d4a515bdcc7-750x499-jpg.jpg',
  'https://i.postimg.cc/J44BXCgf/2000-61d4a51657ccf-750x499-jpg.jpg',
  'https://i.postimg.cc/X7JpJcB3/2000-61d88faa42f34-750x499-jpg.jpg',
  'https://i.postimg.cc/wBKv0CfT/2000-61d88faadf8f7-750x499-jpg.jpg',
  'https://i.postimg.cc/Z5vnPbLM/2000-61d899f60f39d-750x499-jpg.jpg',
  'https://i.postimg.cc/bYLZpFJ3/2000-61d899f63c2f9-750x499-jpg.jpg',
  'https://i.postimg.cc/2545J0Md/2000-6364d575eadf2-750x499-jpg.jpg', 
  'https://i.postimg.cc/rFPzt054/2000-6364d5839b363-750x499-jpg.jpg',+ 
  'https://i.postimg.cc/hjcGq9Rk/Whats-App-Image-2024-03-11-at-12-40-32-PM-2-750x499.jpg',
  'https://i.postimg.cc/k4sgMBnB/Whats-App-Image-2024-03-11-at-12-40-32-PM-4-720x499.jpg',
];

const wardrobesImages = [
  'https://i.postimg.cc/xC330yJM/2000-61d48f6460932-750x499-jpg.jpg',
  'https://i.postimg.cc/V68FQH6z/2000-61d48feb2e3cc-750x499-jpg.jpg',
  'https://i.postimg.cc/J0T3XrQh/2000-61d88c9a42da8-750x499-jpg.jpg',
  'https://i.postimg.cc/2jT7MGff/2000-61d88c9a69e45-750x499-jpg.jpg',
  'https://i.postimg.cc/d3QmDkrX/2000-61d88c9aa5f32-750x499-jpg.jpg',
  'https://i.postimg.cc/dtxmt01H/2000-61d88c9aba3ac-750x499-jpg.jpg',
  'https://i.postimg.cc/3wMXmb22/2000-61d88c9ac4c15-750x499-jpg.jpg',
  'https://i.postimg.cc/JzH3yWH1/2000-61d88c9ad1ac4-750x499-jpg.jpg',
  'https://i.postimg.cc/L6X3pPHg/2000-61d88c9ad4821-750x499-jpg.jpg',
  'https://i.postimg.cc/XJL9Mjmg/2000-627029f84a2d1-750x499-jpg.jpg',
  'https://i.postimg.cc/vTmfGRdw/2000-627029f86960e-750x499-jpg.jpg',
  'https://i.postimg.cc/2544wFxM/2000-6364d84b8773e-750x499-jpg.jpg',
  'https://i.postimg.cc/TwfnHL7w/2000-6364d86ff1bd8-750x499-jpg.jpg',
  'https://i.postimg.cc/MHrRTsWM/Whats-App-Image-2024-03-11-at-12-40-31-PM-4-750x499.jpg',
  'https://i.postimg.cc/Kc9tJYnG/Whats-App-Image-2024-03-11-at-12-40-31-PM-5-750x499.jpg',
  'https://i.postimg.cc/ZKCpghcr/Whats-App-Image-2024-03-11-at-12-40-31-PM-6-750x499.jpg',
  'https://i.postimg.cc/yYtcCrQ2/Whats-App-Image-2024-03-11-at-12-40-31-PM-7-750x499.jpg',
  'https://i.postimg.cc/kgS8JFLG/Whats-App-Image-2024-03-11-at-12-40-31-PM-750x499.jpg',
];

const paintingImages = [
  'https://cdn.pixabay.com/photo/2016/11/19/17/28/art-1840481_1280.jpg',
  'https://cdn.pixabay.com/photo/2020/03/22/02/14/brush-4955638_1280.jpg',
];

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
const portfolioData = categories.flatMap((category) => {
  let count = 30;
  let images = null;
  if (category === 'Kitchens') {
    count = kitchenImages.length;
    images = kitchenImages;
  } else if (category === 'Floors & Ceilings') {
    count = floorImages.length;
    images = floorImages;
  } else if (category === 'Wardrobes') {
    count = wardrobeImages.length;
    images = wardrobeImages;
  } else if (category === 'Doors & Door Frames') {
    count = doorImages.length;
    images = doorImages;
  } else if (category === 'Gypsum') {
    count = gypsumImages.length;
    images = gypsumImages;
  } else if (category === 'Stairs') {
    count = stairsImages.length;
    images = stairsImages;
  } else if (category === 'Gazebo') {
    count = gazeboImages.length;
    images = gazeboImages;
  } else if (category === 'Office Desks') {
    count = officeDeskImages.length;
    images = officeDeskImages;
  } else if (category === 'Bathrooms') {
    count = bathroomsImages.length;
    images = bathroomsImages;
  } else if (category === 'Painting') {
    count = paintingImages.length;
    images = paintingImages;
  }
    
  return Array.from({ length: count }, (_, i) => ({
    id: id++,
    title: `${category} Project ${i + 1}`,
    description: `Description for ${category} project ${i + 1}.`,
    image: images ? images[i] : 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
    category,
    location: 'Nairobi, Kenya',
    year: `${2020 + (i % 5)}`,
  }));
});

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
		image: String(item.image),
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
