import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import {
  Loader2,
  AlertTriangle,
  Package,
  ArrowLeft,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Calendar,
  CreditCard,
  MapPin,
  User,
  Phone,
  ReceiptText,
  Home,
  Info,
} from 'lucide-react';

// --- Order Tracker Component (from your MyOrdersPage) ---
const OrderTracker = React.memo(({ status }) => {
  const allStatuses = ['pending', 'processing', 'shipped', 'delivered'];
  const currentIndex = allStatuses.indexOf(status);

  return (
    <div className="w-full my-4">
      <div className="flex items-center justify-between">
        {allStatuses.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
                    isActive
                      ? 'bg-green-500 ring-4 ring-green-200 animate-pulse'
                      : isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                >
                  {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                  {isActive && <Clock className="w-4 h-4 text-white" />}
                </div>
                <span className={`mt-2 text-xs capitalize font-medium ${
                  isActive ? 'text-green-600' :
                  isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
              {index < allStatuses.length - 1 && (
                <div className="flex-1 mx-2 h-1 relative">
                  <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
                  {isCompleted && (
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500 rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  )}
                  {isActive && (
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500 rounded-l-full"
                      style={{ width: '50%' }}
                    ></div>
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
});

// Memoized InfoBlock Component
const InfoBlock = React.memo(({ icon, title, children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    <div className="flex items-center mb-4">
      {React.cloneElement(icon, { className: "w-7 h-7 text-blue-600 mr-3 flex-shrink-0" })}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="text-gray-700 space-y-2 text-sm leading-relaxed">
      {children}
    </div>
  </div>
));

// Memoized ItemDetailCard Component
const ItemDetailCard = React.memo(({ itemName, quantity, totalAmountForItem, imageUrl, formatCurrency }) => {
  const unitPrice = (quantity > 0 && totalAmountForItem) ? totalAmountForItem / quantity : 0;
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={itemName} className="w-full h-full object-cover" />
        ) : (
          <Package className="w-12 h-12 text-blue-400" />
        )}
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-semibold text-gray-900 text-md sm:text-lg leading-tight truncate" title={itemName}>
          {itemName || "Item Name Not Available"}
        </h4>
        <p className="text-sm text-gray-500 mt-1">Quantity: {quantity || 0}</p>
        {unitPrice > 0 && (
           <p className="text-sm text-gray-500 mt-0.5 sm:hidden">
              {formatCurrency(unitPrice)} each
           </p>
        )}
      </div>
      <div className="text-left sm:text-right flex-shrink-0 ml-0 sm:ml-4 mt-2 sm:mt-0">
        <p className="text-md sm:text-lg font-bold text-gray-900">{formatCurrency(totalAmountForItem)}</p>
        {unitPrice > 0 && (
          <p className="text-xs text-gray-500 hidden sm:block">
            ({formatCurrency(unitPrice)} each)
          </p>
        )}
      </div>
    </div>
  );
});

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { api, user, token, refreshToken } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  
  // Create a ref to track mounted state
  const isMounted = useRef(true);
  
  // Used to prevent duplicate API calls
  const fetchInProgress = useRef(false);
  
  // Track authorization retries
  const authRetries = useRef(0);
  const MAX_AUTH_RETRIES = 2;

  const isAdmin = useMemo(() => user?.role === 'Admin', [user]);

  const getOrdersPath = useCallback(() => {
    return isAdmin ? '/admin/orders' : '/orders';
  }, [isAdmin]);

  const formatCurrency = useCallback((amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  }, []);

  const getStatusSemanticColor = useCallback((status) => {
    switch(status) {
      case 'delivered': return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300', iconFill: 'fill-green-500' };
      case 'shipped': return { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-300', iconFill: 'fill-blue-500' };
      case 'processing': return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-300', iconFill: 'fill-amber-500' };
      case 'pending': return { text: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-300', iconFill: 'fill-gray-500' };
      case 'cancelled': return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300', iconFill: 'fill-red-500' };
      default: return { text: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-300', iconFill: 'fill-gray-500' };
    }
  }, []);

  // Memoize the fetch function
  const fetchOrderDetails = useCallback(async (skipAuthCheck = false) => {
    // If no orderId or component unmounted, don't proceed
    if (!orderId || !isMounted.current) return;
    
    // Prevent duplicate fetch calls
    if (fetchInProgress.current) return;
    fetchInProgress.current = true;
    
    // Check for auth retry limit
    if (!skipAuthCheck && authRetries.current >= MAX_AUTH_RETRIES) {
      console.error("Max auth retries reached, aborting");
      setError("Authentication error. Please try logging in again.");
      setLoading(false);
      fetchInProgress.current = false;
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Explicitly set current token
        }
      });
      
      if (isMounted.current) {
        setOrder(response.data.data);
        // Reset auth retries counter on success
        authRetries.current = 0;
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      
      if (!isMounted.current) return;
      
      const message = err.response?.data?.message || err.message || "Could not load order details.";
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        // Increment auth retry counter
        authRetries.current += 1;
        console.log(`Auth retry ${authRetries.current}/${MAX_AUTH_RETRIES}`);
        
        try {
          // Try to refresh token manually
          await refreshToken();
          // Retry fetch after token refresh (with skip flag to avoid infinite loops)
          fetchInProgress.current = false;
          fetchOrderDetails(true);
          return; // Early return to avoid setting error state
        } catch (refreshErr) {
          setError("Session expired. Please log in again.");
        }
      } else if (err.response?.status === 404) {
        setError("Order not found.");
        setOrder(null);
      } else {
        setError(message);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
      fetchInProgress.current = false;
    }
  }, [orderId, api, token, refreshToken]);

  // Clean up effect to set mounted state when component unmounts
  useEffect(() => {
    isMounted.current = true;
    // Reset state variables on mount
    setLoading(true);
    setError(null);
    setOrder(null);
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Fetch order details once when component mounts or token changes
  useEffect(() => {
    // Only fetch if we have a token
    if (token) {
      fetchOrderDetails();
    }
  }, [fetchOrderDetails, token, orderId]);

  const handleCancelOrder = useCallback(async () => {
    if (!order || !order.orderId || isCancelling) return;
    
    if (window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      setIsCancelling(true);
      const toastId = toast.loading("Cancelling order...");
      try {
        await api.patch(`/orders/${order.orderId}/cancel`);
        
        // Re-fetch order details instead of making another API call
        const response = await api.get(`/orders/${order.orderId}`);
        
        if (isMounted.current) {
          setOrder(response.data.data);
          toast.success('Order cancelled successfully.', { id: toastId });
        }
      } catch (err) {
        console.error("Failed to cancel order:", err);
        
        if (isMounted.current) {
          toast.error(err.response?.data?.message || "Failed to cancel order.", { id: toastId });
        }
      } finally {
        if (isMounted.current) {
          setIsCancelling(false);
        }
      }
    }
  }, [order, isCancelling, api]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin mb-6" />
        <h2 className="text-2xl font-semibold text-gray-700">Loading Order Details</h2>
        <p className="text-gray-500 mt-2">Please wait while we fetch the information...</p>
      </div>
    );
  }

  // --- Error State (General Error if Order Data couldn't be fetched at all) ---
  if (error && !order) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 w-full max-w-lg">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Oops! Something went wrong.</h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">{error}</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => {
                authRetries.current = 0;
                fetchOrderDetails();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center"
            >
              <Home className="w-4 h-4 mr-2" /> Try Again
            </button>
            <button 
              onClick={() => navigate(getOrdersPath())}
              className="w-full sm:w-auto px-6 py-3 bg-gray-200 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // --- Order Not Found State ---
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 w-full max-w-lg">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Order Not Found</h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            We couldn't find an order with ID: <span className="font-semibold">{orderId}</span>. 
            It might have been removed or the ID is incorrect.
          </p>
          <button 
            onClick={() => navigate(getOrdersPath())}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="h-4 h-4 mr-2" /> Back to My Orders
          </button>
        </div>
      </div>
    );
  }
  
  const statusColors = getStatusSemanticColor(order.status);

  // --- Main Content ---
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Home className="w-4 h-4 me-2.5" /> Home
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                  <button
                    onClick={() => navigate(getOrdersPath())}
                    className="ms-1 text-sm font-medium text-gray-500 hover:text-blue-600 md:ms-2 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 me-1.5 inline-block align-text-bottom" /> My Orders
                  </button>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/></svg>
                  <span className="ms-1 text-sm font-semibold text-gray-700 md:ms-2">
                    Order <span className="font-mono">#{order.orderId ? order.orderId.substring(0, 17) + (order.orderId.length > 17 ? '...' : '') : 'N/A'}</span>
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Main Order Details Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/80">
          {/* Order Header */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Order <span className={`font-mono ${statusColors.text}`}>{order.orderId}</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on: <span className="font-medium text-gray-700">{format(new Date(order.createdAt), 'MMMM dd, yyyy, h:mm a')}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button 
                  onClick={() => navigate(getOrdersPath())}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Orders
                </button>
                {(order.status !== 'cancelled' && order.status !== 'delivered') && (
                  <button 
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white border border-red-700 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isCancelling ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <XCircle className="w-4 h-4 mr-2" />}
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status & Tracker Section */}
          <div className={`p-6 border-b border-gray-200 ${statusColors.bg}`}>
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-x-6 gap-y-4">
              <div>
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Status</h2>
                <div className="flex items-center">
                    <span className={`text-2xl font-bold capitalize ${statusColors.text}`}>
                        {order.status}
                    </span>
                    {order.status === 'delivered' && <CheckCircle className={`inline-block w-6 h-6 ml-2 ${statusColors.text}`} />}
                    {order.status === 'cancelled' && <XCircle className={`inline-block w-6 h-6 ml-2 ${statusColors.text}`} />}
                    {order.status === 'shipped' && <Truck className={`inline-block w-6 h-6 ml-2 ${statusColors.text}`} />}
                    {['pending', 'processing'].includes(order.status) && <Clock className={`inline-block w-6 h-6 ml-2 ${statusColors.text}`} />}
                </div>
              </div>
              {order.status !== 'cancelled' && (
                <div className="text-left md:text-right">
                  <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Expected Delivery</h2>
                  <p className="text-xl font-semibold text-gray-800">
                    {format(new Date(order.expectedDelivery), 'MMMM dd, yyyy')}
                  </p>
                </div>
              )}
            </div>
            {order.status !== 'cancelled' && (
              <div className="mt-6 pt-2">
                <OrderTracker status={order.status} />
              </div>
            )}
            {order.status === 'cancelled' && (
                <p className={`mt-4 ${statusColors.text} text-sm flex items-start p-3 rounded-md bg-white border ${statusColors.border}`}>
                    <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>This order has been cancelled. If you have any questions or this was a mistake, please contact our support team.</span>
                </p>
            )}
          </div>
          
          {/* Item Details Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Package className="w-6 h-6 mr-2 text-blue-600"/> Item(s) in Your Order
            </h2>
            <ItemDetailCard 
              itemName={order.itemnName} 
              quantity={order.itemsQuantity} 
              totalAmountForItem={order.totalAmount}
              formatCurrency={formatCurrency}
            />
          </div>
          
          {/* Shipping, Payment & Summary Section (Two Columns on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 md:border-r border-gray-200">
                <InfoBlock icon={<MapPin />} title="Shipping Address">
                    <p><strong className="font-medium text-gray-900">Recipient:</strong> {order.shippingName}</p>
                    <p><strong className="font-medium text-gray-900">Address:</strong> {order.shippingAddress}</p>
                    <p><strong className="font-medium text-gray-900">Contact:</strong> {order.shippingMobile}</p>
                </InfoBlock>
            </div>
            <div className="md:col-span-2 bg-gray-50/50">
                <InfoBlock icon={<ReceiptText />} title="Payment & Summary">
                    <p><strong className="font-medium text-gray-900">Payment Method:</strong> 
                        <span className="capitalize ml-1">
                            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                             order.paymentMethod === 'upi' ? 'UPI' : 
                             order.paymentMethod ? order.paymentMethod.replace(/_/g, ' ') : 'N/A'}
                        </span>
                    </p>
                    <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Summary</h4>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium text-gray-800">{formatCurrency(order.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Shipping & Handling:</span>
                            <span className="font-medium text-gray-800">{formatCurrency(0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                            <span>Grand Total:</span>
                            <span>{formatCurrency(order.totalAmount)}</span>
                        </div>
                    </div>
                </InfoBlock>
            </div>
          </div>

          {/* Support Section */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 text-center sm:text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Need Help With Your Order?</h2>
            <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto sm:mx-0">
              If you have any questions, concerns, or need to make changes to your order (if applicable), 
              our customer support team is ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row justify-start gap-3">
              <button 
                onClick={() => toast.success("Contact Support feature coming soon!", {icon: '📞'})}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
              >
                Contact Support
              </button>
              <button 
                onClick={() => toast.info("Navigating to FAQ page... (Not implemented)", {icon: '❓'})}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium shadow-sm"
              >
                View FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;