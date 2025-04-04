
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bolt, Menu, X, LogIn, LayoutDashboard } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Book a Ride', path: '/booking' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'glass py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold"
        >
          <Bolt className="h-6 w-6 text-volt-600" />
          <span className="text-foreground">VoltRide</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-volt-600',
                location.pathname === link.path 
                  ? 'text-volt-600' 
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/signin">
            <Button variant="outline" className="border-volt-600 text-volt-600 hover:bg-volt-50 mr-2">
              <LogIn className="mr-1 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          
          <Link to="/signin?tab=signup">
            <Button className="bg-volt-600 hover:bg-volt-700 text-white rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-transform md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full pt-20 p-6 space-y-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-lg font-medium p-2 transition-colors',
                location.pathname === link.path 
                  ? 'text-volt-600' 
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <Link to="/signin" className="p-2">
            <Button variant="outline" className="border-volt-600 text-volt-600 hover:bg-volt-50 w-full mb-2">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </Link>
          
          <Link to="/signin?tab=signup">
            <Button className="bg-volt-600 hover:bg-volt-700 text-white rounded-full w-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
