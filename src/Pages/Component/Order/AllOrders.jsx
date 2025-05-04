import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Loader2, 
  AlertTriangle,
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
  // Define all possible statuses in order
  const allStatuses = ['pending', 'processing', 'shipped', 'delivered'];
  
  // Find the index of the current status
  const currentIndex = allStatuses.indexOf(status);
  
  return (
    <div className="w-full my-4">
      <div className="flex items-center justify-between">
        {allStatuses.map((step, index) => {
          // Determine if this step is active, completed, or upcoming
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          
          return (
            <React.Fragment key={step}>
              {/* Status dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive
                      ? 'bg-green-500 animate-pulse'
                      : isCompleted
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                >
                  {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                </div>
                <span className={`mt-2 text-xs capitalize ${
                  isActive ? 'font-bold text-green-600' : 
                  isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step}
                </span>
              </div>
              
              {/* Connecting line (except after the last item) */}
              {index < allStatuses.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 relative">
                  <div className="absolute inset-0 bg-gray-200"></div>
                  {isCompleted && (
                    <div 
                      className="absolute inset-y-0 left-0 bg-green-500" 
                      style={{ width: '100%' }}
                    ></div>
                  )}
                  {isActive && (
                    <div 
                      className="absolute inset-y-0 left-0 bg-green-500" 
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
};

// Card component for orders
const OrderCard = ({ order, refreshOrders }) => {
  const navigate = useNavigate();
  const { api } = useAuth();
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'text-green-500';
      case 'shipped': return 'text-blue-500';
      case 'processing': return 'text-amber-500';
      case 'pending': return 'text-gray-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getBadgeStyle = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <p className="text-xs text-gray-500 font-medium">ORDER ID</p>
            <p className="font-mono text-sm font-semibold text-gray-800">{order.orderId}</p>
          </div>
          <div className="flex flex-col sm:items-end">
            <p className="text-xs text-gray-500 font-medium">PLACED ON</p>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1 text-gray-500" />
              <p className="font-medium text-gray-800">
                {format(new Date(order.createdAt), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Item details */}
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-gray-50 rounded-md border flex items-center justify-center flex-shrink-0">
            <Package className="w-10 h-10 text-blue-400" />
          </div>
          
          <div className="flex-grow">
            <h3 className="font-semibold text-gray-900 text-lg">{order.itemnName}</h3>
            <div className="flex items-center mt-1 text-gray-600">
              <span className="text-sm">Quantity: {order.itemsQuantity}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-lg font-bold text-blue-600">{formatCurrency(order.totalAmount)}</span>
            </div>
            
            {/* Order status badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getBadgeStyle(order.status)}`}>
                <Clock className="w-3 h-3 mr-1" />
                Order: {order.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border ${getBadgeStyle(order.deliveryStatus)}`}>
                <Truck className="w-3 h-3 mr-1" />
                Delivery: {order.deliveryStatus}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border border-purple-200 bg-purple-50 text-purple-800">
                <CreditCard className="w-3 h-3 mr-1" />
                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                 order.paymentMethod === 'upi' ? 'UPI' : 'Card Payment'}
              </span>
            </div>
          </div>
          
          {/* Expected delivery */}
          <div className="hidden md:block text-right flex-shrink-0">
            <p className="text-xs text-gray-500 font-medium">EXPECTED DELIVERY</p>
            <p className="text-sm font-semibold mt-1 text-gray-800">
              {format(new Date(order.expectedDelivery), 'MMM dd, yyyy')}
            </p>
            <button 
              onClick={() => navigate(`/orders/${order.orderId}`)}
              className="mt-3 inline-flex items-center px-3 py-2 text-sm bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Details <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
        
        {/* Progress tracker - only show for non-cancelled orders */}
        {order.status !== 'cancelled' && (
          <div className="mt-6">
            <OrderTracker status={order.status} />
          </div>
        )}
        
        {/* Shipping details and actions */}
        <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between">
          <div className="text-sm text-gray-600">
            <div className="flex items-center mb-1">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <span>{order.shippingName || 'John Doe'}</span>
            </div>
            <div className="flex items-center mb-1">
              <Phone className="w-4 h-4 mr-2 text-gray-500" />
              <span>{order.shippingMobile || '+91 9876543210'}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-500" />
              <span>{order.shippingAddress || '123 Main St, City, State, 12345'}</span>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center">
            {/* Only show cancel button if order is not cancelled or delivered */}
            {order.status !== 'cancelled' && order.status !== 'delivered' && (
              <button
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
                onClick={async () => {
                  if (window.confirm('Are you sure you want to cancel this order?')) {
                    try {
                      await api.patch(`/orders/${order.orderId}/cancel`);
                      refreshOrders(); // Refresh the orders list
                    } catch (err) {
                      console.error("Failed to cancel order:", err);
                      alert("Failed to cancel order. " + (err.response?.data?.message || err.message));
                    }
                  }
                }}
              >
                <XCircle className="w-4 h-4 inline mr-1" /> Cancel Order
              </button>
            )}
            
            {/* Show view details button for mobile */}
            <button 
              className="md:hidden ml-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
              onClick={() => navigate(`/orders/${order.orderId}`)}
            >
              <ArrowRight className="w-4 h-4 inline mr-1" /> Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
function MyOrdersPage() {
  const navigate = useNavigate();
  const { api, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/orders/all');
      setOrders(response.data.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      const message = err.response?.data?.message || err.message || "Could not load your orders.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [api]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 rounded-lg bg-white shadow-sm border border-gray-100 max-w-md">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Orders</h3>
          <p className="text-gray-500">Please wait while we fetch your order history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-md border border-red-100 p-6 w-full max-w-lg">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Error Loading Orders</h3>
          <p className="text-center text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={fetchOrders}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/products')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render orders or empty state
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Continue Shopping
          </button>
        </div>
        
        {/* Orders list */}
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <OrderCard 
                key={order.orderId} 
                order={order} 
                refreshOrders={fetchOrders} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Found</h3>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrdersPage;