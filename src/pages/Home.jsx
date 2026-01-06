import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
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
import logo from '../assets/logo.png';
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
    icon: <BookOpen className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop'
  },
  {
    id: 'grihapravesh',
    category: 'Sanskar',
    title: 'Griha Pravesh',
    description: 'Essential housewarming ceremony to purify your new home and invite positive energy.',
    price: '₹5,100',
    icon: <HomeIcon className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop'
  },
  {
    id: 'havan',
    category: 'Havan',
    title: 'Maha Mrityunjaya Havan',
    description: 'Powerful fire ritual for health, longevity, and removing obstacles from life.',
    price: '₹3,500',
    icon: <Flame className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=400&h=300&fit=crop'
  },
  {
    id: 'marriage',
    category: 'Sanskar',
    title: 'Vivah Sanskar',
    description: 'Complete wedding rituals performed by experienced Vedic Acharyas.',
    price: 'Consult',
    icon: <Heart className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop'
  },
  {
    id: 'ganesh',
    category: 'Puja',
    title: 'Ganesh Puja',
    description: 'Remove all obstacles and start new ventures with the blessings of Lord Ganesha.',
    price: '₹1,500',
    icon: <Sparkles className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?w=400&h=300&fit=crop'
  },
  {
    id: 'navagraha',
    category: 'Havan',
    title: 'Navagraha Shanti',
    description: 'Pacify the nine planets and reduce their malefic effects on your life.',
    price: '₹4,100',
    icon: <Sun className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1518803194621-27188ba362c9?w=400&h=300&fit=crop'
  },
  {
    id: 'namkaran',
    category: 'Sanskar',
    title: 'Namkaran Sanskar',
    description: 'Traditional naming ceremony for your newborn child.',
    price: '₹2,100',
    icon: <Baby className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=300&fit=crop'
  },
  {
    id: 'kalsarp',
    category: 'Dosha Nivaran',
    title: 'Kaal Sarp Dosh Puja',
    description: 'Special ritual to nullify the effects of Kaal Sarp Dosh in your horoscope.',
    price: '₹3,100',
    icon: <Moon className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop'
  },
  {
    id: 'lakshmi',
    category: 'Puja',
    title: 'Maha Lakshmi Puja',
    description: 'Invoking the Goddess of Wealth for financial stability and abundance.',
    price: '₹2,500',
    icon: <Star className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=400&h=300&fit=crop'
  },
  {
    id: 'rudrabhishek',
    category: 'Puja',
    title: 'Rudrabhishek',
    description: 'Sacred bathing of Lord Shiva aimed at fulfilling all desires and attaining peace.',
    price: '₹3,100',
    icon: <Flame className="w-8 h-8 text-brand" />,
    image: 'https://images.unsplash.com/photo-1571897849261-e6d52416ae46?w=400&h=300&fit=crop'
  }
];

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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const openBooking = (serviceName = '') => {
    setSelectedService(serviceName);
    setBookingModalOpen(true);
    // Close explorer if it's open
    if (isExplorerOpen) setExplorerOpen(false);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const getScrollAmount = () => {
    if (!scrollContainerRef.current) return 0;
    
    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('[data-card]');
    if (!firstCard) return 0;
    
    // Get card width including gap (using computed style)
    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(container).gap) || 24; // 24px = gap-6
    
    // Scroll by exactly 4 cards (with 1 card overlap for continuity)
    const scrollAmount = (cardWidth + gap) * 4;
    return scrollAmount;
  };

  // Easing function for smooth animation
  const easeInOutCubic = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // Manual smooth scroll animation
  const animateScroll = (targetScrollLeft) => {
    if (!scrollContainerRef.current || isAnimatingRef.current) return;
    
    const container = scrollContainerRef.current;
    const start = container.scrollLeft;
    const distance = targetScrollLeft - start;
    const duration = 400; // 400ms animation
    const startTime = performance.now();
    
    // Lock animation
    isAnimatingRef.current = true;
    
    // Temporarily disable scroll snapping
    container.style.scrollSnapType = 'none';
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      container.scrollLeft = start + (distance * easedProgress);
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - ensure exact position
        container.scrollLeft = targetScrollLeft;
        
        // Re-enable scroll snapping
        container.style.scrollSnapType = 'x mandatory';
        
        // Unlock animation
        isAnimatingRef.current = false;
        
        // Update arrow visibility
        handleScroll();
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current || isAnimatingRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = getScrollAmount();
    const targetScrollLeft = Math.max(0, container.scrollLeft - scrollAmount);
    
    animateScroll(targetScrollLeft);
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current || isAnimatingRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = getScrollAmount();
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScrollLeft = Math.min(maxScroll, container.scrollLeft + scrollAmount);
    
    animateScroll(targetScrollLeft);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      handleScroll(); // Initial check
      container.addEventListener('scroll', handleScroll);
      
      // Recalculate on window resize
      const handleResize = () => handleScroll();
      window.addEventListener('resize', handleResize);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        
        // Cleanup animation frame on unmount
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, []);

  return (
    <div className="font-sans text-text bg-surface">
      <Navbar onBookNow={() => openBooking()} />
      
      <Hero onBookNow={() => openBooking()} />

      {/* Trust Indicators */}
      <section className="py-10 bg-gradient-to-r from-surface via-brand-soft/20 to-surface border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '5000+', label: 'Pujas Performed' },
              { num: '100+', label: 'Vedic Acharyas' },
              { num: '4.9/5', label: 'Customer Rating' },
              { num: '100%', label: 'Satisfaction' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-3xl font-bold text-brand mb-1">{stat.num}</p>
                <p className="text-text-muted text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-section via-brand-soft/5 to-section relative overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-soft rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-soft rounded-full blur-3xl opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mb-4">Our Divine Services</h2>
            <div className="w-24 h-1 bg-brand mx-auto rounded-full mb-6"></div>
            <p className="text-text-muted max-w-2xl mx-auto">
              Choose from a wide range of Vedic rituals performed by experienced Acharyas at your home, office, or factory.
            </p>
          </div>

          {/* Netflix-Style Horizontal Content Rail */}
          <div className="relative group/rail mb-12">
            {/* Left Arrow - Desktop Only */}
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-surface/95 hover:bg-surface shadow-xl rounded-full p-3 opacity-0 group-hover/rail:opacity-100 transition-opacity duration-300 -ml-5"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} className="text-text" />
              </button>
            )}

            {/* Right Arrow - Desktop Only */}
            {showRightArrow && (
              <button
                onClick={scrollRight}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-surface/95 hover:bg-surface shadow-xl rounded-full p-3 opacity-0 group-hover/rail:opacity-100 transition-opacity duration-300 -mr-5"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} className="text-text" />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-4 px-2 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              {ALL_POOJAS.map((service, index) => (
                <div
                  key={service.id}
                  data-card
                  className="flex-none w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] snap-start animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                    flex: '0 0 auto'
                  }}
                >
                  <div className="h-full group relative">
                    {/* Inner wrapper - all hover animations applied here */}
                    <div 
                      className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-border h-full flex flex-col relative transition-all duration-300 ease-out"
                      style={{
                        transform: 'translateY(0) scale(1)',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(208, 106, 31, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)';
                        e.currentTarget.style.borderColor = 'rgb(240 226 214)';
                      }}
                    >
                      {/* Subtle gradient glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-soft/0 via-brand-soft/0 to-brand-soft/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
                      
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-brand-soft to-brand-soft/50">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-all duration-700 ease-out"
                          style={{ transform: 'scale(1) rotate(0deg)' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(1deg)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 transform transition-transform duration-300 ease-out"
                          style={{ transform: 'scale(1)' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <span className="bg-surface/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand shadow-lg">
                            {service.category}
                          </span>
                        </div>
                        {/* Icon Overlay */}
                        <div className="absolute bottom-3 left-3 bg-surface/95 backdrop-blur-sm p-2.5 rounded-xl shadow-lg transition-all duration-300 ease-out"
                          style={{ transform: 'scale(1) rotate(0deg)' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(6deg)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                        >
                          {service.icon}
                        </div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-5 lg:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg lg:text-xl font-bold mb-2 text-text group-hover:text-brand transition-all duration-300 group-hover:tracking-wide">{service.title}</h3>
                        <p className="text-text-muted text-sm mb-4 leading-relaxed flex-grow line-clamp-2 group-hover:text-text transition-colors duration-300">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border group-hover:border-brand/30 transition-colors duration-300">
                          <span className="text-brand font-bold text-lg inline-block transition-transform duration-300 ease-out"
                            style={{ transform: 'scale(1)' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          >{service.price}</span>
                          <button
                            onClick={() => openBooking(service.title)}
                            className="bg-footer hover:bg-gradient-to-b hover:from-brand hover:to-brand-dark text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
                          >
                            Book Now <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button 
               onClick={() => setExplorerOpen(true)}
               className="inline-flex items-center bg-surface border-2 border-brand text-brand font-bold py-3 px-8 rounded-full hover:bg-gradient-to-br hover:from-brand-soft hover:to-brand-soft/50 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
            >
              See All Services <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-surface via-surface to-brand-soft/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-brand-soft rounded-full blur-3xl opacity-30 transform -translate-x-10"></div>
               <img 
                src={bgImg} 
                alt="Acharya performing puja" 
                className="relative rounded-2xl shadow-2xl z-10 w-full object-cover h-[500px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-surface p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-text">Verified Acharyas</p>
                    <p className="text-xs text-text-muted">Only experienced Vedic scholars</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text mb-6">
                Why Devotees Trust <span className="text-brand">PoojaOne</span>
              </h2>
              <p className="text-text-muted mb-8 leading-relaxed">
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
      <section id="process" className="py-20 bg-gradient-to-b from-footer via-footer to-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16">How PoojaOne Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-dark -translate-y-1/2 z-0"></div>

            {[
              { step: 1, title: 'Select Puja', desc: 'Choose the ritual you wish to perform.' },
              { step: 2, title: 'Enter Details', desc: 'Provide your location and preferred date.' },
              { step: 3, title: 'Acharya Arrives', desc: 'Acharya performs the puja at your place.' }
            ].map((item) => (
              <div key={item.step} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg border-4 border-footer">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-brand-soft max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => openBooking()}
            className="mt-16 bg-gradient-to-b from-surface to-brand-soft/30 hover:from-brand-soft hover:to-brand-soft text-text px-8 py-4 rounded-lg font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Schedule a Puja Now
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-gradient-to-b from-section via-brand-soft/8 to-surface relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-soft rounded-full blur-3xl opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">What Our Devotees Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, idx) => (
              <div key={idx} className="bg-surface p-8 rounded-2xl shadow-sm border border-border">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-text-muted mb-6 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-text">{review.name}</p>
                  <p className="text-sm text-muted">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-footer text-white py-12 border-t border-text/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={logo} alt="PoojaOne Logo" className="h-8 w-auto" />
                <span className="text-2xl font-serif font-bold">PoojaOne.in</span>
              </div>
              <p className="text-muted max-w-sm">
                Your trusted partner for all Vedic rituals and spiritual services. Connecting you with the divine, right at your home.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#home" className="hover:text-brand transition">Home</a></li>
                <li><a href="#services" className="hover:text-brand transition">Services</a></li>
                <li><a href="#process" className="hover:text-brand transition">How it works</a></li>
                <li><a href="#" className="hover:text-brand transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-muted">
                <li className="flex items-center"><Phone size={16} className="mr-2" /> +91 98765 43210</li>
                <li className="flex items-center"><MapPin size={16} className="mr-2" /> Bangalore, India</li>
                <li className="flex items-center"><User size={16} className="mr-2" /> support@poojaone.in</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-text/10 text-center text-muted text-sm">
            © {new Date().getFullYear()} PoojaOne.in. All rights reserved. Shubh Labh.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => {
          console.log(isBookingModalOpen);
          setBookingModalOpen(false)

        } }
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
