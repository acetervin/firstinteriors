import React from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { BackButton } from '../components/back-button';

export function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-16 pt-32">
        <BackButton />
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
        <p>
          This Privacy Policy describes how First Interior collects, uses, and discloses your information when you use our website.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as your name, email address, and phone number when you
          contact us or request a service.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, to process your inquiries,
          and to communicate with you.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
        <p>
          We do not share your personal information with third parties except as necessary to provide our services,
          comply with the law, or protect our rights.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
        <p>
          We take reasonable measures to protect your information from unauthorized access, use, or disclosure.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Choices</h2>
        <p>
          You may access, update, or delete your personal information by contacting us.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at info@firstinterior.co.ke.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
