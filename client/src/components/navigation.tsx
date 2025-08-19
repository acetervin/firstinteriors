import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import logo from '@/assets/FIRST INTERIORS DESIGNS.png';
import { MobileMenu } from './mobile-menu';

export function Navigation() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Scroll lock for mobile menu
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 shadow-xl border-b border-accent/10 backdrop-blur-lg' : 'bg-white/60 backdrop-blur-md'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img src={logo} alt="Logo" className="h-16 w-auto shadow-md group-hover:scale-105 transition-transform" />
        </Link>
        {/* Desktop Nav */}
        <div className="hidden custom-md:flex flex-1 items-center justify-center">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  aria-current={location === item.path ? 'page' : undefined}
                  className={`relative px-2 py-1 font-semibold text-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                    location === item.path
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-accent/80'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-0.5 rounded bg-accent transition-all duration-300 ${
                      location === item.path ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* CTA Button (Desktop) */}
        <div className="hidden custom-md:flex items-center">
          <Link
            href="/contact"
            className="ml-6 px-5 py-2 rounded-full bg-accent text-white font-bold shadow-lg hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Get in Touch
          </Link>
        </div>
        {/* Mobile Nav */}
        <div className="custom-md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
