import { Link } from 'wouter';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="custom-footer-sections">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-accent">First Interior</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Transforming spaces with premium interior design solutions that blend luxury with functionality.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a 
                href="https://www.facebook.com/firstinterior" 
                className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/firstinterior" 
                className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/firstinterior" 
                className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Navigation</h4>
            <ul className="text-sm sm:text-base space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-300">About</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent transition-colors duration-300">Services</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent transition-colors duration-300">Portfolio</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Company</h4>
            <ul className="text-sm sm:text-base space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors duration-300">Our Team</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent transition-colors duration-300">Portfolio</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-accent transition-colors duration-300">Careers</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors duration-300">Blog</Link>
              </li>
            </ul>
          </div>

           <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="text-sm sm:text-base space-y-2 text-muted-foreground">
              <li>Doonholm, Nairobi</li>
              <li>Kenya</li>
              <li>+254 723 851 318</li>
              <li>+254 792 404 484</li>
              <li>info@firstinterior.co.ke</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p className="text-xs sm:text-sm">&copy; 2025 First Interior. All rights reserved. | <Link href="/privacy-policy" className="hover:text-accent">Privacy Policy</Link> | <Link href="/terms-of-service" className="hover:text-accent">Terms of Service</Link></p>
        </div>
      </div>
    </footer>
  );
}
