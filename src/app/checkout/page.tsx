'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  LockKeyhole, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp, 
  Wallet, 
  CreditCard, 
  IndianRupee, 
  Banknote,
  MapPin,
  Clock,
  ArrowRight,
  Info,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  type: string;
  isDefault: boolean;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
  method?: string;
  upi?: {
    flow: string;
    app?: string;
  };
  handler?: (response: any) => void;
}

export default function Checkout() {
  const router = useRouter();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'cod' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [isUPIExpanded, setIsUPIExpanded] = useState(true);
  const [isCODExpanded, setIsCODExpanded] = useState(false);
  const [partialCODAmount, setPartialCODAmount] = useState<number>(0);
  const [showPartialCOD, setShowPartialCOD] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if Razorpay is loaded
    const checkRazorpayLoaded = () => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        setIsRazorpayLoaded(true);
      }
    };

    // Check immediately
    checkRazorpayLoaded();

    // Also check after a delay to ensure script has time to load
    const timeoutId = setTimeout(checkRazorpayLoaded, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Load selected address from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAddress = localStorage.getItem('selectedAddress');
      if (savedAddress) {
        setSelectedAddress(JSON.parse(savedAddress));
      }
    }
  }, []);

  // Use a useEffect hook to handle redirection if the cart is empty.
  useEffect(() => {
    if (items.length === 0) {
      router.push('/');
    }
  }, [items, router]);

  const handleBack = () => {
    router.back();
  };

  const handlePayment = async () => {
    try {
      // Validate selected payment method
      if (!selectedPayment) {
        toast.error('Please select a payment method');
        return;
      }

      // Validate address
      if (!selectedAddress) {
        toast.error('Please select a delivery address');
        return;
      }

      if (!window.Razorpay) {
        toast.error('Payment system is still loading. Please try again in a moment.');
        return;
      }

      setIsProcessing(true);

      // Calculate final amount with tax
      const finalAmount = Math.round((total + (total * 0.18)) * 100); // Convert to paise

      // Handle UPI deep linking for mobile devices - only check on client side
      const isMobile = typeof window !== 'undefined' ? /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent) : false;
      const selectedUpiApp = upiOptions.find(opt => opt.selected)?.id || '';

      // Initialize Razorpay
      const options: RazorpayOptions = {
        key: 'rzp_test_0mLlfaaHmhIP7R',
        amount: finalAmount,
        currency: 'INR',
        name: 'Skino Store',
        description: 'Purchase from Skino',
        image: '/logo.svg',
        prefill: {
          name: selectedAddress.name,
          email: '', // Add email field to Address interface if needed
          contact: selectedAddress.phone
        },
        theme: {
          color: '#47126B'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          }
        },
        handler: function(response: any) {
          // This is called on successful payment
          console.log('Payment successful:', response);
          setIsProcessing(false);
          toast.success('Payment successful!');
          router.push(`/payment-status?status=success&paymentId=${response.razorpay_payment_id}`);
        }
      };

      // Add UPI specific options for mobile
      if (isMobile && selectedPayment === 'upi') {
        options.method = 'upi';
        options.upi = {
          flow: 'intent'
        };

        // Add deep linking based on selected UPI app
        switch (selectedUpiApp) {
          case 'google-pay':
            options.upi.app = 'gpay';
            break;
          case 'phonepe':
            options.upi.app = 'phonepe';
            break;
          case 'paytm':
            options.upi.app = 'paytm';
            break;
          // Default to no specific app for 'other-upi'
        }
      }

      const razorpay = new window.Razorpay(options);

      // Handle payment failure
      razorpay.on('payment.failed', function(response: any) {
        console.error('Payment failed:', response.error);
        setIsProcessing(false);
        toast.error(response.error.description || 'Payment failed. Please try again.');
        router.push(`/payment-status?status=failure&error=${encodeURIComponent(response.error.description)}`);
      });

      // Handle any unexpected errors
      razorpay.on('payment.error', function(error: any) {
        console.error('Payment error:', error);
        setIsProcessing(false);
        toast.error('An unexpected error occurred');
      });

      razorpay.open();
    } catch (error) {
      console.error('Error initializing payment:', error);
      setIsProcessing(false);
      toast.error('Something went wrong. Please try again.');
    }
  };

  // Updated UPI options with payment icons from the payment-icons folder
  const [upiOptions, setUpiOptions] = useState([
    { 
      id: 'google-pay', 
      name: 'Google Pay', 
      icon: <Image src="/payment-icons/g-pay.png" alt="Google Pay" width={32} height={32} />,
      selected: false 
    },
    { 
      id: 'phonepe', 
      name: 'PhonePe', 
      icon: <Image src="/payment-icons/phonepe.png" alt="PhonePe" width={32} height={32} />,
      selected: false 
    },
    { 
      id: 'paytm', 
      name: 'Paytm', 
      icon: <Image src="/payment-icons/paytm.png" alt="Paytm" width={32} height={32} />,
      selected: false 
    },
    { 
      id: 'other-upi', 
      name: 'Other UPI', 
      icon: <Image src="/payment-icons/upi.png" alt="Other UPI" width={32} height={32} />,
      selected: false 
    },
  ]);

  const handleUpiSelection = (selectedId: string) => {
    setUpiOptions(prev => prev.map(option => ({
      ...option,
      selected: option.id === selectedId
    })));
    setSelectedPayment('upi');
  };

  const handleAddressChange = () => {
    router.push('/checkout/address');
  };

  const calculateRemainingOnline = () => {
    const totalWithTax = total + (total * 0.18);
    return totalWithTax - partialCODAmount;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Redirecting...
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
              <h1 className="text-lg font-semibold">Checkout</h1>
              <p className="text-sm text-gray-500">Total: ₹{(total + (total * 0.18)).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</div>
              <span className="ml-2 text-blue-600 font-medium">Address</span>
            </div>
            <div className="h-0.5 w-12 bg-gray-200" />
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</div>
              <span className="ml-2 text-blue-600 font-medium">Payment</span>
            </div>
            <div className="h-0.5 w-12 bg-gray-200" />
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">3</div>
              <span className="ml-2 text-gray-400">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8">
            {/* Savings Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-lg flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-700 text-sm font-medium">
                  You save <span className="font-bold">₹{(total * 0.18).toFixed(2)}</span>
                </p>
              </div>
              <Info className="w-4 h-4 text-green-600" />
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm mb-4" onClick={handleAddressChange}>
              <div className="px-4 py-4 border-b border-dashed">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-600 mr-2" />
                    <h2 className="font-medium">Delivery Address</h2>
                  </div>
                  <button className="text-blue-600 text-sm font-medium flex items-center">
                    Change
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                {selectedAddress ? (
                  <div className="pl-7">
                    <p className="font-medium text-gray-900">{selectedAddress.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{selectedAddress.address}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.locality}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.phone}</p>
                  </div>
                ) : (
                  <div className="pl-7">
                    <p className="text-sm text-gray-600">Please select a delivery address</p>
                  </div>
                )}
              </div>
              <div className="px-4 py-3 flex items-center justify-between bg-blue-50">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800">Estimated delivery by Tomorrow, 9 PM</span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white rounded-lg shadow-sm">
              {/* UPI Section */}
              <div className="border-b">
                <button
                  onClick={() => setIsUPIExpanded(!isUPIExpanded)}
                  className="w-full px-4 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">UPI Payment</p>
                      <p className="text-sm text-gray-500">Pay using any UPI app</p>
                    </div>
                  </div>
                  {isUPIExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {isUPIExpanded && (
                  <div className="px-4 pb-4">
                    {/* Error Message */}
                    <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-100">
                      <p className="text-sm text-red-600 flex items-center">
                        <Info className="w-4 h-4 mr-2" />
                        Some UPI options are temporarily unavailable
                      </p>
                    </div>

                    {/* UPI Options */}
                    <div className="grid grid-cols-4 gap-4">
                      {upiOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleUpiSelection(option.id)}
                          className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                            option.selected 
                              ? 'border-blue-500 bg-blue-50 shadow-sm' 
                              : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                          }`}
                        >
                          <div className="mb-2 relative w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                            {option.icon}
                          </div>
                          <span className="text-xs text-center font-medium">{option.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Cash on Delivery */}
              <div>
                <button
                  onClick={() => setIsCODExpanded(!isCODExpanded)}
                  className="w-full px-4 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Cash On Delivery</p>
                      <p className="text-sm text-gray-500">Pay at your doorstep</p>
                    </div>
                  </div>
                  {isCODExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {isCODExpanded && (
                  <div className="px-4 pb-4">
                    <div className="space-y-4">
                      {/* Full COD Option */}
                      <label className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:border-green-200 hover:bg-green-50/50">
                        <input
                          type="radio"
                          name="cod-type"
                          checked={!showPartialCOD}
                          onChange={() => setShowPartialCOD(false)}
                          className="w-4 h-4 text-green-600"
                        />
                        <div className="ml-3">
                          <p className="font-medium">Full Amount on Delivery</p>
                          <p className="text-sm text-gray-500">₹{(total + (total * 0.18)).toFixed(2)}</p>
                        </div>
                      </label>

                      {/* Partial COD Option */}
                      <label className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:border-green-200 hover:bg-green-50/50">
                        <input
                          type="radio"
                          name="cod-type"
                          checked={showPartialCOD}
                          onChange={() => setShowPartialCOD(true)}
                          className="w-4 h-4 text-green-600"
                        />
                        <div className="ml-3 flex-1">
                          <p className="font-medium">Partial Payment on Delivery</p>
                          <p className="text-sm text-gray-500">Split your payment into online and cash</p>
                        </div>
                      </label>

                      {/* Partial COD Amount Input */}
                      {showPartialCOD && (
                        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Amount to pay on delivery</p>
                            <Input
                              type="number"
                              value={partialCODAmount}
                              onChange={(e) => setPartialCODAmount(Number(e.target.value))}
                              className="w-32 text-right"
                              placeholder="Enter amount"
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Amount to pay online</span>
                            <span className="font-medium">₹{calculateRemainingOnline().toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* More Payment Options */}
              <button className="w-full px-4 py-4 flex items-center justify-between border-t hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">More Payment Options</p>
                    <p className="text-sm text-gray-500">Cards, NetBanking & More</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm sticky top-24">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Order Summary</h2>
                  <span className="text-sm text-gray-500">{items.length} items</span>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (18% GST)</span>
                  <span>₹{(total * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total Amount</span>
                  <span>₹{(total + (total * 0.18)).toFixed(2)}</span>
                </div>

                {/* Desktop Payment Button */}
                <div className="hidden lg:block pt-4">
                  <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium flex items-center justify-center"
                    disabled={isProcessing}
                  >
                    <LockKeyhole className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Processing...' : `Pay ₹${(total + (total * 0.18)).toFixed(2)}`}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Secure payment powered by Razorpay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:hidden">
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-medium flex items-center justify-center"
          disabled={isProcessing}
        >
          <LockKeyhole className="w-4 h-4 mr-2" />
          {isProcessing ? 'Processing...' : `Pay ₹${(total + (total * 0.18)).toFixed(2)}`}
        </button>
        <p className="text-xs text-center text-gray-500 mt-2">
          Secure payment powered by Razorpay
        </p>
      </div>

      {/* Spacer for bottom button on mobile */}
      <div className="h-24 lg:hidden" />
    </div>
  );
} 