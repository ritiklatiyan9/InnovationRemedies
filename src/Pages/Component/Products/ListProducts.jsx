import React, { useState, useEffect } from 'react'; // Added useState, useEffect
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
  Clock, // Added Clock icon
} from 'lucide-react';

// Import all images (assuming these paths are correct)
import R3 from '../../../assets/Images/R3.png';
import reskit from '../../../assets/Images/newresolutionkit.png';
import twentyone from '../../../assets/Images/twentyone.png';
import nine from '../../../assets/Images/nine.png';
import innoceftazo from '../../../assets/Images/innocaeftazo.png';
import eight from '../../../assets/Images/eight.png';
import thirteen from '../../../assets/Images/thirteen.png';
import innolactbolus from '../../../assets/Images/innolactbolus.png';
import fourteen from '../../../assets/Images/fourteen.png';
import fifteen from '../../../assets/Images/fifteen.png';
import calfshaktiml  from '../../../assets/Images/calfshaktiml.png';
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
import advcalf from '../../../assets/Images/advcalf.png';
import ui from '../../../assets/Images/ui.png';
import fiveltr from '../../../assets/Images/fiveltr.png';
import gly from '../../../assets/Video/gly.png';
import wui from '../../../assets/Images/wui.png';
import fourtybolus from '../../../assets/Images/fourtybolus.png';
import tryu from '../../../assets/Images/tryu.png';
import icj from '../../../assets/Images/ict.jpg';


// Original productsData (IDs should ideally be unique for all entries)
export const productsData = [
  // 1. RS-Kit (Updated from Resolution Kit)
  {
    id: 'rs-kit', // Changed from resolution-kit for clarity, image shows RS-Kit
    name: 'RS-Kit Fertility Kit', // Updated Name based on image reskit
    brand: 'Innovation Remedies',
    category: 'Veterinary Care',
    subcategory: 'Fertility Kits', // Updated subcategory
    description: 'Fertility kit for Anovulatory Estrus & Anoestrus in livestock.',
    longDescription: 'RS-Kit is a fertility kit containing Clomiphene Citrate and Copper Sulphate tablets. It is designed to manage conditions like Anovulatory Estrus, Anoestrus, Delayed Puberty, Cystic Ovarian Degeneration, Delayed Ovulation, and Early Embryonic Death in livestock, by stimulating the release of GnRH and subsequent ovulation.',
    metaDescription: 'Buy RS-Kit Fertility Kit for veterinary use at ₹450 (MRP ₹549). Addresses infertility issues in livestock. Innovation Remedies India.',
    keywords: ['rs-kit', 'fertility kit', 'clomiphene citrate', 'copper sulphate', 'anovulatory estrus', 'anoestrus', 'livestock fertility', 'innovation remedies rs-kit'],
    price: 450.00,
    MRP:549.00,
    currency: 'INR',
    imageUrl: reskit, // Image shows "RS-Kit"
    imageFileName: 'rs_kit_fertility_kit.png', // Updated filename
    imageAlt: 'RS-Kit Fertility Kit - Clomiphene Citrate & Copper Sulphate by Innovation Remedies',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 1,
    rating: 4.7,
    reviewCount: 156,
    stock: 25,
    inStock: true,
    sku: 'IR-RS-KIT-001', // Updated SKU
    gtin: '8901234567890',
    features: [
        'Combikit: Clomiphene Citrate 300mg (1 Tablet)',
        'Combikit: Copper Sulphate (Anhydrous) 750mg (2 Tablets)',
        'Treats Anovulatory Estrus & Anoestrus',
        'Stimulates Pituitary Gland for FSH & LH release'
    ],
    benefits: [
        'Addresses delayed puberty',
        'Helps with cystic ovarian degeneration',
        'Manages delayed ovulation and early embryonic death',
        'Promotes ovulation'
    ],
    applications: ['Anovulatory Estrus', 'Anoestrus', 'Delayed Puberty', 'Cystic Ovarian Degeneration', 'Delayed Ovulation', 'Early Embryonic Death'],
    packSize: '5 Combikits per pack', // Updated from image
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 2. Innolact AD3 (No new images, keeping as is)
  {
    id: 'innolact-ad3-5ltr',
    name: 'Innolact® AD3 (5 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (5 Liters)',
    longDescription: 'Innolact AD3 (5 Liters) is an advanced lactation supplement specifically formulated for dairy animals. It enhances milk production, improves milk quality, and supports the overall health of lactating animals. Contains vital vitamins and minerals.',
    metaDescription: 'Innolact AD3 (5 Liters) - Advanced lactation supplement for dairy animals. Boost milk production & quality. Vitamin AD3 enriched formula by Innovation Remedies.',
    keywords: ['innolact ad3 5l', 'lactation supplement', 'dairy supplement', 'milk production booster', 'vitamin ad3 for cattle', 'innovation remedies innolact'],
    MRP: 750.00,
    price:500.00,
    currency: 'INR',
    imageUrl: twotwo,
    imageFileName: 'innolact_ad3_5ltr.png',
    imageAlt: 'Innolact AD3 5 Liters - Premium Lactation Supplement for Dairy Animals',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-5L-002',
    gtin: '8901234567891',
    features: ['Boosts milk yield', 'Enhances milk quality', 'Supports udder health'],
    benefits: ['Increases daily milk production', 'Improves fat percentage in milk', 'Maintains animal health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Lactating animals'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-ad3-super-10ltr',
    name: 'Innolact®  AD3 Super (10 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (10 Liters)',
    longDescription: 'Innolact AD3 Super (10 Liters) is an advanced lactation supplement formulated for dairy animals. It enhances milk production, improves milk quality, and supports overall health. Contains vital vitamins and minerals.',
    metaDescription: 'Innolact AD3 Super (10 Liters) - Boost milk production & quality. Vitamin AD3 enriched formula by Innovation Remedies.',
    keywords: ['innolact ad3 super 10l', 'lactation supplement', 'dairy supplement', 'milk production booster', 'innovation remedies innolact'],
    MRP: 2700.00,
    price:1800.00,
    currency: 'INR',
    imageUrl: twotwo,
    imageFileName: 'innolact_ad3_super_10ltr.png',
    imageAlt: 'Innolact AD3 Super 10 Liters - Premium Lactation Supplement',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-10L-002A',
    gtin: '8901234567891A',
    features: ['Boosts milk yield', 'Enhanced milk quality', 'Supports udder health', 'Economical 10L pack'],
    benefits: ['Increased daily milk production', 'Improved milk fat', 'Maintains health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Large dairy farms'],
    packSize: '10 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-ad3-super-20ltr',
    name: 'Innolact®  AD3 Super (20 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (20 Liters)',
    longDescription: 'Innolact AD3 Super (20 Liters) is a high-performance lactation supplement for dairy animals, designed to maximize milk production and quality. Contains essential vitamins and minerals for optimal animal health.',
    metaDescription: 'Innolact AD3 Super (20 Liters) - Maximize milk yield with this advanced supplement. Innovation Remedies.',
    keywords: ['innolact ad3 super 20l', 'bulk lactation supplement', 'dairy nutrition', 'innovation remedies'],
    MRP: 4900.00,
    price:3000.00,
    currency: 'INR',
    imageUrl: twotwo,
    imageFileName: 'innolact_ad3_super_20ltr.png',
    imageAlt: 'Innolact AD3 Super 20 Liters - Bulk Lactation Supplement',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-20L-002B',
    gtin: '8901234567891B',
    features: ['High milk yield boost', 'Superior milk quality', 'Supports udder health', 'Large 20L pack'],
    benefits: ['Significant increase in milk production', 'Enhanced milk richness', 'Long-term animal wellness'],
    applications: ['High-yielding dairy cattle', 'Large-scale dairy operations', 'Buffaloes'],
    packSize: '20 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 3. Innolact Gold (No new images, keeping as is)
  {
    id: 'innolact-gold-5ltr',
    name: 'Innolact® AD3 Gold (5 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (5 Liters)',
    longDescription: 'Innolact AD3 Gold (5 Liters) is our premium formula for superior lactation support. It includes chelated minerals and high-potency vitamins to maximize milk production and maintain animal health during peak lactation periods.',
    metaDescription: 'Innolact AD3 Gold (5 Liters) - Premium lactation formula with chelated minerals. Maximum milk production for dairy animals. Innovation Remedies premium range.',
    keywords: ['innolact gold 5l', 'premium lactation supplement', 'chelated minerals cattle', 'peak lactation support', 'innovation remedies gold', 'dairy gold supplement'],
    MRP: 1350.00,
    price:600.00,
    currency: 'INR',
    imageUrl: twothree,
    imageFileName: 'innolact_gold_5ltr.png',
    imageAlt: 'Innolact AD3 Gold 5 Liters - Premium Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-5L-003',
    gtin: '8901234567892',
    features: ['Premium formulation', 'Maximized milk production', 'With chelated minerals'],
    benefits: ['Superior bioavailability', 'Peak lactation support', 'Enhanced mineral absorption'],
    applications: ['High-yielding dairy cattle', 'Premium dairy farms', 'Peak lactation period'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-gold-10ltr',
    name: 'Innolact® AD3 Gold (10 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (10 Liters)',
    longDescription: 'Innolact AD3 Gold (10 Liters) offers superior lactation support with chelated minerals and high-potency vitamins. Designed to maximize milk production and maintain animal health during peak periods. Economical 10 Liter pack.',
    metaDescription: 'Innolact AD3 Gold (10 Liters) - Chelated minerals for maximum milk production. Innovation Remedies premium range.',
    keywords: ['innolact gold 10l', 'premium lactation supplement', 'chelated minerals cattle', 'innovation remedies gold'],
    MRP: 2400.00,
    price:1500.00,
    currency: 'INR',
    imageUrl: twothree,
    imageFileName: 'innolact_gold_10ltr.png',
    imageAlt: 'Innolact AD3 Gold 10 Liters - Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-10L-003A',
    gtin: '8901234567892A',
    features: ['Premium formulation', 'Maximized milk production', 'Chelated minerals', '10L pack'],
    benefits: ['Superior bioavailability', 'Peak lactation support', 'Enhanced mineral absorption', 'Cost-effective'],
    applications: ['High-yielding dairy cattle', 'Premium dairy farms', 'Extended use'],
    packSize: '10 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-gold-20ltr',
    name: 'Innolact® AD3 Gold (20 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (20 Liters)',
    longDescription: 'Our Innolact AD3 Gold (20 Liters) is the ultimate premium formula for superior lactation support in large herds. Features chelated minerals and high-potency vitamins to maximize milk production and animal health during peak lactation.',
    metaDescription: 'Innolact AD3 Gold (20 Liters) - Bulk premium lactation formula with chelated minerals. Innovation Remedies.',
    keywords: ['innolact gold 20l', 'bulk premium lactation', 'chelated minerals dairy', 'innovation remedies'],
    MRP: 4500.00,
    price:2500.00,
    currency: 'INR',
    imageUrl: twothree,
    imageFileName: 'innolact_gold_20ltr.png',
    imageAlt: 'Innolact AD3 Gold 20 Liters - Bulk Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-20L-003B',
    gtin: '8901234567892B',
    features: ['Top-tier formulation', 'Maximum milk output', 'With chelated minerals', 'Large 20L pack'],
    benefits: ['Highest bioavailability', 'Sustained peak lactation', 'Optimal mineral uptake', 'Best value for large farms'],
    applications: ['Elite dairy cattle herds', 'Large commercial dairy farms', 'Peak lactation management'],
    packSize: '20 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 4. Innolact Gel Advance 1Ltr (No new image, keeping as is)
  {
    id: 'innolact-gel-advance-1ltr',
    name: 'Innolact® Gel Advance (1 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Gel Formulations',
    description: 'Sulfur-enhanced lactation supplement gel (1 Liter)',
    longDescription: 'Innolact Gel Advance (1 Liter) is a unique sulfur-enhanced supplement designed to support lactation and improve metabolic functions in dairy animals. The gel form ensures easy administration and quick absorption.',
    metaDescription: 'Innolact Gel Advance (1 Liter) ₹900 (MRP ₹1400) - Sulfur-enhanced gel supplement for dairy animals. Innovation Remedies.',
    keywords: ['innolact gel 1l', 'sulfur supplement cattle', 'gel lactation supplement', 'metabolic support dairy', 'innovation remedies gel'],
    MRP: 1400.00,
    price: 900.00,
    currency: 'INR',
    imageUrl: twofive,
    imageFileName: 'innolact_gel_advance_1ltr.png',
    imageAlt: 'Innolact Gel Advance 1 Liter - Sulfur-Enhanced Gel Supplement',
    gradientFrom: 'from-yellow-100',
    gradientTo: 'to-yellow-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 78,
    stock: 22,
    inStock: true,
    sku: 'IR-INNO-GEL-1L-004',
    gtin: '8901234567893',
    features: ['Sulfur-enhanced', 'Easy gel administration', 'Supports metabolic health'],
    benefits: ['Improves protein synthesis', 'Better nutrient utilization', 'Quick absorption formula'],
    applications: ['All dairy animals', 'Metabolic disorders', 'Lactation support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 5. Innolact Gel Advance 500gm (Updated with details from Image 14)
  {
    id: 'innolact-gel-advance-500gm',
    name: 'Innolact® Gel Advance 500gm',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Calcium Gel Formulations', // More specific
    description: 'Advanced calcium gel for lactation and milk fever prevention (500gm). Orange Flavour.',
    longDescription: 'Innolact Gel Advance 500gm is a specially formulated, water-soluble, and highly palatable calcium paste. It gets quickly absorbed to raise calcium serum blood levels within minutes, aiding in milk fever prevention and fulfilling urgent calcium needs post-parturition. The molasses base and Dextrose provide instant energy. Orange Flavour.',
    metaDescription: 'Innolact Gel Advance 500gm pack ₹250 (MRP ₹380). Prevents milk fever, boosts calcium. Innovation Remedies.',
    keywords: ['innolact gel 500gm', 'calcium gel cattle', 'milk fever prevention', 'post-parturition calcium', 'dairy gel supplement', 'orange flavour', 'innovation remedies'],
    MRP: 380.00,
    price:250.00,
    currency: 'INR',
    imageUrl: twofour, // Image 14 shows this product
    imageFileName: 'innolact_gel_advance_500gm.png',
    imageAlt: 'Innolact Gel Advance 500gm - Calcium Gel for Milk Fever Prevention',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 1, // Updated from 5 as it's a single tube
    rating: 4.9,
    reviewCount: 135,
    stock: 40,
    inStock: true,
    sku: 'IR-INNO-GEL500GM-005',
    gtin: '8901234567894',
    features: [
        'Prevents milk fever',
        'Urgent calcium post-parturition',
        'Increases milk production',
        'Improves liver functions',
        'Provides balanced energy',
        'Water soluble & highly palatable',
        'Quick absorption',
        'Molasses base & Dextrose for instant energy',
        'Orange Flavour'
    ],
    benefits: [
        'Rapid rise in calcium serum blood level',
        'Supports immediate energy needs',
        'Aids in smooth transition to lactation'
    ],
    applications: [
        'Prevention of milk fever',
        'Post-calving recovery',
        'Dairy cattle and buffaloes needing urgent calcium'
    ],
    dosage: 'To Prevent milk fever: Give 250 gm at the first sign of calving & give another 250 gm 6 to 12 hours post calving, repeat every 12 hours as needed. Or as directed by the Veterinarian.',
    packSize: '500 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 7. Innolact bolus (No new image, keeping as is)
  {
    id: 'innolact-bolus-40',
    name: 'Innolact® Bolus (40 Bolus)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Bolus Formulations',
    description: 'Lactation support in convenient bolus form (40 Bolus)',
    longDescription: 'Innolact Bolus offers lactation support in a convenient and easy-to-administer bolus form. Each bolus is packed with essential nutrients to aid milk production and animal health. Pack of 40.',
    metaDescription: 'Innolact Bolus pack of 40 at ₹350 (MRP ₹449). Convenient bolus form lactation supplement. Innovation Remedies.',
    keywords: ['innolact bolus', 'lactation bolus', 'dairy bolus supplement', 'bolus pack 40', 'sustained release bolus', 'innovation remedies bolus'],
    MRP: 449.00,
    price: 350.00,
    currency: 'INR',
    imageUrl: innolactbolus,
    imageFileName: 'innolact_bolus_40.png',
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

  // 8. Calf-Shakti Advance (Updated names and details from Images 1, 8, 9)
  {
    id: 'calfshakti-advance-1ltr', // Updated ID
    name: 'Calf-Shakti Advance (1Ltr)', // Updated Name
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Complete nutritional supplement for newborn calves and small animals (1 Liter).',
    longDescription: 'Calf-Shakti Advance (1Ltr) is a complete tonic providing enhanced nutrition crucial for strong growth and immunity in newborn calves and other small animals. Contains DHA, Aloevera, Flex Oil, Methylcobalamin, Iron, Folic Acid, Niacin, Vitamins A, D3, E, H (Biotin), Zinc, Cobalt, Selenium, and Energy Value. Helps in achieving optimal weight gain and supports gut health.',
    metaDescription: 'Calf-Shakti Advance 1 Liter ₹550 (MRP ₹750) - Premium calf nutrition. Boosts immunity & growth. Innovation Remedies.',
    keywords: ['calfshakti advance 1l', 'calf supplement', 'calf nutrition', 'calf growth booster', 'newborn calf care', 'small animal tonic', 'innovation remedies calfshakti'],
    MRP: 750.00,
    price:550.00,
    currency: 'INR',
    imageUrl: thirteen, // Shows "Calf-Shakti ADVANCE"
    imageFileName: 'calfshakti_advance_1ltr.png', // Updated
    imageAlt: 'Calf-Shakti Advance 1 Liter - Complete Nutrition for Healthy Calf Growth',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 1, // Updated from 2
    rating: 4.8,
    reviewCount: 105,
    stock: 18,
    inStock: true,
    sku: 'IR-CALF-ADV-1L-007', // Updated SKU
    gtin: '8901234567896',
    features: ['Strong growth & immunity booster', 'Complete nutritional supplement', 'With DHA & essential vitamins', 'Supports gut health', '1 Liter pack'],
    benefits: ['Optimal weight gain', 'Strong immune system', 'Healthy development', 'Prevents PICA (eating soil, wood etc.)', 'Improves stress resistance'],
    applications: ['Newborn calves', 'Sheep & Goats', 'Dogs', 'Lambs', 'After deworming', 'Weakness & debilitating conditions', 'Neuronal disorders like lameness'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
    ingredients: 'DHA, Aloevera, Flex Oil, Methylcobalamin, Iron Folic Acid Niacin, Vitamin A, Vitamin D3, Vitamin E, Zinc, Cobalt, Vitamin H (Biotin), Selenium, Energy Value.',
    dosage: 'CALVES: 20 ML/DAILY, SHEEP & GOAT: 20 ML/DAILY, DOGS: 1ML/5 KG/DAILY, LAMBS: 5ML/DAILY.'
  },
  {
    id: 'calfshakti-advance-200ml', // Updated ID
    name: 'Calf-Shakti Advance (200ml)', // Updated Name
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Complete nutritional supplement for newborn calves and small animals (200ml). With 10ml measuring cap.',
    longDescription: 'Calf-Shakti Advance (200ml) provides essential nutrition for young calves and other small animals, supporting strong growth, development, and immune function. Contains DHA, Aloevera, Flex Oil, and vital vitamins & minerals. Convenient smaller pack size with a 10ml measuring cap.',
    metaDescription: 'Calf-Shakti Advance 200ml - Nutrition supplement for young calves. Boosts immunity & growth. Innovation Remedies.',
    keywords: ['calfshakti advance 200ml', 'calf supplement', 'small calf nutrition', 'calf growth booster', 'innovation remedies calfshakti'],
    MRP: 180.00,
    price:150.00,
    currency: 'INR',
    imageUrl: calfshaktiml, // Image 9 shows this product "Calf-Shakti ADVANCE"
    imageFileName: 'calfshakti_advance_200ml.png', // Updated
    imageAlt: 'Calf-Shakti Advance 200ml - Nutrition for Healthy Calf Growth',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 1, // Updated from 2
    rating: 4.8,
    reviewCount: 105,
    stock: 18,
    inStock: true,
    sku: 'IR-CALF-ADV-200ML-007A', // Updated SKU
    gtin: '8901234567896A',
    features: ['Strong growth & immunity booster', 'Complete nutritional supplement', 'With DHA & essential vitamins', 'Convenient 200ml pack', 'Includes 10ml measuring cap'],
    benefits: ['Optimal weight gain', 'Strong immune system', 'Healthy development', 'Easy for small doses', 'Faster recovery after illness'],
    applications: ['Newborn calves', 'Sheep & Goats', 'Dogs', 'Lambs', 'After cropping in pet', 'After dehorning in calf', 'Faster recovery after illness', 'Weakness & debilitating conditions', 'Neuronal disorder like lameness & improper gait'],
    packSize: '200 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
    ingredients: 'DHA, Aloevera, Flex Oil, Methylcobalamin, Iron Folic Acid Niacin, Vitamin A, Vitamin D3, Vitamin E, Zinc, Cobalt, Vitamin H (Biotin), Selenium, Energy Value.',
    dosage: 'CALVES: 20 ML/DAILY, SHEEP & GOAT: 20 ML/DAILY, DOGS: 1ML/5 KG/DAILY, LAMBS: 5ML/DAILY.'
  },
  {
    id: 'calfshakti-advance-500ml', // Updated ID
    name: 'Calf-Shakti Advance (500ml)', // Updated Name
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Complete nutritional supplement for newborn calves (500ml). Strong growth and immunity booster.',
    longDescription: 'The 500ml pack of Calf-Shakti Advance offers a targeted complete nutritional supplement for newborn calves, promoting strong growth, immunity, gut health, and overall vitality during their critical early stages.',
    metaDescription: 'Calf-Shakti Advance 500ml ₹330 (MRP ₹419) - Essential nutrition for newborn calves. Innovation Remedies calf care.',
    keywords: ['calfshakti advance 500ml', 'newborn calf supplement', 'calf immunity booster', 'calf starter supplement', 'calf vitality booster', 'innovation remedies 500ml'],
    MRP: 419.00,
    price:330.00,
    currency: 'INR',
    imageUrl: advcalf, // Image 1 shows this product "Calf-Shakti ADVANCE"
    imageFileName: 'calfshakti_advance_500ml.png', // Updated
    imageAlt: 'Calf-Shakti Advance 500ml - Nutrition Supplement for Newborn Calves',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 1, // Updated from 5
    rating: 4.7,
    reviewCount: 87,
    stock: 25,
    inStock: true,
    sku: 'IR-CALF-ADV-500ML-008', // Updated SKU
    gtin: '8901234567897',
    features: ['For newborn calves', 'Strong growth & immunity booster', 'Supports gut health', 'Provides essential nutrients', 'Convenient 500ml size'],
    benefits: ['Early stage nutrition', 'Builds strong foundation', 'Easy to administer', 'Improves overall health'],
    applications: ['Newborn calves', 'Pre-weaning phase', 'Small farms', 'Growth promotion'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
    // Ingredients and dosage would be same as other Calf-Shakti Advance products
    ingredients: 'DHA, Aloevera, Flex Oil, Methylcobalamin, Iron Folic Acid Niacin, Vitamin A, Vitamin D3, Vitamin E, Zinc, Cobalt, Vitamin H (Biotin), Selenium, Energy Value.',
    dosage: 'CALVES: 20 ML/DAILY, SHEEP & GOAT: 20 ML/DAILY, DOGS: 1ML/5 KG/DAILY, LAMBS: 5ML/DAILY.'
  },

  // 10. Badda H (No new images, keeping as is)
  {
    id: 'badda-h-1ltr',
    name: 'Badda H™ (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Health Supplements',
    subcategory: 'Urinary & Digestive Care',
    description: 'Supports urinary tract and digestive health in animals (1 Liter)',
    longDescription: 'Badda H (1Ltr) is formulated to support and maintain urinary tract and digestive health in animals. It aids in preventing common issues and promotes overall systemic balance.',
    metaDescription: 'Badda H 1 Liter ₹1200 (MRP ₹1650) - Urinary tract & digestive health supplement for animals. Innovation Remedies.',
    keywords: ['badda h 1l', 'urinary health animals', 'digestive health supplement', 'systemic balance animals', 'innovation remedies badda'],
    MRP: 1650.00,
    price : 1200.00,
    currency: 'INR',
    imageUrl: eight,
    imageFileName: 'badda_h_1ltr.png',
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
  {
    id: 'badda-h-250ml',
    name: 'Badda H™ (250 ml)',
    brand: 'Innovation Remedies',
    category: 'Health Supplements',
    subcategory: 'Urinary & Digestive Care',
    description: 'Supports urinary tract and digestive health (250ml)',
    longDescription: 'Badda H (250ml) is formulated to support urinary tract and digestive health in animals. Aids in preventing common issues and promotes systemic balance. Convenient 250ml pack.',
    metaDescription: 'Badda H 250ml - Urinary & digestive health for animals. Innovation Remedies.',
    keywords: ['badda h 250ml', 'animal urinary health', 'animal digestive care', 'innovation remedies'],
    MRP: 700.00,
    price : 400.00,
    currency: 'INR',
    imageUrl: tryu,
    imageFileName: 'badda_h_250ml.png',
    imageAlt: 'Badda H 250ml - Urinary Tract and Digestive Health Support',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 12,
    inStock: true,
    sku: 'IR-BADDA-250ML-009A',
    gtin: '8901234567898A',
    features: ['Urinary tract support', 'Digestive health aid', 'Systemic balance', '250ml pack'],
    benefits: ['Prevents UTI issues', 'Improves digestion', 'Overall health maintenance', 'Easy for smaller doses'],
    applications: ['All livestock', 'Preventive care', 'Individual animal treatment'],
    packSize: '250 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 11. Racer kit (No new image, keeping as is)
  {
    id: 'racer-kit',
    name: 'IRL™ Racer Kit',
    brand: 'Innovation Remedies',
    category: 'Performance Enhancement',
    subcategory: 'Racing Animal Care',
    description: 'Performance enhancement kit for racing animals',
    longDescription: 'The IRL™ Racer Kit is a specialized performance enhancement solution for racing animals. It is designed to optimize energy, stamina, and recovery for peak competitive performance.',
    metaDescription: 'IRL™ Racer Kit ₹1100 (MRP ₹1690) - Performance enhancement for racing animals. Innovation Remedies.',
    keywords: ['racer kit', 'racing animal supplement', 'performance enhancement animals', 'racing horse supplement', 'stamina booster animals', 'innovation remedies racer'],
    MRP:1690.00,
    price:1100.00,
    currency: 'INR',
    imageUrl: sui,
    imageFileName: 'racer_kit.png',
    imageAlt: 'IRL Racer Kit - Professional Performance Enhancement Kit for Racing Animals',
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

  // 12. Innoliv DS (Updated with details from Images 5, 6, 29)
  {
    id: 'innoliv-ds-1ltr',
    name: 'IRL™ Innoliv DS (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Liver Care',
    subcategory: 'Hepatic Supplements with Silymarin',
    description: 'Advanced liver support and appetite stimulant with Silymarin (1 Liter).',
    longDescription: 'Innoliv DS (1Ltr) is an advanced liver support supplement with Silymarin. It improves liver health & functions, enhances appetite, FCR & growth rate, aids in better feed intake and nutrient metabolism, prevents fatty liver syndrome, protects the liver from toxins, improves the immune system, and provides balanced energy. A unique combination of Liver Boosting and Appetite Stimulant Herbs with Liver Extract, Amino Acids & Vitamin B Complex.',
    metaDescription: 'Innoliv DS 1 Liter ₹250 (MRP ₹325) - Liver support with Silymarin for animals. Innovation Remedies.',
    keywords: ['innoliv ds 1l', 'liver support animals', 'hepatic supplement', 'silymarin', 'detoxification animals', 'appetite stimulant', 'innovation remedies innoliv'],
    MRP: 325.00,
    price:250.00,
    currency: 'INR',
    imageUrl: fourteen, // Image 5 shows this product
    imageFileName: 'innoliv_ds_1ltr.png',
    imageAlt: 'Innoliv DS 1 Liter - Liver Support with Silymarin',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 1, // Updated from 5
    rating: 4.9,
    reviewCount: 135,
    stock: 35,
    inStock: true,
    sku: 'IR-INNO-LIV-1L-011',
    gtin: '8901234567900',
    features: [
        'Improves Liver Health & Functions', 'Improves Appetite, FCR & Growth Rate',
        'Helps in Better Feed intake and Nutrient Metabolism', 'Prevents Fatty Liver Syndrome',
        'Protects Liver from various Toxins', 'Improves Immune System',
        'Provides Optimum Growth, FCR & Protein Synthesis', 'Provides Balanced Energy',
        'Contains Silymarin and Vitamin B Complex'
    ],
    composition_per_100ml: {
        'D.L. methionine': '5000 mg', 'I-Lysine HCL': '3000 mg', 'Vitamin B1': '125 mg',
        'Vitamin B2': '200 mg', 'Vitamin B3': '1250 mg', 'Vitamin B6': '150 mg',
        'Silymbum marianum': '900 mg', 'Andrographis paniculata': '1000 mg', 'Phyllanthus niruri': '1000 mg',
        'Solanum nigrum': '1000 mg', 'Ocimum sanctum': '1000 mg', 'Azadirachta indica': '1000 mg',
        'Tinospora cordifolia': '1200 mg', 'Betaine': '50 mg', 'Liver Extract': '150 mg',
        'Choline Chloride': '3000 mg', 'Calcium Lactate': '1000 mg', 'Aqua': 'q.s.'
    },
    dosage: 'Large Animals: 80-100 ml daily, Small Animals: 30-50 ml daily, Layers: 15-20 ml daily/100 birds, Broilers: 10-15 ml daily/100 birds. Or as directed by Veterinary & Poultry Consultant.',
    applications: ['All animals', 'Poultry', 'Liver dysfunction', 'Poor appetite', 'Growth promotion', 'Detoxification'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
  id: 'innoliv-ds-5ltr',
  name: 'IRL™ Innoliv DS (5Ltr)',
  brand: 'Innovation Remedies',
  category: 'Liver Care',
  subcategory: 'Hepatic Supplements with Silymarin',
  description: 'Advanced liver support and appetite stimulant with Silymarin (5 Liters).',
  longDescription: 'Innoliv DS (5Ltr) is an advanced liver support supplement with Silymarin, ideal for larger herds or poultry operations. It improves liver health & functions, enhances appetite, FCR & growth rate, aids in better feed intake and nutrient metabolism, prevents fatty liver syndrome, protects the liver from toxins, improves the immune system, and provides balanced energy. Economical 5 Liter pack.',
  metaDescription: 'Innoliv DS 5 Liter ₹650 (MRP ₹1250) - Bulk liver support with Silymarin. Innovation Remedies.',
  keywords: ['innoliv ds 5l', 'bulk liver support', 'hepatic supplement poultry', 'silymarin animals', 'innovation remedies innoliv'],
  price: 650.00,
  MRP: 1250.00,
  discount: 48,
  discountAmount: 600.00,
  currency: 'INR',
  imageUrl: fiveltr, // Image 6 shows this product
  imageFileName: 'innoliv_ds_5ltr.png',
  imageAlt: 'Innoliv DS 5 Liter - Bulk Liver Support with Silymarin',
  gradientFrom: 'from-teal-100',
  gradientTo: 'to-teal-50',
  minQuantity: 1,
  rating: 4.9,
  reviewCount: 135,
  stock: 35,
  inStock: true,
  sku: 'IR-INNO-LIV-5L-011A',
  gtin: '8901234567900A',
  features: [
        'Improves Liver Health & Functions', 'Improves Appetite, FCR & Growth Rate',
        'Helps in Better Feed intake and Nutrient Metabolism', 'Prevents Fatty Liver Syndrome',
        'Protects Liver from various Toxins', 'Improves Immune System', '5L economy pack',
        'Contains Silymarin and Vitamin B Complex'
  ],
  composition_per_100ml: { // Same as 1L version
        'D.L. methionine': '5000 mg', 'I-Lysine HCL': '3000 mg', 'Vitamin B1': '125 mg',
        'Vitamin B2': '200 mg', 'Vitamin B3': '1250 mg', 'Vitamin B6': '150 mg',
        'Silymbum marianum': '900 mg', 'Andrographis paniculata': '1000 mg', 'Phyllanthus niruri': '1000 mg',
        'Solanum nigrum': '1000 mg', 'Ocimum sanctum': '1000 mg', 'Azadirachta indica': '1000 mg',
        'Tinospora cordifolia': '1200 mg', 'Betaine': '50 mg', 'Liver Extract': '150 mg',
        'Choline Chloride': '3000 mg', 'Calcium Lactate': '1000 mg', 'Aqua': 'q.s.'
  },
  dosage: 'Large Animals: 80-100 ml daily, Small Animals: 30-50 ml daily, Layers: 15-20 ml daily/100 birds, Broilers: 10-15 ml daily/100 birds. Or as directed by Veterinary & Poultry Consultant.',
  applications: ['All animals', 'Poultry flocks', 'Large animal groups', 'Liver support programs', 'Growth enhancement'],
  packSize: '5 Liters',
  manufacturer: 'Innovation Remedies Pvt Ltd',
  countryOfOrigin: 'India',
  },
  // NEW: Innoliv DS 500ml (Based on "Available Pack" information from Image 5)
  {
    id: 'innoliv-ds-500ml',
    name: 'IRL™ Innoliv DS (500ml)',
    brand: 'Innovation Remedies',
    category: 'Liver Care',
    subcategory: 'Hepatic Supplements with Silymarin',
    description: 'Advanced liver support and appetite stimulant with Silymarin (500ml).',
    longDescription: 'Innoliv DS (500ml) offers advanced liver support with Silymarin in a convenient size. It improves liver health, appetite, FCR, and nutrient metabolism, protects from toxins, and boosts immunity. Ideal for individual animal treatment or smaller requirements.',
    metaDescription: 'Innoliv DS 500ml - Liver support with Silymarin for animals. Innovation Remedies.',
    keywords: ['innoliv ds 500ml', 'animal liver care', 'silymarin supplement', 'veterinary hepatic aid', 'innovation remedies innoliv'],
    MRP: 170.00, // Estimated MRP based on 1L price
    price: 130.00, // Estimated price
    currency: 'INR',
    imageUrl: innolivDs500mlImage, // Placeholder - assuming similar bottle to 1L but smaller
    imageFileName: 'innoliv_ds_500ml.png',
    imageAlt: 'Innoliv DS 500ml - Liver Support with Silymarin',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 1,
    rating: 4.9, // Assuming similar rating
    reviewCount: 130, // Assuming similar review count
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-LIV-500ML-011B',
    gtin: '8901234567900B',
    features: [
        'Improves Liver Health & Functions', 'Improves Appetite, FCR & Growth Rate',
        'Helps in Better Feed intake and Nutrient Metabolism', 'Prevents Fatty Liver Syndrome',
        'Contains Silymarin and Vitamin B Complex'
    ],
    composition_per_100ml: { // Same as 1L version
        'D.L. methionine': '5000 mg', 'I-Lysine HCL': '3000 mg', 'Vitamin B1': '125 mg',
        'Vitamin B2': '200 mg', 'Vitamin B3': '1250 mg', 'Vitamin B6': '150 mg',
        'Silymbum marianum': '900 mg', 'Andrographis paniculata': '1000 mg', 'Phyllanthus niruri': '1000 mg',
        'Solanum nigrum': '1000 mg', 'Ocimum sanctum': '1000 mg', 'Azadirachta indica': '1000 mg',
        'Tinospora cordifolia': '1200 mg', 'Betaine': '50 mg', 'Liver Extract': '150 mg',
        'Choline Chloride': '3000 mg', 'Calcium Lactate': '1000 mg', 'Aqua': 'q.s.'
    },
    dosage: 'Large Animals: 80-100 ml daily, Small Animals: 30-50 ml daily. Or as directed by Veterinary Consultant.',
    applications: ['Individual animals', 'Small livestock', 'Poultry (small scale)', 'Targeted liver support'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 14. URO+CENTA ADVANCE (Updated name and details from Image 22)
  {
    id: 'uro-centa-advance-500ml', // Updated ID
    name: 'URO+CENTA ADVANCE (500ml)', // Updated Name
    brand: 'Innovation Remedies',
    category: 'Uterine Care', // More specific category
    subcategory: 'Post-Parturition Tonic',
    description: 'Potent ecobolic and uterine tonic for post-parturition care (500ml).',
    longDescription: 'URO+CENTA ADVANCE (500ml) is a potent ecobolic and uterine tonic specifically formulated to address common problems faced after parturition. It contains Iron, Shatavari, Azadirachta indica, and Ashwagandha to treat anemic conditions, cure inflammation, aid uterine recovery, and tone the uterus. Helps with Retention of Placenta (ROP), accumulation of lochial fluids, improper uterine involution, and reduces the risk of uterine infections.',
    metaDescription: 'URO+CENTA ADVANCE 500ml ₹210 (MRP ₹300) - Uterine tonic for post-delivery care. Innovation Remedies.',
    keywords: ['urocenta advance', 'uro+centa', 'uterine tonic', 'post parturition care', 'ecobolic', 'rop treatment', 'livestock reproductive health', 'innovation remedies'],
    MRP: 300.00,
    price:210.00,
    currency: 'INR',
    imageUrl: three, // Image 22 shows this "URO+CENTA ADVANCE"
    imageFileName: 'uro_centa_advance_500ml.png', // Updated
    imageAlt: 'URO+CENTA ADVANCE 500ml - Post-Parturition Uterine Tonic',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 1, // Updated from 5
    rating: 4.6,
    reviewCount: 95,
    stock: 28,
    inStock: true,
    sku: 'IR-UROCENTA-ADV-500ML-012', // Updated SKU
    gtin: '8901234567901',
    features: [
        'Potent ecobolic and uterine tonic',
        'Addresses common post-parturition problems',
        'Enriched with Iron for anemic conditions',
        'Contains Shatavari for inflammation and tissue health',
        'Azadirachta indica for uterine structure and function recovery',
        'Ashwagandha for uterine toning'
    ],
    benefits: [
        'Helps in expulsion of retained placenta (ROP)',
        'Manages accumulation of lochial fluids',
        'Promotes proper uterine involution',
        'Reduces risk of uterine infections',
        'Supports overall reproductive recovery'
    ],
    applications: ['Post-parturition care in cows, buffaloes', 'Retention of Placenta (ROP)', 'Improper uterine involution', 'Uterine infections prophylaxis'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 15. GLUCODYNA-40 Advance (Updated name and details from Image 7)
  {
    id: 'glucodyna-40-advance-1ltr', // Updated ID
    name: 'GLUCODYNA-40 Advance (1Ltr)', // Updated Name
    brand: 'Innovation Remedies',
    category: 'Energy Supplements',
    subcategory: 'Postpartum Energy Booster',
    description: 'Energy booster for postpartum cows with Orange Flavour (1 Liter).',
    longDescription: 'GLUCODYNA-40 Advance (1Ltr) is an energy booster designed to bridge the energy gap of postpartum cows. It helps in the prevention of NEB & Ketosis, prevents harmful effects of NEB on the uterus, helps bring animals back to feed & milk production, and improves post-calving health & production. Contains Propylene Glycol, Honey, Chromium, Magnesium, Niacin, Olive Oil, Calcium, Ashwagandha, Glycerine, Vitamin C, and Silymarin. Orange Flavour.',
    metaDescription: 'GLUCODYNA-40 Advance 1 Liter ₹600 (MRP ₹750) - Postpartum energy booster for cows. Innovation Remedies.',
    keywords: ['glucodyna-40 advance', 'energy booster cows', 'postpartum supplement', 'ketosis prevention', 'propylene glycol', 'orange flavour', 'innovation remedies glucodyna'],
    MRP: 750.00,
    price:600.00,
    currency: 'INR',
    imageUrl: tenn, // Image 7 shows "GLUCODYNA-40 Advance"
    imageFileName: 'glucodyna_40_advance_1ltr.png', // Updated
    imageAlt: 'GLUCODYNA-40 Advance 1 Liter - Postpartum Energy Booster for Cows',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 110,
    stock: 10,
    inStock: true,
    sku: 'IR-GLUCO40-ADV-1L-013', // Updated SKU
    gtin: '8901234567902',
    features: [
        'Prevents NEB & Ketosis',
        'Prevents harmful effects of NEB on Uterus',
        'Restores feed intake & milk production',
        'Improves post-calving health & production',
        'Orange Flavour'
    ],
    composition_per_litre: {
        'Propylene Glycol': '400 ml', 'Purified Honey': '100 ml', 'Bioactive Chromium': '1800 mcg',
        'Magnesium Sulphate': '1000 mg', 'Niacin': '10 gm', 'Olive Oil': '20 gm',
        'Calcium Phosphate': '50 gm', 'Ashwagandha Extract': '10 ml', 'Glycrine': '300 ml',
        'Vitamin C': '5000 mcg', 'Silymarin': '5000 mg', 'Purified Water': 'q.s.'
    },
    dosage: '200 ml twice daily for two days, followed by 100 ml daily for two days.',
    applications: ['Postpartum cows', 'Negative Energy Balance (NEB)', 'Ketosis prevention', 'Sudden drop in milk production', 'Low feed intake post-calving'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 16. R3-Vet Ultra Bolus (Updated name and details from Image 3)
  {
    id: 'r3-vet-ultra-bolus-10', // Updated ID
    name: 'R3-Vet Ultra Bolus (10 Bolus)', // Updated Name
    brand: 'Innovation Remedies',
    category: 'General Health',
    subcategory: 'Appetite Stimulant & Digestive Bolus',
    description: 'Appetite stimulant and restorative bolus for livestock (10 Bolus).',
    longDescription: 'R3-Vet Ultra Bolus is a comprehensive supplement for appetite or anorexia, weakness & loss of milk production, and neuronal disorders. Contains Cyproheptadine Hcl (appetite stimulant), Live yeast culture & Live Lactobacillus Sporogenes (stabilizes gut flora, improves rumen fermentation), Thiamine HCL (B1) (controls satiety center, appetite loss), Pyridoxine Hcl (B6) (energy metabolism), and Methylcobalamin (brain, nerves, red blood cell production).',
    metaDescription: 'R3-Vet Ultra Bolus (10 Bolus) ₹300 (MRP ₹400) - Appetite stimulant & health restorative. Innovation Remedies.',
    keywords: ['r3 vet ultra bolus', 'appetite stimulant cattle', 'anorexia treatment veterinary', 'cyproheptadine bolus', 'probiotic bolus', 'vitamin b bolus', 'innovation remedies r3'],
    MRP: 400.00,
    price:300.00,
    currency: 'INR',
    imageUrl: R3, // Image 3 shows "R3-Vet Ultra Bolus"
    imageFileName: 'r3_vet_ultra_bolus_10.png', // Updated
    imageAlt: 'R3-Vet Ultra Bolus (10 Bolus) - Appetite Stimulant and Restorative',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 1, // Updated from 10 (assuming 1 box of 10)
    rating: 4.7,
    reviewCount: 156,
    stock: 60,
    inStock: true,
    sku: 'IR-R3-ULTRA-BOL10-014', // Updated SKU
    gtin: '8901234567903',
    features: [
        'For Appetite or Anorexia (Cyproheptadine Hcl)',
        'For Weakness & Loss of Milk Production (Thiamine HCL, Pyridoxine Hcl)',
        'For Neuronal Disorder (Methylcobalamin)',
        'Contains Live Yeast Culture & Live Lactobacillus Sporogenes',
        'Improves digestion & better utilization of feed'
    ],
    indications: ['Anorexia', 'Liver Disorder', 'Anaemia & Convalescence Period', 'Adjuvant to antibiotic/Anthelmintic therapy', 'Nervine Disorder', 'Weakness', 'Loss of Milk Production'],
    composition_per_bolus: {
        'Cyproheptadine Hcl': '25 mg', 'Live Yeast Culture': '4 mg', 'Live Lactobacillus Sporogenes': '40 million',
        'Thiamine HCL (B1)': '250 mg', 'Pyridoxine Hcl (B6)': '250 mg', 'Methylcobalamin': '2500 mcg', 'Excipients': 'q.s.'
    },
    dosage: 'Large Animal: 1 bolus BD for two days. In Small Animal: 1/2 bolus BD for two days.',
    applications: ['Appetite stimulation', 'Recovery from illness', 'Support during antibiotic therapy', 'Milk production improvement', 'Nervous system support'],
    packSize: '10 x 1 Bolus (Strip/Box)', // Updated
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 17. Innoworm XL (No new image, keeping as is)
  {
    id: 'innoworm-xl-100ml',
    name: 'IRL™ Innoworm XL (100ml)',
    brand: 'Innovation Remedies',
    category: 'Parasite Control',
    subcategory: 'Dewormers',
    description: 'Effective parasite control for healthier livestock (100ml)',
    longDescription: 'Innoworm XL (100ml) provides effective and broad-spectrum parasite control for healthier livestock. Helps improve growth rates and overall animal productivity by managing worm infestations.',
    metaDescription: 'Innoworm XL 100ml ₹120 (MRP ₹150) - Broad-spectrum dewormer for livestock. Innovation Remedies.',
    keywords: ['innoworm xl 100ml', 'dewormer livestock', 'parasite control animals', 'worm medicine animals', 'innovation remedies innoworm'],
    MRP: 150.00,
    price:120.00,
    currency: 'INR',
    imageUrl: fifteen,
    imageFileName: 'innoworm_xl_100ml.png',
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

  // 18. Innoworm 30ml (No new image, keeping as is)
  {
    id: 'innoworm-30ml',
    name: 'IRL™ Innoworm (30ml)',
    brand: 'Innovation Remedies',
    category: 'Parasite Control',
    subcategory: 'Dewormers',
    description: 'Palatable dewormer for young animals (30ml)',
    longDescription: 'Innoworm 30ml is a palatable dewormer formulated for young or recovering animals. Its palatable formula ensures easy acceptance while effectively controlling parasites.',
    metaDescription: 'Innoworm 30ml ₹30 (MRP ₹45) - Dewormer for young animals. Palatable formula by Innovation Remedies.',
    keywords: ['innoworm 30ml', 'small animal dewormer', 'young animal parasite control', 'palatable dewormer', 'innovation remedies 30ml'],
    MRP: 45.00,
    price:30.00,
    currency: 'INR',
    imageUrl: sixteen,
    imageFileName: 'innoworm_30ml.png',
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
    features: ['Palatable formula', 'Gentle dewormer', 'For young animals', '30ml pack'],
    benefits: ['Easy acceptance', 'Effective parasite control', 'Supports healthy growth post-deworming'],
    applications: ['Young animals', 'Small animals', 'Post-weaning deworming'],
    packSize: '30 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 19. Weightboost Powder (Updated name and details from Image 10)
  {
    id: 'weightboost-powder-3kg', // Updated ID
    name: 'Weightboost Powder (3kg)', // Updated Name
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements',
    subcategory: 'Energy & Weight Gain',
    description: 'Energy, protein, and glucose supplement for peripartum animals (3kg).',
    longDescription: 'Weightboost Powder (3kg) is a complete solution for peripartum animals, providing a daily boost of extra energy, protein, by-pass fat, glucose with minerals, vitamins, and probiotics. It helps address negative energy balance, lipolysis, ketosis, body wasting, and hypogalactia that can occur due to compressed rumen post-parturition. Resulting in Energy, Proteins, Glucose, Mineral, and Vitamin replenishment.',
    metaDescription: 'Weightboost Powder 3kg ₹800 (MRP ₹1250) - Energy & weight gain for peripartum animals. Innovation Remedies.',
    keywords: ['weightboost powder', 'peripartum supplement', 'livestock energy', 'weight gain cattle', 'probiotics animals', 'innovation remedies weightboost'],
    MRP: 1250.00,
    price : 800.00,
    currency: 'INR',
    imageUrl: wui, // Image 10 shows this product
    imageFileName: 'weightboost_powder_3kg.png', // Updated
    imageAlt: 'Weightboost Powder 3kg - Energy & Weight Gain for Peripartum Animals',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 120,
    stock: 8,
    inStock: true,
    sku: 'IR-WEIGHTBST-PDR-3KG-017', // Updated SKU
    gtin: '8901234567906',
    features: [
        'Daily boost of extra energy, Protein, By Pass Fat Glucose',
        'Contains minerals, Vitamins & Probiotics',
        'Addresses negative energy balance',
        'Complete solution for peripartum animals'
    ],
    benefits: [
        'Helps overcome energy deficiency',
        'Helps correct hypoglycaemia',
        'Helps remove weakness, sluggishness',
        'Improves feed intake',
        'Helps restore milk production',
        'Helps animal recover quickly'
    ],
    applications: ['Peripartum animals (around calving/lambing)', 'Negative energy balance', 'Ketosis / Low selective feed intake', 'Body wasting (0.5 Kg - 1 Kg per day)', 'Hypogalactia (low milk production)'],
    dosage: 'Large Animals: 100 gm per day, Small Animals: 25 gm per day.',
    packSize: '3 kg',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 22. Makkhi Soap (Updated with details from Image 26)
  {
    id: 'makkhi-soap-75gm',
    name: 'IRL™ Makkhi Soap (75gm)',
    brand: 'Innovation Remedies',
    category: 'Animal Hygiene',
    subcategory: 'Medicated Soaps',
    description: 'Antiparasitic and antiseptic soap with Permethrin, Cetrimide & Aloevera for animal hygiene (75gm).',
    longDescription: 'Makkhi Soap (75gm) is formulated for effective control of ticks, fleas, and mites. Contains Permethrin (5%), Cetrimide (1%), and Aloevera (1%) for antiparasitic and antiseptic action while being gentle on the skin. For external animal use only.',
    metaDescription: 'Makkhi Soap 75gm ₹60 (MRP ₹120) - Controls ticks, fleas & mites. Innovation Remedies.',
    keywords: ['makkhi soap', 'permethrin soap', 'cetrimide soap', 'aloe vera animal soap', 'tick repellent animals', 'flea control soap', 'innovation remedies makkhi'],
    price: 60.00,
    MRP:120.00,
    currency: 'INR',
    imageUrl: seventeen, // Image 26 shows this product
    imageFileName: 'makkhi_soap_75gm.png',
    imageAlt: 'Makkhi Soap 75gm - Antiparasitic & Antiseptic Soap for Animals',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 1, // Updated from 20
    rating: 4.8,
    reviewCount: 105,
    stock: 70,
    inStock: true,
    sku: 'IR-MAKKHI-SOAP-75GM-018', // Updated SKU
    gtin: '8901234567907',
    features: [
        'Effective control of Ticks, Fleas & Mites',
        'Contains Permethrin 5%, Cetrimide 1%, Aloevera 1%',
        'Antiparasitic & Antiseptic',
        'For external use only'
    ],
    benefits: ['Keeps animals free from ectoparasites', 'Soothes skin with Aloe Vera', 'Promotes hygiene'],
    applications: ['Control of ticks, fleas, flies, and mites on livestock and pets', 'Routine bathing for parasite prevention'],
    packSize: '75 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: IRL Makkhi Soap (from Image 2, distinct packaging and "IRL" branding)
  {
    id: 'irl-makkhi-soap-75gm',
    name: 'IRL™ Makkhi Soap (Permethrin, Cetrimide & Aloe vera) 75gm',
    brand: 'IRL (Innovation Remedies)',
    category: 'Animal Hygiene',
    subcategory: 'Medicated Soaps',
    description: 'Antiparasitic & Antiseptic Soap with Permethrin, Cetrimide & Aloe vera (75gm). For Animal Use Only.',
    longDescription: 'IRL Makkhi Soap is an antiparasitic and antiseptic soap for animal use, containing Permethrin, Cetrimide, and Aloe vera. Effective against ticks, fleas, and mites, ensuring animal comfort and hygiene.',
    metaDescription: 'IRL Makkhi Soap 75gm - Permethrin, Cetrimide & Aloe vera. Controls ticks, fleas, mites. Innovation Remedies.',
    keywords: ['irl makkhi soap', 'permethrin soap dog', 'cetrimide animal soap', 'aloe vera pet soap', 'tick soap', 'flea soap', 'innovation remedies irl'],
    price: 65.00, // Placeholder price
    MRP: 125.00,  // Placeholder MRP
    currency: 'INR',
    imageUrl: irlMakkhiSoapImage, // Placeholder for Image 2
    imageFileName: 'irl_makkhi_soap_75gm.png',
    imageAlt: 'IRL Makkhi Soap 75gm - Permethrin, Cetrimide & Aloe vera',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 1,
    rating: 4.7,
    reviewCount: 90,
    stock: 60,
    inStock: true,
    sku: 'IRL-MAKKHI-SOAP-75GM-018A',
    gtin: '8901234567907A',
    features: ['Contains Permethrin, Cetrimide & Aloe vera', 'Antiparasitic & Antiseptic', 'Effective against ticks, fleas, mites', 'For Animal Use Only'],
    benefits: ['Cleanses and protects against parasites', 'Soothes skin', 'Maintains animal hygiene'],
    applications: ['Dogs, cattle, goats, and other animals for control of ectoparasites', 'General hygiene wash'],
    packSize: '75 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: Makkhi Advance Soap (from Image 27)
  {
    id: 'makkhi-advance-soap-75gm',
    name: 'Makkhi Advance Soap (75gm)',
    brand: 'Innovation Remedies',
    category: 'Animal Hygiene',
    subcategory: 'Medicated Soaps (Advanced)',
    description: 'Advanced antiparasitic soap with Permethrin 8% for effective control of Ticks, Fleas & Mites (75gm).',
    longDescription: 'Makkhi Advance Soap offers enhanced protection against ectoparasites with a higher concentration of Permethrin (8%), along with Cetrimide (1%) and Aloe Vera (1%). Designed for very effective control of fleas, flies, and ticks. For external animal use only.',
    metaDescription: 'Makkhi Advance Soap 75gm - Permethrin 8%. Advanced control of ticks, fleas & mites. Innovation Remedies.',
    keywords: ['makkhi advance soap', 'permethrin 8% soap', 'strong tick repellent', 'advanced flea control', 'veterinary medicated soap', 'innovation remedies'],
    price: 75.00, // Placeholder price
    MRP: 140.00,  // Placeholder MRP
    currency: 'INR',
    imageUrl: makkhiAdvanceSoapImage, // Placeholder for Image 27
    imageFileName: 'makkhi_advance_soap_75gm.png',
    imageAlt: 'Makkhi Advance Soap 75gm - Permethrin 8% Formula',
    gradientFrom: 'from-red-100',
    gradientTo: 'to-rose-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 95,
    stock: 50,
    inStock: true,
    sku: 'IR-MAKKHI-ADV-SOAP-75GM-018B',
    gtin: '8901234567907B',
    features: ['Permethrin 8%, Cetrimide 1%, Aloe Vera 1%', 'Very effective against Fleas, Fly & Ticks', 'Advanced formula', 'For external use only'],
    benefits: ['Stronger action against resistant parasites', 'Ensures freedom from ticks and flies', 'Maintains skin health with Aloe Vera'],
    applications: ['Animals with heavy infestation of ticks, fleas, and flies', 'Situations requiring stronger parasiticidal action'],
    packSize: '75 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },


  // 23. Makkhi Liquid 15ml (No new image, keeping as is)
  {
    id: 'makkhi-liquid-15ml',
    name: 'IRL™ Makkhi Liquid (15ml)',
    brand: 'Innovation Remedies',
    category: 'Pest Control',
    subcategory: 'Concentrated Solutions',
    description: 'Potent concentrated liquid for pest control (15ml)',
    longDescription: 'Makkhi Liquid (15ml) is a potent, concentrated liquid formula for effective control of flies and other pests. Its concentrated nature ensures efficacy even with small doses.',
    metaDescription: 'Makkhi Liquid 15ml ₹60 (MRP ₹85.90) - Concentrated fly & pest control liquid. Innovation Remedies.',
    keywords: ['makkhi liquid 15ml', 'concentrated pest control', 'fly control liquid', 'pest repellent concentrate', 'innovation remedies makkhi'],
    MRP: 85.90,
    price: 60.00,
    currency: 'INR',
    imageUrl: ui,
    imageFileName: 'makkhi_liquid_15ml.png',
    imageAlt: 'Makkhi Liquid 15ml - Potent Concentrated Pest Control Formula',
    gradientFrom: 'from-cyan-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 10,
    rating: 4.7,
    reviewCount: 87,
    stock: 55,
    inStock: true,
    sku: 'IR-MAKKHI-LIQ15ML-019',
    gtin: '8901234567908',
    features: ['Potent concentrate', 'Effective pest control', 'Economical 15ml pack'],
    benefits: ['Long-lasting effect', 'Cost-effective solution', 'Multiple pest control'],
    applications: ['Stable pest control', 'Fly prevention', 'Area treatment'],
    packSize: '15 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 24. Makkhi Liquid 6ml (No new image, keeping as is)
  {
    id: 'makkhi-liquid-6ml',
    name: 'IRL™ Makkhi Liquid (6ml)',
    brand: 'Innovation Remedies',
    category: 'Pest Control',
    subcategory: 'Quick Solutions',
    description: 'Fast-acting liquid solution for pest control (6ml)',
    longDescription: 'This Makkhi Liquid (6ml) pack offers a fast-acting liquid solution for quick pest control. Ideal for spot treatments or smaller applications where immediate action is needed.',
    metaDescription: 'Makkhi Liquid 6ml ₹30 (MRP ₹54.90) - Fast-acting pest control solution. Innovation Remedies.',
    keywords: ['makkhi liquid 6ml', 'fast acting pest control', 'quick fly control', 'spot treatment pest', 'innovation remedies makkhi'],
    MRP: 54.90,
    price:30.00,
    currency: 'INR',
    imageUrl: nineteen,
    imageFileName: 'makkhi_liquid_6ml.png',
    imageAlt: 'Makkhi Liquid 6ml - Fast-Acting Pest Control for Spot Treatment',
    gradientFrom: 'from-violet-100',
    gradientTo: 'to-violet-50',
    minQuantity: 30,
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-MAKKHI-LIQ6ML-020',
    gtin: '8901234567909',
    features: ['Fast-acting solution', 'Quick pest knockdown', 'Convenient 6ml size'],
    benefits: ['Immediate results', 'Easy spot application', 'Trial size available'],
    applications: ['Emergency pest control', 'Small area treatment', 'Quick intervention'],
    packSize: '6 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // Ayngrow Bolus (Updated with details from Images 15, 16, 17, 18)
   {
    id: 'ayngrow-bolus-20',
    name: 'Ayngrow Bolus (20 Bolus)',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements',
    subcategory: 'Multivitamin & Mineral Bolus (Udder Health)',
    description: 'Powerful multivitamin and mineral bolus for udder health, growth, and immunity (20 Bolus).',
    longDescription: 'Ayngrow Bolus is a powerful multivitamin and mineral supplement designed to enhance udder development in pregnant animals, prevent teat cracks, boost immunity, reduce stress, and prevent mastitis. Contains high levels of Vitamin A, D3, E, H (Biotin), B12, Copper, Zinc, Selenium, and Silymarin. Zinc & Copper with MHA help in teat keratin layer formation and act as antioxidants. Double power Vitamin A & H.',
    metaDescription: 'Ayngrow Bolus (20 Bolus) ₹650 (MRP ₹900) - For udder health, immunity & growth. Innovation Remedies.',
    keywords: ['ayngrow bolus', 'udder health bolus', 'teat cracks prevention', 'livestock multivitamin', 'animal immunity booster', 'silymarin bolus', 'innovation remedies ayngrow'],
    MRP: 900.00,
    price:650.00,
    currency: 'INR',
    imageUrl: twentyone, // Image 15 shows 20 Bolus pack
    imageFileName: 'ayngrow_bolus_20.png',
    imageAlt: 'Ayngrow Bolus (20 Bolus) - Multivitamin for Udder Health & Immunity',
    gradientFrom: 'from-green-100',
    gradientTo: 'to-green-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-AYNGROW-BOL20-021',
    gtin: '8901234567910',
    features: [
        'Increases udder size in pregnant animals', 'Removes weakness and stress',
        'Increases immunity', 'Prevents cracking of hooves and teats ("Say No to Teat Cracks")',
        'Prevents animal from falling sick repeatedly', 'Helpful in preventing mastitis',
        'Increases stamina and strength in race buffaloes/bulls', 'Prevents milk leakage',
        'Advantage of Zinc & Copper with MHA', 'Advantage of Double power Vit. A & H'
    ],
    composition_per_bolus: { // From Image 16 & 18 (Our Product values)
        'Vitamin A': '500000 I.U.', 'Vitamin D3': '100000 I.U.', 'Vitamin E': '600 mg',
        'Vitamin H (Biotin)': '20000 mcg', 'Vitamin B12': '300 mcg', 'Copper': '1000 mcg (as Ch. Copper)',
        'Zinc': '500 mg (as Ch. Zinc)', 'Selenium': '300 mcg', 'Silymarine': '500 mg', 'Trisodium Citrate': '5 gm', // Trisodium Citrate from image 18 composition
        'Excipients': 'q.s.'
    },
    benefits: [
        'Improved udder health and development', 'Enhanced immunity and stress resistance',
        'Prevention of teat cracks and mastitis', 'Better overall productivity'
    ],
    applications: ['Last months of pregnancy (1 bolus daily for 40 days)', 'Race buffaloes/bulls (1 bolus daily for 40 days)', 'General health and immunity boost'],
    packSize: '20 Boluses',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'ayngrow-bolus-40',
    name: 'Ayngrow Bolus (40 Bolus)',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements',
    subcategory: 'Multivitamin & Mineral Bolus (Udder Health)',
    description: 'Powerful multivitamin and mineral bolus for udder health, growth, and immunity (40 Bolus pack).',
    longDescription: 'Ayngrow Bolus (40 Bolus pack) provides a comprehensive multivitamin and mineral supplement for enhancing udder development, preventing teat cracks, boosting immunity, and reducing stress in livestock. Contains high levels of Vitamin A, D3, E, H (Biotin), B12, Copper, Zinc, Selenium, and Silymarin. Ideal for extended use or larger herds.',
    metaDescription: 'Ayngrow Bolus (40 Bolus) ₹1050 (MRP ₹1550) - Bulk pack for udder health. Innovation Remedies.',
    keywords: ['ayngrow bolus 40', 'bulk udder health bolus', 'livestock mineral supplement', 'animal wellness', 'teat care', 'innovation remedies ayngrow'],
    MRP: 1550.00,
    price:1050.00,
    currency: 'INR',
    imageUrl: fourtybolus, // Image 15 shows 40 Bolus pack option
    imageFileName: 'ayngrow_bolus_40.png',
    imageAlt: 'Ayngrow Bolus (40 Bolus) - Bulk Multivitamin for Udder Health',
    gradientFrom: 'from-green-100',
    gradientTo: 'to-teal-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-AYNGROW-BOL40-022',
    gtin: '8901234567911',
    features: [ // Same as 20 bolus pack
        'Increases udder size in pregnant animals', 'Removes weakness and stress',
        'Increases immunity', 'Prevents cracking of hooves and teats',
        'Helpful in preventing mastitis', 'Economy pack of 40 Bolus'
    ],
    composition_per_bolus: { // Same as 20 bolus pack
        'Vitamin A': '500000 I.U.', 'Vitamin D3': '100000 I.U.', 'Vitamin E': '600 mg',
        'Vitamin H (Biotin)': '20000 mcg', 'Vitamin B12': '300 mcg', 'Copper': '1000 mcg (as Ch. Copper)',
        'Zinc': '500 mg (as Ch. Zinc)', 'Selenium': '300 mcg', 'Silymarine': '500 mg', 'Trisodium Citrate': '5 gm',
        'Excipients': 'q.s.'
    },
    benefits: ['Sustained udder health support', 'Cost-effective for herd management', 'Consistent supply for 40-day regimen'],
    applications: ['Last months of pregnancy (1 bolus daily for 40 days)', 'Race buffaloes/bulls (1 bolus daily for 40 days)', 'Large herds requiring udder health and immunity support'],
    packSize: '40 Boluses',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // RS 21 Solution (Keeping as is, no new image directly for it, distinct from RS-Kit)
  {
    id: 'rs21-solution-210ml',
    name: 'RS 21 Solution (210 ml)',
    brand: 'Innovation Remedies',
    category: 'Reproductive Health',
    subcategory: 'Fertility Solutions',
    description: 'Repeat Breeding and Infertility Solution (210 ml)',
    longDescription: 'RS 21 Solution (210 ml) is specially formulated to address issues of repeat breeding and infertility in livestock. It helps optimize reproductive health and improve conception rates.',
    metaDescription: 'RS 21 Solution (210 ml) ₹350 (MRP ₹415) - For repeat breeding & infertility in livestock. Innovation Remedies.',
    keywords: ['rs21 solution', 'repeat breeding solution', 'livestock infertility', 'animal fertility supplement', 'innovation remedies rs21'],
    MRP: 415.00,
    price:350.00,
    currency: 'INR',
    imageUrl: gly,
    imageFileName: 'rs21_solution_210ml.png',
    imageAlt: 'RS 21 Solution (210 ml) - Repeat Breeding and Infertility Solution',
    gradientFrom: 'from-rose-100',
    gradientTo: 'to-pink-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-RS21-SOL210ML-023',
    gtin: '8901234567912',
    features: ['Addresses repeat breeding', 'Supports fertility', 'Optimizes reproductive cycle', 'Liquid solution 210ml'],
    benefits: ['Improved conception rates', 'Reduced inter-calving period', 'Enhanced reproductive efficiency', 'Supports hormonal balance'],
    applications: ['Cows', 'Buffaloes', 'Heifers with reproductive issues', 'Animals with history of repeat breeding'],
    packSize: '210 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: Innocef-3 Injection (from Image 19)
  {
    id: 'innocef-3-injection-3gm',
    name: 'Innocef-3 Injection (3gm)',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics (Cephalosporin)',
    description: 'Ceftriaxone 3gm/Vial Injection for wide range of bacterial infections.',
    longDescription: 'Innocef-3 (Ceftriaxone 3gm/Vial) is an injectable antibiotic effective against a wide range of Gram-negative and Gram-positive bacteria. Offers the advantage of once-daily dosing for treating various infections in animals.',
    metaDescription: 'Innocef-3 Injection 3gm - Ceftriaxone for veterinary use. Treats bacterial infections. Innovation Remedies.',
    keywords: ['innocef-3', 'ceftriaxone injection', 'veterinary antibiotic', 'gram-positive bacteria', 'gram-negative bacteria', 'animal infection treatment', 'innovation remedies'],
    price: 250.00, // Placeholder price
    MRP: 300.00,   // Placeholder MRP
    currency: 'INR',
    imageUrl: innocef3Image, // Placeholder for Image 19
    imageFileName: 'innocef_3_injection_3gm.png',
    imageAlt: 'Innocef-3 Ceftriaxone 3gm Injection',
    gradientFrom: 'from-red-100',
    gradientTo: 'to-orange-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 70,
    stock: 40,
    inStock: true,
    sku: 'IR-INNOCEF3-INJ-3GM-024',
    gtin: '8901234567913',
    features: ['Contains Ceftriaxone 3gm per Vial', 'Effective against Gram-ve & Gram+ve Bacteria', 'Advantage of Once Daily Dosing', 'Rx Product'],
    benefits: ['Broad-spectrum bactericidal action', 'Convenient once-daily administration', 'Effectively treats a variety of infections'],
    applications: ['Respiratory Tract Infections (Pneumonia)', 'Bone & Joint Infections', 'Post-operative Infections', 'Urogenital Tract Infections (Cystitis, Metritis)', 'Skin & Soft Tissue Infections'],
    dosage: '10mg/kg body weight Daily for 3-5 days by I.M. or I.V. route, on the basis of ceftriaxone content.',
    packSize: '3 gm Vial',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: Bectrohit Injection Vet (from Image 20)
  {
    id: 'bectrohit-injection-4.5gm',
    name: 'Bectrohit Injection Vet (4.5gm)',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics (Penicillin Combination)',
    description: 'Amoxycillin & Cloxacillin combination antibiotic (4.5gm) for mixed infections.',
    longDescription: 'Bectrohit Injection Vet (4.5gm) is a trusted choice combining Amoxycillin and Cloxacillin (1:1 ratio). It is a broad-spectrum bactericidal, ideal for mixed infections, attaining high concentration in soft tissue. Safe for lactating and young animals.',
    metaDescription: 'Bectrohit Injection Vet 4.5gm - Amoxycillin & Cloxacillin. For mixed infections. Innovation Remedies.',
    keywords: ['bectrohit', 'amoxycillin cloxacillin', 'veterinary injection', 'mixed infection antibiotic', 'mastitis treatment', 'innovation remedies'],
    price: 350.00, // Placeholder price
    MRP: 420.00,   // Placeholder MRP
    currency: 'INR',
    imageUrl: bectrohitImage, // Placeholder for Image 20
    imageFileName: 'bectrohit_injection_4_5gm.png',
    imageAlt: 'Bectrohit Amoxycillin & Cloxacillin 4.5gm Injection',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-cyan-50',
    minQuantity: 1,
    rating: 4.7,
    reviewCount: 65,
    stock: 35,
    inStock: true,
    sku: 'IR-BECTROHIT-INJ-4.5GM-025',
    gtin: '8901234567914',
    features: ['Amoxycillin and Cloxacillin in 1:1 ratio', 'Broad Spectrum Bactericidal', 'Ideal in Mixed Infection', 'Safe in Lactating and Young Animals', 'Rx Product'],
    recommendations: ['Mastitis', 'H.S. and Pneumonia', 'Leptospirosis', 'Cystitis and Nephritis', 'Secondary Bacterial Infections'],
    benefits: ['Proven safety and efficacy', 'High concentration in soft tissue infections', 'Effective against a wide range of bacteria'],
    dosage: 'Live Stock: 6-10 mg/kg bwt. Daily for 3-5 days by IM/IV Route.',
    packSize: '4.5 gm Vial',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: Bectrohit-Fort Injection Vet (from Image 21 - 3gm version)
  {
    id: 'bectrohit-fort-injection-3gm',
    name: 'Bectrohit-Fort Injection Vet (3gm)',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics (Penicillin with Beta-Lactamase Inhibitor)',
    description: 'Amoxycillin (2gm) & Sulbactam (1gm) combination for resistant infections (3gm).',
    longDescription: 'Bectrohit-Fort (3gm vial) combines Amoxycillin (2gm) with Sulbactam (1gm) to combat resistant infections. It significantly decreases bacterial count in resistant infections and reduces somatic cell count in cases like E. coli and S. aureus mastitis.',
    metaDescription: 'Bectrohit-Fort Injection 3gm - Amoxycillin & Sulbactam for resistant infections. Innovation Remedies.',
    keywords: ['bectrohit-fort', 'amoxycillin sulbactam', 'resistant infection antibiotic', 'veterinary antibiotic combination', 'mastitis resistant', 'innovation remedies'],
    price: 400.00, // Placeholder price
    MRP: 480.00,   // Placeholder MRP
    currency: 'INR',
    imageUrl: bectrohitFortImage, // Placeholder for Image 21 (can be same for 4.5gm)
    imageFileName: 'bectrohit_fort_injection_3gm.png',
    imageAlt: 'Bectrohit-Fort Amoxycillin & Sulbactam 3gm Injection',
    gradientFrom: 'from-yellow-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 75,
    stock: 30,
    inStock: true,
    sku: 'IR-BECTROFORT-INJ-3GM-026',
    gtin: '8901234567915',
    features: ['Amoxycillin 2gm + Sulbactam 1gm per 3gm vial', 'Combats Resistant Infections', 'Reduces somatic cell count in mastitis', 'Rx Product'],
    benefits: ['Effective against beta-lactamase producing bacteria', 'Excellent combination for resistant infections', 'Addresses resistant mastitis, respiratory tract infections, post-operative infections'],
    dosage: '7-10 mg/kg body weight by I.V. or I.M. route once or twice daily for 3-5 days.',
    packSize: '3 gm Vial',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: Bectrohit-Fort Injection Vet (from Image 21 - 4.5gm version)
  {
    id: 'bectrohit-fort-injection-4.5gm',
    name: 'Bectrohit-Fort Injection Vet (4.5gm)',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics (Penicillin with Beta-Lactamase Inhibitor)',
    description: 'Amoxycillin (3gm) & Sulbactam (1.5gm) combination for resistant infections (4.5gm).',
    longDescription: 'Bectrohit-Fort (4.5gm vial) combines Amoxycillin (3gm) with Sulbactam (1.5gm) for enhanced action against resistant infections. It significantly decreases bacterial count in resistant infections and is effective for conditions like resistant mastitis.',
    metaDescription: 'Bectrohit-Fort Injection 4.5gm - Amoxycillin & Sulbactam. Treats resistant infections. Innovation Remedies.',
    keywords: ['bectrohit-fort 4.5gm', 'amoxycillin sulbactam high dose', 'veterinary antibiotic resistant', 'innovation remedies antibiotic'],
    price: 550.00, // Placeholder price
    MRP: 650.00,   // Placeholder MRP
    currency: 'INR',
    imageUrl: bectrohitFortImage, // Placeholder for Image 21
    imageFileName: 'bectrohit_fort_injection_4_5gm.png',
    imageAlt: 'Bectrohit-Fort Amoxycillin & Sulbactam 4.5gm Injection',
    gradientFrom: 'from-yellow-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.9,
    reviewCount: 78,
    stock: 28,
    inStock: true,
    sku: 'IR-BECTROFORT-INJ-4.5GM-027',
    gtin: '8901234567916',
    features: ['Amoxycillin 3gm + Sulbactam 1.5gm per 4.5gm vial', 'Strong action against Resistant Infections', 'Reduces bacterial count effectively', 'Rx Product'],
    benefits: ['Overcomes resistance mechanisms', 'Potent treatment for severe infections', 'Suitable for challenging cases like resistant mastitis'],
    dosage: '7-10 mg/kg body weight by I.V. or I.M. route once or twice daily for 3-5 days.',
    packSize: '4.5 gm Vial',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // Innocef Tazo 4.5gm (Uncommented and updated from Image 23)
  {
    id: 'innocef-tazo-4.5gm',
    name: 'INNOCEF-TAZO Injection (4.5gm)',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics (Cephalosporin with Beta-Lactamase Inhibitor)',
    description: 'Cefoperazone (4gm) & Tazobactam (500mg) combination for broad-spectrum bacterial infections (4.5gm).',
    longDescription: 'INNOCEF-TAZO (4.5gm Vial) combines Cefoperazone (4gm) and Tazobactam (500mg). It is rapidly absorbed, widely distributed, and slowly eliminated. Acts by inhibiting bacterial cell wall synthesis and has broad-spectrum activity against gram-positive, gram-negative, and anaerobic bacteria.',
    metaDescription: 'INNOCEF-TAZO Injection 4.5gm - Cefoperazone & Tazobactam. Broad-spectrum antibiotic. Innovation Remedies.',
    keywords: ['innocef-tazo', 'cefoperazone tazobactam', 'injectable antibiotic veterinary', 'anaerobic bacteria treatment', 'severe infections', 'innovation remedies'],
    price: 415.00,
    MRP: 415.00,
    currency: 'INR',
    imageUrl: innoceftazo, // Image 23 confirms this product
    imageFileName: 'innocef_tazo_injection_4_5gm.png',
    imageAlt: 'INNOCEF-TAZO Cefoperazone & Tazobactam 4.5gm Injection',
    gradientFrom: 'from-emerald-100',
    gradientTo: 'to-emerald-50',
    minQuantity: 1, // Updated from 10
    rating: 4.8,
    reviewCount: 85,
    stock: 20,
    inStock: true,
    sku: 'IR-INNOTAZO-INJ-4.5GM-028', // Updated SKU
    gtin: '8901234567917',
    features: ['Cefoperazone 4gm + Tazobactam 500mg per 4.5gm Vial', 'Rapidly absorbed, widely distributed', 'Broad-spectrum activity (Gram +ve, Gram -ve, Anaerobic)', 'Inhibits bacterial cell wall synthesis', 'Rx Product'],
    benefits: ['Effective against a wide range of pathogens', 'Overcomes beta-lactamase resistance', 'Suitable for severe and mixed infections'],
    dosage: '10 mg/kg body weight on the basis of Cefoperazone content I.V./I.M. or S.C. route.',
    packSize: '4.5 gm Vial (4500 mg)',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: Medinn-Enro Injection (from Image 24 - 30ml version)
  {
    id: 'medinn-enro-injection-30ml',
    name: 'Medinn-Enro Enrofloxacin Injection (30ml)',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics (Fluoroquinolone)',
    description: 'Enrofloxacin IP 100 mg/ML injection for wide spectrum bacterial infections (30ml).',
    longDescription: 'Medinn-Enro (30ml) is an Enrofloxacin IP 100 mg/ML injection for treating various bacterial infections in animals, including gastrointestinal, respiratory tract, urinary tract, soft tissues, and skin infections.',
    metaDescription: 'Medinn-Enro Injection 30ml - Enrofloxacin 100mg/ml. Treats wide spectrum infections. Innovation Remedies.',
    keywords: ['medinn-enro', 'enrofloxacin injection', 'veterinary fluoroquinolone', 'bacterial infection cattle', 'respiratory infection treatment', 'innovation remedies'],
    price: 90.00, // Placeholder price
    MRP: 110.00,   // Placeholder MRP
    currency: 'INR',
    imageUrl: medinnEnroImage, // Placeholder for Image 24 (can be same for 100ml)
    imageFileName: 'medinn_enro_injection_30ml.png',
    imageAlt: 'Medinn-Enro Enrofloxacin 100mg/ml Injection 30ml',
    gradientFrom: 'from-orange-100',
    gradientTo: 'to-yellow-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 60,
    stock: 50,
    inStock: true,
    sku: 'IR-MEDENRO-INJ-30ML-029',
    gtin: '8901234567918',
    features: ['Enrofloxacin IP 100 mg/ML', 'Treats wide spectrum infections', 'Convenient 30ml pack', 'Rx Product'],
    indications_clinical_uses: ['Gastrointestinal Infection', 'Respiratory Tract Infection', 'Urinary Tract Infection', 'Soft Tissues And Skin Infection', 'Infection Caused By Wide Spectrum bacteria'],
    benefits: ['Effective against many common bacterial pathogens', 'Good tissue penetration', 'Versatile applications'],
    dosage: '1 ML Each Kg Body Weight or As Directed by The Veterinarian.', // Note: This dosage seems very high (1ml/kg for 100mg/ml product). Usually it's mg/kg. Clarify with product literature. Assuming it's 1ml per certain kg range or specific mg/kg. For now, copying as written.
    packSize: '30 ml Vial',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: Medinn-Enro Injection (from Image 24 - 100ml version)
  {
    id: 'medinn-enro-injection-100ml',
    name: 'Medinn-Enro Enrofloxacin Injection (100ml)',
    brand: 'Innovation Remedies',
    category: 'Antibiotics',
    subcategory: 'Injectable Antibiotics (Fluoroquinolone)',
    description: 'Enrofloxacin IP 100 mg/ML injection for wide spectrum bacterial infections (100ml).',
    longDescription: 'Medinn-Enro (100ml) provides Enrofloxacin IP 100 mg/ML for treating a broad range of bacterial infections in animals. Suitable for gastrointestinal, respiratory, urinary tract, soft tissue, and skin infections. Larger pack for multiple treatments or large animals.',
    metaDescription: 'Medinn-Enro Injection 100ml - Enrofloxacin 100mg/ml. For wide spectrum infections. Innovation Remedies.',
    keywords: ['medinn-enro 100ml', 'enrofloxacin bulk', 'veterinary antibiotic large pack', 'innovation remedies enrofloxacin'],
    price: 250.00, // Placeholder price
    MRP: 300.00,    // Placeholder MRP
    currency: 'INR',
    imageUrl: medinnEnroImage, // Placeholder for Image 24
    imageFileName: 'medinn_enro_injection_100ml.png',
    imageAlt: 'Medinn-Enro Enrofloxacin 100mg/ml Injection 100ml',
    gradientFrom: 'from-orange-100',
    gradientTo: 'to-yellow-50',
    minQuantity: 1,
    rating: 4.6,
    reviewCount: 62,
    stock: 45,
    inStock: true,
    sku: 'IR-MEDENRO-INJ-100ML-030',
    gtin: '8901234567919',
    features: ['Enrofloxacin IP 100 mg/ML', 'Effective for wide spectrum infections', 'Economical 100ml pack', 'Rx Product'],
    indications_clinical_uses: ['Gastrointestinal Infection', 'Respiratory Tract Infection', 'Urinary Tract Infection', 'Soft Tissues And Skin Infection', 'Infection Caused By Wide Spectrum bacteria'],
    benefits: ['Broad antibacterial coverage', 'Cost-effective for larger requirements', 'Reliable treatment option'],
    dosage: '1 ML Each Kg Body Weight or As Directed by The Veterinarian.', // See note on 30ml version.
    packSize: '100 ml Vial',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: IRL Innoworm-DS Bolus Vet (from Image 28)
  {
    id: 'irl-innoworm-ds-bolus',
    name: 'IRL™ Innoworm-DS Bolus Vet',
    brand: 'IRL (Innovation Remedies)',
    category: 'Parasite Control',
    subcategory: 'Broad Spectrum Dewormer Bolus',
    description: 'Oxyclozanide, Levamisole Hcl, and Ivermectin Bolus for fluke and worm drench in cattle and sheep.',
    longDescription: 'IRL Innoworm-DS Bolus Vet is a broad-spectrum dewormer containing Oxyclozanide, Levamisole Hcl, and Ivermectin. It is an excellent tablet for killing liver flukes and stomach worms in pregnant and all cattle and sheep.',
    metaDescription: 'IRL Innoworm-DS Bolus - Oxyclozanide, Levamisole, Ivermectin. Fluke & worm control. Innovation Remedies.',
    keywords: ['innoworm-ds bolus', 'oxyclozanide bolus', 'levamisole ivermectin', 'fluke drench cattle', 'sheep dewormer', 'broad spectrum anthelmintic', 'innovation remedies irl'],
    price: 50.00,  // Placeholder price per bolus
    MRP: 65.00,    // Placeholder MRP per bolus
    currency: 'INR',
    imageUrl: innowormDsBolusImage, // Placeholder for Image 28
    imageFileName: 'irl_innoworm_ds_bolus.png',
    imageAlt: 'IRL Innoworm-DS Bolus - Oxyclozanide, Levamisole, Ivermectin',
    gradientFrom: 'from-lime-100',
    gradientTo: 'to-green-50',
    minQuantity: 1, // Typically sold per bolus or strip
    rating: 4.8,
    reviewCount: 80,
    stock: 100,
    inStock: true,
    sku: 'IRL-INNOWORMDS-BOL-031',
    gtin: '8901234567920',
    features: ['Contains Oxyclozanide, Levamisole Hcl, and Ivermectin', 'Broad-spectrum: Fluke and Worm drench', 'Suitable for Cattle and Sheep', 'Effective against liver and stomach worms', 'Safe for pregnant animals (as per packaging claim)'],
    benefits: ['Comprehensive parasite control', 'Treats mixed worm and fluke infestations', 'Improves animal health and productivity'],
    applications: ['Control of liver flukes, roundworms, lungworms, and other endoparasites in cattle and sheep', 'Routine deworming programs'],
    packSize: '1 Bolus', // Image specifies "1 Bolus" unit
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // NEW: RESOLUTION-PRO POWDER (from Image 30)
  {
    id: 'resolution-pro-powder-500gm',
    name: 'RESOLUTION-PRO™ POWDER (500gm)',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements',
    subcategory: 'Fertility & Mineral Powder',
    description: 'Mineral powder with Omega 3 & 6, Chelated Minerals, Vitamins & Herbals for infertility treatment (500gm).',
    longDescription: 'RESOLUTION-PRO POWDER (500gm) is a specialized mineral powder for the treatment of infertility in livestock. It aids in the development of genital organs, improves conception rate, and helps maintain pregnancy. Contains Omega 3 & 6 fatty acids, chelated Copper, Zinc, Manganese, Chromium, Selenium, Iodine, Phosphorus, Cobalt, Iron, Vitamins A, D3, E, and Herbals. Includes 25gm measure cap.',
    metaDescription: 'RESOLUTION-PRO POWDER 500gm - Treats infertility in livestock. Chelated minerals & vitamins. Innovation Remedies.',
    keywords: ['resolution-pro powder', 'infertility treatment cattle', 'livestock mineral supplement', 'chelated minerals fertility', 'omega 3 6 animals', 'repeat breeder powder', 'innovation remedies resolution'],
    price: 450.00, // Placeholder price
    MRP: 550.00,   // Placeholder MRP
    currency: 'INR',
    imageUrl: resolutionProPowderImage, // Placeholder for Image 30
    imageFileName: 'resolution_pro_powder_500gm.png',
    imageAlt: 'RESOLUTION-PRO POWDER 500gm - For Livestock Infertility',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-pink-50',
    minQuantity: 1,
    rating: 4.7,
    reviewCount: 70,
    stock: 60,
    inStock: true,
    sku: 'IR-RESPRO-PDR-500GM-032',
    gtin: '8901234567921',
    features: [
        'Treats infertility: Non Specific Anoestrus, Repeat Breeder, Silent-Estrous',
        'Development of Genital Organs', 'Improves Conception Rate', 'Maintain Pregnancy',
        'Contains Omega 3 & 6, Chelated Minerals, Vitamins, Herbals', 'With 25gm Measure Cap'
    ],
    composition_per_500gm: {
        'OMEGA 3 & 6 (FATTY ACID)': '500 mg', 'CH. COPPER SULPHATE': '18 gm', 'CH. ZINC SULPHATE': '44 gm',
        'CH. MAGNESE CHLORIDE': '14.5 gm', 'CH. CHROMIUM SULPHATE': '1500 mg', 'SELENIUM': '22 mg',
        'POTASSIUM IODATE (IODINE)': '340 mg', 'SODIUM ACID PHOSPHATE': '96.635 gm', 'DICALCIUM PHOSPHATE': '315 gm',
        'COBALT SULPHATE': '500 mg', 'FERROUS SULPHATE (IRON)': '500 mg',
        'VITAMIN A': '1.60 gm (ABOUT 50 Lac IU)', 'VITAMIN D3': '0.40 gm (ABOUT 15 Lac IU)',
        'VITAMIN E': '2000 mg (ABOUT 30 Lac IU)', 'HERBALS': 'q.s.'
    },
    benefits: ['Effective treatment for various infertility issues', 'Provides essential micronutrients for reproduction', 'Supports overall reproductive health'],
    recommended_dosage: 'Cattle/Buffalo/Heifer: 20-25 gm daily. Calf/Sheep/Goat: 10-15 gm daily. Feed Mixing Ratio: 500 gm-1Kg in 100 Kg of feed.',
    applications: ['Treatment of infertility in livestock', 'Anoestrus management', 'Repeat breeding cases', 'Silent estrus issues'],
    packSize: '500 gm with 25gm Measure Cap',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  }
];
// Helper function to process product data (normalize MRP, calculate discounts, add timers)
const processProductDataArray = (initialData) => {
  const today = new Date();
  
  // Fixed product IDs that will always have countdown timers (products with good discounts)
  const productIdsForTimer = [
    'resolution-kit',           // Resolution Kit - 18% off
    'innolact-ad3-5ltr',       // Innolact AD3 5L - 33% off  
    'innolact-gold-5ltr',      // Innolact Gold 5L - 56% off
    'calfshakti-1ltr',         // CalfShakti 1L - 27% off
    'innolact-gel-advance-500gm', // Innolact Gel 500gm - 34% off
    'innoliv-ds-5ltr',         // Innoliv DS 5L - 48% off (biggest discount)
    'weight-boost-3kg'         // Weight Boost 3kg - 36% off
  ];

  return initialData.map((product) => {
    const processed = { ...product };

    // Normalize MRP (handle 'mrp' if 'MRP' is not present or not a number)
    if (typeof processed.mrp === 'number' && (typeof processed.MRP !== 'number' || isNaN(processed.MRP))) {
      processed.MRP = processed.mrp;
    }
    delete processed.mrp; // remove the lowercase version

    // Ensure MRP and price are numbers for calculation
    const priceNum = Number(processed.price);
    const mrpNum = Number(processed.MRP);

    processed.discountPercentage = 0;
    processed.discountAmount = 0;

    if (!isNaN(priceNum) && !isNaN(mrpNum) && mrpNum > priceNum) {
      // Use existing discount fields if they are valid numbers, otherwise calculate
      if (typeof processed.discount === 'number' && !isNaN(processed.discount)) {
        processed.discountPercentage = processed.discount;
      } else {
        processed.discountPercentage = Math.round(((mrpNum - priceNum) / mrpNum) * 100);
      }

      if (typeof processed.discountAmount === 'number' && !isNaN(processed.discountAmount)) {
        // Use existing discountAmount
      } else {
        processed.discountAmount = mrpNum - priceNum;
      }
    }
    
    // Ensure discountPercentage is a number, default to 0 if not.
    if (typeof processed.discountPercentage !== 'number' || isNaN(processed.discountPercentage)) {
        processed.discountPercentage = 0;
    }
    if (typeof processed.discountAmount !== 'number' || isNaN(processed.discountAmount)) {
        processed.discountAmount = 0;
    }

    // Add discountEndDate for specific products that have a discount
    if (processed.discountPercentage > 0 && productIdsForTimer.includes(processed.id) && processed.inStock) {
      // Create different end times for each product to make them feel authentic
      const productIndex = productIdsForTimer.indexOf(processed.id);
      const baseDays = 2 + (productIndex % 4); // 2-5 days based on product position
      const baseHours = 14 + (productIndex * 2) % 10; // Different hours for each product
      
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + baseDays);
      endDate.setHours(baseHours, (productIndex * 7) % 60, (productIndex * 13) % 60, 999);
      processed.discountEndDate = endDate.toISOString();
    }

    return processed;
  });
};

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

// DiscountTimer Component
function DiscountTimer({ endDateString }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDateString));

  useEffect(() => {
    if (!endDateString || new Date(endDateString) <= new Date()) {
      setTimeLeft({}); // Clear time if offer expired
      return;
    }

    const timerId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(endDateString);
      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(timerId);
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timerId);
  }, [endDateString]);

  function calculateTimeLeft(end) {
    const difference = +new Date(end) - +new Date();
    let timeLeftOutput = {};

    if (difference > 0) {
      timeLeftOutput = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeftOutput;
  }

  if (Object.keys(timeLeft).length === 0) {
    return null; // Or <p className="text-xs text-red-500">Offer expired</p>
  }

  return (
    <div className="mt-1 text-xs text-red-600 font-semibold bg-red-100 p-1.5 rounded-md flex items-center shadow-sm">
      <Clock size={14} className="mr-1.5 flex-shrink-0 text-red-500" />
      <span className="truncate">
        Offer ends in: {timeLeft.days > 0 && `${timeLeft.days}d `}
        {`${String(timeLeft.hours).padStart(2, '0')}h `}
        {`${String(timeLeft.minutes).padStart(2, '0')}m `}
        {`${String(timeLeft.seconds).padStart(2, '0')}s`}
      </span>
    </div>
  );
}

function ProductCard({ 
  id, 
  name, 
  brand,
  description, 
  price, 
  MRP,           // Use uppercase MRP
  discountPercentage, // Use calculated discount percentage
  discountAmount,     // Use calculated discount amount
  discountEndDate,    // New prop for timer
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

  const productMicrodata = { /* ... (microdata remains same, ensure price is selling price) ... */ };
   if (MRP && Number(MRP) > Number(price) && productMicrodata.offers) {
    productMicrodata.offers.priceSpecification = {
      "@type": "PriceSpecification",
      "price": Number(MRP).toFixed(2),
      "priceCurrency": currency,
      "valueAddedTaxIncluded": true, // Assuming MRP includes tax
      "priceType": "ListPrice"
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
          {discountPercentage > 0 && inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-md">
              {discountPercentage}% OFF
            </div>
          )}
          
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
        <CardContent className="p-4 pt-3 bg-white/80 backdrop-blur-sm rounded-b-2xl flex flex-col flex-grow text-left">
          <h3 className="text-md sm:text-lg font-bold text-slate-800 leading-tight group-hover:text-sky-600 transition-colors" title={name} itemProp="name">
            {name}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 min-h-[32px] sm:min-h-[40px] mt-1">
              {description}
            </p>
          )}
          {typeof rating === 'number' && typeof reviewCount === 'number' && reviewCount > 0 && (
            <div className="flex items-center text-xs text-amber-600 mt-1.5" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <Sparkles size={14} className="mr-1 fill-amber-400 text-amber-500" />
              <span itemProp="ratingValue">{rating.toFixed(1)}</span> 
              (<span itemProp="reviewCount">{reviewCount}</span> reviews)
            </div>
          )}
          
          {/* Price, Discount, Timer, and Button Block - Pushed to bottom */}
          <div className="mt-auto space-y-2 pt-3">
            {/* Price and Discount Info */}
            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <link itemProp="url" href={`https://www.innovationremedies.com/product/${id}`} />
              <meta itemProp="availability" content={inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
              <meta itemProp="priceCurrency" content={currency} />
              {Number(price) > 0 ? (
                <>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-base sm:text-lg font-bold text-slate-900" itemProp="price" content={Number(price).toFixed(2)}>
                      ₹{Number(price).toFixed(2)}
                    </p>
                    {MRP && Number(MRP) > Number(price) && (
                      <p className="text-xs sm:text-sm text-slate-500 line-through">
                        ₹{Number(MRP).toFixed(2)}
                      </p>
                    )}
                  </div>
                  {discountPercentage > 0 && (
                    <p className="text-xs text-green-600 font-semibold mt-0.5">
                      {discountPercentage}% OFF
                      {discountAmount > 0 && ` (Save ₹${Number(discountAmount).toFixed(0)})`}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm sm:text-base font-semibold text-slate-900">
                  Price on Request
                </p>
              )}
            </div>

            {/* Discount Timer */}
            {discountEndDate && new Date(discountEndDate) > new Date() && inStock && (
              <DiscountTimer endDateString={discountEndDate} />
            )}

            {/* Min Quantity and Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
              <p className="text-xs text-slate-500 whitespace-nowrap self-center sm:self-auto">
                Min. {minQuantity} units
              </p>
              <Button
                onClick={e => { e.stopPropagation(); handleCardClick(); }}
                variant="default"
                size="sm"
                className="w-full sm:w-auto rounded-lg text-xs sm:text-sm bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                disabled={!inStock}
                aria-label={inStock ? `View details for ${name}` : `${name} is out of stock`}
              >
                <ShoppingCart size={16} className="mr-1.5" />
                {inStock ? 'Details' : 'Out of Stock'}
              </Button>
            </div>
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
  
  const [sortBy, setSortBy] = useState('relevance');

  const processedProducts = processProductDataArray(productsData);
  
  const sortedProducts = [...processedProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.price || 0) - (b.price || 0);
      case 'price-desc':
        return (b.price || 0) - (a.price || 0);
      case 'name-asc':
        return (a.name || '').localeCompare(b.name || '');
      case 'rating':
        const ratingDiff = (b.rating || 0) - (a.rating || 0);
        if (ratingDiff !== 0) return ratingDiff;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      case 'relevance':
      default:
        if (a.inStock !== b.inStock) return b.inStock ? -1 : 1; // In stock items first
        const discountDiff = (b.discountPercentage || 0) - (a.discountPercentage || 0);
        if (discountDiff !== 0) return discountDiff; // Higher discount first
        return (b.reviewCount || 0) - (a.reviewCount || 0); // Higher review count first
    }
  });

  const totalRating = processedProducts.reduce((acc, p) => acc + (p.rating || 0) * (p.reviewCount || 0), 0);
  const totalReviews = processedProducts.reduce((acc, p) => acc + (p.reviewCount || 0), 0);
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

    const metaDescription = `Shop from a wide range of high-quality veterinary products at Innovation Remedies. Find lactation supplements, dewormers, growth boosters, and more. Great deals & fast shipping across India. ${totalReviews > 0 ? `Average rating: ${averageRating}/5 from ${totalReviews} reviews.` : ''}`;
  const focusKeywords = ["veterinary products", "animal health supplements", "buy cattle medicine online", "innovation remedies products", "livestock supplements india"];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${domain}/#organization`,
        "name": "Innovation Remedies Pvt Ltd",
        "url": domain,
        "logo": { "@type": "ImageObject", "url": `${domain}/logo.png`, "width": 600, "height": 60 },
         "contactPoint": [
          { "@type": "ContactPoint", "telephone": "+91-YOUR-PHONE-NUMBER", "contactType": "Customer Support" }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Company Address",
          "addressLocality": "City",
          "addressRegion": "State",
          "postalCode": "PINCODE",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.facebook.com/yourprofile",
          "https://www.instagram.com/yourprofile"
          // Add other social media links
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        "url": domain,
        "name": "Innovation Remedies - Veterinary Products",
        "publisher": { "@id": `${domain}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${domain}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}/#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": domain },
          { "@type": "ListItem", "position": 2, "name": "Products", "item": canonicalUrl }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}/#productlist`,
        "name": "Innovation Remedies Veterinary Products",
        "description": "Complete range of veterinary medicines, supplements, and animal health products offered by Innovation Remedies.",
        "numberOfItems": processedProducts.length,
        "itemListElement": processedProducts.map((product, index) => {
          const offerSchema = {
            "@type": "Offer",
            "url": `${domain}/product/${product.id}`,
            "priceCurrency": product.currency,
            "price": product.price,
            "priceValidUntil": product.discountEndDate && new Date(product.discountEndDate) > new Date() 
                               ? new Date(product.discountEndDate).toISOString().split('T')[0] 
                               : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": { "@id": `${domain}/#organization` },
            "itemCondition": "https://schema.org/NewCondition", // Assuming all products are new
             ...(product.MRP && Number(product.MRP) > Number(product.price) && {
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": Number(product.MRP).toFixed(2),
                "priceCurrency": product.currency,
                "valueAddedTaxIncluded": true, 
                "priceType": "ListPrice"
              }
            })
          };
          return {
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Product",
              "@id": `${domain}/product/${product.id}`,
              "name": product.name,
              "description": product.longDescription || product.description,
              "image": product.imageUrl?.src || product.imageUrl,
              "brand": { "@type": "Brand", "name": product.brand },
              "manufacturer": { "@type": "Organization", "name": product.manufacturer },
              "category": product.category,
              "sku": product.sku,
              ...(product.gtin && {"gtin13": product.gtin}),
              "offers": offerSchema,
              ...(product.rating && product.reviewCount > 0 && {
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": product.rating.toFixed(1),
                  "reviewCount": product.reviewCount
                }
              })
            }
          }
        })
      },
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": "All Veterinary Products - Innovation Remedies",
        "description": metaDescription,
        "inLanguage": "en-IN",
        "isPartOf": { "@id": `${domain}/#website` },
        "breadcrumb": { "@id": `${canonicalUrl}/#breadcrumb` },
        "mainEntity": { "@id": `${canonicalUrl}/#productlist`},
        "datePublished": "2023-01-01T08:00:00+05:30", // A general publish date for the page
        "dateModified": currentDate
      }
    ]
  };




  return (
    <HelmetProvider>
      <Helmet>
        <title>Veterinary Products Online - Best Deals | Innovation Remedies</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={`veterinary medicines, animal supplements, cattle feed supplements, poultry products, livestock healthcare, ${focusKeywords.join(', ')}`} />
        <meta property="og:title" content="High-Quality Veterinary Products | Innovation Remedies" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${domain}${logo}`} />
        <meta property="og:image:alt" content="Innovation Remedies Logo" />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Veterinary Products - Innovation Remedies" />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`${domain}${logo}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData, null, 2)}
        </script>
      </Helmet>

      <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
         <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-sky-600 text-white px-4 py-2 rounded z-50">
          Skip to main content
        </a>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
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

        

          <div className="sticky top-0 z-20 py-4 bg-slate-50/80 backdrop-blur-md mb-8 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
             
              <div className="w-full sm:w-auto sm:min-w-[180px]">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value || 'relevance')}>
                  <SelectTrigger className="w-full rounded-lg h-10 text-xs sm:text-sm border-slate-300 text-slate-700 focus:ring-sky-500 focus:border-sky-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance" className="text-xs sm:text-sm">Relevance</SelectItem>
                    <SelectItem value="price-asc" className="text-xs sm:text-sm">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc" className="text-xs sm:text-sm">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc" className="text-xs sm:text-sm">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        <main id="main-content">
          <motion.div
            className="grid grid-cols-2 gap-y-6 sm:grid-cols-2 gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sortedProducts.map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
          </motion.div>
        </main>

         <nav aria-label="Pagination" className="flex justify-center mt-12 sm:mt-16 space-x-3">
            <Button variant="outline" size="default" className="rounded-lg text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-100 px-6" disabled>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button variant="default" size="default" className="rounded-lg bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-lg px-6">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>

          <section className="mt-20 sm:mt-28 border-t border-slate-200 pt-12 sm:pt-16">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="mx-auto h-12 w-12 text-amber-400 mb-4" />
               <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Trusted by Veterinarians & Farmers</h2>
              <p className="text-md text-slate-600">
                We are committed to providing effective and reliable animal health solutions. Our products are backed by research and manufactured to the highest quality standards.
              </p>
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
                  <div className="text-3xl font-bold text-sky-600">
                    {averageRating > 0 ? parseFloat(averageRating).toFixed(1) : '5.0'}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-sky-600">14+</div>
                  <div className="text-sm text-slate-600 mt-1">Years Experience</div>
                </div>
              </div>
            </div>
          </section>

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
              <li><strong>General Health & Fertility:</strong> AYNGROW Bolus for multivitamins, RS 21 for reproductive health.</li>
            </ul>
            <p>
              All our products are manufactured in GMP-certified facilities and undergo rigorous quality testing to ensure safety and efficacy for your animals. We focus on innovative solutions to common veterinary challenges, helping you ensure the health and productivity of your livestock.
            </p>
          </section>

          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-semibold text-lg" itemProp="name">What are the best lactation supplements for dairy cattle?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-600 mt-2">
                    Our top lactation supplements include Innolact AD3 Gold with chelated minerals for premium results, Innolact AD3 for consistent daily supplementation, 
                    and Innolact Gel Advance for easy administration and quick absorption. These products are specifically formulated to boost milk production, improve milk quality, and support the overall health of lactating animals.
                  </p>
                </div>
              </div>
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-semibold text-lg" itemProp="name">How to order Innovation Remedies products in bulk?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-600 mt-2">
                    For bulk orders and wholesale inquiries, please contact our sales team directly through our "Contact Us" page or call the provided number. We offer special pricing and support for veterinary clinics, large dairy farms, and distributors. 
                    Minimum order quantities may vary by product, and details can be found on individual product pages or by discussing with our team.
                  </p>
                </div>
              </div>
               <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-semibold text-lg" itemProp="name">Are Innovation Remedies products safe for all types of livestock?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-slate-600 mt-2">
                    Most of our products are formulated for a broad range of livestock, including cattle, buffaloes, sheep, and goats. However, specific product applications and recommended dosages are detailed on each product's page and packaging. Always consult the product label or a veterinarian for guidance specific to your animals' needs.
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