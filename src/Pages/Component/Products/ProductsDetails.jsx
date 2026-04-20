import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  PackageMinus,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext"; // Assuming correct path

// IMPORT THE SHARED PRODUCT DATA from ListProducts.jsx
// Make sure ListProducts.jsx exports productsData: `export const productsData = [...]`
import { productsData } from './ListProducts'; // Or the correct relative path


const Badge = ({ children, color = "blue", icon }) => (
  <motion.span
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.2 }}
    className={`text-xs px-2 py-1 rounded-full font-medium flex items-center whitespace-nowrap`}
    style={{ backgroundColor: `${color}1A`, color: color }}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {children}
  </motion.span>
);

const QuantitySelector = ({ quantity, onQuantityChange, stock, minOrderQty = 1, size = "default" }) => {
  const isSmall = size === "small";
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button onClick={() => onQuantityChange(-1)} disabled={quantity <= minOrderQty || stock <= 0 || quantity <= 1} className={`${isSmall ? "px-2 py-1" : "px-3 py-1.5"} text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500`} aria-label="Decrease quantity">-</button>
      <span className={`${isSmall ? "px-3 py-1" : "px-4 py-1.5"} border-x border-gray-300 font-medium ${isSmall ? "w-10" : "w-12"} text-center bg-white`}>{quantity}</span>
      <button onClick={() => onQuantityChange(1)} disabled={quantity >= stock || stock <= 0} className={`${isSmall ? "px-2 py-1" : "px-3 py-1.5"} text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500`} aria-label="Increase quantity">+</button>
    </div>
  );
};

const ProductRating = ({ rating, reviewCount, showCount = true }) => {
  const validRating = typeof rating === 'number' ? rating : 0;
  const validReviewCount = typeof reviewCount === 'number' ? reviewCount : 0;

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (<Star key={i} size={16} className={`transition-colors ${i < Math.floor(validRating) ? "fill-amber-400 text-amber-500" : i < Math.round(validRating) ? "fill-amber-200 text-amber-300" : "text-gray-300"}`} />))}
      </div>
      <span className="text-amber-600 ml-2 font-medium">{validRating.toFixed(1)}</span>
      {showCount && validReviewCount > 0 && (<><span className="mx-2 text-gray-300">|</span><span className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer">{validReviewCount} reviews</span></>)}
      {showCount && validReviewCount === 0 && (<><span className="mx-2 text-gray-300">|</span><span className="text-gray-500 text-sm">No reviews yet</span></>)}
    </div>
  );
};

const FormField = ({ label, id, type = "text", value, onChange, placeholder, required = true, error }) => {
  const Component = type === "textarea" ? Textarea : Input;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700">{label} {required && <span className="text-red-500">*</span>}</Label>
      <Component id={id} value={value} onChange={onChange} placeholder={placeholder} className={`w-full ${error ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"}`} {...(type === "textarea" ? { rows: 3 } : { type })} />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

function ProductDetailPage() {
  const { id: productIdFromUrl } = useParams();
  const navigate = useNavigate();
  const { user, api, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ shippingName: "", shippingMobile: "", shippingAddress: "" });

  const domain = "https://www.innovationremedies.com";

  useEffect(() => {
    let foundProduct = productsData.find((p) => p.id === productIdFromUrl);
    setProduct(foundProduct);
  }, [productIdFromUrl]);

  useEffect(() => {
    if (product) {
      const moq = product.minQuantity || 1;
      const stock = product.stock !== undefined ? product.stock : 0;
      setQuantity(stock > 0 ? Math.max(1, moq) : 1);
      if (isAuthenticated && user) {
        setFormData({ shippingName: user.name || "", shippingMobile: user.mobile || "", shippingAddress: user.address || "" }); // Pre-fill address if available
      }
    }
  }, [product, isAuthenticated, user]);

  useEffect(() => {
    if (!isModalOpen) {
      setCheckoutStep(1); setOrderError(null); setFormErrors({});
    }
  }, [isModalOpen]);

  const getDisplayImageUrl = (p) => {
    if (!p) return '/default-product-image.png';
    const { imageUrl, imageFileName } = p;
    if (!imageUrl && !imageFileName) return '/default-product-image.png';
    if (typeof imageUrl === 'string') return imageUrl;
    if (typeof imageUrl === 'object' && imageUrl && imageUrl.src) return imageUrl.src;
    if (imageFileName) return `/assets/Images/${imageFileName.replace(/^\//, '')}`;
    return '/default-product-image.png';
  };

  const getResolvedSchemaImageUrl = (p) => {
    const siteDomain = domain;
    const defaultImage = `${siteDomain}/default-product-image.png`;
    if (!p) return defaultImage;
    const { imageUrl, imageFileName } = p;
    let imagePath;
    if (!imageUrl && !imageFileName) return defaultImage;
    if (typeof imageUrl === 'string') imagePath = imageUrl;
    else if (typeof imageUrl === 'object' && imageUrl && imageUrl.src) imagePath = imageUrl.src;
    else if (imageFileName) imagePath = `/assets/Images/${imageFileName.replace(/^\//, '')}`;
    else return defaultImage;
    if (imagePath.startsWith('http')) return imagePath;
    return `${siteDomain}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  };

  if (!product) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Product Not Found | Innovation Remedies</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
            <AlertTriangle className="mx-auto h-16 w-16 text-red-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">We couldn't find the product with ID: {productIdFromUrl}.</p>
            <Button variant="default" size="lg" onClick={() => navigate("/products")} className="w-full"><ArrowLeft size={16} className="mr-2" /> Browse Products</Button>
          </motion.div>
        </div>
      </HelmetProvider>
    );
  }

  const resolvedSchemaImageUrl = getResolvedSchemaImageUrl(product);
  const displayImageUrl = getDisplayImageUrl(product);

  const moq = product.minQuantity || 1;
  const currentStock = product.stock !== undefined ? product.stock : 0;
  const isOrderable = currentStock > 0 && currentStock >= moq;
  const stockLessThanMoqButPositive = currentStock > 0 && currentStock < moq;

  let productDisplayColor = '#4A90E2';
  if (product.gradientFrom) {
    const colorName = product.gradientFrom.split('-')[1];
    const tailwindColorMap = {
        blue: 'rgba(59, 130, 246, 1)', sky: 'rgba(14, 165, 233, 1)',
        purple: 'rgba(139, 92, 246, 1)', violet: 'rgba(124, 58, 237, 1)',
        amber: 'rgba(245, 158, 11, 1)', yellow: 'rgba(234, 179, 8, 1)',
        teal: 'rgba(20, 184, 166, 1)', cyan: 'rgba(6, 182, 212, 1)',
        indigo: 'rgba(99, 102, 241, 1)', red: 'rgba(239, 68, 68, 1)',
        pink: 'rgba(236, 72, 153, 1)', green: 'rgba(34, 197, 94, 1)',
        emerald: 'rgba(16, 185, 129, 1)', slate: 'rgba(100, 116, 139, 1)'
    };
    if (tailwindColorMap[colorName]) {
        productDisplayColor = tailwindColorMap[colorName];
    }
  }
  const imageBackgroundColor = product.gradientFrom ? `bg-${product.gradientFrom.split('-')[1]}-100` : 'bg-gray-100';


  const handleQuantityChange = (amount) => {
    let newQuantity = quantity + amount;
    if (newQuantity < moq) newQuantity = moq;
    if (newQuantity > currentStock) newQuantity = currentStock;
    if (currentStock === 0) newQuantity = 1;
    else if (newQuantity < 1 && currentStock > 0) newQuantity = 1;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!isOrderable || currentStock <= 0) return;
    toast.success("Added to Cart", { description: `${quantity} x ${product.name}`, action: { label: "View Cart", onClick: () => navigate("/cart") }});
  };

  const handleOpenModal = () => {
    if (!isAuthenticated) {
      toast.error("Login Required", { description: "Please log in to proceed.", action: { label: "Login", onClick: () => navigate("/login") }});
      return;
    }
    if (!isOrderable) {
      let desc = "This product is currently out of stock.";
      if (stockLessThanMoqButPositive) desc = `Available stock (${currentStock}) is less than MOQ (${moq}).`;
      else if (currentStock === 0) desc = `This product is out of stock.`;
      toast.error("Cannot Proceed", { description: desc });
      return;
    }
    setSelectedPaymentMethod("cod"); setOrderError(null); setIsProcessingOrder(false); setCheckoutStep(1); setFormErrors({});
    setFormData({ shippingName: user?.name || "", shippingMobile: user?.mobile || "", shippingAddress: user?.address || "" });
    setIsModalOpen(true);
  };

  const validateShippingForm = () => {
    const errors = {};
    if (!formData.shippingName.trim()) errors.shippingName = "Name is required";
    if (!formData.shippingMobile.trim()) errors.shippingMobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.shippingMobile.replace(/\s+/g, ''))) errors.shippingMobile = "Valid 10-digit mobile number required";
    if (!formData.shippingAddress.trim()) errors.shippingAddress = "Address is required";
    else if (formData.shippingAddress.trim().length < 10) errors.shippingAddress = "Complete address required (min 10 chars)";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => { if (checkoutStep === 1 && validateShippingForm()) setCheckoutStep(2); };
  const handlePrevStep = () => { if (checkoutStep > 1) setCheckoutStep(prev => prev - 1); };

  const handleConfirmPurchase = async () => {
    if (selectedPaymentMethod !== "cod") { setOrderError("Only Cash on Delivery is available."); return; }
    setIsProcessingOrder(true); setOrderError(null);
    try {
      if (!api || typeof api.post !== 'function') {
        throw new Error("API service is not configured correctly.");
      }
      const payload = {
        shippingName: formData.shippingName,
        shippingMobile: formData.shippingMobile,
        shippingAddress: formData.shippingAddress,
        paymentMethod: selectedPaymentMethod,
        itemnName: product.name, // CORRECTED: itemnName to match backend
        itemsQuantity: quantity,
        totalAmount: parseFloat((product.price * quantity).toFixed(2)), // Ensure totalAmount is a number
      };

      // Log the payload before sending
      console.log("Order Payload:", payload);

      const response = await api.post("/orders", payload);

      toast.success("Order Placed Successfully!", { description: `Order #${response.data.data.orderId.slice(-6)} confirmed.` });
      setIsModalOpen(false);
      navigate(`/order-confirmation/${response.data.data.orderId}`);
    } catch (error) {
      const message = error.response?.data?.message || error.message || "An unexpected error occurred while placing the order.";
      console.error("Order creation failed:", error.response?.data || error); // Log detailed error
      setOrderError(message); toast.error("Order Failed", { description: message });
    } finally { setIsProcessingOrder(false); }
  };

  const totalPurchasePrice = (product.price * quantity).toFixed(2);
  const shimmerAnimation = { hidden: { backgroundPosition: "200% 0" }, visible: { backgroundPosition: "0% 0", transition: { repeat: Infinity, repeatType: "mirror", duration: 1.5, ease: "linear" }}};

  const getPriceValidUntil = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split('T')[0];
  };
  const priceValidUntilString = getPriceValidUntil();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name.replace(/"/g, '\\"'),
    "description": product.description.replace(/"/g, '\\"'),
    "image": resolvedSchemaImageUrl,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Innovation Remedies"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price.toFixed(2),
      "availability": currentStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `${domain}/product/${product.id}`,
      "seller": {
        "@type": "Organization",
        "name": "Innovation Remedies"
      },
      "priceValidUntil": priceValidUntilString,
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "url": `${domain}/return-policy`,
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "50.00",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
          "transitTime": { "@type": "QuantitativeValue", "minValue": 3, "maxValue": 7, "unitCode": "DAY" }
        }
      }
    },
    ...(product.rating && typeof product.rating === 'number' && product.reviewCount && typeof product.reviewCount === 'number' && product.reviewCount > 0 && {
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.toFixed(1),
            "reviewCount": product.reviewCount
        }
    })
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${product.name} | Innovation Remedies`}</title>
        <meta name="description" content={`Buy ${product.name} - ${product.description}. High-quality veterinary solutions from Innovation Remedies.`} />
        <link rel="canonical" href={`${domain}/product/${product.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} | Innovation Remedies`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={resolvedSchemaImageUrl} />
        <meta property="og:url" content={`${domain}/product/${product.id}`} />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta property="product:price:amount" content={product.price.toFixed(2)} />
        <meta property="product:price:currency" content="INR" />
        <meta property="product:availability" content={currentStock > 0 ? "instock" : "oos"} />
        <meta property="product:brand" content="Innovation Remedies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Innovation Remedies`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={resolvedSchemaImageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(productJsonLd, null, 2)}
        </script>
      </Helmet>

      <div
        className="relative bg-white min-h-screen text-neutral-900"
        style={{
          fontFamily:
            "'Neue Montreal Regular', 'SF Pro Text Regular', system-ui, sans-serif",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-28 md:pt-32 pb-20">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] uppercase text-neutral-500 mb-10"
            style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.2em' }}
          >
            <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <ChevronRight size={12} className="opacity-50" />
            <Link to="/products" className="hover:text-neutral-900 transition-colors">Products</Link>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-neutral-900 truncate max-w-[40ch]">{product.name}</span>
          </nav>

          {/* Split hero */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* ============ Left: image panel (sticky on desktop) ============ */}
            <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] overflow-hidden aspect-square"
                style={{
                  background: `linear-gradient(145deg, ${productDisplayColor}26 0%, ${productDisplayColor}0a 60%, #ffffff 100%)`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 55%, ${productDisplayColor}33 0%, transparent 60%)`,
                  }}
                />
                <motion.img
                  key={displayImageUrl}
                  src={displayImageUrl}
                  alt={product.name}
                  className="absolute inset-0 w-[78%] h-[78%] m-auto object-contain drop-shadow-[0_32px_40px_rgba(0,0,0,0.15)]"
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, rotate: -1.5 }}
                  draggable="false"
                />
                {/* Top corner tags */}
                <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-10 gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase bg-white/90 backdrop-blur-sm border border-neutral-200 text-neutral-700"
                    style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.2em' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: productDisplayColor }}
                    />
                    {product.category || 'Veterinary'}
                  </span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {currentStock > 0 ? (
                      <Badge color="#059669" icon={<CheckCircle size={11} />}>In stock</Badge>
                    ) : (
                      <Badge color="#dc2626" icon={<AlertTriangle size={11} />}>Out</Badge>
                    )}
                    {product.rating >= 4.8 && (
                      <Badge color="#d97706" icon={<Star size={11} className="fill-current" />}>Top rated</Badge>
                    )}
                  </div>
                </div>
                {/* Bottom corner index */}
                <span
                  className="absolute bottom-5 right-5 text-[10px] uppercase text-neutral-500"
                  style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.2em' }}
                >
                  SKU · {product.sku || product.id}
                </span>
              </motion.div>
            </div>

            {/* ============ Right: details ============ */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                <p
                  className="text-[11px] uppercase mb-4"
                  style={{
                    color: productDisplayColor,
                    fontFamily: "'SF Pro Text Regular', ui-monospace, monospace",
                    letterSpacing: '0.2em',
                  }}
                >
                  — {product.brand || 'Innovation Remedies'}
                </p>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.02] text-neutral-900"
                  style={{
                    fontFamily:
                      "'Neue Montreal Regular', 'SF Pro Text Semibold', 'Inter', system-ui, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {product.name}
                </h1>
                <p className="mt-5 text-neutral-600 leading-relaxed text-base md:text-lg max-w-2xl">
                  {product.longDescription || product.description}
                </p>

                {/* Rating */}
                <div className="mt-6">
                  <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
                </div>
              </motion.div>

              {/* Price block */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="mt-10 pb-8 border-b border-neutral-200"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-5xl md:text-6xl tabular-nums tracking-[-0.03em] text-neutral-900"
                    style={{
                      fontFamily:
                        "'Neue Montreal Regular', system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    ₹{product.price.toFixed(0)}
                  </span>
                  <span className="text-neutral-400 text-lg line-through tabular-nums">
                    ₹{(product.price * 1.2).toFixed(0)}
                  </span>
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] tabular-nums bg-emerald-600 text-white"
                    style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.15em' }}
                  >
                    SAVE 20%
                  </span>
                </div>
                <div
                  className="mt-3 text-[11px] uppercase text-neutral-500"
                  style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.2em' }}
                >
                  Incl. of all taxes · Min order {moq}
                </div>
              </motion.div>

              {/* Quantity + actions */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="mt-8"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] uppercase text-neutral-500"
                      style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.2em' }}
                    >
                      Quantity
                    </span>
                    <QuantitySelector quantity={quantity} onQuantityChange={handleQuantityChange} stock={currentStock} minOrderQty={moq} />
                  </div>
                  {currentStock > 0 ? (
                    <span className="text-xs text-emerald-700 tabular-nums">
                      {currentStock} available
                    </span>
                  ) : (
                    <span className="text-xs text-red-600 tabular-nums">
                      Out of stock
                    </span>
                  )}
                </div>

                {stockLessThanMoqButPositive && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>Available stock ({currentStock}) is below MOQ ({moq}). Cannot order.</span>
                  </motion.div>
                )}
                {currentStock === 0 && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-2">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>This product is currently out of stock.</span>
                  </motion.div>
                )}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!isOrderable || currentStock <= 0}
                    className="group inline-flex items-center justify-between gap-3 px-6 py-4 rounded-full border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 active:scale-[0.98]"
                    style={{
                      fontFamily:
                        "'Neue Montreal Regular', system-ui, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <ShoppingCart size={16} />
                      Add to cart
                    </span>
                    <Heart size={15} className="opacity-60" />
                  </button>

                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <button
                      disabled={!isOrderable || currentStock <= 0}
                      onClick={handleOpenModal}
                      className="group inline-flex items-center justify-between gap-3 px-6 py-4 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 active:scale-[0.98]"
                      style={{
                        backgroundColor: productDisplayColor,
                        fontFamily:
                          "'Neue Montreal Regular', system-ui, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      <span className="flex items-center gap-2 text-sm">
                        {isAuthenticated ? <UserCheck size={16} /> : <LogIn size={16} />}
                        Buy now
                      </span>
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center overflow-hidden relative">
                        <ChevronRight size={14} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3" />
                      </span>
                    </button>
                    <DialogContent className="w-full max-w-[95vw] sm:max-w-[520px] p-0 bg-white rounded-2xl overflow-y-auto max-h-[90vh] shadow-xl">
                      <DialogHeader className="p-5 sm:p-6 border-b border-neutral-200 sticky top-0 z-10 bg-white">
                        <DialogTitle className="text-xl tracking-[-0.02em] text-neutral-900 flex items-center gap-2"
                          style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}
                        >
                          <ShoppingCart size={18} /> Checkout
                        </DialogTitle>
                        <DialogDescription className="text-sm text-neutral-600 mt-1">
                          {checkoutStep === 1 ? 'Enter shipping details' : 'Review and confirm order'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="px-5 sm:px-6 pt-4">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm ${checkoutStep >= 1 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'}`}>{checkoutStep > 1 ? <Check size={16} /> : '1'}</div>
                            <div className="ml-2"><p className="text-sm font-medium text-neutral-900">Shipping</p></div>
                          </div>
                          <div className="grow mx-4 h-px bg-neutral-200">
                            <div className="h-full bg-neutral-900 transition-all duration-500" style={{ width: checkoutStep >= 2 ? '100%' : '0%' }} />
                          </div>
                          <div className="flex items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-medium text-sm ${checkoutStep >= 2 ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'}`}>2</div>
                            <div className="ml-2"><p className="text-sm font-medium text-neutral-900">Payment</p></div>
                          </div>
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        {checkoutStep === 1 ? (
                          <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="px-5 sm:px-6 space-y-4">
                            <FormField label="Full Name" id="shippingName" value={formData.shippingName} onChange={(e) => setFormData({...formData, shippingName: e.target.value})} placeholder="Enter your full name" error={formErrors.shippingName} />
                            <FormField label="Mobile Number" id="shippingMobile" value={formData.shippingMobile} onChange={(e) => setFormData({...formData, shippingMobile: e.target.value})} placeholder="10-digit mobile number" error={formErrors.shippingMobile} />
                            <FormField label="Shipping Address" id="shippingAddress" type="textarea" value={formData.shippingAddress} onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})} placeholder="Complete address with pincode" error={formErrors.shippingAddress} />
                          </motion.div>
                        ) : (
                          <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }} className="px-5 sm:px-6 space-y-4">
                            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                              <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-3">Shipping to</h4>
                              <div className="text-sm text-neutral-700 space-y-1">
                                <p className="font-medium text-neutral-900">{formData.shippingName}</p>
                                <p>{formData.shippingMobile}</p>
                                <p className="break-words">{formData.shippingAddress}</p>
                              </div>
                            </div>
                            <h4 className="text-xs uppercase tracking-wider text-neutral-500 mb-2 mt-4">Payment method</h4>
                            <button onClick={() => setSelectedPaymentMethod('cod')} className={`flex items-center justify-between w-full p-4 border rounded-xl cursor-pointer transition-colors ${selectedPaymentMethod === 'cod' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-400'}`}>
                              <div className="flex items-center gap-3">
                                <Banknote size={18} className={selectedPaymentMethod === 'cod' ? 'text-neutral-900' : 'text-neutral-500'} />
                                <div className="text-left">
                                  <div className="font-medium text-sm text-neutral-900">Cash on Delivery</div>
                                  <div className="text-xs text-neutral-500 mt-0.5">Pay upon receiving the order</div>
                                </div>
                              </div>
                              {selectedPaymentMethod === 'cod' && <CheckCircle size={18} className="text-neutral-900" />}
                            </button>
                            <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl cursor-not-allowed opacity-50">
                              <div className="flex items-center gap-3">
                                <CreditCard size={18} className="text-neutral-500" />
                                <div>
                                  <div className="font-medium text-sm text-neutral-600">Online Payment</div>
                                  <div className="text-xs text-neutral-500 mt-0.5">Coming soon</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="mt-4 mx-5 sm:mx-6 py-4 px-4 rounded-xl bg-neutral-50 border border-neutral-200">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-14 h-14 flex-shrink-0 rounded-lg p-1 flex items-center justify-center"
                            style={{ backgroundColor: `${productDisplayColor}20` }}
                          >
                            <img src={displayImageUrl} alt={product.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">{product.name}</p>
                            <p className="text-xs text-neutral-500 mt-0.5">Unit ₹{product.price.toFixed(2)}</p>
                            <div className="flex items-center mt-2 gap-2">
                              <span className="text-[10px] uppercase text-neutral-500">Qty</span>
                              {checkoutStep === 1 ? (
                                <QuantitySelector quantity={quantity} onQuantityChange={handleQuantityChange} stock={currentStock} minOrderQty={moq} size="small" />
                              ) : (
                                <span className="text-sm font-medium tabular-nums">{quantity}</span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-neutral-900 tabular-nums whitespace-nowrap">
                            ₹{(product.price * quantity).toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                          <span className="text-xs uppercase text-neutral-500 tracking-wider">Total</span>
                          <span className="text-xl tabular-nums text-neutral-900" style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}>₹{totalPurchasePrice}</span>
                        </div>
                      </div>
                      {orderError && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-5 sm:mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-sm text-red-700 flex items-start gap-2">
                            <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                            <span>{orderError}</span>
                          </p>
                        </motion.div>
                      )}
                      <DialogFooter className="p-5 sm:p-6 pt-4 flex flex-col sm:flex-row sm:justify-between gap-3 sticky bottom-0 bg-white border-t border-neutral-200">
                        {checkoutStep === 1 ? (
                          <>
                            <DialogClose asChild>
                              <Button type="button" variant="outline" className="w-full sm:w-auto rounded-full" disabled={isProcessingOrder}>Cancel</Button>
                            </DialogClose>
                            <Button type="button" className="w-full sm:w-auto rounded-full bg-neutral-900 hover:bg-neutral-800 text-white" onClick={handleNextStep}>Continue to payment</Button>
                          </>
                        ) : (
                          <>
                            <Button type="button" variant="outline" className="w-full sm:w-auto rounded-full" onClick={handlePrevStep} disabled={isProcessingOrder}>Back</Button>
                            <Button type="button" className="w-full sm:w-auto rounded-full text-white flex items-center justify-center gap-2" style={{ backgroundColor: productDisplayColor }} onClick={handleConfirmPurchase} disabled={isProcessingOrder}>
                              {isProcessingOrder ? (<><Loader2 size={16} className="animate-spin" /> Processing…</>) : 'Place order'}
                            </Button>
                          </>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {[
                  { Icon: Truck, title: 'Free shipping', body: 'On orders over ₹500' },
                  { Icon: Package, title: 'Same-day dispatch', body: 'Ordered before 2 PM' },
                  { Icon: Shield, title: 'Secure checkout', body: '100% satisfaction' },
                ].map(({ Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <Icon size={18} className="text-neutral-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-neutral-900" style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}>{title}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">{body}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Features quick list */}
              {product.features?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10"
                >
                  <p
                    className="text-[11px] uppercase text-neutral-500 mb-5"
                    style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.2em' }}
                  >
                    — What's inside
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: productDisplayColor }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {/* Tabs — Description / Features / Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-24 md:mt-32 border-t border-neutral-200 pt-16"
          >
            <div className="flex items-center gap-1 border-b border-neutral-200 mb-8">
              {['description', 'features'].map((t) => {
                const isActive = activeTab === t;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className="relative px-4 py-3 text-sm text-neutral-900 capitalize transition-colors"
                    style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}
                  >
                    <span className={isActive ? 'text-neutral-900' : 'text-neutral-400'}>{t}</span>
                    {isActive && (
                      <motion.span
                        layoutId="tabUnderline"
                        className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-neutral-900"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.p
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-3xl"
                >
                  {product.longDescription || product.description}
                </motion.p>
              )}
              {activeTab === 'features' && (
                <motion.ul
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:grid-cols-2 gap-5 max-w-3xl"
                >
                  {product.features?.length > 0 ? product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-neutral-700">
                      <CheckCircle size={18} className="mt-0.5 shrink-0" style={{ color: productDisplayColor }} />
                      {f}
                    </li>
                  )) : <li>No specific features listed.</li>}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Usage + note cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-20 md:mt-24 grid md:grid-cols-2 gap-5"
          >
            <div className="p-8 rounded-[1.5rem] bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Info size={18} />
                </span>
                <h3 className="text-xl tracking-[-0.02em] text-neutral-900" style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}>Usage instructions</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                For optimal results, use as directed by your veterinarian. Store
                in a cool, dry place away from direct sunlight. Keep out of
                reach of children and animals. Consult your vet before use if
                the animal is pregnant, nursing, or on medication.
              </p>
            </div>
            <div className="p-8 rounded-[1.5rem] bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center">
                  <AlertTriangle size={18} />
                </span>
                <h3 className="text-xl tracking-[-0.02em] text-neutral-900" style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}>Important note</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Intended for animal use only. Not for human consumption. Follow
                recommended dosage and consult a veterinarian before introducing
                new supplements. Discontinue use if adverse reactions occur.
              </p>
            </div>
          </motion.div>

          {/* Offer band */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 md:mt-20 relative rounded-[2rem] overflow-hidden bg-[#05070f] text-white"
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, #05070f 0%, #080d20 45%, #050814 100%)' }}
            />
            <div
              aria-hidden
              className="absolute -right-20 -top-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-60"
              style={{ background: `radial-gradient(circle, ${productDisplayColor}66 0%, transparent 60%)` }}
            />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8 md:p-12">
              <div>
                <p className="text-[11px] uppercase text-emerald-300/90 mb-3" style={{ fontFamily: "'SF Pro Text Regular', ui-monospace, monospace", letterSpacing: '0.2em' }}>— Offer</p>
                <h3 className="text-2xl md:text-3xl tracking-[-0.02em]" style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}>
                  <TicketPercent size={22} className="inline mr-2 -mt-1" />
                  Free shipping on your first order
                </h3>
                <p className="mt-2 text-white/65 text-sm max-w-md">
                  Applies automatically at checkout for all first-time buyers.
                </p>
              </div>
              <button
                onClick={() => navigate('/products')}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black hover:bg-emerald-300 transition-colors active:scale-[0.98]"
                style={{ fontFamily: "'Neue Montreal Regular', system-ui, sans-serif", fontWeight: 600 }}
              >
                <span className="text-sm">Explore more</span>
                <ChevronRight size={15} className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ProductDetailPage;