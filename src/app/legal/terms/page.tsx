'use client';

import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Skino's services, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
          <p className="mb-4">
            You agree to use our services only for lawful purposes and in accordance with these Terms.
            You are prohibited from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Using the service for any illegal purpose</li>
            <li>Attempting to gain unauthorized access to our systems</li>
            <li>Interfering with other users' access to the service</li>
            <li>Submitting false or misleading information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Product Information</h2>
          <p className="mb-4">
            We strive to provide accurate product descriptions and pricing. However, we reserve the right
            to correct any errors and to change or update information at any time without prior notice.
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