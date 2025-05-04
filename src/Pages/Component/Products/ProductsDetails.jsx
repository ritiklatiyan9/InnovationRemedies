import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Banknote, // Icon for COD
  Loader2, // Icon for loading state
  UserCheck, // Icon for logged in status
  LogIn, // Icon for login prompt
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
  const [shippingName, setShippingName] = useState(user?.name || "");
  const [shippingMobile, setShippingMobile] = useState(user?.mobile || "");
  const [shippingAddress, setShippingAddress] = useState("");

  let product = products.find((p) => p.id === productIdOrSlug);
  if (!product) {
    product = products.find((p) => p.slug === productIdOrSlug);
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-400" />
        <h2 className="mt-2 text-lg font-medium text-gray-900">
          Product Not Found
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Could not find a product with ID/Slug: {productIdOrSlug}.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/products")}
          className="mt-6"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Products
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
    toast.success("Added to Cart", {
      description: `${quantity} x ${product.name}`,
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
    setSelectedPaymentMethod("cod");
    setOrderError(null);
    setIsProcessingOrder(false);
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (selectedPaymentMethod !== "cod") {
      setOrderError("Please select Cash on Delivery.");
      toast.warning("Please select Cash on Delivery.");
      return;
    }

    if (!shippingName || !shippingMobile || !shippingAddress) {
      setOrderError("Please fill in all shipping details.");
      toast.warning("Please fill in all shipping details.");
      return;
    }

    setIsProcessingOrder(true);
    setOrderError(null);

    try {
      const response = await api.post("/orders", {
        shippingName,
        shippingMobile,
        shippingAddress,
        paymentMethod: selectedPaymentMethod,
        itemnName: product.name,
        itemsQuantity: quantity,
        totalAmount: product.price * quantity,
      });

      console.log("Order placed successfully:", response.data.data);
      toast.success("Order Placed!", {
        description: `Your order #${response.data.data.orderId.slice(-6)} is confirmed.`,
      });

      navigate(`/order-confirmation/${response.data.data.orderId}`);
      setIsModalOpen(false);
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans bg-gray-50 min-h-screen">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/products")}
        className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Products
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-8 md:gap-12"
      >
        <div className="w-full lg:w-2/5">
          <Card className="overflow-hidden border-none shadow-lg rounded-xl bg-white">
            <div
              className="p-6 text-center flex justify-center items-center min-h-[300px]"
              style={{ backgroundColor: `${product.color}1A` }}
            >
              <motion.img
                src={product.imageUrl}
                alt={product.name}
                className="w-auto h-auto object-contain max-w-full max-h-80"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              />
            </div>
            <div className="p-4 bg-white flex justify-center items-center flex-wrap gap-2">
              {product.stock > 0 ? (
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium flex items-center">
                  <CheckCircle size={12} className="mr-1" /> In Stock
                </span>
              ) : (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium flex items-center">
                  <AlertTriangle size={12} className="mr-1" /> Out of Stock
                </span>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium flex items-center">
                  <AlertTriangle size={12} className="mr-1" /> Low Stock ({product.stock})
                </span>
              )}
              {product.rating >= 4.8 && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium flex items-center">
                  <Star size={12} className="mr-1 fill-current" /> Top Rated
                </span>
              )}
            </div>
          </Card>
        </div>

        <div className="w-full lg:w-3/5 flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {product.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`transition-colors ${
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-amber-600 ml-2 font-medium">
                {product.rating.toFixed(1)}
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer">
                {product.reviewCount} reviews
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center mt-6 space-x-3">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1.5 border-x border-gray-300 font-medium w-12 text-center bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock || product.stock <= 0}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
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
                className="text-base flex items-center justify-center gap-2"
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
                    className="text-base text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={product.stock > 0 ? { backgroundColor: product.color } : {}}
                    disabled={product.stock <= 0}
                    onClick={handleOpenModal}
                  >
                    {isAuthenticated ? <UserCheck size={18} /> : <LogIn size={18} />}
                    Buy Now
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[480px] bg-white rounded-lg shadow-xl p-6">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900">
                      Confirm Purchase
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 pt-1">
                      Please provide shipping details and confirm your order.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Shipping Name
                      </label>
                      <input
                        type="text"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Shipping Mobile
                      </label>
                      <input
                        type="text"
                        value={shippingMobile}
                        onChange={(e) => setShippingMobile(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Shipping Address
                      </label>
                      <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows="3"
                        placeholder="Enter your full address"
                      />
                    </div>
                  </div>

                  <div className="py-4 space-y-4 border-t border-b my-4">
                    <div className="flex items-start space-x-4 p-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded-md border p-1 flex-shrink-0 bg-gray-50"
                        style={{ backgroundColor: `${product.color}1A` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Unit Price: ₹{product.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {quantity}
                        </p>
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

                  <div className="space-y-3 mb-4 px-1">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Select Payment Method:
                    </h4>
                    <div
                      onClick={() => setSelectedPaymentMethod("cod")}
                      className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-all duration-150 ${
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
                        <span
                          className={`font-medium ${selectedPaymentMethod === "cod" ? "text-blue-700" : "text-gray-700"}`}
                        >
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      {selectedPaymentMethod === "cod" && (
                        <CheckCircle size={18} className="text-blue-600" />
                      )}
                    </div>
                  </div>

                  {orderError && (
                    <p className="text-sm text-red-600 text-center mb-3 px-1">
                      <AlertTriangle size={14} className="inline mr-1 mb-0.5" /> {orderError}
                    </p>
                  )}

                  <DialogFooter className="sm:justify-between gap-2 mt-4">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        disabled={isProcessingOrder}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="button"
                      variant="default"
                      className="w-full sm:w-auto text-white flex items-center justify-center gap-2"
                      style={{ backgroundColor: product.color }}
                      onClick={handleConfirmPurchase}
                      disabled={isProcessingOrder}
                    >
                      {isProcessingOrder ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Processing...
                        </>
                      ) : (
                        "Confirm Purchase"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Truck size={24} className="text-blue-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over ₹500</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Package size={24} className="text-green-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Fast Dispatch</h4>
                  <p className="text-xs text-gray-500">Orders before 2 PM</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <Shield size={24} className="text-purple-500 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-gray-800">Secure Checkout</h4>
                  <p className="text-xs text-gray-500">Satisfaction guaranteed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-sm mt-1 bg-white">
            <div className="border-b border-gray-200">
              <div className="flex space-x-1 px-4">
                <button
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ease-in-out focus:outline-none ${
                    activeTab === "description"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ease-in-out focus:outline-none ${
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
              {activeTab === "description" && <p>{product.longDescription}</p>}
              {activeTab === "features" && (
                <ul className="space-y-2.5 pl-1 list-none">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={16} className="mr-2.5 mt-0.5 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="mt-12">
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
      </div>

      <div className="mt-12 mb-6">
        <Card className="border-none shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-white mb-4 sm:mb-0">
              <h3 className="text-xl font-bold flex items-center">
                <TicketPercent size={24} className="mr-2" />
                Special Offer
              </h3>
              <p className="mt-2">
                Free shipping on your first order! Use code: FIRSTORDER
              </p>
            </div>
            <Button
              variant="default"
              className="bg-white hover:bg-gray-100 text-blue-700 shadow-md"
            >
              Shop More
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetailPage;