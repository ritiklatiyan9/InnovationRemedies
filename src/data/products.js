// src/data/products.js

import R3 from '../assets/Images/R3.png';
import nine from '../assets/Images/nine.png';
import eight from '../assets/Images/eight.png';
import thirteen from '../assets/Images/thirteen.png';
import fourteen from '../assets/Images/fourteen.png';
import fifteen from '../assets/Images/fifteen.png';
import sixteen from '../assets/Images/sixteen.png';
import seventeen from '../assets/Images/seventeen.png';
import eighteen from '../assets/Images/eighteen.png';
import nineteen from '../assets/Images/nineteen.png';

export const products = [
  { 
    id: 'r3-vet-ultra-bonus',
    name: 'R3-Vet : Ultra Bonus (1 pcs)',
    description: 'Limited fruity collection designed for optimal animal health and wellness.',
    longDescription: 'R3-Vet Ultra Bonus is our premium formulation that combines essential nutrients and vitamins in a tasty fruity flavor that animals love. Supports immune system, coat health, and overall vitality.',
    price: 142.00,
    imageUrl: R3,
    rating: 4.7,
    reviewCount: 156,
    stock: 15,
    features: [
      'Premium quality ingredients',
      'Fruity flavor animals love',
      'Supports immune system',
      'Promotes healthy coat'
    ],
    color: '#FF6B6B'
  },
  {
    id: 'mood-pills',
    name: 'AYNGROW (1 pcs)',
    description: 'Limited fruity collection for balanced mood and growth support.',
    longDescription: 'AYNGROW is specifically formulated to promote healthy growth patterns while supporting balanced mood in animals. The fruity flavor ensures easy administration and acceptance.',
    price: 142.00,
    imageUrl: nine,
    rating: 4.5,
    reviewCount: 89,
    stock: 23,
    features: [
      'Growth support formula',
      'Mood balancing ingredients',
      'Fruity flavor for easy administration',
      'Veterinarian recommended'
    ],
    color: '#4ECDC4'
  },
  {
    id: 'uti-dont-think-so',
    name: 'Badda-H (1 pcs)',
    description: 'Limited fruity collection targeting urinary tract health.',
    longDescription: 'Badda-H provides comprehensive support for urinary tract health with its specialized formula. The fruity flavor makes it palatable and easy to administer.',
    price: 142.00,
    imageUrl: eight,
    rating: 4.8,
    reviewCount: 112,
    stock: 18,
    features: [
      'Urinary tract support',
      'pH balancing formula',
      'Easy administration',
      'Fast-acting relief'
    ],
    color: '#FF9F1C'
  },
  {
    id: 'bye-bye-bloat',
    name: 'CalfShakti Advanced (1 pcs)',
    description: 'Limited fruity collection for digestive comfort and anti-bloating.',
    longDescription: 'CalfShakti Advanced is specially designed to reduce bloating and promote healthy digestion in calves. The fruity flavor ensures high palatability and acceptance.',
    price: 412.00,
    imageUrl: thirteen,
    rating: 4.6,
    reviewCount: 78,
    stock: 12,
    features: [
      'Anti-bloating formula',
      'Digestive enzyme support',
      'Promotes healthy gut flora',
      'Gentle and effective'
    ],
    color: '#6A0572'
  },
  {
    id: 'good-girl-probiotic',
    name: 'IRL Innoliv-DS (1 pcs)',
    description: 'Limited fruity collection for advanced liver support.',
    longDescription: 'IRL Innoliv-DS provides complete liver support with its advanced formulation. Contains essential nutrients that promote liver health and function.',
    price: 412.00,
    imageUrl: fourteen,
    rating: 4.9,
    reviewCount: 135,
    stock: 9,
    features: [
      'Liver support formula',
      'Detoxifying properties',
      'Promotes enzyme production',
      'Complete nutritional support'
    ],
    color: '#1A535C'
  },
  {
    id: 'perfect-condition-vitamin',
    name: 'IRL Innoworm-XL (1 pcs)',
    description: 'Limited fruity collection for parasite protection.',
    longDescription: 'IRL Innoworm-XL provides comprehensive protection against internal parasites with its specially formulated blend. The fruity flavor ensures easy administration.',
    price: 412.00,
    imageUrl: fifteen,
    rating: 4.7,
    reviewCount: 91,
    stock: 14,
    features: [
      'Broad-spectrum formula',
      'Gentle on the digestive system',
      'Fast-acting protection',
      'Safe for regular use'
    ],
    color: '#4CB944'
  },
  {
    id: 'weight-booster',
    name: 'IRL Innoworm Suspension',
    description: 'Nutritional supplement for healthy weight gain.',
    longDescription: 'IRL Innoworm Suspension is a nutritional supplement designed to promote healthy weight gain while providing parasite protection. Ideal for animals recovering from illness or underweight conditions.',
    price: 314.95,
    imageUrl: sixteen,
    rating: 4.6,
    reviewCount: 68,
    stock: 20,
    features: [
      'Weight gain support',
      'Parasite protection',
      'High calorie formula',
      'Nutrient-dense composition'
    ],
    color: '#F72585'
  },
  {
    id: 'makkhi-soap',
    name: 'IRL Makkhi Soap',
    description: 'Regular checkups for year-round health.',
    longDescription: 'IRL Makkhi Soap is an external cleansing product designed to repel insects and provide skin protection. The specialized formula is gentle on skin while effective against external parasites.',
    price: 719.95,
    imageUrl: seventeen,
    rating: 4.8,
    reviewCount: 105,
    stock: 25,
    features: [
      'Insect repellent properties',
      'Skin-friendly formula',
      'Long-lasting protection',
      'Gentle cleansing action'
    ],
    color: '#3A86FF'
  },
  {
    id: 'makkhi-liquid',
    name: 'Makkhi Concentrated Liquid',
    description: 'Concentrated liquid formula.',
    longDescription: 'Makkhi Concentrated Liquid is a powerful concentrate designed to be diluted for external application. Provides long-lasting protection against flies and other insects.',
    price: 719.95,
    imageUrl: eighteen,
    rating: 4.7,
    reviewCount: 87,
    stock: 18,
    features: [
      'Concentrated formula',
      'Economical usage',
      'Long-lasting effect',
      'Fast-acting protection'
    ],
    color: '#8338EC'
  },
  {
    id: 'makkhi-injection',
    name: 'Makkhi Injection',
    description: 'Injectable health boost.',
    longDescription: 'Makkhi Injection provides rapid systemic protection against parasites. The injectable form ensures quick absorption and distribution throughout the body for comprehensive protection.',
    price: 179.95,
    imageUrl: nineteen,
    rating: 4.9,
    reviewCount: 93,
    stock: 7,
    features: [
      'Rapid onset of action',
      'Systemic protection',
      'Comprehensive coverage',
      'Veterinarian recommended'
    ],
    color: '#FB5607'
  }
];
