'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  Download, 
  ArrowRight,
  Clock,
  Share2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface PaymentDetails {
  status: 'success' | 'failure';
  orderId: string;
  amount: number;
  paymentId?: string;
  errorMessage?: string;
  timestamp: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  address: {
    name: string;
    phone: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export default function PaymentStatus() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch payment details from your backend
    // For demo, we'll use search params and mock data
    const status = searchParams.get('status') || 'success';
    const mockPaymentDetails: PaymentDetails = {
      status: status as 'success' | 'failure',
      orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      amount: 2499,
      paymentId: status === 'success' ? 'pay_' + Math.random().toString(36).substr(2, 9) : undefined,
      errorMessage: status === 'failure' ? 'Transaction declined by bank' : undefined,
      timestamp: new Date().toISOString(),
      items: [
        {
          id: '1',
          name: 'Premium Cotton T-Shirt',
          quantity: 2,
          price: 999,
          image: '/product-1.jpg'
        },
        {
          id: '2',
          name: 'Slim Fit Jeans',
          quantity: 1,
          price: 501,
          image: '/product-2.jpg'
        }
      ],
      address: JSON.parse(localStorage.getItem('selectedAddress') || '{}')
    };

    setPaymentDetails(mockPaymentDetails);
    setIsLoading(false);
  }, [searchParams]);

  const handleBack = () => {
    router.push('/');
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF invoice
    toast.success('Invoice download started');
  };

  const handleShareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Order',
        text: `Check out my order ${paymentDetails?.orderId}`,
        url: window.location.href
      }).catch(() => {
        toast.error('Sharing failed');
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Payment details not found</p>
          <Button onClick={handleBack} className="mt-4">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-16 px-4">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="ml-2">
              <h1 className="text-lg font-semibold">Order Status</h1>
              <p className="text-sm text-gray-500">Order ID: {paymentDetails.orderId}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {paymentDetails.status === 'success' ? (
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold">
                  {paymentDetails.status === 'success' ? 'Payment Successful' : 'Payment Failed'}
                </h2>
                <p className="text-gray-600">
                  {paymentDetails.status === 'success' 
                    ? 'Your order has been placed successfully'
                    : paymentDetails.errorMessage}
                </p>
              </div>
            </div>
            <p className="text-xl font-semibold">₹{paymentDetails.amount.toFixed(2)}</p>
          </div>

          {paymentDetails.status === 'success' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-blue-800">
                Estimated delivery by Tomorrow, 9 PM
              </p>
            </div>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h3 className="font-medium">Order Details</h3>
          </div>
          <div className="divide-y">
            {paymentDetails.items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 space-y-2 bg-gray-50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{paymentDetails.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (18% GST)</span>
              <span>₹{(paymentDetails.amount * 0.18).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total Amount</span>
              <span>₹{(paymentDetails.amount + (paymentDetails.amount * 0.18)).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="font-medium mb-3">Delivery Address</h3>
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">{paymentDetails.address.name}</p>
            <p>{paymentDetails.address.address}</p>
            <p>{paymentDetails.address.locality}</p>
            <p>{paymentDetails.address.city}, {paymentDetails.address.state} - {paymentDetails.address.pincode}</p>
            <p className="mt-1">{paymentDetails.address.phone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {paymentDetails.status === 'success' ? (
            <>
              <Button
                onClick={handleDownloadInvoice}
                className="flex-1 gap-2"
                variant="outline"
              >
                <Download className="w-4 h-4" />
                Download Invoice
              </Button>
              <Button
                onClick={handleShareOrder}
                className="flex-1 gap-2"
                variant="outline"
              >
                <Share2 className="w-4 h-4" />
                Share Order
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => router.push('/checkout')}
                className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Try Again
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleBack}
                className="flex-1"
                variant="outline"
              >
                Return to Home
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 