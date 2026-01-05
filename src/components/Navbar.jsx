import React, { useState, useEffect } from 'react';
import { Flame, Menu, X } from 'lucide-react';


const Navbar = ({ onBookNow }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-orange-600 text-white p-2 rounded-lg">
            <Flame size={24} fill="currentColor" />
          </div>
          <span className="text-2xl font-serif font-bold text-gray-900">
            Pooja<span className="text-orange-600">One</span>.in
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Services', 'Process', 'Reviews'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-medium text-gray-700 hover:text-orange-600 transition"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={() => onBookNow()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition transform hover:-translate-y-0.5"
          >
            Book Pooja
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className="text-gray-900" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4">
          {['Home', 'Services', 'Process', 'Reviews'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-gray-800 font-medium py-2 border-b border-gray-100"
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
            className="bg-orange-600 text-white w-full py-3 rounded-lg font-bold"
          >
            Book Pooja Now
          </button>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
