import React, { useState, useEffect } from 'react';
import { X, User, Phone, Calendar, MapPin, Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ isOpen, onClose, preselectedService, ALL_POOJAS }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service: preselectedService || 'General Puja',
    date: '',
    address: '',
    name: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [errors, setErrors] = useState({});

  // Update service if prop changes
  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 10) {
      setFormData(prev => ({ ...prev, phone: value }));
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      setIsDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Try reverse geocoding with OpenStreetMap Nominatim (free API)
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            
            if (data && data.display_name) {
              setFormData(prev => ({
                ...prev,
                address: data.display_name
              }));
            } else {
              // Fallback to coordinates
              setFormData(prev => ({
                ...prev,
                address: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`
              }));
            }
          } catch (error) {
            // Fallback to coordinates
            setFormData(prev => ({
              ...prev,
              address: `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`
            }));
          }
          
          setIsDetectingLocation(false);
          if (errors.address) {
            setErrors(prev => ({ ...prev, address: '' }));
          }
        },
        (error) => {
          setErrors(prev => ({ ...prev, address: 'Unable to detect location. Please enter manually.' }));
          setIsDetectingLocation(false);
        }
      );
    } else {
      setErrors(prev => ({ ...prev, address: 'Geolocation is not supported by your browser.' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      if (selectedDate < tomorrow) {
        newErrors.date = 'Please select a date at least 24 hours in advance';
      }
    }
    
    if (!formData.address || formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
    }
    
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name';
    }
    
    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to confirmation page with booking data
    navigate('/confirm-booking', { 
      state: { 
        formData 
      } 
    });
    
    setIsSubmitting(false);
    onClose();
  };

  // Get tomorrow's date in YYYY-MM-DD format
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up relative max-h-[90vh] flex flex-col">
        {/* Decorative corner patterns */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-soft rounded-full blur-2xl opacity-30 -mr-16 -mt-16"></div>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand via-brand to-brand-dark p-6 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white">Book a Pandit for Your Puja</h2>
              <p className="text-brand-soft text-sm mt-1">Verified pandits • Best prices • Doorstep service</p>
            </div>
            <button 
              onClick={onClose} 
              className="hover:bg-brand-dark p-1 rounded-full transition text-white flex-shrink-0"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Service Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">Service Details</h3>
              
              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Select Puja / Service <span className="text-brand">*</span>
                </label>
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange}
                  className={`w-full p-3 border ${errors.service ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition bg-surface`}
                >
                  <option value="General Puja">General Puja</option>
                  {ALL_POOJAS.map(p => (
                    <option key={p.id} value={p.title}>{p.title}</option>
                  ))}
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Preferred Date <span className="text-brand">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-muted" size={18} />
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    min={getMinDate()}
                    className={`w-full pl-10 p-3 border ${errors.date ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-brand outline-none`}
                  />
                </div>
                {errors.date ? (
                  <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                ) : (
                  <p className="text-text-muted text-xs mt-1">
                    Please book at least 24 hours in advance for best pandit availability
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-text">
                    Puja Location <span className="text-brand">*</span>
                  </label>
                  <button 
                    type="button"
                    onClick={handleLocationDetect}
                    disabled={isDetectingLocation}
                    className="text-xs text-brand font-semibold hover:underline flex items-center disabled:opacity-50"
                  >
                    <MapPin size={12} className="mr-1" /> 
                    {isDetectingLocation ? 'Detecting...' : 'Use Current Location'}
                  </button>
                </div>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address where the puja will be performed..."
                  rows="3"
                  className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-brand outline-none resize-none`}
                ></textarea>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border"></div>

            {/* Contact Details Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide">Contact Details</h3>
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Full Name <span className="text-brand">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted" size={18} />
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 p-3 border ${errors.name ? 'border-red-500' : 'border-border'} rounded-lg focus:ring-2 focus:ring-brand outline-none`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Mobile Number <span className="text-brand">*</span>
                </label>
                <div className="flex">
                  <div className="flex items-center gap-2 px-3 bg-gray-50 border border-r-0 border-border rounded-l-lg text-text-muted">
                    <Phone size={16} />
                    <span>+91</span>
                  </div>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="98765 43210"
                    maxLength="10"
                    className={`flex-1 p-3 border ${errors.phone ? 'border-red-500' : 'border-border'} rounded-r-lg focus:ring-2 focus:ring-brand outline-none`}
                  />
                </div>
                {errors.phone ? (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                ) : (
                  <p className="text-text-muted text-xs mt-1">
                    You'll receive booking confirmation on this number
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-b from-[#E07A2F] to-brand hover:from-brand hover:to-brand-dark text-white font-bold py-4 rounded-lg shadow-lg transform transition-all duration-300 active:scale-95 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle size={20} className="mr-2" />
                  Check Availability
                </>
              )}
            </button>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-text-muted">
              <div className="flex items-center">
                <Shield size={14} className="mr-1 text-brand" />
                100% Verified Pandits
              </div>
              <div className="flex items-center">
                <CheckCircle size={14} className="mr-1 text-brand" />
                Secure Booking
              </div>
              <div className="flex items-center">
                <CheckCircle size={14} className="mr-1 text-brand" />
                Best Price Guarantee
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
