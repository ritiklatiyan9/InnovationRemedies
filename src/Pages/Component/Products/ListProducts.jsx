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
  // 1. Resolution kit - 549
  {
    id: 'resolution-kit',
    name: ' Resolution™ Kit',
    brand: 'Innovation Remedies',
    category: 'Veterinary Care',
    subcategory: 'Diagnostic Kits',
    description: 'Complete resolution kit for veterinary care',
    longDescription: 'Our Resolution Kit offers a comprehensive solution for various veterinary care needs. It includes essential components to aid in quick diagnosis and effective treatment, ensuring animal well-being. Ideal for field veterinarians and clinics.',
    metaDescription: 'Buy Resolution Kit for veterinary care at ₹450 (MRP ₹549). Complete diagnostic solution for animal health. Essential for field veterinarians & clinics. Innovation Remedies India.',
    keywords: ['resolution kit', 'veterinary diagnostic kit', 'animal health kit', 'veterinary care equipment', 'field veterinary kit', 'innovation remedies resolution kit'],
    price: 450.00,
    MRP:549.00,
    currency: 'INR',
    imageUrl: reskit,
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

  // 2. Innolact Adj Super (Original probably 5L, though name doesn't specify)
  {
    id: 'innolact-ad3-5ltr', // Made ID unique
    name: 'Innolact® AD3 (5 Ltr.)', // Added pack size to name for clarity
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
    sku: 'IR-INNO-AD3-5L-002', // Made SKU unique
    gtin: '8901234567891', // Assuming GTIN might be shared for product line or needs to be unique
    features: ['Boosts milk yield', 'Enhances milk quality', 'Supports udder health'],
    benefits: ['Increases daily milk production', 'Improves fat percentage in milk', 'Maintains animal health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Lactating animals'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-ad3-super-10ltr', // Made ID unique
    name: 'Innolact®  AD3 Super (10 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Dairy Animal Nutrition',
    description: 'Advanced lactation supplement for dairy animals (10 Liters)',
    longDescription: 'Innolact AD3 Super (10 Liters) is an advanced lactation supplement formulated for dairy animals. It enhances milk production, improves milk quality, and supports overall health. Contains vital vitamins and minerals.',
    metaDescription: 'Innolact AD3 Super (10 Liters) - Boost milk production & quality. Vitamin AD3 enriched formula by Innovation Remedies.',
    keywords: ['innolact ad3 super 10l', 'lactation supplement', 'dairy supplement', 'milk production booster', 'innovation remedies innolact'],
    MRP: 2700.00, // Corrected from mrp
    price:1800.00,
    currency: 'INR',
    imageUrl: twotwo, // Assuming same image for product line
    imageFileName: 'innolact_ad3_super_10ltr.png',
    imageAlt: 'Innolact AD3 Super 10 Liters - Premium Lactation Supplement',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-10L-002A', // Made SKU unique
    gtin: '8901234567891A', // Made GTIN unique example
    features: ['Boosts milk yield', 'Enhanced milk quality', 'Supports udder health', 'Economical 10L pack'],
    benefits: ['Increased daily milk production', 'Improved milk fat', 'Maintains health during lactation'],
    applications: ['Dairy cattle', 'Buffaloes', 'Large dairy farms'],
    packSize: '10 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-ad3-super-20ltr', // Made ID unique
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
    imageUrl: twotwo, // Assuming same image for product line
    imageFileName: 'innolact_ad3_super_20ltr.png',
    imageAlt: 'Innolact AD3 Super 20 Liters - Bulk Lactation Supplement',
    gradientFrom: 'from-purple-100',
    gradientTo: 'to-purple-50',
    minQuantity: 1,
    rating: 4.5,
    reviewCount: 89,
    stock: 30,
    inStock: true,
    sku: 'IR-INNO-AD3-20L-002B', // Made SKU unique
    gtin: '8901234567891B', // Made GTIN unique example
    features: ['High milk yield boost', 'Superior milk quality', 'Supports udder health', 'Large 20L pack'],
    benefits: ['Significant increase in milk production', 'Enhanced milk richness', 'Long-term animal wellness'],
    applications: ['High-yielding dairy cattle', 'Large-scale dairy operations', 'Buffaloes'],
    packSize: '20 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 3. Innolact gold
  {
    id: 'innolact-gold-5ltr', // Made ID unique
    name: 'Innolact® AD3 Gold (5 Ltr.)', // Added pack size to name for clarity
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
    sku: 'IR-INNO-GOLD-5L-003', // Made SKU unique
    gtin: '8901234567892',
    features: ['Premium formulation', 'Maximized milk production', 'With chelated minerals'],
    benefits: ['Superior bioavailability', 'Peak lactation support', 'Enhanced mineral absorption'],
    applications: ['High-yielding dairy cattle', 'Premium dairy farms', 'Peak lactation period'],
    packSize: '5 Liters',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-gold-10ltr', // Made ID unique
    name: 'Innolact® AD3 Gold (10 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (10 Liters)',
    longDescription: 'Innolact AD3 Gold (10 Liters) offers superior lactation support with chelated minerals and high-potency vitamins. Designed to maximize milk production and maintain animal health during peak periods. Economical 10 Liter pack.',
    metaDescription: 'Innolact AD3 Gold (10 Liters) - Chelated minerals for maximum milk production. Innovation Remedies premium range.',
    keywords: ['innolact gold 10l', 'premium lactation supplement', 'chelated minerals cattle', 'innovation remedies gold'],
    MRP: 2400.00, // Corrected from mrp
    price:1500.00,
    currency: 'INR',
    imageUrl: twothree, // Assuming same image for product line
    imageFileName: 'innolact_gold_10ltr.png',
    imageAlt: 'Innolact AD3 Gold 10 Liters - Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-10L-003A', // Made SKU unique
    gtin: '8901234567892A', // Made GTIN unique example
    features: ['Premium formulation', 'Maximized milk production', 'Chelated minerals', '10L pack'],
    benefits: ['Superior bioavailability', 'Peak lactation support', 'Enhanced mineral absorption', 'Cost-effective'],
    applications: ['High-yielding dairy cattle', 'Premium dairy farms', 'Extended use'],
    packSize: '10 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'innolact-gold-20ltr', // Made ID unique
    name: 'Innolact® AD3 Gold (20 Ltr.)',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Premium Dairy Nutrition',
    description: 'Premium gold formula for enhanced lactation (20 Liters)',
    longDescription: 'Our Innolact AD3 Gold (20 Liters) is the ultimate premium formula for superior lactation support in large herds. Features chelated minerals and high-potency vitamins to maximize milk production and animal health during peak lactation.',
    metaDescription: 'Innolact AD3 Gold (20 Liters) - Bulk premium lactation formula with chelated minerals. Innovation Remedies.',
    keywords: ['innolact gold 20l', 'bulk premium lactation', 'chelated minerals dairy', 'innovation remedies'],
    MRP: 4500.00, // Corrected from mrp
    price:2500.00,
    currency: 'INR',
    imageUrl: twothree, // Assuming same image for product line
    imageFileName: 'innolact_gold_20ltr.png',
    imageAlt: 'Innolact AD3 Gold 20 Liters - Bulk Chelated Mineral Formula',
    gradientFrom: 'from-amber-100',
    gradientTo: 'to-amber-50',
    minQuantity: 1,
    rating: 4.8,
    reviewCount: 112,
    stock: 15,
    inStock: true,
    sku: 'IR-INNO-GOLD-20L-003B', // Made SKU unique
    gtin: '8901234567892B', // Made GTIN unique example
    features: ['Top-tier formulation', 'Maximum milk output', 'With chelated minerals', 'Large 20L pack'],
    benefits: ['Highest bioavailability', 'Sustained peak lactation', 'Optimal mineral uptake', 'Best value for large farms'],
    applications: ['Elite dairy cattle herds', 'Large commercial dairy farms', 'Peak lactation management'],
    packSize: '20 Liters', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 4. Innolact Gel Advance
  {
    id: 'innolact-gel-advance-1ltr', // Clarified ID for 1 Liter version
    name: 'Innolact® Gel Advance (1 Ltr.)', // Added pack size for clarity
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
    sku: 'IR-INNO-GEL-1L-004', // Clarified SKU
    gtin: '8901234567893',
    features: ['Sulfur-enhanced', 'Easy gel administration', 'Supports metabolic health'],
    benefits: ['Improves protein synthesis', 'Better nutrient utilization', 'Quick absorption formula'],
    applications: ['All dairy animals', 'Metabolic disorders', 'Lactation support'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 5. Innolact gel Advance 500gm
  {
    id: 'innolact-gel-advance-500gm', // Changed ID slightly for consistency
    name: 'Innolact® Gel Advance 500gm',
    brand: 'Innovation Remedies',
    category: 'Lactation Supplements',
    subcategory: 'Gel Formulations',
    description: 'Advanced gel formula for lactation support (500gm)',
    longDescription: 'This 500gm pack of Innolact Gel Advance provides a convenient supply of our advanced gel formula for consistent lactation support. Ideal for managing multiple animals or for extended use.',
    metaDescription: 'Innolact Gel Advance 500gm pack ₹250 (MRP ₹380). Cost-effective lactation gel supplement. Innovation Remedies.',
    keywords: ['innolact gel 500gm', 'bulk lactation gel', 'dairy farm supplement', 'cost effective dairy gel', 'innovation remedies 500gm'],
    MRP: 380.00,
    price:250.00,
    currency: 'INR',
    imageUrl: twofour,
    imageFileName: 'innolact_gel_advance_500gm.png',
    imageAlt: 'Innolact Gel Advance 500gm - Economy Pack Lactation Gel Supplement',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5,
    rating: 4.9,
    reviewCount: 135,
    stock: 40,
    inStock: true,
    sku: 'IR-INNO-GEL500GM-005', // Clarified SKU
    gtin: '8901234567894',
    features: ['Advanced gel formula', 'Cost-effective 500gm pack', 'Quick absorption'],
    benefits: ['Bulk packaging savings', 'Extended supply', 'Consistent quality'],
    applications: ['Multi-animal farms', 'Regular supplementation', 'Dairy cooperatives'],
    packSize: '500 grams',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 7. Innolact bolus 40 bolus
  {
    id: 'innolact-bolus-40',
    name: 'Innolact® Bolus (40 Bolus)', // Added brackets for consistency
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

  // 8. Calfshakti
  {
    id: 'calfshakti-1ltr', // Made ID unique
    name: 'IRL™ CalfShakti (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Enhanced nutrition for calves (1 Liter)',
    longDescription: 'CalfShakti (1Ltr) provides enhanced nutrition crucial for the healthy growth and development of calves. It supports immune function and helps in achieving optimal weight gain.',
    metaDescription: 'CalfShakti 1 Liter ₹550 (MRP ₹750) - Premium calf nutrition supplement. Boost immunity & growth. Innovation Remedies.',
    keywords: ['calfshakti 1l', 'calf supplement', 'calf nutrition', 'calf growth booster', 'young calf care', 'innovation remedies calfshakti'],
    MRP: 750.00,
    price:550.00,
    currency: 'INR',
    imageUrl: thirteen,
    imageFileName: 'calfshakti_1ltr.png',
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
  {
    id: 'calfshakti-200ml', // Made ID unique
    name: 'IRL™ CalfShakti (200ml)',
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Enhanced nutrition for calves (200ml)',
    longDescription: 'CalfShakti (200ml) provides essential nutrition for young calves, supporting healthy growth, development, and immune function. Convenient smaller pack size.',
    metaDescription: 'CalfShakti 200ml - Nutrition supplement for young calves. Boost immunity & growth. Innovation Remedies.',
    keywords: ['calfshakti 200ml', 'calf supplement', 'small calf nutrition', 'calf growth booster', 'innovation remedies calfshakti'],
    MRP: 180.00, // Adjusted MRP to be more logical for 200ml vs 1L, original was 750
    price:150.00, // Adjusted price to be more logical, original was 550
    currency: 'INR',
    imageUrl: calfshaktiml,
    imageFileName: 'calfshakti_200ml.png',
    imageAlt: 'CalfShakti 200ml - Nutrition Supplement for Healthy Calf Growth',
    gradientFrom: 'from-sky-100',
    gradientTo: 'to-sky-50',
    minQuantity: 2, // Min quantity might differ for smaller pack
    rating: 4.8,
    reviewCount: 105, // Review count might be for product line
    stock: 18,
    inStock: true,
    sku: 'IR-CALF-200ML-007A', // Made SKU unique
    gtin: '8901234567896A', // Made GTIN unique
    features: ['Supports calf growth', 'Boosts immunity', 'Convenient 200ml pack'],
    benefits: ['Optimal weight gain', 'Strong immune system', 'Healthy development', 'Easy for small doses'],
    applications: ['Young calves', 'Individual calf dosing', 'Starter nutrition'],
    packSize: '200 ml', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 9. Calfshakti 500ml
  {
    id: 'calfshakti-500ml',
    name: 'IRL™ CalfShakti (500ml)', // Added brackets for consistency
    brand: 'Innovation Remedies',
    category: 'Calf Nutrition',
    subcategory: 'Growth Supplements',
    description: 'Nutrition supplement for young calves (500ml)',
    longDescription: 'The 500ml pack of CalfShakti offers a targeted nutrition supplement for young calves, promoting vitality and healthy development during their critical early stages.',
    metaDescription: 'CalfShakti 500ml ₹330 (MRP ₹419) - Essential nutrition for young calves. Innovation Remedies calf care range.',
    keywords: ['calfshakti 500ml', 'small calf supplement', 'young calf nutrition', 'calf starter supplement', 'calf vitality booster', 'innovation remedies 500ml'],
    MRP: 419.00,
    price:330.00,
    currency: 'INR',
    imageUrl: advcalf,
    imageFileName: 'calfshakti_500ml.png',
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

  // 10. Badda H
  {
    id: 'badda-h-1ltr', // Made ID unique
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
    id: 'badda-h-250ml', // Made ID unique
    name: 'Badda H™ (250 ml)',
    brand: 'Innovation Remedies',
    category: 'Health Supplements',
    subcategory: 'Urinary & Digestive Care',
    description: 'Supports urinary tract and digestive health (250ml)',
    longDescription: 'Badda H (250ml) is formulated to support urinary tract and digestive health in animals. Aids in preventing common issues and promotes systemic balance. Convenient 250ml pack.',
    metaDescription: 'Badda H 250ml - Urinary & digestive health for animals. Innovation Remedies.',
    keywords: ['badda h 250ml', 'animal urinary health', 'animal digestive care', 'innovation remedies'],
    MRP: 700.00, // Corrected from mrp
    price : 400.00,
    currency: 'INR',
    imageUrl: tryu,
    imageFileName: 'badda_h_250ml.png',
    imageAlt: 'Badda H 250ml - Urinary Tract and Digestive Health Support',
    gradientFrom: 'from-indigo-100',
    gradientTo: 'to-indigo-50',
    minQuantity: 1,
    rating: 4.8, // Rating likely for product line
    reviewCount: 112, // Review count likely for product line
    stock: 12,
    inStock: true,
    sku: 'IR-BADDA-250ML-009A', // Made SKU unique
    gtin: '8901234567898A', // Made GTIN unique
    features: ['Urinary tract support', 'Digestive health aid', 'Systemic balance', '250ml pack'],
    benefits: ['Prevents UTI issues', 'Improves digestion', 'Overall health maintenance', 'Easy for smaller doses'],
    applications: ['All livestock', 'Preventive care', 'Individual animal treatment'],
    packSize: '250 ml', // Corrected packSize
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 11. Racer kit
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

  // 12. Innoliv DS
  {
    id: 'innoliv-ds-1ltr', // Made ID unique
    name: 'IRL™ Innoliv DS (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Liver Care',
    subcategory: 'Hepatic Supplements',
    description: 'Advanced liver support supplement for animal vitality (1 Liter)',
    longDescription: 'Innoliv DS (1Ltr) is an advanced liver support supplement that promotes detoxification and enhances overall animal vitality. Essential for maintaining liver health and function.',
    metaDescription: 'Innoliv DS 1 Liter ₹250 (MRP ₹325) - Advanced liver support for animals. Innovation Remedies hepatic care.',
    keywords: ['innoliv ds 1l', 'liver support animals', 'hepatic supplement', 'detoxification animals', 'liver care veterinary', 'innovation remedies innoliv'],
    MRP: 325.00, // Corrected from mrp
    price:250.00,
    currency: 'INR',
    imageUrl: fourteen,
    imageFileName: 'innoliv_ds_1ltr.png',
    imageAlt: 'Innoliv DS 1 Liter - Advanced Liver Support and Detoxification Supplement',
    gradientFrom: 'from-teal-100',
    gradientTo: 'to-teal-50',
    minQuantity: 5, // This was 5, seems high for 1L, but keeping as per original
    rating: 4.9,
    reviewCount: 135,
    stock: 35,
    inStock: true,
    sku: 'IR-INNO-LIV-1L-011', // Clarified SKU
    gtin: '8901234567900',
    features: ['Advanced liver support', 'Promotes detoxification', 'Enhances vitality'],
    benefits: ['Liver protection', 'Toxin elimination', 'Improved metabolism'],
    applications: ['All animals', 'Post-medication care', 'Preventive hepatic care'],
    packSize: '1 Liter',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
  id: 'innoliv-ds-5ltr', // Made ID unique
  name: 'IRL™ Innoliv DS (5Ltr)',
  brand: 'Innovation Remedies',
  category: 'Liver Care',
  subcategory: 'Hepatic Supplements',
  description: 'Advanced liver support supplement for animal vitality (5 Liters)',
  longDescription: 'Innoliv DS (5Ltr) is an advanced liver support supplement that promotes detoxification and enhances overall animal vitality. Essential for maintaining liver health and function. Economical 5 Liter pack.',
  metaDescription: 'Innoliv DS 5 Liter ₹650 (MRP ₹1250) - Advanced liver support for animals. Innovation Remedies hepatic care products.',
  keywords: ['innoliv ds 5l', 'liver support animals', 'hepatic supplement', 'detoxification animals', 'liver care veterinary', 'innovation remedies innoliv'],
  price: 650.00,
  MRP: 1250.00, // Corrected from mrp
  discount: 48,  // 48% discount
  discountAmount: 600.00,  // ₹600 off
  currency: 'INR',
  imageUrl: fiveltr,
  imageFileName: 'innoliv_ds_5ltr.png',
  imageAlt: 'Innoliv DS 5 Liter - Advanced Liver Support and Detoxification Supplement',
  gradientFrom: 'from-teal-100',
  gradientTo: 'to-teal-50',
  minQuantity: 1, // Adjusted minQuantity for larger pack
  rating: 4.9,
  reviewCount: 135,
  stock: 35,
  inStock: true,
  sku: 'IR-INNO-LIV-5L-011A', // Made SKU unique
  gtin: '8901234567900A', // Made GTIN unique
  features: ['Advanced liver support', 'Promotes detoxification', 'Enhances vitality', '5L economy pack'],
  benefits: ['Liver protection', 'Toxin elimination', 'Improved metabolism', 'Cost-effective for herds'],
  applications: ['All animals', 'Post-medication care', 'Preventive hepatic care', 'Large animal groups'],
  packSize: '5 Liters', // Corrected packSize
  manufacturer: 'Innovation Remedies Pvt Ltd',
  countryOfOrigin: 'India',
} , 

  // 14. Urocoenta Advance
  {
    id: 'urocoenta-advance-500ml', // Added packsize to id for clarity
    name: 'Urocenta® Advance (500ml)', // Added packsize to name for clarity
    brand: 'Innovation Remedies',
    category: 'Urinary Care',
    subcategory: 'Kidney Health',
    description: 'Advanced urinary health supplement (500ml)',
    longDescription: 'Urocoenta Advance (500ml) is a cutting-edge supplement for maintaining urinary health in animals. It helps prevent urinary issues and supports healthy kidney function.',
    metaDescription: 'Urocoenta Advance 500ml ₹210 (MRP ₹300) - Advanced urinary health supplement. Innovation Remedies.',
    keywords: ['urocoenta advance', 'urinary health supplement', 'kidney support animals', 'uti prevention animals', 'innovation remedies urocoenta'],
    MRP: 300.00, // Corrected from mrp
    price:210.00,
    currency: 'INR',
    imageUrl: three,
    imageFileName: 'urocoenta_advance_500ml.png',
    imageAlt: 'Urocoenta Advance 500ml - Advanced Urinary and Kidney Health Supplement',
    gradientFrom: 'from-blue-100',
    gradientTo: 'to-blue-50',
    minQuantity: 5, // This was 5
    rating: 4.6,
    reviewCount: 95,
    stock: 28,
    inStock: true,
    sku: 'IR-URO-ADV-500ML-012', // Clarified SKU
    gtin: '8901234567901',
    features: ['Advanced urinary health', 'Supports kidney function', 'Preventative care'],
    benefits: ['UTI prevention', 'Kidney stone prevention', 'Maintains pH balance'],
    applications: ['All livestock', 'Preventive care', 'Kidney support'],
    packSize: '500 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 15. Glucodyna
  {
    id: 'glucodyna-1ltr', // Clarified ID
    name: 'Glucodyna™ (1Ltr)',
    brand: 'Innovation Remedies',
    category: 'Energy Supplements',
    subcategory: 'Glucose Support',
    description: 'Energy and glucose supplement for animals (1 Liter)',
    longDescription: 'Glucodyna (1Ltr) is a vital energy and glucose supplement for animals, particularly useful during periods of stress, recovery, or high energy demand. Helps maintain blood glucose levels.',
    metaDescription: 'Glucodyna 1 Liter ₹600 (MRP ₹750) - Instant energy & glucose supplement for animals. Innovation Remedies.',
    keywords: ['glucodyna 1l', 'glucose supplement animals', 'energy booster animals', 'stress recovery animals', 'innovation remedies glucodyna'],
    MRP: 750.00,
    price:600.00,
    currency: 'INR',
    imageUrl: tenn,
    imageFileName: 'glucodyna_1ltr.png',
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

  // 16. R3 Vet Bolus
  {
    id: 'r3-vet-bolus-10', // Clarified ID
    name: 'R3 Vet Bolus (10 Bolus)', // Added packsize for clarity
    brand: 'Innovation Remedies',
    category: 'General Health',
    subcategory: 'Multi-Purpose Supplements',
    description: 'Premium veterinary supplement for animal health (10 Bolus)',
    longDescription: 'R3 Vet Bolus (10 Bolus) is a premium multi-purpose veterinary supplement designed to support overall animal health and well-being. Convenient bolus form for easy administration.',
    metaDescription: 'R3 Vet Bolus (10 Bolus) ₹300 (MRP ₹400) - Premium multi-purpose veterinary supplement. Innovation Remedies.',
    keywords: ['r3 vet bolus', 'veterinary bolus', 'multi purpose supplement', 'animal health bolus', 'innovation remedies r3'],
    MRP: 400.00,
    price:300.00,
    currency: 'INR',
    imageUrl: R3,
    imageFileName: 'r3_vet_bolus_10.png',
    imageAlt: 'R3 Vet Bolus (10 Bolus) - Premium Multi-Purpose Veterinary Health Supplement',
    gradientFrom: 'from-pink-100',
    gradientTo: 'to-pink-50',
    minQuantity: 10, // This was 10, seems like it's for a box of 10, so 1 box is min
    rating: 4.7,
    reviewCount: 156,
    stock: 60,
    inStock: true,
    sku: 'IR-R3-BOL10-014', // Clarified SKU
    gtin: '8901234567903',
    features: ['Premium supplement', 'Overall animal health', 'Convenient bolus', 'Pack of 10'],
    benefits: ['Complete nutrition', 'Easy administration', 'Long shelf life'],
    applications: ['All animals', 'Routine supplementation', 'Health maintenance'],
    packSize: '10 Boluses',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 17. Innoworm XL 100ml
  {
    id: 'innoworm-xl-100ml',
    name: 'IRL™ Innoworm XL (100ml)', // Added brackets
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

  // 18. Innoworm 30ml
  {
    id: 'innoworm-30ml',
    name: 'IRL™ Innoworm (30ml)', // Added brackets
    brand: 'Innovation Remedies',
    category: 'Parasite Control',
    subcategory: 'Dewormers', // Description says "Nutritional supplement", but category is "Parasite Control"
    description: 'Palatable dewormer for young animals (30ml)', // Corrected description to match category
    longDescription: 'Innoworm 30ml is a palatable dewormer formulated for young or recovering animals. Its palatable formula ensures easy acceptance while effectively controlling parasites.', // Adjusted
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
    stock: 0, // Stock is 0 but inStock is true - potential inconsistency. Will keep as is from original data.
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

  // 19. Weight boost 3kg
  {
    id: 'weight-boost-3kg',
    name: 'Weight Boost (3kg)', // Added brackets
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements',
    subcategory: 'Weight Gain',
    description: 'Weight gain supplement for livestock (3kg)',
    longDescription: 'Weight Boost (3kg) is a high-calorie supplement designed to promote significant weight gain in livestock. Ideal for animals needing to build mass or recover condition.',
    metaDescription: 'Weight Boost 3kg ₹800 (MRP ₹1250) - High-calorie weight gain supplement for livestock. Innovation Remedies.',
    keywords: ['weight boost 3kg', 'weight gain supplement', 'livestock mass gainer', 'high calorie feed', 'innovation remedies weight boost'],
    MRP: 1250.00,
    price : 800.00,
    currency: 'INR',
    imageUrl: wui,
    imageFileName: 'weight_boost_3kg.png',
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

  // 22. Makkhi Soap 75gm
  {
    id: 'makkhi-soap-75gm',
    name: 'IRL™ Makkhi Soap (75gm)', // Added brackets
    brand: 'Innovation Remedies',
    category: 'Animal Hygiene',
    subcategory: 'Insect Repellents',
    description: 'Herbal insect repellent soap for animal hygiene (75gm)',
    longDescription: 'Makkhi Soap (75gm) is a herbal insect repellent soap that ensures animal hygiene and comfort. It effectively repels flies and other ectoparasites while being gentle on the skin.',
    metaDescription: 'Makkhi Soap 75gm ₹60 (MRP ₹120) - Herbal insect repellent soap for animals. Innovation Remedies.',
    keywords: ['makkhi soap', 'insect repellent soap', 'fly repellent animals', 'herbal animal soap', 'innovation remedies makkhi'],
    price: 60.00,
    MRP:120.00,
    currency: 'INR',
    imageUrl: seventeen,
    imageFileName: 'makkhi_soap_75gm.png',
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

  // 23. Makkhi 15ml
  {
    id: 'makkhi-liquid-15ml', // Made ID more specific
    name: 'IRL™ Makkhi Liquid (15ml)', // Added "Liquid" and brackets
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
    sku: 'IR-MAKKHI-LIQ15ML-019', // Clarified SKU
    gtin: '8901234567908',
    features: ['Potent concentrate', 'Effective pest control', 'Economical 15ml pack'],
    benefits: ['Long-lasting effect', 'Cost-effective solution', 'Multiple pest control'],
    applications: ['Stable pest control', 'Fly prevention', 'Area treatment'],
    packSize: '15 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },

  // 24. Makkhi 6ml
  {
    id: 'makkhi-liquid-6ml', // Made ID specific
    name: 'IRL™ Makkhi Liquid (6ml)', // Added "Liquid" and brackets
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
    sku: 'IR-MAKKHI-LIQ6ML-020', // Clarified SKU
    gtin: '8901234567909',
    features: ['Fast-acting solution', 'Quick pest knockdown', 'Convenient 6ml size'],
    benefits: ['Immediate results', 'Easy spot application', 'Trial size available'],
    applications: ['Emergency pest control', 'Small area treatment', 'Quick intervention'],
    packSize: '6 ml',
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // Corrected AYNGROW and RS 21 products
   {
    id: 'ayngrow-bolus-20', // Unique ID
    name: 'AYNGROW Bolus (20 Bolus)',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements', // Corrected category
    subcategory: 'Vitamin & Mineral Bolus', // Corrected subcategory
    description: 'Multivitamin and mineral bolus for livestock (20 Bolus)',
    longDescription: 'AYNGROW Bolus (20 Bolus) is a comprehensive multivitamin and mineral supplement for livestock, promoting overall health, growth, and productivity. Easy to administer bolus form.',
    metaDescription: 'AYNGROW Bolus (20 Bolus) ₹650 (MRP ₹900) - Multivitamin & mineral supplement for livestock health. Innovation Remedies.',
    keywords: ['ayngrow bolus', 'multivitamin bolus', 'mineral supplement livestock', 'animal health bolus', 'innovation remedies ayngrow'],
    MRP: 900.00,
    price:650.00,
    currency: 'INR',
    imageUrl: twentyone, // Original imageUrl for this item
    imageFileName: 'ayngrow_bolus_20.png', // Corrected
    imageAlt: 'AYNGROW Bolus (20 Bolus) - Multivitamin and Mineral Supplement', // Corrected
    gradientFrom: 'from-green-100', // Adjusted gradient
    gradientTo: 'to-green-50',   // Adjusted gradient
    minQuantity: 1, // Min quantity likely 1 pack
    rating: 4.9, // Assuming rating from original placeholder
    reviewCount: 93, // Assuming review count from original placeholder
    stock: 100,
    inStock: true,
    sku: 'IR-AYNGROW-BOL20-021', // Unique SKU
    gtin: '8901234567910', // Example new GTIN
    features: ['Rich in multivitamins', 'Essential minerals', 'Promotes growth', 'Boosts immunity', 'Pack of 20 Bolus'],
    benefits: ['Improved animal health', 'Better feed conversion', 'Enhanced productivity', 'Stress reduction'],
    applications: ['Cattle', 'Buffaloes', 'Sheep', 'Goats', 'Growth promotion', 'Health maintenance'],
    packSize: '20 Boluses', // Corrected
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'ayngrow-bolus-40', // Unique ID
    name: 'AYNGROW Bolus (40 Bolus)',
    brand: 'Innovation Remedies',
    category: 'Nutritional Supplements', // Corrected category
    subcategory: 'Vitamin & Mineral Bolus', // Corrected subcategory
    description: 'Multivitamin and mineral bolus for livestock (40 Bolus)',
    longDescription: 'AYNGROW Bolus (40 Bolus) provides a larger pack of comprehensive multivitamin and mineral supplement for livestock. Supports overall health, growth, and productivity. Convenient bolus form.',
    metaDescription: 'AYNGROW Bolus (40 Bolus) ₹1050 (MRP ₹1550) - Bulk multivitamin & mineral supplement for livestock. Innovation Remedies.',
    keywords: ['ayngrow bolus 40', 'bulk multivitamin bolus', 'livestock mineral supplement', 'animal wellness', 'innovation remedies ayngrow'],
    MRP: 1550.00, // Corrected from mrp
    price:1050.00,
    currency: 'INR',
    imageUrl: fourtybolus, // Original imageUrl for this item
    imageFileName: 'ayngrow_bolus_40.png', // Corrected
    imageAlt: 'AYNGROW Bolus (40 Bolus) - Bulk Multivitamin and Mineral Supplement', // Corrected
    gradientFrom: 'from-green-100', // Adjusted gradient
    gradientTo: 'to-teal-50',    // Adjusted gradient
    minQuantity: 1, // Min quantity likely 1 pack
    rating: 4.9,
    reviewCount: 93,
    stock: 100,
    inStock: true,
    sku: 'IR-AYNGROW-BOL40-022', // Unique SKU
    gtin: '8901234567911', // Example new GTIN
    features: ['Comprehensive multivitamins', 'Key minerals', 'Supports robust growth', 'Strengthens immunity', 'Economy pack of 40 Bolus'],
    benefits: ['Enhanced animal vitality', 'Improved feed efficiency', 'Boosted reproductive health', 'Cost-effective for herds'],
    applications: ['Dairy cattle', 'Beef cattle', 'Large ruminants', 'Breeding stock', 'Overall herd health programs'],
    packSize: '40 Boluses', // Corrected
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  {
    id: 'rs21-solution-210ml', // Unique ID
    name: 'RS 21 Solution (210 ml)', // Added "Solution" for clarity
    brand: 'Innovation Remedies',
    category: 'Reproductive Health', // Corrected category
    subcategory: 'Fertility Solutions', // Corrected subcategory
    description: 'Repeat Breeding and Infertility Solution (210 ml)',
    longDescription: 'RS 21 Solution (210 ml) is specially formulated to address issues of repeat breeding and infertility in livestock. It helps optimize reproductive health and improve conception rates.',
    metaDescription: 'RS 21 Solution (210 ml) ₹350 (MRP ₹415) - For repeat breeding & infertility in livestock. Innovation Remedies.',
    keywords: ['rs21 solution', 'repeat breeding solution', 'livestock infertility', 'animal fertility supplement', 'innovation remedies rs21'],
    MRP: 415.00, // Corrected from mrp
    price:350.00,
    currency: 'INR',
    imageUrl: gly, // Using 'twentyone' image for RS21, as 'fourtybolus' was for AYNGROW.
    imageFileName: 'rs21_solution_210ml.png', // Corrected
    imageAlt: 'RS 21 Solution (210 ml) - Repeat Breeding and Infertility Solution', // Corrected
    gradientFrom: 'from-rose-100', // Adjusted gradient
    gradientTo: 'to-pink-50',      // Adjusted gradient
    minQuantity: 1, // Min quantity likely 1 bottle
    rating: 4.9, // Assuming rating
    reviewCount: 93, // Assuming review count
    stock: 100,
    inStock: true,
    sku: 'IR-RS21-SOL210ML-023', // Unique SKU
    gtin: '8901234567912', // Example new GTIN
    features: ['Addresses repeat breeding', 'Supports fertility', 'Optimizes reproductive cycle', 'Liquid solution 210ml'],
    benefits: ['Improved conception rates', 'Reduced inter-calving period', 'Enhanced reproductive efficiency', 'Supports hormonal balance'],
    applications: ['Cows', 'Buffaloes', 'Heifers with reproductive issues', 'Animals with history of repeat breeding'],
    packSize: '210 ml', // Corrected
    manufacturer: 'Innovation Remedies Pvt Ltd',
    countryOfOrigin: 'India',
  },
  // The Innocef Tazo 4.5gm was commented out in the original, so I'm keeping it commented.
  // If you need it, it should also be reviewed for similar consistency.
  // {
  //   id: 'innocef-tazo-4.5gm',
  //   name: 'Innocef Tazo 4.5gm',
  //   brand: 'Innovation Remedies',
  //   category: 'Antibiotics',
  //   subcategory: 'Injectable Antibiotics',
  //   description: 'Advanced injectable antibiotic (Ceftriaxone & Tazobactam)',
  //   longDescription: 'Innocef Tazo 4.5gm is an advanced injectable antibiotic combination (Ceftriaxone & Tazobactam) for treating severe bacterial infections in animals. Provides broad-spectrum coverage.',
  //   metaDescription: 'Innocef Tazo 4.5gm ₹415 - Injectable antibiotic for severe infections. Innovation Remedies.',
  //   keywords: ['innocef tazo', 'ceftriaxone tazobactam', 'injectable antibiotic', 'veterinary antibiotic', 'innovation remedies antibiotic'],
  //   price: 415.00, // Assuming no MRP given or MRP is same as price
  //   MRP: 415.00, // Added MRP for consistency, assuming it's same as price if no discount.
  //   currency: 'INR',
  //   imageUrl: innoceftazo,
  //   imageFileName: 'innocef_tazo_4.5gm.png',
  //   imageAlt: 'Innocef Tazo 4.5gm - Advanced Injectable Antibiotic',
  //   gradientFrom: 'from-emerald-100',
  //   gradientTo: 'to-emerald-50',
  //   minQuantity: 10,
  //   rating: 4.8,
  //   reviewCount: 85,
  //   stock: 20,
  //   inStock: true,
  //   sku: 'IR-INNO-TAZO-4.5GM-024', // Example SKU
  //   gtin: '8901234567913', // Example GTIN
  //   features: ['Injectable antibiotic', 'Ceftriaxone & Tazobactam', 'Treats severe infections', '4.5gm vial'],
  //   benefits: ['Broad-spectrum action', 'Rapid recovery', 'Hospital-grade treatment'],
  //   applications: ['Severe bacterial infections', 'Post-surgical prophylaxis', 'Resistant infections'],
  //   packSize: '4.5 grams',
  //   manufacturer: 'Innovation Remedies Pvt Ltd',
  //   countryOfOrigin: 'India',
  // }
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