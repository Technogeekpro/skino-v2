'use client';

import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            At Skino, we collect information to provide better services to our users. The information we collect includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal information (name, email address, phone number)</li>
            <li>Payment information</li>
            <li>Shipping addresses</li>
            <li>Order history</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process your orders and payments</li>
            <li>Send order confirmations and updates</li>
            <li>Provide customer support</li>
            <li>Improve our services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information.
            Your data is encrypted and stored securely on our servers.
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