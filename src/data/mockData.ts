export interface Listing {
  id: string;
  title: string;
  price: number;
  condition: 'Like New' | 'Good' | 'Fair' | 'Excellent';
  location: string;
  area: string;
  postedAt: string;
  images: string[];
  category: string;
  subcategory?: string;
  description: string;
  specs?: Record<string, string>;
  saved: boolean;
  featured?: boolean;
  sold?: boolean;
  views: number;
  favorites: number;
  enquiries: number;
  seller: Seller;
}

export interface Seller {
  id: string;
  name: string;
  avatar?: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  memberSince: string;
  responseTime: string;
  location: string;
  activeListings: number;
  soldListings: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  subcategories?: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type?: 'text' | 'offer';
  offer?: Offer;
}

export interface Conversation {
  id: string;
  listing: Listing;
  otherUser: Seller;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

export interface Offer {
  id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'countered' | 'expired';
  createdAt: string;
  fromBuyer: boolean;
}

export interface Notification {
  id: string;
  type: 'message' | 'offer' | 'offer_accepted' | 'offer_rejected' | 'price_change' | 'listing_sold' | 'listing_approved' | 'deal_reminder' | 'safety';
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatar?: string;
  deepLink?: string;
}

export const sellers: Seller[] = [
  {
    id: 's1',
    name: 'Arjun Mehta',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    verified: true,
    rating: 4.8,
    reviewCount: 34,
    memberSince: 'March 2022',
    responseTime: 'Usually within 1 hour',
    location: 'Chennai',
    activeListings: 6,
    soldListings: 28,
  },
  {
    id: 's2',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    verified: true,
    rating: 4.6,
    reviewCount: 19,
    memberSince: 'July 2023',
    responseTime: 'Usually within 2 hours',
    location: 'Bengaluru',
    activeListings: 4,
    soldListings: 12,
  },
  {
    id: 's3',
    name: 'Karan Nair',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
    verified: false,
    rating: 4.2,
    reviewCount: 8,
    memberSince: 'January 2024',
    responseTime: 'Usually within 4 hours',
    location: 'Hyderabad',
    activeListings: 2,
    soldListings: 5,
  },
  {
    id: 's4',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
    verified: true,
    rating: 4.9,
    reviewCount: 47,
    memberSince: 'September 2021',
    responseTime: 'Usually within 30 minutes',
    location: 'Mumbai',
    activeListings: 9,
    soldListings: 62,
  },
  {
    id: 's5',
    name: 'Vikram Reddy',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    verified: true,
    rating: 4.5,
    reviewCount: 22,
    memberSince: 'May 2022',
    responseTime: 'Usually within 1 hour',
    location: 'Pune',
    activeListings: 3,
    soldListings: 18,
  },
];

export const listings: Listing[] = [
  {
    id: 'l1',
    title: 'iPhone 14 128GB — Midnight Black',
    price: 52000,
    condition: 'Like New',
    location: 'Chennai',
    area: 'Velachery',
    postedAt: '2 days ago',
    images: [
      'https://images.unsplash.com/photo-1675525494535-d2a39c76de78?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1621768216002-5ac171661d42?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Mobiles & Tablets',
    subcategory: 'iPhones',
    description: 'Purchased in December 2023. Used for 8 months. No scratches, screen in perfect condition. Comes with original box, charger, and unused EarPods. Battery health at 96%.',
    specs: { Brand: 'Apple', Model: 'iPhone 14', Storage: '128 GB', Color: 'Midnight Black', 'Battery Health': '96%', Warranty: 'No' },
    saved: false,
    featured: true,
    views: 312,
    favorites: 18,
    enquiries: 7,
    seller: sellers[0],
  },
  {
    id: 'l2',
    title: 'MacBook Air M1 — Space Grey 8GB/256GB',
    price: 68000,
    condition: 'Excellent',
    location: 'Bengaluru',
    area: 'Koramangala',
    postedAt: '5 hours ago',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Electronics',
    subcategory: 'Laptops',
    description: 'MacBook Air M1 in excellent condition. 18 months old. Battery health 91%. Light use, mainly for work from home. Comes with charger and sleeve.',
    specs: { Brand: 'Apple', Model: 'MacBook Air M1', RAM: '8 GB', Storage: '256 GB', Color: 'Space Grey', 'Battery Health': '91%' },
    saved: true,
    views: 198,
    favorites: 12,
    enquiries: 4,
    seller: sellers[1],
  },
  {
    id: 'l3',
    title: 'Royal Enfield Classic 350 — 2021 Redditch Red',
    price: 145000,
    condition: 'Good',
    location: 'Hyderabad',
    area: 'Banjara Hills',
    postedAt: '1 day ago',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Vehicles',
    subcategory: 'Motorcycles',
    description: '2021 Classic 350 in great condition. 18,500 km done. Single owner. Regular service at Royal Enfield authorized center. No major falls or accidents.',
    specs: { Brand: 'Royal Enfield', Model: 'Classic 350', Year: '2021', 'Fuel Type': 'Petrol', Kilometers: '18,500 km', Owners: '1st Owner' },
    saved: false,
    views: 423,
    favorites: 31,
    enquiries: 12,
    seller: sellers[2],
  },
  {
    id: 'l4',
    title: 'Canon EOS 1500D Kit — 18-55mm Lens',
    price: 28500,
    condition: 'Good',
    location: 'Mumbai',
    area: 'Andheri West',
    postedAt: '3 days ago',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Electronics',
    subcategory: 'Cameras',
    description: 'Canon EOS 1500D with 18-55mm kit lens. Used for photography course. Shutter count under 5000. Comes with original box, battery, charger, and bag.',
    specs: { Brand: 'Canon', Model: 'EOS 1500D', 'Shutter Count': '<5000', Lens: '18-55mm kit', Battery: 'Original LP-E10' },
    saved: false,
    featured: true,
    views: 287,
    favorites: 22,
    enquiries: 9,
    seller: sellers[3],
  },
  {
    id: 'l5',
    title: 'Wooden Study Table with Bookshelf',
    price: 6500,
    condition: 'Good',
    location: 'Pune',
    area: 'Kothrud',
    postedAt: '1 week ago',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Home & Furniture',
    subcategory: 'Study & Office',
    description: 'Solid wood study table with attached bookshelf. 4 feet wide. Fits comfortably in bedroom. Minor surface scratches, no structural damage. Self-pickup preferred.',
    specs: { Material: 'Solid Wood', Dimensions: '4ft x 2ft x 5ft', Color: 'Natural Brown', Condition: 'Good' },
    saved: true,
    views: 156,
    favorites: 8,
    enquiries: 3,
    seller: sellers[4],
  },
  {
    id: 'l6',
    title: 'Samsung Galaxy S23 256GB — Phantom Black',
    price: 45000,
    condition: 'Like New',
    location: 'Chennai',
    area: 'Anna Nagar',
    postedAt: '6 hours ago',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Mobiles & Tablets',
    subcategory: 'Samsung',
    description: 'Samsung Galaxy S23 in like new condition. 4 months old. No scratches. Comes with original box and accessories. Battery at 99%.',
    specs: { Brand: 'Samsung', Model: 'Galaxy S23', Storage: '256 GB', RAM: '8 GB', Color: 'Phantom Black', 'Battery Health': '99%' },
    saved: false,
    views: 201,
    favorites: 15,
    enquiries: 6,
    seller: sellers[0],
  },
  {
    id: 'l7',
    title: 'Sony WH-1000XM5 Noise Cancelling Headphones',
    price: 18000,
    condition: 'Excellent',
    location: 'Bengaluru',
    area: 'Whitefield',
    postedAt: '4 days ago',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Electronics',
    subcategory: 'Audio',
    description: 'Sony WH-1000XM5 in excellent condition. 6 months old. Comes with original case, cable, and box. Barely used.',
    specs: { Brand: 'Sony', Model: 'WH-1000XM5', Color: 'Black', Warranty: 'No' },
    saved: false,
    views: 345,
    favorites: 29,
    enquiries: 11,
    seller: sellers[1],
  },
  {
    id: 'l8',
    title: 'PS5 Console with 2 Controllers',
    price: 38000,
    condition: 'Good',
    location: 'Hyderabad',
    area: 'Madhapur',
    postedAt: '2 days ago',
    images: [
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Electronics',
    subcategory: 'Gaming',
    description: 'PS5 Disc Edition with 2 DualSense controllers. Light use, no overheating issues. Includes 3 games: Spider-Man 2, FIFA 24, and God of War Ragnarok.',
    specs: { Brand: 'Sony', Model: 'PS5 Disc Edition', Controllers: '2', Games: '3 included' },
    saved: false,
    featured: true,
    views: 512,
    favorites: 44,
    enquiries: 18,
    seller: sellers[3],
  },
  {
    id: 'l9',
    title: 'Vintage Leather Jacket — Men\'s Large',
    price: 3200,
    condition: 'Fair',
    location: 'Mumbai',
    area: 'Bandra',
    postedAt: '5 days ago',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Fashion',
    subcategory: 'Men\'s Clothing',
    description: 'Genuine leather jacket, size L. Some natural wear and patina. Bought from a vintage store. Timeless style.',
    specs: { Material: 'Genuine Leather', Size: 'L', Color: 'Brown', Gender: 'Men' },
    saved: false,
    views: 98,
    favorites: 7,
    enquiries: 2,
    seller: sellers[2],
  },
  {
    id: 'l10',
    title: 'Trek FX3 Hybrid Bicycle — Medium Frame',
    price: 22000,
    condition: 'Good',
    location: 'Pune',
    area: 'Baner',
    postedAt: '1 week ago',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Sports & Hobbies',
    subcategory: 'Cycles',
    description: 'Trek FX3 Disc hybrid bicycle. Medium frame. 21-speed Shimano gears. Regular serviced. Minor scratches on frame, mechanically sound.',
    specs: { Brand: 'Trek', Model: 'FX3 Disc', Frame: 'Medium (17.5")', Gears: '21-speed Shimano', Brakes: 'Disc' },
    saved: false,
    views: 178,
    favorites: 11,
    enquiries: 4,
    seller: sellers[4],
  },
  {
    id: 'l11',
    title: 'iPad Pro 11" M2 — 256GB WiFi',
    price: 72000,
    condition: 'Like New',
    location: 'Delhi',
    area: 'Vasant Kunj',
    postedAt: '3 hours ago',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Mobiles & Tablets',
    subcategory: 'iPads',
    description: 'iPad Pro 11" M2 chip, 256GB WiFi. 3 months old. Comes with Apple Pencil 2nd gen and Magic Keyboard. Original box and all accessories.',
    specs: { Brand: 'Apple', Model: 'iPad Pro 11" M2', Storage: '256 GB', Connectivity: 'WiFi', Color: 'Space Grey' },
    saved: true,
    featured: true,
    views: 267,
    favorites: 21,
    enquiries: 8,
    seller: sellers[0],
  },
  {
    id: 'l12',
    title: 'Ikea KALLAX Shelving Unit — 4x4',
    price: 4800,
    condition: 'Good',
    location: 'Hyderabad',
    area: 'Gachibowli',
    postedAt: '2 weeks ago',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Home & Furniture',
    subcategory: 'Storage',
    description: 'IKEA KALLAX 4x4 shelving unit in white. Some minor scratches on surface. All fittings included. Self-pickup from Gachibowli.',
    specs: { Brand: 'IKEA', Model: 'KALLAX', Dimensions: '147cm x 147cm', Color: 'White', Material: 'Particleboard' },
    saved: false,
    views: 134,
    favorites: 6,
    enquiries: 2,
    seller: sellers[2],
  },
  {
    id: 'l13',
    title: 'Hyundai i20 Asta (O) 1.2 Petrol — 2021',
    price: 685000,
    condition: 'Excellent',
    location: 'Chennai',
    area: 'T. Nagar',
    postedAt: '1 day ago',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Vehicles',
    subcategory: 'Cars',
    description: 'Hyundai i20 Asta (O) Top model with Sunroof & Bose Audio. 24,000 km driven. Single owner, comprehensive insurance valid till Nov 2025. Company serviced.',
    specs: { Brand: 'Hyundai', Model: 'i20 Asta (O)', Year: '2021', 'Fuel Type': 'Petrol', Kilometers: '24,000 km', Transmission: 'Manual' },
    saved: false,
    featured: true,
    views: 389,
    favorites: 24,
    enquiries: 9,
    seller: sellers[0],
  },
  {
    id: 'l14',
    title: 'Ather 450X Gen 3 Electric Scooter — Space Grey',
    price: 95000,
    condition: 'Like New',
    location: 'Bengaluru',
    area: 'HSR Layout',
    postedAt: '3 days ago',
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Vehicles',
    subcategory: 'Scooters',
    description: 'Ather 450X Gen 3 with Pro Pack. True range 105 km in Warp mode. Battery warranty valid for 2 more years. Includes Home Charger unit.',
    specs: { Brand: 'Ather', Model: '450X Gen 3', Year: '2023', Range: '146 km/charge', Kilometers: '4,200 km', Battery: '3.7 kWh' },
    saved: true,
    views: 290,
    favorites: 19,
    enquiries: 7,
    seller: sellers[1],
  },
  {
    id: 'l15',
    title: '2 BHK Fully Furnished Apartment in Prime Koramangala',
    price: 35000,
    condition: 'Like New',
    location: 'Bengaluru',
    area: 'Koramangala',
    postedAt: '4 hours ago',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Property',
    subcategory: 'Rent',
    description: 'Spacious 2 BHK 1150 sq.ft apartment available for rent. Fully furnished with modular kitchen, ACs, beds, and sofa. Gated community with 24/7 security & power backup.',
    specs: { Type: '2 BHK Apartment', Area: '1150 Sq.Ft', Furnishing: 'Fully Furnished', Floor: '3rd of 5', Deposit: '₹1.5 Lakhs' },
    saved: true,
    featured: true,
    views: 450,
    favorites: 38,
    enquiries: 14,
    seller: sellers[1],
  },
  {
    id: 'l16',
    title: 'Modern Plug-and-Play Commercial Office Space — 1200 Sq.Ft',
    price: 65000,
    condition: 'Excellent',
    location: 'Hyderabad',
    area: 'Gachibowli',
    postedAt: '2 days ago',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Property',
    subcategory: 'Commercial',
    description: 'Fully fitted commercial office space ready for immediate occupancy. Seats 24 workstations, 2 cabin rooms, 1 conference room, and private pantry.',
    specs: { Type: 'Office Space', Area: '1200 Sq.Ft', Capacity: '24 Workstations', Parking: '2 Car slots', AC: 'Centralized VRV' },
    saved: false,
    views: 215,
    favorites: 14,
    enquiries: 5,
    seller: sellers[2],
  },
  {
    id: 'l17',
    title: 'Fossil Gen 6 Touchscreen Smartwatch — Stainless Steel',
    price: 11500,
    condition: 'Excellent',
    location: 'Mumbai',
    area: 'Powai',
    postedAt: '1 day ago',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Fashion',
    subcategory: 'Watches',
    description: 'Fossil Gen 6 Smartwatch with Wear OS by Google. Fast charging (80% in 30 mins), SPO2 & Heart rate tracking. Includes original box and extra leather strap.',
    specs: { Brand: 'Fossil', Model: 'Gen 6', Case: '44mm Stainless Steel', OS: 'Wear OS by Google', Color: 'Silver' },
    saved: false,
    views: 182,
    favorites: 13,
    enquiries: 4,
    seller: sellers[3],
  },
  {
    id: 'l18',
    title: 'Nike Air Jordan 1 Retro High — Size UK 9',
    price: 9800,
    condition: 'Like New',
    location: 'Delhi',
    area: 'South Extension',
    postedAt: '3 days ago',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Fashion',
    subcategory: 'Footwear',
    description: 'Authentic Nike Air Jordan 1 High OG in classic Chicago colorway. Worn twice for indoor photo shoots. 10/10 condition. Original Nike box included.',
    specs: { Brand: 'Nike', Model: 'Air Jordan 1 Retro', Size: 'UK 9 / US 10', Color: 'Chicago Red/White/Black', Box: 'Included' },
    saved: true,
    views: 310,
    favorites: 26,
    enquiries: 8,
    seller: sellers[0],
  },
  {
    id: 'l19',
    title: 'Urban Ladder 3-Seater Fabric Sofa — Teal Blue',
    price: 18500,
    condition: 'Good',
    location: 'Pune',
    area: 'Wakad',
    postedAt: '5 days ago',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Home & Furniture',
    subcategory: 'Sofas',
    description: 'Urban Ladder 3-seater plush sofa in vibrant Teal Blue fabric. High-density foam seating with solid neem wood inner structure. Clean & stain-free.',
    specs: { Brand: 'Urban Ladder', Seating: '3-Seater', Material: 'Premium Fabric', Color: 'Teal Blue', Cushioning: 'High Density Foam' },
    saved: false,
    views: 195,
    favorites: 16,
    enquiries: 5,
    seller: sellers[4],
  },
  {
    id: 'l20',
    title: 'Complete JEE Advanced PCM Book Set (30+ Reference Books)',
    price: 3500,
    condition: 'Good',
    location: 'Kota',
    area: 'Talwandi',
    postedAt: '2 days ago',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Books & Education',
    subcategory: 'Competitive Exams',
    description: 'Ultimate preparation kit for JEE Main & Advanced aspirants. Contains HC Verma Vol 1 & 2, Irodov Physics, Cengage Maths set, MS Chouhan Organic Chem & past 42 years solved papers.',
    specs: { Target: 'JEE Main & Advanced', Subjects: 'Physics, Chemistry, Maths', Includes: 'HC Verma, Irodov, RD Sharma, Cengage', Condition: 'Minimal markings' },
    saved: false,
    views: 275,
    favorites: 21,
    enquiries: 9,
    seller: sellers[2],
  },
  {
    id: 'l21',
    title: 'Harry Potter Complete Hardcover Box Set (Books 1-7)',
    price: 4200,
    condition: 'Like New',
    location: 'Chennai',
    area: 'Adyar',
    postedAt: '1 week ago',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Books & Education',
    subcategory: 'Fiction',
    description: 'Hardcover collector edition of all 7 Harry Potter books housed in original Hogwarts chest box. Pristine spine, no tears or bent pages.',
    specs: { Author: 'J.K. Rowling', Format: 'Hardcover Special Edition', Count: '7 Books', Language: 'English' },
    saved: true,
    views: 210,
    favorites: 18,
    enquiries: 6,
    seller: sellers[0],
  },
  {
    id: 'l22',
    title: 'Yamaha F310 Acoustic Guitar with Padded Gig Bag',
    price: 7800,
    condition: 'Excellent',
    location: 'Bengaluru',
    area: 'Indiranagar',
    postedAt: '2 days ago',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Sports & Hobbies',
    subcategory: 'Musical Instruments',
    description: 'Yamaha F310 full size acoustic guitar. Rich resonant tone with low string action. Recently re-strung with D\'Addario EXP strings. Includes gig bag, tuner & strap.',
    specs: { Brand: 'Yamaha', Model: 'F310', Type: 'Acoustic Dreadnought', Top: 'Spruce', Accessories: 'Bag, Tuner, Strap & Picks' },
    saved: false,
    views: 320,
    favorites: 24,
    enquiries: 10,
    seller: sellers[1],
  },
  {
    id: 'l23',
    title: 'Decathlon Heavy-Duty Squat Rack & 50kg Rubber Dumbbell Set',
    price: 14500,
    condition: 'Good',
    location: 'Hyderabad',
    area: 'Kukatpally',
    postedAt: '4 days ago',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Sports & Hobbies',
    subcategory: 'Gym Equipment',
    description: 'Decathlon Corength adjustable squat rack with dip station. Comes with 50kg rubber coated weight plates, 5ft 28mm barbell rod, and 2 dumbbell handles.',
    specs: { Brand: 'Corength / Decathlon', 'Max Load': '250 kg', Weights: '50kg Rubber Coated Plates', Includes: 'Barbell & Dumbbell Rods' },
    saved: false,
    views: 240,
    favorites: 17,
    enquiries: 6,
    seller: sellers[3],
  },
  {
    id: 'l24',
    title: 'Professional Interior Wall Painting & Waterproofing Service',
    price: 15000,
    condition: 'Like New',
    location: 'Chennai',
    area: 'OMR / Sholinganallur',
    postedAt: '1 day ago',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Jobs & Services',
    subcategory: 'Home Services',
    description: 'Complete home painting service package. Includes wall sanding, putty, primer, and 2 coats of Asian Paints Apex/Royale. 2-Year warranty on damp-proofing.',
    specs: { Service: 'Full Home Painting', Materials: 'Asian Paints Apex / Royale', Warranty: '2 Years', Coverage: 'Up to 2 BHK' },
    saved: false,
    views: 165,
    favorites: 9,
    enquiries: 4,
    seller: sellers[0],
  },
  {
    id: 'l25',
    title: 'Senior React & Full-Stack Node.js Developer — Freelance Service',
    price: 1500,
    condition: 'Excellent',
    location: 'Bengaluru',
    area: 'Remote / Hybrid',
    postedAt: '3 hours ago',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Jobs & Services',
    subcategory: 'Freelance',
    description: 'Experienced Full Stack Engineer (6+ yrs) available for freelance, MVP development, code audits, or ongoing web app projects. Expertise in React, TS, Tailwind, Node & Postgres.',
    specs: { Expertise: 'React 19, TypeScript, Node.js, Next.js', Experience: '6+ Years', Availability: '20 hrs/week', Rate: '₹1,500 / hr' },
    saved: true,
    views: 190,
    favorites: 15,
    enquiries: 8,
    seller: sellers[1],
  },
  {
    id: 'l26',
    title: 'Handcrafted Premium Ceramic Planter Pots Set of 4',
    price: 1850,
    condition: 'Like New',
    location: 'Mumbai',
    area: 'Juhu',
    postedAt: '3 days ago',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Other',
    subcategory: 'Garden & Home Decor',
    description: 'Set of 4 artisan glazed ceramic pots in pastel shades (Mint, Cream, Terracotta & Slate). Features drainage holes and matching saucers. Perfect for indoor succulents.',
    specs: { Material: 'Glazed Ceramic', Quantity: '4 Pots', Drainage: 'Hole included', Color: 'Pastel Matte Trio' },
    saved: false,
    views: 142,
    favorites: 11,
    enquiries: 3,
    seller: sellers[3],
  },
  {
    id: 'l27',
    title: 'Vintage Handcrafted Brass Gramophone Decorative Collector Piece',
    price: 3400,
    condition: 'Good',
    location: 'Delhi',
    area: 'Chandni Chowk',
    postedAt: '1 week ago',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop&auto=format',
    ],
    category: 'Other',
    subcategory: 'Antiques & Artifacts',
    description: 'Exquisite antique style brass horn gramophone mounted on solid mahogany wood box. Functions with hand crank mechanism for decorative & vintage music playback.',
    specs: { Material: 'Solid Brass & Mahogany Wood Base', Type: 'Working Crank Replica', Height: '22 inches' },
    saved: false,
    views: 188,
    favorites: 14,
    enquiries: 5,
    seller: sellers[2],
  },
];

export const categories: Category[] = [
  { id: 'mobiles', name: 'Mobiles & Tablets', icon: 'mobiles', count: 2847, subcategories: ['iPhones', 'Samsung', 'OnePlus', 'iPads', 'Other Tablets'] },
  { id: 'electronics', name: 'Electronics', icon: 'electronics', count: 3421, subcategories: ['Laptops', 'Cameras', 'Gaming', 'Audio', 'TVs', 'Appliances'] },
  { id: 'vehicles', name: 'Vehicles', icon: 'vehicles', count: 1893, subcategories: ['Cars', 'Motorcycles', 'Scooters', 'Bicycles', 'Spare Parts'] },
  { id: 'property', name: 'Property', icon: 'property', count: 924, subcategories: ['Rent', 'Buy', 'PG/Hostel', 'Commercial'] },
  { id: 'fashion', name: 'Fashion', icon: 'fashion', count: 1567, subcategories: ["Men's Clothing", "Women's Clothing", 'Footwear', 'Watches', 'Bags'] },
  { id: 'furniture', name: 'Home & Furniture', icon: 'furniture', count: 1234, subcategories: ['Beds & Mattresses', 'Sofas', 'Study & Office', 'Storage', 'Decor'] },
  { id: 'books', name: 'Books & Education', icon: 'books', count: 876, subcategories: ['Textbooks', 'Fiction', 'Non-Fiction', 'Competitive Exams', 'Courses'] },
  { id: 'sports', name: 'Sports & Hobbies', icon: 'sports', count: 743, subcategories: ['Gym Equipment', 'Cycles', 'Cricket', 'Football', 'Musical Instruments'] },
  { id: 'jobs', name: 'Jobs & Services', icon: 'jobs', count: 512, subcategories: ['Full-time', 'Part-time', 'Freelance', 'Home Services'] },
  { id: 'other', name: 'Other', icon: 'other', count: 1129, subcategories: [] },
];

export const conversations: Conversation[] = [
  {
    id: 'c1',
    listing: listings[0],
    otherUser: sellers[1],
    lastMessage: 'Is the phone still available?',
    lastMessageTime: '10:42 AM',
    unread: 2,
    messages: [
      { id: 'm1', senderId: 's2', text: 'Hi! Is the iPhone still available?', timestamp: '10:30 AM', read: true },
      { id: 'm2', senderId: 'me', text: 'Yes, it is! Any questions?', timestamp: '10:35 AM', read: true },
      { id: 'm3', senderId: 's2', text: 'Can you share more photos of the back panel?', timestamp: '10:40 AM', read: false },
      { id: 'm4', senderId: 's2', text: 'Is the phone still available?', timestamp: '10:42 AM', read: false },
    ],
  },
  {
    id: 'c2',
    listing: listings[3],
    otherUser: sellers[4],
    lastMessage: 'Deal confirmed. Meeting tomorrow at 11 AM.',
    lastMessageTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm5', senderId: 's5', text: 'Hi, I\'m interested in the Canon EOS 1500D', timestamp: 'Yesterday, 2:00 PM', read: true },
      { id: 'm6', senderId: 'me', text: 'Sure! It\'s in great condition.', timestamp: 'Yesterday, 2:05 PM', read: true },
      {
        id: 'm7', senderId: 's5', text: '', timestamp: 'Yesterday, 3:00 PM', read: true,
        type: 'offer',
        offer: { id: 'o1', amount: 26000, status: 'countered', createdAt: 'Yesterday, 3:00 PM', fromBuyer: true },
      },
      {
        id: 'm8', senderId: 'me', text: '', timestamp: 'Yesterday, 3:30 PM', read: true,
        type: 'offer',
        offer: { id: 'o2', amount: 27500, status: 'accepted', createdAt: 'Yesterday, 3:30 PM', fromBuyer: false },
      },
      { id: 'm9', senderId: 'me', text: 'Deal confirmed. Meeting tomorrow at 11 AM.', timestamp: 'Yesterday, 4:00 PM', read: true },
    ],
  },
  {
    id: 'c3',
    listing: listings[6],
    otherUser: sellers[2],
    lastMessage: 'Can you do ₹16,000?',
    lastMessageTime: '2 days ago',
    unread: 1,
    messages: [
      { id: 'm10', senderId: 's3', text: 'Hi! Are the headphones negotiable?', timestamp: '2 days ago, 5:00 PM', read: true },
      { id: 'm11', senderId: 'me', text: 'Slightly negotiable, yes.', timestamp: '2 days ago, 5:10 PM', read: true },
      { id: 'm12', senderId: 's3', text: 'Can you do ₹16,000?', timestamp: '2 days ago, 5:15 PM', read: false },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'message',
    title: 'New message from Priya Sharma',
    body: 'Can you share more photos of the back panel?',
    time: '10 min ago',
    read: false,
    avatar: sellers[1].avatar,
  },
  {
    id: 'n2',
    type: 'offer',
    title: 'New offer on your listing',
    body: 'Vikram Reddy sent an offer of ₹26,000 on "Canon EOS 1500D"',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'price_change',
    title: 'Price drop on saved listing',
    body: 'MacBook Air M1 dropped to ₹68,000 — you saved it earlier',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'listing_approved',
    title: 'Your listing is live!',
    body: '"iPhone 14 128GB" is now active and visible to buyers',
    time: '2 days ago',
    read: true,
  },
  {
    id: 'n5',
    type: 'deal_reminder',
    title: 'Meeting reminder',
    body: 'Your deal meeting for Canon EOS 1500D is tomorrow at 11 AM at Phoenix Mall',
    time: '3 days ago',
    read: true,
  },
  {
    id: 'n6',
    type: 'safety',
    title: 'Safety tip',
    body: 'Always meet in public places and verify items before payment.',
    time: '1 week ago',
    read: true,
  },
];

export const myListings: (Listing & { status: 'ACTIVE' | 'DRAFT' | 'SOLD' | 'EXPIRED' | 'PENDING_REVIEW' })[] = [
  { ...listings[0], status: 'ACTIVE' },
  { ...listings[5], status: 'ACTIVE' },
  {
    ...listings[3],
    status: 'SOLD',
    sold: true,
    title: 'Canon EOS 1500D Kit — 18-55mm Lens',
  },
  {
    id: 'draft1',
    title: 'Dell Inspiron 15 Laptop',
    price: 32000,
    condition: 'Good',
    location: 'Chennai',
    area: 'Velachery',
    postedAt: 'Not published',
    images: [],
    category: 'Electronics',
    description: '',
    saved: false,
    views: 0,
    favorites: 0,
    enquiries: 0,
    seller: sellers[0],
    status: 'DRAFT',
  },
];

export const formatPrice = (price: number): string =>
  `₹${price.toLocaleString('en-IN')}`;
