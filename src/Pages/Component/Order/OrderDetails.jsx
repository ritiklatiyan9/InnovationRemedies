import React, { useState, useEffect } from 'react';
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
  Receipt,
  DollarSign,
  ReceiptText,
  Home
} from 'lucide-react';

// Order Tracker component from your MyOrdersPage
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

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { api, getAuthHeader, user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAdmin = user?.role === 'Aadmin';

  // Function to get the correct orders path based on user role
  const getOrdersPath = () => {
    return isAdmin ? '/admin/orders' : '/orders';
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data.data);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        const message = err.response?.data?.message || err.message || "Could not load order details.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, api]);

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

  const handleCancelOrder = async () => {
    if (!order) return;
    
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        setLoading(true);
        await api.patch(`/orders/${orderId}/cancel`);
        
        // Refresh order data
        const response = await api.get(`/orders/${orderId}`);
        setOrder(response.data.data);
        toast.success('Order cancelled successfully');
      } catch (err) {
        console.error("Failed to cancel order:", err);
        toast.error(err.response?.data?.message || err.message || "Failed to cancel order");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Loading order details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md border border-red-100 p-8 w-full max-w-2xl">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Error Loading Order</h3>
          <p className="text-center text-gray-600 mb-8">{error}</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate(getOrdersPath())}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Order Not Found</h3>
          <p className="text-center text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate(getOrdersPath())}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" /> Home
            </button>
            <span>/</span>
            <button 
              onClick={() => navigate(getOrdersPath())}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 mr-1" /> My Orders
            </button>
            <span>/</span>
            <span className="font-medium text-gray-700">Order #{order.orderId.substring(4, 12)}</span>
          </div>
        </div>

        {/* Order header section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Order Details</h1>
                <p className="text-gray-500 text-sm">
                  Placed on {format(new Date(order.createdAt), 'MMMM dd, yyyy')} at {format(new Date(order.createdAt), 'h:mm a')}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => navigate(getOrdersPath())}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
                </button>
                {(order.status !== 'cancelled' && order.status !== 'delivered') && (
                  <button 
                    onClick={handleCancelOrder}
                    className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 transition-colors text-sm font-medium"
                  >
                    <XCircle className="w-4 h-4 mr-2" /> Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status section */}
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="font-semibold text-gray-700 mb-1">Order Status</h2>
                <div className="flex items-center">
                  <span className={`text-lg font-bold ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {order.status === 'cancelled' ? (
                    <span className="ml-3 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border bg-red-100 text-red-800 border-red-200">
                      <XCircle className="w-3 h-3 mr-1" /> Cancelled
                    </span>
                  ) : order.status === 'delivered' ? (
                    <span className="ml-3 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="w-3 h-3 mr-1" /> Completed
                    </span>
                  ) : (
                    <span className="ml-3 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center border bg-blue-100 text-blue-800 border-blue-200">
                      <Clock className="w-3 h-3 mr-1" /> In Progress
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <h2 className="font-semibold text-gray-700 mb-1">Expected Delivery</h2>
                <p className="text-lg font-bold text-gray-800">
                  {format(new Date(order.expectedDelivery), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>

            {/* Order tracker */}
            {order.status !== 'cancelled' && (
              <div className="mt-6">
                <OrderTracker status={order.status} />
              </div>
            )}
          </div>

          {/* Rest of the order sections remain unchanged */}
          {/* ... */}

          {/* Support section */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="font-semibold text-gray-900 mb-3">Need Help With Your Order?</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about your order, our customer support team is here to help.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                Contact Support
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                Track Delivery
              </button>
              <button 
                onClick={() => navigate(getOrdersPath())}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;