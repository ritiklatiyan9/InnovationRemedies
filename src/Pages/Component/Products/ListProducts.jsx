import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Filter,
  Vegan,
  Flower2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

// Import all images
import R3 from '../../../assets/Images/R3.png';
import nine from '../../../assets/Images/nine.png';
import eight from '../../../assets/Images/eight.png';
import thirteen from '../../../assets/Images/thirteen.png';
import fourteen from '../../../assets/Images/fourteen.png';
import fifteen from '../../../assets/Images/fifteen.png';
import sixteen from '../../../assets/Images/sixteen.png';
import seventeen from '../../../assets/Images/seventeen.png';
import eighteen from '../../../assets/Images/eighteen.png';
import nineteen from '../../../assets/Images/nineteen.png';
import logo from '../../../assets/Images/logo.png';
import twoone from '../../../assets/Images/twoone.png';
import twothree from '../../../assets/Images/twothree.png';
import twotwo from '../../../assets/Images/twotwo.png';
import twofour from '../../../assets/Images/twofour.png';
import twofive from '../../../assets/Images/twofive.png';
import twosix from '../../../assets/Images/twosix.png';
import calfshaktimini from '../../../assets/Images/calfshaktimini.jpg';
import sui from '../../../assets/Images/sui.png';
import three from '../../../assets/Images/three.png';
import tenn from '../../../assets/Images/tenn.png';
import wui from '../../../assets/Images/wui.jpg';
import icj from '../../../assets/Images/ict.jpg';

// Export productsData with enhanced SEO fields
export const productsData = [
  // 1. Resolution kit - 549
  {
    id: 'resolution-kit',
    name: 'Resolution Kit',
    brand: 'Innovation Remedies',
    category: 'Veterinary Care',
    subcategory: 'Diagnostic Kits',
    description: 'Complete resolution kit for veterinary care',
    longDescription: 'Our Resolution Kit offers a comprehensive solution for various veterinary care needs. It includes essential components to aid in quick diagnosis and effective treatment, ensuring animal well-being. Ideal for field veterinarians and clinics.',
    metaDescription: 'Buy Resolution Kit for veterinary care at ₹549. Complete diagnostic solution for animal health. Essential for field veterinarians & clinics. Innovation Remedies India.',
    keywords: ['resolution kit', 'veterinary diagnostic kit', 'animal health kit', 'veterinary care equipment', 'field veterinary kit', 'innovation remedies resolution kit'],
    price: 549.00,
    currency: 'INR',
    imageUrl: twoone,
    imageFileName: 'resolution.png',
    imageAlt: 'Resolution Kit - Complete Veterinary Diagnostic Solution by Innovation Remedies',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 1,
    rating: 4.7,
    reviewCount: 156,
    stock: 25,
    inStock: true,
    sku: 'IR-RES-KIT-001',
    gtin: '8901234567890',
    features: ['Comprehensive care', 'Veterinary grade', 'Easy to use'],
    benefits: ['Quick diagnosis capability', 'Field-ready portable design', 'All-in-one solution'],
    applications: ['Field veterinary practice', 'Animal clinics', 'Emergency care'],
    packSize: '1 Kit',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 2. Innolact Adj Super 5ut - 1490
  {
    id: 'innolact-adj-super-5ut',
    name: 'Innolact AD3',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals',
    longDescription: 'Innolact AD3 is an advanced lactation supplement specifically formulated for dairy animals. It enhances milk production, improves milk quality, and supports the overall health of lactating animals. Contains vital vitamins and minerals.',
    metaDescription: 'Innolact AD3 - Advanced lactation supplement for dairy animals ₹1490. Boost milk production & quality. Vitamin AD3 enriched formula by Innovation Remedies.',
    keywords: ['innolact ad3', 'lactation supplement', 'dairy supplement', 'milk production booster', 'vitamin ad3 for cattle', 'innovation remedies innolact'],
    price: 1490.00,
    currency: 'INR',
    imageUrl: twotwo,
    imageFileName: 'nine.png',
    imageAlt: 'Innolact AD3 - Premium Lactation Supplement for Dairy Animals',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-002',
    gtin: '8901234567891',
    features: ['Boosts milk yield', 'Enhances milk quality', 'Supports udder health'],
    benefits: ['Increases daily milk production', 'Improves fat percentage in milk', 'Maintains animal health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Lactating animals'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 3. Innolact gold 5ut - 1350
  {
    id: 'innolact-gold-5ut',
    name: 'Innolact AD3 Gold',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation',
    longDescription: 'Innolact AD3 Gold is our premium formula for superior lactation support. It includes chelated minerals and high-potency vitamins to maximize milk production and maintain animal health during peak lactation periods.',
    metaDescription: 'Innolact AD3 Gold ₹1350 - Premium lactation formula with chelated minerals. Maximum milk production for dairy animals. Innovation Remedies premium range.',
    keywords: ['innolact gold', 'premium lactation supplement', 'chelated minerals cattle', 'peak lactation support', 'innovation remedies gold', 'dairy gold supplement'],
    price: 1350.00,
    currency: 'INR',
    imageUrl: twothree,
    imageFileName: 'gold.png',
    imageAlt: 'Innolact AD3 Gold - Premium Chelated Mineral Formula for Peak Lactation',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-003',
    gtin: '8901234567892',
    features: ['Premium formulation', 'Maximized milk production', 'With chelated minerals'],
    benefits: ['Superior bioavailability', 'Peak lactation support', 'Enhanced mineral absorption'],
    applications: ['High-yielding dairy cattle', 'Premium dairy farms', 'Peak lactation period'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 4. Innolact sul - 800
  {
    id: 'innolact-Gel',
    name: 'Innolact Gel Advance',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Gel Formulations',
    description: 'Sulfur-enhanced lactation supplement',
    longDescription: 'Innolact Gel Advance is a unique sulfur-enhanced supplement designed to support lactation and improve metabolic functions in dairy animals. The gel form ensures easy administration and quick absorption.',
    metaDescription: 'Innolact Gel Advance ₹800 - Sulfur-enhanced gel supplement for dairy animals. Easy administration, quick absorption. Innovation Remedies veterinary products.',
    keywords: ['innolact gel', 'sulfur supplement cattle', 'gel lactation supplement', 'metabolic support dairy', 'innovation remedies gel', 'dairy gel supplement'],
    price: 800.00,
    currency: 'INR',
    imageUrl: twofive,
    imageFileName: 'sul.png',
    imageAlt: 'Innolact Gel Advance - Sulfur-Enhanced Gel Supplement for Dairy Animals',
    gradientFrom: 'from-yellow-100',
    gradientTo: 'to-yellow-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 78,
    stock: 22,
    inStock: true,
    sku: 'IR-INNO-GEL-004',
    gtin: '8901234567893',
    features: ['Sulfur-enhanced', 'Easy gel administration', 'Supports metabolic health'],
    benefits: ['Improves protein synthesis', 'Better nutrient utilization', 'Quick absorption formula'],
    applications: ['All dairy animals', 'Metabolic disorders', 'Lactation support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 5. Innolact gel Advance 500gm - 380
  {
    id: 'innolact-gel-advance-500',
    name: 'Innolact Gel Advance 500gm',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Gel Formulations',
    description: 'Advanced gel formula for lactation support',
    longDescription: 'This 500gm pack of Innolact Gel Advance provides a convenient supply of our advanced gel formula for consistent lactation support. Ideal for managing multiple animals or for extended use.',
    metaDescription: 'Innolact Gel Advance 500gm pack ₹380. Cost-effective lactation gel supplement for dairy farms. Quick absorption formula by Innovation Remedies.',
    keywords: ['innolact gel 500gm', 'bulk lactation gel', 'dairy farm supplement', 'cost effective dairy gel', 'innovation remedies 500gm', 'lactation gel pack'],
    price: 380.00,
    currency: 'INR',
    imageUrl: twofour,
    imageFileName: 'gel500.png',
    imageAlt: 'Innolact Gel Advance 500gm - Economy Pack Lactation Gel Supplement',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5,
    rating: 4.9,
    reviewCount: 135,
    stock: 40,
    inStock: true,
    sku: 'IR-INNO-GEL500-005',
    gtin: '8901234567894',
    features: ['Advanced gel formula', 'Cost-effective 500gm pack', 'Quick absorption'],
    benefits: ['Bulk packaging savings', 'Extended supply', 'Consistent quality'],
    applications: ['Multi-animal farms', 'Regular supplementation', 'Dairy cooperatives'],
    packSize: '500 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 7. Innolact bolus 40 bolus - 449
  {
    id: 'innolact-bolus-40',
    name: 'Innolact Bolus 40 Bolus',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Bolus Formulations',
    description: 'Lactation support in convenient bolus form',
    longDescription: 'Innolact Bolus offers lactation support in a convenient and easy-to-administer bolus form. Each bolus is packed with essential nutrients to aid milk production and animal health. Pack of 40.',
    metaDescription: 'Innolact Bolus pack of 40 ₹449. Convenient bolus form lactation supplement. Sustained release formula for dairy animals by Innovation Remedies.',
    keywords: ['innolact bolus', 'lactation bolus', 'dairy bolus supplement', 'bolus pack 40', 'sustained release bolus', 'innovation remedies bolus'],
    price: 449.00,
    currency: 'INR',
    imageUrl: twosix,
    imageFileName: 'bolus.png',
    imageAlt: 'Innolact Bolus - Pack of 40 Sustained Release Lactation Boluses',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 68,
    stock: 50,
    inStock: true,
    sku: 'IR-INNO-BOL40-006',
    gtin: '8901234567895',
    features: ['Convenient bolus form', 'Sustained release', 'Pack of 40'],
    benefits: ['Easy administration', 'Long-lasting effect', 'No daily dosing needed'],
    applications: ['Large ruminants', 'Dairy cattle', 'Buffaloes'],
    packSize: '40 Boluses',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 8. Calfshakti 1ut - 750
  {
    id: 'calfshakti',
    name: 'CalfShakti (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Enhanced nutrition for calves',
    longDescription: 'CalfShakti (1Ltr) provides enhanced nutrition crucial for the healthy growth and development of calves. It supports immune function and helps in achieving optimal weight gain.',
    metaDescription: 'CalfShakti 1 Liter ₹750 - Premium calf nutrition supplement. Boost immunity & growth in young calves. Innovation Remedies calf care products.',
    keywords: ['calfshakti', 'calf supplement', 'calf nutrition', 'calf growth booster', 'young calf care', 'innovation remedies calfshakti'],
    price: 750.00,
    currency: 'INR',
    imageUrl: thirteen,
    imageFileName: 'thirteen.png',
    imageAlt: 'CalfShakti 1 Liter - Complete Nutrition Supplement for Healthy Calf Growth',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 2,
    rating: 4.8,
    reviewCount: 105,
    stock: 18,
    inStock: true,
    sku: 'IR-CALF-1L-007',
    gtin: '8901234567896',
    features: ['Supports calf growth', 'Boosts immunity', '1 Liter pack'],
    benefits: ['Optimal weight gain', 'Strong immune system', 'Healthy development'],
    applications: ['Young calves', 'Post-weaning nutrition', 'Growth phase support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 9. Calfshakti 500ml - 419
  {
    id: 'calfshakti-500ml',
    name: 'CalfShakti 500ml',
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Nutrition supplement for young calves',
    longDescription: 'The 500ml pack of CalfShakti offers a targeted nutrition supplement for young calves, promoting vitality and healthy development during their critical early stages.',
    metaDescription: 'CalfShakti 500ml ₹419 - Essential nutrition for young calves. Promotes vitality & healthy development. Innovation Remedies calf care range.',
    keywords: ['calfshakti 500ml', 'small calf supplement', 'young calf nutrition', 'calf starter supplement', 'calf vitality booster', 'innovation remedies 500ml'],
    price: 419.00,
    currency: 'INR',
    imageUrl: calfshaktimini,
    imageFileName: 'calf500.png',
    imageAlt: 'CalfShakti 500ml - Starter Pack Nutrition Supplement for Young Calves',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 5,
    rating: 4.7,
    reviewCount: 87,
    stock: 25,
    inStock: true,
    sku: 'IR-CALF-500ML-008',
    gtin: '8901234567897',
    features: ['For young calves', 'Promotes vitality', 'Convenient 500ml size'],
    benefits: ['Early stage nutrition', 'Builds strong foundation', 'Easy to administer'],
    applications: ['Newborn calves', 'Pre-weaning phase', 'Small farms'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 10. Badda H 1ut - 1650
  {
    id: 'badda-h-1ut',
    name: 'Badda H (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Health Supplements',
    subcategory: 'Urinary & Digestive Care',
    description: 'Supports urinary tract and digestive health in animals',
    longDescription: 'Badda H (1Ltr) is formulated to support and maintain urinary tract and digestive health in animals. It aids in preventing common issues and promotes overall systemic balance.',
    metaDescription: 'Badda H 1 Liter ₹1650 - Urinary tract & digestive health supplement for animals. Prevents common issues, promotes systemic balance. Innovation Remedies.',
    keywords: ['badda h', 'urinary health animals', 'digestive health supplement', 'systemic balance animals', 'innovation remedies badda', 'animal health supplement'],
    price: 1650.00,
    currency: 'INR',
    imageUrl: eight,
    imageFileName: 'eight.png',
    imageAlt: 'Badda H 1 Liter - Urinary Tract and Digestive Health Support for Animals',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 12,
    inStock: true,
    sku: 'IR-BADDA-1L-009',
    gtin: '8901234567898',
    features: ['Urinary tract support', 'Digestive health aid', 'Systemic balance'],
    benefits: ['Prevents UTI issues', 'Improves digestion', 'Overall health maintenance'],
    applications: ['All livestock', 'Preventive care', 'Treatment support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 11. Racer kit - (price not specified)
  {
    id: 'racer-kit',
    name: 'Racer Kit',
    brand: 'Innovation Remedies',
    category: 'Performance Enhancement',
    subcategory: 'Racing Animal Care',
    description: 'Performance enhancement kit for racing animals',
    longDescription: 'The Racer Kit is a specialized performance enhancement solution for racing animals. It is designed to optimize energy, stamina, and recovery for peak competitive performance. (Price on Request)',
    metaDescription: 'Racer Kit by Innovation Remedies - Performance enhancement for racing animals. Optimize energy, stamina & recovery. Price on request. Premium racing care.',
    keywords: ['racer kit', 'racing animal supplement', 'performance enhancement animals', 'racing horse supplement', 'stamina booster animals', 'innovation remedies racer'],
    price: 0.00,
    currency: 'INR',
    imageUrl: sui,
    imageFileName: 'racer.png',
    imageAlt: 'Racer Kit - Professional Performance Enhancement Kit for Racing Animals',
    gradientFrom: 'from-red-100',
    gradientTo: 'to-red-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 93,
    stock: 5,
    inStock: true,
    sku: 'IR-RACER-KIT-010',
    gtin: '8901234567899',
    features: ['Performance enhancement', 'Optimizes energy & stamina', 'Supports recovery'],
    benefits: ['Peak performance', 'Faster recovery times', 'Competitive edge'],
    applications: ['Racing horses', 'Competition animals', 'High-performance sports'],
    packSize: '1 Kit',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 12. Innoliv DS 1ut - 325
  {
    id: 'innoliv-ds-1ut',
    name: 'Innoliv DS (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Liver Care',
    subcategory: 'Hepatic Supplements',
    description: 'Advanced liver support supplement for animal vitality',
    longDescription: 'Innoliv DS (1Ltr) is an advanced liver support supplement that promotes detoxification and enhances overall animal vitality. Essential for maintaining liver health and function.',
    metaDescription: 'Innoliv DS 1 Liter ₹325 - Advanced liver support for animals. Promotes detoxification & vitality. Innovation Remedies hepatic care products.',
    keywords: ['innoliv ds', 'liver support animals', 'hepatic supplement', 'detoxification animals', 'liver care veterinary', 'innovation remedies innoliv'],
    price: 325.00,
    currency: 'INR',
    imageUrl: fourteen,
    imageFileName: 'fourteen.png',
    imageAlt: 'Innoliv DS 1 Liter - Advanced Liver Support and Detoxification Supplement',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5,
    rating: 4.9,
    reviewCount: 135,
    stock: 35,
    inStock: true,
    sku: 'IR-INNO-LIV-011',
    gtin: '8901234567900',
    features: ['Advanced liver support', 'Promotes detoxification', 'Enhances vitality'],
    benefits: ['Liver protection', 'Toxin elimination', 'Improved metabolism'],
    applications: ['All animals', 'Post-medication care', 'Preventive hepatic care'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 14. Urocoenta Advance - 380
  {
    id: 'urocoenta-advance',
    name: 'Urocoenta Advance',
    brand: 'Innovation Remedies',
    category: 'Urinary Care',
    subcategory: 'Kidney Health',
    description: 'Advanced urinary health supplement',
    longDescription: 'Urocoenta Advance is a cutting-edge supplement for maintaining urinary health in animals. It helps prevent urinary issues and supports healthy kidney function.',
    metaDescription: 'Urocoenta Advance ₹380 - Advanced urinary health supplement for animals. Supports kidney function & prevents UTI. Innovation Remedies urinary care.',
    keywords: ['urocoenta advance', 'urinary health supplement', 'kidney support animals', 'uti prevention animals', 'innovation remedies urocoenta', 'animal kidney care'],
    price: 380.00,
    currency: 'INR',
    imageUrl: three,
    imageFileName: 'three.png',
    imageAlt: 'Urocoenta Advance - Advanced Urinary and Kidney Health Supplement',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 5,
    rating: 4.6,
    reviewCount: 95,
    stock: 28,
    inStock: true,
    sku: 'IR-URO-ADV-012',
    gtin: '8901234567901',
    features: ['Advanced urinary health', 'Supports kidney function', 'Preventative care'],
    benefits: ['UTI prevention', 'Kidney stone prevention', 'Maintains pH balance'],
    applications: ['All livestock', 'Preventive care', 'Kidney support'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 15. Glucodyna 1ut - 750
  {
    id: 'glucodyna-1ut',
    name: 'Glucodyna (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Energy Supplements',
    subcategory: 'Glucose Support',
    description: 'Energy and glucose supplement for animals',
    longDescription: 'Glucodyna (1Ltr) is a vital energy and glucose supplement for animals, particularly useful during periods of stress, recovery, or high energy demand. Helps maintain blood glucose levels.',
    metaDescription: 'Glucodyna 1 Liter ₹750 - Instant energy & glucose supplement for animals. Stress recovery support. Innovation Remedies energy care products.',
    keywords: ['glucodyna', 'glucose supplement animals', 'energy booster animals', 'stress recovery animals', 'innovation remedies glucodyna', 'animal energy supplement'],
    price: 750.00,
    currency: 'INR',
    imageUrl: tenn,
    imageFileName: 'gluco.png',
    imageAlt: 'Glucodyna 1 Liter - Instant Energy and Glucose Support for Animals',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 110,
    stock: 10,
    inStock: true,
    sku: 'IR-GLUCO-1L-013',
    gtin: '8901234567902',
    features: ['Instant energy source', 'Maintains glucose levels', 'Aids recovery'],
    benefits: ['Quick energy boost', 'Prevents hypoglycemia', 'Stress management'],
    applications: ['Post-surgery recovery', 'High stress periods', 'Energy deficiency'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 16. R3 Vet Bolus - 250
  {
    id: 'r3-vet-bolus',
    name: 'R3 Vet Bolus',
    brand: 'Innovation Remedies',
    category: 'General Health',
    subcategory: 'Multi-Purpose Supplements',
    description: 'Premium veterinary supplement for animal health',
    longDescription: 'R3 Vet Bolus is a premium multi-purpose veterinary supplement designed to support overall animal health and well-being. Convenient bolus form for easy administration.',
    metaDescription: 'R3 Vet Bolus ₹250 - Premium multi-purpose veterinary supplement. Overall animal health support. Innovation Remedies veterinary bolus range.',
    keywords: ['r3 vet bolus', 'veterinary bolus', 'multi purpose supplement', 'animal health bolus', 'innovation remedies r3', 'general health supplement'],
    price: 250.00,
    currency: 'INR',
    imageUrl: R3,
    imageFileName: 'R3.png',
    imageAlt: 'R3 Vet Bolus - Premium Multi-Purpose Veterinary Health Supplement',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 156,
    stock: 60,
    inStock: true,
    sku: 'IR-R3-BOL-014',
    gtin: '8901234567903',
    features: ['Premium supplement', 'Overall animal health', 'Convenient bolus'],
    benefits: ['Complete nutrition', 'Easy administration', 'Long shelf life'],
    applications: ['All animals', 'Routine supplementation', 'Health maintenance'],
    packSize: '10 Boluses',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 17. Innoworm XL 100ml - 150
  {
    id: 'innoworm-xl-100ml',
    name: 'Innoworm XL 100ml',
    brand: 'Innovation Remedies',
    category: 'Parasite Control',
    subcategory: 'Dewormers',
    description: 'Effective parasite control for healthier livestock',
    longDescription: 'Innoworm XL (100ml) provides effective and broad-spectrum parasite control for healthier livestock. Helps improve growth rates and overall animal productivity by managing worm infestations.',
    metaDescription: 'Innoworm XL 100ml ₹150 - Broad-spectrum dewormer for livestock. Effective parasite control. Innovation Remedies deworming solutions.',
    keywords: ['innoworm xl', 'dewormer livestock', 'parasite control animals', 'worm medicine animals', 'innovation remedies innoworm', 'anthelmintic veterinary'],
    price: 150.00,
    currency: 'INR',
    imageUrl: fifteen,
    imageFileName: 'fifteen.png',
    imageAlt: 'Innoworm XL 100ml - Broad-Spectrum Dewormer for Livestock',
    gradientFrom: 'from-green-100',
    gradientTo: 'to-green-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 91,
    stock: 45,
    inStock: true,
    sku: 'IR-WORM-XL100-015',
    gtin: '8901234567904',
    features: ['Broad-spectrum dewormer', 'For healthier livestock', '100ml pack'],
    benefits: ['Controls all worms', 'Improves weight gain', 'Better feed conversion'],
    applications: ['Cattle deworming', 'Sheep & goats', 'Regular parasite control'],
    packSize: '100 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 18. Innoworm 30ml - 45
  {
    id: 'innoworm-30ml',
    name: 'Innoworm 30ml',
    brand: 'Innovation Remedies',
    category: 'Parasite Control',
    subcategory: 'Dewormers',
    description: 'Nutritional supplement for healthy weight gain and growth',
    longDescription: 'Innoworm 30ml is a nutritional supplement formulated for healthy weight gain and growth in young or recovering animals. Its palatable formula ensures easy acceptance.',
    metaDescription: 'Innoworm 30ml ₹45 - Dewormer for young animals. Supports weight gain & growth. Palatable formula by Innovation Remedies.',
    keywords: ['innoworm 30ml', 'small animal dewormer', 'young animal parasite control', 'growth dewormer', 'innovation remedies 30ml', 'palatable dewormer'],
    price: 45.00,
    currency: 'INR',
    imageUrl: sixteen,
    imageFileName: 'sixteen.png',
    imageAlt: 'Innoworm 30ml - Palatable Dewormer for Young and Small Animals',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 30,
    rating: 4.6,
    reviewCount: 68,
    stock: 0,
    inStock: true,
    sku: 'IR-WORM-30ML-016',
    gtin: '8901234567905',
    features: ['Supports weight gain', 'Promotes growth', 'Palatable formula'],
    benefits: ['Easy acceptance', 'Gentle on young animals', 'Growth promotion'],
    applications: ['Young animals', 'Small animals', 'Post-weaning care'],
    packSize: '30 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 19. Weight boost 3kg - 1250
  {
    id: 'weight-boost-3kg',
    name: 'Weight Boost 3kg',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements',
    subcategory: 'Weight Gain',
    description: 'Weight gain supplement for livestock',
    longDescription: 'Weight Boost (3kg) is a high-calorie supplement designed to promote significant weight gain in livestock. Ideal for animals needing to build mass or recover condition.',
    metaDescription: 'Weight Boost 3kg ₹1250 - High-calorie weight gain supplement for livestock. Build mass & improve body condition. Innovation Remedies nutrition.',
    keywords: ['weight boost 3kg', 'weight gain supplement', 'livestock mass gainer', 'high calorie feed', 'innovation remedies weight boost', 'animal weight supplement'],
    price: 1250.00,
    currency: 'INR',
    imageUrl: wui,
    imageFileName: 'weight.png',
    imageAlt: 'Weight Boost 3kg - High-Calorie Weight Gain Supplement for Livestock',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 120,
    stock: 8,
    inStock: true,
    sku: 'IR-WEIGHT-3KG-017',
    gtin: '8901234567906',
    features: ['High-calorie formula', 'Promotes mass gain', '3kg economy pack'],
    benefits: ['Rapid weight gain', 'Improved body condition', 'Better market value'],
    applications: ['Underweight animals', 'Pre-market preparation', 'Recovery feeding'],
    packSize: '3 kg',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 22. Makkhi Soap 75gm - 120
  {
    id: 'makkhi-soap-75gm',
    name: 'Makkhi Soap 75gm',
    brand: 'Innovation Remedies',
    category: 'Animal Hygiene',
    subcategory: 'Insect Repellents',
    description: 'Herbal insect repellent soap for animal hygiene and comfort',
    longDescription: 'Makkhi Soap (75gm) is a herbal insect repellent soap that ensures animal hygiene and comfort. It effectively repels flies and other ectoparasites while being gentle on the skin.',
    metaDescription: 'Makkhi Soap 75gm ₹120 - Herbal insect repellent soap for animals. Repels flies & ectoparasites. Gentle skin care by Innovation Remedies.',
    keywords: ['makkhi soap', 'insect repellent soap', 'fly repellent animals', 'herbal animal soap', 'innovation remedies makkhi', 'ectoparasite control'],
    price: 120.00,
    currency: 'INR',
    imageUrl: seventeen,
    imageFileName: 'seventeen.png',
    imageAlt: 'Makkhi Soap 75gm - Herbal Insect Repellent Soap for Animal Hygiene',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 20,
    rating: 4.8,
    reviewCount: 105,
    stock: 70,
    inStock: true,
    sku: 'IR-MAKKHI-SOAP-018',
    gtin: '8901234567907',
    features: ['Herbal insect repellent', 'Gentle on skin', 'Promotes hygiene'],
    benefits: ['Natural fly control', 'Skin conditioning', 'Pleasant fragrance'],
    applications: ['Daily animal bathing', 'Fly season protection', 'Skin care routine'],
    packSize: '75 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 23. Makkhi 15ml - 85.90
  {
    id: 'makkhi-15ml',
    name: 'Makkhi 15ml',
    brand: 'Innovation Remedies',
    category: 'Pest Control',
    subcategory: 'Concentrated Solutions',
    description: 'Potent concentrated liquid formula for effective pest control',
    longDescription: 'Makkhi 15ml is a potent, concentrated liquid formula for effective control of flies and other pests. Its concentrated nature ensures efficacy even with small doses.',
    metaDescription: 'Makkhi 15ml ₹85.90 - Concentrated fly & pest control liquid. Potent formula for effective results. Innovation Remedies pest solutions.',
    keywords: ['makkhi 15ml', 'concentrated pest control', 'fly control liquid', 'pest repellent concentrate', 'innovation remedies concentrate', 'animal pest control'],
    price: 85.90,
    currency: 'INR',
    imageUrl: eighteen,
    imageFileName: 'eighteen.png',
    imageAlt: 'Makkhi 15ml - Potent Concentrated Pest Control Formula',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 87,
    stock: 55,
    inStock: true,
    sku: 'IR-MAKKHI-15ML-019',
    gtin: '8901234567908',
    features: ['Potent concentrate', 'Effective pest control', 'Economical 15ml pack'],
    benefits: ['Long-lasting effect', 'Cost-effective solution', 'Multiple pest control'],
    applications: ['Stable pest control', 'Fly prevention', 'Area treatment'],
    packSize: '15 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 24. Makkhi 6ml - 54.90
  {
    id: 'makkhi-6ml',
    name: 'Makkhi 6ml',
    brand: 'Innovation Remedies',
    category: 'Pest Control',
    subcategory: 'Quick Solutions',
    description: 'Fast-acting liquid solution for pest control',
    longDescription: 'This Makkhi 6ml pack offers a fast-acting liquid solution for quick pest control. Ideal for spot treatments or smaller applications where immediate action is needed.',
    metaDescription: 'Makkhi 6ml ₹54.90 - Fast-acting pest control solution. Quick knockdown formula for immediate results. Innovation Remedies pest care.',
    keywords: ['makkhi 6ml', 'fast acting pest control', 'quick fly control', 'spot treatment pest', 'innovation remedies 6ml', 'instant pest solution'],
    price: 54.90,
    currency: 'INR',
    imageUrl: nineteen,
    imageFileName: 'nineteen.png',
    imageAlt: 'Makkhi 6ml - Fast-Acting Pest Control for Spot Treatment',
    gradientFrom: 'from-violet-100',
    gradientTo: 'to-violet-50',
    minQuantity: 30,
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-MAKKHI-6ML-020',
    gtin: '8901234567909',
    features: ['Fast-acting solution', 'Quick pest knockdown', 'Convenient 6ml size'],
    benefits: ['Immediate results', 'Easy spot application', 'Trial size available'],
    applications: ['Emergency pest control', 'Small area treatment', 'Quick intervention'],
    packSize: '6 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 25. Innocel Tag330 4.5gm - 415
  {
    id: 'innocel-tag330-4.5gm',
    name: 'Innocef Tazo 4.5gm',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics',
    description: 'Advanced cellular supplement for animals',
    longDescription: 'Innocef Tazo 4.5gm is an advanced injectable antibiotic combination (Ceftriaxone & Tazobactam) for treating severe bacterial infections in animals. Provides broad-spectrum coverage.',
    metaDescription: 'Innocef Tazo 4.5gm ₹415 - Injectable antibiotic (Ceftriaxone & Tazobactam) for severe infections. Innovation Remedies veterinary antibiotics.',
    keywords: ['innocef tazo', 'ceftriaxone tazobactam', 'injectable antibiotic', 'veterinary antibiotic', 'innovation remedies antibiotic', 'severe infection treatment'],
    price: 415.00,
    currency: 'INR',
    imageUrl: icj,
    imageFileName: 'innocel.png',
    imageAlt: 'Innocef Tazo 4.5gm - Advanced Injectable Antibiotic for Severe Infections',
    gradientFrom: 'from-emerald-100',
    gradientTo: 'to-emerald-50',
    minQuantity: 10,
    rating: 4.8,
    reviewCount: 85,
    stock: 20,
    inStock: true,
    sku: 'IR-INNO-TAZO-021',
    gtin: '8901234567910',
    features: ['Injectable antibiotic', 'Ceftriaxone & Tazobactam', 'Treats severe infections'],
    benefits: ['Broad-spectrum action', 'Rapid recovery', 'Hospital-grade treatment'],
    applications: ['Severe bacterial infections', 'Post-surgical prophylaxis', 'Resistant infections'],
    packSize: '4.5 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } },
};

const DEFAULT_GRADIENT_FROM = 'from-slate-100';
const DEFAULT_GRADIENT_TO = 'to-slate-50';

function ProductCard({ 
  id, 
  name, 
  brand,
  description, 
  price, 
  currency,
  imageUrl, 
  imageAlt,
  gradientFrom = DEFAULT_GRADIENT_FROM, 
  gradientTo = DEFAULT_GRADIENT_TO, 
  minQuantity, 
  rating, 
  reviewCount,
  stock,
  inStock,
  sku
}) {
  const navigate = useNavigate();

  const gradientClasses = `bg-gradient-to-br ${gradientFrom} ${gradientTo}`;

  const handleCardClick = () => navigate(`/product/${id}`);
  const imgSrc = typeof imageUrl === 'string' ? imageUrl : imageUrl?.src;

  // Microdata for rich snippets
  const productMicrodata = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "image": imgSrc,
    "description": description,
    "sku": sku,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.innovationremedies.com/product/${id}`,
      "priceCurrency": currency,
      "price": price,
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Innovation Remedies"
      }
    }
  };

  if (rating && reviewCount > 0) {
    productMicrodata.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": rating,
      "reviewCount": reviewCount
    };
  }

  return (
    <motion.div variants={itemVariants} className="h-full flex flex-col">
      <Card
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick()}
        className={`group w-full overflow-hidden rounded-2xl border-none shadow-lg hover:shadow-2xl transition-all duration-300 ease-out flex flex-col cursor-pointer ${gradientClasses}`}
        itemScope
        itemType="https://schema.org/Product"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productMicrodata) }} />
        
        <div className="relative w-full h-[170px] sm:h-[200px] md:h-[220px] flex items-center justify-center p-2 sm:p-3 overflow-hidden">
          <motion.img
            src={imgSrc}
            alt={imageAlt}
            title={`${name} - ${brand} Veterinary Products`}
            className="object-contain w-full h-full drop-shadow-xl transition-transform duration-300 ease-out group-hover:scale-105"
            loading="lazy"
            itemProp="image"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <CardContent className="p-5 pt-3 bg-white/70 backdrop-blur-sm rounded-b-2xl flex flex-col flex-grow text-left space-y-2.5">
          <h3 className="text-md sm:text-lg font-bold text-slate-800 leading-tight group-hover:text-sky-600 transition-colors" title={name} itemProp="name">
            {name}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 min-h-[40px]" itemProp="description">
              {description}
            </p>
          )}
          {typeof rating === 'number' && typeof reviewCount === 'number' && reviewCount > 0 && (
            <div className="flex items-center text-xs text-amber-600 mt-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <Sparkles size={14} className="mr-1 fill-amber-400 text-amber-500" />
              <span itemProp="ratingValue">{rating.toFixed(1)}</span> 
              (<span itemProp="reviewCount">{reviewCount}</span> reviews)
            </div>
          )}
          <div className="pt-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <link itemProp="url" href={`https://www.innovationremedies.com/product/${id}`} />
            <meta itemProp="availability" content={inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
            <meta itemProp="priceCurrency" content={currency} />
            <div>
              <p className="text-sm sm:text-base font-semibold text-slate-900">
                {price > 0 ? <span itemProp="price" content={price}>₹{price.toFixed(2)}</span> : 'Price on Request'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Min. {minQuantity} units
              </p>
            </div>
            <Button
              onClick={e => { e.stopPropagation(); handleCardClick(); }}
              variant="default"
              size="sm"
              className="w-full sm:w-auto mt-2 sm:mt-0 rounded-lg text-xs sm:text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              disabled={!inStock}
            >
              <ShoppingCart size={16} className="mr-1.5" />
              {inStock ? 'Details' : 'Out of Stock'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ListProducts() {
  const domain = "https://www.innovationremedies.com";
  const canonicalUrl = `${domain}/products`;
  const currentDate = new Date().toISOString();

  // Calculate aggregate ratings for the page
  const totalRating = productsData.reduce((acc, p) => acc + (p.rating || 0) * (p.reviewCount || 0), 0);
  const totalReviews = productsData.reduce((acc, p) => acc + (p.reviewCount || 0), 0);
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

  // Enhanced structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema
      {
        "@type": "Organization",
        "@id": `${domain}/#organization`,
        "name": "Innovation Remedies Pvt Ltd",
        "url": domain,
        "logo": {
          "@type": "ImageObject",
          "url": `${domain}/logo.png`,
          "width": 600,
          "height": 60
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-XXXXXXXXXX",
          "contactType": "sales",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
          "https://www.facebook.com/innovationremedies",
          "https://www.linkedin.com/company/innovation-remedies",
          "https://twitter.com/innovremedies"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Meerut",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      },
      // WebSite Schema with SearchAction
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        "url": domain,
        "name": "Innovation Remedies - Veterinary Products",
        "description": "Leading manufacturer of veterinary medicines, animal health supplements, and livestock care products in India",
        "publisher": {
          "@id": `${domain}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${domain}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // BreadcrumbList Schema
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": domain
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": canonicalUrl
          }
        ]
      },
      // ItemList Schema for Products
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}/#productlist`,
        "name": "Innovation Remedies Veterinary Products",
        "description": "Complete range of veterinary medicines, supplements, and animal health products",
        "numberOfItems": productsData.length,
        "itemListElement": productsData.map((product, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "@id": `${domain}/product/${product.id}`,
            "name": product.name,
            "description": product.longDescription,
            "image": product.imageUrl,
            "brand": {
              "@type": "Brand",
              "name": product.brand
            },
            "manufacturer": {
              "@type": "Organization",
              "name": product.manufacturer
            },
            "category": product.category,
            "sku": product.sku,
            "gtin": product.gtin,
            "offers": {
              "@type": "Offer",
              "url": `${domain}/product/${product.id}`,
              "priceCurrency": product.currency,
              "price": product.price,
              "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@id": `${domain}/#organization`
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "IN"
                },
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "INR"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 0,
                    "maxValue": 1,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 5,
                    "unitCode": "DAY"
                  }
                }
              }
            },
            "aggregateRating": product.rating && product.reviewCount > 0 ? {
              "@type": "AggregateRating",
              "ratingValue": product.rating,
              "reviewCount": product.reviewCount
            } : undefined,
            "review": product.rating && product.reviewCount > 0 ? {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": product.rating,
                "bestRating": "5"
              },
              "author": {
                "@type": "Organization",
                "name": "Innovation Remedies Customers"
              }
            } : undefined
          }
        }))
      },
      // CollectionPage Schema
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": "Veterinary Products - Innovation Remedies | Animal Health Supplements India",
        "isPartOf": {
          "@id": `${domain}/#website`
        },
        "about": {
          "@type": "Thing",
          "name": "Veterinary Medicine and Animal Health Products"
        },
        "description": "Shop premium veterinary medicines, lactation supplements, dewormers, and animal health products. Innovation Remedies - trusted by veterinarians across India.",
        "breadcrumb": {
          "@id": `${canonicalUrl}/#breadcrumb`
        },
        "mainEntity": {
          "@id": `${canonicalUrl}/#productlist`
        },
        "datePublished": "2024-01-01T00:00:00+05:30",
        "dateModified": currentDate
      }
    ]
  };

  // Create comprehensive meta description
  const metaDescription = "Buy veterinary medicines & animal health products online. ✓ Lactation supplements ✓ Dewormers ✓ Growth boosters ✓ Liver care. Innovation Remedies - India's trusted brand. Free shipping on bulk orders.";

  // Create focus keywords for the page
  const focusKeywords = [
    "veterinary products india",
    "animal health supplements",
    "cattle feed supplements",
    "lactation supplements dairy",
    "livestock medicines",
    "veterinary medicines online",
    "innovation remedies products",
    "animal care products india",
    "dairy farm supplements",
    "poultry medicines"
  ];

  return (
    <HelmetProvider>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Veterinary Products - Innovation Remedies | Animal Health Supplements India</title>
        <meta name="title" content="Veterinary Products - Innovation Remedies | Animal Health Supplements India" />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={focusKeywords.join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="Innovation Remedies Pvt Ltd" />
        <meta name="publisher" content="Innovation Remedies" />
        <meta name="copyright" content="Innovation Remedies Pvt Ltd" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9845;77.7064" />
        <meta name="ICBM" content="28.9845, 77.7064" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Veterinary Products - Innovation Remedies | Buy Animal Health Supplements" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={`${domain}/og-products-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Innovation Remedies Veterinary Products Collection" />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content="Veterinary Products - Innovation Remedies India" />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={`${domain}/twitter-products-image.jpg`} />
        <meta property="twitter:site" content="@innovremedies" />
        <meta property="twitter:creator" content="@innovremedies" />
        
        {/* Additional Meta Tags for E-commerce */}
        <meta property="product:brand" content="Innovation Remedies" />
        <meta property="product:availability" content="in stock" />
        <meta property="product:condition" content="new" />
        <meta property="product:price:currency" content="INR" />
        <meta property="product:retailer_item_id" content="innovation-remedies-products" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href={logo} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </Helmet>

      <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-600 text-white px-4 py-2 rounded">
          Skip to main content
        </a>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-slate-600">
              <li>
                <a href="/" className="hover:text-sky-600 transition-colors">Home</a>
              </li>
              <li className="flex items-center">
                <ChevronRight size={16} className="mx-2 text-slate-400" />
                <span className="font-medium text-slate-800">Products</span>
              </li>
            </ol>
          </nav>

          {/* Page Header with H1 */}
          <header className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Veterinary Products & Animal Health Supplements
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover our comprehensive range of veterinary medicines, supplements, and animal care products. 
              Trusted by veterinarians and farmers across India for over a decade.
            </p>
          </header>

          {/* Filter and Sort Bar */}
          <div className="sticky top-0 z-10 py-4 bg-slate-50/80 backdrop-blur-md mb-8 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Button variant="outline" size="sm" className="rounded-full text-xs sm:text-sm border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
                  <Vegan className="mr-1.5 h-4 w-4 text-green-500" /> Herbal
                </Button>
                <Button variant="outline" size="sm" className="rounded-full text-xs sm:text-sm border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
                  <Flower2 className="mr-1.5 h-4 w-4 text-pink-500" /> Natural
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-9 w-9 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400">
                  <Filter className="h-4 w-4" /><span className="sr-only">Filters</span>
                </Button>
              </div>
              <div className="w-full sm:w-auto sm:min-w-[180px]">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-full rounded-lg h-10 text-xs sm:text-sm border-slate-300 text-slate-700 focus:ring-sky-500 focus:border-sky-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance" className="text-xs sm:text-sm">Relevance</SelectItem>
                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc" className="text-xs sm:text-sm">Name: A–Z</SelectItem>
                    <SelectItem value="rating" className="text-xs sm:text-sm">Customer Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Main Product Grid */}
          <main id="main-content">
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {productsData.map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </motion.div>
          </main>

          {/* Pagination */}
          <nav aria-label="Pagination" className="flex justify-center mt-12 sm:mt-16 space-x-3">
            <Button variant="outline" size="default" className="rounded-lg text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-100 px-6" disabled>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button variant="default" size="default" className="rounded-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg px-6">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>

          {/* Trust Signals Section */}
          <section className="mt-20 sm:mt-28 border-t border-slate-200 pt-12 sm:pt-16">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="mx-auto h-12 w-12 text-amber-400 mb-4" />
             
              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-600">50+</div>
                  <div className="text-sm text-slate-600 mt-1">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-600">50,000+</div>
                  <div className="text-sm text-slate-600 mt-1">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-600">5</div>
                  <div className="text-sm text-slate-600 mt-1">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-600">14+</div>
                  <div className="text-sm text-slate-600 mt-1">Years Experience</div>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="mt-16 prose prose-slate max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Why Choose Innovation Remedies Veterinary Products?</h2>
            <p>
              Innovation Remedies has been a trusted name in animal healthcare since 2010. Our comprehensive range of veterinary products includes:
            </p>
            <ul>
              <li><strong>Lactation Supplements:</strong> Including Innolact AD3, Innolact Gold, and Gel formulations for optimal milk production</li>
              <li><strong>Growth Supplements:</strong> CalfShakti and Weight Boost for healthy animal development</li>
              <li><strong>Health Supplements:</strong> Liver care (Innoliv DS), urinary health (Urocoenta), and digestive support (Badda H)</li>
              <li><strong>Parasite Control:</strong> Innoworm range for effective deworming</li>
              <li><strong>Pest Control:</strong> Makkhi products for insect and fly control</li>
              <li><strong>Antibiotics:</strong> Innocef Tazo for treating severe infections</li>
            </ul>
            <p>
              All our products are manufactured in GMP-certified facilities and undergo rigorous quality testing to ensure safety and efficacy for your animals.
            </p>
          </section>

          {/* FAQ Schema Section */}
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-semibold text-lg" itemProp="name">What are the best lactation supplements for dairy cattle?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-600 mt-2">
                    Our top lactation supplements include Innolact AD3 Gold with chelated minerals, Innolact AD3 for daily supplementation, 
                    and Innolact Gel Advance for easy administration. These products are specifically formulated to boost milk production and quality.
                  </p>
                </div>
              </div>
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-semibold text-lg" itemProp="name">How to order Innovation Remedies products in bulk?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-600 mt-2">
                    For bulk orders, contact our sales team directly. We offer special pricing for veterinary clinics, dairy farms, and distributors. 
                    Minimum order quantities vary by product and are listed on each product page.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ListProducts;