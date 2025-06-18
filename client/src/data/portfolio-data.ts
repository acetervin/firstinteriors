// Generate a comprehensive portfolio dataset for demonstration
const categories = ['Residential', 'Commercial', 'Kitchen', 'Bedroom', 'Bathroom', 'Office', 'Hotel', 'Restaurant', 'Retail'];
const locations = ['Westlands', 'Karen', 'Lavington', 'Runda', 'Kileleshwa', 'Kilimani', 'Upper Hill', 'CBD', 'Gigiri'];
const years = ['2024', '2023', '2022', '2021', '2020'];

// Base image URLs from Unsplash with different interior design categories
const imageCategories = {
  Kitchen: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1556909114-7b84c5f8e5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1556909195-4e6f0e2b5b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Bedroom: [
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Office: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1541746972996-4e0b0f93e586?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Residential: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Bathroom: [
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Restaurant: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Hotel: [
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Commercial: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ],
  Retail: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
  ]
};

const projectTitles = {
  Kitchen: ['Modern Kitchen', 'Luxury Kitchen', 'Contemporary Kitchen', 'Minimalist Kitchen', 'Traditional Kitchen', 'Open Kitchen'],
  Bedroom: ['Master Bedroom', 'Guest Bedroom', 'Kids Bedroom', 'Teen Bedroom', 'Luxury Suite', 'Cozy Bedroom'],
  Office: ['Executive Office', 'Corporate Office', 'Home Office', 'Co-working Space', 'Meeting Room', 'Reception Area'],
  Residential: ['Living Room', 'Dining Room', 'Family Room', 'Study Room', 'Library', 'Entertainment Room'],
  Bathroom: ['Master Bathroom', 'Guest Bathroom', 'Powder Room', 'Spa Bathroom', 'Modern Bathroom', 'Luxury Bathroom'],
  Restaurant: ['Fine Dining', 'Casual Restaurant', 'Café Design', 'Bar Interior', 'Bistro Design', 'Fast Casual'],
  Hotel: ['Hotel Lobby', 'Guest Room', 'Suite Design', 'Restaurant Hotel', 'Bar Lounge', 'Conference Room'],
  Commercial: ['Office Building', 'Retail Complex', 'Shopping Mall', 'Medical Center', 'Educational Facility', 'Corporate Headquarters'],
  Retail: ['Boutique Store', 'Fashion Retail', 'Electronics Store', 'Jewelry Store', 'Bookstore', 'Showroom']
};

const descriptions = [
  'Contemporary design with premium finishes and smart solutions.',
  'Luxurious space with custom furniture and ambient lighting.',
  'Professional environment designed for productivity and collaboration.',
  'Sophisticated space perfect for modern living and entertaining.',
  'Inviting area designed for comfort and functionality.',
  'Premium retreat with high-end materials and fixtures.',
  'Stylish design that enhances the user experience.',
  'Modern space optimized for efficiency and aesthetics.',
  'Elegant design featuring local cultural elements.',
  'Innovative layout with cutting-edge technology integration.',
  'Timeless design with contemporary touches.',
  'Minimalist approach with maximum impact.',
  'Warm and welcoming atmosphere with practical solutions.',
  'Bold design statement with unique architectural features.',
  'Sustainable design with eco-friendly materials.'
];

// Generate portfolio items
export function generatePortfolioItems(count: number = 1000) {
  const items = [];
  
  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    const titleOptions = projectTitles[category as keyof typeof projectTitles] || ['Design Project'];
    const title = titleOptions[Math.floor(Math.random() * titleOptions.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Get appropriate image for category
    const categoryImages = imageCategories[category as keyof typeof imageCategories] || imageCategories.Residential;
    const imageIndex = Math.floor(Math.random() * categoryImages.length);
    const baseImage = categoryImages[imageIndex];
    
    // Add variation to image URLs to simulate different projects
    const imageVariation = `&sig=${i}`;
    const image = baseImage + imageVariation;
    
    items.push({
      id: i,
      title: `${title} ${String(i).padStart(3, '0')}`,
      category,
      description,
      image,
      location: `${location}, Nairobi`,
      year,
      featured: i <= 20 // Mark first 20 as featured
    });
  }
  
  return items;
}

export const portfolioCategories = ['All', ...categories];
export const portfolioItems = generatePortfolioItems(1000);