'use client';

import { Button } from "@/components/ui/button";

export default function ShippingPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Shipping Methods</h2>
          <p className="mb-4">
            We offer various shipping methods to meet your needs:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Standard Shipping (5-7 business days)</li>
            <li>Express Shipping (2-3 business days)</li>
            <li>Next Day Delivery (order before 2 PM)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Shipping Costs</h2>
          <p className="mb-4">
            Shipping costs are calculated based on:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Order value</li>
            <li>Shipping destination</li>
            <li>Selected shipping method</li>
            <li>Package weight and dimensions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Order Tracking</h2>
          <p className="mb-4">
            Once your order is shipped, you will receive a confirmation email with tracking information.
            You can track your order status through our website or the carrier's tracking system.
          </p>
        </section>

        <div className="mt-8">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
} 