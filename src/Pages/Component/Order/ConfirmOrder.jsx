import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertTriangle, Package as PackageIcon, CalendarDays, MapPin, Hash, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

function OrderConfirmationPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { api, user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   // Fix for the OrderConfirmationPage.jsx useEffect
useEffect(() => {
    const fetchOrder = async () => {
        if (!orderId) {
            setError("Order ID is missing.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Use the correct URL path to match the backend route
            const response = await api.get(`/orders/${orderId}`);
            setOrder(response.data.data);
        } catch (err) {
            console.error("Failed to fetch order:", err);
            const message = err.response?.data?.message || err.message || "Could not load order details.";
            if (err.response?.status === 404) {
                setError(`Order with ID ${orderId} not found.`);
            } else if (err.response?.status === 403) {
                setError("You are not authorized to view this order.");
            } else {
                setError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    fetchOrder();
}, [orderId, api]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600">Loading Order Details...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error Loading Order</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                <div className="text-center mt-6">
                    <Button variant="outline" onClick={() => navigate('/products')}>
                        <ArrowLeft size={16} className="mr-2" /> Back to Shop
                    </Button>
                </div>
            </div>
        );
    }

    if (!order) {
        return <div className="container mx-auto px-4 py-12 text-center text-gray-500">Order details not available.</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gray-50 min-h-screen">
            <div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="max-w-4xl mx-auto shadow-md border-t-4 border-green-500">
                    <CardHeader className="text-center bg-green-50 p-6 rounded-t-lg">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                        <CardTitle className="mt-3 text-2xl font-bold text-gray-800">Order Confirmed!</CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                            Thank you for your purchase, {user?.name || 'Customer'}! Your order details are below.
                        </CardDescription>
                        <p className="text-sm text-gray-500 mt-2 flex items-center justify-center">
                            <Hash size={14} className="mr-1" /> Order ID: <span className="font-mono ml-1">{order.orderId}</span>
                        </p>
                    </CardHeader>

                    <CardContent className="p-6 md:p-8 space-y-6">
                        {/* Order Summary Section */}
                        <div className="border-b pb-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Order Summary</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Order Date:</span>
                                    <span className="font-medium text-gray-800">
                                        {format(new Date(order.createdAt), 'PPP p')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Order Status:</span>
                                    <span className={`font-medium capitalize px-2 py-0.5 rounded text-xs ${
                                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Status:</span>
                                    <span className={`font-medium capitalize px-2 py-0.5 rounded text-xs ${
                                        order.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-700' :
                                        order.deliveryStatus === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                        order.deliveryStatus === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                                        order.deliveryStatus === 'pending' ? 'bg-gray-100 text-gray-700' :
                                        'bg-red-100 text-red-700'
                                    }`}>
                                        {order.deliveryStatus}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Expected Delivery:</span>
                                    <span className="font-medium text-gray-800">
                                        {format(new Date(order.expectedDelivery), 'PPP')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Payment Method:</span>
                                    <span className="font-medium text-gray-800 capitalize">
                                        {order.paymentMethod?.replace('_', ' ') || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 text-base">
                                    <span className="font-semibold text-gray-700">Total Amount:</span>
                                    <span className="font-semibold text-gray-900">
                                        {formatCurrency(order.totalAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Items Ordered Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Items Ordered</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4 p-3 border rounded-md bg-white">
                                    <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded border flex-shrink-0">
                                        <PackageIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-800 truncate">{order.itemnName}</p>
                                        <p className="text-sm text-gray-500">Quantity: {order.itemsQuantity}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                                        {formatCurrency(order.totalAmount)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address Section */}
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Shipping Address</h3>
                            <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-md border">
                                <p className="font-medium text-gray-800">{order.shippingName}</p>
                                <p>{order.shippingAddress}</p>
                                <p>Phone: {order.shippingMobile}</p>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-6 bg-gray-50 rounded-b-lg flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button asChild variant="default" size="lg">
                            <Link to="/products">Continue Shopping</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link to="/orders">View All My Orders</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

export default OrderConfirmationPage;