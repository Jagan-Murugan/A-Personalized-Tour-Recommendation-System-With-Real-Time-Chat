import React, { useEffect, useState } from 'react';

interface BookingData {
  id?: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  tourLocation: string;
  tourDuration: string;
  tourPrice: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
  };
  travelDetails: {
    travelDate: string;
    travelers: number;
    travelStyle: string;
    accommodation: string;
    dietaryRequirements: string;
    specialRequests: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  paymentInfo: {
    cardHolder: string;
    cardNumber: string;
  };
  totalAmount: number;
}

interface ThankYouPageProps {
  booking: BookingData;
  onBackToHome: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ booking, onBackToHome }) => {
  const [confetti, setConfetti] = useState<{ id: number; x: number; color: string; delay: number; rotation: number }[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Create confetti
    const colors = ['#f97316', '#fb923c', '#fbbf24', '#a855f7', '#ec4899', '#10b981'];
    const newConfetti = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
      rotation: Math.random() * 360,
    }));
    setConfetti(newConfetti);
    
    // Show content with delay
    setTimeout(() => setShowContent(true), 300);

    // Clean up confetti
    const timer = setTimeout(() => setConfetti([]), 5000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const bookingId = booking.id || `WL${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 opacity-80"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            top: '-20px',
            transform: `rotate(${piece.rotation}deg)`,
            animation: `fall 4s ease-out forwards`,
          }}
        />
      ))}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes checkmark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-checkmark {
          animation: checkmark 0.6s ease-out forwards;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />

      <div className={`max-w-3xl mx-auto px-4 py-12 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Success Header */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/40 animate-checkmark">
            <span className="text-5xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Booking Confirmed!
          </h1>
          <p className="text-gray-400 text-lg">Your adventure awaits</p>
        </div>

        {/* Booking Reference Card */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-800">
          <div className="text-center border-b border-slate-700 pb-4 mb-4">
            <p className="text-gray-500 text-sm">Booking Reference</p>
            <p className="text-3xl font-bold text-orange-400 font-mono tracking-wider">{bookingId}</p>
          </div>

          {/* Tour Details */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={booking.tourImage}
              alt={booking.tourTitle}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-white">{booking.tourTitle}</h2>
              <p className="text-gray-400">📍 {booking.tourLocation}</p>
              <p className="text-gray-400">⏱️ {booking.tourDuration}</p>
            </div>
          </div>

          {/* Booking Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: '📅', label: 'Travel Date', value: formatDate(booking.travelDetails.travelDate) },
              { icon: '⏱️', label: 'Duration', value: booking.tourDuration },
              { icon: '👥', label: 'Travelers', value: booking.travelDetails.travelers.toString() },
              { icon: '🏨', label: 'Accommodation', value: booking.travelDetails.accommodation },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                <p className="font-semibold text-white text-sm capitalize">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Lead Traveler */}
          <div className="border-t border-slate-700 pt-4">
            <h3 className="font-semibold text-orange-400 mb-3">👤 Lead Traveler</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-white">{booking.personalInfo.firstName} {booking.personalInfo.lastName}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-white">{booking.personalInfo.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone</p>
                <p className="font-medium text-white">{booking.personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-gray-500">Nationality</p>
                <p className="font-medium text-white">{booking.personalInfo.nationality}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-800">
          <h3 className="font-semibold text-orange-400 mb-4">💳 Payment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Tour Price × {booking.travelDetails.travelers} travelers</span>
              <span className="text-white">{formatCurrency(booking.tourPrice * booking.travelDetails.travelers)}</span>
            </div>
            {booking.travelDetails.accommodation === 'luxury' && (
              <div className="flex justify-between">
                <span className="text-gray-400">Luxury Accommodation</span>
                <span className="text-white">+40%</span>
              </div>
            )}
            {booking.travelDetails.accommodation === 'budget' && (
              <div className="flex justify-between">
                <span className="text-gray-400">Budget Accommodation</span>
                <span className="text-green-400">-15%</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-slate-700 text-lg font-semibold">
              <span className="text-white">Total Paid</span>
              <span className="text-orange-400">{formatCurrency(booking.totalAmount)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Payment made with card ending in ****{booking.paymentInfo.cardNumber.slice(-4)}
          </p>
        </div>

        {/* Important Information */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-amber-400 mb-3">📋 Important Information</h3>
          <ul className="text-sm text-amber-200/80 space-y-2">
            <li>• Confirmation email sent to {booking.personalInfo.email}</li>
            <li>• Please carry a valid ID proof and this booking reference</li>
            <li>• Arrive at the meeting point 30 minutes before departure</li>
            <li>• For any changes, contact us at least 48 hours in advance</li>
            <li>• Check visa requirements for your destination</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 text-gray-300 border border-slate-600 rounded-xl hover:border-orange-500 hover:text-orange-400 transition-all font-medium"
          >
            🖨️ Print Confirmation
          </button>
          <button
            onClick={onBackToHome}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all font-semibold shadow-lg shadow-orange-500/30"
          >
            🌍 Explore More Adventures
          </button>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          <p>Need help? Contact our 24/7 support team</p>
          <p className="font-medium text-gray-400 mt-1">
            📧 support@wanderlust.com | 📱 +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
