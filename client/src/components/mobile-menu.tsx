import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import logo from '@/assets/logo.jpg';

const navItems = [

  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="custom-md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>

        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="animate-slide-in-right">

          <div className="flex flex-col gap-6 p-6">
            <Link
              href="/"
              className="flex items-center gap-2 animate-fade-in-up opacity-0"
              style={{ animationDelay: '200ms' }}
              onClick={() => setIsOpen(false)}
            >
              <img src={logo} alt="Logo" className="h-10 w-10 rounded-full shadow-md border-2 border-accent/30" />
              <span className="font-extrabold text-xl text-accent tracking-tight">InteriorX</span>
            </Link>
            <nav className="flex flex-col gap-4 pt-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-lg font-medium animate-fade-in-up opacity-0 ${
                    location === item.path ? 'text-accent' : 'text-muted-foreground'
                  }`}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
