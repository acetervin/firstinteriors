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
    // Scroll lock for mobile menu
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
        <Link href="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full shadow-md border-2 border-accent/30 group-hover:scale-105 transition-transform" />
          <span className="font-extrabold text-xl text-accent tracking-tight hidden sm:inline">InteriorX</span>
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
        {/* Mobile Hamburger */}
        <button
          className="custom-md:hidden p-2 rounded-full hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-all duration-300 custom-md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
        style={{background: 'rgba(255,255,255,0.98)'}}
      >
        <div className={`absolute top-0 right-0 w-full max-w-xs sm:max-w-sm h-full shadow-2xl rounded-l-3xl p-8 flex flex-col gap-8 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{minWidth: '80vw', background: 'transparent'}}>
          <button
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <ul className="flex flex-col gap-6 mt-16">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  aria-current={location === item.path ? 'page' : undefined}
                  className={`block text-lg font-semibold px-4 py-2 rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                    location === item.path ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:bg-accent/5 hover:text-accent/80'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-8 px-5 py-3 rounded-full bg-accent text-white font-bold shadow-lg hover:bg-accent/90 transition-colors text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
