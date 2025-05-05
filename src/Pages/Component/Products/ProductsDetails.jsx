import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  TicketPercent,
  AlertTriangle,
  Banknote,
  Loader2,
  UserCheck,
  LogIn,
  ChevronRight,
  CreditCard,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import R3 from "../../../assets/Images/R3.png";
import nine from "../../../assets/Images/nine.png";
import eight from "../../../assets/Images/eight.png";
import thirteen from "../../../assets/Images/thirteen.png";
import fourteen from "../../../assets/Images/fourteen.png";
import fifteen from "../../../assets/Images/fifteen.png";
import sixteen from "../../../assets/Images/sixteen.png";
import seventeen from "../../../assets/Images/seventeen.png";
import eighteen from "../../../assets/Images/eighteen.png";
import nineteen from "../../../assets/Images/nineteen.png";

const products = [
  {
    id: "668cf86512695a391340d1d5",
    slug: "r3-vet-ultra-bonus",
    name: "R3-Vet : Ultra Bonus (1 pcs)",
    description: "Limited fruity collection designed for optimal animal health and wellness.",
    longDescription: "R3-Vet Ultra Bonus is our premium formulation that combines essential nutrients and vitamins in a tasty fruity flavor that animals love. Supports immune system, coat health, and overall vitality.",
    price: 142.0,
    imageUrl: R3,
    rating: 4.7,
    reviewCount: 156,
    stock: 15,
    features: [
      "Premium quality ingredients",
      "Fruity flavor animals love",
      "Supports immune system",
      "Promotes healthy coat",
    ],
    color: "#FF6B6B",
  },
  {
    id: "668cf86512695a391340d1d6",
    slug: "mood-pills",
    name: "AYNGROW (1 pcs)",
    description: "Limited fruity collection for balanced mood and growth support.",
    longDescription: "AYNGROW is specifically formulated to promote healthy growth patterns while supporting balanced mood in animals. The fruity flavor ensures easy administration and acceptance.",
    price: 142.0,
    imageUrl: nine,
    rating: 4.5,
    reviewCount: 89,
    stock: 23,
    features: [
      "Growth support formula",
      "Mood balancing ingredients",
      "Fruity flavor for easy administration",
      "Veterinarian recommended",
    ],
    color: "#4ECDC4",
  },
  {
    id: "668cf86512695a391340d1d7",
    slug: "uti-dont-think-so",
    name: "Badda-H (1 pcs)",
    description: "Limited fruity collection targeting urinary tract health.",
    longDescription: "Badda-H provides comprehensive support for urinary tract health with its specialized formula. The fruity flavor makes it palatable and easy to administer.",
    price: 142.0,
    imageUrl: eight,
    rating: 4.8,
    reviewCount: 112,
    stock: 18,
    features: [
      "Urinary tract support",
      "pH balancing formula",
      "Easy administration",
      "Fast-acting relief",
    ],
    color: "#FF9F1C",
  },
  {
    id: "668cf86512695a391340d1d8",
    slug: "bye-bye-bloat",
    name: "CalfShakti Advanced (1 pcs)",
    description: "...",
    longDescription: "...",
    price: 412.0,
    imageUrl: thirteen,
    rating: 4.6,
    reviewCount: 78,
    stock: 12,
    features: ["...", "..."],
    color: "#6A0572",
  },
  {
    id: "668cf86512695a391340d1d9",
    slug: "good-girl-probiotic",
    name: "IRL Innoliv-DS (1 pcs)",
    description: "...",
    longDescription: "...",
    price: 412.0,
    imageUrl: fourteen,
    rating: 4.9,
    reviewCount: 135,
    stock: 9,
    features: ["...", "..."],
    color: "#1A535C",
  },
  {
    id: "668cf86512695a391340d1da",
    slug: "perfect-condition-vitamin",
    name: "IRL Innoworm-XL (1 pcs)",
    description: "...",
    longDescription: "...",
    price: 412.0,
    imageUrl: fifteen,
    rating: 4.7,
    reviewCount: 91,
    stock: 14,
    features: ["...", "..."],
    color: "#4CB944",
  },
  {
    id: "668cf86512695a391340d1db",
    slug: "weight-booster",
    name: "IRL Innoworm Suspension",
    description: "...",
    longDescription: "...",
    price: 314.95,
    imageUrl: sixteen,
    rating: 4.6,
    reviewCount: 68,
    stock: 20,
    features: ["...", "..."],
    color: "#F72585",
  },
  {
    id: "668cf86512695a391340d1dc",
    slug: "makkhi-soap",
    name: "IRL Makkhi Soap",
    description: "...",
    longDescription: "...",
    price: 719.95,
    imageUrl: seventeen,
    rating: 4.8,
    reviewCount: 105,
    stock: 25,
    features: ["...", "..."],
    color: "#3A86FF",
  },
  {
    id: "668cf86512695a391340d1dd",
    slug: "makkhi-liquid",
    name: "Makkhi Concentrated Liquid",
    description: "...",
    longDescription: "...",
    price: 719.95,
    imageUrl: eighteen,
    rating: 4.7,
    reviewCount: 87,
    stock: 18,
    features: ["...", "..."],
    color: "#8338EC",
  },
  {
    id: "668cf86512695a391340d1de",
    slug: "makkhi-injection",
    name: "Makkhi Injection",
    description: "...",
    longDescription: "...",
    price: 179.95,
    imageUrl: nineteen,
    rating: 4.9,
    reviewCount: 93,
    stock: 7,
    features: ["...", "..."],
    color: "#FB5607",
  },
];

// Create custom badge component with animation
const Badge = ({ children, color = "blue", icon }) => {
  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`text-xs px-2 py-1 rounded-full font-medium flex items-center whitespace-nowrap`}
      style={{ 
        backgroundColor: `${color}15`, 
        color: color,
      }}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </motion.span>
  );
};

// QuantitySelector component to improve reusability
const QuantitySelector = ({ quantity, onQuantityChange, stock, size = "default" }) => {
  const isSmall = size === "small";
  
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button
        onClick={() => onQuantityChange(-1)}
        disabled={quantity <= 1}
        className={`${
          isSmall ? "px-2 py-1" : "px-3 py-1.5"
        } text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className={`${
        isSmall ? "px-3 py-1" : "px-4 py-1.5"
      } border-x border-gray-300 font-medium ${
        isSmall ? "w-10" : "w-12"
      } text-center bg-white`}>
        {quantity}
      </span>
      <button
        onClick={() => onQuantityChange(1)}
        disabled={quantity >= stock || stock <= 0}
        className={`${
          isSmall ? "px-2 py-1" : "px-3 py-1.5"
        } text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

// Rating component
const ProductRating = ({ rating, reviewCount, showCount = true }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`transition-colors ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-500"
                : i < Math.round(rating)
                ? "fill-amber-200 text-amber-300" // Half star
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-amber-600 ml-2 font-medium">
        {rating.toFixed(1)}
      </span>
      {showCount && (
        <>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer">
            {reviewCount} reviews
          </span>
        </>
      )}
    </div>
  );
};

// FormField component for the checkout modal
const FormField = ({ label, id, type = "text", value, onChange, placeholder, required = true, error }) => {
  const Component = type === "textarea" ? Textarea : Input;
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Component
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${error ? "border-red-300 focus:ring-red-500" : ""}`}
        {...(type === "textarea" ? { rows: 3 } : { type })}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

function ProductDetailPage() {
  const { id: productIdOrSlug } = useParams();
  const navigate = useNavigate();
  const { user, api, isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    shippingName: user?.name || "",
    shippingMobile: user?.mobile || "",
    shippingAddress: "",
  });

  // Find the product based on ID or slug
  let product = products.find((p) => p.id === productIdOrSlug);
  if (!product) {
    product = products.find((p) => p.slug === productIdOrSlug);
  }

  // Handle form field changes
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: null
      }));
    }
  };

  // Reset modal state when it's closed
  useEffect(() => {
    if (!isModalOpen) {
      setCheckoutStep(1);
      setOrderError(null);
      setFormErrors({});
    }
  }, [isModalOpen]);

  // Not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8"
        >
          <AlertTriangle className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find a product matching "{productIdOrSlug}".
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/products")}
            className="w-full"
          >
            <ArrowLeft size={16} className="mr-2" /> Browse Products
          </Button>
        </motion.div>
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
    if (product.stock <= 0) return;
    
    toast.success("Added to Cart", {
      description: `${quantity} x ${product.name}`,
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      toast.error("Login Required", {
        description: "Please log in to proceed with the purchase.",
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }
    
    // Reset modal state
    setSelectedPaymentMethod("cod");
    setOrderError(null);
    setIsProcessingOrder(false);
    setCheckoutStep(1);
    setFormErrors({});
    
    // Pre-fill form data with user information
    setFormData({
      shippingName: user?.name || "",
      shippingMobile: user?.mobile || "",
      shippingAddress: "",
    });
    
    setIsModalOpen(true);
  };

  const validateShippingForm = () => {
    const errors = {};
    
    if (!formData.shippingName.trim()) {
      errors.shippingName = "Name is required";
    }
    
    if (!formData.shippingMobile.trim()) {
      errors.shippingMobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.shippingMobile.replace(/\s+/g, ''))) {
      errors.shippingMobile = "Please enter a valid 10-digit mobile number";
    }
    
    if (!formData.shippingAddress.trim()) {
      errors.shippingAddress = "Address is required";
    } else if (formData.shippingAddress.trim().length < 10) {
      errors.shippingAddress = "Please enter a complete address";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (checkoutStep === 1) {
      if (validateShippingForm()) {
        setCheckoutStep(2);
      }
    }
  };

  const handlePrevStep = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(prev => prev - 1);
    }
  };

  const handleConfirmPurchase = async () => {
    if (selectedPaymentMethod !== "cod") {
      setOrderError("Only Cash on Delivery is available at this time.");
      return;
    }

    setIsProcessingOrder(true);
    setOrderError(null);

    try {
      const response = await api.post("/orders", {
        shippingName: formData.shippingName,
        shippingMobile: formData.shippingMobile,
        shippingAddress: formData.shippingAddress,
        paymentMethod: selectedPaymentMethod,
        itemnName: product.name, // Changed from itemName to itemnName to match backend
        itemsQuantity: quantity, // Changed from itemQuantity to itemsQuantity to match backend
        totalAmount: product.price * quantity,
      });

      toast.success("Order Placed Successfully!", {
        description: `Your order #${response.data.data.orderId.slice(-6)} has been confirmed.`,
      });

      setIsModalOpen(false);
      navigate(`/order-confirmation/${response.data.data.orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      setOrderError(message);
      toast.error("Order Failed", {
        description: message,
      });
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const totalPurchasePrice = (product.price * quantity).toFixed(2);

  // Card shimmer animation
  const shimmerAnimation = {
    hidden: { backgroundPosition: "200% 0" },
    visible: { 
      backgroundPosition: "0% 0",
      transition: { 
        repeat: Infinity, 
        repeatType: "mirror", 
        duration: 1.5, 
        ease: "linear" 
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 font-sans bg-gray-50 min-h-screen">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center text-sm mb-6 text-gray-500">
        <button 
          onClick={() => navigate("/")} 
          className="hover:text-gray-700 transition-colors"
        >
          Home
        </button>
        <ChevronRight size={14} className="mx-2" />
        <button 
          onClick={() => navigate("/products")} 
          className="hover:text-gray-700 transition-colors"
        >
          Products
        </button>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-gray-900 font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-8 md:gap-12"
      >
        {/* Product Image Section */}
        <div className="w-full lg:w-2/5">
          <Card className="overflow-hidden border-none shadow-lg rounded-xl bg-white">
            <div
              className="p-6 text-center flex justify-center items-center min-h-[300px] md:min-h-[400px]"
              style={{ backgroundColor: `${product.color}15` }}
            >
              <motion.img
                src={product.imageUrl}
                alt={product.name}
                className="w-auto h-auto object-contain max-w-full max-h-80"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                draggable="false"
              />
            </div>
            <div className="p-4 bg-white flex flex-wrap justify-center items-center gap-2">
              {product.stock > 0 ? (
                <Badge color="#22c55e" icon={<CheckCircle size={12} />}>
                  In Stock
                </Badge>
              ) : (
                <Badge color="#ef4444" icon={<AlertTriangle size={12} />}>
                  Out of Stock
                </Badge>
              )}
              
              {product.stock < 10 && product.stock > 0 && (
                <Badge color="#f59e0b" icon={<AlertTriangle size={12} />}>
                  Low Stock ({product.stock})
                </Badge>
              )}
              
              {product.rating >= 4.8 && (
                <Badge color="#eab308" icon={<Star size={12} className="fill-current" />}>
                  Top Rated
                </Badge>
              )}
            </div>
          </Card>
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-3/5 flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center mt-3">
              <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
          </div>

          {/* Price & Purchase Section */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 line-through">
                  ₹{(product.price * 1.2).toFixed(2)}
                </span>
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-xs text-green-600 font-medium mt-1">
                  You save ₹{(product.price * 0.2).toFixed(2)} (20%)
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full h-10 w-10 hover:bg-pink-50 hover:text-pink-500 text-gray-400"
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-6 gap-3">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <QuantitySelector 
                quantity={quantity} 
                onQuantityChange={handleQuantityChange} 
                stock={product.stock} 
              />
              
              {product.stock > 0 ? (
                <span className="text-sm text-green-600">
                  {product.stock} available
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium">
                  Out of stock
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <Button
                variant="outline"
                size="lg"
                className="text-base flex items-center justify-center gap-2 h-12 shadow-sm hover:shadow"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>

              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    size="lg"
                    className="text-base text-white h-12 shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={product.stock > 0 ? { 
                      backgroundColor: product.color,
                      borderColor: product.color 
                    } : {}}
                    disabled={product.stock <= 0}
                    onClick={handleOpenModal}
                  >
                    {isAuthenticated ? <UserCheck size={18} /> : <LogIn size={18} />}
                    Buy Now
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-full max-w-[95vw] sm:max-w-[520px] p-0 bg-white rounded-xl overflow-y-auto max-h-[90vh] shadow-lg">
                  <DialogHeader className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                    <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <ShoppingCart size={20} className="text-gray-700" />
                      Checkout
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-600 mt-1">
                      {checkoutStep === 1 ? "Enter your shipping details" : "Review and confirm your order"}
                    </DialogDescription>
                  </DialogHeader>

                  {/* Checkout Steps */}
                  <div className="px-4 sm:px-6 pt-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm ${
                          checkoutStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}>
                          {checkoutStep > 1 ? <Check size={16} /> : "1"}
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-900">Shipping</p>
                        </div>
                      </div>
                      
                      <div className="grow mx-4 h-1 bg-gray-200 rounded">
                        <div 
                          className="h-full bg-blue-600 rounded transition-all duration-300"
                          style={{ width: checkoutStep >= 2 ? "100%" : "0%" }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm ${
                          checkoutStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}>
                          2
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-900">Payment</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {checkoutStep === 1 ? (
                      <motion.div
                        key="shipping"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 sm:px-6 space-y-4"
                      >
                        <FormField
                          label="Full Name"
                          id="shippingName"
                          value={formData.shippingName}
                          onChange={handleFormChange}
                          placeholder="Enter your full name"
                          error={formErrors.shippingName}
                        />
                        
                        <FormField
                          label="Mobile Number"
                          id="shippingMobile"
                          value={formData.shippingMobile}
                          onChange={handleFormChange}
                          placeholder="Enter your 10-digit mobile number"
                          error={formErrors.shippingMobile}
                        />
                        
                        <FormField
                          label="Shipping Address"
                          id="shippingAddress"
                          type="textarea"
                          value={formData.shippingAddress}
                          onChange={handleFormChange}
                          placeholder="Enter your complete address with pincode"
                          error={formErrors.shippingAddress}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 sm:px-6 space-y-4"
                      >
                        <div className="bg-gray-50 rounded-lg p-4 mb-4 shadow-sm">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Shipping Details:</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Name:</span> {formData.shippingName}</p>
                            <p><span className="font-medium">Mobile:</span> {formData.shippingMobile}</p>
                            <p className="break-words"><span className="font-medium">Address:</span> {formData.shippingAddress}</p>
                          </div>
                        </div>
                        
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Select Payment Method:
                        </h4>
                        
                        <div
                          onClick={() => setSelectedPaymentMethod("cod")}
                          className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors shadow-sm ${
                            selectedPaymentMethod === "cod"
                              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Banknote
                              size={20}
                              className={selectedPaymentMethod === "cod" ? "text-blue-600" : "text-gray-500"}
                            />
                            <div>
                              <span
                                className={`font-medium ${selectedPaymentMethod === "cod" ? "text-blue-700" : "text-gray-700"}`}
                              >
                                Cash on Delivery
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5">Pay when you receive your order</p>
                            </div>
                          </div>
                          {selectedPaymentMethod === "cod" && (
                            <CheckCircle size={18} className="text-blue-600" />
                          )}
                        </div>
                        
                        <div
                          className="flex items-center justify-between p-3 border rounded-md cursor-not-allowed opacity-60 border-gray-300 shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard size={20} className="text-gray-500" />
                            <div>
                              <span className="font-medium text-gray-500">
                                Online Payment
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5">Coming soon</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="py-4 space-y-4 border-t border-b my-4 mx-4 sm:mx-6 bg-gray-50 rounded-lg shadow-inner">
                    <div className="flex items-start space-x-4 p-3">
                      <motion.div
                        className="w-16 h-16 flex-shrink-0 rounded-md border p-1 flex items-center justify-center"
                        style={{ backgroundColor: `${product.color}15` }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Unit Price: ₹{product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500 mr-2">Qty:</span>
                          {checkoutStep === 1 ? (
                            <QuantitySelector 
                              quantity={quantity} 
                              onQuantityChange={handleQuantityChange} 
                              stock={product.stock}
                              size="small"
                            />
                          ) : (
                            <span className="text-sm font-medium">{quantity}</span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                        ₹{(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-base font-medium pt-2 px-3">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-gray-900 text-lg font-semibold">
                        ₹{totalPurchasePrice}
                      </span>
                    </div>
                  </div>

                  {orderError && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mx-4 sm:mx-6 p-3 bg-red-50 border border-red-100 rounded-md mb-4 shadow-sm"
                    >
                      <p className="text-sm text-red-600 flex items-start">
                        <AlertTriangle size={14} className="mr-1.5 mt-0.5 flex-shrink-0" /> 
                        <span>{orderError}</span>
                      </p>
                    </motion.div>
                  )}

                  <DialogFooter className="p-4 sm:p-6 pt-3 bg-gradient-to-t from-gray-50 to-gray-100 flex flex-col sm:flex-row sm:justify-between gap-3 sticky bottom-0 z-10">
                    {checkoutStep === 1 ? (
                      <>
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
                            disabled={isProcessingOrder}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="button"
                          variant="default"
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-shadow"
                          onClick={handleNextStep}
                        >
                          Continue to Payment
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
                          onClick={handlePrevStep}
                          disabled={isProcessingOrder}
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          variant="default"
                          className="w-full sm:w-auto text-white flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                          style={{ backgroundColor: product.color }}
                          onClick={handleConfirmPurchase}
                          disabled={isProcessingOrder}
                        >
                          {isProcessingOrder ? (
                            <>
                              <Loader2 size={18} className="animate-spin" /> Processing...
                            </>
                          ) : (
                            "Place Order"
                          )}
                        </Button>
                      </>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Product Benefits */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Truck size={22} className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over ₹500</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Package size={22} className="text-green-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Same Day Dispatch</h4>
                  <p className="text-xs text-gray-500">Orders before 2 PM</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Shield size={22} className="text-purple-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Secure Checkout</h4>
                  <p className="text-xs text-gray-500">100% satisfaction</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Description Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex px-1">
                  <button
                    className={`py-3 px-5 text-sm font-medium border-b-2 transition-colors duration-200 ease-in-out focus:outline-none ${
                      activeTab === "description"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Description
                  </button>
                  <button
                    className={`py-3 px-5 text-sm font-medium border-b-2 transition-colors duration-200 ease-in-out focus:outline-none ${
                      activeTab === "features"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("features")}
                  >
                    Features
                  </button>
                </div>
              </div>
              <CardContent className="p-6 min-h-[120px] prose prose-sm max-w-none">
                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                    </motion.div>
                  )}
                  {activeTab === "features" && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="space-y-2.5 pl-1 list-none">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={16} className="mr-2.5 mt-0.5 text-green-500 shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Product Information Section */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Product Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-800">
                <Info size={18} className="mr-2 text-blue-500" />
                Usage Instructions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                For optimal results, use as directed by your veterinarian. Store in a cool, dry place away from direct sunlight. Keep out of reach of children and animals. Consult your vet before use if the animal is pregnant, nursing, or on medication.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <h3 className="flex items-center text-lg font-semibold mb-3 text-gray-800">
                <AlertTriangle size={18} className="mr-2 text-amber-500" />
                Important Note
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This product is intended for animal use only. It is not for human consumption. Always follow the recommended dosage and consult with a veterinarian before introducing any new supplement to your animal's diet. Discontinue use and consult your veterinarian if any adverse reactions occur.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Special Offer Banner */}
      <motion.div 
        className="mt-12 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-none shadow-md overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between"
            variants={shimmerAnimation}
            initial="hidden"
            animate="visible"
            style={{
              backgroundSize: "200% 100%",
              backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6)",
            }}
          >
            <div className="text-white mb-4 sm:mb-0">
              <h3 className="text-xl font-bold flex items-center">
                <TicketPercent size={24} className="mr-2" />
                Special Offer
              </h3>
              <p className="mt-2">
                Free shipping on your first order! Use code: <span className="font-bold">FIRSTORDER</span>
              </p>
            </div>
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100 text-blue-700 border-0 font-medium shadow-sm hover:shadow"
              onClick={() => navigate("/products")}
            >
              Shop More
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}

export default ProductDetailPage;