import React from 'react';
import { ChevronRight } from 'lucide-react';
// import bgImg from '../assets/hero-puja.jpg';
import bgImg from '../assets/bg2.jpg';


const Hero = ({ onBookNow }) => (
  <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-section via-section to-brand-soft/10">
    {/* Decorative Background Elements (Soft Gradients) */}
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-soft rounded-full blur-3xl opacity-50"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-soft rounded-full blur-3xl opacity-40"></div>

    <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="text-center md:text-left">
        <div className="inline-block bg-brand-soft text-brand-dark px-4 py-1 rounded-full text-sm font-bold mb-6 animate-fade-in border border-border">
          ★ #1 Trusted Online Acharya Service
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6 text-text drop-shadow-sm">
          Bring Divine Blessings <br/>
          <span className="text-brand">To Your Doorstep</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
          Book experienced Vedic Acharyas for Pujas, Havans, and Sanskars performed at your home. Authentic rituals, hassle-free booking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button 
            onClick={() => onBookNow()}
            className="bg-gradient-to-b from-[#E07A2F] to-brand hover:from-brand hover:to-brand-dark text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
          >
            Book Pooja <ChevronRight className="ml-2" />
          </button>
          <a 
            href="#services"
            className="bg-surface hover:bg-brand-soft text-text px-8 py-4 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition flex items-center justify-center border border-border"
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
        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-border rounded-3xl z-0"></div>
      </div>
    </div>
  </section>
);

export default Hero;
