import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle, 
  Star, 
  Menu, 
  X, 
  ChevronRight,
  Flame,
  Home,
  Heart,
  BookOpen,
  Search,
  Filter,
  Sparkles,
  Sun,
  Moon,
  Baby
} from 'lucide-react';

import bgImg from './assets/spiritual-puja-bg2.jpg';
// IMPORT SERVER_P FROM .ENV FILE
// import {SERVER_IP} from ';

// --- Assets & Constants ---

const SERVER_IP = import.meta.env.VITE_SERVER_IP || 'http://localhost:3000';
console.log("Using SERVER_IP:", SERVER_IP);

// Expanded Database of Poojas
const ALL_POOJAS = [
  {
    id: 'satyanarayan',
    category: 'Puja',
    title: 'Satyanarayan Puja',
    description: 'Bring prosperity and happiness to your home with the divine blessings of Lord Vishnu.',
    price: '₹2,100',
    icon: <BookOpen className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'grihapravesh',
    category: 'Sanskar',
    title: 'Griha Pravesh',
    description: 'Essential housewarming ceremony to purify your new home and invite positive energy.',
    price: '₹5,100',
    icon: <Home className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'havan',
    category: 'Havan',
    title: 'Maha Mrityunjaya Havan',
    description: 'Powerful fire ritual for health, longevity, and removing obstacles from life.',
    price: '₹3,500',
    icon: <Flame className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'marriage',
    category: 'Sanskar',
    title: 'Vivah Sanskar',
    description: 'Complete wedding rituals performed by experienced Vedic Acharyas.',
    price: 'Consult',
    icon: <Heart className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'ganesh',
    category: 'Puja',
    title: 'Ganesh Puja',
    description: 'Remove all obstacles and start new ventures with the blessings of Lord Ganesha.',
    price: '₹1,500',
    icon: <Sparkles className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'navagraha',
    category: 'Havan',
    title: 'Navagraha Shanti',
    description: 'Pacify the nine planets and reduce their malefic effects on your life.',
    price: '₹4,100',
    icon: <Sun className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'namkaran',
    category: 'Sanskar',
    title: 'Namkaran Sanskar',
    description: 'Traditional naming ceremony for your newborn child.',
    price: '₹2,100',
    icon: <Baby className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'kalsarp',
    category: 'Dosha Nivaran',
    title: 'Kaal Sarp Dosh Puja',
    description: 'Special ritual to nullify the effects of Kaal Sarp Dosh in your horoscope.',
    price: '₹3,100',
    icon: <Moon className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'lakshmi',
    category: 'Puja',
    title: 'Maha Lakshmi Puja',
    description: 'Invoking the Goddess of Wealth for financial stability and abundance.',
    price: '₹2,500',
    icon: <Star className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'rudrabhishek',
    category: 'Puja',
    title: 'Rudrabhishek',
    description: 'Sacred bathing of Lord Shiva aimed at fulfilling all desires and attaining peace.',
    price: '₹3,100',
    icon: <Flame className="w-8 h-8 text-orange-600" />
  }
];

// Display only first 4 on the main page
const FEATURED_SERVICES = ALL_POOJAS.slice(0, 4);

const REVIEWS = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai",
    text: "The Acharya arrived on time and the samagri was authentic. A very divine experience right at my home."
  },
  {
    name: "Priya Sharma",
    location: "Bangalore",
    text: "Booking was so easy on PoojaOne. Acharyaji explained the meaning of every mantra during the Griha Pravesh."
  },
  {
    name: "Amit Verma",
    location: "Delhi",
    text: "Highly professional service. They handled everything from setup to cleanup. Highly recommended."
  }
];

// --- Components ---

const ServiceExplorerModal = ({ isOpen, onClose, onBookService }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', ...new Set(ALL_POOJAS.map(p => p.category))];

  const filteredPoojas = ALL_POOJAS.filter(pooja => {
    const matchesSearch = pooja.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || pooja.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6 flex-shrink-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">Explore Divine Services</h2>
              <p className="text-gray-500 text-sm">Find the perfect ritual for your needs</p>
            </div>
            <button onClick={onClose} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for a Puja, Havan or Sanskar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                      ? 'bg-orange-600 text-white shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoojas.length > 0 ? (
              filteredPoojas.map((pooja) => (
                <div key={pooja.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
                      {pooja.icon}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                      {pooja.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{pooja.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow">{pooja.description}</p>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-orange-600 text-lg">{pooja.price}</span>
                    <button 
                      onClick={() => onBookService(pooja.title)}
                      className="bg-gray-900 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <Filter size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg">No services found matching your search.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                  className="mt-4 text-orange-600 font-medium hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ isOpen, onClose, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: preselectedService || 'General Puja',
    date: '',
    locationType: 'detect', // 'detect' or 'manual'
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update service if prop changes
  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd convert coords to address here
          setFormData(prev => ({ 
            ...prev, 
            address: `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)} (Auto-detected)` 
          }));
        },
        () => {
          alert("Could not detect location. Please enter manually.");
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Submitting booking:", formData);
    try {
      // POST request to the backend
      const response = await fetch(`${SERVER_IP}/api/email/send-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log("Server response:", response);
      

      if (response.ok) {
        setIsSuccess(true);
        // Reset after showing success message
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormData({
            name: '',
            phone: '',
            service: 'General Puja',
            date: '',
            locationType: 'manual',
            address: ''
          });
        }, 3000);
      } else {
        console.error("Server responded with error", response.status);
        alert("Booking failed. Please try again or contact support.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Unable to connect to the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
        
        {/* Header */}
        <div className="bg-orange-600 p-6 flex justify-between items-center text-white">
          <h2 className="text-2xl font-serif font-bold">Book Divine Blessings</h2>
          <button onClick={onClose} className="hover:bg-orange-700 p-1 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center py-10">
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600">Our Acharya will contact you shortly to confirm the details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Puja / Service Required</label>
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition bg-white"
                >
                  <option value="General Puja">General Puja</option>
                  {ALL_POOJAS.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Devotee Name"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required
                    type="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <button 
                    type="button"
                    onClick={handleLocationDetect}
                    className="text-xs text-orange-600 font-semibold hover:underline flex items-center"
                  >
                    <MapPin size={12} className="mr-1" /> Use Current Location
                  </button>
                </div>
                <textarea 
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address where the Puja will be performed..."
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg shadow-lg transform transition active:scale-95 flex justify-center items-center"
              >
                {isSubmitting ? (
                  <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                ) : null}
                {isSubmitting ? 'Scheduling...' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

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

const Hero = ({ onBookNow }) => (
  <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#FFF8F0]">
    {/* Decorative Background Elements (Soft Gradients) */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

    <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="text-center md:text-left">
        <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-bold mb-6 animate-fade-in border border-orange-200">
          ★ #1 Trusted Online Acharya Service
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6 text-gray-900 drop-shadow-sm">
          Bring Divine Blessings <br/>
          <span className="text-orange-600">To Your Doorstep</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
          Book experienced Vedic Acharyas for Pujas, Havans, and Sanskars performed at your home. Authentic rituals, hassle-free booking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button 
            onClick={() => onBookNow()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center justify-center"
          >
            Book Pooja <ChevronRight className="ml-2" />
          </button>
          <a 
            href="#services"
            className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition flex items-center justify-center border border-gray-200"
          >
            View Services
          </a>
        </div>
      </div>

      {/* Right Image (Desktop Only) */}
      <div className="hidden md:block relative">
        {/* <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500"> */}
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform">
             <img 
              src={bgImg} 
              alt="Divine Puja Setting" 
              className="w-full h-auto object-cover max-h-[500px]"
             />
        </div>
        {/* Decorative border behind image */}
        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-orange-200 rounded-3xl z-0"></div>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-6 bg-orange-50 rounded-xl hover:bg-white hover:shadow-lg transition duration-300 border border-transparent hover:border-orange-100">
    <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-orange-600">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const App = () => {
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isExplorerOpen, setExplorerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openBooking = (serviceName = '') => {
    setSelectedService(serviceName);
    setBookingModalOpen(true);
    // Close explorer if it's open
    if (isExplorerOpen) setExplorerOpen(false);
  };

  return (
    <div className="font-sans text-gray-900 bg-white">
      <Navbar onBookNow={() => openBooking()} />
      
      <Hero onBookNow={() => openBooking()} />

      {/* Trust Indicators */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '5000+', label: 'Pujas Performed' },
              { num: '100+', label: 'Vedic Acharyas' },
              { num: '4.9/5', label: 'Customer Rating' },
              { num: '100%', label: 'Satisfaction' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl font-bold text-orange-600 mb-1">{stat.num}</p>
                <p className="text-gray-500 text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Our Divine Services</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of Vedic rituals performed by experienced Acharyas at your home, office, or factory.
            </p>
          </div>

          {/* Featured Services Grid - Improved Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {FEATURED_SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group border border-gray-100 flex flex-col h-full">
                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-6 bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-orange-600 font-bold">{service.price}</span>
                    <button 
                      onClick={() => openBooking(service.title)}
                      className="text-sm font-semibold text-gray-900 hover:text-orange-600 flex items-center transition"
                    >
                      Book Pooja <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
               onClick={() => setExplorerOpen(true)}
               className="inline-flex items-center bg-white border-2 border-orange-600 text-orange-600 font-bold py-3 px-8 rounded-full hover:bg-orange-50 transition transform hover:-translate-y-0.5 shadow-sm"
            >
              See All Services <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-orange-100 rounded-full blur-3xl opacity-30 transform -translate-x-10"></div>
               <img 
                src="https://images.unsplash.com/photo-1621262844888-842279b47e5b?q=80&w=1000&auto=format&fit=crop" 
                alt="Acharya performing puja" 
                className="relative rounded-2xl shadow-2xl z-10 w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Verified Acharyas</p>
                    <p className="text-xs text-gray-500">Only experienced Vedic scholars</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
                Why Devotees Trust <span className="text-orange-600">PoojaOne</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We understand the sanctity of your rituals. That's why we ensure every Puja is performed with utmost devotion, purity, and adherence to Vedic traditions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FeatureCard 
                  icon={<User size={24} />} 
                  title="Qualified Acharyas" 
                  desc="Experienced Acharyas from Vedic Pathshalas." 
                />
                <FeatureCard 
                  icon={<CheckCircle size={24} />} 
                  title="Samagri Included" 
                  desc="We can bring all authentic puja materials required." 
                />
                <FeatureCard 
                  icon={<MapPin size={24} />} 
                  title="At Your Home" 
                  desc="Comfort of your home, sanctity of a temple." 
                />
                <FeatureCard 
                  icon={<Star size={24} />} 
                  title="Transparent Pricing" 
                  desc="No hidden costs. Dakshina fixed beforehand." 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-20 bg-orange-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16">How PoojaOne Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-orange-700 -translate-y-1/2 z-0"></div>

            {[
              { step: 1, title: 'Select Puja', desc: 'Choose the ritual you wish to perform.' },
              { step: 2, title: 'Enter Details', desc: 'Provide your location and preferred date.' },
              { step: 3, title: 'Acharya Arrives', desc: 'Acharya performs the puja at your place.' }
            ].map((item) => (
              <div key={item.step} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg border-4 border-orange-800">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-orange-200 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => openBooking()}
            className="mt-16 bg-white text-orange-900 hover:bg-orange-50 px-8 py-4 rounded-lg font-bold shadow-lg transition transform hover:-translate-y-1"
          >
            Schedule a Puja Now
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">What Our Devotees Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-400">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Flame className="text-orange-600" size={24} fill="currentColor" />
                <span className="text-2xl font-serif font-bold">PoojaOne.in</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Your trusted partner for all Vedic rituals and spiritual services. Connecting you with the divine, right at your home.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-orange-500 transition">Home</a></li>
                <li><a href="#services" className="hover:text-orange-500 transition">Services</a></li>
                <li><a href="#process" className="hover:text-orange-500 transition">How it works</a></li>
                <li><a href="#" className="hover:text-orange-500 transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><Phone size={16} className="mr-2" /> +91 98765 43210</li>
                <li className="flex items-center"><MapPin size={16} className="mr-2" /> Bangalore, India</li>
                <li className="flex items-center"><User size={16} className="mr-2" /> support@poojaone.in</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PoojaOne.in. All rights reserved. Shubh Labh.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        preselectedService={selectedService}
      />

      <ServiceExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setExplorerOpen(false)}
        onBookService={openBooking}
      />
    </div>
  );
};

export default App;