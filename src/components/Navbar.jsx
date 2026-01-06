import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/poojaone-full-logo.png';


const Navbar = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2 md:py-3' : 'bg-transparent py-6 md:py-6'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="PoojaOne" 
            className="h-10 md:h-14 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Services', 'Process', 'Reviews'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-medium text-text-muted hover:text-brand transition"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => onBookNow()}
            className="bg-gradient-to-b from-[#E07A2F] to-brand hover:from-brand hover:to-brand-dark text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Book Pooja
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className="text-text" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface shadow-lg py-4 px-6 flex flex-col space-y-4">
          {['Home', 'Services', 'Process', 'Reviews'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-text font-medium py-2 border-b border-border"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBookNow();
            }}
            className="bg-gradient-to-b from-[#E07A2F] to-brand hover:from-brand hover:to-brand-dark text-white w-full py-3 rounded-lg font-bold transition-all duration-300"
          >
            Book Pooja Now
          </button>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
