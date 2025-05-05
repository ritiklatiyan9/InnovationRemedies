import React, { useState, useEffect, useCallback, useMemo } from 'react'; // Added useCallback and useMemo
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns'; // For date formatting
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
  ShoppingCart, // Keep if used elsewhere, otherwise remove if not needed here
  Trash,
  XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- Status Badge Component ---
// Reusable component to display order status with appropriate styling.
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    // Defensive check for status
    const lowerStatus = typeof status === 'string' ? status.toLowerCase() : 'unknown';
    switch (lowerStatus) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusStyles()} uppercase text-xs font-medium py-1 px-2.5`}>
      {/* Display status or 'Unknown' if status is missing */}
      {status || 'Unknown'}
    </Badge>
  );
};

// --- Skeleton Loader (Optional, good for initial loading state) ---
// Provides a visual placeholder while data is loading.
const OrdersTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID / Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index} className="animate-pulse">
            <TableCell>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </TableCell>
            <TableCell>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </TableCell>
            <TableCell>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end items-center gap-2">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// --- Main Admin Manage Orders Component ---
const AdminManageOrder = () => {
  const navigate = useNavigate();
  const { token, user, getAuthHeader } = useAuth(); // Auth context
  const [orders, setOrders] = useState([]); // Raw orders from API
  const [selectedStatuses, setSelectedStatuses] = useState({}); // Track status changes before saving
  const [loading, setLoading] = useState(true); // Main loading state
  const [isUpdating, setIsUpdating] = useState(false); // Specific loading state for updates/cancels
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [statusFilter, setStatusFilter] = useState('all'); // Currently selected status tab
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' }); // Sorting configuration
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [cancelOrderId, setCancelOrderId] = useState(null); // Order ID to be cancelled
  const [showCancelDialog, setShowCancelDialog] = useState(false); // Cancel confirmation dialog visibility
  const [pageSize] = useState(10); // Number of items per page

  // --- API Fetching ---
  // Fetch all orders from the backend API
  const fetchOrders = useCallback(async () => {
    // Use useCallback to prevent unnecessary re-creation on re-renders
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
      }
      const headers = getAuthHeader();
      const response = await fetch('http://localhost:8000/api/v1/orders/admin/orders', { headers });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          // Handle cases where the error response isn't valid JSON
          throw new Error(`HTTP error ${response.status}: Failed to fetch orders`);
        }
        throw new Error(errorData?.message || `HTTP error ${response.status}: Failed to fetch orders`);
      }

      const data = await response.json();
      // Ensure data.data is an array, default to empty array if not
      const fetchedOrders = Array.isArray(data?.data) ? data.data : [];
      setOrders(fetchedOrders);
      setSelectedStatuses({}); // Reset status selections
      setCurrentPage(1); // Reset to first page
      toast.success('Orders loaded successfully');

    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
      toast.error(`Error fetching orders: ${err.message}`);
      setOrders([]); // Clear orders on error
    } finally {
      setLoading(false);
    }
  }, [token, getAuthHeader]); // Dependencies for useCallback

  // Initial fetch and re-fetch on auth changes
  useEffect(() => {
    if (token && user?.role === 'Admin') {
      fetchOrders();
    } else if (user?.role && user.role !== 'Admin') {
      // Handle non-admin user trying to access
      setError("Access Denied: You do not have permission to view this page.");
      setLoading(false);
    } else if (!token) {
        // Handle case where token is not yet available or user logs out
        setLoading(false); // Stop loading if no token
        // Optional: redirect to login or show message
        // setError("Please log in to view orders.");
    }
  }, [token, user, fetchOrders]); // Add fetchOrders to dependency array

  // --- Filtering and Sorting Logic ---
  const filteredAndSortedOrders = useMemo(() => {
    // Use useMemo to recalculate only when dependencies change
    let result = [...orders];

    // 1. Filter by Status Tab
    if (statusFilter !== 'all') {
      result = result.filter(order => (order.status || '').toLowerCase() === statusFilter.toLowerCase());
    }

    // 2. Filter by Search Term (Case-Insensitive)
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase().trim();
      if (lowercasedTerm) {
        result = result.filter(order => {
          // Check Order ID (ensure it exists and is a string)
          const orderIdMatch = order.orderId && typeof order.orderId === 'string' && order.orderId.toLowerCase().includes(lowercasedTerm);
          // Check User ID (ensure it exists, convert to string)
          const userIdMatch = order.userId && order.userId.toString().toLowerCase().includes(lowercasedTerm);
          // Check Shipping Name (ensure it exists and is a string)
          const shippingNameMatch = order.shippingName && typeof order.shippingName === 'string' && order.shippingName.toLowerCase().includes(lowercasedTerm);
          // Check Customer Email (if available, ensure it exists and is a string) - Add this if your API provides it
          // const emailMatch = order.customerEmail && typeof order.customerEmail === 'string' && order.customerEmail.toLowerCase().includes(lowercasedTerm);

          // Return true if any field matches
          return orderIdMatch || userIdMatch || shippingNameMatch; // || emailMatch;
        });
      }
    }

    // 3. Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const keyA = a[sortConfig.key];
        const keyB = b[sortConfig.key];

        // Handle potential null/undefined values during sorting
        if (keyA == null && keyB == null) return 0;
        if (keyA == null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (keyB == null) return sortConfig.direction === 'asc' ? 1 : -1;

        // Standard comparison
        if (keyA < keyB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (keyA > keyB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0; // Objects are equal based on the key
      });
    }

    return result;
  }, [orders, statusFilter, searchTerm, sortConfig]); // Dependencies for useMemo

  // Reset page number when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm, sortConfig]); // Depend on the inputs to filteredAndSortedOrders

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredAndSortedOrders.length / pageSize);
  const paginatedOrders = useMemo(() => {
    // Memoize paginated results
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedOrders, currentPage, pageSize]);

  // --- Event Handlers ---

  // Handle sorting when table headers are clicked
  const requestSort = (key) => {
    let direction = 'asc';
    // If already sorting by this key ascending, switch to descending
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    // Otherwise, sort ascending by the new key (or the same key if it was descending)
    setSortConfig({ key, direction });
  };

  // Update the temporary selected status for an order
  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses(prev => ({ ...prev, [orderId]: newStatus }));
  };

  // Update order status via API call
  const handleUpdateStatus = async (orderId) => {
    const newStatus = selectedStatuses[orderId];
    const currentOrder = orders.find(o => o.orderId === orderId);

    // Prevent update if status is unchanged, missing, or order not found
    if (!newStatus || !currentOrder || newStatus === currentOrder.status) return;

    setIsUpdating(true); // Indicate loading for this specific action
    try {
      if (!token) throw new Error("Authentication token missing.");

      const headers = { ...getAuthHeader(), 'Content-Type': 'application/json' };
      const response = await fetch(`http://localhost:8000/api/v1/orders/orders/${orderId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: newStatus }), // Assuming API expects { status: 'newStatus' }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      // Update local state on success
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Clear the selected status for this order
      setSelectedStatuses(prev => {
        const { [orderId]: _, ...rest } = prev;
        return rest;
      });

      toast.success(`Order ${orderId.substring(0, 8)}... status updated to ${newStatus}.`);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error(`Status update failed: ${err.message}`);
    } finally {
      setIsUpdating(false); // Stop loading indicator
    }
  };

  // Show confirmation dialog for cancelling an order
  const openCancelDialog = (orderId) => {
    setCancelOrderId(orderId);
    setShowCancelDialog(true);
  };

  // Cancel order via API call
  const handleCancelOrder = async () => {
    if (!cancelOrderId) return;

    setIsUpdating(true); // Indicate loading
    setShowCancelDialog(false); // Close dialog immediately

    try {
      if (!token) throw new Error("Authentication token missing.");

      const headers = getAuthHeader();
      const response = await fetch(`http://localhost:8000/api/v1/orders/orders/${cancelOrderId}/cancel`, {
        method: 'PATCH', // Or POST, depending on your API design
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel order');
      }

      // Update local state on success
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.orderId === cancelOrderId ? { ...order, status: 'cancelled' } : order
        )
      );
      toast.success(`Order ${cancelOrderId.substring(0, 8)}... cancelled successfully.`);
      setCancelOrderId(null); // Clear the target order ID

    } catch (err) {
      console.error("Error cancelling order:", err);
      toast.error(`Cancellation failed: ${err.message}`);
    } finally {
      setIsUpdating(false); // Stop loading indicator
    }
  };

  // --- Helper Functions ---

  // Format currency (INR)
  const formatCurrency = (amount) => {
    // Handle cases where amount might not be a number
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'N/A';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0 // Adjust if you need decimals
    }).format(amount);
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return { date: 'N/A', time: '' };
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) { // Check if date is valid
          return { date: 'Invalid Date', time: ''};
      }
      return {
        date: format(date, 'MMM dd, yyyy'),
        time: format(date, 'h:mm a'),
      };
    } catch (e) {
        console.error("Error formatting date:", e);
        return { date: 'Error', time: ''};
    }
  };


  // --- Render Logic ---

  // 1. Check Admin Role
  if (user?.role !== 'Admin' && !loading && !error) { // Check only after loading and if no other error occurred
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] p-4 text-center">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          You do not have permission to access this page. Please contact an administrator.
        </p>
        <Button onClick={() => navigate('/')} className="flex items-center">
          <Home className="w-4 h-4 mr-2" /> Return to Home
        </Button>
      </div>
    );
  }

  // 2. Initial Loading State (using skeleton)
  if (loading && orders.length === 0) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-500">Loading orders...</p>
          </div>
        </div>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Fetching order data, please wait...</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Use the Skeleton Loader Here */}
            <OrdersTableSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  // 3. Error State
  if (error && !loading) { // Show error only if not currently loading
    return (
      <div className="p-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-4">
            <div className="flex items-center text-red-700">
              <AlertCircle className="h-6 w-6 mr-2" />
              <CardTitle>Error Loading Orders</CardTitle>
            </div>
            <CardDescription className="text-red-600">{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              There was a problem fetching the orders. Please check your connection or try again later.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={fetchOrders} className="mr-2" disabled={loading}>
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

  // --- Helper function to render the actual table content ---
  // This improves readability of the main return statement
  const renderOrdersTable = () => {
    // Show specific loading indicator when updating/cancelling
    if (isUpdating) {
        return (
          <div className="flex items-center justify-center py-10 text-gray-600">
            <Loader2 className="h-6 w-6 text-blue-500 animate-spin mr-3" />
            <span>Processing update...</span>
          </div>
        );
    }

    // Show message if no orders match filters
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
                setStatusFilter('all'); // Reset to 'all' tab
              }}
              className="flex items-center mx-auto"
            >
              <Filter className="h-4 w-4 mr-2" /> Clear Filters & Search
            </Button>
          )}
        </div>
      );
    }

    // Render the table with data
    return (
      <>
        <div className="rounded-md border overflow-x-auto"> {/* Added overflow-x-auto for responsiveness */}
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                {/* Adjusted width and added Customer */}
                <TableHead className="w-[30%] px-4 py-3">
                  <button
                    className="flex items-center font-semibold text-gray-600 hover:text-gray-800"
                    onClick={() => requestSort('orderId')}
                  >
                    Order ID / Customer
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </button>
                </TableHead>
                 {/* Adjusted width */}
                <TableHead className="w-[20%] px-4 py-3">
                  <button
                    className="flex items-center font-semibold text-gray-600 hover:text-gray-800"
                    onClick={() => requestSort('createdAt')}
                  >
                    Date
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </button>
                </TableHead>
                 {/* Adjusted width */}
                <TableHead className="w-[15%] px-4 py-3">
                  <button
                    className="flex items-center font-semibold text-gray-600 hover:text-gray-800"
                    onClick={() => requestSort('totalAmount')}
                  >
                    Amount
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </button>
                </TableHead>
                 {/* Adjusted width */}
                <TableHead className="w-[15%] px-4 py-3 font-semibold text-gray-600">Status</TableHead>
                 {/* Adjusted width and alignment */}
                <TableHead className="w-[20%] text-right px-4 py-3 font-semibold text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map(order => {
                // Defensive check for order object and orderId
                if (!order || !order.orderId) {
                    console.warn("Skipping rendering of invalid order object:", order);
                    return null; // Skip rendering this row if essential data is missing
                }
                const { date, time } = formatDateTime(order.createdAt);
                const customerIdentifier = order.shippingName || (order.userId ? `Customer #${order.userId}` : 'N/A'); // More robust customer display

                return (
                  <TableRow key={order.orderId} className="hover:bg-gray-50/50 transition-colors">
                    {/* Order ID and Customer */}
                    <TableCell className="font-medium px-4 py-3 align-top">
                      <div className="flex flex-col">
                        {/* Display FULL Order ID */}
                        <span className="font-mono text-sm text-gray-800 break-all">{order.orderId}</span>
                         {/* Customer Info */}
                        <span className="text-xs text-gray-500 mt-1 truncate" title={customerIdentifier}>
                            {customerIdentifier}
                        </span>
                      </div>
                    </TableCell>
                    {/* Date and Time */}
                    <TableCell className="px-4 py-3 align-top">
                      <div className="flex flex-col text-sm">
                        <span>{date}</span>
                        <span className="text-xs text-gray-500">{time}</span>
                      </div>
                    </TableCell>
                    {/* Amount */}
                    <TableCell className="font-semibold text-sm px-4 py-3 align-top">
                        {formatCurrency(order.totalAmount)}
                    </TableCell>
                    {/* Status Badge */}
                    <TableCell className="px-4 py-3 align-top">
                      <StatusBadge status={order.status} />
                    </TableCell>
                    {/* Actions */}
                    <TableCell className="text-right px-4 py-3 align-top">
                      <div className="flex items-center justify-end gap-2 flex-wrap"> {/* Added flex-wrap for smaller screens */}
                        {/* Status Update Dropdown (only if not cancelled) */}
                        {order.status !== 'cancelled' && (
                          <div className="flex items-center gap-1">
                            <Select
                              value={selectedStatuses[order.orderId] ?? order.status ?? ''} // Use current status as default
                              onValueChange={(value) => handleStatusChange(order.orderId, value)}
                              disabled={isUpdating} // Disable while any update is processing
                            >
                              <SelectTrigger className="w-[120px] h-9 text-xs">
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
                              // Disable if no status is selected/changed or if an update is ongoing
                              disabled={!selectedStatuses[order.orderId] || selectedStatuses[order.orderId] === order.status || isUpdating}
                              className="h-9 px-3 text-xs"
                            >
                              {isUpdating && selectedStatuses[order.orderId] ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Update'}
                            </Button>
                          </div>
                        )}
                        {/* More Actions Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0" disabled={isUpdating}>
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Order Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* View Details Link */}
                            <DropdownMenuItem
                              onClick={() => navigate(`/orders/${order.orderId}`)} // Example admin detail route
                              className="cursor-pointer text-sm"
                            >
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            {/* Cancel Option (only if not already cancelled) */}
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 mb-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                    // Disable if on the first page
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>

                {/* Generate Page Links (consider limiting shown pages for many pages) */}
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={`page-${i + 1}`}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      // Highlight the current page
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                      aria-current={currentPage === i + 1 ? 'page' : undefined}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                     // Disable if on the last page
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
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

  // 4. Main Content Render
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen"> {/* Added background color */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Link to="/admin/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-700">Manage Orders</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={fetchOrders} variant="outline" disabled={loading || isUpdating}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Orders */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                <h3 className="text-2xl font-bold">{orders.length}</h3>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Pending Orders */}
        <Card>
          <CardContent className="p-5">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-500 mb-1">Pending</p>
                 <h3 className="text-2xl font-bold">
                   {orders.filter(o => o.status === 'pending').length}
                 </h3>
               </div>
               <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                 <Clock className="h-5 w-5 text-yellow-600" />
               </div>
             </div>
          </CardContent>
        </Card>
        {/* Delivered Orders */}
         <Card>
          <CardContent className="p-5">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-500 mb-1">Delivered</p>
                 <h3 className="text-2xl font-bold">
                   {orders.filter(o => o.status === 'delivered').length}
                 </h3>
               </div>
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                 <CheckCircle className="h-5 w-5 text-green-600" />
               </div>
             </div>
          </CardContent>
        </Card>
        {/* Cancelled Orders */}
        <Card>
          <CardContent className="p-5">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-500 mb-1">Cancelled</p>
                 <h3 className="text-2xl font-bold">
                   {orders.filter(o => o.status === 'cancelled').length}
                 </h3>
               </div>
               <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                 <XCircle className="h-5 w-5 text-red-600" />
               </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Orders Card with Tabs and Search */}
      <Card className="shadow-sm"> {/* Added subtle shadow */}
        <CardContent className="p-0"> {/* Remove CardContent padding to let Tabs handle it */}
          <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter} className="w-full">
            {/* Tabs List and Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-1 w-full md:w-auto">
                {/* Adjusted text size and padding */}
                <TabsTrigger value="all" className="text-xs px-2 py-1.5 sm:text-sm sm:px-3 sm:py-1.5">All</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs px-2 py-1.5 sm:text-sm sm:px-3 sm:py-1.5">Pending</TabsTrigger>
                <TabsTrigger value="processing" className="text-xs px-2 py-1.5 sm:text-sm sm:px-3 sm:py-1.5">Processing</TabsTrigger>
                <TabsTrigger value="shipped" className="text-xs px-2 py-1.5 sm:text-sm sm:px-3 sm:py-1.5">Shipped</TabsTrigger>
                <TabsTrigger value="delivered" className="text-xs px-2 py-1.5 sm:text-sm sm:px-3 sm:py-1.5">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled" className="text-xs px-2 py-1.5 sm:text-sm sm:px-3 sm:py-1.5">Cancelled</TabsTrigger>
              </TabsList>

              {/* Search Input */}
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search" // Use type="search" for better semantics and potential clear button
                  placeholder="Search ID, Name, User ID..."
                  className="pl-9 w-full md:w-[250px] lg:w-[300px] h-9 text-sm" // Adjusted padding and size
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loading} // Disable search while initially loading
                />
              </div>
            </div>

            {/* Tab Content Panels */}
            {/* We only need one TabsContent area now, as filtering is handled by useMemo */}
            <TabsContent value={statusFilter} className="mt-0 p-0"> {/* Remove margin, padding handled by renderOrdersTable */}
              {renderOrdersTable()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Cancel Order Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Order Cancellation</DialogTitle>
            <DialogDescription>
              Are you absolutely sure you want to cancel order{' '}
              <strong className="font-mono">{cancelOrderId?.substring(0, 12)}...</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowCancelDialog(false)} disabled={isUpdating}>
              No, Keep Order
            </Button>
            <Button variant="destructive" onClick={handleCancelOrder} disabled={isUpdating} className="flex items-center gap-2">
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