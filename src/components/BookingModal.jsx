import React, { useState, useEffect } from 'react';
import { X, User, Phone, Calendar, MapPin, CheckCircle } from 'lucide-react';

const PROD_URL= import.meta.env.VITE_PROD_URL;
console.log("BookingModal using PROD_URL:", PROD_URL);

const BookingModal = ({ isOpen, onClose, preselectedService, ALL_POOJAS }) => {
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
    
    console.log("Submitting booking:", JSON.stringify(formData));
    try {
      // POST request to the backend
      const response = await fetch(`${PROD_URL}/api/email/send-email/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (responseData.success) {
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

export default BookingModal;
