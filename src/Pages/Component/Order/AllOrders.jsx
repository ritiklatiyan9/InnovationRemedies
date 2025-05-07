import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
import {
  Package,
  ArrowRight,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Calendar,
  CreditCard,
  MapPin,
  User,
  Phone
} from 'lucide-react';
import { format } from 'date-fns';

// Component for the order status tracking
const OrderTracker = ({ status }) => {
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
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-green-500 animate-pulse'
                      : isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-300' // Changed from gray-200 for better contrast
                  }`}
                >
                  {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                   {/* Can add an icon for active step if desired */}
                </div>
                <span className={`mt-2 text-xs capitalize ${
                  isActive ? 'font-bold text-green-600' :
                  isCompleted ? 'text-green-600' : 'text-gray-500' // Changed from gray-400
                }`}>
                  {step}
                </span>
              </div>
              {index < allStatuses.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 relative">
                  <div className="absolute inset-0 bg-gray-300"></div> {/* Changed from gray-200 */}
                  {isCompleted && (
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500"
                      style={{ width: '100%' }}
                    ></div>
                  )}
                  {isActive && ( // Visual cue for active step's progress in the bar
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500"
                      style={{ width: '0%' }} // Or '50%' if it's 'in progress'
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
};

// Card component for orders
const OrderCard = ({ order, refreshOrders, isLoading = false }) => {
  const navigate = useNavigate();
  // const { api } = useAuth(); // Not used in this component directly

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);
  };

  const getBadgeStyle = (status) => {
    switch(status?.toLowerCase()) { // Added toLowerCase for safety
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg ${isLoading ? 'animate-pulse' : ''}`}>
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <p className="text-xs text-gray-500 font-medium">ORDER ID</p>
            {isLoading ? (
              <div className="h-4 bg-gray-200 rounded w-24 mt-1"></div>
            ) : (
              <p className="font-mono text-sm font-semibold text-gray-800">{order.orderId}</p>
            )}
          </div>
          <div className="flex flex-col sm:items-end">
            <p className="text-xs text-gray-500 font-medium">PLACED ON</p>
            {isLoading ? (
              <div className="h-4 bg-gray-200 rounded w-28 mt-1"></div>
            ) : (
              <div className="flex items-center text-sm">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                <p className="font-medium text-gray-800">
                  {order.createdAt ? format(new Date(order.createdAt), 'MMM dd, yyyy') : 'N/A'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Main content block for product image, name, price, expected delivery, view details button */}
        <div className="flex flex-col md:flex-row gap-x-4 gap-y-6 items-start">
          {/* Left Group: Image + Product Text Details */}
          <div className="flex gap-4 flex-grow w-full items-start">
            {/* Image */}
            <div className="w-20 h-20 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center flex-shrink-0 p-2">
              <Package className={`w-10 h-10 ${isLoading ? 'text-gray-300' : 'text-blue-500'}`} />
            </div>
            {/* Product Text Details */}
            <div className="flex-grow">
              {isLoading ? (
                <>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-28"></div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">{order.itemnName || 'Product Name'}</h3>
                  <div className="flex items-center mt-1.5 text-gray-600">
                    <span className="text-sm">Quantity: {order.itemsQuantity || 1}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-lg font-bold text-blue-600">{formatCurrency(order.totalAmount)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getBadgeStyle(order.status)}`}>
                      <Clock className="w-3 h-3 mr-1.5" />
                      Order: {order.status || 'pending'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getBadgeStyle(order.deliveryStatus)}`}>
                      <Truck className="w-3 h-3 mr-1.5" />
                      Delivery: {order.deliveryStatus || 'pending'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border border-purple-200 bg-purple-50 text-purple-800">
                      <CreditCard className="w-3 h-3 mr-1.5" />
                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' :
                       order.paymentMethod === 'upi' ? 'UPI' : order.paymentMethod ? order.paymentMethod.replace('_', ' ').toUpperCase() : 'Card Payment'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Group (or bottom on mobile): Expected Delivery + View Details Button */}
          <div className="flex flex-col items-stretch text-left md:items-end md:text-right flex-shrink-0 w-full md:w-auto">
            {isLoading ? (
               <div className="w-full md:w-auto">
                <div className="h-4 bg-gray-200 rounded md:w-36 w-1/2 mb-1"></div> {/* Title Placeholder */}
                <div className="h-4 bg-gray-200 rounded md:w-24 w-1/3 mb-3"></div> {/* Date Placeholder */}
                <div className="h-10 bg-gray-200 rounded-md w-full md:w-36"></div> {/* Button Placeholder */}
              </div>
            ) : (
              <>
                <div className="mb-3 w-full md:w-auto">
                  <p className="text-xs text-gray-500 font-medium">EXPECTED DELIVERY</p>
                  <p className="text-sm font-semibold mt-0.5 text-gray-800">
                    {order.expectedDelivery ? format(new Date(order.expectedDelivery), 'MMM dd, yyyy') : 'N/A'}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/orders/${order.orderId}`)}
                  className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details <ArrowRight className="h-4 w-4 ml-1.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Order Tracker and Shipping Info */}
        {isLoading ? (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((_, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    <div className="mt-2 h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                  {index < 3 && (
                    <div className="flex-1 mx-2 h-0.5 bg-gray-200"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          order.status !== 'cancelled' && (
            <div className="mt-6">
              <OrderTracker status={order.status} />
            </div>
          )
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
              <div className="h-4 bg-gray-200 rounded w-56"></div>
            </div>
          ) : (
            <div className="text-sm text-gray-600 space-y-1.5">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>{order.shippingName || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                <span>{order.shippingMobile || 'N/A'}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                <span>{order.shippingAddress || 'N/A'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Generate placeholder orders for loading state
const generatePlaceholderOrders = (count) => {
  return Array(count).fill(null).map((_, i) => ({
    orderId: `placeholder-${i}`,
    createdAt: new Date().toISOString(),
    itemnName: 'Loading Product Name ...',
    itemsQuantity: 0,
    totalAmount: 0,
    status: 'pending',
    deliveryStatus: 'pending',
    paymentMethod: 'cod',
    expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    shippingName: 'Loading Name ...',
    shippingMobile: 'Loading Mobile ...',
    shippingAddress: 'Loading Address ...',
  }));
};

// Main component
function MyOrdersPage() {
  const navigate = useNavigate();
  const { api, isAuthenticated } = useAuth(); // Added isAuthenticated
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderOrders = generatePlaceholderOrders(4);

  const fetchOrders = async () => {
    if (!isAuthenticated) { // Prevent API call if not authenticated
        setError("You need to be logged in to view your orders.");
        setLoading(false);
        setOrders([]); // Clear any existing orders
        return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/orders/all');
      // setTimeout to simulate network delay and see loading state better if needed
      // setTimeout(() => { // Keep for testing if needed
        setOrders(response.data.data || []); // Ensure orders is an array
        setLoading(false);
      // }, 300);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      let message = "Could not load your orders at this time. Please try again later.";
      if (err.response) {
        message = err.response.data?.message || message;
        if (err.response.status === 401 || err.response.status === 403) {
            message = "Your session may have expired. Please log in again to view your orders.";
            // Optionally, redirect to login: navigate('/login');
        }
      } else if (err.request) {
        message = "No response from server. Please check your internet connection.";
      } else {
        message = err.message || message;
      }
      setError(message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, isAuthenticated]); // Re-fetch if isAuthenticated changes (e.g., user logs in/out)


  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Continue Shopping
          </button>
        </div>

        {error && !loading && (
          <div className="bg-white rounded-lg shadow-md border border-red-100 p-6 w-full">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mb-4">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Orders</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={fetchOrders}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                {isAuthenticated && // Only show if authenticated, else they should login
                    <button
                        onClick={() => navigate('/products')}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Browse Products
                    </button>
                }
                {!isAuthenticated && // Show login button if not authenticated and error occurred
                    <button
                        onClick={() => navigate('/login')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Login
                    </button>
                }
              </div>
            </div>
          </div>
        )}

        {(!loading && !error && orders.length === 0) ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {isAuthenticated ? "No Orders Found" : "Please Login to View Orders"}
            </h3>
            <p className="text-gray-500 mb-6">
                {isAuthenticated ? "You haven't placed any orders yet." : "Login to see your order history."}
            </p>
            <button
              onClick={() => isAuthenticated ? navigate('/products') : navigate('/login')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isAuthenticated ? <ShoppingCart className="h-4 w-4 mr-2" /> : null}
              {isAuthenticated ? "Browse Products" : "Go to Login"}
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px] ${loading && orders.length === 0 ? 'pointer-events-none' : ''}`}>
            {(loading && orders.length === 0 ? placeholderOrders : orders).map((order, index) => (
              <OrderCard 
                key={order.orderId || `placeholder-${index}`} 
                order={order} 
                refreshOrders={fetchOrders} 
                isLoading={loading && orders.length === 0} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;