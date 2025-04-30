import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Heart, 
  CheckCircle, 
  Truck, 
  Package, 
  Shield, 
  Star, 
  Info, 
  ArrowLeft,
  TicketPercent
} from 'lucide-react';
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

// Product data with additional details for the enhanced view
const products = [
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
  },
];

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Find the product by id
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-red-500">Product not found. ID: {id}</p>
        <Button variant="outline" onClick={() => navigate('/products')} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // Here you would add to cart logic
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} of ${product.name}`);
    // Here you would implement direct checkout logic
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans bg-gray-50">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/products')} 
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-8"
      >
        {/* Product Image Section */}
        <div className="w-full lg:w-2/5">
          <Card className="overflow-hidden border-none shadow-lg rounded-xl">
            <div 
              className="p-6 text-center" 
              style={{ backgroundColor: `${product.color}15` }}
            >
              <motion.img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-contain mx-auto max-h-80"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              />
            </div>
            <div className="p-4 bg-white flex justify-center space-x-2">
              {/* Product badges */}
              {product.stock < 10 && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                  Low Stock
                </span>
              )}
              {product.rating >= 4.8 && (
                <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded-full font-medium">
                  Top Rated
                </span>
              )}
              <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full font-medium">
                In Stock
              </span>
            </div>
          </Card>
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-3/5 flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="text-amber-500 ml-1 font-medium">{product.rating}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-gray-500 text-sm">{product.reviewCount} reviews</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                <span className="ml-2 text-sm line-through text-gray-400">₹{(product.price * 1.2).toFixed(2)}</span>
              </div>
              <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <TicketPercent size={14} className="mr-1" />
                20% OFF
              </div>
            </div>
            
            <div className="flex items-center mt-6 space-x-3">
              <span className="text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">{product.stock} available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Button
                variant="outline"
                size="lg"
                className="text-base border-gray-300 hover:bg-gray-100 text-gray-800"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="default"
                size="lg"
                className="text-base bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleBuyNow}
                style={{ backgroundColor: product.color }}
              >
                Buy Now
              </Button>
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center">
                <Truck size={20} className="mr-3 text-blue-500" />
                <div>
                  <h4 className="font-medium text-sm">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over ₹500</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center">
                <Package size={20} className="mr-3 text-green-500" />
                <div>
                  <h4 className="font-medium text-sm">Same Day Dispatch</h4>
                  <p className="text-xs text-gray-500">For orders before 2pm</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm">
              <CardContent className="p-4 flex items-center">
                <Shield size={20} className="mr-3 text-purple-500" />
                <div>
                  <h4 className="font-medium text-sm">30-Day Returns</h4>
                  <p className="text-xs text-gray-500">Satisfaction guaranteed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Tabs */}
          <Card className="border-none shadow-sm mt-4">
            <div className="border-b border-gray-200">
              <div className="flex space-x-2 px-4">
                <button
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'description' 
                      ? `border-${product.color} text-gray-900` 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={activeTab === 'description' ? { borderColor: product.color } : {}}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'features' 
                      ? `border-${product.color} text-gray-900` 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  style={activeTab === 'features' ? { borderColor: product.color } : {}}
                  onClick={() => setActiveTab('features')}
                >
                  Features
                </button>
              </div>
            </div>
            <CardContent className="p-4">
              {activeTab === 'description' && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.longDescription}
                </p>
              )}
              {activeTab === 'features' && (
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle size={16} className="mr-2 mt-0.5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Additional Product Information */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Product Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-800">
                <Info size={18} className="mr-2" style={{ color: product.color }} />
                Usage Instructions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                For optimal results, use as directed by your veterinarian. Store in a cool, 
                dry place away from direct sunlight. Keep out of reach of children and animals.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-800">
                <Info size={18} className="mr-2" style={{ color: product.color }} />
                Product Benefits
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This product is formulated to provide comprehensive health support. Regular use 
                as directed can lead to improved wellbeing and optimal health outcomes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Products Would Go Here */}
    </div>
  );
}

export default ProductDetailPage;