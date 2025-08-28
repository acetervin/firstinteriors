import { Phone, MessageSquare } from 'lucide-react';

const FloatingActionButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/+254723851318"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={24} />
      </a>
      <a
        href="tel:+254723851318"
        className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingActionButtons;
