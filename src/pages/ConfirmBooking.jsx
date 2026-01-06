import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';

const PROD_URL = import.meta.env.VITE_PROD_URL;

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasSubmitted = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Get form data from location state
  const formData = location.state?.formData;

  useEffect(() => {
    if (!formData) {
      // If no form data, redirect back to home
      navigate('/');
      return;
    }

    // Prevent duplicate submissions
    if (hasSubmitted.current) {
      return;
    }
    hasSubmitted.current = true;

    // Auto-submit the booking
    const submitBooking = async () => {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${PROD_URL}/api/email/send-email/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const responseData = await response.json();
        console.log("Server response:", responseData);

        if (responseData.success) {
          setIsSuccess(true);
          // Redirect after showing success message
          setTimeout(() => {
            navigate('/');
          }, 5000);
        } else {
          console.error("Server responded with error", response.status);
          alert("Booking failed. Please try again or contact support.");
          navigate('/');
        }
      } catch (error) {
        console.error("Network error:", error);
        alert(
          "Unable to connect to the server. Please check your internet connection."
        );
        navigate('/');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitBooking();
  }, [formData, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-soft/30 via-surface to-brand-soft/20 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-brand-soft rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-brand-soft rounded-full blur-3xl opacity-30"></div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] relative z-10">
        <div className="bg-surface rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
          {isSuccess ? (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-text mb-4">Booking Confirmed!</h2>
              <p className="text-text-muted mb-2">Thank you for your trust in PoojaOne.</p>
              <p className="text-text-muted">Our Acharya will contact you shortly to confirm the details.</p>
            </>
          ) : (
            <>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand mb-6"></div>
              <h2 className="text-2xl font-bold text-text mb-2">Processing Your Booking</h2>
              <p className="text-text-muted">Please wait while we confirm your booking...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
