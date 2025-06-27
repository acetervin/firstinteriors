import React from 'react';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import { BackButton } from '../components/back-button';

export function TermsOfService() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 py-16 pt-32">
        <BackButton />
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
        <p>
          Welcome to First Interior. These Terms of Service govern your use of our website and services.
          By accessing or using our website, you agree to be bound by these Terms and all terms incorporated by reference.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By using our services, you agree to these terms. If you do not agree, do not use our services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Your continued use after changes constitutes acceptance.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Privacy Policy</h2>
        <p>
          Please refer to our Privacy Policy for information on how we collect, use, and disclose information from our users.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h2>
        <p>
          You agree not to use the website for any unlawful purpose or in any way that might harm, abuse, or otherwise
          interfere with the website or our services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and images, is our property or the property of our licensors
          and is protected by intellectual property laws.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Disclaimers</h2>
        <p>
          Our services are provided "as is" without any warranties, express or implied. We do not guarantee the accuracy,
          completeness, or usefulness of any information on the site.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
        <p>
          We will not be liable for any damages arising from your use of our website or services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
        <p>
          These Terms are governed by the laws of Kenya.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at info@firstinterior.co.ke.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
