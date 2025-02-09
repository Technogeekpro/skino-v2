'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';

// Demo addresses data
const DEMO_ADDRESSES = [
  {
    id: '1',
    name: 'Arbaz',
    phone: '+91-8879519345',
    pincode: '400043',
    address: 'Smadhan Apt. A wing, Room no 302F',
    locality: 'Malad West',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Home',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Arbaz',
    phone: '+91-8879519345',
    pincode: '400025',
    address: 'Shop No 3, Ground Floor',
    locality: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Office',
    isDefault: false,
  }
];

export default function AddressPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    type: 'Home'
  });

  const handleBack = () => {
    router.back();
  };

  const handleAddressSelect = (selectedAddress: typeof DEMO_ADDRESSES[0]) => {
    // Store selected address in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    }
    router.push('/checkout');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveNewAddress = () => {
    // Validate new address
    const requiredFields = Object.entries(newAddress);
    const emptyFields = requiredFields.filter(([_, value]) => !value.trim());
    
    if (emptyFields.length > 0) {
      toast.error('Please fill in all fields');
      return;
    }

    // Create new address object
    const newAddressObj = {
      ...newAddress,
      id: `${addresses.length + 1}`,
      isDefault: addresses.length === 0
    };

    // Add to addresses list
    setAddresses(prev => [...prev, newAddressObj]);
    setShowNewAddress(false);
    toast.success('Address added successfully');

    // Select the new address if it's the first one
    if (addresses.length === 0) {
      handleAddressSelect(newAddressObj);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-16 px-4">
            <button onClick={handleBack} className="p-2 -ml-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="ml-2 text-lg font-semibold">Select Delivery Address</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-6">
          {/* Left Column - Address List */}
          <div className="md:col-span-7">
            {/* Add New Address Button */}
            <div className="mb-4">
              <button
                onClick={() => setShowNewAddress(true)}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-500 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add New Address
              </button>
            </div>

            {/* Saved Addresses */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-4 py-3 border-b">
                <h2 className="font-medium">Saved Addresses</h2>
                <p className="text-sm text-gray-500">
                  {addresses.length} {addresses.length === 1 ? 'address' : 'addresses'} saved
                </p>
              </div>

              <div className="divide-y">
                {addresses.map((address) => (
                  <div key={address.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium">{address.name}</p>
                            <span className="px-2 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                          <p className="text-sm text-gray-600">{address.locality}</p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button
                        onClick={() => handleAddressSelect(address)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        Deliver Here
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Add New Address Form (Desktop) */}
          <div className="hidden md:block md:col-span-5">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-6">Add New Address</h2>
              <div className="space-y-4">
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                />
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                />
                <Input
                  name="pincode"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={handleInputChange}
                />
                <Input
                  name="address"
                  placeholder="Address (House No, Building, Street)"
                  value={newAddress.address}
                  onChange={handleInputChange}
                />
                <Input
                  name="locality"
                  placeholder="Locality / Area"
                  value={newAddress.locality}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    className={`flex-1 py-2 rounded-lg border ${
                      newAddress.type === 'Home'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                    onClick={() => setNewAddress(prev => ({ ...prev, type: 'Home' }))}
                  >
                    Home
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-lg border ${
                      newAddress.type === 'Office'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                    onClick={() => setNewAddress(prev => ({ ...prev, type: 'Office' }))}
                  >
                    Office
                  </button>
                </div>
                <Button 
                  onClick={handleSaveNewAddress}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Save Address
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile New Address Form Modal */}
      {showNewAddress && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-xl">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Add New Address</h2>
            </div>
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                />
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                />
                <Input
                  name="pincode"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={handleInputChange}
                />
                <Input
                  name="address"
                  placeholder="Address (House No, Building, Street)"
                  value={newAddress.address}
                  onChange={handleInputChange}
                />
                <Input
                  name="locality"
                  placeholder="Locality / Area"
                  value={newAddress.locality}
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="city"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="state"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    className={`flex-1 py-2 rounded-lg border ${
                      newAddress.type === 'Home'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                    onClick={() => setNewAddress(prev => ({ ...prev, type: 'Home' }))}
                  >
                    Home
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-lg border ${
                      newAddress.type === 'Office'
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                    onClick={() => setNewAddress(prev => ({ ...prev, type: 'Office' }))}
                  >
                    Office
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowNewAddress(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveNewAddress}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Save Address
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 