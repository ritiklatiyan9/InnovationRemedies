import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format, parseISO, addDays } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import {
  AlertCircle,
  ArrowUpDown,
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  Home,
  Loader2,
  MoreHorizontal,
  Package,
  RefreshCw,
  Search,
  Trash,
  XCircle,
  LayoutGrid,
  List,
  Sparkles,
  CheckCheck,
  Truck,
  File
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Status Badge Component with enhanced styling
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    const lowerStatus = typeof status === 'string' ? status.toLowerCase() : 'unknown';
    switch (lowerStatus) {
      case 'pending':
        return 'bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-800 border-yellow-200 shadow-sm';
      case 'processing':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 shadow-sm';
      case 'shipped':
        return 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 border-indigo-200 shadow-sm';
      case 'delivered':
        return 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-800 border-green-200 shadow-sm';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-sm';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200 shadow-sm';
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusStyles()} uppercase text-xs font-medium py-1.5 px-3 rounded-full`}>
      {status || 'Unknown'}
    </Badge>
  );
};

// New Order Status Timeline Component
const OrderStatusTimeline = ({ order }) => {
  const getStatusData = () => {
    const baseDate = order.createdAt ? new Date(order.createdAt) : new Date();
    
    // Default timeline setup
    const timeline = [
      { 
        status: 'Order Placed', 
        date: baseDate,
        completed: true,
        icon: <Package className="h-4 w-4" />
      },
      { 
        status: 'Order Processed', 
        date: addDays(baseDate, 1),
        completed: ['processing', 'shipped', 'delivered'].includes(order.status),
        icon: <CheckCheck className="h-4 w-4" />
      },
      { 
        status: 'Out for Delivery', 
        date: addDays(baseDate, 3),
        completed: ['shipped', 'delivered'].includes(order.status),
        icon: <Truck className="h-4 w-4" />
      },
      { 
        status: 'Delivered', 
        date: addDays(baseDate, 7),
        completed: order.status === 'delivered',
        icon: <File className="h-4 w-4" />
      }
    ];

    if (order.status === 'cancelled') {
      return [
        timeline[0],
        { 
          status: 'Cancelled', 
          date: order.updatedAt ? new Date(order.updatedAt) : addDays(baseDate, 1),
          completed: true,
          icon: <XCircle className="h-4 w-4" />
        }
      ];
    }

    return timeline;
  };

  const formatDate = (date) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const timeline = getStatusData();

  return (
    <div className="w-full pt-2 pb-1">
      <div className="flex justify-between items-center relative">
        {/* Line connecting all points */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
        
        {/* Timeline points */}
        {timeline.map((point, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            {/* Circle indicator */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${point.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
              {point.icon}
            </div>
            
            {/* Status label */}
            <div className="text-[10px] mt-1 font-medium text-center max-w-[60px] truncate" title={point.status}>
              {point.status}
            </div>
            
            {/* Date */}
            <div className="text-[9px] text-gray-500">
              {formatDate(point.date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton Loader with improved design
const OrdersTableSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <Card key={index} className="w-full overflow-hidden border border-gray-100 animate-pulse">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded-full w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
              </div>
              <div className="flex-shrink-0">
                <div className="h-8 bg-gray-200 rounded-full w-32"></div>
              </div>
              <div className="flex-shrink-0">
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
              </div>
              <div className="flex-shrink-0">
                <div className="h-8 bg-gray-200 rounded-full w-24"></div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <div className="h-9 bg-gray-200 rounded-full w-28"></div>
                <div className="h-9 bg-gray-200 rounded-full w-9"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Order Card for Grid View
const OrderCard = ({ order, handleStatusChange, handleUpdateStatus, selectedStatuses, isUpdating, openCancelDialog, navigate, formatCurrency, formatDateTime }) => {
  if (!order || !order.orderId) return null;
  
  const { date, time } = formatDateTime(order.createdAt);
  const customerIdentifier = order.shippingName || (order.userId?.name ? order.userId.name : `Customer #${order.userId?._id || order.userId}`);

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md border border-gray-100 overflow-hidden bg-white group">
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1">
            <span className="truncate max-w-[160px]">{customerIdentifier}</span>
          </CardTitle>
          <CardDescription className="mt-1 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {date} • {time}
            </span>
          </CardDescription>
        </div>
        <StatusBadge status={order.status} />
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="flex flex-col gap-3">
          <div className="w-full overflow-hidden">
            <Link to={`/orders/${order.orderId}`} className="font-mono text-xs text-blue-600 hover:text-blue-700 break-all hover:underline truncate block">
              {order.orderId}
            </Link>
          </div>
          
          {/* Order Status Timeline */}
          <OrderStatusTimeline order={order} />
          
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900 text-lg">
              {formatCurrency(order.totalAmount)}
            </span>
            {order.status !== 'cancelled' ? (
              <div className="flex items-center gap-2">
                <Select
                  value={selectedStatuses[order.orderId] ?? order.status ?? ''}
                  onValueChange={(value) => handleStatusChange(order.orderId, value)}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-[120px] h-8 text-xs rounded-full">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleUpdateStatus(order.orderId)}
                  disabled={!selectedStatuses[order.orderId] || selectedStatuses[order.orderId] === order.status || isUpdating}
                  className="h-8 px-2 rounded-full hover:bg-blue-50 hover:text-blue-600"
                >
                  {isUpdating && selectedStatuses[order.orderId] ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4" />}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-2 bg-gray-50 flex justify-between border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs hover:bg-white text-gray-600"
          onClick={() => navigate(`/orders/${order.orderId}`)}
        >
          <Eye className="h-3.5 w-3.5 mr-1" /> View
        </Button>
        
        {order.status !== 'cancelled' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs hover:bg-white text-red-600 hover:text-red-700"
            onClick={() => openCancelDialog(order.orderId)}
          >
            <Trash className="h-3.5 w-3.5 mr-1" /> Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Main Admin Manage Orders Component
const AdminManageOrder = () => {
  const navigate = useNavigate();
  const { token, user, getAuthHeader } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [pageSize] = useState(8);
  const [viewMode, setViewMode] = useState('grid');

  // Fetch Orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) throw new Error("Authentication token is missing. Please log in again.");
      const headers = getAuthHeader();
      const response = await fetch('https://innovation-backend.vercel.app/api/v1/orders/admin/orders', { headers });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || `HTTP error ${response.status}: Failed to fetch orders`);
      }

      const data = await response.json();
      const fetchedOrders = Array.isArray(data?.data) ? data.data : [];
      setOrders(fetchedOrders);
      setSelectedStatuses({});
      setCurrentPage(1);
      toast.success('Orders loaded successfully');
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
      toast.error(`Error fetching orders: ${err.message}`);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [token, getAuthHeader]);

  useEffect(() => {
    if (token && user?.role === 'Admin') {
      fetchOrders();
    } else if (user?.role && user.role !== 'Admin') {
      setError("Access Denied: You do not have permission to view this page.");
      setLoading(false);
    } else if (!token) {
      setLoading(false);
    }
  }, [token, user, fetchOrders]);

  // Filtering and Sorting
  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];
    if (statusFilter !== 'all') {
      result = result.filter(order => (order.status || '').toLowerCase() === statusFilter.toLowerCase());
    }
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase().trim();
      if (lowercasedTerm) {
        result = result.filter(order => {
          const orderIdMatch = order.orderId && order.orderId.toLowerCase().includes(lowercasedTerm);
          const userIdMatch = order.userId && order.userId.toString().toLowerCase().includes(lowercasedTerm);
          const shippingNameMatch = order.shippingName && order.shippingName.toLowerCase().includes(lowercasedTerm);
          const userNameMatch = order.userId?.name && order.userId.name.toLowerCase().includes(lowercasedTerm);
          return orderIdMatch || userIdMatch || shippingNameMatch || userNameMatch;
        });
      }
    }
    if (sortConfig.key) {
      result.sort((a, b) => {
        const keyA = a[sortConfig.key];
        const keyB = b[sortConfig.key];
        if (keyA == null && keyB == null) return 0;
        if (keyA == null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (keyB == null) return sortConfig.direction === 'asc' ? 1 : -1;
        if (keyA < keyB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (keyA > keyB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [orders, statusFilter, searchTerm, sortConfig]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedOrders.length / pageSize);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedOrders, currentPage, pageSize]);

  // Event Handlers
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses(prev => ({ ...prev, [orderId]: newStatus }));
  };

  const handleUpdateStatus = async (orderId) => {
    const newStatus = selectedStatuses[orderId];
    const currentOrder = orders.find(o => o.orderId === orderId);
    if (!newStatus || !currentOrder || newStatus === currentOrder.status) return;

    setIsUpdating(true);
    try {
      if (!token) throw new Error("Authentication token missing.");
      const headers = { ...getAuthHeader(), 'Content-Type': 'application/json' };
      const response = await fetch(`https://innovation-backend.vercel.app/api/v1/orders/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
      setSelectedStatuses(prev => {
        const { [orderId]: _, ...rest } = prev;
        return rest;
      });
      toast.success(`Order ${orderId.substring(0, 8)}... status updated to ${newStatus}.`);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(`Status update failed: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const openCancelDialog = (orderId) => {
    setCancelOrderId(orderId);
    setShowCancelDialog(true);
  };

  const handleCancelOrder = async () => {
    if (!cancelOrderId) return;

    setIsUpdating(true);
    setShowCancelDialog(false);
    try {
      if (!token) throw new Error("Authentication token missing.");
      const headers = getAuthHeader();
      const response = await fetch(`https://innovation-backend.vercel.app/api/v1/orders/admin/orders/${cancelOrderId}/cancel`, {
        method: 'PATCH',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel order');
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === cancelOrderId ? { ...order, status: 'cancelled' } : order
        )
      );
      toast.success(`Order ${cancelOrderId.substring(0, 8)}... cancelled successfully.`);
      setCancelOrderId(null);
    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error(`Cancellation failed: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  // Helper Functions
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return 'N/A';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return { date: 'N/A', time: '' };
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return { date: 'Invalid Date', time: '' };
      return {
        date: format(date, 'MMM dd, yyyy'),
        time: format(date, 'h:mm a'),
      };
    } catch (e) {
      console.error("Error formatting date:", e);
      return { date: 'Error', time: '' };
    }
  };

  // Render Logic
  if (user?.role !== 'Admin' && !loading && !error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] p-4 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-red-100">
          <XCircle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You do not have permission to access this page. Please contact an administrator.
          </p>
          <Button onClick={() => navigate('/')} className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Home className="w-4 h-4 mr-2" /> Return to Home
          </Button>
        </div>
      </div>
    );
  }

  if (loading && orders.length === 0) {
    return (
      <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Order Management</h1>
            <p className="text-gray-500">Loading orders...</p>
          </div>
        </div>
        <Card className="border-none shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Fetching order data, please wait...</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdersTableSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <Card className="border-none shadow-lg max-w-2xl mx-auto mt-12 overflow-hidden">
          <div className="bg-red-50 p-4 border-b border-red-100">
            <div className="flex items-center text-red-700">
              <AlertCircle className="h-6 w-6 mr-2" />
              <CardTitle>Error Loading Orders</CardTitle>
            </div>
            <CardDescription className="text-red-600 mt-1">{error}</CardDescription>
          </div>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-6">
              There was a problem fetching the orders. Please check your connection or try again later.
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 border-t border-gray-100">
            <Button onClick={fetchOrders} className="mr-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Try Again
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" /> Go Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const renderOrdersGrid = () => {
    if (isUpdating) {
      return (
        <div className="flex items-center justify-center py-10 text-gray-600">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin mr-3" />
          <span>Processing update...</span>
        </div>
      );
    }

    if (filteredAndSortedOrders.length === 0) {
      return (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-5" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'No orders match your current search or filter criteria.'
              : 'There are currently no orders in the system.'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="flex items-center mx-auto rounded-full"
            >
              <Filter className="h-4 w-4 mr-2" /> Clear Filters & Search
            </Button>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedOrders.map(order => (
            <OrderCard 
              key={order.orderId}
              order={order} 
              handleStatusChange={handleStatusChange}
              handleUpdateStatus={handleUpdateStatus}
              selectedStatuses={selectedStatuses}
              isUpdating={isUpdating}
              openCancelDialog={openCancelDialog}
              navigate={navigate}
              formatCurrency={formatCurrency}
              formatDateTime={formatDateTime}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 mb-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} rounded-full`}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={`page-${i + 1}`}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer rounded-full"
                      aria-current={currentPage === i + 1 ? 'page' : undefined}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} rounded-full`}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </>
    );
  };

  const renderOrdersTable = () => {
    if (isUpdating) {
      return (
        <div className="flex items-center justify-center py-10 text-gray-600">
          <Loader2 className="h-6 w-6 text-blue-500 animate-spin mr-3" />
          <span>Processing update...</span>
        </div>
      );
    }

    if (filteredAndSortedOrders.length === 0) {
      return (
        <div className="text-center py-16 px-6">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-5" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'No orders match your current search or filter criteria.'
              : 'There are currently no orders in the system.'}
          </p>
          {(searchTerm || statusFilter !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="flex items-center mx-auto rounded-full"
            >
              <Filter className="h-4 w-4 mr-2" /> Clear Filters & Search
            </Button>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
                <TableHead className="w-[30%] px-4 py-4 font-semibold text-gray-600">
                  <button
                    className="flex items-center text-sm hover:text-gray-800 transition-colors"
                    onClick={() => requestSort('orderId')}
                  >
                    Order ID / Customer
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="w-[20%] px-4 py-4 font-semibold text-gray-600">
                  <button
                    className="flex items-center text-sm hover:text-gray-800 transition-colors"
                    onClick={() => requestSort('createdAt')}
                  >
                    Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="w-[15%] px-4 py-4 font-semibold text-gray-600">
                  <button
                    className="flex items-center text-sm hover:text-gray-800 transition-colors"
                    onClick={() => requestSort('totalAmount')}
                  >
                    Amount
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="w-[15%] px-4 py-4 font-semibold text-gray-600">Status</TableHead>
                <TableHead className="w-[20%] text-right px-4 py-4 font-semibold text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map(order => {
                if (!order || !order.orderId) {
                  console.warn("Skipping rendering of invalid order object:", order);
                  return null;
                }
                const { date, time } = formatDateTime(order.createdAt);
                const customerIdentifier = order.shippingName || (order.userId?.name ? order.userId.name : `Customer #${order.userId?._id || order.userId}`);

                return (
                  <TableRow key={order.orderId} className="hover:bg-blue-50/30 transition-colors border-b border-gray-100">
                    <TableCell className="font-medium px-4 py-4 align-top">
                      <div className="flex flex-col">
                        <Link to={`/orders/${order.orderId}`} className="font-mono text-sm text-blue-600 hover:underline hover:text-blue-700 break-all">
                          {order.orderId}
                        </Link>
                        <span className="text-xs text-gray-500 mt-1 truncate" title={customerIdentifier}>
                          {customerIdentifier}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="flex flex-col text-sm">
                        <span className="font-medium">{date}</span>
                        <span className="text-xs text-gray-500">{time}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-sm px-4 py-4 align-top">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                    <TableCell className="px-4 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <StatusBadge status={order.status} />
                        {/* Add timeline in table view too */}
                        <div className="mt-2">
                          <OrderStatusTimeline order={order} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right px-4 py-4 align-top">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        {order.status !== 'cancelled' && (
                          <div className="flex items-center gap-1">
                            <Select
                              value={selectedStatuses[order.orderId] ?? order.status ?? ''}
                              onValueChange={(value) => handleStatusChange(order.orderId, value)}
                              disabled={isUpdating}
                            >
                              <SelectTrigger className="w-[120px] h-9 text-xs rounded-full">
                                <SelectValue placeholder="Change Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(order.orderId)}
                              disabled={!selectedStatuses[order.orderId] || selectedStatuses[order.orderId] === order.status || isUpdating}
                              className="h-9 px-3 text-xs rounded-full"
                            >
                              {isUpdating && selectedStatuses[order.orderId] ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Update'}
                            </Button>
                          </div>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full hover:bg-blue-50" disabled={isUpdating}>
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Order Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem
                              onClick={() => navigate(`/orders/${order.orderId}`)}
                              className="cursor-pointer text-sm"
                            >
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            {order.status !== 'cancelled' && (
                              <DropdownMenuItem
                                onClick={() => openCancelDialog(order.orderId)}
                                className="cursor-pointer text-sm text-red-600 focus:text-red-600 focus:bg-red-50"
                              >
                                <Trash className="h-4 w-4 mr-2" /> Cancel Order
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 mb-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                    className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} rounded-full`}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={`page-${i + 1}`}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer rounded-full"
                      aria-current={currentPage === i + 1 ? 'page' : undefined}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                    className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'} rounded-full`}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Order Management</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Link to="/admin/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-700">Manage Orders</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchOrders} variant="outline" disabled={loading || isUpdating} className="rounded-full">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 h-9 rounded-none ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              size="sm"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 h-9 rounded-none ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
              size="sm"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List View</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{orders.length}</h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Pending</p>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                  {orders.filter(o => o.status === 'pending').length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-50 to-amber-100 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Delivered</p>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {orders.filter(o => o.status === 'delivered').length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-50 to-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Cancelled</p>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                  {orders.filter(o => o.status === 'cancelled').length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-50 to-rose-100 rounded-full flex items-center justify-center">
                <XCircle className="h-6 w-6 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-sm border-none">
        <CardContent className="p-0">
          <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-white rounded-t-lg">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-1 w-full md:w-auto bg-gray-100/70 p-1 rounded-lg">
                <TabsTrigger value="all" className="text-xs px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">All</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">Pending</TabsTrigger>
                <TabsTrigger value="processing" className="text-xs px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">Processing</TabsTrigger>
                <TabsTrigger value="shipped" className="text-xs px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">Shipped</TabsTrigger>
                <TabsTrigger value="delivered" className="text-xs px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled" className="text-xs px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">Cancelled</TabsTrigger>
              </TabsList>
              <div className="relative flex-grow mt-8  md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search ID, Name, User ID..."
                  className="pl-10 w-full md:w-[250px] lg:w-[300px] h-10 text-sm rounded-full border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <TabsContent value={statusFilter} className="mt-0 p-6 bg-gray-50/50 rounded-b-lg min-h-[400px]">
              {viewMode === 'grid' ? renderOrdersGrid() : renderOrdersTable()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Confirm Order Cancellation</DialogTitle>
            <DialogDescription>
              Are you absolutely sure you want to cancel order{' '}
              <strong className="font-mono">{cancelOrderId?.substring(0, 12)}...</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowCancelDialog(false)} disabled={isUpdating} className="rounded-full">
              No, Keep Order
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder} disabled={isUpdating} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
              {isUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Yes, Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminManageOrder;