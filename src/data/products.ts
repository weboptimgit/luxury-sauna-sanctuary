import saunaBarrel from '@/assets/sauna-barrel.jpg';
import saunaCube from '@/assets/sauna-cube.jpg';
import saunaTraditional from '@/assets/sauna-traditional.jpg';
import saunaInterior from '@/assets/sauna-interior.jpg';
import hotTub from '@/assets/hot-tub.jpg';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  shortDescription: string;
  specifications: {
    label: string;
    value: string;
  }[];
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'barrel-sauna',
    name: 'Barrel Sauna',
    category: 'Outdoor',
    price: 8900,
    originalPrice: 10500,
    images: [saunaBarrel, saunaInterior, hotTub],
    shortDescription: 'Classic barrel design with optimal heat circulation',
    description: 'Experience the timeless elegance of our Barrel Sauna, crafted from premium Nordic spruce. The iconic cylindrical shape ensures optimal heat circulation and a truly authentic Finnish sauna experience. Perfect for outdoor installation, this sauna becomes a stunning focal point in any garden or backyard setting.',
    specifications: [
      { label: 'Dimensions', value: '2.4m × 2.1m × 2.1m' },
      { label: 'Capacity', value: '4-6 persons' },
      { label: 'Wood Type', value: 'Nordic Spruce' },
      { label: 'Heater', value: 'Harvia 8kW Electric' },
      { label: 'Insulation', value: 'Thermo-treated wood' },
      { label: 'Glass', value: 'Tempered 8mm' },
      { label: 'Weight', value: '850 kg' },
      { label: 'Warranty', value: '5 years' },
    ],
    features: [
      'Premium Nordic spruce construction',
      'Optimal heat circulation design',
      'Pre-assembled for easy installation',
      'Integrated LED mood lighting',
      'Stainless steel hardware',
      'Weather-resistant exterior finish',
    ],
    inStock: true,
  },
  {
    id: 'cube-sauna',
    name: 'Cube Sauna',
    category: 'Modern',
    price: 12500,
    images: [saunaCube, saunaInterior, saunaBarrel],
    shortDescription: 'Contemporary minimalist design with panoramic views',
    description: 'The Cube Sauna represents the pinnacle of modern sauna design. With its sleek geometric lines and expansive glass panels, it offers breathtaking panoramic views while you relax. The minimalist aesthetic integrates seamlessly with contemporary architecture, making it the perfect choice for design-conscious homeowners.',
    specifications: [
      { label: 'Dimensions', value: '3.0m × 2.5m × 2.4m' },
      { label: 'Capacity', value: '4-8 persons' },
      { label: 'Wood Type', value: 'Thermowood Ash' },
      { label: 'Heater', value: 'Harvia 9kW Electric' },
      { label: 'Insulation', value: 'Premium mineral wool' },
      { label: 'Glass', value: 'Triple-glazed panoramic' },
      { label: 'Weight', value: '1200 kg' },
      { label: 'Warranty', value: '7 years' },
    ],
    features: [
      'Floor-to-ceiling panoramic glass',
      'Smart temperature control system',
      'Premium thermowood construction',
      'Integrated Bluetooth speakers',
      'Chromotherapy lighting',
      'Self-cleaning drainage system',
    ],
    inStock: true,
  },
  {
    id: 'traditional-cabin',
    name: 'Traditional Cabin',
    category: 'Classic',
    price: 15900,
    originalPrice: 18500,
    images: [saunaTraditional, saunaInterior, hotTub],
    shortDescription: 'Authentic Finnish log cabin sauna experience',
    description: 'Step into centuries of Finnish tradition with our Traditional Cabin sauna. Handcrafted from solid Finnish pine logs, this sauna delivers the most authentic löyly experience possible. Every detail honors the time-tested methods passed down through generations of Finnish sauna masters.',
    specifications: [
      { label: 'Dimensions', value: '4.0m × 3.0m × 2.8m' },
      { label: 'Capacity', value: '6-10 persons' },
      { label: 'Wood Type', value: 'Finnish Pine Logs' },
      { label: 'Heater', value: 'Wood-burning + 12kW Electric' },
      { label: 'Insulation', value: 'Natural wood + moss sealing' },
      { label: 'Glass', value: 'Double-glazed windows' },
      { label: 'Weight', value: '2500 kg' },
      { label: 'Warranty', value: '10 years' },
    ],
    features: [
      'Authentic hand-hewn log construction',
      'Dual heating system (wood + electric)',
      'Traditional changing room included',
      'Handcrafted wooden accessories',
      'Natural moss insulation',
      'Copper roof option available',
    ],
    inStock: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
