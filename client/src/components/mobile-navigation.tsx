import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import logo from '@/assets/logo.jpg';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 bg-white/80 shadow-lg backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto mr-2 rounded-full shadow" />
        </Link>
        {/* Desktop Center Menu */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-2 bg-white/70 rounded-full px-6 py-2 shadow-sm backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                aria-current={location === item.path ? 'page' : undefined}
                className={`text-base font-medium text-foreground px-3 py-1 rounded-full hover:bg-accent/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  location === item.path ? 'bg-accent/20 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-start pt-24 md:hidden transition-all">
          <div className="bg-white rounded-2xl shadow-lg w-11/12 max-w-xs mx-auto p-6 flex flex-col gap-4 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block text-lg font-medium px-4 py-3 rounded-xl text-center hover:bg-accent/10 transition-colors ${
                  location === item.path ? 'bg-accent/20 font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
