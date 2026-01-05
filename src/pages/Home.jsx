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
  Home as HomeIcon,
  Search,
  Filter,
  Flame,
  Heart,
  Sparkles,
  Sun,
  Baby,
  Moon,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import bgImg from '../assets/spiritual-puja-bg2.jpg';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import BookingModal from '../components/BookingModal.jsx';
import ServiceExplorerModal from '../components/ServiceExplorerModal.jsx';


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
    icon: <HomeIcon className="w-8 h-8 text-orange-600" />
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
const Home = () => {
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
        ALL_POOJAS={ALL_POOJAS}
      />

      <ServiceExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setExplorerOpen(false)}
        onBookService={openBooking}
      />
    </div>
  );
};

export default Home;
