'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RootState } from '@/redux/store';
import { updateQuantity, removeFromCart } from '@/redux/features/cartSlice';
import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, total } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white z-50 w-[90%] md:w-[400px] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart ({items.length})</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <Image
              src="/empty-cart.svg"
              alt="Empty Cart"
              width={150}
              height={150}
              className="mb-4 opacity-50"
            />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 330px)' }}>
              {/* Main Cart Items */}
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-white rounded-lg p-3 border">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-sm font-semibold mt-1">₹{item.price.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded border border-gray-300 hover:bg-gray-100"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded border border-gray-300 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* You might also like section */}
              <div className="border-t px-4 py-3">
                <h3 className="font-medium mb-3">You might also like</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Add suggested products here */}
                </div>
              </div>
            </div>

            {/* Footer with Total and Checkout */}
            <div className="border-t bg-white">
              {/* Savings Info */}
              <div className="p-4 bg-green-50 border-b">
                <p className="text-green-600 text-sm font-medium">
                  Your total savings 🎉 ₹{(total * 0.1).toFixed(2)}
                </p>
              </div>
              
              {/* Total and Checkout */}
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total Payable</p>
                    <p className="text-xs text-gray-500">MRP Inclusive of all taxes</p>
                  </div>
                  <span className="text-lg font-bold">₹{total.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full bg-[#47126B] hover:bg-[#571c80] text-white py-6 rounded-none"
                  onClick={handleCheckout}
                >
                  CHECKOUT
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
} 