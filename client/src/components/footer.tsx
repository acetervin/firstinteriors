import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary-custom text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-accent-custom">First Interior</h3>
            <p className="text-gray-300 mb-4">
              Transforming spaces with premium interior design solutions that blend luxury with functionality.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-accent-custom/20 rounded-lg flex items-center justify-center hover:bg-accent-custom transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-accent-custom/20 rounded-lg flex items-center justify-center hover:bg-accent-custom transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-accent-custom/20 rounded-lg flex items-center justify-center hover:bg-accent-custom transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  Residential Design
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  Commercial Spaces
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  Space Planning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  Design Consultation
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  Project Management
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="hover:text-accent-custom transition-colors duration-300"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-accent-custom transition-colors duration-300">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-custom transition-colors duration-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Westlands, Nairobi</li>
              <li>Kenya</li>
              <li>+254 700 123 456</li>
              <li>info@firstinterior.co.ke</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 First Interior. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
